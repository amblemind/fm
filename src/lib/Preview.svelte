<script>
    let urlInput = "https://darrenalderman.com";
    const exampleUrl = "https://darrenalderman.com";
    export let insertHtml = "<!-- nada -->";
    let height = "100%";
    let width = "100%";
    $: cssVarStyles = `--height: ${height}; --width: ${width};`;

    async function fetchHtmlContent(url) {

        if(url === exampleUrl || url === "") {
            return await fetch('./example.html').then(res => res.text());
        } else {
            return await fetch("https://chrome.browserless.io/content?token=8d790bfc-f092-4e63-b52f-877951482312", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "url": url
                }),
            }).then((res) => res.text());
        }
    }

    function cleanHtmlContent(url, content) {

        const parser = new DOMParser();
        let doc = parser.parseFromString(content, "text/html");

        // Fix relative links
		const base = document.createElement('base');
		base.setAttribute('href', url);	
		base.setAttribute('target', '_blank');
		doc.head.appendChild(base);

        // Block clicks in iframe
        const scriptElement = doc.createElement('script');
        scriptElement.setAttribute('id', 'prevent-clicks');
        scriptElement.innerText = "document.addEventListener('click', (e) => {e.stopPropagation();e.preventDefault();return false;});";
        doc.head.appendChild(scriptElement);

        return doc.documentElement.outerHTML;
    }

    async function getModifiedHtmlContent(url) {

        // fetch data from the browserless api and return then content as a string
        const content = await fetchHtmlContent(url);

        return cleanedHtml = cleanHtmlContent(url, content);
    }

    let websiteToShow = exampleUrl;
    let cleanedHtml = "<h1>👋</h1>";
    $: website = getModifiedHtmlContent(websiteToShow);

    // update modifiedHtmlToShow when the color changes
    $: modifiedHtmlToShow = cleanedHtml.replace("</head>", insertHtml + "</head>");
    
</script>

<section id="previewContainer" style={cssVarStyles}>
<div id="urlBar">
    <div id="urlEntry">
        <input type=url bind:value={urlInput}>
        <button on:click={() => websiteToShow = urlInput}>Go 🚀</button>
    </div>  
</div>

<div id="websitePreview">
    {#await website}
        <!-- TODO: Add loading spinner -->
	    <p>Loading...</p>   
    {:then}
        <!-- TODO: Make resizable https://svelte.dev/repl/fd9d2216e7e243d49de8fae39ecc6fe8?version=3.37.0 -->
        <iframe srcDoc={modifiedHtmlToShow} title="webpagePreview"></iframe>
    {:catch error}
        <!-- TODO: Validate URLs -->
        <p style="color: red">{error.message}</p>
    {/await}
</div>
</section>


<style>
    /* https://svelte.dev/repl/8123d474edb04f198c3b83363716a709?version=3.54.0 */



    #previewContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: var(--height);
        width: var(--width);
        border-radius: 0.5rem;
    }

    #websitePreview {
        height: var(--height);
        width: var(--width);
    }

    #urlBar {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
        height: 44px;
        -webkit-box-align: center;
        align-items: center;
        z-index: 10;
        background-color: #f7f7f7;
        border-radius: 0.5rem 0.5rem 0 0;
        box-shadow: rgb(0 0 0 / 10%) 0px -0.5px 0px inset;
    }

    #urlEntry {
        width: 50%;
        min-width: 400px;
        padding: 5px 0;
    }

    iframe {
        border: none;
        border-radius: 0 0 0.5rem 0.5rem;
        box-shadow: rgb(0 0 0 / 10%) 0px 0.5px 0px inset;
        margin-bottom: -7px;
        height: var(--height);
        width: var(--width);
    }


    #urlBar input {
        height: 28px;
        width: calc(100% - 100px);
        border-radius: 0.5rem;
        font-size: 13px;
        text-align: center;
        color: #36374FCC;
        background-color: #7979831A;
        border: none;
    
    }
    #urlBar button {
        font-size: 13px;
        width: 75px;
    }
</style>