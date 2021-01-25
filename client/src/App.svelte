<script lang="ts">
  import Modal from './components/Modal.svelte';
	import WordsListPage from './pages/WordsListPage.svelte'

	export let name: string;
</script>

<main>
	<WordsListPage />
	{#if false}
    <Modal>Hello</Modal>
  {/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>