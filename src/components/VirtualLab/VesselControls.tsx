import React from 'react';
import { VesselType, Language } from '../../types/chemistry';
import { TRANSLATIONS } from '../../data/translations';
import { 
  Flame, 
  RotateCw, 
  Trash2, 
  FlaskConical, 
  TestTube, 
  Coffee, 
  Layers,
  Zap
} from 'lucide-react';

interface VesselControlsProps {
  vesselType: VesselType;
  setVesselType: (type: VesselType) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  isBurnerOn: boolean;
  setIsBurnerOn: (on: boolean) => void;
  isStirring: boolean;
  setIsStirring: (stir: boolean) => void;
  onRinse: () => void;
  onAddCatalyst: (catalystId: string) => void;
  lang: Language;
}

export const VesselControls: React.FC<VesselControlsProps> = ({
  vesselType,
  setVesselType,
  temperature,
  setTemperature,
  isBurnerOn,
  setIsBurnerOn,
  isStirring,
  setIsStirring,
  onRinse,
  onAddCatalyst,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  const vessels: { type: VesselType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { type: 'flask', label: t.vesselFlask, icon: FlaskConical },
    { type: 'tube', label: t.vesselTube, icon: TestTube },
    { type: 'beaker', label: t.vesselBeaker, icon: Coffee },
    { type: 'crucible', label: t.vesselCrucible, icon: Layers }
  ];

  const handleBurnerToggle = () => {
    if (!isBurnerOn) {
      setIsBurnerOn(true);
      if (temperature < 100) setTemperature(100);
    } else {
      setIsBurnerOn(false);
      setTemperature(20);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 text-slate-100">
      
      {/* 1. Vessel Selector */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Idish turi</span>
          <span className="text-[10px] text-cyan-400 font-mono">Shisha idishlar</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {vessels.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setVesselType(type)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                vesselType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${vesselType === type ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-800/80" />

      {/* 2. Bunsen Burner & Heating Control */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBurnerToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isBurnerOn
                  ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              <Flame className={`w-4 h-4 ${isBurnerOn ? 'animate-bounce text-amber-200' : ''}`} />
              <span>{t.burnerControl}: {isBurnerOn ? 'YONIQ' : 'O‘CHIQ'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => { setIsBurnerOn(false); setTemperature(20); }}
              className="text-[10px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              20°C
            </button>
            <button
              onClick={() => { setIsBurnerOn(true); setTemperature(100); }}
              className="text-[10px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              100°C
            </button>
            <button
              onClick={() => { setIsBurnerOn(true); setTemperature(300); }}
              className="text-[10px] px-2 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              300°C
            </button>
          </div>
        </div>

        {/* Temperature Range Slider */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={20}
            max={500}
            step={5}
            value={temperature}
            onChange={(e) => {
              const val = Number(e.target.value);
              setTemperature(val);
              if (val > 25 && !isBurnerOn) setIsBurnerOn(true);
              if (val <= 20) setIsBurnerOn(false);
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="font-mono text-xs font-bold text-amber-400 w-14 text-right">
            {temperature}°C
          </span>
        </div>
      </div>

      <div className="h-px bg-slate-800/80" />

      {/* 3. Magnetic Stirrer, Catalyst & Rinse Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Stirrer Toggle */}
          <button
            onClick={() => setIsStirring(!isStirring)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-medium transition-all ${
              isStirring
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-sm shadow-indigo-500/20'
                : 'bg-slate-800/70 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isStirring ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{isStirring ? t.stirrerOn : t.stirrer}</span>
          </button>

          {/* Quick Catalyst Button */}
          <button
            onClick={() => onAddCatalyst('mno2')}
            title="Marganes dioksid katalizatorini qo‘shish"
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Katalizator (MnO₂)</span>
          </button>
        </div>

        {/* Rinse Clean Button */}
        <button
          onClick={onRinse}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
          <span>{t.rinse}</span>
        </button>
      </div>
    </div>
  );
};
