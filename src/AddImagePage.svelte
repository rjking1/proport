<script lang="ts">
  import { Button, Input, Select, Textarea } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  // import { onMount } from "svelte";
  import { push, querystring, replace } from "svelte-spa-router";

  export let params;
  let user_id = params["uid"];
  let project_id = params["pid"];

  $dbN = localStorage.dbN;

  let base64String = "";
  let qresult = null;

	function on_file_input(e) {
		let file = (e.target).files?.[0];

    let reader = new FileReader();

    reader.onload = function () {
        base64String = reader.result;
        // console.log(base64String);
    }
    reader.readAsDataURL(file);
  }

  //fetch('https://www.artspace7.com.au/dsql/json_helper_get.php?db=art25285_rides2&sql=select%20*%20from%20bikes')

  async function doAddOrUpdate() {
    const sql =
      // id === ""
      //   ? 
        "INSERT INTO items (name, text, project_id, user_id) " +
          "values ('image','" +
          base64String +
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
    qresult = await doFetch($dbN, sql);
    console.log(qresult);

    replace(`/project/${user_id}/${project_id}`);
  }
</script>

<main>
  <div xclass="w-full max-w-xs">
    <br>
    <form>
      <div>
        <div>
          <!-- <span>Choose File</span> -->
          <div>
            <input class="mt-2" type="file" on:input="{on_file_input}" />
          </div>
        </div>
        {#if base64String}
          <!-- <textarea class="h-40" value="{base64String}" readonly></textarea> -->
          <Button class="mt-4" type="button" on:click={doAddOrUpdate}>
            Add
          </Button>
          <br>
          <img src={base64String} alt="missing" />
        {/if}
      </div>
    </form>
  </div>
</main>
