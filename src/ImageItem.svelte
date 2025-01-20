<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";

  export let item;
  export let onDelete;

  let src = item.Text;

</script>

<div class="inner">
  <img  src={src} alt="not found" />
  {#if $permissions}
  <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
  {/if}
</div>

<style>
  .inner {
    max-width: 100%; 
    height:auto;
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
  }
</style>