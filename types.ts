
export interface ChristmasTerm {
  portuguese: string;
  chinese: string;
  pinyin: string;
  description: string;
  icon: string;
}

export interface TranslationResult {
  translatedText: string;
  pinyin: string;
  culturalContext: string;
}

export type GameType = 'memory' | 'quiz' | 'bolorei' | null;
