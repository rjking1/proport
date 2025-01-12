<script>
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";
  import { pop } from "svelte-spa-router";

  import TextItem from "./TextItem.svelte";
  import ImageItem from "./ImageItem.svelte";

  export let project_id;
  export let items;

  async function handleDelete(id) {
    console.log("onDelete called back in itemList with id=", id)
    let qresult = await doFetch(
      $dbN,
      `delete from items where id=${id}` 
    );
    console.log(qresult);
    qresult = await doFetch(
      $dbN,
      `select p.name as p_name, i.* from projects p join items i on p.id = i.project_id where p.id=${project_id} order by i.id desc` 
    );
    console.log(qresult);
    items = qresult;
  }
</script>

<!-- <h1>Items</h1> -->
<br>
{#each items as item}
  {#if item.Name != "image"}
    <TextItem item={item} onDelete={(id)=>handleDelete(id)} />
  {:else}  
    <ImageItem item={item} onDelete={(id)=>handleDelete(id)} />
  {/if}
{/each}
