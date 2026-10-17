import React from 'react';
import { X, CheckCircle2, Printer, ArrowLeft, Download, ShieldCheck, Terminal } from 'lucide-react';
import { Order } from '../types';

interface InvoiceModalProps {
  order: Order;
  onClose: () => void;
  onGoToStudentPanel: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  onClose,
  onGoToStudentPanel
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 print:border-none print:shadow-none">
        {/* Top Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50 text-emerald-900 print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold">پرداخت شما با موفقیت انجام و سفارش ثبت گردید</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800">
          {/* Invoice Company Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-slate-900">آکادمی پارس‌نت</h1>
                <div className="text-xs text-slate-500">فاکتور رسمی فروش خدمات آموزشی و فایل دیجیتال</div>
              </div>
            </div>

            <div className="text-left font-mono text-xs space-y-1">
              <div><span className="text-slate-400">شماره سفارش:</span> <strong className="text-slate-900">{order.orderNumber}</strong></div>
              <div><span className="text-slate-400">کد رهگیری بانکی:</span> <strong className="text-emerald-700">{order.refId}</strong></div>
              <div><span className="text-slate-400">تاریخ:</span> <span>{order.createdAt}</span></div>
            </div>
          </div>

          {/* Customer Details Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-slate-400 block mb-0.5">نام و نام خانوادگی خریدار:</span>
              <span className="font-bold text-slate-800">{order.userName}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">شماره همراه:</span>
              <span className="font-mono text-slate-800">{order.userPhone}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">درگاه پرداخت:</span>
              <span className="text-slate-800 font-medium">زرین‌پال / شاپرک ({order.cardNumber || 'کارت شتاب'})</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-hidden border border-slate-200 rounded-xl">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">ردیف</th>
                  <th className="p-3">شرح دوره یا فایل آموزشی</th>
                  <th className="p-3">نوع محصول</th>
                  <th className="p-3 text-left">مبلغ (تومان)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-bold text-slate-900">{item.title}</td>
                    <td className="p-3 text-slate-500 font-mono">
                      {item.type === 'course' ? 'دوره ویدیویی' : 'فایل دانلودی'}
                    </td>
                    <td className="p-3 text-left font-mono font-bold text-slate-900 tabular-nums">
                      {item.price.toLocaleString('fa-IR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Official Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>وضعیت پرداخت: <strong>موفق و تایید شده</strong> (دسترسی به دوره‌ها و فایل‌ها فعال شد)</span>
            </div>

            <div className="text-left font-mono text-xs space-y-1 w-full sm:w-auto">
              <div className="flex justify-between sm:justify-end gap-6 text-slate-500">
                <span>جمع کل:</span>
                <span>{order.totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between sm:justify-end gap-6 text-emerald-600">
                  <span>تخفیف:</span>
                  <span>- {order.discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between sm:justify-end gap-6 text-sm font-black text-slate-900 border-t border-slate-200 pt-1">
                <span>مبلغ پرداختی:</span>
                <span className="text-indigo-600">{order.payableAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>چاپ / ذخیره فاکتور PDF</span>
          </button>

          <button
            onClick={onGoToStudentPanel}
            className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center gap-2 transition-colors shadow-md"
          >
            <span>مشاهده آموزش‌ها و دانلود فایل‌ها در پنل کاربری</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
