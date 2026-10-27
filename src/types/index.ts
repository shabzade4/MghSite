export type CourseCategory = 'network' | 'web' | 'security' | 'devops' | 'hardware';
export type FileCategory = 'topology' | 'scripts' | 'templates' | 'cheatsheet' | 'ebook';
export type UserRole = 'admin' | 'student' | 'instructor';
export type OrderStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TicketStatus = 'open' | 'answered' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketDepartment = 'technical' | 'financial' | 'courses' | 'general';
export type NavigationTab = 'home' | 'courses' | 'files' | 'blog' | 'roadmaps' | 'about' | 'contact' | 'terms' | 'sitemap' | 'student-panel' | 'admin-panel' | 'organic-shop' | 'projects-services';

export type ProjectServiceCategory = 
  | 'software-install'      // نصب و پیکربندی نرم‌افزارهای تخصصی و کاربردی
  | 'os-setup'             // نصب و راه‌اندازی سیستم‌عامل (ویندوز کلاینت/سرور، لینوکس، مک)
  | 'virtualization'       // مجازی‌سازی سرور و دیتاسنتر (VMware ESXi, vCenter, Proxmox, Hyper-V)
  | 'passive-network'      // پسیو شبکه (کابل‌کشی، رک‌بندی، فیبر نوری، کی‌پچ، داکت‌کشی)
  | 'active-network'       // اکتیو شبکه (کانفیگ سیسکو، میکروتیک، فورتی‌گیت، روتینگ، سویچینگ، فایروال، وی‌پی‌ان)
  | 'web-design'           // طراحی وب‌سایت (شرکتی، فروشگاهی، پورتال سازمانی، ری‌اکت، نکس، وردپرس)
  | 'custom-programming'   // طراحی و برنامه‌نویسی نرم‌افزار، وب‌اپلیکیشن، ربات و اسکریپت‌های اتوماسیون
  | 'it-support';          // پشتیبانی، نگهداری و عیب‌یابی دوره‌ای IT

export type ProjectUrgency = 'normal' | 'urgent' | 'enterprise';
export type ProjectStatus = 'pending' | 'reviewing' | 'consultation' | 'approved' | 'in_progress' | 'completed' | 'cancelled';

export interface ProjectRequest {
  id: string;
  trackingCode: string; // e.g. PRJ-1403-8942
  title: string;
  category: ProjectServiceCategory;
  categoryTitle: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  organization?: string;
  description: string;
  urgency: ProjectUrgency;
  budgetRange?: string;
  location?: string;
  preferredContact: 'phone' | 'telegram' | 'whatsapp' | 'email';
  status: ProjectStatus;
  statusNotes?: string;
  estimatedDelivery?: string;
  assignedEngineer?: string;
  createdAt: string;
  updatedAt?: string;
  adminNotes?: string;
}

export interface ITServiceItem {
  id: string;
  category: ProjectServiceCategory;
  title: string;
  englishTitle: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  techStack: string[];
  estimatedDelivery: string;
  pricingGuide: string;
  isPopular?: boolean;
}


export interface VideoNote {
  id: string;
  courseId: string;
  episodeId: string;
  timestampSeconds: number;
  timestampFormatted: string;
  noteText: string;
  createdAt: string;
}

export interface Episode {
  id: string;
  title: string;
  duration: string; // e.g. "18:45"
  videoUrl: string;
  isFreePreview: boolean;
  notes?: string;
  attachmentFileName?: string;
  attachmentSize?: string;
}

export interface Season {
  id: string;
  title: string;
  episodes: Episode[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: CourseCategory;
  level: 'مقدماتی' | 'متوسط' | 'پیشرفته' | 'جامع';
  price: number; // Toman
  originalPrice: number; // Toman
  image: string;
  instructor: Instructor;
  durationHours: number;
  episodesCount: number;
  studentsCount: number;
  rating: number;
  seasons: Season[];
  prerequisites: string[];
  whatYouWillLearn: string[];
  tags?: string[];
  galleryImages?: string[];
  isFeatured?: boolean;
  updatedAt: string;
}

export interface DigitalFile {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: FileCategory;
  price: number; // Toman
  originalPrice: number;
  image: string;
  fileFormat: string; // e.g. "PKT & PDF", "ZIP / Python", "React Tailwind"
  fileSize: string; // e.g. "45 MB"
  version: string;
  downloadsCount: number;
  downloadUrl: string;
  features: string[];
  tags?: string[];
  galleryImages?: string[];
  isFeatured?: boolean;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  enrolledCourseIds: string[];
  purchasedFileIds: string[];
  completedEpisodeIds: string[];
  certificates: Certificate[];
  walletBalance: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  type: 'course' | 'file';
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  fileFormat?: string;
}

export interface OrderItem {
  id: string;
  type: 'course' | 'file';
  title: string;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  payableAmount: number;
  status: OrderStatus;
  gateway: 'zarinpal' | 'idpay' | 'wallet';
  refId: string;
  cardNumber?: string;
  createdAt: string;
}

export interface TicketMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  department: TicketDepartment;
  priority: TicketPriority;
  status: TicketStatus;
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export type PostType = 'article' | 'announcement' | 'news' | 'event';

export interface Article {
  id: string;
  title: string;
  slug: string;
  type: PostType; // 'article' | 'announcement' | 'news' | 'event'
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  coverImage: string;
  eventDate?: string;
  eventLocation?: string;
  isPinned?: boolean;
  tags?: string[];
  galleryImages?: string[];
  createdAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  fileName: string;
  fileType: 'image' | 'video' | 'document' | 'archive';
  url: string;
  size: string;
  dimensions?: string;
  altText?: string;
  tags: string[];
  uploadedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export type ColorTheme = 'indigo' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'violet';
export type AdminTheme = 'classic-dark' | 'modern-light' | 'slate-midnight' | 'royal-indigo' | 'emerald-terminal';

export interface SidebarWidgetsConfig {
  search: boolean;
  categories: boolean;
  recentPosts: boolean;
  featuredCourse: boolean;
  popularTags: boolean;
  customLinks: boolean;
  newsletter: boolean;
}

export interface SidebarCustomLink {
  id: string;
  title: string;
  url: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  workHours: string;
  zarinpalMerchantId: string;
  isGatewaySandbox: boolean;
  telegramUsername: string;
  instagramUsername: string;
  adminUsername: string;
  adminPassword: string;
  aboutText: string;
  termsText: string;
  colorTheme?: ColorTheme;
  adminTheme?: AdminTheme;
  showBlogSidebar?: boolean;
  sidebarPosition?: 'right' | 'left';
  sidebarWidgets?: Partial<SidebarWidgetsConfig>;
  sidebarCustomLinks?: SidebarCustomLink[];
  sidebarBannerTitle?: string;
  sidebarBannerSubtitle?: string;
  sidebarBannerLink?: string;
  sidebarBannerImage?: string;
}

export interface Review {
  id: string;
  courseId: string;
  courseTitle: string;
  userName: string;
  userAvatar: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  timeLimitMinutes: number;
  passScorePercent: number;
  questions: QuizQuestion[];
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  userName: string;
  userPhone: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  gradeScore: number;
  verificationCode: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ======================= ORGANIC PRODUCTS & DRIED FRUITS STORE =======================
export type OrganicCategory = 'nuts' | 'dried-fruits' | 'dried_fruits' | 'legumes' | 'herbs-honey' | 'honey_herbs' | 'seasonal';
export type OrganicGrade = 'super_extra' | 'grade_1' | 'standard_organic' | 'ممتاز صادراتی' | 'درجه یک اعلا' | 'محلی دست‌چین' | 'ارگانیک وحشی کوهستان';

export interface OrganicPackageOption {
  id?: string;
  weightLabel: string; // e.g. "۵۰۰ گرم", "۱ کیلوگرم", "۳ کیلوگرم"
  weightGrams?: number;
  weightInGrams?: number;
  price: number; // Toman
  originalPrice?: number;
  discountPrice?: number;
  inStock?: boolean;
}

export interface OrganicNutritionalFacts {
  servingSize: string; // e.g. "۱۰۰ گرم" یا "۳۰ گرم (یک مشت)"
  calories: number; // kcal
  proteinGrams: number; // گرم پروتئین
  carbsGrams: number; // گرم کربوهیدرات
  fiberGrams: number; // گرم فیبر رژیمی
  fatGrams: number; // گرم چربی کل
  saturatedFatGrams?: number;
  sugarGrams?: number;
  sodiumMg?: number;
  ironMg?: number;
  calciumMg?: number;
  potassiumMg?: number;
  magnesiumMg?: number;
  zincMg?: number;
  vitaminC_Mg?: number;
  vitaminE_Mg?: number;
  omega3_Grams?: number;
  highlights?: string[];
}

export interface OrganicProduct {
  id: string;
  name?: string;
  title?: string;
  slug?: string;
  category: OrganicCategory;
  grade: OrganicGrade | string;
  type?: string;
  processingType?: string;
  description: string;
  shortDescription?: string;
  image: string;
  galleryImages?: string[];
  packageOptions: OrganicPackageOption[];
  basePrice?: number;
  originalBasePrice?: number;
  unit?: string;
  stockQuantityKg?: number;
  stockKg?: number;
  lowStockThresholdKg?: number;
  harvestYear: string;
  originRegion: string;
  colorAndAppearance?: string;
  colorAppearance?: string;
  dimensionsAndSize?: string;
  grainSize?: string;
  properties?: string[];
  healthBenefits?: string[];
  storageCondition?: string;
  nutritionalFacts?: OrganicNutritionalFacts;
  tags?: string[];
  isFeatured?: boolean;
  isAvailable?: boolean;
  rating?: number;
  reviewsCount?: number;
  farmCost?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrganicCartItem {
  id: string;
  product?: OrganicProduct;
  selectedPackage?: OrganicPackageOption;
  productId?: string;
  packageOptionId?: string;
  title?: string;
  name?: string;
  weightLabel?: string;
  weightGrams?: number;
  weightInGrams?: number;
  unitPrice?: number;
  quantity: number;
  image?: string;
  grade?: OrganicGrade | string;
  category?: OrganicCategory;
}

export type OrganicShippingMethodId = 'post_pishtaz' | 'tipax' | 'express_courier' | 'barbari' | 'special_coldpack';

export interface OrganicShippingMethod {
  id: OrganicShippingMethodId;
  title: string;
  cost?: number;
  price?: number;
  estimatedDelivery?: string;
  description: string;
  badge?: string;
  isColdChain?: boolean;
}

export type OrganicPaymentMethod = 'online' | 'card_to_card' | 'cod' | 'wallet';

export interface OrganicOrderItem {
  productId: string;
  packageOptionId?: string;
  title?: string;
  productName?: string;
  category?: OrganicCategory;
  grade?: OrganicGrade | string;
  packageLabel?: string;
  weightLabel?: string;
  weightGrams?: number;
  weightInGrams?: number;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

export interface OrganicOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  province?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  customerProvince?: string;
  customerCity?: string;
  customerPostalCode?: string;
  customerAddress?: string;
  notes?: string;
  items: OrganicOrderItem[];
  subtotal: number;
  shippingCost: number;
  shippingMethod?: OrganicShippingMethodId;
  shippingTitle?: string;
  totalWeightInGrams?: number;
  discountAmount?: number;
  totalPayable?: number;
  totalAmount?: number;
  shippingMethodId?: OrganicShippingMethodId;
  shippingMethodName?: string;
  paymentMethod: OrganicPaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed';
  status?: 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  shippingStatus?: 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  trackingCode?: string;
  cardRefNumber?: string;
  isSettledWithFarm?: boolean;
  farmCost?: number;
  profitAmount?: number;
  createdAt: string;
}

export interface OrganicSettlement {
  id: string;
  settlementNumber?: string;
  farmName?: string;
  farmerName: string;
  farmerPhone: string;
  farmerRegion?: string;
  farmerShaba?: string;
  farmerBank?: string;
  bankAccount?: string;
  shabaNumber?: string;
  suppliedProducts?: string;
  totalSuppliedKg?: number;
  unitCostPerKg?: number;
  totalAmountDue?: number;
  amount?: number;
  orderIds?: string[];
  productSummary?: string;
  status: 'settled' | 'pending' | 'completed' | 'processing';
  settlementDate?: string;
  referenceNumber?: string;
  trackingCode?: string;
  note?: string;
  createdAt?: string;
}

export interface OrganicProductReview {
  id: string;
  productId: string;
  productTitle?: string;
  userName: string;
  userPhone?: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt: string;
  isVerifiedBuyer: boolean;
  purchasedPackage?: string;
  orderNumber?: string;
  recommended?: boolean;
  likesCount?: number;
}

export interface OrganicStockAlertConfig {
  enableSmsAlerts: boolean;
  enableEmailAlerts: boolean;
  adminPhoneNumbers: string;
  adminEmailAddresses: string;
  defaultThresholdKg: number;
  smsProvider: 'kavenegar' | 'melipayamak' | 'farazsms' | 'ghasedak';
  smsApiKey?: string;
  smsLineNumber?: string;
  autoSendOnOrder: boolean;
  smsTemplate: string;
  emailSubjectTemplate: string;
}

export interface OrganicStockAlertLog {
  id: string;
  productId: string;
  productTitle: string;
  currentStockKg: number;
  thresholdKg: number;
  channel: 'sms' | 'email' | 'both';
  recipient: string;
  status: 'sent' | 'pending' | 'failed';
  messageText: string;
  timestamp: string;
}

export type FAQCategory = 'all' | 'projects-services' | 'organic-products' | 'academy';

export interface FAQItem {
  id: string;
  category: 'projects-services' | 'organic-products' | 'academy';
  question: string;
  answer: string;
  tags: string[];
  actionLabel?: string;
  actionTab?: NavigationTab;
  highlight?: boolean;
}

export type TestimonialCategory = 'all' | 'project-clients' | 'students' | 'organic-buyers';

export interface TestimonialItem {
  id: string;
  category: 'project-clients' | 'students' | 'organic-buyers';
  name: string;
  role: string;
  organization?: string;
  avatar: string;
  rating: number;
  quote: string;
  projectOrSubject: string;
  date: string;
  verified: boolean;
  verifiedBadgeLabel: string;
  tags?: string[];
  helpfulCount?: number;
  featured?: boolean;
}

export type NewsletterTopic = 'tech_updates' | 'organic_offers' | 'course_discounts';

export interface NewsletterSubscription {
  id: string;
  email: string;
  name?: string;
  topics: NewsletterTopic[];
  createdAt: string;
}



