import { QuizQuestion } from '../types/chemistry';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'basics',
    questionUz: 'Suv molekulasidagi (H₂O) vodorod va kislorod atomlari qanday kimyoviy bog‘ bilan bog‘langan?',
    questionEn: 'What type of chemical bond links hydrogen and oxygen in a water molecule?',
    questionRu: 'Какая химическая связь соединяет атомы водорода и кислорода в молекуле воды?',
    optionsUz: ['Qutbli kovalent bog‘', 'Ion bog‘', 'Metall bog‘', 'Vodorod bog‘ (molekula ichida)'],
    optionsEn: ['Polar covalent bond', 'Ionic bond', 'Metallic bond', 'Hydrogen bond (intramolecular)'],
    optionsRu: ['Ковалентная полярная связь', 'Ионная связь', 'Металлическая связь', 'Водородная связь (внутримолекулярная)'],
    correctIndex: 0,
    explanationUz: 'Suv molekulasi ichida vodorod va kislorod o‘rtasida umumiy elektron juftlari kislorod tomon siljigan qutbli kovalent bog‘ mavjud.',
    explanationEn: 'Within a single H₂O molecule, hydrogen and oxygen atoms share electrons unequally forming polar covalent bonds.',
    explanationRu: 'Внутри молекулы воды атомы H и O связаны ковалентной полярной связью за счет разности электроотрицательностей.'
  },
  {
    id: 'q2',
    category: 'reactions',
    questionUz: 'Mis kuporosi (CuSO₄) eritmasiga toza temir mix solinganda nima sodir bo‘ladi?',
    questionEn: 'What happens when a clean iron nail is placed into copper(II) sulfate solution?',
    questionRu: 'Что происходит при погружении чистого железного гвоздя в раствор медного купороса?',
    optionsUz: [
      'Temir yuzasida qizg‘ish mis qatlami o‘tiradi va eritma och yashil rangga kiradi',
      'Hech qanday o‘zgarish bo‘lmaydi',
      'Oq cho‘kma tushadi va eritma binafsharang bo‘ladi',
      'Kuchli portlash bilan vodorod gazi ajraladi'
    ],
    optionsEn: [
      'Reddish copper plates onto the iron and the solution turns pale green',
      'No reaction occurs',
      'A white precipitate falls out and solution turns violet',
      'A loud explosion occurs with hydrogen gas'
    ],
    optionsRu: [
      'На железе осаждается красная медь, а раствор становится светло-зеленым',
      'Реакция не происходит',
      'Выпадает белый осадок, раствор фиолетовый',
      'Происходит взрыв с выделением водорода'
    ],
    correctIndex: 0,
    explanationUz: 'Fe + CuSO₄ → FeSO₄ + Cu. Temir misdan faolroq bo‘lgani sababli misni eritmadan siqib chiqaradi.',
    explanationEn: 'Iron is more electrochemically active than copper and displaces Cu²⁺ ions from solution.',
    explanationRu: 'Железо активнее меди и вытесняет ее из раствора сульфата меди.'
  },
  {
    id: 'q3',
    category: 'safety',
    questionUz: 'Konsentrlangan sulfat kislotani (H₂SO₄) suv bilan suyultirishda qaysi qoidaga qat’iy rioya qilish kerak?',
    questionEn: 'What is the strict rule when diluting concentrated sulfuric acid with water?',
    questionRu: 'Какое главное правило необходимо соблюдать при разбавлении концентрированной серной кислоты?',
    optionsUz: [
      'Kislota ingichka oqim bilan suvga quyiladi va tinimsiz aralashtiriladi',
      'Suv birdaniga kislotaga quyiladi',
      'Farqi yo‘q, ikkalasini birdan aralashtirsa bo‘ladi',
      'Faqat qaynoq suv ishlatish kerak'
    ],
    optionsEn: [
      'Always add acid slowly to water while continuously stirring',
      'Pour water quickly into the acid',
      'It does not matter which is poured first',
      'Always use boiling water'
    ],
    optionsRu: [
      'Кислоту тонкой струйкой приливают к воде при постоянном перемешивании',
      'Воду быстро заливают в кислоту',
      'Порядок смешивания не имеет значения',
      'Необходимо использовать кипяток'
    ],
    correctIndex: 0,
    explanationUz: 'Oltin qoida: "Kislotani suvga quying!". Agar suv kislotaga quyilsa, zichlik farqi tufayli suv sirtda qaynab, qaynoq kislotani yuzga sachratishi mumkin.',
    explanationEn: 'Remember: Always Add Acid to water (AAA). Adding water to dense acid causes localized boiling and dangerous splashing.',
    explanationRu: 'Правило безопасности: лейте кислоту в воду! Иначе вода закипит на поверхности и разбрызгает кислоту.'
  },
  {
    id: 'q4',
    category: 'calculations',
    questionUz: 'Osh tuzi (NaCl) ning molyar massasi qanchaga teng? (Ar(Na)=23, Ar(Cl)=35.5)',
    questionEn: 'What is the molar mass of sodium chloride (NaCl)? (Ar(Na)=23, Ar(Cl)=35.5)',
    questionRu: 'Чему равна молярная масса поваренной соли (NaCl)? (Ar(Na)=23, Ar(Cl)=35.5)',
    optionsUz: ['58.5 g/mol', '46.0 g/mol', '71.0 g/mol', '35.5 g/mol'],
    optionsEn: ['58.5 g/mol', '46.0 g/mol', '71.0 g/mol', '35.5 g/mol'],
    optionsRu: ['58.5 г/моль', '46.0 г/моль', '71.0 г/моль', '35.5 г/моль'],
    correctIndex: 0,
    explanationUz: 'M(NaCl) = 23 + 35.5 = 58.5 g/mol.',
    explanationEn: 'M(NaCl) = 23 + 35.5 = 58.5 g/mol.',
    explanationRu: 'M(NaCl) = 23 + 35.5 = 58.5 г/моль.'
  },
  {
    id: 'q5',
    category: 'reactions',
    questionUz: 'Qaysi reaktiv yordamida sulfat ionlarini (SO₄²⁻) oq cho‘kma orqali aniqlash mumkin?',
    questionEn: 'Which reagent is used to identify sulfate ions (SO₄²⁻) by producing a white precipitate?',
    questionRu: 'С помощью какого реактива определяют сульфат-ионы (SO₄²⁻) по белому осадку?',
    optionsUz: ['Bariy xlorid (BaCl₂)', 'Kaliy gidroksid (KOH)', 'Natriy nitrat (NaNO₃)', 'Mis (Cu)'],
    optionsEn: ['Barium chloride (BaCl₂)', 'Potassium hydroxide (KOH)', 'Sodium nitrate (NaNO₃)', 'Copper (Cu)'],
    optionsRu: ['Хлорид бария (BaCl₂)', 'Гидроксид калия (KOH)', 'Нитрат натрия (NaNO₃)', 'Медь (Cu)'],
    correctIndex: 0,
    explanationUz: 'Ba²⁺ + SO₄²⁻ → BaSO₄↓. Bariy sulfat kislotalarda ham erimaydigan zich oq cho‘kma beradi.',
    explanationEn: 'Ba²⁺ combines with SO₄²⁻ forming insoluble white BaSO₄.',
    explanationRu: 'Катион бария связывается с сульфат-анионом в нерастворимый белый BaSO₄.'
  },
  {
    id: 'q6',
    category: 'basics',
    questionUz: 'Fenolftalein indikatori ishqoriy eritmada qanday rangga kiradi?',
    questionEn: 'What color does phenolphthalein turn in an alkaline solution?',
    questionRu: 'Какой цвет приобретает фенолфталеин в щелочном растворе?',
    optionsUz: ['Malina (to‘q pushti)', 'Sariq', 'Moviy', 'Rangsiz qoladi'],
    optionsEn: ['Crimson/Magenta pink', 'Yellow', 'Blue', 'Remains colorless'],
    optionsRu: ['Малиновый', 'Желтый', 'Синий', 'Остается бесцветным'],
    correctIndex: 0,
    explanationUz: 'Fenolftalein kislota va neytral muhitda rangsiz, pH > 8.2 bo‘lganda esa to‘q malina rangiga aylanadi.',
    explanationEn: 'Phenolphthalein turns vivid magenta/pink at pH > 8.2.',
    explanationRu: 'В щелочной среде (pH > 8.2) фенолфталеин становится ярко-малиновым.'
  },
  {
    id: 'q7',
    category: 'calculations',
    questionUz: 'Normal sharoitda (n.sh.) 1 mol ixtiyoriy gaz qancha hajm egallaydi?',
    questionEn: 'What volume does 1 mole of any ideal gas occupy at standard temperature and pressure (STP)?',
    questionRu: 'Какой объем занимает 1 моль любого газа при нормальных условиях (н.у.)?',
    optionsUz: ['22.4 litr', '11.2 litr', '44.8 litr', '1.0 litr'],
    optionsEn: ['22.4 liters', '11.2 liters', '44.8 liters', '1.0 liter'],
    optionsRu: ['22.4 литра', '11.2 литра', '44.8 литра', '1.0 литр'],
    correctIndex: 0,
    explanationUz: 'Avogadro qonuniga ko‘ra, n.sh. (0°C va 101.3 kPa) da 1 mol har qanday gaz 22.4 litr hajmni egallaydi.',
    explanationEn: 'According to Avogadro’s law, 1 mol of any gas at STP occupies 22.4 L.',
    explanationRu: 'По закону Авогадро молярный объем любого газа при н.у. равен 22.4 л.'
  },
  {
    id: 'q8',
    category: 'reactions',
    questionUz: '"Oltin yomg‘iri" deb ataluvchi chiroyli tajribada qaysi moddaning oltinsimon kristallari cho‘kadi?',
    questionEn: 'In the mesmerizing "Golden Rain" experiment, which substance forms sparkling golden crystals?',
    questionRu: 'В знаменитом опыте "Золотой дождь" выпадают золотистые кристаллы какого вещества?',
    optionsUz: ['Qo‘rg‘oshin (II) yodid (PbI₂)', 'Oltin xlorid (AuCl₃)', 'Mis sulfid (CuS)', 'Temir gidroksid (Fe(OH)₃)'],
    optionsEn: ['Lead(II) iodide (PbI₂)', 'Gold chloride (AuCl₃)', 'Copper sulfide (CuS)', 'Iron hydroxide (Fe(OH)₃)'],
    optionsRu: ['Иодид свинца(II) (PbI₂)', 'Хлорид золота (AuCl₃)', 'Сульфид меди (CuS)', 'Гидроксид железа (Fe(OH)₃)'],
    correctIndex: 0,
    explanationUz: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃. PbI₂ tilla zarralari kabi jilolanuvchi go‘zal sariq cho‘kma beradi.',
    explanationEn: 'Lead(II) iodide forms shimmering, hexagonal golden flakes that resemble falling gold.',
    explanationRu: 'Иодид свинца кристаллизуется в виде мерцающих золотистых чешуек.'
  }
];
