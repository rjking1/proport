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
    let sql =
        "INSERT INTO items (name, text, project_id, user_id, sortOrder) " +
          "values ('text','" +
          text.replace(/'/g, "''") +
          "'," +
          project_id + "," +
          user_id + "," +
          "(select Max(i2.id) + 1 from items i2)" +
          ")";
    // console.log(sql);
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
        <textarea bind:value={text}></textarea>
        <br>  
        <Button class="mt-4" type="button" on:click={doAddOrUpdate}>Add</Button>
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
