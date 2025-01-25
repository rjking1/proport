<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";
  import mermaid from 'mermaid';

  export let item;
  export let onDelete;
  
  // let mermaid;
  let diagram = item.Text;

  let container = "";

  // may not be necessary to onMount()
  // onMount(async () => {
    // await 
    renderDiagram();
  // });

  async function renderDiagram() {
    console.log(diagram)
    const {svg} = await mermaid.render('mermaid' + Math.trunc(Math.random() * 1000000), diagram)
    // console.log(svg)
    container.innerHTML=svg;
  }

</script>

<div class="inner">
  <div bind:this={container}></div>
  <pre>
    {diagram}
  </pre>
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
    position: relative;
  }
</style>