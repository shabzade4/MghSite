import React, { useState } from 'react';
import {
  GitFork,
  CheckCircle2,
  Circle,
  ArrowLeft,
  BookOpen,
  Terminal,
  Shield,
  Layers,
  Server,
  Code2,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { Course } from '../types';

interface RoadmapStep {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  duration: string;
  skills: string[];
  courseId?: string;
  status: 'recommended' | 'advanced' | 'foundation';
  description: string;
}

interface CareerRoadmap {
  id: string;
  title: string;
  englishTitle: string;
  icon: 'network' | 'devops' | 'frontend' | 'security';
  badge: string;
  estimatedMonths: string;
  averageSalary: string;
  description: string;
  suitableFor: string;
  steps: RoadmapStep[];
}

const ROADMAPS_DATA: CareerRoadmap[] = [
  {
    id: 'network-engineer',
    title: 'مسیر جامع مهندسی شبکه و زیرساخت (Cisco / MikroTik)',
    englishTitle: 'Network Infrastructure & Enterprise Engineering',
    icon: 'network',
    badge: 'پرمخاطب‌ترین مسیر IT',
    estimatedMonths: '۶ تا ۹ ماه',
    averageSalary: '۳۵ تا ۷۰ میلیون تومان / ماه',
    description: 'از درک مفاهیم پایه‌ای پکت، مدل OSI و آدرس‌دهی IPv4/IPv6 تا مسیریابی پیشرفته سیسکو، فایروال‌های سخت‌افزاری و راه‌اندازی دیتاسنتر.',
    suitableFor: 'علاقه‌مندان به ورود به بازار کار زیرساخت، مدیران شبکه سازمان‌ها و مهندسان پشتیبانی شبکه',
    steps: [
      {
        id: 'net-step-1',
        order: 1,
        title: 'مبانی شبکه‌های کامپیوتری (+Network)',
        subtitle: 'پایه‌ریزی الفبای شبکه، مدل هفت لایه OSI و پروتکل‌های TCP/IP',
        duration: '۴ هفته',
        skills: ['OSI 7-Layer', 'TCP vs UDP', 'IPv4 Subnetting', 'DNS & DHCP Architecture'],
        courseId: 'crs-1',
        status: 'foundation',
        description: 'در این گام ساختار بسته‌های داده، ساب‌نتینگ و سناریوهای اتصال کلاینت‌ها به روتر را به صورت تئوری و کارگاهی یاد می‌گیرید.'
      },
      {
        id: 'net-step-2',
        order: 2,
        title: 'مهندسی شبکه سیسکو (Cisco CCNA 200-301)',
        subtitle: 'پیکربندی سوئیچ‌ها و روترهای سیسکو، VLAN، OSPF و امنیت لایه ۲',
        duration: '۸ هفته',
        skills: ['VLAN & Trunking', 'Inter-VLAN Routing', 'Single-Area OSPFv2/v3', 'ACLs & NAT/PAT', 'Wireless Fundamentals'],
        courseId: 'crs-1',
        status: 'recommended',
        description: 'مهم‌ترین مدرک بین‌المللی شبکه در دنیا. آموزش صفر تا صد کانفیگ سوئیچ‌های ۲۹۶۰ و روترهای سیسکو در نرم‌افزار Cisco Packet Tracer.'
      },
      {
        id: 'net-step-3',
        order: 3,
        title: 'مدیریت شبکه‌های میکروتیک (MikroTik MTCNA / MTCRE)',
        subtitle: 'روتربوردهای پرکاربرد میکروتیک در شرکت‌ها و ISPهای ایران',
        duration: '۴ هفته',
        skills: ['RouterOS Config', 'Queues & Bandwidth Management', 'PPPoE Server', 'WireGuard & IPSec VPN'],
        courseId: 'crs-2',
        status: 'recommended',
        description: 'پیکربندی کامل میکروتیک برای مدیریت پهنای باند پرسنل، راه‌اندازی هات‌اسپات، فایروال و ارتباط امن بین دفاتر سازمان.'
      },
      {
        id: 'net-step-4',
        order: 4,
        title: 'مسیریابی پیشرفته سازمانی (Cisco CCNP Enterprise)',
        subtitle: 'پیاده‌سازی پروتکل BGP، معماری High Availability و اتوماسیون با Python',
        duration: '۱۰ هفته',
        skills: ['Dual-Homed BGP', 'Multi-Area OSPF', 'VRF & MPLS Core', 'Network Automation (Netmiko)'],
        status: 'advanced',
        description: 'طراحی زیرساخت شبکه‌های بزرگ بانکی، دیتاسنترها و شرکت‌های ارائه‌دهنده اینترنت با ضریب دسترسی ۹۹.۹٪.'
      }
    ]
  },
  {
    id: 'devops-engineer',
    title: 'مسیر مهندس دواپس و کلاود (Linux, Docker, CI/CD)',
    englishTitle: 'DevOps & Site Reliability Engineering (SRE)',
    icon: 'devops',
    badge: 'بالاترین تقاضای استخدامی',
    estimatedMonths: '۸ تا ۱۲ ماه',
    averageSalary: '۴۵ تا ۹۰ میلیون تومان / ماه',
    description: 'پل ارتباطی میان توسعه نرم‌افزار و عملیات زیرساخت با اتکا به کانتینرسازی، پایپ‌لاین‌های خودکارسازی تست و استقرار در محیط‌های ابری.',
    suitableFor: 'برنامه‌نویسان و ادمین‌های لینوکس که قصد ارتقا به مهندس ارشد دواپس و زیرساخت ابری را دارند',
    steps: [
      {
        id: 'dev-step-1',
        order: 1,
        title: 'مدیریت حرفه‌ای لینوکس (Linux LPIC-1 & LPIC-2)',
        subtitle: 'تسلط بر خط فرمان لینوکس، مدیریت سرویس‌ها، Bash Scripting و امنیت سرور',
        duration: '۶ هفته',
        skills: ['Bash Scripting', 'Systemd Services', 'SSH Hardening', 'IPTables & UFW', 'Cron Jobs'],
        status: 'foundation',
        description: 'لینوکس قلب تپنده تمام سرورها و پلتفرم‌های کلاود دنیاست. مدیریت حافظه، دیسک‌ها، پروسه‌ها و امنیت هسته لینوکس.'
      },
      {
        id: 'dev-step-2',
        order: 2,
        title: 'کانتینرسازی با داکر (Docker & Docker Compose)',
        subtitle: 'بسته‌بندی برنامه‌ها در ایمیج‌های سبک، شبکه داکر و ولوم‌های داده',
        duration: '۴ هفته',
        skills: ['Dockerfile Best Practices', 'Multi-Stage Builds', 'Docker Compose V2', 'Container Networking'],
        status: 'recommended',
        description: 'توسعه و استقرار مستقل سرویس‌ها در کانتینرها بدون دغدغه تفاوت سیستم‌عامل محیط تست و سرور پروداکشن.'
      },
      {
        id: 'dev-step-3',
        order: 3,
        title: 'پایپ‌لاین‌های استقرار پیوسته (CI/CD با GitLab CI & GitHub Actions)',
        subtitle: 'اتوماسیون ساخت، تست و دیپلوی خودکار کدهای تیم نرم‌افزار',
        duration: '۵ هفته',
        skills: ['GitLab CI Pipelines', 'GitHub Actions', 'Automated Testing', 'Zero-Downtime Deploy'],
        status: 'recommended',
        description: 'طراحی خط تولید اتوماتیک نرم‌افزار به طوری که با هر Push برنامه‌نویس، بدون وقفه تست‌ها اجرا و نسخه جدید مستقر شود.'
      },
      {
        id: 'dev-step-4',
        order: 4,
        title: 'ارکستراسیون با کوبرنتیز (Kubernetes - CKA)',
        subtitle: 'مدیریت خوشه‌های بزرگ کانتینری، مانیتورینگ Prometheus و لاگ Grafana',
        duration: '۸ هفته',
        skills: ['Pods & Deployments', 'Ingress & Service Mesh', 'Helm Charts', 'Prometheus & Grafana'],
        status: 'advanced',
        description: 'مدیریت و مقیاس‌پذیری خودکار هزاران کانتینر همزمان با ویژگی Auto-Healing و کنترل ترافیک لایه ۷.'
      }
    ]
  },
  {
    id: 'frontend-developer',
    title: 'مسیر توسعه‌دهنده فرانت‌اند مدرن (React 19 & Next.js)',
    englishTitle: 'Modern Frontend & Full-Stack Web Engineering',
    icon: 'frontend',
    badge: 'بهترین برای پروژه‌های فریلنسری',
    estimatedMonths: '۵ تا ۸ ماه',
    averageSalary: '۳۰ تا ۶۵ میلیون تومان / ماه',
    description: 'خلق رابط‌های کاربری چشم‌نواز، سریع و استاندارد با جدیدترین امکانات وب مدرن، کامپوننت‌های بهینه‌سازی‌شده و معماری سمت کلاینت و سرور.',
    suitableFor: 'علاقه‌مندان به طراحی و کدنویسی وب‌سایت‌های سازمانی، پلتفرم‌های آموزشی و اپلیکیشن‌های تحت وب',
    steps: [
      {
        id: 'fe-step-1',
        order: 1,
        title: 'مبانی مدرن وب (HTML5, Semantic UI, Tailwind CSS)',
        subtitle: 'طراحی چیدمان‌های ریسپانسیو و استایل‌نویسی با Tailwind Utility Classes',
        duration: '۴ هفته',
        skills: ['CSS Grid & Flexbox', 'Tailwind CSS v4', 'Responsive Design', 'Web Accessibility (a11y)'],
        courseId: 'crs-3',
        status: 'foundation',
        description: 'طراحی ساختار استاندارد و صفحات وب زیبا و کامپوننت‌محور منطبق بر اصول UI/UX بدون نوشتن فایل‌های حجیم CSS سنتی.'
      },
      {
        id: 'fe-step-2',
        order: 2,
        title: 'جاوااسکریپت عمیق و تایپ‌اسکریپت (ESNext & TypeScript)',
        subtitle: 'مفاهیم آسنکرون، Event Loop، تایپ‌های پیشرفته و مدیریت خطاها',
        duration: '۵ هفته',
        skills: ['Async / Await', 'Closures & Scope', 'TypeScript Generics & Interfaces', 'DOM Manipulation'],
        status: 'foundation',
        description: 'تبدیل شدن به یک مهندس نرم‌افزار حرفه‌ای با مسلط شدن به تایپ‌های قوی TypeScript و جلوگیری از باگ‌های رایج زمان اجرا.'
      },
      {
        id: 'fe-step-3',
        order: 3,
        title: 'توسعه وب‌اپلیکیشن با ری‌اکت ۱۹ (React 19 Core & Hooks)',
        subtitle: 'مدیریت استیت، Custom Hooks، بهینه‌سازی رندر و معماری ماژولار',
        duration: '۶ هفته',
        skills: ['React Hooks', 'Zustand & Context API', 'Custom Hooks', 'Component Lifecycle', 'Virtual DOM'],
        courseId: 'crs-3',
        status: 'recommended',
        description: 'پیکربندی کامل سیستم‌های آموزشی، داشبوردهای مدیریتی و فروشگاه‌های فایل با ری‌اکت و تعامل با APIهای RESTful.'
      },
      {
        id: 'fe-step-4',
        order: 4,
        title: 'فول‌استک مدرن با نکست‌جی‌اس و پایگاه داده ابری (Next.js & Cloud Database)',
        subtitle: 'رندرینگ سمت سرور (SSR)، سئو عالی و ارتباط با پایگاه داده رابطه‌ای',
        duration: '۷ هفته',
        skills: ['Next.js App Router', 'Server Actions', 'PostgreSQL & Cloud DB', 'Authentication & Row-Level Security'],
        status: 'advanced',
        description: 'ساخت نرم‌افزارهای یکپارچه با امنیت بالا، سرعت لود برق‌آسا و ذخیره‌سازی ابری اطلاعات کاربران.'
      }
    ]
  },
  {
    id: 'cybersecurity-engineer',
    title: 'مسیر کارشناس امنیت شبکه و دفاع سایبری (Cybersecurity)',
    englishTitle: 'Network Security & Threat Defense Specialist',
    icon: 'security',
    badge: 'بالاترین اهمیت امنیتی',
    estimatedMonths: '۷ تا ۱۰ ماه',
    averageSalary: '۴۰ تا ۸۰ میلیون تومان / ماه',
    description: 'کشف آسیب‌پذیری‌های زیرساخت شبکه، بررسی بسته‌های مشکوک با Wireshark، کانفیگ فایروال‌های فورتی‌نت و سیسکو ASA، و hardening سرورها.',
    suitableFor: 'کارشناسان شبکه که مایلند به تیم دفاع سایبری (Blue Team) و امنیت شبکه بپیوندند',
    steps: [
      {
        id: 'sec-step-1',
        order: 1,
        title: 'تحلیل ترافیک و پروتکل‌ها با Wireshark',
        subtitle: 'رمزگشایی پکت‌ها، شناسایی حملات ARP Spoofing و بررسی Handshake',
        duration: '۳ هفته',
        skills: ['Packet Analysis', 'TLS Inspection', 'MITM Detection', 'Protocol Dissection'],
        status: 'foundation',
        description: 'دید اشعه ایکس به بسته‌های در حال حرکت در شبکه. تحلیل عمیق بسته‌ها برای پیدا کردن بدافزارها و نشتی داده‌ها.'
      },
      {
        id: 'sec-step-2',
        order: 2,
        title: 'امنیت سوئیچینگ و روترهای سیسکو (Cisco Network Security)',
        subtitle: 'پیکربندی Port Security، DHCP Snooping، Dynamic ARP Inspection و 802.1X',
        duration: '۵ هفته',
        skills: ['Layer 2 Security Hardening', 'DHCP Snooping', 'IP Source Guard', 'AAA & RADIUS'],
        courseId: 'crs-1',
        status: 'recommended',
        description: 'بستن راه‌های نفوذ مهاجمان در لایه ۲ شبکه و جلوگیری از دسترسی غیرمجاز کلاینت‌ها به سوئیچ‌های سازمانی.'
      },
      {
        id: 'sec-step-3',
        order: 3,
        title: 'فایروال‌های نسل جدید (Next-Gen Firewalls: Fortinet & Cisco)',
        subtitle: 'سیاست‌های امنیتی لایه ۷، جلوگیری از نفوذ (IPS/IDS)، Web Filtering و VPN',
        duration: '۶ هفته',
        skills: ['FortiGate OS', 'Deep Packet Inspection (DPI)', 'Site-to-Site VPN', 'Antivirus & App Control'],
        status: 'recommended',
        description: 'استقرار فایروال‌های سخت‌افزاری در لبه شبکه سازمان برای خنثی‌سازی حملات پیشرفته اینترنتی و باج‌افزارها.'
      },
      {
        id: 'sec-step-4',
        order: 4,
        title: 'مدیریت رخداد و ارزیابی آسیب‌پذیری (Vulnerability Assessment & SIEM)',
        subtitle: 'پایش مستمر رویدادها، تست نفوذ دوره‌ای و گزارش‌دهی انطباق با استانداردها',
        duration: '۸ هفته',
        skills: ['Nessus Scanner', 'Wazuh SIEM', 'Incident Response Playbooks', 'Hardening Benchmarks'],
        status: 'advanced',
        description: 'مانیتورینگ ۲۴/۷ رخدادهای شبکه، شناسایی سریع نفوذها و برطرف کردن نقاط ضعف قبل از سوءاستفاده مهاجمان.'
      }
    ]
  }
];

interface RoadmapsViewProps {
  onOpenCourse: (course: Course) => void;
  courses: Course[];
  onOpenVerifyModal?: () => void;
}

export const RoadmapsView: React.FC<RoadmapsViewProps> = ({
  onOpenCourse,
  courses,
  onOpenVerifyModal
}) => {
  const [activeRoadmapId, setActiveRoadmapId] = useState<string>('network-engineer');

  const activeRoadmap = ROADMAPS_DATA.find(r => r.id === activeRoadmapId) || ROADMAPS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" dir="rtl">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800 mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-xl text-indigo-300 text-xs font-mono mb-4">
            <GitFork className="w-3.5 h-3.5 text-indigo-400" />
            <span>LEARNING PATHWAYS & CAREER ROADMAPS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug mb-3">
            مسیرهای تخصصی ورود به بازار کار و ارتقای شغلی IT
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            دیگر نیازی به سردرگمی بین صدها آموزش متفرقه نیست. مسیرهای آموزشی پارس‌نت به صورت مرحله به مرحله بر اساس نیاز واقعی شرکت‌های معتبر ایرانی و بین‌المللی تدوین شده‌اند تا در کوتاه‌ترین زمان به درآمد حرفه‌ای برسید.
          </p>

          <div className="flex items-center gap-4 mt-6 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>زمان‌بندی مشخص گام‌به‌گام</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span>اعطای گواهینامه رسمی پس از هر دوره</span>
            </div>

            {onOpenVerifyModal && (
              <button
                onClick={onOpenVerifyModal}
                className="text-xs text-indigo-200 hover:text-white underline font-mono cursor-pointer"
              >
                استعلام اصالت مدارک صادرشده →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pathway Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {ROADMAPS_DATA.map((roadmap) => {
          const isSelected = roadmap.id === activeRoadmapId;

          return (
            <button
              key={roadmap.id}
              onClick={() => setActiveRoadmapId(roadmap.id)}
              className={`p-4 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/60 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    {roadmap.icon === 'network' && <Server className="w-5 h-5" />}
                    {roadmap.icon === 'devops' && <Layers className="w-5 h-5" />}
                    {roadmap.icon === 'frontend' && <Code2 className="w-5 h-5" />}
                    {roadmap.icon === 'security' && <Shield className="w-5 h-5" />}
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                    isSelected ? 'bg-indigo-50 text-indigo-700 font-bold' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {roadmap.badge}
                  </span>
                </div>

                <h3 className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug ${
                  isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'
                }`}>
                  {roadmap.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{roadmap.estimatedMonths}</span>
                <span className="font-mono text-[10px] text-slate-400">({roadmap.steps.length} مرحله)</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Roadmap Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        {/* Roadmap Metadata Card */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mb-1" dir="ltr">
              {activeRoadmap.englishTitle}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {activeRoadmap.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">میانگین درآمد این تخصص:</span>
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {activeRoadmap.averageSalary}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">مدت دوره پیشنهادی:</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-mono">
                {activeRoadmap.estimatedMonths}
              </span>
            </div>
          </div>
        </div>

        {/* Steps Timeline Tree */}
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>مراحل گام‌به‌گام یادگیری و تسلط:</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ترتیب پیشنهادی: از بالا به پایین
            </span>
          </div>

          <div className="relative border-r-2 border-indigo-200 dark:border-indigo-900/60 mr-4 sm:mr-6 pr-6 sm:pr-8 space-y-8">
            {activeRoadmap.steps.map((step) => {
              // Find matching course if linked
              const matchedCourse = step.courseId ? courses.find(c => c.id === step.courseId) : null;

              return (
                <div key={step.id} className="relative group">
                  {/* Step Node Icon on the line */}
                  <div className="absolute -right-[33px] sm:-right-[41px] top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-600 flex items-center justify-center shadow-xs">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {step.order}
                    </span>
                  </div>

                  {/* Step Card Content */}
                  <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          گام {step.order}: {step.title}
                        </h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                          step.status === 'foundation'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                            : step.status === 'recommended'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                        }`}>
                          {step.status === 'foundation' ? 'پایه ضروری' : step.status === 'recommended' ? 'هسته اصلی' : 'پیشرفته تخصصی'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>مدت تخمینی: {step.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {step.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Link to Academy Course if present */}
                    {matchedCourse ? (
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-700/60 gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={matchedCourse.image}
                            alt={matchedCourse.title}
                            className="w-12 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block">
                              دوره رسمی و عملی موجود در آکادمی:
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {matchedCourse.title}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onOpenCourse(matchedCourse)}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>مشاهده سرفصل‌ها و ثبت‌نام</span>
                        </button>
                      </div>
                    ) : (
                      <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                        <span>این مرحله شامل تمرین‌های کارگاهی و سناریوهای پروژه‌ای موجود در بخش سناریوها است.</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
