import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Clock,
  BookOpen,
  Star,
  User,
  CheckCircle2,
  Shield,
  ShoppingCart,
  Check,
  Award,
  Download,
  MessageSquare,
  Send,
  Sparkles,
  Share2,
  Tag
} from 'lucide-react';
import { Course, DigitalFile, Review } from '../types';
import { store } from '../services/store';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onOpenPlayer: (course: Course) => void;
  onDirectCheckout: (course: Course) => void;
  onOpenFileDetails?: (file: DigitalFile) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onOpenPlayer,
  onDirectCheckout,
  onOpenFileDetails
}) => {
  const [isInCart, setIsInCart] = useState(store.isItemInCart(course.id));
  const isEnrolled = store.hasAccessToCourse(course.id);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'reviews' | 'related'>('syllabus');

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>(store.getCourseReviews(course.id));
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setIsInCart(store.isItemInCart(course.id));
      setReviews(store.getCourseReviews(course.id));
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
    store.showToast('success', 'دوره با موفقیت به سبد خرید اضافه گردید.');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    setIsSubmittingReview(true);
    setTimeout(() => {
      store.addReview({
        courseId: course.id,
        courseTitle: course.title,
        userName: store.currentUser.name,
        userAvatar: store.currentUser.avatar,
        rating: newReviewRating,
        comment: newReviewComment.trim()
      });
      setNewReviewComment('');
      setIsSubmittingReview(false);
    }, 300);
  };

  // Related files based on course category
  const relatedFiles = store.files.filter(f =>
    course.category === 'network'
      ? f.category === 'topology' || f.category === 'cheatsheet'
      : f.category === 'templates' || f.category === 'scripts'
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>آموزش‌های تخصصی</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">{course.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Top Banner & Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                <span>سطح: {course.level}</span>
                <span>·</span>
                <span className="font-mono tabular-nums">{course.durationHours} ساعت ویدیوی آموزشی</span>
                <span>·</span>
                <span className="font-mono tabular-nums">{course.episodesCount} جلسه تخصصی</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                {course.title}
              </h1>

              {course.description.includes('<') ? (
                <div
                  dangerouslySetInnerHTML={{ __html: course.description }}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light prose dark:prose-invert max-w-none"
                />
              ) : (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {course.description}
                </p>
              )}

              {/* Gallery Images (if available) */}
              {course.galleryImages && course.galleryImages.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">تصاویر و اسناد دوره:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {course.galleryImages.map((img, i) => (
                      <a key={i} href={img} target="_blank" rel="noopener noreferrer" className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-video block">
                        <img src={img} alt={`تصویر دوره ${i+1}`} className="w-full h-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* WordPress-style Permalink & Slug */}
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-slate-500 font-sans">پیوند یکتا:</span>
                <span dir="ltr" className="text-indigo-600 dark:text-indigo-400 truncate">
                  https://parsnet-academy.com/courses/{course.slug || course.id}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://parsnet-academy.com/courses/${course.slug || course.id}`);
                    store.showToast('info', 'پیوند یکتای دوره کپی شد');
                  }}
                  className="text-slate-500 hover:text-indigo-600 shrink-0 cursor-pointer"
                  title="کپی آدرس دوره"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Course Tags */}
              {course.tags && course.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>برچسب‌ها:</span>
                  </span>
                  {course.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Certificate & Exam Feature Strip */}
              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-800 dark:text-amber-300 text-xs font-medium">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>شامل آزمون شبیه‌ساز پایان دوره و صدور خودکار گواهینامه رسمی معتبر با کد اعتبارسنجی یکتا</span>
              </div>

              {/* Instructor Box */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{course.instructor.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{course.instructor.title}</div>
                </div>
              </div>
            </div>

            {/* Right Card / Video Preview */}
            <div className="md:col-span-5 bg-slate-900 rounded-3xl overflow-hidden p-1 shadow-lg text-white">
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => onOpenPlayer(course)}
                    className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
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
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>ورود به کلاس و پخش جلسات</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => onDirectCheckout(course)}
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>ثبت‌نام مستقیم و پرداخت آنلاین</span>
                    </button>
                    {!isInCart && (
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors cursor-pointer"
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
          <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>آنچه در این دوره تخصصی فرا خواهید گرفت:</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation: Syllabus vs Reviews vs Related Scenarios */}
          <div>
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'syllabus'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                سرفصل‌ها و جلسات ({course.episodesCount})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'reviews'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                <span>نظرات دانشجویان ({reviews.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('related')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'related'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                سناریوها و فایل‌های مکمل ({relatedFiles.length})
              </button>
            </div>

            {/* TAB 1: SYLLABUS */}
            {activeTab === 'syllabus' && (
              <div className="space-y-3 pt-4">
                {course.seasons.map((season) => (
                  <div key={season.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                    <div className="bg-slate-100/70 dark:bg-slate-800 px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {season.title}
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                      {season.episodes.map((ep) => (
                        <div
                          key={ep.id}
                          className="px-4 py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Play className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-800 dark:text-slate-200">{ep.title}</span>
                            {ep.isFreePreview && (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded font-medium">
                                پیش‌نمایش رایگان
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
            )}

            {/* TAB 2: REVIEWS & RATINGS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6 pt-4">
                {/* Submit Review Box */}
                <form onSubmit={handleReviewSubmit} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">ثبت دیدگاه و امتیاز شما برای این دوره</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-0.5 cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${star <= newReviewRating ? 'text-amber-500 fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="نظرتان را درباره کیفیت تدریس، سرفصل‌ها و سناریوها بنویسید..."
                    className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmittingReview ? 'در حال ثبت...' : 'ارسال دیدگاه'}</span>
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviews.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      هنوز دیدگاهی برای این دوره ثبت نشده است. اولین نفری باشید که دیدگاه خود را می‌نویسد!
                    </div>
                  ) : (
                    reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={rev.userAvatar}
                              alt={rev.userName}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-amber-500 fill-current" />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{rev.createdAt}</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: RELATED FILES & SCENARIOS */}
            {activeTab === 'related' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {relatedFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => {
                      if (onOpenFileDetails) {
                        onClose();
                        onOpenFileDetails(file);
                      }
                    }}
                    className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-3 hover:border-indigo-400 transition-all cursor-pointer shadow-xs group"
                  >
                    <img
                      src={file.image}
                      alt={file.title}
                      className="w-full aspect-video rounded-xl object-cover mb-2 group-hover:scale-105 transition-transform"
                    />
                    <div className="text-[11px] font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                      {file.title}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>{file.fileFormat}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{file.price.toLocaleString('fa-IR')} تومان</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
