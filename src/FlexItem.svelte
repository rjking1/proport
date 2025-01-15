<script>
  import { Button, Popover } from "flowbite-svelte";

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

  function onRename(item) {
    let newName = prompt("New name", item.Name)
    // replace into ...
  }

  function onDelete(item) {
    if(confirm("Are you sure you want to delete " + item.Name + "?")) {
      // delete from ...
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="region" style="background-color:{col(highlight)}; border:{bdr(highlight)};" on:click={() => onSelect(item)}>
  <span><b>{item.Name}</b></span>

  <Button id="b2" color="none" >...</Button>
  <Popover triggeredBy="#b2" class="w-48  text-sm font-light text-gray-500 bg-white dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
    <div class="p-3">
      <div class="flex justify-between items-center mb-2">
        <Button size="xs" on:click={()=> onRename(item)}>Rename</Button>
        <Button size="xs" on:click={()=> onDelete(item)}>Delete</Button>
      </div>
    </div>
  </Popover>

  {#if item.type === 'text'}
    <div class="img_outer">
      <div class="img_inner"><small>{item.Text}</small></div>
    </div>
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
  }
</style>
