<script lang="ts">
  import { wordsList } from '../stores/WordsStore';
  import type { WordsRouterParams } from '../models/RouterModels';
  import { Direction } from '../models/WordsModels';

  export let params: WordsRouterParams = { id: '' };

  let words = $wordsList.find((item) => item.id === params.id);
  let direction = Direction.Forward;
  let inputs: string[] = new Array($wordsList.length + 1).fill('');
  let results: boolean[] = new Array($wordsList.length + 1).fill(null);
  const classMap = new Map([
    [true, 'correct'],
    [false, 'wrong'],
    [null, ''],
  ]);

  function changeDirection() {
		direction = direction === Direction.Forward ? Direction.Backward : Direction.Forward;
	}

  function checkAnswers() {
		inputs.forEach((input, i) => {
      results[i] = words.items[i][direction === Direction.Forward ? 'translation' : 'word'].toLowerCase() === input.trim().toLowerCase();
    });
	}
</script>

<h1 class="words__title">{words.title ?? "Unknown title"}</h1>
<p>Direction: {direction}</p>
<button on:click={changeDirection}>Change direction</button>
<ul class="words__list">
  {#each words.items as { word, translation }, i}
    <li class="words__pair">
      {#if direction === Direction.Forward}
        <span>{word} - </span>
      {:else}
        <span>{translation} - </span>
      {/if}
      <input type="text" bind:value={inputs[i]} class={classMap.get(results[i])} />
    </li>
  {/each}
</ul>
<button on:click={checkAnswers}>Check answers</button>

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
  .correct {
    border: 1px solid yellowgreen;
  }
  .wrong {
    border: 1px solid tomato;
  }
</style>
