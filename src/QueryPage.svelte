<script>
  import { Input, Button } from "flowbite-svelte";
  import { doFetch } from "./common";
  import { dbN } from "./stores";

  let sql = `select * from interests`
  let qresult = null;

  async function doQuery() {
    qresult = await doFetch($dbN, sql);
  }
</script>

<Input bind:value={sql} />
<Button on:click={doQuery}>Query</Button>

<pre>
  {#if qresult}
    <ul>
      {#each qresult as row}
        <li>
          {#each Object.values(row) as field}{field + ' '}{/each}
        </li>
      {/each}
    </ul>
  {/if}
</pre>

<style>
  li {
    list-style: none;
  }
</style>
