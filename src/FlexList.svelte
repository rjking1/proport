<script>
  import ProjectHeader from "./ProjectHeader.svelte";
  import FlexItem from "./FlexItem.svelte";
  import { Table } from "flowbite-svelte";

  export let items;
  export let onSelect;
  export let bg;

  let selectedName = '';

  function handleSelect(item) {
    console.log("FlexList handling select for item=", item)
    selectedName = item.Name;
    console.log(selectedName)
    onSelect(item);
  }
</script>

<!-- <ProjectHeader /> -->
<div class="flex" style="background-color:{bg};">
  {#each items as item}
    <FlexItem item={item} onSelect={() => handleSelect(item)} highlight={item.Name===selectedName} />
  {/each}
</div>
