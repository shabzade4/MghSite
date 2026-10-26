import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Tag,
  ExternalLink,
  Mail,
  Check,
  ChevronLeft,
  Sparkles,
  Calendar,
  Layers,
  ArrowLeft,
  Flame,
  Award
} from 'lucide-react';
import { Article, Course, SiteSettings } from '../types';

interface BlogSidebarProps {
  articles: Article[];
  courses: Course[];
  settings: SiteSettings;
  onOpenArticle: (article: Article) => void;
  onOpenCourse?: (course: Course) => void;
  onSelectCategory?: (category: string) => void;
  onSelectTag?: (tag: string) => void;
  activeCategory?: string;
  activeTag?: string;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  articles,
  courses,
  settings,
  onOpenArticle,
  onOpenCourse,
  onSelectCategory,
  onSelectTag,
  activeCategory,
  activeTag,
  searchQuery = '',
  onSearchChange
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const widgets = settings.sidebarWidgets || {
    search: true,
    categories: true,
    recentPosts: true,
    featuredCourse: true,
    popularTags: true,
    customLinks: true,
    newsletter: true
  };

  // Extract unique categories and counts
  const categoryCounts = articles.reduce((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Extract unique tags and counts
  const allTags = articles.flatMap(a => a.tags || []);
  const tagCounts = allTags.reduce((acc, t) => {
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const popularTags = Object.keys(tagCounts).slice(0, 10);

  // Recent 4 posts
  const recentArticles = articles.slice(0, 4);

  // Featured Course
  const featuredCourse = courses.find(c => c.isFeatured) || courses[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2500);
  };

  return (
    <aside className="space-y-6 w-full text-xs">
      {/* WIDGET 1: Search */}
      {widgets.search !== false && onSearchChange && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100 mb-3">
            <Search className="w-4 h-4 text-indigo-600" />
            <span>جستجو در مقالات و دانشنامه</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="کلمه کلیدی را تایپ کنید..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:border-indigo-500 outline-none pr-8"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      )}

      {/* WIDGET 2: Featured Course Banner */}
      {widgets.featuredCourse !== false && featuredCourse && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-4 shadow-md border border-indigo-800/40 space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
              <Flame className="w-3 h-3 text-red-600" />
              <span>{settings.sidebarBannerTitle || 'دوره ویژه ماه'}</span>
            </span>
            <span className="text-[10px] text-indigo-300 font-mono">پیشنهاد آکادمی</span>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-black text-white text-xs leading-snug">
              {featuredCourse.title}
            </h4>
            <p className="text-[11px] text-slate-300 line-clamp-2 font-light">
              {settings.sidebarBannerSubtitle || featuredCourse.shortDescription}
            </p>
          </div>

          <div className="pt-2 border-t border-indigo-900/60 flex items-center justify-between">
            <div className="text-amber-400 font-mono text-xs font-bold">
              {featuredCourse.price.toLocaleString('fa-IR')} تومان
            </div>
            {onOpenCourse && (
              <button
                type="button"
                onClick={() => onOpenCourse(featuredCourse)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-sm"
              >
                <span>مشاهده دوره</span>
                <ArrowLeft className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* WIDGET 3: Categories */}
      {widgets.categories !== false && Object.keys(categoryCounts).length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>دسته‌بندی‌های موضوعی</span>
          </div>

          <div className="space-y-1">
            {Object.entries(categoryCounts).map(([cat, count]) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(cat === activeCategory ? '' : cat)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{cat}</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-md">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WIDGET 4: Recent Posts */}
      {widgets.recentPosts !== false && recentArticles.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>تازه‌ترین مطالب و رویدادها</span>
          </div>

          <div className="space-y-3">
            {recentArticles.map(article => (
              <div
                key={article.id}
                onClick={() => onOpenArticle(article)}
                className="flex items-start gap-3 group cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug text-[11px]">
                    {article.title}
                  </h5>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WIDGET 5: Popular Tags Cloud */}
      {widgets.popularTags !== false && popularTags.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
            <Tag className="w-4 h-4 text-indigo-600" />
            <span>برچسب‌های محبوب</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {popularTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => onSelectTag && onSelectTag(tag === activeTag ? '' : tag)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                  activeTag === tag
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* WIDGET 6: Custom Links */}
      {widgets.customLinks !== false && settings.sidebarCustomLinks && settings.sidebarCustomLinks.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
            <ExternalLink className="w-4 h-4 text-indigo-600" />
            <span>دسترسی و لینک‌های مفید</span>
          </div>

          <div className="space-y-1.5">
            {settings.sidebarCustomLinks.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
              >
                <span className="font-medium text-[11px] truncate">{link.title}</span>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* WIDGET 7: Newsletter */}
      {widgets.newsletter !== false && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 pb-2 border-b border-slate-100">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>عضویت در خبرنامه تخصصی</span>
          </div>

          <p className="text-[11px] text-slate-500 font-light leading-relaxed">
            جدیدترین سناریوهای شبکه، فایل‌های کاربردی و کدهای تخفیف را در ایمیل خود دریافت کنید.
          </p>

          {newsletterSubscribed ? (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-[11px]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ایمیل شما با موفقیت در خبرنامه ثبت گردید!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                required
                dir="ltr"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none focus:bg-white focus:border-indigo-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
              >
                عضویت در خبرنامه
              </button>
            </form>
          )}
        </div>
      )}
    </aside>
  );
};
