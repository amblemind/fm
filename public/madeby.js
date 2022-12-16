/*
    Made by DarrenAlderman.com 😁
    <script>
        window.madeByOverrides = {
            "size": 2, // Size of text, padding, etc. in rem (default: 1, try: .5, 1.2, etc.)
            "location": "top-left", // Location of the text. Options: "top-left", "top-right", "bottom-left", "bottom-right" (default: "bottom-right")
            "spaceTop": 5, // Padding space added to the top in rem (default: 1, try: .5, 1.5, etc.)
            "spaceRight": 1, // Padding space added to the right in rem (default: 1, try: .5, 1.5, etc.)
            "spaceBottom": 1, // Padding space added to the bottom in rem (default: 1, try: .5, 1.5, etc.)
            "spaceLeft": -5, // Padding space added to the left in rem (default: 1, try: .5, 1.5, etc.)
            "bgColor": "pink", // Background color of the tile (default: "#009df6", try: "red", "#fff", etc.)
            "textColor": "black", // Text color in the tile (default: "white", try: "black", "#000", etc.)
            "madeBy": "Powered by", // Override the "Made by" text (default: "Made by", try: "Created by", "Built by", etc.)
            "handle": "Darren 🚀", // Override the Twitter handle (default: "Twitter handle", try: "Your name", "Your company", etc.)
            "link": "https://darrenalderman.com/", // Link to a site (default: "https://twitter.com/yourhandle")
        };
        window.madeByCss = {
            "borderRadius": "0",
            "zIndex": "-1",
            // ... any other CSS properties you want to override
        };
    </script>
    <script id="madeby-fm" src="https://freakingmagical.com/madeby.js" data-twitter-handle="nocodedarren" defer></script>
*/

window.onload = () => {
    const thisScript = document.querySelector('#madeby-fm') || {};
    const twitterHandle = thisScript.dataset.twitterHandle || 'nocodedarren';
    const overrides = window.madeByOverrides || {};
    const customCss = window.madeByCss || {};
    const size = overrides.size || 1;

    const location = overrides.location || "bottom-right";
    const top = location.includes("top") ? 0 : null;
    const right = location.includes("right") ? 0 : null;
    const bottom = location.includes("bottom") ? 0 : null;
    const left = location.includes("left") ? 0 : null;

    const spaceTop = overrides.spaceTop || 1;
    const spaceRight = overrides.spaceRight || 1;
    const spaceBottom = overrides.spaceBottom || 1;
    const spaceLeft = overrides.spaceLeft || 1;

    const bgColor = overrides.bgColor || "#009df6";
    const textColor = overrides.textColor || "white";

    const madeByText = overrides.madeBy || "Made by";
    const nameText = overrides.handle || "@" + twitterHandle;
    const link = overrides.link || "https://twitter.com/" + twitterHandle;

    const styles = {
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
        "fontSize": `${size}rem`,
        "fontWeight": "normal",
        "cursor": "pointer",
        "transition": "all .2s ease-in-out",
        "z-index": "1000",
        "box-shadow": "0 4px 6px -4px rgb(0 0 0 / 0.1)",
        // "font-family": "-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif"
    };
    
    const a = document.createElement('a');
    
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.innerHTML = `${madeByText} <span style='font-weight: bold;'>${nameText}</span>`;  
    Object.assign(styles, customCss);
    Object.assign(a.style, styles);
    a.onmouseover = () => a.style.transform = "scale(1.1)";
    a.onmouseout = () => a.style.transform = "scale(1)";
    document.body.append(a);
};