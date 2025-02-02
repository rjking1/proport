<script>
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  import TextItem from "./TextItem.svelte";
  import ImageItem from "./ImageItem.svelte";
  import MermaidItem from "./MermaidItem.svelte";
  import MarkdownItem from "./MarkdownItem.svelte";

  // export let project_id;
  export let items;
  export let onRefresh;

  async function handleEdit(id,text) {
    console.log("onEdit called back in itemList with id=", id, "text=", text)

    let qresult = await doFetch(
        $dbN,
        `update items set text='${text.replace(/'/g, "''")}' where id=${id}` 
      );
    console.log(qresult);
  }

  async function handleDelete(id) {
    console.log("onDelete called back in itemList with id=", id)
    if(confirm(`Are you sure you want to delete this item?`)) {
      let qresult = await doFetch(
        $dbN,
        `delete from items where id=${id}` 
      );
      console.log(qresult);
      await onRefresh();
      // qresult = await doFetch(
      //   $dbN,
      //   `select p.name as p_name, i.* from projects p join items i on p.id = i.project_id where p.id=${project_id} order by i.id desc` 
      // );
      // console.log(qresult);
      // items = qresult;
    }
  }

  async function handleMove(id, projID, currSortOrder, dir) {
    console.log("onMove called back in itemList with id=", id, "projID=", projID, "curr=", currSortOrder, "dir=", dir)
    let qresult;
    if(dir === "down"){
      // get one lower (previous)
      qresult = await doFetch(
        $dbN, `select id,sortorder from items where Project_ID=${projID} and sortorder < ${currSortOrder} order by sortorder desc limit 1`
      ); 
    } else {
      // get one higher (next)
      qresult = await doFetch(
        $dbN, `select id,sortorder from items where Project_ID=${projID} and sortorder > ${currSortOrder} order by sortorder asc limit 1`
      );
    }

    const swapID = qresult[0]['id'];
    const swapSortOrder = qresult[0]['sortorder'];
    console.log("swapID=",swapID, "swap=",swapSortOrder)

    qresult = await doFetch(
      $dbN, `update items set sortorder=${currSortOrder} where id=${swapID}`
    );    
    qresult = await doFetch(
      $dbN, `update items set sortorder=${swapSortOrder} where id=${id}`
    );
    // console.log(qresult);
    await onRefresh();
  }

</script>

<!-- <h1>Items</h1> -->
<br>
{#each items as item}
  {#if item.Name == "text"}
    <TextItem item={item} onDelete={(id)=>handleDelete(id)} onEdit={(id, text)=>handleEdit(id,text)} onMove={(id, projID, currSortOrder, dir)=>handleMove(id, projID, currSortOrder, dir)} />
  {/if}
  {#if item.Name == "image"}
    <ImageItem item={item} onDelete={(id)=>handleDelete(id)} onEdit={(id, text)=>handleEdit(id,text)} onMove={(id, projID, currSortOrder, dir)=>handleMove(id, projID, currSortOrder, dir)} />
  {/if}
  {#if item.Name == "mermaid"}
    <MermaidItem item={item} onDelete={(id)=>handleDelete(id)} onEdit={(id, text)=>handleEdit(id,text)} onMove={(id, projID, currSortOrder, dir)=>handleMove(id, projID, currSortOrder, dir)} />
  {/if}  
  {#if item.Name == "markdown"}
    <MarkdownItem item={item} onDelete={(id)=>handleDelete(id)} onEdit={(id, text)=>handleEdit(id,text)} onMove={(id, projID, currSortOrder, dir)=>handleMove(id, projID, currSortOrder, dir)} />
  {/if}
{/each}
