import React, { useState } from 'react';
import { X, Play, CheckCircle, Download, FileText, Lock, ChevronDown, ChevronUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { Course, Episode } from '../types';
import { store } from '../services/store';

interface CoursePlayerModalProps {
  course: Course;
  onClose: () => void;
  onEnrollCourse: (course: Course) => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  onClose,
  onEnrollCourse
}) => {
  const isEnrolled = store.hasAccessToCourse(course.id);
  
  // Find first available episode (free preview if not enrolled, or first episode)
  const allEpisodes = course.seasons.flatMap(s => s.episodes);
  const firstPlayable = isEnrolled 
    ? allEpisodes[0] 
    : allEpisodes.find(ep => ep.isFreePreview) || allEpisodes[0];

  const [activeEpisode, setActiveEpisode] = useState<Episode>(firstPlayable);
  const [openSeasons, setOpenSeasons] = useState<Record<string, boolean>>({
    [course.seasons[0]?.id || '']: true
  });

  const toggleSeason = (seasonId: string) => {
    setOpenSeasons(prev => ({ ...prev, [seasonId]: !prev[seasonId] }));
  };

  const handleSelectEpisode = (ep: Episode) => {
    if (!isEnrolled && !ep.isFreePreview) {
      return; // Locked episode
    }
    setActiveEpisode(ep);
  };

  const currentIndex = allEpisodes.findIndex(ep => ep.id === activeEpisode.id);
  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Player Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1">{course.title}</h2>
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{activeEpisode.title}</span>
                {activeEpisode.isFreePreview && (
                  <span className="text-emerald-400 font-mono text-[11px]">(پیش‌نمایش رایگان)</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isEnrolled && (
              <button
                onClick={() => onEnrollCourse(course)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                خرید و ثبت‌نام کامل در دوره
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Body: 2-Zone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Video Viewport (8 Columns on desktop) */}
          <div className="lg:col-span-8 flex flex-col bg-black p-4 sm:p-6 overflow-y-auto">
            <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex items-center justify-center">
              <video
                key={activeEpisode.id}
                controls
                autoPlay
                className="w-full h-full object-contain"
                src={activeEpisode.videoUrl}
              >
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>
            </div>

            {/* Episode details & controls */}
            <div className="mt-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white">{activeEpisode.title}</h3>
                  <span className="text-xs font-mono text-slate-400 tabular-nums">مدت: {activeEpisode.duration}</span>
                </div>

                {activeEpisode.notes && (
                  <p className="text-xs sm:text-sm text-slate-300 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60 mb-4 leading-relaxed">
                    {activeEpisode.notes}
                  </p>
                )}

                {/* Downloadable session attachment (PKT, PDF, ZIP) */}
                {activeEpisode.attachmentFileName && (
                  <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-900/60 p-3 rounded-xl mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      <div>
                        <div className="text-xs font-semibold text-indigo-200">فایل ضمیمه این جلسه:</div>
                        <div className="text-xs font-mono text-indigo-300">{activeEpisode.attachmentFileName}</div>
                      </div>
                    </div>
                    {isEnrolled || activeEpisode.isFreePreview ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`دانلود فایل آموزشی ${activeEpisode.attachmentFileName} با موفقیت آغاز شد.`);
                        }}
                        className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود ضمیمه ({activeEpisode.attachmentSize})</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        نیازمند ثبت‌نام در دوره
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-4">
                <button
                  disabled={!prevEpisode || (!isEnrolled && !prevEpisode?.isFreePreview)}
                  onClick={() => prevEpisode && handleSelectEpisode(prevEpisode)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>جلسه قبلی</span>
                </button>

                <button
                  disabled={!nextEpisode || (!isEnrolled && !nextEpisode?.isFreePreview)}
                  onClick={() => nextEpisode && handleSelectEpisode(nextEpisode)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center gap-2 transition-colors"
                >
                  <span>جلسه بعدی</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Playlist & Seasons sidebar (4 Columns on desktop) */}
          <div className="lg:col-span-4 bg-slate-900 border-t lg:border-t-0 lg:border-r border-slate-800 overflow-y-auto max-h-[400px] lg:max-h-full">
            <div className="p-4 border-b border-slate-800">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">سرفصل‌ها و جلسات دوره</h4>
              <div className="text-[11px] text-slate-500 mt-1">
                {isEnrolled ? 'شما دانشجوی دوره هستید (دسترسی کامل)' : 'جلسات دارای پیش‌نمایش رایگان قابل مشاهده است'}
              </div>
            </div>

            <div className="divide-y divide-slate-800/60">
              {course.seasons.map((season, sIdx) => {
                const isOpen = openSeasons[season.id] ?? true;
                return (
                  <div key={season.id} className="bg-slate-900">
                    <button
                      onClick={() => toggleSeason(season.id)}
                      className="w-full px-4 py-3 text-right flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-xs font-bold text-slate-200">{season.title}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="bg-slate-950/40 divide-y divide-slate-800/40">
                        {season.episodes.map((ep, eIdx) => {
                          const isActive = activeEpisode.id === ep.id;
                          const canPlay = isEnrolled || ep.isFreePreview;

                          return (
                            <button
                              key={ep.id}
                              onClick={() => handleSelectEpisode(ep)}
                              disabled={!canPlay}
                              className={`w-full px-4 py-3 text-right flex items-center justify-between transition-colors ${
                                isActive
                                  ? 'bg-indigo-900/40 text-indigo-300 font-semibold'
                                  : canPlay
                                  ? 'text-slate-300 hover:bg-slate-800/60'
                                  : 'text-slate-600 cursor-not-allowed bg-slate-950/80'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                {canPlay ? (
                                  <Play className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-indigo-400 fill-current' : 'text-slate-400'}`} />
                                ) : (
                                  <Lock className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                                )}
                                <span className="text-xs truncate">{ep.title}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 mr-2">
                                {ep.isFreePreview && !isEnrolled && (
                                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                                    رایگان
                                  </span>
                                )}
                                <span className="text-[11px] font-mono text-slate-500 tabular-nums">{ep.duration}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
