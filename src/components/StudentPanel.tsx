import React, { useState } from 'react';
import { BookOpen, Download, ShoppingBag, MessageSquare, User, Play, Clock, CheckCircle2, AlertCircle, Send, Plus, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { Course, DigitalFile, Order, Ticket } from '../types';
import { store } from '../services/store';

interface StudentPanelProps {
  onOpenPlayer: (course: Course) => void;
  onOpenInvoice: (order: Order) => void;
  onBackToHome: () => void;
}

export const StudentPanel: React.FC<StudentPanelProps> = ({
  onOpenPlayer,
  onOpenInvoice,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'files' | 'orders' | 'tickets' | 'profile'>('courses');
  const [currentUser, setCurrentUser] = useState(store.currentUser);
  const [courses, setCourses] = useState<Course[]>(store.courses);
  const [files, setFiles] = useState<DigitalFile[]>(store.files);
  const [orders, setOrders] = useState<Order[]>(store.orders);
  const [tickets, setTickets] = useState<Ticket[]>(store.tickets);

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
    });
  }, []);

  const enrolledCourses = courses.filter(c => currentUser.enrolledCourseIds.includes(c.id));
  const purchasedFiles = files.filter(f => currentUser.purchasedFileIds.includes(f.id));
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  const userTickets = tickets.filter(t => t.userId === currentUser.id);

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
                  <p className="text-xs text-slate-500 mt-0.5">برای مشاهده ویدیوها و دانلود فایل‌ها روی هر دوره کلیک کنید.</p>
                </div>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <BookOpen className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">شما هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="border border-slate-200 rounded-2xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={course.image}
                          alt={course.title}
                          referrerPolicy="no-referrer"
                          className="w-20 h-16 rounded-xl object-cover shrink-0"
                        />
                        <div>
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

                      <button
                        onClick={() => onOpenPlayer(course)}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>پخش جلسات و دانلود تمرین‌ها</span>
                      </button>
                    </div>
                  ))}
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
                  <p className="text-xs text-slate-500 mt-0.5">لینک‌های دانلود مستقیم با پهنای باند اختصاصی و آخرین آپدیت‌ها.</p>
                </div>
              </div>

              {purchasedFiles.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Download className="w-12 h-12 stroke-1 mx-auto mb-2 text-slate-300" />
                  <p className="text-sm">هنوز فایلی خریداری نکرده‌اید.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {purchasedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{file.title}</h4>
                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                          <span className="font-mono">حجم: {file.fileSize}</span>
                          <span>·</span>
                          <span className="font-mono">فرمت: {file.fileFormat}</span>
                          <span>·</span>
                          <span className="font-mono">نسخه: {file.version}</span>
                        </div>
                      </div>

                      <a
                        href={file.downloadUrl}
                        download
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`دانلود فایل «${file.title}» آغاز شد.`);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>دانلود مستقیم فایل ({file.fileSize})</span>
                      </a>
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
        </div>
      </div>
    </div>
  );
};
