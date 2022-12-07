// <script id="madeby-fm" src="http://127.0.0.1:5173/madeby.js" data-twitter-handle="nocodedarren"></script>

window.onload = () => {
    const thisScript = document.querySelector('#madeby-fm') || {};
    const twitterHandle = thisScript.dataset.twitterHandle || 'nocodedarren';

    const a = document.createElement('a');
    a.setAttribute('href', 'https://twitter.com/' + twitterHandle);
    a.setAttribute('target', '_blank');
    a.innerHTML = "Made by <span style='font-weight: bold;'>@" + twitterHandle + "</span>";  
    a.style = "position: fixed; right: 1.5rem; bottom: 1.5rem; padding: .5rem 1rem;" 
        + "color: white; background-color: #009df6; text-decoration: none; border-radius: .5rem; font-size: 1rem; " 
        + "cursor: pointer; transition: all .2s ease-in-out; z-index: 1000;"
        + "box-shadow: 0 0 1rem rgba(0, 0, 0, .2);"
        + "font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;";

    a.onmouseover = () => a.style.transform = "scale(1.1)";
    a.onmouseout = () => a.style.transform = "scale(1)";
    document.body.append(a);
};