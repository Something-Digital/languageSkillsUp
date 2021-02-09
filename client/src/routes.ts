import WordsListPage from './pages/WordsListPage.svelte'
import NotFoundPage from './pages/NotFoundPage.svelte'

const routes = {
  '/': WordsListPage,
  '*': NotFoundPage,
}

export default routes;
