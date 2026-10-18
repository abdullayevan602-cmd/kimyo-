import React, { useState, useEffect, useCallback } from 'react';
import { 
  Language, 
  Theme, 
  VesselType, 
  AddedSubstance, 
  Substance, 
  ChemicalReaction, 
  ReactionLog 
} from './types/chemistry';
import { REACTIONS } from './data/reactions';
import { SUBSTANCES } from './data/substances';
import { soundFx } from './utils/audio';
import confetti from 'canvas-confetti';

import { Navbar } from './components/Navbar';
import { LabVessel3D } from './components/VirtualLab/LabVessel3D';
import { VesselControls } from './components/VirtualLab/VesselControls';
import { SubstanceShelf } from './components/VirtualLab/SubstanceShelf';
import { ReactionDisplay } from './components/VirtualLab/ReactionDisplay';
import { PeriodicTableView } from './components/PeriodicTable/PeriodicTableView';
import { AIAssistantView } from './components/AIAssistant/AIAssistantView';
import { QuizView } from './components/Quiz/QuizView';
import { HistoryView } from './components/History/HistoryView';
import { SafetyModal } from './components/SafetyModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'lab' | 'periodic' | 'ai' | 'quiz' | 'history'>('lab');
  const [lang, setLang] = useState<Language>('uz');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState<boolean>(false);

  // Virtual Lab State
  const [vesselType, setVesselType] = useState<VesselType>('flask');
  const [contents, setContents] = useState<AddedSubstance[]>([]);
  const [activeReaction, setActiveReaction] = useState<ChemicalReaction | null>(null);
  const [temperature, setTemperature] = useState<number>(20); // 20°C ambient
  const [isBurnerOn, setIsBurnerOn] = useState<boolean>(false);
  const [isStirring, setIsStirring] = useState<boolean>(false);

  // History & Notebook State
  const [reactionLogs, setReactionLogs] = useState<ReactionLog[]>([]);

  // AI Prompt transfer
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  // Audio mute toggle
  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundFx.setMuted(nextState);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Evaluate chemical reactions based on current substances and temperature
  const checkReactions = useCallback((currentContents: AddedSubstance[], currentTemp: number) => {
    const currentSubstanceIds = new Set(currentContents.map(c => c.substance.id));

    // Find the best reaction where all required reactants are present
    const matchedReaction = REACTIONS.find(reaction => {
      const allReactantsPresent = reaction.reactants.every(reqId => currentSubstanceIds.has(reqId));
      if (!allReactantsPresent) return false;

      // Check temperature condition if required
      if (reaction.minTemp && currentTemp < reaction.minTemp) {
        return false;
      }

      return true;
    });

    if (matchedReaction) {
      setActiveReaction(matchedReaction);
      soundFx.playReactionSound(matchedReaction.soundEffect);

      // Temperature adjustment
      if (matchedReaction.tempChange) {
        setTemperature(prev => Math.min(Math.max(prev + matchedReaction.tempChange, 15), 450));
      }

      // Confetti for exciting reactions (e.g. golden rain, silver tree, elephant toothpaste, sodium burst)
      if (['pbno32_ki', 'h2o2_mno2', 'cu_agno3', 'na_h2o', 'h2_o2'].includes(matchedReaction.id)) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 }
        });
      }

      // Add to reaction history log if not already logged recently
      const newLog: ReactionLog = {
        id: `log-${Date.now()}`,
        timestamp: Date.now(),
        reactantsUsed: currentContents.map(c => ({
          name: c.substance.nameUz,
          formula: c.substance.formula,
          amount: c.amount,
          unit: c.unit
        })),
        equation: matchedReaction.balancedEquation,
        type: matchedReaction.type,
        thermalType: matchedReaction.thermalType,
        description: matchedReaction.descriptionUz,
        hazardNotice: matchedReaction.safetyNoticeUz
      };

      setReactionLogs(prev => [newLog, ...prev]);
    } else {
      setActiveReaction(null);
    }
  }, []);

  // Add substance to vessel
  const handleAddSubstance = (substance: Substance, amount: number) => {
    const unit = substance.state === 'solid' || substance.state === 'powder' ? 'g' : 'ml';
    const newAddition: AddedSubstance = {
      substance,
      amount,
      unit,
      addedAt: Date.now()
    };

    setContents(prev => {
      const updated = [...prev, newAddition];
      checkReactions(updated, temperature);
      return updated;
    });
  };

  // Add substance by ID (from Periodic Table or Catalyst)
  const handleAddSubstanceById = (substanceId: string) => {
    const sub = SUBSTANCES.find(s => s.id === substanceId);
    if (sub) {
      handleAddSubstance(sub, 5);
    }
  };

  // Remove individual substance
  const handleRemoveSubstance = (index: number) => {
    setContents(prev => {
      const updated = prev.filter((_, i) => i !== index);
      checkReactions(updated, temperature);
      return updated;
    });
  };

  // Clean / Rinse vessel
  const handleRinse = () => {
    soundFx.playPour();
    setContents([]);
    setActiveReaction(null);
    setTemperature(20);
    setIsBurnerOn(false);
    setIsStirring(false);
  };

  // Re-check reactions when temperature changes (e.g. heating with burner)
  useEffect(() => {
    if (contents.length > 0) {
      checkReactions(contents, temperature);
    }
  }, [temperature, contents, checkReactions]);

  // Ask AI about reaction
  const handleAskAiAboutReaction = (reaction: ChemicalReaction) => {
    const promptText = `Virtual laboratoriyada quyidagi reaksiya o‘tkazildi:\n${reaction.balancedEquation}\n\nIltimos, ushbu reaksiyaning borish mexanizmi, qanday ionlar qatnashgani, nima sababdan bunday vizual effektlar sodir bo‘lganini va uning kundalik hayotdagi amaliy ahamiyatini sodda qilib tushuntirib bering.`;
    setAiInitialPrompt(promptText);
    setActiveTab('ai');
  };

  const handleAskAiGeneral = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setActiveTab('ai');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-slate-950 text-slate-100' 
        : 'bg-slate-50 text-slate-900'
    } flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200`}>
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        isMuted={isMuted}
        toggleMute={toggleMute}
        openSafetyModal={() => setSafetyModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
        
        {/* TAB 1: VIRTUAL LABORATORY */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left Column: Glassware 3D Simulation & Reaction Summary (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              
              {/* 3D Vessel Visual Stage */}
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                <LabVessel3D
                  vesselType={vesselType}
                  contents={contents}
                  activeReaction={activeReaction}
                  temperature={temperature}
                  isStirring={isStirring}
                  isBurnerOn={isBurnerOn}
                />
              </div>

              {/* Reaction Discovery / Contents Panel */}
              <ReactionDisplay
                activeReaction={activeReaction}
                contents={contents}
                onRemoveSubstance={handleRemoveSubstance}
                onAskAiAboutReaction={handleAskAiAboutReaction}
                lang={lang}
              />

              {/* Lab Controls (Heater, Stirrer, Vessel Selector, Rinse) */}
              <VesselControls
                vesselType={vesselType}
                setVesselType={setVesselType}
                temperature={temperature}
                setTemperature={setTemperature}
                isBurnerOn={isBurnerOn}
                setIsBurnerOn={setIsBurnerOn}
                isStirring={isStirring}
                setIsStirring={setIsStirring}
                onRinse={handleRinse}
                onAddCatalyst={handleAddSubstanceById}
                lang={lang}
              />
            </div>

            {/* Right Column: Chemical Substance Shelf (5 cols) */}
            <div className="lg:col-span-5">
              <SubstanceShelf
                onAddSubstance={handleAddSubstance}
                lang={lang}
              />
            </div>
          </div>
        )}

        {/* TAB 2: MENDELEYEV PERIODIC TABLE */}
        {activeTab === 'periodic' && (
          <PeriodicTableView
            lang={lang}
            onAddSubstanceById={handleAddSubstanceById}
            onNavigateToLab={() => setActiveTab('lab')}
          />
        )}

        {/* TAB 3: AI CHEMIST ASSISTANT */}
        {activeTab === 'ai' && (
          <AIAssistantView
            lang={lang}
            initialPrompt={aiInitialPrompt}
            onClearInitialPrompt={() => setAiInitialPrompt('')}
          />
        )}

        {/* TAB 4: CHEMISTRY QUIZ & TESTS */}
        {activeTab === 'quiz' && (
          <QuizView lang={lang} />
        )}

        {/* TAB 5: LAB NOTEBOOK / REACTION HISTORY */}
        {activeTab === 'history' && (
          <HistoryView
            logs={reactionLogs}
            onClearHistory={() => setReactionLogs([])}
            onReplayReaction={(log) => {
              handleRinse();
              log.reactantsUsed.forEach(r => {
                const sub = SUBSTANCES.find(s => s.formula === r.formula);
                if (sub) handleAddSubstance(sub, r.amount);
              });
              setActiveTab('lab');
            }}
            onAskAi={handleAskAiGeneral}
            lang={lang}
          />
        )}
      </main>

      {/* Safety Guidelines Modal */}
      <SafetyModal
        isOpen={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
