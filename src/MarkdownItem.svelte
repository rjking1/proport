<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";
  import { marked } from 'marked'

  export let item;
  export let onDelete;
  
  // let mermaid;
  let markdown = item.Text;
  console.log(markdown)

</script>

 <h1>test</h1>

<div class="inner">
  <!-- Convert the markdown to HTML and display it -->
  <div>{@html marked(markdown)}</div>
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