import React, { useState } from 'react';
import { X, Calendar, User, Clock, Tag, Share2, Check, Bell, Sparkles, MapPin, ExternalLink } from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailModalProps {
  article: Article;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeLabel = (type: Article['type']) => {
    switch (type) {
      case 'announcement': return { label: 'اطلاعیه مهم', color: 'bg-red-50 text-red-700 border-red-200' };
      case 'event': return { label: 'رویداد و وبینار', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'news': return { label: 'اخبار فناوری', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
      default: return { label: 'مقاله آموزشی', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
  };

  const typeConfig = getTypeLabel(article.type);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-slate-800">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${typeConfig.color}`}>
              {typeConfig.label}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">{article.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 text-xs"
              title="اشتراک‌گذاری"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'کپی شد' : 'اشتراک'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Cover Image */}
          {article.coverImage && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={article.coverImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Title and Metadata */}
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-600" />
                <span>نویسنده: <strong>{article.author}</strong></span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.createdAt}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Event Specific Card (if event) */}
          {article.type === 'event' && (
            <div className="bg-amber-50/80 border border-amber-200/90 p-5 rounded-2xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                  <Calendar className="w-4 h-4 text-amber-700" />
                  <span>زمان برگزاری رویداد:</span>
                </div>
                <span className="font-bold text-amber-800 text-xs sm:text-sm font-mono">
                  {article.eventDate || 'به زودی'}
                </span>
              </div>

              {article.eventLocation && (
                <div className="flex items-center gap-2 text-amber-800">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>مکان / بستر برگزاری: <strong>{article.eventLocation}</strong></span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <span className="text-amber-700">ثبت‌نام رایگان برای تمامی دانشجویان آکادمی</span>
                <button
                  onClick={() => setRegistered(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    registered
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-md'
                  }`}
                >
                  {registered ? 'ثبت‌نام شما با موفقیت انجام شد ✓' : 'ثبت‌نام رایگان در این وبینار'}
                </button>
              </div>
            </div>
          )}

          {/* Announcement Specific Banner (if announcement) */}
          {article.type === 'announcement' && (
            <div className="bg-red-50/80 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-red-900">
              <Bell className="w-5 h-5 text-red-600 shrink-0" />
              <span>این اطلاعیه رسمی از سوی دپارتمان آموزش آکادمی پارس‌نت منتشر گردیده است.</span>
            </div>
          )}

          {/* Excerpt Lead */}
          <div className="text-sm sm:text-base font-medium text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 leading-relaxed">
            {article.excerpt}
          </div>

          {/* Full Content */}
          <div className="text-sm text-slate-800 leading-loose whitespace-pre-wrap font-normal space-y-4">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>برچسب‌ها:</span>
              </span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
