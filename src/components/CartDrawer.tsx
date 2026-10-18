import React, { useState, useEffect } from 'react';
import { X, Trash2, ArrowLeft, ShieldCheck, Tag, ShoppingBag, CheckCircle2 } from 'lucide-react';
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
  const [couponFeedback, setCouponFeedback] = useState<{ isError: boolean; message: string }>({ isError: false, message: '' });

  useEffect(() => {
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
    setCouponFeedback({ isError: false, message: '' });

    if (!couponCode.trim()) return;

    const result = store.validateCoupon(couponCode);
    if (result.valid) {
      setDiscountPercent(result.discountPercent);
      setCouponApplied(true);
      setCouponFeedback({ isError: false, message: result.message });
      store.showToast('success', result.message);
    } else {
      setDiscountPercent(0);
      setCouponApplied(false);
      setCouponFeedback({ isError: true, message: result.message });
    }
  };

  const handleRemoveItem = (id: string) => {
    store.removeFromCart(id);
    store.showToast('info', 'محصول از سبد خرید حذف شد.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-start" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">سبد خرید شما</h2>
            <span className="text-xs text-slate-400 font-mono">({cartItems.length} مورد)</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShoppingBag className="w-12 h-12 stroke-1 mb-3 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">سبد خرید شما خالی است</p>
              <p className="text-xs text-slate-400 mt-1">دوره‌ها و فایل‌های مورد نظرتان را به سبد اضافه کنید.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-12 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0 text-right">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{item.title}</h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {item.type === 'course' ? 'دوره ویدیویی' : `فایل (${item.fileFormat || 'ZIP'})`}
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono tabular-nums mt-1">
                    {item.price.toLocaleString('fa-IR')} تومان
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-4">
            {/* Coupon Code Section */}
            <div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="کد تخفیف (مانند: CCNA30 یا PARSNET20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-indigo-600 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  اعمال کد
                </button>
              </form>

              {couponFeedback.message && (
                <div className={`mt-2 text-[11px] flex items-center gap-1 ${
                  couponFeedback.isError ? 'text-red-500 font-medium' : 'text-emerald-600 font-bold'
                }`}>
                  {!couponFeedback.isError && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{couponFeedback.message}</span>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between">
                <span>مجموع مبالغ:</span>
                <span className="font-mono tabular-nums text-slate-900 dark:text-white">{rawTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {couponApplied && discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>تخفیف اعمال شده ({discountPercent}٪):</span>
                  <span className="font-mono tabular-nums">-{discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-base text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                  {finalTotal.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onProceedToCheckout(discountPercent)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>ادامه فرآیند خرید و پرداخت اینترنتی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>پرداخت امن از طریق درگاه رسمی شاپرک</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
