import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, ChevronDown, Search, Server, Leaf, GraduationCap, 
  CheckCircle2, ThumbsUp, ThumbsDown, ArrowLeft, PhoneCall, 
  MessageSquare, ShieldCheck, Truck, Sparkles, Filter, X
} from 'lucide-react';
import { FAQItem, FAQCategory, NavigationTab } from '../types';

interface FAQProps {
  onNavigate?: (tab: NavigationTab) => void;
}

const FAQ_ITEMS: FAQItem[] = [
  // 1. Projects & IT Services
  {
    id: 'faq-prj-1',
    category: 'projects-services',
    question: 'مراحل ثبت، استعلام قیمت و اجرای پروژه‌های IT و شبکه چگونه است؟',
    answer: 'فرایند اجرای پروژه‌ها در مهرادینت در ۴ گام استاندارد مهندسی انجام می‌شود: ۱) ثبت اولیه نیازمندی در فرم آنلاین یا مشاوره تلفنی رایگان، ۲) بررسی فنی توسط مهندس ناظر و صدور پیش‌فاکتور رسمی با زمان‌بندی دقیق، ۳) اجرای تخصصی پسیو، کانفیگ اکتیو، مجازی‌سازی یا برنامه‌نویسی نرم‌افزار، ۴) تست نهایی، مستندسازی کامل و ارائه دوره پشتیبانی و گارانتی عملکرد پایدار.',
    tags: ['استعلام قیمت', 'مراحل پروژه', 'پیش‌فاکتور', 'گارانتی'],
    actionLabel: 'ثبت سفارش و استعلام آنلاین پروژه',
    actionTab: 'projects-services',
    highlight: true
  },
  {
    id: 'faq-prj-2',
    category: 'projects-services',
    question: 'آیا قبل از شروع پروژه، قرارداد رسمی و قرارداد عدم افشای اطلاعات (NDA) منعقد می‌شود؟',
    answer: 'بله، قطعاً. حفظ محرمانگی داده‌ها، معماری شبکه و اسرار تجاری کسب‌وکار شما اولویت اول ماست. برای تمامی پروژه‌های سازمانی، توافق‌نامه رسمی محرمانگی اطلاعات (Non-Disclosure Agreement) همراه با مفاد دقیق ضمانت حسن انجام کار، زمان‌بندی فازها و جرایم تاخیر امضا می‌گردد.',
    tags: ['قرارداد رسمی', 'امنیت داده', 'NDA', 'ضمانت'],
    actionLabel: 'مشاوره محرمانگی و قرارداد',
    actionTab: 'contact'
  },
  {
    id: 'faq-prj-3',
    category: 'projects-services',
    question: 'در پروژه‌های مجازی‌سازی سرور (VMware / Proxmox) آیا امکان انتقال بدون قطعی (Zero Downtime) وجود دارد؟',
    answer: 'بله، با به‌کارگیری تکنولوژی‌های پیشرفته vMotion و Storage vMotion در پلتفرم‌های VMware vSphere 8 و Proxmox VE کلاستر، ماشین‌های مجازی فعال و سرویس‌های حیاتی سازمان شما بدون حتی یک ثانیه قطعی به زیرساخت جدید یا استوریج‌های پرسرعت NVMe/SAN منتقل می‌شوند.',
    tags: ['مجازی‌سازی', 'VMware ESXi', 'Proxmox', 'vMotion', 'بدون قطعی'],
    actionLabel: 'بررسی خدمات مجازی‌سازی',
    actionTab: 'projects-services'
  },
  {
    id: 'faq-prj-4',
    category: 'projects-services',
    question: 'کیفیت و استاندارد کابل‌کشی پسیو و کانفیگ اکتیو شبکه چگونه تضمین می‌شود؟',
    answer: 'کلیه بسترهای کابل‌کشی مسی و فیبر نوری با دستگاه‌های تستر مرجع فلوک (Fluke DSX-5000/8000) تست شده و سرتیفیکیت دیجیتال استاندارد TIA/EIA ارائه می‌شود. در بخش اکتیو نیز تجهیزات سیسکو، میکروتیک و فایروال‌های فورتی‌گیت تحت سناریوهای Failover، تست نفوذپذیری اولیه و آزمون بار ترافیکی تحویل داده می‌شوند.',
    tags: ['تست فلوک', 'پسیو شبکه', 'سیسکو', 'فورتی‌گیت', 'استاندارد'],
    actionLabel: 'جزئیات خدمات شبکه پسیو و اکتیو',
    actionTab: 'projects-services'
  },
  {
    id: 'faq-prj-5',
    category: 'projects-services',
    question: 'نحوه پیگیری لحظه‌ای پیشرفت پروژه با کد رهگیری اختصاصی چگونه است؟',
    answer: 'بلافاصله پس از ثبت سفارش، یک کد رهگیری منحصر‌به‌فرد (مانند PRJ-1403-XXXX) به شما اختصاص می‌یابد. با وارد کردن این کد در بخش «رهگیری پروژه» در صفحه خدمات یا در تب «پروژه‌های IT من» در پنل کاربری، می‌توانید پیشرفت ۵ مرحله‌ای، مهندس ناظر مسئول و تاریخ تحویل تخمینی را پایش کنید.',
    tags: ['کد رهگیری', 'پیگیری آنلاین', 'پنل مشتری', 'پیشرفت پروژه'],
    actionLabel: 'رهگیری وضعیت پروژه',
    actionTab: 'projects-services'
  },
  {
    id: 'faq-prj-6',
    category: 'projects-services',
    question: 'پشتیبانی فنی و نگهداری پس از تحویل پروژه به چه شکل خواهد بود؟',
    answer: 'تمام پروژه‌ها دارای ۱ الی ۶ ماه پشتیبانی فنی رایگان شامل رفع باگ، پاسخ به سوالات پرسنل و مانیتورینگ سلامت سرویس هستند. علاوه بر این، مشتریان می‌توانند قراردادهای پشتیبانی دوره‌ای IT با سطوح توافق خدمات (SLA) تعریف‌شده شامل اعزام کارشناس و پشتیبانی ریموت ۲۴/۷ منعقد نمایند.',
    tags: ['پشتیبانی فنی', 'SLA', 'گارانتی', 'نگهداری شبکه']
  },

  // 2. Organic Products & Farm-Direct Store
  {
    id: 'faq-org-1',
    category: 'organic-products',
    question: 'اصالت ارگانیک، تازگی و خلوص محصولات فروشگاه مهرادینت چگونه تضمین می‌شود؟',
    answer: 'تمام محصولات (گردوی پوست‌کاغذی طالقان، فندق خندان اشکورات رودسر، زغال‌اخته الموت قزوین، عسل طبیعی سبلان، چای بهاره لاهیجان و زعفران ممتاز قائنات) مستقیماً و بدون واسطه از باغداران بومی همان اقلیم برداشت شده‌اند. هر محصول دارای برگه اصالت و تاییدیه فاقد بودن از سموم و افزودنی‌های شیمیایی است.',
    tags: ['اصالت کالا', 'ارگانیک', 'گردو طالقان', 'فندق اشکورات', 'بدون واسطه'],
    actionLabel: 'ورود به فروشگاه محصولات ارگانیک',
    actionTab: 'organic-shop',
    highlight: true
  },
  {
    id: 'faq-org-2',
    category: 'organic-products',
    question: 'بسته‌بندی و ارسال محصولات ارگانیک به شهرستان‌ها چگونه است؟ آیا در مسیر خراب نمی‌شوند؟',
    answer: 'محصولات در بسته‌بندی‌های بهداشتی، زیپ‌کیپ چندلایه نفوذناپذیر در برابر رطوبت و اکسیژن وکیوم می‌شوند. برای میوه‌های تازه و اقلام حساس از جعبه‌های عایق و یخ‌دان برودتی (Cold-Pack) استفاده می‌شود. ارسال از طریق شرکت تیپاکس اکسپرس با بیمه کامل سلامت فیزیکی و تحویل ۲۴ الی ۴۸ ساعته انجام می‌پذیرد.',
    tags: ['ارسال تیپاکس', 'بسته‌بندی وکیوم', 'پوشش بیمه', 'Cold-Pack'],
    actionLabel: 'مشاهده جزئیات روش‌های ارسال',
    actionTab: 'organic-shop'
  },
  {
    id: 'faq-org-3',
    category: 'organic-products',
    question: 'شرایط ضمانت بازگشت وجه و مرجوعی کالا در فروشگاه ارگانیک چیست؟',
    answer: 'ما به کیفیت محصولات خود اطمینان ۱۰۰٪ داریم. چنانچه پس از دریافت بسته از طعم، بو، اندازه یا کیفیت محصول رضایت نداشتید، ظرف ۴۸ ساعت می‌توانید بسته را مرجوع نمایید و کل مبلغ واریزی بدون کسر هیچ هزینه‌ای در همان روز به حساب شما عودت داده خواهد شد.',
    tags: ['ضمانت بازگشت وجه', 'مرجوعی', 'گارانتی کیفیت']
  },
  {
    id: 'faq-org-4',
    category: 'organic-products',
    question: 'چگونه می‌توانم وضعیت ارسال سفارش ارگانیک و کد مرسوله تیپاکس را رهگیری کنم؟',
    answer: 'پس از ثبت سفارش، اطلاعات مرسوله در بخش «پیگیری سفارشات و مرسوله‌ها» در پنل کاربری ثبت شده و پیامک حاوی کد پیگیری تیپاکس برای شما ارسال می‌شود. همچنین با کلیک بر روی دکمه استعلام مستقیم، وضعیت بسته‌بندی در انبار تا تحویل درب منزل نمایش داده می‌شود.',
    tags: ['کد مرسوله', 'پیگیری سفارش', 'پنل کاربری', 'رهگیری پستی'],
    actionLabel: 'پیگیری سفارشات در پنل من',
    actionTab: 'student-panel'
  },
  {
    id: 'faq-org-5',
    category: 'organic-products',
    question: 'منظور از «تسویه مستقیم با باغداران بومی» در پلتفرم مهرادینت چیست؟',
    answer: 'مهرادینت صرفاً به عنوان یک پل تکنولوژی عمل می‌کند؛ ۸۵ الی ۹۰ درصد عواید حاصل از فروش مستقیماً به حساب بانکی باغداران و کشاورزان بومی واریز می‌شود تا ضمن کوتاه شدن دست واسطه‌ها، خریدار محصول اعلا با قیمت منصفانه دریافت کند و کشاورز نیز انگیزه تولید پایدار ارگانیک داشته باشد.',
    tags: ['حمایت از کشاورز', 'تجارت عادلانه', 'قیمت منصفانه']
  },

  // 3. Academy & Courses
  {
    id: 'faq-acd-1',
    category: 'academy',
    question: 'پس از ثبت‌نام در یک دوره، دسترسی به ویدیوها و فایل‌های تمرینی چگونه است؟',
    answer: 'بلافاصله پس از پرداخت، دوره در پنل کاربری شما فعال می‌شود. شما می‌توانید از طریق پلیر اختصاصی، ویدیوها را با کیفیت دلخواه آنلاین مشاهده کنید، جزوه و سناریوهای پکت تریسر و ایو ان‌جی را دانلود نمایید و یادداشت‌های تایم‌کد اختصاصی برای مرور سریع ذخیره کنید.',
    tags: ['دسترسی مادام‌العمر', 'پلیر آنلاین', 'دانلود سناریو', 'پنل دانشجو'],
    actionLabel: 'مشاهده دوره‌های آموزشی',
    actionTab: 'courses'
  },
  {
    id: 'faq-acd-2',
    category: 'academy',
    question: 'گواهینامه‌های رسمی مهرادینت به چه صورت صادر و استعلام می‌شوند؟',
    answer: 'پس از پایان ویدیوهای آموزشی و کسب نمره قبولی در آزمون تستی دوره، گواهینامه رسمی دوزبانه با کد یکتای کشوری و QR Code صادر می‌گردد. هر کارفرما یا موسسه می‌تواند با مراجعه به سامانه استعلام گواهینامه مهرادینت، اصالت و ریزنمرات دانشجو را به‌صورت آنلاین استعلام کند.',
    tags: ['گواهینامه رسمی', 'کد QR', 'استعلام آنلاین', 'آزمون آنلاین'],
    actionLabel: 'استعلام اصالت گواهینامه',
    actionTab: 'home'
  }
];

export const FAQ: React.FC<FAQProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-prj-1'); // Open first by default
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'yes' | 'no'>>({});

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter(item => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inQuestion = item.question.toLowerCase().includes(q);
      const inAnswer = item.answer.toLowerCase().includes(q);
      const inTags = item.tags.some(t => t.toLowerCase().includes(q));

      return inQuestion || inAnswer || inTags;
    });
  }, [selectedCategory, searchQuery]);

  // Toggle accordion item
  const handleToggle = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Handle helpful feedback
  const handleFeedback = (id: string, response: 'yes' | 'no') => {
    setHelpfulFeedback(prev => ({ ...prev, [id]: response }));
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: FAQ_ITEMS.length,
      'projects-services': FAQ_ITEMS.filter(i => i.category === 'projects-services').length,
      'organic-products': FAQ_ITEMS.filter(i => i.category === 'organic-products').length,
      academy: FAQ_ITEMS.filter(i => i.category === 'academy').length
    };
  }, []);

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs relative overflow-hidden" id="faq-section">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="max-w-4xl mx-auto text-center mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3 shadow-2xs">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>مرکز پرسش‌های پرتکرار و پاسخ‌های شفاف</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
          سوالات متداول خدمات پروژه‌های IT، شبکه و محصولات ارگانیک
        </h2>

        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
          پاسخ دقیق به تمام پرسش‌های شما پیرامون نحوه عقد قرارداد پروژه‌های مهندسی، تضمین عدم افشا (NDA)،
          اصالت نوبرانه‌های ارگانیک روستایی و گارانتی بازگشت وجه.
        </p>

        {/* Search bar */}
        <div className="mt-6 max-w-xl mx-auto relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute right-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در بین سوالات (مثال: گارانتی، قرارداد، ارسال تیپاکس، فلوک، عسل...)"
              className="w-full pr-11 pl-10 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 transition-all text-right"
              dir="rtl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                aria-label="پاک کردن جستجو"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-right text-[11px] text-slate-500 mt-2 px-1">
              تعداد {filteredItems.length} پاسخ مطابق با «{searchQuery}» پیدا شد
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>همه سوالات</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'all' ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'}`}>
              {categoryCounts.all}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('projects-services')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'projects-services'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/40'
            }`}
          >
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span>خدمات و پروژه‌های IT و شبکه</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'projects-services' ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'}`}>
              {categoryCounts['projects-services']}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('organic-products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'organic-products'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/40'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>محصولات و سوغات ارگانیک</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'organic-products' ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'}`}>
              {categoryCounts['organic-products']}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('academy')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'academy'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-200 hover:bg-cyan-50/40'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>دوره‌ها و گواهینامه‌ها</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'academy' ? 'bg-cyan-700 text-cyan-100' : 'bg-slate-100 text-slate-500'}`}>
              {categoryCounts.academy}
            </span>
          </button>
        </div>
      </div>

      {/* Accordion list */}
      <div className="max-w-4xl mx-auto space-y-3 relative z-10" dir="rtl">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-700 mb-1">پرسشی با این مشخصات یافت نشد!</h4>
            <p className="text-xs text-slate-500 mb-4">می‌توانید کلمه دیگری جستجو کرده یا سوال خود را مستقیماً با کارشناسان ما مطرح نمایید.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-indigo-600 font-bold hover:underline"
            >
              مشاهده تمامی سوالات متداول
            </button>
          </div>
        ) : (
          filteredItems.map(item => {
            const isExpanded = expandedId === item.id;
            const feedback = helpfulFeedback[item.id];

            return (
              <div
                key={item.id}
                className={`group transition-all duration-300 rounded-2xl border overflow-hidden hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl ${
                  isExpanded
                    ? item.category === 'organic-products'
                      ? 'bg-white border-emerald-400 shadow-md shadow-emerald-500/10'
                      : 'bg-white border-indigo-400 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-50/70 hover:bg-white border-slate-200/90 hover:border-indigo-300 hover:shadow-indigo-500/10'
                }`}
              >
                {/* Accordion header button */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-right p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className={`p-2 rounded-xl shrink-0 mt-0.5 sm:mt-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-sm ${
                      item.category === 'projects-services'
                        ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                        : item.category === 'organic-products'
                        ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                        : 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white'
                    }`}>
                      {item.category === 'projects-services' && <Server className="w-4 h-4" />}
                      {item.category === 'organic-products' && <Leaf className="w-4 h-4" />}
                      {item.category === 'academy' && <GraduationCap className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded transition-transform group-hover:scale-105 ${
                          item.category === 'projects-services'
                            ? 'bg-indigo-50 text-indigo-700'
                            : item.category === 'organic-products'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-cyan-50 text-cyan-700'
                        }`}>
                          {item.category === 'projects-services'
                            ? 'پروژه‌های IT و شبکه'
                            : item.category === 'organic-products'
                            ? 'محصولات ارگانیک'
                            : 'آکادمی و مدارک'}
                        </span>

                        {item.highlight && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1 group-hover:scale-105 transition-transform">
                            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                            <span>پرسش پرتکرار کاربران</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 group-hover:font-black transition-colors leading-snug">
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isExpanded 
                      ? 'bg-indigo-100 text-indigo-700 rotate-180' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion answer content */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4 text-justify">
                      {item.answer}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap mb-4">
                        <span className="text-[10px] text-slate-400 ml-1">برچسب‌ها:</span>
                        {item.tags.map(tag => (
                          <span
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="text-[10px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2 py-0.5 rounded cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions and feedback footer */}
                    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {item.actionLabel && item.actionTab && onNavigate ? (
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate(item.actionTab!);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start ${
                            item.category === 'organic-products'
                              ? 'text-emerald-700 hover:text-emerald-900'
                              : 'text-indigo-600 hover:text-indigo-800'
                          }`}
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          پاسخ رسمی پشتیبانی فنی مهرادینت
                        </span>
                      )}

                      {/* Feedback Thumbs */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 self-end sm:self-auto">
                        <span className="text-[11px] text-slate-400">آیا این پاسخ مفید بود؟</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleFeedback(item.id, 'yes')}
                            className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                              feedback === 'yes'
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                            }`}
                            title="بله، مفید بود"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            {feedback === 'yes' && <span className="text-[10px] font-bold">بله</span>}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleFeedback(item.id, 'no')}
                            className={`p-1.5 rounded-lg border transition-all flex items-center gap-1 cursor-pointer ${
                              feedback === 'no'
                                ? 'bg-rose-50 border-rose-300 text-rose-700'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800'
                            }`}
                            title="خیر، نیاز به توضیحات بیشتر دارد"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                            {feedback === 'no' && <span className="text-[10px] font-bold">خیر</span>}
                          </button>
                        </div>

                        {feedback && (
                          <span className="text-[10px] text-emerald-600 font-medium animate-fade-in">
                            نظر شما ثبت شد
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still have questions? Helpdesk bottom card */}
      <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative z-10" dir="rtl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-black text-white mb-1">
                سوالی دارید که در لیست بالا پاسخ داده نشده؟
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                کارشناسان ارشد شبکه، توسعه‌دهندگان وب و مشاوران محصولات ارگانیک آماده پاسخگویی آنلاین هستند.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-end">
            <a
              href="tel:02188456789"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>تماس مستقیم: ۰۲۱-۸۸۴۵۶۷۸۹</span>
            </a>

            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 flex-1 sm:flex-none cursor-pointer"
              >
                <span>ارسال تیکت و پیام</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
