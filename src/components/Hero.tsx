import React from 'react';
import { Search, ShieldCheck, Cpu, Code2, Server, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
  onNavigate?: (tab: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  selectedCategory,
  onNavigate
}) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background with measured contrast scrim and generated hero image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_tech_academy_1791894522996.jpg"
          alt="Mehradinet Engineering & Academy"
          className="w-full h-full object-cover opacity-25 filter blur-[0.5px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-3xl">
          {/* Subtle text kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-400 font-mono tracking-wide mb-4">
            <span className="font-bold text-white">مهرادینت (Mehradinet)</span>
            <span aria-hidden="true">·</span>
            <span>آموزش تخصصی شبکه، وب، برنامه‌نویسی و انجام پروژه‌های کامپیوتری</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-5" style={{ textWrap: 'balance' }}>
            آموزش تخصصی مهارت‌های IT و اجرای حرفه‌ای پروژه‌های شبکه و برنامه‌نویسی
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl font-light">
            یادگیری اصولی سیسکو، میکروتیک، ویندوز/لینوکس سرور، مجازی‌سازی و ری‌اکت ۱۹ به همراه خدمات مهندسی و قبول پروژه‌های کابل‌کشی پسیو، کانفیگ اکتیو، طراحی وب‌سایت و توسعه نرم‌افزارهای سفارشی.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {onNavigate && (
              <button
                onClick={() => onNavigate('projects-services')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Server className="w-4 h-4" />
                <span>سفارش و ثبت پروژه کامپیوتری و شبکه</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}

            {onNavigate && (
              <button
                onClick={() => onNavigate('courses')}
                className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                مشاهده دوره‌های آموزشی
              </button>
            )}
          </div>

          {/* Search box */}
          <div className="relative max-w-xl mb-8">
            <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 focus-within:border-indigo-400 focus-within:bg-white/15 transition-all shadow-xl">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="جستجو در بین دوره‌ها، سناریوهای پکت‌تریسر، اسکریپت‌ها..."
                className="w-full bg-transparent border-none text-white placeholder-slate-400 text-sm focus:outline-none px-2 py-2"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1"
                >
                  پاک کردن
                </button>
              )}
            </div>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 ml-2">دسته‌بندی‌ها:</span>
            {[
              { id: 'all', label: 'همه آموزش‌ها و فایل‌ها' },
              { id: 'network', label: 'سیسکو و شبکه' },
              { id: 'web', label: 'طراحی سایت و وب' },
              { id: 'devops', label: 'لینوکس و دواپس' },
              { id: 'files', label: 'فایل‌ها و سناریوها' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4-column metric strip placed in full-width row below hero split */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">+۱۸۰</div>
            <div className="text-xs text-slate-400 mt-1">ساعت ویدیوی آموزشی باکیفیت</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">+۳,۵۰۰</div>
            <div className="text-xs text-slate-400 mt-1">دانشجوی فعال و فارغ‌التحصیل</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">+۱۲۰</div>
            <div className="text-xs text-slate-400 mt-1">سناریوی شبکه و فایل قابل دانلود</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">۱۰۰٪</div>
            <div className="text-xs text-slate-400 mt-1">پاسخگویی تیکت و مشاوره مدرس</div>
          </div>
        </div>
      </div>
    </div>
  );
};
