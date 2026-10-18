import React, { useState } from 'react';
import { X, Upload, Search, Check, Image as ImageIcon, Tag, HardDrive } from 'lucide-react';
import { MediaItem } from '../types';
import { store } from '../services/store';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  currentSelectedUrl?: string;
  title?: string;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  currentSelectedUrl,
  title = 'انتخاب تصویر از رسانه‌ها یا آپلود فایل جدید'
}) => {
  const [mediaList, setMediaList] = useState<MediaItem[]>(store.media);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string>(currentSelectedUrl || '');
  const [isUploading, setIsUploading] = useState(false);

  React.useEffect(() => {
    return store.subscribe(() => {
      setMediaList([...store.media]);
    });
  }, []);

  if (!isOpen) return null;

  // Filter media
  const filtered = mediaList.filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.fileName.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  // Handle direct file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeKb = Math.round(file.size / 1024);
      const sizeStr = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} مگابایت` : `${sizeKb} کیلوبایت`;

      const newMedia: MediaItem = {
        id: `media-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        fileName: file.name,
        fileType: file.type.startsWith('image/') ? 'image' : 'document',
        url: dataUrl,
        size: sizeStr,
        dimensions: 'کیفیت بالا',
        altText: file.name,
        tags: ['شاخص', 'آپلود جدید'],
        uploadedAt: new Date().toLocaleDateString('fa-IR')
      };

      store.addMediaItem(newMedia);
      setSelectedUrl(dataUrl);
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    if (selectedUrl) {
      onSelectImage(selectedUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs" dir="rtl">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو در نام، فایل یا تگ‌ها..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Upload Button */}
          <label className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shrink-0 shadow-sm">
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'در حال پردازش...' : 'آپلود تصویر جدید از سیستم'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <HardDrive className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">رسانه‌ای یافت نشد.</p>
              <p className="text-xs text-slate-400 mt-1">با دکمه بالا می‌توانید تصویر جدیدی را اضافه کنید.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((item) => {
                const isChosen = selectedUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedUrl(item.url)}
                    className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all bg-white flex flex-col ${
                      isChosen
                        ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                        : 'border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="aspect-video w-full bg-slate-100 overflow-hidden relative">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isChosen && (
                        <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1 bg-slate-900/75 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                        {item.size}
                      </span>
                    </div>

                    <div className="p-2.5 text-right flex-1 flex flex-col justify-between">
                      <div className="text-xs font-bold text-slate-800 line-clamp-1 mb-1">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate" dir="ltr">
                        {item.fileName}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500 truncate max-w-md">
            {selectedUrl ? (
              <span className="text-indigo-600 font-medium">یک تصویر برای درج انتخاب شده است.</span>
            ) : (
              <span>لطفاً برای استفاده روی یکی از تصاویر کلیک کنید.</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedUrl}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm disabled:opacity-50 disabled:pointer-events-none"
            >
              انتخاب و درج در فرم
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
