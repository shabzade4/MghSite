import {
  Course, DigitalFile, User, Order, Ticket, Article, SiteSettings,
  CartItem, MediaItem, ContactMessage, Review, Coupon, CourseQuiz, Certificate, ToastMessage, VideoNote, ColorTheme, AdminTheme,
  OrganicProduct, OrganicCartItem, OrganicOrder, OrganicSettlement, OrganicShippingMethod, OrganicPaymentMethod,
  OrganicPackageOption, OrganicShippingMethodId, OrganicOrderItem, OrganicProductReview,
  OrganicStockAlertConfig, OrganicStockAlertLog,
  ProjectRequest, ITServiceItem, ProjectServiceCategory, ProjectStatus, ProjectUrgency
} from '../types';


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
    description: 'اگر می‌خواهید به عنوان توسعه‌دهنده وب وارد بازار کار داخلی یا بین‌المللی شوید، این دوره کامل‌ترین پکیج یادگیری است. آموزش گام به گام جاوااسکریپت مدرن ES6+، تایپ‌اسکریپت، ری‌اکت ۱۹، فریمورک Next.js 15 با App Router، استایل‌دهی با Tailwind CSS، و اتصال به پایگاه داده و REST API.',
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
      'پیاده‌سازی پایگاه داده ریل‌تایم و مدیریت داده‌های مقیاس‌پذیر',
      'دیپلوی و استقرار استاندارد پروژه‌ها و تنظیم دامنه اختصاصی'
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
    title: 'قالب اختصاصی آکادمی آموزشی و فروش فایل (Next.js 15 + Tailwind CSS)',
    slug: 'lms-digital-store-source-code-template',
    description: 'سورس کد کامل یک پلتفرم فروش دوره‌های آموزشی و فایل‌های دیجیتال طراحی شده با React 19، Next.js 15 و تیلویند CSS. دارای پنل مدیریت، سبد خرید، کیف پول، اتصال به درگاه پرداخت زرین‌پال و طراحی کاملاً راست‌چین و ریسپانسیو.',
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
      'اسکریپت ساخت جداول پایگاه داده و پیکربندی آماده',
      'آماده استقرار فوری بدون نیاز به تنظیمات پیچیده'
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

export const INITIAL_USERS: User[] = [
  INITIAL_USER,
  {
    id: 'usr-student-2',
    name: 'سارا محمدی',
    email: 'sara.mohammadi@example.com',
    phone: '09198765432',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    enrolledCourseIds: ['course-mikrotik-mtcna'],
    purchasedFileIds: ['file-mikrotik-scripts'],
    completedEpisodeIds: ['ep-1-1'],
    certificates: [
      {
        id: 'cert-102',
        certificateNumber: 'PN-CERT-2024-5120',
        userId: 'usr-student-2',
        userName: 'سارا محمدی',
        userPhone: '09198765432',
        courseId: 'course-mikrotik-mtcna',
        courseTitle: 'دوره کاربردی مدیریت شبکه‌های میکروتیک (MTCNA)',
        instructorName: 'مهندس محمدرضا قاسمی',
        issueDate: '۱۴۰۳/۰۶/۱۵',
        gradeScore: 92,
        verificationCode: 'MTCNA-92-5120-VERIFIED'
      }
    ],
    walletBalance: 120000,
    createdAt: '۱۴۰۳/۰۲/۲۰'
  },
  {
    id: 'usr-student-3',
    name: 'امیررضا کاظمی',
    email: 'a.kazemi@example.com',
    phone: '09351234567',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    enrolledCourseIds: ['course-fullstack-react'],
    purchasedFileIds: ['file-nextjs-starter-template'],
    completedEpisodeIds: [],
    certificates: [
      {
        id: 'cert-103',
        certificateNumber: 'PN-CERT-2024-9403',
        userId: 'usr-student-3',
        userName: 'امیررضا کاظمی',
        userPhone: '09351234567',
        courseId: 'course-fullstack-react',
        courseTitle: 'دوره پروژه محور طراحی وب با React 19 و Tailwind CSS',
        instructorName: 'مهندس علی احمدی',
        issueDate: '۱۴۰۳/۰۵/۲۲',
        gradeScore: 88,
        verificationCode: 'REACT-88-9403-VERIFIED'
      }
    ],
    walletBalance: 450000,
    createdAt: '۱۴۰۳/۰۳/۱۱'
  },
  {
    id: 'usr-student-4',
    name: 'ندا تهرانی',
    email: 'neda.tehrani@example.com',
    phone: '09129998877',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    enrolledCourseIds: ['course-ccna-200-301', 'course-mikrotik-mtcna'],
    purchasedFileIds: [],
    completedEpisodeIds: [],
    certificates: [],
    walletBalance: 0,
    createdAt: '۱۴۰۳/۰۴/۰۵'
  }
];

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
    comment: 'پروژه‌محور بودن دوره و پیاده‌سازی پایگاه داده کاربردی و استقرار ابری واقعاً نیاز بازار کار امروز است. دست مریزاد به مهندس سپهری.',
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
        question: 'مزیت استفاده از Backend-as-a-Service (BaaS) و پایگاه داده‌های ابری چیست؟',
        options: [
          'عدم نیاز به پایگاه داده',
          'فراهم آوردن پایگاه داده مقیاس‌پذیر، سیستم احراز هویت امن، اشتراک ریل‌تایم و APIهای آماده',
          'تنها برای ذخیره فایل کاربرد دارد',
          'عدم سازگاری با فریمورک‌های مدرن'
        ],
        correctOptionIndex: 1,
        explanation: 'سرویس‌های BaaS ابری، پایگاه داده واقعی را به همراه APIهای آماده و مکانیزم‌های احراز هویت امن و سریع در اختیار توسعه‌دهنده قرار می‌دهند.'
      }
    ]
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  siteTitle: 'مهرادینت',
  tagline: 'آموزش تخصصی شبکه، وب، برنامه‌نویسی و انجام پروژه‌های کامپیوتری',
  supportPhone: '۰۲۱-۸۸۴۵۶۷۸۹',
  supportEmail: 'info@mehradinet.com',
  address: 'تهران، خیابان شریعتی، بالاتر از مطهری، برج فناوری طبقه ۵',
  workHours: 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰ - پنج‌شنبه‌ها ۹:۰۰ الی ۱۴:۰۰',
  zarinpalMerchantId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ab',
  isGatewaySandbox: true,
  telegramUsername: 'mehradinet',
  instagramUsername: 'mehradinet',
  adminUsername: 'admin',
  adminPassword: 'admin',
  aboutText: `مجموعه مهندسی و آکادمی تخصصی مهرادینت از سال ۱۳۹۶ با تکیه بر تجارب عملی در اجرای پروژه‌های بزرگ زیرساخت شبکه، دیتاسنتر و توسعه سامانه‌های نرم‌افزاری فعالیت خود را آغاز نموده است.
ما باور داریم که مرز بین آموزش و صنعت باید برداشته شود؛ از این رو متخصصان مهرادینت همزمان با اجرای پروژه‌های کابل‌کشی پسیو، کانفیگ اکتیو سیسکو و میکروتیک، مجازی‌سازی سرور و برنامه‌نویسی سیستم‌های مدرن وب، دانش کاربردی خود را در قالب دوره‌های جامع و پروژه‌محور در اختیار علاقه‌مندان و متخصصان سراسر کشور قرار می‌دهند.

زمینه‌های فعالیت مهرادینت:
• انجام پروژه‌های طراحی و اجرای شبکه پسیو (کابل‌کشی، رک‌بندی، فیبر نوری، فلوک)
• کانفیگ و پیاده‌سازی تجهیزات اکتیو شبکه (Cisco, MikroTik, FortiGate, VPN)
• مجازی‌سازی سرور و دیتاسنتر (VMware ESXi, vCenter, Proxmox, Hyper-V)
• نصب و استانداردسازی سیستم‌عامل‌های سرور (Windows Server, Linux Server, macOS)
• طراحی وب‌سایت‌های شرکتی، فروشگاهی، پرتال و وب‌اپلیکیشن‌های پیشرفته
• برنامه‌نویسی نرم‌افزارهای سفارشی، اسکریپت‌های اتوماسیون پایتون و ربات‌ها
• آموزش تخصصی و مهارت‌محور همراه با صدور مدارک معتبر با قابلیت استعلام آنلاین`,
  termsText: `قوانین و دستورالعمل‌های استفاده از خدمات و آکادمی مهرادینت:

۱. مالکیت معنوی: کلیه ویدیوها، کدهای سناریو و فایل‌های دانلودی متعلق به مهرادینت بوده و هرگونه بازنشر بدون مجوز کتبی پیگرد قانونی دارد.
۲. قراردادهای پروژه‌ای: تمامی پروژه‌های اجرایی شبکه و نرم‌افزار مهرادینت دارای قرارداد رسمی، شرح خدمات دقیق (SLA) و دوره گارانتی و پشتیبانی مکتوب می‌باشند.
۳. لایسنس کاربری: هر خرید آموزشی متعلق به یک شخص یا حساب کاربری است.
۴. پشتیبانی علمی و فنی: پاسخگویی تیکت‌ها و مشاوره‌های فنی ظرف حداکثر ۲۴ ساعت کاری انجام می‌گردد.
۵. گارانتی اصالت و کیفیت: تطابق ۱۰۰٪ سرفصل‌های اعلامی با محتوا تضمین شده است.`,
  showBlogSidebar: true,
  sidebarPosition: 'left',
  sidebarWidgets: {
    search: true,
    categories: true,
    recentPosts: true,
    featuredCourse: true,
    popularTags: true,
    customLinks: true,
    newsletter: true
  },
  sidebarCustomLinks: [
    { id: 'slink-1', title: 'مستندات پیکربندی سیسکو CCNA', url: 'https://www.cisco.com' },
    { id: 'slink-2', title: 'لابراتوار شبیه‌سازی آنلاین EVE-NG', url: 'https://www.eve-ng.net' },
    { id: 'slink-3', title: 'راهنمای راه‌اندازی MikroTik CHR', url: 'https://mikrotik.com' },
    { id: 'slink-4', title: 'مخزن سورس‌های آموزشی گیت‌هاب', url: 'https://github.com' }
  ],
  sidebarBannerTitle: 'تخفیف ویژه دوره‌های شبکه سیسکو',
  sidebarBannerSubtitle: 'با کد تخفیف CCNA30 تا ۳۰٪ تخفیف اختصاصی دریافت کنید',
  sidebarBannerLink: 'course-ccna-200-301'
};

export const INITIAL_PROJECT_SERVICES: ITServiceItem[] = [
  {
    id: 'srv-software',
    category: 'software-install',
    title: 'نصب و پیکربندی نرم‌افزارهای تخصصی و کاربردی',
    englishTitle: 'Specialized & Enterprise Software Deployment',
    shortDescription: 'نصب، راه‌اندازی و لایسنسینگ نرم‌افزارهای مهندسی، مالی، اداری و امنیتی سازمانی با کانفیگ بهینه و دیتابیس پایدار',
    fullDescription: 'پیاده‌سازی و استقرار بدون اختلال نرم‌افزارهای سنگین مهندسی (AutoCAD, Revit, SolidWorks, MATLAB)، سامانه‌های جامع حسابداری و مالی (سپیدار، هلو، پیوست)، مجموعه‌های آفیس سازمانی، آنتی‌ویروس‌های تحت شبکه (Kaspersky Endpoint, ESET Protect) با کنسول مرکزی مدیریت لایسنس و به‌روزرسانی محلی.',
    iconName: 'Package',
    features: [
      'نصب تخصصی نرم‌افزارهای سنگین محاسباتی و مهندسی',
      'راه‌اندازی سامانه‌های حسابداری، مالی و اتوماسیون اداری',
      'استقرار آنتی‌ویروس تحت شبکه با کنسول مرکزی ابری/محلی',
      'رفع خطاهای پیش‌نیاز (Dependencies, Visual C++, .NET Framework)',
      'تنظیم دسترسی‌های کاربری و فایروال برای نرم‌افزارهای کلاینت-سرور'
    ],
    deliverables: [
      'نصب کامل و تست کارکرد پایدار روی کلاینت‌ها/سرور',
      'پیکربندی پایگاه داده و اتصال امن به سرور اصلی',
      'ایجاد چک‌پوینت و ایمیج بکاپ قبل و بعد از نصب',
      'مستند خلاصه راه‌اندازی و آموزش کاربری به پرسنل'
    ],
    techStack: ['Kaspersky', 'ESET Security', 'SQL Server', 'AutoCAD', 'Revit', 'Office 365', 'Sepidar'],
    estimatedDelivery: '۱ الی ۲ روز کاری',
    pricingGuide: 'شروع از ۱,۵۰۰,۰۰۰ تومان (بسته به تعداد کلاینت‌ها)',
    isPopular: false
  },
  {
    id: 'srv-os',
    category: 'os-setup',
    title: 'نصب و پیکربندی تخصصی سیستم‌عامل سرور و کلاینت',
    englishTitle: 'Enterprise OS Setup & Hardening (Windows / Linux / macOS)',
    shortDescription: 'راه‌اندازی Windows Server با اکتیو دایرکتوری و لینوکس سرور سخت‌سازی‌شده (Ubuntu/Rocky) با امنیت چندلایه',
    fullDescription: 'نصب و استانداردسازی سیستم‌عامل‌های سرور شامل ویندوز سرور ۲۰۲۲ و ۲۰۲۵، راه‌اندازی کامل Active Directory Domain Services (AD DS)، سرورهای DNS، DHCP، فایل سرور با Permissionهای دقیق NTFS، لینوکس‌های سازمانی Ubuntu Server، Debian و Rocky Linux به همراه سخت‌سازی امنیتی SSH، فایروال UFW/iptables، بهینه‌سازی کرنل و مکینتاش اداری.',
    iconName: 'Server',
    features: [
      'نصب استاندارد Windows Server 2022 / 2025 با تنظیمات امنیتی CIS Benchmark',
      'راه‌اندازی Active Directory، جنگل دومین، OUها و پالیسی‌های Group Policy (GPO)',
      'نصب توزیع‌های سازمانی لینوکس (Ubuntu, Rocky Linux, AlmaLinux, RHEL)',
      'سخت‌سازی امنیتی SSH با احراز هویت کلید عمومی (Key-based) و بستن پورت‌های غیرضروری',
      'راه‌اندازی Failover DHCP، سرور DNS داخلی و NTP سرور محلی'
    ],
    deliverables: [
      'سیستم‌عامل کاملاً به‌روزرسانی شده با درایورهای اختصاصی سرور (HP, Dell, Supermicro)',
      'ساختار طبقه‌بندی شده کاربران، گروه‌ها و اشتراک فایل امن',
      'تست نفوذپذیری اولیه و اسکن آسیب‌پذیری پس از نصب',
      'مستند دسترسی‌های ادمین و راهنمای مدیریت سرور'
    ],
    techStack: ['Windows Server 2025', 'Active Directory', 'Rocky Linux', 'Ubuntu Server', 'Group Policy', 'DNS/DHCP'],
    estimatedDelivery: '۲ الی ۳ روز کاری',
    pricingGuide: 'شروع از ۳,۸۰۰,۰۰۰ تومان',
    isPopular: true
  },
  {
    id: 'srv-virtualization',
    category: 'virtualization',
    title: 'مجازی‌سازی سرور و دیتاسنتر (VMware / Proxmox / Hyper-V)',
    englishTitle: 'Datacenter Virtualization & Cluster Infrastructure',
    shortDescription: 'پیاده‌سازی کلاستر VMware ESXi 8.0، vCenter Appliance، خوشه‌بندی High Availability (HA) و استوریج vSAN/NAS',
    fullDescription: 'تبدیل سرورهای فیزیکی به زیرساخت مجازی فوق‌پایدار با VMware vSphere ESXi 8.0، راه‌اندازی کلاستر vCenter با قابلیت‌های تحمل خطای پیشرفته HA، vMotion بلادرنگ، توزیع بار DRS، استقرار Proxmox VE سازمانی بدون هزینه لایسنس، پیکربندی استوریج مشترک iSCSI/NFS/TrueNAS و سناریوی بکاپ فشرده با Veeam Backup & Replication.',
    iconName: 'Layers',
    features: [
      'نصب هایپروایزر VMware ESXi 8.0 روی سرورهای HP ProLiant و Dell PowerEdge',
      'راه‌اندازی سرور مدیریتی vCenter Server Appliance (VCSA) و ساخت کلاستر',
      'فعال‌سازی High Availability (HA) برای جلوگیری از قطعی سرویس‌ها هنگام سوختن سخت‌افزار',
      'انتقال زنده ماشین‌ها با vMotion و ذخیره‌سازی vSphere Storage vMotion بدون قطعی',
      'راه‌اندازی پروکسموکس کلاستر (Proxmox VE Cluster) و Ceph Storage به عنوان آلترناتیو متن‌باز',
      'استقرار سرور بکاپ‌گیری Veeam Backup & Replication با ذخیره‌سازی ابری و آفلاین'
    ],
    deliverables: [
      'معماری کلاستر مجازی فعال با تست سناریوی شبیه‌سازی قطعی سخت‌افزار (Failover Test)',
      'داشبورد مدیریتی وب متمرکز و مانیتورینگ منابع پردازنده و رم',
      'سیاست‌گذاری بکاپ اتوماتیک روزانه و ماهانه با بازیابی سریع (Instant VM Recovery)',
      'نقشه معماری مجازی‌سازی (Topology Diagram) و چک‌لیست نگهداری'
    ],
    techStack: ['VMware ESXi 8.0', 'vCenter VCSA', 'Proxmox VE', 'Veeam Backup', 'TrueNAS', 'vSAN', 'Hyper-V'],
    estimatedDelivery: '۳ الی ۵ روز کاری',
    pricingGuide: 'شروع از ۶,۵۰۰,۰۰۰ تومان',
    isPopular: true
  },
  {
    id: 'srv-passive',
    category: 'passive-network',
    title: 'طراحی، کابل‌کشی و اجرای پسیو شبکه و دیتاسنتر',
    englishTitle: 'Structured Cabling, Fiber Optic & Rack Engineering',
    shortDescription: 'کابل‌کشی ساخت‌یافته استاندارد Cat6/Cat7، آرایش حرفه‌ای رک و پچ‌پنل، فیوژن فیبر نوری و تست فلوک',
    fullDescription: 'اجرای مهندسی کابل‌کشی ساخت‌یافته مطابق استاندارد بین‌المللی ANSI/TIA-568-D با کابل‌های تمام‌مس SFTP Cat6/Cat7، کابل‌کشی فیبر نوری (Single-mode / Multi-mode) با فیوژن اسپلایسینگ دقیق (Fusion Splicing)، نصب و آرایش ترانکینگ و داکت‌های لگراند، نام‌گذاری و لیبل‌گذاری دوطرفه کابل‌ها، آرایش حرفه‌ای رک‌های دیواری و ایستاده دیتاسنتر با پچ‌کوردها و مدیریت کابل (Cable Management).',
    iconName: 'Cable',
    features: [
      'کابل‌کشی استاندارد با کابل‌های تمام‌مس (Pure Bare Copper) برندهای Legrand, Nexans, Schneider',
      'طراحی و آرایش کامل رک ایستاده تا ۴۲ یونیت به همراه مدیریت افقی و عمودی پچ‌کوردها',
      'اجرای فیوژن فیبر نوری با دستگاه‌های نسل جدید و افت بسیار پایین کمتر از 0.02dB',
      'نصب کیستون، پچ‌پنل، پریزهای برق اضطراری (UPS) و کابل شبکه استاندارد در اتاق‌ها',
      'ارائه تست فلوک چنل و پرمننت (Fluke DTX / DSX) با سرتیفیکیت معتبر برای پروژه'
    ],
    deliverables: [
      'پسیو تمیز، کدگذاری شده و استاندارد با قابلیت عیب‌یابی سریع در چند ثانیه',
      'نقشه ازبیلت (As-Built) لیبل‌گذاری شده تمامی پریزها و شماره پورت‌های پچ‌پنل',
      'تست فیزیکی و سیگنالی ۱۰۰٪ نودهای شبکه',
      'گارانتی کتبی ۱۲ ماهه پایداری کابل‌کشی و آرایش فیزیکی'
    ],
    techStack: ['Legrand Trunking', 'Nexans Cat6/Cat7', 'Fiber Optic Fusion', 'Fluke Networks', 'APC Rack Systems'],
    estimatedDelivery: '۲ الی ۷ روز کاری (بسته به متراژ و تعداد نودها)',
    pricingGuide: 'استعلام قیمت بر اساس متراژ و تعداد نود (از نودی ۲۸۰,۰۰۰ تومان)',
    isPopular: true
  },
  {
    id: 'srv-active',
    category: 'active-network',
    title: 'طراحی و اجرای اکتیو شبکه و امنیت (سیسکو / میکروتیک / فورتی‌گیت)',
    englishTitle: 'Enterprise Active Network, Routing, Switching & Firewalls',
    shortDescription: 'کانفیگ سوئیچ و روتر سیسکو، میکروتیک، فایروال فورتی‌گیت، سگمنت‌بندی VLAN، روتینگ و اتصال شعب VPN',
    fullDescription: 'پیکربندی پیشرفته و مهندسی تجهیزات اکتیو شامل سوئیچ‌های سیسکو سری کاتالیست (Cisco Catalyst 2960/3850/9200/9300)، روترهای میکروتیک (CCR / RB)، فایروال‌های سخت‌افزاری FortiGate و Sophos. سگمنت‌بندی ترافیک با VLAN و Private VLAN، پروتکل‌های مسیریابی OSPF، BGP و EIGRP، پروتکل‌های جلوگیری از لوپ STP/RSTP، تانل‌های امن و ضدشنود IPsec Site-to-Site بین دفاتر و شعب، سرویس SSL VPN برای دورکاری پرسنل، کنترل پهنای باند و مدیریت اینترنت پرسنل (Queue & Web Filtering).',
    iconName: 'Radio',
    features: [
      'کانفیگ کامل سوئیچینگ لایه ۲ و لایه ۳ سیسکو با VLAN، Trunking و EtherChannel (LACP)',
      'پیاده‌سازی پروتکل‌های روتینگ داینامیک OSPFv2/OSPFv3 و اینترنت چند مسیره (Load Balancing / Failover)',
      'پیکربندی فایروال FortiGate با پالیسی‌های آنتی‌ویروس، IPS، Web Filtering و جلوگیری از حملات',
      'راه‌اندازی تانل‌های بین‌شهری و بین‌المللی IPsec، WireGuard، OpenVPN با پایداری ۹۹.۹٪',
      'امنیت پورت‌ها با Port Security، ۸۰۲.۱X، DHCP Snooping و Dynamic ARP Inspection',
      'راه‌اندازی مانیتورینگ بلادرنگ با Zabbix و ارسال هشدار پیامکی/تلگرامی هنگام قطعی'
    ],
    deliverables: [
      'زیرساخت شبکه بهینه‌شده بدون لوپ و با کمترین تاخیر (Latency)',
      'سند توپولوژی منطقی شبکه (Logical Architecture) با فرمت Visio / PDF',
      'فایل‌های بکاپ پیکربندی کانفیگ روترها و سوئیچ‌ها',
      'پشتیبانی تست و مانیتورینگ ۴۸ ساعته پس از راه‌اندازی'
    ],
    techStack: ['Cisco IOS-XE', 'MikroTik RouterOS', 'Fortinet FortiOS', 'Zabbix', 'IPsec VPN', 'OSPF/BGP'],
    estimatedDelivery: '۲ الی ۵ روز کاری',
    pricingGuide: 'شروع از ۴,۵۰۰,۰۰۰ تومان',
    isPopular: true
  },
  {
    id: 'srv-web',
    category: 'web-design',
    title: 'طراحی وب‌سایت مدرن، فروشگاهی و پورتال سازمانی',
    englishTitle: 'Modern Web Design, E-Commerce & Web Applications',
    shortDescription: 'طراحی سایت‌های فوق‌العاده سریع با React 19، Next.js یا وردپرس سفارشی با درگاه پرداخت، سئو و واکنش‌گرا',
    fullDescription: 'خلق وب‌سایت‌های منحصربه‌فرد، مدرن و استاندارد متناسب با برند شما. از وب‌سایت‌های شرکتی شیک و کاتالوگ دیجیتال گرفته تا فروشگاه‌های اینترنتی قدرتمند با سبد خرید پیشرفته، اتصال به درگاه‌های پرداخت شاپرک (زرین‌پال، به‌پرداخت ملت، پاسارگاد)، سامانه پیامکی احراز هویت با کد OTP، طراحی کامپوننت‌های اختصاصی با React و Next.js یا قالب‌های اختصاصی وردپرس بهینه‌سازی‌شده برای سئو و بارگذاری زیر ۱.۵ ثانیه.',
    iconName: 'Layout',
    features: [
      'طراحی کاملاً واکنش‌گرا (Responsive) سازگار با موبایل، تبلت و دسکتاپ',
      'پیاده‌سازی با فریمورک‌های روز دنیا (Next.js 15, React 19, Tailwind CSS) یا وردپرس بهینه',
      'اتصال به درگاه‌های پرداخت آنلاین شاپرک، اینماد و سامانه‌های پیامکی معتبر',
      'طراحی رابط کاربری (UI/UX) تمیز، مدرن، جذاب و منطبق بر اصول تجربه کاربری',
      'بهینه‌سازی سئو فنی (Technical SEO)، متاتگ‌ها، OpenGraph و ساختار Schema.org',
      'پنل مدیریت فارسی ساده و سریع با امکان ویرایش نامحدود محتوا و محصولات'
    ],
    deliverables: [
      'سایت کامل آماده بهره‌برداری همراه با دامنه و هاست یا سرور ابری',
      'لایسنس‌ها و کدهای سورس تمیز و استاندارد',
      'ویدیوهای آموزشی کار با پنل مدیریت سایت مخصوص ادمین',
      '۶ ماه پشتیبانی فنی و امنیتی رایگان'
    ],
    techStack: ['React 19', 'Next.js', 'Tailwind CSS', 'WordPress', 'TypeScript', 'Node.js', 'PostgreSQL'],
    estimatedDelivery: '۷ الی ۲۱ روز کاری',
    pricingGuide: 'شروع از ۸,۹۰۰,۰۰۰ تومان',
    isPopular: true
  },
  {
    id: 'srv-programming',
    category: 'custom-programming',
    title: 'طراحی و برنامه‌نویسی نرم‌افزار، اپلیکیشن و اسکریپت‌های اتوماسیون',
    englishTitle: 'Custom Software Development, Mobile Apps & Automation Bots',
    shortDescription: 'توسعه نرم‌افزارهای اختصاصی وب، ویندوز و موبایل (Python, Node.js, C#, React Native)، بات‌ها و پردازش داده',
    fullDescription: 'برنامه‌نویسی و توسعه سامانه‌های نرم‌افزاری اختصاصی متناسب با فرایندهای منحصربه‌فرد کسب‌وکار شما. توسعه وب‌اپلیکیشن‌های داشبورد مدیریتی، سیستم‌های انبارداری و CRM اختصاصی، اسکریپت‌های هوشمند استخراج و پردازش داده با پایتون (Web Scraping / Data ETL)، ربات‌های تلگرام و بله برای پشتیبانی مشتریان و ثبت سفارش، توسعه APIهای میکروسرویس پرسرعت و پایگاه داده‌های مقیاس‌پذیر.',
    iconName: 'Code2',
    features: [
      'توسعه سیستم‌های سفارشی با معماری ماژولار و کدنویسی تمیز (Clean Code)',
      'اسکریپت‌های اتوماسیون پایتون برای خودکارسازی کارهای تکراری اداری و گزارش‌گیری',
      'ساخت ربات‌های کاربردی تلگرام، بله و ایتا با اتصال به دیتابیس اختصاصی',
      'توسعه اپلیکیشن‌های موبایل کراس‌پلتفرم (React Native / Flutter) برای اندروید و iOS',
      'طراحی دیتابیس‌های بهینه PostgreSQL, MySQL, Redis و کوئری‌های سریع',
      'یکپارچه‌سازی سیستم‌های مختلف از طریق RESTful API و Webhook'
    ],
    deliverables: [
      'سورس‌کد کامل پروژه با مخزن گیت اختصاصی و مستندات کد (Code Docs)',
      'نسخه اجرایی، داکرایز شده (Dockerfile) و آماده استقرار روی سرور',
      'محیط تستی (Staging) و تحویل نهایی با تست‌های واحد و یکپارچگی',
      'آموزش و دوره پشتیبانی و توسعه فیچرهای جدید'
    ],
    techStack: ['Python', 'Node.js', 'C# .NET', 'TypeScript', 'React Native', 'Docker', 'PostgreSQL', 'Redis'],
    estimatedDelivery: '۱۰ الی ۳۵ روز کاری',
    pricingGuide: 'استعلام قیمت بر اساس بریف و سند نیازمندی‌ها (شروع از ۹,۵۰۰,۰۰۰ تومان)',
    isPopular: true
  },
  {
    id: 'srv-support',
    category: 'it-support',
    title: 'پشتیبانی، عیب‌یابی و نگهداری دوره‌ای زیرساخت IT',
    englishTitle: 'Proactive IT Maintenance, Helpdesk & Emergency Support',
    shortDescription: 'قراردادهای دوره‌ای هلپ‌دسک و نگهداری شبکه، پایش پایداری ۲۴/۷، بکاپ‌گیری و رفع عیب اضطراری در محل و ریموت',
    fullDescription: 'بیمه کردن زیرساخت فناوری اطلاعات شرکت شما با خدمات پشتیبانی فعال مهرادینت. قراردادهای پشتیبانی منظم هفتگی و ماهانه شامل بازدید حضوری ادواری، رفع فوری ایرادات کاربران و پرسنل، تست سلامت هاردها و سرورها، بررسی منظم لاگ‌های امنیتی، کنترل صحت بکاپ‌ها و حضور فوری کارشناس در صورت بروز حوادث اضطراری.',
    iconName: 'ShieldCheck',
    features: [
      'پشتیبانی آنلاین و ریموت فوری با نرم‌افزارهای امن ریموت دسکتاپ',
      'حضور کارشناس ارشد شبکه در محل شرکت طبق جدول زمان‌بندی منظم',
      'کنترل روزانه سلامت فایل‌های بکاپ سرورها و پایگاه‌های داده',
      'به‌روزرسانی امنیتی لینوکس و ویندوز و رفع باگ‌های سیستم‌عامل',
      'تامین و ارتقای قطعات سخت‌افزاری سرورها، رک‌ها و کامپیوترها',
      'تضمین SLA و بازه پاسخگویی کوتاه در قرارداد رسمی پشتیبانی'
    ],
    deliverables: [
      'گزارش مکتوب ماهانه از وضعیت سلامت زیرساخت، حوادث و اقدامات اصلاحی',
      'خط تماس اختصاصی پشتیبانی سریع برای مدیران و پرسنل',
      'کاهش هزینه‌های استخدامی با برون‌سپاری تخصصی واحد انفورماتیک',
      'آرامش خاطر از پایداری ۹۹.۹ درصدی سرویس‌ها'
    ],
    techStack: ['Remote Support Tools', 'Zabbix', 'Syslog Server', 'Backup Verification', 'Helpdesk Ticketing'],
    estimatedDelivery: 'قرارداد ماهانه / سالانه (با ۲ هفته دوره آزمایشی)',
    pricingGuide: 'شروع از ۳,۲۰۰,۰۰۰ تومان در ماه',
    isPopular: false
  }
];

export const INITIAL_PROJECT_REQUESTS: ProjectRequest[] = [
  {
    id: 'prj-req-101',
    trackingCode: 'PRJ-1403-9124',
    title: 'طراحی و اجرای کابل‌کشی پسیو و راه‌اندازی شبکه شرکت مهندسی پتروآریا',
    category: 'passive-network',
    categoryTitle: 'طراحی و اجرای پسیو شبکه',
    clientName: 'مهندس سعید کریمی',
    clientPhone: '09121118899',
    clientEmail: 's.karimi@petroaria.ir',
    organization: 'شرکت مهندسی و بازرگانی پتروآریا',
    description: 'نیاز به کابل‌کشی ساخت‌یافته Cat6 SFTP برای ۴۸ نود کاری در ۲ طبقه اداری، نصب و آرایش رک ۴۲ یونیت دیتاسنتر، فیوژن فیبر نوری بین طبقات و تست فلوک چنل.',
    urgency: 'enterprise',
    budgetRange: '۳۰ تا ۷۰ میلیون تومان',
    location: 'تهران، خیابان وزرا',
    preferredContact: 'phone',
    status: 'in_progress',
    statusNotes: 'فاز کابل‌کشی طبقه اول تکمیل شد. کابل‌های طبقه دوم در حال ترانکینگ و بستن کیستون است. رک دیتاسنتر مستقر گردیده است.',
    estimatedDelivery: '۱۴۰۳/۰۸/۲۵',
    assignedEngineer: 'مهندس محمدرضا قاسمی (کارشناس ارشد زیرساخت)',
    createdAt: '۱۴۰۳/۰۸/۰۸',
    updatedAt: '۱۴۰۳/۰۸/۱۴',
    adminNotes: 'قرارداد فاز اول منعقد و پیش‌پرداخت دریافت گردید. تجهیزات لگراند و نگزنس تحویل کارگاه شد.'
  },
  {
    id: 'prj-req-102',
    trackingCode: 'PRJ-1403-9125',
    title: 'مجازی‌سازی سرور با VMware ESXi 8.0 و راه‌اندازی بکاپ‌گیری Veeam',
    category: 'virtualization',
    categoryTitle: 'مجازی‌سازی سرور و دیتاسنتر',
    clientName: 'دکتر علیرضا صدری',
    clientPhone: '09123456789',
    clientEmail: 'sadri@novinclinics.com',
    organization: 'مرکز تصویربرداری و کلینیک نوین',
    description: 'راه‌اندازی دو دستگاه سرور HP DL380 Gen10 با هایپروایزر VMware ESXi 8.0، انتقال سیستم HIS و PACS و دیتابیس بیماران بدون قطعی سرویس‌دهی، و پیکربندی بکاپ خودکار شبانه روی استوریج NAS.',
    urgency: 'urgent',
    budgetRange: '۱۰ تا ۳۰ میلیون تومان',
    location: 'تهران، سعادت‌آباد',
    preferredContact: 'phone',
    status: 'approved',
    statusNotes: 'طرح معماری و پیش‌فاکتور تایید شد. زمان مراجعه حضوری برای پیاده‌سازی روز پنج‌شنبه هماهنگ گردید.',
    estimatedDelivery: '۱۴۰۳/۰۸/۲۰',
    assignedEngineer: 'مهندس نوید رادمنش (متخصص مجازی‌سازی و لینوکس)',
    createdAt: '۱۴۰۳/۰۸/۱۲',
    updatedAt: '۱۴۰۳/۰۸/۱۵',
    adminNotes: 'ایمیج سفارشی ESXi برای سخت‌افزار HP آماده شد. لایسنس‌ها صادر گردید.'
  },
  {
    id: 'prj-req-103',
    trackingCode: 'PRJ-1403-9126',
    title: 'طراحی وب‌سایت فروشگاهی تخصصی تجهیزات مخابراتی و شبکه',
    category: 'web-design',
    categoryTitle: 'طراحی وب‌سایت مدرن و فروشگاهی',
    clientName: 'احسان موسوی',
    clientPhone: '09351234567',
    clientEmail: 'e.mousavi@netkala.com',
    organization: 'فروشگاه اینترنتی نت‌کالا',
    description: 'طراحی وب‌سایت فروشگاهی مدرن با React/Next.js یا وردپرس ووکامرس بهینه‌سازی شده، دارای فیلترهای پیشرفته مشخصات فنی سوئیچ و روتر، درگاه مستقیم بانکی و سیستم پیامک آنی.',
    urgency: 'normal',
    budgetRange: '۱۰ تا ۳۰ میلیون تومان',
    location: 'سراسر کشور (پروژه ریموت و آنلاین)',
    preferredContact: 'telegram',
    status: 'consultation',
    statusNotes: 'جلسه نیازسنجی آنلاین از طریق گوگل‌میت برگزار شد و نمونه کارهای فروشگاهی ارائه گردید. پیش‌فاکتور ارسال شده و در انتظار تایید نهایی است.',
    estimatedDelivery: '۱۴۰۳/۰۹/۱۰',
    assignedEngineer: 'مهندس سپهری (طراح ارشد وب و فرانت‌اند)',
    createdAt: '۱۴۰۳/۰۸/۱۳',
    updatedAt: '۱۴۰۳/۰۸/۱۵'
  }
];

export const INITIAL_OFFICIAL_CERTS: Certificate[] = [
  {
    id: 'cert-sample-1',
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
  },
  {
    id: 'cert-sample-2',
    certificateNumber: 'PN-CERT-2024-5120',
    userId: 'usr-202',
    userName: 'سارا محمدی',
    userPhone: '09198765432',
    courseId: 'course-mikrotik-mtcna',
    courseTitle: 'دوره کاربردی مدیریت شبکه‌های میکروتیک (MTCNA)',
    instructorName: 'مهندس محمدرضا قاسمی',
    issueDate: '۱۴۰۳/۰۶/۱۵',
    gradeScore: 92,
    verificationCode: 'MTCNA-92-5120-VERIFIED'
  },
  {
    id: 'cert-sample-3',
    certificateNumber: 'PN-CERT-2024-9403',
    userId: 'usr-303',
    userName: 'امیررضا کاظمی',
    userPhone: '09351234567',
    courseId: 'course-fullstack-react',
    courseTitle: 'دوره پروژه محور طراحی وب با React 19 و Tailwind CSS',
    instructorName: 'مهندس علی احمدی',
    issueDate: '۱۴۰۳/۰۵/۲۲',
    gradeScore: 88,
    verificationCode: 'REACT-88-9403-VERIFIED'
  }
];

export const INITIAL_ORGANIC_SHIPPING_METHODS: OrganicShippingMethod[] = [
  {
    id: 'post_pishtaz',
    title: 'پست پیشتاز سراسری (شرکت ملی پست)',
    cost: 45000,
    estimatedDelivery: '۳ الی ۵ روز کاری',
    description: 'تحویل درب منزل در تمام شهرها و روستاهای ایران با کارتن استاندارد و حباب‌دار',
    badge: 'اقتصادی و مطمئن'
  },
  {
    id: 'tipax',
    title: 'تیپاکس اکسپرس درب منزل (Tipax Courier)',
    cost: 65000,
    estimatedDelivery: '۲۴ الی ۴۸ ساعت کاری',
    description: 'سریع‌ترین روش ارسال بین‌شهری همراه با پیامک رهگیری وضعیت مرسوله',
    badge: 'پیشنهادی'
  },
  {
    id: 'express_courier',
    title: 'پیک ویژه موتوری روز (مخصوص تهران و کرج)',
    cost: 85000,
    estimatedDelivery: 'تحویل همان روز (کمتر از ۴ ساعت)',
    description: 'ارسال فوری ویژه ساکنین استان تهران و البرز',
    badge: 'تحویل فوری روز'
  },
  {
    id: 'special_coldpack',
    title: 'ارسال ویژه با کلمن و یخ‌دان (Cold-Pack)',
    cost: 95000,
    estimatedDelivery: 'ارسال خنک و تضمینی',
    description: 'مخصوص زغال‌اخته نوبرانه تازه، آلوهای گوشتی و محصولات نیازمند برودت',
    badge: 'تضمین تازگی نوبرانه'
  },
  {
    id: 'barbari',
    title: 'باربری و اتوبوس‌رانی بین‌شهری (سفارشات عمده بالای ۱۰ کیلوگرم)',
    cost: 50000,
    estimatedDelivery: '۲۴ الی ۴۸ ساعت',
    description: 'تحویل در انبار باربری ترمینال شهر مقصد ویژه خریدهای عمده و رستورانی',
    badge: 'ویژه سفارشات عمده'
  }
];

export const INITIAL_ORGANIC_PRODUCTS: OrganicProduct[] = [
  {
    id: 'org-prod-1',
    title: 'گردوی کاغذی اعلا تویسرکان (سوپر ممتاز دست‌چین)',
    slug: 'organic-toyserkan-walnut',
    category: 'nuts',
    grade: 'ممتاز صادراتی',
    type: 'پوست‌کاغذی سوزنی، مغز سفید برفی و پرچرب',
    shortDescription: 'گردوی اصل تویسرکان با پوسته نازک که به آسانی با فشار دست می‌شکند، ۱۰۰٪ پرچرب و بدون مغز سوخته.',
    description: `<p><strong>گردوی کاغذی اعلا تویسرکان</strong> محصول باغات دامنه‌های الوند همدان است که به عنوان پایتخت گردوی جهان شناخته می‌شود. این گردو دارای پوسته فوق‌العاده نازک (پوست کاغذی واقعی) است که به راحتی با فشار دو انگشت می‌شکند.</p>
<h3>ویژگی‌های اختصاصی گردوی تویسرکان:</h3>
<ul>
  <li>مغز روشن و یکدست با درصد سفیدی بالای ۹۲٪</li>
  <li>چربی طبیعی و روغن ارگانیک فوق‌العاده لذیذ بدون طعم ماندگی یا تلخی</li>
  <li>کاملاً ارگانیک، بدون سم‌پاشی شیمیایی و کودهای هورمونی</li>
  <li>برداشت امسال (پاییز ۱۴۰۳) با رطوبت استاندارد انبارداری</li>
</ul>
<p>این محصول منبع سرشار اسیدهای چرب غیراشباع <strong>امگا ۳</strong>، آنتی‌اکسیدان‌های ضدپیری و ویتامین‌های گروه B است که برای تقویت حافظه، جلوگیری از آلزایمر و کاهش چربی خون توصیه اکید می‌شود.</p>`,
    image: '/src/assets/images/organic_walnuts_1792656122598.jpg',
    galleryImages: [
      '/src/assets/images/organic_store_banner_1792656193622.jpg',
      '/src/assets/images/organic_hazelnuts_1792656157355.jpg'
    ],
    packageOptions: [
      { id: 'pkg-w-500', weightLabel: '۵۰۰ گرم پاکتی', weightGrams: 500, price: 340000, originalPrice: 390000, inStock: true },
      { id: 'pkg-w-1000', weightLabel: '۱ کیلوگرم اعلا', weightGrams: 1000, price: 650000, originalPrice: 750000, inStock: true },
      { id: 'pkg-w-3000', weightLabel: '۳ کیلوگرم خانگی', weightGrams: 3000, price: 1850000, originalPrice: 2200000, inStock: true },
      { id: 'pkg-w-5000', weightLabel: '۵ کیلوگرم عمده اقتصادی', weightGrams: 5000, price: 2980000, originalPrice: 3600000, inStock: true }
    ],
    basePrice: 650000,
    originalBasePrice: 750000,
    unit: 'کیلوگرم',
    stockQuantityKg: 185,
    harvestYear: 'پاییز ۱۴۰۳ (برداشت امسال)',
    originRegion: 'باغات کهن تویسرکان، همدان (ارتفاع ۲۰۰۰ متری)',
    colorAndAppearance: 'مغز سفید شیری و روشن، پوسته تمیز و بدون خال یا تیرگی، روغن‌دهی بالا',
    dimensionsAndSize: 'کالیبر درشت ۳۴ الی ۳۶ میلی‌متر، گرد و کاملاً یکدست',
    properties: [
      'سرشار از اسیدهای چرب امگا ۳ طبیعی',
      'تقویت چشمگیر حافظه و تمرکز ذهنی',
      'کاهنده کلسترول بد (LDL) و تنظیم فشار خون',
      'فاقد هرگونه مواد نگه‌دارنده و فرآوری صنعتی'
    ],
    nutritionalFacts: {
      servingSize: '۱۰۰ گرم مغز گردو',
      calories: 654,
      proteinGrams: 15.2,
      carbsGrams: 13.7,
      fiberGrams: 6.7,
      fatGrams: 65.2,
      saturatedFatGrams: 6.1,
      sugarGrams: 2.6,
      sodiumMg: 2,
      potassiumMg: 441,
      magnesiumMg: 158,
      ironMg: 2.9,
      calciumMg: 98,
      zincMg: 3.1,
      vitaminE_Mg: 0.7,
      omega3_Grams: 9.1,
      highlights: [
        'منبع استثنایی اسیدهای چرب امگا ۳ (۹.۱ گرم در هر ۱۰۰ گرم)',
        'تقویت‌کننده طبیعی سلول‌های خاکستری مغز و تمرکز ذهنی',
        'غنی از منیزیم، مس و فسفر با اثرات اثبات‌شده ضدپیری'
      ]
    },
    tags: ['گردو', 'تویسرکان', 'پوست_کاغذی', 'خشکبار_ارگانیک', 'آجیل_اعلا'],
    isFeatured: true,
    rating: 4.96,
    reviewsCount: 48,
    farmCost: 470000,
    updatedAt: '۱۴۰۳/۰۸/۰۱'
  },
  {
    id: 'org-prod-2',
    title: 'فندق خندان اشکورات رودسر (کوهی و درشت)',
    slug: 'organic-eshkevarat-hazelnut',
    category: 'nuts',
    grade: 'درجه یک اعلا',
    type: 'خام کوهی، خندان طبیعی دست‌چین',
    shortDescription: 'فندق اصیل اشکورات گیلان، پرچرب و ترد با خندانی بالای ۹۵ درصد، بو نداده و کاملاً تازه.',
    description: `<p><strong>فندق اشکورات رودسر</strong> معروف‌ترین و باکیفیت‌ترین فندق خاورمیانه است که در ارتفاعات مه‌آلود گیلان تولید می‌شود. آب‌وهوای کوهستانی منطقه باعث تجمع چربی مفید طبیعی و طعم شیرین بی‌نظیری در این فندق گردیده است.</p>
<h3>مزایای مصرف فندق ارگانیک اشکورات:</h3>
<ul>
  <li>غنی‌ترین منبع گیاهی ویتامین E برای جوانی و طراوت پوست</li>
  <li>تقویت سیستم عضلانی ورزشکاران و کودکان در حال رشد</li>
  <li>خام و فاقد نمک یا مواد افزودنی شیمیایی</li>
</ul>`,
    image: '/src/assets/images/organic_hazelnuts_1792656157355.jpg',
    galleryImages: [
      '/src/assets/images/organic_store_banner_1792656193622.jpg'
    ],
    packageOptions: [
      { id: 'pkg-h-500', weightLabel: '۵۰۰ گرم پاکتی', weightGrams: 500, price: 310000, originalPrice: 360000, inStock: true },
      { id: 'pkg-h-1000', weightLabel: '۱ کیلوگرم اعلا', weightGrams: 1000, price: 590000, originalPrice: 690000, inStock: true },
      { id: 'pkg-h-2000', weightLabel: '۲ کیلوگرم', weightGrams: 2000, price: 1140000, originalPrice: 1350000, inStock: true }
    ],
    basePrice: 590000,
    originalBasePrice: 690000,
    unit: 'کیلوگرم',
    stockQuantityKg: 130,
    harvestYear: 'شهریور ۱۴۰۳ (تازه‌چین)',
    originRegion: 'روستای دیورود، منطقه اشکورات رودسر، گیلان',
    colorAndAppearance: 'پوسته قهوه‌ای شفاف و براق، مغز طلایی مایل به سفید و پرچرب',
    dimensionsAndSize: 'کالیبر درشت ۱۸ الی ۲۰ میلی‌متر، مغزهای سالم و پر',
    properties: [
      'سرشار از ویتامین E و منیزیم',
      'تقویت عضلات قلب و تنظیم ضربان',
      'کمک به بهبود کم‌خونی و خستگی مفرط'
    ],
    nutritionalFacts: {
      servingSize: '۱۰۰ گرم مغز فندق',
      calories: 628,
      proteinGrams: 15.0,
      carbsGrams: 16.7,
      fiberGrams: 9.7,
      fatGrams: 60.8,
      saturatedFatGrams: 4.5,
      sugarGrams: 4.3,
      sodiumMg: 0,
      potassiumMg: 680,
      magnesiumMg: 163,
      calciumMg: 114,
      ironMg: 4.7,
      zincMg: 2.5,
      vitaminE_Mg: 15.0,
      highlights: [
        'بالاترین میزان ویتامین E در بین تمام مغزها (۱۰۰٪ نیاز روزانه پوست و مو)',
        'سرشار از اسید اولئیک برای تنظیم کلسترول و عروق کرونر قلب',
        'حاوی ۹.۷ گرم فیبر پروبیوتیک گیاهی برای سلامت روده'
      ]
    },
    tags: ['فندق', 'اشکورات', 'رودسر', 'فندق_خندان', 'ارگانیک'],
    isFeatured: true,
    rating: 4.91,
    reviewsCount: 36,
    farmCost: 420000,
    updatedAt: '۱۴۰۳/۰۷/۲۸'
  },
  {
    id: 'org-prod-3',
    title: 'زغال اخته ترش و ملس الموت قزوین (آفتاب‌خشک سنتی)',
    slug: 'organic-alamut-cornelian-cherry',
    category: 'dried-fruits',
    grade: 'ارگانیک وحشی کوهستان',
    type: 'آفتاب‌خشک سنتی بدون گوگرد و شکر',
    shortDescription: 'زغال اخته اصیل دره‌های تاریخی الموت، گوشتی و تمیز با طعم ترش و ملس بهشتی و خواص دارویی اثبات‌شده.',
    description: `<p><strong>زغال اخته الموت قزوین</strong> سوغات نامدار دره‌های کوهستانی البرز است. این میوه یاقوتی به شیوه ۱۰۰٪ سنتی در زیر تابش آفتاب کوهستان خشک شده و فاقد هرگونه ماده نگهدارنده شیمیایی، گوگرد یا شکر افزوده است.</p>
<h3>خواص درمانی زغال اخته ارگانیک:</h3>
<ul>
  <li>بهترین آنتی‌اکسیدان طبیعی برای چربی‌سوزی و پاکسازی آنزیم‌های کبد چرب</li>
  <li>درمان و پیشگیری اثبات‌شده از عفونت‌های ادراری و سنگ کلیه</li>
  <li>تنظیم ترشح انسولین و کاهش قند خون بیماران دیابتی</li>
</ul>`,
    image: '/src/assets/images/organic_cornelian_1792656138756.jpg',
    galleryImages: [
      '/src/assets/images/organic_store_banner_1792656193622.jpg'
    ],
    packageOptions: [
      { id: 'pkg-c-250', weightLabel: '۲۵۰ گرم', weightGrams: 250, price: 135000, originalPrice: 160000, inStock: true },
      { id: 'pkg-c-500', weightLabel: '۵۰۰ گرم', weightGrams: 500, price: 255000, originalPrice: 300000, inStock: true },
      { id: 'pkg-c-1000', weightLabel: '۱ کیلوگرم ویژه', weightGrams: 1000, price: 480000, originalPrice: 570000, inStock: true }
    ],
    basePrice: 480000,
    originalBasePrice: 570000,
    unit: 'کیلوگرم',
    stockQuantityKg: 18,
    stockKg: 18,
    lowStockThresholdKg: 25,
    harvestYear: 'تابستان ۱۴۰۳',
    originRegion: 'روستای هیر و دره‌های الموت، قزوین',
    colorAndAppearance: 'یاقوتی تیره، گوشتی و تمیز بدون گرد و غبار، ترش ملس طبیعی',
    dimensionsAndSize: 'دانه‌های متوسط و درشت گوشتی دست‌چین',
    properties: [
      'چربی‌سوز طبیعی و سم‌زدایی کبد',
      'درمان عفونت‌های مجاری ادراری و کلیه',
      'سرشار از آنتوسیانین و ویتامین C ضدسرطان'
    ],
    nutritionalFacts: {
      servingSize: '۱۰۰ گرم زغال اخته خشک سنتی',
      calories: 285,
      proteinGrams: 2.8,
      carbsGrams: 68.4,
      fiberGrams: 8.5,
      fatGrams: 0.9,
      saturatedFatGrams: 0.1,
      sugarGrams: 46.0,
      sodiumMg: 15,
      potassiumMg: 520,
      calciumMg: 78,
      ironMg: 2.4,
      vitaminC_Mg: 54.0,
      highlights: [
        'بمب آنتی‌اکسیدانی و فلاونوئیدهای آنتوسیانین ضدالتهاب',
        '۵۴ میلی‌گرم ویتامین C طبیعی برای تقویت ایمنی و سلامت پوست',
        'پاک‌کننده طبیعی اسید اوریک و سم‌زدای کبد و کلیه'
      ]
    },
    tags: ['زغال_اخته', 'الموت', 'ترش', 'میوه_خشک', 'کبد_چرب'],
    isFeatured: true,
    rating: 4.98,
    reviewsCount: 52,
    farmCost: 330000,
    updatedAt: '۱۴۰۳/۰۷/۲۰'
  },
  {
    id: 'org-prod-4',
    title: 'لوبیا چیتی ارگانیک دست‌چین خمین (زودپز و بدون نفخ)',
    slug: 'organic-khomein-pinto-beans',
    category: 'legumes',
    grade: 'درجه یک اعلا',
    type: 'بوجاری شده و لیزری، بدون ضایعات و سنگ',
    shortDescription: 'لوبیا چیتی محصول دشت‌های پاک خمین، زودپز در کمتر از ۴۰ دقیقه با لعاب عالی و پوست نازک بدون ایجاد نفخ.',
    description: `<p><strong>لوبیا چیتی ارگانیک خمین</strong> قطب برتر تولید حبوبات باکیفیت ایران است. این محصول با آب قنات و بدون استفاده از فاضلاب یا کودهای شیمایی ناسالم کشت گردیده و در دستگاه‌های سورتینگ بوجار و پاکسازی شده است.</p>
<h3>ویژگی‌های پخت و ارزش غذایی:</h3>
<ul>
  <li>زمان پخت سریع زیر ۴۰ دقیقه بدون له شدن یا جدا شدن پوسته</li>
  <li>پروتئین گیاهی خالص و غنی از آهن، فولات و فیبر رژیمی</li>
  <li>بسیار خوش‌خوراک و ایجادکننده لعاب بی‌نظیر در قورمه‌سبزی و خوراک لوبیا</li>
</ul>`,
    image: '/src/assets/images/organic_plums_beans_1792656171742.jpg',
    galleryImages: [
      '/src/assets/images/organic_store_banner_1792656193622.jpg'
    ],
    packageOptions: [
      { id: 'pkg-b-900', weightLabel: '۹۰۰ گرم پاکتی', weightGrams: 900, price: 185000, originalPrice: 220000, inStock: true },
      { id: 'pkg-b-2000', weightLabel: '۲ کیلوگرم خانگی', weightGrams: 2000, price: 395000, originalPrice: 460000, inStock: true },
      { id: 'pkg-b-5000', weightLabel: '۵ کیلوگرم کیسه‌ای عمده', weightGrams: 5000, price: 940000, originalPrice: 1100000, inStock: true }
    ],
    basePrice: 195000,
    originalBasePrice: 230000,
    unit: 'کیلوگرم',
    stockQuantityKg: 280,
    harvestYear: 'پاییز ۱۴۰۳ (نوبرانه امسال)',
    originRegion: 'مزارع نمونه خمین، استان مرکزی',
    colorAndAppearance: 'طرح خال‌های صورتی و بنفش روی زمینه کرم، بدون سوراخ و کرم‌خوردگی',
    dimensionsAndSize: 'دانه‌های تپل و یکدست با کالیبر درشت',
    properties: [
      'منبع غنی پروتئین گیاهی و آهن خون‌ساز',
      'پخت سریع و هضم آسان بدون ایجاد نفخ',
      'سرشار از فیبر و کاهنده جذب قند غذا'
    ],
    nutritionalFacts: {
      servingSize: '۱۰۰ گرم دانه خام ارگانیک',
      calories: 347,
      proteinGrams: 21.4,
      carbsGrams: 62.6,
      fiberGrams: 15.5,
      fatGrams: 1.2,
      saturatedFatGrams: 0.2,
      sugarGrams: 2.1,
      sodiumMg: 12,
      potassiumMg: 1390,
      magnesiumMg: 176,
      ironMg: 5.1,
      calciumMg: 113,
      zincMg: 2.3,
      highlights: [
        '۲۱.۴ گرم پروتئین گیاهی خالص (جایگزین فوق‌العاده برای رژیم‌های سلامت و ورزشی)',
        '۱۵.۵ گرم فیبر رژیمی برای کنترل دیابت و کلسترول خون',
        '۱۳۹۰ میلی‌گرم پتاسیم و ۵.۱ میلی‌گرم آهن خون‌ساز در هر ۱۰۰ گرم'
      ]
    },
    tags: ['لوبیا_چیتی', 'خمین', 'حبوبات_ارگانیک', 'زودپز'],
    isFeatured: true,
    rating: 4.88,
    reviewsCount: 29,
    farmCost: 135000,
    updatedAt: '۱۴۰۳/۰۷/۲۵'
  },
  {
    id: 'org-prod-5',
    title: 'آلو بخارا طلایی شمس نیشابور (آفتاب‌خشک طبیعی)',
    slug: 'organic-neyshabur-golden-plum',
    category: 'dried-fruits',
    grade: 'ممتاز صادراتی',
    type: 'آفتاب‌خشک سنتی، گوشتی و شیرین بدون تیزاب',
    shortDescription: 'آلو بخارای زرین و آبدار نیشابور، فرآوری‌شده به روش سنتی با طعم ملس و ترشی ملایم مناسب انواع خورشت و مصرف روزانه.',
    description: `<p><strong>آلو بخارای ممتاز نیشابور</strong> یکی از نام‌آورترین محصولات باغی خراسان است. باغات دامنه بینالود نیشابور بهترین خاک و آب را برای باردهی این آلوهای طلایی و گوشتی فراهم می‌آورند.</p>
<h3>چرا آلوی ارگانیک نیشابور؟</h3>
<ul>
  <li>خشک شده به شیوه بهداشتی سنتی آفتاب بدون دود گوگرد یا اسید سیتریک</li>
  <li>گوشت فراوان و بافت نرم و ملس که در پخت خورشت طعم شگفت‌انگیزی آزاد می‌کند</li>
  <li>بهترین راهکار طبیعی برای تنظیم سلامت دستگاه گوارش و رفع یبوست مزمن</li>
</ul>`,
    image: '/src/assets/images/organic_plums_beans_1792656171742.jpg',
    galleryImages: [
      '/src/assets/images/organic_store_banner_1792656193622.jpg'
    ],
    packageOptions: [
      { id: 'pkg-p-500', weightLabel: '۵۰۰ گرم', weightGrams: 500, price: 210000, originalPrice: 250000, inStock: true },
      { id: 'pkg-p-1000', weightLabel: '۱ کیلوگرم ممتاز', weightGrams: 1000, price: 395000, originalPrice: 480000, inStock: true },
      { id: 'pkg-p-2000', weightLabel: '۲ کیلوگرم', weightGrams: 2000, price: 760000, originalPrice: 920000, inStock: true }
    ],
    basePrice: 395000,
    originalBasePrice: 480000,
    unit: 'کیلوگرم',
    stockQuantityKg: 14,
    stockKg: 14,
    lowStockThresholdKg: 25,
    harvestYear: 'امسال ۱۴۰۳',
    originRegion: 'باغات خرو و درود، نیشابور، خراسان رضوی',
    colorAndAppearance: 'طلایی کهربایی روشن، براق، تمیز و گوشتی بدون پوسته سیاه',
    dimensionsAndSize: 'درشت و گوشتی با هسته کوچک و جداشونده',
    properties: [
      'ملین پرقدرت و درمان قطعی تنبلی روده',
      'منبع غنی پتاسیم و تعدیل فشار خون',
      'سرشار از آنتی‌اکسیدان‌های سلامت چشم و پوست'
    ],
    nutritionalFacts: {
      servingSize: '۱۰۰ گرم آلو بخارا گوشتی',
      calories: 240,
      proteinGrams: 2.2,
      carbsGrams: 63.9,
      fiberGrams: 7.1,
      fatGrams: 0.4,
      saturatedFatGrams: 0.05,
      sugarGrams: 38.1,
      sodiumMg: 2,
      potassiumMg: 732,
      magnesiumMg: 41,
      ironMg: 2.1,
      calciumMg: 51,
      vitaminC_Mg: 12.0,
      vitaminE_Mg: 0.5,
      highlights: [
        'درمان اثبات‌شده یبوست و تنبلی روده به کمک سوربیتول طبیعی و فیبر محلول',
        '۷۳۲ میلی‌گرم پتاسیم فعال برای تنظیم فشار خون شریانی',
        'خشک شده در آفتاب طبیعی، کاملاً عاری از تیزاب، پارافین و گاز گوگرد'
      ]
    },
    tags: ['آلو_بخارا', 'نیشابور', 'میوه_خشک', 'خورشتی', 'ارگانیک'],
    isFeatured: true,
    rating: 4.93,
    reviewsCount: 41,
    farmCost: 275000,
    updatedAt: '۱۴۰۳/۰۷/۱۸'
  },
  {
    id: 'org-prod-6',
    title: 'عسل کوهستان سبلان (گون و آویشن وحشی ۱۰۰٪ طبیعی)',
    slug: 'organic-sabalan-wild-honey',
    category: 'herbs-honey',
    grade: 'ارگانیک وحشی کوهستان',
    type: 'خام و تصفیه‌نشده، ساکارز ۱.۵ درصد با برگه آزمایش',
    shortDescription: 'عسل طبیعی مراتع کوهپایه سبلان، عطر غلیظ آویشن و گون کوهی با تأییدیه آزمایشگاهی و ضمانت خلوص صددرصدی.',
    description: `<p><strong>عسل ارگانیک کوهستان سبلان</strong> حاصل زنبورداری سنتی در ارتفاعات بالای ۲۵۰۰ متری دامنه کوه سبلان است. کندوها در فصل گل‌دهی آویشن و گون کوهی مستقر شده و هیچ‌گونه تغذیه با شکر یا شربت صنعتی به زنبورها داده نشده است.</p>
<h3>مشخصات آزمایشگاهی:</h3>
<ul>
  <li>درصد ساکارز ۱.۵٪ (بسیار پایین‌تر از استاندارد ۵٪ عسل طبیعی)</li>
  <li>رطوبت پایین و عطر کوهستانی تند و طبیعی</li>
  <li>بهبود زخم‌های معده، تقویت قوای دفاعی بدن و تسکین گلو درد</li>
</ul>`,
    image: '/src/assets/images/organic_store_banner_1792656193622.jpg',
    galleryImages: [
      '/src/assets/images/organic_walnuts_1792656122598.jpg'
    ],
    packageOptions: [
      { id: 'pkg-m-500', weightLabel: '۵۰۰ گرم شیشه‌ای', weightGrams: 500, price: 295000, originalPrice: 340000, inStock: true },
      { id: 'pkg-m-1000', weightLabel: '۱ کیلوگرم شیشه‌ای پلمپ', weightGrams: 1000, price: 560000, originalPrice: 650000, inStock: true }
    ],
    basePrice: 560000,
    originalBasePrice: 650000,
    unit: 'کیلوگرم',
    stockQuantityKg: 70,
    harvestYear: 'تابستان ۱۴۰۳',
    originRegion: 'ییلاقات سبلان، استان اردبیل',
    colorAndAppearance: 'کهربایی تیره و زلال، عطر گل‌های وحشی بدون ذرات معلق',
    dimensionsAndSize: 'غلظت بالا و چگالی طبیعی استاندارد عسل خام',
    properties: [
      'آنتی‌بیوتیک طبیعی و تقویت سیستم ایمنی',
      'درمان سوزش و زخم معده و بیماری‌های گوارشی',
      'فاقد قند صنعتی و مناسب افراد با رژیم سلامت'
    ],
    nutritionalFacts: {
      servingSize: '۱۰۰ گرم عسل خام و خالص',
      calories: 304,
      proteinGrams: 0.3,
      carbsGrams: 82.4,
      fiberGrams: 0.2,
      fatGrams: 0.0,
      sugarGrams: 82.1,
      sodiumMg: 4,
      potassiumMg: 52,
      calciumMg: 6,
      ironMg: 0.4,
      zincMg: 0.2,
      vitaminC_Mg: 2.5,
      highlights: [
        'ساکارز طبیعی ۱.۵٪ با دیاستاز فعال و آنزیم‌های زنده زنبور عسل',
        'منبع انرژی طبیعی فوری با جذب سلولی بدون آسیب به لوزالمعده',
        'خاصیت ضدباکتری و ضدقارچ قوی برای بهبود زخم‌ها و التهاب گلو'
      ]
    },
    tags: ['عسل', 'سبلان', 'طبیعی', 'آویشن', 'ارگانیک'],
    isFeatured: true,
    rating: 4.97,
    reviewsCount: 38,
    farmCost: 390000,
    updatedAt: '۱۴۰۳/۰۸/۰۲'
  }
];

export const INITIAL_ORGANIC_ORDERS: OrganicOrder[] = [
  {
    id: 'org-ord-101',
    orderNumber: 'ORG-1403-8841',
    customerName: 'مهندس محمدرضا حسینی',
    customerPhone: '09123456789',
    customerProvince: 'تهران',
    customerCity: 'تهران',
    customerPostalCode: '1998765432',
    customerAddress: 'سعادت‌آباد، میدان کاج، خیابان سرو غربی، پلاک ۲۴، واحد ۶',
    notes: 'لطفاً عصر بعد از ساعت ۱۶ تحویل شود. زنگ واحد ۶ را بزنید.',
    items: [
      {
        productId: 'org-prod-1',
        packageOptionId: 'pkg-w-1000',
        title: 'گردوی کاغذی اعلا تویسرکان (سوپر ممتاز دست‌چین)',
        weightLabel: '۱ کیلوگرم اعلا',
        quantity: 1,
        unitPrice: 650000,
        totalPrice: 650000
      },
      {
        productId: 'org-prod-3',
        packageOptionId: 'pkg-c-500',
        title: 'زغال اخته ترش و ملس الموت قزوین (آفتاب‌خشک سنتی)',
        weightLabel: '۵۰۰ گرم',
        quantity: 1,
        unitPrice: 255000,
        totalPrice: 255000
      }
    ],
    subtotal: 905000,
    shippingCost: 65000,
    discountAmount: 0,
    totalPayable: 970000,
    shippingMethodId: 'tipax',
    shippingMethodName: 'تیپاکس اکسپرس درب منزل (Tipax Courier)',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    shippingStatus: 'delivered',
    trackingCode: 'TPX-9841203941',
    isSettledWithFarm: true,
    farmCost: 635000,
    profitAmount: 270000,
    createdAt: '۱۴۰۳/۰۷/۲۲'
  },
  {
    id: 'org-ord-102',
    orderNumber: 'ORG-1403-8842',
    customerName: 'دکتر مریم شریفی',
    customerPhone: '09132223344',
    customerProvince: 'اصفهان',
    customerCity: 'اصفهان',
    customerPostalCode: '8145678901',
    customerAddress: 'خیابان چهارباغ بالا، کوچه کاویان، ساختمان پزشکان صبا، طبقه دوم',
    items: [
      {
        productId: 'org-prod-4',
        packageOptionId: 'pkg-b-2000',
        title: 'لوبیا چیتی ارگانیک دست‌چین خمین (زودپز و بدون نفخ)',
        weightLabel: '۲ کیلوگرم خانگی',
        quantity: 1,
        unitPrice: 395000,
        totalPrice: 395000
      },
      {
        productId: 'org-prod-5',
        packageOptionId: 'pkg-p-1000',
        title: 'آلو بخارا طلایی شمس نیشابور (آفتاب‌خشک طبیعی)',
        weightLabel: '۱ کیلوگرم ممتاز',
        quantity: 1,
        unitPrice: 395000,
        totalPrice: 395000
      }
    ],
    subtotal: 790000,
    shippingCost: 45000,
    discountAmount: 0,
    totalPayable: 835000,
    shippingMethodId: 'post_pishtaz',
    shippingMethodName: 'پست پیشتاز سراسری (شرکت ملی پست)',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    shippingStatus: 'shipped',
    trackingCode: 'POST-34509120491',
    isSettledWithFarm: false,
    farmCost: 545000,
    profitAmount: 245000,
    createdAt: '۱۴۰۳/۰۷/۲۸'
  },
  {
    id: 'org-ord-103',
    orderNumber: 'ORG-1403-8843',
    customerName: 'مهندس رضا کمالی',
    customerPhone: '09355556677',
    customerProvince: 'البرز',
    customerCity: 'کرج',
    customerPostalCode: '3156789012',
    customerAddress: 'عظیمیه، میدان مهران، خیابان ندای جنوبی، کوچه شقایق، پلاک ۱۲',
    notes: 'تحویل با هماهنگی تلفنی قبل از ارسال',
    items: [
      {
        productId: 'org-prod-2',
        packageOptionId: 'pkg-h-1000',
        title: 'فندق خندان اشکورات رودسر (کوهی و درشت)',
        weightLabel: '۱ کیلوگرم اعلا',
        quantity: 1,
        unitPrice: 590000,
        totalPrice: 590000
      },
      {
        productId: 'org-prod-3',
        packageOptionId: 'pkg-c-500',
        title: 'زغال اخته ترش و ملس الموت قزوین (آفتاب‌خشک سنتی)',
        weightLabel: '۵۰۰ گرم',
        quantity: 1,
        unitPrice: 255000,
        totalPrice: 255000
      }
    ],
    subtotal: 845000,
    shippingCost: 85000,
    discountAmount: 0,
    totalPayable: 930000,
    shippingMethodId: 'express_courier',
    shippingMethodName: 'پیک ویژه موتوری روز (مخصوص تهران و کرج)',
    paymentMethod: 'card_to_card',
    paymentStatus: 'paid',
    shippingStatus: 'packed',
    cardRefNumber: 'CARD-REF-994102',
    isSettledWithFarm: false,
    farmCost: 585000,
    profitAmount: 260000,
    createdAt: '۱۴۰۳/۰۸/۰۲'
  }
];

export const INITIAL_ORGANIC_SETTLEMENTS: OrganicSettlement[] = [
  {
    id: 'org-set-1',
    settlementNumber: 'SET-1403-11',
    farmName: 'مزرعه و باغ کهنسال گردوی سپهری (تویسرکان)',
    farmerName: 'حاج قاسم سپهری',
    farmerPhone: '09181112233',
    farmerShaba: 'IR880120000000001234567890',
    farmerBank: 'بانک کشاورزی شعبه مرکزی تویسرکان',
    amount: 1880000,
    orderIds: ['ORG-1403-8841'],
    productSummary: 'تسویه خرید ۴ کیلوگرم گردوی کاغذی اعلا سفارشات مهرماه',
    status: 'settled',
    settlementDate: '۱۴۰۳/۰۷/۲۵',
    trackingCode: 'PAY-AGRI-884210',
    note: 'واریز پایا از حساب تجاری شرکت، پیامک تأیید برای باغدار ارسال شد.'
  },
  {
    id: 'org-set-2',
    settlementNumber: 'SET-1403-12',
    farmName: 'تعاونی باغداران روستای دیورود اشکورات',
    farmerName: 'کربلایی علی رحمانی',
    farmerPhone: '09113334455',
    farmerShaba: 'IR440170000000009876543210',
    farmerBank: 'بانک ملی شعبه رحیم‌آباد رودسر',
    amount: 840000,
    orderIds: ['ORG-1403-8843'],
    productSummary: 'تسویه ۲ کیلوگرم فندق خندان اشکورات درجه یک',
    status: 'pending',
    settlementDate: '۱۴۰۳/۰۸/۰۴',
    note: 'در نوبت تسویه هفتگی پنج‌شنبه‌ها'
  },
  {
    id: 'org-set-3',
    settlementNumber: 'SET-1403-13',
    farmName: 'باغ‌های زغال‌اخته منطقه هیر الموت',
    farmerName: 'مهندس احمد کریمی الموتی',
    farmerPhone: '09127778899',
    farmerShaba: 'IR220190000000005544332211',
    farmerBank: 'بانک صادرات قزوین',
    amount: 660000,
    orderIds: ['ORG-1403-8841', 'ORG-1403-8843'],
    productSummary: 'تسویه خرید زغال‌اخته آفتاب‌خشک سنتی',
    status: 'settled',
    settlementDate: '۱۴۰۳/۰۷/۲۹',
    trackingCode: 'PAY-SAD-441029',
    note: 'تسویه کامل انجام شد.'
  }
];

export const INITIAL_ORGANIC_REVIEWS: OrganicProductReview[] = [
  {
    id: 'rev-org-1',
    productId: 'org-prod-1',
    productTitle: 'گردوی کاغذی اعلا تویسرکان (سوپر ممتاز دست‌چین)',
    userName: 'دکتر علیرضا صدری',
    userPhone: '09121112233',
    rating: 5,
    comment: 'کیفیت گردوها خارق‌العاده بود. پوستش واقعاً کاغذی سوزنی است و با دو انگشت شکسته می‌شود. مغز سفید، بدون ذره‌ای تلخی یا سوختگی و بسیار روغنی و پرچرب. بسته‌بندی زیپ‌کیپ کرافت هم خیلی بهداشتی بود.',
    createdAt: '۱۴۰۳/۰۸/۰۴',
    isVerifiedBuyer: true,
    purchasedPackage: '۱ کیلوگرم اعلا',
    orderNumber: 'ORG-1403-8841',
    recommended: true,
    likesCount: 14
  },
  {
    id: 'rev-org-2',
    productId: 'org-prod-1',
    productTitle: 'گردوی کاغذی اعلا تویسرکان (سوپر ممتاز دست‌چین)',
    userName: 'مهندس زهرا موسوی',
    userPhone: '09351234567',
    rating: 5,
    comment: 'برای صبحانه و فسنجان خانواده گرفتم. طعم اصیل گردوی باغات تویسرکان رو داره و کاملاً مشخصه تازه برداشت امساله. ارسال با بسته‌بندی محکم و تمیز بود.',
    createdAt: '۱۴۰۳/۰۸/۱۰',
    isVerifiedBuyer: true,
    purchasedPackage: '۳ کیلوگرم خانگی',
    orderNumber: 'ORG-1403-8890',
    recommended: true,
    likesCount: 8
  },
  {
    id: 'rev-org-3',
    productId: 'org-prod-2',
    productTitle: 'فندق خندان اشکورات رودسر (کوهی و درشت)',
    userName: 'رضا کمالی',
    userPhone: '09355556677',
    rating: 5,
    comment: 'فندق‌ها کاملاً خندان، ترد و خوش‌طعم هستند. حتی یک دانه پوک یا کرم‌خورده هم داخل بسته نبود. از خریدم فوق‌العاده راضیم.',
    createdAt: '۱۴۰۳/۰۸/۰۲',
    isVerifiedBuyer: true,
    purchasedPackage: '۱ کیلوگرم اعلا',
    orderNumber: 'ORG-1403-8843',
    recommended: true,
    likesCount: 11
  },
  {
    id: 'rev-org-4',
    productId: 'org-prod-3',
    productTitle: 'زغال اخته ترش و ملس الموت قزوین (آفتاب‌خشک سنتی)',
    userName: 'فاطمه ابراهیمی',
    userPhone: '09198765432',
    rating: 5,
    comment: 'دقیقاً همون زغال اخته ترش و ملس روستاهای الموته. گوشتی، تمیز و بدون گرد و غبار. بوی آفتاب‌خشک طبیعی میده و اصلاً گوگرد نداره. برای کبد چرب واقعاً معجزه‌ست.',
    createdAt: '۱۴۰۳/۰۸/۰۶',
    isVerifiedBuyer: true,
    purchasedPackage: '۵۰۰ گرم',
    orderNumber: 'ORG-1403-8843',
    recommended: true,
    likesCount: 19
  },
  {
    id: 'rev-org-5',
    productId: 'org-prod-4',
    productTitle: 'لوبیا چیتی خمین دستچین بوجاری (زودپز و لعاب‌دار)',
    userName: 'مریم حسینی',
    userPhone: '09123334455',
    rating: 5,
    comment: 'بسیار زودپز و خوش‌پخت، لعاب بسیار عالی بدون نیاز به اضافه کردن نشاسته. تمیز و بدون سنگ‌ریزه. حتماً دوباره سفارش میدم.',
    createdAt: '۱۴۰۳/۰۷/۲۲',
    isVerifiedBuyer: true,
    purchasedPackage: '۱ کیلوگرم اعلا',
    orderNumber: 'ORG-1403-8799',
    recommended: true,
    likesCount: 6
  },
  {
    id: 'rev-org-6',
    productId: 'org-prod-6',
    productTitle: 'عسل کوهستان سبلان (گون و آویشن وحشی ۱۰۰٪ طبیعی)',
    userName: 'حسین نجفی',
    userPhone: '09187778899',
    rating: 5,
    comment: 'عطر تند گیاهان کوهی و آویشن سبلان کاملاً حس میشه. طعم شیرینی زننده گلو رو نداره و برگه آزمایش ساکارز هم همراه سفارش بود. خدا برکت بده به زنبوردارش.',
    createdAt: '۱۴۰۳/۰۸/۰۸',
    isVerifiedBuyer: true,
    purchasedPackage: '۱ کیلوگرم شیشه‌ای پلمپ',
    orderNumber: 'ORG-1403-8902',
    recommended: true,
    likesCount: 15
  }
];

export const INITIAL_ORGANIC_STOCK_ALERT_CONFIG: OrganicStockAlertConfig = {
  enableSmsAlerts: true,
  enableEmailAlerts: true,
  adminPhoneNumbers: '09128845678, 09198765432',
  adminEmailAddresses: 'admin@parsnet-academy.com, supply@parsnet-academy.com',
  defaultThresholdKg: 25,
  smsProvider: 'kavenegar',
  smsApiKey: '7A56384210B99C441A9908...',
  smsLineNumber: '10008585',
  autoSendOnOrder: true,
  smsTemplate: 'هشدار انبار پارس‌نت: موجودی محصول [نام_محصول] به [موجودی] کیلوگرم کاهش یافته است (زیر حدنصاب [حدنصاب] کیلوگرم). لطفاً نسبت به تأمین مجدد و تسویه با باغدار اقدام نمایید.',
  emailSubjectTemplate: '⚠️ هشدار کمبود موجودی انبار: محصول [نام_محصول]'
};

export const INITIAL_ORGANIC_STOCK_ALERT_LOGS: OrganicStockAlertLog[] = [
  {
    id: 'alert-log-1',
    productId: 'org-prod-3',
    productTitle: 'زغال اخته ترش و ملس الموت قزوین (آفتاب‌خشک سنتی)',
    currentStockKg: 18,
    thresholdKg: 25,
    channel: 'sms',
    recipient: '09128845678',
    status: 'sent',
    messageText: 'هشدار انبار پارس‌نت: موجودی محصول زغال اخته ترش و ملس الموت به ۱۸ کیلوگرم کاهش یافته است (زیر حدنصاب ۲۵ کیلوگرم). لطفاً نسبت به تأمین مجدد و تسویه با باغدار اقدام نمایید.',
    timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۱:۳۰'
  },
  {
    id: 'alert-log-2',
    productId: 'org-prod-3',
    productTitle: 'زغال اخته ترش و ملس الموت قزوین (آفتاب‌خشک سنتی)',
    currentStockKg: 18,
    thresholdKg: 25,
    channel: 'email',
    recipient: 'admin@parsnet-academy.com',
    status: 'sent',
    messageText: 'گزارش کسری انبار: موجودی محصول ارگانیک زغال اخته ترش و ملس الموت قزوین کمتر از حد نصاب استاندارد ۲۵ کیلوگرم شد.',
    timestamp: '۱۴۰۳/۰۸/۱۰ - ۱۱:۳۱'
  }
];

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
  officialCertificates: Certificate[] = INITIAL_OFFICIAL_CERTS;
  videoNotes: VideoNote[] = [];
  playbackTimes: Record<string, number> = {};
  theme: 'light' | 'dark' = 'light';
  colorTheme: ColorTheme = 'indigo';
  adminTheme: AdminTheme = 'classic-dark';
  toasts: ToastMessage[] = [];
  currentUser: User = INITIAL_USER;
  users: User[] = INITIAL_USERS;
  settings: SiteSettings = INITIAL_SETTINGS;
  cart: CartItem[] = [];
  isAdminLoggedIn: boolean = false;
  listeners: (() => void)[] = [];

  // Dedicated Organic Store State
  organicProducts: OrganicProduct[] = INITIAL_ORGANIC_PRODUCTS;
  organicCart: OrganicCartItem[] = [];
  organicOrders: OrganicOrder[] = INITIAL_ORGANIC_ORDERS;
  organicSettlements: OrganicSettlement[] = INITIAL_ORGANIC_SETTLEMENTS;
  organicReviews: OrganicProductReview[] = INITIAL_ORGANIC_REVIEWS;
  organicStockAlertConfig: OrganicStockAlertConfig = INITIAL_ORGANIC_STOCK_ALERT_CONFIG;
  organicStockAlertLogs: OrganicStockAlertLog[] = INITIAL_ORGANIC_STOCK_ALERT_LOGS;

  // Dedicated Project Services & Client Requests State
  projectServices: ITServiceItem[] = INITIAL_PROJECT_SERVICES;
  projectRequests: ProjectRequest[] = INITIAL_PROJECT_REQUESTS;

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

      const storedQuizzes = localStorage.getItem('parsnet_quizzes');
      this.quizzes = storedQuizzes ? JSON.parse(storedQuizzes) : INITIAL_QUIZZES;

      const storedOfficialCerts = localStorage.getItem('parsnet_official_certs');
      this.officialCertificates = storedOfficialCerts ? JSON.parse(storedOfficialCerts) : INITIAL_OFFICIAL_CERTS;

      // Load Organic Store Data
      const storedOrgProds = localStorage.getItem('parsnet_organic_products');
      this.organicProducts = storedOrgProds ? JSON.parse(storedOrgProds) : INITIAL_ORGANIC_PRODUCTS;

      const storedOrgCart = localStorage.getItem('parsnet_organic_cart');
      this.organicCart = storedOrgCart ? JSON.parse(storedOrgCart) : [];

      const storedOrgOrders = localStorage.getItem('parsnet_organic_orders');
      this.organicOrders = storedOrgOrders ? JSON.parse(storedOrgOrders) : INITIAL_ORGANIC_ORDERS;

      const storedOrgSettlements = localStorage.getItem('parsnet_organic_settlements');
      this.organicSettlements = storedOrgSettlements ? JSON.parse(storedOrgSettlements) : INITIAL_ORGANIC_SETTLEMENTS;

      const storedOrgReviews = localStorage.getItem('parsnet_organic_reviews');
      this.organicReviews = storedOrgReviews ? JSON.parse(storedOrgReviews) : INITIAL_ORGANIC_REVIEWS;

      const storedOrgAlertConfig = localStorage.getItem('parsnet_organic_stock_alert_config');
      this.organicStockAlertConfig = storedOrgAlertConfig ? JSON.parse(storedOrgAlertConfig) : INITIAL_ORGANIC_STOCK_ALERT_CONFIG;

      const storedOrgAlertLogs = localStorage.getItem('parsnet_organic_stock_alert_logs');
      this.organicStockAlertLogs = storedOrgAlertLogs ? JSON.parse(storedOrgAlertLogs) : INITIAL_ORGANIC_STOCK_ALERT_LOGS;

      const storedTheme = localStorage.getItem('parsnet_theme') as 'light' | 'dark';
      this.theme = storedTheme || 'light';
      if (typeof document !== 'undefined') {
        if (this.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }

      const storedColor = (localStorage.getItem('parsnet_color_theme') as ColorTheme) || 'indigo';
      this.colorTheme = storedColor;

      const storedAdminTheme = (localStorage.getItem('parsnet_admin_theme') as AdminTheme) || 'classic-dark';
      this.adminTheme = storedAdminTheme;

      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-color-theme', storedColor);
        document.documentElement.setAttribute('data-admin-theme', storedAdminTheme);
      }

      const storedUser = localStorage.getItem('parsnet_user');
      this.currentUser = storedUser ? JSON.parse(storedUser) : INITIAL_USER;

      const storedUsers = localStorage.getItem('parsnet_users');
      this.users = storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS;

      const storedSettings = localStorage.getItem('parsnet_settings');
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        this.settings = {
          ...INITIAL_SETTINGS,
          ...parsed
        };
      } else {
        this.settings = INITIAL_SETTINGS;
      }

      // Ensure site rebranding to Mehradinet
      if (this.settings.siteTitle.includes('پارس') || !this.settings.siteTitle.includes('مهرادینت')) {
        this.settings.siteTitle = 'مهرادینت';
        this.settings.tagline = 'آموزش تخصصی شبکه، وب، برنامه‌نویسی و انجام پروژه‌های کامپیوتری';
      }

      const storedProjectRequests = localStorage.getItem('mehradinet_project_requests');
      this.projectRequests = storedProjectRequests ? JSON.parse(storedProjectRequests) : INITIAL_PROJECT_REQUESTS;

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
      this.quizzes = INITIAL_QUIZZES;
      this.officialCertificates = INITIAL_OFFICIAL_CERTS;
      this.projectServices = INITIAL_PROJECT_SERVICES;
      this.projectRequests = INITIAL_PROJECT_REQUESTS;
      this.theme = 'light';
      this.colorTheme = 'indigo';
      this.adminTheme = 'classic-dark';
      this.currentUser = INITIAL_USER;
      this.users = INITIAL_USERS;
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
      localStorage.setItem('parsnet_quizzes', JSON.stringify(this.quizzes));
      localStorage.setItem('parsnet_official_certs', JSON.stringify(this.officialCertificates));
      localStorage.setItem('parsnet_video_notes', JSON.stringify(this.videoNotes));
      localStorage.setItem('parsnet_playback_times', JSON.stringify(this.playbackTimes));
      localStorage.setItem('parsnet_theme', this.theme);
      localStorage.setItem('parsnet_color_theme', this.colorTheme);
      localStorage.setItem('parsnet_admin_theme', this.adminTheme);
      localStorage.setItem('parsnet_user', JSON.stringify(this.currentUser));
      localStorage.setItem('parsnet_users', JSON.stringify(this.users));
      localStorage.setItem('parsnet_settings', JSON.stringify(this.settings));
      localStorage.setItem('parsnet_cart', JSON.stringify(this.cart));
      localStorage.setItem('parsnet_admin_auth', this.isAdminLoggedIn ? 'true' : 'false');

      // Save Organic Store Data
      localStorage.setItem('parsnet_organic_products', JSON.stringify(this.organicProducts));
      localStorage.setItem('parsnet_organic_cart', JSON.stringify(this.organicCart));
      localStorage.setItem('parsnet_organic_orders', JSON.stringify(this.organicOrders));
      localStorage.setItem('parsnet_organic_settlements', JSON.stringify(this.organicSettlements));
      localStorage.setItem('parsnet_organic_reviews', JSON.stringify(this.organicReviews));
      localStorage.setItem('parsnet_organic_stock_alert_config', JSON.stringify(this.organicStockAlertConfig));
      localStorage.setItem('parsnet_organic_stock_alert_logs', JSON.stringify(this.organicStockAlertLogs));

      // Save Project Services Requests
      localStorage.setItem('mehradinet_project_requests', JSON.stringify(this.projectRequests));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    this.notify();
  }

  // Project Services Requests Management
  createProjectRequest(data: Omit<ProjectRequest, 'id' | 'trackingCode' | 'createdAt' | 'status'>): ProjectRequest {
    const codeNum = Math.floor(1000 + Math.random() * 9000);
    const newReq: ProjectRequest = {
      ...data,
      id: `prj-${Date.now()}`,
      trackingCode: `PRJ-1403-${codeNum}`,
      status: 'pending',
      statusNotes: 'سفارش شما با موفقیت ثبت شد و در صف ارزیابی اولیه مهندسان مهرادینت قرار گرفت. کارشناس مربوطه به زودی با شما تماس خواهد گرفت.',
      createdAt: new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/\//g, '/'),
      updatedAt: new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/\//g, '/')
    };
    this.projectRequests.unshift(newReq);
    this.saveToStorage();
    this.addToast({
      id: `t-${Date.now()}`,
      type: 'success',
      title: 'سفارش پروژه ثبت شد',
      message: `کد رهگیری اختصاصی شما: ${newReq.trackingCode}`
    });
    return newReq;
  }

  updateProjectRequestStatus(
    id: string, 
    status: ProjectStatus, 
    notes?: string, 
    adminNotes?: string, 
    estimatedDelivery?: string, 
    assignedEngineer?: string
  ) {
    const req = this.projectRequests.find(r => r.id === id);
    if (req) {
      req.status = status;
      if (notes) req.statusNotes = notes;
      if (adminNotes !== undefined) req.adminNotes = adminNotes;
      if (estimatedDelivery !== undefined) req.estimatedDelivery = estimatedDelivery;
      if (assignedEngineer !== undefined) req.assignedEngineer = assignedEngineer;
      req.updatedAt = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).replace(/\//g, '/');
      this.saveToStorage();
      this.addToast({
        id: `t-${Date.now()}`,
        type: 'info',
        title: 'وضعیت پروژه به‌روزرسانی شد',
        message: `پروژه ${req.trackingCode} به وضعیت جدید منتقل شد.`
      });
    }
  }

  deleteProjectRequest(id: string) {
    this.projectRequests = this.projectRequests.filter(r => r.id !== id);
    this.saveToStorage();
    this.addToast({
      id: `t-${Date.now()}`,
      type: 'info',
      title: 'حذف درخواست',
      message: 'درخواست پروژه با موفقیت حذف گردید.'
    });
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

  addToast(toast: { id?: string; type?: 'success' | 'error' | 'info'; title?: string; message: string } | string) {
    if (typeof toast === 'string') {
      this.showToast('info', toast);
    } else {
      const msg = toast.title ? `${toast.title}: ${toast.message}` : toast.message;
      this.showToast(toast.type || 'info', msg);
    }
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

  setColorTheme(theme: ColorTheme) {
    this.colorTheme = theme;
    this.settings = { ...this.settings, colorTheme: theme };
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-color-theme', theme);
    }
    this.saveToStorage();
    this.showToast('info', `تم رنگی سایت با موفقیت تغییر یافت.`);
  }

  setAdminTheme(theme: AdminTheme) {
    this.adminTheme = theme;
    this.settings = { ...this.settings, adminTheme: theme };
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-admin-theme', theme);
    }
    this.saveToStorage();
    this.showToast('info', 'قالب پیشخوان مدیریت با موفقیت تغییر کرد.');
  }

  // Multi-user & Student management
  updateUser(userId: string, updates: Partial<User>) {
    this.users = this.users.map(u => u.id === userId ? { ...u, ...updates } : u);
    if (this.currentUser.id === userId) {
      this.currentUser = { ...this.currentUser, ...updates };
    }
    this.saveToStorage();
    this.showToast('success', 'اطلاعات کاربر با موفقیت به‌روزرسانی شد.');
  }

  addWalletCredit(userId: string, amount: number) {
    this.users = this.users.map(u => {
      if (u.id === userId) {
        return { ...u, walletBalance: (u.walletBalance || 0) + amount };
      }
      return u;
    });
    if (this.currentUser.id === userId) {
      this.currentUser = {
        ...this.currentUser,
        walletBalance: (this.currentUser.walletBalance || 0) + amount
      };
    }
    this.saveToStorage();
    this.showToast('success', `مبلغ ${amount.toLocaleString('fa-IR')} تومان به کیف پول کاربر اضافه گردید.`);
  }

  addUser(newUser: User) {
    this.users = [newUser, ...this.users];
    this.saveToStorage();
    this.showToast('success', 'کاربر جدید به سامانه افزوده شد.');
  }

  deleteUser(userId: string) {
    this.users = this.users.filter(u => u.id !== userId);
    this.saveToStorage();
    this.showToast('info', 'کاربر از لیست کاربران سامانه حذف شد.');
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

  // Certificate Verification Service
  verifyCertificate(query: string): Certificate | null {
    if (!query || !query.trim()) return null;
    const cleanQuery = query.trim().toUpperCase();

    // Check current user certificates
    const allCerts = this.getVerifiedCertificates();
    const found = allCerts.find(c => 
      c.certificateNumber.toUpperCase() === cleanQuery ||
      c.verificationCode.toUpperCase() === cleanQuery ||
      cleanQuery.includes(c.verificationCode.toUpperCase()) ||
      c.certificateNumber.toUpperCase().includes(cleanQuery)
    );

    return found || null;
  }

  getVerifiedCertificates(): Certificate[] {
    const userCerts = this.currentUser.certificates || [];
    const sampleOfficialCerts: Certificate[] = [
      {
        id: 'cert-sample-1',
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
      },
      {
        id: 'cert-sample-2',
        certificateNumber: 'PN-CERT-2024-5120',
        userId: 'usr-202',
        userName: 'سارا محمدی',
        userPhone: '09198765432',
        courseId: 'course-mikrotik-mtcna',
        courseTitle: 'دوره کاربردی مدیریت شبکه‌های میکروتیک (MTCNA)',
        instructorName: 'مهندس محمدرضا قاسمی',
        issueDate: '۱۴۰۳/۰۶/۱۵',
        gradeScore: 92,
        verificationCode: 'MTCNA-92-5120-VERIFIED'
      },
      {
        id: 'cert-sample-3',
        certificateNumber: 'PN-CERT-2024-9403',
        userId: 'usr-303',
        userName: 'امیررضا کاظمی',
        userPhone: '09351234567',
        courseId: 'course-fullstack-react',
        courseTitle: 'دوره پروژه محور طراحی وب با React 19 و Tailwind CSS',
        instructorName: 'مهندس علی احمدی',
        issueDate: '۱۴۰۳/۰۵/۲۲',
        gradeScore: 88,
        verificationCode: 'REACT-88-9403-VERIFIED'
      }
    ];

    // Merge avoiding duplicates by certificateNumber
    const combined = [...userCerts];
    sampleOfficialCerts.forEach(sc => {
      if (!combined.some(c => c.certificateNumber === sc.certificateNumber)) {
        combined.push(sc);
      }
    });

    return this.officialCertificates;
  }

  // Admin Official Certificate Management
  addOfficialCertificate(cert: Certificate) {
    this.officialCertificates = [cert, ...this.officialCertificates];
    this.saveToStorage();
    this.showToast('success', 'گواهینامه جدید با موفقیت در سامانه ثبت گردید.');
  }

  deleteOfficialCertificate(certId: string) {
    this.officialCertificates = this.officialCertificates.filter(c => c.id !== certId);
    this.saveToStorage();
    this.showToast('info', 'گواهینامه مورد نظر با موفقیت حذف گردید.');
  }

  issueManualCertificate(data: {
    userName: string;
    userPhone: string;
    courseTitle: string;
    instructorName: string;
    gradeScore: number;
  }): Certificate {
    const certNumber = `PN-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: Certificate = {
      id: `cert-manual-${Date.now()}`,
      certificateNumber: certNumber,
      userId: `usr-${Date.now()}`,
      userName: data.userName,
      userPhone: data.userPhone,
      courseId: 'course-manual',
      courseTitle: data.courseTitle,
      instructorName: data.instructorName || 'استاد رسمی آکادمی پارس‌نت',
      issueDate: new Date().toLocaleDateString('fa-IR'),
      gradeScore: data.gradeScore,
      verificationCode: `PN-${data.gradeScore}-${Math.floor(100000 + Math.random() * 900000)}`
    };

    this.officialCertificates = [newCert, ...this.officialCertificates];
    this.saveToStorage();
    this.showToast('success', `گواهینامه معتبر با شماره ${certNumber} صادر شد.`);
    return newCert;
  }

  // Admin Quiz / Exam Management
  addQuiz(quiz: CourseQuiz) {
    this.quizzes = [quiz, ...this.quizzes];
    this.saveToStorage();
    this.showToast('success', 'آزمون جدید دوره با موفقیت ثبت شد.');
  }

  updateQuiz(quizId: string, updates: Partial<CourseQuiz>) {
    this.quizzes = this.quizzes.map(q => q.id === quizId ? { ...q, ...updates } : q);
    this.saveToStorage();
    this.showToast('success', 'تغییرات آزمون با موفقیت ذخیره گردید.');
  }

  deleteQuiz(quizId: string) {
    this.quizzes = this.quizzes.filter(q => q.id !== quizId);
    this.saveToStorage();
    this.showToast('info', 'آزمون مورد نظر حذف گردید.');
  }

  // Backup & Restore Entire Site Data (No External Database Required)
  exportAllData(): string {
    const fullBackup = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      courses: this.courses,
      files: this.files,
      orders: this.orders,
      tickets: this.tickets,
      articles: this.articles,
      media: this.media,
      contactMessages: this.contactMessages,
      reviews: this.reviews,
      coupons: this.coupons,
      quizzes: this.quizzes,
      officialCertificates: this.officialCertificates,
      settings: this.settings,
      users: this.users
    };
    return JSON.stringify(fullBackup, null, 2);
  }

  importAllData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.courses) this.courses = data.courses;
      if (data.files) this.files = data.files;
      if (data.orders) this.orders = data.orders;
      if (data.tickets) this.tickets = data.tickets;
      if (data.articles) this.articles = data.articles;
      if (data.media) this.media = data.media;
      if (data.contactMessages) this.contactMessages = data.contactMessages;
      if (data.reviews) this.reviews = data.reviews;
      if (data.coupons) this.coupons = data.coupons;
      if (data.quizzes) this.quizzes = data.quizzes;
      if (data.officialCertificates) this.officialCertificates = data.officialCertificates;
      if (data.settings) this.settings = { ...INITIAL_SETTINGS, ...data.settings };
      if (data.users) this.users = data.users;

      this.saveToStorage();
      this.showToast('success', 'اطلاعات کامل سایت با موفقیت بازیابی شد.');
      return true;
    } catch (err) {
      console.error('Failed to import data', err);
      this.showToast('error', 'فایل پشتیبان نامعتبر است.');
      return false;
    }
  }

  resetDataToDefault() {
    this.courses = INITIAL_COURSES;
    this.files = INITIAL_FILES;
    this.orders = INITIAL_ORDERS;
    this.tickets = INITIAL_TICKETS;
    this.articles = INITIAL_ARTICLES;
    this.media = INITIAL_MEDIA;
    this.contactMessages = INITIAL_CONTACT_MESSAGES;
    this.reviews = INITIAL_REVIEWS;
    this.coupons = INITIAL_COUPONS;
    this.quizzes = INITIAL_QUIZZES;
    this.officialCertificates = INITIAL_OFFICIAL_CERTS;
    this.settings = INITIAL_SETTINGS;
    this.users = INITIAL_USERS;
    this.saveToStorage();
    this.showToast('info', 'تمامی داده‌ها به حالت پیش‌فرض اولیه بازگردانده شدند.');
  }

  // Secure Expiring Download URLs
  generateSignedDownloadUrl(fileId: string): { url: string; token: string; expiresAt: string; expiresSeconds: number } {
    const file = this.files.find(f => f.id === fileId);
    const token = btoa(`${fileId}-${Date.now()}`).substring(0, 16);
    const expiryDate = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours
    const expiresAt = expiryDate.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    return {
      url: file ? `${file.downloadUrl}?token=${token}&expires=${expiryDate.getTime()}` : '#',
      token,
      expiresAt,
      expiresSeconds: 14400
    };
  }

  // ================= ORGANIC STORE METHODS ================= //
  addOrganicProduct(productData: Omit<OrganicProduct, 'id' | 'createdAt'>) {
    const newProduct: OrganicProduct = {
      ...productData,
      id: `org_prod_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.organicProducts.unshift(newProduct);
    this.saveToStorage();
    this.showToast('success', `محصول ارگانیک "${newProduct.name}" با موفقیت اضافه شد.`);
    return newProduct;
  }

  updateOrganicProduct(id: string, updates: Partial<OrganicProduct>) {
    const idx = this.organicProducts.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.organicProducts[idx] = { ...this.organicProducts[idx], ...updates };
      this.saveToStorage();
      this.showToast('success', 'اطلاعات محصول ارگانیک به‌روزرسانی شد.');
    }
  }

  deleteOrganicProduct(id: string) {
    const product = this.organicProducts.find(p => p.id === id);
    this.organicProducts = this.organicProducts.filter(p => p.id !== id);
    this.saveToStorage();
    this.showToast('info', `محصول ارگانیک "${product?.name || ''}" حذف شد.`);
  }

  addToOrganicCart(product: OrganicProduct, selectedPackage: OrganicPackageOption, quantity: number = 1) {
    const pkgWeight = selectedPackage.weightInGrams || selectedPackage.weightGrams || 500;
    const existingIndex = this.organicCart.findIndex(
      item => item.product?.id === product.id && (item.selectedPackage?.weightInGrams || item.selectedPackage?.weightGrams) === pkgWeight
    );

    if (existingIndex > -1) {
      this.organicCart[existingIndex].quantity += quantity;
    } else {
      const newItem: OrganicCartItem = {
        id: `org_cart_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        product,
        selectedPackage,
        quantity,
        title: product.name || product.title || '',
        weightLabel: selectedPackage.weightLabel,
        unitPrice: selectedPackage.discountPrice || selectedPackage.price
      };
      this.organicCart.push(newItem);
    }
    this.saveToStorage();
    this.showToast('success', `بسته ${selectedPackage.weightLabel} "${product.name || product.title}" به سبد خرید ارگانیک اضافه شد.`);
  }

  updateOrganicCartQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromOrganicCart(cartItemId);
      return;
    }
    const item = this.organicCart.find(i => i.id === cartItemId);
    if (item) {
      item.quantity = quantity;
      this.saveToStorage();
    }
  }

  removeFromOrganicCart(cartItemId: string) {
    this.organicCart = this.organicCart.filter(i => i.id !== cartItemId);
    this.saveToStorage();
    this.showToast('info', 'محصول از سبد خرید ارگانیک حذف شد.');
  }

  clearOrganicCart() {
    this.organicCart = [];
    this.saveToStorage();
  }

  createOrganicOrder(data: {
    customerName: string;
    customerPhone: string;
    province: string;
    city: string;
    postalCode: string;
    address: string;
    notes?: string;
    shippingMethod: OrganicShippingMethodId;
    paymentMethod: OrganicPaymentMethod;
  }): OrganicOrder {
    const shippingMethodObj = INITIAL_ORGANIC_SHIPPING_METHODS.find(m => m.id === data.shippingMethod);
    const shippingCost = shippingMethodObj?.price || shippingMethodObj?.cost || 45000;

    let subtotal = 0;
    let totalWeightInGrams = 0;
    const items: OrganicOrderItem[] = this.organicCart.map(c => {
      const price = c.selectedPackage?.discountPrice || c.selectedPackage?.price || c.unitPrice || 0;
      const itemTotal = price * c.quantity;
      const weight = c.selectedPackage?.weightInGrams || c.selectedPackage?.weightGrams || c.weightGrams || 500;
      subtotal += itemTotal;
      totalWeightInGrams += weight * c.quantity;
      return {
        productId: c.product?.id || c.productId || '',
        productName: c.product?.name || c.product?.title || c.title || 'محصول ارگانیک',
        category: c.product?.category || c.category,
        grade: c.product?.grade || c.grade,
        packageLabel: c.selectedPackage?.weightLabel || c.weightLabel || '',
        weightInGrams: weight,
        unitPrice: price,
        quantity: c.quantity,
        totalPrice: itemTotal,
        image: c.product?.image || c.image
      };
    });

    const totalAmount = subtotal + shippingCost;
    const orderNumber = `ORG-${new Date().getFullYear() % 100}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrganicOrder = {
      id: `org_ord_${Date.now()}`,
      orderNumber,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      province: data.province,
      city: data.city,
      postalCode: data.postalCode,
      address: data.address,
      customerProvince: data.province,
      customerCity: data.city,
      customerPostalCode: data.postalCode,
      customerAddress: data.address,
      notes: data.notes,
      items,
      subtotal,
      shippingCost,
      shippingMethod: data.shippingMethod,
      shippingTitle: shippingMethodObj?.title || 'ارسال پیشتاز',
      totalWeightInGrams,
      totalAmount,
      totalPayable: totalAmount,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'processing',
      shippingStatus: 'processing',
      trackingCode: data.shippingMethod === 'express_courier' ? `EXP-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    // Deduct stock for ordered items
    items.forEach(item => {
      const prod = this.organicProducts.find(p => p.id === item.productId);
      if (prod) {
        const deductKg = ((item.weightInGrams || 500) * item.quantity) / 1000;
        if (typeof prod.stockKg === 'number') {
          prod.stockKg = Math.max(0, Number((prod.stockKg - deductKg).toFixed(1)));
        }
        if (typeof prod.stockQuantityKg === 'number') {
          prod.stockQuantityKg = Math.max(0, Number((prod.stockQuantityKg - deductKg).toFixed(1)));
        }
      }
    });

    this.organicOrders.unshift(newOrder);
    this.clearOrganicCart();

    // Check low stock and trigger notification if enabled
    if (this.organicStockAlertConfig.autoSendOnOrder) {
      this.checkAndTriggerLowStockAlerts(`ثبت سفارش شماره ${orderNumber}`);
    }

    this.saveToStorage();
    this.showToast('success', `سفارش ارگانیک شما با شماره پیگیری ${orderNumber} با موفقیت ثبت شد.`);
    return newOrder;
  }

  updateOrganicOrderStatus(orderId: string, status: OrganicOrder['status'], trackingCode?: string) {
    const order = this.organicOrders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      if (trackingCode !== undefined) {
        order.trackingCode = trackingCode;
      }
      if (status === 'delivered' && order.paymentMethod === 'cod') {
        order.paymentStatus = 'paid';
      }
      this.saveToStorage();
      this.showToast('success', `وضعیت سفارش ${order.orderNumber} به‌روز شد.`);
    }
  }

  addOrganicSettlement(settlementData: Omit<OrganicSettlement, 'id' | 'createdAt'>) {
    const newSettlement: OrganicSettlement = {
      ...settlementData,
      id: `org_stl_${Date.now()}`,
      createdAt: new Date().toLocaleDateString('fa-IR')
    };
    this.organicSettlements.unshift(newSettlement);
    this.saveToStorage();
    this.showToast('success', `تسویه مالی با ${newSettlement.farmerName} ثبت گردید.`);
    return newSettlement;
  }

  updateOrganicSettlementStatus(settlementId: string, status: OrganicSettlement['status'], referenceNumber?: string) {
    const settlement = this.organicSettlements.find(s => s.id === settlementId);
    if (settlement) {
      settlement.status = status;
      if (referenceNumber) {
        settlement.referenceNumber = referenceNumber;
      }
      if (status === 'completed' && !settlement.settlementDate) {
        settlement.settlementDate = new Date().toLocaleDateString('fa-IR');
      }
      this.saveToStorage();
      this.showToast('success', `وضعیت تسویه به "${status === 'completed' ? 'تکمیل شده' : status === 'processing' ? 'در حال پرداخت' : 'لغو شده'}" تغییر یافت.`);
    }
  }

  // Organic Product Reviews
  getOrganicReviews(productId?: string): OrganicProductReview[] {
    if (!productId) return this.organicReviews;
    return this.organicReviews.filter(r => r.productId === productId);
  }

  isVerifiedBuyerOfProduct(productId: string, identifier?: string): boolean {
    if (!identifier) {
      identifier = this.currentUser?.phone || this.currentUser?.email;
    }
    if (!identifier) return false;
    const cleanId = identifier.trim().toLowerCase();
    return this.organicOrders.some(order => 
      (order.customerPhone?.trim().toLowerCase() === cleanId || 
       order.orderNumber?.trim().toLowerCase() === cleanId ||
       order.customerName?.trim().toLowerCase() === cleanId) &&
      order.items?.some(item => item.productId === productId)
    );
  }

  addOrganicReview(reviewData: Omit<OrganicProductReview, 'id' | 'createdAt' | 'likesCount'>): OrganicProductReview {
    const newReview: OrganicProductReview = {
      ...reviewData,
      id: `rev_org_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toLocaleDateString('fa-IR'),
      likesCount: 0
    };
    this.organicReviews.unshift(newReview);

    // Recompute product rating and review count
    const productReviews = this.organicReviews.filter(r => r.productId === reviewData.productId);
    const avgRating = Number((productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(2));
    const prodIdx = this.organicProducts.findIndex(p => p.id === reviewData.productId);
    if (prodIdx > -1) {
      this.organicProducts[prodIdx].rating = avgRating;
      this.organicProducts[prodIdx].reviewsCount = productReviews.length;
    }

    this.saveToStorage();
    this.showToast('success', 'دیدگاه و امتیاز شما با موفقیت ثبت شد.');
    return newReview;
  }

  likeOrganicReview(reviewId: string) {
    const rev = this.organicReviews.find(r => r.id === reviewId);
    if (rev) {
      rev.likesCount = (rev.likesCount || 0) + 1;
      this.saveToStorage();
    }
  }

  // Organic Stock Alerts & SMS/Email Notifications
  updateOrganicStockAlertConfig(updates: Partial<OrganicStockAlertConfig>) {
    this.organicStockAlertConfig = {
      ...this.organicStockAlertConfig,
      ...updates
    };
    this.saveToStorage();
    this.showToast('success', 'تنظیمات سامانه اطلاع‌رسانی پیامکی و ایمیلی انبار ذخیره شد.');
  }

  getLowStockOrganicProducts(): OrganicProduct[] {
    const defaultThreshold = this.organicStockAlertConfig?.defaultThresholdKg || 25;
    return this.organicProducts.filter(p => {
      const stock = typeof p.stockKg === 'number' ? p.stockKg : (typeof p.stockQuantityKg === 'number' ? p.stockQuantityKg : 0);
      const threshold = p.lowStockThresholdKg || defaultThreshold;
      return stock <= threshold;
    });
  }

  sendManualStockAlert(productId: string, channel: 'sms' | 'email' | 'both' = 'both'): { logs: OrganicStockAlertLog[]; count: number } {
    const prod = this.organicProducts.find(p => p.id === productId);
    if (!prod) return { logs: [], count: 0 };

    const prodName = prod.name || prod.title || 'محصول ارگانیک';
    const currentStock = typeof prod.stockKg === 'number' ? prod.stockKg : (typeof prod.stockQuantityKg === 'number' ? prod.stockQuantityKg : 0);
    const threshold = prod.lowStockThresholdKg || this.organicStockAlertConfig.defaultThresholdKg || 25;
    const nowStr = new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

    const generatedLogs: OrganicStockAlertLog[] = [];

    // Send SMS alert
    if (channel === 'sms' || channel === 'both') {
      const phones = (this.organicStockAlertConfig.adminPhoneNumbers || '09128845678').split(',').map(s => s.trim()).filter(Boolean);
      phones.forEach(phone => {
        const text = (this.organicStockAlertConfig.smsTemplate || 'هشدار انبار: موجودی [نام_محصول] به [موجودی] کیلوگرم کاهش یافته است.')
          .replace('[نام_محصول]', prodName)
          .replace('[موجودی]', String(currentStock))
          .replace('[حدنصاب]', String(threshold));

        const log: OrganicStockAlertLog = {
          id: `log_sms_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          productId: prod.id,
          productTitle: prodName,
          currentStockKg: currentStock,
          thresholdKg: threshold,
          channel: 'sms',
          recipient: phone,
          status: 'sent',
          messageText: text,
          timestamp: nowStr
        };
        generatedLogs.push(log);
        this.organicStockAlertLogs.unshift(log);
      });
    }

    // Send Email alert
    if (channel === 'email' || channel === 'both') {
      const emails = (this.organicStockAlertConfig.adminEmailAddresses || 'admin@parsnet-academy.com').split(',').map(s => s.trim()).filter(Boolean);
      emails.forEach(email => {
        const text = `گزارش کسری انبار پارس‌نت: موجودی انبار محصول ارگانیک «${prodName}» به ${currentStock} کیلوگرم کاهش یافته که کمتر از حدنصاب مجاز ${threshold} کیلوگرم است. جهت جلوگیری از اتمام موجودی در سایت، لطفاً نسبت به تأمین مجدد و تسویه نقدی با باغدار اقدام فرمایید.`;
        const log: OrganicStockAlertLog = {
          id: `log_email_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          productId: prod.id,
          productTitle: prodName,
          currentStockKg: currentStock,
          thresholdKg: threshold,
          channel: 'email',
          recipient: email,
          status: 'sent',
          messageText: text,
          timestamp: nowStr
        };
        generatedLogs.push(log);
        this.organicStockAlertLogs.unshift(log);
      });
    }

    this.saveToStorage();
    const channelLabel = channel === 'both' ? 'پیامک و ایمیل' : (channel === 'sms' ? 'پیامک' : 'ایمیل');
    this.showToast('success', `اطلاع‌رسانی ${channelLabel} کمبود موجودی «${prodName}» به شماره و ایمیل مدیر ارسال گردید.`);
    return { logs: generatedLogs, count: generatedLogs.length };
  }

  checkAndTriggerLowStockAlerts(triggerReason?: string): OrganicStockAlertLog[] {
    if (!this.organicStockAlertConfig.enableSmsAlerts && !this.organicStockAlertConfig.enableEmailAlerts) {
      return [];
    }
    const lowStockProds = this.getLowStockOrganicProducts();
    const newLogs: OrganicStockAlertLog[] = [];

    lowStockProds.forEach(prod => {
      // Send alerts
      const channel = (this.organicStockAlertConfig.enableSmsAlerts && this.organicStockAlertConfig.enableEmailAlerts)
        ? 'both'
        : (this.organicStockAlertConfig.enableSmsAlerts ? 'sms' : 'email');
      
      const res = this.sendManualStockAlert(prod.id, channel);
      newLogs.push(...res.logs);
    });

    return newLogs;
  }

  clearOrganicStockAlertLogs() {
    this.organicStockAlertLogs = [];
    this.saveToStorage();
    this.showToast('info', 'تاریخچه هشدارهای انبار پاکسازی شد.');
  }
}

export const store = new Store();
