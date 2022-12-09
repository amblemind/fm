<svelte:window on:mouseup={stopExpand} on:resize={handleResize}/>

<section style="height: {defaultHeight}; width: {defaultWidth}; padding-left: 0" id="container" >
    <div style="height: {defaultHeight}; width: {width}" id="resizable">
        <div class="handle handle-left" on:mousedown={startExpand.bind(this, 'left')} on:mousemove={expand}>
            <div class="handle-inner"></div>
        </div>
            <slot></slot>
        <div class="handle handle-right" on:mousedown={startExpand.bind(this, 'right')} on:mousemove={expand}>
            <div class="handle-inner"></div>
        </div>
    </div>
</section>  

<style>
    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

	#resizable {
        display: flex;
        flex-direction: row;
        align-items: center;
	}

    .handle {
        width: 50px;
        height: 60px;
        background: transparent;
        z-index: 100;
        cursor: ew-resize;
        display: flex;
        align-items: center;
    }

    .handle-left {
        margin-right: -45px;
    }

    .handle-right {
        margin-left: -45px;
        justify-content: end;
    }

    .handle-inner {
        height: 40px;
        border-radius: 10px;
        width: 8px;
        background-color: white;
    }
</style>


<script>
    import { onMount } from "svelte";

    export let defaultHeight = "100%";
    export let defaultWidth = "100%";

    let width = defaultWidth;
    $: widthNum = parseInt(width.replace("px", ""));
    $: defaultWidthNum = parseInt(defaultWidth.replace("px", ""));

    // create a variable to store the percentage of the width of the container compared to the window
    let widthPercentage = 0;

    onMount(() => {
        width = document.getElementById("resizable").getBoundingClientRect().width + "px";
        defaultWidth = width;

        // set the width percentage
        widthPercentage = widthNum / window.innerWidth;
    });

    function handleResize() {
        // update the width to the width of what the conatiner should be based on the parent
        // width = document.getElementById("resizable").getBoundingClientRect().width + "px";
        width = window.innerWidth * widthPercentage + "px";
        defaultWidth = width;

    }

	let expanding = null
	let start = null, initial = null
	
	function startExpand(type, event) {
		expanding = type
		start = event.pageX
		initial = { widthNum, defaultWidthNum}
	}
	
	function stopExpand() {
		expanding = null
		start = null
		initial = null
	}
	
	function expand(event) {
    
		// if (!expanding) return;
		if (!expanding || event.buttons != 1) return;
		
		if (expanding == 'left') {
			const delta = (start-event.pageX)*2
            const newWidth = initial.widthNum + delta;
            width = (newWidth >= initial.defaultWidthNum ? initial.defaultWidthNum - 1 : newWidth) + 'px';
			return
		}
		
		if (expanding == 'right') {
			const delta = (event.pageX-start) * 2
            const newWidth = initial.widthNum + delta;
            width = (newWidth >= initial.defaultWidthNum ? initial.defaultWidthNum - 1 : newWidth) + 'px';
            return
		}
	}
</script>
