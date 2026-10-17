import React, { useState } from 'react';
import { X, Database, Globe, Copy, Check, Terminal, ExternalLink, CheckCircle2 } from 'lucide-react';
import { SUPABASE_SQL_SCHEMA } from '../services/supabase';

interface SupabaseGuideModalProps {
  onClose: () => void;
  onOpenAdminSettings: () => void;
}

export const SupabaseGuideModal: React.FC<SupabaseGuideModalProps> = ({
  onClose,
  onOpenAdminSettings
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-slate-800">
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">راهنمای اتصال Supabase و استقرار در Vercel</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh] text-xs leading-relaxed">
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono">۱</span>
              <span>راه‌اندازی دیتابیس در Supabase (طی ۳۰ ثانیه)</span>
            </div>
            <p className="text-slate-600">
              یک پروژه در سایت <strong className="font-mono text-emerald-700">supabase.com</strong> ایجاد کنید. سپس وارد بخش <strong>SQL Editor</strong> شده و اسکریپت آماده زیر را Paste و کلیک روی <strong className="font-mono text-emerald-700">Run</strong> نمایید تا جداول دوره‌ها، فایل‌ها، سفارش‌ها، تیکت‌ها و کاربران ساخته شوند:
            </p>

            <div className="relative">
              <div className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-[11px] max-h-48 overflow-y-auto" dir="ltr">
                <pre>{SUPABASE_SQL_SCHEMA}</pre>
              </div>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md border border-slate-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'کپی شد!' : 'کپی کل اسکریپت SQL'}</span>
              </button>
            </div>
          </div>

          {/* Step 2: How to find keys */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono">۲</span>
              <span>محل پیدا کردن کدهای VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY در سوپابیس</span>
            </div>
            
            <div className="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 text-slate-700 space-y-3">
              <div>
                <strong className="text-indigo-900 block mb-1">روش اول (سریع‌ترین روش - دکمه Connect):</strong>
                <p>در بالای صفحه داشبورد پروژه‌تان در سایت Supabase، روی دکمه سبز رنگ <strong>Connect</strong> در هدر بالا کلیک کنید. سپس تب <strong>Vite</strong> یا <strong>App Frameworks</strong> را انتخاب کنید؛ هر دو کد با یک دکمه Copy در اختیارتان قرار می‌گیرد!</p>
              </div>

              <div className="pt-2 border-t border-indigo-200/50">
                <strong className="text-indigo-900 block mb-1">روش دوم (از منوی تنظیمات Settings):</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                  <li>در سایدبار سمت چپ پنل Supabase، روی آیکون <strong>چرخ‌دنده (Project Settings)</strong> کلیک کنید.</li>
                  <li>از زیرمنوی باز شده، روی گزینه <strong>API</strong> (یا <strong>Data API</strong>) کلیک نمایید.</li>
                  <li>
                    در بخش <strong>Project URL</strong>: آدرسی شبیه به <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 font-mono text-[11px] text-indigo-700">https://xxxx.supabase.co</code> مشاهده می‌کنید که همان <strong>VITE_SUPABASE_URL</strong> است.
                  </li>
                  <li>
                    در بخش <strong>Project API Keys</strong>: کلید ردیف <strong>anon public</strong> را کپی کنید. این همان <strong>VITE_SUPABASE_ANON_KEY</strong> است.
                    <span className="text-amber-700 block text-[11px] mt-0.5 font-medium">⚠️ توجه: هرگز کلید service_role را در سایت قرار ندهید؛ فقط کلید anon را کپی کنید.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 3: Put into Vercel and Redeploy */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center font-mono">۳</span>
              <span>نحوه اضافه کردن به Vercel و فعال‌سازی نهایی</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
              <li>در داشبورد <strong>Vercel</strong>، وارد پروژه خود شده و به تب <strong>Settings</strong> و سپس <strong>Environment Variables</strong> بروید.</li>
              <li>متغیر اول: نام را <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> و مقدار را آدرس کپی شده قرار دهید و دکمه Save را بزنید.</li>
              <li>متغیر دوم: نام را <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> و مقدار را کلید anon قرار دهید و Save کنید.</li>
              <li>
                <strong className="text-red-600">خیلی مهم (Redeploy):</strong> چون Vite متغیرها را حین ساخت تزریق می‌کند، بعد از ذخیره کلیدها، در ورسل به تب <strong>Deployments</strong> رفته، روی سه نقطه <code className="font-mono">...</code> آخرین دیپلوی کلیک کرده و گزینه <strong>Redeploy</strong> را بزنید تا سایت با کلیدهای دیتابیس آنلاین شود!
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onOpenAdminSettings}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
          >
            ورود به بخش تنظیمات Supabase در پیشخوان
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
