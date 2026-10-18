import React from 'react';
import { ShieldAlert, Flame, AlertTriangle, Skull, Droplets, Eye, X } from 'lucide-react';
import { Language } from '../types/chemistry';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl flex flex-col gap-5 text-slate-100 max-h-[90vh] overflow-y-auto scrollbar-thin">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Kimyo Laboratoriyasi Xavfsizlik Qoidalari</h3>
              <p className="text-xs text-slate-400">Akademik xavfsizlik va GHS belgilari qo‘llanmasi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Golden Rule Callout */}
        <div className="bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-orange-500/20 border border-rose-500/40 p-4 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs font-black uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            Laboratoriyaning Oltin Qoidasi:
          </span>
          <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
            "Kislotani suvga quy — hech qachon suvni kislotaga quya ko‘rma!"
          </p>
          <span className="text-[11px] text-slate-300">
            Kislotaga suv quyilganda ajralgan kuchli issiqlik tufayli suv bir zumda qaynaydi va o‘yuvchi kislotani yuz va ko‘zga sachratadi.
          </span>
        </div>

        {/* Essential Rules List */}
        <div className="space-y-3 text-xs text-slate-300">
          <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <Eye className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Himoya vositalari:</strong>
              Haqiqiy tajribalarda har doim maxsus himoya ko‘zoynagi, paxtali xalat va kislotaga chidamli qo‘lqop kiyiladi.
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <Skull className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Moddalarni tatib ko‘rish taqiqlanadi:</strong>
              Laboratoriyadagi hech qaysi modda va tuzni aslo tatib ko‘rish mumkin emas. Hidlaganda esa bug‘ni qo‘l bilan o‘zingizga tomon silkitib sekin hidlanadi.
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-semibold mb-0.5">Yong‘in va portlash xavfsizligi:</strong>
              Yengil alangalanuvchi organik moddalar (spirt, efir) va faol ishqoriy metallar (Na, K) ochiq olovdan yiroqda saqlanadi.
            </div>
          </div>
        </div>

        {/* Virtual Lab Educational Notice */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl text-[11px] text-slate-400 leading-relaxed text-center">
          Ushbu veb-ilova ta’lim maqsadida ishlab chiqilgan virtual simulyatsiya hisoblanadi. Undagi tajribalarni xavfsiz va qulay holda o‘rganishingiz mumkin. Xavfli tajribalarni uy sharoitida takrorlamang!
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-bold text-xs text-slate-950 hover:brightness-110 transition-all shadow-md"
        >
          Tushundim va qabul qilaman
        </button>
      </div>
    </div>
  );
};
