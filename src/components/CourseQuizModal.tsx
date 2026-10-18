import React, { useState, useEffect } from 'react';
import { X, Award, CheckCircle2, AlertCircle, Clock, ArrowRight, ArrowLeft, RotateCcw, Check, FileCheck } from 'lucide-react';
import { Course, CourseQuiz, Certificate } from '../types';
import { store } from '../services/store';

interface CourseQuizModalProps {
  course: Course;
  onClose: () => void;
  onViewCertificate: (cert: Certificate) => void;
}

export const CourseQuizModal: React.FC<CourseQuizModalProps> = ({
  course,
  onClose,
  onViewCertificate
}) => {
  // Find quiz for this course or provide default
  const quiz: CourseQuiz = store.quizzes.find(q => q.courseId === course.id) || {
    id: `quiz-${course.id}`,
    courseId: course.id,
    courseTitle: course.title,
    title: `آزمون ارزیابی جامع دوره ${course.title}`,
    timeLimitMinutes: 15,
    passScorePercent: 70,
    questions: [
      {
        id: 'dq-1',
        question: 'هدف اصلی از پیاده‌سازی سگمنت‌بندی و جداسازی بخش‌های مختلف در زیرساخت شبکه چیست؟',
        options: [
          'افزایش ترافیک برودکست در کل شبکه',
          'کنترل دامنه انتشار برودکست و افزایش امنیت و کارایی',
          'کاهش تعداد سوئیچ‌های مورد نیاز',
          'حذف نیاز به آدرس‌دهی IP'
        ],
        correctOptionIndex: 1,
        explanation: 'جداسازی و ایجاد VLANها باعث محدود شدن دامنه‌های برودکست (Broadcast Domain) و بهبود امنیت و ترافیک شبکه می‌گردد.'
      },
      {
        id: 'dq-2',
        question: 'کدام گزینه از مهم‌ترین اصول نگهداری و پایداری کدهای پروژه‌های فرانت‌اند و بک‌اند است؟',
        options: [
          'عدم استفاده از مستندات و کامنت‌گذاری',
          'استفاده از تایپ‌سیفتی قوی با TypeScript، مدیریت خطا و تست‌های مداوم',
          'تغییر کدهای سرور به صورت مستقیم روی پروداکشن',
          'ذخیره تمام اطلاعات در متغیرهای سراسری مرورگر'
        ],
        correctOptionIndex: 1,
        explanation: 'تایپ‌اسکریپت و ماژولاربندی صحیح کدها خطاهای زمان اجرا را به شدت کاهش داده و توسعه تیمی را پایدار می‌سازد.'
      }
    ]
  };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);
  const [issuedCertificate, setIssuedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
    setIsSubmitted(true);

    if (scorePercent >= quiz.passScorePercent) {
      const cert = store.generateCertificate(course.id, scorePercent);
      setIssuedCertificate(cert);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      }
    });
    const percent = Math.round((correctCount / quiz.questions.length) * 100);
    return { correctCount, total: quiz.questions.length, percent, isPassed: percent >= quiz.passScorePercent };
  };

  const scoreInfo = isSubmitted ? calculateScore() : null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">{quiz.title}</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                شرط قبولی: کسب حداقل {quiz.passScorePercent}٪ نمره برای دریافت گواهینامه رسمی
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span dir="ltr">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Question Progress bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>سوال {currentQuestionIndex + 1} از {quiz.questions.length}</span>
                <span>پاسخ داده شده: {Object.keys(selectedAnswers).length} از {quiz.questions.length}</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>

              {/* Current Question */}
              {quiz.questions[currentQuestionIndex] && (
                <div className="space-y-4">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentQuestionIndex + 1}. {quiz.questions[currentQuestionIndex].question}
                  </h4>

                  <div className="space-y-2.5">
                    {quiz.questions[currentQuestionIndex].options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                      return (
                        <div
                          key={oIdx}
                          onClick={() => handleSelectOption(currentQuestionIndex, oIdx)}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 font-bold'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                          }`}
                        >
                          <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">{opt}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-600'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>سوال قبلی</span>
                </button>

                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>سوال بعدی</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ثبت نهایی و اعلام نتیجه آزمون</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Result View
            <div className="space-y-6 text-center">
              <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-xl ${
                scoreInfo?.isPassed
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-red-500 text-white shadow-red-500/20'
              }`}>
                {scoreInfo?.isPassed ? <Award className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
              </div>

              <div>
                <h4 className="text-xl font-black">
                  {scoreInfo?.isPassed ? 'تبریک! شما در آزمون قبول شدید' : 'متأسفانه نمره قبولی را کسب نکردید'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  نمره شما: {scoreInfo?.percent}٪ ({scoreInfo?.correctCount} پاسخ صحیح از {scoreInfo?.total} سوال)
                </p>
              </div>

              {scoreInfo?.isPassed && issuedCertificate && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-right">
                    <p className="font-bold flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>گواهینامه پایان دوره با شماره {issuedCertificate.certificateNumber} صادر شد</span>
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                      امکان مشاهده، دانلود و استعلام رسمی گواهینامه برای شما فعال گردید.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onViewCertificate(issuedCertificate);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    مشاهده و چاپ گواهینامه رسمی
                  </button>
                </div>
              )}

              {/* Questions Review */}
              <div className="text-right space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h5 className="text-xs font-bold text-slate-700 dark:text-slate-300">تحلیل و پاسخ‌های صحیح آزمون:</h5>
                <div className="space-y-3">
                  {quiz.questions.map((q, idx) => {
                    const userAns = selectedAnswers[idx];
                    const isCorrect = userAns === q.correctOptionIndex;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border text-xs text-right space-y-2 ${
                          isCorrect
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                            : 'bg-red-50/40 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                        }`}
                      >
                        <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{idx + 1}. {q.question}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isCorrect ? 'صحیح' : 'نادرست'}
                          </span>
                        </div>

                        <div className="text-slate-600 dark:text-slate-400 text-[11px]">
                          پاسخ صحیح: <strong className="text-slate-900 dark:text-slate-200">{q.options[q.correctOptionIndex]}</strong>
                        </div>

                        <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                          نکته آموزشی: {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {!scoreInfo?.isPassed && (
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedAnswers({});
                    setCurrentQuestionIndex(0);
                    setTimeLeft(quiz.timeLimitMinutes * 60);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>تلاش مجدد در آزمون</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
