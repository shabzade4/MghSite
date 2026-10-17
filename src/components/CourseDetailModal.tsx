import React from 'react';
import { X, Play, Clock, BookOpen, Star, User, CheckCircle2, Shield, ShoppingCart, Check } from 'lucide-react';
import { Course } from '../types';
import { store } from '../services/store';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onOpenPlayer: (course: Course) => void;
  onDirectCheckout: (course: Course) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenPlayer,
  onDirectCheckout
}) => {
  const [isInCart, setIsInCart] = React.useState(store.isItemInCart(course.id));
  const isEnrolled = store.hasAccessToCourse(course.id);

  React.useEffect(() => {
    return store.subscribe(() => {
      setIsInCart(store.isItemInCart(course.id));
    });
  }, [course.id]);

  const handleAddToCart = () => {
    store.addToCart({
      id: course.id,
      type: 'course',
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image
    });
  };

  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>آموزش‌های تخصصی</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-medium">{course.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Banner & Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium">
                <span>سطح: {course.level}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{course.durationHours} ساعت ویدیوی آموزشی</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{course.episodesCount} جلسه تخصصی</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {course.title}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {course.description}
              </p>

              {/* Instructor Box */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">{course.instructor.name}</div>
                  <div className="text-xs text-slate-500">{course.instructor.title}</div>
                </div>
              </div>
            </div>

            {/* Right Card / Video Preview */}
            <div className="md:col-span-5 bg-slate-900 rounded-2xl overflow-hidden p-1 shadow-lg text-white">
              <div className="relative aspect-video rounded-xl overflow-hidden group">
                <img
                  src={course.image}
                  alt={course.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => onOpenPlayer(course)}
                    className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                  >
                    <Play className="w-6 h-6 fill-current mr-0.5" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-slate-950/80 text-[11px] px-2 py-0.5 rounded text-white font-mono">
                  پیش‌نمایش رایگان
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">شهریه دوره:</span>
                  <div className="text-left">
                    {course.originalPrice > course.price && (
                      <span className="text-xs text-slate-400 line-through font-mono tabular-nums ml-2">
                        {course.originalPrice.toLocaleString('fa-IR')}
                      </span>
                    )}
                    <span className="text-lg font-black text-white font-mono tabular-nums">
                      {course.price.toLocaleString('fa-IR')}{' '}
                      <span className="text-xs font-normal text-slate-400">تومان</span>
                    </span>
                  </div>
                </div>

                {isEnrolled ? (
                  <button
                    onClick={() => onOpenPlayer(course)}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>ورود به کلاس و پخش جلسات</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => onDirectCheckout(course)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>ثبت‌نام مستقیم و پرداخت آنلاین</span>
                    </button>
                    {!isInCart && (
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors"
                      >
                        افزودن به سبد خرید
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* What you will learn */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>آنچه در این دوره تخصصی فرا خواهید گرفت:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus / Curriculum Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">سرفصل‌ها و جلسات آموزشی</h3>
              <button
                onClick={() => onOpenPlayer(course)}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                مشاهده پیش‌نمایش در پلیر اختصاصی ←
              </button>
            </div>

            <div className="space-y-3">
              {course.seasons.map((season) => (
                <div key={season.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100/70 px-4 py-3 text-xs sm:text-sm font-bold text-slate-800">
                    {season.title}
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    {season.episodes.map((ep) => (
                      <div
                        key={ep.id}
                        className="px-4 py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Play className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-slate-800">{ep.title}</span>
                          {ep.isFreePreview && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                              رایگان
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-slate-400 tabular-nums">{ep.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
