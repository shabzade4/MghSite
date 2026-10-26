import React, { useState } from 'react';
import { Upload, X, File, Image as ImageIcon, Video, FileText, Archive, CheckCircle, AlertCircle } from 'lucide-react';

export interface PendingUploadFile {
  file: File;
  previewUrl?: string;
  fileName: string;
  title: string;
  altText?: string;
  sizeFormatted: string;
  fileType: 'image' | 'video' | 'document' | 'archive';
}

interface UploadReviewModalProps {
  pendingFile: PendingUploadFile | null;
  isOpen: boolean;
  onConfirmUpload: (confirmedData: { file: File; previewUrl?: string; title: string; fileName: string; altText: string; fileType: 'image' | 'video' | 'document' | 'archive'; sizeFormatted: string }) => void;
  onCancel: () => void;
  targetDescription?: string;
}

export const UploadReviewModal: React.FC<UploadReviewModalProps> = ({
  pendingFile,
  isOpen,
  onConfirmUpload,
  onCancel,
  targetDescription = 'بارگذاری در کتابخانه رسانه‌ها'
}) => {
  if (!isOpen || !pendingFile) return null;

  const [title, setTitle] = useState(pendingFile.title);
  const [altText, setAltText] = useState(pendingFile.altText || pendingFile.title);
  const [isUploading, setIsUploading] = useState(false);

  const handleConfirm = () => {
    setIsUploading(true);
    setTimeout(() => {
      onConfirmUpload({
        file: pendingFile.file,
        previewUrl: pendingFile.previewUrl,
        title: title.trim() || pendingFile.title,
        fileName: pendingFile.fileName,
        altText: altText.trim(),
        fileType: pendingFile.fileType,
        sizeFormatted: pendingFile.sizeFormatted
      });
      setIsUploading(false);
    }, 400);
  };

  const getTypeIcon = () => {
    switch (pendingFile.fileType) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-indigo-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-amber-600" />;
      case 'archive':
        return <Archive className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-cyan-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Upload className="w-4 h-4 text-indigo-700" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">پیش‌نمایش و تایید نهایی آپلود</h3>
              <p className="text-[11px] text-slate-500 font-light">{targetDescription}</p>
            </div>
          </div>

          <button
            onClick={onCancel}
            disabled={isUploading}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          {/* File Thumbnail or Type Preview */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col items-center justify-center text-center">
            {pendingFile.fileType === 'image' && pendingFile.previewUrl ? (
              <div className="relative w-full max-h-48 rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900">
                <img
                  src={pendingFile.previewUrl}
                  alt={pendingFile.fileName}
                  className="w-full h-44 object-contain"
                />
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs">
                  {getTypeIcon()}
                </div>
                <span className="text-xs font-bold text-slate-800">{pendingFile.fileName}</span>
              </div>
            )}

            {/* File metadata badges */}
            <div className="flex items-center gap-3 mt-3 text-[11px] font-mono text-slate-500">
              <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                حجم: <strong>{pendingFile.sizeFormatted}</strong>
              </span>
              <span>·</span>
              <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200">
                فرمت: <strong>{pendingFile.file.type || 'فایل استاندارد'}</strong>
              </span>
            </div>
          </div>

          {/* Title & Alt inputs */}
          <div className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                عنوان رسانه / نام فایل نمایشی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="عنوان مناسب برای فایل"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-indigo-500 outline-none"
              />
            </div>

            {pendingFile.fileType === 'image' && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  متن جایگزین (Alt Text سئو)
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="توضیح برای موتورهای جستجو و دسترس‌پذیری"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-indigo-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Notice */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-[11px] text-blue-900 leading-relaxed flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              فایل تا زمان فشردن دکمه <strong>«تأیید و بارگذاری فایل»</strong> ذخیره نخواهد شد. در صورت عدم تمایل دکمه <strong>«انصراف»</strong> را بزنید.
            </span>
          </div>

          {/* Action Buttons: Confirm & Cancel */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={handleConfirm}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'در حال ذخیره‌سازی...' : 'تأیید و بارگذاری فایل'}</span>
            </button>

            <button
              type="button"
              disabled={isUploading}
              onClick={onCancel}
              className="px-5 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-bold rounded-xl transition-colors cursor-pointer border border-slate-200"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
