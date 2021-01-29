<script lang="ts">
  import type { Words } from '../models/WordsModels';

  export let words: Words;
</script>

<li class="words-list-tile">
  <h3>{ words.title ?? 'Unknown title' }</h3>
  <ul>
    {#each words.items as wordsPair}
      <li>{wordsPair.word} - {wordsPair.translation}</li>
    {/each}
  </ul>
</li>

<style>
  .words-list-tile {
    display: block;
    background-color: whitesmoke;
    padding: 1em;
    cursor: pointer;
    box-shadow: 5px 5px 5px 2px rgba(0, 0, 0, .1);
  }
  .words-list-tile:not(:first-of-type) {
    margin-left: 1.2em;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  li {
    list-style-type: none;
  }
</style>