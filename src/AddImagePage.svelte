<script lang="ts">
  import { Button, Input, Select, Textarea } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  // import { onMount } from "svelte";
  import { push, querystring, replace } from "svelte-spa-router";

  let user_id = $permissions["u_id"];
  let project_id = $querystring;
  console.log(project_id);

  // let b64;
  let base64String = "";

  // onMount(async () => {
  //   if (id === "0") {
  //     text = "";
  //   } else {
  //     // text = item.text;
  //   }
  // });

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

    replace("/project?" + project_id);
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
        <!-- <div>
          <span>Base64</span>
          <textarea class="h-40" value="{base64String}" readonly></textarea>
        </div> -->
        {#if base64String}
          <img src={base64String} alt="missing" />
        {/if}
        <br>
        <Button class="mt-4" type="button" on:click={doAddOrUpdate}>
          <!-- {#if id === ""}Add Text{:else}Update Text{/if} -->
          Add
        </Button>
      </div>
    </form>
  </div>
</main>
