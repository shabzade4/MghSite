import React from 'react';
import { Download, FileText, ShoppingCart, Check, HardDrive, Cpu } from 'lucide-react';
import { DigitalFile } from '../types';
import { store } from '../services/store';

interface FileCardProps {
  file: DigitalFile;
  onOpenDetails: (file: DigitalFile) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onOpenDetails }) => {
  const [isInCart, setIsInCart] = React.useState(store.isItemInCart(file.id));
  const hasAccess = store.hasAccessToFile(file.id);

  React.useEffect(() => {
    return store.subscribe(() => {
      setIsInCart(store.isItemInCart(file.id));
    });
  }, [file.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const discountPercent = Math.round(
    ((file.originalPrice - file.price) / file.originalPrice) * 100
  );

  return (
    <div
      onClick={() => onOpenDetails(file)}
      className="group bg-slate-50/70 hover:bg-white rounded-3xl border border-slate-200/90 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/15 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer flex flex-col overflow-hidden"
    >
      {/* File image thumbnail */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <img
          src={file.image}
          alt={file.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* File Format badge */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 group-hover:bg-cyan-950 backdrop-blur-md text-cyan-300 group-hover:text-cyan-200 text-xs px-2.5 py-1 rounded-xl font-mono shadow-md group-hover:scale-105 border border-transparent group-hover:border-cyan-500/30 transition-all duration-300">
          {file.fileFormat.split(' ')[0]}
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg font-mono tabular-nums shadow-md group-hover:scale-110 transition-transform duration-300">
            {discountPercent}٪ تخفیف
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-700 font-medium mb-2.5 transition-colors">
            <span className="font-mono group-hover:text-cyan-700 group-hover:font-bold transition-colors">{file.fileSize}</span>
            <span aria-hidden="true" className="text-slate-300 group-hover:text-slate-400">·</span>
            <span className="font-mono group-hover:text-slate-900 group-hover:font-bold transition-colors">نسخه {file.version}</span>
            <span aria-hidden="true" className="text-slate-300 group-hover:text-slate-400">·</span>
            <span className="font-mono tabular-nums group-hover:text-slate-900 group-hover:font-bold transition-colors">{file.downloadsCount} دانلود</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 group-hover:font-black transition-colors line-clamp-2 leading-snug mb-2">
            {file.title}
          </h3>

          <p className="text-xs text-slate-500 group-hover:text-slate-800 transition-colors line-clamp-2 leading-relaxed mb-4">
            {file.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-slate-100 group-hover:border-cyan-100 transition-colors mt-2">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              {file.originalPrice > file.price && (
                <div className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                  {file.originalPrice.toLocaleString('fa-IR')} تومان
                </div>
              )}
              <div className="text-sm font-black text-slate-900 group-hover:text-cyan-800 font-mono tabular-nums group-hover:scale-105 origin-right transition-all duration-300">
                {file.price.toLocaleString('fa-IR')}{' '}
                <span className="text-xs font-normal text-slate-500 group-hover:text-cyan-600">تومان</span>
              </div>
            </div>

            {/* Actions */}
            {hasAccess ? (
              <a
                href={file.downloadUrl}
                download
                onClick={(e) => e.stopPropagation()}
                className="px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 group-hover:bg-emerald-100 rounded-xl flex items-center gap-1.5 transition-all shadow-xs group-hover:scale-105"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود مستقیم فایل</span>
              </a>
            ) : isInCart ? (
              <span className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100/80 rounded-xl flex items-center gap-1 transition-all group-hover:scale-105">
                <Check className="w-3.5 h-3.5" />
                در سبد خرید
              </span>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 group-hover:bg-cyan-600 rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:shadow-cyan-600/30 group-hover:scale-105"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>خرید و دانلود</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
