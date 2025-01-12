<script>
  import { Textarea, P, Button } from "flowbite-svelte";

  export let text;
  export let onDelete;
</script>

<div class="flex">
  <Textarea placeholder={text} rows="3" w= readonly />
  <!-- <P>{text}</P> -->
  <Button class="ml-4 mt-4 mb-4" on:click={onDelete}>Delete</Button>
</div>
