<script>
  import { Textarea, Button } from "flowbite-svelte";

  export let item;
  export let onDelete;
</script>

<div class="x">
  <!-- <div class="y">{item.Text}</div> -->
    <!-- <Textarea placeholder={item.Text} rows=10 readonly /> -->
    <textarea>{item.Text}</textarea>
    <!-- <p contenteditable="true">{item.Text}</p>  -->
    <!-- {item.Text} -->
  <!-- </div> -->

  <br>
  <Button color="yellow" class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
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
