/**
 * A stand-in website for the preview iframe. Deliberately generic and low
 * contrast so the tag is the only saturated thing on screen — the point is to
 * judge the tag, not the page under it.
 */
export function demoPage(theme = 'light') {
  const dark = theme === 'dark';

  const palette = dark
    ? { bg: '#17181b', panel: '#212328', line: '#2e3138', ink: '#e8e9ec', mute: '#8b8f98', block: '#2a2d34' }
    : { bg: '#ffffff', panel: '#f6f7f9', line: '#e6e8ec', ink: '#1d1f24', mute: '#767b85', block: '#e9ebef' };

  return `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Your website</title>
<style>
  *, *::before, *::after { box-sizing: border-box; }
  :root { color-scheme: ${dark ? 'dark' : 'light'}; }
  body {
    margin: 0;
    background: ${palette.bg};
    color: ${palette.ink};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 860px; margin: 0 auto; padding: 0 32px; }
  header {
    display: flex; align-items: center; justify-content: space-between;
    height: 64px; border-bottom: 1px solid ${palette.line};
  }
  .logo { display: flex; align-items: center; gap: 9px; font-weight: 650; letter-spacing: -0.01em; }
  .logo i { width: 20px; height: 20px; border-radius: 6px; background: ${palette.block}; display: block; }
  nav { display: flex; gap: 22px; }
  nav span { color: ${palette.mute}; font-size: 14px; }
  .hero { padding: 76px 0 64px; max-width: 560px; }
  h1 { font-size: 40px; line-height: 1.12; letter-spacing: -0.025em; margin: 0 0 16px; font-weight: 680; }
  p { color: ${palette.mute}; font-size: 16px; line-height: 1.65; margin: 0 0 28px; }
  .cta { display: inline-block; background: ${palette.block}; color: ${palette.mute};
         padding: 11px 20px; border-radius: 8px; font-size: 14px; font-weight: 550; }
  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding-bottom: 96px; }
  .card { background: ${palette.panel}; border: 1px solid ${palette.line}; border-radius: 12px; padding: 20px; }
  .bar { height: 8px; border-radius: 4px; background: ${palette.block}; margin-bottom: 10px; }
  footer { border-top: 1px solid ${palette.line}; padding: 26px 0 120px; color: ${palette.mute}; font-size: 13px; }

  /* The preview frame gets narrow on small screens and in split layouts. */
  @media (max-width: 620px) {
    .wrap { padding: 0 20px; }
    nav { display: none; }
    .hero { padding: 44px 0 40px; }
    h1 { font-size: 28px; }
    .cards { grid-template-columns: 1fr; padding-bottom: 64px; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="logo"><i></i> AmbleMind</div>
      <nav><span>Product</span><span>Pricing</span><span>Docs</span><span>Log in</span></nav>
    </header>

    <div class="hero">
      <h1>A quiet page, so you can judge the tag.</h1>
      <p>Everything here is grey on purpose. Drag the controls and watch the corner
         you picked — this frame runs the exact snippet you are about to copy.</p>
      <span class="cta">Get started</span>
    </div>

    <div class="cards">
      <div class="card"><div class="bar" style="width:70%"></div><div class="bar" style="width:100%"></div><div class="bar" style="width:44%"></div></div>
      <div class="card"><div class="bar" style="width:56%"></div><div class="bar" style="width:92%"></div><div class="bar" style="width:66%"></div></div>
      <div class="card"><div class="bar" style="width:80%"></div><div class="bar" style="width:60%"></div><div class="bar" style="width:38%"></div></div>
    </div>

    <footer>© AmbleMind. A placeholder site.</footer>
  </div>
</body>
</html>`;
}
