<script>
  const GITHUB_MARK =
    'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z';

  const CACHE_TTL = 60 * 60 * 1000;

  let { repo } = $props();

  let stars = $state(null);

  const format = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count));

  /**
   * GitHub's own button is an iframe carrying GitHub's styling, which reads as
   * a foreign object on a dark page and costs a third-party request. This is
   * the same information, drawn in this site's own vocabulary.
   *
   * The count is a bonus: the unauthenticated API allows 60 requests an hour
   * per IP, so a miss is expected and the button renders fine without it.
   */
  $effect(() => {
    const key = `stars:${repo}`;

    try {
      const cached = JSON.parse(sessionStorage.getItem(key));
      if (cached && Date.now() - cached.at < CACHE_TTL) {
        stars = cached.count;
        return;
      }
    } catch {
      // Private browsing, or junk in the key. Just refetch.
    }

    const controller = new AbortController();

    fetch(`https://api.github.com/repos/${repo}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((data) => {
        if (typeof data.stargazers_count !== 'number') return;
        stars = data.stargazers_count;
        try {
          sessionStorage.setItem(key, JSON.stringify({ count: stars, at: Date.now() }));
        } catch {
          // Storage blocked; the count still shows for this page view.
        }
      })
      .catch(() => {
        // Rate limited, offline, or aborted. The button works without a count.
      });

    return () => controller.abort();
  });
</script>

<a
  class="star"
  href="https://github.com/{repo}"
  target="_blank"
  rel="noopener"
  aria-label="Star {repo} on GitHub{stars ? `, ${stars} stars` : ''}"
>
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d={GITHUB_MARK} /></svg>
  <span class="label">Star</span>
  <!-- A visible "0" reads worse than no number at all; the button is an
       invitation until there is something to report. -->
  {#if stars > 0}
    <span class="count">{format(stars)}</span>
  {/if}
</a>

<style>
  .star {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.32rem 0.5rem 0.32rem 0.7rem;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    background: var(--panel-raised);
    color: var(--text);
    font-size: 0.82rem;
    font-weight: 550;
    line-height: 1;
    text-decoration: none;
    white-space: nowrap;
    transition: border-color 0.16s, color 0.16s, background 0.16s;
  }

  .star:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: var(--accent-soft);
  }

  svg {
    width: 15px;
    height: 15px;
    fill: currentColor;
    flex: none;
  }

  /* Sits in its own well so the number reads as a counter, not more label. */
  .count {
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    background: var(--panel-sunken);
    font-size: 0.76rem;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 560px) {
    .label {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }

    .star { padding: 0.32rem 0.5rem; }
  }
</style>
