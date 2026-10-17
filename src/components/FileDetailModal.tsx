import React from 'react';
import { X, Download, HardDrive, FileText, CheckCircle2, ShoppingCart, Check, ShieldCheck } from 'lucide-react';
import { DigitalFile } from '../types';
import { store } from '../services/store';

interface FileDetailModalProps {
  file: DigitalFile;
  onClose: () => void;
  onDirectCheckout: (file: DigitalFile) => void;
}

export const FileDetailModal: React.FC<FileDetailModalProps> = ({
  file,
  onClose,
  onDirectCheckout
}) => {
  const [isInCart, setIsInCart] = React.useState(store.isItemInCart(file.id));
  const hasAccess = store.hasAccessToFile(file.id);

  React.useEffect(() => {
    return store.subscribe(() => {
      setIsInCart(store.isItemInCart(file.id));
    });
  }, [file.id]);

  const handleAddToCart = () => {
    store.addToCart({
      id: file.id,
      type: 'file',
      title: file.title,
      price: file.price,
      originalPrice: file.originalPrice,
      image: file.image,
      fileFormat: file.fileFormat
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>فایل‌های دانلودی و سناریوها</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-medium">{file.title}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-cyan-600 font-medium">
                <span>فرمت: {file.fileFormat}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">حجم: {file.fileSize}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">نسخه: {file.version}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {file.title}
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {file.description}
              </p>

              {/* Feature points */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
                <div className="text-xs font-bold text-slate-800">مشخصات و محتویات فایل دانلودی:</div>
                {file.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnail and Checkout card */}
            <div className="md:col-span-4 bg-slate-900 rounded-2xl overflow-hidden p-1 shadow-lg text-white">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={file.image}
                  alt={file.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">قیمت نهایی:</span>
                  <div className="text-left">
                    {file.originalPrice > file.price && (
                      <span className="text-xs text-slate-400 line-through font-mono tabular-nums ml-2">
                        {file.originalPrice.toLocaleString('fa-IR')}
                      </span>
                    )}
                    <span className="text-base font-black text-white font-mono tabular-nums">
                      {file.price.toLocaleString('fa-IR')}{' '}
                      <span className="text-xs font-normal text-slate-400">تومان</span>
                    </span>
                  </div>
                </div>

                {hasAccess ? (
                  <a
                    href={file.downloadUrl}
                    download
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود مستقیم فایل ({file.fileSize})</span>
                  </a>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => onDirectCheckout(file)}
                      className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>خرید فوری و دانلود</span>
                    </button>
                    {!isInCart && (
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl transition-colors"
                      >
                        افزودن به سبد خرید
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
