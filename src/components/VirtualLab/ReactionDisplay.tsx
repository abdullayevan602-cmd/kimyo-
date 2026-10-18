import React from 'react';
import { ChemicalReaction, AddedSubstance, Language } from '../../types/chemistry';
import { TRANSLATIONS } from '../../data/translations';
import { 
  Sparkles, 
  Flame, 
  Droplet, 
  AlertTriangle, 
  Bot, 
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ReactionDisplayProps {
  activeReaction: ChemicalReaction | null;
  contents: AddedSubstance[];
  onRemoveSubstance: (index: number) => void;
  onAskAiAboutReaction: (reaction: ChemicalReaction) => void;
  lang: Language;
}

export const ReactionDisplay: React.FC<ReactionDisplayProps> = ({
  activeReaction,
  contents,
  onRemoveSubstance,
  onAskAiAboutReaction,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 text-slate-100">
      
      {/* If an active reaction was triggered */}
      {activeReaction ? (
        <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {/* Reaction Header Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin duration-1000" />
              <span>{t.reactionDetected}</span>
            </div>

            {/* Type badge */}
            <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              {activeReaction.type}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            {lang === 'uz' ? activeReaction.titleUz : lang === 'ru' ? activeReaction.titleRu : activeReaction.titleEn}
          </h4>

          {/* Balanced Chemical Equation Showcase */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-cyan-500/30 shadow-inner flex flex-col gap-1.5">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{t.reactionBalanced}</span>
            <div className="font-mono text-base sm:text-xl font-bold text-cyan-300 tracking-wide overflow-x-auto scrollbar-none py-1">
              {activeReaction.balancedEquation}
            </div>
          </div>

          {/* Thermal & Physical Characteristics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {/* Thermal Profile */}
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-medium">{t.thermalState}</span>
              <div className="flex items-center gap-1.5 font-semibold">
                {activeReaction.thermalType === 'exothermic' ? (
                  <>
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-rose-300">Ekzotermik ({activeReaction.deltaH || '+ΔT'})</span>
                  </>
                ) : activeReaction.thermalType === 'endothermic' ? (
                  <>
                    <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-cyan-300">Endotermik ({activeReaction.deltaH || '-ΔT'})</span>
                  </>
                ) : (
                  <span className="text-slate-300">{t.neutralTemp}</span>
                )}
              </div>
            </div>

            {/* Precipitate or Gas result */}
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-medium">Kuzatilgan belgi:</span>
              <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                {activeReaction.gasEvolved ? (
                  <span className="text-amber-300 flex items-center gap-1">
                    💨 {activeReaction.gasEvolved} gazi ajraldi
                  </span>
                ) : activeReaction.precipitateNameUz ? (
                  <span className="text-indigo-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Cho‘kma tushdi
                  </span>
                ) : (
                  <span className="text-cyan-300">Rang o‘zgarishi</span>
                )}
              </div>
            </div>

            {/* Products Formed */}
            <div className="col-span-2 sm:col-span-1 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-medium">{t.productsFormed}</span>
              <div className="flex flex-wrap gap-1">
                {activeReaction.products.map((p, idx) => (
                  <span key={idx} className="font-mono text-xs font-bold text-fuchsia-300 bg-fuchsia-950/50 px-1.5 py-0.5 rounded border border-fuchsia-800/40">
                    {p.formula}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scientific Description */}
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/30 p-3 rounded-2xl border border-slate-800">
            {lang === 'uz' ? activeReaction.descriptionUz : lang === 'ru' ? activeReaction.descriptionRu : activeReaction.descriptionEn}
          </div>

          {/* Safety Advisory Banner */}
          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl text-xs text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-semibold block">{t.safetyWarning}:</strong>
              {lang === 'uz' ? activeReaction.safetyNoticeUz : lang === 'ru' ? activeReaction.safetyNoticeRu : activeReaction.safetyNoticeEn}
            </div>
          </div>

          {/* Ask AI to Explain Button */}
          <button
            onClick={() => onAskAiAboutReaction(activeReaction)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
          >
            <Bot className="w-4 h-4 text-slate-950" />
            <span>{t.askAiAboutReaction}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      ) : (
        /* When No Reaction Yet: Show Current Contents */
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.currentContents} ({contents.length})
            </h4>
            {contents.length > 0 && (
              <span className="text-[10px] text-slate-500 font-mono">
                Jami: {contents.reduce((a, b) => a + b.amount, 0)} {contents[0]?.unit || 'ml'}
              </span>
            )}
          </div>

          {contents.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs sm:text-sm flex flex-col items-center gap-2 border border-dashed border-slate-800 rounded-2xl p-4">
              <Droplet className="w-6 h-6 text-slate-600 animate-pulse" />
              <span>{t.emptyVessel}</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto scrollbar-thin">
              {contents.map((item, idx) => {
                const name = lang === 'uz' ? item.substance.nameUz : lang === 'ru' ? item.substance.nameRu : item.substance.nameEn;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs group"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.substance.hexColor }}
                    />
                    <span className="font-mono font-bold text-cyan-300">{item.substance.formula}</span>
                    <span className="text-[11px] text-slate-400 truncate max-w-[120px]">{name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({item.amount}{item.unit})</span>
                    <button
                      onClick={() => onRemoveSubstance(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors ml-1 p-0.5"
                      title="Olib tashlash"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Educational notice */}
          <div className="text-[11px] text-slate-500 italic border-t border-slate-800/80 pt-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span>{t.simulationNotice}</span>
          </div>
        </div>
      )}
    </div>
  );
};
