import React from 'react';
import { Home, Server, Leaf, BookOpen, User } from 'lucide-react';
import { NavigationTab } from '../types';

interface MobileBottomBarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  organicCartCount: number;
  cartCount: number;
  onOpenOrganicCart: () => void;
  onOpenCart: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentTab,
  onNavigate,
  organicCartCount,
  cartCount,
  onOpenOrganicCart,
  onOpenCart
}) => {
  return (
    <nav
      aria-label="منوی دسترسی سریع موبایل"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-2 py-1 transition-all select-none"
      dir="rtl"
      style={{ paddingBottom: 'calc(0.4rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-indigo-600 font-bold bg-indigo-50/70'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">خانه</span>
        </button>

        {/* 2. Projects & Services */}
        <button
          type="button"
          onClick={() => {
            onNavigate('projects-services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
            currentTab === 'projects-services'
              ? 'text-indigo-600 font-bold bg-indigo-50/70'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Server className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight truncate max-w-full">پروژه‌ها</span>
          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-indigo-600" />
        </button>

        {/* 3. Organic Store */}
        <button
          type="button"
          onClick={() => {
            onNavigate('organic-shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
            currentTab === 'organic-shop'
              ? 'text-emerald-700 font-bold bg-emerald-50/80'
              : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-50'
          }`}
        >
          <div className="relative">
            <Leaf className="w-5 h-5 mb-0.5 text-emerald-600" />
            {organicCartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded-full shadow-xs">
                {organicCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-tight text-emerald-700 font-medium">ارگانیک</span>
        </button>

        {/* 4. Courses */}
        <button
          type="button"
          onClick={() => {
            onNavigate('courses');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
            currentTab === 'courses'
              ? 'text-indigo-600 font-bold bg-indigo-50/70'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <div className="relative">
            <BookOpen className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-indigo-600 text-white text-[9px] font-bold px-1 rounded-full shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] leading-tight">دوره‌ها</span>
        </button>

        {/* 5. Student / Client Panel */}
        <button
          type="button"
          onClick={() => {
            onNavigate('student-panel');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[46px] py-1 px-1 rounded-xl transition-all cursor-pointer ${
            currentTab === 'student-panel'
              ? 'text-indigo-600 font-bold bg-indigo-50/70'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight truncate max-w-full">پنل من</span>
        </button>
      </div>
    </nav>
  );
};
