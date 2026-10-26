import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LayoutDashboard, Terminal, Menu, X, Phone, Mail, BookOpen, Download, Radio, Info, Moon, Sun, Palette, Check, Leaf } from 'lucide-react';
import { store } from '../services/store';
import { NavigationTab, ColorTheme } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenCart: () => void;
  onOpenOrganicCart?: () => void;
  onOpenVerifyModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenCart,
  onOpenOrganicCart,
  onOpenVerifyModal
}) => {
  const [cartCount, setCartCount] = useState(store.cart.length);
  const [organicCartCount, setOrganicCartCount] = useState(store.organicCart.length);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(store.theme);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(store.colorTheme);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const currentUser = store.currentUser;
  const settings = store.settings;

  useEffect(() => {
    return store.subscribe(() => {
      setCartCount(store.cart.length);
      setOrganicCartCount(store.organicCart.length);
      setTheme(store.theme);
      setColorTheme(store.colorTheme);
    });
  }, []);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'صفحه اصلی' },
    { id: 'projects-services', label: 'خدمات و انجام پروژه' },
    { id: 'courses', label: 'دوره‌های آموزشی' },
    { id: 'roadmaps', label: 'مسیرهای یادگیری' },
    { id: 'files', label: 'محصولات و سناریوها' },
    { id: 'blog', label: 'نوشته‌ها و مقالات' },
    { id: 'about', label: 'درباره ما' },
    { id: 'contact', label: 'تماس با ما' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all select-none">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-medium hidden sm:inline">پذیرش تخصصی پروژه‌ها:</span>
            <span>نصب نرم‌افزار، سیستم‌عامل سرور، مجازی‌سازی، پسیو/اکتیو شبکه، وب‌سایت و برنامه‌نویسی</span>
          </div>
          <div className="flex items-center gap-4">
            {onOpenVerifyModal && (
              <button
                onClick={onOpenVerifyModal}
                className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[11px] cursor-pointer"
              >
                <span>استعلام اصالت گواهینامه</span>
              </button>
            )}
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="tabular-nums font-mono text-slate-300">
              مشاوره و پشتیبانی: {settings.supportPhone}
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
                  <span>مهرادینت</span>
                  <span className="text-[10px] sm:text-xs font-mono font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                    MEHRADINET
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-normal hidden sm:block">
                  آموزش تخصصی شبکه، وب، برنامه‌نویسی و انجام پروژه‌های کامپیوتری
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-4 text-xs font-medium text-slate-600">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`hover:text-indigo-600 transition-colors whitespace-nowrap py-1 relative ${
                  currentTab === item.id ? 'text-indigo-600 font-bold' : ''
                } ${item.id === 'projects-services' ? 'font-bold text-slate-900' : ''}`}
              >
                {item.label}
                {item.id === 'projects-services' && (
                  <span className="mr-1 bg-indigo-100 text-indigo-700 text-[9px] px-1.5 py-0.2 rounded-md font-bold">
                    پروژه IT
                  </span>
                )}
                {currentTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}

            {/* Dedicated Distinct Organic Store Button (Special Shape & Color) */}
            <button
              onClick={() => onNavigate('organic-shop')}
              className={`group px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 border shadow-sm cursor-pointer ${
                currentTab === 'organic-shop'
                  ? 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white border-emerald-400 ring-2 ring-emerald-500/40 shadow-emerald-600/30 shadow-md scale-105'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 hover:shadow-md'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white transition-colors animate-pulse" />
              <span>فروشگاه ارگانیک</span>
            </button>
          </nav>


          {/* Zone 3: Actions (Cart & Panels) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Color Theme Selector Popover */}
            <div className="relative">
              <button
                onClick={() => setIsThemePickerOpen(!isThemePickerOpen)}
                className="p-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer flex items-center gap-1"
                title="تغییر تم رنگی سایت"
              >
                <Palette className="w-4 h-4 text-indigo-600" />
              </button>

              {isThemePickerOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 space-y-1">
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 px-2 py-1 border-b border-slate-100 dark:border-slate-800">
                    تم‌های رنگی سایت:
                  </div>
                  {[
                    { id: 'indigo', name: 'نیلی سازمانی', hex: '#4f46e5' },
                    { id: 'emerald', name: 'زمردی و نعنایی', hex: '#059669' },
                    { id: 'cyan', name: 'فیروزه‌ای نئون', hex: '#0891b2' },
                    { id: 'amber', name: 'طلایی کهربایی', hex: '#d97706' },
                    { id: 'rose', name: 'یاقوتی و زرشکی', hex: '#e11d48' },
                    { id: 'violet', name: 'بنفش رویال', hex: '#7c3aed' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        store.setColorTheme(t.id as ColorTheme);
                        setIsThemePickerOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                        colorTheme === t.id
                          ? 'bg-slate-100 dark:bg-slate-800 font-bold text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: t.hex }} />
                        <span>{t.name}</span>
                      </div>
                      {colorTheme === t.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={() => store.toggleTheme()}
              className="p-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Organic Store Cart Trigger Button */}
            <button
              onClick={onOpenOrganicCart || onOpenCart}
              className="relative p-2 text-emerald-700 bg-emerald-50/90 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60 rounded-xl transition-all border border-emerald-200 dark:border-emerald-800/60 cursor-pointer flex items-center gap-1.5"
              title="سبد خرید محصولات ارگانیک"
            >
              <Leaf className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden xl:inline text-xs font-bold text-emerald-800 dark:text-emerald-200">سبد ارگانیک</span>
              {organicCartCount > 0 && (
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {organicCartCount}
                </span>
              )}
            </button>

            {/* Courses Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
              title="سبد خرید دوره‌ها و فایل‌ها"
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
          <div className="lg:hidden border-t border-slate-200 py-3 px-2 space-y-1.5 bg-white">
            {/* Mobile Organic Link */}
            <button
              onClick={() => {
                onNavigate('organic-shop');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-right px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-between ${
                currentTab === 'organic-shop'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span>فروشگاه محصولات ارگانیک (خشکبار و گردو)</span>
              </div>
              <span className="bg-amber-400 text-stone-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">ویژه</span>
            </button>

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
