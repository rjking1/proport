<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";
  import { marked } from 'marked'

  export let item;
  export let onDelete;
  export let onEdit;
  
  let markdown = item.Text;

  let editing = false;

  function doUpdate() {
    editing=false;
    onEdit(item.ID, markdown)
  }

</script>

<div class="outer">
  <div class="left">
    <div>{@html marked(markdown)}</div>
  </div>
  <div class="inner">
    {#if $permissions}
    <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
    <Button color="purple"  class="m-4" on:click={()=>{editing = !editing}}>Edit</Button>
    <Button color="green"  class="m-4" on:click={()=>doUpdate()}>Update</Button>
    {/if}
    <!-- Convert the markdown to HTML and display it -->
    {#if editing}
      <textarea bind:value={markdown}/>
    {/if}
  </div>
</div>

<style>
  .outer {
    display:flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .left{
    max-width:800px;
    height:auto;
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
  }
  .inner {
    max-width: 800px;
    height:auto;
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
  }
  textarea {
    field-sizing: content;
    width: 100%;
    max-width: 1024px;
    max-height: 30em;
  }
</style>