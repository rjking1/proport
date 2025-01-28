<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN } from "./stores";
  import mermaid from 'mermaid';
  import { pop, replace } from "svelte-spa-router";

  export let params;
  let user_id = params["uid"];
  let project_id = params["pid"];

  $dbN = localStorage.dbN;
  
  let diagram = "";
  let container;
  
  async function doPreview() {
    await renderDiagram()
  }

  async function renderDiagram() {
    // console.log(diagram)
    if(await mermaid.parse(diagram)) {
      const {svg} = await mermaid.render('mermaid' + Math.trunc(Math.random() * 1000000), diagram)
      console.log(svg)
      container.innerHTML=svg;
    } else {
      alert("parse error")
    }
  }
  async function doAddOrUpdate() {
    // console.log($permissions)
    const sql =
        "INSERT INTO items (name, text, project_id, user_id, sortorder) " +
          "values ('mermaid','" +
          diagram.replace(/'/g, "''") +
          "'," +
          project_id + "," +
          user_id + "," +
          "(select Max(i2.id) + 1 from items i2)" +
          ")";
    console.log(sql);
    let qresult = await doFetch($dbN, sql);
    console.log(qresult);

    pop();
    replace(`/project/${user_id}/${project_id}`);
  }
</script>

<main>
  <div xclass="w-full max-w-xs">
    <br>
    <!-- <form> -->
      <div class="x">
        <textarea bind:value={diagram}></textarea>
        <br>  
        <Button class="mt-4" type="button" on:click={doAddOrUpdate}>Add</Button>
        <Button class="mt-4" type="button" on:click={doPreview}>Preview</Button>
        <hr>
        <!-- {#if container} -->
        <div bind:this={container}></div>
        <!-- {/if} -->
      </div>
    <!-- </form> -->
  </div>
</main>

<style>
  .x {
    margin: 1em;  
  }
  textarea {
    field-sizing: content;
    width: 100%;
    max-width: 1024px;
  }
</style>
