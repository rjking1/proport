<script>
  import FlexItem from "./FlexItem.svelte";

  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  export let what;
  export let parent_id;
  export let items;
  export let onSelect;
  export let onAdded=null;

  export let bg;

  let selectedName = '';

  function handleSelect(item) {
    // console.log("FlexList handling select for item=", item)
    selectedName = item.Name;
    // console.log(selectedName)
    onSelect(item);
  }
  async function doAdd() {
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
        alert(`Please click on parent folder to refresh`)
      }
      else if(what === "Portfolio") {
        await doFetch(
          $dbN,
          `insert into portfolios(Name,Interest_ID,User_ID) values ('${name}',${parent_id},${$permissions["u_id"]})`
        );      
        alert(`Please click on parent folder to refresh`)
      }
      else if(what === "Interest") {
        await doFetch(
          $dbN,
          `insert into interests(Name,User_ID) values ('${name}',${$permissions["u_id"]})`
        );      
        onAdded();
      }
    }
    else {
      alert("Not implemented yet")
    }
  }
</script>

<!-- <ProjectHeader /> -->
<div class="itemlist" style="background-color:{bg};">
  {#each items as item}
    <FlexItem item={item} onSelect={() => handleSelect(item)} highlight={item.Name===selectedName} />
  {/each}
  <button on:click={doAdd}>
    + Add {what}
  </button>
</div>

<style>
  .itemlist {
    display:flex;
    xflex-wrap: wrap;
  }
</style>
