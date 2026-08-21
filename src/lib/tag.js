/**
 * One source of truth for the Made By tag.
 *
 * `buildSnippet()` produces the exact HTML a visitor copies, and the preview
 * iframe runs that same string. There is no second implementation that can
 * drift from it, so what you see in the preview is what your site will do.
 */

export const CORNERS = [
  { value: 'top-left', label: 'Top left' },
  { value: 'top-right', label: 'Top right' },
  { value: 'bottom-left', label: 'Bottom left' },
  { value: 'bottom-right', label: 'Bottom right' }
];

export const DEFAULTS = {
  madeBy: 'Made by',
  handle: '@darrenalderman',
  link: 'https://www.linkedin.com/in/darren-alderman/',

  textColor: '#ffffff',
  bgColor: '#c76b2e',
  size: 1,

  corner: 'bottom-right',
  spaceTop: 1,
  spaceRight: 1,
  spaceBottom: 1,
  spaceLeft: 1
};

export const SIZE_MIN = 0.5;
export const SIZE_MAX = 3;

/** Keeps generated CSS free of values like `0.6666666666666666rem`. */
const round = (value) => Math.round(value * 1000) / 1000;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const text = (value, fallback) => {
  const trimmed = typeof value === 'string' ? value.trim() : '';
  return trimmed || fallback;
};

const offset = (value, fallback) => {
  const parsed = Number(value);
  // 0 is a real answer here, so only a genuinely absent value falls back.
  return Number.isFinite(parsed) ? round(clamp(parsed, -20, 20)) : fallback;
};

/** Fills in the gaps a half-finished form leaves behind. */
export function resolveTag(input = {}) {
  const merged = { ...DEFAULTS, ...input };
  const size = round(clamp(Number(merged.size) || DEFAULTS.size, SIZE_MIN, SIZE_MAX));

  return {
    // An empty "Made by" is allowed on purpose — some people want the name alone.
    madeBy: typeof merged.madeBy === 'string' ? merged.madeBy.trim() : DEFAULTS.madeBy,
    handle: text(merged.handle, DEFAULTS.handle),
    link: text(merged.link, DEFAULTS.link),

    textColor: text(merged.textColor, DEFAULTS.textColor),
    bgColor: text(merged.bgColor, DEFAULTS.bgColor),
    size,

    corner: CORNERS.some((c) => c.value === merged.corner) ? merged.corner : DEFAULTS.corner,
    spaceTop: offset(merged.spaceTop, DEFAULTS.spaceTop),
    spaceRight: offset(merged.spaceRight, DEFAULTS.spaceRight),
    spaceBottom: offset(merged.spaceBottom, DEFAULTS.spaceBottom),
    spaceLeft: offset(merged.spaceLeft, DEFAULTS.spaceLeft)
  };
}

/** The inline styles the tag carries, in the order they read best in the snippet. */
export function tagStyles(tag) {
  const { size, corner } = tag;

  const anchor = {};
  if (corner.includes('top')) anchor.top = '0';
  else anchor.bottom = '0';
  if (corner.includes('left')) anchor.left = '0';
  else anchor.right = '0';

  return {
    position: 'fixed',
    ...anchor,
    margin: `${tag.spaceTop}rem ${tag.spaceRight}rem ${tag.spaceBottom}rem ${tag.spaceLeft}rem`,
    padding: `${round(size / 2)}rem ${round(size / 1.5)}rem`,
    lineHeight: `${size}rem`,
    fontSize: `${size}rem`,
    fontWeight: 'normal',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
    color: tag.textColor,
    backgroundColor: tag.bgColor,
    textDecoration: 'none',
    borderRadius: `${round(size / 2)}rem`,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    zIndex: '1000'
  };
}

/**
 * Quotes a value for the snippet. JSON.stringify handles quotes, backslashes and
 * newlines; the extra pass stops a literal `</script>` in someone's name from
 * closing the script tag early.
 */
const quote = (value) => JSON.stringify(String(value)).replace(/<\/(script)/gi, '<\\/$1');

/** The copy-and-paste snippet. */
export function buildSnippet(input) {
  const tag = resolveTag(input);
  const styles = Object.entries(tagStyles(tag))
    .map(([property, value]) => `          ${property}: ${quote(value)}`)
    .join(',\n');

  const lines = [
    '<!-- Made By tag -->',
    '<script>',
    '  (function () {',
    '    function mount() {',
    '      var tag = document.createElement("a");',
    `      tag.href = ${quote(tag.link)};`,
    '      tag.target = "_blank";',
    '      tag.rel = "noopener noreferrer";',
    ...(tag.madeBy ? [`      tag.appendChild(document.createTextNode(${quote(`${tag.madeBy} `)}));`] : []),
    '',
    '      var name = document.createElement("span");',
    '      name.style.fontWeight = "bold";',
    `      name.textContent = ${quote(tag.handle)};`,
    '      tag.appendChild(name);',
    '',
    '      Object.assign(tag.style, {',
    styles,
    '      });',
    '',
    '      tag.onmouseover = function () { tag.style.transform = "scale(1.1)"; };',
    '      tag.onmouseout = function () { tag.style.transform = "scale(1)"; };',
    '      document.body.appendChild(tag);',
    '    }',
    '',
    '    // Runs whether the snippet sits in <head> or at the end of <body>.',
    '    if (document.readyState === "loading") {',
    '      document.addEventListener("DOMContentLoaded", mount);',
    '    } else {',
    '      mount();',
    '    }',
    '  })();',
    '<\/script>'
  ];

  return lines.join('\n');
}

/**
 * The other way to install the same tag: load `madeby.js` from this site and
 * describe the design in `window.madeByOverrides`. Longer to set up than the
 * standalone snippet, but the script can be updated after the fact.
 */
export function buildHostedSnippet(input, origin = '') {
  const tag = resolveTag(input);

  const options = [
    ['madeBy', tag.madeBy],
    ['handle', tag.handle],
    ['link', tag.link],
    ['textColor', tag.textColor],
    ['bgColor', tag.bgColor],
    ['size', tag.size],
    // `location` rather than `corner`: this is the published option name and
    // sites already in the wild use it.
    ['location', tag.corner],
    ['spaceTop', tag.spaceTop],
    ['spaceRight', tag.spaceRight],
    ['spaceBottom', tag.spaceBottom],
    ['spaceLeft', tag.spaceLeft]
  ]
    .map(([key, value]) => `    ${key}: ${typeof value === 'number' ? value : quote(value)}`)
    .join(',\n');

  return [
    '<script>',
    '  window.madeByOverrides = {',
    options,
    '  };',
    '<\/script>',
    `<script src="${origin}/madeby.js" defer><\/script>`
  ].join('\n');
}
