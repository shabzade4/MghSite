import React, { useState, useMemo } from 'react';
import { 
  Star, Quote, CheckCircle2, ThumbsUp, ShieldCheck, 
  MessageSquarePlus, Sparkles, Filter, Building2, 
  GraduationCap, Server, Leaf, ArrowLeft, X, Send, Award
} from 'lucide-react';
import { TestimonialItem, TestimonialCategory, NavigationTab } from '../types';
import { store } from '../services/store';

interface TestimonialsProps {
  onNavigate?: (tab: NavigationTab) => void;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  // 1. Project Clients
  {
    id: 'test-prj-1',
    category: 'project-clients',
    name: 'مهندس علیرضا بهرامی',
    role: 'مدیر فناوری اطلاعات و زیرساخت',
    organization: 'هلدینگ توسعه صنایع پارس',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'پروژه مجازی‌سازی دیتاسنتر ما با ۴ هوست VMware ESXi 8.0 و استوریج SAN، بدون حتی یک ثانیه قطعی سرویس‌های مالی و اداری سازمان در موعد مقرر تحویل داده شد. پشتیبانی و تعهد تیم مهندسی مهرادینت فوق‌العاده حرفه‌ای و منطبق بر استانداردهای جهانی است.',
    projectOrSubject: 'پروژه مجازی‌سازی VMware ESXi و استوریج SAN',
    date: '۱۴۰۳/۰۸/۰۲',
    verified: true,
    verifiedBadgeLabel: 'کارفرمای رسمی پروژه',
    tags: ['مجازی‌سازی', 'VMware', 'SAN Storage', 'زیرساخت'],
    helpfulCount: 42,
    featured: true
  },
  {
    id: 'test-prj-2',
    category: 'project-clients',
    name: 'دکتر هادی یزدانی',
    role: 'مدیرعامل و بنیان‌گذار',
    organization: 'فروشگاه زنجیره‌ای نت‌کالا',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'طراحی وب‌سایت اختصاصی ما با Next.js و React 19 توسط تیم توسعه مهرادینت انجام شد. سرعت بارگذاری زیر ۱.۲ ثانیه، اتصال بدون نقص به درگاه‌های بانکی شاپرک و سئوی فوق‌العاده قدرتمند از دستاوردهای این پروژه بود. فروش آنلاین ما در ماه اول ۳ برابر افزایش یافت.',
    projectOrSubject: 'طراحی وب‌سایت فروشگاهی با Next.js و سئو',
    date: '۱۴۰۳/۰۷/۲۵',
    verified: true,
    verifiedBadgeLabel: 'کارفرمای رسمی پروژه',
    tags: ['طراحی سایت', 'Next.js', 'React 19', 'سئو'],
    helpfulCount: 38,
    featured: true
  },
  {
    id: 'test-prj-3',
    category: 'project-clients',
    name: 'مهندس پیمان سهرابی',
    role: 'سرپرست شبکه و امنیت',
    organization: 'مجتمع تجاری اداری الماس غرب',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'کابل‌کشی ساخت‌یافته بیش از ۲۸۰ نود شبکه Cat6A، آرایش رک‌های دیتاسنتر و تست فلوک کامل خطوط توسط مهرادینت به بهترین شکل انجام شد. در بخش اکتیو هم فایروال فورتی‌گیت و روتینگ سیسکو کانفیگ گردید. شفافیت در پیش‌فاکتور و تحویل سریع برگ برنده این تیم است.',
    projectOrSubject: 'پسیو Cat6A، رک‌بندی و فایروال فورتی‌گیت',
    date: '۱۴۰۳/۰۷/۱۱',
    verified: true,
    verifiedBadgeLabel: 'کارفرمای رسمی پروژه',
    tags: ['پسیو شبکه', 'تست فلوک', 'Cisco', 'FortiGate'],
    helpfulCount: 29
  },

  // 2. Students & Academy Alumni
  {
    id: 'test-stu-1',
    category: 'students',
    name: 'مهندس وحید کاظمی',
    role: 'مهندس ارشد شبکه (شاغل در شرکت داده‌پردازی)',
    organization: 'دانش‌آموخته دوره CCNA',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'سناریوهای عملی این دوره در محیط‌های شبیه‌ساز EVE-NG و پکت‌تریسر بی‌نظیر هستند. تدریس مفهومی مباحث OSPF، BGP و تحلیل بسته‌ها با Wireshark باعث شد بلافاصله پس از پایان دوره در مصاحبه شغلی به عنوان Network Engineer پذیرفته شوم و گواهینامه رسمی مهرادینت رزومه‌ام را متمایز کرد.',
    projectOrSubject: 'دوره جامع مهندسی شبکه سیسکو (CCNA 200-301)',
    date: '۱۴۰۳/۰۷/۱۰',
    verified: true,
    verifiedBadgeLabel: 'دانشجوی دارای گواهینامه معتبر',
    tags: ['سیسکو', 'CCNA', 'EVE-NG', 'اشتغال'],
    helpfulCount: 54,
    featured: true
  },
  {
    id: 'test-stu-2',
    category: 'students',
    name: 'سارا میرزایی',
    role: 'متخصص امنیت و ادمین سیستم‌های لینوکس',
    organization: 'دانش‌آموخته دوره لینوکس و امنیت',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'پشتیبانی علمی دوره‌ها از طریق سیستم تیکتینگ واقعاً مثال‌زدنی است. هر سوال چالشی درباره سخت‌سازی امنیتی SSH و فایروال‌های IPTables داشتم، اساتید در کمتر از چند ساعت با جزئیات کامل و تست عملی پاسخ دادند. این دوره ارزش هر ریال هزینه را داشت.',
    projectOrSubject: 'دوره تخصصی لینوکس سرور و امنیت زیرساخت',
    date: '۱۴۰۳/۰۷/۱۴',
    verified: true,
    verifiedBadgeLabel: 'دانشجوی تایید شده',
    tags: ['لینوکس', 'امنیت سرور', 'پشتیبانی تیکتی'],
    helpfulCount: 31
  },
  {
    id: 'test-stu-3',
    category: 'students',
    name: 'امیررضا کریمی',
    role: 'توسعه‌دهنده فرانت‌اند و فریلنسر',
    organization: 'دانش‌آموخته دوره وب مدرن',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'کدنویسی تمیز، ساخت کامپوننت‌های مدرن و استقرار سایت در وب با استانداردهای روز ۲۰۲۵ در دوره آموزش داده شده است. هم‌اکنون پروژه‌های فریلنسری بین‌المللی انجام می‌دهم و پایه‌ام را مدیون آموزه‌های مهرادینت هستم.',
    projectOrSubject: 'دوره توسعه فرانت‌اند با React 19 و Tailwind CSS',
    date: '۱۴۰۳/۰۷/۱۵',
    verified: true,
    verifiedBadgeLabel: 'دانشجوی تایید شده',
    tags: ['React 19', 'Tailwind', 'فرانت‌اند', 'فریلنسری'],
    helpfulCount: 27
  },

  // 3. Organic Products Buyers
  {
    id: 'test-org-1',
    category: 'organic-buyers',
    name: 'دکتر احسان فرهمند',
    role: 'پزشک عمومی و پژوهشگر سلامت',
    organization: 'مشتری دائم محصولات ارگانیک',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'گردوی پوست‌کاغذی طالقان و عسل کوهستان سبلان را از مهرادینت سفارش دادم. بسته‌بندی وکیوم بسیار تمیز و بدون کوچکترین گردوغبار بود. طعم گردو چرب و سفید بدون ذره‌ای تلخی یا کهنگی بود. احساس آرامش می‌کنم که محصول دست‌اول بدون مواد نگهدارنده تهیه می‌کنم.',
    projectOrSubject: 'گردوی پوست‌کاغذی طالقان و عسل طبیعی سبلان',
    date: '۱۴۰۳/۰۸/۰۴',
    verified: true,
    verifiedBadgeLabel: 'خریدار تایید شده',
    tags: ['گردو طالقان', 'عسل سبلان', 'ارگانیک اصیل'],
    helpfulCount: 36,
    featured: true
  },
  {
    id: 'test-org-2',
    category: 'organic-buyers',
    name: 'مهندس نرگس شفیعی',
    role: 'کارشناس تغذیه و مربی ورزشی',
    organization: 'سفارش‌دهنده پک‌های ارگانیک',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    quote: 'فندق خندان اشکورات و زغال‌اخته الموت رسید. بسته‌بندی کلمن یخ‌دان عالی بود و حتی در گرمای مسیر کوچکترین آسیبی ندیده بود. رهگیری پستی و ارسال پیامک وضعیت توسط سامانه هم عالی کار کرد. قطعاً خرید مجدد خواهم داشت.',
    projectOrSubject: 'فندق خندان اشکورات و زغال‌اخته الموت',
    date: '۱۴۰۳/۰۷/۲۸',
    verified: true,
    verifiedBadgeLabel: 'خریدار تایید شده',
    tags: ['فندق اشکورات', 'زغال اخته', 'ارسال سرد'],
    helpfulCount: 22
  }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<TestimonialCategory>('all');
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem('mehradinet_testimonials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TESTIMONIALS;
  });

  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, boolean>>({});
  const [expandedQuotes, setExpandedQuotes] = useState<Record<string, boolean>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // New testimonial form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    organization: '',
    category: 'project-clients' as 'project-clients' | 'students' | 'organic-buyers',
    projectOrSubject: '',
    rating: 5,
    quote: ''
  });

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === 'all') return testimonials;
    return testimonials.filter(t => t.category === selectedCategory);
  }, [testimonials, selectedCategory]);

  // Handle helpful like
  const handleLike = (id: string) => {
    if (helpfulLikes[id]) return;
    
    setHelpfulLikes(prev => ({ ...prev, [id]: true }));
    setTestimonials(prev => {
      const updated = prev.map(t => t.id === id ? { ...t, helpfulCount: (t.helpfulCount || 0) + 1 } : t);
      try {
        localStorage.setItem('mehradinet_testimonials', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    store.addToast({
      id: `like-${Date.now()}`,
      type: 'success',
      title: 'سپاس از بازخورد شما',
      message: 'نظر شما به عنوان بازخورد مفید ثبت شد.'
    });
  };

  // Toggle quote expansion
  const toggleExpandQuote = (id: string) => {
    setExpandedQuotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Submit new review handler
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim() || !formData.projectOrSubject.trim()) {
      store.addToast({
        id: `err-${Date.now()}`,
        type: 'error',
        title: 'اطلاعات ناقص',
        message: 'لطفاً نام، عنوان خدمت/دوره و متن تجربه خود را یادداشت فرمایید.'
      });
      return;
    }

    const defaultAvatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    ];
    const randomAvatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];

    const newTestimonial: TestimonialItem = {
      id: `test-user-${Date.now()}`,
      category: formData.category,
      name: formData.name.trim(),
      role: formData.role.trim() || (formData.category === 'project-clients' ? 'کارفرما' : formData.category === 'students' ? 'دانشجو' : 'خریدار'),
      organization: formData.organization.trim() || undefined,
      avatar: randomAvatar,
      rating: formData.rating,
      quote: formData.quote.trim(),
      projectOrSubject: formData.projectOrSubject.trim(),
      date: new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()),
      verified: true,
      verifiedBadgeLabel: formData.category === 'project-clients' ? 'کارفرمای تایید شده' : formData.category === 'students' ? 'دانشجوی تایید شده' : 'خریدار تایید شده',
      tags: [formData.projectOrSubject.trim().split(' ')[0]],
      helpfulCount: 1,
      featured: false
    };

    const updated = [newTestimonial, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem('mehradinet_testimonials', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitModalOpen(false);
    setFormData({
      name: '',
      role: '',
      organization: '',
      category: 'project-clients',
      projectOrSubject: '',
      rating: 5,
      quote: ''
    });

    store.addToast({
      id: `sub-${Date.now()}`,
      type: 'success',
      title: 'تجربه شما با موفقیت ثبت شد',
      message: 'سپاس از همراهی شما! نظر شما در بخش تجربیات قرار گرفت.'
    });
  };

  return (
    <section className="py-14 select-none relative overflow-hidden" id="testimonials-section" dir="rtl">
      {/* Background soft ambient decor */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-3 shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>اعتماد، تجربه واقعی و رضایت ملموس</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              داستان‌های موفقیت و تجربیات همراهان مهرادینت
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed font-light">
              دیدگاه‌های موثق کارفرمایان پروژه‌های سازمانی IT و شبکه، متخصصان دانش‌آموخته آکادمی و خریداران محصولات ارگانیک روستایی.
            </p>
          </div>

          {/* Action button to share review */}
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>ثبت نظر و تجربه شما</span>
          </button>
        </div>

        {/* Trust Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs mb-10">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">۴.۹۵ <span className="text-xs text-slate-400 font-normal">از ۵</span></div>
              <div className="text-[11px] text-slate-500 font-medium">میانگین رضایت از ۵۲۰+ نظر</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Server className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">+۸۵ <span className="text-xs text-slate-400 font-normal">پروژه</span></div>
              <div className="text-[11px] text-slate-500 font-medium">اجرای موفق زیرساخت و شبکه</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">+۱,۴۵۰</div>
              <div className="text-[11px] text-slate-500 font-medium">دانشجوی شاغل در بازار کار IT</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">۹۹.۴٪</div>
              <div className="text-[11px] text-slate-500 font-medium">تعهد SLA و گارانتی سلامت کالا</div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>همه نظرات ({testimonials.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('project-clients')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'project-clients'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/40'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span>کارفرمایان پروژه‌های شبکه و IT ({testimonials.filter(t => t.category === 'project-clients').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('students')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'students'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/40'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>دانشجویان و متخصصان آکادمی ({testimonials.filter(t => t.category === 'students').length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('organic-buyers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'organic-buyers'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>خریداران سوغات و خشکبار ارگانیک ({testimonials.filter(t => t.category === 'organic-buyers').length})</span>
          </button>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map(item => {
            const isLiked = helpfulLikes[item.id];
            const isExpanded = expandedQuotes[item.id];
            const isLongText = item.quote.length > 200;

            return (
              <div
                key={item.id}
                className="bg-slate-50/60 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/15 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] relative group"
              >
                {/* Quotation mark watermark */}
                <Quote className="w-10 h-10 text-slate-100 absolute top-5 left-5 pointer-events-none -rotate-12 transition-all duration-300 group-hover:scale-125 group-hover:text-indigo-100/80" />

                <div>
                  {/* Category & Badge Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-transform group-hover:scale-105 ${
                      item.category === 'project-clients'
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                        : item.category === 'students'
                        ? 'bg-cyan-50 text-cyan-700 border border-cyan-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {item.category === 'project-clients'
                        ? 'پروژه سازمانی و زیرساخت'
                        : item.category === 'students'
                        ? 'آکادمی و دانشجو'
                        : 'محصولات ارگانیک'}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors">
                      {item.date}
                    </span>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-transform duration-300 group-hover:scale-125 ${
                          i < item.rating
                            ? 'fill-amber-400 text-amber-400 group-hover:fill-amber-500 group-hover:text-amber-500 drop-shadow-xs'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-mono font-bold text-slate-600 group-hover:text-slate-900 group-hover:font-black transition-colors mr-1.5">
                      {item.rating}.۰
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 group-hover:text-slate-900 leading-relaxed font-light group-hover:font-normal mb-3 text-justify relative z-10 transition-colors">
                    «{isExpanded || !isLongText ? item.quote : `${item.quote.slice(0, 190)}...`}»
                  </p>

                  {isLongText && (
                    <button
                      type="button"
                      onClick={() => toggleExpandQuote(item.id)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors mb-4 block cursor-pointer"
                    >
                      {isExpanded ? 'بستن متن کامل' : 'مطالعه متن کامل'}
                    </button>
                  )}

                  {/* Project / Subject Tag */}
                  <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-indigo-50/50 border border-slate-100 group-hover:border-indigo-100 text-xs text-slate-600 group-hover:text-slate-800 mb-5 flex items-center gap-2 transition-colors">
                    {item.category === 'project-clients' && <Building2 className="w-4 h-4 text-indigo-500 group-hover:scale-110 shrink-0 transition-transform" />}
                    {item.category === 'students' && <Award className="w-4 h-4 text-cyan-500 group-hover:scale-110 shrink-0 transition-transform" />}
                    {item.category === 'organic-buyers' && <Leaf className="w-4 h-4 text-emerald-500 group-hover:scale-110 shrink-0 transition-transform" />}
                    <span className="font-medium group-hover:font-bold truncate transition-colors">{item.projectOrSubject}</span>
                  </div>
                </div>

                {/* Person Information & Helpful Action */}
                <div className="pt-4 border-t border-slate-100 group-hover:border-indigo-100 flex items-center justify-between gap-3 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0 group-hover:scale-110 group-hover:ring-2 group-hover:ring-indigo-300 transition-all duration-300"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 group-hover:font-black truncate transition-colors">{item.name}</span>
                        {item.verified && (
                          <span title={item.verifiedBadgeLabel} className="inline-flex shrink-0 group-hover:scale-110 transition-transform">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 group-hover:text-slate-700 font-medium truncate transition-colors">{item.role}</div>
                      {item.organization && (
                        <div className="text-[10px] text-slate-400 group-hover:text-slate-600 font-medium truncate transition-colors">{item.organization}</div>
                      )}
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    type="button"
                    onClick={() => handleLike(item.id)}
                    className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer group-hover:scale-105 ${
                      isLiked
                        ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-white'
                    }`}
                    title="این نظر برای من مفید بود"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                    <span className="font-mono text-[11px] font-bold">{item.helpfulCount || 0}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Proof CTA Card */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="max-w-xl">
            <h3 className="text-lg sm:text-xl font-black text-white mb-2">
              شما هم می‌توانید داستان موفقیت بعدی مهرادینت باشید!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              چه برای ارتقای زیرساخت شبکه و برنامه‌نویسی سازمان خود نیازمند تیم مجرب هستید و چه خواهان یادگیری مهارت‌های بازار کار IT با مدارک معتبر، ما در کنارتان هستیم.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap w-full md:w-auto">
            {onNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('projects-services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer"
                >
                  <span>استعلام و ثبت پروژه مهندسی</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 text-xs font-bold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer"
                >
                  <span>مشاهده دوره‌های آکادمی</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>

      {/* SUBMISSION MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in" dir="rtl">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <MessageSquarePlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">ثبت تجربه و نظر شما</h3>
                  <p className="text-xs text-slate-500">دیدگاه شما پس از تایید در صفحه اصلی قرار خواهد گرفت</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نام و نام خانوادگی *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مهندس حسام اکبری"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    سمت شغلی یا تخصص
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="مثال: کارشناس ارشد شبکه"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    نام شرکت یا سازمان
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="مثال: داده گستران آرتین"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    زمینه همکاری *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 bg-white cursor-pointer font-medium"
                  >
                    <option value="project-clients">کارفرمای پروژه IT و شبکه</option>
                    <option value="students">دانشجو یا دانش‌آموخته آکادمی</option>
                    <option value="organic-buyers">خریدار محصولات ارگانیک</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    امتیاز شما به کیفیت خدمات *
                  </label>
                  <div className="flex items-center gap-1 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 text-slate-300 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-slate-700 mr-2">
                      ({formData.rating} از ۵)
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان پروژه، دوره یا محصول *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectOrSubject}
                  onChange={(e) => setFormData({ ...formData, projectOrSubject: e.target.value })}
                  placeholder="مثال: پروژه کابل‌کشی ساخت‌یافته و کانفیگ سوئیچ سیسکو یا دوره CCNA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  متن تجربه و نظر شما *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="تجربه خود از کیفیت خدمات، زمان‌بندی، پشتیبانی فنی یا کیفیت تدریس اساتید را با ما در میان بگذارید..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  انصراف
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>ثبت و انتشار نظر</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
