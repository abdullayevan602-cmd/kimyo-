export type Language = 'uz' | 'en' | 'ru';
export type Theme = 'dark' | 'light';

export type SubstanceCategory = 
  | 'acids' 
  | 'bases' 
  | 'metals' 
  | 'nonmetals' 
  | 'salts' 
  | 'oxides' 
  | 'indicators' 
  | 'organics';

export type PhysicalState = 'liquid' | 'solid' | 'gas' | 'powder' | 'solution';

export type HazardType = 'none' | 'flammable' | 'corrosive' | 'toxic' | 'oxidizer' | 'irritant';

export interface Substance {
  id: string;
  formula: string;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  state: PhysicalState;
  hexColor: string;
  liquidColor?: string; // CSS rgba or gradient
  molarMass: number; // g/mol
  density?: number; // g/cm³ or g/L
  ph?: number; // approx pH in standard aqueous state
  hazard: HazardType;
  category: SubstanceCategory;
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
  solubilityUz?: string;
  safetyNoticeUz?: string;
}

export type ReactionType = 
  | 'neutralization' 
  | 'precipitation' 
  | 'redox' 
  | 'gas_evolution' 
  | 'decomposition' 
  | 'synthesis' 
  | 'combustion'
  | 'indicator';

export interface ReactionProduct {
  formula: string;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  state: PhysicalState;
}

export interface ChemicalReaction {
  id: string;
  reactants: string[]; // Substance IDs required
  minTemp?: number; // Celsius required (e.g. Bunsen burner needed)
  requiredCatalyst?: string; // Catalyst ID needed (e.g. MnO2)
  products: ReactionProduct[];
  equation: string;
  balancedEquation: string;
  type: ReactionType;
  thermalType: 'exothermic' | 'endothermic' | 'neutral';
  deltaH?: string; // e.g. "-57.3 kJ/mol"
  resultColorHex: string;
  resultPh?: number;
  precipitateColorHex?: string;
  precipitateNameUz?: string;
  precipitateNameEn?: string;
  precipitateNameRu?: string;
  gasEvolved?: string; // e.g. "CO₂", "H₂", "O₂"
  bubblesIntensity: 'none' | 'light' | 'medium' | 'violent';
  smokeIntensity: 'none' | 'light' | 'medium' | 'dense';
  flameEffect?: 'none' | 'spark' | 'yellow_burst' | 'purple_flame' | 'glow';
  tempChange: number; // e.g. +30 or -5
  soundEffect: 'bubble' | 'fizz' | 'sizzle' | 'pop' | 'ding';
  titleUz: string;
  titleEn: string;
  titleRu: string;
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
  safetyNoticeUz: string;
  safetyNoticeEn: string;
  safetyNoticeRu: string;
}

export interface AddedSubstance {
  substance: Substance;
  amount: number; // ml or grams
  unit: 'ml' | 'g';
  addedAt: number;
}

export type VesselType = 'flask' | 'tube' | 'beaker' | 'crucible';

export interface ReactionLog {
  id: string;
  timestamp: number;
  reactantsUsed: { name: string; formula: string; amount: number; unit: string }[];
  equation: string;
  type: ReactionType;
  thermalType: 'exothermic' | 'endothermic' | 'neutral';
  description: string;
  hazardNotice?: string;
}

export interface ElementData {
  number: number;
  symbol: string;
  nameUz: string;
  nameEn: string;
  nameRu: string;
  mass: number;
  period: number;
  group: number;
  category: 
    | 'alkali' 
    | 'alkaline-earth' 
    | 'transition' 
    | 'post-transition' 
    | 'metalloid' 
    | 'reactive-nonmetal' 
    | 'noble-gas' 
    | 'lanthanide' 
    | 'actinide';
  electronConfig: string;
  electronegativity?: number;
  discovered: string;
  stateAt20C: 'solid' | 'liquid' | 'gas';
  summaryUz: string;
  substanceId?: string; // if available to add to lab
}

export interface QuizQuestion {
  id: string;
  category: 'basics' | 'reactions' | 'safety' | 'calculations';
  questionUz: string;
  questionEn: string;
  questionRu: string;
  optionsUz: string[];
  optionsEn: string[];
  optionsRu: string[];
  correctIndex: number;
  explanationUz: string;
  explanationEn: string;
  explanationRu: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}
