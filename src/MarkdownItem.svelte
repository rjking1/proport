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
    onEdit(item.ID, diagram)
  }

</script>

<div class="inner">
  <!-- Convert the markdown to HTML and display it -->
  <div>{@html marked(markdown)}</div>
  {#if editing}
  <textarea bind:value={markdown}/>
  {/if}
  {#if $permissions}
  <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
  <Button color="purple"  class="m-4" on:click={()=>{editing = !editing}}>Edit</Button>
  <Button color="green"  class="m-4" on:click={()=>doUpdate()}>Update</Button>
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

  .x {
    margin: 1em;  
  }
  textarea {
    field-sizing: content;
    width: 100%;
    max-width: 1024px;
    max-height: 30em;
  }
</style>