<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";
  import { marked } from 'marked'

  export let item;
  export let onDelete;
  export let onEdit;
  export let onMove;
  
  let markdown = item.Text;

  let editing = false;

  function doUpdate() {
    editing=false;
    onEdit(item.ID, markdown)
  }

</script>

<div class="container">
  <div class="contents">
    <div>
      {@html marked(markdown)}
    </div>
  </div>
  <div class="buttons">
    {#if $permissions}
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
    <Button color="purple"  class="m-1 p-1" on:click={()=>{editing = !editing}}>Edit</Button>
    <Button color="yellow"  class="m-1 p-1" on:click={onDelete(item.ID)}>Delete</Button>
    {/if}
  </div>
</div>
{#if editing}
<div class="editor">
  <div>
    Editing...
    <br>
    <textarea bind:value={markdown}></textarea>
  </div>
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
    display:flex;
    position: relative;
    min-height: 155px;
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
  .editor {
    margin: 0.5em;
    margin-top: -0.5em;
    padding: 0.5em;
    background-color: ivory;
    max-width: 1536px;
  }
  textarea {
    field-sizing: content;
    width: 98%;
    min-height: 150px;
    max-width: 1536px;
  }
</style>