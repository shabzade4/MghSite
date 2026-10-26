import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Download, ShoppingBag, MessageSquare, User, Play, Clock, 
  CheckCircle2, AlertCircle, Send, Plus, ArrowRight, ShieldCheck, Wallet, 
  Award, Check, Lock, Sparkles, Printer, Truck, MapPin, Package, Phone, 
  ExternalLink, Copy, Search, RefreshCw, Calendar, Leaf, Navigation, ArrowUpRight, 
  Box, ArrowLeftRight, Server
} from 'lucide-react';
import { Course, DigitalFile, Order, Ticket, Certificate, OrganicOrder, ProjectRequest } from '../types';

import { store } from '../services/store';

// Shipping Step Progress Helper
const getShippingStepProgress = (status?: string) => {
  switch (status) {
    case 'delivered':
      return { step: 4, percent: 100, label: 'تحویل موفقیت‌آمیز درب منزل', color: 'emerald' };
    case 'shipped':
      return { step: 3, percent: 75, label: 'تحویل به کوریر و در حال حمل به مقصد', color: 'blue' };
    case 'packed':
      return { step: 2, percent: 45, label: 'بسته‌بندی در انبار مرکزی مهرادینت', color: 'amber' };
    case 'processing':
    default:
      return { step: 1, percent: 20, label: 'ثبت سفارش و کنترل کیفی در هاب مرکزی', color: 'amber' };
  }
};


// Courier Info Helper
const getCourierInfo = (methodId?: string, methodTitle?: string) => {
  switch (methodId) {
    case 'tipax':
      return {
        name: 'شرکت تیپاکس اکسپرس (Tipax)',
        type: 'ارسال سریع درب منزل با رهگیری پیامکی و بیمه سلامت فیزیکی',
        phone: '۰۲۱-۸۴۵۷',
        portalUrl: 'https://tracking.tipax.ir',
        portalName: 'سامانه رهگیری تیپاکس',
        estimatedDays: '۲۴ الی ۴۸ ساعت کاری',
        badge: 'پیشنهادی و پرسرعت',
        iconColor: 'text-amber-600 bg-amber-50'
      };
    case 'express_courier':
      return {
        name: 'پیک ویژه موتوری روز (مخصوص تهران و کرج)',
        type: 'تحویل مستقیم با سفیر اختصاصی و کلمن عایق',
        phone: '۰۲۱-۸۸۴۵۶۷۸۹',
        portalUrl: '#',
        portalName: 'تماس با هماهنگ‌کننده پیک',
        estimatedDays: 'کمتر از ۴ ساعت (همان روز)',
        badge: 'تحویل فوری روز',
        iconColor: 'text-rose-600 bg-rose-50'
      };
    case 'special_coldpack':
      return {
        name: 'ارسال ویژه با کلمن و یخ‌دان (Cold-Pack Express)',
        type: 'زنجیره سرمایشی تضمین‌شده ویژه نوبرانه‌های تازه',
        phone: '۰۲۱-۸۸۴۵۶۷۸۹',
        portalUrl: '#',
        portalName: 'پایش برودتی مرسوله',
        estimatedDays: '۲۴ الی ۴۸ ساعت',
        badge: 'تضمین تازگی نوبرانه',
        iconColor: 'text-cyan-600 bg-cyan-50'
      };
    case 'barbari':
      return {
        name: 'باربری بین‌شهری (ویژه سفارشات عمده بالای ۱۰ کیلوگرم)',
        type: 'حمل در پایانه باربری با شماره بارنامه معتبر',
        phone: '۰۲۱-۵۵۳۱۰۰۰۰',
        portalUrl: '#',
        portalName: 'استعلام بارنامه پایانه',
        estimatedDays: '۲ الی ۳ روز کاری',
        badge: 'ویژه سفارشات عمده',
        iconColor: 'text-indigo-600 bg-indigo-50'
      };
    case 'post_pishtaz':
    default:
      return {
        name: 'شرکت ملی پست جمهوری اسلامی ایران (پست پیشتاز)',
        type: 'ارسال سراسری استاندارد با بارنامه و کد رهگیری ۲۴ رقمی پست',
        phone: '۱۹۳',
        portalUrl: 'https://tracking.post.ir',
        portalName: 'سامانه ملی رهگیری مرسولات پست',
        estimatedDays: '۳ الی ۵ روز کاری',
        badge: 'اقتصادی و سراسری',
        iconColor: 'text-blue-600 bg-blue-50'
      };
  }
};

// Estimated Delivery Details Helper
const getEstimatedDeliveryDetails = (order: OrganicOrder) => {
  const status = order.shippingStatus || order.status || 'processing';
  const method = order.shippingMethodId || order.shippingMethod;
  const courier = getCourierInfo(method, order.shippingTitle);

  if (status === 'delivered') {
    return {
      statusText: 'مرسوله با موفقیت تحویل داده شد',
      deliveryDate: 'تحویل داده شده',
      deliveryTimeWindow: 'امضا و رسید دیجیتال ثبت شد',
      badgeText: 'تحویل موفقیت‌آمیز ✓',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };
  }

  if (method === 'express_courier') {
    return {
      statusText: 'در حال ارسال با سفیر موتوری',
      deliveryDate: 'امروز (تحویل همان روز)',
      deliveryTimeWindow: 'بازه ساعت ۱۴:۰۰ الی ۱۸:۰۰',
      badgeText: 'تحویل امروز ⚡',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300'
    };
  }

  if (method === 'tipax') {
    return {
      statusText: 'در حال توزیع در هاب مقصد',
      deliveryDate: 'ظرف ۲۴ الی ۴۸ ساعت کاری',
      deliveryTimeWindow: 'بازه ساعت ۰۹:۰۰ الی ۱۵:۰۰',
      badgeText: 'تحویل ۱ الی ۲ روز آینده 📦',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300'
    };
  }

  return {
    statusText: 'در مسیر ترانزیت پستی به شهر مقصد',
    deliveryDate: courier.estimatedDays,
    deliveryTimeWindow: 'ساعات اداری باجه توزیع (۰۸:۰۰ الی ۱۴:۰۰)',
    badgeText: 'در مسیر حمل 🚚',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300'
  };
};

// Tracking Milestones Generator
const getMilestones = (order: OrganicOrder) => {
  const status = order.shippingStatus || order.status || 'processing';
  const courier = getCourierInfo(order.shippingMethodId || order.shippingMethod, order.shippingTitle);
  const city = order.city || order.customerCity || 'شهر مقصد';

  return [
    {
      id: 1,
      title: 'ثبت و تایید پرداخت سفارش',
      desc: `سفارش شماره ${order.orderNumber} با روش پرداخت ${order.paymentMethod === 'cod' ? 'پرداخت در محل' : 'آنلاین بانکی'} تایید و ثبت شد.`,
      date: order.createdAt || '۱۴۰۳/۰۸/۰۱',
      time: 'ساعت ۱۰:۱۵',
      location: 'سیستم ثبت سفارش و مالی پارس‌نت',
      isCompleted: true,
      isActive: false
    },
    {
      id: 2,
      title: 'کنترل کیفی و بسته‌بندی ارگانیک در انبار مرکزی',
      desc: 'بسته‌بندی در پاکت‌های زیپ‌کیپ کرافت چندلایه متالایز ضد رطوبت و کارتن ضربه‌گیر.',
      date: order.createdAt || '۱۴۰۳/۰۸/۰۱',
      time: 'ساعت ۱۴:۳۰',
      location: 'انبار مرکزی و هاب سورتینگ مهرادینت',
      isCompleted: status === 'packed' || status === 'shipped' || status === 'delivered',

      isActive: status === 'processing'
    },
    {
      id: 3,
      title: `تحویل مرسوله به ${courier.name}`,
      desc: order.trackingCode 
        ? `بارنامه و کد رهگیری پستی صادر شد (${order.trackingCode}) و مرسوله در مسیر ترانزیت قرار گرفت.` 
        : `مرسوله در صف بارگیری به ناوگان ${courier.name} است.`,
      date: '۱۴۰۳/۰۸/۰۲',
      time: 'ساعت ۰۸:۰۰',
      location: `هاب مرکزی ترانزیت ${courier.name}`,
      isCompleted: status === 'shipped' || status === 'delivered',
      isActive: status === 'packed'
    },
    {
      id: 4,
      title: `ورود به باجه توزیع و تحویل درب منزل در ${city}`,
      desc: status === 'delivered' 
        ? `مرسوله با موفقیت در نشانی ثبت‌شده به گیرنده (${order.customerName}) تحویل داده شد.` 
        : `توزیع توسط مامور تحویل در مقصد (${city}) طبق بازه زمانی اعلامی.`,
      date: status === 'delivered' ? '۱۴۰۳/۰۸/۰۴' : 'زمان تخمینی تحویل',
      time: status === 'delivered' ? 'ساعت ۱۱:۴۵' : 'بازه ۰۹:۰۰ الی ۱۵:۰۰',
      location: `${city} - نشانی تحویل گیرنده`,
      isCompleted: status === 'delivered',
      isActive: status === 'shipped'
    }
  ];
};

interface StudentPanelProps {
  onOpenPlayer: (course: Course) => void;
  onOpenInvoice: (order: Order) => void;
  onBackToHome: () => void;
  onOpenCertificate?: (cert: Certificate) => void;
  onOpenQuiz?: (course: Course) => void;
  onOpenVerifyModal?: (code?: string) => void;
}

export const StudentPanel: React.FC<StudentPanelProps> = ({
  onOpenPlayer,
  onOpenInvoice,
  onBackToHome,
  onOpenCertificate,
  onOpenQuiz,
  onOpenVerifyModal
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'files' | 'certificates' | 'orders' | 'tickets' | 'profile' | 'track-orders' | 'project-requests'>('courses');
  const [currentUser, setCurrentUser] = useState(store.currentUser);
  const [courses, setCourses] = useState<Course[]>(store.courses);
  const [files, setFiles] = useState<DigitalFile[]>(store.files);
  const [orders, setOrders] = useState<Order[]>(store.orders);
  const [tickets, setTickets] = useState<Ticket[]>(store.tickets);
  const [organicOrders, setOrganicOrders] = useState<OrganicOrder[]>(store.organicOrders);
  const [projectRequests, setProjectRequests] = useState<ProjectRequest[]>(store.projectRequests);

  // Track Order Section States
  const [selectedTrackingOrderId, setSelectedTrackingOrderId] = useState<string>('');
  const [trackingSearchQuery, setTrackingSearchQuery] = useState<string>('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [isRefreshingTracking, setIsRefreshingTracking] = useState<boolean>(false);
  const [trackingFilter, setTrackingFilter] = useState<'all' | 'in_transit' | 'delivered'>('all');
  const [trackingToast, setTrackingToast] = useState<string | null>(null);

  // New Ticket State
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDepartment, setNewDepartment] = useState<Ticket['department']>('technical');
  const [newPriority, setNewPriority] = useState<Ticket['priority']>('medium');
  const [newMessageContent, setNewMessageContent] = useState('');

  // Selected Ticket for viewing chat
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Profile Edit State
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  React.useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser({ ...store.currentUser });
      setCourses([...store.courses]);
      setFiles([...store.files]);
      setOrders([...store.orders]);
      setTickets([...store.tickets]);
      setOrganicOrders([...store.organicOrders]);
      setProjectRequests([...store.projectRequests]);
    });
  }, []);


  const enrolledCourses = courses.filter(c => currentUser.enrolledCourseIds.includes(c.id));
  const purchasedFiles = files.filter(f => currentUser.purchasedFileIds.includes(f.id));
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  const userTickets = tickets.filter(t => t.userId === currentUser.id);

  // User's organic orders list
  const userOrganicOrders = useMemo(() => {
    const matched = organicOrders.filter(o => 
      o.customerPhone === currentUser.phone || 
      o.customerName === currentUser.name ||
      (o.customerPhone && currentUser.phone && o.customerPhone.includes(currentUser.phone))
    );
    return matched.length > 0 ? matched : organicOrders;
  }, [organicOrders, currentUser]);

  const activeInTransitCount = useMemo(() => {
    return userOrganicOrders.filter(o => (o.shippingStatus || o.status) !== 'delivered').length;
  }, [userOrganicOrders]);

  const filteredOrganicOrders = useMemo(() => {
    let list = userOrganicOrders;
    if (trackingFilter === 'in_transit') {
      list = list.filter(o => (o.shippingStatus || o.status) !== 'delivered');
    } else if (trackingFilter === 'delivered') {
      list = list.filter(o => (o.shippingStatus || o.status) === 'delivered');
    }
    if (trackingSearchQuery.trim()) {
      const q = trackingSearchQuery.trim().toLowerCase();
      list = list.filter(o => 
        o.orderNumber.toLowerCase().includes(q) ||
        (o.trackingCode && o.trackingCode.toLowerCase().includes(q)) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.toLowerCase().includes(q) ||
        (o.city && o.city.toLowerCase().includes(q)) ||
        (o.customerCity && o.customerCity.toLowerCase().includes(q))
      );
    }
    return list;
  }, [userOrganicOrders, trackingFilter, trackingSearchQuery]);

  const currentTrackingOrder = useMemo(() => {
    if (selectedTrackingOrderId) {
      const found = organicOrders.find(o => o.id === selectedTrackingOrderId);
      if (found) return found;
    }
    return filteredOrganicOrders[0] || userOrganicOrders[0] || null;
  }, [selectedTrackingOrderId, organicOrders, filteredOrganicOrders, userOrganicOrders]);

  const handleRefreshTracking = () => {
    setIsRefreshingTracking(true);
    setTimeout(() => {
      setIsRefreshingTracking(false);
      setTrackingToast('وضعیت مرسوله با موفقیت از سرور ناوگان پستی استعلام شد. داده‌ها به‌روز هستند.');
      setTimeout(() => setTrackingToast(null), 3500);
    }, 900);
  };

  const handleCopyTrackingCode = (code: string, id: string) => {
    if (!code) return;
    navigator.clipboard?.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessageContent.trim()) return;

    const ticket: Ticket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      subject: newSubject,
      department: newDepartment,
      priority: newPriority,
      status: 'open',
      createdAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      updatedAt: new Date().toLocaleDateString('fa-IR'),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: 'student',
          content: newMessageContent,
          createdAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };

    store.addTicket(ticket);
    setIsCreatingTicket(false);
    setNewSubject('');
    setNewMessageContent('');
    setSelectedTicket(ticket);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage.trim()) return;

    store.replyTicket(selectedTicket.id, replyMessage, 'student');
    const updated = store.tickets.find(t => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
    setReplyMessage('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateUserProfile({
      name: editName,
      phone: editPhone
    });
    setProfileSuccessMsg('اطلاعات حساب کاربری شما با موفقیت به‌روزرسانی شد.');
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Student Profile Overview Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">{currentUser.name}</h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded-md">
                دانشجوی رسمی
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-3 mt-1 font-mono">
              <span>{currentUser.email}</span>
              <span>·</span>
              <span>{currentUser.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Wallet className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-[11px] text-slate-400 block">کیف پول:</span>
              <span className="text-sm font-bold text-slate-900 font-mono tabular-nums">
                {currentUser.walletBalance.toLocaleString('fa-IR')} تومان
              </span>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
          >
            بازگشت به سایت
          </button>
        </div>
      </div>

      {/* Panel Navigation Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-2 space-y-1 shadow-xs">
          <button
            onClick={() => { setActiveTab('courses'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'courses' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="flex-1">دوره‌های من</span>
            <span className="font-mono text-[11px] tabular-nums">({enrolledCourses.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('files'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'files' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="flex-1">فایل‌های دانلودی من</span>
            <span className="font-mono text-[11px] tabular-nums">({purchasedFiles.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('certificates'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'certificates' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4 shrink-0 text-amber-500" />
            <span className="flex-1">گواهینامه‌های رسمی</span>
            <span className="font-mono text-[11px] tabular-nums">({(currentUser.certificates || []).length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('orders'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span className="flex-1">سفارش‌ها و فاکتورها</span>
            <span className="font-mono text-[11px] tabular-nums">({userOrders.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('track-orders'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'track-orders' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Truck className={`w-4 h-4 shrink-0 ${activeTab === 'track-orders' ? 'text-white' : 'text-emerald-600'}`} />
            <span className="flex-1 font-bold">رهگیری مرسولات ارگانیک</span>
            {activeInTransitCount > 0 ? (
              <span className={`font-mono text-[10px] tabular-nums px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'track-orders' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeInTransitCount.toLocaleString('fa-IR')} در مسیر
              </span>
            ) : (
              <span className="font-mono text-[11px] tabular-nums">({userOrganicOrders.length})</span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('project-requests'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'project-requests' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Server className={`w-4 h-4 shrink-0 ${activeTab === 'project-requests' ? 'text-white' : 'text-indigo-600'}`} />
            <span className="flex-1 font-bold">پروژه‌های IT و شبکه من</span>
            <span className="font-mono text-[11px] tabular-nums">({projectRequests.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('tickets'); }}

            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'tickets' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span className="flex-1">تیکت‌ها و پشتیبانی</span>
            <span className="font-mono text-[11px] tabular-nums">({userTickets.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('profile'); setSelectedTicket(null); }}
            className={`w-full px-4 py-3 text-right text-xs font-semibold rounded-xl flex items-center gap-3 transition-colors ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="flex-1">مشخصات کاربری</span>
          </button>
        </div>

        {/* Panel Main Area */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs min-h-[460px]">
          {/* TAB 1: Enrolled Courses */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">دوره‌های آموزشی ثبت‌نام شده</h2>
                  <p className="text-xs text-slate-500 mt-0.5">برای مشاهده ویدیوها و شرکت در آزمون دریافت گواهینامه، دوره مورد نظر را انتخاب کنید.</p>
                </div>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <BookOpen className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">شما هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => {
                    const prog = store.getCourseProgress(course.id);
                    const hasCert = (currentUser.certificates || []).some(c => c.courseId === course.id);

                    return (
                      <div
                        key={course.id}
                        className="border border-slate-200 rounded-2xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={course.image}
                              alt={course.title}
                              referrerPolicy="no-referrer"
                              className="w-20 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                                {course.title}
                              </h4>
                              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                                <span>مدرس: {course.instructor.name}</span>
                                <span>·</span>
                                <span className="font-mono tabular-nums">{course.episodesCount} جلسه</span>
                              </div>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="text-slate-500">میزان پیشرفت مشاهده:</span>
                              <span className="font-mono font-bold text-emerald-600 tabular-nums">
                                {prog.percent}٪ ({prog.completedCount} از {prog.totalCount} جلسه)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                                style={{ width: `${prog.percent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenPlayer(course)}
                            className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>پخش جلسات</span>
                          </button>

                          {onOpenQuiz && (
                            <button
                              onClick={() => onOpenQuiz(course)}
                              className={`px-3 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                                hasCert
                                  ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                              }`}
                              title={hasCert ? 'مشاهده و شرکت مجدد در آزمون' : 'شرکت در آزمون آنلاین پایان دوره'}
                            >
                              <Award className="w-3.5 h-3.5 text-amber-600" />
                              <span className="hidden sm:inline">{hasCert ? 'آزمون مجدد' : 'آزمون گواهی'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Purchased Files */}
          {activeTab === 'files' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">فایل‌ها و سناریوهای خریداری‌شده</h2>
                  <p className="text-xs text-slate-500 mt-0.5">لینک‌های دانلود اختصاصی با گواهی امضای دیجیتال و توکن امن دو ساعته.</p>
                </div>
              </div>

              {purchasedFiles.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Download className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">هنوز فایلی خریداری نکرده‌اید.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {purchasedFiles.map((file) => {
                    const signedData = store.generateSignedDownloadUrl(file.id);

                    return (
                      <div
                        key={file.id}
                        className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900">{file.title}</h4>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span>لینک اختصاصی امن</span>
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className="font-mono">حجم: {file.fileSize}</span>
                            <span>·</span>
                            <span className="font-mono">فرمت: {file.fileFormat}</span>
                            <span>·</span>
                            <span className="font-mono">نسخه: {file.version}</span>
                            <span>·</span>
                            <span className="text-indigo-600 font-mono text-[10px]">اعتبار توکن: {signedData.expiresAt}</span>
                          </div>
                        </div>

                        <a
                          href={signedData.url}
                          download
                          onClick={(e) => {
                            e.preventDefault();
                            store.showToast('success', `دانلود فایل «${file.title}» آغاز شد.`);
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>دانلود فایل ({file.fileSize})</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB: Official Certificates */}
          {activeTab === 'certificates' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">گواهینامه‌های رسمی پایان دوره</h2>
                  <p className="text-xs text-slate-500 mt-0.5">مدارک تاییدشده پایان دوره‌ها با کد رهگیری اختصاصی، آماده چاپ و استعلام آنلاین.</p>
                </div>
              </div>

              {(!currentUser.certificates || currentUser.certificates.length === 0) ? (
                <div className="text-center py-12 text-slate-400 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8">
                  <Award className="w-12 h-12 stroke-1 mx-auto mb-3 text-amber-400" />
                  <h3 className="text-sm font-bold text-slate-800 mb-1">هنوز گواهینامه‌ای صادر نشده است</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed mb-6">
                    برای دریافت گواهینامه معتبر آکادمی پارس‌نت، دوره‌های آموزشی خود را مشاهده نموده و در آزمون آنلاین تستی (با حداقل نمره ۷۰٪) شرکت کنید.
                  </p>

                  {enrolledCourses.length > 0 && onOpenQuiz && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {enrolledCourses.map(c => (
                        <button
                          key={c.id}
                          onClick={() => onOpenQuiz(c)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-300" />
                          <span>شرکت در آزمون: {c.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentUser.certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="border border-amber-200/80 bg-gradient-to-r from-amber-50/40 via-white to-slate-50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900">{cert.courseTitle}</h4>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold">
                              نمره: {cert.gradeScore}٪
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-3 font-mono flex-wrap">
                            <span>شماره مدرک: <strong className="text-slate-700">{cert.certificateNumber}</strong></span>
                            <span>·</span>
                            <span>کد رهگیری: <strong className="text-slate-700">{cert.verificationCode}</strong></span>
                            <span>·</span>
                            <span>تاریخ صدور: {cert.issueDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                        {onOpenVerifyModal && (
                          <button
                            onClick={() => onOpenVerifyModal(cert.verificationCode)}
                            className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                            title="استعلام آنلاین وضعیت این مدرک"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                            <span>استعلام آنلاین</span>
                          </button>
                        )}

                        {onOpenCertificate && (
                          <button
                            onClick={() => onOpenCertificate(cert)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-amber-400" />
                            <span>مشاهده و چاپ مدرک (PDF)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Orders & Invoices */}
          {activeTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">سوابق سفارش‌ها و فاکتورها</h2>
                  <p className="text-xs text-slate-500 mt-0.5">اطلاعات تراکنش‌های بانکی، کدهای رهگیری و امکان دریافت فاکتور رسمی.</p>
                </div>
              </div>

              {/* Quick Link Banner to Organic Shipment Tracking */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50/30 border border-emerald-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl shrink-0 shadow-sm shadow-emerald-600/30">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                      <span>سفارشات محصولات ارگانیک و پیگیری مرسولات پستی</span>
                      {activeInTransitCount > 0 && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {activeInTransitCount.toLocaleString('fa-IR')} مرسوله در مسیر
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      برای مشاهده موقعیت زنده، مشخصات کوریر (پست/تیپاکس) و زمان تخمینی تحویل درب منزل کلیک کنید.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('track-orders')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm shadow-emerald-600/20"
                >
                  <span>ورود به سامانه رهگیری مرسولات</span>
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {userOrders.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <ShoppingBag className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">سفارشی ثبت نشده است.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-bold">
                      <tr>
                        <th className="p-3">شماره سفارش</th>
                        <th className="p-3">تاریخ</th>
                        <th className="p-3">مبلغ پرداختی</th>
                        <th className="p-3">کد رهگیری</th>
                        <th className="p-3">وضعیت</th>
                        <th className="p-3">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {userOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                          <td className="p-3 text-slate-500">{ord.createdAt}</td>
                          <td className="p-3 font-mono font-bold text-slate-900 tabular-nums">
                            {ord.payableAmount.toLocaleString('fa-IR')} تومان
                          </td>
                          <td className="p-3 font-mono text-emerald-700">{ord.refId}</td>
                          <td className="p-3">
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                              پرداخت موفق
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => onOpenInvoice(ord)}
                              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                            >
                              مشاهده فاکتور
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Support Tickets */}
          {activeTab === 'tickets' && (
            <div>
              {selectedTicket ? (
                // View Ticket Conversation
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <div>
                      <button
                        onClick={() => setSelectedTicket(null)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2 font-medium"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>بازگشت به لیست تیکت‌ها</span>
                      </button>
                      <h3 className="text-base font-bold text-slate-900">{selectedTicket.subject}</h3>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <span className="font-mono">کد: {selectedTicket.ticketNumber}</span>
                        <span>·</span>
                        <span>
                          {selectedTicket.department === 'technical' ? 'پشتیبانی فنی' : 'پشتیبانی دوره‌ها'}
                        </span>
                        <span>·</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          selectedTicket.status === 'answered'
                            ? 'bg-emerald-50 text-emerald-700'
                            : selectedTicket.status === 'open'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {selectedTicket.status === 'answered' ? 'پاسخ داده شده' : selectedTicket.status === 'open' ? 'در انتظار بررسی' : 'بسته شده'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Messages Stream */}
                  <div className="space-y-4 mb-6">
                    {selectedTicket.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-2xl max-w-2xl text-xs sm:text-sm ${
                          msg.senderRole === 'admin'
                            ? 'bg-indigo-50 border border-indigo-100 mr-auto'
                            : 'bg-slate-50 border border-slate-200 ml-auto'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-slate-200/50">
                          <span className="font-bold text-slate-900">{msg.senderName}</span>
                          <span className="text-[11px] font-mono text-slate-400">{msg.createdAt}</span>
                        </div>
                        <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply form */}
                  {selectedTicket.status !== 'closed' && (
                    <form onSubmit={handleSendReply} className="space-y-3">
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="پاسخ خود را اینجا بنویسید..."
                        rows={3}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-indigo-600"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>ارسال پاسخ</span>
                      </button>
                    </form>
                  )}
                </div>
              ) : isCreatingTicket ? (
                // Create New Ticket Form
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                    <h3 className="text-base font-bold text-slate-900">ارسال تیکت جدید به مدرس و پشتیبانی</h3>
                    <button
                      onClick={() => setIsCreatingTicket(false)}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      انصراف
                    </button>
                  </div>

                  <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">موضوع تیکت</label>
                      <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="مثال: سوال در خصوص سناریوی شماره ۵ پکت‌تریسر"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">دپارتمان مربوطه</label>
                        <select
                          value={newDepartment}
                          onChange={(e: any) => setNewDepartment(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        >
                          <option value="courses">مدرس دوره و رفع اشکال علمی</option>
                          <option value="technical">پشتیبانی فایل‌ها و دانلود</option>
                          <option value="financial">امور مالی و درگاه پرداخت</option>
                          <option value="general">مشاوره و راهنمایی</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">اولویت</label>
                        <select
                          value={newPriority}
                          onChange={(e: any) => setNewPriority(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                        >
                          <option value="low">عادی</option>
                          <option value="medium">متوسط</option>
                          <option value="high">فوری</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">متن پیام و شرح سوال</label>
                      <textarea
                        value={newMessageContent}
                        onChange={(e) => setNewMessageContent(e.target.value)}
                        rows={5}
                        placeholder="شرح دقیق سوال، پیام‌های خطا در ترمینال یا پکت تریسر..."
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                    >
                      ثبت و ارسال تیکت
                    </button>
                  </form>
                </div>
              ) : (
                // Tickets List
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">تیکت‌های پشتیبانی و مشاوره</h2>
                      <p className="text-xs text-slate-500 mt-0.5">پاسخگویی مستقیم اساتید و تیم فنی آکادمی پارس نت.</p>
                    </div>
                    <button
                      onClick={() => setIsCreatingTicket(true)}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ارسال تیکت جدید</span>
                    </button>
                  </div>

                  {userTickets.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <MessageSquare className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm">تیکتی تاکنون ارسال نشده است.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicket(ticket)}
                          className="border border-slate-200 rounded-2xl p-4 hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-900">{ticket.subject}</h4>
                              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                                ticket.status === 'answered'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {ticket.status === 'answered' ? 'پاسخ داده شده' : 'در انتظار پاسخ'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                              <span className="font-mono">{ticket.ticketNumber}</span>
                              <span>·</span>
                              <span>{ticket.createdAt}</span>
                              <span>·</span>
                              <span>{ticket.messages.length} پیام</span>
                            </div>
                          </div>

                          <span className="text-xs text-indigo-600 font-semibold">
                            مشاهده و پاسخ ←
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Profile & Settings */}
          {activeTab === 'profile' && (
            <div>
              <div className="mb-6">
                <h2 className="text-base font-bold text-slate-900">مشخصات حساب کاربری</h2>
                <p className="text-xs text-slate-500 mt-0.5">ویرایش نام، شماره تلفن و تنظیمات امنیتی حساب.</p>
              </div>

              {profileSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">نام و نام خانوادگی</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">آدرس ایمیل (غیرقابل تغییر)</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">شماره همراه جهت پیامک‌های احراز هویت</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 font-mono text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                >
                  ذخیره تغییرات حساب
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: Track Order (Organic Products Real-Time Shipping & Courier Status) */}
          {activeTab === 'track-orders' && (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl shrink-0 shadow-xs">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-black text-slate-900">
                        سامانه رهگیری لحظه‌ای مرسولات و سفارشات ارگانیک
                      </h2>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>آنلاین و لحظه‌ای</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      مشاهده موقعیت زنده، جزئیات کوریر پستی (پست/تیپاکس) و زمان تخمینی تحویل درب منزل
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRefreshTracking}
                    disabled={isRefreshingTracking}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                    title="استعلام زنده از سرور پست و تیپاکس"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshingTracking ? 'animate-spin' : ''}`} />
                    <span>{isRefreshingTracking ? 'در حال استعلام...' : 'استعلام وضعیت'}</span>
                  </button>
                </div>
              </div>

              {/* Tracking Toast */}
              {trackingToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{trackingToast}</span>
                </div>
              )}

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={trackingSearchQuery}
                    onChange={(e) => setTrackingSearchQuery(e.target.value)}
                    placeholder="جستجو با شماره سفارش (مثلاً ORG-1403-8841)، کد رهگیری یا نام گیرنده..."
                    className="w-full pr-10 pl-16 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                  {trackingSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setTrackingSearchQuery('')}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[11px]"
                    >
                      پاک کردن
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setTrackingFilter('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                      trackingFilter === 'all'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    همه مرسولات ({userOrganicOrders.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackingFilter('in_transit')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      trackingFilter === 'in_transit'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                    <span>در حال ارسال ({activeInTransitCount})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackingFilter('delivered')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                      trackingFilter === 'delivered'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    تحویل داده شده ({userOrganicOrders.filter(o => (o.shippingStatus || o.status) === 'delivered').length})
                  </button>
                </div>
              </div>

              {/* Order Selection Cards (if more than 1 order) */}
              {filteredOrganicOrders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-slate-50/60 rounded-2xl border border-slate-200 p-8">
                  <Truck className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <h4 className="font-bold text-sm text-slate-700 mb-1">مرسوله‌ای با این مشخصات یافت نشد</h4>
                  <p className="text-xs text-slate-500">
                    لطفاً شماره سفارش یا کد رهگیری را مجدداً بررسی فرمایید یا فیلترها را ریست کنید.
                  </p>
                </div>
              ) : (
                <>
                  {/* Horizontal Order Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
                      <span>انتخاب سفارش جهت مشاهده رهگیری زنده:</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {filteredOrganicOrders.length.toLocaleString('fa-IR')} سفارش ارگانیک ثبت‌شده
                      </span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredOrganicOrders.map((ord) => {
                        const isSelected = currentTrackingOrder?.id === ord.id;
                        const deliveryDetails = getEstimatedDeliveryDetails(ord);
                        const courier = getCourierInfo(ord.shippingMethodId || ord.shippingMethod, ord.shippingTitle);

                        return (
                          <div
                            key={ord.id}
                            onClick={() => setSelectedTrackingOrderId(ord.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right flex flex-col justify-between gap-3 ${
                              isSelected
                                ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="font-mono font-bold text-xs text-slate-900">{ord.orderNumber}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${deliveryDetails.badgeClass}`}>
                                  {deliveryDetails.badgeText}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                                <span className="font-semibold">{ord.customerCity || ord.city || 'مقصد نامشخص'}</span>
                                <span>•</span>
                                <span className="text-[11px] text-slate-400">{ord.createdAt}</span>
                              </div>

                              {/* Preview of item thumbnails */}
                              <div className="flex items-center gap-1.5 overflow-hidden">
                                {ord.items.slice(0, 3).map((it, idx) => (
                                  <div key={idx} className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0" title={it.productName || it.title}>
                                    {it.image ? (
                                      <img src={it.image} alt={it.productName || ''} className="w-full h-full object-cover" />
                                    ) : (
                                      <Leaf className="w-4 h-4 m-2 text-emerald-600" />
                                    )}
                                  </div>
                                ))}
                                {ord.items.length > 3 && (
                                  <span className="text-[10px] text-slate-400 font-bold">
                                    +{ord.items.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">{courier.name.split('(')[0].trim()}</span>
                              <span className="font-bold text-slate-800 tabular-nums">
                                {(ord.totalPayable || (ord.subtotal + ord.shippingCost)).toLocaleString('fa-IR')} تومان
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Order Detailed Tracking Dashboard */}
                  {currentTrackingOrder && (() => {
                    const ord = currentTrackingOrder;
                    const courier = getCourierInfo(ord.shippingMethodId || ord.shippingMethod, ord.shippingTitle);
                    const deliveryDetails = getEstimatedDeliveryDetails(ord);
                    const stepInfo = getShippingStepProgress(ord.shippingStatus || ord.status);
                    const milestones = getMilestones(ord);
                    const trackingCode = ord.trackingCode || (courier.phone === '۱۹۳' ? 'POST-34509120491' : 'TPX-9841203941');

                    return (
                      <div className="space-y-6 pt-2">
                        {/* Main Status & Courier Header Banner */}
                        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
                          
                          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            {/* Left (Order & Real-Time Status) */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                  <span>وضعیت زنده: {stepInfo.label}</span>
                                </span>
                                <span className="text-xs text-slate-400 font-mono">
                                  ثبت سفارش: {ord.createdAt}
                                </span>
                              </div>

                              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                <span>سفارش شماره {ord.orderNumber}</span>
                              </h3>

                              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                                ارسال از طریق <strong className="text-emerald-300">{courier.name}</strong> • مقصد نهایی: {ord.customerProvince || ord.province || 'ایران'}، {ord.customerCity || ord.city}
                              </p>
                            </div>

                            {/* Right: Estimated Delivery Callout Box */}
                            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shrink-0 min-w-[260px]">
                              <div className="flex items-center gap-2 text-emerald-300 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs font-bold">زمان تخمینی تحویل درب منزل</span>
                              </div>

                              <div className="text-base sm:text-lg font-black text-white mb-1">
                                {deliveryDetails.deliveryDate}
                              </div>

                              <div className="text-[11px] text-slate-300">
                                {deliveryDetails.deliveryTimeWindow}
                              </div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="relative mt-6 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-semibold">
                              <span>مرحله {stepInfo.step} از ۴ فرآیند ارسال</span>
                              <span className="font-mono">%{stepInfo.percent} تکمیل مرسوله</span>
                            </div>
                            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                                style={{ width: `${stepInfo.percent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Courier & Tracking Code Box */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Box 1: Courier Profile */}
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
                            <div className={`p-2.5 rounded-xl shrink-0 ${courier.iconColor}`}>
                              <Truck className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400 font-bold block mb-0.5">شرکت حمل‌ونقل و کوریر:</span>
                              <h4 className="text-xs font-bold text-slate-900 mb-1">{courier.name}</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed mb-2">{courier.type}</p>
                              <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                                شماره تماس پشتیبانی کوریر: {courier.phone}
                              </span>
                            </div>
                          </div>

                          {/* Box 2: Tracking Code & Copy Action */}
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                            <div>
                              <span className="text-[11px] text-slate-400 font-bold block mb-1">کد رهگیری مرسوله پستی:</span>
                              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200 mb-2">
                                <span className="font-mono font-black text-sm text-slate-900 tracking-wider">
                                  {trackingCode}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyTrackingCode(trackingCode, ord.id)}
                                  className="p-1.5 text-slate-500 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                                  title="کپی کد رهگیری"
                                >
                                  {copiedCodeId === ord.id ? (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-emerald-700 font-semibold">
                                {copiedCodeId === ord.id ? '✓ در حافظه کپی شد' : 'امکان استعلام بارنامه'}
                              </span>
                              {courier.portalUrl !== '#' ? (
                                <a
                                  href={courier.portalUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                                >
                                  <span>{courier.portalName}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <span className="text-[11px] text-slate-400">سامانه اختصاصی</span>
                              )}
                            </div>
                          </div>

                          {/* Box 3: Packaging & Security Seal */}
                          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
                            <div className="p-2.5 rounded-xl shrink-0 bg-emerald-50 text-emerald-600">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[11px] text-slate-400 font-bold block mb-0.5">ضمانت سلامت و بسته‌بندی:</span>
                              <h4 className="text-xs font-bold text-slate-900 mb-1">بسته‌بندی چندلایه متالایز</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed">
                                کلیه اقلام در کارتن پنج‌لایه حباب‌دار و پاکت زیپ‌کیپ حافظ تازگی پلمپ شده و دارای بیمه سلامت فیزیکی هستند.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Real-time Timeline Stepper */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                          <h4 className="text-xs font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-emerald-600" />
                            <span>جدول زمان‌بندی و موقعیت‌های ثبت‌شده مرسوله در مسیر</span>
                          </h4>

                          <div className="relative pr-6 border-r-2 border-slate-200 space-y-6">
                            {milestones.map((ms) => {
                              return (
                                <div key={ms.id} className="relative">
                                  {/* Dot indicator */}
                                  <div
                                    className={`absolute -right-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                                      ms.isCompleted
                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                        : ms.isActive
                                        ? 'bg-amber-400 border-amber-400 animate-pulse'
                                        : 'bg-white border-slate-300'
                                    } flex items-center justify-center`}
                                  >
                                    {ms.isCompleted && <Check className="w-2.5 h-2.5 text-white" />}
                                  </div>

                                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                      <h5 className={`font-bold text-xs ${ms.isCompleted ? 'text-slate-900' : ms.isActive ? 'text-amber-800 font-extrabold' : 'text-slate-500'}`}>
                                        {ms.title}
                                      </h5>
                                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                        <span>{ms.date}</span>
                                        <span>•</span>
                                        <span>{ms.time}</span>
                                      </div>
                                    </div>

                                    <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                                      {ms.desc}
                                    </p>

                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                      <MapPin className="w-3 h-3 text-slate-400" />
                                      <span>موقعیت مکانی: <strong className="text-slate-700">{ms.location}</strong></span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Delivery Address & Order Items Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Destination Details (5 cols) */}
                          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                              <MapPin className="w-4 h-4 text-emerald-600" />
                              <span>مشخصات تحویل‌گیرنده و نشانی پستی</span>
                            </h4>

                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">نام تحویل‌گیرنده:</span>
                                <span className="font-bold text-slate-800">{ord.customerName}</span>
                              </div>

                              <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">شماره تماس همراه:</span>
                                <span className="font-mono font-bold text-slate-800">{ord.customerPhone}</span>
                              </div>

                              <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">استان و شهر مقصد:</span>
                                <span className="font-semibold text-slate-800">
                                  {ord.customerProvince || ord.province || '—'} / {ord.customerCity || ord.city || '—'}
                                </span>
                              </div>

                              <div className="flex justify-between py-1 border-b border-slate-100">
                                <span className="text-slate-500">کد پستی ۱۰ رقمی:</span>
                                <span className="font-mono font-bold text-slate-800">{ord.customerPostalCode || ord.postalCode || '—'}</span>
                              </div>

                              <div className="pt-1">
                                <span className="text-slate-500 block mb-1">نشانی دقیق تحویل:</span>
                                <p className="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed font-medium">
                                  {ord.customerAddress || ord.address || 'نشانی ثبت نشده است'}
                                </p>
                              </div>

                              {ord.notes && (
                                <div className="pt-1">
                                  <span className="text-slate-500 block mb-1">توضیحات و هماهنگی خریدار:</span>
                                  <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 leading-relaxed">
                                    «{ord.notes}»
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Ordered Items (7 cols) */}
                          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <Package className="w-4 h-4 text-emerald-600" />
                                <span>اقلام و بسته‌های ارگانیک این مرسوله</span>
                              </h4>
                              <span className="text-[11px] text-slate-500">
                                مجموع وزن مرسوله: <strong className="text-slate-800 font-mono">{(ord.totalWeightInGrams || 1000).toLocaleString('fa-IR')} گرم</strong>
                              </span>
                            </div>

                            <div className="space-y-3">
                              {ord.items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs gap-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                                      {item.image ? (
                                        <img src={item.image} alt={item.productName || item.title || ''} className="w-full h-full object-cover" />
                                      ) : (
                                        <Leaf className="w-5 h-5 m-3.5 text-emerald-600" />
                                      )}
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-slate-900 line-clamp-1">{item.productName || item.title}</h5>
                                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                        <span>بسته: {item.packageLabel || 'استاندارد'}</span>
                                        <span>•</span>
                                        <span>تعداد: <strong className="text-slate-700">{item.quantity.toLocaleString('fa-IR')}</strong></span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-left font-mono font-bold text-slate-900 whitespace-nowrap">
                                    {item.totalPrice.toLocaleString('fa-IR')} تومان
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Pricing summary */}
                            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                              <div className="flex justify-between">
                                <span>جمع ارزش اقلام:</span>
                                <span className="font-mono font-bold text-slate-800">{ord.subtotal.toLocaleString('fa-IR')} تومان</span>
                              </div>
                              <div className="flex justify-between">
                                <span>هزینه حمل و بیمه ({courier.name.split('(')[0].trim()}):</span>
                                <span className="font-mono font-bold text-slate-800">{ord.shippingCost.toLocaleString('fa-IR')} تومان</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                                <span>مبلغ کل پرداخت‌شده:</span>
                                <span className="font-mono text-emerald-700">{(ord.totalPayable || (ord.subtotal + ord.shippingCost)).toLocaleString('fa-IR')} تومان</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          )}

          {/* TAB 8: My IT & Network Projects */}
          {activeTab === 'project-requests' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-600" />
                    <span>پروژه‌ها و سفارشات خدمات IT من</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    پیگیری لحظه‌ای وضعیت پروژه‌های شبکه پسیو/اکتیو، سرور، مجازی‌سازی، طراحی سایت و برنامه‌نویسی
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
                    تعداد پروژه‌ها: <strong className="text-slate-800">{projectRequests.length}</strong>
                  </span>
                </div>
              </div>

              {projectRequests.length === 0 ? (
                <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Server className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm font-bold text-slate-700">شما هنوز سفارش پروژه‌ای ثبت نکرده‌اید.</p>
                  <p className="text-xs text-slate-400 mt-1">می‌توانید از بخش «خدمات و انجام پروژه» سایت سفارش خود را ثبت نمایید.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projectRequests.map((req) => {
                    const statusInfo = (() => {
                      switch (req.status) {
                        case 'pending':
                          return { label: 'ثبت اولیه', color: 'bg-amber-100 text-amber-800 border-amber-300', step: 1 };
                        case 'reviewing':
                          return { label: 'در حال بررسی فنی', color: 'bg-blue-100 text-blue-800 border-blue-300', step: 2 };
                        case 'consultation':
                          return { label: 'مشاوره و هماهنگی', color: 'bg-purple-100 text-purple-800 border-purple-300', step: 3 };
                        case 'approved':
                          return { label: 'تایید و صدور پیش‌فاکتور', color: 'bg-teal-100 text-teal-800 border-teal-300', step: 4 };
                        case 'in_progress':
                          return { label: 'در حال پیاده‌سازی و اجرا', color: 'bg-indigo-100 text-indigo-800 border-indigo-300', step: 5 };
                        case 'completed':
                          return { label: 'تحویل نهایی با گارانتی', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', step: 6 };
                        default:
                          return { label: 'لغو شده', color: 'bg-rose-100 text-rose-800 border-rose-300', step: 0 };
                      }
                    })();

                    return (
                      <div key={req.id} className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 space-y-4 hover:border-indigo-300 transition-colors">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg">
                              {req.trackingCode}
                            </span>
                            <span className="text-xs font-bold text-slate-700">{req.categoryTitle}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400">{req.createdAt}</span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div>
                          <h3 className="text-sm font-black text-slate-900 mb-1">{req.title}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">{req.description}</p>
                        </div>

                        {/* Timeline Step Bar */}
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200/70">
                          <div className="text-[11px] font-bold text-slate-500 mb-2">مراحل فرایند پروژه:</div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                            {[
                              { label: 'ثبت درخواست', s: 1 },
                              { label: 'بررسی فنی', s: 2 },
                              { label: 'مشاوره', s: 3 },
                              { label: 'در حال اجرا', s: 5 },
                              { label: 'تحویل با گارانتی', s: 6 }
                            ].map((stepItem) => {
                              const isCompleted = statusInfo.step >= stepItem.s;
                              const isCurrent = statusInfo.step === stepItem.s;
                              return (
                                <div 
                                  key={stepItem.s} 
                                  className={`p-2 rounded-lg border text-[11px] transition-all ${
                                    isCompleted 
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                                      : isCurrent
                                      ? 'bg-indigo-50 border-indigo-400 text-indigo-700 font-bold ring-2 ring-indigo-500/20'
                                      : 'bg-slate-50 border-slate-200 text-slate-400'
                                  }`}
                                >
                                  <div>{stepItem.label}</div>
                                  <div className="text-[9px] mt-0.5 font-mono">
                                    {isCompleted ? 'انجام شد ✓' : isCurrent ? 'مرحله جاری' : '—'}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Status Note & Team Feedback */}
                        {req.statusNotes && (
                          <div className="bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-200/70 text-xs">
                            <span className="font-bold text-indigo-900 block mb-1">آخرین گزارش مهندس ناظر:</span>
                            <p className="text-indigo-800 leading-relaxed font-light">{req.statusNotes}</p>
                          </div>
                        )}

                        {/* Metadata Footer */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-600 border-t border-slate-200/70">
                          {req.assignedEngineer && (
                            <div>
                              <span className="text-slate-400">مهندس مسئول: </span>
                              <strong className="text-slate-800">{req.assignedEngineer}</strong>
                            </div>
                          )}
                          {req.estimatedDelivery && (
                            <div>
                              <span className="text-slate-400">موعد تحویل: </span>
                              <strong className="text-amber-700 font-mono">{req.estimatedDelivery}</strong>
                            </div>
                          )}
                          {req.location && (
                            <div>
                              <span className="text-slate-400">محل اجرا: </span>
                              <span className="text-slate-700">{req.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
