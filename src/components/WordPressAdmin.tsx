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
  HardDrive,
  Star,
  Percent,
  CheckCircle,
  XCircle,
  GitFork,
  Sun,
  Moon,
  Palette,
  Wallet,
  Bell,
  ChevronDown,
  ChevronUp,
  Layers,
  Award,
  HelpCircle,
  FileJson,
  UploadCloud,
  RotateCcw,
  Sliders,
  Sparkles,
  Share2,
  Menu,
  Server,
  Terminal,
  Code2,
  Layout,
  X,
  Leaf,
  Package,
  Scale,
  Truck,
  Printer,
  BarChart3
} from 'lucide-react';
import { 
  Course, DigitalFile, Order, Ticket, User, SiteSettings, Article, MediaItem, 
  ContactMessage, Coupon, Review, ColorTheme, AdminTheme, Season, Episode, 
  CourseQuiz, Certificate, SidebarCustomLink,
  OrganicProduct, OrganicOrder, OrganicSettlement, OrganicPackageOption, OrganicCategory, OrganicGrade,
  ProjectRequest, ProjectStatus, ProjectServiceCategory
} from '../types';

import { store } from '../services/store';
import { MediaPickerModal } from './MediaPickerModal';
import { RichTextEditor } from './RichTextEditor';
import { UploadReviewModal, PendingUploadFile } from './UploadReviewModal';
import { OrganicAdminSection } from './OrganicAdminSection';
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard';

export const ADMIN_THEMES: Record<AdminTheme, {
  name: string;
  topbar: string;
  sidebar: string;
  sidebarActive: string;
  sidebarHover: string;
  canvas: string;
  card: string;
  cardBorder: string;
  text: string;
  subText: string;
  badge: string;
  accent: string;
  tableHeader: string;
}> = {
  'classic-dark': {
    name: 'کلاسیک وردپرس (تیره کربنی)',
    topbar: 'bg-slate-950 border-slate-800 text-slate-200',
    sidebar: 'bg-slate-900 border-slate-800 text-slate-300',
    sidebarActive: 'bg-indigo-600 text-white font-bold',
    sidebarHover: 'hover:bg-slate-800/80 hover:text-white',
    canvas: 'bg-slate-100/90 text-slate-900',
    card: 'bg-white',
    cardBorder: 'border-slate-200/90 shadow-xs',
    text: 'text-slate-900',
    subText: 'text-slate-500',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accent: 'text-indigo-600',
    tableHeader: 'bg-slate-50 text-slate-600'
  },
  'modern-light': {
    name: 'مدرن و مینیمال (روشن و نقره‌ای)',
    topbar: 'bg-white border-slate-200/90 text-slate-800 shadow-xs',
    sidebar: 'bg-slate-50 border-slate-200 text-slate-700',
    sidebarActive: 'bg-white text-indigo-700 font-bold shadow-xs border-r-4 border-indigo-600',
    sidebarHover: 'hover:bg-slate-200/60 hover:text-slate-900',
    canvas: 'bg-slate-100 text-slate-900',
    card: 'bg-white',
    cardBorder: 'border-slate-200 shadow-xs',
    text: 'text-slate-900',
    subText: 'text-slate-500',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    accent: 'text-indigo-600',
    tableHeader: 'bg-slate-100 text-slate-700'
  },
  'slate-midnight': {
    name: 'آبسیدین و نایت‌مود (تیره خالص)',
    topbar: 'bg-neutral-950 border-neutral-800 text-neutral-200',
    sidebar: 'bg-neutral-900 border-neutral-800 text-neutral-300',
    sidebarActive: 'bg-neutral-800 text-cyan-400 font-bold border-r-4 border-cyan-400',
    sidebarHover: 'hover:bg-neutral-800/60 hover:text-white',
    canvas: 'bg-neutral-950 text-neutral-100',
    card: 'bg-neutral-900',
    cardBorder: 'border-neutral-800 shadow-xs',
    text: 'text-neutral-100',
    subText: 'text-neutral-400',
    badge: 'bg-neutral-800 text-cyan-400 border-neutral-700',
    accent: 'text-cyan-400',
    tableHeader: 'bg-neutral-800 text-neutral-300'
  },
  'royal-indigo': {
    name: 'سرمه‌ای رویال و بنفش لوکس (SaaS)',
    topbar: 'bg-slate-950 border-indigo-950/80 text-indigo-100',
    sidebar: 'bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-900 border-indigo-900/40 text-indigo-200',
    sidebarActive: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-md shadow-indigo-900/50',
    sidebarHover: 'hover:bg-indigo-900/40 hover:text-white',
    canvas: 'bg-slate-100 text-slate-900',
    card: 'bg-white',
    cardBorder: 'border-indigo-100 shadow-xs',
    text: 'text-slate-900',
    subText: 'text-slate-500',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accent: 'text-indigo-600',
    tableHeader: 'bg-indigo-50/70 text-indigo-900'
  },
  'emerald-terminal': {
    name: 'ترمینال تکنو و سایبر (DevOps)',
    topbar: 'bg-zinc-950 border-zinc-800 text-emerald-400',
    sidebar: 'bg-zinc-900 border-zinc-800 text-zinc-300 font-mono',
    sidebarActive: 'bg-emerald-950/80 text-emerald-400 font-bold border-r-4 border-emerald-500',
    sidebarHover: 'hover:bg-zinc-800 hover:text-emerald-300',
    canvas: 'bg-zinc-950 text-zinc-100 font-mono',
    card: 'bg-zinc-900',
    cardBorder: 'border-zinc-800 shadow-xs',
    text: 'text-zinc-100',
    subText: 'text-zinc-400',
    badge: 'bg-zinc-800 text-emerald-400 border-zinc-700',
    accent: 'text-emerald-400',
    tableHeader: 'bg-zinc-800 text-zinc-300'
  }
};

interface WordPressAdminProps {
  onBackToSite: () => void;
  onOpenInvoice: (order: Order) => void;
}

export const WordPressAdmin: React.FC<WordPressAdminProps> = ({
  onBackToSite,
  onOpenInvoice
}) => {
  const [activeMenu, setActiveMenu] = useState<
    'dashboard' | 'analytics' | 'courses' | 'files' | 'roadmaps' | 'quizzes' | 'certificates' | 'media' | 'articles' | 'coupons' | 'reviews' | 'orders' | 'users' | 'tickets' | 'contact-messages' | 'settings' | 'organic-products' | 'organic-finance' | 'project-requests'
  >('dashboard');

  const [courses, setCourses] = useState<Course[]>(store.courses);
  const [files, setFiles] = useState<DigitalFile[]>(store.files);
  const [orders, setOrders] = useState<Order[]>(store.orders);
  const [tickets, setTickets] = useState<Ticket[]>(store.tickets);
  const [articles, setArticles] = useState<Article[]>(store.articles);
  const [mediaList, setMediaList] = useState<MediaItem[]>(store.media);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(store.contactMessages);
  const [settings, setSettings] = useState<SiteSettings>(store.settings);
  const [coupons, setCoupons] = useState<Coupon[]>(store.coupons);
  const [reviews, setReviews] = useState<Review[]>(store.reviews);
  const [users, setUsers] = useState<User[]>(store.users);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>(store.projectRequests);

  // Dedicated Organic Store States
  const [organicProducts, setOrganicProducts] = useState<OrganicProduct[]>(store.organicProducts);
  const [organicOrders, setOrganicOrders] = useState<OrganicOrder[]>(store.organicOrders);
  const [organicSettlements, setOrganicSettlements] = useState<OrganicSettlement[]>(store.organicSettlements);


  // User Management State
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'instructor' | 'admin'>('all');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<'student' | 'instructor' | 'admin'>('student');
  const [newUserWallet, setNewUserWallet] = useState<number>(0);
  const [selectedUserForWallet, setSelectedUserForWallet] = useState<User | null>(null);
  const [walletChargeInput, setWalletChargeInput] = useState<number>(100000);

  // Roadmaps & Theme State
  const [activeRoadmapView, setActiveRoadmapView] = useState<string>('network-engineer');
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }));
  const [colorTheme, setColorTheme] = useState<ColorTheme>(store.colorTheme);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Coupon state
  const [isAddingCoupon, setIsAddingCoupon] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(20);
  const [newCouponMaxUses, setNewCouponMaxUses] = useState<number>(100);
  const [newCouponExpires, setNewCouponExpires] = useState('۱۴۰۳/۰۹/۳۰');
  const [newCouponDescription, setNewCouponDescription] = useState('');

  // Review filter
  const [reviewFilter, setReviewFilter] = useState<'all' | 'pending' | 'approved'>('all');

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
  const [mediaPickerTarget, setMediaPickerTarget] = useState<'course' | 'file' | 'article' | 'course-gallery' | 'file-gallery' | 'article-gallery' | 'rich-editor' | null>(null);
  const [richEditorCallback, setRichEditorCallback] = useState<((url: string) => void) | null>(null);

  // Staged Upload Review State (prevents immediate auto-uploading upon file selection)
  const [pendingUpload, setPendingUpload] = useState<PendingUploadFile | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<'media-library' | 'course-image' | 'file-image' | 'article-image' | 'course-gallery' | 'file-gallery' | 'article-gallery'>('media-library');

  // Tag inputs for forms
  const [courseTagInput, setCourseTagInput] = useState('');
  const [fileTagInput, setFileTagInput] = useState('');
  const [articleTagInput, setArticleTagInput] = useState('');

  // Sidebar link form state in Settings
  const [newSidebarLinkTitle, setNewSidebarLinkTitle] = useState('');
  const [newSidebarLinkUrl, setNewSidebarLinkUrl] = useState('');

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

  // Theme, Quiz & Certificate Management States
  const [adminTheme, setAdminTheme] = useState<AdminTheme>(store.adminTheme);
  const [quizzes, setQuizzes] = useState<CourseQuiz[]>(store.quizzes);
  const [certificates, setCertificates] = useState<Certificate[]>(store.officialCertificates);

  // Certificate Issuance State
  const [isIssuingCert, setIsIssuingCert] = useState(false);
  const [certStudentName, setCertStudentName] = useState('');
  const [certStudentPhone, setCertStudentPhone] = useState('');
  const [certCourseTitle, setCertCourseTitle] = useState('دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)');
  const [certInstructor, setCertInstructor] = useState('مهندس محمدرضا قاسمی');
  const [certScore, setCertScore] = useState<number>(95);
  const [certSearch, setCertSearch] = useState('');

  // Quiz Management State
  const [isAddingQuiz, setIsAddingQuiz] = useState(false);
  const [quizSearch, setQuizSearch] = useState('');
  const [newQuizCourse, setNewQuizCourse] = useState('دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)');
  const [newQuizTitle, setNewQuizTitle] = useState('آزمون آنلاین پایان دوره و سنجش مهارت');
  const [newQuizTimeLimit, setNewQuizTimeLimit] = useState<number>(25);
  const [newQuizPassScore, setNewQuizPassScore] = useState<number>(75);
  const [newQuizQuestions, setNewQuizQuestions] = useState<Array<{ question: string; options: string[]; correctOptionIndex: number; explanation: string }>>([
    {
      question: 'کدام پروتکل برای ترجمه آدرس‌های محلی شبکه (Private IP) به آدرس عمومی اینترنت به کار می‌رود؟',
      options: ['NAT / PAT', 'RIPv2', 'SNMPv3', 'LLDP'],
      correctOptionIndex: 0,
      explanation: 'مکانیزم NAT/PAT نگاشت آدرس‌های خصوصی به عمومی را انجام می‌دهد.'
    },
    {
      question: 'پروتکل OSPF برای برقراری همسایگی و محاسبه کوتاه‌ترین مسیر از کدام الگوریتم استفاده می‌کند؟',
      options: ['الگوریتم دکسترا (SPF / Dijkstra)', 'الگوریتم بلمن-فورد (Bellman-Ford)', 'الگوریتم DUAL', 'الگوریتم هشینگ MD5'],
      correctOptionIndex: 0,
      explanation: 'پروتکل OSPF از الگوریتم کوتاه‌ترین مسیر اول (Shortest Path First) دکسترا بهره می‌برد.'
    }
  ]);

  // Backup & Import State
  const [importBackupText, setImportBackupText] = useState('');
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }));
    }, 15000);

    const unsub = store.subscribe(() => {
      setCourses([...store.courses]);
      setFiles([...store.files]);
      setOrders([...store.orders]);
      setTickets([...store.tickets]);
      setArticles([...store.articles]);
      setMediaList([...store.media]);
      setContactMessages([...store.contactMessages]);
      setSettings({ ...store.settings });
      setCoupons([...store.coupons]);
      setReviews([...store.reviews]);
      setUsers([...store.users]);
      setQuizzes([...store.quizzes]);
      setCertificates([...store.officialCertificates]);
      setOrganicProducts([...store.organicProducts]);
      setOrganicOrders([...store.organicOrders]);
      setOrganicSettlements([...store.organicSettlements]);
      setProjectRequests([...store.projectRequests]);
      setColorTheme(store.colorTheme);
      setAdminTheme(store.adminTheme);
    });


    return () => {
      clearInterval(timer);
      unsub();
    };
  }, []);

  // Coupon handlers
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;

    const newCp: Coupon = {
      id: `cp-${Date.now()}`,
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount) || 10,
      maxUses: Number(newCouponMaxUses) || 50,
      usedCount: 0,
      expiresAt: newCouponExpires.trim() || '۱۴۰۳/۱۲/۲۹',
      isActive: true,
      description: newCouponDescription.trim() || 'تخفیف ویژه جشنواره'
    };

    store.addCoupon(newCp);
    setIsAddingCoupon(false);
    setNewCouponCode('');
    setNewCouponDescription('');
  };

  const handleToggleCoupon = (id: string) => {
    store.toggleCouponStatus(id);
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm('آیا از حذف این کد تخفیف اطمینان دارید؟')) {
      store.deleteCoupon(id);
    }
  };

  // Review handlers
  const handleApproveReview = (id: string) => {
    store.approveReview(id, true);
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('آیا از حذف این دیدگاه اطمینان دارید؟')) {
      store.deleteReview(id);
    }
  };

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
        ...courseFormData,
        slug: courseFormData.slug?.trim() ? generateSlug(courseFormData.slug) : existing.slug,
        tags: courseFormData.tags || existing.tags || [],
        galleryImages: courseFormData.galleryImages || existing.galleryImages || []
      } as Course);
    } else {
      // Add
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseFormData.title || 'دوره آموزشی جدید',
        slug: courseFormData.slug?.trim() ? generateSlug(courseFormData.slug) : generateSlug(courseFormData.title || 'new-course'),
        description: courseFormData.description || 'توضیحات دوره',
        shortDescription: courseFormData.shortDescription || 'توضیح کوتاه دوره',
        category: (courseFormData.category as any) || 'network',
        level: (courseFormData.level as any) || 'جامع',
        price: Number(courseFormData.price) || 0,
        originalPrice: Number(courseFormData.originalPrice) || 0,
        image: courseFormData.image || '/src/assets/images/course_network_engineering_1791894523440.jpg',
        tags: courseFormData.tags || [],
        galleryImages: courseFormData.galleryImages || [],
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
        seasons: (courseFormData.seasons && courseFormData.seasons.length > 0)
          ? courseFormData.seasons
          : [
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

  // Curriculum & Seasons Builder
  const handleAddSeason = () => {
    const currentSeasons = courseFormData.seasons || [];
    const newSeason: Season = {
      id: `s-${Date.now()}`,
      title: `فصل جدید شماره ${currentSeasons.length + 1}`,
      episodes: []
    };
    setCourseFormData({
      ...courseFormData,
      seasons: [...currentSeasons, newSeason]
    });
  };

  const handleAddEpisodeToSeason = (seasonId: string) => {
    const currentSeasons = courseFormData.seasons || [];
    const updated = currentSeasons.map(s => {
      if (s.id === seasonId) {
        const epIndex = s.episodes.length + 1;
        const newEp: Episode = {
          id: `ep-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: `جلسه ${epIndex}: عنوان جلسه جدید`,
          duration: '۲۰:۰۰',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          isFreePreview: epIndex === 1
        };
        return { ...s, episodes: [...s.episodes, newEp] };
      }
      return s;
    });
    setCourseFormData({ ...courseFormData, seasons: updated });
  };

  const handleUpdateEpisode = (seasonId: string, episodeId: string, updates: Partial<Episode>) => {
    const currentSeasons = courseFormData.seasons || [];
    const updated = currentSeasons.map(s => {
      if (s.id === seasonId) {
        return {
          ...s,
          episodes: s.episodes.map(ep => ep.id === episodeId ? { ...ep, ...updates } : ep)
        };
      }
      return s;
    });
    setCourseFormData({ ...courseFormData, seasons: updated });
  };

  const handleDeleteEpisode = (seasonId: string, episodeId: string) => {
    const currentSeasons = courseFormData.seasons || [];
    const updated = currentSeasons.map(s => {
      if (s.id === seasonId) {
        return { ...s, episodes: s.episodes.filter(ep => ep.id !== episodeId) };
      }
      return s;
    });
    setCourseFormData({ ...courseFormData, seasons: updated });
  };

  const handleDeleteSeason = (seasonId: string) => {
    const currentSeasons = courseFormData.seasons || [];
    setCourseFormData({
      ...courseFormData,
      seasons: currentSeasons.filter(s => s.id !== seasonId)
    });
  };

  // User Management Handlers
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim() || '09120000000',
      role: newUserRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      enrolledCourseIds: [],
      purchasedFileIds: [],
      completedEpisodeIds: [],
      certificates: [],
      walletBalance: Number(newUserWallet) || 0,
      createdAt: new Date().toLocaleDateString('fa-IR')
    };

    store.addUser(newUser);
    setIsAddingUser(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setNewUserWallet(0);
  };

  const handleRechargeWallet = (userId: string, amount: number) => {
    store.addWalletCredit(userId, amount);
    setSelectedUserForWallet(null);
  };

  const handleUserRoleChange = (userId: string, role: User['role']) => {
    store.updateUser(userId, { role });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('آیا از حذف این کاربر از سیستم اطمینان دارید؟')) {
      store.deleteUser(userId);
    }
  };

  // Order status update
  const handleOrderStatusChange = (orderId: string, status: Order['status']) => {
    store.updateOrderStatus(orderId, status);
  };

  // File handlers
  const handleSaveFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileFormData.title) return;

    if (fileFormData.id) {
      const existing = files.find(f => f.id === fileFormData.id)!;
      store.updateFile({
        ...existing,
        ...fileFormData,
        slug: fileFormData.slug?.trim() ? generateSlug(fileFormData.slug) : existing.slug,
        tags: fileFormData.tags || existing.tags || [],
        galleryImages: fileFormData.galleryImages || existing.galleryImages || []
      } as DigitalFile);
    } else {
      const newFile: DigitalFile = {
        id: `file-${Date.now()}`,
        title: fileFormData.title || 'فایل دانلودی جدید',
        slug: fileFormData.slug?.trim() ? generateSlug(fileFormData.slug) : generateSlug(fileFormData.title || 'new-file'),
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
        tags: fileFormData.tags || [],
        galleryImages: fileFormData.galleryImages || [],
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
        ...articleFormData,
        slug: articleFormData.slug?.trim() ? generateSlug(articleFormData.slug) : existing.slug,
        tags: articleFormData.tags || existing.tags || [],
        galleryImages: articleFormData.galleryImages || existing.galleryImages || []
      } as Article);
    } else {
      const newArt: Article = {
        id: `art-${Date.now()}`,
        title: articleFormData.title || 'نوشته جدید',
        slug: articleFormData.slug?.trim() ? generateSlug(articleFormData.slug) : generateSlug(articleFormData.title || 'new-post'),
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
        galleryImages: articleFormData.galleryImages || [],
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

  // Slug and Permalink Generator (WordPress Style)
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || `item-${Date.now()}`;
  };

  // Staged File Upload Handler (No immediate upload; opens UploadReviewModal for confirmation)
  const handleStageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'media-library' | 'course-image' | 'file-image' | 'article-image' | 'course-gallery' | 'file-gallery' | 'article-gallery'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} مگابایت` : `${sizeKb} کیلوبایت`;

      const fileType: 'image' | 'video' | 'document' | 'archive' = file.type.startsWith('image/')
        ? 'image'
        : file.type.startsWith('video/')
        ? 'video'
        : file.name.endsWith('.zip') || file.name.endsWith('.rar') || file.name.endsWith('.pkt')
        ? 'archive'
        : 'document';

      setPendingUpload({
        file,
        previewUrl: fileType === 'image' ? dataUrl : undefined,
        fileName: file.name,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        altText: file.name,
        sizeFormatted: sizeStr,
        fileType
      });
      setUploadTarget(target);
      setIsUploadModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Confirmation from UploadReviewModal
  const handleConfirmUpload = (data: {
    file: File;
    previewUrl?: string;
    title: string;
    fileName: string;
    altText: string;
    fileType: 'image' | 'video' | 'document' | 'archive';
    sizeFormatted: string;
  }) => {
    const newMedia: MediaItem = {
      id: `media-${Date.now()}`,
      title: data.title,
      fileName: data.fileName,
      fileType: data.fileType,
      url: data.previewUrl || '',
      size: data.sizeFormatted,
      dimensions: 'کیفیت بالا',
      altText: data.altText,
      tags: ['بارگذاری اختصاصی', uploadTarget],
      uploadedAt: new Date().toLocaleDateString('fa-IR')
    };

    store.addMediaItem(newMedia);

    if (uploadTarget === 'course-image') {
      setCourseFormData(prev => ({ ...prev, image: newMedia.url }));
      store.showToast('success', 'تصویر شاخص دوره با موفقیت ثبت شد.');
    } else if (uploadTarget === 'file-image') {
      setFileFormData(prev => ({ ...prev, image: newMedia.url }));
      store.showToast('success', 'تصویر شاخص فایل با موفقیت ثبت شد.');
    } else if (uploadTarget === 'article-image') {
      setArticleFormData(prev => ({ ...prev, coverImage: newMedia.url }));
      store.showToast('success', 'تصویر شاخص نوشته با موفقیت ثبت شد.');
    } else if (uploadTarget === 'course-gallery') {
      setCourseFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), newMedia.url]
      }));
      store.showToast('success', 'تصویر به گالری دوره افزوده شد.');
    } else if (uploadTarget === 'file-gallery') {
      setFileFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), newMedia.url]
      }));
      store.showToast('success', 'تصویر به گالری فایل دانلودی افزوده شد.');
    } else if (uploadTarget === 'article-gallery') {
      setArticleFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages || []), newMedia.url]
      }));
      store.showToast('success', 'تصویر به گالری مطلب افزوده شد.');
    } else {
      store.showToast('success', 'پرونده چندرسانه‌ای با موفقیت بارگذاری گردید.');
    }

    setIsUploadModalOpen(false);
    setPendingUpload(null);
  };

  const handleCancelUpload = () => {
    setIsUploadModalOpen(false);
    setPendingUpload(null);
    store.showToast('info', 'بارگذاری فایل لغو شد.');
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

  // Selected from MediaPickerModal
  const handleMediaPickerSelect = (url: string) => {
    if (mediaPickerTarget === 'course') {
      setCourseFormData(prev => ({ ...prev, image: url }));
    } else if (mediaPickerTarget === 'file') {
      setFileFormData(prev => ({ ...prev, image: url }));
    } else if (mediaPickerTarget === 'article') {
      setArticleFormData(prev => ({ ...prev, coverImage: url }));
    } else if (mediaPickerTarget === 'course-gallery') {
      setCourseFormData(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), url] }));
    } else if (mediaPickerTarget === 'file-gallery') {
      setFileFormData(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), url] }));
    } else if (mediaPickerTarget === 'article-gallery') {
      setArticleFormData(prev => ({ ...prev, galleryImages: [...(prev.galleryImages || []), url] }));
    } else if (mediaPickerTarget === 'rich-editor' && richEditorCallback) {
      richEditorCallback(url);
      setRichEditorCallback(null);
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

  // Manual Certificate Issuance Handler
  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudentName.trim() || !certCourseTitle.trim()) {
      alert('لطفاً نام دانشجو و عنوان دوره را وارد نمایید.');
      return;
    }
    store.issueManualCertificate({
      userName: certStudentName.trim(),
      userPhone: certStudentPhone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
      courseTitle: certCourseTitle.trim(),
      instructorName: certInstructor.trim() || 'استاد رسمی آکادمی پارس‌نت',
      gradeScore: Number(certScore) || 90
    });
    setCertStudentName('');
    setCertStudentPhone('');
    setIsIssuingCert(false);
  };

  // Delete Certificate Handler
  const handleDeleteCertificate = (id: string) => {
    if (confirm('آیا از ابطال و حذف این گواهینامه اطمینان دارید؟')) {
      store.deleteOfficialCertificate(id);
    }
  };

  // Quiz Handlers
  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) return;

    const newQuiz: CourseQuiz = {
      id: `quiz-${Date.now()}`,
      courseId: `course-${Date.now()}`,
      courseTitle: newQuizCourse,
      title: newQuizTitle.trim(),
      timeLimitMinutes: Number(newQuizTimeLimit) || 20,
      passScorePercent: Number(newQuizPassScore) || 70,
      questions: newQuizQuestions.map((q, idx) => ({
        id: `q-${Date.now()}-${idx}`,
        question: q.question,
        options: q.options,
        correctOptionIndex: q.correctOptionIndex,
        explanation: q.explanation
      }))
    };

    store.addQuiz(newQuiz);
    setIsAddingQuiz(false);
    setNewQuizTitle('');
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm('آیا از حذف این آزمون دوره اطمینان دارید؟')) {
      store.deleteQuiz(id);
    }
  };

  // Backup & Export / Import Handlers
  const handleExportBackup = () => {
    const dataStr = store.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parsnet-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    store.showToast('success', 'فایل پشتیبان کامل سایت با موفقیت دانلود شد.');
  };

  const handleImportBackup = () => {
    if (!importBackupText.trim()) {
      alert('لطفاً محتوای فایل پشتیبان JSON را در کادر وارد فرمایید.');
      return;
    }
    const success = store.importAllData(importBackupText.trim());
    if (success) {
      setIsImportModalOpen(false);
      setImportBackupText('');
    }
  };

  const handleResetFactoryDefaults = () => {
    if (confirm('هشدار: آیا مطمئن هستید که می‌خواهید تمامی داده‌ها را به مقادیر پیش‌فرض اولیه بازگردانید؟ تمامی تغییرات فعلی جایگزین خواهند شد.')) {
      store.resetDataToDefault();
    }
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

  const currentThemeStyle = ADMIN_THEMES[adminTheme] || ADMIN_THEMES['classic-dark'];

  return (
    <div className={`min-h-screen ${currentThemeStyle.canvas} flex flex-col font-sans transition-colors duration-200 select-none`} dir="rtl">
      {/* WordPress Top Admin Bar */}
      <header className={`h-11 ${currentThemeStyle.topbar} border-b flex items-center justify-between px-3 sm:px-4 text-xs z-30 shrink-0 transition-colors`}>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sidebar collapse button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-slate-300"
            title={isSidebarCollapsed ? 'گسترش منوی سایدبار' : 'جمع کردن منوی سایدبار'}
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 font-black">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-[11px] font-mono shadow-xs">
              W
            </div>
            <span className="hidden sm:inline font-bold">پیشخوان مدیریت آکادمی</span>
          </div>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-1 text-slate-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">مشاهده سایت اصلی</span>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <span>·</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
              سامانه پایدار
            </span>
            <span>·</span>
            <span className="text-amber-400 font-mono text-[11px]">مدیر: {settings.adminUsername || 'admin'}</span>
          </div>
        </div>

        {/* Topbar Actions: Quick Theme Switcher & Admin Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Fast Admin Theme Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-black/20 p-0.5 rounded-xl border border-white/10 text-[11px]">
            <span className="px-1.5 text-slate-400 hidden xl:inline">قالب:</span>
            <button
              onClick={() => store.setAdminTheme('classic-dark')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                adminTheme === 'classic-dark' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="کلاسیک وردپرس (تیره)"
            >
              کلاسیک
            </button>
            <button
              onClick={() => store.setAdminTheme('modern-light')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                adminTheme === 'modern-light' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="مدرن و مینیمال (روشن)"
            >
              روشن
            </button>
            <button
              onClick={() => store.setAdminTheme('slate-midnight')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                adminTheme === 'slate-midnight' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="آبسیدین نایت‌مود (مشکی)"
            >
              آبسیدین
            </button>
            <button
              onClick={() => store.setAdminTheme('royal-indigo')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                adminTheme === 'royal-indigo' ? 'bg-violet-600 text-white font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="سرمه‌ای رویال لوکس (SaaS)"
            >
              رویال
            </button>
            <button
              onClick={() => store.setAdminTheme('emerald-terminal')}
              className={`px-2 py-0.5 rounded-lg transition-all ${
                adminTheme === 'emerald-terminal' ? 'bg-emerald-500 text-slate-950 font-bold font-mono' : 'text-slate-300 hover:text-white'
              }`}
              title="ترمینال تکنو سایبر (DevOps)"
            >
              سایبر
            </button>
          </div>

          <button
            onClick={() => setActiveMenu('settings')}
            className="text-slate-300 hover:text-white hover:bg-white/10 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            title="تنظیمات، تغییر رمز مدیر و قالب‌ها"
          >
            <Key className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden md:inline">امنیت و تنظیمات</span>
          </button>

          <button
            onClick={handleAdminLogout}
            className="text-rose-300 hover:text-white hover:bg-rose-900/40 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            title="خروج از مدیریت"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </header>

      {/* WordPress Main Layout: Dark / Themed Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Themed Sidebar */}
        <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-60'} ${currentThemeStyle.sidebar} flex flex-col shrink-0 border-l wp-scrollbar overflow-y-auto transition-all duration-200`}>
          <div className="py-2 text-xs space-y-0.5">
            {/* 1. Dashboard */}
            <button
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'dashboard' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="پیشخوان"
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>پیشخوان</span>}
            </button>

            {/* 1.1. Analytics Dashboard */}
            <button
              onClick={() => setActiveMenu('analytics')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'analytics' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="داشبورد تحلیلی و نمودارهای فروش (Recharts)"
            >
              <BarChart3 className="w-4 h-4 shrink-0 text-emerald-400" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1 font-bold">داشبورد تحلیلی فروش</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 text-[9px] rounded font-mono font-bold">
                    Recharts
                  </span>
                </>
              )}
            </button>

            {/* 2. Courses */}
            <button
              onClick={() => { setActiveMenu('courses'); setIsEditingCourse(false); }}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'courses' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="دوره‌های آموزشی"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">دوره‌های آموزشی</span>
                  <span className="bg-black/20 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {courses.length}
                  </span>
                </>
              )}
            </button>

            {/* 3. Files */}
            <button
              onClick={() => { setActiveMenu('files'); setIsEditingFile(false); }}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'files' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="فایل‌ها و سناریوها"
            >
              <Download className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">فایل‌ها و سناریوها</span>
                  <span className="bg-black/20 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {files.length}
                  </span>
                </>
              )}
            </button>

            {/* 4. Roadmaps (NEW) */}
            <button
              onClick={() => setActiveMenu('roadmaps')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'roadmaps' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="مسیرهای یادگیری IT"
            >
              <GitFork className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">مسیرهای یادگیری IT</span>
                  <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    ۴
                  </span>
                </>
              )}
            </button>

            {/* 5. Quizzes & Exams (NEW) */}
            <button
              onClick={() => setActiveMenu('quizzes')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'quizzes' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="آزمون‌ها و کوئیزها"
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">آزمون‌ها و کوئیزها</span>
                  <span className="bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {quizzes.length}
                  </span>
                </>
              )}
            </button>

            {/* 6. Official Certificates (NEW) */}
            <button
              onClick={() => setActiveMenu('certificates')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'certificates' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="گواهینامه‌های رسمی"
            >
              <Award className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">مدارک و گواهینامه‌ها</span>
                  <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {certificates.length}
                  </span>
                </>
              )}
            </button>

            {/* 7. Media Library */}
            <button
              onClick={() => setActiveMenu('media')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'media' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="کتابخانه رسانه‌ها"
            >
              <ImageIcon className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">کتابخانه رسانه‌ها</span>
                  <span className="bg-black/20 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {mediaList.length}
                  </span>
                </>
              )}
            </button>

            {/* 8. Articles & News */}
            <button
              onClick={() => { setActiveMenu('articles'); setIsEditingArticle(false); }}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'articles' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="نوشته‌ها و رویدادها"
            >
              <FileText className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">نوشته‌ها و رویدادها</span>
                  <span className="bg-black/20 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {articles.length}
                  </span>
                </>
              )}
            </button>

            {/* 9. Coupons */}
            <button
              onClick={() => setActiveMenu('coupons')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'coupons' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="کدهای تخفیف"
            >
              <Tag className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">کدهای تخفیف</span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {coupons.length}
                  </span>
                </>
              )}
            </button>

            {/* 10. Reviews */}
            <button
              onClick={() => setActiveMenu('reviews')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'reviews' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="دیدگاه‌های دانشجویان"
            >
              <Star className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">دیدگاه‌های دانشجویان</span>
                  {reviews.filter(r => !r.isApproved).length > 0 ? (
                    <span className="bg-amber-500 text-slate-900 font-bold px-1.5 py-0.2 text-[10px] rounded-full font-mono">
                      {reviews.filter(r => !r.isApproved).length}
                    </span>
                  ) : (
                    <span className="bg-black/20 px-1.5 py-0.2 text-[10px] rounded font-mono">
                      {reviews.length}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* 11. Orders */}
            <button
              onClick={() => setActiveMenu('orders')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'orders' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="سفارشات دوره‌ها و فایل‌ها"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">سفارشات دوره‌ها</span>
                  <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {orders.length}
                  </span>
                </>
              )}
            </button>

            {/* DEDICATED PROJECT REQUESTS (IT, NETWORK & PROGRAMMING) */}
            <button
              onClick={() => setActiveMenu('project-requests')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'project-requests'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : currentThemeStyle.sidebarHover
              }`}
              title="سفارشات پروژه‌های مشتریان (IT و شبکه)"
            >
              <Server className="w-4 h-4 shrink-0 text-cyan-400" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1 font-bold">پروژه‌های IT و شبکه</span>
                  <span className="bg-cyan-500/30 text-cyan-200 px-1.5 py-0.2 text-[10px] rounded font-mono font-bold">
                    {projectRequests.length}
                  </span>
                </>
              )}
            </button>

            {/* DEDICATED ORGANIC STORE PRODUCTS & ORDERS */}

            {(() => {
              const defaultThreshold = store.organicStockAlertConfig?.defaultThresholdKg || 25;
              const lowStockCount = organicProducts.filter(p => {
                const s = typeof p.stockKg === 'number' ? p.stockKg : 0;
                const th = p.lowStockThresholdKg || defaultThreshold;
                return s <= th;
              }).length;

              return (
                <button
                  onClick={() => setActiveMenu('organic-products')}
                  className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                    activeMenu === 'organic-products'
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'text-emerald-400 hover:bg-emerald-950/40 hover:text-emerald-300'
                  }`}
                  title="فروشگاه ارگانیک (محصولات، سفارشات و هشدار انبار)"
                >
                  <Leaf className="w-4 h-4 shrink-0 text-emerald-400" />
                  {!isSidebarCollapsed && (
                    <>
                      <span className="flex-1 font-bold">فروشگاه ارگانیک</span>
                      <div className="flex items-center gap-1">
                        {lowStockCount > 0 && (
                          <span className="bg-rose-500 text-white px-1.5 py-0.2 text-[9px] rounded-full font-mono font-bold animate-pulse" title={`${lowStockCount} قلم نیازمند تأمین انبار`}>
                            {lowStockCount}⚠️
                          </span>
                        )}
                        <span className="bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 text-[10px] rounded font-mono font-bold">
                          {organicProducts.length}
                        </span>
                      </div>
                    </>
                  )}
                </button>
              );
            })()}

            {/* DEDICATED ORGANIC STORE FINANCE & SETTLEMENTS */}
            <button
              onClick={() => setActiveMenu('organic-finance')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'organic-finance'
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-amber-400 hover:bg-amber-950/40 hover:text-amber-300'
              }`}
              title="امور مالی و تسویه حساب ارگانیک"
            >
              <DollarSign className="w-4 h-4 shrink-0 text-amber-400" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1 font-bold">مالی و تسویه ارگانیک</span>
                  <span className="bg-amber-500/30 text-amber-300 px-1.5 py-0.2 text-[10px] rounded font-mono font-bold">
                    {organicSettlements.length}
                  </span>
                </>
              )}
            </button>

            {/* 12. Users */}
            <button
              onClick={() => setActiveMenu('users')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'users' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="کاربران و دانشجویان"
            >
              <Users className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">کاربران و دانشجویان</span>
                  <span className="bg-black/20 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {users.length}
                  </span>
                </>
              )}
            </button>

            {/* 13. Tickets */}
            <button
              onClick={() => setActiveMenu('tickets')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'tickets' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="تیکت‌های پشتیبانی"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">تیکت‌های پشتیبانی</span>
                  <span className="bg-red-500/20 text-red-300 px-1.5 py-0.2 text-[10px] rounded font-mono">
                    {tickets.filter(t => t.status === 'open').length}
                  </span>
                </>
              )}
            </button>

            {/* 14. Contact Messages */}
            <button
              onClick={() => setActiveMenu('contact-messages')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'contact-messages' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="پیام‌های تماس"
            >
              <Mail className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <>
                  <span className="flex-1">پیام‌های تماس</span>
                  {contactMessages.filter(m => !m.isRead).length > 0 && (
                    <span className="bg-emerald-500 text-white px-1.5 py-0.2 text-[10px] rounded-full font-mono font-bold">
                      {contactMessages.filter(m => !m.isRead).length}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* 15. Settings & Appearance */}
            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full ${isSidebarCollapsed ? 'px-0 justify-center' : 'px-3.5'} py-2.5 text-right flex items-center gap-2.5 transition-colors cursor-pointer ${
                activeMenu === 'settings' ? currentThemeStyle.sidebarActive : currentThemeStyle.sidebarHover
              }`}
              title="تنظیمات، تم‌ها و پشتیبان"
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && <span>تنظیمات و قالب‌ها</span>}
            </button>
          </div>
        </aside>

        {/* Admin Content Canvas */}
        <main className={`flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto ${currentThemeStyle.canvas} transition-colors`}>
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

              {/* EMBEDDED ANALYTICS CHARTS SECTION */}
              <div className="pt-4 border-t border-slate-200">
                <AdminAnalyticsDashboard />
              </div>
            </div>
          )}

          {/* ===================== VIEW 1.1: DEDICATED ANALYTICS DASHBOARD ===================== */}
          {activeMenu === 'analytics' && (
            <AdminAnalyticsDashboard />
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
                      <label className="block font-bold text-slate-700 mb-1">عنوان دوره آموزشی</label>
                      <input
                        type="text"
                        value={courseFormData.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCourseFormData(prev => ({
                            ...prev,
                            title: val,
                            slug: prev.slug ? prev.slug : generateSlug(val)
                          }));
                        }}
                        placeholder="مثال: دوره آموزش سناریوهای عملی فایروال سیسکو ASA"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        required
                      />
                    </div>

                    {/* SLUG / PERMALINK (WORDPRESS STYLE) */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800 text-[11px]">
                          پیوند یکتا و نامک انگلیسی (Course Slug)
                        </label>
                        <button
                          type="button"
                          onClick={() => setCourseFormData(prev => ({ ...prev, slug: generateSlug(prev.title || 'course') }))}
                          className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                        >
                          تولید خودکار بر اساس عنوان
                        </button>
                      </div>
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-indigo-600" dir="ltr">
                        <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-200 text-slate-500 font-mono text-[11px] shrink-0">
                          https://parsnet.ir/course/
                        </span>
                        <input
                          type="text"
                          value={courseFormData.slug || ''}
                          onChange={(e) => setCourseFormData({ ...courseFormData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          placeholder="cisco-asa-firewall"
                          className="flex-1 px-2.5 py-1.5 font-mono text-xs focus:outline-none text-slate-800"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        مانند وردپرس، این نامک در ریشه آدرس سایت برای دسترسی مستقیم کاربر به دوره استفاده می‌شود.
                      </p>
                    </div>

                    {/* FEATURED IMAGE UPLOAD & SELECTOR */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-bold text-slate-800">تصویر شاخص دوره آموزشی</label>
                          <p className="text-[11px] text-slate-500">انتخاب فایل از سیستم با دکمه‌های تأیید و انصراف قبل از آپلود</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>انتخاب فایل تصویر</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStageFileUpload(e, 'course-image')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('course');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>کتابخانه رسانه‌ها</span>
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

                    {/* GALLERY / SECONDARY IMAGES */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-bold text-slate-800">تصاویر دیگر و گالری دوره</label>
                          <p className="text-[11px] text-slate-500">تصاویر سناریوها، دایاگرام‌های شبکه و اسلایدهای این دوره</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>آپلود عکس گالری</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStageFileUpload(e, 'course-gallery')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('course-gallery');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>انتخاب از رسانه‌ها</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {(courseFormData.galleryImages || []).map((imgUrl, idx) => (
                          <div key={idx} className="relative group w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                            <img src={imgUrl} alt={`گالری ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const curr = courseFormData.galleryImages || [];
                                setCourseFormData({ ...courseFormData, galleryImages: curr.filter((_, i) => i !== idx) });
                              }}
                              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="حذف تصویر از گالری"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {(!courseFormData.galleryImages || courseFormData.galleryImages.length === 0) && (
                          <span className="text-[11px] text-slate-400">هنوز تصویری به گالری دوره اضافه نشده است.</span>
                        )}
                      </div>
                    </div>

                    {/* TAGS (برچسب‌ها) */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <label className="block font-bold text-slate-800">برچسب‌های دوره (Tags)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={courseTagInput}
                          onChange={(e) => setCourseTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (courseTagInput.trim()) {
                                const currentTags = courseFormData.tags || [];
                                if (!currentTags.includes(courseTagInput.trim())) {
                                  setCourseFormData({ ...courseFormData, tags: [...currentTags, courseTagInput.trim()] });
                                }
                                setCourseTagInput('');
                              }
                            }
                          }}
                          placeholder="برچسب جدید را بنویسید و Enter بزنید..."
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (courseTagInput.trim()) {
                              const currentTags = courseFormData.tags || [];
                              if (!currentTags.includes(courseTagInput.trim())) {
                                setCourseFormData({ ...courseFormData, tags: [...currentTags, courseTagInput.trim()] });
                              }
                              setCourseTagInput('');
                            }
                          }}
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                        >
                          افزودن
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(courseFormData.tags || []).map((t, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                            <span>#{t}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentTags = courseFormData.tags || [];
                                setCourseFormData({ ...courseFormData, tags: currentTags.filter((_, i) => i !== idx) });
                              }}
                              className="text-slate-400 hover:text-red-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {(!courseFormData.tags || courseFormData.tags.length === 0) && (
                          <span className="text-[11px] text-slate-400">هنوز برچسبی اضافه نشده است.</span>
                        )}
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

                    {/* CKEDITOR ADVANCED RICH TEXT EDITOR */}
                    <div>
                      <RichTextEditor
                        label="توضیحات جامع و سرفصل‌های تفصیلی دوره (ویرایشگر پیشرفته با علائم، رنگ و استایل)"
                        value={courseFormData.description || ''}
                        onChange={(val) => setCourseFormData({ ...courseFormData, description: val })}
                        onOpenMediaPicker={(cb) => {
                          setRichEditorCallback(() => cb);
                          setMediaPickerTarget('rich-editor');
                          setIsMediaPickerOpen(true);
                        }}
                        placeholder="توضیحات جامع دوره، سرفصل‌ها، ابزارهای تدریس، جداول و تصاویر را در این قسمت بنویسید..."
                        minHeight="min-h-[220px]"
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
                      <label className="block font-bold text-slate-700 mb-1">عنوان فایل دانلودی یا سناریو</label>
                      <input
                        type="text"
                        value={fileFormData.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFileFormData(prev => ({
                            ...prev,
                            title: val,
                            slug: prev.slug ? prev.slug : generateSlug(val)
                          }));
                        }}
                        placeholder="مثال: مجموعه سناریوهای روتینگ BGP در پکت‌تریسر"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    {/* SLUG / PERMALINK (WORDPRESS STYLE) */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800 text-[11px]">
                          پیوند یکتا و نامک انگلیسی محصول (Product / File Slug)
                        </label>
                        <button
                          type="button"
                          onClick={() => setFileFormData(prev => ({ ...prev, slug: generateSlug(prev.title || 'file') }))}
                          className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                        >
                          تولید خودکار بر اساس عنوان
                        </button>
                      </div>
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-indigo-600" dir="ltr">
                        <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-200 text-slate-500 font-mono text-[11px] shrink-0">
                          https://parsnet.ir/files/
                        </span>
                        <input
                          type="text"
                          value={fileFormData.slug || ''}
                          onChange={(e) => setFileFormData({ ...fileFormData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          placeholder="packet-tracer-bgp-lab"
                          className="flex-1 px-2.5 py-1.5 font-mono text-xs focus:outline-none text-slate-800"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        مانند وردپرس، این نامک در ریشه آدرس سایت برای دسترسی مستقیم کاربر به فایل/محصول استفاده می‌شود.
                      </p>
                    </div>

                    {/* FEATURED IMAGE UPLOAD & SELECTOR */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-bold text-slate-800">تصویر شاخص فایل</label>
                          <p className="text-[11px] text-slate-500">انتخاب فایل از سیستم با دکمه‌های تأیید و انصراف قبل از آپلود</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>انتخاب فایل تصویر</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStageFileUpload(e, 'file-image')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('file');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>کتابخانه رسانه‌ها</span>
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

                    {/* GALLERY / SECONDARY IMAGES */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-bold text-slate-800">تصاویر دیگر و اسکرین‌شات‌های فایل</label>
                          <p className="text-[11px] text-slate-500">تصاویر پیش‌نمایش محیط نرم‌افزار، سورس‌کدها یا توپولوژی سناریو</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>آپلود عکس گالری</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStageFileUpload(e, 'file-gallery')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('file-gallery');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>انتخاب از رسانه‌ها</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {(fileFormData.galleryImages || []).map((imgUrl, idx) => (
                          <div key={idx} className="relative group w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                            <img src={imgUrl} alt={`تصویر ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const curr = fileFormData.galleryImages || [];
                                setFileFormData({ ...fileFormData, galleryImages: curr.filter((_, i) => i !== idx) });
                              }}
                              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="حذف تصویر"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {(!fileFormData.galleryImages || fileFormData.galleryImages.length === 0) && (
                          <span className="text-[11px] text-slate-400">هنوز تصویری به گالری فایل اضافه نشده است.</span>
                        )}
                      </div>
                    </div>

                    {/* TAGS (برچسب‌های فایل) */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <label className="block font-bold text-slate-800">برچسب‌های فایل (Tags)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={fileTagInput}
                          onChange={(e) => setFileTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (fileTagInput.trim()) {
                                const currentTags = fileFormData.tags || [];
                                if (!currentTags.includes(fileTagInput.trim())) {
                                  setFileFormData({ ...fileFormData, tags: [...currentTags, fileTagInput.trim()] });
                                }
                                setFileTagInput('');
                              }
                            }
                          }}
                          placeholder="برچسب فایل را بنویسید و Enter بزنید..."
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (fileTagInput.trim()) {
                              const currentTags = fileFormData.tags || [];
                              if (!currentTags.includes(fileTagInput.trim())) {
                                setFileFormData({ ...fileFormData, tags: [...currentTags, fileTagInput.trim()] });
                              }
                              setFileTagInput('');
                            }
                          }}
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                        >
                          افزودن
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(fileFormData.tags || []).map((t, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                            <span>#{t}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentTags = fileFormData.tags || [];
                                setFileFormData({ ...fileFormData, tags: currentTags.filter((_, i) => i !== idx) });
                              }}
                              className="text-slate-400 hover:text-red-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {(!fileFormData.tags || fileFormData.tags.length === 0) && (
                          <span className="text-[11px] text-slate-400">هنوز برچسبی اضافه نشده است.</span>
                        )}
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

                    {/* CKEDITOR ADVANCED RICH TEXT EDITOR FOR FILE DESCRIPTION */}
                    <div>
                      <RichTextEditor
                        label="توضیحات و نیازمندی‌های فایل دانلودی (ویرایشگر پیشرفته با علائم، رنگ و استایل)"
                        value={fileFormData.description || ''}
                        onChange={(val) => setFileFormData({ ...fileFormData, description: val })}
                        onOpenMediaPicker={(cb) => {
                          setRichEditorCallback(() => cb);
                          setMediaPickerTarget('rich-editor');
                          setIsMediaPickerOpen(true);
                        }}
                        placeholder="توضیحات فایل دانلودی، سناریوهای شبکه، راهنمای نصب و ویژگی‌ها را در این قسمت بنویسید..."
                        minHeight="min-h-[200px]"
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

          {/* ===================== VIEW: ROADMAPS MANAGEMENT ===================== */}
          {activeMenu === 'roadmaps' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مسیرهای شغلی و نقشه راه IT</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    مدیریت و پایش ۴ مسیر شغلی استاندارد مهندسی شبکه، دواپس، طراحی وب و امنیت سایبری
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    ۴ نقشه راه فعال در سایت
                  </span>
                </div>
              </div>

              {/* Roadmaps Switcher Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'network-engineer', title: 'مهندسی شبکه سیسکو', sub: 'CCNA -> CCNP Enterprise', icon: Server, color: 'text-indigo-600' },
                  { id: 'devops-architect', title: 'دواپس و لینوکس', sub: 'Linux -> Docker -> K8s', icon: Terminal, color: 'text-cyan-600' },
                  { id: 'frontend-developer', title: 'فرانت‌اند مدرن', sub: 'React 19 -> Next.js 15', icon: Code2, color: 'text-emerald-600' },
                  { id: 'cybersecurity', title: 'امنیت سایبری', sub: 'Network+ -> CEH -> SOC', icon: Shield, color: 'text-rose-600' }
                ].map(track => {
                  const Icon = track.icon;
                  const isActive = activeRoadmapView === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => setActiveRoadmapView(track.id)}
                      className={`p-4 rounded-2xl border text-right transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-sm'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${track.color}`} />
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                          فعال
                        </span>
                      </div>
                      <div className="text-xs font-black text-slate-900">{track.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{track.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Roadmap Detail View for Admin */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {activeRoadmapView === 'network-engineer' && 'مسیر شغلی مهندس ارشد شبکه سیسکو و زیرساخت ارتباطی'}
                      {activeRoadmapView === 'devops-architect' && 'مسیر شغلی مهندس دواپس، اتوماسیون ابری و سرورهای لینوکسی'}
                      {activeRoadmapView === 'frontend-developer' && 'مسیر شغلی برنامه‌نویس وب مدرن و فول‌استک با React و Next.js'}
                      {activeRoadmapView === 'cybersecurity' && 'مسیر شغلی کارشناس امنیت اطلاعات و تست نفوذ سامانه‌ها'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">شامل ۵ گام مهارتی گام‌به‌گام از سطح مقدماتی تا اشتغال در دیتاسنترها و پروژه‌های بین‌المللی</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-xl font-bold">
                      میانگین درآمد: ۲۵ تا ۵۵ میلیون تومان
                    </div>
                  </div>
                </div>

                {/* Pipeline Steps in Admin */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-800 block">مراحل و مهارت‌های تدوین‌شده در این مسیر:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">۱</span>
                        <h4 className="text-xs font-bold text-slate-900">مبانی و زیرساخت اولیه (Foundations)</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        یادگیری مدل‌های مرجع OSI، کابل‌کشی ساخت‌یافته، تنظیمات مقدماتی سیستم‌عامل و آشنایی با سخت‌افزارهای ارتباطی
                      </p>
                      <div className="text-[10px] text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg">
                        دوره مرتبط: دوره جامع Network+ و مبانی شبکه
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">۲</span>
                        <h4 className="text-xs font-bold text-slate-900">تسلط بر پیکربندی و سناریوهای کاربردی</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        اجرای سناریوهای واقعی در شبیه‌سازهای EVE-NG و Packet Tracer با تجهیزات استاندارد صنعتی
                      </p>
                      <div className="text-[10px] text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg">
                        دوره مرتبط: دوره جامع سیسکو CCNA 200-301 و میکروتیک MTCNA
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">۳</span>
                        <h4 className="text-xs font-bold text-slate-900">امنیت، مانیتورینگ و خطایابی پیشرفته</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        پیاده‌سازی Access Control Lists، فایروال‌های لبه شبکه، پروتکل‌های احراز هویت و مانیتورینگ Zabbix
                      </p>
                      <div className="text-[10px] text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg">
                        دوره مرتبط: پکیج سناریوهای امنیت و روتینگ سازمانی
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono">۴</span>
                        <h4 className="text-xs font-bold text-slate-900">اتوماسیون، برنامه‌نویسی و آزمون پایانی</h4>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        توسعه اسکریپت‌های پایتون و ابزارهای Ansible جهت خودکارسازی وظایف روزمره و شرکت در آزمون پایانی برای دریافت مدرک رسمی
                      </p>
                      <div className="text-[10px] text-indigo-700 font-bold bg-indigo-50 p-2 rounded-lg">
                        آزمون پایانی: آزمون آنلاین مهارت‌سنجی دوره با حد نصاب ۷۵٪
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== VIEW: QUIZZES & EXAMS MANAGEMENT ===================== */}
          {activeMenu === 'quizzes' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">آزمون‌ها و کوئیزهای سنجش مهارت دوره‌ها</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    تعریف سوالات چهارگزینه‌ای، تنظیم زمان پاسخ‌گویی، تعیین حد نصاب قبولی و صدور مدرک خودکار
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingQuiz(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>افزودن آزمون جدید دوره</span>
                </button>
              </div>

              {/* Add Quiz Form / Modal */}
              {isAddingQuiz ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-sm font-bold text-slate-900">تعریف آزمون تستی جدید برای دوره‌ها</h3>
                    <button
                      onClick={() => setIsAddingQuiz(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                    >
                      انصراف
                    </button>
                  </div>

                  <form onSubmit={handleSaveQuiz} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">دوره آموزشی مربوطه</label>
                        <select
                          value={newQuizCourse}
                          onChange={(e) => setNewQuizCourse(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        >
                          {courses.map(c => (
                            <option key={c.id} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">عنوان آزمون</label>
                        <input
                          type="text"
                          value={newQuizTitle}
                          onChange={(e) => setNewQuizTitle(e.target.value)}
                          placeholder="آزمون آنلاین پایان دوره و سنجش مهارت"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">مدت زمان آزمون (دقیقه)</label>
                        <input
                          type="number"
                          min={5}
                          max={120}
                          value={newQuizTimeLimit}
                          onChange={(e) => setNewQuizTimeLimit(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">حد نصاب قبولی برای صدور مدرک (درصد)</label>
                        <input
                          type="number"
                          min={50}
                          max={100}
                          value={newQuizPassScore}
                          onChange={(e) => setNewQuizPassScore(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                          required
                        />
                      </div>
                    </div>

                    {/* Question Builder */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">سوالات آزمون ({newQuizQuestions.length} سوال):</span>
                        <button
                          type="button"
                          onClick={() => {
                            setNewQuizQuestions([
                              ...newQuizQuestions,
                              {
                                question: `سوال تستی شماره ${newQuizQuestions.length + 1}`,
                                options: ['گزینه الف', 'گزینه ب', 'گزینه ج', 'گزینه د'],
                                correctOptionIndex: 0,
                                explanation: 'توضیحات تکمیلی و پاسخ تشریحی سوال'
                              }
                            ]);
                          }}
                          className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>افزودن سوال جدید</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {newQuizQuestions.map((q, qIndex) => (
                          <div key={qIndex} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">سوال شماره {qIndex + 1}</span>
                              {newQuizQuestions.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewQuizQuestions(newQuizQuestions.filter((_, idx) => idx !== qIndex));
                                  }}
                                  className="text-red-500 hover:text-red-700 text-[11px]"
                                >
                                  حذف سوال
                                </button>
                              )}
                            </div>

                            <input
                              type="text"
                              value={q.question}
                              onChange={(e) => {
                                const copy = [...newQuizQuestions];
                                copy[qIndex].question = e.target.value;
                                setNewQuizQuestions(copy);
                              }}
                              placeholder="متن سوال را وارد نمایید..."
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                              required
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                  <input
                                    type="radio"
                                    name={`correct-${qIndex}`}
                                    checked={q.correctOptionIndex === optIdx}
                                    onChange={() => {
                                      const copy = [...newQuizQuestions];
                                      copy[qIndex].correctOptionIndex = optIdx;
                                      setNewQuizQuestions(copy);
                                    }}
                                    className="cursor-pointer"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const copy = [...newQuizQuestions];
                                      copy[qIndex].options[optIdx] = e.target.value;
                                      setNewQuizQuestions(copy);
                                    }}
                                    className="flex-1 bg-transparent text-xs focus:outline-none"
                                    placeholder={`گزینه ${optIdx + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        ذخیره و فعال‌سازی آزمون در سامانه
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingQuiz(false)}
                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        انصراف
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Quizzes Table */
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">دوره آموزشی و عنوان آزمون</th>
                        <th className="p-3">مدت زمان</th>
                        <th className="p-3">حد نصاب قبولی</th>
                        <th className="p-3">تعداد سوالات</th>
                        <th className="p-3">وضعیت مدرک</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quizzes.map(quiz => (
                        <tr key={quiz.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{quiz.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{quiz.courseTitle}</div>
                          </td>
                          <td className="p-3 font-mono tabular-nums text-slate-700">
                            {quiz.timeLimitMinutes} دقیقه
                          </td>
                          <td className="p-3">
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                              {quiz.passScorePercent}٪
                            </span>
                          </td>
                          <td className="p-3 font-mono text-slate-700">
                            {quiz.questions.length} سوال تستی
                          </td>
                          <td className="p-3">
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold text-[11px]">
                              صدور آنی گواهینامه
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteQuiz(quiz.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="حذف آزمون"
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

          {/* ===================== VIEW: OFFICIAL CERTIFICATES MANAGEMENT ===================== */}
          {activeMenu === 'certificates' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">بانک گواهینامه‌های رسمی و استعلام اصالت</h1>
                  <p className="text-xs text-slate-500 mt-1">
                    فهرست کلیه مدارک تایید شده، صدور مدرک دستی برای دانشجویان، ابطال و تایید اصالت کد رهگیری
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsIssuingCert(true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>صدور گواهینامه دستی برای دانشجو</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="جستجو بر اساس نام دانشجو، شماره مدرک یا کد رهگیری..."
                  value={certSearch}
                  onChange={(e) => setCertSearch(e.target.value)}
                  className="flex-1 bg-transparent text-xs focus:outline-none"
                />
              </div>

              {/* Certificates Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3">شماره رسمی گواهینامه</th>
                      <th className="p-3">نام و تلفن دانشجو</th>
                      <th className="p-3">عنوان دوره آموزشی</th>
                      <th className="p-3">تاریخ صدور</th>
                      <th className="p-3">نمره آزمون</th>
                      <th className="p-3">کد رهگیری آنلاین</th>
                      <th className="p-3">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {certificates
                      .filter(c =>
                        !certSearch ||
                        c.userName.toLowerCase().includes(certSearch.toLowerCase()) ||
                        c.certificateNumber.toLowerCase().includes(certSearch.toLowerCase()) ||
                        c.verificationCode.toLowerCase().includes(certSearch.toLowerCase()) ||
                        c.courseTitle.toLowerCase().includes(certSearch.toLowerCase())
                      )
                      .map(cert => (
                        <tr key={cert.id} className="hover:bg-slate-50">
                          <td className="p-3">
                            <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px] border border-indigo-200">
                              {cert.certificateNumber}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{cert.userName}</div>
                            <div className="text-[11px] text-slate-500 font-mono mt-0.5">{cert.userPhone}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-slate-900 line-clamp-1">{cert.courseTitle}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">مدرس: {cert.instructorName}</div>
                          </td>
                          <td className="p-3 font-mono text-slate-600">{cert.issueDate}</td>
                          <td className="p-3">
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-[11px]">
                              {cert.gradeScore} از ۱۰۰
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded select-all">
                              {cert.verificationCode}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="ابطال و حذف گواهینامه"
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
                    onChange={(e) => handleStageFileUpload(e, 'media-library')}
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
                      <label className="block font-bold text-slate-700 mb-1">عنوان مطلب، مقاله یا رویداد</label>
                      <input
                        type="text"
                        value={articleFormData.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setArticleFormData(prev => ({
                            ...prev,
                            title: val,
                            slug: prev.slug ? prev.slug : generateSlug(val)
                          }));
                        }}
                        placeholder="مثال: نقشه راه جامع یادگیری شبکه سیسکو در سال ۲۰۲۵"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        required
                      />
                    </div>

                    {/* SLUG / PERMALINK (WORDPRESS STYLE: e.g. /blog/neveshte3) */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-800 text-[11px]">
                          پیوند یکتا و نامک انگلیسی مطلب (Post Slug مانند وردپرس)
                        </label>
                        <button
                          type="button"
                          onClick={() => setArticleFormData(prev => ({ ...prev, slug: generateSlug(prev.title || 'post') }))}
                          className="text-[11px] text-indigo-600 hover:underline cursor-pointer"
                        >
                          تولید خودکار بر اساس عنوان
                        </button>
                      </div>
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white overflow-hidden focus-within:border-indigo-600" dir="ltr">
                        <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-200 text-slate-500 font-mono text-[11px] shrink-0">
                          https://parsnet.ir/blog/
                        </span>
                        <input
                          type="text"
                          value={articleFormData.slug || ''}
                          onChange={(e) => setArticleFormData({ ...articleFormData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          placeholder="cisco-learning-roadmap-2025"
                          className="flex-1 px-2.5 py-1.5 font-mono text-xs focus:outline-none text-slate-800"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        آدرس اینترنتی مستقیم مطلب از ریشه وب‌سایت: https://parsnet.ir/blog/{articleFormData.slug || 'neveshte3'}
                      </p>
                    </div>

                    {/* FEATURED IMAGE UPLOAD & SELECTOR */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-bold text-slate-800">تصویر شاخص نوشته</label>
                          <p className="text-[11px] text-slate-500">انتخاب فایل از سیستم با دکمه‌های تأیید و انصراف قبل از آپلود</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>انتخاب فایل تصویر</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStageFileUpload(e, 'article-image')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('article');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>کتابخانه رسانه‌ها</span>
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

                    {/* GALLERY / SECONDARY IMAGES FOR POST */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block font-bold text-slate-800">تصاویر دیگر و گالری مطلب</label>
                          <p className="text-[11px] text-slate-500">تصاویر درون‌متنی، اینفوگرافیک‌ها یا نمودارهای مرتبط با این مقاله</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shadow-xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>آپلود عکس گالری</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleStageFileUpload(e, 'article-gallery')}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setMediaPickerTarget('article-gallery');
                              setIsMediaPickerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>انتخاب از رسانه‌ها</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {(articleFormData.galleryImages || []).map((imgUrl, idx) => (
                          <div key={idx} className="relative group w-20 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                            <img src={imgUrl} alt={`تصویر ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const curr = articleFormData.galleryImages || [];
                                setArticleFormData({ ...articleFormData, galleryImages: curr.filter((_, i) => i !== idx) });
                              }}
                              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="حذف تصویر"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        {(!articleFormData.galleryImages || articleFormData.galleryImages.length === 0) && (
                          <span className="text-[11px] text-slate-400">هنوز تصویری به گالری این نوشته اضافه نشده است.</span>
                        )}
                      </div>
                    </div>

                    {/* TAGS (برچسب‌های مقاله) */}
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <label className="block font-bold text-slate-800">برچسب‌های نوشته (Tags)</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={articleTagInput}
                          onChange={(e) => setArticleTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (articleTagInput.trim()) {
                                const currentTags = articleFormData.tags || [];
                                if (!currentTags.includes(articleTagInput.trim())) {
                                  setArticleFormData({ ...articleFormData, tags: [...currentTags, articleTagInput.trim()] });
                                }
                                setArticleTagInput('');
                              }
                            }
                          }}
                          placeholder="برچسب نوشته را بنویسید و Enter بزنید..."
                          className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (articleTagInput.trim()) {
                              const currentTags = articleFormData.tags || [];
                              if (!currentTags.includes(articleTagInput.trim())) {
                                setArticleFormData({ ...articleFormData, tags: [...currentTags, articleTagInput.trim()] });
                              }
                              setArticleTagInput('');
                            }
                          }}
                          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                        >
                          افزودن
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(articleFormData.tags || []).map((t, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium">
                            <span>#{t}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentTags = articleFormData.tags || [];
                                setArticleFormData({ ...articleFormData, tags: currentTags.filter((_, i) => i !== idx) });
                              }}
                              className="text-slate-400 hover:text-red-600 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {(!articleFormData.tags || articleFormData.tags.length === 0) && (
                          <span className="text-[11px] text-slate-400">هنوز برچسبی اضافه نشده است.</span>
                        )}
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

                    {/* CKEDITOR ADVANCED RICH TEXT EDITOR FOR ARTICLE */}
                    <div>
                      <RichTextEditor
                        label="متن کامل محتوا و دانشنامه (ویرایشگر پیشرفته با علائم نگارشی، رنگ و تصویر)"
                        value={articleFormData.content || ''}
                        onChange={(val) => setArticleFormData({ ...articleFormData, content: val })}
                        onOpenMediaPicker={(cb) => {
                          setRichEditorCallback(() => cb);
                          setMediaPickerTarget('rich-editor');
                          setIsMediaPickerOpen(true);
                        }}
                        placeholder="متن کامل محتوا، تیترها، جداول، رنگ‌ها و تصاویر مقاله را اینجا بنویسید..."
                        minHeight="min-h-[280px]"
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

          {/* ===================== VIEW: COUPONS & DISCOUNTS ===================== */}
          {activeMenu === 'coupons' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مدیریت کدهای تخفیف و جشنواره‌ها</h1>
                  <p className="text-xs text-slate-500 mt-1">تعریف کدهای تخفیف درصدی، مدیریت انقضا و اعمال مستقیم روی سبد خرید</p>
                </div>
                <button
                  onClick={() => setIsAddingCoupon(!isAddingCoupon)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddingCoupon ? 'بستن فرم' : 'ایجاد کد تخفیف جدید'}</span>
                </button>
              </div>

              {/* Add Coupon Form */}
              {isAddingCoupon && (
                <form onSubmit={handleSaveCoupon} className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm space-y-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-600" />
                    <span>مشخصات کد تخفیف جدید</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">کد تخفیف (لاتین)</label>
                      <input
                        type="text"
                        required
                        dir="ltr"
                        value={newCouponCode}
                        onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                        placeholder="مثال: NOWRUZ40"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">درصد تخفیف (۱ تا ۱۰۰)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="100"
                        value={newCouponDiscount}
                        onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">حداکثر دفعات استفاده</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newCouponMaxUses}
                        onChange={(e) => setNewCouponMaxUses(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">تاریخ انقضا</label>
                      <input
                        type="text"
                        value={newCouponExpires}
                        onChange={(e) => setNewCouponExpires(e.target.value)}
                        placeholder="۱۴۰۳/۱۲/۲۹"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1 text-xs">توضیحات و مناسبت تخفیف</label>
                    <input
                      type="text"
                      value={newCouponDescription}
                      onChange={(e) => setNewCouponDescription(e.target.value)}
                      placeholder="مثال: تخفیف ویژه دوره جامع شبکه به مناسبت آغاز پاییز"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCoupon(false)}
                      className="px-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      ثبت و فعال‌سازی کد
                    </button>
                  </div>
                </form>
              )}

              {/* Coupons List Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-3">کد تخفیف</th>
                      <th className="p-3">درصد تخفیف</th>
                      <th className="p-3">میزان استفاده</th>
                      <th className="p-3">تاریخ انقضا</th>
                      <th className="p-3">توضیحات</th>
                      <th className="p-3">وضعیت</th>
                      <th className="p-3">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {coupons.map((cp) => (
                      <tr key={cp.id} className="hover:bg-slate-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-xs">
                              {cp.code}
                            </span>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(cp.code);
                                store.showToast('success', `کد ${cp.code} در کلیپ‌بورد کپی شد.`);
                              }}
                              className="text-slate-400 hover:text-slate-600 p-0.5"
                              title="کپی کد"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-600 text-sm">
                          {cp.discountPercent}٪
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          {cp.usedCount} از {cp.maxUses}
                        </td>
                        <td className="p-3 font-mono text-slate-500">{cp.expiresAt}</td>
                        <td className="p-3 text-slate-600">{cp.description || '-'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleToggleCoupon(cp.id)}
                            className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                              cp.isActive
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}
                          >
                            {cp.isActive ? 'فعال' : 'غیرفعال'}
                          </button>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteCoupon(cp.id)}
                            className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                            title="حذف کد تخفیف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===================== VIEW: REVIEWS & MODERATION ===================== */}
          {activeMenu === 'reviews' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900">مدیریت و تایید دیدگاه‌های دانشجویان</h1>
                  <p className="text-xs text-slate-500 mt-1">بررسی دیدگاه‌های ثبت شده برای دوره‌ها، تایید انتشار عمومی در سایت یا حذف</p>
                </div>

                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      reviewFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    همه ({reviews.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('pending')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      reviewFilter === 'pending' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    در انتظار بررسی ({reviews.filter(r => !r.isApproved).length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('approved')}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      reviewFilter === 'approved' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    منتشر شده ({reviews.filter(r => r.isApproved).length})
                  </button>
                </div>
              </div>

              {/* Reviews List */}
              {reviews.filter(r =>
                reviewFilter === 'all'
                  ? true
                  : reviewFilter === 'pending'
                  ? !r.isApproved
                  : r.isApproved
              ).length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-400">
                  <Star className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-medium">دیدگاهی در این بخش یافت نشد.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews
                    .filter(r =>
                      reviewFilter === 'all'
                        ? true
                        : reviewFilter === 'pending'
                        ? !r.isApproved
                        : r.isApproved
                    )
                    .map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={rev.userAvatar}
                              alt={rev.userName}
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-50"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">{rev.userName}</span>
                                <span className="text-[10px] text-slate-400 font-mono">· {rev.createdAt}</span>
                              </div>
                              <div className="text-[11px] text-indigo-600 font-medium">
                                دوره: {rev.courseTitle}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 pt-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${s <= rev.rating ? 'text-amber-500 fill-current' : 'text-slate-300'}`}
                              />
                            ))}
                            <span className="text-xs font-mono font-bold text-slate-700 mr-1">{rev.rating} از ۵</span>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {rev.comment}
                          </p>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            rev.isApproved
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {rev.isApproved ? 'منتشر شده در سایت' : 'در انتظار بررسی'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            {!rev.isApproved ? (
                              <button
                                onClick={() => handleApproveReview(rev.id)}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>تایید و انتشار</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => store.approveReview(rev.id, false)}
                                className="px-2.5 py-1 text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl text-xs cursor-pointer"
                              >
                                لغو تایید
                              </button>
                            )}

                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                              title="حذف دیدگاه"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  تغییر رمز عبور مدیر، ویرایش متون درباره ما و قوانین، تم‌ها و درگاه پرداخت
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

              {/* 3. SITE THEMES & ADMIN TEMPLATES STUDIO */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">شخصی‌سازی تم‌های وب‌سایت و قالب پیشخوان مدیریت</h3>
                    <p className="text-xs text-slate-500">انتخاب رنگ‌بندی اختصاصی سایت و استایل بصری محیط پیشخوان بدون نیاز به کدنویسی</p>
                  </div>
                </div>

                {/* Site Color Themes */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    ۱. تم رنگی صفحات عمومی وب‌سایت (Site Color Theme)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'indigo', name: 'نیلی سازمانی', hex: '#4f46e5', desc: 'شیک و استاندارد بین‌المللی' },
                      { id: 'emerald', name: 'زمردی و نعنایی', hex: '#059669', desc: 'نماد رشد و فناوری سبز' },
                      { id: 'cyan', name: 'فیروزه‌ای نئونی', hex: '#0891b2', desc: 'مدرن و های‌تک' },
                      { id: 'amber', name: 'طلایی کهربایی', hex: '#d97706', desc: 'گرم، پرانرژی و جذاب' },
                      { id: 'rose', name: 'یاقوتی و زرشکی', hex: '#e11d48', desc: 'خلاقانه و چشم‌نواز' },
                      { id: 'violet', name: 'بنفش رویال', hex: '#7c3aed', desc: 'لوکس و دیجیتال آرت' }
                    ].map(ct => (
                      <button
                        key={ct.id}
                        type="button"
                        onClick={() => store.setColorTheme(ct.id as ColorTheme)}
                        className={`p-3 rounded-xl border text-right transition-all flex flex-col gap-1.5 cursor-pointer ${
                          colorTheme === ct.id
                            ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{ct.name}</span>
                          <span className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: ct.hex }} />
                        </div>
                        <span className="text-[11px] text-slate-500">{ct.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin Panel Themes */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-800 block">
                    ۲. قالب و پوسته پیشخوان مدیریت (Admin Panel Template)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(Object.keys(ADMIN_THEMES) as AdminTheme[]).map(atKey => {
                      const at = ADMIN_THEMES[atKey];
                      return (
                        <button
                          key={atKey}
                          type="button"
                          onClick={() => store.setAdminTheme(atKey)}
                          className={`p-3.5 rounded-xl border text-right transition-all flex flex-col gap-2 cursor-pointer ${
                            adminTheme === atKey
                              ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{at.name}</span>
                            {adminTheme === atKey && (
                              <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                            <span className="w-3 h-3 rounded-sm bg-slate-900 inline-block border border-slate-700" />
                            <span className="w-3 h-3 rounded-sm bg-indigo-600 inline-block" />
                            <span className="w-3 h-3 rounded-sm bg-slate-100 inline-block border border-slate-300" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. SIDEBAR & WIDGETS STUDIO (BLOG & SITE SIDEBAR CONFIGURATION) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Layout className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">مدیریت سایدبار، ابزارک‌ها و منوهای صفحات سایت</h3>
                    <p className="text-xs text-slate-500">کنترل سایدبار وبلاگ، تغییر موقعیت به چپ یا راست، فعال‌سازی ویجت‌ها، بنر و لینک‌های منو</p>
                  </div>
                </div>

                <div className="space-y-6 text-xs">
                  {/* General Sidebar Activation & Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <div>
                      <span className="block font-bold text-slate-800 mb-2">وضعیت نمایش سایدبار در صفحات وبلاگ:</span>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={settings.showBlogSidebar !== false}
                          onChange={(e) => setSettings({ ...settings, showBlogSidebar: e.target.checked })}
                          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-slate-700">
                          {settings.showBlogSidebar !== false ? 'سایدبار در صفحات وبلاگ فعال و نمایان است' : 'سایدبار مخفی است (نمایش تک‌ستونه تمام‌عرض)'}
                        </span>
                      </label>
                      <p className="text-[11px] text-slate-500 mt-1">با غیرفعال‌سازی این گزینه، مقالات وبلاگ به صورت تمام‌عرض و بدون سایدبار نمایش داده می‌شوند.</p>
                    </div>

                    <div>
                      <span className="block font-bold text-slate-800 mb-2">موقعیت قرارگیری سایدبار (چپ / راست):</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, sidebarPosition: 'left' })}
                          className={`flex-1 py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                            (settings.sidebarPosition || 'left') === 'left'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          سمت چپ (استاندارد)
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, sidebarPosition: 'right' })}
                          className={`flex-1 py-2 px-3 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                            settings.sidebarPosition === 'right'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          سمت راست
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active Widgets */}
                  <div className="space-y-3">
                    <span className="font-bold text-slate-800 block">
                      ابزارک‌ها و بخش‌های فعال در سایدبار (Widgets Configuration):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { key: 'search', title: 'کادر جستجوی مقالات', desc: 'جستجوی آنی در عنوان، متن و برچسب‌ها' },
                        { key: 'categories', title: 'فهرست دسته‌بندی‌ها', desc: 'لیست موضوعات همراه با تعداد نوشته‌ها' },
                        { key: 'recentPosts', title: 'آخرین مقالات و نوشته‌ها', desc: 'نمایش ۴ نوشته جدید همراه با تاریخ' },
                        { key: 'featuredCourse', title: 'بنر دوره یا فایل شاخص', desc: 'کارت جذاب معرفی دوره برگزیده ماه' },
                        { key: 'popularTags', title: 'ابر برچسب‌های پربازدید', desc: 'کلمات کلیدی و تگ‌های مقالات' },
                        { key: 'customLinks', title: 'پیوندهای سفارشی و منو', desc: 'لینک‌های مهم و کاربردی آکادمی' },
                        { key: 'newsletter', title: 'عضویت در خبرنامه ایمیلی', desc: 'فرم اشتراک رایگان در خبرنامه' }
                      ].map(w => {
                        const currentWidgets = settings.sidebarWidgets || {};
                        const isChecked = (currentWidgets as any)[w.key] !== false;
                        return (
                          <label
                            key={w.key}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              isChecked ? 'bg-indigo-50/50 border-indigo-200 text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-500'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                setSettings({
                                  ...settings,
                                  sidebarWidgets: {
                                    ...(settings.sidebarWidgets || {}),
                                    [w.key]: e.target.checked
                                  }
                                });
                              }}
                              className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <div>
                              <div className="font-bold text-xs">{w.title}</div>
                              <div className="text-[10px] text-slate-500 mt-0.5">{w.desc}</div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Banner / Promotion Widget Settings */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="font-bold text-slate-800 block">
                      تنظیمات ابزارک بنر تبلیغاتی یا دوره برگزیده سایدبار:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">عنوان بنر سایدبار</label>
                        <input
                          type="text"
                          value={settings.sidebarBannerTitle || ''}
                          onChange={(e) => setSettings({ ...settings, sidebarBannerTitle: e.target.value })}
                          placeholder="تخفیف ویژه دوره‌های شبکه سیسکو"
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 mb-1 font-medium">پیوند یا شناسه مقصد بنر</label>
                        <input
                          type="text"
                          value={settings.sidebarBannerLink || ''}
                          onChange={(e) => setSettings({ ...settings, sidebarBannerLink: e.target.value })}
                          placeholder="course-ccna-200-301 یا https://..."
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-left"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-medium">متن زیرعنوان یا توضیح بنر</label>
                      <input
                        type="text"
                        value={settings.sidebarBannerSubtitle || ''}
                        onChange={(e) => setSettings({ ...settings, sidebarBannerSubtitle: e.target.value })}
                        placeholder="با کد تخفیف CCNA30 تا ۳۰٪ تخفیف اختصاصی دریافت کنید"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Custom Sidebar Links / Menu Manager */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="font-bold text-slate-800 block">
                      مدیریت پیوندهای اختصاصی و منوی سایدبار:
                    </span>

                    {/* Links List */}
                    <div className="space-y-2">
                      {(settings.sidebarCustomLinks || []).map((link, idx) => (
                        <div
                          key={link.id || idx}
                          className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl shadow-2xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-mono font-bold text-[10px]">
                              {idx + 1}
                            </span>
                            <span className="font-bold text-slate-800">{link.title}</span>
                            <span className="text-[11px] font-mono text-slate-400" dir="ltr">({link.url})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const curr = settings.sidebarCustomLinks || [];
                              setSettings({
                                ...settings,
                                sidebarCustomLinks: curr.filter((_, i) => i !== idx)
                              });
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            title="حذف پیوند"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {(!settings.sidebarCustomLinks || settings.sidebarCustomLinks.length === 0) && (
                        <p className="text-slate-400 text-xs py-1">هیچ پیوند اختصاصی تعریف نشده است.</p>
                      )}
                    </div>

                    {/* Add Link Form */}
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-200">
                      <input
                        type="text"
                        placeholder="عنوان پیوند (مثلاً: مستندات رسمی سیسکو)"
                        value={newSidebarLinkTitle}
                        onChange={(e) => setNewSidebarLinkTitle(e.target.value)}
                        className="flex-1 w-full sm:w-auto px-3 py-2 bg-white border border-slate-200 rounded-xl"
                      />
                      <input
                        type="url"
                        placeholder="نشانی اینترنتی (https://...)"
                        value={newSidebarLinkUrl}
                        onChange={(e) => setNewSidebarLinkUrl(e.target.value)}
                        className="flex-1 w-full sm:w-auto px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono text-left"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newSidebarLinkTitle.trim() || !newSidebarLinkUrl.trim()) return;
                          const newLink: SidebarCustomLink = {
                            id: `slink-${Date.now()}`,
                            title: newSidebarLinkTitle.trim(),
                            url: newSidebarLinkUrl.trim()
                          };
                          setSettings({
                            ...settings,
                            sidebarCustomLinks: [...(settings.sidebarCustomLinks || []), newLink]
                          });
                          setNewSidebarLinkTitle('');
                          setNewSidebarLinkUrl('');
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        افزودن پیوند به منو
                      </button>
                    </div>
                  </div>

                  {/* Save Button for Sidebar Settings */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        store.updateSettings(settings);
                        store.showToast('success', 'تنظیمات سایدبار و ابزارک‌های سایت با موفقیت ذخیره گردید.');
                      }}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>ذخیره تغییرات سایدبار و ابزارک‌ها</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. FULL SITE BACKUP & RESTORE (NO DATABASE CONFIG REQUIRED) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileJson className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">پشتیبان‌گیری کامل و بازیابی اطلاعات سامانه</h3>
                    <p className="text-xs text-slate-500">تمامی داده‌های دوره‌ها، سفارشات، کاربران، آزمون‌ها و مدارک بدون نیاز به دیتابیس خارجی در سیستم محفوظ است</p>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-3">
                  <p className="leading-relaxed">
                    سیستم آکادمی پارس‌نت با معماری مستقل طراحی شده است؛ به این معنی که برای ذخیره تغییرات و کارکرد کامل هیچ نیازی به راه‌اندازی یا اتصال به دیتابیس‌های پیچیده خارجی ندارید. همچنین می‌توانید در هر لحظه یک نسخه پشتیبان کامل JSON دریافت کنید یا داده‌های قبلی را بازیابی نمایید.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>دانلود فایل کامل پشتیبان (JSON Backup)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsImportModalOpen(true)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>بازیابی اطلاعات از فایل پشتیبان</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetFactoryDefaults}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-slate-200"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>بازنشانی به داده‌های اولیه</span>
                    </button>
                  </div>
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

          {/* DEDICATED ORGANIC PRODUCTS AND ORDERS VIEW */}
          {activeMenu === 'organic-products' && (
            <OrganicAdminSection
              mode="products"
              organicProducts={organicProducts}
              organicOrders={organicOrders}
              organicSettlements={organicSettlements}
            />
          )}

          {/* DEDICATED ORGANIC FINANCIAL AND SETTLEMENTS VIEW */}
          {activeMenu === 'organic-finance' && (
            <OrganicAdminSection
              mode="finance"
              organicProducts={organicProducts}
              organicOrders={organicOrders}
              organicSettlements={organicSettlements}
            />
          )}

          {/* DEDICATED PROJECT REQUESTS (IT, NETWORK & SOFTWARE) VIEW */}
          {activeMenu === 'project-requests' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-600" />
                    <span>مدیریت و پذیرش پروژه‌های IT، شبکه و نرم‌افزار</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    بررسی سفارشات آنلاین مشتریان، ارزیابی نیازمندی‌ها، تعیین مهندس ناظر و به‌روزرسانی وضعیت رهگیری
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-200 font-bold font-mono">
                    کل پروژه‌ها: {projectRequests.length}
                  </span>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-400 block mb-1">در انتظار بررسی</span>
                  <span className="text-xl font-black text-amber-600 font-mono">
                    {projectRequests.filter(r => r.status === 'pending' || r.status === 'reviewing').length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-400 block mb-1">در حال اجرا و استقرار</span>
                  <span className="text-xl font-black text-indigo-600 font-mono">
                    {projectRequests.filter(r => r.status === 'in_progress').length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-400 block mb-1">تایید شده / پیش‌فاکتور</span>
                  <span className="text-xl font-black text-teal-600 font-mono">
                    {projectRequests.filter(r => r.status === 'approved' || r.status === 'consultation').length}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                  <span className="text-xs text-slate-400 block mb-1">تحویل نهایی شده</span>
                  <span className="text-xl font-black text-emerald-600 font-mono">
                    {projectRequests.filter(r => r.status === 'completed').length}
                  </span>
                </div>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {projectRequests.length === 0 ? (
                  <div className="bg-white p-12 text-center text-slate-400 rounded-3xl border border-slate-200">
                    <Server className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-bold text-slate-700">هیچ سفارش پروژه‌ای تاکنون ثبت نشده است.</p>
                  </div>
                ) : (
                  projectRequests.map((req) => (
                    <div key={req.id} className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-2xs hover:border-indigo-300 transition-colors">
                      {/* Top Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl">
                            {req.trackingCode}
                          </span>
                          <span className="text-xs font-bold text-slate-800">{req.categoryTitle}</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                            req.urgency === 'enterprise' 
                              ? 'bg-purple-50 text-purple-700 border-purple-200' 
                              : req.urgency === 'urgent'
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {req.urgency === 'enterprise' ? 'سازمانی' : req.urgency === 'urgent' ? 'فوری' : 'عادی'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-mono text-slate-400">{req.createdAt}</span>
                          <button
                            onClick={() => {
                              if (confirm('آیا از حذف این درخواست پروژه مطمئن هستید؟')) {
                                store.deleteProjectRequest(req.id);
                              }
                            }}
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="حذف درخواست"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Title & Client details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                          <h3 className="text-base font-black text-slate-900">{req.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">{req.description}</p>
                          {req.location && (
                            <div className="text-[11px] text-slate-500 pt-1">
                              محل پروژه: <strong className="text-slate-700">{req.location}</strong> · بودجه تخمینی: <strong className="text-slate-700">{req.budgetRange || 'اعلام نشده'}</strong>
                            </div>
                          )}
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
                          <div className="font-bold text-slate-800 mb-1">اطلاعات کارفرما:</div>
                          <div>نام: <strong className="text-slate-900">{req.clientName}</strong></div>
                          <div>شماره تماس: <a href={`tel:${req.clientPhone}`} className="text-indigo-600 font-mono font-bold hover:underline" dir="ltr">{req.clientPhone}</a></div>
                          {req.organization && <div>شرکت: <span className="text-slate-700">{req.organization}</span></div>}
                          {req.clientEmail && <div>ایمیل: <span className="font-mono text-slate-600">{req.clientEmail}</span></div>}
                        </div>
                      </div>

                      {/* Admin Status & Notes Controls */}
                      <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-4 text-xs">
                        <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-indigo-600" />
                          <span>کنترل وضعیت فنی و گزارش پیشرفت (مشتری این بخش را در صفحه رهگیری مشاهده می‌کند):</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-slate-600 font-medium mb-1">وضعیت مرحله پروژه:</label>
                            <select
                              value={req.status}
                              onChange={(e) => {
                                store.updateProjectRequestStatus(req.id, e.target.value as ProjectStatus);
                              }}
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
                            >
                              <option value="pending">ثبت اولیه (Pending)</option>
                              <option value="reviewing">در حال بررسی فنی کارشناس (Reviewing)</option>
                              <option value="consultation">مشاوره و هماهنگی نیازها (Consultation)</option>
                              <option value="approved">تایید و صدور پیش‌فاکتور (Approved)</option>
                              <option value="in_progress">در حال پیاده‌سازی و اجرا (In Progress)</option>
                              <option value="completed">تحویل نهایی با گارانتی (Completed)</option>
                              <option value="cancelled">لغو سفارش (Cancelled)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-slate-600 font-medium mb-1">مهندس ناظر اختصاص داده شده:</label>
                            <input
                              type="text"
                              defaultValue={req.assignedEngineer || ''}
                              onBlur={(e) => {
                                store.updateProjectRequestStatus(req.id, req.status, undefined, undefined, undefined, e.target.value);
                              }}
                              placeholder="مثال: مهندس محمدرضا قاسمی"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 font-medium mb-1">تاریخ تحویل تخمینی:</label>
                            <input
                              type="text"
                              defaultValue={req.estimatedDelivery || ''}
                              onBlur={(e) => {
                                store.updateProjectRequestStatus(req.id, req.status, undefined, undefined, e.target.value);
                              }}
                              placeholder="مثال: ۱۴۰۳/۰۸/۳۰"
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-indigo-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-medium mb-1">گزارش وضعیت عمومی (قابل مشاهده توسط مشتری):</label>
                            <textarea
                              rows={2}
                              defaultValue={req.statusNotes || ''}
                              onBlur={(e) => {
                                store.updateProjectRequestStatus(req.id, req.status, e.target.value);
                              }}
                              placeholder="توضیح آخرین اقدامات برای نمایش در سامانه رهگیری..."
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 font-medium mb-1">یادداشت محرمانه ادمین (فقط مدیریت):</label>
                            <textarea
                              rows={2}
                              defaultValue={req.adminNotes || ''}
                              onBlur={(e) => {
                                store.updateProjectRequestStatus(req.id, req.status, undefined, e.target.value);
                              }}
                              placeholder="پیش‌پرداخت دریافت شد، تجهیزات از انبار ارسال گردید و..."
                              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
            : mediaPickerTarget === 'article'
            ? 'انتخاب تصویر شاخص برای نوشته یا رویداد'
            : mediaPickerTarget === 'course-gallery'
            ? 'انتخاب تصویر برای گالری دوره آموزشی'
            : mediaPickerTarget === 'file-gallery'
            ? 'انتخاب تصویر برای گالری فایل دانلودی'
            : mediaPickerTarget === 'article-gallery'
            ? 'انتخاب تصویر برای گالری نوشته وبلاگ'
            : 'انتخاب تصویر از کتابخانه رسانه‌ها'
        }
      />

      {/* STAGED FILE UPLOAD REVIEW & CONFIRMATION MODAL */}
      <UploadReviewModal
        isOpen={isUploadModalOpen}
        pendingFile={pendingUpload}
        onConfirmUpload={handleConfirmUpload}
        onCancel={handleCancelUpload}
        targetDescription={
          uploadTarget === 'course-image'
            ? 'تصویر شاخص دوره آموزشی'
            : uploadTarget === 'file-image'
            ? 'تصویر شاخص فایل دانلودی'
            : uploadTarget === 'article-image'
            ? 'تصویر شاخص نوشته وبلاگ'
            : uploadTarget === 'course-gallery'
            ? 'تصاویر گالری دوره'
            : uploadTarget === 'file-gallery'
            ? 'تصاویر گالری فایل'
            : uploadTarget === 'article-gallery'
            ? 'تصاویر گالری نوشته'
            : 'کتابخانه پرونده‌های چندرسانه‌ای'
        }
      />

      {/* MANUAL CERTIFICATE ISSUANCE MODAL */}
      {isIssuingCert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Award className="w-5 h-5 text-amber-500" />
                <span>صدور رسمی مدرک و گواهینامه برای دانشجو</span>
              </div>
              <button
                onClick={() => setIsIssuingCert(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleIssueCertificate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی دانشجو</label>
                <input
                  type="text"
                  value={certStudentName}
                  onChange={(e) => setCertStudentName(e.target.value)}
                  placeholder="مثال: سهراب سپهری"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">شماره همراه دانشجو</label>
                <input
                  type="tel"
                  dir="ltr"
                  value={certStudentPhone}
                  onChange={(e) => setCertStudentPhone(e.target.value)}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">عنوان دوره آموزشی</label>
                <select
                  value={certCourseTitle}
                  onChange={(e) => setCertCourseTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.title}>{c.title}</option>
                  ))}
                  <option value="دوره تخصصی مهندسی شبکه و لینوکس سازمانی">دوره تخصصی مهندسی شبکه و لینوکس سازمانی</option>
                  <option value="دوره جامع طراحی و پیاده‌سازی زیرساخت دیتاسنتر">دوره جامع طراحی و پیاده‌سازی زیرساخت دیتاسنتر</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام استاد صادرکننده</label>
                  <input
                    type="text"
                    value={certInstructor}
                    onChange={(e) => setCertInstructor(e.target.value)}
                    placeholder="مهندس محمدرضا قاسمی"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">نمره کسب‌شده (از ۱۰۰)</label>
                  <input
                    type="number"
                    min={60}
                    max={100}
                    value={certScore}
                    onChange={(e) => setCertScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-mono"
                    required
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                گواهینامه پس از ثبت رسمی دارای کد رهگیری یکتا و قابلیت استعلام فوری آنلاین در سامانه خواهد بود.
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  ثبت و صدور رسمی مدرک
                </button>
                <button
                  type="button"
                  onClick={() => setIsIssuingCert(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMPORT BACKUP MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <UploadCloud className="w-5 h-5 text-indigo-600" />
                <span>بازیابی اطلاعات از فایل پشتیبان JSON</span>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-600 leading-relaxed">
                محتوای متنی فایل پشتیبان قبلی (JSON) را در کادر زیر قرار دهید و دکمه بازیابی را بزنید. تمامی داده‌ها، دوره‌ها و تنظیمات بازنشانی خواهند شد:
              </p>

              <textarea
                rows={7}
                dir="ltr"
                value={importBackupText}
                onChange={(e) => setImportBackupText(e.target.value)}
                placeholder='{ "version": "1.0", "courses": [...], "settings": {...} }'
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] focus:outline-none focus:border-indigo-500"
              />

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleImportBackup}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  بازیابی و بارگذاری داده‌ها
                </button>
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
