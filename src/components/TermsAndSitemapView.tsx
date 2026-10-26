import React, { useState } from 'react';
import {
  FileText,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Copy,
  Check,
  Search,
  BookOpen,
  Download,
  Terminal,
  Globe,
  Radio,
  Share2
} from 'lucide-react';
import { store } from '../services/store';

interface TermsAndSitemapViewProps {
  initialMode?: 'terms' | 'sitemap';
  onNavigateToCourse: (id: string) => void;
  onNavigateToFile: (id: string) => void;
  onNavigateToArticle: (id: string) => void;
}

export const TermsAndSitemapView: React.FC<TermsAndSitemapViewProps> = ({
  initialMode = 'terms',
  onNavigateToCourse,
  onNavigateToFile,
  onNavigateToArticle
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'sitemap'>(initialMode);
  const [sitemapSearch, setSitemapSearch] = useState('');
  const [isXmlCopied, setIsXmlCopied] = useState(false);

  const settings = store.settings;
  const courses = store.courses;
  const files = store.files;
  const articles = store.articles;

  // Filtered sitemap data
  const filteredCourses = courses.filter(c => !sitemapSearch || c.title.includes(sitemapSearch));
  const filteredFiles = files.filter(f => !sitemapSearch || f.title.includes(sitemapSearch));
  const filteredArticles = articles.filter(a => !sitemapSearch || a.title.includes(sitemapSearch));

  // Generate XML Sitemap representation
  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- صفحات اصلی سامانه -->
  <url>
    <loc>https://parsnet-academy.com/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://parsnet-academy.com/courses</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://parsnet-academy.com/files</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>https://parsnet-academy.com/blog</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://parsnet-academy.com/about</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://parsnet-academy.com/contact</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://parsnet-academy.com/terms</loc>
    <priority>0.5</priority>
  </url>

  <!-- دوره‌های تخصصی شبکه و وب -->
${courses.map(c => `  <url>
    <loc>https://parsnet-academy.com/courses/${c.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.85</priority>
  </url>`).join('\n')}

  <!-- فایل‌ها و سناریوهای دانلودی -->
${files.map(f => `  <url>
    <loc>https://parsnet-academy.com/files/${f.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.80</priority>
  </url>`).join('\n')}

  <!-- مقالات و پایگاه دانش -->
${articles.map(a => `  <url>
    <loc>https://parsnet-academy.com/blog/${a.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>0.75</priority>
  </url>`).join('\n')}
</urlset>`;

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlSitemap);
    setIsXmlCopied(true);
    setTimeout(() => setIsXmlCopied(false), 3000);
  };

  return (
    <div className="space-y-12 pb-16" dir="rtl">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'terms'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              قوانین، مقررات و حریم خصوصی
            </button>
            <button
              onClick={() => setActiveTab('sitemap')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sitemap'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              نقشه کامل سایت (Sitemap XML)
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            {activeTab === 'terms'
              ? 'قوانین و دستورالعمل‌های استفاده از مجموعه مهرادینت'
              : 'نقشه درختی وب‌سایت و ساختار صفحات و محتوا'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-light">
            {activeTab === 'terms'
              ? 'مقررات آموزشی، حفظ مالکیت معنوی، ضوابط استرداد وجه و حقوق متقابل دانشجو و آکادمی'
              : 'دسترسی سریع به کلیه دوره‌ها، سناریوها، مقالات و ساختار استاندارد XML جهت موتورهای جستجو'}
          </p>
        </div>
      </section>

      {/* VIEW 1: TERMS & PRIVACY */}
      {activeTab === 'terms' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Main Terms Box */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">متن ضوابط و شرایط استفاده</h2>
                <p className="text-xs text-slate-400">آخرین به‌روزرسانی: مهرماه ۱۴۰۳</p>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-loose whitespace-pre-line font-light">
              {settings.termsText}
            </div>
          </div>

          {/* Guarantee & Privacy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>ضمانت بازگشت وجه تا ۴۸ ساعت</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                در صورتی که محتوای ارائه شده در دوره آموزشی یا فایل‌های سناریو با سرفصل‌های اعلام شده مغایرت داشته باشد، تا ۴۸ ساعت پس از پرداخت می‌توانید درخواست عودت وجه خود را از طریق تیکت ثبت نمایید.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                <Lock className="w-5 h-5" />
                <span>حفظ حریم خصوصی و امنیت اطلاعات</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                اطلاعات کاربری شامل شماره تماس، ایمیل و تاریخچه تراکنش‌های بانکی به صورت رمزنگاری شده نگهداری شده و تحت هیچ شرایطی در اختیار افراد یا سازمان‌های ثالث قرار نخواهد گرفت.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* VIEW 2: SITEMAP */}
      {activeTab === 'sitemap' && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={sitemapSearch}
                onChange={(e) => setSitemapSearch(e.target.value)}
                placeholder="فیلتر در صفحات، دوره‌ها یا مقالات..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleCopyXml}
              className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
            >
              {isXmlCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>کد XML کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>کپی نقشه سایت استاندارد (sitemap.xml)</span>
                </>
              )}
            </button>
          </div>

          {/* Visual Sitemap Tree */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Column 1: Courses */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">دوره‌های آموزشی ({filteredCourses.length})</h3>
              </div>

              <ul className="space-y-2.5 text-xs">
                {filteredCourses.map(course => (
                  <li key={course.id}>
                    <button
                      onClick={() => onNavigateToCourse(course.id)}
                      className="text-right hover:text-indigo-600 transition-colors block w-full py-1 text-slate-700"
                    >
                      <div className="font-bold line-clamp-1">{course.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5" dir="ltr">/courses/{course.slug}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Digital Files */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Download className="w-5 h-5 text-cyan-600" />
                <h3 className="text-sm font-bold text-slate-900">فایل‌ها و سناریوها ({filteredFiles.length})</h3>
              </div>

              <ul className="space-y-2.5 text-xs">
                {filteredFiles.map(file => (
                  <li key={file.id}>
                    <button
                      onClick={() => onNavigateToFile(file.id)}
                      className="text-right hover:text-cyan-600 transition-colors block w-full py-1 text-slate-700"
                    >
                      <div className="font-bold line-clamp-1">{file.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5" dir="ltr">/files/{file.slug}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Articles & News */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Radio className="w-5 h-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">نوشته‌ها و رویدادها ({filteredArticles.length})</h3>
              </div>

              <ul className="space-y-2.5 text-xs">
                {filteredArticles.map(art => (
                  <li key={art.id}>
                    <button
                      onClick={() => onNavigateToArticle(art.id)}
                      className="text-right hover:text-amber-600 transition-colors block w-full py-1 text-slate-700"
                    >
                      <div className="font-bold line-clamp-1">{art.title}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5" dir="ltr">/blog/{art.slug}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* XML Code Preview Block */}
          <div className="bg-slate-950 text-slate-300 rounded-3xl p-6 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-indigo-400 font-bold">sitemap.xml (استاندارد موتورهای جستجو)</span>
              <button
                onClick={handleCopyXml}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[11px] transition-colors flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>کپی کامل</span>
              </button>
            </div>

            <pre className="overflow-x-auto p-2 text-slate-400 text-[11px] max-h-60 wp-scrollbar" dir="ltr">
              {xmlSitemap}
            </pre>
          </div>
        </section>
      )}
    </div>
  );
};
