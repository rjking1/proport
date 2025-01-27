<script>
  import { Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";
  import mermaid from 'mermaid';

  export let item;
  export let onDelete;
  export let onEdit;
  
  let diagram = item.Text;
  
  let editing = false;

  let container = "";

  // may not be necessary to onMount()
  // onMount(async () => {
    // await 
    renderDiagram();
  // });

  async function renderDiagram() {
    // console.log(diagram)
    if(await mermaid.parse(diagram)) {
      const {svg} = await mermaid.render('mermaid' + Math.trunc(Math.random() * 1000000), diagram)
      console.log(svg)
      container.innerHTML=svg;
    } else {
      // alert("parse error")
    }
  }

  function doUpdate() {
    editing=false;
    onEdit(item.ID, diagram)
  }

  $: diagram && renderDiagram()

</script>

<div class="outer">
  <div class="inner">
    <div bind:this={container}></div>
  </div>
  <div class="inner">
    {#if $permissions}
    <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
    <Button color="purple"  class="m-4" on:click={()=>{editing = !editing}}>Edit</Button>
    <Button color="green"  class="m-4" on:click={()=>doUpdate()}>Update</Button>
    {/if}
    {#if editing}
      <textarea bind:value={diagram}/>
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
    min-width:800px;
    height:auto;
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
  }
  .inner {
    min-width: 800px;
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