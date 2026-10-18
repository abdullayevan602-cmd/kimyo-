import React, { useState, useMemo } from 'react';
import { ElementData, Language } from '../../types/chemistry';
import { PERIODIC_ELEMENTS, CATEGORY_COLORS } from '../../data/periodicTable';
import { SUBSTANCES } from '../../data/substances';
import { TRANSLATIONS } from '../../data/translations';
import { soundFx } from '../../utils/audio';
import { 
  Search, 
  Atom, 
  FlaskConical, 
  Sparkles, 
  Info, 
  ChevronRight,
  Filter
} from 'lucide-react';

interface PeriodicTableViewProps {
  lang: Language;
  onAddSubstanceById: (substanceId: string) => void;
  onNavigateToLab: () => void;
}

export const PeriodicTableView: React.FC<PeriodicTableViewProps> = ({
  lang,
  onAddSubstanceById,
  onNavigateToLab
}) => {
  const t = TRANSLATIONS[lang];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<'all' | 'solid' | 'liquid' | 'gas'>('all');
  const [activeElement, setActiveElement] = useState<ElementData | null>(null);

  const filteredElements = useMemo(() => {
    return PERIODIC_ELEMENTS.filter((el) => {
      const q = search.toLowerCase().trim();
      const name = lang === 'uz' ? el.nameUz : lang === 'ru' ? el.nameRu : el.nameEn;
      const matchesSearch = !q || el.symbol.toLowerCase().includes(q) || name.toLowerCase().includes(q) || String(el.number) === q;
      const matchesCategory = selectedCategory === 'all' || el.category === selectedCategory;
      const matchesState = selectedState === 'all' || el.stateAt20C === selectedState;
      return matchesSearch && matchesCategory && matchesState;
    });
  }, [search, selectedCategory, selectedState, lang]);

  const handleAddToLab = (el: ElementData) => {
    if (el.substanceId) {
      soundFx.playPour();
      onAddSubstanceById(el.substanceId);
      onNavigateToLab();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-6 flex flex-col gap-5">
      
      {/* Header Banner */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Atom className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              {t.periodicTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.periodicSubtitle}
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchElement}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Category Legend & Quick State Filter */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kategoriyalar bo‘yicha filtr:</span>
          </span>

          {/* State of matter filter buttons */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['all', 'solid', 'liquid', 'gas'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg uppercase transition-all ${
                  selectedState === st
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st === 'all' ? 'Barchasi' : st === 'solid' ? 'Qattiq' : st === 'liquid' ? 'Suyuq' : 'Gaz'}
              </button>
            ))}
          </div>
        </div>

        {/* Legend badges */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-100 text-slate-950 shadow-sm'
                : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Barchasi
          </button>
          {Object.entries(CATEGORY_COLORS).map(([catKey, style]) => {
            const isSelected = selectedCategory === catKey;
            const label = lang === 'uz' ? style.labelUz : lang === 'ru' ? style.labelRu : style.labelEn;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(isSelected ? 'all' : catKey)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-all ${
                  isSelected
                    ? `${style.bg} ${style.text} ${style.border} ring-2 ring-cyan-500/40`
                    : `${style.bg} ${style.text} ${style.border} opacity-80 hover:opacity-100`
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Elements Responsive Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
        {filteredElements.map((el) => {
          const style = CATEGORY_COLORS[el.category] || CATEGORY_COLORS['reactive-nonmetal'];
          const name = lang === 'uz' ? el.nameUz : lang === 'ru' ? el.nameRu : el.nameEn;
          const hasLabMatch = !!el.substanceId;

          return (
            <div
              key={el.number}
              onClick={() => setActiveElement(el)}
              className={`group relative p-3 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between hover:scale-[1.03] hover:shadow-xl ${style.bg} ${style.border} hover:border-cyan-400/80 bg-slate-950/50 backdrop-blur-md`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{el.number}</span>
                <span className="text-[9px] font-mono text-slate-500 font-medium">{el.mass.toFixed(1)}</span>
              </div>

              <div className="my-1 text-center">
                <div className={`font-mono text-2xl font-black tracking-tight ${style.text} group-hover:scale-110 transition-transform`}>
                  {el.symbol}
                </div>
                <div className="text-[11px] font-medium text-slate-200 truncate mt-0.5">
                  {name}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[9px] text-slate-400">
                <span className="capitalize">{el.stateAt20C}</span>
                {hasLabMatch && (
                  <span className="text-cyan-400 font-bold" title="Laboratoriyada mavjud">
                    🧪 Lab
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Element Detail Modal */}
      {activeElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4 text-slate-100 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-xl shadow-cyan-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
                    <span className="text-[10px] font-mono text-slate-400">№ {activeElement.number}</span>
                    <span className="text-2xl font-black font-mono text-cyan-300">{activeElement.symbol}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'uz' ? activeElement.nameUz : lang === 'ru' ? activeElement.nameRu : activeElement.nameEn}
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono">
                    {activeElement.symbol} • Davr {activeElement.period}, Guruh {activeElement.group}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setActiveElement(null)}
                className="text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono">
              <div>{t.atomicMass}: <span className="text-cyan-300 font-bold">{activeElement.mass} u</span></div>
              <div>{t.electronConfig}: <span className="text-indigo-300">{activeElement.electronConfig}</span></div>
              <div>{t.electronegativity}: <span className="text-amber-300">{activeElement.electronegativity || '—'}</span></div>
              <div>{t.discoveryYear}: <span className="text-emerald-300">{activeElement.discovered}</span></div>
            </div>

            {/* Summary */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
              {activeElement.summaryUz}
            </div>

            {/* Add to Lab Vessel Button */}
            {activeElement.substanceId ? (
              <button
                onClick={() => {
                  handleAddToLab(activeElement);
                  setActiveElement(null);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <FlaskConical className="w-4 h-4 text-slate-950" />
                <span>{t.addDirectToLab}</span>
              </button>
            ) : (
              <div className="text-center text-[11px] text-slate-500 py-1">
                (Ushbu element virtual laboratoriyaning eritmalar javonida bevosita birikma sifatida qatnashadi)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
