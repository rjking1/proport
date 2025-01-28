<script lang="ts">
  import { Button, Input, Select, Textarea } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN, permissions } from "./stores";

  // import { onMount } from "svelte";
  import { push, querystring, replace } from "svelte-spa-router";
  import Compressor from 'compressorjs';

  export let params;
  let user_id = params["uid"];
  let project_id = params["pid"];

  $dbN = localStorage.dbN;

  let base64String = "";
  let qresult = null;

	function on_file_input(e) {
		let file = (e.target).files?.[0];

    if (!file) {
      return;
    }

    new Compressor(file, {
      quality: 0.8,
      maxWidth: 1024,
      // access compression `result` in the `success` hook function.
      success(comp) {
        let reader = new FileReader();
        reader.onload = function () {
          base64String = reader.result;
          let blen = ~~(base64String.length/1024);
          console.log(blen, 'Kb compressed')
          if(blen > 700) {
            alert(`${blen}Kb image (encoded) is probably too large to add.`)
          }
        }
        reader.readAsDataURL(comp);
      },
      error(err) {
        console.log(err.message);
      },
    });
  }

  //fetch('https://www.artspace7.com.au/dsql/json_helper_get.php?db=art25285_rides2&sql=select%20*%20from%20bikes')

  async function doAddOrUpdate() {
    const sql =
        "INSERT INTO items (name, text, project_id, user_id, sortorder) " +
          "values ('image','" +
          base64String +
          "'," +
          project_id + "," +
          user_id + "," +
          "(select Max(i2.id) + 1 from items i2)" +
          ")";
    qresult = await doFetch($dbN, sql);
    console.log(qresult);

    replace(`/project/${user_id}/${project_id}`);
  }
</script>

<main>
  <div class="x">
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
          <br>
          <div class="outer">
            <div class="inner">
              <img src={base64String} alt="not found" />
            </div>
          </div>
        {/if}
      </div>
    </form>
  </div>
</main>

<style>
  .x {
    margin: 1em;
  }
  .outer {
    width: 500px;
  }
  .inner {
    max-width: 100%; 
    height:auto;
    padding: 0.5em;
    background-color: whitesmoke;
  }
</style>