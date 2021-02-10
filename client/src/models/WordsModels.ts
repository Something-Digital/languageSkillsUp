export interface WordsPair {
  id: string;
  word: string;
  translation: string;
}

export interface Words {
  id: string;
  title: string;
  items: WordsPair[];
}

export enum Direction {
  Forward = 'Forward',
  Backward = 'Backward',
}