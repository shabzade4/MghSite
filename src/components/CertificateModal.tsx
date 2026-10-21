import React from 'react';
import { X, Printer, Award, ShieldCheck, CheckCircle2, Download, Terminal, QrCode } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
  onVerifyCertificate?: (code: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose, onVerifyCertificate }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6" dir="rtl">
      <div className="bg-white text-slate-900 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between print:hidden gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-bold text-slate-900">گواهینامه معتبر رسمی پایان دوره</span>
            <span className="text-xs font-mono text-slate-400">({certificate.certificateNumber})</span>
          </div>

          <div className="flex items-center gap-2.5">
            {onVerifyCertificate && (
              <button
                onClick={() => {
                  onClose();
                  onVerifyCertificate(certificate.verificationCode);
                }}
                className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                title="استعلام آنلاین وضعیت این مدرک"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>استعلام آنلاین اصالت</span>
              </button>
            )}

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas (Print-ready) */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-amber-50/40 via-white to-slate-50 relative select-none">
          {/* Border Frame */}
          <div className="border-4 border-double border-amber-600/40 rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-white/80 shadow-inner">
            {/* Ambient Watermark Seal */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-amber-900" />
            </div>

            {/* Header with Academy Badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-amber-500/30 gap-4 text-center sm:text-right">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">آکادمی تخصصی پارس‌نت</div>
                  <div className="text-[11px] font-mono text-slate-400" dir="ltr">PARSNET TECH & NETWORK ACADEMY</div>
                </div>
              </div>

              <div className="text-center sm:text-left font-mono text-xs text-slate-500">
                <div>شماره گواهینامه: <strong className="text-slate-900">{certificate.certificateNumber}</strong></div>
                <div className="mt-0.5">تاریخ صدور: <strong className="text-slate-900">{certificate.issueDate}</strong></div>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-8 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
                CERTIFICATE OF COMPLETION
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                گواهینامه پایان دوره آموزشی
              </h1>
              <p className="text-xs text-slate-400">
                با تاییدیه علمی و استعلام آنلاین از مرجع آموزش‌های تخصصی شبکه و کامپیوتر
              </p>
            </div>

            {/* Award Text */}
            <div className="text-center max-w-2xl mx-auto space-y-4 text-sm leading-loose text-slate-700">
              <p>
                بدین‌وسیله گواهی می‌شود که دانش‌پژوه گرامی جناب آقای / سرکار خانم:
              </p>
              <div className="text-2xl sm:text-3xl font-black text-indigo-700 py-2 border-b border-slate-200 max-w-md mx-auto">
                {certificate.userName}
              </div>
              <p>
                با موفقیت کلیه سرفصل‌های تئوری و سناریوهای عملی دوره تخصصی:
              </p>
              <div className="text-lg sm:text-xl font-bold text-slate-900 bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/20 max-w-lg mx-auto">
                {certificate.courseTitle}
              </div>
              <p className="text-xs text-slate-600">
                را با موفقیت و نمره ارزیابی <strong className="font-mono text-emerald-700 text-sm">{certificate.gradeScore} از ۱۰۰</strong> در آزمون شبیه‌ساز به اتمام رسانده و شایستگی دریافت این گواهینامه معتبر را احراز نموده‌اند.
              </p>
            </div>

            {/* Signatures & QR Code */}
            <div className="mt-10 pt-6 border-t border-amber-500/30 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-normal">مدرس رسمی دوره</div>
                <div className="font-bold text-sm text-slate-900">{certificate.instructorName}</div>
                <div className="font-mono text-[10px] text-amber-700">Signed & Verified</div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 text-slate-700">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                </div>
                <div className="text-[10px] font-mono text-slate-400" dir="ltr">CODE: {certificate.verificationCode}</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-normal">مدیریت آکادمی پارس‌نت</div>
                <div className="font-bold text-sm text-slate-900">مهندس محمدرضا قاسمی</div>
                <div className="font-mono text-[10px] text-indigo-700">Official Seal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
