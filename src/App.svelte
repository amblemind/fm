<script>
  import Preview from './lib/Preview.svelte'

  let color = "";
  let twitterHandle = "nocodedarren";

  // get root domain url
  const domain = window.location.href;

  $: showScript = twitterHandle !== "nocodedarren" && twitterHandle !== "";
  $: insertHtml = showScript ? '<script id="madeby-fm" src="' + domain + 'madeby.js" data-twitter-handle="' + twitterHandle + '"><' + '/script>' : "";
</script>

<main>
    <div id="previewContainer">
      <Preview {insertHtml}/>
    </div>
    <div id="side-bar">
        <h1>Made By</h1>
        <p>Encourage your visitors to connect with you on Twitter by adding a "Made By" link to your website.</p>
        <h4>Step 1: Enter your twitter handle</h4>
        <div id="inputContainer">
          <span>@</span>
          <input type="text" placeholder="nocodedarren" on:blur={e => twitterHandle = e.target.value}/>
        </div>
        <!-- if twitterhandle not equal to nocodedarren -->
        {#if showScript}
          <h4>Step 2: Copy this script to your website 👇</h4>
          <code>{insertHtml}</code>
        {/if}    
    </div>
</main>

<style>
  /* css grid with 2 columns */
  main {
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
