import React from 'react';
import { ReactionLog, Language } from '../../types/chemistry';
import { TRANSLATIONS } from '../../data/translations';
import { 
  BookOpen, 
  Trash2, 
  Download, 
  RotateCcw, 
  Bot, 
  Sparkles, 
  Flame, 
  Layers,
  Clock
} from 'lucide-react';

interface HistoryViewProps {
  logs: ReactionLog[];
  onClearHistory: () => void;
  onReplayReaction: (log: ReactionLog) => void;
  onAskAi: (prompt: string) => void;
  lang: Language;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  logs,
  onClearHistory,
  onReplayReaction,
  onAskAi,
  lang
}) => {
  const t = TRANSLATIONS[lang];

  const handleExport = () => {
    const reportData = {
      title: 'AI Kimyo Laboratoriyasi - Tajribalar Hisoboti',
      exportedAt: new Date().toISOString(),
      reactionsCount: logs.length,
      logs: logs
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kimyo-tajriba-hisoboti-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-5">
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              {t.historyTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.historySubtitle}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        {logs.length > 0 && (
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.exportReport}</span>
            </button>

            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-all shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t.clearHistory}</span>
            </button>
          </div>
        )}
      </div>

      {/* Logs List */}
      {logs.length === 0 ? (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-3 text-slate-400 shadow-xl">
          <BookOpen className="w-10 h-10 text-slate-600 animate-pulse" />
          <h3 className="text-base font-bold text-slate-300">{t.noHistoryYet}</h3>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl flex flex-col gap-3 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-cyan-300 tracking-wide">
                    {log.equation}
                  </span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {log.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
              </div>

              {/* Reactants and Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    {t.reactants}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {log.reactantsUsed.map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-300">
                        {r.formula} ({r.amount}{r.unit})
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">
                    Tavsif va xulosa:
                  </span>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    {log.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => onAskAi(`Virtual laboratoriyada o‘tkazilgan ushbu reaksiyani batafsil ilmiy tahlil qilib bering:\n${log.equation}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 text-xs font-semibold transition-all"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI dan tahlil so‘rash</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
