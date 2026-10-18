import {
  Course, DigitalFile, User, Order, Ticket, Article, SiteSettings,
  CartItem, MediaItem, ContactMessage, Review, Coupon, CourseQuiz, Certificate, ToastMessage, VideoNote
} from '../types';
import { getSupabaseClient } from './supabase';

// Generated asset image paths
const HERO_IMAGE = '/src/assets/images/hero_tech_academy_1791894522996.jpg';
const NETWORK_COURSE_IMAGE = '/src/assets/images/course_network_engineering_1791894523440.jpg';
const WEB_COURSE_IMAGE = '/src/assets/images/course_web_development_1791894523816.jpg';
const DIGITAL_PACK_IMAGE = '/src/assets/images/download_network_pack_1791894524481.jpg';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ccna-200-301',
    title: 'دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
    slug: 'cisco-ccna-200-301',
    shortDescription: 'آموزش صفر تا صد سوئیچینگ، روتینگ، VLAN، OSPF، امنیت شبکه و اتوماسیون با سناریوهای عملی پکت‌تریسر و EVE-NG',
    description: 'این دوره به عنوان معتبرترین مدرک ورود به دنیای حرفه‌ای زیرساخت شبکه طراحی شده است. از مفاهیم پایه لایه‌های OSI و TCP/IP گرفته تا پیکربندی پروتکل‌های پیشرفته مسیریابی، سگمنت‌بندی شبکه، امنیت پورت‌ها، دسترسی بی‌سیم و مفاهیم مقدماتی Network Automation و Python در این آموزش پوشش داده شده است.',
    category: 'network',
    level: 'جامع',
    price: 1850000,
    originalPrice: 2600000,
    image: NETWORK_COURSE_IMAGE,
    instructor: {
      id: 'inst-1',
      name: 'مهندس محمدرضا قاسمی',
      title: 'مدرس ارشد سیسکو و مشاور زیرساخت دیتاسنتر (CCNP Enterprise / CCIE Candidate)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'بیش از ۱۲ سال سابقه طراحی و راه‌اندازی شبکه‌های سازمانی و تدریس دوره‌های تخصصی شبکه در سازمان‌های دولتی و خصوصی.'
    },
    durationHours: 48,
    episodesCount: 64,
    studentsCount: 1420,
    rating: 4.95,
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۷/۱۵',
    prerequisites: ['آشنایی مقدماتی با مفاهیم کامپیوتر (ICDL یا Network+)'],
    whatYouWillLearn: [
      'تسلط کامل بر معماری شبکه‌های LAN و WAN و آدرس‌دهی IPv4 و IPv6',
      'پیکربندی سوئیچ‌های سیسکو، VLAN، Trunking، STP و EtherChannel',
      'مسیریابی استاتیک و پروتکل داینامیک OSPFv2 و OSPFv3',
      'پیاده‌سازی امنیت لایه ۲، ACL، Port Security و DHCP Snooping',
      'آشنایی با ابزارهای مانیتورینگ Syslog، SNMP، NTP و اتوماسیون با Python'
    ],
    seasons: [
      {
        id: 's-1',
        title: 'فصل اول: مقدمه و مبانی شبکه‌های کامپیوتری',
        episodes: [
          {
            id: 'ep-1-1',
            title: 'جلسه ۱: معرفی دوره CCNA و نقشه راه تخصص شبکه',
            duration: '۲۴:۳۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            notes: 'در این جلسه سرفصل‌های آزمون جدید CCNA 200-301 و روش شبیه‌سازی سناریوها بررسی می‌شود.',
            attachmentFileName: 'CCNA_Exam_Topics_Blueprint.pdf',
            attachmentSize: '۲.۴ مگابایت'
          },
          {
            id: 'ep-1-2',
            title: 'جلسه ۲: مدل مرجع OSI در برابر TCP/IP با تحلیل بسته‌ها در Wireshark',
            duration: '۳۶:۱۵',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            notes: 'کالبدشکافی هدر بسته‌های داده و آنالیز پروتکل‌های مختلف در وایرشارک.',
            attachmentFileName: 'OSI_Wireshark_Filters_CheatSheet.pdf',
            attachmentSize: '۱.۸ مگابایت'
          },
          {
            id: 'ep-1-3',
            title: 'جلسه ۳: آدرس‌دهی IPv4 و تکنیک‌های Subnetting و VLSM به زبان ساده',
            duration: '۴۸:۵۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            isFreePreview: false,
            notes: 'فرمول‌های سریع محاسبات ساب‌نتینگ و حل ۵۰ مسئله کاربردی.'
          }
        ]
      },
      {
        id: 's-2',
        title: 'فصل دوم: سوئیچینگ و پیکربندی سوئیچ‌های سیسکو',
        episodes: [
          {
            id: 'ep-2-1',
            title: 'جلسه ۴: پیکربندی اولیه سوئیچ کاتالیست سیسکو و محیط IOS CLI',
            duration: '۳۲:۱۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            isFreePreview: false
          },
          {
            id: 'ep-2-2',
            title: 'جلسه ۵: پیاده‌سازی عملی VLAN و ترانک با پروتکل 802.1Q',
            duration: '۴۲:۲۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            isFreePreview: false,
            attachmentFileName: 'Lab_02_VLAN_Trunking.pkt',
            attachmentSize: '۳.۱ مگابایت'
          }
        ]
      }
    ]
  },
  {
    id: 'course-react-fullstack',
    title: 'دوره جامع آموزش طراحی سایت با React 19، Next.js و Tailwind CSS',
    slug: 'react-nextjs-web-development',
    shortDescription: 'آموزش صفر تا صد طراحی سایت مدرن، فرانت‌اند و اتصال به بک‌اند با ساخت پروژه‌های واقعی فروشگاهی و پنل ادمین',
    description: 'اگر می‌خواهید به عنوان توسعه‌دهنده وب وارد بازار کار داخلی یا بین‌المللی شوید، این دوره کامل‌ترین پکیج یادگیری است. آموزش گام به گام جاوااسکریپت مدرن ES6+، تایپ‌اسکریپت، ری‌اکت ۱۹، فریمورک Next.js 15 با App Router، استایل‌دهی با Tailwind CSS، و اتصال به دیتابیس Supabase و REST API.',
    category: 'web',
    level: 'جامع',
    price: 1950000,
    originalPrice: 2800000,
    image: WEB_COURSE_IMAGE,
    instructor: {
      id: 'inst-2',
      name: 'مهندس آرش سپهری',
      title: 'سینیور دولوپر فرانت‌اند و مدرس رسمی آکادمی وب پارس نت',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
      bio: 'توسعه‌دهنده فول‌استک با سابقه پیاده‌سازی بیش از ۴۰ پروژه وب در مقیاس ملی و منتور بیش از ۵۰۰ دانشجو.'
    },
    durationHours: 52,
    episodesCount: 75,
    studentsCount: 2180,
    rating: 4.98,
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۷/۱۸',
    prerequisites: ['علاقه‌مندی به برنامه‌نویسی و وب (بدون نیاز به پیش‌نیاز قبلی)'],
    whatYouWillLearn: [
      'ساخت وب‌سایت‌های مدرن ریسپانسیو با Tailwind CSS و React 19',
      'توسعه سیستم‌های احراز هویت، سبد خرید، درگاه پرداخت و پنل مدیریت',
      'تسلط بر Server Components و Server Actions در فریمورک Next.js 15',
      'پیاده‌سازی پایگاه داده ریل‌تایم با Supabase و PostgreSQL',
      'دیپلوی رایگان پروژه‌ها روی Vercel و تنظیم دامنه اختصاصی'
    ],
    seasons: [
      {
        id: 'ws-1',
        title: 'فصل اول: پایه‌های فرانت‌اند مدرن و اکوسیستم React',
        episodes: [
          {
            id: 'wep-1-1',
            title: 'جلسه ۱: آشنایی با ساختار وب مدرن و راه‌اندازی ابزارهای کدنویسی',
            duration: '۲۱:۱۵',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            notes: 'نصب VS Code، افزونه‌های ضروری، Node.js و Git برای شروع کار حرفه‌ای.',
            attachmentFileName: 'Dev_Environment_Setup_Guide.pdf',
            attachmentSize: '۱.۲ مگابایت'
          },
          {
            id: 'wep-1-2',
            title: 'جلسه ۲: کامپوننت‌ها، هوک‌های React 19 و مدیریت استیت',
            duration: '۳۸:۰۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            isFreePreview: true,
            attachmentFileName: 'React19_Cheatsheet_Code.zip',
            attachmentSize: '۴.۸ مگابایت'
          }
        ]
      }
    ]
  },
  {
    id: 'course-mikrotik-mtcna',
    title: 'دوره کاربردی مهندسی شبکه میکروتیک (MikroTik MTCNA + MTCRE)',
    slug: 'mikrotik-mtcna-routing-switching',
    shortDescription: 'پیکربندی روتربوردهای میکروتیک، فایروال، مدیریت پهنای باند، VPN، هات‌اسپات و مسیریابی پیشرفته در RouterOS v7',
    description: 'روترها و تجهیزات میکروتیک به دلیل قیمت اقتصادی و امکانات فوق‌العاده در اکثر شرکت‌ها و سازمان‌های ایران مورد استفاده قرار می‌گیرند. در این دوره کاربردی، کار با سیستم‌عامل RouterOS نسخه ۷، فایروال فیلترینگ، مانگل، کنترل پهنای باند با Queue، انواع تانل‌ها و راه‌اندازی اینترنت سازمانی آموزش داده می‌شود.',
    category: 'network',
    level: 'متوسط',
    price: 1350000,
    originalPrice: 1900000,
    image: HERO_IMAGE,
    instructor: {
      id: 'inst-1',
      name: 'مهندس محمدرضا قاسمی',
      title: 'مدرس ارشد شبکه و مشاور زیرساخت دیتاسنتر',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'متخصص مجاز میکروتیک (MTCNA, MTCRE, MTCWE, MTCTCE).'
    },
    durationHours: 32,
    episodesCount: 42,
    studentsCount: 960,
    rating: 4.91,
    isFeatured: false,
    updatedAt: '۱۴۰۳/۰۶/۲۹',
    prerequisites: ['مفاهیم پایه شبکه (Network+ یا CCNA)'],
    whatYouWillLearn: [
      'کار حرفه‌ای با نرم‌افزار Winbox و دستورات کنسول RouterOS',
      'راه‌اندازی سرور DHCP، DNS، NAT و اشتراک اینترنت در شبکه',
      'ایجاد رول‌های فایروال جهت جلوگیری از حملات Brute Force و اسکن پورت',
      'پیاده‌سازی اکانتینگ کاربران با Hotspot و User Manager',
      'راه‌اندازی تانل‌های امن WireGuard، IKEv2، SSTP و EoIP'
    ],
    seasons: [
      {
        id: 'ms-1',
        title: 'فصل اول: آشنایی با RouterOS و مفاهیم اولیه',
        episodes: [
          {
            id: 'mep-1-1',
            title: 'جلسه ۱: نصب میکروتیک روی VMware و اتصال از طریق Winbox',
            duration: '۲۶:۴۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true,
            attachmentFileName: 'MikroTik_CHR_v7_OVA.zip',
            attachmentSize: '۶۵ مگابایت'
          }
        ]
      }
    ]
  },
  {
    id: 'course-linux-devops',
    title: 'دوره جامع لینوکس برای مدیران شبکه و متخصصان دواپس (LPIC-1 & Docker)',
    slug: 'linux-lpic1-devops-engineers',
    shortDescription: 'آموزش مدیریت سرورهای لینوکس Ubuntu و RHEL، خط فرمان بش، اسکریپت‌نویسی، امنیت سرور و کانتینرسازی با داکر',
    description: 'ستون فقرات تمام سرورها و زیرساخت‌های ابری دنیا سیستم‌عامل لینوکس است. در این دوره، با تسلط بر محیط Shell، مدیریت پکیج‌ها، پروسه‌ها، مجوزها، فایروال iptables و UFW، کانفیگ وب‌سرورهای Nginx و ایجاد کانتینرهای Docker آماده ورود به بازار کار دواپس و ادمین شبکه شوید.',
    category: 'devops',
    level: 'جامع',
    price: 1650000,
    originalPrice: 2200000,
    image: NETWORK_COURSE_IMAGE,
    instructor: {
      id: 'inst-3',
      name: 'مهندس نوید رادمنش',
      title: 'مهندس ارشد DevOps و معمار زیرساخت‌های ابری',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      bio: 'بیش از ۱۰ سال سابقه در استقرار کلاسترهای کوبرنتیز و خودکارسازی سرورهای ابری.'
    },
    durationHours: 36,
    episodesCount: 48,
    studentsCount: 1150,
    rating: 4.93,
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۷/۱۰',
    prerequisites: ['آشنایی مقدماتی با کامپیوتر'],
    whatYouWillLearn: [
      'دستورات کاربردی لینوکس، مدیریت فایل و فیلترهای متن (grep, sed, awk)',
      'اسکریپت‌نویسی Bash برای خودکارسازی تسک‌های روزمره شبکه و بکاپ',
      'مدیریت سرویس‌های شبکه شامل SSH، DNS، DHCP و وب‌سرور Nginx',
      'مفاهیم کانتینرسازی با Docker، نوشتن Dockerfile و اجرای Docker Compose',
      'سخت‌سازی امنیتی سرورهای لینوکسی و مانیتورینگ منابع سیستم'
    ],
    seasons: [
      {
        id: 'ls-1',
        title: 'فصل اول: ورود به دنیای لینوکس و تسلط بر شل',
        episodes: [
          {
            id: 'lep-1-1',
            title: 'جلسه ۱: تاریخچه لینوکس و انتخاب توزیع مناسب برای سرور',
            duration: '۲۲:۵۰',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            isFreePreview: true
          }
        ]
      }
    ]
  }
];

export const INITIAL_FILES: DigitalFile[] = [
  {
    id: 'file-cisco-labs-bundle',
    title: 'پکیج ۵۰ سناریوی عملی سیسکو پکت تریسر (Cisco Packet Tracer Labs)',
    slug: '50-cisco-packet-tracer-labs-pack',
    description: 'مجموعه کامل ۵۰ سناریوی شبیه‌سازی شده عملی برای آموزش CCNA و CCNP شامل فایل‌های PKT آماده و پاسخ کامل سناریوها. پوشش کامل مباحث VLAN, VTP, OSPF, EIGRP, BGP, NAT, ACL, DHCP Snooping و ریداندنسی HSRP همراه با راهنمای قدم‌به‌قدم PDF به زبان فارسی.',
    category: 'topology',
    price: 290000,
    originalPrice: 450000,
    image: DIGITAL_PACK_IMAGE,
    fileFormat: 'ZIP شامل ۵۰ فایل PKT + کتابچه راهنمای PDF',
    fileSize: '۱۴۵ مگابایت',
    version: '۳.۴',
    downloadsCount: 840,
    downloadUrl: 'https://parsnet-academy.com/downloads/cisco-50-labs-bundle-v3.4.zip',
    features: [
      'شامل ۵۰ فایل پروژه با فرمت اختصاصی Cisco Packet Tracer',
      'راهنمای تصویری گام به گام برای هر سناریو به صورت PDF فارسی',
      'پوشش سناریوهای شبکه سازمانی کوچک، متوسط و چندشعبه‌ای',
      'تست شده روی نسخه‌های Packet Tracer 8.0 و جدیدتر'
    ],
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۷/۰۸'
  },
  {
    id: 'file-mikrotik-security-scripts',
    title: 'بسته اسکریپت‌های امنیتی و سخت‌سازی روترهای میکروتیک (MikroTik Security Pack)',
    slug: 'mikrotik-security-hardening-scripts',
    description: 'مجموعه بیش از ۳۰ اسکریپت آماده و رول فایروال استاندارد برای ایمن‌سازی کامل روترهای میکروتیک. محافظت در برابر حملات DDOS، مسدودسازی اسکنرهای پورت، بلاک کردن پورت‌های ناامن، سیستم هشدار ورود غیرمجاز از طریق ربات تلگرام و بکاپ‌گیری خودکار روزانه.',
    category: 'scripts',
    price: 340000,
    originalPrice: 520000,
    image: DIGITAL_PACK_IMAGE,
    fileFormat: 'اسکریپت‌های RSC + راهنمای پیاده‌سازی',
    fileSize: '۱۸ مگابایت',
    version: '۲.۱',
    downloadsCount: 620,
    downloadUrl: 'https://parsnet-academy.com/downloads/mikrotik-firewall-scripts-pack.zip',
    features: [
      'فایروال پیشرفته جهت دفع حملات Brute Force روی پورت‌های SSH و Winbox',
      'اسکریپت ارسال اعلان لاگین به بات تلگرام با آی‌پی ورود',
      'بکاپ‌گیری خودکار هفتگی و ارسال ایمیل رمزنگاری‌شده',
      'سازگار با تمام نسخه‌های RouterOS 6 و RouterOS 7'
    ],
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۶/۲۵'
  },
  {
    id: 'file-python-network-automation',
    title: 'کدهای پایتون برای خودکارسازی کانفیگ تجهیزات شبکه (Netmiko & NAPALM)',
    slug: 'python-network-automation-scripts-toolkit',
    description: 'تولکیت کامل برنامه‌نویسی پایتون برای مدیران شبکه با هدف کانفیگ همزمان صدها سوئیچ و روتر با کتابخانه‌های قدرتمند Netmiko و Paramiko و تولید گزارش موجودی تجهیزات شبکه در قالب فایل Excel.',
    category: 'scripts',
    price: 390000,
    originalPrice: 590000,
    image: DIGITAL_PACK_IMAGE,
    fileFormat: 'سورس کدهای Python (.py) + فایل نیازمندی‌ها + ویدیو آموزشی ۳۰ دقیقه‌ای',
    fileSize: '۸۵ مگابایت',
    version: '۱.۸',
    downloadsCount: 475,
    downloadUrl: 'https://parsnet-academy.com/downloads/python-network-automation-toolkit.zip',
    features: [
      'اسکریپت بکاپ‌گیری همزمان از ۱۰۰+ سوئیچ در کمتر از ۲ دقیقه',
      'اسکریپت اعمال VLAN و تغییر رمز عبور به صورت گروهی',
      'سیستم مانیتورینگ سلامت پورت‌ها و لینک‌های آپ‌لینک',
      'راهنمای تصویری نصب محیط مجازی و کتابخانه‌ها'
    ],
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۷/۰۱'
  },
  {
    id: 'file-fullstack-web-template',
    title: 'قالب اختصاصی آکادمی آموزشی و فروش فایل (Next.js 15 + Tailwind + Supabase)',
    slug: 'lms-digital-store-source-code-template',
    description: 'سورس کد کامل یک پلتفرم فروش دوره‌های آموزشی و فایل‌های دیجیتال طراحی شده با React 19، Next.js 15، تیلویند CSS و اتصال کامل به Supabase. دارای پنل مدیریت، سبد خرید، کیف پول، اتصال به درگاه پرداخت زرین‌پال و طراحی کاملاً راست‌چین و ریسپانسیو.',
    category: 'templates',
    price: 790000,
    originalPrice: 1200000,
    image: WEB_COURSE_IMAGE,
    fileFormat: 'سورس کامل پروژه TypeScript / React / Next.js',
    fileSize: '۲۵ مگابایت',
    version: '۴.۰',
    downloadsCount: 390,
    downloadUrl: 'https://parsnet-academy.com/downloads/lms-store-source-code-v4.zip',
    features: [
      'طراحی کاملاً مدرن بر پایه Tailwind CSS با انیمیشن‌های نرم',
      'پنل اختصاصی کاربر و پنل مدیریت وردپرسی',
      'اسکریپت ساخت دیتابیس Supabase به صورت آماده',
      'آماده دیپلوی فوری روی Vercel بدون نیاز به تنظیمات پیچیده'
    ],
    isFeatured: true,
    updatedAt: '۱۴۰۳/۰۷/۲۰'
  }
];

export const INITIAL_USER: User = {
  id: 'usr-student-demo',
  name: 'علی حسینی',
  email: 'ali.hosseini@example.com',
  phone: '09123456789',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  enrolledCourseIds: ['course-ccna-200-301'],
  purchasedFileIds: ['file-cisco-labs-bundle'],
  completedEpisodeIds: ['ep-1-1', 'ep-1-2'],
  certificates: [
    {
      id: 'cert-101',
      certificateNumber: 'PN-CERT-2024-8841',
      userId: 'usr-student-demo',
      userName: 'علی حسینی',
      userPhone: '09123456789',
      courseId: 'course-ccna-200-301',
      courseTitle: 'دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
      instructorName: 'مهندس محمدرضا قاسمی',
      issueDate: '۱۴۰۳/۰۷/۱۰',
      gradeScore: 96,
      verificationCode: 'CCNA-96-8841-VERIFIED'
    }
  ],
  walletBalance: 250000,
  createdAt: '۱۴۰۳/۰۱/۱۵'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'PN-98214',
    userId: 'usr-student-demo',
    userName: 'علی حسینی',
    userPhone: '09123456789',
    userEmail: 'ali.hosseini@example.com',
    items: [
      {
        id: 'course-ccna-200-301',
        type: 'course',
        title: 'دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
        price: 1850000
      },
      {
        id: 'file-cisco-labs-bundle',
        type: 'file',
        title: 'پکیج ۵۰ سناریوی عملی سیسکو پکت تریسر (Cisco Packet Tracer Labs)',
        price: 290000
      }
    ],
    totalAmount: 2140000,
    discountAmount: 0,
    payableAmount: 2140000,
    status: 'completed',
    gateway: 'zarinpal',
    refId: 'ZP-1084920491',
    cardNumber: '۶۰۳۷-۹۹**-****-۵۴۱۲',
    createdAt: '۱۴۰۳/۰۷/۱۰ - ساعت ۱۴:۳۵'
  },
  {
    id: 'ord-1002',
    orderNumber: 'PN-98215',
    userId: 'usr-guest-2',
    userName: 'رضا صابری',
    userPhone: '09351112233',
    userEmail: 'reza.saberi@example.com',
    items: [
      {
        id: 'file-mikrotik-security-scripts',
        type: 'file',
        title: 'بسته اسکریپت‌های امنیتی و سخت‌سازی روترهای میکروتیک',
        price: 340000
      }
    ],
    totalAmount: 340000,
    discountAmount: 0,
    payableAmount: 340000,
    status: 'completed',
    gateway: 'zarinpal',
    refId: 'ZP-1084920875',
    cardNumber: '۶۱۰۴-۳۳**-****-۹۸۲۰',
    createdAt: '۱۴۰۳/۰۷/۱۴ - ساعت ۱۰:۱۵'
  }
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt-201',
    ticketNumber: 'TCK-5041',
    userId: 'usr-student-demo',
    userName: 'علی حسینی',
    userEmail: 'ali.hosseini@example.com',
    subject: 'مشکل در اجرای سناریوی شماره ۱۲ پکت تریسر (VLAN Trunking)',
    department: 'courses',
    priority: 'medium',
    status: 'answered',
    createdAt: '۱۴۰۳/۰۷/۱۲ - ساعت ۱۶:۲۰',
    updatedAt: '۱۴۰۳/۰۷/۱۳ - ساعت ۰۹:۴۰',
    messages: [
      {
        id: 'msg-1',
        senderId: 'usr-student-demo',
        senderName: 'علی حسینی',
        senderRole: 'student',
        content: 'سلام و احترام، در جلسه ۵ هنگام فعال‌سازی مد ترانک روی پورت Gi0/1 سوئیچ ۲۹۶۰، پیام خطای encapsulation rejected دریافت می‌کنم. ممنون می‌شم راهنمایی بفرمایید.',
        createdAt: '۱۴۰۳/۰۷/۱۲ - ۱۶:۲۰'
      },
      {
        id: 'msg-2',
        senderId: 'admin-1',
        senderName: 'مهندس قاسمی (مدرس)',
        senderRole: 'admin',
        content: 'درود بر شما علی عزیز؛ روی سوئیچ‌های ۲۹۶۰ انکپسولیشن به صورت پیش‌فرض استاندارد 802.1Q است و نیاز به دستور switchport trunk encapsulation dot1q نیست. مستقیماً دستور switchport mode trunk را وارد کنید.',
        createdAt: '۱۴۰۳/۰۷/۱۳ - ۰۹:۴۰'
      }
    ]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'post-announcement-ccna-update',
    title: 'اطلاعیه مهم: به‌روزرسانی سرفصل‌های آزمون بین‌المللی Cisco CCNA و ارائه سناریوهای جدید',
    slug: 'ccna-200-301-new-blueprint-announcement',
    type: 'announcement',
    category: 'اطلاعیه آموزشی',
    isPinned: true,
    excerpt: 'کلیه دانشجویان دوره مهندسی شبکه سیسکو توجه فرمایند: آخرین تغییرات استانداردهای آزمون جدید سیسکو در بخش‌های اتوماسیون با پایتون و امنیت شبکه به پنل اضافه شد.',
    content: `با سلام و درود خدمت کلیه دانشجویان و همراهان آکادمی پارس‌نت،

به اطلاع می‌رساند شرکت سیسکو نسخه جدید سرفصل‌های رسمی آزمون CCNA 200-301 را به عنوان سرفصل مبنای ارزیابی اعلام نموده است. در همین راستا، سرفصل‌های زیر به پکیج دوره و سناریوهای پکت‌تریسر و EVE-NG افزوده گردید:
۱. مباحث پیشرفته‌تر REST APIs و تحلیل خروجی‌های JSON در تجهیزات Cisco IOS XE
۲. پیکربندی و عیب‌یابی مکانیزم‌های امنیتی لایه ۲ شامل DAI و IP Source Guard
۳. پیکربندی پروتکل‌های افزونگی FHRP و بهینه‌سازی مسیرها

تمامی دانشجویانی که قبلاً دوره را خریداری نموده‌اند، می‌توانند این آپدیت‌ها را به صورت کاملاً رایگان در پنل دانشجویی خود مشاهده و دانلود نمایند.`,
    author: 'آموزش و پژوهش پارس‌نت',
    readTime: '۴ دقیقه',
    coverImage: NETWORK_COURSE_IMAGE,
    tags: ['سیسکو', 'CCNA', 'اطلاعیه', 'آزمون بین‌المللی'],
    createdAt: '۱۴۰۳/۰۷/۱۵'
  },
  {
    id: 'post-webinar-mikrotik-cisco',
    title: 'وبینار تخصصی رایگان: معماری امن شبکه‌های سازمانی با فایروال میکروتیک و سوئیچ‌های سیسکو',
    slug: 'enterprise-network-security-webinar',
    type: 'event',
    category: 'رویداد و وبینار',
    isPinned: true,
    eventDate: 'جمعه ۲۸ مهرماه ۱۴۰۳ - ساعت ۱۸:۳۰ الی ۲۱:۰۰',
    eventLocation: 'اسکای‌روم آنلاین آکادمی پارس‌نت',
    excerpt: 'بررسی عملی توپولوژی‌های پرکاربرد زیرساخت شبکه در شرکت‌های ایرانی، پیاده‌سازی روتینگ افزونه و مسدودسازی نفوذ به سرورها.',
    content: `در این وبینار تخصصی ۳ ساعته، به بررسی عملی و کیس‌استادی‌های واقعی زیرساخت شبکه در سازمان‌ها می‌پردازیم:
- نحوه ترکیب روتربوردهای MikroTik به عنوان فایروال مرزی و سوئیچ‌های Cisco Catalyst در لایه Core/Distribution
- راه‌اندازی تانل‌های رمزنگاری‌شده امن برای شعب راه دور (Site-to-Site WireGuard & IPSec)
- روش‌های مقابله با حملات DDOS و محدودسازی پهنای باند کاربران
- پرسش و پاسخ زنده با مهندس قاسمی

حضور در این وبینار برای تمام اعضا و دانشجویان آکادمی رایگان می‌باشد. لینک ورود به وبینار ۳۰ دقیقه قبل از شروع برای ثبت‌نام‌کنندگان پیامک خواهد شد.`,
    author: 'مهندس محمدرضا قاسمی',
    readTime: 'رویداد زنده',
    coverImage: HERO_IMAGE,
    tags: ['وبینار', 'میکروتیک', 'فایروال', 'امنیت'],
    createdAt: '۱۴۰۳/۰۷/۱۸'
  },
  {
    id: 'post-tech-news-react-19',
    title: 'اخبار دنیای وب: انتشار رسمی React 19 با معماری کامپایلر هوشمند و Server Actions',
    slug: 'react-19-stable-release-tech-news',
    type: 'news',
    category: 'اخبار فناوری',
    excerpt: 'تیم توسعه فیسبوک نسخه نهایی و پایدار React 19 را با ارتقای شگفت‌انگیز سرعت رندر و حذف نیاز به useMemo و useCallback به شکل عمومی عرضه کرد.',
    content: `تیم مهندسی React نسخه رسمی و مورد انتظار React 19 را به صورت عمومی منتشر نمود. مهم‌ترین ویژگی‌های این نسخه عبارتند از:
۱. کامپایلر اتوماتیک ری‌اکت (React Compiler): دیگر نیازی به نوشتن دستی useMemo، useCallback و memo برای جلوگیری از رندرهای تکراری نیست.
۲. فرم اکشن‌ها (Server Actions & useActionState): مدیریت آسان فرم‌ها و ارسال داده به سرور با کمترین کد ممکن.
۳. پشتیبانی بومی از تگ‌های سند و استایل‌ها و استریمینگ هوشمند.

این تغییرات در جدیدترین آپدیت دوره آموزشی طراحی سایت آکادمی پارس‌نت نیز گنجانده شده است.`,
    author: 'مهندس آرش سپهری',
    readTime: '۵ دقیقه',
    coverImage: WEB_COURSE_IMAGE,
    tags: ['React 19', 'Next.js', 'اخبار', 'فرانت‌اند'],
    createdAt: '۱۴۰۳/۰۷/۱۲'
  },
  {
    id: 'art-1',
    title: 'راهنمای گام‌به‌گام پیاده‌سازی پروتکل OSPF در شبکه‌های سازمانی',
    slug: 'ospf-configuration-enterprise-networks',
    type: 'article',
    category: 'آموزش شبکه',
    excerpt: 'بررسی جامع نحوه کارکرد پروتکل داینامیک روتینگ OSPFv2، مفاهیم Area صفر، تایمرهای Hello و نحوه جلوگیری از لوپ در روتینگ.',
    content: `پروتکل OSPF (Open Shortest Path First) یکی از استانداردترین و قدرتمندترین پروتکل‌های مسیریابی داینامیک از نوع Link-State است که در اکثر شبکه‌های بزرگ اداری و دیتاسنترها به عنوان پروتکل اصلی لایه ۳ به کار گرفته می‌شود.

الگوریتم دایکسترا (SPF) پایه و اساس محاسبات OSPF است. هر روتر نقشه‌ای کامل از کل توپولوژی شبکه (LSDB) ایجاد می‌کند تا کوتاه‌ترین مسیر به هر شبکه مقصد را کشف کند.
در سناریوهای Multi-Area، بخش Area 0 یا Backbone Area نقش حیاتی در اتصال سایر بخش‌ها ایفا می‌کند. جهت دانلود فایل آزمایشگاهی سناریوی این مقاله می‌توانید به بخش محصولات دانلودی مراجعه نمایید.`,
    author: 'مهندس محمدرضا قاسمی',
    readTime: '۸ دقیقه',
    coverImage: NETWORK_COURSE_IMAGE,
    tags: ['سیسکو', 'OSPF', 'روتینگ', 'آموزش'],
    createdAt: '۱۴۰۳/۰۷/۰۵'
  },
  {
    id: 'art-2',
    title: 'راهنمای جامع سخت‌سازی و ایمن‌سازی سرورهای لینوکس اوبونتو برای استقرار برنامه‌های وب',
    slug: 'ubuntu-linux-server-hardening-security-guide',
    type: 'article',
    category: 'دواپس و لینوکس',
    excerpt: 'چگونه سرورهای ابری Ubuntu Server را در برابر اسکنرهای خودکار، بروت‌فورس پورت SSH و نفوذهای امنیتی با fail2ban و ufw محافظت کنیم؟',
    content: `پس از خرید یک سرور مجازی یا اختصاصی لینوکس، اولین گام ایمن‌سازی پورت‌های ورودی و سرویس‌های سیستمی است:
۱. تغییر پورت پیش‌فرض SSH از ۲۲ به پورت غیرمعمول و غیرفعال‌سازی لاگین با رمز عبور و استفاده انحصاری از SSH Key.
۲. فعال‌سازی فایروال UFW و بستن تمام پورت‌های ورودی به جز پورت‌های ۸۰، ۴۴۳ و پورت امن SSH.
۳. نصب و کانفیگ ابزار Fail2ban برای مسدودسازی خودکار IPهایی که اقدام به حملات حدس رمز عبور می‌کنند.
۴. به‌روزرسانی مداوم پکیج‌ها با دستورات امنیتی خودکار unattended-upgrades.`,
    author: 'مهندس نوید رادمنش',
    readTime: '۷ دقیقه',
    coverImage: HERO_IMAGE,
    tags: ['لینوکس', 'دواپس', 'امنیت سرور', 'SSH'],
    createdAt: '۱۴۰۳/۰۷/۰۹'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'media-1',
    title: 'تصویر لابراتوار تخصصی شبکه و دیتاسنتر',
    fileName: 'hero_tech_academy.jpg',
    fileType: 'image',
    url: HERO_IMAGE,
    size: '۲۴۰ کیلوبایت',
    dimensions: '۱۹۲۰ × ۱۰۸۰',
    altText: 'لابراتوار تخصصی آموزش شبکه و سرور پارس‌نت',
    tags: ['شبکه', 'هدر', 'سرور'],
    uploadedAt: '۱۴۰۳/۰۷/۱۰'
  },
  {
    id: 'media-2',
    title: 'تصویر رک سوئیچ‌های سیسکو و کابل‌کشی پچ‌پنل',
    fileName: 'cisco_switch_rack.jpg',
    fileType: 'image',
    url: NETWORK_COURSE_IMAGE,
    size: '۱۸۰ کیلوبایت',
    dimensions: '۱۲۰۰ × ۹۰۰',
    altText: 'رک تجهیزات سیسکو و مهندسی شبکه',
    tags: ['سیسکو', 'سوئیچینگ', 'کلاس'],
    uploadedAt: '۱۴۰۳/۰۷/۱۱'
  },
  {
    id: 'media-3',
    title: 'میز کار برنامه‌نویسی و طراحی وب ری‌اکت',
    fileName: 'web_dev_workspace.jpg',
    fileType: 'image',
    url: WEB_COURSE_IMAGE,
    size: '۲۱۰ کیلوبایت',
    dimensions: '۱۲۰۰ × ۹۰۰',
    altText: 'محیط توسعه وب مدرن با React و Next.js',
    tags: ['برنامه‌نویسی', 'فرانت‌اند', 'ری‌اکت'],
    uploadedAt: '۱۴۰۳/۰۷/۱۱'
  },
  {
    id: 'media-4',
    title: 'بسته سناریوها و نقشه‌های شبکه پکت‌تریسر',
    fileName: 'network_labs_bundle.jpg',
    fileType: 'image',
    url: DIGITAL_PACK_IMAGE,
    size: '۱۹۵ کیلوبایت',
    dimensions: '۱۲۰۰ × ۹۰۰',
    altText: 'پکیج دانلودی سناریوهای شبکه',
    tags: ['فایل', 'دانلود', 'پکت‌تریسر'],
    uploadedAt: '۱۴۰۳/۰۷/۱۲'
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-c-1',
    name: 'مهندس کامران رستمی',
    email: 'rostami.k@gmail.com',
    phone: '09121112233',
    subject: 'درخواست برگزاری دوره سازمانی CCNA برای پرسنل انفورماتیک',
    message: 'با سلام و احترام، تمایل داریم دوره مهندسی شبکه سیسکو را برای تیم پشتیبانی شبکه شرکت به صورت اختصاصی برگزار نماییم. لطفا سرفصل‌ها و نحوه هماهنگی را ارسال فرمایید.',
    createdAt: '۱۴۰۳/۰۷/۱۶ - ۱۰:۳۰',
    isRead: false
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    courseId: 'course-ccna-200-301',
    courseTitle: 'دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
    userName: 'مهندس وحید کاظمی',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'بهترین و دقیق‌ترین دوره سیسکو به زبان فارسی بود. تسلط مهندس قاسمی روی سناریوهای EVE-NG و پکت‌تریسر و تحلیل با وایرشارک فوق‌العاده است. با همین آموزش موفق شدم آزمون بین‌المللی را پاس کنم.',
    createdAt: '۱۴۰۳/۰۷/۱۰',
    isApproved: true
  },
  {
    id: 'rev-2',
    courseId: 'course-ccna-200-301',
    courseTitle: 'دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
    userName: 'سارا میرزایی',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'روش توضیح مباحث ساب‌نتینگ و پیکربندی VLAN و ترانک عالی بود. پشتیبانی تیکتی هم بسیار سریع و دلسوزانه است.',
    createdAt: '۱۴۰۳/۰۷/۱۴',
    isApproved: true
  },
  {
    id: 'rev-3',
    courseId: 'course-react-fullstack',
    courseTitle: 'دوره جامع آموزش طراحی سایت با React 19، Next.js و Tailwind CSS',
    userName: 'امیررضا کریمی',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'پروژه‌محور بودن دوره و اتصال به دیتابیس Supabase و استقرار روی Vercel واقعاً نیاز بازار کار امروز است. دست مریزاد به مهندس سپهری.',
    createdAt: '۱۴۰۳/۰۷/۱۵',
    isApproved: true
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp-1',
    code: 'CCNA30',
    discountPercent: 30,
    maxUses: 100,
    usedCount: 24,
    expiresAt: '۱۴۰۳/۰۸/۳۰',
    isActive: true,
    description: 'تخفیف ویژه ۳۰ درصدی دوره‌ها و سناریوهای شبکه'
  },
  {
    id: 'cp-2',
    code: 'PARSNET20',
    discountPercent: 20,
    maxUses: 250,
    usedCount: 88,
    expiresAt: '۱۴۰۳/۰۹/۱۵',
    isActive: true,
    description: 'کد تخفیف عمومی ۲۰ درصدی کل سبد خرید'
  },
  {
    id: 'cp-3',
    code: 'REACT15',
    discountPercent: 15,
    maxUses: 50,
    usedCount: 12,
    expiresAt: '۱۴۰۳/۰۸/۱۵',
    isActive: true,
    description: 'تخفیف اختصاصی طراحی سایت و فرانت‌اند'
  }
];

export const INITIAL_QUIZZES: CourseQuiz[] = [
  {
    id: 'quiz-ccna-exam',
    courseId: 'course-ccna-200-301',
    courseTitle: 'دوره جامع مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
    title: 'آزمون شبیه‌ساز رسمی پایان دوره مهندسی شبکه سیسکو (CCNA)',
    timeLimitMinutes: 20,
    passScorePercent: 70,
    questions: [
      {
        id: 'q-1',
        question: 'کدام پروتکل مسیریابی از الگوریتم SPF (Dijkstra) برای پیدا کردن کوتاه‌ترین مسیر در شبکه استفاده می‌کند؟',
        options: ['RIPv2', 'OSPF', 'BGP', 'EIGRP'],
        correctOptionIndex: 1,
        explanation: 'پروتکل OSPF یک پروتکل Link-State است که از الگوریتم SPF یا دایکسترا برای محاسبه بهترین مسیر بدون ایجاد لوپ استفاده می‌نماید.'
      },
      {
        id: 'q-2',
        question: 'پروتکل استاندارد صنعتی مورد استفاده برای ترانکینگ بین سوئیچ‌های لایه ۲ کدام است؟',
        options: ['ISL', 'IEEE 802.1Q (dot1q)', 'VTP', 'STP 802.1D'],
        correctOptionIndex: 1,
        explanation: 'استاندارد IEEE 802.1Q به عنوان پروتکل استاندارد باز برای برچسب‌گذاری (Tagging) فریم‌های VLAN روی پورت‌های ترانک در تمام برندها کاربرد دارد.'
      },
      {
        id: 'q-3',
        question: 'در آدرس‌دهی شبکه، ماسک شبکه 255.255.255.192 برابر با کدام پیشوند CIDR است؟',
        options: ['/24', '/25', '/26', '/27'],
        correctOptionIndex: 2,
        explanation: 'مقدار 192 در اکتت آخر برابر با دو بیت ۱ (۱۲۸ + ۶۴) است؛ بنابراین ۲۴ + ۲ = ۲۶ بیت ماسک شبکه (/26).'
      },
      {
        id: 'q-4',
        question: 'وظیفه مکانیزم امنیتی Port Security روی سوئیچ‌های سیسکو چیست؟',
        options: [
          'رمزنگاری ترافیک کابل‌های اترنت',
          'محدودسازی دسترسی پورت فقط به مک‌آدرس‌های مجاز جهت جلوگیری از نفوذ',
          'جلوگیری از حملات DDoS لایه ۷',
          'تخصیص اتوماتیک آدرس IP'
        ],
        correctOptionIndex: 1,
        explanation: 'پورت سکیوریتی به مدیر شبکه امکان می‌دهد با ثبت MAC Addressهای مجاز، از اتصال کلاینت‌های غیرمجاز به پورت سوئیچ جلوگیری کند.'
      },
      {
        id: 'q-5',
        question: 'در پروتکل OSPF، تمام ناحیه‌ها (Non-Backbone Areas) الزماً باید به کدام ناحیه متصل باشند؟',
        options: ['Area 1', 'Area 10', 'Area 0 (Backbone)', 'Area 99'],
        correctOptionIndex: 2,
        explanation: 'در ساختار چند ناحیه‌ای OSPF، تمام بخش‌ها برای تبادل مسیرهای Inter-Area باید مستقیماً یا از طریق Virtual-Link به Area 0 (Backbone) متصل باشند.'
      }
    ]
  },
  {
    id: 'quiz-react-exam',
    courseId: 'course-react-fullstack',
    courseTitle: 'دوره جامع آموزش طراحی سایت با React 19، Next.js و Tailwind CSS',
    title: 'آزمون پایان دوره تخصصی توسعه وب مدرن (React 19 & Next.js)',
    timeLimitMinutes: 15,
    passScorePercent: 70,
    questions: [
      {
        id: 'rq-1',
        question: 'ویژگی اصلی Server Components در معماری React 19 و Next.js چیست؟',
        options: [
          'اجرای کدها فقط روی مرورگر کلاینت',
          'رندر کامپوننت روی سرور بدون ارسال کدهای جاوااسکریپت آن به مرورگر، که منجر به کاهش حجم باندل می‌شود',
          'عدم امکان ارتباط با پایگاه داده',
          'استفاده اجباری از هوک useState'
        ],
        correctOptionIndex: 1,
        explanation: 'کامپوننت‌های سروری به صورت پیش‌فرض کدهای سنگین خود را روی سرور اجرا می‌کنند و فقط HTML/JSON خروجی را به مرورگر می‌فرستند.'
      },
      {
        id: 'rq-2',
        question: 'کدام دستور Tailwind CSS در نسخه ۴ برای بارگذاری استایل‌ها در فایل CSS استفاده می‌شود؟',
        options: ['@tailwind base;', '@import "tailwindcss";', 'import "tailwind.css";', '@apply all;'],
        correctOptionIndex: 1,
        explanation: 'در نسخه ۴ تیل‌ویند CSS از دستور استاندارد مدرن CSS یعنی @import "tailwindcss"; استفاده می‌شود.'
      },
      {
        id: 'rq-3',
        question: 'مزیت استفاده از Supabase در برابر ساخت بک‌اند سنتی چیست؟',
        options: [
          'عدم نیاز به پایگاه داده',
          'فراهم آوردن PostgreSQL ابری، سیستم احراز هویت، اشتراک ریل‌تایم و REST API آنی',
          'تنها برای ذخیره فایل کاربرد دارد',
          'عدم سازگاری با React'
        ],
        correctOptionIndex: 1,
        explanation: 'سوپابیس به عنوان جایگزین متن‌باز Firebase، پایگاه داده واقعی PostgreSQL را به همراه APIهای آماده و RLS امن در اختیار توسعه‌دهنده قرار می‌دهد.'
      }
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'آکادمی شبکه و وب پارس نت',
  tagline: 'مرجع تخصصی آموزش زیرساخت شبکه، سیسکو، لینوکس و برنامه‌نویسی وب',
  supportPhone: '۰۲۱-۸۸۴۵۶۷۸۹',
  supportEmail: 'support@parsnet-academy.com',
  address: 'تهران، خیابان شریعتی، بالاتر از مطهری، برج فناوری طبقه ۵',
  workHours: 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰ - پنج‌شنبه‌ها ۹:۰۰ الی ۱۴:۰۰',
  zarinpalMerchantId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  isGatewaySandbox: true,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  telegramUsername: 'parsnet_academy',
  instagramUsername: 'parsnet.academy',
  adminUsername: 'admin',
  adminPassword: 'admin',
  aboutText: `آکادمی تخصصی پارس‌نت از سال ۱۳۹۶ با هدف ارتقای دانش مهندسی شبکه، فناوری اطلاعات و توسعه وب در کشور فعالیت خود را آغاز نموده است.
ما باور داریم که یادگیری فناوری باید کاملاً عملی، پروژه‌محور و منطبق بر نیازهای واقعی دیتاسنترها و شرکت‌های پیشرو باشد. به همین منظور تمامی دوره‌های سیسکو (Cisco)، میکروتیک (MikroTik)، سیستم‌عامل لینوکس سرور و فریمورک‌های مدرن فرانت‌اند و بک‌اند با سناریوهای آماده، فایل‌های شبیه‌سازی و پشتیبانی مستقیم اساتید ارائه می‌گردند.

افتخارات ما:
• آموزش بیش از ۳,۵۰۰ دانشجوی متخصص در سراسر کشور
• ارائه بیش از ۱۲۰ فایل سناریوی عملی تست شده
• گارانتی اصالت محتوا و پشتیبانی فنی مستقیم با مدرسین`,
  termsText: `قوانین و دستورالعمل‌های استفاده از آکادمی پارس‌نت:

۱. مالکیت معنوی: کلیه ویدیوها، کدهای سناریو و فایل‌های دانلودی متعلق به آکادمی پارس‌نت بوده و انتشار عمومی یا فروش مجدد آن‌ها بدون اجازه کتبی پیگرد قانونی دارد.
۲. لایسنس کاربری: هر خرید متعلق به یک شخص یا یک حساب کاربری است و دانشجو می‌تواند فایل‌ها را بر روی سیستم شخصی خود دانلود و اجرا نماید.
۳. پشتیبانی علمی: سوالات و تیکت‌های پشتیبانی مربوط به دوره‌ها حداکثر ظرف ۲۴ ساعت کاری توسط مدرس دوره بررسی و پاسخ داده می‌شود.
۴. بازگشت وجه: در صورت وجود مغایرت در سرفصل‌های اعلامی با محتوای دوره تا ۴۸ ساعت پس از خرید امکان استرداد وجه طبق ضوابط مالی فراهم است.`
};

class Store {
  courses: Course[] = [];
  files: DigitalFile[] = [];
  orders: Order[] = [];
  tickets: Ticket[] = [];
  articles: Article[] = [];
  media: MediaItem[] = [];
  contactMessages: ContactMessage[] = [];
  reviews: Review[] = [];
  coupons: Coupon[] = [];
  quizzes: CourseQuiz[] = INITIAL_QUIZZES;
  videoNotes: VideoNote[] = [];
  playbackTimes: Record<string, number> = {};
  theme: 'light' | 'dark' = 'light';
  toasts: ToastMessage[] = [];
  currentUser: User = INITIAL_USER;
  settings: SiteSettings = INITIAL_SETTINGS;
  cart: CartItem[] = [];
  isAdminLoggedIn: boolean = false;
  listeners: (() => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    try {
      const storedCourses = localStorage.getItem('parsnet_courses');
      this.courses = storedCourses ? JSON.parse(storedCourses) : INITIAL_COURSES;

      const storedFiles = localStorage.getItem('parsnet_files');
      this.files = storedFiles ? JSON.parse(storedFiles) : INITIAL_FILES;

      const storedOrders = localStorage.getItem('parsnet_orders');
      this.orders = storedOrders ? JSON.parse(storedOrders) : INITIAL_ORDERS;

      const storedTickets = localStorage.getItem('parsnet_tickets');
      this.tickets = storedTickets ? JSON.parse(storedTickets) : INITIAL_TICKETS;

      const storedArticles = localStorage.getItem('parsnet_articles');
      this.articles = storedArticles ? JSON.parse(storedArticles) : INITIAL_ARTICLES;

      const storedMedia = localStorage.getItem('parsnet_media');
      this.media = storedMedia ? JSON.parse(storedMedia) : INITIAL_MEDIA;

      const storedContact = localStorage.getItem('parsnet_contact_messages');
      this.contactMessages = storedContact ? JSON.parse(storedContact) : INITIAL_CONTACT_MESSAGES;

      const storedReviews = localStorage.getItem('parsnet_reviews');
      this.reviews = storedReviews ? JSON.parse(storedReviews) : INITIAL_REVIEWS;

      const storedCoupons = localStorage.getItem('parsnet_coupons');
      this.coupons = storedCoupons ? JSON.parse(storedCoupons) : INITIAL_COUPONS;

      const storedNotes = localStorage.getItem('parsnet_video_notes');
      this.videoNotes = storedNotes ? JSON.parse(storedNotes) : [];

      const storedPlayback = localStorage.getItem('parsnet_playback_times');
      this.playbackTimes = storedPlayback ? JSON.parse(storedPlayback) : {};

      const storedTheme = localStorage.getItem('parsnet_theme') as 'light' | 'dark';
      this.theme = storedTheme || 'light';
      if (typeof document !== 'undefined') {
        if (this.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      const storedUser = localStorage.getItem('parsnet_user');
      this.currentUser = storedUser ? JSON.parse(storedUser) : INITIAL_USER;

      const storedSettings = localStorage.getItem('parsnet_settings');
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        this.settings = {
          ...INITIAL_SETTINGS,
          ...parsed,
          supabaseUrl: parsed.supabaseUrl || import.meta.env.VITE_SUPABASE_URL || '',
          supabaseAnonKey: parsed.supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
        };
      } else {
        this.settings = INITIAL_SETTINGS;
      }

      const storedCart = localStorage.getItem('parsnet_cart');
      this.cart = storedCart ? JSON.parse(storedCart) : [];

      this.isAdminLoggedIn = localStorage.getItem('parsnet_admin_auth') === 'true';
    } catch (e) {
      console.error('Failed to load store from localStorage', e);
      this.courses = INITIAL_COURSES;
      this.files = INITIAL_FILES;
      this.orders = INITIAL_ORDERS;
      this.tickets = INITIAL_TICKETS;
      this.articles = INITIAL_ARTICLES;
      this.media = INITIAL_MEDIA;
      this.contactMessages = INITIAL_CONTACT_MESSAGES;
      this.reviews = INITIAL_REVIEWS;
      this.coupons = INITIAL_COUPONS;
      this.theme = 'light';
      this.currentUser = INITIAL_USER;
      this.settings = INITIAL_SETTINGS;
      this.cart = [];
      this.isAdminLoggedIn = false;
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('parsnet_courses', JSON.stringify(this.courses));
      localStorage.setItem('parsnet_files', JSON.stringify(this.files));
      localStorage.setItem('parsnet_orders', JSON.stringify(this.orders));
      localStorage.setItem('parsnet_tickets', JSON.stringify(this.tickets));
      localStorage.setItem('parsnet_articles', JSON.stringify(this.articles));
      localStorage.setItem('parsnet_media', JSON.stringify(this.media));
      localStorage.setItem('parsnet_contact_messages', JSON.stringify(this.contactMessages));
      localStorage.setItem('parsnet_reviews', JSON.stringify(this.reviews));
      localStorage.setItem('parsnet_coupons', JSON.stringify(this.coupons));
      localStorage.setItem('parsnet_video_notes', JSON.stringify(this.videoNotes));
      localStorage.setItem('parsnet_playback_times', JSON.stringify(this.playbackTimes));
      localStorage.setItem('parsnet_theme', this.theme);
      localStorage.setItem('parsnet_user', JSON.stringify(this.currentUser));
      localStorage.setItem('parsnet_settings', JSON.stringify(this.settings));
      localStorage.setItem('parsnet_cart', JSON.stringify(this.cart));
      localStorage.setItem('parsnet_admin_auth', this.isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
    this.syncToSupabaseQuietly();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l());
  }

  // Cart operations
  addToCart(item: CartItem) {
    if (!this.cart.some(c => c.id === item.id)) {
      this.cart.push(item);
      this.saveToStorage();
    }
  }

  removeFromCart(itemId: string) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveToStorage();
  }

  clearCart() {
    this.cart = [];
    this.saveToStorage();
  }

  isItemInCart(itemId: string): boolean {
    return this.cart.some(item => item.id === itemId);
  }

  // Course actions
  addCourse(course: Course) {
    this.courses = [course, ...this.courses];
    this.saveToStorage();
  }

  updateCourse(updatedCourse: Course) {
    this.courses = this.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c);
    this.saveToStorage();
  }

  deleteCourse(courseId: string) {
    this.courses = this.courses.filter(c => c.id !== courseId);
    this.saveToStorage();
  }

  // File actions
  addFile(file: DigitalFile) {
    this.files = [file, ...this.files];
    this.saveToStorage();
  }

  updateFile(updatedFile: DigitalFile) {
    this.files = this.files.map(f => f.id === updatedFile.id ? updatedFile : f);
    this.saveToStorage();
  }

  deleteFile(fileId: string) {
    this.files = this.files.filter(f => f.id !== fileId);
    this.saveToStorage();
  }

  // Article / Blog / News / Announcement / Event actions
  addArticle(article: Article) {
    this.articles = [article, ...this.articles];
    this.saveToStorage();
  }

  updateArticle(updatedArticle: Article) {
    this.articles = this.articles.map(a => a.id === updatedArticle.id ? updatedArticle : a);
    this.saveToStorage();
  }

  deleteArticle(articleId: string) {
    this.articles = this.articles.filter(a => a.id !== articleId);
    this.saveToStorage();
  }

  // Order actions
  createOrder(order: Order) {
    this.orders = [order, ...this.orders];
    
    // Automatically grant access to purchased items for the active user if completed
    if (order.status === 'completed' && this.currentUser.id === order.userId) {
      const newCourseIds = [...this.currentUser.enrolledCourseIds];
      const newFileIds = [...this.currentUser.purchasedFileIds];

      order.items.forEach(item => {
        if (item.type === 'course' && !newCourseIds.includes(item.id)) {
          newCourseIds.push(item.id);
        }
        if (item.type === 'file' && !newFileIds.includes(item.id)) {
          newFileIds.push(item.id);
        }
      });

      this.currentUser = {
        ...this.currentUser,
        enrolledCourseIds: newCourseIds,
        purchasedFileIds: newFileIds
      };
    }

    this.clearCart();
    this.saveToStorage();
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    this.orders = this.orders.map(order => order.id === orderId ? { ...order, status } : order);
    this.saveToStorage();
  }

  // Ticket actions
  addTicket(ticket: Ticket) {
    this.tickets = [ticket, ...this.tickets];
    this.saveToStorage();
  }

  replyTicket(ticketId: string, messageContent: string, senderRole: User['role'] = 'admin') {
    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === ticketId) {
        const newMessage = {
          id: `msg-${Date.now()}`,
          senderId: senderRole === 'admin' ? 'admin-1' : this.currentUser.id,
          senderName: senderRole === 'admin' ? 'پشتیبانی آکادمی پارس نت' : this.currentUser.name,
          senderRole,
          content: messageContent,
          createdAt: new Date().toLocaleDateString('fa-IR') + ' - ساعت ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...ticket,
          status: senderRole === 'admin' ? ('answered' as const) : ('open' as const),
          messages: [...ticket.messages, newMessage],
          updatedAt: new Date().toLocaleDateString('fa-IR')
        };
      }
      return ticket;
    });
    this.saveToStorage();
  }

  closeTicket(ticketId: string) {
    this.tickets = this.tickets.map(t => t.id === ticketId ? { ...t, status: 'closed' as const } : t);
    this.saveToStorage();
  }

  // User management
  updateUserProfile(updatedUser: Partial<User>) {
    this.currentUser = {
      ...this.currentUser,
      ...updatedUser
    };
    this.saveToStorage();
  }

  // Settings
  updateSettings(newSettings: Partial<SiteSettings>) {
    this.settings = {
      ...this.settings,
      ...newSettings
    };
    this.saveToStorage();
  }

  // Admin Authentication
  adminLogin(username: string, pass: string): { success: boolean; message: string } {
    const trimmedUser = username.trim();
    const trimmedPass = pass.trim();
    const validUser = (this.settings.adminUsername || 'admin').trim();
    const validPass = (this.settings.adminPassword || 'admin').trim();

    if (trimmedUser === validUser && trimmedPass === validPass) {
      this.isAdminLoggedIn = true;
      this.saveToStorage();
      return { success: true, message: 'ورود با موفقیت انجام شد' };
    }
    return { success: false, message: 'نام کاربری یا رمز عبور اشتباه است' };
  }

  adminLogout() {
    this.isAdminLoggedIn = false;
    this.saveToStorage();
  }

  changeAdminCredentials(currentPassword: string, newUsername: string, newPassword: string): { success: boolean; message: string } {
    const currentPass = (this.settings.adminPassword || 'admin').trim();
    if (currentPassword.trim() !== currentPass) {
      return { success: false, message: 'رمز عبور فعلی نامعتبر است' };
    }
    if (!newUsername.trim() || newUsername.trim().length < 3) {
      return { success: false, message: 'نام کاربری جدید باید حداقل ۳ کاراکتر باشد' };
    }
    if (!newPassword.trim() || newPassword.trim().length < 4) {
      return { success: false, message: 'رمز عبور جدید باید حداقل ۴ کاراکتر باشد' };
    }

    this.settings = {
      ...this.settings,
      adminUsername: newUsername.trim(),
      adminPassword: newPassword.trim()
    };
    this.saveToStorage();
    return { success: true, message: 'مشخصات ورود مدیر با موفقیت تغییر یافت' };
  }

  // Media Library actions
  addMediaItem(item: MediaItem) {
    this.media = [item, ...this.media];
    this.saveToStorage();
  }

  updateMediaItem(id: string, updates: Partial<MediaItem>) {
    this.media = this.media.map(m => m.id === id ? { ...m, ...updates } : m);
    this.saveToStorage();
  }

  deleteMediaItem(id: string) {
    this.media = this.media.filter(m => m.id !== id);
    this.saveToStorage();
  }

  // Contact Messages actions
  addContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) {
    const newMessage: ContactMessage = {
      id: `contact-${Date.now()}`,
      ...data,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    this.contactMessages = [newMessage, ...this.contactMessages];
    this.saveToStorage();
  }

  markContactMessageRead(id: string, isRead: boolean = true) {
    this.contactMessages = this.contactMessages.map(m => m.id === id ? { ...m, isRead } : m);
    this.saveToStorage();
  }

  deleteContactMessage(id: string) {
    this.contactMessages = this.contactMessages.filter(m => m.id !== id);
    this.saveToStorage();
  }

  // Check enrollment
  hasAccessToCourse(courseId: string): boolean {
    return this.currentUser.enrolledCourseIds.includes(courseId);
  }

  hasAccessToFile(fileId: string): boolean {
    return this.currentUser.purchasedFileIds.includes(fileId);
  }

  // Toast Notifications
  showToast(type: 'success' | 'error' | 'info', message: string) {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    this.toasts = [...this.toasts, { id, type, message }];
    this.notify();
    setTimeout(() => {
      this.dismissToast(id);
    }, 4000);
  }

  dismissToast(id: string) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  // Theme Management
  toggleTheme() {
    this.setTheme(this.theme === 'light' ? 'dark' : 'light');
  }

  setTheme(newTheme: 'light' | 'dark') {
    this.theme = newTheme;
    if (typeof document !== 'undefined') {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    this.saveToStorage();
  }

  // Coupon Management
  validateCoupon(code: string): { valid: boolean; discountPercent: number; message: string } {
    const trimmed = code.trim().toUpperCase();
    const found = this.coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);

    if (!found) {
      return { valid: false, discountPercent: 0, message: 'کد تخفیف وارد شده معتبر یا فعال نیست' };
    }

    if (found.usedCount >= found.maxUses) {
      return { valid: false, discountPercent: 0, message: 'ظرفیت استفاده از این کد تخفیف به پایان رسیده است' };
    }

    return {
      valid: true,
      discountPercent: found.discountPercent,
      message: `کد تخفیف با ${found.discountPercent}٪ تخفیف اعمال گردید`
    };
  }

  addCoupon(coupon: Coupon) {
    this.coupons = [coupon, ...this.coupons];
    this.saveToStorage();
  }

  deleteCoupon(id: string) {
    this.coupons = this.coupons.filter(c => c.id !== id);
    this.saveToStorage();
  }

  toggleCouponStatus(id: string) {
    this.coupons = this.coupons.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c);
    this.saveToStorage();
  }

  // Review Management
  addReview(data: Omit<Review, 'id' | 'createdAt' | 'isApproved'>) {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      ...data,
      createdAt: new Date().toLocaleDateString('fa-IR'),
      isApproved: false // Requires admin moderation
    };
    this.reviews = [newReview, ...this.reviews];
    this.saveToStorage();
    this.showToast('success', 'دیدگاه شما با موفقیت ثبت شد و پس از بررسی منتشر خواهد شد.');
  }

  approveReview(id: string, isApproved: boolean = true) {
    this.reviews = this.reviews.map(r => r.id === id ? { ...r, isApproved } : r);
    this.saveToStorage();
  }

  deleteReview(id: string) {
    this.reviews = this.reviews.filter(r => r.id !== id);
    this.saveToStorage();
  }

  getCourseReviews(courseId: string): Review[] {
    return this.reviews.filter(r => r.courseId === courseId && r.isApproved);
  }

  // Learning Progress Tracking
  markEpisodeCompleted(episodeId: string, completed: boolean = true) {
    const currentCompleted = this.currentUser.completedEpisodeIds || [];
    let updated: string[];
    if (completed) {
      if (!currentCompleted.includes(episodeId)) {
        updated = [...currentCompleted, episodeId];
      } else {
        updated = currentCompleted;
      }
    } else {
      updated = currentCompleted.filter(id => id !== episodeId);
    }

    this.currentUser = {
      ...this.currentUser,
      completedEpisodeIds: updated
    };
    this.saveToStorage();
  }

  isEpisodeCompleted(episodeId: string): boolean {
    return (this.currentUser.completedEpisodeIds || []).includes(episodeId);
  }

  getCourseProgress(courseId: string): { completedCount: number; totalCount: number; percent: number } {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return { completedCount: 0, totalCount: 0, percent: 0 };

    let total = 0;
    course.seasons.forEach(s => {
      total += s.episodes.length;
    });

    if (total === 0) return { completedCount: 0, totalCount: 0, percent: 0 };

    const completed = (this.currentUser.completedEpisodeIds || []).filter(epId => {
      return course.seasons.some(s => s.episodes.some(ep => ep.id === epId));
    }).length;

    const percent = Math.min(100, Math.round((completed / total) * 100));
    return { completedCount: completed, totalCount: total, percent };
  }

  // Playback state memory
  saveEpisodePlaybackTime(episodeId: string, seconds: number) {
    if (!episodeId) return;
    this.playbackTimes = {
      ...this.playbackTimes,
      [episodeId]: Math.floor(seconds)
    };
    this.saveToStorage();
  }

  getEpisodePlaybackTime(episodeId: string): number {
    return this.playbackTimes[episodeId] || 0;
  }

  // Video Notes Management
  addVideoNote(data: Omit<VideoNote, 'id' | 'createdAt'>) {
    const newNote: VideoNote = {
      id: `vnote-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...data,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };
    this.videoNotes = [newNote, ...this.videoNotes];
    this.saveToStorage();
    this.showToast('success', 'یادداشت زمان‌دار شما با موفقیت ذخیره شد.');
  }

  getVideoNotes(courseId: string, episodeId?: string): VideoNote[] {
    return this.videoNotes.filter(n => n.courseId === courseId && (!episodeId || n.episodeId === episodeId));
  }

  deleteVideoNote(id: string) {
    this.videoNotes = this.videoNotes.filter(n => n.id !== id);
    this.saveToStorage();
  }

  // Certificate Issuance
  generateCertificate(courseId: string, gradeScore: number): Certificate {
    const course = this.courses.find(c => c.id === courseId);
    const existing = (this.currentUser.certificates || []).find(c => c.courseId === courseId);
    if (existing) return existing;

    const certNumber = `PN-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNumber,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      userPhone: this.currentUser.phone,
      courseId,
      courseTitle: course?.title || 'دوره تخصصی پارس‌نت',
      instructorName: course?.instructor.name || 'مدرس رسمی آکادمی پارس‌نت',
      issueDate: new Date().toLocaleDateString('fa-IR'),
      gradeScore,
      verificationCode: `PN-${gradeScore}-${Math.floor(100000 + Math.random() * 900000)}`
    };

    this.currentUser = {
      ...this.currentUser,
      certificates: [...(this.currentUser.certificates || []), newCert]
    };
    this.saveToStorage();
    this.showToast('success', 'تبریک! گواهینامه معتبر پایان دوره برای شما صادر شد.');
    return newCert;
  }

  // Secure Expiring Download URLs
  generateSignedDownloadUrl(fileId: string): { url: string; token: string; expiresAt: string; expiresSeconds: number } {
    const file = this.files.find(f => f.id === fileId);
    const token = `sig_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const expiresAt = expiryDate.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    const directUrl = file ? file.downloadUrl : 'https://parsnet-academy.com/downloads/secure.zip';
    const signedUrl = `${directUrl}?token=${token}&expires=${Math.floor(expiryDate.getTime() / 1000)}`;

    return {
      url: signedUrl,
      token,
      expiresAt,
      expiresSeconds: 7200
    };
  }

  // Quiet sync to Supabase if configured
  private async syncToSupabaseQuietly() {
    const supabase = getSupabaseClient(this.settings.supabaseUrl, this.settings.supabaseAnonKey);
    if (!supabase) return;

    try {
      // Sync settings or latest order
      if (this.orders.length > 0) {
        const latestOrder = this.orders[0];
        await supabase.from('orders').upsert({
          id: latestOrder.id,
          order_number: latestOrder.orderNumber,
          user_id: latestOrder.userId,
          user_name: latestOrder.userName,
          user_phone: latestOrder.userPhone,
          user_email: latestOrder.userEmail,
          items: latestOrder.items,
          total_amount: latestOrder.totalAmount,
          discount_amount: latestOrder.discountAmount,
          payable_amount: latestOrder.payableAmount,
          status: latestOrder.status,
          gateway: latestOrder.gateway,
          ref_id: latestOrder.refId,
          card_number: latestOrder.cardNumber
        });
      }
    } catch (e) {
      // Supabase table might not exist yet before running the SQL script
    }
  }
}

export const store = new Store();
