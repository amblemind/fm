/**
 * The hosted install route: <script src=".../madeby.js" defer></script>.
 *
 * It is built from the same `tag.js` module the in-app builder uses, so the
 * hosted script and the copy-and-paste snippet cannot drift apart — which is
 * exactly what happened while these lived in two separate repositories.
 */
import { resolveTag, tagStyles } from './lib/tag.js';

// currentScript is only readable while this script is executing.
const script =
  document.currentScript ||
  document.querySelector('#madeby-fm') ||
  document.querySelector('script[src*="madeby.js"]');

const defined = (object) =>
  Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined));

function readOptions() {
  const overrides = window.madeByOverrides || {};
  const data = (script && script.dataset) || {};

  // `data-handle` is the friendlier spelling; `data-twitter-handle` is the one
  // already pasted into other people's sites, so it keeps working.
  const handle = (data.handle || data.twitterHandle || '').replace(/^@/, '');

  return {
    ...overrides,
    ...defined({
      // `location` is the published option name, `corner` is the internal one.
      corner: overrides.corner || overrides.location,
      handle: overrides.handle || (handle ? `@${handle}` : undefined),
      link: overrides.link || (handle ? `https://twitter.com/${handle}` : undefined)
    })
  };
}

function mount() {
  const tag = resolveTag(readOptions());

  const element = document.createElement('a');
  element.href = tag.link;
  element.target = '_blank';
  element.rel = 'noopener noreferrer';
  element.setAttribute('data-madeby-tag', '');

  if (tag.madeBy) element.appendChild(document.createTextNode(`${tag.madeBy} `));

  const name = document.createElement('span');
  name.style.fontWeight = 'bold';
  name.textContent = tag.handle;
  element.appendChild(name);

  // madeByCss lands last so it can override anything above it.
  Object.assign(element.style, tagStyles(tag), window.madeByCss || {});

  element.onmouseover = () => (element.style.transform = 'scale(1.1)');
  element.onmouseout = () => (element.style.transform = 'scale(1)');

  document.body.appendChild(element);
}

function start() {
  // Two copies of the script on one page should still produce one tag.
  if (document.querySelector('[data-madeby-tag]')) return;
  mount();
}

// Assigning window.onload — as this script used to — silently replaces whatever
// handler the host page had. Listening leaves the host site alone, and the
// readyState check covers being pasted at the end of <body>.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
