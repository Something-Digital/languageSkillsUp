<script lang="ts">
import Button from '../components/Button.svelte';
import WordsListTile from '../components/WordsListTile.svelte';
import { wordsList } from '../stores/WordsStore';

</script>

<main>
  <Button title="Создать список" />

  <ul>
    {#each $wordsList as words}
      <WordsListTile {words} />
    {/each}
  </ul>
  
</main>

<style>
  ul {
    padding: 0;
    display: flex;
  }
</style>