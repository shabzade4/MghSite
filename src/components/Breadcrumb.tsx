import React from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import { NavigationTab } from '../types';

interface BreadcrumbProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  subItemTitle?: string;
  onSubItemBack?: () => void;
}

const TAB_LABELS: Record<NavigationTab, string> = {
  home: 'صفحه اصلی',
  'projects-services': 'خدمات و سفارش پروژه IT و شبکه',
  'organic-shop': 'فروشگاه محصولات و سوغات ارگانیک',
  courses: 'دوره‌های تخصصی شبکه و وب',
  files: 'سناریوها و اسکریپت‌های دانلودی',
  roadmaps: 'نقشه‌های راه شغلی IT',
  blog: 'پایگاه دانش و وبلاگ تخصصی',
  'student-panel': 'میز کار و پنل دانشجویان و مشتریان',
  'admin-panel': 'پیشخوان مدیریت وردپرس',
  about: 'درباره ما و اساتید',
  contact: 'تماس با ما و مشاوره',
  terms: 'قوانین، مقررات و حریم خصوصی',
  sitemap: 'نقشه کامل سایت'
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentTab,
  onNavigate,
  subItemTitle,
  onSubItemBack
}) => {
  if (currentTab === 'home' && !subItemTitle) return null;

  const currentLabel = TAB_LABELS[currentTab] || 'بخش جاری';

  return (
    <nav
      aria-label="مسیر راهنما (Breadcrumb)"
      className="py-3 px-4 mb-4 bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl shadow-2xs text-xs select-none"
      dir="rtl"
    >
      <ol
        className="flex items-center gap-1.5 flex-wrap text-slate-600 font-medium"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Item 1: Home */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-1.5"
        >
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer py-1"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span itemProp="name">صفحه اصلی</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        <ChevronLeft className="w-3.5 h-3.5 text-slate-300 shrink-0" />

        {/* Item 2: Current Tab */}
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-1.5"
        >
          {subItemTitle ? (
            <button
              onClick={() => {
                if (onSubItemBack) onSubItemBack();
                else onNavigate(currentTab);
              }}
              className="text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer py-1"
              itemProp="item"
            >
              <span itemProp="name">{currentLabel}</span>
            </button>
          ) : (
            <span className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-none" itemProp="name">
              {currentLabel}
            </span>
          )}
          <meta itemProp="position" content="2" />
        </li>

        {/* Item 3 (Optional): Sub-item title */}
        {subItemTitle && (
          <>
            <ChevronLeft className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1.5"
            >
              <span className="font-bold text-indigo-700 truncate max-w-[240px] sm:max-w-md" itemProp="name">
                {subItemTitle}
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};
