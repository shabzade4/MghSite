import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Scale, 
  MapPin, 
  Phone, 
  User, 
  FileText, 
  ShieldCheck, 
  Printer, 
  ArrowRight,
  Snowflake,
  Clock,
  Wallet
} from 'lucide-react';
import { 
  OrganicCartItem, 
  OrganicShippingMethodId, 
  OrganicPaymentMethod, 
  OrganicOrder 
} from '../types';
import { store, INITIAL_ORGANIC_SHIPPING_METHODS } from '../services/store';

interface OrganicCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: OrganicCartItem[];
  currentUserWalletBalance?: number;
}

export const OrganicCartModal: React.FC<OrganicCartModalProps> = ({
  isOpen,
  onClose,
  cart,
  currentUserWalletBalance = 0
}) => {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  
  // Shipping Form
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [shippingMethod, setShippingMethod] = useState<OrganicShippingMethodId>('post_pishtaz');

  // Payment Form
  const [paymentMethod, setPaymentMethod] = useState<OrganicPaymentMethod>('online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<OrganicOrder | null>(null);

  if (!isOpen) return null;

  // Totals calculation
  const subtotal = cart.reduce((acc, item) => {
    const price = item.selectedPackage?.discountPrice || item.selectedPackage?.price || item.unitPrice || 0;
    return acc + price * item.quantity;
  }, 0);

  const totalWeightGrams = cart.reduce((acc, item) => {
    const w = item.selectedPackage?.weightInGrams || item.selectedPackage?.weightGrams || item.weightGrams || 500;
    return acc + w * item.quantity;
  }, 0);

  const totalWeightKg = (totalWeightGrams / 1000).toFixed(2);

  const selectedShippingObj = INITIAL_ORGANIC_SHIPPING_METHODS.find(m => m.id === shippingMethod) || INITIAL_ORGANIC_SHIPPING_METHODS[0];
  const shippingCost = selectedShippingObj?.price || selectedShippingObj?.cost || 45000;
  const grandTotal = subtotal + shippingCost;

  // Handlers
  const handleQuantity = (itemId: string, currentQty: number, delta: number) => {
    store.updateOrganicCartQuantity(itemId, currentQty + delta);
  };

  const handleRemove = (itemId: string) => {
    store.removeFromOrganicCart(itemId);
  };

  const handleProceedToShipping = () => {
    if (cart.length === 0) return;
    setStep('shipping');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address || !postalCode) {
      alert('لطفاً تمامی فیلدهای الزامی آدرس و مشخصات تحویل گیرنده را تکمیل نمایید.');
      return;
    }
    setStep('payment');
  };

  const handleSubmitOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const order = store.createOrganicOrder({
        customerName,
        customerPhone,
        province,
        city,
        postalCode,
        address,
        notes,
        shippingMethod,
        paymentMethod
      });
      setSubmittedOrder(order);
      setIsSubmitting(false);
      setStep('success');
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-sm animate-fade-in text-right">
      <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50/50 dark:bg-stone-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-white">
                سبد خرید و سفارش محصولات ارگانیک
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                مستقیم از باغات دستچین ایران
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step !== 'success' && (
          <div className="grid grid-cols-3 border-b border-stone-100 dark:border-stone-800 text-xs font-bold text-center bg-stone-50 dark:bg-stone-950/30">
            <div className={`py-3 flex items-center justify-center gap-1.5 ${step === 'cart' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white dark:bg-stone-900' : 'text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-600/10 flex items-center justify-center text-[10px]">۱</span>
              <span>سبد خرید</span>
            </div>
            <div className={`py-3 flex items-center justify-center gap-1.5 ${step === 'shipping' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white dark:bg-stone-900' : 'text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-600/10 flex items-center justify-center text-[10px]">۲</span>
              <span>آدرس و روش ارسال</span>
            </div>
            <div className={`py-3 flex items-center justify-center gap-1.5 ${step === 'payment' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-white dark:bg-stone-900' : 'text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-emerald-600/10 flex items-center justify-center text-[10px]">۳</span>
              <span>تسویه و پرداخت</span>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          
          {/* STEP 1: CART ITEMS */}
          {step === 'cart' && (
            <div>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-stone-800 dark:text-stone-200 mb-1">
                    سبد خرید ارگانیک شما خالی است
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
                    می‌توانید از بخش محصولات ارگانیک، گردو، فندق، زغال اخته، لوبیا یا سایر اقلام را انتخاب نمایید.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                  >
                    بازگشت به فروشگاه ارگانیک
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => {
                    const price = item.selectedPackage?.discountPrice || item.selectedPackage?.price || item.unitPrice || 0;
                    const prodImg = item.product?.image || item.image || '';
                    const prodName = item.product?.name || item.product?.title || item.title || 'محصول ارگانیک';
                    const pkgLabel = item.selectedPackage?.weightLabel || item.weightLabel || 'بسته استاندارد';
                    const prodOrigin = item.product?.originRegion || 'باغات ایران';
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80"
                      >
                        <img
                          src={prodImg}
                          alt={prodName}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white truncate">
                            {prodName}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] px-2 py-0.5 rounded-md font-semibold">
                              بسته {pkgLabel}
                            </span>
                            <span className="text-[11px] text-stone-500 dark:text-stone-400">
                              {prodOrigin}
                            </span>
                          </div>
                          <div className="mt-2 text-xs font-extrabold text-stone-900 dark:text-stone-100">
                            {price.toLocaleString('fa-IR')} <span className="text-[10px] font-normal text-stone-500">تومان</span>
                          </div>
                        </div>

                        {/* Quantity & Delete */}
                        <div className="flex flex-col items-end justify-between gap-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-stone-400 hover:text-rose-500 p-1 cursor-pointer transition"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg bg-white dark:bg-stone-800">
                            <button
                              onClick={() => handleQuantity(item.id, item.quantity, 1)}
                              className="w-6 h-6 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-r-lg font-bold"
                            >
                              +
                            </button>
                            <span className="w-7 text-center text-xs font-bold">
                              {item.quantity.toLocaleString('fa-IR')}
                            </span>
                            <button
                              onClick={() => handleQuantity(item.id, item.quantity, -1)}
                              className="w-6 h-6 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-l-lg font-bold"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Summary Bar */}
                  <div className="bg-stone-100/70 dark:bg-stone-800/40 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                    <div className="flex justify-between text-stone-600 dark:text-stone-300">
                      <span className="flex items-center gap-1">
                        <Scale className="w-4 h-4 text-emerald-600" />
                        وزن کل محموله ارگانیک:
                      </span>
                      <span className="font-bold text-stone-900 dark:text-white">
                        {totalWeightKg} کیلوگرم ({totalWeightGrams.toLocaleString('fa-IR')} گرم)
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-600 dark:text-stone-300">
                      <span>مجموع مبالغ محصولات:</span>
                      <span className="font-bold text-stone-900 dark:text-white">
                        {subtotal.toLocaleString('fa-IR')} تومان
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING & RECIPIENT */}
          {step === 'shipping' && (
            <form id="shipping-form" onSubmit={handleProceedToPayment} className="space-y-5">
              
              {/* Recipient Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>مشخصات تحویل گیرنده</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">نام و نام خانوادگی *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: محمد امینی"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">شماره همراه (برای پیگیری پیامکی) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs focus:ring-2 focus:ring-emerald-500 text-left"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>نشانی پستی محل تحویل</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">استان *</label>
                    <input
                      type="text"
                      required
                      placeholder="تهران"
                      value={province}
                      onChange={e => setProvince(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">شهر *</label>
                    <input
                      type="text"
                      required
                      placeholder="تهران"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">کد پستی ۱۰ رقمی *</label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      placeholder="۱۹۹۸۸۸۷۷۶۶"
                      value={postalCode}
                      onChange={e => setPostalCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">نشانی کامل پستی (خیابان، کوچه، پلاک، واحد) *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="خیابان ولیعصر، بالاتر از پارک وی، کوچه مروارید، پلاک ۱۲، واحد ۴"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">توضیحات و هماهنگی زمان تحویل (اختیاری)</label>
                  <input
                    type="text"
                    placeholder="مثال: تحویل عصرها بعد از ساعت ۱۶ یا تحویل به نگهبانی"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs"
                  />
                </div>
              </div>

              {/* Shipping Method Selection */}
              <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>انتخاب روش ارسال متناسب با نوع محصول</span>
                  </span>
                  <span className="text-[11px] text-emerald-600 font-semibold">بسته‌بندی ضربه‌گیر رایگان</span>
                </h4>

                <div className="space-y-2">
                  {INITIAL_ORGANIC_SHIPPING_METHODS.map(method => {
                    const isSelected = shippingMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setShippingMethod(method.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                            : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'}`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-stone-900 dark:text-white">{method.title}</span>
                              {method.isColdChain && (
                                <span className="bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
                                  <Snowflake className="w-3 h-3" />
                                  یخ‌دان و حفظ تازگی
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{method.description}</p>
                          </div>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-xs font-black text-stone-900 dark:text-white">
                            {(method.price || method.cost || 0).toLocaleString('fa-IR')}
                          </span>
                          <span className="text-[10px] text-stone-500 block">تومان</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </form>
          )}

          {/* STEP 3: PAYMENT & CONFIRMATION */}
          {step === 'payment' && (
            <div className="space-y-5">
              
              {/* Order Quick Review */}
              <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs space-y-2">
                <div className="flex justify-between font-bold text-stone-900 dark:text-white pb-2 border-b border-stone-200 dark:border-stone-700">
                  <span>خلاصه فاکتور ارگانیک:</span>
                  <span>{cart.length} ردیف کالا ({totalWeightKg} کیلو)</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>جمع اقلام:</span>
                  <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>روش ارسال ({selectedShippingObj.title}):</span>
                  <span>{shippingCost.toLocaleString('fa-IR')} تومان</span>
                </div>
                <div className="flex justify-between font-black text-sm text-emerald-600 dark:text-emerald-400 pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span>مبلغ کل قابل پرداخت:</span>
                  <span>{grandTotal.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              {/* Recipient Snapshot */}
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-900 dark:text-amber-200 space-y-1">
                <div><strong>تحویل به:</strong> {customerName} ({customerPhone})</div>
                <div><strong>آدرس:</strong> {province}، {city}، {address} (کدپستی: {postalCode})</div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>شیوه پرداخت مبلغ سفارش</span>
                </h4>

                <div className="space-y-2">
                  {/* Online IPG */}
                  <label
                    onClick={() => setPaymentMethod('online')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'online'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'online' ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'}`}>
                        {paymentMethod === 'online' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-white">درگاه مستقیم اینترنتی شتاب (سامان / زرین‌پال)</div>
                        <div className="text-[11px] text-stone-500">پرداخت امن با کلیه کارت‌های عضو شتاب به همراه رمز پویا</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">فوری</span>
                  </label>

                  {/* Card to Card */}
                  <label
                    onClick={() => setPaymentMethod('card_to_card')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'card_to_card'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card_to_card' ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'}`}>
                        {paymentMethod === 'card_to_card' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-white">انتقال کارت به کارت / پایا بانکی</div>
                        <div className="text-[11px] text-stone-500">انتقال به شماره کارت تعاونی باغداران و ثبت فیش واریزی</div>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'}`}>
                        {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-white">پرداخت در محل (کارتخوان هنگام تحویل)</div>
                        <div className="text-[11px] text-stone-500">پرداخت نقدی یا با کارتخوان مامور ارسال پس از رؤیت مرسوله</div>
                      </div>
                    </div>
                  </label>

                  {/* Internal Wallet */}
                  <label
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      paymentMethod === 'wallet'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                        : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'wallet' ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'}`}>
                        {paymentMethod === 'wallet' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                          <Wallet className="w-3.5 h-3.5 text-amber-500" />
                          <span>کسر از موجودی کیف پول سایت</span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          موجودی حساب کاربری شما: {currentUserWalletBalance.toLocaleString('fa-IR')} تومان
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS INVOICE */}
          {step === 'success' && submittedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-stone-900 dark:text-white mb-1">
                  سفارش ارگانیک شما با موفقیت ثبت شد!
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  مرسوله شما وارد چرخه بسته‌بندی ویژه و ارسال مستقیم گردید.
                </p>
              </div>

              {/* Official Receipt Box */}
              <div className="bg-stone-50 dark:bg-stone-800/70 p-5 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs text-right space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500 dark:text-stone-400">کد رهگیری اختصاصی سفارش:</span>
                  <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">{submittedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 dark:text-stone-400">گیرنده:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{submittedOrder.customerName} ({submittedOrder.customerPhone})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 dark:text-stone-400">شیوه ارسال:</span>
                  <span className="font-bold text-stone-900 dark:text-white">{submittedOrder.shippingTitle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 dark:text-stone-400">روش پرداخت:</span>
                  <span className="font-bold text-stone-900 dark:text-white">
                    {submittedOrder.paymentMethod === 'online' ? 'آنلاین شتاب (پرداخت شد)' :
                     submittedOrder.paymentMethod === 'card_to_card' ? 'کارت به کارت' :
                     submittedOrder.paymentMethod === 'cod' ? 'پرداخت در محل هنگام تحویل' : 'کیف پول'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span className="text-stone-500 dark:text-stone-400">مبلغ کل فاکتور:</span>
                  <span className="font-black text-base text-stone-900 dark:text-white">{(submittedOrder.totalAmount || submittedOrder.totalPayable || 0).toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-stone-100 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ فاکتور رسمی سفارش</span>
                </button>
                <button
                  onClick={() => {
                    setStep('cart');
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ادامه خرید از فروشگاه ارگانیک</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {step !== 'success' && (
          <div className="p-4 sm:p-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-800/30">
            {step === 'cart' ? (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-stone-600 dark:text-stone-400 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                انصراف و بستن
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(step === 'payment' ? 'shipping' : 'cart')}
                className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>
            )}

            {step === 'cart' && (
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={handleProceedToShipping}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>ادامه فرآیند خرید (آدرس و ارسال)</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {step === 'shipping' && (
              <button
                type="submit"
                form="shipping-form"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <span>انتخاب شیوه پرداخت و تسویه</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {step === 'payment' && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitOrder}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>در حال ثبت نهایی سفارش...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تایید نهایی و پرداخت فاکتور ({grandTotal.toLocaleString('fa-IR')} تومان)</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
