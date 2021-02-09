<script lang="ts">
  import { wordsList } from '../stores/WordsStore';
  import type { WordsRouterParams } from '../models/RouterModels';
  import type { Words } from '../models/WordsModels';

  export let params: WordsRouterParams = { id: '' };
  export let words: Words = $wordsList.find(words => words.id === params.id);
</script>

<ul>
  <li class="words-list-tile">
    <h3 class="words-list-tile__title">{words.title ?? "Unknown title"}</h3>
    <h4 class="words-list-tile__divider">***</h4>
    <ul class="words-list-tile__preview">
      {#each words.items.slice(0, 2) as wordsPair}
        <li>{wordsPair.word} - {wordsPair.translation}</li>
      {/each}
    </ul>
  </li>
</ul>

<style>
  ul {
    padding: 0;
    display: flex;
  }
  li {
    list-style-type: none;
  }
  .words-list-tile {
    display: block;
    background-color: whitesmoke;
    padding: 1.5em;
    cursor: pointer;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, 0.1);
  }
  .words-list-tile__link {
    text-decoration-line: none;
    color: inherit;
  }
  .words-list-tile:not(:first-of-type) {
    margin-left: 1.2em;
  }
  .words-list-tile__title {
    margin: 0;
  }
  .words-list-tile__divider {
    margin: 0.5em 0;
  }
  .words-list-tile__preview {
    display: flex;
    flex-direction: column;
    padding: 0;
    color: lightgray;
  }
</style>
