<script>
  import { Textarea, Button } from "flowbite-svelte";

  export let item;
  export let onDelete;
</script>

<div class="x">
  <!-- <Textarea placeholder={item.Text} rows=10  readonly /> -->
    <p contenteditable="true">{item.Text}</p> 
    <Button color="yellow" class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
</div>

<style>
  .x {
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
  }
</style>
