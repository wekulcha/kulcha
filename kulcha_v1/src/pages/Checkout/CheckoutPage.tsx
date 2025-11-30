import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { Header } from '../../layout/Header';
import { useAppContext } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../api/orders';
import type { PaymentMethod, CreateOrderPayload } from '../../types/order';

export function CheckoutPage() {
  const { serviceType, selectedRestaurant } = useAppContext();
  const { items } = useCart();
  const navigate = useNavigate();

  // Derived values
  const itemsTotal = items.reduce(
    (sum, it) => sum + it.meal.price * it.quantity,
    0
  );

  const [deliveryFee] = useState<number>(serviceType === 'DELIVERY' ? 0 : 0);
  const [serviceFee] = useState<number>(0);
  const total = itemsTotal + deliveryFee + serviceFee;

  // Form state
  const [pickupPoint] = useState('Москва, ОРПЦ Фуд Сити');
  const [floor, setFloor] = useState<string>('1');
  const [line, setLine] = useState<string>('1');
  const [pavilion, setPavilion] = useState<string>('1');
  const [username] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    if (!phone.trim() || phone.trim().length < 5) {
      setErrorMessage('Пожалуйста, укажите номер телефона.');
      return;
    }

    if (serviceType === 'DELIVERY' && (!floor || !line || !pavilion)) {
      setErrorMessage('Пожалуйста, укажите этаж, линию и павильон.');
      return;
    }

    const deliveryAddress =
      serviceType === 'DELIVERY' ? `${floor}-${line}-${pavilion}` : null;

    const itemsPayload = items.map((item) => ({
      meal_id: item.meal.id,
      quantity: item.quantity,
      price: item.meal.price,
    }));

    const payload: CreateOrderPayload = {
      restaurant_id: selectedRestaurant.id,
      service_type: serviceType,
      delivery_address: deliveryAddress,
      username: username || null,
      phone: phone.trim(),
      payment_method: paymentMethod,
      items: itemsPayload,
      items_total: itemsTotal,
      delivery_fee: deliveryFee,
      service_fee: serviceFee,
      total,
    };

    try {
      setSubmitting(true);
      const response = await createOrder(payload);
      setSuccessMessage(`Заказ №${response.id} успешно создан.`);
      setTimeout(() => {
        navigate('/cafes');
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage('Не удалось оформить заказ. Попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MiniAppShell>
      <div className="space-y-4 pb-28">
        <Header
          title="Оформление"
          onBurgerClick={() => navigate('/profile')}
          showSearch={false}
        />

        {/* Restaurant summary */}
        {selectedRestaurant ? (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-xs text-slate-500">Заказ из</div>
            <div className="text-sm font-semibold text-slate-900">
              {selectedRestaurant.name}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {selectedRestaurant.address}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-900 text-red-600">
              Ресторан не выбран
            </div>
            <button
              onClick={() => navigate('/cafes')}
              className="mt-2 text-xs text-slate-600 underline hover:text-slate-900"
            >
              Вернуться к выбору ресторана
            </button>
          </div>
        )}

        {/* Address block */}
        {serviceType === 'DELIVERY' ? (
          <div className="bg-white rounded-2xl p-3 shadow-sm space-y-3">
            <div className="text-sm font-semibold text-slate-900">Адрес доставки</div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Пункт заказа</label>
              <div className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 bg-slate-50">
                {pickupPoint}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Этаж</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Линия</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                >
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-500 mb-1">Павильон</label>
                <select
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={pavilion}
                  onChange={(e) => setPavilion(e.target.value)}
                >
                  {Array.from({ length: 70 }, (_, i) => (
                    <option key={i + 1} value={String(i + 1)}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Обслуживание в зале</div>
            <div className="text-xs text-slate-500 mt-1">
              Заказ будет подан в зале {selectedRestaurant?.name ?? ''}.
            </div>
          </div>
        )}

        {/* Contacts section */}
        <div className="bg-white rounded-2xl p-3 shadow-sm space-y-3">
          <div className="text-sm font-semibold text-slate-900">Контакты</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Username</label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-slate-50 text-slate-500"
                value={username || '@username'}
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Телефон</label>
              <input
                type="tel"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="+7..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Телефон нужен, чтобы курьер или ресторан могли с вами связаться.
          </p>
        </div>

        {/* Payment method */}
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

        {/* Summary block */}
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

        {/* Error / success messages */}
        {errorMessage && (
          <div className="text-xs text-red-500 bg-red-50 rounded-xl p-3">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-xs text-emerald-600 bg-emerald-50 rounded-xl p-3">
            {successMessage}
          </div>
        )}
      </div>

      {/* Bottom bar: Total + "ЗАКАЗАТЬ" */}
      {items.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-20">
          <div className="bg-white rounded-2xl shadow-lg flex items-center px-3 py-2 gap-3">
            <div className="flex-1">
              <div className="text-[11px] text-slate-500 uppercase">Итого</div>
              <div className="text-sm font-semibold text-slate-900">
                {total.toFixed(0)} ₽
              </div>
            </div>
            <button
              type="button"
              disabled={submitting || total <= 0 || !selectedRestaurant}
              onClick={handleSubmit}
              className={
                'flex-[2] text-sm font-semibold py-2 rounded-xl text-center transition-colors ' +
                (submitting || total <= 0 || !selectedRestaurant
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
