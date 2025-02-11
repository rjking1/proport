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

  let contw;
  let conth;
  let canvas;
  let ctx;
  let img1;
  let cw;
  let ch;

  let isDrawing
	let start = {x:0,y:0}
	let t, l
  let haveMoved;

  let drawingcolour="purple"
  let pensize = 4

  let stampText = "> <";

  onMount(async () => {
    ctx = canvas.getContext("2d");
    img1 = new Image();
    img1.onload = () => {
      ctx.drawImage(img1, 0, 0); 
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
    cw = img1.naturalWidth;
    ch = img1.naturalHeight;
    canvas.width = cw;
    canvas.height = ch;

    console.log("init cw=", cw, " ch=", ch);
  });

  function doUpdate() {
    editing = false;
    const dataURL = canvas.toDataURL();
    onEdit(item.ID, dataURL);
  }

  // onmousedown = (e) => {
  //   if(editing) {
  //     const bounding = canvas.getBoundingClientRect();
  //     const x = e.clientX - bounding.left;
  //     const y = e.clientY - bounding.top;
  //     // console.log(x,y) //beauty!
  //     isDrawing = true;
  //     ctx.beginPath();
  //     ctx.lineWidth = 4;
  //     ctx.strokeStyle = drawingcolour
  //     ctx.lineJoin = "round";
  //     ctx.lineCap = "round";
  //     ctx.moveTo(x, y);
  //     haveMoved = false;
  //   }
  // };

  const handleStart = (({ offsetX: x, offsetY: y }) => { 
		if(editing) {
			isDrawing = true
      ctx.beginPath();
      ctx.lineWidth = pensize;
      ctx.strokeStyle = drawingcolour;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
			start = { x, y }
      console.log(start)
      haveMoved = false;
		}
	})

  // onmousemove = (e) => {
  //   if (isDrawing) {
  //     const bounding = canvas.getBoundingClientRect();
  //     const x = e.clientX - bounding.left;
  //     const y = e.clientY - bounding.top;
  //     ctx.lineTo(x, y);
  //     ctx.stroke();
  //     haveMoved = true;
  //   }
  // };

  const handleMove = (({ offsetX: x1, offsetY: y1 }) => {
    if(!isDrawing) return
		
		const { x, y } = start
		ctx.beginPath()
		ctx.moveTo(x, y)
		ctx.lineTo(x1, y1)
		ctx.closePath()
		ctx.stroke()
		
		start = { x: x1, y: y1 }
    haveMoved = true;
  })

  const handleEnd = ({ offsetX: x1, offsetY: y1 }) => {
    isDrawing = false;
    ctx.closePath();
    // if have not moved then stamp text
    if(!haveMoved) {
      // const bounding = canvas.getBoundingClientRect();
      // const x = e.clientX - bounding.left;
      // const y = e.clientY - bounding.top;
      const { x, y } = start
      ctx.font = `${pensize * 6}px Arial`;
      ctx.fillStyle = drawingcolour;
      // const em = parseFloat(getComputedStyle(canvas).fontSize);
      ctx.fillText(stampText, x-pensize*2.5, y+pensize*2);
    }
  };

	const handleSize = () => {
		const { top, left } = canvas.getBoundingClientRect()
		t = top
		l = left
    console.log(t,l)

    console.log("cont w=", contw)
    console.log("canvas w=", canvas.width)
    // canvas.width = contw;
    // if do this then need to redraw img on canvas and set all canvas props again
	}
</script>

<svelte:window on:resize={handleSize} />

<div class="container" bind:clientWidth={contw} bind:clientHeight={conth} >
  <div class="contents" >
    <canvas
      bind:this={canvas}

      style="xwidth: 100%; xheight: auto; display:block"
      
      on:mousedown={handleStart}	
      on:touchstart|stopPropagation={e => {
        const { clientX, clientY } = e.touches[0]
        handleStart({
          offsetX: clientX - l,
          offsetY: clientY - t
        })
      }}	
      on:mouseup={handleEnd}				
      on:touchend|stopPropagation={handleEnd}				
      on:mouseleave={handleEnd}
      on:mousemove={handleMove}
      on:touchmove|stopPropagation={e => {
        const { clientX, clientY } = e.touches[0]
        handleMove({
          offsetX: clientX - l,
          offsetY: clientY - t
        })
      }}
    >
      <!-- <img bind:value={item.Text}/> -->
    </canvas>
  </div>
  {#if $permissions}
    <div class="buttons">
      <Button
        color="blue"
        class="m-1 p-1"
        on:click={() => onMove(item.ID, item.Project_ID, item.SortOrder, "up")}
        >▲</Button
      >
      <Button
        color="blue"
        class="m-1 p-1"
        on:click={() =>
          onMove(item.ID, item.Project_ID, item.SortOrder, "down")}>▼</Button
      >
      <Button
        color="purple"
        class="m-1 p-1"
        on:click={() => {
          editing = !editing;
        }}>Edit</Button
      >
      <Button color="yellow" class="m-1 p-1" on:click={onDelete(item.ID)}
        >Delete</Button
      >
    </div>
    {/if}
</div>
{#if editing}
  <div class="editor">
      Colour: 
      <input type="color" bind:value={drawingcolour}>
      Size: 
      <input type="number" xwidth="100px"bind:value={pensize}>
      Click&nbsp;text: 
      <Input xwidth="200px" bind:value={stampText} />
      <Button color="green" class="m-1 p-1" on:click={() => doUpdate()}
        >Update</Button
      >
  </div>
{/if}

<style>
  .container {
    margin: 0.5em;
    padding: 0.5em;
    background-color: whitesmoke;
    width: 100%;
    max-width: 1200px;
    display: flex;
    position: relative;
  }
  .contents {
    width: 100%;
  }
  /* got to fix this 
        // https://svelte.dev/playground/b047e406589a4b51b076dfa5b8d0cb9a?version=5.19.6
  */
  .editor {
    display: flex;
    column-gap: 10px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 2%;
    opacity: 0.1;
  }
  .buttons:hover {
    opacity: 1;
  }
  input[type="color"] {
    min-width: 40px;
    height: 40px;
  }  
  input[type="number"] {
    min-width: 40px;
    height: 40px;
  }
</style>
