<script lang="ts">
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";
  import ItemList from "./ItemList.svelte";

  import { onMount } from "svelte";

  import { Heading, Button } from "flowbite-svelte";
  import { push, querystring } from "svelte-spa-router";

  // export let onEdit;
  let project_id = $querystring;
  let user_id = $permissions["u_id"];

  // console.log(project_id);

  let qresult = null;

  onMount(async () => {
    await doList();
  });

  async function doList() {
    //id = '' // revert to Add mode
    qresult = await doFetch(
      $dbN,
      `select p.name as p_name, i.* from projects p join items i on p.id = i.project_id where p.user_id=${user_id} and p.id=${project_id} order by i.id` 
    );
    console.log(qresult);
  }

  function handleAddText() {
    push("/addtext?" + project_id);
  }

  function handleAddImage() {
    push("/addimage?" + project_id);
  }

  function handleEdit(item) {
    // onEdit(ride);
    // push(`/add?${item.id}`);
  }
</script>

<!-- <button type="button" on:click={doList}>List</button> -->

<!-- <Button class="ml-4 mt-4 mb-4" on:click={handleAdd}>Add new item</Button> -->
<br>
{#if qresult}
  <Heading tag="h5" class="ml-4">Project {qresult[0]["p_name"]}</Heading>
  <ItemList items={qresult} />
{/if}
<Button class="ml-4 mt-4 mb-4" on:click={handleAddText}>Add text</Button>
<Button class="ml-4 mt-4 mb-4" on:click={handleAddImage}>Add image</Button>
