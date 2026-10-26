import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock, Bell, Sparkles, ArrowLeft, Filter, Tag, Radio, X } from 'lucide-react';
import { Article, Course, PostType } from '../types';
import { BlogSidebar } from './BlogSidebar';
import { store } from '../services/store';

interface BlogViewProps {
  articles: Article[];
  courses?: Course[];
  onOpenArticle: (article: Article) => void;
  onOpenCourse?: (course: Course) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  articles,
  courses = store.courses,
  onOpenArticle,
  onOpenCourse
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | PostType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('');
  const [settings, setSettings] = useState(store.settings);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setSettings({ ...store.settings });
    });
    return unsub;
  }, []);

  const isSidebarEnabled = settings.showBlogSidebar !== false;
  const sidebarPosition = settings.sidebarPosition || 'left';

  const filteredArticles = articles.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesCategory = !activeCategory || item.category === activeCategory;
    const matchesTag = !activeTag || (item.tags && item.tags.includes(activeTag));
    const matchesSearch = !searchQuery ||
      item.title.includes(searchQuery) ||
      item.excerpt.includes(searchQuery) ||
      item.content.includes(searchQuery) ||
      (item.tags && item.tags.some(t => t.includes(searchQuery)));
    return matchesFilter && matchesCategory && matchesTag && matchesSearch;
  });

  // Pinned items
  const pinnedItems = articles.filter(a => a.isPinned);

  const getTypeBadge = (type: PostType) => {
    switch (type) {
      case 'announcement':
        return { label: 'اطلاعیه مهم', classes: 'text-red-700 bg-red-50 border border-red-200' };
      case 'event':
        return { label: 'رویداد و وبینار', classes: 'text-amber-700 bg-amber-50 border border-amber-200' };
      case 'news':
        return { label: 'اخبار فناوری', classes: 'text-cyan-700 bg-cyan-50 border border-cyan-200' };
      default:
        return { label: 'مقاله تخصصی', classes: 'text-indigo-700 bg-indigo-50 border border-indigo-200' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Blog Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold">
            <Radio className="w-4 h-4 text-indigo-600" />
            <span>پایگاه دانش، دانشنامه و مرکز اطلاع‌رسانی آکادمی</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            نوشته‌ها، اطلاعیه‌ها، اخبار فناوری و رویدادهای تخصصی
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            همگام با آخرین استانداردهای شبکه سیسکو، میکروتیک، سرورهای لینوکس و فریمورک‌های مدرن وب.
          </p>
        </div>

        {/* Search Input in Hero (always available) */}
        <div className="w-full md:w-80">
          <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 px-3 py-2 focus-within:border-indigo-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در مقالات و اخبار..."
              className="w-full bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none px-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-slate-400 hover:text-slate-700 mr-1 cursor-pointer"
              >
                پاک کردن
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Active Tag/Category Badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-200 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'همه مطالب' },
              { id: 'article', label: 'مقالات تخصصی' },
              { id: 'announcement', label: 'اطلاعیه‌های مهم' },
              { id: 'news', label: 'اخبار فناوری' },
              { id: 'event', label: 'رویدادها و وبینارها' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono">
            نمایش {filteredArticles.length} مورد
          </span>
        </div>

        {/* Active Category or Tag Filter Pills */}
        {(activeCategory || activeTag || searchQuery) && (
          <div className="flex items-center gap-2 flex-wrap text-xs bg-slate-100/70 p-2.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium text-[11px]">فیلترهای فعال:</span>
            {activeCategory && (
              <span className="bg-white text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold text-[11px]">
                <span>دسته: {activeCategory}</span>
                <button onClick={() => setActiveCategory('')} className="hover:text-red-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {activeTag && (
              <span className="bg-white text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-lg flex items-center gap-1 font-bold text-[11px]">
                <span>برچسب: #{activeTag}</span>
                <button onClick={() => setActiveTag('')} className="hover:text-red-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center gap-1 text-[11px]">
                <span>عبارت: «{searchQuery}»</span>
                <button onClick={() => setSearchQuery('')} className="hover:text-red-600 cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setActiveCategory('');
                setActiveTag('');
                setSearchQuery('');
              }}
              className="text-[11px] text-red-600 hover:underline mr-auto cursor-pointer"
            >
              حذف همه فیلترها
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area with Optional Sidebar */}
      <div className={`flex flex-col lg:flex-row gap-8 items-start ${
        sidebarPosition === 'right' ? 'lg:flex-row-reverse' : ''
      }`}>
        {/* Articles Column */}
        <div className={`w-full ${isSidebarEnabled ? 'lg:w-2/3 xl:w-3/4' : 'w-full'} space-y-8`}>
          {/* Pinned Announcement / Event Spotlight */}
          {pinnedItems.length > 0 && !searchQuery && !activeCategory && !activeTag && (activeFilter === 'all' || activeFilter === 'announcement' || activeFilter === 'event') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Bell className="w-4 h-4 text-amber-600" />
                <span>اطلاعیه و رویداد برگزیده:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pinnedItems.slice(0, 2).map(pinned => (
                  <div
                    key={pinned.id}
                    onClick={() => onOpenArticle(pinned)}
                    className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-5 border border-slate-700 cursor-pointer hover:border-indigo-400 hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold px-2 py-0.5 rounded">
                          {pinned.type === 'event' ? 'وبینار رایگان' : 'اطلاعیه مهم'}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{pinned.createdAt}</span>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-relaxed">
                        {pinned.title}
                      </h3>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light mb-4">
                        {pinned.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700/80 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">{pinned.author}</span>
                      <span className="text-indigo-300 font-bold flex items-center gap-1 group-hover:text-white">
                        <span>مشاهده جزئیات</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Articles Grid */}
          <div className={`grid grid-cols-1 ${isSidebarEnabled ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {filteredArticles.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-600">مطلبی با این شرایط یافت نشد.</p>
                <p className="text-xs font-light">می‌توانید فیلترها را حذف کنید یا کلمه دیگری را جستجو نمایید.</p>
              </div>
            ) : (
              filteredArticles.map(article => {
                const badge = getTypeBadge(article.type);
                return (
                  <div
                    key={article.id}
                    onClick={() => onOpenArticle(article)}
                    className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden justify-between"
                  >
                    <div>
                      {/* Thumbnail Image */}
                      <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        
                        {/* Badge */}
                        <div className="absolute bottom-3 right-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badge.classes}`}>
                            {badge.label}
                          </span>
                        </div>

                        {article.type === 'event' && article.eventDate && (
                          <div className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                            رویداد زنده
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
                          <span>{article.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.readTime}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.createdAt}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2">
                          {article.title}
                        </h3>

                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light mb-4">
                          {article.excerpt}
                        </p>

                        {/* Article Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-2">
                            {article.tags.slice(0, 3).map(t => (
                              <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 truncate max-w-[140px]">{article.author}</span>
                        <span className="text-indigo-600 font-semibold group-hover:text-indigo-800 flex items-center gap-1">
                          <span>مطالعه کامل</span>
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        {isSidebarEnabled && (
          <div className="w-full lg:w-1/3 xl:w-1/4 lg:sticky lg:top-24">
            <BlogSidebar
              articles={articles}
              courses={courses}
              settings={settings}
              onOpenArticle={onOpenArticle}
              onOpenCourse={onOpenCourse}
              onSelectCategory={(cat) => setActiveCategory(cat)}
              onSelectTag={(t) => setActiveTag(t)}
              activeCategory={activeCategory}
              activeTag={activeTag}
              searchQuery={searchQuery}
              onSearchChange={(q) => setSearchQuery(q)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
