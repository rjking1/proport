<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";

  export let item;
  export let onDelete;
  export let onMove;

  let src = item.Text;

</script>

<div class="inner">
  <img  src={src} alt="not found" />
  {#if $permissions}
  <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
  <Button color="blue" class="m-4" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
  <Button color="blue" class="m-4" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
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