<script>
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";
  import { pop } from "svelte-spa-router";

  import TextItem from "./TextItem.svelte";
  import ImageItem from "./ImageItem.svelte";

  export let items;

  async function handleDelete(id) {
    console.log("onDelete called back in itemList with id=", id)
    let qresult = await doFetch(
      $dbN,
      `delete from items where id=${id}` 
    );
    console.log(qresult);
  }

</script>

<!-- <h1>Items</h1> -->
<br>
{#each items as item}
  {#if item.Name != "image"}
    <TextItem text={item.Text} onDelete={(item) => handleDelete(item.id)} />
  {:else}  
    <ImageItem blob={item.Text} />
  {/if}
{/each}
