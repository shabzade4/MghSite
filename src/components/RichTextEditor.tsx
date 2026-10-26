import React, { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignRight,
  AlignCenter,
  AlignLeft,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code,
  Minus,
  Table as TableIcon,
  Palette,
  Highlighter,
  RotateCcw,
  Eye,
  FileCode,
  Edit3,
  Eraser,
  Check,
  X
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
  onOpenMediaPicker?: (callback: (url: string) => void) => void;
}

const TEXT_COLORS = [
  { name: 'مشکی تیره', hex: '#0f172a' },
  { name: 'خاکستری', hex: '#475569' },
  { name: 'نیلی سازمانی', hex: '#4f46e5' },
  { name: 'فیروزه‌ای', hex: '#0891b2' },
  { name: 'سبز زمردی', hex: '#059669' },
  { name: 'طلایی و کهربایی', hex: '#d97706' },
  { name: 'قرمز یاقوتی', hex: '#e11d48' },
  { name: 'بنفش رویال', hex: '#7c3aed' }
];

const HIGHLIGHT_COLORS = [
  { name: 'بدون رنگ', hex: 'transparent' },
  { name: 'زرد نئونی', hex: '#fef08a' },
  { name: 'سبز نعنایی', hex: '#bbf7d0' },
  { name: 'آبی آسمانی', hex: '#bfdbfe' },
  { name: 'صورتی ملایم', hex: '#fbcfe8' },
  { name: 'بنفش اسطوخودوس', hex: '#e9d5ff' },
  { name: 'خاکستری روشن', hex: '#e2e8f0' }
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = 'متن و محتوای خود را اینجا بنویسید...',
  minHeight = 'min-h-[220px]',
  onOpenMediaPicker
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'preview'>('visual');
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to wrap selected text or insert markup
  const wrapSelection = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = value || '';

    const selected = currentVal.substring(start, end) || defaultText;
    const replacement = `${before}${selected}${after}`;
    const nextVal = currentVal.substring(0, start) + replacement + currentVal.substring(end);

    onChange(nextVal);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 10);
  };

  const insertAtCursor = (text: string) => {
    wrapSelection(text, '', '');
  };

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;
    const url = linkUrl.trim().startsWith('http') ? linkUrl.trim() : `https://${linkUrl.trim()}`;
    const title = linkText.trim() || url;
    wrapSelection(`<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-indigo-600 underline font-semibold">`, '</a>', title);
    setShowLinkModal(false);
    setLinkText('');
    setLinkUrl('');
  };

  const handleApplyImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    const alt = imageAlt.trim() || 'تصویر';
    insertAtCursor(`\n<img src="${imageUrl.trim()}" alt="${alt}" class="w-full max-w-2xl mx-auto rounded-2xl my-4 shadow-sm border border-slate-200" />\n`);
    setShowImageModal(false);
    setImageUrl('');
    setImageAlt('');
  };

  const handleApplyTextColor = (hex: string) => {
    wrapSelection(`<span style="color: ${hex};">`, '</span>', 'متن رنگی');
    setShowTextColorPicker(false);
  };

  const handleApplyBgColor = (hex: string) => {
    if (hex === 'transparent') {
      wrapSelection('', '', '');
    } else {
      wrapSelection(`<mark style="background-color: ${hex}; padding: 2px 6px; border-radius: 4px;">`, '</mark>', 'متن هایلایت');
    }
    setShowBgColorPicker(false);
  };

  const handleInsertTable = () => {
    const tableMarkup = `\n<table class="w-full border-collapse border border-slate-300 text-xs my-4">\n  <thead>\n    <tr class="bg-slate-100">\n      <th class="border border-slate-300 p-2 text-right">عنوان ۱</th>\n      <th class="border border-slate-300 p-2 text-right">عنوان ۲</th>\n      <th class="border border-slate-300 p-2 text-right">عنوان ۳</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="border border-slate-300 p-2">مقدار اول</td>\n      <td class="border border-slate-300 p-2">مقدار دوم</td>\n      <td class="border border-slate-300 p-2">مقدار سوم</td>\n    </tr>\n  </tbody>\n</table>\n`;
    insertAtCursor(tableMarkup);
  };

  const handleClearFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentVal = value || '';
    if (start === end) {
      // Clear all tags if nothing selected
      const cleaned = currentVal.replace(/<[^>]*>?/gm, '');
      onChange(cleaned);
      return;
    }
    const selected = currentVal.substring(start, end);
    const cleaned = selected.replace(/<[^>]*>?/gm, '');
    const nextVal = currentVal.substring(0, start) + cleaned + currentVal.substring(end);
    onChange(nextVal);
  };

  // Word & character stats
  const cleanText = (value || '').replace(/<[^>]*>?/gm, '').trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).length : 0;
  const charCount = (value || '').length;

  return (
    <div className="border border-slate-200/90 rounded-2xl bg-white shadow-xs overflow-hidden transition-all focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
      {/* Top Header Bar: Label and Mode Tabs */}
      <div className="bg-slate-50/90 px-4 py-2 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        {label ? (
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>{label}</span>
          </span>
        ) : (
          <span className="text-[11px] text-slate-500 font-medium">ویرایشگر متن پیشرفته (CKEditor Style)</span>
        )}

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-xl text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('visual')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'visual' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>ویرایشگر دیداری</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'code' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-amber-600" />
            <span>کد HTML</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'preview' ? 'bg-white text-indigo-600 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>پیش‌نمایش خروجی</span>
          </button>
        </div>
      </div>

      {/* Formatting Toolbar (shown in visual and code tabs) */}
      {activeTab !== 'preview' && (
        <div className="bg-slate-100/60 p-2 border-b border-slate-200 flex items-center gap-1 flex-wrap text-slate-700 text-xs select-none">
          {/* Headings */}
          <div className="flex items-center gap-0.5 pl-2 border-l border-slate-300">
            <button
              type="button"
              title="پاراگراف عادی"
              onClick={() => wrapSelection('<p class="my-2 leading-relaxed">', '</p>')}
              className="px-2 py-1 hover:bg-slate-200 rounded-lg font-bold text-xs cursor-pointer"
            >
              P
            </button>
            <button
              type="button"
              title="سرتیتر اصلی (H2)"
              onClick={() => wrapSelection('<h2 class="text-xl font-black text-slate-900 my-3">', '</h2>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Heading1 className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              type="button"
              title="سرتیتر فرعی (H3)"
              onClick={() => wrapSelection('<h3 class="text-base font-bold text-slate-800 my-2">', '</h3>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Heading2 className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              type="button"
              title="زیرعنوان (H4)"
              onClick={() => wrapSelection('<h4 class="text-sm font-bold text-slate-700 my-1.5">', '</h4>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Heading3 className="w-4 h-4" />
            </button>
          </div>

          {/* Typography Styles */}
          <div className="flex items-center gap-0.5 px-2 border-l border-slate-300">
            <button
              type="button"
              title="ضخیم (Bold)"
              onClick={() => wrapSelection('<strong>', '</strong>')}
              className="p-1 hover:bg-slate-200 rounded-lg font-bold cursor-pointer"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="ایتالیک و مایل (Italic)"
              onClick={() => wrapSelection('<em>', '</em>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="زیرخط (Underline)"
              onClick={() => wrapSelection('<u>', '</u>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="خط‌خورده (Strikethrough)"
              onClick={() => wrapSelection('<s>', '</s>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
          </div>

          {/* Alignments */}
          <div className="flex items-center gap-0.5 px-2 border-l border-slate-300">
            <button
              type="button"
              title="راست‌چین"
              onClick={() => wrapSelection('<div dir="rtl" class="text-right">', '</div>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="وسط‌چین"
              onClick={() => wrapSelection('<div class="text-center">', '</div>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="چپ‌چین"
              onClick={() => wrapSelection('<div dir="ltr" class="text-left font-mono">', '</div>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="هم‌تراز (Justify)"
              onClick={() => wrapSelection('<div class="text-justify leading-relaxed">', '</div>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <AlignJustify className="w-4 h-4" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-0.5 px-2 border-l border-slate-300">
            <button
              type="button"
              title="لیست نشانه‌دار (Bullets)"
              onClick={() => wrapSelection('<ul class="list-disc list-inside space-y-1 my-2 pr-2">\n  <li>', '</li>\n</ul>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="لیست شماره‌دار (Numbered)"
              onClick={() => wrapSelection('<ol class="list-decimal list-inside space-y-1 my-2 pr-2">\n  <li>', '</li>\n</ol>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          {/* Color Palettes Dropdowns */}
          <div className="flex items-center gap-1 px-2 border-l border-slate-300 relative">
            {/* Text Color */}
            <div className="relative">
              <button
                type="button"
                title="رنگ متن"
                onClick={() => {
                  setShowTextColorPicker(!showTextColorPicker);
                  setShowBgColorPicker(false);
                }}
                className="p-1 hover:bg-slate-200 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Palette className="w-4 h-4 text-indigo-600" />
                <span className="w-2.5 h-1 bg-indigo-600 rounded-full inline-block" />
              </button>

              {showTextColorPicker && (
                <div className="absolute top-8 right-0 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 w-44 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 pb-1 border-b border-slate-100">
                    انتخاب رنگ نوشته:
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {TEXT_COLORS.map(c => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => handleApplyTextColor(c.hex)}
                        title={c.name}
                        className="w-7 h-7 rounded-lg border border-black/10 hover:scale-110 transition-transform cursor-pointer"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Background Highlight Color */}
            <div className="relative">
              <button
                type="button"
                title="رنگ پس‌زمینه / هایلایت"
                onClick={() => {
                  setShowBgColorPicker(!showBgColorPicker);
                  setShowTextColorPicker(false);
                }}
                className="p-1 hover:bg-slate-200 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Highlighter className="w-4 h-4 text-amber-500" />
                <span className="w-2.5 h-1 bg-amber-400 rounded-full inline-block" />
              </button>

              {showBgColorPicker && (
                <div className="absolute top-8 right-0 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 w-48 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 pb-1 border-b border-slate-100">
                    رنگ هایلایت و پس‌زمینه:
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {HIGHLIGHT_COLORS.map(c => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => handleApplyBgColor(c.hex)}
                        title={c.name}
                        className="w-7 h-7 rounded-lg border border-slate-300 hover:scale-110 transition-transform flex items-center justify-center text-[10px] cursor-pointer"
                        style={{ backgroundColor: c.hex }}
                      >
                        {c.hex === 'transparent' && '✕'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inserts: Link, Image, Quote, Code, Table, HR */}
          <div className="flex items-center gap-0.5 px-2 border-l border-slate-300">
            <button
              type="button"
              title="درج پیوند (Link)"
              onClick={() => {
                const textarea = textareaRef.current;
                const selected = textarea && value ? value.substring(textarea.selectionStart, textarea.selectionEnd) : '';
                setLinkText(selected);
                setShowLinkModal(true);
              }}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <LinkIcon className="w-4 h-4 text-blue-600" />
            </button>

            <button
              type="button"
              title="درج تصویر (Image)"
              onClick={() => {
                if (onOpenMediaPicker) {
                  onOpenMediaPicker((url) => {
                    insertAtCursor(`\n<img src="${url}" alt="تصویر محتوا" class="w-full max-w-2xl mx-auto rounded-2xl my-4 shadow-sm border border-slate-200" />\n`);
                  });
                } else {
                  setShowImageModal(true);
                }
              }}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <ImageIcon className="w-4 h-4 text-emerald-600" />
            </button>

            <button
              type="button"
              title="نقل‌قول (Blockquote)"
              onClick={() => wrapSelection('<blockquote class="border-r-4 border-indigo-500 bg-indigo-50/60 p-3 pr-4 rounded-l-xl italic my-3 text-slate-700">', '</blockquote>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Quote className="w-4 h-4 text-slate-500" />
            </button>

            <button
              type="button"
              title="بلوک کد (Code Block)"
              onClick={() => wrapSelection('<pre class="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs my-3 overflow-x-auto dir-ltr"><code>', '</code></pre>')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Code className="w-4 h-4 text-amber-600" />
            </button>

            <button
              type="button"
              title="درج جدول (Table)"
              onClick={handleInsertTable}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <TableIcon className="w-4 h-4" />
            </button>

            <button
              type="button"
              title="خط افقی جداکننده (HR)"
              onClick={() => insertAtCursor('\n<hr class="my-4 border-slate-200" />\n')}
              className="p-1 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Clean format */}
          <div className="flex items-center gap-0.5 px-2">
            <button
              type="button"
              title="پاک کردن استایل‌ها"
              onClick={handleClearFormat}
              className="p-1 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer"
            >
              <Eraser className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body */}
      <div className="relative">
        {activeTab === 'visual' || activeTab === 'code' ? (
          <textarea
            ref={textareaRef}
            rows={8}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full p-4 text-xs text-slate-900 bg-transparent resize-y outline-none leading-relaxed ${minHeight} ${
              activeTab === 'code' ? 'font-mono text-[11px] bg-slate-950 text-emerald-400' : ''
            }`}
          />
        ) : (
          /* Live Preview Tab */
          <div className={`p-5 prose prose-slate max-w-none text-xs leading-loose overflow-y-auto ${minHeight} bg-slate-50/50`}>
            {value ? (
              <div
                dangerouslySetInnerHTML={{ __html: value }}
                className="space-y-3 rich-preview-content"
              />
            ) : (
              <div className="text-slate-400 italic text-center py-8">
                متنی برای پیش‌نمایش وارد نشده است.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status Bar: Word & Character Counter */}
      <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-3">
          <span>تعداد کلمات: <strong className="text-slate-600 font-bold">{wordCount}</strong></span>
          <span>·</span>
          <span>کاراکترها: <strong className="text-slate-600 font-bold">{charCount}</strong></span>
        </div>
        <div className="text-indigo-600 text-[10px] font-sans">
          پشتیبانی کامل از HTML5، راست‌چین و رنگ‌بندی
        </div>
      </div>

      {/* Insert Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-indigo-600" />
                <span>درج پیوند (Link)</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyLink} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">متن نمایشی پیوند</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="مثال: مشاهده دوره جامع"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">آدرس اینترنتی (URL) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  dir="ltr"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  افزودن لینک
                </button>
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Insert Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>درج تصویر با آدرس اینترنتی</span>
              </span>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyImage} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">آدرس اینترنتی تصویر (Image URL) <span className="text-red-500">*</span></label>
                <input
                  type="url"
                  dir="ltr"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">متن جایگزین (Alt Text)</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="توضیح کوتاه تصویر برای سئو"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                >
                  درج تصویر در متن
                </button>
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
