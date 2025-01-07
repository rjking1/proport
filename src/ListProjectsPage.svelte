<script lang="ts">
  import { doFetch } from "./common";
  import { dbN } from "./stores";

  import { onMount } from "svelte";

  import ProjectList from "./ProjectList.svelte";
  // import { Button, Heading } from "flowbite-svelte";
  import { push } from "svelte-spa-router";

  // export let onEdit;

  let qresult = null;

  onMount(async () => {
    await doList();
  });

  async function doList() {
    //id = '' // revert to Add mode

    qresult = await doFetch(
      $dbN,
      "select pr.id as ID, i.Name as Interest, po.Name as Portfolio, pr.Name as Project, pr.Progress as Progress from interests i join portfolios po on po.interest_id=i.ID join projects pr on pr.portfolio_ID=po.ID"
    );
  }

  function handleEdit(item) {
    // onEdit(ride);
    console.log(item)
    push(`/project?${item.ID}`);
  }
</script>

<!-- <button type="button" on:click={doList}>List</button> -->

<!-- <Heading tag="h5" class="ml-4">Interests</Heading> -->
{#if qresult}
  <ProjectList projects={qresult} onEdit={(item) => handleEdit(item)} />
{/if}
