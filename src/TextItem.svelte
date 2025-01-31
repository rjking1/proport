<script>
  import { Textarea, Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";

  export let item;
  export let onDelete;
  export let onEdit;
  export let onMove;
</script>

<div class="container">
  <div class="contents">
    <textarea bind:value={item.Text}>{item.Text}</textarea>
    <!-- <span><small>{item.DateTime}</small></span> -->
  </div>
  {#if $permissions}
  <div class="buttons">
    <Button color="yellow" class="m-1 p-1" on:click={()=>onDelete(item.ID)}>Delete</Button>
    <Button color="green" class="m-1 p-1" on:click={()=>onEdit(item.ID, item.Text)}>Update</Button>
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
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
  textarea {
    field-sizing: content;
    width: 100%;
    min-height: 150px;
  }
</style>
