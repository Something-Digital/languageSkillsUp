import { writable } from 'svelte/store';
import type { Words } from '../models/WordsModels';

function createWordsList() {
	const { subscribe, set, update } = writable<Words[]>([
    {
      id: 'wordsList1',
      title: 'Список 1',
      items: [
        { id: 'wordsPair1', word: 'Haha', translation: 'Хаха' },
        { id: 'wordsPair2', word: 'Hoho', translation: 'Хохо' },
        { id: 'wordsPair3', word: 'Hehe', translation: 'Хехе' },
      ],
    },
    {
      id: 'wordsList2',
      title: 'List 3',
      items: [
        { id: 'wordsPair4', word: 'Dog', translation: 'Собака' },
        { id: 'wordsPair5', word: 'Cat', translation: 'Кошка' },
        { id: 'wordsPair6', word: 'Bird', translation: 'Птица' },
      ],
    },
  ]);

	return {
		subscribe,
		addWords: (item: Words) => update(prev => [ ...prev, item]),
		// removeWords: (id: string) => update(prev => n - 1),
		reset: () => set([]),
	};
}

export const wordsList = createWordsList();

// export const level = writable(
//   parseInt(localStorage.getItem('level'), 10) || 1,
// );

// level.subscribe(value => {
// 	localStorage.setItem('level', value);
// });
