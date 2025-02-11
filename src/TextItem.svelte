<script>
  import { Textarea, Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";

  export let item;
  export let onDelete;
  export let onEdit;
  export let onMove;

  let editing = false;

  function doUpdate() {
    editing=false;
    onEdit(item.ID, item.Text)
  }
</script>

<div class="container">
  <div class="contents">
    {#if editing}
    <textarea bind:value={item.Text}>{item.Text}</textarea>
    {:else}
    <textarea bind:value={item.Text} readonly>{item.Text}</textarea>
    {/if}
    <!-- <span><small>{item.DateTime}</small></span> -->
  </div>
  {#if $permissions}
  <div class="buttons">
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
    <Button color="purple"  class="m-1 p-1" on:click={()=>{editing = !editing}}>Edit</Button>
    <Button color="yellow" class="m-1 p-1" on:click={()=>onDelete(item.ID)}>Delete</Button>
  </div>
  {/if}
</div>
{#if editing}
<div class="editor">
  <div>
    <Button color="green"  class="m-1 p-1" on:click={()=>doUpdate()}>Update</Button>
  </div>
</div>
{/if}

<style>
  .container {
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
    width: 100%;
    max-width: 1200px;
    display:flex;
    position: relative;
  }
  .contents {
    width: 100%
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
  .editor {
    margin: 0.5em;
    margin-top: -0.5em;
    padding: 0.5em;
    background-color: ivory;
    max-width: 1536px;
  }</style>
