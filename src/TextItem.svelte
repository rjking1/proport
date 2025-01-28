<script>
  import { Textarea, Button } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";

  export let item;
  export let onDelete;
  export let onEdit;
  export let onMove;
</script>

<div class="x">
  <!-- <div class="y">{item.Text}</div> -->
    <!-- <Textarea placeholder={item.Text} rows=10 readonly /> -->
    <textarea bind:value={item.Text}>{item.Text}</textarea>
    <!-- <p contenteditable="true">{item.Text}</p>  -->
    <!-- {item.Text} -->
  <!-- </div> -->

  <br>
  {#if $permissions}
  <Button color="yellow" class="m-4" on:click={()=>onDelete(item.ID)}>Delete</Button>
  <Button color="green" class="m-4" on:click={()=>onEdit(item.ID, item.Text)}>Update</Button>
  <Button color="blue" class="m-4" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
  <Button color="blue" class="m-4" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
  <span><small>{item.DateTime}</small></span>
  {/if}
</div>

<style>
  .x {
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
    width: 100%;
  }
  textarea {
    field-sizing: content;
    width: 100%;
    max-width: 1024px;
  }
</style>
