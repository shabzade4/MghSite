export type CourseCategory = 'network' | 'web' | 'security' | 'devops' | 'hardware';
export type FileCategory = 'topology' | 'scripts' | 'templates' | 'cheatsheet' | 'ebook';
export type UserRole = 'admin' | 'student' | 'instructor';
export type OrderStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TicketStatus = 'open' | 'answered' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketDepartment = 'technical' | 'financial' | 'courses' | 'general';

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
  createdAt: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  zarinpalMerchantId: string;
  isGatewaySandbox: boolean;
  supabaseUrl: string;
  supabaseAnonKey: string;
  telegramUsername: string;
  instagramUsername: string;
}
