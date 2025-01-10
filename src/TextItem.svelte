<script>
  import { Textarea, P } from "flowbite-svelte";

  export let text;

</script>

<Textarea placeholder={text} readonly />
<!-- <P>{text}</P> -->
