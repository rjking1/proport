<script lang="ts">
  import { doFetch } from "./common";
  import { dbN } from "./stores";
  import ItemList from "./ItemList.svelte";

  import { onMount } from "svelte";

  import { Heading, Button } from "flowbite-svelte";
  import { push, querystring } from "svelte-spa-router";

  // export let onEdit;
  let project_id = $querystring;

  console.log(project_id);

  let qresult = null;

  onMount(async () => {
    await doList();
  });

  async function doList() {
    //id = '' // revert to Add mode

    qresult = await doFetch(
      $dbN,
      "select * from items where project_id=" + project_id
    );
  }

  function handleAddText() {
    push("/addtext?" + project_id);
  }

  function handleAddImage() {
    push("/addimage?" + project_id);
  }

  function handleEdit(item) {
    // onEdit(ride);
    push(`/add?${item.id}`);
  }
</script>

<!-- <button type="button" on:click={doList}>List</button> -->

<!-- <Button class="ml-4 mt-4 mb-4" on:click={handleAdd}>Add new item</Button> -->
<br>
<Heading tag="h5" class="ml-4">Project X</Heading>
{#if qresult}
  <ItemList items={qresult} />
{/if}
<Button class="ml-4 mt-4 mb-4" on:click={handleAddText}>Add text</Button>
<Button class="ml-4 mt-4 mb-4" on:click={handleAddImage}>Add image</Button>
