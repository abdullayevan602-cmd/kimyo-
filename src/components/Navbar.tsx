import React from 'react';
import { 
  FlaskConical, 
  Atom, 
  Bot, 
  HelpCircle, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Language, Theme } from '../types/chemistry';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  activeTab: 'lab' | 'periodic' | 'ai' | 'quiz' | 'history';
  setActiveTab: (tab: 'lab' | 'periodic' | 'ai' | 'quiz' | 'history') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  openSafetyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  theme,
  toggleTheme,
  isMuted,
  toggleMute,
  openSafetyModal
}) => {
  const t = TRANSLATIONS[lang];

  interface NavItem {
    id: 'lab' | 'periodic' | 'ai' | 'quiz' | 'history';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'lab', label: t.tabLab, icon: FlaskConical },
    { id: 'periodic', label: t.tabPeriodic, icon: Atom },
    { id: 'ai', label: t.tabAi, icon: Bot, badge: 'AI' },
    { id: 'quiz', label: t.tabQuiz, icon: HelpCircle },
    { id: 'history', label: t.tabHistory, icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 border-indigo-500/20 bg-slate-950/85 text-slate-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo / Branding */}
          <div 
            onClick={() => setActiveTab('lab')}
            className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                  AI KIMYO
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hidden xs:inline-block">
                  3D Lab
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden md:block">
                Virtual Laboratoriya & Aqlli Kimyogar
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/30 to-fuchsia-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-fuchsia-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Safety Guidelines Button */}
            <button
              onClick={openSafetyModal}
              title={t.safetyModalBtn}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t.safetyModalBtn}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? t.soundOff : t.soundOn}
              className={`p-2 rounded-xl border transition-colors ${
                isMuted
                  ? 'border-slate-800 bg-slate-900 text-slate-500 hover:text-slate-400'
                  : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-medium">
              {(['uz', 'en', 'ru'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-lg uppercase tracking-wide transition-all ${
                    lang === l
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Theme Toggle (Dark/Light) */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? t.themeLight : t.themeDark}
              className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1.5 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-fuchsia-500/30 text-cyan-300 border border-cyan-500/40 shadow-xs'
                    : 'text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[8px] font-bold px-1 rounded bg-fuchsia-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
