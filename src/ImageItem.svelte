<script>
  import { Button, Input } from "flowbite-svelte";
  import { dbN, permissions } from "./stores";
  import { onMount, tick } from "svelte";

  export let item;
  export let onEdit;
  export let onDelete;
  export let onMove;

  let src = item.Text;
  let editing;

  let canvas;
  let ctx;
  let img1;
  let cw;
  let ch;


  let isDrawing;
  let haveMoved;
  let stampText = "< Here!"

	onMount(async () => {
		ctx = canvas.getContext('2d');
    img1 = new Image();
    img1.onload = () => {
        ctx.drawImage(img1, 0, 0); //, 400, 150);
        // setting drawn image dimensions does make a difference!
        // can we use this to scale the image? 
        // drawing x,y seems to be correct
        // BUT image shrinks with each save/load... no good !!! could we resize prior to saving?

        // handle resize event as someone suggested?

        // maybe the answer is here
        // https://svelte.dev/playground/b047e406589a4b51b076dfa5b8d0cb9a?version=5.19.6
        // https://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas
        // https://stackoverflow.com/questions/63192792/responsive-full-width-canvas-in-sveltejs
        // https://cloudinary.com/guides/bulk-image-resize/transform-your-visuals-how-to-resize-an-image-in-javascript#:~:text=The%20canvas%20element%20allows%20for,let%20canvas%20%3D%20document.
        
        //draw a box over the top
        // ctx.fillStyle = "rgba(200, 0, 0, 0.5)";
        // ctx.fillRect(10, 10, 150, 150);
    };
    // this loads the new image object
    await tick();
    img1.src = src;
    // when finishing loading then above fn will be called to draw it on the canvas
    await tick();
    cw = img1.naturalWidth
    ch = img1.naturalHeight

    console.log("cw=", cw," ch=", ch)
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
    if (isDrawing) {      
      const bounding = canvas.getBoundingClientRect();
      const x = e.clientX - bounding.left;
      const y = e.clientY - bounding.top;
      ctx.lineTo(x, y);
      ctx.stroke();      
      haveMoved = true;
    }
  };
  
  onmouseup = function (e) {

    isDrawing = false;
    ctx.closePath();
    // if have not moved then stamp text
    if(haveMoved == false) {
      const bounding = canvas.getBoundingClientRect();
      const x = e.clientX - bounding.left;
      const y = e.clientY - bounding.top;
      ctx.font = "28px Arial";
      ctx.fillStyle = "purple";
      ctx.fillText(stampText, x, y);
    }
  };

</script>

<div class="container">
  <div class="contents">
    <canvas bind:this={canvas} width={cw}} height={ch} style="width: {cw}px; height: {ch}px" on:mousedown={onmousedown} on:mousemove={onmousemove} on:mouseup={onmouseup} >
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