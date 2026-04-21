import type { AdminOrderItem } from "../types/adminOrder";

interface KitchenTicketPayload {
  restaurantName?: string;
  orderId: number;
  createdAt: string;
  statusLabel: string;
  total: number;
  isPaid: boolean;
  orderType: "DELIVERY" | "DINE_IN";
  deliveryAddress?: string | null;
  tableNumber?: string | null;
  comment?: string | null;
  items: AdminOrderItem[];
  customerUsername?: string | null;
  customerPhone?: string | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPrintedDate(iso: string): string {
  const dt = new Date(iso);
  const day = dt.getDate().toString().padStart(2, "0");
  const month = (dt.getMonth() + 1).toString().padStart(2, "0");
  const year = dt.getFullYear();
  const hh = dt.getHours().toString().padStart(2, "0");
  const mm = dt.getMinutes().toString().padStart(2, "0");
  return `${day}.${month}.${year} ${hh}:${mm}`;
}

function buildTicketHtml(payload: KitchenTicketPayload): string {
  const placeLabel =
    payload.orderType === "DINE_IN"
      ? payload.tableNumber
        ? `Стол ${payload.tableNumber}`
        : "В зале"
      : payload.deliveryAddress || "Без адреса";

  const itemsMarkup =
    payload.items.length > 0
      ? payload.items
          .map(
            (item) => `
              <div class="item-row">
                <div class="item-name">${escapeHtml(item.name)}</div>
                <div class="item-qty">×${item.quantity}</div>
              </div>
            `
          )
          .join("")
      : `<div class="empty">Позиции не загружены</div>`;

  const commentMarkup = payload.comment?.trim()
    ? `
        <div class="section">
          <div class="label">Комментарий</div>
          <div class="value comment">${escapeHtml(payload.comment)}</div>
        </div>
      `
    : "";

  const customerParts = [
    payload.customerUsername ? `@${payload.customerUsername}` : "",
    payload.customerPhone ?? "",
  ].filter(Boolean);

  const customerMarkup = customerParts.length
    ? `
        <div class="section">
          <div class="label">Клиент</div>
          <div class="value">${escapeHtml(customerParts.join(" · "))}</div>
        </div>
      `
    : "";

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>Заказ №${payload.orderId}</title>
    <style>
      @page {
        size: 80mm auto;
        margin: 6mm;
      }

      * {
        box-sizing: border-box;
      }

      html, body {
        margin: 0;
        padding: 0;
        color: #0f172a;
        background: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 12px;
        line-height: 1.35;
      }

      body {
        padding: 0;
      }

      .ticket {
        width: 100%;
      }

      .header {
        border-bottom: 1px dashed #94a3b8;
        padding-bottom: 8px;
        margin-bottom: 10px;
      }

      .restaurant {
        font-size: 13px;
        font-weight: 700;
      }

      .order-number {
        margin-top: 4px;
        font-size: 22px;
        font-weight: 800;
      }

      .meta {
        margin-top: 6px;
        display: grid;
        gap: 3px;
      }

      .meta-line {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }

      .label {
        color: #475569;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-bottom: 4px;
      }

      .section {
        margin-bottom: 10px;
      }

      .value {
        font-size: 12px;
        word-break: break-word;
      }

      .comment {
        font-size: 14px;
        font-weight: 700;
      }

      .items {
        border-top: 1px dashed #94a3b8;
        border-bottom: 1px dashed #94a3b8;
        padding: 8px 0;
        margin-bottom: 10px;
      }

      .item-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }

      .item-name {
        font-size: 14px;
        font-weight: 700;
        flex: 1;
      }

      .item-qty {
        font-size: 16px;
        font-weight: 800;
        white-space: nowrap;
      }

      .summary {
        display: grid;
        gap: 4px;
      }

      .total {
        font-size: 16px;
        font-weight: 800;
      }

      .empty {
        color: #64748b;
      }

      @media print {
        .ticket {
          width: auto;
        }
      }
    </style>
  </head>
  <body>
    <div class="ticket">
      <div class="header">
        <div class="restaurant">${escapeHtml(payload.restaurantName || "KULCHA")}</div>
        <div class="order-number">Заказ №${payload.orderId}</div>
        <div class="meta">
          <div class="meta-line"><span>${escapeHtml(formatPrintedDate(payload.createdAt))}</span><span>${escapeHtml(payload.statusLabel)}</span></div>
          <div class="meta-line"><span>${payload.orderType === "DINE_IN" ? "В зале" : "Доставка"}</span><span>${payload.isPaid ? "Оплачен" : "Не оплачен"}</span></div>
        </div>
      </div>

      <div class="section">
        <div class="label">Куда отдать</div>
        <div class="value">${escapeHtml(placeLabel)}</div>
      </div>

      ${customerMarkup}

      <div class="section">
        <div class="label">Позиции</div>
        <div class="items">${itemsMarkup}</div>
      </div>

      ${commentMarkup}

      <div class="summary">
        <div class="label">Итог</div>
        <div class="total">${Math.round(payload.total)} ₽</div>
      </div>
    </div>
  </body>
</html>`;
}

function printWithPopup(html: string, title: string): void {
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=480,height=720");
  if (!printWindow) {
    throw new Error("Браузер заблокировал окно печати.");
  }
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.document.title = title;
  printWindow.focus();
  window.setTimeout(() => {
    printWindow.print();
  }, 250);
}

export async function printKitchenTicket(payload: KitchenTicketPayload): Promise<void> {
  const html = buildTicketHtml(payload);
  const title = `Заказ №${payload.orderId}`;

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.opacity = "0";

  document.body.appendChild(iframe);

  try {
    const frameDoc = iframe.contentDocument;
    const frameWindow = iframe.contentWindow;

    if (!frameDoc || !frameWindow) {
      throw new Error("Не удалось подготовить скрытый документ для печати.");
    }

    frameDoc.open();
    frameDoc.write(html);
    frameDoc.close();
    frameDoc.title = title;

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 150);
    });

    frameWindow.focus();
    frameWindow.print();

    const cleanup = () => {
      iframe.remove();
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup, { once: true });
    window.setTimeout(cleanup, 1500);
  } catch {
    iframe.remove();
    printWithPopup(html, title);
  }
}
