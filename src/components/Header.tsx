import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LayoutDashboard, Terminal, Menu, X, Phone, Mail, BookOpen, Download, Radio, Info, Moon, Sun } from 'lucide-react';
import { store } from '../services/store';
import { NavigationTab } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenCart: () => void;
  onOpenSupabaseGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenCart,
  onOpenSupabaseGuide
}) => {
  const [cartCount, setCartCount] = useState(store.cart.length);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(store.theme);
  const currentUser = store.currentUser;
  const settings = store.settings;

  useEffect(() => {
    return store.subscribe(() => {
      setCartCount(store.cart.length);
      setTheme(store.theme);
    });
  }, []);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'courses', label: 'دوره‌های آموزشی' },
    { id: 'files', label: 'محصولات و سناریوها' },
    { id: 'blog', label: 'نوشته‌ها و رویدادها' },
    { id: 'about', label: 'درباره ما' },
    { id: 'contact', label: 'تماس با ما' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all select-none">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-medium hidden sm:inline">تخفیف ویژه دوره‌های شبکه و وب:</span>
            <span>تا ۳۰٪ تخفیف روی دوره‌های سیسکو، میکروتیک و ری‌اکت ۱۹</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenSupabaseGuide}
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">اتصال دیتابیس Supabase و Vercel</span>
              <span className="md:hidden">Supabase</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="tabular-nums font-mono text-slate-400 hidden sm:inline">
              پشتیبانی: {settings.supportPhone}
            </span>
          </div>
        </div>
      </div>

      {/* Main Top Bar: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 lg:hidden"
              aria-label="منوی سایت"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 text-right group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                  <span>پارس‌نت</span>
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    ACADEMY
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-normal hidden sm:block">
                  آموزش تخصصی شبکه، وب و فایل‌های IT
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`hover:text-indigo-600 transition-colors whitespace-nowrap py-1 relative ${
                  currentTab === item.id ? 'text-indigo-600 font-bold' : ''
                }`}
              >
                {item.label}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions (Cart & Panels) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Dark / Light Theme Toggle */}
            <button
              onClick={() => store.toggleTheme()}
              className="p-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              title="سبد خرید"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Student Panel Button */}
            <button
              onClick={() => onNavigate('student-panel')}
              className={`px-3 py-2 text-xs font-medium rounded-xl flex items-center gap-1.5 border transition-all ${
                currentTab === 'student-panel'
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              <span className="hidden md:inline">پنل کاربری</span>
            </button>

            {/* WordPress Admin Panel Button */}
            <button
              onClick={() => onNavigate('admin-panel')}
              className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm ${
                currentTab === 'admin-panel'
                  ? 'bg-slate-900 text-white ring-2 ring-indigo-400'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
              title="پیشخوان مدیریت وردپرس"
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>پیشخوان مدیریت</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 px-2 space-y-1 bg-white">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-right px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
                  currentTab === item.id
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
