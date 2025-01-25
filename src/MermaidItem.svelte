<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";
  import mermaid from 'mermaid';

  export let item;
  export let onDelete;
  
  // let mermaid;
  let diagram = item.Text;

  let container;

  onMount(async () => {
    await renderDiagram();
        // mermaid = (await import('mermaid')).default;
        // mermaid.init()
    });

  async function renderDiagram() {
    console.log(diagram)
    const {svg} = await mermaid.render('mermaid', diagram)
    container.innerHTML=svg;
  }

</script>

<div class="inner">
  <span bind:this={container}>
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