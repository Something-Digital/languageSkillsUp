// import { wrap } from 'svelte-spa-router/wrap';
import WordsListPage from './pages/WordsListPage.svelte';
import WordsPage from './pages/WordsPage.svelte';
import NotFoundPage from './pages/NotFoundPage.svelte';

const routes = {
  '/': WordsListPage,
  '/words/:id': WordsPage,
  // '/words/:wordsId': wrap({
  //   asyncComponent: () => import('./pages/WordsPage.svelte'),
  // }),
  '*': NotFoundPage,
}

export default routes;
