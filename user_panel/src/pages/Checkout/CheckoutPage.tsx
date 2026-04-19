import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../api/orders';
import { updateUserProfile } from '../../api/users';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Header } from '../../layout/Header';
import { MiniAppShell } from '../../layout/MiniAppShell';
import type { CreateOrderPayload, PaymentMethod } from '../../types/order';
import { formatLocationParts, parseLocationParts } from '../../utils/locationFormat';

function phoneDigitsToLocal10(stored: string | null): string {
  if (!stored || stored.startsWith('tg-')) return '';
  const d = stored.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('7')) return d.slice(1);
  if (d.length === 10) return d;
  return '';
}

function isRegisteredPhone(phone: string | null): boolean {
  if (!phone || phone.startsWith('tg-')) return false;
  const d = phone.replace(/\D/g, '');
  return d.length === 11 && d.startsWith('7');
}

function sanitizeUsername(username: string | null): string {
  if (!username) return '';
  return username.startsWith('@') ? username : `@${username}`;
}

export function CheckoutPage() {
  const { currentUser, authReady, authError, reloadAuth } = useAuth();
  const { serviceType, selectedRestaurant } = useAppContext();
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const itemsTotal = items.reduce((sum, item) => sum + item.meal.price * item.quantity, 0);

  const [deliveryFee] = useState<number>(serviceType === 'DELIVERY' ? 0 : 0);
  const [serviceFee] = useState<number>(0);
  const total = itemsTotal + deliveryFee + serviceFee;

  const [floor, setFloor] = useState('');
  const [line, setLine] = useState('');
  const [pavilion, setPavilion] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState<string>('');
  const [phoneLocal, setPhoneLocal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    setPhoneLocal((prev) => (prev.trim() ? prev : phoneDigitsToLocal10(currentUser.phone)));
    setUsername(sanitizeUsername(currentUser.username));
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser?.address?.trim()) return;
    const p = parseLocationParts(currentUser.address);
    setFloor((prev) => (prev.trim() ? prev : p.floor));
    setLine((prev) => (prev.trim() ? prev : p.line));
    setPavilion((prev) => (prev.trim() ? prev : p.pavilion));
  }, [currentUser?.address]);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (items.length === 0) {
      setErrorMessage('Корзина пуста, добавьте блюда перед оформлением.');
      return;
    }

    if (!selectedRestaurant) {
      setErrorMessage('Ресторан не выбран. Вернитесь и выберите ресторан.');
      return;
    }

    if (!authReady) {
      setErrorMessage('Подождите немного, мы еще проверяем вход в mini app.');
      return;
    }

    if (!currentUser) {
      setErrorMessage(authError ?? 'Откройте мини-приложение из Telegram через кнопку в боте KULCHA.');
      return;
    }

    if (!isRegisteredPhone(currentUser.phone)) {
      setErrorMessage('Сначала зарегистрируйтесь в боте KULCHA и отправьте номер телефона кнопкой «Отправить номер».');
      return;
    }

    const digits = phoneLocal.replace(/\D/g, '').slice(0, 10);
    if (digits.length !== 10) {
      setErrorMessage('Введите 10 цифр номера после +7.');
      return;
    }
    const phoneForApi = `7${digits}`;

    const deliveryAddr =
      serviceType === 'DELIVERY' ? formatLocationParts(floor, line, pavilion).trim() : null;

    if (serviceType === 'DELIVERY' && !deliveryAddr) {
      setErrorMessage('Укажите этаж, линию и павильон.');
      return;
    }
    if (serviceType === 'DINE_IN' && !tableNumber.trim()) {
      setErrorMessage('Укажите номер стола для заказа в зале.');
      return;
    }

    const payload: CreateOrderPayload = {
      restaurant_id: selectedRestaurant.id,
      service_type: serviceType,
      delivery_address: deliveryAddr,
      table_number: serviceType === 'DINE_IN' ? tableNumber.trim() || null : null,
      comment: comment.trim() || null,
      username: username.replace(/^@/, '') || null,
      phone: phoneForApi,
      payment_method: paymentMethod,
      items: items.map((item) => ({
        meal_id: item.meal.id,
        quantity: item.quantity,
        price: item.meal.price,
      })),
      items_total: itemsTotal,
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      total,
    };

    try {
      setSubmitting(true);
      await updateUserProfile(currentUser.id, { phone: phoneForApi });
      const response = await createOrder(payload);
      if (serviceType === 'DELIVERY' && currentUser && deliveryAddr) {
        void updateUserProfile(currentUser.id, { address: deliveryAddr }).catch(() => {});
      }
      clearCart();
      setSuccessMessage(`Заказ №${response.id} успешно создан.`);
      setTimeout(() => {
        navigate('/cafes');
      }, 1500);
    } catch (error) {
      console.error(error);
      setErrorMessage('Не удалось оформить заказ. Попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  const phoneDigitsOk = phoneLocal.replace(/\D/g, '').length === 10;
  const submitDisabled =
    submitting ||
    total <= 0 ||
    !selectedRestaurant ||
    !authReady ||
    !currentUser ||
    !isRegisteredPhone(currentUser.phone) ||
    !phoneDigitsOk;

  return (
    <MiniAppShell>
      <div className="space-y-4 pb-28">
        <Header
          title="Оформление"
          showBack
          onBackClick={() => navigate('/cart', { replace: true })}
          onProfileClick={() => navigate('/profile')}
          showSearch={false}
        />

        {authReady && !currentUser && (
          <div className="bg-amber-50 rounded-2xl p-3 shadow-sm border border-amber-100 space-y-3">
            <div className="text-sm font-semibold text-amber-900">Нужно подтвердить вход</div>
            <div className="text-xs text-amber-700">
              {authError ?? 'Откройте mini app из Telegram через кнопку в боте KULCHA.'}
            </div>
            <button
              type="button"
              onClick={reloadAuth}
              className="rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Повторить вход
            </button>
          </div>
        )}

        {selectedRestaurant ? (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-xs text-slate-500">Заказ из</div>
            <div className="text-sm font-semibold text-slate-900">{selectedRestaurant.name}</div>
            <div className="text-xs text-slate-500 mt-1">{selectedRestaurant.address}</div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold text-red-600">Ресторан не выбран</div>
            <button
              onClick={() => navigate('/cafes')}
              className="mt-2 text-xs text-slate-600 underline hover:text-slate-900"
            >
              Вернуться к выбору ресторана
            </button>
          </div>
        )}

        {serviceType === 'DELIVERY' ? (
          <div className="bg-white rounded-2xl p-3 shadow-sm space-y-3">
            <div className="text-sm font-semibold text-slate-900">Локация на рынке</div>
            <p className="text-[11px] text-slate-500">
              Доставка осуществляется только внутри Фуд Сити.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wide">
                  Этаж
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full rounded-xl border border-slate-200 px-2 py-2 text-sm text-center placeholder:text-slate-300"
                  placeholder="—"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wide">
                  Линия
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-2 py-2 text-sm text-center placeholder:text-slate-300"
                  placeholder="—"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wide">
                  Павильон
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 px-2 py-2 text-sm text-center placeholder:text-slate-300"
                  placeholder="—"
                  value={pavilion}
                  onChange={(e) => setPavilion(e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
            <div className="text-sm font-semibold text-slate-900">В зале</div>
            <p className="text-[11px] text-slate-500">
              Обслуживание и доставка доступны только внутри Фуд Сити.
            </p>
            <label className="block text-[11px] text-slate-500">Номер стола</label>
            <input
              type="text"
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="Например: 12"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
          </div>
        )}

        <div className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <label className="block text-[11px] text-slate-500">Комментарий к заказу</label>
          <textarea
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[72px]"
            placeholder="Например: без лука, позвонить перед доставкой"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-2xl p-3 shadow-sm space-y-3">
          <div className="text-sm font-semibold text-slate-900">Контакты</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Username</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-slate-50 text-slate-700"
                value={username || '—'}
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Телефон</label>
              <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-white">
                <span className="px-3 py-2 text-sm bg-slate-100 text-slate-600 border-r border-slate-200 select-none">
                  +7
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  className="flex-1 min-w-0 px-3 py-2 text-sm outline-none"
                  placeholder="9001234567"
                  value={phoneLocal}
                  onChange={(e) => {
                    const d = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhoneLocal(d);
                  }}
                />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Телефон нужен, чтобы курьер или ресторан могли с вами связаться.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">Оплата</div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod('CASH')}
              className={
                'flex-1 rounded-xl px-3 py-2 text-sm border transition-colors ' +
                (paymentMethod === 'CASH'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100')
              }
            >
              Наличными
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('TRANSFER')}
              className={
                'flex-1 rounded-xl px-3 py-2 text-sm border transition-colors ' +
                (paymentMethod === 'TRANSFER'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100')
              }
            >
              Переводом
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-3 shadow-sm space-y-1 text-sm text-slate-800">
          <div className="flex justify-between">
            <span>Товары в заказе</span>
            <span className="font-semibold">{itemsTotal.toFixed(0)} ₽</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Доставка</span>
            <span>{deliveryFee.toFixed(0)} ₽</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Сервисный сбор</span>
            <span>{serviceFee.toFixed(0)} ₽</span>
          </div>
          <div className="border-t border-slate-100 mt-2 pt-2 flex justify-between font-semibold">
            <span>Итого</span>
            <span>{total.toFixed(0)} ₽</span>
          </div>
        </div>

        {errorMessage && <div className="text-xs text-red-500 bg-red-50 rounded-xl p-3">{errorMessage}</div>}
        {successMessage && (
          <div className="text-xs text-emerald-600 bg-emerald-50 rounded-xl p-3">{successMessage}</div>
        )}
      </div>

      {items.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-20">
          <div className="bg-white rounded-2xl shadow-lg flex items-center px-3 py-2 gap-3">
            <div className="flex-1">
              <div className="text-[11px] text-slate-500 uppercase">Итого</div>
              <div className="text-sm font-semibold text-slate-900">{total.toFixed(0)} ₽</div>
            </div>
            <button
              type="button"
              disabled={submitDisabled}
              onClick={handleSubmit}
              className={
                'flex-[2] text-sm font-semibold py-2 rounded-xl text-center transition-colors ' +
                (submitDisabled
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800')
              }
            >
              {submitting ? 'Отправка...' : 'ЗАКАЗАТЬ'}
            </button>
          </div>
        </div>
      )}
    </MiniAppShell>
  );
}
