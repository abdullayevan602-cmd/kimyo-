import React, { useMemo } from 'react';
import { VesselType, AddedSubstance, ChemicalReaction } from '../../types/chemistry';
import { Flame, Thermometer, Activity, Sparkles } from 'lucide-react';

interface LabVessel3DProps {
  vesselType: VesselType;
  contents: AddedSubstance[];
  activeReaction: ChemicalReaction | null;
  temperature: number; // Celsius
  isStirring: boolean;
  isBurnerOn: boolean;
}

export const LabVessel3D: React.FC<LabVessel3DProps> = ({
  vesselType,
  contents,
  activeReaction,
  temperature,
  isStirring,
  isBurnerOn
}) => {
  // Compute total liquid/powder volume (clamped between 0 and 100 for display)
  const totalVolume = useMemo(() => {
    return contents.reduce((acc, item) => acc + item.amount, 0);
  }, [contents]);

  const fillPercentage = Math.min(Math.max((totalVolume / 60) * 100, contents.length > 0 ? 25 : 0), 85);

  // Compute live liquid color: if reaction occurred, use reaction result color; otherwise blend added colors
  const liquidColor = useMemo(() => {
    if (activeReaction) {
      return activeReaction.resultColorHex;
    }
    if (contents.length === 0) {
      return 'transparent';
    }
    // Return last added substance's hex color or default cyan tint
    return contents[contents.length - 1].substance.hexColor || '#38bdf8';
  }, [activeReaction, contents]);

  // Compute pH
  const currentPh = useMemo(() => {
    if (activeReaction && activeReaction.resultPh !== undefined) {
      return activeReaction.resultPh;
    }
    if (contents.length === 0) return 7.0;
    const phValues = contents
      .map(c => c.substance.ph)
      .filter((ph): ph is number => ph !== undefined);
    if (phValues.length === 0) return 7.0;
    return Number((phValues.reduce((a, b) => a + b, 0) / phValues.length).toFixed(1));
  }, [activeReaction, contents]);

  // pH color representation
  const getPhColor = (ph: number) => {
    if (ph < 3) return 'bg-rose-500 text-rose-100';
    if (ph < 6) return 'bg-amber-500 text-amber-100';
    if (ph <= 8) return 'bg-emerald-500 text-emerald-100';
    if (ph <= 11) return 'bg-cyan-500 text-cyan-100';
    return 'bg-purple-600 text-purple-100';
  };

  const getPhLabel = (ph: number) => {
    if (ph < 6.5) return 'Kislotali';
    if (ph > 7.5) return 'Ishqoriy';
    return 'Neytral';
  };

  const bubblesIntensity = activeReaction?.bubblesIntensity || 'none';
  const bubbleCount = bubblesIntensity === 'violent' ? 24 : bubblesIntensity === 'medium' ? 14 : bubblesIntensity === 'light' ? 6 : (temperature > 80 ? 8 : 0);

  const hasPrecipitate = !!activeReaction?.precipitateColorHex;
  const precipitateColor = activeReaction?.precipitateColorHex || '#ffffff';

  const isSmoking = (activeReaction && activeReaction.smokeIntensity !== 'none') || temperature > 95;

  return (
    <div className="relative w-full h-[400px] sm:h-[460px] flex items-center justify-center p-4 select-none">
      
      {/* Background Lab Glow & Atmosphere */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-20 transition-colors duration-700"
          style={{ backgroundColor: liquidColor !== 'transparent' ? liquidColor : '#6366f1' }}
        />
        {/* Lab Grid subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.08)_0,transparent_70%)]" />
      </div>

      {/* Exothermic / Reaction Flash Burst */}
      {activeReaction?.flameEffect && activeReaction.flameEffect !== 'none' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="w-72 h-72 rounded-full bg-amber-400/25 blur-2xl animate-ping" />
        </div>
      )}

      {/* Digital Sensor Panels (Top Left: Thermometer, Top Right: pH Meter) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${temperature > 60 ? 'bg-rose-500/20 text-rose-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
            <Thermometer className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Harorat</div>
            <div className={`text-base font-bold font-mono ${temperature > 80 ? 'text-rose-400' : temperature > 40 ? 'text-amber-400' : 'text-cyan-400'}`}>
              {temperature.toFixed(0)}°C
            </div>
          </div>
        </div>
        
        {/* Visual Temp Bar */}
        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 transition-all duration-300"
            style={{ width: `${Math.min((temperature / 250) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">pH Ko‘rsatkich</div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold font-mono text-slate-100">{currentPh}</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${getPhColor(currentPh)}`}>
                {getPhLabel(currentPh)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Glassware Vessel Container */}
      <div className="relative flex flex-col items-center justify-end h-80 w-64 z-10">
        
        {/* Steam / Smoke particles rising from opening */}
        {isSmoking && (
          <div className="absolute -top-16 w-32 h-20 flex justify-center pointer-events-none z-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 rounded-full bg-slate-200/20 blur-md animate-float-smoke"
                style={{
                  left: `${20 + (i * 10) + (Math.sin(i) * 10)}%`,
                  animationDuration: `${1.2 + (i * 0.2)}s`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        )}

        {/* 1. ERLENMEYER FLASK SHAPE */}
        {vesselType === 'flask' && (
          <div className="relative w-52 h-64 flex flex-col items-center">
            {/* Flask Lip */}
            <div className="w-16 h-3 rounded-t-sm border-2 border-b-0 border-cyan-400/40 bg-white/5 backdrop-blur-xs shadow-xs" />
            {/* Flask Neck */}
            <div className="w-12 h-16 border-x-2 border-cyan-400/35 bg-white/5 relative">
              {/* Glass Reflection Highlight */}
              <div className="absolute left-1 top-0 w-1 h-full bg-white/20 rounded-full" />
            </div>
            {/* Flask Conical Body */}
            <div 
              className="relative w-52 h-44 border-2 border-t-0 border-cyan-400/40 bg-slate-900/30 backdrop-blur-md rounded-b-[40px] shadow-2xl overflow-hidden flex flex-col justify-end"
              style={{
                clipPath: 'polygon(38% 0%, 62% 0%, 100% 90%, 90% 100%, 10% 100%, 0% 90%)'
              }}
            >
              {/* Glass Reflection Curve */}
              <div className="absolute top-2 left-6 w-3 h-32 bg-white/15 rounded-full blur-[1px] transform -rotate-12 pointer-events-none" />
              <div className="absolute top-2 right-6 w-1.5 h-32 bg-white/10 rounded-full blur-[1px] transform rotate-12 pointer-events-none" />

              {/* Volume graduation tick marks */}
              <div className="absolute right-8 top-12 flex flex-col gap-3 pointer-events-none opacity-40">
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pr-1">100ml</span>
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pr-1">50ml</span>
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pr-1">25ml</span>
              </div>

              {/* Liquid Content */}
              {contents.length > 0 && (
                <div 
                  className="w-full relative transition-all duration-700 ease-out"
                  style={{
                    height: `${fillPercentage}%`,
                    backgroundColor: liquidColor,
                    boxShadow: `inset 0 10px 25px rgba(255,255,255,0.25), 0 0 35px ${liquidColor}`
                  }}
                >
                  {/* Liquid surface wave / meniscus */}
                  <div className="absolute -top-2 left-0 right-0 h-4 bg-white/30 rounded-[50%] blur-[0.5px]" />

                  {/* Magnetic Stirring Vortex Animation */}
                  {isStirring && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-full border-r-2 border-l-2 border-white/20 rounded-[50%] animate-spin duration-700" />
                    </div>
                  )}

                  {/* Rising Bubbles */}
                  {bubbleCount > 0 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(bubbleCount)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white/70 border border-white/90 shadow-sm animate-bubble-rise"
                          style={{
                            width: `${4 + (i % 5) * 2}px`,
                            height: `${4 + (i % 5) * 2}px`,
                            left: `${15 + (i * 12) % 70}%`,
                            bottom: '2px',
                            animationDuration: `${0.6 + (i % 4) * 0.25}s`,
                            animationDelay: `${(i * 0.1)}s`
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Precipitate settling at bottom */}
                  {hasPrecipitate && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-4 rounded-b-[40px] opacity-90 transition-all duration-500 shadow-md"
                      style={{ backgroundColor: precipitateColor }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. TEST TUBE SHAPE */}
        {vesselType === 'tube' && (
          <div className="relative w-20 h-64 flex flex-col items-center">
            {/* Tube Lip */}
            <div className="w-22 h-3 rounded-full border-2 border-cyan-400/40 bg-white/10" />
            {/* Tube Body */}
            <div className="relative w-18 h-60 border-2 border-t-0 border-cyan-400/40 bg-slate-900/30 backdrop-blur-md rounded-b-full shadow-2xl overflow-hidden flex flex-col justify-end">
              <div className="absolute top-2 left-2 w-1.5 h-48 bg-white/20 rounded-full blur-[1px] pointer-events-none" />
              
              {contents.length > 0 && (
                <div 
                  className="w-full relative transition-all duration-700 ease-out"
                  style={{
                    height: `${fillPercentage}%`,
                    backgroundColor: liquidColor,
                    boxShadow: `inset 0 10px 20px rgba(255,255,255,0.25), 0 0 30px ${liquidColor}`
                  }}
                >
                  <div className="absolute -top-1.5 left-0 right-0 h-3 bg-white/30 rounded-[50%]" />
                  {bubbleCount > 0 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(bubbleCount)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white/80 animate-bubble-rise"
                          style={{
                            width: `${4 + (i % 3) * 2}px`,
                            height: `${4 + (i % 3) * 2}px`,
                            left: `${20 + (i * 20) % 60}%`,
                            bottom: '2px',
                            animationDuration: `${0.7 + (i % 3) * 0.2}s`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {hasPrecipitate && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-4 rounded-b-full opacity-90"
                      style={{ backgroundColor: precipitateColor }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. LABORATORY BEAKER SHAPE */}
        {vesselType === 'beaker' && (
          <div className="relative w-44 h-60 flex flex-col items-center">
            {/* Beaker Spout & Lip */}
            <div className="w-46 h-3 rounded-t-sm border-2 border-cyan-400/40 bg-white/5" />
            <div className="relative w-44 h-56 border-2 border-t-0 border-cyan-400/40 bg-slate-900/30 backdrop-blur-md rounded-b-2xl shadow-2xl overflow-hidden flex flex-col justify-end">
              <div className="absolute top-2 left-3 w-2 h-44 bg-white/15 rounded-full pointer-events-none" />
              
              {/* Tick marks */}
              <div className="absolute left-3 top-8 flex flex-col gap-4 pointer-events-none opacity-40">
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pl-1">200ml</span>
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pl-1">150ml</span>
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pl-1">100ml</span>
                <span className="text-[8px] font-mono text-cyan-200 border-b border-cyan-300 pl-1">50ml</span>
              </div>

              {contents.length > 0 && (
                <div 
                  className="w-full relative transition-all duration-700 ease-out"
                  style={{
                    height: `${fillPercentage}%`,
                    backgroundColor: liquidColor,
                    boxShadow: `inset 0 10px 20px rgba(255,255,255,0.25), 0 0 30px ${liquidColor}`
                  }}
                >
                  <div className="absolute -top-2 left-0 right-0 h-4 bg-white/30 rounded-[50%]" />
                  {isStirring && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-full border-r-2 border-l-2 border-white/20 rounded-full animate-spin duration-700" />
                    </div>
                  )}
                  {bubbleCount > 0 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(bubbleCount)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white/80 animate-bubble-rise"
                          style={{
                            width: `${4 + (i % 4) * 2}px`,
                            height: `${4 + (i % 4) * 2}px`,
                            left: `${15 + (i * 15) % 70}%`,
                            bottom: '2px',
                            animationDuration: `${0.8 + (i % 3) * 0.25}s`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {hasPrecipitate && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-4 rounded-b-2xl opacity-90"
                      style={{ backgroundColor: precipitateColor }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. CRUCIBLE DISH SHAPE */}
        {vesselType === 'crucible' && (
          <div className="relative w-52 h-40 flex flex-col items-center justify-end">
            <div className="relative w-52 h-32 border-2 border-amber-200/40 bg-gradient-to-b from-stone-800 to-stone-900 rounded-b-[70px] shadow-2xl overflow-hidden flex flex-col justify-end">
              <div className="absolute inset-x-0 top-0 h-4 bg-stone-700/50 rounded-[50%]" />
              {contents.length > 0 && (
                <div 
                  className="w-full relative transition-all duration-700 ease-out"
                  style={{
                    height: `${Math.min(fillPercentage + 15, 80)}%`,
                    backgroundColor: liquidColor,
                    boxShadow: `inset 0 6px 15px rgba(255,255,255,0.2)`
                  }}
                >
                  {bubbleCount > 0 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {[...Array(bubbleCount)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-white/80 animate-bubble-rise"
                          style={{
                            width: '5px',
                            height: '5px',
                            left: `${20 + (i * 15) % 60}%`,
                            bottom: '2px',
                            animationDuration: '0.6s'
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {hasPrecipitate && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-4 rounded-b-[70px] opacity-90"
                      style={{ backgroundColor: precipitateColor }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Magnetic Stir Bar Pellet at bottom */}
        {isStirring && contents.length > 0 && (
          <div className="absolute bottom-2 w-8 h-2.5 rounded-full bg-white shadow-lg animate-spin duration-300 z-20 pointer-events-none" />
        )}

        {/* Bunsen Burner Stand & Flame Underneath */}
        <div className="w-full flex flex-col items-center mt-1 z-0">
          {/* Flame */}
          {isBurnerOn && (
            <div className="relative w-12 h-16 flex items-center justify-center -mt-2">
              {/* Outer flame */}
              <div className="absolute w-10 h-14 bg-gradient-to-t from-orange-500 via-amber-400 to-transparent rounded-full blur-[2px] animate-pulse" />
              {/* Hot Blue Core Flame */}
              <div className="absolute w-5 h-9 bg-gradient-to-t from-blue-600 via-cyan-400 to-transparent rounded-full blur-[0.5px]" />
            </div>
          )}

          {/* Burner Chimney Nozzle */}
          <div className="w-8 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-sm border border-slate-500 shadow-md" />
          {/* Burner Base Plate */}
          <div className="w-24 h-3 bg-slate-700 rounded-sm border border-slate-600 shadow-lg" />
        </div>
      </div>
    </div>
  );
};
