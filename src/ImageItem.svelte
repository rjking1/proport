<script>
  import { Img } from "flowbite-svelte";

  export let blob;

  let src = blob; //URL.createObjectURL(b);

</script>

<img src={src} alt="missing" />
