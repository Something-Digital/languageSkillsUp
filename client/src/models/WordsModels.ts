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