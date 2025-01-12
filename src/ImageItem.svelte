<script>
  import { Button } from "flowbite-svelte";

  export let item;
  export let onDelete;

  let src = item.Text;

</script>

<div class="xflex">
  <img src={src} alt="missing" />
  <Button color="yellow"  class="m-4" on:click={onDelete(item.ID)}>Delete</Button>
</div>