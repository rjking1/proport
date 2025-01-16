<script>
  export let item;
  export let onAction;
  export let highlight;
  export let bg;

  function col(highlight) {
    return highlight === true ? "lightgoldenrodyellow" : bg;  
  }

  function bdr(highlight) {
    return highlight === true ? "2px solid black" : "1px solid black"; 
  }

  // function onRename(item) {
  //   let newName = prompt("New name", item.Name)
  //   // replace into ...
  // }

  // async function onDelete(item) {

  // import { doFetch } from "./common";
  // import { dbN, permissions } from "./stores";

  //   let qresult = await doFetch(
  //     $dbN,
  //     `select count(*) from projects where portfolio_id=${id}` 
  //   );
  //   if(confirm("Are you sure you want to delete " + item.Name + "?")) {
  //     // delete from ...
  //   }
  // }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="region" style="background-color:{col(highlight)}; border:{bdr(highlight)};" on:click={() => onAction('sel', item)}>
  <span>
    &nbsp; &nbsp;
    <b>{item.Name}</b>
    <span class="toggleVis">
      <button on:click|stopPropagation={async()=> await onAction('ren', item)}>✎</button>
      <button on:click|stopPropagation={async()=> await onAction('del', item)}>🗑</button>
    </span>
  </span>

  {#if item.type === 'text'}
    <div class="img_outer">
      <div class="img_inner"><small>{item.Text}</small></div>
    </div>
  {/if}
  {#if item.type === 'image'}
    <div class="img_outer">
      <div class="img_inner"><img src={item.Text} alt="x"/></div>
    </div>
  {/if}
</div>

<style>
  .img_outer {
    height: 120px;
    display:flex;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    margin:5px;
  }
  .img_inner {
    width:150px;
  }
  .region {
    height: 180px;
    width: 300px;
    /* border: 1px solid black; */
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    text-align: center;
  }
  .toggleVis:hover{opacity:1;}
  .toggleVis{opacity:0;}
</style>
