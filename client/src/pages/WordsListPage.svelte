<script lang="ts">
  import Button from '../components/Button.svelte';
  import { wordsList } from '../stores/WordsStore';

</script>

<main>
  <Button title="Создать список" />

  <ul>
    {#each $wordsList as wordsItem}
    <li>{ wordsItem.title ?? 'Unknown title' }</li>
    {/each}
  </ul>
  
</main>

<style>
  
</style>