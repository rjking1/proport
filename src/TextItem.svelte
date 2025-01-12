<script>
  import { Textarea, Button } from "flowbite-svelte";

  export let item;
  export let onDelete;
</script>

<div class="flex">
  <Textarea placeholder={item.Text} rows="3" w= readonly />
  <Button color="yellow" class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
</div>
