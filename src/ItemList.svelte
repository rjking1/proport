<script>
  import TextItem from "./TextItem.svelte";
  import ImageItem from "./ImageItem.svelte";

  export let items;

</script>

<!-- <h1>Items</h1> -->
<br>
{#each items as item}
  <!-- {item.Name} -->
  {#if item.Name != "image"}
    <TextItem text={item.Text} />
  {:else}  
    <ImageItem blob={item.Text} />
  {/if}
{/each}
