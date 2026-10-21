import React, { useState } from 'react';
import {
  X,
  Search,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Printer,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Certificate } from '../types';
import { store } from '../services/store';

interface CertificateVerifyModalProps {
  onClose: () => void;
  onViewCertificate?: (cert: Certificate) => void;
  initialCode?: string;
}

export const CertificateVerifyModal: React.FC<CertificateVerifyModalProps> = ({
  onClose,
  onViewCertificate,
  initialCode = ''
}) => {
  const [query, setQuery] = useState(initialCode);
  const [searchResult, setSearchResult] = useState<Certificate | null>(() => {
    if (initialCode) {
      return store.verifyCertificate(initialCode);
    }
    return null;
  });
  const [hasSearched, setHasSearched] = useState(!!initialCode);
  const [copiedCode, setCopiedCode] = useState(false);

  const sampleCodes = [
    { label: 'سیسکو CCNA', code: 'PN-CERT-2024-8841' },
    { label: 'میکروتیک MTCNA', code: 'MTCNA-92-5120-VERIFIED' },
    { label: 'ری‌اکت و وب', code: 'PN-CERT-2024-9403' }
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const result = store.verifyCertificate(query.trim());
    setSearchResult(result);
    setHasSearched(true);
  };

  const handleSelectSample = (code: string) => {
    setQuery(code);
    const result = store.verifyCertificate(code);
    setSearchResult(result);
    setHasSearched(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                سامانه آنلاین استعلام و اعتبارسنجی گواهینامه‌ها
              </h2>
              <span className="text-[11px] text-slate-400 font-mono" dir="ltr">
                Official Certificate Verification Center
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Query Form */}
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              کد رهگیری امنیتی یا شماره گواهینامه را وارد کنید:
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثال: PN-CERT-2024-8841 یا CCNA-96-8841-VERIFIED"
                  className="w-full pr-10 pl-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>استعلام</span>
              </button>
            </div>

            {/* Quick Test Samples */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[11px] text-slate-400">نمونه‌های آماده تست سریع:</span>
              {sampleCodes.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelectSample(item.code)}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-lg font-mono transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  {item.label} ({item.code})
                </button>
              ))}
            </div>
          </form>

          {/* Results Area */}
          {hasSearched && (
            <div>
              {searchResult ? (
                <div className="bg-gradient-to-br from-emerald-500/10 via-white to-slate-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-sm space-y-5 animate-in fade-in duration-300">
                  {/* Verified Header Badge */}
                  <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>اصالت این مدرک معتبر و تاییدشده است</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono" dir="ltr">
                          STATUS: VERIFIED & AUTHENTICATED
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-lg">
                      نمره آزمون: {searchResult.gradeScore}٪
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">نام و نام خانوادگی دانش‌پژوه:</span>
                      <strong className="text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{searchResult.userName}</span>
                      </strong>
                    </div>

                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">عنوان دوره تخصصی گذرانده‌شده:</span>
                      <strong className="text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5 line-clamp-1">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{searchResult.courseTitle}</span>
                      </strong>
                    </div>

                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">شماره رسمی گواهینامه:</span>
                      <strong className="text-xs font-mono text-slate-800 dark:text-slate-200" dir="ltr">
                        {searchResult.certificateNumber}
                      </strong>
                    </div>

                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">کد رهگیری رمزنگاری‌شده:</span>
                      <strong className="text-xs font-mono text-indigo-600 dark:text-indigo-400 flex items-center justify-between" dir="ltr">
                        <span>{searchResult.verificationCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(searchResult.verificationCode)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                          title="کپی کد رهگیری"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </strong>
                    </div>

                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">مدرس و تاییدکننده علمی:</span>
                      <strong className="text-xs text-slate-800 dark:text-slate-200">
                        {searchResult.instructorName}
                      </strong>
                    </div>

                    <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[11px] text-slate-400 block mb-0.5">تاریخ صدور مدرک:</span>
                      <strong className="text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{searchResult.issueDate}</span>
                      </strong>
                    </div>
                  </div>

                  {/* Actions */}
                  {onViewCertificate && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => {
                          onViewCertificate(searchResult);
                          onClose();
                        }}
                        className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                        <span>مشاهده و چاپ سند رسمی مدرک (PDF)</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-2xl text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                  <h3 className="text-sm font-bold text-rose-800 dark:text-rose-300">
                    گواهینامه‌ای با مشخصات واردشده یافت نشد
                  </h3>
                  <p className="text-xs text-rose-600 dark:text-rose-400 max-w-md mx-auto leading-relaxed">
                    لطفاً شماره گواهینامه یا کد رهگیری را مجدداً بررسی فرمایید. می‌توانید از کدهای نمونه بالای کادر برای آزمایش سیستم استعلام استفاده نمایید.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
