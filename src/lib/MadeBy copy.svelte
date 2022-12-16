<script>
    import SimplePreview from './SimplePreview.svelte'
  
    let color = "";
    let twitterHandle = "nocodedarren";
  
    // get root domain url
    const domain = window.location.href;
  
    $: showScript = twitterHandle !== "nocodedarren" && twitterHandle !== "";
    $: insertHtmlO = showScript ? '<script id="madeby-fm" src="' + domain + 'madeby.js" data-twitter-handle="' + twitterHandle + '" defer><' + '/script>' : "";
  
    let timer;
    const debounce = v => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        twitterHandle = v;
      }, 500);
    }

    let madeByText = "Made by";
    let nameText = "NoCodeDarren";

       
    $: insertHtml = "<script>" 
        + "const a = document.createElement('a');"
        + `a.setAttribute('target', '_blank').setAttribute('href', link);`
        + `a.innerHTML = '${madeByText} <span style='font-weight: bold;'>${nameText}</span>;`  
        + "<" + "/script>"
  </script>
  
<section>
    <div id="previewContainer">
    <!-- <Resizable> -->
        <SimplePreview {insertHtml}/>
    <!-- </Resizable> -->
    </div>
    <!-- <div id="side-bar">
        <h1>Made By <small>(alpha)</small></h1>
        <p>Encourage your visitors to connect with you on Twitter by adding a "Made By" link to your website.</p>
        <h4>Step 1: Enter your twitter handle</h4>
        <div id="inputContainer">
        <span>@</span>
        <input type="text" placeholder="nocodedarren" on:keyup={e => debounce(e.target.value)}/>
        </div>

        {#if showScript}
        <h4>Step 2: Copy this script to your website 🔗</h4>
        <code>{insertHtml}</code>
        <span style="padding-top: .8rem; text-align: center; font-size: .8rem;">Still testing things out. Let me know what you think! 👇</span>
        {/if}    
    </div> -->
</section>

<style>
    /* css grid with 2 columns */
    section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1rem;
    }
  
    #previewContainer {
      min-width: 30rem;
      width: calc(100vw - 30rem);
      height: calc(100vh - 4rem);
      margin: 2rem;
    }
  
    #side-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 2rem;
      width: 22rem;
    }
  
    #inputContainer {
      display: flex;
      align-items: center;
      border: 1px solid grey;
      border-radius: 0.5rem;
      padding: 0.5rem;
      width: 100%;
    }
  
    small {
      font-size: 1rem;
      font-weight: normal;
    }
  
    input {
      width: 100%;
      margin-left: .2rem;
      border: none; 
      background: transparent;
      font-size: 1rem;
      color: white;
    }
  
    input:focus {
      outline: none;
    }
  
    code {
      background-color: grey;
      padding: 1rem;
      border-radius: 0.5rem;
      width: 100%;
    }
  </style>