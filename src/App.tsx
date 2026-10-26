import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CourseCard } from './components/CourseCard';
import { FileCard } from './components/FileCard';
import { CourseDetailModal } from './components/CourseDetailModal';
import { CoursePlayerModal } from './components/CoursePlayerModal';
import { FileDetailModal } from './components/FileDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { InvoiceModal } from './components/InvoiceModal';
import { StudentPanel } from './components/StudentPanel';
import { WordPressAdmin } from './components/WordPressAdmin';
import { AdminLogin } from './components/AdminLogin';
import { BlogView } from './components/BlogView';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { AboutUsView } from './components/AboutUsView';
import { ContactUsView } from './components/ContactUsView';
import { TermsAndSitemapView } from './components/TermsAndSitemapView';
import { Footer } from './components/Footer';
import { CourseQuizModal } from './components/CourseQuizModal';
import { CertificateModal } from './components/CertificateModal';
import { CertificateVerifyModal } from './components/CertificateVerifyModal';
import { RoadmapsView } from './components/RoadmapsView';
import { ToastContainer } from './components/ToastContainer';
import { OrganicStoreView } from './components/OrganicStoreView';
import { OrganicCartModal } from './components/OrganicCartModal';
import { ProjectsServicesView } from './components/ProjectsServicesView';

import { Course, DigitalFile, Order, OrderItem, Article, NavigationTab, Certificate, OrganicProduct, OrganicCartItem } from './types';
import { store } from './services/store';
import { BookOpen, Download, Terminal, ArrowLeft, Radio } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'popular' | 'price-asc' | 'price-desc'>('featured');

  // Store data
  const [courses, setCourses] = useState<Course[]>(store.courses);
  const [files, setFiles] = useState<DigitalFile[]>(store.files);
  const [articles, setArticles] = useState<Article[]>(store.articles);
  const [organicProducts, setOrganicProducts] = useState<OrganicProduct[]>(store.organicProducts);
  const [organicCart, setOrganicCart] = useState<OrganicCartItem[]>(store.organicCart);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(store.isAdminLoggedIn);

  // Modals & Drawers state
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [selectedCourseForPlayer, setSelectedCourseForPlayer] = useState<Course | null>(null);
  const [selectedCourseForQuiz, setSelectedCourseForQuiz] = useState<Course | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyModalInitialCode, setVerifyModalInitialCode] = useState('');
  const [selectedFileForDetails, setSelectedFileForDetails] = useState<DigitalFile | null>(null);
  const [selectedArticleForDetails, setSelectedArticleForDetails] = useState<Article | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrganicCartOpen, setIsOrganicCartOpen] = useState(false);

  // Checkout & Payment State
  const [isPaymentGatewayOpen, setIsPaymentGatewayOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<OrderItem[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPayable, setCheckoutPayable] = useState(0);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  useEffect(() => {
    return store.subscribe(() => {
      setCourses([...store.courses]);
      setFiles([...store.files]);
      setArticles([...store.articles]);
      setOrganicProducts([...store.organicProducts]);
      setOrganicCart([...store.organicCart]);
      setIsAdminLoggedIn(store.isAdminLoggedIn);
    });
  }, []);

  // Filtered and sorted courses
  const filteredCourses = courses.filter(c => {
    const matchesSearch = !searchQuery || 
      c.title.includes(searchQuery) || 
      c.shortDescription.includes(searchQuery) ||
      c.whatYouWillLearn.some(w => w.includes(searchQuery));

    const matchesCat = selectedCategory === 'all' || 
      selectedCategory === 'files' ? true : 
      (selectedCategory === 'network' ? c.category === 'network' : 
       selectedCategory === 'web' ? c.category === 'web' : 
       selectedCategory === 'devops' ? (c.category === 'devops' || c.category === 'security') : true);

    const matchesLevel = selectedLevel === 'all' || c.level === selectedLevel;

    return matchesSearch && matchesCat && matchesLevel;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.studentsCount - a.studentsCount;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  // Filtered and sorted files
  const filteredFiles = files.filter(f => {
    const matchesSearch = !searchQuery || 
      f.title.includes(searchQuery) || 
      f.description.includes(searchQuery) ||
      f.fileFormat.includes(searchQuery);

    const matchesCat = selectedCategory === 'all' || selectedCategory === 'files';
    return matchesSearch && matchesCat;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  // Handle Cart Proceed to Checkout
  const handleProceedFromCart = (discountPercent: number) => {
    const items: OrderItem[] = store.cart.map(c => ({
      id: c.id,
      type: c.type,
      title: c.title,
      price: c.price
    }));

    const rawTotal = items.reduce((acc, i) => acc + i.price, 0);
    const discountAmount = Math.round((rawTotal * discountPercent) / 100);
    const payable = Math.max(0, rawTotal - discountAmount);

    setCheckoutItems(items);
    setCheckoutTotal(rawTotal);
    setCheckoutDiscount(discountAmount);
    setCheckoutPayable(payable);

    setIsCartOpen(false);
    setIsPaymentGatewayOpen(true);
  };

  // Handle direct checkout for single item
  const handleDirectCourseCheckout = (course: Course) => {
    const items: OrderItem[] = [{
      id: course.id,
      type: 'course',
      title: course.title,
      price: course.price
    }];
    setCheckoutItems(items);
    setCheckoutTotal(course.price);
    setCheckoutDiscount(0);
    setCheckoutPayable(course.price);

    setSelectedCourseForDetails(null);
    setIsPaymentGatewayOpen(true);
  };

  const handleDirectFileCheckout = (file: DigitalFile) => {
    const items: OrderItem[] = [{
      id: file.id,
      type: 'file',
      title: file.title,
      price: file.price
    }];
    setCheckoutItems(items);
    setCheckoutTotal(file.price);
    setCheckoutDiscount(0);
    setCheckoutPayable(file.price);

    setSelectedFileForDetails(null);
    setIsPaymentGatewayOpen(true);
  };

  // Payment Success
  const handlePaymentSuccess = (order: Order) => {
    setIsPaymentGatewayOpen(false);
    setActiveInvoiceOrder(order);
  };

  // Certificate Verification Modal Trigger
  const handleOpenVerifyModal = (code?: string) => {
    setVerifyModalInitialCode(code || '');
    setIsVerifyModalOpen(true);
  };

  // IF ADMIN PANEL MODE: Check Login status
  if (currentTab === 'admin-panel') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onSuccess={() => {
            setIsAdminLoggedIn(true);
          }}
          onBackToSite={() => setCurrentTab('home')}
        />
      );
    }

    return (
      <WordPressAdmin
        onBackToSite={() => setCurrentTab('home')}
        onOpenInvoice={(order) => setActiveInvoiceOrder(order)}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white" dir="rtl">
      {/* Top Header Bar */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrganicCart={() => setIsOrganicCartOpen(true)}
        onOpenVerifyModal={() => handleOpenVerifyModal()}
      />

      {/* Main Views Container */}
      <main className="flex-1">
        {/* VIEW: DEDICATED ORGANIC PRODUCTS STORE */}
        {currentTab === 'organic-shop' && (
          <OrganicStoreView
            products={organicProducts}
            onOpenCart={() => setIsOrganicCartOpen(true)}
            cartCount={organicCart.length}
          />
        )}

        {/* VIEW: STUDENT PANEL */}
        {currentTab === 'student-panel' && (
          <StudentPanel
            onOpenPlayer={(course) => setSelectedCourseForPlayer(course)}
            onOpenInvoice={(order) => setActiveInvoiceOrder(order)}
            onBackToHome={() => setCurrentTab('home')}
            onOpenQuiz={(course) => setSelectedCourseForQuiz(course)}
            onOpenCertificate={(cert) => setSelectedCertificate(cert)}
            onOpenVerifyModal={(code) => handleOpenVerifyModal(code)}
          />
        )}

        {/* VIEW: ABOUT US */}
        {currentTab === 'about' && (
          <AboutUsView
            onNavigateToCourses={() => {
              setCurrentTab('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={() => {
              setCurrentTab('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW: CONTACT US */}
        {currentTab === 'contact' && <ContactUsView />}

        {/* VIEW: TERMS & CONDITIONS */}
        {currentTab === 'terms' && (
          <TermsAndSitemapView
            initialMode="terms"
            onNavigateToCourse={(id) => {
              const c = courses.find(item => item.id === id);
              if (c) setSelectedCourseForDetails(c);
            }}
            onNavigateToFile={(id) => {
              const f = files.find(item => item.id === id);
              if (f) setSelectedFileForDetails(f);
            }}
            onNavigateToArticle={(id) => {
              const a = articles.find(item => item.id === id);
              if (a) setSelectedArticleForDetails(a);
            }}
          />
        )}

        {/* VIEW: SITEMAP */}
        {currentTab === 'sitemap' && (
          <TermsAndSitemapView
            initialMode="sitemap"
            onNavigateToCourse={(id) => {
              const c = courses.find(item => item.id === id);
              if (c) setSelectedCourseForDetails(c);
            }}
            onNavigateToFile={(id) => {
              const f = files.find(item => item.id === id);
              if (f) setSelectedFileForDetails(f);
            }}
            onNavigateToArticle={(id) => {
              const a = articles.find(item => item.id === id);
              if (a) setSelectedArticleForDetails(a);
            }}
          />
        )}

        {/* VIEW: DEDICATED BLOG VIEW */}
        {currentTab === 'blog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <BlogView
              articles={articles}
              onOpenArticle={(art) => setSelectedArticleForDetails(art)}
            />
          </div>
        )}

        {/* VIEW: CAREER ROADMAPS */}
        {currentTab === 'roadmaps' && (
          <RoadmapsView
            courses={courses}
            onOpenCourse={(c) => setSelectedCourseForDetails(c)}
            onOpenVerifyModal={() => handleOpenVerifyModal()}
          />
        )}

        {/* VIEW: PROJECTS & SERVICES */}
        {currentTab === 'projects-services' && (
          <ProjectsServicesView onBackToHome={() => setCurrentTab('home')} />
        )}

        {/* VIEW: HOME, COURSES, FILES */}
        {(currentTab === 'home' || currentTab === 'courses' || currentTab === 'files') && (
          <>
            {/* HERO SECTION (Shown on Home) */}
            {currentTab === 'home' && (
              <Hero
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                onNavigate={(tab) => {
                  setCurrentTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {/* Sub-header for courses and files */}
            {currentTab !== 'home' && (
              <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
                <div className="max-w-7xl mx-auto">
                  <div className="text-xs text-indigo-400 font-mono mb-2">
                    {currentTab === 'courses' ? 'آموزش‌های تخصصی' : 'فروشگاه فایل و سناریو'}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {currentTab === 'courses'
                      ? 'دوره‌های جامع مهندسی شبکه، سیسکو و طراحی سایت'
                      : 'پکیج سناریوهای پکت‌تریسر، اسکریپت‌ها و فایل‌های پروژه'}
                  </h1>
                </div>
              </div>
            )}

            {/* CONTENT SECTIONS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
              {/* FEATURED SERVICES & PROJECT ACCEPTANCE STRIP (HOME ONLY) */}
              {currentTab === 'home' && (
                <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono mb-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>پذیرش رسمی پروژه‌های مهندسی مهرادینت</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                        نیاز به اجرای پروژه شبکه، سرور یا برنامه‌نویسی دارید؟
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        نصب نرم‌افزارهای تخصصی، استقرار ویندوز/لینوکس سرور با اکتیو دایرکتوری، مجازی‌سازی با VMware و Proxmox، طراحی و اجرای پسیو (کابل‌کشی و رک) و اکتیو (سیسکو، میکروتیک و فایروال)، طراحی انواع سایت و توسعه اختصاصی نرم‌افزار با قرارداد رسمی و گارانتی معتبر.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                      <button
                        onClick={() => {
                          setCurrentTab('projects-services');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>مشاهده خدمات و ثبت آنلاین پروژه</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href="tel:02188456789"
                        className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 text-xs font-medium text-center transition-all"
                      >
                        مشاوره تلفنی: ۰۲۱-۸۸۴۵۶۷۸۹
                      </a>
                    </div>
                  </div>
                </section>
              )}

              {/* SECTION 1: Featured Courses */}
              {(currentTab === 'home' || currentTab === 'courses') && (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="text-xs font-bold text-indigo-600 mb-1 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>دوره‌های آموزشی با گارانتی یادگیری</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {selectedCategory === 'network'
                          ? 'دوره‌های تخصصی مهندسی شبکه و سیسکو'
                          : selectedCategory === 'web'
                          ? 'دوره‌های فرانت‌اند و طراحی وب مدرن'
                          : 'محبوب‌ترین دوره‌های تخصصی شبکه و برنامه‌نویسی'}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                      {currentTab === 'courses' && (
                        <>
                          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                            {['all', 'مقدماتی', 'متوسط', 'جامع'].map((lvl) => (
                              <button
                                key={lvl}
                                onClick={() => setSelectedLevel(lvl)}
                                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] ${
                                  selectedLevel === lvl
                                    ? 'bg-white text-indigo-700 font-bold shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                {lvl === 'all' ? 'همه سطوح' : lvl}
                              </button>
                            ))}
                          </div>

                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            aria-label="مرتب‌سازی دوره‌ها"
                            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
                          >
                            <option value="featured">مرتب‌سازی: پیشنهادی</option>
                            <option value="rating">بالاترین امتیاز</option>
                            <option value="popular">بیشترین دانشجو</option>
                            <option value="price-asc">ارزان‌ترین</option>
                            <option value="price-desc">گران‌ترین</option>
                          </select>
                        </>
                      )}

                      {currentTab === 'home' && (
                        <button
                          onClick={() => setCurrentTab('courses')}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                        >
                          <span>مشاهده همه دوره‌ها ({courses.length})</span>
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
                      موردی با شرایط جستجوی شما یافت نشد.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.map(course => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onOpenDetails={(c) => setSelectedCourseForDetails(c)}
                          onOpenPlayer={(c) => setSelectedCourseForPlayer(c)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 2: Downloadable Files & Scenarios */}
              {(currentTab === 'home' || currentTab === 'files') && (
                <section>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="text-xs font-bold text-cyan-600 mb-1 flex items-center gap-1.5">
                        <Download className="w-4 h-4" />
                        <span>فایل‌ها و سناریوهای آماده دانلود</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        سناریوهای شبیه‌سازی، اسکریپت‌های شبکه و سورس‌کدها
                      </h2>
                    </div>

                    {currentTab === 'home' && (
                      <button
                        onClick={() => setCurrentTab('files')}
                        className="text-xs font-semibold text-cyan-600 hover:text-cyan-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                      >
                        <span>مشاهده همه فایل‌ها ({files.length})</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {filteredFiles.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
                      فایلی با شرایط جستجوی شما یافت نشد.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredFiles.map(file => (
                        <FileCard
                          key={file.id}
                          file={file}
                          onOpenDetails={(f) => setSelectedFileForDetails(f)}
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 3: Technical Blog, Announcements, News & Events (Home preview) */}
              {currentTab === 'home' && (
                <section className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                      <div className="text-xs font-bold text-indigo-600 mb-1 flex items-center gap-1.5">
                        <Radio className="w-4 h-4" />
                        <span>پایگاه دانش، اطلاعیه‌ها و رویدادها</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        آخرین نوشته‌ها، اطلاعیه‌ها، اخبار و وبینارهای آکادمی
                      </h2>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentTab('blog');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                    >
                      <span>مشاهده همه نوشته‌ها و رویدادها ({articles.length})</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.slice(0, 3).map(article => (
                      <div
                        key={article.id}
                        onClick={() => setSelectedArticleForDetails(article)}
                        className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              article.type === 'announcement'
                                ? 'bg-red-50 text-red-700'
                                : article.type === 'event'
                                ? 'bg-amber-50 text-amber-700'
                                : article.type === 'news'
                                ? 'bg-cyan-50 text-cyan-700'
                                : 'bg-indigo-50 text-indigo-700'
                            }`}>
                              {article.type === 'announcement'
                                ? 'اطلاعیه'
                                : article.type === 'event'
                                ? 'وبینار'
                                : article.type === 'news'
                                ? 'خبر'
                                : 'مقاله'}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">{article.createdAt}</span>
                          </div>

                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 leading-snug">
                            {article.title}
                          </h3>

                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light mb-4">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                          <span className="text-slate-400 font-mono text-[11px] truncate max-w-[140px]">{article.author}</span>
                          <span className="text-indigo-600 font-bold group-hover:text-indigo-800 flex items-center gap-1">
                            <span>مطالعه</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVerifyModal={() => handleOpenVerifyModal()}
      />

      {/* ALL MODALS & DRAWERS */}
      {/* 1. Course Details Modal */}
      {selectedCourseForDetails && (
        <CourseDetailModal
          course={selectedCourseForDetails}
          onClose={() => setSelectedCourseForDetails(null)}
          onOpenPlayer={(c) => {
            setSelectedCourseForDetails(null);
            setSelectedCourseForPlayer(c);
          }}
          onDirectCheckout={handleDirectCourseCheckout}
        />
      )}

      {/* 2. Course Video Player Modal */}
      {selectedCourseForPlayer && (
        <CoursePlayerModal
          course={selectedCourseForPlayer}
          onClose={() => setSelectedCourseForPlayer(null)}
          onEnrollCourse={handleDirectCourseCheckout}
          onOpenQuiz={(course) => setSelectedCourseForQuiz(course)}
        />
      )}

      {/* 3. File Details Modal */}
      {selectedFileForDetails && (
        <FileDetailModal
          file={selectedFileForDetails}
          onClose={() => setSelectedFileForDetails(null)}
          onDirectCheckout={handleDirectFileCheckout}
        />
      )}

      {/* 4. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedFromCart}
      />

      {/* 5. Payment Gateway Simulator */}
      {isPaymentGatewayOpen && (
        <PaymentGatewayModal
          items={checkoutItems}
          totalAmount={checkoutTotal}
          discountAmount={checkoutDiscount}
          payableAmount={checkoutPayable}
          onSuccess={handlePaymentSuccess}
          onCancel={() => setIsPaymentGatewayOpen(false)}
        />
      )}

      {/* 6. Invoice Modal */}
      {activeInvoiceOrder && (
        <InvoiceModal
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
          onGoToStudentPanel={() => {
            setActiveInvoiceOrder(null);
            setCurrentTab('student-panel');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 8. Article & Event Detail Modal */}
      {selectedArticleForDetails && (
        <ArticleDetailModal
          article={selectedArticleForDetails}
          onClose={() => setSelectedArticleForDetails(null)}
        />
      )}

      {/* 9. Course Exam & Quiz Modal */}
      {selectedCourseForQuiz && (
        <CourseQuizModal
          course={selectedCourseForQuiz}
          onClose={() => setSelectedCourseForQuiz(null)}
          onViewCertificate={(cert) => {
            setSelectedCourseForQuiz(null);
            setSelectedCertificate(cert);
          }}
        />
      )}

      {/* 10. Official Verified Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          onVerifyCertificate={(code) => handleOpenVerifyModal(code)}
        />
      )}

      {/* 11. Certificate Verification Modal */}
      {isVerifyModalOpen && (
        <CertificateVerifyModal
          initialCode={verifyModalInitialCode}
          onClose={() => {
            setIsVerifyModalOpen(false);
            setVerifyModalInitialCode('');
          }}
          onViewCertificate={(cert) => {
            setIsVerifyModalOpen(false);
            setSelectedCertificate(cert);
          }}
        />
      )}

      {/* 12. Dedicated Organic Shopping Cart & Checkout Modal */}
      <OrganicCartModal
        isOpen={isOrganicCartOpen}
        onClose={() => setIsOrganicCartOpen(false)}
        cart={organicCart}
        currentUserWalletBalance={store.currentUser.walletBalance}
      />

      {/* Global Interactive Toast Feedback */}
      <ToastContainer />
    </div>
  );
}
