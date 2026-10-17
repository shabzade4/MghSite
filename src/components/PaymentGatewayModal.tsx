import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, CreditCard, RefreshCw, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Order, OrderItem } from '../types';
import { store } from '../services/store';

interface PaymentGatewayModalProps {
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  payableAmount: number;
  onSuccess: (order: Order) => void;
  onCancel: () => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  items,
  totalAmount,
  discountAmount,
  payableAmount,
  onSuccess,
  onCancel
}) => {
  const [cardNumber, setCardNumber] = useState('6037-9918-4523-8820');
  const [cvv2, setCvv2] = useState('482');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [otp, setOtp] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaVal, setCaptchaVal] = useState('7492');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // OTP Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setOtpSent(false);
      setOtpTimer(120);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpTimer(120);
    setOtp('842915'); // Auto-simulate OTP delivery
  };

  const refreshCaptcha = () => {
    const random = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaVal(random);
    setCaptcha('');
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cardNumber.replace(/\D/g, '').length !== 16) {
      setErrorMessage('شماره کارت باید ۱۶ رقم باشد.');
      return;
    }
    if (!cvv2 || cvv2.length < 3) {
      setErrorMessage('کد CVV2 را وارد نمایید.');
      return;
    }
    if (!otp) {
      setErrorMessage('لطفاً رمز دوم پویا را دریافت و وارد نمایید.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedRefId = 'ZP-' + Math.floor(1000000000 + Math.random() * 9000000000);
      const orderNumber = 'PN-' + Math.floor(10000 + Math.random() * 90000);

      const order: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        userId: store.currentUser.id,
        userName: store.currentUser.name,
        userPhone: store.currentUser.phone,
        userEmail: store.currentUser.email,
        items,
        totalAmount,
        discountAmount,
        payableAmount,
        status: 'completed',
        gateway: 'zarinpal',
        refId: generatedRefId,
        cardNumber: cardNumber.slice(0, 4) + '-****-****-' + cardNumber.slice(-4),
        createdAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
      };

      store.createOrder(order);
      onSuccess(order);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-slate-50 border border-slate-300 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col text-slate-800">
        {/* Gateway Official Shaparak Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-white shadow-inner">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base font-black">درگاه پرداخت الکترونیک زرین‌پال</div>
              <div className="text-[11px] text-amber-100 font-mono">متصل به شبکه پرداخت الکترونیک شاپرک (SHEPAB)</div>
            </div>
          </div>
          <div className="text-left font-mono text-xs">
            <div className="text-amber-100">پذیرنده:</div>
            <div className="font-bold">آکادمی پارس‌نت</div>
          </div>
        </div>

        {/* Invoice Brief Box */}
        <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">مبلغ قابل پرداخت:</span>
            <div className="text-base font-black text-indigo-700 font-mono tabular-nums mt-0.5">
              {payableAmount.toLocaleString('fa-IR')}{' '}
              <span className="text-xs font-normal text-slate-500">تومان</span>
            </div>
          </div>
          <div className="text-left font-mono text-[11px] text-slate-500">
            <div>ترمینال: ۹۸۴۲۱۰۰۴</div>
            <div>کد پذیرنده: ZP-289412</div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePay} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Card Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">شماره کارت ۱۶ رقمی</label>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength={19}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-base tracking-widest text-center text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />
              <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* CVV2 and Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">کد شناسایی دوم (CVV2)</label>
              <input
                type="password"
                dir="ltr"
                value={cvv2}
                onChange={(e) => setCvv2(e.target.value)}
                maxLength={4}
                placeholder="***"
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-center text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">تاریخ انقضای کارت</label>
              <div className="flex items-center gap-2" dir="ltr">
                <input
                  type="text"
                  maxLength={2}
                  value={expMonth}
                  onChange={(e) => setExpMonth(e.target.value)}
                  placeholder="ماه"
                  className="w-1/2 px-2 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-center text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                />
                <span className="text-slate-400 font-bold">/</span>
                <input
                  type="text"
                  maxLength={2}
                  value={expYear}
                  onChange={(e) => setExpYear(e.target.value)}
                  placeholder="سال"
                  className="w-1/2 px-2 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-center text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Dynamic OTP (رمز پویا) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">رمز دوم پویا</label>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpSent && otpTimer > 0}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:text-slate-400 transition-colors"
              >
                {otpSent ? `ارسال مجدد (${otpTimer} ثانیه)` : 'دریافت رمز پویا پیامکی'}
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                dir="ltr"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={8}
                placeholder="رمز ارسال شده به شماره همراه"
                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl font-mono text-center text-slate-900 focus:outline-none focus:border-indigo-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Security Captcha */}
          <div className="grid grid-cols-2 gap-4 items-center pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">کد امنیتی</label>
              <input
                type="text"
                dir="ltr"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                placeholder="کد روبرو"
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl font-mono text-center text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 bg-slate-200 border border-slate-300 font-mono text-lg font-black tracking-widest text-slate-700 text-center py-1.5 rounded-xl select-none line-through">
                {captchaVal}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200"
                title="تغییر کد"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buttons: Pay vs Cancel */}
          <div className="pt-4 space-y-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>در حال اعتبارسنجی تراکنش بانکی...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>پرداخت و نهایی‌سازی سفارش</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              انصراف از پرداخت و بازگشت به سایت
            </button>
          </div>

          <div className="text-center text-[11px] text-slate-400 pt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>گواهینامه امنیت SSL و رمزنگاری ۲۵۶ بیتی شاپرک</span>
          </div>
        </form>
      </div>
    </div>
  );
};
