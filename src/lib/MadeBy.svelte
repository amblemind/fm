<svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
</svelte:head>

<script>
  import SimplePreview from "./SimplePreview.svelte";
  import Prism from "svelte-prism";
  import Beautify from 'js-beautify';


  let view = 1;

  let inputs = {
    //Content
    madeBy: "Made by",
    handle: "@nocodedarren",
    link: "https://twitter.com/nocodedarren",

    // Style
    bgColor: "#009df6",
    textColor: "#ffffff",
    size: 1,

    // Location
    location: "bottom-right",
    spaceTop: 1,
    spaceRight: 1,
    spaceBottom: 1,
    spaceLeft: 1,
  };

  // Content
  $: madeByText = inputs.madeBy || "Made by";
  $: nameText = inputs.handle || "@nocodedarren";
  $: link = inputs.link || "https://twitter.com/nocodedarren";

  // Style
  $: bgColor = inputs.bgColor || "#009df6";
  $: textColor = inputs.textColor || "white";
  $: size = inputs.size || 1;

  // Location
  $: location = inputs.location || "bottom-right";
  $: top = location.includes("top") ? 0 : null;
  $: right = location.includes("right") ? 0 : null;
  $: bottom = location.includes("bottom") ? 0 : null;
  $: left = location.includes("left") ? 0 : null;
  $: spaceTop = inputs.spaceTop || 1;
  $: spaceRight = inputs.spaceRight || 1;
  $: spaceBottom = inputs.spaceBottom || 1;
  $: spaceLeft = inputs.spaceLeft || 1;

  $: styles = {
        "position": "fixed",
        "top": `${top}`,
        "right": `${right}`,
        "bottom": `${bottom}`,
        "left": `${left}`,
        "padding": `${size/2}rem ${size/1.5}rem`,
        "margin": `${spaceTop}rem ${spaceRight}rem ${spaceBottom}rem ${spaceLeft}rem`,
        "line-height": `${size}rem`,
        "color": `${textColor}`,
        "backgroundColor": `${bgColor}`,
        "textDecoration": "none",
        "borderRadius": `${size/2}rem`,
        "font-size": `${size}rem`,
        "font-weight": "normal",
        "cursor": "pointer",
        "transition": "all .2s ease-in-out",
        "z-index": "1000",
        "box-shadow": "0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "font-family": "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif",
    };

  $: styleString = JSON.stringify(styles).replace(/"/g, "'");
  $: scripty = 
    "<script>" +
        "window.onload = () => { " +
          `const a = document.createElement('a'); ` +
          "a.innerHTML = '" + madeByText + ` <span style="font-weight: bold">` + nameText + "</span>';" + 
          `a.setAttribute('href', '${link}'); ` + 
          `Object.assign(a.style, ${styleString}); ` +
          "a.onmouseover = () => a.style.transform = 'scale(1.1)'; " +
          "a.onmouseout = () => a.style.transform = 'scale(1)'; " +
          `a.setAttribute('target', '_blank'); ` +
          "document.body.append(a); " +
        "}" +
    "<" + "/script>";
    
    $: beauty = Beautify.html(scripty, { indent_size: 2, space_in_empty_paren: true });


</script>

<div id="container">
  <div id="main-content">
    <div id="view-switcher">
      <button on:click={() => (view = 1)} class:selected="{view===1}">How to Use This</button>
      <button on:click={() => (view = 2)} class:selected="{view===2}">Create & Preview</button>
      <button on:click={() => (view = 3)} class:selected="{view===3}">Copy the Code</button>
    </div>

    {#if view === 1}
      <div id="video">
        <div style="position: relative; padding-bottom: 56.25%; height: 0;">
          <iframe
            title="Tella Video"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
            src="https://www.tella.tv/video/clbqu2gk204sc0fjq0clt9hkz/embed"
            allowfullscreen
            allowtransparency
          />
        </div>
      </div>
    {:else if view === 2}
      <div id="create" class="previewContainer">
        <SimplePreview insertHtml={scripty}/>
      </div>
    {:else if view === 3}
      <div id="copy" class="previewContainer">
        <Prism language="html" source="{beauty}"/>
      </div>
    {/if}
  </div>
  <div id="right-side">
    

    <div class="field-container">

      <h5>Content</h5>

      <div class="field">
        <label for="madeBy">Made By</label>
        <input type="text" placeholder="Made by" bind:value={inputs.madeBy}/>
      </div>

      <div class="field">
        <label for="handle">Handle</label>
        <input type="text" placeholder="@nocodeDarren" bind:value={inputs.handle}/>
      </div>

      <div class="field">
        <label for="url">URL</label>
        <input type="text" placeholder="https://twitter.com/nocodeDarren" bind:value={inputs.link}/>
      </div>
    </div>

    <div class="field-container">

      <h5>Style</h5>

      <div class="field">
        <label for="textColor">Text Color</label>
        <input type="color" placeholder="#ffffff" bind:value={inputs.textColor}/>
      </div>

      <div class="field">
        <label for="bgColor">Background Color</label>
        <input type="color" placeholder="#009df6" bind:value={inputs.bgColor}/>
      </div>

      <div class="field">
        <label for="size">Size</label>
        <input type="number" placeholder="1" bind:value={inputs.size}/>
      </div>
    </div>

    <div class="field-container">

      <h5>Location</h5>

      <div class="field">
        <label for="location">Corner</label>
        <select bind:value={inputs.location}>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
        </select>
      </div>

      <div id="number-pad">
        <div id="number-top" class="field">
          <label for="spaceTop">Top</label>
          <input type="number" placeholder="1" bind:value={inputs.spaceTop}/>
        </div>

        <div id="number-left" class="field">
          <label for="spaceLeft">Left</label>
          <input type="number" placeholder="1" bind:value={inputs.spaceLeft}/>
        </div>

        <div id="number-right" class="field">
          <label for="spaceRight">Right</label>
          <input type="number" placeholder="1" bind:value={inputs.spaceRight}/>
        </div>  

        <div id="number-bottom" class="field">
          <label for="spaceBottom">Bottom</label>
          <input type="number" placeholder="1" bind:value={inputs.spaceBottom}/>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
    .previewContainer {
      min-width: 450px;
      max-width: calc(100vw - 700px); 
      width: calc(100vw - 30rem);
      height: calc(100vh - 15rem);
      margin: 2rem auto;
    }

  div#container {
    height: calc(100vh - 2.5rem);
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;
  }

  div#main-content {
    padding: 1rem 3rem;
  }

  div#right-side {
    padding: 0 .7rem 4rem;
    border-left: 1px solid #ffffff77;
    overflow-y: scroll;
  }

  div#view-switcher {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
  }

  div#view-switcher > button {
    border: none;
    font-weight: 100;
    font-size: 1rem;
    text-align: center;
    margin: 0 1rem;
  }

  div#view-switcher > button.selected {
    border: solid 1px #ffffff77;
    font-weight: 900;
    font-size: 1.1rem;
  }

  .field-container > h5 {
    font-size: 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: .5rem;
    border-bottom: #ffffff77 solid 1px;
  }

  .field {
    margin-bottom: 1rem;
  }

  .field > label {
    display: block;
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
    color: #ffffff77;
  }

  .field > input {
    width: calc(100% - 1rem);
    padding: 0.5rem;
    border: none;
    background-color: #ffffff22;
    color: white;
  }

  .field > input[type="color"] {
    width: 100%;
    height: 2rem;
    padding: 0;
  }

  .field > select {
    width: 100%;
    padding: 0.5rem;
    border: none;
  }

  #number-pad {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
  }

  #number-pad > div {
    margin: 0;
  }

  #number-pad > div > input {
    width: 2rem;
    text-align: center;
    padding-left: 1.4rem;
  }

  #number-top {
    grid-row: 1;
    grid-column: 2;    
  }

  #number-left {
    grid-column: 1;
    grid-row: 2;
  }

  #number-right {
    grid-column: 3;
    grid-row: 2;
  }

  #number-bottom {
    grid-row: 3;
    grid-column: 2;
  }

</style>
