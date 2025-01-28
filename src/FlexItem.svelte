<script>
  import { Avatar, Tooltip, P} from "flowbite-svelte";
  import { permissions } from "./stores";
  import WordCloud from "./WordCloud.svelte";

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

  // /**
  //  * @param {string} s
  //  */
  // function transformName(s) {
  //   let chars = s; //.toUpperCase(); //s.replace(/\B\w+/g, "").toUpperCase();
  //   let aye = "A"
  //   let ayel = "a"
  //   let cp1 = chars.codePointAt(0);
  //   let cp2 = chars.codePointAt(1);
  //   let d1 = Math.trunc((cp1 - aye.codePointAt(0))  + 0x2d31); // );  // 0x2648 zodiac  // Tifinagh 0x2d30
  //   let d2 = Math.trunc((cp2 - ayel.codePointAt(0))  + 0x2d4b);
  //   return String.fromCharCode(d1) + String.fromCharCode(d2);

  //   // let b = s.slice(0,2).toUpperCase().split("").map(c => "⠀⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿"[" A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=".indexOf(c)]).join("");
  //   // return b;
  // }

  function words(s) {
    s = s.slice(0, 500)
    s = s.replace(/[^0-9A-Za-z\s]+/g,"");
    s = s.replace(/\b\w{1,3}\b/gi,"");
    s = s.replace(/\s+/g, " ");
    console.log(s + '.')
    if(s != '') {
      const freq = {};
      s.trim().split(' ').forEach(word => {
        freq[word] = (freq[word] || 0) + 1;
      });
      let res = []
      for (let [key,value] of Object.entries(freq)) {
        // console.log('key=',key,'value=',value)
        res.push({'text':key,'count':value})
      }
      console.log(res)
      return res
    } 
    else {
      return [
        { text: "something", count: 8 },
        { text: 'write', count:9},
        { text: 'or', count:6},
        { text: 'do', count:9},
        { text: 'please', count:10},
      ];
    }
  }

  function gen_id() {
    return `wordcloud${Math.trunc(Math.random()*1000000)}`
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

  <!-- text is not returned atm -- all items are "images" -->

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
  {/if}
  {#if item.type != 'image' && item.Text != null}
    <div class="img_outer">
      <div class="img_inner">
        <!-- <Avatar size="xl"><P size="xl" weight="bold">{item.Name.replace(/\B\w+/g, "").toUpperCase()}</P></Avatar> -->
        <!-- <Avatar size="xl"><P size="6xl" weight="bold" color="black">{transformName(item.Name)}</P></Avatar> -->
        <!-- <Avatar size="xl"><WordCloud id={Math.trunc(Math.random()*1000000)} words={words(item.Text.slice(0,100))} width=100px height=100px padding=1 maxFontSize=13></WordCloud></Avatar> -->
        <!-- <p>{item.Text.slice(0,10)}</p> -->
        <WordCloud id={gen_id()} words={words(item.Text)} font="Arial" padding=1 maxFontSize=14 backgroundColor=x></WordCloud>
        <!-- <p>{words(item.Text.slice(0,100))}</p> -->
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
