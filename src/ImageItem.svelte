<script>
  import { Button, Input } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount } from "svelte";

  export let item;
  export let onEdit;
  export let onDelete;
  export let onMove;

  let src = item.Text;
  let editing;

  let canvas;
  let ctx;
  let img1;

  let isDrawing;
  let haveMoved;
  let stampText = "< Here!"

	onMount(() => {
		ctx = canvas.getContext('2d');
    img1 = new Image();
    //drawing of the test image - img1
    img1.onload = () => {
        //draw background image
        ctx.drawImage(img1, 0, 0); // , img1.width, img1.height); still have questions -- see
        // https://svelte.dev/playground/b047e406589a4b51b076dfa5b8d0cb9a?version=5.19.6

        //draw a box over the top
        // ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
        // ctx.fillRect(0, 0, 500, 500);
    };
    img1.src = src;
  })

  function doUpdate() {
    editing=false;
    const dataURL = canvas.toDataURL();
    onEdit(item.ID, dataURL);
  }

  onmousedown = (e) => {
    if(editing) {
      const bounding = canvas.getBoundingClientRect();
      const x = e.clientX - bounding.left;
      const y = e.clientY - bounding.top;
      // console.log(x,y) //beauty!    
      isDrawing = true;
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "purple";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.moveTo(x, y);
      haveMoved = false;
    }
  };
  
  onmousemove = (e) => {
    const bounding = canvas.getBoundingClientRect();
    const x = e.clientX - bounding.left;
    const y = e.clientY - bounding.top;
    if (isDrawing) {      
      ctx.lineTo(x, y);
      ctx.stroke();      
      haveMoved = true;
    }
  };
  
  onmouseup = function (e) {
    const bounding = canvas.getBoundingClientRect();
    const x = e.clientX - bounding.left;
    const y = e.clientY - bounding.top;
    isDrawing = false;
    ctx.closePath();
    // if have not moved then stamp text
    if(haveMoved == false) {
      ctx.font = "28px Arial";
      ctx.fillStyle = "purple";
      ctx.fillText(stampText, x, y);
    }
  };

</script>

<div class="container">
  <div class="contents">
    <canvas bind:this={canvas} width=1024px height=1400px class="cnv" on:mousedown={onmousedown} on:mousemove={onmousemove} on:mouseup={onmouseup} >
      <!-- <img bind:value={item.Text}/> -->
    </canvas>
  </div>
  {#if $permissions}
  <div class="buttons">
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'up')}>▲</Button>
    <Button color="blue" class="m-1 p-1" on:click={()=>onMove(item.ID, item.Project_ID, item.SortOrder, 'down')}>▼</Button>
    <Button color="purple"  class="m-1 p-1" on:click={()=>{editing = !editing}}>Edit</Button>
    <Button color="yellow"  class="m-1 p-1" on:click={onDelete(item.ID)}>Delete</Button>
  </div>
  {/if}
</div>
{#if editing}
<div class="editor">
  <div>
    <Input id="db" bind:value={stampText} />
    <Button color="green"  class="m-1 p-1" on:click={()=>doUpdate()}>Update</Button>
  </div>
</div>
{/if}

<style>
  .container {
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
    width: 100%;
    display:flex;
    position: relative;
  }
  .contents {
    width: 100%;
  }
  /* got to fix this 
        // https://svelte.dev/playground/b047e406589a4b51b076dfa5b8d0cb9a?version=5.19.6
  */
  .xcnv {
    width: 100%;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    position:absolute;
    right: 2%;
    opacity:0.1;
  }
  .buttons:hover {
    opacity: 1;
  }
</style>