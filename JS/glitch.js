const random = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

const getKeyFrames = (
  name,
  glitchPercentageDuration,
  steps = 3,
  tick = 0.1
) => {
  const percentageStep = 100 / steps;

  const keyframes = [];

  // First keyframe
  const baseKeys = [0];

  for (let i = 1; i < steps; i++) {
    const p = i * percentageStep;
    baseKeys.push(p);
    baseKeys.push(p + glitchPercentageDuration);
  }

  // Last keyframe
  baseKeys.push(100);

  keyframes.push({
    keys: baseKeys,
    css: {
      transform: "none",
      filter: "hue-rotate(0) drop-shadow(0 0 0 transparent)" // Hack to force animation in Safari
    }
  });

  for (let i = 1; i < steps; i++) {
    const p = i * percentageStep;

    // Blue / red shadow
    const color =
      Math.random() > 0.5 ? "rgb(255 0 0 / 0.1)" : "rgb(0 0 255 / 0.1)";
    const shadowX = random(-4, 4);
    const shadowY = random(-4, 4);

    keyframes.push({
      keys: [p + tick, p + glitchPercentageDuration - tick],
      css: {
        transform: `translateX(var(--glitch-x-${i}))`,
        filter: `hue-rotate(var(--glitch-hue-${i})) drop-shadow(${shadowX}px ${shadowY}px 0 ${color})`
      }
    });
  }

  const css = keyframes
    .map((keyframe) => {
      const keys = keyframe.keys
        .map((key) => `${key.toFixed(2)}%`)
        .join(",\n  ");

      const content = Object.entries(keyframe.css)
        .map(([key, value]) => `  ${key}: ${value};`)
        .join("\n  ");

      return [keys, "{", content, "}"].join("\n  ");
    })
    .join("\n\n  ");

  return `@keyframes ${name} {\n  ${css}\n}`;
};

const getStripHTML = (top, stripHeight) => {
  const duration = random(5, 10);
  const name = `glitch-${duration}`;

  return `<div 
  class="strip" 
  style="
    --glitch-x-1: ${random(-10, 10)}em;
    --glitch-hue-1: ${random(-50, 50)}deg;
    --glitch-x-2: ${random(-10, 10)}em;
    --glitch-hue-2: ${random(-50, 50)}deg;

    background-position: 0 -${top}em;
    height: ${stripHeight}em; 
    animation-name: ${name};
    animation-duration: ${duration * 1000}ms; 
    animation-delay: ${random(0, 2)}s;
  "
></div>`;
};

const getGlitchHTML = (height) => {
  let i = 0;
  const html = [];

  while (true) {
    const stripHeight = random(1, 6);

    if (i + stripHeight < height) {
      const strip = getStripHTML(i, stripHeight);
      html.push(strip);
    } else {
      // Last strip
      const strip = getStripHTML(i, height - i);
      html.push(strip);
      break;
    }

    i = i + stripHeight;
  }

  return html;
};

const bard = document.querySelector(".bard");
bard.innerHTML = getGlitchHTML(62).join("");