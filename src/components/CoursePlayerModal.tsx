import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  CheckCircle,
  CheckCircle2,
  Download,
  FileText,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Award,
  Shield,
  Clock,
  Sparkles
} from 'lucide-react';
import { Course, Episode } from '../types';
import { store } from '../services/store';

interface CoursePlayerModalProps {
  course: Course;
  onClose: () => void;
  onEnrollCourse: (course: Course) => void;
  onOpenQuiz?: (course: Course) => void;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  onClose,
  onEnrollCourse,
  onOpenQuiz
}) => {
  const isEnrolled = store.hasAccessToCourse(course.id);
  const currentUser = store.currentUser;

  // Find all episodes
  const allEpisodes = course.seasons.flatMap(s => s.episodes);
  const firstPlayable = isEnrolled 
    ? allEpisodes[0] 
    : allEpisodes.find(ep => ep.isFreePreview) || allEpisodes[0];

  const [activeEpisode, setActiveEpisode] = useState<Episode>(firstPlayable);
  const [openSeasons, setOpenSeasons] = useState<Record<string, boolean>>({
    [course.seasons[0]?.id || '']: true
  });

  // Dynamic Floating Watermark State
  const [watermarkPos, setWatermarkPos] = useState({ top: '15%', left: '20%' });

  useEffect(() => {
    // Watermark moves randomly every 7 seconds across the video canvas
    const interval = setInterval(() => {
      const randomTop = Math.floor(10 + Math.random() * 75) + '%';
      const randomLeft = Math.floor(10 + Math.random() * 75) + '%';
      setWatermarkPos({ top: randomTop, left: randomLeft });
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const toggleSeason = (seasonId: string) => {
    setOpenSeasons(prev => ({ ...prev, [seasonId]: !prev[seasonId] }));
  };

  const handleSelectEpisode = (ep: Episode) => {
    if (!isEnrolled && !ep.isFreePreview) {
      return;
    }
    setActiveEpisode(ep);
  };

  const progress = store.getCourseProgress(course.id);
  const isEpisodeDone = store.isEpisodeCompleted(activeEpisode.id);

  const toggleCompleted = () => {
    store.markEpisodeCompleted(activeEpisode.id, !isEpisodeDone);
  };

  const currentIndex = allEpisodes.findIndex(ep => ep.id === activeEpisode.id);
  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Player Modal Header with Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
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

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Progress bar (if enrolled) */}
            {isEnrolled && (
              <div className="hidden md:flex items-center gap-3 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
                <div className="text-[11px] text-slate-300 font-medium">
                  پیشرفت: <span className="font-mono font-bold text-emerald-400">{progress.percent}٪</span>
                </div>
                <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Quiz / Certificate Button */}
            {isEnrolled && onOpenQuiz && (
              <button
                onClick={() => onOpenQuiz(course)}
                className="px-3 py-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>آزمون و گواهینامه</span>
              </button>
            )}

            {!isEnrolled && (
              <button
                onClick={() => onEnrollCourse(course)}
                className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors whitespace-nowrap shadow-sm cursor-pointer"
              >
                ثبت‌نام کامل در دوره
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Body: 2-Zone Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Video Viewport (8 Columns on desktop) */}
          <div className="lg:col-span-8 flex flex-col bg-black p-4 sm:p-6 overflow-y-auto">
            <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center select-none">
              <video
                key={activeEpisode.id}
                controls
                autoPlay
                className="w-full h-full object-contain"
                src={activeEpisode.videoUrl}
              >
                مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
              </video>

              {/* DYNAMIC ANTI-PIRACY SECURITY WATERMARK */}
              <div
                className="absolute pointer-events-none transition-all duration-1000 ease-in-out px-2 py-1 rounded bg-black/35 backdrop-blur-xs text-white/50 text-[10px] font-mono tracking-wider border border-white/10 select-none shadow-sm flex items-center gap-1.5"
                style={{ top: watermarkPos.top, left: watermarkPos.left }}
              >
                <Shield className="w-2.5 h-2.5 text-indigo-400" />
                <span>{currentUser.phone || '09123456789'}</span>
                <span>·</span>
                <span>{currentUser.name}</span>
              </div>
            </div>

            {/* Episode details & controls */}
            <div className="mt-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{activeEpisode.title}</h3>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">مدت زمان: {activeEpisode.duration}</div>
                  </div>

                  {isEnrolled && (
                    <button
                      onClick={toggleCompleted}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto ${
                        isEpisodeDone
                          ? 'bg-emerald-600/30 border border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 ${isEpisodeDone ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{isEpisodeDone ? 'این جلسه مشاهده شد' : 'علامت‌گذاری به عنوان مشاهده‌شده'}</span>
                    </button>
                  )}
                </div>

                {activeEpisode.notes && (
                  <p className="text-xs sm:text-sm text-slate-300 bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 mb-4 leading-relaxed font-light">
                    {activeEpisode.notes}
                  </p>
                )}

                {/* Downloadable session attachment (PKT, PDF, ZIP) */}
                {activeEpisode.attachmentFileName && (
                  <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-900/60 p-3.5 rounded-2xl mb-4">
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
                          alert(`دانلود امن فایل ${activeEpisode.attachmentFileName} با موفقیت آغاز شد.`);
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود ({activeEpisode.attachmentSize})</span>
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
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>جلسه قبلی</span>
                </button>

                <button
                  disabled={!nextEpisode || (!isEnrolled && !nextEpisode?.isFreePreview)}
                  onClick={() => nextEpisode && handleSelectEpisode(nextEpisode)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
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
                {isEnrolled ? `دانشجوی رسمی دوره (${progress.completedCount} از ${progress.totalCount} جلسه دیده‌شده)` : 'جلسات دارای پیش‌نمایش رایگان قابل مشاهده است'}
              </div>
            </div>

            <div className="divide-y divide-slate-800/60">
              {course.seasons.map((season) => {
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
                        {season.episodes.map((ep) => {
                          const isActive = activeEpisode.id === ep.id;
                          const canPlay = isEnrolled || ep.isFreePreview;
                          const isDone = store.isEpisodeCompleted(ep.id);

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
                                {isDone ? (
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                ) : canPlay ? (
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
