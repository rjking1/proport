<script>
  import { Textarea, P, Button } from "flowbite-svelte";

  export let item;
  export let onSelect;
  export let highlight;

</script>

<div class="region {highlight===true?'hi':''}" on:click={() => onSelect(item)}>
  <span>{item.Name}</span>
</div>

<style>
  .region {
    height: 100px;
    width: 300px;
    background-color: ghostwhite;
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    text-align: center;
    vertical-align: auto  ;
  }
  .hi {
    background-color: yellow;
  }
</style>
