<script>
  import { buildSnippet, DEFAULTS } from './lib/tag.js';
  import Controls from './lib/Controls.svelte';
  import PreviewPane from './lib/PreviewPane.svelte';
  import CodePane from './lib/CodePane.svelte';
  import InstallPane from './lib/InstallPane.svelte';

  const VIEWS = [
    { id: 'preview', label: 'Create & Preview' },
    { id: 'code', label: 'Copy the Code' },
    { id: 'install', label: 'How to Use This' }
  ];

  const IDS = VIEWS.map((item) => item.id);
  const fromHash = () => {
    const id = typeof location === 'undefined' ? '' : location.hash.slice(1);
    return IDS.includes(id) ? id : 'preview';
  };

  let view = $state(fromHash());
  let inputs = $state({ ...DEFAULTS });

  // Each view gets its own URL so a link can point straight at it. replaceState
  // rather than pushState, so flipping tabs does not fill up the back button.
  $effect(() => {
    const hash = view === 'preview' ? ' ' : `#${view}`;
    history.replaceState(null, '', view === 'preview' ? location.pathname + location.search : hash);
  });

  let snippet = $derived(buildSnippet(inputs));
</script>

<svelte:window onhashchange={() => (view = fromHash())} />

<div class="app">
  <header class="topbar">
    <div class="brand">
      <span class="mark" aria-hidden="true"></span>
      Made By Tag
    </div>

    <nav class="views">
      {#each VIEWS as item (item.id)}
        <button
          type="button"
          class:active={view === item.id}
          aria-current={view === item.id ? 'page' : undefined}
          onclick={() => (view = item.id)}
        >{item.label}</button>
      {/each}
    </nav>

    <a class="source" href="https://github.com/amblemind/fm" target="_blank" rel="noopener">
      Source
    </a>
  </header>

  <main>
    <div class="stage" class:flush={view !== 'preview'}>
      {#if view === 'preview'}
        <PreviewPane {snippet} />
      {:else if view === 'code'}
        <CodePane {snippet} />
      {:else}
        <InstallPane {inputs} />
      {/if}
    </div>

    <Controls bind:inputs />
  </main>
</div>

<style>
  .app {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    height: 100%;
  }

  .topbar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1rem;
    height: 56px;
    padding: 0 1.25rem;
    border-bottom: 1px solid var(--line);
    background: var(--panel);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: -0.015em;
    white-space: nowrap;
  }

  .mark {
    width: 26px;
    height: 14px;
    border-radius: 4px;
    background: var(--accent);
    box-shadow: 0 0 0 4px var(--accent-soft);
  }

  .views {
    display: flex;
    gap: 2px;
    padding: 3px;
    border-radius: 9px;
    background: var(--panel-sunken);
  }

  .views button {
    padding: 0.4rem 0.9rem;
    border: none;
    border-radius: 6px;
    background: none;
    color: var(--muted);
    font: inherit;
    font-size: 0.84rem;
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
  }

  .views button:hover { color: var(--text); }

  .views button.active {
    background: var(--panel-raised);
    color: var(--text);
    font-weight: 550;
    box-shadow: 0 1px 2px rgb(0 0 0 / 0.4);
  }

  .source {
    justify-self: end;
    color: var(--muted);
    font-size: 0.84rem;
    text-decoration: none;
    white-space: nowrap;
  }

  .source:hover { color: var(--text); }

  main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 316px;
    min-height: 0;
  }

  .stage {
    min-width: 0;
    min-height: 0;
    padding: 1.5rem 1.75rem;
  }

  /* The preview needs breathing room around the browser frame; the code and
     install views already carry their own padding inside a scroll container. */
  .stage.flush { padding: 1.5rem 1.75rem 1.75rem; }

  @media (max-width: 900px) {
    main {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: minmax(340px, 1fr) auto;
      overflow-y: auto;
    }

    .topbar {
      grid-template-columns: 1fr auto;
      height: auto;
      padding: 0.75rem 1rem;
      row-gap: 0.75rem;
      flex-wrap: wrap;
    }

    .views {
      grid-column: 1 / -1;
      grid-row: 2;
      overflow-x: auto;
    }

    .stage { padding: 1rem; }
  }
</style>
