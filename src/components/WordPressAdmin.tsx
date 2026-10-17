import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Download,
  ShoppingBag,
  Users,
  MessageSquare,
  Settings,
  FileText,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Database,
  Globe,
  DollarSign,
  TrendingUp,
  CreditCard,
  Eye,
  Check,
  RefreshCw
} from 'lucide-react';
import { Course, DigitalFile, Order, Ticket, User, SiteSettings, Article } from '../types';
import { store } from '../services/store';
import { SUPABASE_SQL_SCHEMA, testSupabaseConnection } from '../services/supabase';

interface WordPressAdminProps {
  onBackToSite: () => void;
  onOpenInvoice: (order: Order) => void;
}

export const WordPressAdmin: React.FC<WordPressAdminProps> = ({
  onBackToSite,
  onOpenInvoice
}) => {
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'courses' | 'files' | 'orders' | 'users' | 'tickets' | 'articles' | 'settings'
  >('dashboard');

  const [courses, setCourses] = useState<Course[]>(store.courses);
  const [files, setFiles] = useState<DigitalFile[]>(store.files);
  const [orders, setOrders] = useState<Order[]>(store.orders);
  const [tickets, setTickets] = useState<Ticket[]>(store.tickets);
  const [articles, setArticles] = useState<Article[]>(store.articles);
  const [settings, setSettings] = useState<SiteSettings>(store.settings);

  // Search filter
  const [searchFilter, setSearchFilter] = useState('');

  // Course Add/Edit Form State
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [courseFormData, setCourseFormData] = useState<Partial<Course>>({
    title: '',
    shortDescription: '',
    description: '',
    category: 'network',
    level: 'جامع',
    price: 1500000,
    originalPrice: 2000000,
    durationHours: 30,
    episodesCount: 40,
    whatYouWillLearn: ['پیکربندی تجهیزات شبکه', 'اجرای سناریوهای عملی']
  });

  // File Add/Edit Form State
  const [isEditingFile, setIsEditingFile] = useState(false);
  const [fileFormData, setFileFormData] = useState<Partial<DigitalFile>>({
    title: '',
    description: '',
    category: 'topology',
    price: 250000,
    originalPrice: 350000,
    fileFormat: 'ZIP / PKT',
    fileSize: '۵۰ مگابایت',
    version: '۱.۰',
    downloadUrl: 'https://parsnet-academy.com/downloads/package.zip',
    features: ['شامل فایل‌های پروژه آماده', 'راهنمای فارسی']
  });

  // Article / Announcement / Event Add/Edit Form State
  const [isEditingArticle, setIsEditingArticle] = useState(false);
  const [articleFilterType, setArticleFilterType] = useState<string>('all');
  const [articleFormData, setArticleFormData] = useState<Partial<Article>>({
    title: '',
    type: 'article',
    category: 'آموزش شبکه',
    excerpt: '',
    content: '',
    author: 'مهندس محمدرضا قاسمی',
    readTime: '۵ دقیقه',
    coverImage: '/src/assets/images/course_network_engineering_1791894523440.jpg',
    eventDate: '',
    eventLocation: 'اسکای‌روم آنلاین آکادمی پارس‌نت',
    isPinned: false,
    tags: ['آموزش', 'شبکه']
  });

  // Ticket reply in admin
  const [adminTicketReply, setAdminTicketReply] = useState<Record<string, string>>({});

  // Supabase Testing & Copy State
  const [supabaseTestStatus, setSupabaseTestStatus] = useState<{ loading: boolean; message: string; success?: boolean }>({
    loading: false,
    message: ''
  });
  const [isSqlCopied, setIsSqlCopied] = useState(false);

  React.useEffect(() => {
    return store.subscribe(() => {
      setCourses([...store.courses]);
      setFiles([...store.files]);
      setOrders([...store.orders]);
      setTickets([...store.tickets]);
      setArticles([...store.articles]);
      setSettings({ ...store.settings });
    });
  }, []);

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((acc, curr) => acc + curr.payableAmount, 0);

  // Course handlers
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title) return;

    if (courseFormData.id) {
      // Update
      const existing = courses.find(c => c.id === courseFormData.id)!;
      store.updateCourse({
        ...existing,
        ...courseFormData
      } as Course);
    } else {
      // Add
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseFormData.title || 'دوره آموزشی جدید',
        slug: (courseFormData.title || 'new-course').toLowerCase().replace(/\s+/g, '-'),
        description: courseFormData.description || 'توضیحات دوره',
        shortDescription: courseFormData.shortDescription || 'توضیح کوتاه دوره',
        category: (courseFormData.category as any) || 'network',
        level: (courseFormData.level as any) || 'جامع',
        price: Number(courseFormData.price) || 0,
        originalPrice: Number(courseFormData.originalPrice) || 0,
        image: '/src/assets/images/course_network_engineering_1791894523440.jpg',
        instructor: {
          id: 'inst-1',
          name: 'مهندس محمدرضا قاسمی',
          title: 'مدرس ارشد شبکه سیسکو و وب',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
          bio: 'مدرس رسمی دوره‌های تخصصی شبکه.'
        },
        durationHours: Number(courseFormData.durationHours) || 20,
        episodesCount: Number(courseFormData.episodesCount) || 25,
        studentsCount: 0,
        rating: 5.0,
        prerequisites: ['آشنایی مقدماتی با کامپیوتر'],
        whatYouWillLearn: courseFormData.whatYouWillLearn || ['آشنایی و پیکربندی عملی'],
        updatedAt: new Date().toLocaleDateString('fa-IR'),
        seasons: [
          {
            id: 's-new-1',
            title: 'فصل اول: مقدمات و راه‌اندازی',
            episodes: [
              {
                id: `ep-${Date.now()}`,
                title: 'جلسه ۱: معرفی سرفصل‌ها و اهداف دوره',
                duration: '۲۰:۰۰',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                isFreePreview: true
              }
            ]
          }
        ]
      };
      store.addCourse(newCourse);
    }

    setIsEditingCourse(false);
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('آیا از حذف این دوره اطمینان دارید؟')) {
      store.deleteCourse(id);
    }
  };

  // File handlers
  const handleSaveFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileFormData.title) return;

    if (fileFormData.id) {
      const existing = files.find(f => f.id === fileFormData.id)!;
      store.updateFile({
        ...existing,
        ...fileFormData
      } as DigitalFile);
    } else {
      const newFile: DigitalFile = {
        id: `file-${Date.now()}`,
        title: fileFormData.title || 'فایل دانلودی جدید',
        slug: (fileFormData.title || 'new-file').toLowerCase().replace(/\s+/g, '-'),
        description: fileFormData.description || 'توضیحات فایل دانلودی',
        category: (fileFormData.category as any) || 'topology',
        price: Number(fileFormData.price) || 0,
        originalPrice: Number(fileFormData.originalPrice) || 0,
        image: '/src/assets/images/download_network_pack_1791894524481.jpg',
        fileFormat: fileFormData.fileFormat || 'ZIP',
        fileSize: fileFormData.fileSize || '۲۵ مگابایت',
        version: fileFormData.version || '۱.۰',
        downloadsCount: 0,
        downloadUrl: fileFormData.downloadUrl || 'https://parsnet-academy.com/downloads/file.zip',
        features: fileFormData.features || ['شامل فایل‌های آماده پروژه'],
        updatedAt: new Date().toLocaleDateString('fa-IR')
      };
      store.addFile(newFile);
    }

    setIsEditingFile(false);
  };

  const handleDeleteFile = (id: string) => {
    if (confirm('آیا از حذف این محصول دانلودی اطمینان دارید؟')) {
      store.deleteFile(id);
    }
  };

  // Article handlers
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleFormData.title) return;

    if (articleFormData.id) {
      const existing = articles.find(a => a.id === articleFormData.id);
      if (existing) {
        store.updateArticle({
          ...existing,
          ...articleFormData
        } as Article);
      }
    } else {
      const newArticle: Article = {
        id: `post-${Date.now()}`,
        title: articleFormData.title || 'مطلب جدید',
        slug: (articleFormData.title || 'new-post').toLowerCase().replace(/\s+/g, '-'),
        type: articleFormData.type || 'article',
        category: articleFormData.category || 'آموزش تخصصی',
        excerpt: articleFormData.excerpt || '',
        content: articleFormData.content || '',
        author: articleFormData.author || 'مدیر آموزش پارس‌نت',
        readTime: articleFormData.readTime || '۵ دقیقه',
        coverImage: articleFormData.coverImage || '/src/assets/images/course_network_engineering_1791894523440.jpg',
        eventDate: articleFormData.eventDate,
        eventLocation: articleFormData.eventLocation,
        isPinned: articleFormData.isPinned || false,
        tags: articleFormData.tags || ['فناوری', 'آموزش'],
        createdAt: new Date().toLocaleDateString('fa-IR')
      };
      store.addArticle(newArticle);
    }

    setIsEditingArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('آیا از حذف این نوشته یا رویداد اطمینان دارید؟')) {
      store.deleteArticle(id);
    }
  };

  // Ticket reply
  const handleReplyTicketAdmin = (ticketId: string) => {
    const text = adminTicketReply[ticketId];
    if (!text || !text.trim()) return;

    store.replyTicket(ticketId, text, 'admin');
    setAdminTicketReply(prev => ({ ...prev, [ticketId]: '' }));
  };

  // Test Supabase connection
  const handleTestSupabase = async () => {
    setSupabaseTestStatus({ loading: true, message: 'در حال بررسی اتصال به Supabase...' });
    const res = await testSupabaseConnection(settings.supabaseUrl, settings.supabaseAnonKey);
    setSupabaseTestStatus({
      loading: false,
      message: res.message,
      success: res.success
    });
  };

  // Copy Supabase SQL
  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setIsSqlCopied(true);
    setTimeout(() => setIsSqlCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 font-sans" dir="rtl">
      {/* WordPress Top Admin Bar */}
      <header className="bg-slate-900 text-slate-300 h-10 px-4 flex items-center justify-between text-xs border-b border-slate-800 select-none z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-black text-amber-400">
              W
            </span>
            <span className="hidden sm:inline">پیشخوان وردپرس پارس‌نت</span>
          </div>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-1 text-slate-300 hover:text-white hover:bg-slate-800 px-2 py-1 rounded transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>مشاهده وب‌سایت اصلی</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-slate-400">
            <span>·</span>
            <span className="text-emerald-400 font-mono text-[11px]">پایگاه داده: سوپابیس (Supabase Connected)</span>
            <span>·</span>
            <span className="text-cyan-400 font-mono text-[11px]">ورسل: Vercel Ready</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden sm:inline">سلام، مدیر کل سیستم</span>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
            alt="Admin"
            className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
          />
        </div>
      </header>

      {/* WordPress Main Layout: Dark Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* WordPress Classic Dark Sidebar (Width: 220px) */}
        <aside className="w-56 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-l border-slate-800 wp-scrollbar overflow-y-auto">
          <div className="py-2 text-xs space-y-0.5">
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'dashboard'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>پیشخوان</span>
            </button>

            <button
              onClick={() => { setActiveMenu('courses'); setIsEditingCourse(false); }}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'courses'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span className="flex-1">دوره‌های آموزشی</span>
              <span className="bg-slate-800 px-1.5 py-0.2 text-[10px] rounded font-mono">
                {courses.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveMenu('files'); setIsEditingFile(false); }}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'files'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span className="flex-1">فایل‌ها و سناریوها</span>
              <span className="bg-slate-800 px-1.5 py-0.2 text-[10px] rounded font-mono">
                {files.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('orders')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'orders'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span className="flex-1">سفارشات و مالی</span>
              <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('users')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'users'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>کاربران و دانشجویان</span>
            </button>

            <button
              onClick={() => setActiveMenu('tickets')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'tickets'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-slate-400" />
              <span className="flex-1">تیکت‌های پشتیبانی</span>
              <span className="bg-red-500/20 text-red-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                {tickets.filter(t => t.status === 'open').length}
              </span>
            </button>

            <button
              onClick={() => { setActiveMenu('articles'); setIsEditingArticle(false); }}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'articles'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="flex-1">نوشته‌ها و رویدادها</span>
              <span className="bg-slate-800 px-1.5 py-0.2 text-[10px] rounded font-mono">
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'settings'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>تنظیمات و Supabase / Vercel</span>
            </button>
          </div>
        </aside>

        {/* Admin Content Canvas */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50">
          {/* SUB-VIEW 1: DASHBOARD (پیشخوان) */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">پیشخوان مدیریت وردپرس</h1>
                <p className="text-xs text-slate-500 mt-1">خلاصه وضعیت فروش دوره‌ها، تراکنش‌های بانکی، ترافیک و فایل‌های آموزشی</p>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">کل درآمد حاصل از فروش</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {totalRevenue.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-mono">
                    <TrendingUp className="w-3 h-3" />
                    <span>تراکنش‌های موفق زرین‌پال</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">دانشجویان ثبت‌نام شده</span>
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {(3500 + orders.length).toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">نفر</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">اعضای دارای دسترسی فعال</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">دوره‌ها و فایل‌های فعال</span>
                    <BookOpen className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {courses.length + files.length} <span className="text-xs font-normal text-slate-500">محصول</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    {courses.length} دوره · {files.length} فایل سناریو
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">تیکت‌های باز منتظر پاسخ</span>
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {tickets.filter(t => t.status === 'open').length} <span className="text-xs font-normal text-slate-500">مورد</span>
                  </div>
                  <div className="text-[11px] text-amber-600 mt-1">نیازمند بررسی مدرس</div>
                </div>
              </div>

              {/* Recent Orders & Quick Draft */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900">سفارشات و تراکنش‌های اخیر (ووکامرس)</h3>
                    <button
                      onClick={() => setActiveMenu('orders')}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      مشاهده همه سفارش‌ها ←
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="p-2.5">سفارش</th>
                          <th className="p-2.5">مشتری</th>
                          <th className="p-2.5">مبلغ نهایی</th>
                          <th className="p-2.5">کد رهگیری</th>
                          <th className="p-2.5">وضعیت</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 4).map(o => (
                          <tr key={o.id} className="hover:bg-slate-50">
                            <td className="p-2.5 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                            <td className="p-2.5 font-medium">{o.userName}</td>
                            <td className="p-2.5 font-mono tabular-nums font-bold text-slate-900">
                              {o.payableAmount.toLocaleString('fa-IR')} تومان
                            </td>
                            <td className="p-2.5 font-mono text-[11px] text-emerald-700">{o.refId}</td>
                            <td className="p-2.5">
                              <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">
                                تکمیل شده
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Integration Snapshot */}
                <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">وضعیت زیرساخت و سرور</h3>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">پایگاه داده Supabase:</span>
                      <span className="text-emerald-700 font-medium">فعال و آماده همگام‌سازی</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">استقرار روی Vercel:</span>
                      <span className="text-indigo-600 font-medium">آماده بیلد و دیپلوی</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">درگاه پرداخت زرین‌پال:</span>
                      <span className="text-amber-600 font-medium">سندباکس تستی + لایو</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveMenu('settings')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>تنظیمات پایگاه داده و درگاه</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: COURSES MANAGEMENT (مدیریت دوره‌ها) */}
          {activeMenu === 'courses' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مدیریت دوره‌های آموزشی</h1>
                  <p className="text-xs text-slate-500 mt-1">افزودن دوره جدید، سرفصل‌ها، تعیین قیمت و مدرسین</p>
                </div>
                <button
                  onClick={() => {
                    setCourseFormData({
                      title: '',
                      shortDescription: '',
                      description: '',
                      category: 'network',
                      level: 'جامع',
                      price: 1500000,
                      originalPrice: 2000000,
                      durationHours: 30,
                      episodesCount: 40,
                      whatYouWillLearn: ['پیکربندی تجهیزات شبکه', 'اجرای سناریوهای عملی']
                    });
                    setIsEditingCourse(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن دوره تازه</span>
                </button>
              </div>

              {isEditingCourse ? (
                // Add / Edit Course Form
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      {courseFormData.id ? 'ویرایش دوره آموزشی' : 'افزودن دوره آموزشی تازه'}
                    </h3>
                    <button
                      onClick={() => setIsEditingCourse(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      انصراف
                    </button>
                  </div>

                  <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">عنوان دوره</label>
                      <input
                        type="text"
                        value={courseFormData.title}
                        onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                        placeholder="مثال: دوره آموزش سناریوهای عملی فایروال سیسکو ASA"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">دسته‌بندی</label>
                        <select
                          value={courseFormData.category}
                          onChange={(e: any) => setCourseFormData({ ...courseFormData, category: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        >
                          <option value="network">مهندسی شبکه و سیسکو</option>
                          <option value="web">طراحی سایت و وب مدرن</option>
                          <option value="devops">لینوکس و دواپس</option>
                          <option value="security">امنیت و تست نفوذ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">سطح دوره</label>
                        <select
                          value={courseFormData.level}
                          onChange={(e: any) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        >
                          <option value="مقدماتی">مقدماتی</option>
                          <option value="متوسط">متوسط</option>
                          <option value="پیشرفته">پیشرفته</option>
                          <option value="جامع">جامع صفر تا صد</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">قیمت با تخفیف (تومان)</label>
                        <input
                          type="number"
                          value={courseFormData.price}
                          onChange={(e) => setCourseFormData({ ...courseFormData, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">قیمت اصلی قبل از تخفیف (تومان)</label>
                        <input
                          type="number"
                          value={courseFormData.originalPrice}
                          onChange={(e) => setCourseFormData({ ...courseFormData, originalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">مدت کل آموزش (ساعت)</label>
                        <input
                          type="number"
                          value={courseFormData.durationHours}
                          onChange={(e) => setCourseFormData({ ...courseFormData, durationHours: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">تعداد جلسات</label>
                        <input
                          type="number"
                          value={courseFormData.episodesCount}
                          onChange={(e) => setCourseFormData({ ...courseFormData, episodesCount: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">توضیحات کوتاه</label>
                      <input
                        type="text"
                        value={courseFormData.shortDescription}
                        onChange={(e) => setCourseFormData({ ...courseFormData, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">توضیحات جامع دوره</label>
                      <textarea
                        rows={4}
                        value={courseFormData.description}
                        onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
                    >
                      ذخیره و انتشار دوره در سایت
                    </button>
                  </form>
                </div>
              ) : (
                // Courses Table
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">عنوان دوره</th>
                        <th className="p-3">مدرس</th>
                        <th className="p-3">دسته‌بندی</th>
                        <th className="p-3">قیمت</th>
                        <th className="p-3">دانشجویان</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {courses.map(course => (
                        <tr key={course.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                            <img
                              src={course.image}
                              alt={course.title}
                              referrerPolicy="no-referrer"
                              className="w-10 h-8 rounded-lg object-cover shrink-0"
                            />
                            <span className="line-clamp-1">{course.title}</span>
                          </td>
                          <td className="p-3 text-slate-600">{course.instructor.name}</td>
                          <td className="p-3 font-mono text-[11px] text-slate-500">{course.category}</td>
                          <td className="p-3 font-mono tabular-nums font-bold text-slate-900">
                            {course.price.toLocaleString('fa-IR')} تومان
                          </td>
                          <td className="p-3 font-mono tabular-nums">{course.studentsCount} نفر</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setCourseFormData(course);
                                  setIsEditingCourse(true);
                                }}
                                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
                                title="ویرایش دوره"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                title="حذف دوره"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 3: DIGITAL FILES MANAGEMENT (مدیریت فایل‌ها) */}
          {activeMenu === 'files' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مدیریت فایل‌های دانلودی و سناریوها</h1>
                  <p className="text-xs text-slate-500 mt-1">افزودن سناریوهای پکت‌تریسر، اسکریپت‌ها، قالب‌های وب و تعیین لینک دانلود</p>
                </div>
                <button
                  onClick={() => {
                    setFileFormData({
                      title: '',
                      description: '',
                      category: 'topology',
                      price: 250000,
                      originalPrice: 350000,
                      fileFormat: 'ZIP / PKT',
                      fileSize: '۵۰ مگابایت',
                      version: '۱.۰',
                      downloadUrl: 'https://parsnet-academy.com/downloads/package.zip',
                      features: ['شامل فایل‌های پروژه آماده', 'راهنمای فارسی']
                    });
                    setIsEditingFile(true);
                  }}
                  className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن فایل تازه</span>
                </button>
              </div>

              {isEditingFile ? (
                // Add / Edit File Form
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      {fileFormData.id ? 'ویرایش فایل دانلودی' : 'افزودن فایل دانلودی جدید'}
                    </h3>
                    <button onClick={() => setIsEditingFile(false)} className="text-xs text-slate-500">
                      انصراف
                    </button>
                  </div>

                  <form onSubmit={handleSaveFile} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">عنوان فایل</label>
                      <input
                        type="text"
                        value={fileFormData.title}
                        onChange={(e) => setFileFormData({ ...fileFormData, title: e.target.value })}
                        placeholder="مثال: مجموعه سناریوهای روتینگ BGP در پکت‌تریسر"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">فرمت فایل</label>
                        <input
                          type="text"
                          value={fileFormData.fileFormat}
                          onChange={(e) => setFileFormData({ ...fileFormData, fileFormat: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">حجم فایل</label>
                        <input
                          type="text"
                          value={fileFormData.fileSize}
                          onChange={(e) => setFileFormData({ ...fileFormData, fileSize: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">نسخه</label>
                        <input
                          type="text"
                          value={fileFormData.version}
                          onChange={(e) => setFileFormData({ ...fileFormData, version: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">قیمت نهایی (تومان)</label>
                        <input
                          type="number"
                          value={fileFormData.price}
                          onChange={(e) => setFileFormData({ ...fileFormData, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">قیمت قبل از تخفیف</label>
                        <input
                          type="number"
                          value={fileFormData.originalPrice}
                          onChange={(e) => setFileFormData({ ...fileFormData, originalPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">لینک مستقیم دانلود فایل</label>
                      <input
                        type="url"
                        value={fileFormData.downloadUrl}
                        onChange={(e) => setFileFormData({ ...fileFormData, downloadUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-left"
                        dir="ltr"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">توضیحات فایل</label>
                      <textarea
                        rows={3}
                        value={fileFormData.description}
                        onChange={(e) => setFileFormData({ ...fileFormData, description: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-xl"
                    >
                      ذخیره فایل و انتشار در فروشگاه
                    </button>
                  </form>
                </div>
              ) : (
                // Files Table
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">عنوان فایل</th>
                        <th className="p-3">فرمت و حجم</th>
                        <th className="p-3">نسخه</th>
                        <th className="p-3">قیمت</th>
                        <th className="p-3">تعداد دانلود</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {files.map(file => (
                        <tr key={file.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                            <img
                              src={file.image}
                              alt={file.title}
                              referrerPolicy="no-referrer"
                              className="w-10 h-8 rounded-lg object-cover shrink-0"
                            />
                            <span className="line-clamp-1">{file.title}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-600">{file.fileFormat} ({file.fileSize})</td>
                          <td className="p-3 font-mono">v{file.version}</td>
                          <td className="p-3 font-mono tabular-nums font-bold text-slate-900">
                            {file.price.toLocaleString('fa-IR')} تومان
                          </td>
                          <td className="p-3 font-mono tabular-nums">{file.downloadsCount}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setFileFormData(file);
                                  setIsEditingFile(true);
                                }}
                                className="p-1.5 text-slate-600 hover:text-cyan-700 hover:bg-slate-100 rounded-lg"
                                title="ویرایش فایل"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                title="حذف فایل"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 4: ORDERS & TRANSACTIONS (سفارشات) */}
          {activeMenu === 'orders' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">مدیریت سفارشات و تراکنش‌ها</h1>
                <p className="text-xs text-slate-500 mt-1">تراکنش‌های درگاه پرداخت آنلاین، کدهای رهگیری شاپرک و وضعیت تسویه</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3">شماره سفارش</th>
                      <th className="p-3">خریدار</th>
                      <th className="p-3">شماره تماس</th>
                      <th className="p-3">اقلام سفارش</th>
                      <th className="p-3">مبلغ پرداختی</th>
                      <th className="p-3">کد رهگیری بانکی</th>
                      <th className="p-3">وضعیت</th>
                      <th className="p-3">فاکتور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{order.orderNumber}</td>
                        <td className="p-3 font-medium">{order.userName}</td>
                        <td className="p-3 font-mono text-slate-500">{order.userPhone}</td>
                        <td className="p-3 text-[11px] text-slate-600">
                          {order.items.map(i => i.title).join(' + ')}
                        </td>
                        <td className="p-3 font-mono tabular-nums font-bold text-slate-900">
                          {order.payableAmount.toLocaleString('fa-IR')} تومان
                        </td>
                        <td className="p-3 font-mono text-[11px] text-emerald-700">{order.refId}</td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={(e: any) => store.updateOrderStatus(order.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[11px] font-medium"
                          >
                            <option value="completed">تکمیل شده</option>
                            <option value="pending">در انتظار پرداخت</option>
                            <option value="failed">ناموفق / لغو</option>
                          </select>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onOpenInvoice(order)}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs"
                          >
                            مشاهده فاکتور
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-VIEW 5: USERS & STUDENTS (کاربران) */}
          {activeMenu === 'users' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">مدیریت کاربران و دانشجویان</h1>
                <p className="text-xs text-slate-500 mt-1">مشاهده فهرست اعضا، وضعیت ثبت‌نام، و اعطای مستقیم دوره‌ها به کاربران</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3">کاربر</th>
                      <th className="p-3">ایمیل</th>
                      <th className="p-3">شماره تماس</th>
                      <th className="p-3">نقش کاربری</th>
                      <th className="p-3">دوره‌های فعال</th>
                      <th className="p-3">فایل‌های خریداری‌شده</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                        <img
                          src={store.currentUser.avatar}
                          alt={store.currentUser.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span>{store.currentUser.name}</span>
                      </td>
                      <td className="p-3 font-mono text-slate-500">{store.currentUser.email}</td>
                      <td className="p-3 font-mono text-slate-500">{store.currentUser.phone}</td>
                      <td className="p-3">
                        <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">
                          دانشجو
                        </span>
                      </td>
                      <td className="p-3 font-mono tabular-nums">
                        {store.currentUser.enrolledCourseIds.length} دوره فعال
                      </td>
                      <td className="p-3 font-mono tabular-nums">
                        {store.currentUser.purchasedFileIds.length} فایل دانلودی
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-VIEW 6: SUPPORT TICKETS (تیکت‌های پشتیبانی) */}
          {activeMenu === 'tickets' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">پشتیبانی و تیکت‌های دانشجویان</h1>
                <p className="text-xs text-slate-500 mt-1">پاسخگویی به سوالات سناریوها، مشکلات فایل‌ها و دوره‌ها</p>
              </div>

              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">{ticket.subject}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                            ticket.status === 'answered'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            {ticket.status === 'answered' ? 'پاسخ داده شده' : 'در انتظار بررسی'}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                          <span>دانشجو: <strong>{ticket.userName}</strong> ({ticket.userEmail})</span>
                          <span>·</span>
                          <span className="font-mono">کد تیکت: {ticket.ticketNumber}</span>
                          <span>·</span>
                          <span>{ticket.createdAt}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => store.closeTicket(ticket.id)}
                        className="text-xs text-slate-400 hover:text-slate-700 px-2.5 py-1 border border-slate-200 rounded-lg"
                      >
                        بستن تیکت
                      </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-60 overflow-y-auto">
                      {ticket.messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-3 rounded-xl text-xs ${
                            msg.senderRole === 'admin'
                              ? 'bg-indigo-50 border border-indigo-100 mr-8 text-indigo-950'
                              : 'bg-white border border-slate-200 ml-8 text-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1 text-[11px] text-slate-400 font-mono">
                            <span className="font-bold text-slate-800">{msg.senderName}</span>
                            <span>{msg.createdAt}</span>
                          </div>
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* Admin Reply Box */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={adminTicketReply[ticket.id] || ''}
                        onChange={(e) => setAdminTicketReply({ ...adminTicketReply, [ticket.id]: e.target.value })}
                        placeholder="پاسخ مدرس یا پشتیبانی به این دانشجو..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                      />
                      <button
                        onClick={() => handleReplyTicketAdmin(ticket.id)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap"
                      >
                        ارسال پاسخ مدرس
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW: ARTICLES, ANNOUNCEMENTS, NEWS & EVENTS (مدیریت نوشته‌ها و رویدادها) */}
          {activeMenu === 'articles' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مدیریت نوشته‌ها، اطلاعیه‌ها، اخبار و رویدادها</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    افزودن و ویرایش مقالات علمی، اطلاعیه‌های فوری، اخبار فناوری و وبینارهای آنلاین آکادمی
                  </p>
                </div>
                <button
                  onClick={() => {
                    setArticleFormData({
                      title: '',
                      type: 'article',
                      category: 'آموزش تخصصی',
                      excerpt: '',
                      content: '',
                      author: 'مدیر آموزش پارس‌نت',
                      readTime: '۵ دقیقه',
                      coverImage: '/src/assets/images/course_network_engineering_1791894523440.jpg',
                      eventDate: '',
                      eventLocation: 'اسکای‌روم آنلاین آکادمی پارس‌نت',
                      isPinned: false,
                      tags: ['فناوری', 'آموزش']
                    });
                    setIsEditingArticle(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن نوشته / رویداد تازه</span>
                </button>
              </div>

              {isEditingArticle ? (
                // Add / Edit Post Form
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      {articleFormData.id ? 'ویرایش مطلب' : 'افزودن مطلب / اطلاعیه / رویداد تازه'}
                    </h3>
                    <button
                      onClick={() => setIsEditingArticle(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      انصراف
                    </button>
                  </div>

                  <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">عنوان مطلب یا رویداد</label>
                      <input
                        type="text"
                        value={articleFormData.title || ''}
                        onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                        placeholder="مثال: وبینار تخصصی امنیت زیرساخت شبکه"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">نوع مطلب</label>
                        <select
                          value={articleFormData.type || 'article'}
                          onChange={(e: any) => setArticleFormData({ ...articleFormData, type: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        >
                          <option value="article">مقاله آموزشی تخصصی</option>
                          <option value="announcement">اطلاعیه مهم و فوری</option>
                          <option value="news">اخبار فناوری و وب</option>
                          <option value="event">رویداد / وبینار آنلاین</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">دسته‌بندی موضوعی</label>
                        <input
                          type="text"
                          value={articleFormData.category || ''}
                          onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                          placeholder="مثال: آموزش سیسکو، اخبار وب"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">نویسنده / ارائه‌دهنده</label>
                        <input
                          type="text"
                          value={articleFormData.author || ''}
                          onChange={(e) => setArticleFormData({ ...articleFormData, author: e.target.value })}
                          placeholder="مثال: مهندس محمدرضا قاسمی"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Conditional fields for events */}
                    {articleFormData.type === 'event' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70">
                        <div>
                          <label className="block font-bold text-amber-900 mb-1">تاریخ و ساعت برگزاری</label>
                          <input
                            type="text"
                            value={articleFormData.eventDate || ''}
                            onChange={(e) => setArticleFormData({ ...articleFormData, eventDate: e.target.value })}
                            placeholder="مثال: جمعه ۲۸ مهر - ساعت ۱۸:۳۰"
                            className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-amber-900 mb-1">مکان یا بستر برگزاری</label>
                          <input
                            type="text"
                            value={articleFormData.eventLocation || ''}
                            onChange={(e) => setArticleFormData({ ...articleFormData, eventLocation: e.target.value })}
                            placeholder="مثال: اسکای‌روم آنلاین آکادمی پارس‌نت"
                            className="w-full px-3 py-2 bg-white border border-amber-200 rounded-xl"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">زمان تخمینی مطالعه یا مدت وبینار</label>
                        <input
                          type="text"
                          value={articleFormData.readTime || ''}
                          onChange={(e) => setArticleFormData({ ...articleFormData, readTime: e.target.value })}
                          placeholder="مثال: ۶ دقیقه یا رویداد زنده ۲ ساعته"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-6">
                        <input
                          type="checkbox"
                          id="isPinnedCheck"
                          checked={articleFormData.isPinned || false}
                          onChange={(e) => setArticleFormData({ ...articleFormData, isPinned: e.target.checked })}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="isPinnedCheck" className="text-slate-800 font-bold select-none cursor-pointer">
                          سنجاق کردن به عنوان اطلاعیه/رویداد برگزیده در بالای سایت
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">چکیده / خلاصه متن (Excerpt)</label>
                      <textarea
                        rows={2}
                        value={articleFormData.excerpt || ''}
                        onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                        placeholder="متن کوتاه برای نمایش در کارت‌ها..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">متن کامل مطلب / شرح رویداد</label>
                      <textarea
                        rows={7}
                        value={articleFormData.content || ''}
                        onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                        placeholder="شرح کامل، سرفصل‌ها، توضیحات رویداد و نکات فنی..."
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                    >
                      ذخیره و انتشار در وب‌سایت
                    </button>
                  </form>
                </div>
              ) : (
                // Posts Table
                <div className="space-y-4">
                  {/* Category Filter tabs */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { id: 'all', label: 'همه مطالب' },
                      { id: 'article', label: 'مقالات تخصصی' },
                      { id: 'announcement', label: 'اطلاعیه‌ها' },
                      { id: 'news', label: 'اخبار فناوری' },
                      { id: 'event', label: 'رویدادها و وبینارها' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setArticleFilterType(tab.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          articleFilterType === tab.id
                            ? 'bg-slate-900 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                        <tr>
                          <th className="p-3">عنوان مطلب</th>
                          <th className="p-3">نوع نوشته</th>
                          <th className="p-3">دسته‌بندی</th>
                          <th className="p-3">نویسنده</th>
                          <th className="p-3">تاریخ</th>
                          <th className="p-3">وضعیت سنجاق</th>
                          <th className="p-3">عملیات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {articles
                          .filter(a => articleFilterType === 'all' || a.type === articleFilterType)
                          .map(post => (
                            <tr key={post.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                                <img
                                  src={post.coverImage}
                                  alt={post.title}
                                  referrerPolicy="no-referrer"
                                  className="w-10 h-8 rounded-lg object-cover shrink-0"
                                />
                                <span className="line-clamp-1">{post.title}</span>
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  post.type === 'announcement'
                                    ? 'bg-red-50 text-red-700'
                                    : post.type === 'event'
                                    ? 'bg-amber-50 text-amber-700'
                                    : post.type === 'news'
                                    ? 'bg-cyan-50 text-cyan-700'
                                    : 'bg-indigo-50 text-indigo-700'
                                }`}>
                                  {post.type === 'announcement'
                                    ? 'اطلاعیه'
                                    : post.type === 'event'
                                    ? 'رویداد'
                                    : post.type === 'news'
                                    ? 'خبر'
                                    : 'مقاله'}
                                </span>
                              </td>
                              <td className="p-3 text-slate-600">{post.category}</td>
                              <td className="p-3 text-slate-600">{post.author}</td>
                              <td className="p-3 font-mono text-slate-500">{post.createdAt}</td>
                              <td className="p-3">
                                {post.isPinned ? (
                                  <span className="text-[11px] font-bold text-amber-600">سنجاق شده ✓</span>
                                ) : (
                                  <span className="text-[11px] text-slate-400">عادی</span>
                                )}
                              </td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setArticleFormData(post);
                                      setIsEditingArticle(true);
                                    }}
                                    className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg"
                                    title="ویرایش نوشته"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteArticle(post.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    title="حذف نوشته"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUB-VIEW 7: SETTINGS & SUPABASE / VERCEL (تنظیمات) */}
          {activeMenu === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">تنظیمات پایگاه داده Supabase، استقرار Vercel و درگاه پرداخت</h1>
                <p className="text-xs text-slate-500 mt-1">
                  پیکربندی دیتابیس ابری سوپابیس، کلیدهای ارتباطی، راهنمای اجرای کد SQL و تنظیمات ورسل
                </p>
              </div>

              {/* 1. Supabase Cloud Database Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">تنظیمات اتصال به Supabase (پایگاه داده ابری)</h3>
                    <p className="text-xs text-slate-500">برای ذخیره ریل‌تایم دوره‌ها، فایل‌ها، سفارشات و کاربران در دیتابیس PostgreSQL سوپابیس</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      آدرس پروژه Supabase (Project URL)
                    </label>
                    <input
                      type="url"
                      dir="ltr"
                      value={settings.supabaseUrl}
                      onChange={(e) => setSettings({ ...settings, supabaseUrl: e.target.value })}
                      placeholder="https://xyzcompany.supabase.co"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      قابل دریافت از پنل Supabase بخش Project Settings -&gt; API
                    </span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      کلید عمومی Supabase (Anon Key)
                    </label>
                    <input
                      type="password"
                      dir="ltr"
                      value={settings.supabaseAnonKey}
                      onChange={(e) => setSettings({ ...settings, supabaseAnonKey: e.target.value })}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => store.updateSettings({
                        supabaseUrl: settings.supabaseUrl,
                        supabaseAnonKey: settings.supabaseAnonKey
                      })}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                    >
                      ذخیره تنظیمات دیتابیس
                    </button>

                    <button
                      onClick={handleTestSupabase}
                      disabled={supabaseTestStatus.loading}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {supabaseTestStatus.loading && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                      <span>تست زنده اتصال به Supabase</span>
                    </button>
                  </div>

                  {supabaseTestStatus.message && (
                    <div className={`p-3 rounded-xl border flex items-center gap-2 ${
                      supabaseTestStatus.success
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}>
                      {supabaseTestStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{supabaseTestStatus.message}</span>
                    </div>
                  )}
                </div>

                {/* 1-Click SQL Script Copy */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        اسکریپت کامل ساخت جداول در Supabase (SQL Schema Migration)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        کافی است این کد را کپی کرده و در بخش SQL Editor در پنل Supabase اجرا (Run) کنید تا تمام جداول ساخته شوند.
                      </span>
                    </div>

                    <button
                      onClick={handleCopySql}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {isSqlCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isSqlCopied ? 'کپی شد!' : 'کپی اسکریپت SQL'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-[11px] max-h-36 overflow-y-auto" dir="ltr">
                    <pre>{SUPABASE_SQL_SCHEMA.slice(0, 480)}...</pre>
                  </div>
                </div>
              </div>

              {/* 2. Vercel Deployment Guide Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black">
                    ▲
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">راهنمای استقرار در Vercel (Vercel Deployment)</h3>
                    <p className="text-xs text-slate-500">پروژه کاملاً بر پایه Vite + React و سازگار با Vercel آماده شده است.</p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p>
                    ۱. این مخزن را در اکانت گیت‌هاب خود پوش کنید یا سورس را در Vercel بارگذاری نمایید.
                  </p>
                  <p>
                    ۲. در پنل Vercel هنگام ایجاد پروژه، در بخش <strong>Environment Variables</strong> دو متغیر زیر را اضافه فرمایید:
                  </p>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1" dir="ltr">
                    <div>VITE_SUPABASE_URL = {settings.supabaseUrl || 'https://your-project.supabase.co'}</div>
                    <div>VITE_SUPABASE_ANON_KEY = {settings.supabaseAnonKey || 'your-supabase-anon-key'}</div>
                  </div>
                  <p>
                    ۳. دکمه Deploy را بزنید؛ سایت با عملکرد بالا روی CDN جهانی ورسل در دسترس خواهد بود.
                  </p>
                </div>
              </div>

              {/* 3. ZarinPal Gateway Settings Box */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">تنظیمات درگاه پرداخت آنلاین (زرین‌پال و شاپرک)</h3>
                    <p className="text-xs text-slate-500">مرچنت کد زرین‌پال و حالت شبیه‌ساز امن</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">کد مرچنت زرین‌پال (Merchant ID)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={settings.zarinpalMerchantId}
                      onChange={(e) => setSettings({ ...settings, zarinpalMerchantId: e.target.value })}
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isSandbox"
                      checked={settings.isGatewaySandbox}
                      onChange={(e) => setSettings({ ...settings, isGatewaySandbox: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="isSandbox" className="text-slate-700">
                      فعال‌سازی حالت شبیه‌ساز سندباکس تستی (Sandbox Simulator Mode)
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      store.updateSettings(settings);
                      alert('تنظیمات درگاه پرداخت زرین‌پال ذخیره شد.');
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl"
                  >
                    ذخیره تنظیمات درگاه
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
