import React, { useState } from 'react';
import { Language, QuizQuestion } from '../../types/chemistry';
import { QUIZ_QUESTIONS } from '../../data/quizzes';
import { TRANSLATIONS } from '../../data/translations';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  Flame,
  Medal,
  Award
} from 'lucide-react';

interface QuizViewProps {
  lang: Language;
}

export const QuizView: React.FC<QuizViewProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      soundFx.playSuccessChime();
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
  };

  const getRankBadge = (totalScore: number) => {
    if (totalScore >= 70) return { title: 'Oliy Kimyogar & Mendeleyev Davomchisi', icon: Trophy, color: 'text-amber-400' };
    if (totalScore >= 40) return { title: 'Reaksiya Ustasi', icon: Medal, color: 'text-cyan-400' };
    return { title: 'Boshlang‘ich Laborant', icon: Award, color: 'text-indigo-400' };
  };

  const rank = getRankBadge(score);
  const RankIcon = rank.icon;

  return (
    <div className="max-w-3xl mx-auto p-3 sm:p-6 flex flex-col gap-5">
      
      {/* Top Banner */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
              {t.quizTitle}
            </h2>
            <p className="text-xs text-slate-400">
              {t.quizSubtitle}
            </p>
          </div>
        </div>

        {/* Score & Streak Badges */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{score} {t.score}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-rose-400">
            <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>{streak} {t.streak}</span>
          </div>
        </div>
      </div>

      {/* Main Quiz Body */}
      {!isFinished ? (
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5 animate-in fade-in duration-200">
          
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>
              {t.question} {currentIndex + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <span className="capitalize px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]">
              {currentQ.category}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-xl font-bold text-slate-100 leading-snug">
            {lang === 'uz' ? currentQ.questionUz : lang === 'ru' ? currentQ.questionRu : currentQ.questionEn}
          </h3>

          {/* Options Grid */}
          <div className="flex flex-col gap-2.5">
            {currentQ.optionsUz.map((_, idx) => {
              const optionText = lang === 'uz' ? currentQ.optionsUz[idx] : lang === 'ru' ? currentQ.optionsRu[idx] : currentQ.optionsEn[idx];
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800/60 hover:border-cyan-500/40';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 shadow-lg shadow-emerald-500/10';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{optionText}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Scientific Explanation Card after answering */}
          {isAnswered && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-500/30 flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.viewExplanation}:</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'uz' ? currentQ.explanationUz : lang === 'ru' ? currentQ.explanationRu : currentQ.explanationEn}
              </p>

              <button
                onClick={handleNext}
                className="self-end mt-2 flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs transition-all shadow-md"
              >
                <span>{t.nextQuestion}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Finished State */
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center gap-5 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-orange-500 p-0.5 shadow-2xl shadow-yellow-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <RankIcon className={`w-10 h-10 ${rank.color}`} />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black text-white tracking-tight">{t.quizCompleted}</h3>
            <p className="text-sm text-slate-400 mt-1">{t.congratulations}</p>
          </div>

          {/* Result Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 w-full max-w-sm flex flex-col gap-2">
            <span className="text-xs text-slate-400 uppercase font-semibold">Yakuniy Natija</span>
            <div className="text-4xl font-black font-mono text-cyan-300">
              {score} <span className="text-lg font-normal text-slate-400">/ {QUIZ_QUESTIONS.length * 10}</span>
            </div>
            <div className={`text-xs font-bold ${rank.color} mt-1`}>
              Maqom: {rank.title}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.restartQuiz}</span>
          </button>
        </div>
      )}
    </div>
  );
};
