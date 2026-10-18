import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini API client
const rawApiKey = process.env.GEMINI_API_KEY;
const isValidKey = !!rawApiKey && rawApiKey !== 'MY_GEMINI_API_KEY' && rawApiKey.trim().length > 10;
let ai: GoogleGenAI | null = null;

if (isValidKey) {
  ai = new GoogleGenAI({
    apiKey: rawApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper to prevent hanging on network delays
async function withTimeout<T>(promise: Promise<T>, timeoutMs = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('AI javob berish vaqti tugadi (timeout)')), timeoutMs)
    ),
  ]);
}

const SYSTEM_PROMPT = `
Siz "Al-Beruniy" nomli professional kimyogar, ilmiy tadqiqotchi va oliy toifali kimyo o‘qituvchisisiz.
Siz foydalanuvchilar bilan samimiy, ilmiy jihatdan qat’iy, aniq va tushunarli tilda muloqot qilasiz.

QOIDALAR:
1. Til: Foydalanuvchi qaysi tilda murojaat qilsa (o‘zbek, ingliz yoki rus), o‘sha tilda javob bering. Asosiy til - o‘zbek tili.
2. Kimyoviy formulalar: Formulalarni pastki indekslar bilan chiroyli va to‘g‘ri yozing (masalan, H₂SO₄, Fe₂O₃, Ca(OH)₂, Al³⁺).
3. Reaksiya tenglamalari: Barcha reaksiya tenglamalari to‘liq muvozanatlangan (tenglashtirilgan) bo‘lishi shart! Agar reaksiya bormasa yoki sharoit yetarli bo‘lmasa, to‘qib chiqarmang va nima uchun bormasligini tushuntiring.
4. Masala yechish: Kimyoviy masalalarni aniq bosqichlarda ko‘rsating:
   - 1-bosqich: Berilganlar va topilishi kerak bo‘lgan kattaliklar
   - 2-bosqich: Reaksiya tenglamasi va molyar massalar hisobi
   - 3-bosqich: Proporsiya yoki formulalar yordamida yechish
   - 4-bosqich: Aniq javob
5. Xavfsizlik: Har qanday xavfli reaksiya haqida so‘ralganda, uni uy sharoitida qilish qat’iyan man etilishini eslating va laboratoriya xavfsizlik qoidalarini bildiring.
6. Javoblaringiz tushunarli, zamonaviy, ilmiy jihatdan 100% asoslangan bo‘lsin.
`;

// 1. General Chemistry Q&A Endpoint
app.post('/api/ai/ask', async (req, res) => {
  try {
    const { prompt, lang = 'uz' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (ai) {
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT + `\nHozirgi til: ${lang}. Foydalanuvchiga to‘liq, qiziqarli va professional javob bering.`,
          temperature: 0.7,
        },
      }));

      return res.json({ text: response.text || '' });
    } else {
      // Offline fallback response generator
      return res.json({
        text: getOfflineAnswer(prompt, lang, 'ask'),
      });
    }
  } catch (err: unknown) {
    console.error('Error in /api/ai/ask:', err);
    const lang = req.body?.lang || 'uz';
    const errorMsg = err instanceof Error ? err.message : 'Server error';
    return res.json({
      text: getOfflineAnswer(req.body?.prompt || '', lang, 'ask'),
    });
  }
});

// 2. Step-by-Step Chemistry Problem Solver
app.post('/api/ai/solve', async (req, res) => {
  try {
    const { problem, lang = 'uz' } = req.body;
    if (!problem) {
      return res.status(400).json({ error: 'Problem statement is required' });
    }

    const taskPrompt = `Quyidagi kimyo masalasini batafsil va bosqichma-bosqich yechib ber:\n\n"${problem}"\n\nIltimos, berilganlarni, formulalarni, molyar massalarni va yakuniy javobni aniq ajratib ko‘rsat.`;

    if (ai) {
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: taskPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT + `\nTil: ${lang}. Masalani akademik usulda bosqichma-bosqich yeching.`,
          temperature: 0.4,
        },
      }));

      return res.json({ text: response.text || '' });
    } else {
      return res.json({
        text: getOfflineAnswer(problem, lang, 'solve'),
      });
    }
  } catch (err: unknown) {
    console.error('Error in /api/ai/solve:', err);
    const lang = req.body?.lang || 'uz';
    return res.json({
      text: getOfflineAnswer(req.body?.problem || '', lang, 'solve'),
    });
  }
});

// 3. Equation Balancer & Oxidation State Explainer
app.post('/api/ai/balance', async (req, res) => {
  try {
    const { equation, lang = 'uz' } = req.body;
    if (!equation) {
      return res.status(400).json({ error: 'Equation is required' });
    }

    const balancePrompt = `Quyidagi kimyoviy tenglamani tenglashtirib, koeffitsiyentlarni qo‘yib ber va qanday tenglashtirilganini (oksidlanish darajalari yoki atomlar balansi orqali) tushuntir:\n\n"${equation}"`;

    if (ai) {
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: balancePrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT + `\nTil: ${lang}. Tenglamani muvozanatlashtirish bo‘yicha ekspert.`,
          temperature: 0.3,
        },
      }));

      return res.json({ text: response.text || '' });
    } else {
      return res.json({
        text: getOfflineAnswer(equation, lang, 'balance'),
      });
    }
  } catch (err: unknown) {
    console.error('Error in /api/ai/balance:', err);
    const lang = req.body?.lang || 'uz';
    return res.json({
      text: getOfflineAnswer(req.body?.equation || '', lang, 'balance'),
    });
  }
});

// 4. Lab Reaction Deep Explainer
app.post('/api/ai/explain-reaction', async (req, res) => {
  try {
    const { reactants, equation, products, lang = 'uz' } = req.body;

    const explainPrompt = `Virtual laboratoriyada quyidagi reaksiya o‘tkazildi:
Reagentlar: ${reactants?.join(', ') || 'Noma’lum'}
Tenglama: ${equation || 'Noma’lum'}
Mahsulotlar: ${products || 'Noma’lum'}

Iltimos, ushbu reaksiyani tushuntirib bering:
1. Reaksiya nima uchun sodir bo‘ldi (ionlar harakati, energetika)?
2. Ko‘rinadigan belgilar (rang, cho‘kma, gaz, issiqlik)?
3. Ushbu reaksiyaning hayotdagi va sanoatdagi amaliy ahamiyati?
4. Laboratoriya xavfsizligi bo‘yicha maslahatlar.`;

    if (ai) {
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: explainPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT + `\nTil: ${lang}. Laboratoriya tajribalarini hayotiy va qiziqarli tushuntiruvchi olim.`,
          temperature: 0.6,
        },
      }));

      return res.json({ text: response.text || '' });
    } else {
      return res.json({
        text: getOfflineAnswer(equation || reactants?.join(' + ') || '', lang, 'reaction'),
      });
    }
  } catch (err: unknown) {
    console.error('Error in /api/ai/explain-reaction:', err);
    const lang = req.body?.lang || 'uz';
    return res.json({
      text: getOfflineAnswer(req.body?.equation || '', lang, 'reaction'),
    });
  }
});

// 5. Homework Checker / Error Diagnostic
app.post('/api/ai/check', async (req, res) => {
  try {
    const { answerText, lang = 'uz' } = req.body;
    if (!answerText) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const checkPrompt = `Foydalanuvchi kimyoviy fikr yoki yechim yozdi:
"${answerText}"

Iltimos, tekshiring:
- Unda qanday kimyoviy xatolar yoki noto‘g‘ri tushunchalar bor?
- To‘g‘ri yechim yoki tushuntirish qanday bo‘lishi kerak?
- Maslahat va xulosa bering.`;

    if (ai) {
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: checkPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT + `\nTil: ${lang}. Mehribon va talabchan o‘qituvchi sifatida xatolarni tuzating.`,
          temperature: 0.5,
        },
      }));

      return res.json({ text: response.text || '' });
    } else {
      return res.json({
        text: getOfflineAnswer(answerText, lang, 'check'),
      });
    }
  } catch (err: unknown) {
    console.error('Error in /api/ai/check:', err);
    const lang = req.body?.lang || 'uz';
    return res.json({
      text: getOfflineAnswer(req.body?.answerText || '', lang, 'check'),
    });
  }
});

// Helper for offline chemistry intelligence
function getOfflineAnswer(query: string, lang: string, type: 'ask' | 'solve' | 'balance' | 'reaction' | 'check'): string {
  const q = query.toLowerCase();

  if (lang === 'ru') {
    if (type === 'balance') {
      return `### Уравнивание реакции\n\n**Запрос:** \`${query}\`\n\n1. **Анализ:** Для уравнивания подсчитаем число атомов каждого элемента слева и справа.\n2. **Закон сохранения массы:** Число атомов до реакции всегда равно числу атомов после реакции.\n3. **Рекомендация:** Начните уравнивание с металлов, затем уравняйте кислотные остатки и неметаллы, затем водород, и в последнюю очередь проверьте кислород.`;
    }
    return `### Ответ химика Al-Beruniy\n\n**Ваш вопрос:** ${query}\n\nХимия — это наука о превращениях веществ и их свойствах. В виртуальной лаборатории вы можете смешивать кислоты, щелочи, металлы и соли для наблюдения эффектов (выпадение осадков, выделение газов, изменение окраски индикаторов).\n\n*Совет по безопасности:* Всегда надевайте защитные очки и перчатки при работе с реальными реактивами!`;
  }

  if (lang === 'en') {
    if (type === 'balance') {
      return `### Chemical Equation Balancer\n\n**Input:** \`${query}\`\n\n1. **Atoms Count:** Count the number of each type of atom in the reactants and products.\n2. **Conservation of Mass:** Matter cannot be created or destroyed, only rearranged.\n3. **Strategy:** Balance metals first, followed by polyatomic ions/nonmetals, hydrogen, and finally oxygen.`;
    }
    return `### Al-Biruni AI Chemist Response\n\n**Question:** ${query}\n\nChemistry explores matter, its properties, how and why substances combine or separate to form other substances, and how substances interact with energy.\n\n*Lab Safety:* Always observe chemical safety guidelines. Virtual experiments let you discover reactions without real-world hazards!`;
  }

  // Default Uzbek
  if (type === 'balance') {
    return `### ⚖️ Reaksiya Tenglamasini Balanslash

**Berilgan tenglama:** \`${query}\`

**Tenglashtirish qoidalari:**
1. **Moddalar saqlanish qonuni:** Reaksiyaga kirishgan moddalar massasi hosil bo‘lgan moddalar massasiga teng. Reaksiyadan oldingi va keyingi har bir element atomlari soni teng bo‘lishi shart!
2. **Bosqichma-bosqich ketma-ketlik:**
   - Birinchi navbatda metall atomlarini tenglashtiring.
   - Keyin nometallar va murakkab kislota qoldiqlarini tenglashtiring.
   - Vodorod (H) atomlari sonini muvozanatlang.
   - Oxirida kislorod (O) atomlari orqali tenglikni tekshiring!

*Masalan:*
- \`4Fe + 3O₂ → 2Fe₂O₃\` (Temirning oksidlanishi)
- \`Zn + 2HCl → ZnCl₂ + H₂↑\` (Vodorod ajralishi)
- \`2H₂ + O₂ → 2H₂O\` (Suv hosil bo‘lishi)`;
  }

  if (type === 'solve') {
    return `### 📐 Masala Yechimi (Bosqichma-bosqich)

**Masala:** ${query}

**Yechish algoritmi:**
1. **Berilgan:** Moddalarning berilgan massasi ($m$), hajmi ($V$) yoki modda miqdori ($n$).
2. **Reaksiya tenglamasi:** To‘g‘ri tenglama tuzilib, stexiometrik koeffitsiyentlar qo‘yiladi.
3. **Molyar massalar hisobi ($M$):**
   - Masalan: $M(\\text{NaOH}) = 23 + 16 + 1 = 40\\text{ g/mol}$
   - $M(\\text{HCl}) = 1 + 35.5 = 36.5\\text{ g/mol}$
4. **Proporsiya tuzish:**
   $$n = \\frac{m}{M} = \\frac{V}{V_m}$$
   ($V_m = 22.4\\text{ l/mol}$ n.sh. da).
5. **Natija:** Topilgan miqdor orqali yakuniy mahsulot massasi yoki hajmi aniqlanadi.`;
  }

  if (type === 'reaction') {
    return `### 🔬 Reaksiya Tahlili va Ilmiy Tushuntirish

**Tajriba:** ${query}

1. **Reaksiya mexanizmi:** Reagentlar aralashtirilganda ionlar yoki molekulalar o‘zaro to‘qnashib, yangi kimyoviy bog‘lar hosil qiladi.
2. **Kuzatiladigan tashqi belgilar:**
   - Rang o‘zgarishi (indikatorlar yoki kompleks ionlar tufayli)
   - Cho‘kma hosil bo‘lishi (eruvchanligi past tuzlar)
   - Gaz ajralishi (ko‘pirish, pufakchalar)
   - Termik effekt (issiqlik ajralishi yoki yutilishi)
3. **Xavfsizlik:** Virtual laboratoriyada xavfsiz o‘rganing. Haqiqiy laboratoriyada har doim xalat, qo‘lqop va himoya ko‘zoynagini taqing!`;
  }

  return `### 🧪 Al-Beruniy Kimyogar Maslahati

**Savol:** ${query}

Kimyo fanining go‘zalligi uning tajribalarga tayanishidadir!
- Har qanday modda atom va molekulalardan tashkil topgan.
- Reaksiyalarda atomlar yo‘qolmaydi va yangidan paydo bo‘lmaydi, faqat ularning o‘zaro bog‘lanish tartibi o‘zgaradi.
- Laboratoriya bo‘limiga o‘tib, kislotalar, ishqorlar va metallarni o‘zaro aralashtirib, reaksiyalarni real vaqt rejimida kuzatishingiz mumkin.

Savolingiz bo‘yicha aniqroq ma’lumot olish uchun formulalarni aniq kiriting yoki masala shartini batafsil yozing!`;
}

// Development vs Production serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AI Kimyo Laboratoriyasi server running on port ${PORT}`);
  });
}

startServer();
