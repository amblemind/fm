<script>
    import MadeBy from './lib/MadeBy.svelte';
</script>

<main>
    <!-- add a navbar with just a text title -->
    <nav id="top">
        <h3>FreakingMagical.com</h3>
    </nav>
    <div id="grid-container">
        <nav id="side">
            <button><b>MadeBy</b></button>
            <button on:click={() => window.alert("Coming Soon")} style="color: #ffffff77" title="Coming Soon!">Instant Darkmode</button>
        </nav>
        <MadeBy />  
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
    }

    nav#top {
        border-bottom: 1px solid #ffffff77;
        padding: 0 1rem;
        height: 2.5rem;
    }

    div#grid-container {
        display: grid;
        grid-template-columns: 200px 1fr;
        grid-template-rows: 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 0px;
    }

    nav#side {
        padding: 1rem 0;
        border-right: 1px solid #ffffff77;
    }

    nav > button {
        border: none;
        font-weight: 100;
        font-size: .9rem;
        width: 100%;
        text-align: left;
    }



</style>
