<script>
  import { Button } from "flowbite-svelte";

  export let item;
  export let onDelete;

  let src = item.Text;

</script>

<div class="outer">
  <img class="inner" src={src} alt="missing" />
  <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
</div>

<style>
  .outer {
    max-width: 500px;
  }
  .inner {
    max-width: 100%; height:auto;
  }
</style>