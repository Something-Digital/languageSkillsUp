<script lang="ts">
  export let title: string = 'Submit';
  export let fun;
</script>

<button on:click={fun}>{ title }</button>