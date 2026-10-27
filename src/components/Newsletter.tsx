import React, { useState } from 'react';
import { 
  Mail, Send, CheckCircle2, ShieldCheck, Sparkles, 
  Terminal, Leaf, Tag, Bell, Gift, ArrowLeft
} from 'lucide-react';
import { NewsletterTopic } from '../types';
import { store } from '../services/store';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<NewsletterTopic[]>([
    'tech_updates',
    'organic_offers',
    'course_discounts'
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubscribedEmail, setLastSubscribedEmail] = useState('');

  // Toggle topics
  const toggleTopic = (topic: NewsletterTopic) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(t => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      store.addToast({
        id: `err-${Date.now()}`,
        type: 'error',
        title: 'ایمیل نامعتبر',
        message: 'لطفاً یک آدرس ایمیل معتبر (مانند user@example.com) وارد نمایید.'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = store.subscribeNewsletter(email, selectedTopics, name);
      setIsSubmitting(false);
      if (res.success) {
        setLastSubscribedEmail(email.trim().toLowerCase());
        setIsSuccess(true);
        setEmail('');
        setName('');
      }
    }, 400);
  };

  return (
    <section className="py-14 select-none relative overflow-hidden" id="newsletter-section" dir="rtl">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/2 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden">
          
          {/* Subtle grid pattern backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left/Main Column: Heading & Value Proposition */}
            <div className="lg:col-span-6 space-y-5 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono">
                <Bell className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>خبرنامه اختصاصی فناوری، شبکه و تغذیه سالم مهرادینت</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug tracking-tight">
                اولین نفری باشید که از سناریوهای جدید و نوبرانه‌های تازه باخبر می‌شود!
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                با عضویت در خبرنامه هفتگی مهرادینت، مقالات کاربردی مهندسی شبکه (Cisco و Linux)، سناریوهای شبیه‌ساز، تخفیف‌های مناسبتی دوره‌ها و نوبرانه‌های ارگانیک فصل (گردو، فندق، عسل و زغال‌اخته) را مستقیماً در صندوق ورودی ایمیل خود دریافت کنید.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-115 group-hover:bg-indigo-500/30 group-hover:text-indigo-300 flex items-center justify-center shrink-0 transition-all">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">آموزش و سناریو</div>
                    <div className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">نکات تخصصی IT</div>
                  </div>
                </div>

                <div className="group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-115 group-hover:bg-emerald-500/30 group-hover:text-emerald-300 flex items-center justify-center shrink-0 transition-all">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors">محصولات ارگانیک</div>
                    <div className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">اطلاعیه فصل برداشت</div>
                  </div>
                </div>

                <div className="group p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 group-hover:scale-115 group-hover:bg-amber-500/30 group-hover:text-amber-300 flex items-center justify-center shrink-0 transition-all">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors">تخفیف‌های ویژه</div>
                    <div className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors">کدهای انحصاری</div>
                  </div>
                </div>
              </div>

              {/* Community counter */}
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <div className="flex -space-x-2 overflow-hidden rtl:space-x-reverse">
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="عضو خبرنامه" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="عضو خبرنامه" />
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" alt="عضو خبرنامه" />
                </div>
                <span>بیش از <strong className="text-indigo-300 font-mono font-bold">+۲,۸۴۰</strong> نفر از مهندسان و همراهان عضو هستند</span>
              </div>
            </div>

            {/* Right Column: Interactive Subscription Box */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-slate-700/80 p-5 sm:p-7 shadow-xl text-right">
                
                {isSuccess ? (
                  <div className="py-8 text-center space-y-4 animate-fade-in">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        عضویت شما با موفقیت ثبت گردید!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed font-light">
                        به خانواده بزرگ مهرادینت خوش آمدید. جدیدترین به‌روزرسانی‌ها به آدرس <strong className="text-indigo-300 font-mono">{lastSubscribedEmail}</strong> ارسال خواهند شد.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsSuccess(false)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium cursor-pointer"
                      >
                        ثبت ایمیل دیگر یا ویرایش علاقه‌مندی‌ها
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-white">انتخاب موضوعات مورد علاقه:</span>
                      <span className="text-[11px] text-slate-400">حداقل ۱ مورد</span>
                    </div>

                    {/* Topic Selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => toggleTopic('tech_updates')}
                        className={`p-2.5 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                          selectedTopics.includes('tech_updates')
                            ? 'bg-indigo-600/30 border-indigo-400 text-white'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] ${
                          selectedTopics.includes('tech_updates') ? 'bg-indigo-500 text-white' : 'border border-slate-600'
                        }`}>
                          {selectedTopics.includes('tech_updates') && '✓'}
                        </div>
                        <span className="text-xs font-bold truncate">پروژه و شبکه</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTopic('organic_offers')}
                        className={`p-2.5 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                          selectedTopics.includes('organic_offers')
                            ? 'bg-emerald-600/30 border-emerald-400 text-white'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] ${
                          selectedTopics.includes('organic_offers') ? 'bg-emerald-500 text-white' : 'border border-slate-600'
                        }`}>
                          {selectedTopics.includes('organic_offers') && '✓'}
                        </div>
                        <span className="text-xs font-bold truncate">محصولات ارگانیک</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTopic('course_discounts')}
                        className={`p-2.5 rounded-xl border text-right transition-all flex items-center gap-2 cursor-pointer ${
                          selectedTopics.includes('course_discounts')
                            ? 'bg-amber-600/30 border-amber-400 text-white'
                            : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] ${
                          selectedTopics.includes('course_discounts') ? 'bg-amber-500 text-white' : 'border border-slate-600'
                        }`}>
                          {selectedTopics.includes('course_discounts') && '✓'}
                        </div>
                        <span className="text-xs font-bold truncate">تخفیف دوره‌ها</span>
                      </button>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          نام شما (اختیاری):
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="مثال: مهندس حسینی"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-indigo-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">
                          آدرس ایمیل شما *
                        </label>
                        <div className="relative flex items-center">
                          <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            className="w-full pr-10 pl-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all text-left"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>در حال ثبت عضویت...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>عضویت رایگان در خبرنامه مهرادینت</span>
                        </>
                      )}
                    </button>

                    {/* Trust and privacy disclaimer */}
                    <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>حفظ ۱۰۰٪ حریم خصوصی • بدون هرزنامه • لغو اشتراک در هر زمان با یک کلیک</span>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
