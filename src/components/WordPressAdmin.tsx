import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Image as ImageIcon,
  Upload,
  Mail,
  LogOut,
  Key,
  Shield,
  Tag,
  Phone,
  MapPin,
  Clock,
  HardDrive
} from 'lucide-react';
import { Course, DigitalFile, Order, Ticket, User, SiteSettings, Article, MediaItem, ContactMessage } from '../types';
import { store } from '../services/store';
import { SUPABASE_SQL_SCHEMA, testSupabaseConnection } from '../services/supabase';
import { MediaPickerModal } from './MediaPickerModal';

interface WordPressAdminProps {
  onBackToSite: () => void;
  onOpenInvoice: (order: Order) => void;
}

export const WordPressAdmin: React.FC<WordPressAdminProps> = ({
  onBackToSite,
  onOpenInvoice
}) => {
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'courses' | 'files' | 'media' | 'orders' | 'users' | 'tickets' | 'contact-messages' | 'articles' | 'settings'
  >('dashboard');

  const [courses, setCourses] = useState<Course[]>(store.courses);
  const [files, setFiles] = useState<DigitalFile[]>(store.files);
  const [orders, setOrders] = useState<Order[]>(store.orders);
  const [tickets, setTickets] = useState<Ticket[]>(store.tickets);
  const [articles, setArticles] = useState<Article[]>(store.articles);
  const [mediaList, setMediaList] = useState<MediaItem[]>(store.media);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(store.contactMessages);
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
    image: '/src/assets/images/course_network_engineering_1791894523440.jpg',
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
    image: '/src/assets/images/download_network_pack_1791894524481.jpg',
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

  // Media Library state
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaFilterType, setMediaFilterType] = useState<string>('all');
  const [selectedMediaItem, setSelectedMediaItem] = useState<MediaItem | null>(null);
  const [isMediaEditModalOpen, setIsMediaEditModalOpen] = useState(false);
  const [mediaEditForm, setMediaEditForm] = useState<{ title: string; fileName: string; altText: string; tags: string }>({
    title: '',
    fileName: '',
    altText: '',
    tags: ''
  });
  const [copiedMediaUrlId, setCopiedMediaUrlId] = useState<string | null>(null);

  // Media Picker Modal for Forms
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'course' | 'file' | 'article' | null>(null);

  // Contact Messages state
  const [selectedContactMessage, setSelectedContactMessage] = useState<ContactMessage | null>(null);

  // Admin Credentials Change State
  const [currentAdminPass, setCurrentAdminPass] = useState('');
  const [newAdminUser, setNewAdminUser] = useState(store.settings.adminUsername || 'admin');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [confirmAdminPass, setConfirmAdminPass] = useState('');
  const [adminCredStatus, setAdminCredStatus] = useState<{ success?: boolean; message: string } | null>(null);

  // Ticket reply in admin
  const [adminTicketReply, setAdminTicketReply] = useState<Record<string, string>>({});

  // Supabase Testing & Copy State
  const [supabaseTestStatus, setSupabaseTestStatus] = useState<{ loading: boolean; message: string; success?: boolean }>({
    loading: false,
    message: ''
  });
  const [isSqlCopied, setIsSqlCopied] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setCourses([...store.courses]);
      setFiles([...store.files]);
      setOrders([...store.orders]);
      setTickets([...store.tickets]);
      setArticles([...store.articles]);
      setMediaList([...store.media]);
      setContactMessages([...store.contactMessages]);
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
        image: courseFormData.image || '/src/assets/images/course_network_engineering_1791894523440.jpg',
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
        description: fileFormData.description || 'توضیحات فایل',
        category: (fileFormData.category as any) || 'topology',
        price: Number(fileFormData.price) || 0,
        originalPrice: Number(fileFormData.originalPrice) || 0,
        image: fileFormData.image || '/src/assets/images/download_network_pack_1791894524481.jpg',
        fileFormat: fileFormData.fileFormat || 'ZIP',
        fileSize: fileFormData.fileSize || '۲۰ مگابایت',
        version: fileFormData.version || '۱.۰',
        downloadsCount: 0,
        downloadUrl: fileFormData.downloadUrl || 'https://parsnet-academy.com/downloads/package.zip',
        features: fileFormData.features || ['شامل فایل‌های پروژه'],
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
      const existing = articles.find(a => a.id === articleFormData.id)!;
      store.updateArticle({
        ...existing,
        ...articleFormData
      } as Article);
    } else {
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: articleFormData.title || 'نوشته جدید',
        slug: (articleFormData.title || 'new-post').toLowerCase().replace(/\s+/g, '-'),
        type: (articleFormData.type as any) || 'article',
        category: articleFormData.category || 'آموزش شبکه',
        excerpt: articleFormData.excerpt || 'خلاصه مطلب',
        content: articleFormData.content || 'متن کامل مقاله...',
        author: articleFormData.author || 'مهندس محمدرضا قاسمی',
        readTime: articleFormData.readTime || '۵ دقیقه',
        coverImage: articleFormData.coverImage || '/src/assets/images/course_network_engineering_1791894523440.jpg',
        eventDate: articleFormData.eventDate,
        eventLocation: articleFormData.eventLocation,
        isPinned: articleFormData.isPinned || false,
        tags: articleFormData.tags || ['شبکه', 'آموزش'],
        createdAt: new Date().toLocaleDateString('fa-IR')
      };
      store.addArticle(newArt);
    }

    setIsEditingArticle(false);
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('آیا از حذف این نوشته اطمینان دارید؟')) {
      store.deleteArticle(id);
    }
  };

  // Media Library handlers
  const handleUploadMediaFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} مگابایت` : `${sizeKb} کیلوبایت`;

      const newMedia: MediaItem = {
        id: `media-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        fileName: file.name,
        fileType: file.type.startsWith('image/')
          ? 'image'
          : file.type.startsWith('video/')
          ? 'video'
          : file.name.endsWith('.zip') || file.name.endsWith('.rar') || file.name.endsWith('.pkt')
          ? 'archive'
          : 'document',
        url: dataUrl,
        size: sizeStr,
        dimensions: 'کیفیت بالا',
        altText: file.name,
        tags: ['آپلود جدید'],
        uploadedAt: new Date().toLocaleDateString('fa-IR')
      };

      store.addMediaItem(newMedia);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenMediaEdit = (item: MediaItem) => {
    setSelectedMediaItem(item);
    setMediaEditForm({
      title: item.title,
      fileName: item.fileName,
      altText: item.altText || '',
      tags: item.tags.join('، ')
    });
    setIsMediaEditModalOpen(true);
  };

  const handleSaveMediaEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMediaItem) return;

    const parsedTags = mediaEditForm.tags
      .split(/[,،]/)
      .map(t => t.trim())
      .filter(Boolean);

    store.updateMediaItem(selectedMediaItem.id, {
      title: mediaEditForm.title,
      fileName: mediaEditForm.fileName,
      altText: mediaEditForm.altText,
      tags: parsedTags
    });

    setIsMediaEditModalOpen(false);
    setSelectedMediaItem(null);
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('آیا از حذف این فایل رسانه اطمینان دارید؟')) {
      store.deleteMediaItem(id);
      setIsMediaEditModalOpen(false);
      setSelectedMediaItem(null);
    }
  };

  const handleCopyMediaUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedMediaUrlId(item.id);
    setTimeout(() => setCopiedMediaUrlId(null), 2500);
  };

  // Direct featured image upload for forms
  const handleFormDirectImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'course' | 'file' | 'article'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = `${sizeKb} کیلوبایت`;

      // Also register into Media Library
      const newMedia: MediaItem = {
        id: `media-${Date.now()}`,
        title: `تصویر شاخص ${file.name.replace(/\.[^/.]+$/, '')}`,
        fileName: file.name,
        fileType: 'image',
        url: dataUrl,
        size: sizeStr,
        dimensions: 'کیفیت بالا',
        altText: file.name,
        tags: ['تصویر شاخص', target],
        uploadedAt: new Date().toLocaleDateString('fa-IR')
      };
      store.addMediaItem(newMedia);

      if (target === 'course') {
        setCourseFormData(prev => ({ ...prev, image: dataUrl }));
      } else if (target === 'file') {
        setFileFormData(prev => ({ ...prev, image: dataUrl }));
      } else if (target === 'article') {
        setArticleFormData(prev => ({ ...prev, coverImage: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Selected from MediaPickerModal
  const handleMediaPickerSelect = (url: string) => {
    if (mediaPickerTarget === 'course') {
      setCourseFormData(prev => ({ ...prev, image: url }));
    } else if (mediaPickerTarget === 'file') {
      setFileFormData(prev => ({ ...prev, image: url }));
    } else if (mediaPickerTarget === 'article') {
      setArticleFormData(prev => ({ ...prev, coverImage: url }));
    }
    setIsMediaPickerOpen(false);
    setMediaPickerTarget(null);
  };

  // Admin Credentials Change
  const handleChangeAdminCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminCredStatus(null);

    if (newAdminPass !== confirmAdminPass) {
      setAdminCredStatus({ success: false, message: 'رمز عبور جدید و تکرار آن یکسان نیستند' });
      return;
    }

    const res = store.changeAdminCredentials(currentAdminPass, newAdminUser, newAdminPass);
    setAdminCredStatus(res);
    if (res.success) {
      setCurrentAdminPass('');
      setNewAdminPass('');
      setConfirmAdminPass('');
    }
  };

  // Admin Logout
  const handleAdminLogout = () => {
    store.adminLogout();
    onBackToSite();
  };

  // Test Supabase connection
  const handleTestSupabase = async () => {
    setSupabaseTestStatus({ loading: true, message: 'در حال بررسی اتصال به دیتابیس Supabase...' });
    const result = await testSupabaseConnection(settings.supabaseUrl, settings.supabaseAnonKey);
    setSupabaseTestStatus({
      loading: false,
      message: result.message,
      success: result.success
    });
  };

  // Copy SQL Schema
  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setIsSqlCopied(true);
    setTimeout(() => setIsSqlCopied(false), 3000);
  };

  // Filtered media list
  const filteredMedia = mediaList.filter(item => {
    const matchesSearch = !mediaSearch ||
      item.title.toLowerCase().includes(mediaSearch.toLowerCase()) ||
      item.fileName.toLowerCase().includes(mediaSearch.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(mediaSearch.toLowerCase()));

    const matchesType = mediaFilterType === 'all' || item.fileType === mediaFilterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* WordPress Top Admin Bar (Black Header #1d2327) */}
      <header className="h-10 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 text-xs select-none z-30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-black text-white">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center text-white text-[11px] font-mono">
              W
            </div>
            <span>پیشخوان مدیریت وردپرس</span>
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
            <span className="text-emerald-400 font-mono text-[11px]">Supabase & Vercel Ready</span>
            <span>·</span>
            <span className="text-amber-400 font-mono text-[11px]">مدیر فعال: {settings.adminUsername || 'admin'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveMenu('settings')}
            className="text-slate-300 hover:text-indigo-300 flex items-center gap-1 text-[11px]"
            title="تغییر نام کاربری و کلمه عبور مدیر"
          >
            <Key className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">تغییر رمز مدیر</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="text-red-300 hover:text-red-200 hover:bg-red-950/40 px-2 py-1 rounded transition-colors flex items-center gap-1 text-[11px]"
            title="خروج از مدیریت"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>خروج</span>
          </button>
        </div>
      </header>

      {/* WordPress Main Layout: Dark Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* WordPress Classic Dark Sidebar (Width: 230px) */}
        <aside className="w-56 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-l border-slate-800 wp-scrollbar overflow-y-auto">
          <div className="py-2 text-xs space-y-0.5">
            {/* 1. Dashboard */}
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

            {/* 2. Courses */}
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

            {/* 3. Files */}
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

            {/* 4. Media Library (NEW) */}
            <button
              onClick={() => setActiveMenu('media')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'media'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-slate-400" />
              <span className="flex-1">کتابخانه رسانه‌ها</span>
              <span className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                {mediaList.length}
              </span>
            </button>

            {/* 5. Articles & News */}
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

            {/* 6. Orders */}
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

            {/* 7. Users */}
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

            {/* 8. Tickets */}
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

            {/* 9. Contact Messages (NEW) */}
            <button
              onClick={() => setActiveMenu('contact-messages')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'contact-messages'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="flex-1">پیام‌های تماس</span>
              {contactMessages.filter(m => !m.isRead).length > 0 && (
                <span className="bg-emerald-500 text-white px-1.5 py-0.2 text-[10px] rounded-full font-mono font-bold">
                  {contactMessages.filter(m => !m.isRead).length}
                </span>
              )}
            </button>

            {/* 10. Settings & Security */}
            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full px-4 py-2.5 text-right flex items-center gap-2.5 transition-colors ${
                activeMenu === 'settings'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>تنظیمات و صفحات سایت</span>
            </button>
          </div>
        </aside>

        {/* Admin Content Canvas */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50 text-slate-900">
          {/* ===================== VIEW 1: DASHBOARD ===================== */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">پیشخوان مدیریت وردپرس</h1>
                <p className="text-xs text-slate-500 mt-1">خلاصه وضعیت فروش دوره‌ها، تراکنش‌های بانکی، رسانه‌ها و کاربران</p>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">مجموع درآمد تایید شده</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {totalRevenue.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1 font-mono">
                    {orders.filter(o => o.status === 'completed').length} تراکنش موفق
                  </div>
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
                    {courses.length} دوره · {files.length} فایل دانلودی
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">رسانه‌ها و تصاویر آپلودی</span>
                    <ImageIcon className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {mediaList.length} <span className="text-xs font-normal text-slate-500">آیتم</span>
                  </div>
                  <div className="text-[11px] text-indigo-600 mt-1">آماده درج در سایت و مقالات</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 font-medium">پیام‌ها و تیکت‌ها</span>
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
                    {tickets.filter(t => t.status === 'open').length + contactMessages.filter(m => !m.isRead).length} <span className="text-xs font-normal text-slate-500">جدید</span>
                  </div>
                  <div className="text-[11px] text-amber-600 mt-1">نیازمند بررسی مدیر</div>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveMenu('media')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">مدیریت رسانه و آپلود</h4>
                      <p className="text-[11px] text-slate-400">آپلود تصاویر شاخص، تغییر تگ و نام فایل</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setActiveMenu('contact-messages')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">پیام‌های فرم تماس با ما</h4>
                      <p className="text-[11px] text-slate-400">{contactMessages.length} پیام دریافتی از کاربران</p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setActiveMenu('settings')}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-xs group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">امنیت، رمز عبور و درباره ما</h4>
                      <p className="text-[11px] text-slate-400">تغییر پسورد مدیر، قوانین و مشخصات سایت</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">سفارشات اخیر (WooCommerce)</h3>
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
            </div>
          )}

          {/* ===================== VIEW 2: COURSES ===================== */}
          {activeMenu === 'courses' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مدیریت دوره‌های آموزشی</h1>
                  <p className="text-xs text-slate-500 mt-1">افزودن دوره جدید، تصویر شاخص، تعیین قیمت و سرفصل‌ها</p>
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
                      image: '/src/assets/images/course_network_engineering_1791894523440.jpg',
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

                    {/* FEATURED IMAGE UPLOAD & SELECTOR */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800">تصویر شاخص دوره آموزشی</label>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>آپلود تصویر جدید</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFormDirectImageUpload(e, 'course')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('course');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>انتخاب از رسانه‌ها</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <img
                          src={courseFormData.image || '/src/assets/images/course_network_engineering_1791894523440.jpg'}
                          alt="Featured Preview"
                          className="w-24 h-16 rounded-xl object-cover border border-slate-300 shadow-xs shrink-0"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={courseFormData.image || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, image: e.target.value })}
                            placeholder="یا آدرس مستقیم تصویر را وارد کنید..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
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
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
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
                        <th className="p-3">عنوان دوره و تصویر شاخص</th>
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
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-12 h-9 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <span className="line-clamp-1">{course.title}</span>
                          </td>
                          <td className="p-3 text-slate-600">{course.instructor.name}</td>
                          <td className="p-3">
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">
                              {course.category === 'network' ? 'شبکه' : course.category === 'web' ? 'طراحی وب' : 'دواپس'}
                            </span>
                          </td>
                          <td className="p-3 font-mono tabular-nums font-bold text-slate-900">
                            {course.price.toLocaleString('fa-IR')} تومان
                          </td>
                          <td className="p-3 font-mono">{course.studentsCount} نفر</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setCourseFormData(course);
                                  setIsEditingCourse(true);
                                }}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                title="ویرایش"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                title="حذف"
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

          {/* ===================== VIEW 3: FILES & SCENARIOS ===================== */}
          {activeMenu === 'files' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">فایل‌ها و سناریوهای دانلودی</h1>
                  <p className="text-xs text-slate-500 mt-1">مدیریت فایل‌های Packet Tracer، اسکریپت‌ها، قالب‌ها و کتاب‌های دانلودی</p>
                </div>
                <button
                  onClick={() => {
                    setFileFormData({
                      title: '',
                      description: '',
                      category: 'topology',
                      price: 250000,
                      originalPrice: 350000,
                      image: '/src/assets/images/download_network_pack_1791894524481.jpg',
                      fileFormat: 'ZIP / PKT',
                      fileSize: '۵۰ مگابایت',
                      version: '۱.۰',
                      downloadUrl: 'https://parsnet-academy.com/downloads/package.zip',
                      features: ['شامل فایل‌های پروژه آماده', 'راهنمای فارسی']
                    });
                    setIsEditingFile(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن فایل دانلودی جدید</span>
                </button>
              </div>

              {isEditingFile ? (
                // Add / Edit File Form
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      {fileFormData.id ? 'ویرایش فایل دانلودی' : 'افزودن فایل تازه'}
                    </h3>
                    <button
                      onClick={() => setIsEditingFile(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
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

                    {/* FEATURED IMAGE UPLOAD & SELECTOR */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800">تصویر شاخص فایل</label>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>آپلود تصویر جدید</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFormDirectImageUpload(e, 'file')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('file');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>انتخاب از رسانه‌ها</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <img
                          src={fileFormData.image || '/src/assets/images/download_network_pack_1791894524481.jpg'}
                          alt="File Preview"
                          className="w-24 h-16 rounded-xl object-cover border border-slate-300 shadow-xs shrink-0"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={fileFormData.image || ''}
                            onChange={(e) => setFileFormData({ ...fileFormData, image: e.target.value })}
                            placeholder="یا آدرس مستقیم تصویر را وارد کنید..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
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
                      <label className="block font-bold text-slate-700 mb-1">توضیحات و نیازمندی‌ها</label>
                      <textarea
                        rows={3}
                        value={fileFormData.description}
                        onChange={(e) => setFileFormData({ ...fileFormData, description: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      ذخیره و انتشار فایل
                    </button>
                  </form>
                </div>
              ) : (
                // Files Table
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">عنوان فایل و تصویر</th>
                        <th className="p-3">فرمت</th>
                        <th className="p-3">حجم</th>
                        <th className="p-3">قیمت</th>
                        <th className="p-3">دانلودها</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {files.map(file => (
                        <tr key={file.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                            <img
                              src={file.image}
                              alt={file.title}
                              className="w-12 h-9 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <span className="line-clamp-1">{file.title}</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-indigo-600">{file.fileFormat}</td>
                          <td className="p-3 font-mono text-slate-500">{file.fileSize}</td>
                          <td className="p-3 font-mono tabular-nums font-bold text-slate-900">
                            {file.price.toLocaleString('fa-IR')} تومان
                          </td>
                          <td className="p-3 font-mono">{file.downloadsCount} بار</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setFileFormData(file);
                                  setIsEditingFile(true);
                                }}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                title="ویرایش"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteFile(file.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                title="حذف"
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

          {/* ===================== VIEW 4: MEDIA LIBRARY (NEW & COMPREHENSIVE) ===================== */}
          {activeMenu === 'media' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">کتابخانه رسانه‌ها و مدیریت تصاویر</h1>
                  <p className="text-xs text-slate-500 mt-1">آپلود تصاویر، اصلاح عنوان، نام فایل، تگ‌ها و کپی آدرس جهت استفاده در سایت</p>
                </div>

                {/* Upload Button */}
                <label className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm self-start sm:self-auto">
                  <Upload className="w-4 h-4" />
                  <span>بارگذاری پرونده چندرسانه‌ای جدید</span>
                  <input
                    type="file"
                    accept="image/*,video/*,.pdf,.zip,.pkt"
                    onChange={handleUploadMediaFile}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Media Filter & Search Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                  {[
                    { id: 'all', label: 'همه رسانه‌ها' },
                    { id: 'image', label: 'تصاویر' },
                    { id: 'document', label: 'اسناد و PDF' },
                    { id: 'archive', label: 'آرشیو و ZIP' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setMediaFilterType(tab.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors whitespace-nowrap ${
                        mediaFilterType === tab.id
                          ? 'bg-slate-900 text-white font-bold'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={mediaSearch}
                    onChange={(e) => setMediaSearch(e.target.value)}
                    placeholder="جستجو در عنوان، فایل یا تگ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Media Grid */}
              {filteredMedia.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 text-slate-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm font-bold text-slate-600">رسانه‌ای با مشخصات جستجو یافت نشد.</p>
                  <p className="text-xs text-slate-400 mt-1">با زدن دکمه «بارگذاری پرونده»، فایل جدید آپلود کنید.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map(item => (
                    <div
                      key={item.id}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      {/* Image / Thumbnail */}
                      <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
                        {item.fileType === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                            <HardDrive className="w-8 h-8 mb-1" />
                            <span className="text-[10px] font-mono">{item.fileName.split('.').pop()}</span>
                          </div>
                        )}

                        <span className="absolute bottom-1 left-1 bg-slate-900/75 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                          {item.size}
                        </span>
                      </div>

                      {/* Info & Tags */}
                      <div className="p-3 text-right flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-mono truncate" dir="ltr">
                            {item.fileName}
                          </p>

                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.slice(0, 2).map((t, i) => (
                                <span key={i} className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => handleCopyMediaUrl(item)}
                            className="text-slate-500 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                            title="کپی آدرس لینک فایل"
                          >
                            {copiedMediaUrlId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                            <span>{copiedMediaUrlId === item.id ? 'کپی شد' : 'کپی آدرس'}</span>
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleOpenMediaEdit(item)}
                              className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                              title="ویرایش عنوان و تگ‌ها"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMedia(item.id)}
                              className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                              title="حذف رسانه"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MEDIA EDIT MODAL */}
              {isMediaEditModalOpen && selectedMediaItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                  <div className="bg-white rounded-3xl w-full max-w-xl p-6 shadow-2xl border border-slate-200 space-y-5 text-right">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-bold text-slate-900">ویرایش مشخصات رسانه</h3>
                      </div>
                      <button
                        onClick={() => setIsMediaEditModalOpen(false)}
                        className="text-slate-400 hover:text-slate-600 text-xs"
                      >
                        بستن
                      </button>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <img
                        src={selectedMediaItem.url}
                        alt={selectedMediaItem.title}
                        className="w-24 h-20 rounded-xl object-cover border border-slate-300 shrink-0"
                      />
                      <div className="space-y-1 text-xs">
                        <div className="font-mono text-slate-600" dir="ltr">{selectedMediaItem.fileName}</div>
                        <div className="text-[11px] text-slate-400">حجم: {selectedMediaItem.size} · تاریخ: {selectedMediaItem.uploadedAt}</div>
                        <button
                          type="button"
                          onClick={() => handleCopyMediaUrl(selectedMediaItem)}
                          className="mt-1 px-2.5 py-1 bg-white border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedMediaUrlId === selectedMediaItem.id ? 'آدرس کپی شد!' : 'کپی آدرس مستقیم'}</span>
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSaveMediaEdit} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">عنوان رسانه</label>
                        <input
                          type="text"
                          required
                          value={mediaEditForm.title}
                          onChange={(e) => setMediaEditForm({ ...mediaEditForm, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">نام فایل</label>
                        <input
                          type="text"
                          required
                          value={mediaEditForm.fileName}
                          onChange={(e) => setMediaEditForm({ ...mediaEditForm, fileName: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-left"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">متن جایگزین (Alt Text برای سئو)</label>
                        <input
                          type="text"
                          value={mediaEditForm.altText}
                          onChange={(e) => setMediaEditForm({ ...mediaEditForm, altText: e.target.value })}
                          placeholder="توضیح تصویر برای موتورهای جستجو..."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">تگ‌ها و کلمات کلیدی (با ویرگول جدا کنید)</label>
                        <input
                          type="text"
                          value={mediaEditForm.tags}
                          onChange={(e) => setMediaEditForm({ ...mediaEditForm, tags: e.target.value })}
                          placeholder="سیسکو، شبکه، پکت‌تریسر"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(selectedMediaItem.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-colors"
                        >
                          حذف پرونده
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsMediaEditModalOpen(false)}
                            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                          >
                            انصراف
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                          >
                            ذخیره تغییرات
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================== VIEW 5: ARTICLES & EVENTS ===================== */}
          {activeMenu === 'articles' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">نوشته‌ها، اطلاعیه‌ها، اخبار و رویدادها</h1>
                  <p className="text-xs text-slate-500 mt-1">انتشار مقالات تخصصی، اطلاعیه‌های تخفیف، اخبار شبکه و وبینارهای آکادمی</p>
                </div>
                <button
                  onClick={() => {
                    setArticleFormData({
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
                    setIsEditingArticle(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن نوشته تازه</span>
                </button>
              </div>

              {isEditingArticle ? (
                // Add / Edit Article Form
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs max-w-3xl">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      {articleFormData.id ? 'ویرایش نوشته یا رویداد' : 'افزودن نوشته تازه'}
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
                        value={articleFormData.title}
                        onChange={(e) => setArticleFormData({ ...articleFormData, title: e.target.value })}
                        placeholder="مثال: نقشه راه جامع یادگیری شبکه سیسکو در سال ۲۰۲۵"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    {/* FEATURED IMAGE UPLOAD & SELECTOR */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800">تصویر شاخص نوشته</label>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>آپلود تصویر جدید</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFormDirectImageUpload(e, 'article')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('article');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>انتخاب از رسانه‌ها</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <img
                          src={articleFormData.coverImage || '/src/assets/images/course_network_engineering_1791894523440.jpg'}
                          alt="Article Preview"
                          className="w-24 h-16 rounded-xl object-cover border border-slate-300 shadow-xs shrink-0"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            value={articleFormData.coverImage || ''}
                            onChange={(e) => setArticleFormData({ ...articleFormData, coverImage: e.target.value })}
                            placeholder="یا آدرس مستقیم تصویر را وارد کنید..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-[11px] font-mono"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">نوع نوشته</label>
                        <select
                          value={articleFormData.type}
                          onChange={(e: any) => setArticleFormData({ ...articleFormData, type: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        >
                          <option value="article">مقاله تخصصی</option>
                          <option value="announcement">اطلاعیه مهم</option>
                          <option value="news">خبر فناوری</option>
                          <option value="event">رویداد یا وبینار آنلاین</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">دسته‌بندی</label>
                        <input
                          type="text"
                          value={articleFormData.category}
                          onChange={(e) => setArticleFormData({ ...articleFormData, category: e.target.value })}
                          placeholder="آموزش شبکه، امنیت، وب"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">خلاصه کوتاه نوشته</label>
                      <input
                        type="text"
                        value={articleFormData.excerpt}
                        onChange={(e) => setArticleFormData({ ...articleFormData, excerpt: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">متن کامل محتوا</label>
                      <textarea
                        rows={6}
                        value={articleFormData.content}
                        onChange={(e) => setArticleFormData({ ...articleFormData, content: e.target.value })}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl font-light leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                    >
                      ذخیره و انتشار در وب‌سایت
                    </button>
                  </form>
                </div>
              ) : (
                // Posts Table
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                        <tr>
                          <th className="p-3">عنوان مطلب و تصویر شاخص</th>
                          <th className="p-3">نوع نوشته</th>
                          <th className="p-3">نویسنده</th>
                          <th className="p-3">تاریخ</th>
                          <th className="p-3">عملیات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {articles.map(post => (
                          <tr key={post.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900 flex items-center gap-2.5">
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-10 h-8 rounded-lg object-cover shrink-0 border border-slate-200"
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
                                {post.type === 'announcement' ? 'اطلاعیه' : post.type === 'event' ? 'وبینار' : post.type === 'news' ? 'خبر' : 'مقاله'}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500 font-mono text-[11px]">{post.author}</td>
                            <td className="p-3 font-mono text-slate-400 text-[11px]">{post.createdAt}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setArticleFormData(post);
                                    setIsEditingArticle(true);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(post.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
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

          {/* ===================== VIEW 6: ORDERS & WOOCOMMERCE ===================== */}
          {activeMenu === 'orders' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">سفارشات و تراکنش‌های مالی</h1>
                <p className="text-xs text-slate-500 mt-1">فهرست کل سفارش‌های ثبت شده، فاکتورهای رسمی و وضعیت درگاه پرداخت</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3">شماره سفارش</th>
                      <th className="p-3">نام کاربر</th>
                      <th className="p-3">مبلغ پرداختی</th>
                      <th className="p-3">کد رهگیری بانکی</th>
                      <th className="p-3">تاریخ ثبت</th>
                      <th className="p-3">وضعیت</th>
                      <th className="p-3">فاکتور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{order.orderNumber}</td>
                        <td className="p-3">{order.userName}</td>
                        <td className="p-3 font-mono tabular-nums font-bold text-slate-900">
                          {order.payableAmount.toLocaleString('fa-IR')} تومان
                        </td>
                        <td className="p-3 font-mono text-[11px] text-emerald-700">{order.refId}</td>
                        <td className="p-3 font-mono text-slate-500 text-[11px]">{order.createdAt}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            order.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {order.status === 'completed' ? 'پرداخت شده' : order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onOpenInvoice(order)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded text-[11px] font-bold transition-colors"
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

          {/* ===================== VIEW 7: USERS ===================== */}
          {activeMenu === 'users' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">کاربران و دانشجویان آکادمی</h1>
                <p className="text-xs text-slate-500 mt-1">مدیریت دسترسی به دوره‌ها، نقش‌های کاربری و کیف پول</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                <div className="flex items-center gap-4">
                  <img
                    src={store.currentUser.avatar}
                    alt={store.currentUser.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-100"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{store.currentUser.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{store.currentUser.email} · {store.currentUser.phone}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-indigo-50 text-indigo-700 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                        نقش: {store.currentUser.role}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        دوره‌های خریداری شده: {store.currentUser.enrolledCourseIds.length} مورد
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW 8: TICKETS ===================== */}
          {activeMenu === 'tickets' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">تیکت‌های پشتیبانی علمی و فنی</h1>
                <p className="text-xs text-slate-500 mt-1">پاسخ مستقیم به دانشجویان دوره‌ها و خریداران سناریوها</p>
              </div>

              <div className="space-y-4">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-xs text-slate-500">#{ticket.ticketNumber}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            ticket.status === 'open' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                          }`}>
                            {ticket.status === 'open' ? 'منتظر پاسخ' : 'پاسخ داده شده'}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900">{ticket.subject}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">دانشجو: {ticket.userName} ({ticket.userEmail})</p>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{ticket.createdAt}</span>
                    </div>

                    {/* Messages history */}
                    <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-56 overflow-y-auto">
                      {ticket.messages.map(m => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-xl text-xs ${
                            m.senderRole === 'admin'
                              ? 'bg-indigo-50 border border-indigo-100 text-indigo-950 mr-6'
                              : 'bg-white border border-slate-200 ml-6 text-slate-800'
                          }`}
                        >
                          <div className="flex justify-between font-bold text-[11px] mb-1">
                            <span>{m.senderName}</span>
                            <span className="font-normal text-slate-400 font-mono text-[10px]">{m.createdAt}</span>
                          </div>
                          <p className="leading-relaxed whitespace-pre-line">{m.content}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reply box */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="نوشتن پاسخ مدرس / مدیر سیستم..."
                        value={adminTicketReply[ticket.id] || ''}
                        onChange={(e) => setAdminTicketReply({ ...adminTicketReply, [ticket.id]: e.target.value })}
                        className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        onClick={() => {
                          const text = adminTicketReply[ticket.id];
                          if (text) {
                            store.replyTicket(ticket.id, text, 'admin');
                            setAdminTicketReply({ ...adminTicketReply, [ticket.id]: '' });
                          }
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                      >
                        ارسال پاسخ
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== VIEW 9: CONTACT MESSAGES (NEW) ===================== */}
          {activeMenu === 'contact-messages' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-black text-slate-900">پیام‌های فرم تماس با ما</h1>
                  <p className="text-xs text-slate-500 mt-1">مشاهده و مدیریت پیام‌های ارسالی از صفحه «تماس با ما» وب‌سایت</p>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {contactMessages.filter(m => !m.isRead).length} پیام خوانده نشده
                </div>
              </div>

              {contactMessages.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 text-slate-400">
                  <Mail className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm font-bold text-slate-600">هنوز پیامی از فرم تماس ارسال نشده است.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">وضعیت</th>
                        <th className="p-3">فرستنده</th>
                        <th className="p-3">شماره تماس / ایمیل</th>
                        <th className="p-3">موضوع پیام</th>
                        <th className="p-3">تاریخ ثبت</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {contactMessages.map(msg => (
                        <tr
                          key={msg.id}
                          className={`hover:bg-slate-50 cursor-pointer ${!msg.isRead ? 'bg-indigo-50/30' : ''}`}
                          onClick={() => {
                            setSelectedContactMessage(msg);
                            if (!msg.isRead) {
                              store.markContactMessageRead(msg.id, true);
                            }
                          }}
                        >
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              !msg.isRead ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {!msg.isRead ? 'جدید' : 'خوانده شده'}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{msg.name}</td>
                          <td className="p-3 font-mono text-slate-600 text-[11px]" dir="ltr">
                            {msg.phone || msg.email}
                          </td>
                          <td className="p-3 font-medium text-slate-800 line-clamp-1">{msg.subject}</td>
                          <td className="p-3 font-mono text-slate-400 text-[11px]">{msg.createdAt}</td>
                          <td className="p-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedContactMessage(msg);
                                  store.markContactMessageRead(msg.id, true);
                                }}
                                className="px-2 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded text-[11px] font-bold"
                              >
                                مشاهده
                              </button>
                              <button
                                onClick={() => store.deleteContactMessage(msg.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                title="حذف پیام"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* CONTACT MESSAGE DETAIL MODAL */}
              {selectedContactMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                  <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 space-y-5 text-right">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-indigo-600" />
                        <h3 className="text-sm font-bold text-slate-900">جزئیات پیام دریافتی</h3>
                      </div>
                      <button
                        onClick={() => setSelectedContactMessage(null)}
                        className="text-slate-400 hover:text-slate-600 text-xs"
                      >
                        بستن
                      </button>
                    </div>

                    <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">نام فرستنده:</span>
                        <span className="font-bold text-slate-900">{selectedContactMessage.name}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">پست الکترونیکی:</span>
                        <span className="font-mono text-indigo-600" dir="ltr">{selectedContactMessage.email}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">شماره تماس:</span>
                        <span className="font-mono text-slate-900" dir="ltr">{selectedContactMessage.phone || 'ثبت نشده'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">موضوع:</span>
                        <span className="font-bold text-slate-900">{selectedContactMessage.subject}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">زمان ارسال:</span>
                        <span className="font-mono text-slate-400">{selectedContactMessage.createdAt}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-800 mb-2">متن پیام:</h4>
                      <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-light whitespace-pre-line max-h-60 overflow-y-auto">
                        {selectedContactMessage.message}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          store.deleteContactMessage(selectedContactMessage.id);
                          setSelectedContactMessage(null);
                        }}
                        className="text-xs text-red-600 hover:text-red-700 font-bold"
                      >
                        حذف این پیام
                      </button>

                      <div className="flex items-center gap-2">
                        {selectedContactMessage.phone && (
                          <a
                            href={`tel:${selectedContactMessage.phone}`}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>تماس تلفنی</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${selectedContactMessage.email}?subject=پاسخ: ${encodeURIComponent(selectedContactMessage.subject)}`}
                          className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>ارسال ایمیل پاسخ</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================== VIEW 10: SETTINGS, SECURITY & PAGES ===================== */}
          {activeMenu === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-xl font-black text-slate-900">تنظیمات، امنیت مدیریت و ویرایش صفحات سایت</h1>
                <p className="text-xs text-slate-500 mt-1">
                  تغییر رمز عبور مدیر، ویرایش متون درباره ما و قوانین، اتصال Supabase و درگاه پرداخت
                </p>
              </div>

              {/* 1. ADMIN CREDENTIALS & SECURITY BOX (NEW REQUEST) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">تغییر نام کاربری و رمز عبور ورود به پنل مدیریت</h3>
                    <p className="text-xs text-slate-500">
                      نام کاربری و کلمه عبور فعلی: <strong className="font-mono text-indigo-600">{settings.adminUsername || 'admin'}</strong>
                    </p>
                  </div>
                </div>

                {adminCredStatus && (
                  <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs ${
                    adminCredStatus.success
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    {adminCredStatus.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                    <span>{adminCredStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleChangeAdminCredentials} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        رمز عبور فعلی مدیر <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={currentAdminPass}
                        onChange={(e) => setCurrentAdminPass(e.target.value)}
                        placeholder="رمز فعلی (پیش‌فرض: admin)"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        نام کاربری جدید مدیر
                      </label>
                      <input
                        type="text"
                        required
                        value={newAdminUser}
                        onChange={(e) => setNewAdminUser(e.target.value)}
                        placeholder="admin"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        رمز عبور جدید <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={newAdminPass}
                        onChange={(e) => setNewAdminPass(e.target.value)}
                        placeholder="حداقل ۴ کاراکتر"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        تکرار رمز عبور جدید <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmAdminPass}
                        onChange={(e) => setConfirmAdminPass(e.target.value)}
                        placeholder="تکرار رمز عبور"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    ثبت و ذخیره تغییرات رمز عبور مدیر
                  </button>
                </form>
              </div>

              {/* 2. ABOUT US & TERMS EDITORS (NEW REQUEST) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">ویرایش محتوای صفحات درباره ما و قوانین</h3>
                    <p className="text-xs text-slate-500">متون نمایش داده شده در صفحات درباره ما، قوانین و فوتر سایت</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      متن معرفی و داستان آکادمی (صفحه درباره ما)
                    </label>
                    <textarea
                      rows={5}
                      value={settings.aboutText}
                      onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      متن قوانین، مقررات، شرایط استفاده و بازگشت وجه
                    </label>
                    <textarea
                      rows={5}
                      value={settings.termsText}
                      onChange={(e) => setSettings({ ...settings, termsText: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">تلفن پشتیبانی آکادمی</label>
                      <input
                        type="text"
                        value={settings.supportPhone}
                        onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ایمیل رسمی پشتیبانی</label>
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">نشانی پستی دفتر مرکزی و لابراتوار</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      store.updateSettings(settings);
                      alert('متون صفحات و اطلاعات تماس با موفقیت در سیستم ذخیره گردید.');
                    }}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    ذخیره متون صفحات و مشخصات تماس
                  </button>
                </div>
              </div>

              {/* 3. SUPABASE CLOUD DATABASE BOX */}
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

              {/* 4. VERCEL DEPLOYMENT GUIDE */}
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

              {/* 5. ZARINPAL SETTINGS */}
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

      {/* MEDIA PICKER MODAL FOR FORMS */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => {
          setIsMediaPickerOpen(false);
          setMediaPickerTarget(null);
        }}
        onSelectImage={handleMediaPickerSelect}
        title={
          mediaPickerTarget === 'course'
            ? 'انتخاب تصویر شاخص برای دوره آموزشی'
            : mediaPickerTarget === 'file'
            ? 'انتخاب تصویر شاخص برای فایل دانلودی'
            : 'انتخاب تصویر شاخص برای نوشته یا رویداد'
        }
      />
    </div>
  );
};
