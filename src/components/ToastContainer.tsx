import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';
import { store } from '../services/store';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>(store.toasts);

  useEffect(() => {
    return store.subscribe(() => {
      setToasts([...store.toasts]);
    });
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none" dir="rtl">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center justify-between gap-3 animate-slide-up transition-all ${
            t.type === 'success'
              ? 'bg-slate-900 text-white border-emerald-500/30 dark:bg-slate-950'
              : t.type === 'error'
              ? 'bg-red-950 text-white border-red-800'
              : 'bg-slate-900 text-white border-indigo-500/30'
          }`}
        >
          <div className="flex items-center gap-3">
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-indigo-400 shrink-0" />}
            <span className="text-xs font-medium leading-relaxed">{t.message}</span>
          </div>

          <button
            onClick={() => store.dismissToast(t.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
