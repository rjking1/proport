<script lang="ts">
  import FlexList from "./FlexList.svelte";

  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  import { onMount } from "svelte";

  import ProjectList from "./ProjectList.svelte";
  // import { Button, Heading } from "flowbite-svelte";
  import { push } from "svelte-spa-router";

  // export let onEdit;
  let user_id = $permissions["u_id"];

  let qresult = null;
  let interests = null;
  let portfolios = null;
  let projects = null;

  let selectedPortfolio;

  onMount(async () => {
    await queryInterests();
  });

  async function queryInterests() {
    interests = await doFetch(
      $dbN,
      `select ID, Name from interests where user_id=${user_id} order by id`
    );
  }

  async function queryPortfolios(interest_id) {
    portfolios = await doFetch(
      $dbN,
      `select ID, Name from portfolios where interest_id=${interest_id} order by id`
    );
  }

  async function queryProjects(portfolio_id) {
    projects = await doFetch(
      $dbN,
      `select ID, Name, Progress from projects where portfolio_id=${portfolio_id} order by id`
    );
  }

  async function interestSelected(interest) {
    // onEdit(ride);
    console.log("interest selected", interest)
    await queryPortfolios(interest.ID)
    projects=undefined;
  }

  async function portfolioSelected(portfolio) {
    // onEdit(ride);
    console.log("portfolio selected", portfolio)
    selectedPortfolio = portfolio;
    await queryProjects(portfolio.ID)
  }

  async function projectSelected(project) {
    // onEdit(ride);
    console.log("portfolio selected", project)
    push(`/project?${project.ID}`);
  }

</script>

<!-- <button type="button" on:click={doList}>List</button> -->

<!-- <Heading tag="h5" class="ml-4">Interests</Heading> -->
<!-- <ProjectList projects={qresult} onEdit={(item) => handleEdit(item)} /> -->
{#if interests}
  <FlexList parent_id=0 what="Interest" items={interests} bg="PapayaWhip"  onSelect={(item) => interestSelected(item)} />
{/if}
<hr>
{#if portfolios}
  <FlexList parent_id=0 what="Portfolio" items={portfolios} bg="#D9FEE5" onSelect={(item) => portfolioSelected(item)} />
{/if}
<hr>
{#if projects}
  <FlexList parent_id={selectedPortfolio.ID} what="Project" items={projects} bg="aliceblue"  onSelect={(item) => projectSelected(item)} />
{/if}
