<script>
  import { demoPage } from './demoPage.js';

  let { snippet } = $props();

  let theme = $state('light');

  // A function replacement keeps `$&`-style sequences in someone's name from
  // being treated as backreferences.
  let document_ = $derived(demoPage(theme).replace('</head>', () => `${snippet}\n</head>`));
</script>

<div class="browser">
  <div class="chrome">
    <div class="dots"><i></i><i></i><i></i></div>
    <div class="url">your-website.com</div>
    <div class="themes" role="group" aria-label="Demo page theme">
      {#each ['light', 'dark'] as option (option)}
        <button
          type="button"
          class:active={theme === option}
          aria-pressed={theme === option}
          onclick={() => (theme = option)}
        >{option}</button>
      {/each}
    </div>
  </div>

  <!-- No allow-same-origin: the snippet runs in an opaque origin and cannot
       reach back into this page. -->
  <iframe
    title="Live preview of your Made By tag"
    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
    srcdoc={document_}
  ></iframe>
</div>

<style>
  .browser {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    border: 1px solid var(--line-strong);
    border-radius: 12px;
    overflow: hidden;
    background: var(--panel-sunken);
    box-shadow: 0 24px 60px -30px rgb(0 0 0 / 0.75);
  }

  .chrome {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1rem;
    flex: none;
    height: 42px;
    padding: 0 0.85rem;
    background: var(--panel-raised);
    border-bottom: 1px solid var(--line);
  }

  .dots {
    display: flex;
    gap: 6px;
  }

  .dots i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--line-strong);
  }

  .url {
    justify-self: center;
    min-width: 210px;
    padding: 0.28rem 0.9rem;
    border-radius: 6px;
    background: var(--panel-sunken);
    color: var(--muted);
    font-size: 0.76rem;
    text-align: center;
  }

  .themes {
    justify-self: end;
    display: flex;
    padding: 2px;
    border-radius: 6px;
    background: var(--panel-sunken);
  }

  .themes button {
    padding: 0.2rem 0.55rem;
    border: none;
    border-radius: 4px;
    background: none;
    color: var(--muted);
    font: inherit;
    font-size: 0.72rem;
    text-transform: capitalize;
    cursor: pointer;
  }

  .themes button.active {
    background: var(--line-strong);
    color: var(--text);
  }

  iframe {
    flex: 1;
    min-height: 0;
    width: 100%;
    border: none;
    display: block;
  }

  @media (max-width: 620px) {
    .chrome {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0.5rem;
      padding: 0 0.5rem;
    }

    .dots { display: none; }

    .url {
      justify-self: stretch;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
