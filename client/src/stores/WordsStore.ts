
import { writable } from 'svelte/store';
import type { Words } from '../models/WordsModels';

// export const content = writable('');

export const wordsList = writable<Words[]>([
  {
    title: 'Список 1',
    items: [
      { word: 'Haha', translation: 'Хаха' },
      { word: 'Hoho', translation: 'Хохо' },
      { word: 'Hehe', translation: 'Хехе' },
    ],
  },
  {
    title: 'List 2',
    items: [
      { word: 'Dog', translation: 'Собака' },
      { word: 'Cat', translation: 'Кошка' },
      { word: 'Bird', translation: 'Птица' },
    ],
  },
]);

// export const level = writable(
//   parseInt(localStorage.getItem('level'), 10) || 1,
// );

// level.subscribe(value => {
// 	localStorage.setItem('level', value);
// });

// export const status = writable(null); // null | started | win | lose
