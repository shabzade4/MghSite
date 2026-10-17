import { Course, DigitalFile, User, Order, Ticket, Article, SiteSettings, CartItem } from '../types';
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
    id: 'art-1',
    title: 'راهنمای گام‌به‌گام پیاده‌سازی پروتکل OSPF در شبکه‌های سازمانی',
    slug: 'ospf-configuration-enterprise-networks',
    excerpt: 'بررسی جامع نحوه کارکرد پروتکل داینامیک روتینگ OSPFv2، مفاهیم Area صفر، تایمرهای Hello و نحوه جلوگیری از لوپ در روتینگ.',
    content: 'پروتکل OSPF یکی از محبوب‌ترین پروتکل‌های مسیریابی Link-State در شبکه‌های جهان است...',
    category: 'آموزش شبکه',
    author: 'مهندس محمدرضا قاسمی',
    readTime: '۸ دقیقه',
    coverImage: NETWORK_COURSE_IMAGE,
    createdAt: '۱۴۰۳/۰۷/۰۵'
  },
  {
    id: 'art-2',
    title: 'تفاوت‌های کلیدی Server Components در React 19 و نحوه عملکرد آن',
    slug: 'react-19-server-components-guide',
    excerpt: 'چگونه سرور کامپوننت‌ها زمان بارگذاری صفحات وب را تا ۴۰٪ کاهش می‌دهند و سئوی سایت را دگرگون می‌کنند؟',
    content: 'در نسخه جدید React 19 معماری سرور کامپوننت‌ها به مرحله بلوغ کامل رسیده است...',
    category: 'توسعه وب',
    author: 'مهندس آرش سپهری',
    readTime: '۶ دقیقه',
    coverImage: WEB_COURSE_IMAGE,
    createdAt: '۱۴۰۳/۰۷/۰۸'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'آکادمی شبکه و وب پارس نت',
  tagline: 'مرجع تخصصی آموزش زیرساخت شبکه، سیسکو، لینوکس و برنامه‌نویسی وب',
  supportPhone: '۰۲۱-۸۸۴۵۶۷۸۹',
  supportEmail: 'support@parsnet-academy.com',
  address: 'تهران، خیابان شریعتی، بالاتر از مطهری، برج فناوری طبقه ۵',
  zarinpalMerchantId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  isGatewaySandbox: true,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  telegramUsername: 'parsnet_academy',
  instagramUsername: 'parsnet.academy'
};

class Store {
  courses: Course[] = [];
  files: DigitalFile[] = [];
  orders: Order[] = [];
  tickets: Ticket[] = [];
  articles: Article[] = [];
  currentUser: User = INITIAL_USER;
  settings: SiteSettings = INITIAL_SETTINGS;
  cart: CartItem[] = [];
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

      const storedUser = localStorage.getItem('parsnet_user');
      this.currentUser = storedUser ? JSON.parse(storedUser) : INITIAL_USER;

      const storedSettings = localStorage.getItem('parsnet_settings');
      this.settings = storedSettings ? JSON.parse(storedSettings) : INITIAL_SETTINGS;

      const storedCart = localStorage.getItem('parsnet_cart');
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Failed to load store from localStorage', e);
      this.courses = INITIAL_COURSES;
      this.files = INITIAL_FILES;
      this.orders = INITIAL_ORDERS;
      this.tickets = INITIAL_TICKETS;
      this.articles = INITIAL_ARTICLES;
      this.currentUser = INITIAL_USER;
      this.settings = INITIAL_SETTINGS;
      this.cart = [];
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('parsnet_courses', JSON.stringify(this.courses));
      localStorage.setItem('parsnet_files', JSON.stringify(this.files));
      localStorage.setItem('parsnet_orders', JSON.stringify(this.orders));
      localStorage.setItem('parsnet_tickets', JSON.stringify(this.tickets));
      localStorage.setItem('parsnet_articles', JSON.stringify(this.articles));
      localStorage.setItem('parsnet_user', JSON.stringify(this.currentUser));
      localStorage.setItem('parsnet_settings', JSON.stringify(this.settings));
      localStorage.setItem('parsnet_cart', JSON.stringify(this.cart));
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

  // Check enrollment
  hasAccessToCourse(courseId: string): boolean {
    return this.currentUser.enrolledCourseIds.includes(courseId);
  }

  hasAccessToFile(fileId: string): boolean {
    return this.currentUser.purchasedFileIds.includes(fileId);
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
