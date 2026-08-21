<script>
  import Prism from 'prismjs';
  import CopyButton from './CopyButton.svelte';

  let { snippet } = $props();

  // Highlighting is done here rather than by Prism's automatic pass, so the
  // markup deliberately avoids the `language-*` class that pass looks for.
  let highlighted = $derived(Prism.highlight(snippet, Prism.languages.markup, 'markup'));
</script>

<div class="pane">
  <header>
    <p>Paste this just before the closing <code>&lt;/head&gt;</code> tag on any page. Nothing to install.</p>
    <CopyButton text={snippet} />
  </header>

  <pre class="code"><code>{@html highlighted}</code></pre>
</div>

<style>
  .pane {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    gap: 0.85rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex: none;
  }

  header p {
    margin: 0;
    color: var(--muted);
    font-size: 0.86rem;
  }

  header code {
    color: var(--text);
    font-family: var(--mono);
    font-size: 0.82em;
  }

  .code {
    flex: 1;
    min-height: 0;
    margin: 0;
    padding: 1.1rem 1.25rem;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--panel-sunken);
    overflow: auto;
    font-family: var(--mono);
    font-size: 0.79rem;
    line-height: 1.65;
    tab-size: 2;
  }
</style>
