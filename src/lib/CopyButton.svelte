<script>
  import { onDestroy } from 'svelte';

  let { text, label = 'Copy code', done = 'Copied' } = $props();

  let copied = $state(false);
  let timer;

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // The async clipboard API is unavailable on insecure origins and in older
      // browsers, so fall back to a throwaway textarea and execCommand.
      const scratch = document.createElement('textarea');
      scratch.value = text;
      scratch.setAttribute('readonly', '');
      scratch.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.appendChild(scratch);
      scratch.select();
      document.execCommand('copy');
      scratch.remove();
    }

    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1800);
  }

  onDestroy(() => clearTimeout(timer));
</script>

<button type="button" class="copy" class:copied onclick={copy}>
  {#if copied}
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" /></svg>
    {done}
  {:else}
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.75" />
      <path d="M10.5 3.2A1.7 1.7 0 0 0 8.9 2H4.2A2.2 2.2 0 0 0 2 4.2v4.7c0 .75.48 1.38 1.15 1.61" />
    </svg>
    {label}
  {/if}
</button>

<style>
  .copy {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.44rem 0.8rem;
    border: 1px solid var(--line-strong);
    border-radius: 7px;
    background: var(--panel-raised);
    color: var(--text);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s, color 0.15s;
  }

  .copy:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .copy.copied,
  .copy.copied:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
    color: var(--accent);
  }

  svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
