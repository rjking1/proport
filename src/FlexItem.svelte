<script>
  import { Avatar, Tooltip, P} from "flowbite-svelte";
  import { permissions } from "./stores";

  export let item;
  export let onAction;
  export let highlight;
  export let bg;

  function col(highlight) {
    return highlight === true ? "lightgoldenrodyellow" : bg;  
  }

  function bdr(highlight) {
    return highlight === true ? "2px solid black" : "1px solid black"; 
  }

  /**
   * @param {string} s
   */
  function transformName(s) {
    // let chars = s.toUpperCase(); //s.replace(/\B\w+/g, "").toUpperCase();
    // let aye = "A"
    // let cp1 = chars.codePointAt(0);
    // let cp2 = chars.codePointAt(1);
    // let d1 = Math.trunc((cp1 - aye.codePointAt(0))  + 0x2800);  // 0x2648 zodiac
    // let d2 = Math.trunc((cp2 - aye.codePointAt(0))  + 0x2800);
    // return String.fromCharCode(d2) + String.fromCharCode(d1);

    let b = s.slice(0,2).toUpperCase().split("").map(c => "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿"[" A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=".indexOf(c)]).join("");
    return b;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="region" style="background-color:{col(highlight)}; border:{bdr(highlight)};" on:click={() => onAction('sel', item)}>
  <span>
    <b>{item.Name}</b>
    {#if $permissions}
      <span class="rjust toggleVis">
        {#if item.Shared === '0'}
        <button on:click|stopPropagation={async()=> await onAction('share', item)}>☐</button>
        <Tooltip>Shared?</Tooltip>
        {/if}
        <button on:click|stopPropagation={async()=> await onAction('ren', item)}>✎</button>
        <Tooltip>Rename</Tooltip>
        <button on:click|stopPropagation={async()=> await onAction('del', item)}>🗑</button>
        <Tooltip>Delete</Tooltip>
      </span>
      <span>
        {#if item.Shared === '1'}
        <button on:click|stopPropagation={async()=> await onAction('share', item)}>✅</button>
        <Tooltip>Shared?</Tooltip>
        {/if}
      </span>
    {/if}
  </span>

  <!-- {#if item.DateTime is old }
    <span style="font-size:200%">🕸</span>
  {/if} -->

  <!-- text is not returned atm -->

  <!-- {#if item.type === 'text'}
    <div class="img_outer">
      <div class="img_inner"><small>{item.Text}</small></div>
    </div>
  {/if} -->

  {#if item.type === 'image' && item.Text != null}
    <div class="img_outer">
      <!-- <div class="img_inner"><img src={item.Text} alt="x"/></div> -->
      <div class="img_inner">
        <Avatar size="xl" src={item.Text}></Avatar>
      </div>
    </div>
  {:else}
  <div class="img_outer">
      <div class="img_inner">
        <!-- <Avatar size="xl"><P size="xl" weight="bold">{item.Name.replace(/\B\w+/g, "").toUpperCase()}</P></Avatar> -->
        <Avatar size="xl"><P size="6xl" weight="bold" color="black">{transformName(item.Name)}</P></Avatar>
      </div>
    </div>
  {/if}
</div>

<style>
  .img_outer {
    height: 200px;
    display:flex;
    justify-content: center;
    align-items:center;
    overflow: hidden;
    margin-left:30px;
  }
  .img_inner {
    width:200px;
  }
  .region {
    height: 220px;
    width: 220px;
    /* border: 1px solid black; */
    border-radius: 5px;
    padding: 5px;
    margin: 7px;
    xtext-align: center;
  }
  .rjust {
    float:right;
  }
  .toggleVis:hover{opacity:1; transition-delay:0.5s;}
  .toggleVis{opacity:0;}
</style>
