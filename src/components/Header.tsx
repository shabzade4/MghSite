import React from 'react';
import { ShoppingCart, User, LayoutDashboard, Sparkles, BookOpen, Download, Terminal, Settings } from 'lucide-react';
import { store } from '../services/store';

interface HeaderProps {
  currentTab: 'home' | 'courses' | 'files' | 'blog' | 'student-panel' | 'admin-panel';
  onNavigate: (tab: 'home' | 'courses' | 'files' | 'blog' | 'student-panel' | 'admin-panel') => void;
  onOpenCart: () => void;
  onOpenSupabaseGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenCart,
  onOpenSupabaseGuide
}) => {
  const [cartCount, setCartCount] = React.useState(store.cart.length);
  const currentUser = store.currentUser;

  React.useEffect(() => {
    return store.subscribe(() => {
      setCartCount(store.cart.length);
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-medium">تخفیف ویژه دوره‌های شبکه و وب:</span>
            <span>تا ۳۰٪ تخفیف روی دوره‌های سیسکو، میکروتیک و ری‌اکت ۱۹</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSupabaseGuide}
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>اتصال Supabase و استقرار Vercel</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="tabular-nums font-mono text-slate-400">پشتیبانی: ۰۲۱-۸۸۴۵۶۷۸۹</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-right group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>پارس‌نت</span>
                <span className="text-xs font-mono font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">ACADEMY</span>
              </div>
              <div className="text-[11px] text-slate-500 font-normal">آموزش تخصصی شبکه، وب و فایل‌های IT</div>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap py-1 relative ${
                currentTab === 'home' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              صفحه اصلی
              {currentTab === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('courses')}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap py-1 relative ${
                currentTab === 'courses' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              دوره‌های آموزشی
              {currentTab === 'courses' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('files')}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap py-1 relative ${
                currentTab === 'files' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              محصولات و سناریوها
              {currentTab === 'files' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => onNavigate('blog')}
              className={`hover:text-indigo-600 transition-colors whitespace-nowrap py-1 relative ${
                currentTab === 'blog' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              مقالات تخصصی
              {currentTab === 'blog' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          </nav>

          {/* Zone 3: Actions (Cart & Panels) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
              title="سبد خرید"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Student Panel Button */}
            <button
              onClick={() => onNavigate('student-panel')}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl flex items-center gap-2 border transition-all ${
                currentTab === 'student-panel'
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">پنل کاربری</span>
              <span className="text-slate-400 text-[11px]">({currentUser.name.split(' ')[0]})</span>
            </button>

            {/* WordPress Admin Panel Button */}
            <button
              onClick={() => onNavigate('admin-panel')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all shadow-sm ${
                currentTab === 'admin-panel'
                  ? 'bg-slate-900 text-white ring-2 ring-indigo-400'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
              title="مدیریت وردپرس"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>پیشخوان مدیریت</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
