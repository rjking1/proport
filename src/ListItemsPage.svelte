<script lang="ts">
  import { doFetch } from "./common";
  import { dbN } from "./stores";
  import ItemList from "./ItemList.svelte";

  import { onMount } from "svelte";

  import { Heading, Button } from "flowbite-svelte";
  import { push, querystring } from "svelte-spa-router";

  // export let onEdit;
  // export let project_id;

  console.log($querystring);

  let qresult = null;

  onMount(async () => {
    await doList();
  });

  async function doList() {
    //id = '' // revert to Add mode

    qresult = await doFetch(
      $dbN,
      "select * from items where project_id=" + $querystring
    );
  }

  function handleAdd() {
    push("/add?0");
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
<Button class="ml-4 mt-4 mb-4" on:click={handleAdd}>Add new item</Button>
