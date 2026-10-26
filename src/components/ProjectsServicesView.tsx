import React, { useState, useMemo } from 'react';
import { 
  Server, ShieldCheck, Terminal, Layers, Code2, Layout, Cpu, 
  CheckCircle2, Clock, Phone, Send, ArrowLeft, Search, HelpCircle, 
  Award, FileText, Check, AlertCircle, Sparkles, ChevronDown, 
  ChevronUp, User, Building, MapPin, MessageSquare, ExternalLink,
  Laptop, Database, RefreshCw, Radio
} from 'lucide-react';
import { store } from '../services/store';
import { ITServiceItem, ProjectRequest, ProjectServiceCategory, ProjectUrgency, ProjectStatus } from '../types';

interface ProjectsServicesViewProps {
  onBackToHome?: () => void;
}

export const ProjectsServicesView: React.FC<ProjectsServicesViewProps> = ({ onBackToHome }) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'network' | 'system' | 'dev'>('all');
  const [selectedServiceForOrder, setSelectedServiceForOrder] = useState<ITServiceItem | null>(null);
  
  // Tracking section state
  const [trackingQuery, setTrackingQuery] = useState('');
  const [searchedProject, setSearchedProject] = useState<ProjectRequest | null>(null);
  const [trackingNotFound, setTrackingNotFound] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);

  // Form submission state
  const [formData, setFormData] = useState({
    category: 'active-network' as ProjectServiceCategory,
    title: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    organization: '',
    description: '',
    urgency: 'normal' as ProjectUrgency,
    budgetRange: '۱۰ تا ۳۰ میلیون تومان',
    location: 'تهران و کرج',
    preferredContact: 'phone' as 'phone' | 'telegram' | 'whatsapp' | 'email'
  });

  const [submittedRequest, setSubmittedRequest] = useState<ProjectRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = store.projectServices;

  // Filtered services
  const filteredServices = useMemo(() => {
    if (activeCategoryFilter === 'all') return services;
    if (activeCategoryFilter === 'network') {
      return services.filter(s => s.category === 'passive-network' || s.category === 'active-network');
    }
    if (activeCategoryFilter === 'system') {
      return services.filter(s => s.category === 'os-setup' || s.category === 'virtualization' || s.category === 'software-install' || s.category === 'it-support');
    }
    if (activeCategoryFilter === 'dev') {
      return services.filter(s => s.category === 'web-design' || s.category === 'custom-programming');
    }
    return services;
  }, [services, activeCategoryFilter]);

  // Handle service pre-selection for order form
  const handleSelectServiceToOrder = (service: ITServiceItem) => {
    setSelectedServiceForOrder(service);
    setFormData(prev => ({
      ...prev,
      category: service.category,
      title: `درخواست ${service.title}`
    }));

    const formEl = document.getElementById('project-order-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submit handler
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.clientName || !formData.clientPhone || !formData.description) {
      store.addToast({
        id: `err-${Date.now()}`,
        type: 'error',
        title: 'اطلاعات ناقص',
        message: 'لطفاً نام، شماره تماس، عنوان و شرح پروژه را تکمیل فرمایید.'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedCategoryObj = services.find(s => s.category === formData.category);
      const newReq = store.createProjectRequest({
        title: formData.title,
        category: formData.category,
        categoryTitle: selectedCategoryObj ? selectedCategoryObj.title : 'خدمات فنی و مهندسی',
        clientName: formData.clientName,
        clientPhone: formData.clientPhone,
        clientEmail: formData.clientEmail || undefined,
        organization: formData.organization || undefined,
        description: formData.description,
        urgency: formData.urgency,
        budgetRange: formData.budgetRange,
        location: formData.location,
        preferredContact: formData.preferredContact
      });

      setSubmittedRequest(newReq);
      setIsSubmitting(false);

      // Reset form
      setFormData({
        category: 'active-network',
        title: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        organization: '',
        description: '',
        urgency: 'normal',
        budgetRange: '۱۰ تا ۳۰ میلیون تومان',
        location: 'تهران و کرج',
        preferredContact: 'phone'
      });
    }, 600);
  };

  // Tracking query handler
  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingQuery.trim().toUpperCase();
    if (!query) return;

    const found = store.projectRequests.find(r => 
      r.trackingCode.toUpperCase() === query || 
      r.clientPhone.includes(query) ||
      (r.trackingCode.replace(/\D/g, '') === query.replace(/\D/g, ''))
    );

    if (found) {
      setSearchedProject(found);
      setTrackingNotFound(false);
    } else {
      setSearchedProject(null);
      setTrackingNotFound(true);
    }
  };

  // Map icons
  const renderServiceIcon = (category: ProjectServiceCategory) => {
    switch (category) {
      case 'software-install':
        return <Laptop className="w-6 h-6 text-indigo-400" />;
      case 'os-setup':
        return <Server className="w-6 h-6 text-cyan-400" />;
      case 'virtualization':
        return <Layers className="w-6 h-6 text-purple-400" />;
      case 'passive-network':
        return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'active-network':
        return <Radio className="w-6 h-6 text-blue-400" />;
      case 'web-design':
        return <Layout className="w-6 h-6 text-emerald-400" />;
      case 'custom-programming':
        return <Code2 className="w-6 h-6 text-rose-400" />;
      case 'it-support':
      default:
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
    }
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'pending':
        return { label: 'ثبت اولیه و انتظار بررسی', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'reviewing':
        return { label: 'در حال ارزیابی فنی کارشناس', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'consultation':
        return { label: 'هماهنگی و مشاوره فنی', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'approved':
        return { label: 'تایید نهایی و صدور پیش‌فاکتور', color: 'bg-teal-100 text-teal-800 border-teal-300' };
      case 'in_progress':
        return { label: 'در حال اجرا و پیاده‌سازی', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'completed':
        return { label: 'تحویل نهایی با گارانتی', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'cancelled':
        return { label: 'لغو شده', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    }
  };

  const getStatusStepIndex = (status: ProjectStatus) => {
    switch (status) {
      case 'pending': return 1;
      case 'reviewing': return 2;
      case 'consultation': return 3;
      case 'approved': return 4;
      case 'in_progress': return 5;
      case 'completed': return 6;
      case 'cancelled': return 0;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 pb-20 selection:bg-indigo-500 selection:text-white" dir="rtl">
      
      {/* 1. HERO BANNER */}
      <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-right">
          {/* Top kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>واحد مهندسی و اجرای پروژه‌های کامپیوتری و شبکه مهرادینت</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 max-w-4xl">
            پذیرش و اجرای تخصصی پروژه‌های کامپیوتر، شبکه، سرور و برنامه‌نویسی
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8 font-light">
            تیم مهندسی مهرادینت آماده همکاری با شرکت‌ها، سازمان‌ها و کسب‌وکارهای سراسر کشور در زمینه‌های کابل‌کشی پسیو، تجهیزات اکتیو سیسکو و میکروتیک، راه‌اندازی سرور، مجازی‌سازی دیتاسنتر، طراحی سایت‌های مدرن و توسعه نرم‌افزارهای اختصاصی با عقد قرارداد معتبر و ضمانت کیفیت است.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('project-order-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>ثبت آنلاین درخواست پروژه</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('project-tracker-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>پیگیری وضعیت سفارش ثبت‌شده</span>
            </button>

            <a
              href="tel:02188456789"
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-sm font-medium transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>مشاوره تلفنی مستقیم: ۰۲۱-۸۸۴۵۶۷۸۹</span>
            </a>
          </div>

          {/* 4 Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-10 border-t border-slate-800/80">
            <div className="bg-slate-850/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-white font-mono">+۱۴۰</div>
              <div className="text-xs text-slate-400 mt-1">پروژه موفق شبکه و سرور اجرا شده</div>
            </div>
            <div className="bg-slate-850/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-emerald-400 font-mono">۱۰۰٪</div>
              <div className="text-xs text-slate-400 mt-1">قرارداد رسمی و صدور فاکتور معتبر</div>
            </div>
            <div className="bg-slate-850/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-cyan-400 font-mono">۲۴/۷</div>
              <div className="text-xs text-slate-400 mt-1">پشتیبانی و رفع عیب اضطراری SLA</div>
            </div>
            <div className="bg-slate-850/60 p-4 rounded-2xl border border-slate-800">
              <div className="text-2xl font-black text-amber-400 font-mono">۱۲ ماه</div>
              <div className="text-xs text-slate-400 mt-1">گارانتی کتبی خدمات پسیو و نرم‌افزار</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SERVICES CATALOG GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>کاتالوگ خدمات مهندسی و اجرایی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              دامنه تخصص‌ها و خدمات قابل سفارش
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-light">
              تمامی پروژه‌ها توسط مهندسان مجرب با ارائه چک‌لیست تست و مستندات فنی تحویل داده می‌شوند.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1.5 rounded-2xl">
            {[
              { id: 'all', label: 'همه خدمات' },
              { id: 'network', label: 'شبکه و زیرساخت (پسیو و اکتیو)' },
              { id: 'system', label: 'سرور، مجازی‌سازی و سیستم‌عامل' },
              { id: 'dev', label: 'طراحی سایت و برنامه‌نویسی' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryFilter(tab.id as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === tab.id
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-xl ${
                service.isPopular 
                  ? 'border-indigo-300 ring-1 ring-indigo-200 shadow-md' 
                  : 'border-slate-200/90 hover:border-indigo-300 shadow-sm'
              }`}
            >
              {/* Card Top */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {renderServiceIcon(service.category)}
                  </div>
                  {service.isPopular && (
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold">
                      پرتکرار و پرطرفدار
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-mono text-indigo-600 font-semibold mb-1">
                  {service.englishTitle}
                </div>

                <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-2.5 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-light mb-5">
                  {service.shortDescription}
                </p>

                {/* Key Features Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-100 mb-5">
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5">شاخص‌های فنی و اجرایی:</div>
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables snippet */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70 mb-4 text-xs text-slate-700">
                  <div className="font-bold text-[11px] text-slate-800 mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>خروجی و تعهد تحویل:</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-light line-clamp-2">
                    {service.deliverables[0]}
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {service.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] text-slate-400 font-light">زمان تحویل برآوردی:</div>
                  <div className="text-xs font-bold text-slate-800">{service.estimatedDelivery}</div>
                </div>

                <button
                  onClick={() => handleSelectServiceToOrder(service)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>سفارش این خدمت</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. STEP-BY-STEP WORKFLOW */}
      <div className="bg-white border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
              شفافیت در همکاری و اجرا
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              مراحل اجرای پروژه در مهرادینت
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
              از لحظه ثبت درخواست تا پشتیبانی پس از تحویل، فرایندی گام‌به‌گام و مستند را با شما پیش می‌بریم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: '۱',
                title: 'ثبت درخواست و مشاوره اولیه',
                desc: 'تکمیل فرم آنلاین یا تماس تلفنی، ارزیابی اولیه دامنه کار و تعیین نیازهای کارفرما ظرف کمتر از ۲ ساعت.',
                icon: Phone
              },
              {
                step: '۲',
                title: 'بررسی فنی و صدور پیش‌فاکتور',
                desc: 'بازدید میدانی یا دریافت جزئیات، تدوین RFP فنی، برآورد دقیق قیمت و انعقاد قرارداد رسمی.',
                icon: FileText
              },
              {
                step: '۳',
                title: 'پیاده‌سازی و استقرار استاندارد',
                desc: 'کابل‌کشی، کانفیگ، کدنویسی و راه‌اندازی منطبق بر استانداردهای مهندسی Cisco، VMware و TIA.',
                icon: Cpu
              },
              {
                step: '۴',
                title: 'تست، تحویل و دوره گارانتی',
                desc: 'تست‌های زیر بار، تحویل مستندات فنی و پسوردها، آموزش کاربری به پرسنل و آغاز دوره گارانتی SLA.',
                icon: ShieldCheck
              }
            ].map((st, idx) => (
              <div key={idx} className="relative p-6 rounded-3xl bg-slate-50 border border-slate-200/90 text-right">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center mb-4 shadow-md shadow-indigo-600/20 font-mono">
                  {st.step}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. REAL-TIME PROJECT TRACKER TOOL */}
      <div id="project-tracker-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <Search className="w-3.5 h-3.5" />
              <span>سامانه استعلام آنلاین پیشرفت پروژه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              پیگیری بلادرنگ وضعیت پروژه ثبت‌شده
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
              کد پیگیری اختصاصی خود (مثلاً <span className="font-mono text-amber-300 font-bold">PRJ-1403-9124</span>) یا شماره تلفن همراه ثبت‌شده را وارد کنید تا گزارش لحظه‌ای پیشرفت، مهندس مسئول و یادداشت‌های فنی را مشاهده نمایید.
            </p>

            {/* Tracker Form */}
            <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  value={trackingQuery}
                  onChange={(e) => {
                    setTrackingQuery(e.target.value);
                    setTrackingNotFound(false);
                  }}
                  placeholder="کد رهگیری (مثلاً PRJ-1403-9124) یا شماره موبایل..."
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pr-11 pl-4 py-3 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-all shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>استعلام وضعیت</span>
              </button>
            </form>

            {trackingNotFound && (
              <div className="mt-4 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>سفارشی با این کد یا شماره تماس یافت نشد. لطفاً کد رهگیری را مجدداً بررسی فرمایید یا با پشتیبانی تماس بگیرید.</span>
              </div>
            )}
          </div>

          {/* Searched Project Details Result */}
          {searchedProject && (
            <div className="mt-8 pt-8 border-t border-slate-800 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-base font-black text-cyan-400 tracking-wider">
                      {searchedProject.trackingCode}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(searchedProject.status).color}`}>
                      {getStatusBadge(searchedProject.status).label}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1.5">{searchedProject.title}</h3>
                </div>

                <div className="text-xs text-slate-300 space-y-1 text-right">
                  <div>کارفرما: <span className="text-white font-bold">{searchedProject.clientName}</span> {searchedProject.organization ? `(${searchedProject.organization})` : ''}</div>
                  <div>تاریخ ثبت اولیه: <span className="font-mono text-slate-400">{searchedProject.createdAt}</span></div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="my-6">
                <div className="text-xs font-bold text-slate-300 mb-3">مراحل پیشرفت پروژه:</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { title: 'ثبت اولیه', step: 1 },
                    { title: 'بررسی فنی', step: 2 },
                    { title: 'مشاوره و تایید', step: 3 },
                    { title: 'در حال اجرا', step: 5 },
                    { title: 'تحویل نهایی', step: 6 }
                  ].map(m => {
                    const currentIdx = getStatusStepIndex(searchedProject.status);
                    const isDone = currentIdx >= m.step;
                    const isCurrent = currentIdx === m.step;

                    return (
                      <div 
                        key={m.step}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isDone 
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                            : isCurrent
                            ? 'bg-indigo-950 border-indigo-400 text-indigo-200 ring-2 ring-indigo-500/30'
                            : 'bg-white/5 border-white/10 text-slate-500'
                        }`}
                      >
                        <div className="text-xs font-bold">{m.title}</div>
                        <div className="text-[10px] mt-1 font-mono">
                          {isDone ? 'انجام شد ✓' : isCurrent ? 'مرحله فعال' : 'در انتظار'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Note & Assigned Engineer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-cyan-400 font-bold mb-1">آخرین گزارش پیشرفت فنی:</div>
                  <p className="text-slate-300 leading-relaxed font-light">
                    {searchedProject.statusNotes || 'پروژه در جریان بررسی و استقرار طبق زمان‌بندی می‌باشد.'}
                  </p>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  {searchedProject.assignedEngineer && (
                    <div>
                      <span className="text-slate-400">مهندس ناظر پروژه: </span>
                      <span className="text-white font-bold">{searchedProject.assignedEngineer}</span>
                    </div>
                  )}
                  {searchedProject.estimatedDelivery && (
                    <div>
                      <span className="text-slate-400">تاریخ تحویل تخمینی: </span>
                      <span className="text-amber-300 font-mono font-bold">{searchedProject.estimatedDelivery}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400">فوریت اجرا: </span>
                    <span className="text-white">
                      {searchedProject.urgency === 'enterprise' ? 'سازمانی (مقیاس بزرگ)' : searchedProject.urgency === 'urgent' ? 'فوری' : 'عادی'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. INTERACTIVE PROJECT ORDER FORM */}
      <div id="project-order-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black shadow-md">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  فرم آنلاین ثبت و استعلام قیمت پروژه
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                  مشخصات نیاز خود را بنویسید؛ کارشناسان فنی مهرادینت ظرف ۲ ساعت کاری با شما تماس می‌گیرند.
                </p>
              </div>
            </div>
          </div>

          {submittedRequest ? (
            /* Celebration & Success Box */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <Check className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  درخواست شما با موفقیت ثبت شد!
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto font-light leading-relaxed">
                  سفارش پروژه شما دریافت گردید و کارشناس فنی مربوطه به زودی جهت هماهنگی اولیه و اعلام پیش‌فاکتور با شماره همراه ثبت‌شده تماس خواهد گرفت.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto">
                <div className="text-xs text-slate-500 mb-1">کد رهگیری اختصاصی پروژه شما:</div>
                <div className="text-2xl font-black font-mono text-indigo-700 tracking-wider">
                  {submittedRequest.trackingCode}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  این کد برای پیگیری لحظه‌ای پیشرفت پروژه و تماس‌های بعدی کاربرد دارد.
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setSubmittedRequest(null);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
                >
                  ثبت سفارش جدید
                </button>

                <button
                  onClick={() => {
                    setTrackingQuery(submittedRequest.trackingCode);
                    setSearchedProject(submittedRequest);
                    const el = document.getElementById('project-tracker-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all"
                >
                  مشاهده در بخش پیگیری پروژه
                </button>
              </div>
            </div>
          ) : (
            /* The Form */
            <form onSubmit={handleSubmitForm} className="p-6 sm:p-8 space-y-6">
              {/* Category picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  ۱. دسته‌بندی پروژه و خدمت درخواستی <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {services.map(srv => (
                    <button
                      key={srv.category}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: srv.category }))}
                      className={`p-3 rounded-2xl border text-right text-xs transition-all cursor-pointer flex flex-col justify-between ${
                        formData.category === srv.category
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900 ring-2 ring-indigo-500/20 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{srv.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block truncate">
                        {srv.englishTitle}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ۲. عنوان خلاصه پروژه یا خدمت <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="مثلاً: کابل‌کشی پسیو ۳۲ نود و کانفیگ سوئیچ سیسکو"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ۳. فوریت و اولویت زمانی پروژه
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'normal', label: 'عادی (معمولی)' },
                      { id: 'urgent', label: 'فوری (اضطراری)' },
                      { id: 'enterprise', label: 'سازمانی (مقیاس بزرگ)' }
                    ].map(u => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, urgency: u.id as any }))}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                          formData.urgency === u.id
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ۴. شرح دقیق نیازها، سیستم‌ها، تجهیزات و مشخصات فنی <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="لطفاً مشخصاتی مانند تعداد سیستم‌ها یا نودها، مدل سرورها، سیستم‌عامل مدنظر، نشانی محل پروژه (در صورت نیاز به حضور) و هر نکته مهم دیگر را یادداشت فرمایید..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all leading-relaxed"
                />
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نام و نام خانوادگی <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                    placeholder="مثال: مهندس راد"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    شماره تلفن همراه (پیامک رهگیری) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.clientPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientPhone: e.target.value }))}
                    placeholder="0912..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نام شرکت یا سازمان (اختیاری)
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    placeholder="نام شرکت یا کسب‌وکار"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Budget, Location, Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    برآورد تقریبی بودجه مدنظر
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-medium"
                  >
                    <option value="زیر ۵ میلیون تومان">زیر ۵ میلیون تومان</option>
                    <option value="۵ تا ۱۵ میلیون تومان">۵ تا ۱۵ میلیون تومان</option>
                    <option value="۱۵ تا ۳۵ میلیون تومان">۱۵ تا ۳۵ میلیون تومان</option>
                    <option value="۳۵ تا ۷۰ میلیون تومان">۳۵ تا ۷۰ میلیون تومان</option>
                    <option value="بالای ۷۰ میلیون تومان">بالای ۷۰ میلیون تومان (پروژه کلان)</option>
                    <option value="نیاز به جلسه برآورد فنی">نیاز به جلسه برآورد فنی</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    محدوده جغرافیایی / محل اجرا
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-medium"
                  >
                    <option value="تهران و حومه">تهران و حومه (حضور در محل کارگاه)</option>
                    <option value="کرج و استان البرز">کرج و استان البرز</option>
                    <option value="سایر شهرستان‌ها (اعزام کارشناس)">سایر شهرستان‌ها (اعزام تیم کارشناسی)</option>
                    <option value="ریموت و غیرحضوری (سراسر کشور)">ریموت و غیرحضوری (سراسر کشور / بین‌المللی)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    روش هماهنگی ترجیحی
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredContact: e.target.value as any }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-medium"
                  >
                    <option value="phone">تماس مستقیم تلفنی (توصیه شده)</option>
                    <option value="telegram">ارتباط از طریق پیام‌رسان تلگرام</option>
                    <option value="whatsapp">ارتباط در واتساپ</option>
                    <option value="email">ارسال پیش‌فاکتور و ارتباط ایمیلی</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>اطلاعات پروژه شما کاملاً محرمانه بوده و قرارداد عدم افشا (NDA) در صورت درخواست منعقد می‌گردد.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>در حال ثبت و صدور کد رهگیری...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ثبت نهایی و دریافت کد رهگیری پروژه</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};
