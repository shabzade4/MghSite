import React, { useState } from 'react';
import { Search, Calendar, User, Clock, Bell, Sparkles, ArrowLeft, Filter, Tag, Radio } from 'lucide-react';
import { Article, PostType } from '../types';

interface BlogViewProps {
  articles: Article[];
  onOpenArticle: (article: Article) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ articles, onOpenArticle }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | PostType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    const matchesSearch = !searchQuery ||
      item.title.includes(searchQuery) ||
      item.excerpt.includes(searchQuery) ||
      item.content.includes(searchQuery) ||
      (item.tags && item.tags.some(t => t.includes(searchQuery)));
    return matchesFilter && matchesSearch;
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
    <div className="space-y-12">
      {/* Blog Hero & Search Bar */}
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

        {/* Search Input */}
        <div className="w-full md:w-80">
          <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 px-3 py-2 focus-within:border-indigo-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در بین مقالات و اخبار..."
              className="w-full bg-transparent border-none text-xs text-slate-900 placeholder-slate-400 focus:outline-none px-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-slate-400 hover:text-slate-700 mr-1"
              >
                پاک کردن
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs (Interactive Segmented Controls) */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-200 pb-4">
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
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
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

      {/* Pinned Announcement / Event Spotlight (if exists and on 'all' or specific tab) */}
      {pinnedItems.length > 0 && !searchQuery && (activeFilter === 'all' || activeFilter === 'announcement' || activeFilter === 'event') && (
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

      {/* Articles / Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
            مطلبی در این دسته‌بندی یافت نشد.
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
                    {/* Unboxed metadata with typographic separators */}
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
  );
};
