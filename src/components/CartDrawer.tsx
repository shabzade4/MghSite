import React, { useState } from 'react';
import { X, Trash2, ArrowLeft, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { store } from '../services/store';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (discountPercent: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(store.cart);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  React.useEffect(() => {
    return store.subscribe(() => {
      setCartItems([...store.cart]);
    });
  }, []);

  if (!isOpen) return null;

  const rawTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'PARSNET' || code === 'VERCEL' || code === 'CISCO') {
      setDiscountPercent(20);
      setCouponApplied(true);
    } else if (code === 'WELCOME') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else {
      setCouponError('کد تخفیف وارد شده معتبر نمی‌باشد (کد تست: PARSNET)');
    }
  };

  const handleRemoveItem = (id: string) => {
    store.removeFromCart(id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-start">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">سبد خرید شما</h2>
            <span className="text-xs text-slate-400 font-mono">({cartItems.length} مورد)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-12 h-12 stroke-1 mb-3 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">سبد خرید شما خالی است</p>
              <p className="text-xs text-slate-400 mt-1">دوره‌ها و فایل‌های مورد نظرتان را به سبد اضافه کنید.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-12 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {item.type === 'course' ? 'دوره آموزشی ویدیویی' : `فایل دانلودی (${item.fileFormat || 'ZIP'})`}
                  </div>
                  <div className="text-xs font-bold text-slate-900 font-mono tabular-nums mt-1">
                    {item.price.toLocaleString('fa-IR')} تومان
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="حذف از سبد"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="کد تخفیف (مثال: PARSNET)"
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition-colors whitespace-nowrap"
              >
                اعمال
              </button>
            </form>
            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
            {couponApplied && (
              <p className="text-[11px] text-emerald-600 font-medium">
                کد تخفیف {discountPercent}٪ با موفقیت اعمال شد.
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>مجموع مبالغ:</span>
                <span className="font-mono tabular-nums">{rawTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>تخفیف اعمال‌شده:</span>
                  <span className="font-mono tabular-nums">- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>مبلغ قابل پرداخت:</span>
                <span className="font-mono tabular-nums text-indigo-600 font-black">
                  {finalTotal.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onProceedToCheckout(discountPercent)}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <span>اتصال به درگاه پرداخت آنلاین</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>پرداخت امن از طریق درگاه رسمی شاپرک و زرین‌پال</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
