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
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-cyan-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* File image thumbnail */}
      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
        <img
          src={file.image}
          alt={file.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* File Format badge */}
        <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md text-cyan-300 text-xs px-2.5 py-1 rounded-lg font-mono">
          {file.fileFormat.split(' ')[0]}
        </div>

        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded font-mono tabular-nums">
            {discountPercent}٪ تخفیف
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
            <span className="font-mono">{file.fileSize}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">نسخه {file.version}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{file.downloadsCount} دانلود</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug mb-2">
            {file.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {file.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 border-t border-slate-100 mt-2">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              {file.originalPrice > file.price && (
                <div className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                  {file.originalPrice.toLocaleString('fa-IR')} تومان
                </div>
              )}
              <div className="text-sm font-black text-slate-900 font-mono tabular-nums">
                {file.price.toLocaleString('fa-IR')}{' '}
                <span className="text-xs font-normal text-slate-500">تومان</span>
              </div>
            </div>

            {/* Actions */}
            {hasAccess ? (
              <a
                href={file.downloadUrl}
                download
                onClick={(e) => e.stopPropagation()}
                className="px-3.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود مستقیم فایل</span>
              </a>
            ) : isInCart ? (
              <span className="px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                در سبد خرید
              </span>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-cyan-700 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
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
