import React from 'react';
import {
  Terminal,
  ShieldCheck,
  Award,
  Users,
  BookOpen,
  Cpu,
  Server,
  Code2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Mail,
  Phone,
  Layers
} from 'lucide-react';
import { store } from '../services/store';

interface AboutUsViewProps {
  onNavigateToCourses: () => void;
  onNavigateToContact: () => void;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({
  onNavigateToCourses,
  onNavigateToContact
}) => {
  const settings = store.settings;
  const courses = store.courses;

  const stats = [
    { label: 'دانشجویان فارغ‌التحصیل', value: '۳,۵۰۰+', icon: Users, desc: 'در سراسر کشور و سازمان‌های برتر' },
    { label: 'ساعت آموزش ویدیویی', value: '۴۵۰+', icon: BookOpen, desc: 'کیفیت بالا با فایل‌های سناریو' },
    { label: 'سناریوی عملی پکت‌تریسر', value: '۱۲۰+', icon: Server, desc: 'تست شده در سیسکو و لینوکس' },
    { label: 'رضایت‌مندی دانشجویان', value: '۹۹.۲٪', icon: Award, desc: 'پشتیبانی دائمی مدرسین' },
  ];

  const instructors = [
    {
      name: 'مهندس محمدرضا قاسمی',
      role: 'مدرس ارشد سیسکو، دیتاسنتر و امنیت شبکه',
      badge: 'CCNP Enterprise / CCIE Candidate',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      experience: '۱۲ سال سابقه طراحی و پشتیبانی دیتاسنترهای دولتی و خصوصی',
      coursesCount: courses.filter(c => c.category === 'network').length
    },
    {
      name: 'مهندس آرش سپهری',
      role: 'سینیور دولوپر فول‌استک و مدرس وب',
      badge: 'React 19 / Next.js Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      experience: 'توسعه‌دهنده بیش از ۴۰ پروژه تجاری سازمانی و سامانه تحت وب',
      coursesCount: courses.filter(c => c.category === 'web').length
    },
    {
      name: 'مهندس سهراب پاشایی',
      role: 'متخصص دوآپس، لینوکس و کلاود زیرساخت',
      badge: 'LPIC-3 / Docker & K8s Expert',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      experience: 'مدیریت خوشه‌های کوبرنتیز و پایپ‌لاین‌های CI/CD',
      coursesCount: courses.filter(c => c.category === 'devops' || c.category === 'security').length
    }
  ];

  const pillars = [
    {
      title: 'آموزش کاملاً کاربردی و پروژه‌محور',
      desc: 'هیچ دوره‌ای در مهرادینت تئوری محض نیست. تمام مفاهیم با فایل‌های واقعی Cisco Packet Tracer، EVE-NG و سورس‌کدهای تست شده آموزش داده می‌شوند.',
      icon: Cpu,
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      title: 'دسترسی مادام‌العمر و به‌روزرسانی رایگان',
      desc: 'با یک‌بار خرید هر دوره، به تمامی آپدیت‌های آینده، جلسات تکمیلی و سناریوهای بازنگری شده دسترسی همیشگی خواهید داشت.',
      icon: ShieldCheck,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      title: 'پشتیبانی مستقیم و رفع اشکال تیکتی',
      desc: 'تیکت‌های شما مستقیماً توسط خود مدرس دوره پاسخ داده می‌شود تا هیچ سوال مبهمی در ذهن شما باقی نماند.',
      icon: Award,
      color: 'text-amber-600 bg-amber-50'
    },
    {
      title: 'درگاه پرداخت شاپرک و تحویل آنی',
      desc: 'بلافاصله پس از پرداخت اینترنتی، دوره‌ها در پنل شما فعال شده و لینک دانلود مستقیم فایل‌ها فعال می‌گردد.',
      icon: Layers,
      color: 'text-cyan-600 bg-cyan-50'
    }
  ];

  return (
    <div className="space-y-16 pb-16" dir="rtl">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>درباره مجموعه مهندسی و آکادمی مهرادینت</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            آموزش تخصصی شبکه، وب، برنامه‌نویسی و انجام پروژه‌های کامپیوتری
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-light">
            هدف ما تربیت متخصصان کارآزموده و اجرای پروژه‌های استاندارد فناوری اطلاعات در سازمان‌ها و شرکت‌های سراسر کشور است.
          </p>


          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onNavigateToCourses}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
            >
              <span>مشاهده لیست دوره‌های آموزشی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>تماس و مشاوره رایگان</span>
              <Mail className="w-4 h-4 text-indigo-400" />
            </button>
          </div>
        </div>
      </section>

      {/* KPI Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <s.icon className="w-6 h-6" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                {s.value}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">{s.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story & About Text (Synchronized with Admin Settings) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">داستان و چشم‌انداز مجموعه مهندسی و آکادمی مهرادینت</h2>
              <p className="text-xs text-slate-400">تعهد ما به کیفیت علمی، اجرای استاندارد پروژه‌ها و مهارت‌های مورد نیاز بازار کار</p>
            </div>
          </div>

          <div className="text-slate-600 text-sm leading-loose whitespace-pre-line font-light">
            {settings.aboutText}
          </div>
        </div>
      </section>

      {/* 4 Pillars of Mehradinet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-black text-slate-900">چرا متخصصان و شرکت‌ها، مهرادینت را انتخاب می‌کنند؟</h2>
          <p className="text-xs text-slate-500 mt-2">اصول کاری، تعهدات قراردادی و استانداردهایی که در آموزش و پروژه‌ها به آن پایبندیم</p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-300 transition-all shadow-xs flex items-start gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.color}`}>
                <p.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-indigo-600 mb-1 font-mono">FACULTY & INSTRUCTORS</div>
          <h2 className="text-2xl font-black text-slate-900">اساتید و منتورهای آکادمی</h2>
          <p className="text-xs text-slate-500 mt-1">تیمی از مهندسان با سابقه اجرایی در دیتاسنترها و پروژه‌های ملی</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructors.map((inst, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group"
            >
              <div className="relative mb-4">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-50 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                  استاد دوره
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-1">{inst.name}</h3>
              <div className="text-xs text-indigo-600 font-medium mt-0.5 mb-2">{inst.role}</div>

              <div className="inline-block bg-slate-100 text-slate-700 font-mono text-[11px] px-2.5 py-1 rounded-lg mb-3">
                {inst.badge}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                {inst.experience}
              </p>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>تعداد دوره‌ها:</span>
                <span className="font-bold text-slate-700 font-mono">{inst.coursesCount} دوره</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Equipment Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs text-cyan-400 font-mono">LABS & PHYSICAL INFRASTRUCTURE</div>
            <h3 className="text-2xl font-black text-white">لابراتوار مجهز تجهیزات واقعی شبکه</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              سناریوهای آکادمی پارس‌نت روی سوئیچ‌های Catalyst لایه ۳ سیسکو، روترهای سری ۲۹۰۰ و روتربردهای میکروتیک تست و اجرا شده‌اند تا دانشجویان با خیالی آسوده وارد بازار کار شوند.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onNavigateToCourses}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-md text-center"
            >
              مشاهده سرفصل دوره‌ها
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all text-center"
            >
              مشاوره ثبت‌نام
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
