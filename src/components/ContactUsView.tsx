import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Building,
  CreditCard,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { store } from '../services/store';

export const ContactUsView: React.FC = () => {
  const settings = store.settings;

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('مشاوره ثبت‌نام در دوره‌ها');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      store.addContactMessage({
        name,
        email,
        phone,
        subject,
        message
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');

      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    }, 400);
  };

  const faqs = [
    {
      q: 'آیا فایل‌های دانلودی و سناریوها بلافاصله پس از پرداخت تحویل داده می‌شوند؟',
      a: 'بله، پس از تکمیل فرآیند پرداخت اینترنتی از طریق شاپرک یا زرین‌پال، لینک دانلود اختصاصی بلافاصله در پنل کاربری بخش «دانلودها» فعال خواهد شد و به ایمیل شما نیز ارسال می‌گردد.'
    },
    {
      q: 'آیا دوره‌ها دارای مدرک یا گواهینامه پایان دوره هستند؟',
      a: 'پس از اتمام تمام جلسات دوره و ارسال تمرین‌ها و سناریوهای عملی توسط دانشجو در سیستم تیکت، گواهی رسمی اتمام دوره به صورت دوزبانه (فارسی و انگلیسی) صادر می‌گردد.'
    },
    {
      q: 'پشتیبانی فنی و رفع اشکال به چه صورت انجام می‌شود؟',
      a: 'کلیه دوره‌ها دارای پشتیبانی دائمی تیکتی هستند. در پنل کاربری می‌توانید تیکت ارسال کنید و مدرس دوره حداکثر تا ۲۴ ساعت کاری به سوالات شما پاسخ می‌دهد.'
    },
    {
      q: 'آیا امکان صدور پیش‌فاکتور رسمی برای سازمان‌ها و شرکت‌ها وجود دارد؟',
      a: 'بله، شرکت‌ها و سازمان‌ها می‌توانند جهت درخواست فاکتور رسمی و خرید گروهی لایسنس دوره‌ها از طریق فرم تماس یا شماره تلفن آکادمی با واحد مالی هماهنگ نمایند.'
    }
  ];

  return (
    <div className="space-y-16 pb-16" dir="rtl">
      {/* Sub-header Banner */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="text-xs text-indigo-400 font-mono">SUPPORT & PROJECT CONSULTATION</div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            ارتباط با کارشناسان مهندسی و پشتیبانی مهرادینت
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-light">
            همواره پاسخگوی سوالات، مشاوره ثبت‌نام دوره‌ها و برآورد فنی پروژه‌های شبکه و برنامه‌نویسی شما هستیم.
          </p>

        </div>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column: Contact Details Cards (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                راه‌های ارتباطی مستقیم
              </h2>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-slate-400 font-normal">شماره تماس ثابت</div>
                    <a
                      href={`tel:${settings.supportPhone.replace(/[^0-9]/g, '')}`}
                      className="text-sm font-bold text-slate-900 hover:text-indigo-600 font-mono tabular-nums block"
                    >
                      {settings.supportPhone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-slate-400 font-normal">پست الکترونیکی پشتیبانی</div>
                    <a
                      href={`mailto:${settings.supportEmail}`}
                      className="text-sm font-bold text-slate-900 hover:text-cyan-600 font-mono block"
                    >
                      {settings.supportEmail}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-slate-400 font-normal">نشانی دفتر مرکزی و لابراتوار</div>
                    <div className="text-xs font-medium text-slate-800 leading-relaxed">
                      {settings.address}
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-slate-400 font-normal">ساعات کاری و پاسخگویی تلفنی</div>
                    <div className="text-xs font-medium text-slate-800 leading-relaxed font-mono">
                      {settings.workHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">کانال تلگرام:</span>
                <span className="font-mono font-bold text-indigo-600">@{settings.telegramUsername}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">صفحه اینستاگرام:</span>
                <span className="font-mono font-bold text-pink-600">@{settings.instagramUsername}</span>
              </div>
            </div>

            {/* Corporate / Banking Info */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <CreditCard className="w-4 h-4" />
                <span>اطلاعات حساب بانکی و پرداخت سازمانی</span>
              </div>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">بانک:</span>
                  <span className="text-white font-bold">ملت (شعبه مرکزی)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">به نام:</span>
                  <span className="text-white font-bold">آکادمی فناوری و شبکه پارس‌نت</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">شماره شبا:</span>
                  <span className="text-amber-300 font-mono text-[11px]" dir="ltr">IR12 0120 0000 0000 1234 5678 90</span>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Direct Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-indigo-600 text-xs font-bold mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>فرم ارسال پیام و درخواست مشاوره</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                پیام خود را برای ما ارسال کنید
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                تیم پشتیبانی ما حداکثر ظرف چند ساعت کاری پیام شما را بررسی و پاسخ خواهند داد.
              </p>
            </div>

            {isSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">پیام شما با موفقیت ثبت شد!</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">کارشناسان ما به زودی از طریق ایمیل یا شماره تماس با شما ارتباط خواهند گرفت.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    نام و نام خانوادگی <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: علی احمدی"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    شماره موبایل
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    پست الکترونیکی (ایمیل) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    موضوع پیام
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="مشاوره ثبت‌نام در دوره‌ها">مشاوره ثبت‌نام در دوره‌ها</option>
                    <option value="درخواست سناریو یا فایل اختصاصی">درخواست سناریو یا فایل اختصاصی</option>
                    <option value="برگزاری دوره سازمانی برای شرکت‌ها">برگزاری دوره سازمانی برای شرکت‌ها</option>
                    <option value="پیشنهاد همکاری یا تدریس">پیشنهاد همکاری یا تدریس</option>
                    <option value="پشتیبانی مالی و فاکتور">پشتیبانی مالی و فاکتور</option>
                    <option value="سایر موضوعات">سایر موضوعات</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  متن پیام یا شرح درخواست <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="لطفاً پیام، سوال یا نیازمندی‌های خود را به صورت کامل شرح دهید..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>در حال ارسال پیام...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>ارسال نهایی پیام</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map & Office Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">موقعیت مکانی و دسترسی مترو</h3>
              <p className="text-xs text-slate-400 mt-0.5">تهران، خیابان شریعتی - دسترسی آسان از طریق ایستگاه مترو شهید بهشتی و شهید قدوسی</p>
            </div>
            <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              مختصات: 35.7284° N, 51.4398° E
            </div>
          </div>

          <div className="h-64 sm:h-80 bg-slate-100 relative flex items-center justify-center overflow-hidden">
            {/* Interactive styled schematic map display */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] bg-slate-50" />
            
            <div className="relative z-10 text-center space-y-3 p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl max-w-md mx-4">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">دفتر مرکزی و مرکز داده آکادمی پارس‌نت</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                {settings.address}
              </p>
              <div className="pt-2 text-[11px] text-indigo-600 font-bold">
                جهت مراجعه حضوری، هماهنگی قبلی الزامی است.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 text-indigo-600 text-xs font-bold mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>پاسخ به پرسش‌های پرتکرار</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900">سوالات متداول دانشجویان</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed font-light border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
