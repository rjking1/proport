<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";

  export let item;
  export let onDelete;
  export let onMove;

  let src = item.Text;

</script>

<div class="container">
  <div class="contents">
    <img  src={src} alt="not found" />
  </div>
  {#if $permissions}
  <div class="buttons">
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
    <Button color="yellow"  class="m-1 p-1" on:click={onDelete(item.ID)}>Delete</Button>
  </div>
  {/if}
</div>

<style>
  .container {
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
    width: 100%;
    display:flex;
    position: relative;
  }
  .contents {
    width: 100%;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    position:absolute;
    right: 2%;
    opacity:0.1;
  }
  .buttons:hover {
    opacity: 1;
  }
</style>