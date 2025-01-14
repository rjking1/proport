<script>
  import { Textarea, P, Button } from "flowbite-svelte";

  export let item;
  export let onSelect;
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
<div class="region" style="background-color:{col(highlight)}; border:{bdr(highlight)};" on:click={() => onSelect(item)}>
  <span><b>{item.Name}</b></span>
  {#if item.type === 'text'}
    <br><span><small>{item.Text.slice(0,180)}</small></span>
  {/if}
  {#if item.type === 'image'}
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
    padding: 10px;
    margin: 10px;
    text-align: center;
    vertical-align: auto  ;
  }
</style>
