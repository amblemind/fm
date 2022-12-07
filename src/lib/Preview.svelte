<script>
    let urlInput = "https://darrenalderman.com";
    const exampleUrl = "https://darrenalderman.com";

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
		const base = document.createElement('base');
		base.setAttribute('href', url);	
		base.setAttribute('target', '_blank');
		doc.head.appendChild(base);

        // prevent external resources from loading
        // const links = doc.querySelectorAll('link');
        // console.log(links);
        // for (let i = 0; i < links.length; i++) {
        //     console.log(links[i]);
        //     links[i].parentNode.removeChild(links[i]);
        //     console.log("removed");
        // }
        // const links2 = doc.querySelectorAll('link');
        // console.log(links2);

        //

        //block scripts from running in html   
        // const scripts = doc.querySelectorAll('script');
        // for (let i = 0; i < scripts.length; i++) {
        //     scripts[i].parentNode.removeChild(scripts[i]);
        // }

        //block links from opening in new tab
        const scriptElement = doc.createElement('script');
        scriptElement.setAttribute('id', 'prevent-clicks');
        scriptElement.innerText = "document.addEventListener('click', (e) => {e.stopPropagation();e.preventDefault();return false;});";
        doc.head.appendChild(scriptElement);

        return doc.documentElement.outerHTML;
    }

    async function getModifiedHtmlContent(url) {

        // fetch data from the browserless api and return then content as a string
        const content = await fetchHtmlContent(url);

        const cleanedContent = cleanHtmlContent(url, content);

		return cleanedContent;
    }

    let websiteToShow = exampleUrl;
    $: website = getModifiedHtmlContent(websiteToShow);
</script>

<section id="previewContainer">
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
    {:then htmlContent}
        <!-- TODO: Make resizable https://svelte.dev/repl/fd9d2216e7e243d49de8fae39ecc6fe8?version=3.37.0 -->
        <iframe srcDoc={htmlContent} title="webpagePreview"></iframe>
    {:catch error}
        <!-- TODO: Validate URLs -->
        <p style="color: red">{error.message}</p>
    {/await}
</div>
</section>


<style>
    #previewContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90vh;
        width: 90vw;
        background-color: blue;
        border-radius: 0.5rem;
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
        height: 90vh;
        width: 90vw;
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