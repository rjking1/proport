<script>
  import FlexItem from "./FlexItem.svelte";

  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  export let what;
  export let parent_id;
  export let selected_id;
  export let items;
  export let onSelect;
  export let onRefresh;
  export let bg;

  function tableName() {
    // if(what=='Interest') return 'interests';
    return what.toLowerCase() + 's';
  }

  async function handleAction(action, item) {
    // console.log("FlexList handling select for item=", item)
    if(action=='sel') {
      selected_id = item.ID;
      await onSelect(item);
    }
    if(action=='del') {
      if(confirm(`Are you sure you want to delete "${item.Name}"?`)) {
        console.log(item.ID)
        await doFetch(
          $dbN,
          `delete from ${tableName()} where ID=${item.ID}`
        );     
        await onRefresh(); 
      }
    }
    if(action=='ren') {
      let newName = prompt("New name", item.Name)
      newName = newName.replace(/'/g, "''") 
      await doFetch(
          $dbN,
          `update ${tableName()} set Name='${newName}' where ID=${item.ID}`
        );     
      await onRefresh(); 
    }
  }

  // function handleAlter(item) {
  //   onAdded(item)
  // }

  async function doAdd() {
    if ($permissions == undefined) {
      $permissions = localStorage.permissions;
    }
    let name = prompt(`${what} name`)
    if(name !== null){
      name = name.replace(/'/g, "''");
      if(what==="Project"){
        // items.push({Name:`${name}`})
        // console.log(items)
        await doFetch(
          $dbN,
          `insert into projects(Name,Portfolio_ID,User_ID,Progress) values ('${name}',${parent_id},${$permissions["u_id"]},'idea')`
        );      
        onRefresh();
        // alert(`Please click on parent folder to refresh`)
      }
      else if(what === "Portfolio") {
        await doFetch(
          $dbN,
          `insert into portfolios(Name,Interest_ID,User_ID) values ('${name}',${parent_id},${$permissions["u_id"]})`
        );  
        onRefresh();    
        // alert(`Please click on parent folder to refresh`)
      }
      else if(what === "Interest") {
        await doFetch(
          $dbN,
          `insert into interests(Name,User_ID) values ('${name}',${$permissions["u_id"]})`
        );      
        onRefresh(); // do same for all as then the list is auto redrawn
      }
    }
    else {
      // alert("Not implemented yet")
    }
  }
</script>

<!-- <ProjectHeader /> -->
<div class="itemlist">
  {#if $permissions}
  <button style="width:60px" on:click={doAdd}>
    &nbsp;Add<br>&nbsp;{what}
  </button>
  {/if}
  {#each items as item}
    <FlexItem item={item} onAction={async(action, item) => await handleAction(action, item)} highlight={item.ID===selected_id} bg={bg} />
    <!-- onAlter={()=>handleAlter(item)} -->
  {/each}
</div>

<style>
  .itemlist {
    display: flex;
    /* https://www.geeksforgeeks.org/make-a-div-horizontally-scrollable-using-css/ */
    margin: 5px auto;
    padding: 15px;
    /* max-width: 600px; */
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    /* border: 1px solid #ddd; */
    /* to hide scrollbars see https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll*/
  }
</style>
