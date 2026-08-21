<script>
  import Prism from 'prismjs';
  import CopyButton from './CopyButton.svelte';
  import { buildHostedSnippet, DEFAULTS } from './tag.js';

  let { inputs } = $props();

  // Where this app is deployed. Update if it moves to a custom domain.
  const PROD_ORIGIN = 'https://made-by-tag.vercel.app';

  // Points at wherever this is served from, so the URL survives a rename — but
  // never hands someone a localhost URL to paste into their live site.
  let origin = $derived.by(() => {
    if (typeof window === 'undefined') return PROD_ORIGIN;
    const { hostname, origin: current } = window.location;
    return hostname === 'localhost' || hostname === '127.0.0.1' ? PROD_ORIGIN : current;
  });

  let hosted = $derived(buildHostedSnippet(inputs, origin));
  let highlighted = $derived(Prism.highlight(hosted, Prism.languages.markup, 'markup'));

  const steps = [
    ['Design it', 'Use the panel on the right. The preview runs the real snippet, not a mock-up of it.'],
    ['Copy it', 'Open “Copy the Code” and hit copy. It is one self-contained script tag.'],
    ['Paste it', 'Drop it before </head> in your site’s HTML, or into any “custom code” box.']
  ];

  // Shown defaults come from DEFAULTS so the docs cannot drift from the code.
  const q = (value) => JSON.stringify(value);

  const options = [
    ['madeBy', q(DEFAULTS.madeBy), 'The lead-in text. Leave it empty for just the name.'],
    ['handle', q(DEFAULTS.handle), 'The bold part. Any name works, not only a handle.'],
    ['link', q(DEFAULTS.link), 'Where the tag points.'],
    ['textColor', q(DEFAULTS.textColor), 'Text colour.'],
    ['bgColor', q(DEFAULTS.bgColor), 'Tile colour.'],
    ['size', String(DEFAULTS.size), 'Scales text, padding and radius together, in rem.'],
    ['location', q(DEFAULTS.corner), 'Which corner the tag sits in.'],
    ['spaceTop …', String(DEFAULTS.spaceTop), 'Offset from each edge, in rem. Negatives work.']
  ];
</script>

<div class="pane">
  <ol class="steps">
    {#each steps as [title, body], i (title)}
      <li>
        <span class="num">{i + 1}</span>
        <div>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      </li>
    {/each}
  </ol>

  <section>
    <header>
      <div>
        <h3>Or load the hosted script</h3>
        <p>
          Same tag, but the code lives here instead of in your page — so fixes reach your site
          without you pasting anything again. Costs you one extra request.
        </p>
      </div>
      <CopyButton text={hosted} label="Copy" />
    </header>
    <pre class="code"><code>{@html highlighted}</code></pre>
  </section>

  <section>
    <h3>Every option</h3>
    <p>
      The block above is generated from what you have designed, so you rarely need to write these by
      hand. They are listed for when you do.
    </p>

    <dl class="options">
      {#each options as [name, fallback, description] (name)}
        <div>
          <dt><code>{name}</code> <span>{fallback}</span></dt>
          <dd>{description}</dd>
        </div>
      {/each}
    </dl>

    <p class="footnote">
      Anything these do not cover can go in <code>window.madeByCss</code>, which is merged over the
      finished styles last.
    </p>
  </section>
</div>

<style>
  .pane {
    height: 100%;
    min-height: 0;
    overflow-y: auto;
    padding-right: 0.4rem;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1.4rem;
    margin: 0 0 2.25rem;
    padding: 0;
    list-style: none;
  }

  .steps li {
    display: flex;
    gap: 0.8rem;
  }

  .num {
    flex: none;
    width: 1.55rem;
    height: 1.55rem;
    display: grid;
    place-items: center;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    color: var(--accent);
    font-size: 0.76rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  section {
    padding-top: 1.75rem;
    border-top: 1px solid var(--line);
  }

  section + section { margin-top: 2rem; }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 0.9rem;
  }

  h3 {
    margin: 0.15rem 0 0.35rem;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
    max-width: 62ch;
    color: var(--muted);
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .code {
    margin: 0;
    padding: 1rem 1.15rem;
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--panel-sunken);
    overflow-x: auto;
    font-family: var(--mono);
    font-size: 0.78rem;
    line-height: 1.65;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 0.15rem 2rem;
    margin: 1.15rem 0 1.25rem;
  }

  .options > div {
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--line);
  }

  dt {
    display: flex;
    align-items: baseline;
    gap: 0.55rem;
    margin-bottom: 0.15rem;
  }

  dt code {
    color: #79cdff;
    font-family: var(--mono);
    font-size: 0.79rem;
  }

  dt span {
    color: var(--muted);
    font-family: var(--mono);
    font-size: 0.72rem;
  }

  dd {
    margin: 0;
    color: var(--muted);
    font-size: 0.8rem;
    line-height: 1.5;
  }

  .footnote code {
    color: #79cdff;
    font-family: var(--mono);
    font-size: 0.82em;
  }
</style>
