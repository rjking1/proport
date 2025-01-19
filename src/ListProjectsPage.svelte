<script lang="ts">
  import FlexList from "./FlexList.svelte";

  import { doFetch } from "./common";
  import { dbN, permissions, selections } from "./stores";

  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  export let params
  let user_id = params['uid'];

  $dbN = localStorage.dbN;

  let interests = null;
  let portfolios = null;
  let projects = null;

  let selectedInterestID;
  let selectedPortfolioID;
  let selectedProjectID;

  onMount(async () => {
    // if ($permissions == undefined) {
    //   push("/") // force relogin
    // } else {
      await setSelections();
    // }
  }); 
  
  async function setSelections() {
    await queryInterests();
    if($selections != undefined) {
      selectedInterestID = $selections[0];
      selectedPortfolioID = $selections[1]
      selectedProjectID = $selections[2]
      // await queryPortfolios(selectedInterestID);
      // await queryProjects(selectedPortfolioID);
      await interestSelected(selectedInterestID);
      await portfolioSelected(selectedPortfolioID);
      // selected project?
    }
  }
  
  async function queryInterests() {
    interests = await doFetch(
      $dbN,
      // `select ID, Name from interests where user_id=${user_id} order by id desc`
      `select j.ID as ID, j.Name as Name, 'image' as type,
      (select i.Text from projects p 
        join items i on i.project_id=p.id and i.name='image'
        join portfolios f on p.portfolio_id=f.id
        where f.interest_id=j.id order by rand() limit 1 ) as Text
      from interests j where user_id=${user_id} order by id desc`
    );
  }

  async function queryPortfolios(interest_id) {
    portfolios = await doFetch(
      $dbN,
      // `select ID, Name from portfolios where interest_id=${interest_id} order by id desc`

      // random image from  all project items under each portfoiio, if exists
      // what magic is the order by rand() ??
      `select f.ID as ID, f.Name as Name, 'image' as type,
      (select i.Text from projects p  join items i on i.project_id=p.id and i.name='image'  
        where p.portfolio_id=f.id order by rand() limit 1 ) as Text
      from portfolios f where f.interest_id=${interest_id} order by id desc`
      );
    // console.log(portfolios);
  }

  async function queryProjects(portfolio_id) {
    projects = await doFetch(
      $dbN,
      // `select ID, Name, Progress from projects where portfolio_id=${portfolio_id} order by id`
      `select p.ID, p.Name, i.Name as type, i.Text from projects p left join items i on i.project_id=p.id and 
        i.ID = (select max(ID) from items where project_id=p.ID and Name='image'
        ) where portfolio_id=${portfolio_id} order by id desc`
    );
  }

  async function interestSelected(interestID) {
    console.log("interest selected", interestID)
    selectedInterestID = interestID;
    await queryPortfolios(selectedInterestID)
    projects=undefined;
  }

  async function portfolioSelected(portfolioID) {
    console.log("portfolio selected", portfolioID)
    selectedPortfolioID = portfolioID;
    await queryProjects(selectedPortfolioID)
  }

  async function projectSelected(projectID) {
    console.log("project selected", projectID)
    selectedProjectID = projectID // for reselecting after return to this page

    $selections = [
      selectedInterestID,
      selectedPortfolioID,
      selectedProjectID
    ];

    push(`/project/${user_id}/${selectedProjectID}`);
  }

  // async function interestListAltered() {
  //   await queryInterests();
  // }
</script>

<!-- <button type="button" on:click={doList}>List</button> -->

<!-- <Heading tag="h5" class="ml-4">Interests</Heading> -->
<!-- <ProjectList projects={qresult} onEdit={(item) => handleEdit(item)} /> -->
{#if interests}
  <FlexList parent_id=0 selected_id={selectedInterestID} what="Interest" items={interests} bg="PapayaWhip"  onSelect={async(item) => await interestSelected(item.ID)} onRefresh={async ()=>await queryInterests()} />
{/if}
<hr>
{#if portfolios}
  <FlexList parent_id={selectedInterestID} selected_id={selectedPortfolioID} what="Portfolio" items={portfolios} bg="#D9FEE5" onSelect={async(item) => await portfolioSelected(item.ID)} onRefresh={async ()=>await queryPortfolios(selectedInterestID)} />
{/if}
<hr>
{#if projects}
  <FlexList parent_id={selectedPortfolioID} selected_id={selectedProjectID} what="Project" items={projects} bg="aliceblue"  onSelect={async(item) => await projectSelected(item.ID)} onRefresh={async ()=> await queryProjects(selectedPortfolioID)} />
{/if}
