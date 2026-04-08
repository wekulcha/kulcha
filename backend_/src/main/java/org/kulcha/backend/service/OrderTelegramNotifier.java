package org.kulcha.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.kulcha.backend.config.KulchaProperties;
import org.kulcha.backend.model.Order;
import org.kulcha.backend.model.OrderPosition;
import org.kulcha.backend.model.Staff;
import org.kulcha.backend.model.User;
import org.kulcha.backend.model.enums.OrderStatus;
import org.kulcha.backend.repository.OrderRepository;
import org.kulcha.backend.repository.OrderPositionRepository;
import org.kulcha.backend.telegram.TelegramBotClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderTelegramNotifier {

    private final OrderRepository orderRepository;
    private final OrderPositionRepository orderPositionRepository;
    private final StaffService staffService;
    private final TelegramBotClient telegramBotClient;
    private final KulchaProperties kulchaProperties;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public void notifyOrderPlaced(long orderId) {
        Order order = orderRepository
                .findDetailedById(orderId)
                .orElse(null);
        if (order == null) {
            return;
        }
        List<OrderPosition> lines = orderPositionRepository.findAllByOrderIdDetailed(orderId);
        User user = order.getUser();
        String userToken = kulchaProperties.getTelegram().getUserBotToken();
        String adminToken = kulchaProperties.getTelegram().getAdminBotToken();

        if (user.getTelegramId() != null && userToken != null && !userToken.isBlank()) {
            String html = formatUserNewOrderHtml(order, lines);
            telegramBotClient.sendMessage(userToken, user.getTelegramId(), html, "HTML", null);
        }

        if (adminToken != null && !adminToken.isBlank()) {
            String adminHtml = formatAdminNewOrderHtml(order, lines, user);
            String keyboard = buildAdminKeyboardJson(order.getId());
            List<Staff> staffList =
                    staffService.findAllByRestaurantIdDetailed(order.getRestaurant().getId());
            for (Staff s : staffList) {
                Long tg = s.getUser().getTelegramId();
                if (tg != null) {
                    telegramBotClient.sendMessage(adminToken, tg, adminHtml, "HTML", keyboard);
                }
            }
        }
    }

    @Transactional(readOnly = true)
    public void notifyUserStatusChanged(Order orderAfterSave) {
        Order order = orderRepository
                .findDetailedById(orderAfterSave.getId())
                .orElse(orderAfterSave);
        User user = order.getUser();
        if (user.getTelegramId() == null) {
            return;
        }
        String userToken = kulchaProperties.getTelegram().getUserBotToken();
        if (userToken == null || userToken.isBlank()) {
            return;
        }
        String html = formatUserStatusHtml(order);
        telegramBotClient.sendMessage(userToken, user.getTelegramId(), html, "HTML", null);
    }

    private static String escapeHtml(String s) {
        if (s == null) {
            return "";
        }
        return s.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;");
    }

    private static String statusRu(OrderStatus s) {
        return switch (s) {
            case CREATED -> "Создан";
            case ACCEPTED -> "Принят";
            case COOKING -> "Готовится";
            case DELIVERY -> "Доставка";
            case DONE -> "Выполнен";
            case CANCELLED -> "Отменён";
        };
    }

    private String formatUserNewOrderHtml(Order order, List<OrderPosition> lines) {
        StringBuilder sb = new StringBuilder();
        sb.append("🍽 <b>Заказ оформлен</b>\n");
        sb.append("━━━━━━━━━━━━━━\n");
        sb.append("№ <code>").append(order.getId()).append("</code>\n");
        sb.append("📍 ").append(escapeHtml(order.getRestaurant().getName())).append("\n");
        sb.append("📌 Статус: <b>").append(statusRu(order.getStatus())).append("</b>\n");
        sb.append("💰 Сумма: <b>").append(order.getTotal()).append(" ₽</b>\n\n");
        sb.append("<b>Состав:</b>\n");
        for (OrderPosition p : lines) {
            sb.append("• ")
                    .append(escapeHtml(p.getMeal().getName()))
                    .append(" × ")
                    .append(p.getQuantity())
                    .append(" — ")
                    .append(p.getTotalPrice())
                    .append(" ₽\n");
        }
        if (order.getDeliveryAddress() != null && !order.getDeliveryAddress().isBlank()) {
            sb.append("\n🚚 Адрес: ").append(escapeHtml(order.getDeliveryAddress())).append("\n");
        }
        sb.append("\n<i>Мы пришлём обновление, когда статус изменится.</i>");
        return sb.toString();
    }

    private String formatAdminNewOrderHtml(Order order, List<OrderPosition> lines, User customer) {
        StringBuilder sb = new StringBuilder();
        sb.append("🔔 <b>Новый заказ</b>\n");
        sb.append("━━━━━━━━━━━━━━\n");
        sb.append("№ <code>").append(order.getId()).append("</code>\n");
        sb.append("👤 ")
                .append(escapeHtml(customer.getUsername()))
                .append(" · ")
                .append(escapeHtml(customer.getPhone()))
                .append("\n");
        sb.append("📍 ").append(escapeHtml(order.getRestaurant().getName())).append("\n");
        sb.append("🧾 ").append(order.getOrderType()).append("\n");
        sb.append("💰 <b>").append(order.getTotal()).append(" ₽</b>\n\n");
        sb.append("<b>Позиции:</b>\n");
        for (OrderPosition p : lines) {
            sb.append("• ")
                    .append(escapeHtml(p.getMeal().getName()))
                    .append(" × ")
                    .append(p.getQuantity())
                    .append("\n");
        }
        if (order.getDeliveryAddress() != null && !order.getDeliveryAddress().isBlank()) {
            sb.append("\n🚚 ").append(escapeHtml(order.getDeliveryAddress())).append("\n");
        }
        sb.append("\n<i>Выберите статус ниже ↓</i>");
        return sb.toString();
    }

    private String formatUserStatusHtml(Order order) {
        return "📦 <b>Обновление заказа</b>\n"
                + "━━━━━━━━━━━━━━\n"
                + "№ <code>"
                + order.getId()
                + "</code>\n"
                + "📍 "
                + escapeHtml(order.getRestaurant().getName())
                + "\n"
                + "📌 Новый статус: <b>"
                + statusRu(order.getStatus())
                + "</b>\n"
                + "💰 "
                + order.getTotal()
                + " ₽\n";
    }

    private String buildAdminKeyboardJson(long orderId) {
        try {
            ObjectNode root = objectMapper.createObjectNode();
            ArrayNode rows = objectMapper.createArrayNode();

            rows.add(row("✅ Принят", cb(orderId, "ACC")));
            rows.add(row("👨‍🍳 Готовится", cb(orderId, "COO")));
            rows.add(row("🚚 Доставка", cb(orderId, "DEL")));
            rows.add(row("✔️ Готово", cb(orderId, "DON")));
            rows.add(row("❌ Отмена", cb(orderId, "CAN")));

            root.set("inline_keyboard", rows);
            return objectMapper.writeValueAsString(root);
        } catch (Exception e) {
            return null;
        }
    }

    private ArrayNode row(String text, String callback) {
        ObjectNode btn = objectMapper.createObjectNode();
        btn.put("text", text);
        btn.put("callback_data", callback);
        ArrayNode row = objectMapper.createArrayNode();
        row.add(btn);
        return row;
    }

    private static String cb(long orderId, String code) {
        return "k:" + orderId + ":" + code;
    }
}
