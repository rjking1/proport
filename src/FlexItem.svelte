<script>
  import { Tooltip } from "flowbite-svelte";
  import { permissions } from "./stores";

  export let item;
  export let onAction;
  export let highlight;
  export let bg;

  function col(highlight) {
    return highlight === true ? "lightgoldenrodyellow" : bg;  
  }

  function bdr(highlight) {
    return highlight === true ? "2px solid black" : "1px solid black"; 
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="region" style="background-color:{col(highlight)}; border:{bdr(highlight)};" on:click={() => onAction('sel', item)}>
  <span>
    <b>{item.Name}</b>
    {#if $permissions}
      <span class="rjust toggleVis">
        {#if item.Shared === '0'}
        <button on:click|stopPropagation={async()=> await onAction('share', item)}>☐</button>
        <Tooltip>Shared?</Tooltip>
        {/if}
        <button on:click|stopPropagation={async()=> await onAction('ren', item)}>✎</button>
        <Tooltip>Rename</Tooltip>
        <button on:click|stopPropagation={async()=> await onAction('del', item)}>🗑</button>
        <Tooltip>Delete</Tooltip>
      </span>
      <span>
        {#if item.Shared === '1'}
        <button on:click|stopPropagation={async()=> await onAction('share', item)}>✅</button>
        <Tooltip>Shared?</Tooltip>
        {/if}
      </span>
    {/if}
  </span>

  <!-- {#if item.Shared == undefined}
    <span style="font-size:200%">🕸</span>
  {/if} -->

  {#if item.type === 'text'}
    <div class="img_outer">
      <div class="img_inner"><small>{item.Text}</small></div>
    </div>
  {/if}
  {#if item.type === 'image' && item.Text != null}
    <div class="img_outer">
      <div class="img_inner"><img src={item.Text} alt="x"/></div>
    </div>
  {/if}
</div>

<style>
  .img_outer {
    height: 120px;
    display:flex;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    margin:5px;
  }
  .img_inner {
    width:150px;
  }
  .region {
    height: 180px;
    width: 300px;
    /* border: 1px solid black; */
    border-radius: 5px;
    padding: 5px;
    margin: 7px;
    xtext-align: center;
  }
  .rjust {
    float:right;
  }
  .toggleVis:hover{opacity:1; transition-delay:0.5s;}
  .toggleVis{opacity:0;}
</style>
