import React from 'react';
import { Clock, BookOpen, Star, ShoppingCart, Play, Check } from 'lucide-react';
import { Course } from '../types';
import { store } from '../services/store';

interface CourseCardProps {
  course: Course;
  onOpenDetails: (course: Course) => void;
  onOpenPlayer: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onOpenDetails,
  onOpenPlayer
}) => {
  const [isInCart, setIsInCart] = React.useState(store.isItemInCart(course.id));
  const isEnrolled = store.hasAccessToCourse(course.id);

  React.useEffect(() => {
    return store.subscribe(() => {
      setIsInCart(store.isItemInCart(course.id));
    });
  }, [course.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <div
      onClick={() => onOpenDetails(course)}
      className="group bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Course Thumbnail Image */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Styled CSS fallback container
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
        {/* Measured dark scrim for text/action visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Free Preview action badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenPlayer(course);
          }}
          className="absolute bottom-3 right-3 bg-slate-900/85 hover:bg-indigo-600 group-hover:bg-indigo-600/95 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md group-hover:shadow-indigo-600/30 group-hover:scale-105"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>مشاهده پیش‌نمایش رایگان</span>
        </button>

        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg font-mono tabular-nums shadow-md group-hover:scale-110 transition-transform duration-300">
            {discountPercent}٪ تخفیف
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-700 font-medium mb-2.5 transition-colors">
            <span className="group-hover:text-indigo-700 group-hover:font-bold transition-colors">{course.level}</span>
            <span aria-hidden="true" className="text-slate-300 group-hover:text-slate-400">·</span>
            <span className="font-mono tabular-nums group-hover:text-slate-900 group-hover:font-bold transition-colors">{course.durationHours} ساعت آموزش</span>
            <span aria-hidden="true" className="text-slate-300 group-hover:text-slate-400">·</span>
            <span className="font-mono tabular-nums group-hover:text-slate-900 group-hover:font-bold transition-colors">{course.episodesCount} جلسه</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 group-hover:font-black transition-colors line-clamp-2 leading-snug mb-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-500 group-hover:text-slate-800 transition-colors line-clamp-2 leading-relaxed mb-4">
            {course.shortDescription}
          </p>
        </div>

        {/* Card Footer: Instructor & Pricing & Action */}
        <div className="pt-4 border-t border-slate-100 group-hover:border-indigo-100 transition-colors mt-2">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 group-hover:ring-indigo-300 group-hover:scale-110 transition-all duration-300"
              />
              <span className="text-xs text-slate-600 group-hover:text-slate-900 font-medium group-hover:font-bold truncate max-w-[130px] transition-colors">
                {course.instructor.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-mono font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:scale-125 group-hover:text-amber-500 group-hover:fill-amber-500 drop-shadow-xs transition-transform duration-300" />
              <span className="text-slate-600 group-hover:text-slate-900 group-hover:font-black transition-all duration-300">{course.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            {/* Price section */}
            <div>
              {course.originalPrice > course.price && (
                <div className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                  {course.originalPrice.toLocaleString('fa-IR')} تومان
                </div>
              )}
              <div className="text-sm font-black text-slate-900 group-hover:text-indigo-700 font-mono tabular-nums group-hover:scale-105 origin-right transition-all duration-300">
                {course.price.toLocaleString('fa-IR')}{' '}
                <span className="text-xs font-normal text-slate-500 group-hover:text-indigo-600">تومان</span>
              </div>
            </div>

            {/* Action button */}
            {isEnrolled ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPlayer(course);
                }}
                className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 group-hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 transition-all shadow-xs group-hover:scale-105"
              >
                <Check className="w-3.5 h-3.5" />
                <span>دانشجوی دوره هستید</span>
              </button>
            ) : isInCart ? (
              <span className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100/80 rounded-xl flex items-center gap-1 transition-all group-hover:scale-105">
                <Check className="w-3.5 h-3.5" />
                در سبد خرید
              </span>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 group-hover:bg-indigo-600 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:shadow-indigo-600/30 group-hover:scale-105"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>خرید دوره</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
