<script lang="ts">
  import { onMount } from 'svelte';
  import Button from "../components/Button.svelte";
  import WordsListTile from "../components/WordsListTile.svelte";
  import { wordsList } from "../stores/WordsStore";

  function addNewWordsItem() {
    wordsList.addWords();
  }

  onMount(async () => {
    const response = await fetch(
      "https://d5dlmshm71fmfl4smcq6.apigw.yandexcloud.net/words/list"
    );
    const data = await response.json();
    data.forEach(item => wordsList.addWords(item));
  });
</script>

<Button title="Создать список" fun={addNewWordsItem} />

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
