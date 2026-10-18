import React, { useState, useMemo } from 'react';
import { Substance, SubstanceCategory, PhysicalState, Language } from '../../types/chemistry';
import { SUBSTANCES } from '../../data/substances';
import { TRANSLATIONS } from '../../data/translations';
import { soundFx } from '../../utils/audio';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  Droplet, 
  Flame, 
  Skull, 
  Wind,
  Info
} from 'lucide-react';

interface SubstanceShelfProps {
  onAddSubstance: (substance: Substance, amount: number) => void;
  lang: Language;
}

export const SubstanceShelf: React.FC<SubstanceShelfProps> = ({
  onAddSubstance,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubstanceCategory | 'all'>('all');
  const [selectedState, setSelectedState] = useState<PhysicalState | 'all'>('all');
  const [amount, setAmount] = useState<number>(10);
  const [selectedSubstanceInfo, setSelectedSubstanceInfo] = useState<Substance | null>(null);

  const categories: { id: SubstanceCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.allCategories },
    { id: 'acids', label: t.catAcids },
    { id: 'bases', label: t.catBases },
    { id: 'metals', label: t.catMetals },
    { id: 'salts', label: t.catSalts },
    { id: 'oxides', label: t.catOxides },
    { id: 'indicators', label: t.catIndicators },
    { id: 'nonmetals', label: t.catNonmetals },
    { id: 'organics', label: t.catOrganics },
  ];

  // Filter substances
  const filteredSubstances = useMemo(() => {
    return SUBSTANCES.filter((s) => {
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesState = selectedState === 'all' || s.state === selectedState;
      const q = search.toLowerCase().trim();
      const name = lang === 'uz' ? s.nameUz : lang === 'ru' ? s.nameRu : s.nameEn;
      const matchesSearch = !q || s.formula.toLowerCase().includes(q) || name.toLowerCase().includes(q);
      return matchesCategory && matchesState && matchesSearch;
    });
  }, [search, selectedCategory, selectedState, lang]);

  const handleAdd = (substance: Substance) => {
    soundFx.playPour();
    onAddSubstance(substance, amount);
  };

  const getHazardIcon = (hazard: string) => {
    switch (hazard) {
      case 'flammable':
        return (
          <span title="Alangalanuvchi">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </span>
        );
      case 'corrosive':
        return (
          <span title="O‘yuvchi / Korroziv">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </span>
        );
      case 'toxic':
        return (
          <span title="Zaharli">
            <Skull className="w-3.5 h-3.5 text-purple-400" />
          </span>
        );
      case 'oxidizer':
        return (
          <span title="Oksidlovchi">
            <Flame className="w-3.5 h-3.5 text-yellow-400" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 text-slate-100 h-full">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-slate-100 flex items-center gap-2">
            <Droplet className="w-4 h-4 text-cyan-400" />
            <span>Kimyoviy Moddalar Javoni</span>
          </h3>
          
          {/* Dose Amount Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400">{t.addAmount}:</span>
            {[5, 10, 20].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded-lg transition-all ${
                  amount === val
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchSubstances}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/30 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Substances Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredSubstances.map((s) => {
          const name = lang === 'uz' ? s.nameUz : lang === 'ru' ? s.nameRu : s.nameEn;
          const unit = s.state === 'solid' || s.state === 'powder' ? t.addUnitG : t.addUnitMl;
          return (
            <div
              key={s.id}
              className="group relative bg-slate-950/60 hover:bg-slate-800/50 border border-slate-800/80 hover:border-cyan-500/30 rounded-2xl p-3 flex flex-col justify-between gap-2 transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    {/* Visual Color Dot */}
                    <span 
                      className="w-3 h-3 rounded-full border border-white/20 shadow-xs flex-shrink-0"
                      style={{ backgroundColor: s.hexColor }}
                    />
                    {/* Formula */}
                    <span className="font-extrabold text-sm sm:text-base font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {s.formula}
                    </span>
                  </div>

                  {/* Hazard icon & Info trigger */}
                  <div className="flex items-center gap-1">
                    {getHazardIcon(s.hazard)}
                    <button
                      onClick={() => setSelectedSubstanceInfo(s)}
                      className="text-slate-500 hover:text-cyan-400 transition-colors p-0.5"
                      title="Batafsil ma’lumot"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Localized Name */}
                <div className="text-[11px] text-slate-300 font-medium line-clamp-1 mt-0.5">
                  {name}
                </div>

                {/* Subtext info */}
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-mono">
                  <span>M: {s.molarMass} g/mol</span>
                  {s.ph !== undefined && <span>pH: {s.ph}</span>}
                  <span className="capitalize px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    {s.state}
                  </span>
                </div>
              </div>

              {/* Add to Lab Button */}
              <button
                onClick={() => handleAdd(s)}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/10 hover:from-cyan-500/20 to-indigo-500/10 hover:to-indigo-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 text-xs font-semibold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.addToLab} ({amount} {unit})</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal / Flyout for Detailed Substance Info */}
      {selectedSubstanceInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-md w-full shadow-2xl flex flex-col gap-4 text-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-2xl font-bold text-cyan-300">{selectedSubstanceInfo.formula}</span>
                <h4 className="text-sm font-semibold text-slate-200 mt-1">
                  {lang === 'uz' ? selectedSubstanceInfo.nameUz : lang === 'ru' ? selectedSubstanceInfo.nameRu : selectedSubstanceInfo.nameEn}
                </h4>
              </div>
              <button
                onClick={() => setSelectedSubstanceInfo(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div>Molyar massa: <span className="text-cyan-400 font-bold">{selectedSubstanceInfo.molarMass} g/mol</span></div>
              <div>Zichlik: <span className="text-cyan-400">{selectedSubstanceInfo.density || '-'} g/cm³</span></div>
              <div>Holati: <span className="text-cyan-400 capitalize">{selectedSubstanceInfo.state}</span></div>
              <div>Taxminiy pH: <span className="text-cyan-400">{selectedSubstanceInfo.ph ?? '-'}</span></div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
              {lang === 'uz' ? selectedSubstanceInfo.descriptionUz : lang === 'ru' ? selectedSubstanceInfo.descriptionRu : selectedSubstanceInfo.descriptionEn}
            </div>

            {selectedSubstanceInfo.safetyNoticeUz && (
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedSubstanceInfo.safetyNoticeUz}</span>
              </div>
            )}

            <button
              onClick={() => {
                handleAdd(selectedSubstanceInfo);
                setSelectedSubstanceInfo(null);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-xs text-slate-950 hover:brightness-110 transition-all shadow-lg"
            >
              Idishga qo‘shish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
