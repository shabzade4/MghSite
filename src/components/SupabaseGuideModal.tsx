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

          {/* Step 2 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono">۲</span>
              <span>تنظیم کلیدها در پیشخوان مدیریت</span>
            </div>
            <p className="text-slate-600">
              از بخش <strong className="font-mono">Project Settings -&gt; API</strong> در سوپابیس، دو مقدار <strong className="font-mono">Project URL</strong> و <strong className="font-mono">anon public key</strong> را کپی کرده و در بخش <strong>تنظیمات پیشخوان وردپرس</strong> این سایت وارد کنید. دکمه تست اتصال بلافاصله ارتباط زنده را تایید می‌کند.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center font-mono">۳</span>
              <span>استقرار بر روی Vercel (دیپلوی آسان)</span>
            </div>
            <p className="text-slate-600">
              این پروژه با فریمورک استاندارد Vite و React و بدون هرگونه خطای باندل ساخته شده است. هنگام ایمپورت در Vercel کافی است در فیلد <strong>Environment Variables</strong> دو متغیر زیر را تعریف نمایید:
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1 text-slate-800" dir="ltr">
              <div>VITE_SUPABASE_URL = https://your-project.supabase.co</div>
              <div>VITE_SUPABASE_ANON_KEY = eyJhbGci...</div>
            </div>
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
