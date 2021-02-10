<script lang="ts">
  import { wordsList } from '../stores/WordsStore';
  import type { WordsRouterParams } from '../models/RouterModels';
  import { Direction } from '../models/WordsModels';

  export let params: WordsRouterParams = { id: '' };

  let words = $wordsList.find((item) => item.id === params.id);
  let direction = Direction.Forward;

  function changeDirection() {
		direction = direction === Direction.Forward ? Direction.Backward : Direction.Forward;
	}
</script>

<h1 class="words__title">{words.title ?? "Unknown title"}</h1>
<p>Direction: {direction}</p>
<button on:click={changeDirection}>Change direction</button>
<ul class="words__list">
  {#each words.items as wordsPair}
    <li class="words__pair">
      {#if direction === Direction.Forward}
        <span>{wordsPair.word} - </span><input type="text" />
      {:else}
        <span>{wordsPair.translation} - </span><input type="text" />
      {/if}
    </li>
  {/each}
</ul>

<style>
  .words__title {
  }
  .words__list {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .words__pair {
    list-style-type: none;
  }
</style>
