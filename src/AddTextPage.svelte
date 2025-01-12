<script lang="ts">
  import { Button, Input, Select, Textarea } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  // import { onMount } from "svelte";
  import { pop, push, replace, querystring } from "svelte-spa-router";

  let user_id = $permissions["u_id"];
  let project_id = $querystring;
  // console.log(project_id);

  let text;

  // onMount(async () => {
  //   if (id === "0") {
  //     text = "";
  //   } else {
  //     // text = item.text;
  //   }
  // });

  let qresult = null;

  //fetch('https://www.artspace7.com.au/dsql/json_helper_get.php?db=art25285_rides2&sql=select%20*%20from%20bikes')

  async function doAddOrUpdate() {
    console.log($permissions)
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
    replace("/project?" + project_id);
  }
</script>

<main>
  <div xclass="w-full max-w-xs">
    <br>
    <form>
      <div>
        <Textarea  bind:value={text} />
        <br>
        <Button class="mt-4" type="button" on:click={doAddOrUpdate}>
          <!-- {#if id === ""}Add Text{:else}Update Text{/if} -->
          Add
        </Button>
      </div>
    </form>
  </div>
</main>
