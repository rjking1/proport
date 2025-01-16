<script lang="ts">
  import { Button, Input, Select, Textarea } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN } from "./stores";

  // import { onMount } from "svelte";
  import { pop, replace } from "svelte-spa-router";

  export let params;
  let user_id = params["uid"];
  let project_id = params["pid"];

  $dbN = localStorage.dbN;
  
  let text;
  let qresult = null;

  //fetch('https://www.artspace7.com.au/dsql/json_helper_get.php?db=art25285_rides2&sql=select%20*%20from%20bikes')

  async function doAddOrUpdate() {
    // console.log($permissions)
    const sql =
      // id === ""
      //   ? 
        "INSERT INTO items (name, text, project_id, user_id) " +
          "values ('text','" +
          text.replace(/'/g, "''") +
          "'," +
          project_id + "," +
          user_id +
          ")";
        // : "REPLACE INTO items (id,text,project_id) " +
        //   "values ('" +
        //   text.replace(/'/g, "''") +
        //   "'," +
        //   project_id +
        //   ")";
    console.log(sql);
    qresult = await doFetch($dbN, sql);
    console.log(qresult);

    pop();
    replace(`/project/${user_id}/${project_id}`);
  }
</script>

<main>
  <div xclass="w-full max-w-xs">
    <br>
    <form>
      <div class="x">
        <!-- <Textarea rows=10 bind:value={text} />         -->
        <textarea bind:value={text}/>
        <br>  
        <Button class="mt-4" type="button" on:click={doAddOrUpdate}>
          <!-- {#if id === ""}Add Text{:else}Update Text{/if} -->
          Add
        </Button>
      </div>
    </form>
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
