import { writable } from 'svelte/store';
import type { Words } from '../models/WordsModels';

const wordsTemplate: Words = {
  id: `wordsList${Date.now()}`,
  title: 'Новый список',
  items: [
    { id: `wordsPair${Date.now()}`, word: 'Vasya', translation: 'Вася' },
  ],
};

function createWordsList() {
	const { subscribe, set, update } = writable<Words[]>([]);
	return {
		subscribe,
		addWords: (item: Words = wordsTemplate) => update(prev => [ ...prev, item]),
		// removeWords: (id: string) => update(prev => n - 1),
		reset: () => set([]),
	};
}

export const wordsList = createWordsList();

// level.subscribe(value => {
// 	localStorage.setItem('level', value);
// });
