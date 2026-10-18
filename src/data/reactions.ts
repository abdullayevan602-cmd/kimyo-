import { ChemicalReaction } from '../types/chemistry';

export const REACTIONS: ChemicalReaction[] = [
  // 1. Fenolftalein + Ishqor (Indikator rangi o‘zgarishi)
  {
    id: 'naoh_phenolphthalein',
    reactants: ['naoh', 'phenolphthalein'],
    equation: 'NaOH + Fenolftalein → Yorqin malina rangi',
    balancedEquation: 'NaOH (ishqor) + C₂₀H₁₄O₄ → [C₂₀H₁₂O₄]²⁻ (malina-pushti)',
    type: 'indicator',
    thermalType: 'neutral',
    resultColorHex: '#db2777', // Vivid pink/magenta
    resultPh: 12.0,
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 0,
    soundEffect: 'ding',
    titleUz: 'Ishqoriy muhitda fenolftaleinning bo‘yalishi',
    titleEn: 'Phenolphthalein indicator in alkaline medium',
    titleRu: 'Окрашивание фенолфталеина в щелочной среде',
    descriptionUz: 'Fenolftalein neytral muhitda rangsiz bo‘lib, kuchli ishqoriy muhitda (pH > 8.2) go‘zal to‘q malina-pushti rangga kiradi.',
    descriptionEn: 'Phenolphthalein is colorless in neutral solutions, but turns vibrant magenta-pink in basic conditions.',
    descriptionRu: 'Фенолфталеин бесцветен в нейтральной среде, но в щелочи приобретает насыщенный малиновый цвет.',
    safetyNoticeUz: 'Ko‘zga sachratmang, ishqor terini qizartirishi mumkin.',
    safetyNoticeEn: 'Avoid eye contact, alkaline solutions can irritate skin.',
    safetyNoticeRu: 'Берегите глаза, щелочные растворы раздражают кожу.',
    products: [
      { formula: '[C₂₀H₁₂O₄]²⁻', nameUz: 'Bo‘yalgan fenolftalein ioni', nameEn: 'Deprotonated phenolphthalein ion', nameRu: 'Ион фенолфталеина', state: 'solution' }
    ]
  },

  // 2. Kislota + Ishqor + Fenolftalein (Neytrallanish va rangsizlanish)
  {
    id: 'hcl_naoh_phenolphthalein',
    reactants: ['hcl', 'naoh', 'phenolphthalein'],
    equation: 'HCl + NaOH + Fenolftalein → NaCl + H₂O (rangsizlanadi)',
    balancedEquation: 'HCl + NaOH → NaCl + H₂O',
    type: 'neutralization',
    thermalType: 'exothermic',
    deltaH: '-57.3 kJ/mol',
    resultColorHex: '#f1f5f9', // Turns clear again
    resultPh: 7.0,
    bubblesIntensity: 'none',
    smokeIntensity: 'light',
    tempChange: 15,
    soundEffect: 'sizzle',
    titleUz: 'Kislota va ishqorning neytrallanishi (Indikator bilan)',
    titleEn: 'Acid-base neutralization titration',
    titleRu: 'Нейтрализация кислоты и щелочи (Титрование)',
    descriptionUz: 'Xlorid kislota ishqorga quyilganda, vodorod (H⁺) va gidroksid (OH⁻) ionlari birlashib suv hosil qiladi. Malina rang birdan yo‘qolib, eritma tiniqlashadi!',
    descriptionEn: 'Hydrochloric acid neutralizes sodium hydroxide forming water and salt. The pink color disappears instantly at equivalence point!',
    descriptionRu: 'Кислота нейтрализует щелочь, образуя соль и воду. Малиновая окраска моментально исчезает.',
    safetyNoticeUz: 'Reaksiya kuchli issiqlik chiqaradi (ekzotermik).',
    safetyNoticeEn: 'Exothermic reaction releases notable heat.',
    safetyNoticeRu: 'Экзотермическая реакция с заметным выделением тепла.',
    products: [
      { formula: 'NaCl', nameUz: 'Natriy xlorid', nameEn: 'Sodium chloride', nameRu: 'Хлорид натрия', state: 'solution' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' }
    ]
  },

  // 3. Kislota va Ishqor (Oddiy neytrallanish)
  {
    id: 'hcl_naoh',
    reactants: ['hcl', 'naoh'],
    equation: 'HCl + NaOH → NaCl + H₂O',
    balancedEquation: 'HCl + NaOH → NaCl + H₂O',
    type: 'neutralization',
    thermalType: 'exothermic',
    deltaH: '-57.3 kJ/mol',
    resultColorHex: '#f8fafc',
    resultPh: 7.0,
    bubblesIntensity: 'none',
    smokeIntensity: 'light',
    tempChange: 18,
    soundEffect: 'sizzle',
    titleUz: 'Klassik neytrallanish reaksiyasi',
    titleEn: 'Classic acid-base neutralization',
    titleRu: 'Классическая реакция нейтрализации',
    descriptionUz: 'Kuchli kislota va kuchli ishqor o‘zaro reaksiyaga kirishib, neytral osh tuzi eritmasi va suv hosil qiladi.',
    descriptionEn: 'Strong acid reacts with strong base to yield neutral table salt water and thermal energy.',
    descriptionRu: 'Сильная кислота реагирует с щелочью с образованием хлорида натрия и воды.',
    safetyNoticeUz: 'Idish sezilarli isiydi. Reagentlarni ehtiyotkorlik bilan quying.',
    safetyNoticeEn: 'Flask warms noticeably. Pour reagents carefully.',
    safetyNoticeRu: 'Колба заметно нагревается.',
    products: [
      { formula: 'NaCl', nameUz: 'Natriy xlorid', nameEn: 'Sodium chloride', nameRu: 'Хлорид натрия', state: 'solution' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' }
    ]
  },

  // 4. Sulfat kislota va Ishqor
  {
    id: 'h2so4_naoh',
    reactants: ['h2so4', 'naoh'],
    equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    balancedEquation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    type: 'neutralization',
    thermalType: 'exothermic',
    deltaH: '-114 kJ/mol',
    resultColorHex: '#f8fafc',
    resultPh: 7.0,
    bubblesIntensity: 'none',
    smokeIntensity: 'medium',
    tempChange: 26,
    soundEffect: 'sizzle',
    titleUz: 'Sulfat kislotaning ishqor bilan neytrallanishi',
    titleEn: 'Sulfuric acid neutralization',
    titleRu: 'Нейтрализация серной кислоты щелочью',
    descriptionUz: 'Ikki asosli sulfat kislota ishqor bilan neytrallanib, natriy sulfat tuzi va suv beradi. Katta miqdorda issiqlik ajraladi.',
    descriptionEn: 'Diprotic sulfuric acid fully neutralizes with sodium hydroxide, liberating large amounts of heat.',
    descriptionRu: 'Двухосновная серная кислота нейтрализуется с сильным разогревом.',
    safetyNoticeUz: 'Yuqori issiqlik hosil bo‘ladi. Sachramasligi uchun ehtiyot bo‘ling.',
    safetyNoticeEn: 'High heat output. Prevent splashing.',
    safetyNoticeRu: 'Высокое тепловыделение.',
    products: [
      { formula: 'Na₂SO₄', nameUz: 'Natriy sulfat', nameEn: 'Sodium sulfate', nameRu: 'Сульфат натрия', state: 'solution' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' }
    ]
  },

  // 5. Iste’mol sodasi + Sirka kislotasi (Ko‘pirish effekti)
  {
    id: 'nahco3_ch3cooh',
    reactants: ['nahco3', 'ch3cooh'],
    equation: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑',
    balancedEquation: 'NaHCO₃ + CH₃COOH → CH₃COONa + H₂O + CO₂↑',
    type: 'gas_evolution',
    thermalType: 'endothermic',
    deltaH: '+28 kJ/mol',
    resultColorHex: '#f1f5f9',
    resultPh: 8.0,
    gasEvolved: 'CO₂',
    bubblesIntensity: 'violent',
    smokeIntensity: 'light',
    tempChange: -4,
    soundEffect: 'fizz',
    titleUz: 'Sodaning sirka bilan ko‘pirishi (Vulkan effekti)',
    titleEn: 'Baking soda and vinegar fizzing reaction',
    titleRu: 'Бурное шипение соды и уксуса',
    descriptionUz: 'Iste’mol sodasi sirka kislotasi bilan to‘qnashganda beqaror karbonat kislota hosil bo‘lib, shiddatli ko‘pirib karbonat angidrid (CO₂) gazini ajratadi. Eritma soviydi (endotermik).',
    descriptionEn: 'Baking soda reacts vigorously with vinegar generating dense carbon dioxide bubbles in an endothermic fizz.',
    descriptionRu: 'Пищевая сода реагирует с уксусной кислотой с бурным шипением и охлаждением раствора.',
    safetyNoticeUz: 'Ko‘pik toshib ketmasligi uchun idish hajmini hisobga oling.',
    safetyNoticeEn: 'Beware of sudden foaming over the beaker rim.',
    safetyNoticeRu: 'Пена может быстро перелиться через край.',
    products: [
      { formula: 'CH₃COONa', nameUz: 'Natriy atsetat', nameEn: 'Sodium acetate', nameRu: 'Ацетат натрия', state: 'solution' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' },
      { formula: 'CO₂', nameUz: 'Karbonat angidrid gazi', nameEn: 'Carbon dioxide gas', nameRu: 'Углекислый газ', state: 'gas' }
    ]
  },

  // 6. Soda + Xlorid kislota (CO2 gaz ajralishi)
  {
    id: 'na2co3_hcl',
    reactants: ['na2co3', 'hcl'],
    equation: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑',
    balancedEquation: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑',
    type: 'gas_evolution',
    thermalType: 'exothermic',
    resultColorHex: '#f8fafc',
    resultPh: 6.8,
    gasEvolved: 'CO₂',
    bubblesIntensity: 'violent',
    smokeIntensity: 'light',
    tempChange: 6,
    soundEffect: 'fizz',
    titleUz: 'Karbonatlarning kislota ta’sirida parchalanishi',
    titleEn: 'Carbonate acid decomposition',
    titleRu: 'Разложение карбоната соляной кислотой',
    descriptionUz: 'Karbonat tuziga kuchli kislota quyilganda shiddatli qaynash sodir bo‘ladi va ko‘p miqdorda CO₂ gazi havoga uchadi.',
    descriptionEn: 'Rapid effervescence as carbon dioxide gas rapidly escapes upon acidifying carbonate salt.',
    descriptionRu: 'Быстрое выделение углекислого газа с шипением.',
    safetyNoticeUz: 'Gaz idishdan sachratishi mumkin.',
    safetyNoticeEn: 'Gas effervescence can cause micro-splashes.',
    safetyNoticeRu: 'Возможны брызги при бурном выделении газа.',
    products: [
      { formula: 'NaCl', nameUz: 'Natriy xlorid', nameEn: 'Sodium chloride', nameRu: 'Хлорид натрия', state: 'solution' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' },
      { formula: 'CO₂', nameUz: 'Karbonat angidrid', nameEn: 'Carbon dioxide', nameRu: 'Углекислый газ', state: 'gas' }
    ]
  },

  // 7. Rux + Xlorid kislota (Vodorod gazi ajralishi)
  {
    id: 'zn_hcl',
    reactants: ['zn', 'hcl'],
    equation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    balancedEquation: 'Zn + 2HCl → ZnCl₂ + H₂↑',
    type: 'gas_evolution',
    thermalType: 'exothermic',
    resultColorHex: '#e2e8f0',
    resultPh: 3.5,
    gasEvolved: 'H₂',
    bubblesIntensity: 'violent',
    smokeIntensity: 'medium',
    tempChange: 22,
    soundEffect: 'bubble',
    titleUz: 'Laboratoriyada vodorod gazi olish (Kipp apparati analogi)',
    titleEn: 'Hydrogen gas generation from zinc and acid',
    titleRu: 'Получение водорода взаимодействием цинка и кислоты',
    descriptionUz: 'Rux bo‘laklari xlorid kislotaga tushganda eriy boshlaydi va shiddatli mayda vodorod (H₂) pufakchalari ajraladi. Bu gaz alanga yaqinlashtirilganda "paq" etib yonadi!',
    descriptionEn: 'Zinc dissolves in hydrochloric acid releasing copious hydrogen gas bubbles with substantial heating.',
    descriptionRu: 'Цинк растворяется в кислоте с бурным выделением пузырьков газообразного водорода.',
    safetyNoticeUz: 'Diqqat: Vodorod o‘ta portlovchi va alangalanuvchi gaz! Olovdan uzoqroq tuting.',
    safetyNoticeEn: 'Caution: Hydrogen gas is extremely flammable and explosive when mixed with air.',
    safetyNoticeRu: 'Осторожно: водород чрезвычайно взрывоопасен.',
    products: [
      { formula: 'ZnCl₂', nameUz: 'Rux xlorid', nameEn: 'Zinc chloride', nameRu: 'Хлорид цинка', state: 'solution' },
      { formula: 'H₂', nameUz: 'Vodorod gazi', nameEn: 'Hydrogen gas', nameRu: 'Водород', state: 'gas' }
    ]
  },

  // 8. Magniy + Xlorid kislota (Shiddatli reaksiya)
  {
    id: 'mg_hcl',
    reactants: ['mg', 'hcl'],
    equation: 'Mg + 2HCl → MgCl₂ + H₂↑',
    balancedEquation: 'Mg + 2HCl → MgCl₂ + H₂↑',
    type: 'gas_evolution',
    thermalType: 'exothermic',
    deltaH: '-462 kJ/mol',
    resultColorHex: '#e2e8f0',
    resultPh: 4.0,
    gasEvolved: 'H₂',
    bubblesIntensity: 'violent',
    smokeIntensity: 'dense',
    flameEffect: 'spark',
    tempChange: 45,
    soundEffect: 'sizzle',
    titleUz: 'Magniyning kislotada shiddatli erishi',
    titleEn: 'Vigorous dissolution of magnesium in acid',
    titleRu: 'Бурное растворение магния в соляной кислоте',
    descriptionUz: 'Magniy juda faol metall bo‘lib, kislotada bir necha soniyada shiddat bilan erib, yuqori harorat va vodorod ajratadi.',
    descriptionEn: 'Magnesium metal reacts rapidly and vigorously, boiling hot with violent bubbling.',
    descriptionRu: 'Магний чрезвычайно бурно реагирует с кислотой с сильным нагревом.',
    safetyNoticeUz: 'Juda issiq! Idish 70°C dan oshib ketishi mumkin.',
    safetyNoticeEn: 'High exothermic reaction! Flask can heat above 70°C.',
    safetyNoticeRu: 'Очень горячо! Берегите руки.',
    products: [
      { formula: 'MgCl₂', nameUz: 'Magniy xlorid', nameEn: 'Magnesium chloride', nameRu: 'Хлорид магния', state: 'solution' },
      { formula: 'H₂', nameUz: 'Vodorod gazi', nameEn: 'Hydrogen gas', nameRu: 'Водород', state: 'gas' }
    ]
  },

  // 9. Temir + Mis kuporosi (Metallarning siqib chiqarish qatori)
  {
    id: 'fe_cuso4',
    reactants: ['fe', 'cuso4'],
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    balancedEquation: 'Fe + CuSO₄ → FeSO₄ + Cu↓',
    type: 'redox',
    thermalType: 'exothermic',
    resultColorHex: '#86efac', // Pale greenish FeSO4
    precipitateColorHex: '#b45309', // Reddish copper
    precipitateNameUz: 'Qizil mis qatlami',
    precipitateNameEn: 'Reddish copper coating',
    precipitateNameRu: 'Красноватый осадок меди',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 8,
    soundEffect: 'ding',
    titleUz: 'Temirning misni siqib chiqarishi (Bekatov qatori)',
    titleEn: 'Single displacement: Iron displaces copper',
    titleRu: 'Замещение: Железо вытесняет медь из раствора',
    descriptionUz: 'Temir misga qaraganda faolroq bo‘lgani uchun, moviy rangli mis sulfat eritmasidagi mis ionlarini siqib chiqaradi. Moviy rang och yashil rangga (FeSO₄) aylanadi va temir yuzasida qizg‘ish toza mis metalli o‘tiradi!',
    descriptionEn: 'Iron displaces copper from copper(II) sulfate. The blue solution fades to pale green while pure metallic reddish copper plates out.',
    descriptionRu: 'Железо вытесняет медь. Синий раствор становится светло-зеленым, а на железе оседает красная медь.',
    safetyNoticeUz: 'Kimyoviy aktivlik qatorini isbotlovchi xavfsiz laboratoriya tajribasi.',
    safetyNoticeEn: 'Classic visual electrochemistry demonstration.',
    safetyNoticeRu: 'Наглядный опыт ряда активности металлов.',
    products: [
      { formula: 'FeSO₄', nameUz: 'Temir (II) sulfat', nameEn: 'Iron(II) sulfate', nameRu: 'Сульфат железа(II)', state: 'solution' },
      { formula: 'Cu', nameUz: 'Metall mis', nameEn: 'Metallic copper', nameRu: 'Медь металлическая', state: 'solid' }
    ]
  },

  // 10. Mis + Kumush nitrat ("Kumush daraxti")
  {
    id: 'cu_agno3',
    reactants: ['cu', 'agno3'],
    equation: 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓',
    balancedEquation: 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag↓',
    type: 'redox',
    thermalType: 'exothermic',
    resultColorHex: '#2563eb', // Beautiful azure blue Cu(NO3)2
    precipitateColorHex: '#e2e8f0', // Shiny silver needles
    precipitateNameUz: 'Yaltiroq kumush kristallari (igna shaklida)',
    precipitateNameEn: 'Glistening silver needle crystals',
    precipitateNameRu: 'Блестящие кристаллы серебра',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 5,
    soundEffect: 'ding',
    titleUz: 'Kumush daraxti tajribasi (Mis kumushni siqib chiqaradi)',
    titleEn: 'Silver tree experiment (Copper displaces silver)',
    titleRu: 'Опыт "Серебряное дерево" (Медь вытесняет серебро)',
    descriptionUz: 'Tiniq kumush nitrat eritmasiga mis solinganda, eritma go‘zal sapfir-moviy rangga (Cu(NO₃)₂) kiradi va mis yuzasida yaltiroq sof kumush kristallari "daraxt" kabi o‘sib chiqadi!',
    descriptionEn: 'Copper wire in silver nitrate grows beautiful dendritic needles of pure elemental silver, turning the solution sapphire blue.',
    descriptionRu: 'Медь вытесняет серебро, раствор становится сапфирово-синим, а на меди растут блестящие серебряные кристаллы.',
    safetyNoticeUz: 'Kumush nitrat teriga tushsa qora dog‘ qoldiradi (lyapis dog‘i).',
    safetyNoticeEn: 'Silver nitrate stains skin dark brown/black.',
    safetyNoticeRu: 'Нитрат серебра оставляет темные пятна на коже.',
    products: [
      { formula: 'Cu(NO₃)₂', nameUz: 'Mis (II) nitrat', nameEn: 'Copper(II) nitrate', nameRu: 'Нитрат меди(II)', state: 'solution' },
      { formula: 'Ag', nameUz: 'Kumush kristallari', nameEn: 'Silver crystals', nameRu: 'Серебро', state: 'solid' }
    ]
  },

  // 11. Kumush nitrat + Osh tuzi (Oq tvorogsimon cho‘kma)
  {
    id: 'agno3_nacl',
    reactants: ['agno3', 'nacl'],
    equation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    balancedEquation: 'AgNO₃ + NaCl → AgCl↓ + NaNO₃',
    type: 'precipitation',
    thermalType: 'neutral',
    resultColorHex: '#f8fafc',
    precipitateColorHex: '#ffffff',
    precipitateNameUz: 'Oq tvorogsimon AgCl cho‘kmasi',
    precipitateNameEn: 'Curdy white AgCl precipitate',
    precipitateNameRu: 'Белый творожистый осадок AgCl',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 1,
    soundEffect: 'ding',
    titleUz: 'Xlorid ionini aniqlashning sifat reaksiyasi',
    titleEn: 'Qualitative test for chloride ions',
    titleRu: 'Качественная реакция на хлорид-ионы',
    descriptionUz: 'Ikki tiniq eritma aralashtirilishi bilan bir zumda sutdek quyuq, oq tvorogsimon AgCl cho‘kmasi hosil bo‘ladi. Bu cho‘kma nitrat kislotada erimaydi.',
    descriptionEn: 'Instant formation of a curd-like dense white silver chloride precipitate upon mixing two clear solutions.',
    descriptionRu: 'Мгновенное выпадение белого творожистого осадка хлорида серебра.',
    safetyNoticeUz: 'Analitik kimyoda xlor ionlarini isbotlashning bosh usuli.',
    safetyNoticeEn: 'Standard qualitative analytical reaction.',
    safetyNoticeRu: 'Стандартная аналитическая реакция на хлорид.',
    products: [
      { formula: 'AgCl', nameUz: 'Kumush xlorid (cho‘kma)', nameEn: 'Silver chloride precipitate', nameRu: 'Хлорид серебра', state: 'solid' },
      { formula: 'NaNO₃', nameUz: 'Natriy nitrat', nameEn: 'Sodium nitrate', nameRu: 'Нитрат натрия', state: 'solution' }
    ]
  },

  // 12. Bariy xlorid + Sulfat kislota (Sulfat ionini aniqlash)
  {
    id: 'bacl2_h2so4',
    reactants: ['bacl2', 'h2so4'],
    equation: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl',
    balancedEquation: 'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl',
    type: 'precipitation',
    thermalType: 'neutral',
    resultColorHex: '#f1f5f9',
    precipitateColorHex: '#f8fafc',
    precipitateNameUz: 'Og‘ir oppoq BaSO₄ cho‘kmasi',
    precipitateNameEn: 'Heavy white BaSO₄ precipitate',
    precipitateNameRu: 'Тяжелый белый осадок BaSO₄',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 2,
    soundEffect: 'ding',
    titleUz: 'Sulfat ionlariga sifat reaksiyasi (Bariy sulfat)',
    titleEn: 'Qualitative test for sulfate ions',
    titleRu: 'Качественная реакция на сульфат-ионы',
    descriptionUz: 'Bariy ioni (Ba²⁺) sulfat ioni (SO₄²⁻) bilan uchrashganda suvda va kislotalarda mutlaqo erimaydigan og‘ir, oppoq BaSO₄ cho‘kmasi tushadi.',
    descriptionEn: 'Barium ions combine with sulfate ions forming an extremely insoluble, dense white precipitate of barium sulfate.',
    descriptionRu: 'Образуется тяжелый белый осадок сульфата бария, нерастворимый в кислотах.',
    safetyNoticeUz: 'BaCl₂ zaharli modda, ammo hosil bo‘lgan BaSO₄ tibbiyotda rentgenda xavfsiz ichiladi.',
    safetyNoticeEn: 'Barium chloride is toxic; the insoluble sulfate precipitate is chemically inert.',
    safetyNoticeRu: 'Хлорид бария токсичен, сульфат бария безопасен и инертен.',
    products: [
      { formula: 'BaSO₄', nameUz: 'Bariy sulfat (cho‘kma)', nameEn: 'Barium sulfate precipitate', nameRu: 'Сульфат бария', state: 'solid' },
      { formula: 'HCl', nameUz: 'Xlorid kislota', nameEn: 'Hydrochloric acid', nameRu: 'Соляная кислота', state: 'solution' }
    ]
  },

  // 13. Mis kuporosi + Ishqor (Moviy jelatin cho‘kma)
  {
    id: 'cuso4_naoh',
    reactants: ['cuso4', 'naoh'],
    equation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
    balancedEquation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',
    type: 'precipitation',
    thermalType: 'neutral',
    resultColorHex: '#38bdf8',
    precipitateColorHex: '#0284c7', // Bright blue gel
    precipitateNameUz: 'Yorqin moviy jelatinsimon Cu(OH)₂ cho‘kmasi',
    precipitateNameEn: 'Vibrant azure gelatinous Cu(OH)₂ precipitate',
    precipitateNameRu: 'Ярко-синий гелеобразный осадок Cu(OH)₂',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 4,
    soundEffect: 'ding',
    titleUz: 'Mis (II) gidroksidining hosil bo‘lishi',
    titleEn: 'Formation of copper(II) hydroxide',
    titleRu: 'Получение гидроксида меди(II)',
    descriptionUz: 'Mis sulfat eritmasiga ishqor quyilganda qalin, yorqin moviy rangli jelatinsimon Cu(OH)₂ cho‘kmasi ajraladi. Isitilganda qora rangli CuO ga aylanadi.',
    descriptionEn: 'Adding sodium hydroxide to copper sulfate yields a rich blue gelatinous precipitate of copper(II) hydroxide.',
    descriptionRu: 'При смешивании образуется студенистый осадок гидроксида меди небесно-голубого цвета.',
    safetyNoticeUz: 'Cho‘kma beqaror, qizdirilsa qorayadi.',
    safetyNoticeEn: 'Precipitate dehydrates into black CuO on heating.',
    safetyNoticeRu: 'Осадок чернеет при нагревании с образованием CuO.',
    products: [
      { formula: 'Cu(OH)₂', nameUz: 'Mis (II) gidroksid', nameEn: 'Copper(II) hydroxide', nameRu: 'Гидроксид меди(II)', state: 'solid' },
      { formula: 'Na₂SO₄', nameUz: 'Natriy sulfat', nameEn: 'Sodium sulfate', nameRu: 'Сульфат натрия', state: 'solution' }
    ]
  },

  // 14. Temir xlorid + Ishqor (Qo‘ng‘ir cho‘kma)
  {
    id: 'fecl3_naoh',
    reactants: ['fecl3', 'naoh'],
    equation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',
    balancedEquation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ + 3NaCl',
    type: 'precipitation',
    thermalType: 'neutral',
    resultColorHex: '#fed7aa',
    precipitateColorHex: '#9a3412', // Rust-brown
    precipitateNameUz: 'Qizil-qo‘ng‘ir zang rangidagi Fe(OH)₃ cho‘kmasi',
    precipitateNameEn: 'Rust-red iron(III) hydroxide precipitate',
    precipitateNameRu: 'Бурый осадок гидроксида железа(III)',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 6,
    soundEffect: 'ding',
    titleUz: 'Temir (III) gidroksidining cho‘kishi',
    titleEn: 'Iron(III) hydroxide precipitation',
    titleRu: 'Осаждение гидроксида железа(III)',
    descriptionUz: 'Sariq-qo‘ng‘ir FeCl₃ ga ishqor quyilganda qalin zang rangli (qizg‘ish-jigarrang) Fe(OH)₃ amorf cho‘kmasi vujudga keladi.',
    descriptionEn: 'Reaction produces an insoluble amorphous reddish-brown rust-colored gelatinous precipitate.',
    descriptionRu: 'Выпадает аморфный бурый осадок цвета ржавчины.',
    safetyNoticeUz: 'Kiyim va qo‘lga tegsa o‘chishi qiyin dog‘ qoldiradi.',
    safetyNoticeEn: 'Stains fabric persistently with rust marks.',
    safetyNoticeRu: 'Оставляет стойкие бурые пятна.',
    products: [
      { formula: 'Fe(OH)₃', nameUz: 'Temir (III) gidroksid', nameEn: 'Iron(III) hydroxide', nameRu: 'Гидроксид железа(III)', state: 'solid' },
      { formula: 'NaCl', nameUz: 'Natriy xlorid', nameEn: 'Sodium chloride', nameRu: 'Хлорид натрия', state: 'solution' }
    ]
  },

  // 15. Qo‘rg‘oshin nitrat + Kaliy yodid ("Oltin yomg‘iri")
  {
    id: 'pbno32_ki',
    reactants: ['pbno32', 'ki'],
    equation: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',
    balancedEquation: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',
    type: 'precipitation',
    thermalType: 'neutral',
    resultColorHex: '#fef08a',
    precipitateColorHex: '#eab308', // Sparkling gold yellow
    precipitateNameUz: 'Yaltiroq tillarang oltin PbI₂ cho‘kmasi',
    precipitateNameEn: 'Shimmering golden yellow PbI₂ crystals',
    precipitateNameRu: 'Золотисто-желтый мерцающий осадок PbI₂',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 2,
    soundEffect: 'ding',
    titleUz: 'Mashhur "Oltin yomg‘iri" reaksiyasi',
    titleEn: 'Famous Golden Rain experiment',
    titleRu: 'Знаменитый опыт "Золотой дождь"',
    descriptionUz: 'Ikki rangsiz eritma qo‘shilishi bilan idishda ko‘zni qamashtiruvchi tilla kukunidek yaltiroq sariq PbI₂ kristallari yog‘iladi. Qizdirib sovutilganda kristallar haqiqiy oltin zarrachalaridek jilolanadi!',
    descriptionEn: 'Lead(II) iodide precipitates instantly as dazzling golden hexagonal crystalline platelets that glimmer like gold dust.',
    descriptionRu: 'Выпадает ослепительно красивый золотистый осадок иодида свинца, мерцающий в лучах света.',
    safetyNoticeUz: 'Qo‘rg‘oshin birikmalari zaharli hisoblanadi. Virtual simulyatsiyada zavqlaning!',
    safetyNoticeEn: 'Lead salts are toxic. This virtual lab allows safe discovery without hazard.',
    safetyNoticeRu: 'Соединения свинца токсичны, безопаснее изучать виртуально.',
    products: [
      { formula: 'PbI₂', nameUz: 'Qo‘rg‘oshin (II) yodid ("Oltin")', nameEn: 'Lead(II) iodide', nameRu: 'Иодид свинца(II)', state: 'solid' },
      { formula: 'KNO₃', nameUz: 'Kaliy nitrat', nameEn: 'Potassium nitrate', nameRu: 'Нитрат калия', state: 'solution' }
    ]
  },

  // 16. Vodorod peroksid + Marganes dioksid katalizatori ("Fil tishi pastasi" / Kislorod favvorasi)
  {
    id: 'h2o2_mno2',
    reactants: ['h2o2', 'mno2'],
    equation: '2H₂O₂ (MnO₂ katalizator) → 2H₂O + O₂↑',
    balancedEquation: '2H₂O₂ → 2H₂O + O₂↑',
    type: 'decomposition',
    thermalType: 'exothermic',
    deltaH: '-196 kJ/mol',
    resultColorHex: '#1e293b',
    gasEvolved: 'O₂',
    bubblesIntensity: 'violent',
    smokeIntensity: 'dense',
    tempChange: 48,
    soundEffect: 'fizz',
    titleUz: 'Katalitik parchalanish: Kislorod geyzeri ("Fil tishi pastasi")',
    titleEn: 'Catalytic peroxide decomposition (Elephant toothpaste reaction)',
    titleRu: 'Каталитическое разложение перекиси водорода ("Зубная паста слона")',
    descriptionUz: 'Marganes dioksid (MnO₂) zarrasi tushishi bilanoq vodorod peroksid zudlik bilan qaynaydi va o‘ta kuchli oq bug‘ hamda sof kislorod (O₂) gazini shiddat bilan otib chiqaradi! Harorat keskin ko‘tariladi.',
    descriptionEn: 'Solid manganese dioxide vigorously accelerates peroxide decomposition, releasing huge volumes of oxygen gas and boiling steam.',
    descriptionRu: 'Диоксид марганца катализирует бурное вскипание перекиси с выделением пара и чистого кислорода.',
    safetyNoticeUz: 'Shiddatli issiq bug‘ va ko‘pik otilib chiqishi sababli ehtiyotkorlik talab etiladi.',
    safetyNoticeEn: 'Generates boiling steam and aggressive gas release.',
    safetyNoticeRu: 'Выделяется горячий пар, возможен выброс пены.',
    products: [
      { formula: 'H₂O', nameUz: 'Suv va bug‘', nameEn: 'Water & steam', nameRu: 'Вода и пар', state: 'liquid' },
      { formula: 'O₂', nameUz: 'Sof kislorod gazi', nameEn: 'Oxygen gas', nameRu: 'Кислород', state: 'gas' }
    ]
  },

  // 17. So‘nmagan ohak + Suv (Ohak so‘nishi)
  {
    id: 'cao_h2o',
    reactants: ['cao', 'h2o'],
    equation: 'CaO + H₂O → Ca(OH)₂ (Ohak so‘nishi)',
    balancedEquation: 'CaO + H₂O → Ca(OH)₂',
    type: 'synthesis',
    thermalType: 'exothermic',
    deltaH: '-65.2 kJ/mol',
    resultColorHex: '#f8fafc',
    smokeIntensity: 'dense',
    bubblesIntensity: 'medium',
    tempChange: 65,
    soundEffect: 'sizzle',
    titleUz: 'Ohak so‘nishi: Kalsiy oksidining gidratatsiyasi',
    titleEn: 'Lime slaking: Exothermic hydration of quicklime',
    titleRu: 'Гашение извести: Экзотермическая гидратация',
    descriptionUz: 'So‘nmagan ohakka (CaO) suv tekkanda suv shiddat bilan qaynaydi, qalin issiq bug‘ ko‘tariladi va oq ohak xamiri (so‘ndirilgan ohak) hosil bo‘ladi. Harorat 90-100°C ga yetishi mumkin!',
    descriptionEn: 'Quicklime vigorously combines with water releasing extreme thermal energy that boils water into billows of white steam.',
    descriptionRu: 'Негашеная известь бурно реагирует с водой, смесь закипает с образованием густого пара.',
    safetyNoticeUz: 'Haqiqiy hayotda qaynoq kalsiy gidroksid sachrab ko‘zni ko‘r qilishi mumkin. Ehtiyot bo‘ling!',
    safetyNoticeEn: 'High heat can cause boiling caustic splashes.',
    safetyNoticeRu: 'Опасность разбрызгивания горячей едкой суспензии.',
    products: [
      { formula: 'Ca(OH)₂', nameUz: 'So‘ndirilgan ohak (ohak suti)', nameEn: 'Slaked lime paste', nameRu: 'Гашеная известь', state: 'solution' }
    ]
  },

  // 18. Natriy + Suv (Shiddatli va yorqin reaksiya)
  {
    id: 'na_h2o',
    reactants: ['na', 'h2o'],
    equation: '2Na + 2H₂O → 2NaOH + H₂↑ (Olov va paqillash)',
    balancedEquation: '2Na + 2H₂O → 2NaOH + H₂↑',
    type: 'redox',
    thermalType: 'exothermic',
    deltaH: '-368 kJ/mol',
    resultColorHex: '#f1f5f9',
    resultPh: 14.0,
    gasEvolved: 'H₂',
    bubblesIntensity: 'violent',
    smokeIntensity: 'dense',
    flameEffect: 'yellow_burst',
    tempChange: 55,
    soundEffect: 'pop',
    titleUz: 'Ishqoriy metallarning suv bilan reaksiyasi (Natriy)',
    titleEn: 'Alkali metal water reaction (Sodium)',
    titleRu: 'Взаимодействие щелочного металла с водой (Натрий)',
    descriptionUz: 'Natriy metalli suv yuzasida yumaloq erigan tomchiga aylanib shiddat bilan yurg‘alaydi, sariq alanga bilan yonadi va vodorod ajratadi. Reaksiya oxirida ko‘pincha portlash sodir bo‘ladi. Suv kuchli ishqorga aylanadi.',
    descriptionEn: 'Sodium melts into a fiery ball skittering over water with a bright yellow flame, producing hydrogen gas and caustic NaOH.',
    descriptionRu: 'Натрий плавится в сверкающий шарик, бегает по поверхности воды, горит желтым пламенем и взрывается.',
    safetyNoticeUz: 'O‘TA XAVFLI! Haqiqiy hayotda faqat tortuvchi shkafda va himoya qalqoni ortida bajariladi!',
    safetyNoticeEn: 'EXTREME HAZARD! Real sodium water explosions can shatter glass. Virtual demonstration only!',
    safetyNoticeRu: 'ОЧЕНЬ ОПАСНО! В реальности взрывается и разбрызгивает едкую щелочь.',
    products: [
      { formula: 'NaOH', nameUz: 'Natriy gidroksid', nameEn: 'Sodium hydroxide', nameRu: 'Едкий натр', state: 'solution' },
      { formula: 'H₂', nameUz: 'Vodorod gazi', nameEn: 'Hydrogen gas', nameRu: 'Водород', state: 'gas' }
    ]
  },

  // 19. Kalsiy karbonat + Xlorid kislota (Bo‘rning kislotada erishi)
  {
    id: 'caco3_hcl',
    reactants: ['caco3', 'hcl'],
    equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
    balancedEquation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
    type: 'gas_evolution',
    thermalType: 'exothermic',
    resultColorHex: '#f8fafc',
    resultPh: 5.5,
    gasEvolved: 'CO₂',
    bubblesIntensity: 'medium',
    smokeIntensity: 'light',
    tempChange: 7,
    soundEffect: 'fizz',
    titleUz: 'Ohaktosh va bo‘rning erishi (Choynakdagi qasmoqni tozalash)',
    titleEn: 'Dissolution of limestone & chalk in acid',
    titleRu: 'Растворение мела и накипи в кислоте',
    descriptionUz: 'Qattiq bo‘r yoki kalsiy karbonat kislota quyilishi bilan tezda eriydi va pufakchalar bilan karbonat angidrid (CO₂) gazini ajratadi. Choynakdagi kalsiy qasmoqlarini kislota bilan tozalash aynan shu reaksiyaga asoslangan.',
    descriptionEn: 'Chalk and limescale effervesce vigorously in acid releasing carbon dioxide, forming soluble calcium chloride.',
    descriptionRu: 'Мел и известняк быстро растворяются в кислоте с шипением и выделением CO₂.',
    safetyNoticeUz: 'Xavfsiz va amaliyotda keng qo‘llaniladigan reaksiya.',
    safetyNoticeEn: 'Standard domestic descaling chemistry.',
    safetyNoticeRu: 'Бытовой пример удаления накипи.',
    products: [
      { formula: 'CaCl₂', nameUz: 'Kalsiy xlorid', nameEn: 'Calcium chloride', nameRu: 'Хлорид кальция', state: 'solution' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' },
      { formula: 'CO₂', nameUz: 'Karbonat angidrid', nameEn: 'Carbon dioxide', nameRu: 'Углекислый газ', state: 'gas' }
    ]
  },

  // 20. Lakmus + Kislota
  {
    id: 'litmus_hcl',
    reactants: ['litmus', 'hcl'],
    equation: 'Lakmus + HCl → Qizil rang',
    balancedEquation: 'Lakmus + H⁺ → Qizil indikator shakli',
    type: 'indicator',
    thermalType: 'neutral',
    resultColorHex: '#ef4444', // Red
    resultPh: 1.0,
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 0,
    soundEffect: 'ding',
    titleUz: 'Lakmusning kislotali muhitda qizarishi',
    titleEn: 'Litmus indicator turns red in acid',
    titleRu: 'Покраснение лакмуса в кислой среде',
    descriptionUz: 'Kislota ta’sirida lakmus molekulalari proton (H⁺) qabul qilib, o‘zining binafsha rangidan to‘q qizil rangga o‘tadi.',
    descriptionEn: 'In acidic conditions, litmus indicator accepts hydrogen ions and turns bright red.',
    descriptionRu: 'Под действием ионов водорода лакмус меняет окраску на ярко-красную.',
    safetyNoticeUz: 'Oddiy sifat tekshiruvi.',
    safetyNoticeEn: 'Standard qualitative pH test.',
    safetyNoticeRu: 'Стандартный качественный тест.',
    products: [
      { formula: 'H-Lakmus', nameUz: 'Protonlangan lakmus (qizil)', nameEn: 'Protonated litmus (red)', nameRu: 'Протонированный лакмус (красный)', state: 'solution' }
    ]
  },

  // 21. Lakmus + Ishqor
  {
    id: 'litmus_naoh',
    reactants: ['litmus', 'naoh'],
    equation: 'Lakmus + NaOH → Ko‘k rang',
    balancedEquation: 'Lakmus + OH⁻ → Ko‘k indikator shakli',
    type: 'indicator',
    thermalType: 'neutral',
    resultColorHex: '#2563eb', // Blue
    resultPh: 13.0,
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 0,
    soundEffect: 'ding',
    titleUz: 'Lakmusning ishqoriy muhitda ko‘karishi',
    titleEn: 'Litmus indicator turns blue in alkali',
    titleRu: 'Посинение лакмуса в щелочной среде',
    descriptionUz: 'Gidroksid (OH⁻) ionlari ta’sirida lakmus indikatori yorqin to‘q ko‘k rangga aylanadi.',
    descriptionEn: 'In alkaline solutions, hydroxide ions cause litmus to turn deep blue.',
    descriptionRu: 'В щелочной среде лакмус моментально приобретает синий цвет.',
    safetyNoticeUz: 'Indikator reaksiyasi.',
    safetyNoticeEn: 'Indicator color transition.',
    safetyNoticeRu: 'Индикаторный переход.',
    products: [
      { formula: 'Lakmus⁻', nameUz: 'Deprotonlangan lakmus (ko‘k)', nameEn: 'Deprotonated litmus (blue)', nameRu: 'Депротонированный лакмус (синий)', state: 'solution' }
    ]
  },

  // 22. Vodorod va Kislorod (Gursillovchi gaz reaksiyasi) - Gorelka yoki harorat talab qilinadi
  {
    id: 'h2_o2',
    reactants: ['h2', 'o2'],
    minTemp: 90,
    equation: '2H₂ + O₂ (uchqun/olov) → 2H₂O',
    balancedEquation: '2H₂ + O₂ → 2H₂O',
    type: 'combustion',
    thermalType: 'exothermic',
    deltaH: '-483.6 kJ/mol',
    resultColorHex: '#38bdf8',
    bubblesIntensity: 'none',
    smokeIntensity: 'medium',
    flameEffect: 'yellow_burst',
    tempChange: 80,
    soundEffect: 'pop',
    titleUz: 'Gursillovchi gaz: Vodorodning kislorodda yonishi',
    titleEn: 'Knallgas explosion: Hydrogen combustion',
    titleRu: 'Гремучий газ: Сгорание водорода в кислороде',
    descriptionUz: '2 hajm vodorod va 1 hajm kislorod aralashmasi qizdirilganda yoki uchqun berilganda qattiq "gurs" etgan tovush bilan portlaydi va toza suv bug‘ini hosil qiladi!',
    descriptionEn: 'The stoichiometric 2:1 mixture of hydrogen and oxygen explodes with a deafening pop, condensing pure water drops.',
    descriptionRu: 'Смесь водорода и кислорода при нагревании мгновенно взрывается с образованием капель воды.',
    safetyNoticeUz: 'Gursillovchi gaz portlashi shisha idishlarni parchalab tashlashi mumkin!',
    safetyNoticeEn: 'Explosive pressure hazard in real life containers!',
    safetyNoticeRu: 'Взрывная волна способна расколоть стеклянную посуду.',
    products: [
      { formula: 'H₂O', nameUz: 'Suv bug‘i va tomchilari', nameEn: 'Water vapor and dew', nameRu: 'Водяной пар и конденсат', state: 'liquid' }
    ]
  },

  // 23. Etanolning yonishi (Gorelka yoqilganda)
  {
    id: 'c2h5oh_o2',
    reactants: ['c2h5oh', 'o2'],
    minTemp: 70,
    equation: 'C₂H₅OH + 3O₂ (olov) → 2CO₂ + 3H₂O',
    balancedEquation: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
    type: 'combustion',
    thermalType: 'exothermic',
    deltaH: '-1367 kJ/mol',
    resultColorHex: '#38bdf8',
    bubblesIntensity: 'none',
    smokeIntensity: 'light',
    flameEffect: 'purple_flame',
    tempChange: 75,
    soundEffect: 'sizzle',
    titleUz: 'Etanolning toza ko‘k alanga bilan yonishi',
    titleEn: 'Clean combustion of ethanol',
    titleRu: 'Горение этанола чистым синим пламенем',
    descriptionUz: 'Spirt gorelka issiqligida deyarli ko‘rinmas toza moviy alanga bilan yonadi. Natijada faqat karbonat angidrid va suv hosil bo‘ladi.',
    descriptionEn: 'Ethanol burns with a clean, smokeless blue flame yielding carbon dioxide, water vapor, and high heat.',
    descriptionRu: 'Спирт сгорает ровным синим пламенем без копоти с выделением тепла.',
    safetyNoticeUz: 'Ochiq olov va spirt bilan ehtiyotkorlik bilan ishlang.',
    safetyNoticeEn: 'Open flame safety precautions apply.',
    safetyNoticeRu: 'Соблюдайте правила пожарной безопасности.',
    products: [
      { formula: 'CO₂', nameUz: 'Karbonat angidrid', nameEn: 'Carbon dioxide', nameRu: 'Углекислый газ', state: 'gas' },
      { formula: 'H₂O', nameUz: 'Suv bug‘i', nameEn: 'Water vapor', nameRu: 'Водяной пар', state: 'gas' }
    ]
  },

  // 24. Temir + Xlorid kislota
  {
    id: 'fe_hcl',
    reactants: ['fe', 'hcl'],
    equation: 'Fe + 2HCl → FeCl₂ + H₂↑',
    balancedEquation: 'Fe + 2HCl → FeCl₂ + H₂↑',
    type: 'gas_evolution',
    thermalType: 'exothermic',
    resultColorHex: '#bbf7d0', // Pale green FeCl2
    gasEvolved: 'H₂',
    bubblesIntensity: 'medium',
    smokeIntensity: 'light',
    tempChange: 14,
    soundEffect: 'bubble',
    titleUz: 'Temirning xlorid kislotada erishi',
    titleEn: 'Iron dissolving in hydrochloric acid',
    titleRu: 'Растворение железа в соляной кислоте',
    descriptionUz: 'Temir kukuniga xlorid kislota quyilganda vodorod pufakchalari ajraladi va eritma och yashil rangli temir (II) xloridga (FeCl₂) aylanadi.',
    descriptionEn: 'Iron dissolves in hydrochloric acid evolving hydrogen bubbles and forming a pale green iron(II) chloride solution.',
    descriptionRu: 'Железо растворяется с выделением водорода, образуя светло-зеленый раствор FeCl₂.',
    safetyNoticeUz: 'Vodorod gazi ajraladi.',
    safetyNoticeEn: 'Hydrogen gas is liberated.',
    safetyNoticeRu: 'Выделяется горючий водород.',
    products: [
      { formula: 'FeCl₂', nameUz: 'Temir (II) xlorid', nameEn: 'Iron(II) chloride', nameRu: 'Хлорид железа(II)', state: 'solution' },
      { formula: 'H₂', nameUz: 'Vodorod gazi', nameEn: 'Hydrogen gas', nameRu: 'Водород', state: 'gas' }
    ]
  },

  // 25. Rux + Mis kuporosi (Rux misni siqib chiqaradi)
  {
    id: 'zn_cuso4',
    reactants: ['zn', 'cuso4'],
    equation: 'Zn + CuSO₄ → ZnSO₄ + Cu↓',
    balancedEquation: 'Zn + CuSO₄ → ZnSO₄ + Cu↓',
    type: 'redox',
    thermalType: 'exothermic',
    resultColorHex: '#f8fafc', // Decoloration of blue
    precipitateColorHex: '#9a3412', // Copper sponge
    precipitateNameUz: 'Mis g‘ubori va sholxasi',
    precipitateNameEn: 'Copper sponge precipitate',
    precipitateNameRu: 'Губчатая медь',
    bubblesIntensity: 'none',
    smokeIntensity: 'none',
    tempChange: 16,
    soundEffect: 'ding',
    titleUz: 'Ruxning mis sulfatni rangsizlantirishi',
    titleEn: 'Zinc decolorizing copper sulfate',
    titleRu: 'Обесцвечивание медного купороса цинком',
    descriptionUz: 'Rux kukuniga mis kuporosi quyilganda moviy rang butunlay yo‘qolib tiniqlashadi (ZnSO₄ rangsiz) va tubda qo‘ng‘ir-qizil mis metalli cho‘kadi.',
    descriptionEn: 'Zinc rapidly reduces copper(II) ions; the blue solution bleaches to water-clear while copper metal falls out.',
    descriptionRu: 'Цинк быстро вытесняет медь; раствор полностью обесцвечивается, а на дно оседает медь.',
    safetyNoticeUz: 'Idish sezilarli isiydi.',
    safetyNoticeEn: 'Notable temperature rise.',
    safetyNoticeRu: 'Заметный разогрев смеси.',
    products: [
      { formula: 'ZnSO₄', nameUz: 'Rux sulfat (rangsiz)', nameEn: 'Zinc sulfate (clear)', nameRu: 'Сульфат цинка', state: 'solution' },
      { formula: 'Cu', nameUz: 'Qizil mis cho‘kmasi', nameEn: 'Copper metal', nameRu: 'Медь металлическая', state: 'solid' }
    ]
  },

  // 26. Ohak suvi + Karbonat angidrid (Ohak suvining loyqalanishi)
  {
    id: 'caoh2_co2',
    reactants: ['caoh2', 'co2'],
    equation: 'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O',
    balancedEquation: 'Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O',
    type: 'precipitation',
    thermalType: 'neutral',
    resultColorHex: '#f1f5f9',
    precipitateColorHex: '#ffffff',
    precipitateNameUz: 'Oq sutsimon CaCO₃ loyqasi',
    precipitateNameEn: 'Milky white CaCO₃ cloudiness',
    precipitateNameRu: 'Белая муть карбоната кальция',
    bubblesIntensity: 'light',
    smokeIntensity: 'none',
    tempChange: 1,
    soundEffect: 'ding',
    titleUz: 'Karbonat angidridga sifat reaksiyasi (Ohak suvining loyqalanishi)',
    titleEn: 'Qualitative test for CO₂ (Milky limewater)',
    titleRu: 'Качественная реакция на углекислый газ (Помутнение известковой воды)',
    descriptionUz: 'Tiniq ohak suvi (Ca(OH)₂) orqali CO₂ gazi o‘tkazilganda suv bir zumda sutdek oppoq bo‘lib loyqalanadi. Bu kalsiy karbonat (CaCO₃) hosil bo‘lganini bildiradi.',
    descriptionEn: 'Passing carbon dioxide through clear limewater rapidly turns it cloudy milky white due to fine calcium carbonate suspension.',
    descriptionRu: 'Пропускание углекислого газа через известковую воду вызывает ее помутнение из-за микрокристаллов мела.',
    safetyNoticeUz: 'Nafas bilan chiqariladigan CO₂ ni isbotlashda maktablarda ishlatiladi.',
    safetyNoticeEn: 'Classic biology/chemistry breath test.',
    safetyNoticeRu: 'Классический школьный опыт с дыханием.',
    products: [
      { formula: 'CaCO₃', nameUz: 'Kalsiy karbonat (oq loyqa)', nameEn: 'Calcium carbonate precipitate', nameRu: 'Карбонат кальция', state: 'solid' },
      { formula: 'H₂O', nameUz: 'Suv', nameEn: 'Water', nameRu: 'Вода', state: 'liquid' }
    ]
  }
];
