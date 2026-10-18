import React from 'react';
import { Terminal, ShieldCheck, Headphones, Award, Phone, Mail, MapPin, FileText, Globe } from 'lucide-react';
import { store } from '../services/store';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenSupabaseGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSupabaseGuide }) => {
  const settings = store.settings;

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 text-right selection:bg-indigo-500 selection:text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3 Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">کیفیت تضمین‌شده آموزش‌ها</h4>
              <p className="text-xs text-slate-400 mt-0.5">سناریوهای واقعی و تست شده در محیط‌های سازمانی</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">پرداخت امن و دانلود مستقیم</h4>
              <p className="text-xs text-slate-400 mt-0.5">اتصال به درگاه رسمی شاپرک و تحویل آنی فایل‌ها</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">پشتیبانی دائمی اساتید</h4>
              <p className="text-xs text-slate-400 mt-0.5">پاسخگویی تیکت و رفع اشکال در تمام مراحل یادگیری</p>
            </div>
          </div>
        </div>

        {/* Links & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12">
          {/* Brand & About */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">{settings.siteTitle}</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              آکادمی تخصصی پارس‌نت به عنوان مرجع یادگیری علوم کامپیوتر، سیسکو، میکروتیک، لینوکس و برنامه‌نویسی وب فرانت‌اند و بک‌اند با ارائه سورس‌کدهای آماده و پروژه‌های عملی به متخصصان کشور خدمت‌رسانی می‌کند.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenSupabaseGuide}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1.5"
              >
                <span>دیتابیس: Supabase PostgreSQL</span>
                <span>·</span>
                <span>استقرار: Vercel Ready</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">بخش‌های وب‌سایت</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  دوره‌های آموزش شبکه و سیسکو
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">
                  آموزش طراحی سایت و برنامه‌نویسی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('files')} className="hover:text-white transition-colors">
                  پکیج سناریوهای پکت‌تریسر و اسکریپت‌ها
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  نوشته‌ها، اطلاعیه‌ها و رویدادها
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-panel')} className="hover:text-white transition-colors">
                  ورود به پنل کاربری دانشجویان
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-panel')} className="hover:text-amber-400 transition-colors">
                  پیشخوان مدیریت وردپرس (مدیر)
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines, Terms & Sitemap */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">راهنما و مقررات</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  درباره ما و اساتید
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  تماس با ما و مشاوره
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  قوانین و دستورالعمل‌ها
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">
                  حفظ حریم خصوصی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="hover:text-indigo-400 transition-colors">
                  نقشه کامل سایت (Sitemap)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">تماس با آکادمی</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-mono tabular-nums">{settings.supportPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-mono">{settings.supportEmail}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            تمامی حقوق مادی و معنوی برای <strong>آکادمی پارس‌نت</strong> محفوظ است.
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Powered by React 19, Supabase & Vercel
          </div>
        </div>
      </div>
    </footer>
  );
};
