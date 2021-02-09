<script lang="ts">
  import Button from "../components/Button.svelte";
  import WordsListTile from "../components/WordsListTile.svelte";
  import { wordsList } from "../stores/WordsStore";
</script>

<Button title="Создать список" fun={() => wordsList.addWords()} />

<ul>
  {#each $wordsList as words}
    <WordsListTile {words} />
  {/each}
</ul>

<style>
  ul {
    padding: 0;
    display: flex;
  }
</style>
