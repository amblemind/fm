<script>
  import { CORNERS, DEFAULTS, SIZE_MAX, SIZE_MIN } from './tag.js';

  let { inputs = $bindable() } = $props();

  const OFFSETS = [
    { key: 'spaceTop', label: 'Top', cell: 'top' },
    { key: 'spaceLeft', label: 'Left', cell: 'left' },
    { key: 'spaceRight', label: 'Right', cell: 'right' },
    { key: 'spaceBottom', label: 'Bottom', cell: 'bottom' }
  ];

  let dirty = $derived(Object.keys(DEFAULTS).some((key) => inputs[key] !== DEFAULTS[key]));

  const reset = () => (inputs = { ...DEFAULTS });
</script>

<aside class="panel">
  <section>
    <h2>Content</h2>

    <label class="field">
      <span>Made by</span>
      <input type="text" placeholder="Made by" bind:value={inputs.madeBy} />
    </label>

    <label class="field">
      <span>Name or handle</span>
      <input type="text" placeholder="@nocodedarren" bind:value={inputs.handle} />
    </label>

    <label class="field">
      <span>Links to</span>
      <input type="url" placeholder="https://twitter.com/nocodedarren" bind:value={inputs.link} />
    </label>
  </section>

  <section>
    <h2>Style</h2>

    <div class="pair">
      <label class="field">
        <span>Text</span>
        <div class="colour">
          <input type="color" bind:value={inputs.textColor} aria-label="Text colour" />
          <input type="text" spellcheck="false" bind:value={inputs.textColor} />
        </div>
      </label>

      <label class="field">
        <span>Background</span>
        <div class="colour">
          <input type="color" bind:value={inputs.bgColor} aria-label="Background colour" />
          <input type="text" spellcheck="false" bind:value={inputs.bgColor} />
        </div>
      </label>
    </div>

    <label class="field">
      <span>Size <b>{Number(inputs.size).toFixed(2)}rem</b></span>
      <input
        type="range"
        min={SIZE_MIN}
        max={SIZE_MAX}
        step="0.05"
        bind:value={inputs.size}
      />
    </label>
  </section>

  <section>
    <h2>Location</h2>
    <p class="hint">Pick a corner, then nudge it. Offsets are in rem, and negatives work.</p>

    <div class="pad">
      <div class="corners" role="group" aria-label="Corner">
        {#each CORNERS as corner (corner.value)}
          <button
            type="button"
            class="corner {corner.value}"
            class:active={inputs.corner === corner.value}
            aria-pressed={inputs.corner === corner.value}
            title={corner.label}
            onclick={() => (inputs.corner = corner.value)}
          ><i></i><span class="sr">{corner.label}</span></button>
        {/each}
      </div>

      {#each OFFSETS as offset (offset.key)}
        <label class="offset {offset.cell}">
          <span>{offset.label}</span>
          <input type="number" step="0.25" placeholder="1" bind:value={inputs[offset.key]} />
        </label>
      {/each}
    </div>
  </section>

  <button type="button" class="reset" onclick={reset} disabled={!dirty}>Reset to defaults</button>
</aside>

<style>
  .panel {
    display: flex;
    flex-direction: column;
    gap: 1.35rem;
    height: 100%;
    min-height: 0;
    padding: 1.35rem 1.25rem 1.5rem;
    border-left: 1px solid var(--line);
    background: var(--panel);
    overflow-y: auto;
  }

  h2 {
    margin: 0 0 0.85rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .hint {
    margin: -0.25rem 0 0.9rem;
    color: var(--muted);
    font-size: 0.76rem;
    line-height: 1.5;
  }

  .field {
    display: block;
    margin-bottom: 0.8rem;
  }

  .pair {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
  }

  .field > span {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.35rem;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .field > span b {
    color: var(--text);
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  input[type='text'],
  input[type='url'],
  input[type='number'] {
    width: 100%;
    padding: 0.5rem 0.6rem;
    border: 1px solid var(--line);
    border-radius: 7px;
    background: var(--panel-sunken);
    color: var(--text);
    font: inherit;
    font-size: 0.85rem;
  }

  input:focus-visible {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-soft);
  }

  .colour {
    display: grid;
    gap: 0.35rem;
  }

  .colour input[type='color'] {
    width: 100%;
    height: 2.1rem;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: 7px;
    background: none;
    cursor: pointer;
  }

  .colour input[type='color']::-webkit-color-swatch-wrapper { padding: 3px; }
  .colour input[type='color']::-webkit-color-swatch { border: none; border-radius: 4px; }

  .colour input[type='text'] {
    font-family: var(--mono);
    font-size: 0.78rem;
    text-transform: lowercase;
  }

  input[type='range'] {
    width: 100%;
    height: 1.1rem;
    appearance: none;
    background: none;
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 3px;
    border-radius: 2px;
    background: var(--line-strong);
  }

  input[type='range']::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -5.5px;
    border-radius: 50%;
    background: var(--accent);
  }

  input[type='range']::-moz-range-track {
    height: 3px;
    border-radius: 2px;
    background: var(--line-strong);
  }

  input[type='range']::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 50%;
    background: var(--accent);
  }

  /* The spatial control: corner picker in the middle, its four offsets around it. */
  .pad {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.5rem;
    align-items: center;
    justify-items: center;
    width: fit-content;
    margin: 0 auto;
  }

  .corners {
    grid-area: 2 / 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 3px;
    width: 76px;
    height: 58px;
    padding: 3px;
    border: 1px solid var(--line-strong);
    border-radius: 8px;
    background: var(--panel-sunken);
  }

  .corner {
    position: relative;
    padding: 0;
    border: none;
    border-radius: 4px;
    background: none;
    cursor: pointer;
    transition: background 0.15s;
  }

  .corner:hover { background: var(--line); }

  .corner i {
    position: absolute;
    width: 12px;
    height: 6px;
    border-radius: 2px;
    background: var(--line-strong);
    transition: background 0.15s;
  }

  .corner.active i { background: var(--accent); }

  .corner.top-left i { top: 3px; left: 3px; }
  .corner.top-right i { top: 3px; right: 3px; }
  .corner.bottom-left i { bottom: 3px; left: 3px; }
  .corner.bottom-right i { bottom: 3px; right: 3px; }

  .offset { text-align: center; }
  .offset.top { grid-area: 1 / 2; }
  .offset.left { grid-area: 2 / 1; }
  .offset.right { grid-area: 2 / 3; }
  .offset.bottom { grid-area: 3 / 2; }

  .offset span {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--muted);
    font-size: 0.7rem;
  }

  .offset input {
    width: 3.4rem;
    padding: 0.35rem 0.2rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .reset {
    margin-top: auto;
    padding: 0.5rem;
    border: 1px solid var(--line);
    border-radius: 7px;
    background: none;
    color: var(--muted);
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .reset:hover:not(:disabled) {
    color: var(--text);
    border-color: var(--line-strong);
  }

  .reset:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
</style>
