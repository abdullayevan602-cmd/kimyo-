import React, { useState, useEffect, useRef } from 'react';
import { Language, ChatMessage } from '../../types/chemistry';
import { TRANSLATIONS } from '../../data/translations';
import { speechSynthesizer } from '../../utils/audio';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  Square, 
  RotateCcw,
  Scale,
  Calculator,
  CheckCircle2,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

interface AIAssistantViewProps {
  lang: Language;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

type AIMode = 'general' | 'solve' | 'balance' | 'check';

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  lang,
  initialPrompt,
  onClearInitialPrompt
}) => {
  const t = TRANSLATIONS[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AIMode>('general');
  const [loading, setLoading] = useState(false);
  const [speechState, setSpeechState] = useState({ isSpeaking: false, isPaused: false });
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    const welcomeText = lang === 'ru' 
      ? `Здравствуйте! Я Аль-Бируни, ваш персональный ИИ-химик и научный наставник. Вы можете задавать любые вопросы по химии, присылать задачи для пошагового решения или уравнения для уравнивания.`
      : lang === 'en'
      ? `Greetings! I am Al-Biruni, your personal AI Chemist and scientific mentor. Feel free to ask chemistry questions, request step-by-step stoichiometric problem solutions, or balance chemical equations.`
      : `Assalomu alaykum! Men Al-Beruniy — sizning aqlli kimyogar yordamchingizman. Kimyoga oid istalgan savolingizni berishingiz, masalalarni bosqichma-bosqich yechishni so‘rashingiz, reaksiya tenglamalarini tenglashtirishingiz yoki xatolaringizni tekshirtirishingiz mumkin.`;

    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: welcomeText,
        timestamp: Date.now()
      }
    ]);
  }, [lang]);

  // Hook into speech synthesizer state
  useEffect(() => {
    speechSynthesizer.setStateListener((speaking, paused) => {
      setSpeechState({ isSpeaking: speaking, isPaused: paused });
      if (!speaking) {
        setSpeakingMsgId(null);
      }
    });

    return () => {
      speechSynthesizer.stop();
    };
  }, []);

  // Handle incoming initial prompt from Virtual Lab
  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
      onClearInitialPrompt?.();
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const userText = textToSend || input;
    if (!userText.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);
    setSpeechError(null);

    // Pick appropriate API endpoint based on mode
    let endpoint = '/api/ai/ask';
    let payload: Record<string, unknown> = { prompt: userText, lang };

    if (mode === 'solve') {
      endpoint = '/api/ai/solve';
      payload = { problem: userText, lang };
    } else if (mode === 'balance') {
      endpoint = '/api/ai/balance';
      payload = { equation: userText, lang };
    } else if (mode === 'check') {
      endpoint = '/api/ai/check';
      payload = { answerText: userText, lang };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      const replyContent = data.text || 'Kechirasiz, javob olishda uzilish yuz berdi.';

      const assistantMessage: ChatMessage = {
        id: `msg-resp-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          role: 'assistant',
          content: 'Server bilan aloqa uzildi. Iltimos, qaytadan urinib ko‘ring.',
          timestamp: Date.now()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = (message: ChatMessage) => {
    if (speakingMsgId === message.id && speechState.isSpeaking) {
      if (speechState.isPaused) {
        speechSynthesizer.resume();
      } else {
        speechSynthesizer.pause();
      }
      return;
    }

    setSpeakingMsgId(message.id);
    speechSynthesizer.speak(message.content, lang, (err) => {
      setSpeechError(t.aiVoiceNotSupported + ` (${err})`);
      setSpeakingMsgId(null);
    });
  };

  const handleStopSpeech = () => {
    speechSynthesizer.stop();
    setSpeakingMsgId(null);
  };

  const clearChat = () => {
    speechSynthesizer.stop();
    setSpeakingMsgId(null);
    setMessages([]);
  };

  const modeButtons = [
    { id: 'general' as const, label: t.aiModeGeneral, icon: MessageSquare },
    { id: 'solve' as const, label: t.aiModeSolve, icon: Calculator },
    { id: 'balance' as const, label: t.aiModeBalance, icon: Scale },
    { id: 'check' as const, label: t.aiModeCheck, icon: CheckCircle2 }
  ];

  const presets = [
    t.presetProblem1,
    t.presetProblem2,
    t.presetProblem3,
    t.presetProblem4
  ];

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-4 h-[calc(100vh-5rem)]">
      
      {/* Top Banner & Mode Tabs */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>{t.aiAssistantTitle}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Gemini AI
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {t.aiAssistantDesc}
              </p>
            </div>
          </div>

          {/* Clear history button */}
          <button
            onClick={clearChat}
            className="self-end sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-rose-400 bg-slate-950/80 border border-slate-800 hover:border-rose-500/30 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tozalash</span>
          </button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-800/80">
          {modeButtons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                mode === id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/30 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${mode === id ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Speech Error Banner */}
      {speechError && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3 flex items-center justify-between text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{speechError}</span>
          </div>
          <button onClick={() => setSpeechError(null)} className="text-rose-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isCurrentSpeaking = speakingMsgId === msg.id && speechState.isSpeaking;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div
                className={`relative group max-w-[90%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 shadow-xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-br-xs'
                    : 'bg-slate-950/90 text-slate-200 border border-slate-800/90 rounded-bl-xs'
                }`}
              >
                {/* Header for assistant messages with TTS Controls */}
                {!isUser && (
                  <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <span className="text-[11px] font-bold text-cyan-300">Al-Beruniy Kimyogar</span>
                    </div>

                    {/* Voice Controls: Play / Pause / Stop */}
                    <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                      <button
                        onClick={() => handleSpeech(msg)}
                        className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                        title={isCurrentSpeaking ? (speechState.isPaused ? t.aiResumeSpeech : t.aiPauseSpeech) : t.aiSpeakAnswer}
                      >
                        {isCurrentSpeaking ? (
                          speechState.isPaused ? <Play className="w-3.5 h-3.5 text-cyan-400" /> : <Pause className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
                        )}
                      </button>

                      {isCurrentSpeaking && (
                        <button
                          onClick={handleStopSpeech}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          title={t.aiStopSpeech}
                        >
                          <Square className="w-3 h-3 text-rose-400" />
                        </button>
                      )}

                      {/* Speaking Audio Wave Animation */}
                      {isCurrentSpeaking && !speechState.isPaused && (
                        <div className="flex items-center gap-0.5 h-3 ml-1">
                          <span className="w-0.5 h-full bg-cyan-400 animate-bounce" />
                          <span className="w-0.5 h-2/3 bg-cyan-400 animate-bounce delay-75" />
                          <span className="w-0.5 h-4/5 bg-cyan-400 animate-bounce delay-150" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Message Body with whitespace preservation */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.content}
                </div>

                <div className="text-[10px] opacity-40 text-right mt-1 font-mono">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 p-3 rounded-2xl w-fit text-xs text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>{t.aiThinking}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Problem Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold whitespace-nowrap pl-1">
          Namuna:
        </span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(preset)}
            className="px-3 py-1 rounded-xl text-[11px] bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 whitespace-nowrap transition-all shadow-xs"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-2 shadow-2xl flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.aiInputPlaceholder}
          disabled={loading}
          className="flex-1 bg-transparent px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
