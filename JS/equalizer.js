// vanilla equalizer for a static portfolio site
// files assumed:
// - index.html (or another page)
// - css/equalizer.css
// - js/equalizer.js
// - assets/audio/track-1.mp3 etc.

const EQUALIZER_CONFIG = {
  tracks: [
    "assets/audio/track-1.mp3",
    "assets/audio/track-2.mp3",
    "assets/audio/track-3.mp3",
  ],
  barCount: 32,
  segments: 26,
  smoothing: 0.55,
  minLevel: 0.01,
  boost: 1.0,
  maxFrequencyRange: 0.7,
};

const equalizer = document.getElementById("equalizer");
const audio = document.getElementById("portfolio-audio");
const playStopButton = document.getElementById("play-stop-btn");
const skipButton = document.getElementById("skip-btn");
const trackLabel = document.getElementById("track-label");

let audioContext = null;
let analyser = null;
let source = null;
let dataArray = null;
let animationFrame = null;
let bars = [];
let levels = Array(EQUALIZER_CONFIG.barCount).fill(0.12);
let currentTrackIndex = 0;
let started = false;
let isPlaying = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function getSegmentColor(segmentIndex, totalSegments) {
  const hueStart = 285;
  const hueEnd = 35;
  const t = totalSegments <= 1 ? 0 : segmentIndex / (totalSegments - 1);
  const hue = lerp(hueStart, hueEnd, t);
  const lightness = lerp(58, 72, t);
  return `hsl(${hue}, 100%, ${lightness}%)`;
}

function createEqualizerBars() {
  equalizer.innerHTML = "";
  bars = [];

  for (let i = 0; i < EQUALIZER_CONFIG.barCount; i += 1) {
    const bar = document.createElement("div");
    bar.className = "eq-bar";

    const segments = [];

    for (let j = 0; j < EQUALIZER_CONFIG.segments; j += 1) {
      const segment = document.createElement("div");
      segment.className = "eq-segment";
      segment.dataset.color = getSegmentColor(j, EQUALIZER_CONFIG.segments);
      bar.appendChild(segment);
      segments.push(segment);
    }

    equalizer.appendChild(bar);
    bars.push(segments);
  }
}

function paintBars() {
  for (let i = 0; i < bars.length; i += 1) {
    const activeSegments = Math.max(1, Math.round(levels[i] * EQUALIZER_CONFIG.segments));
    const barSegments = bars[i];

    for (let j = 0; j < barSegments.length; j += 1) {
      const segment = barSegments[j];
      const isActive = j < activeSegments;
      const color = segment.dataset.color;

      segment.style.background = isActive ? color : "rgba(255, 255, 255, 0.06)";
      segment.style.opacity = isActive ? "1" : "0.35";
      segment.style.transform = isActive ? "scaleY(1)" : "scaleY(0.95)";
      segment.style.boxShadow = isActive ? `0 0 6px ${color}, 0 0 10px ${color}` : "none";
    }
  }
}

function animateEqualizer() {
  if (!analyser || !dataArray) return;

  analyser.getByteFrequencyData(dataArray);

  const usableBins = Math.floor(
  dataArray.length * EQUALIZER_CONFIG.maxFrequencyRange
);

const bucketSize =
  Math.floor(usableBins / EQUALIZER_CONFIG.barCount) || 1;

const nextLevels = [];

for (let i = 0; i < EQUALIZER_CONFIG.barCount; i += 1) {
  const start = i * bucketSize;
  const end = Math.min(start + bucketSize, usableBins);

  let sum = 0;
  for (let j = start; j < end; j += 1) {
    sum += dataArray[j] || 0;
  }

  const average = sum / Math.max(end - start, 1);
  const normalized = average / 255;

  nextLevels.push(
    clamp(
      normalized * EQUALIZER_CONFIG.boost,
      EQUALIZER_CONFIG.minLevel,
      1
    )
  );
}

  levels = levels.map((value, i) => lerp(value, nextLevels[i], EQUALIZER_CONFIG.smoothing));
  paintBars();
  animationFrame = requestAnimationFrame(animateEqualizer);
}

function updateTrackLabel() {
  if (!trackLabel) return;
  trackLabel.textContent = `Track ${currentTrackIndex + 1} of ${EQUALIZER_CONFIG.tracks.length}`;
}

function setTrack(index) {
  currentTrackIndex = index;
  audio.src = EQUALIZER_CONFIG.tracks[currentTrackIndex];
  audio.load();
  updateTrackLabel();
}

async function initAudio() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  if (!analyser) {
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.35;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  if (!source) {
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }
}

async function togglePlayStop() {
  try {
    await initAudio();

    if (!started) {
      if (!audio.src) {
        setTrack(currentTrackIndex);
      }

      await audio.play();
      started = true;
      isPlaying = true;
      playStopButton.textContent = "Stop";

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animateEqualizer);
      }

      return;
    }

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      playStopButton.textContent = "Play";
      return;
    }

    await audio.play();
    isPlaying = true;
    playStopButton.textContent = "Stop";

    if (!animationFrame) {
      animationFrame = requestAnimationFrame(animateEqualizer);
    }
  } catch (error) {
    console.error("Audio toggle failed:", error);
  }
}

async function skipTrack() {
  playNextTrack();

  if (started) {
    try {
      await initAudio();
      await audio.play();
      isPlaying = true;
      playStopButton.textContent = "Stop";
    } catch (error) {
      console.error("Skip failed:", error);
    }
  }
}

function playNextTrack() {
  const nextIndex = (currentTrackIndex + 1) % EQUALIZER_CONFIG.tracks.length;
  setTrack(nextIndex);

  if (started && isPlaying) {
    audio.play().catch((error) => {
      console.error("Next track playback failed:", error);
    });
  }
}

function bootEqualizer() {
    createEqualizerBars();
    paintBars();
    setTrack(0);

    audio.addEventListener("ended", playNextTrack);

    if (playStopButton) {
        playStopButton.addEventListener("click", togglePlayStop);
    }

    if (skipButton) {
        skipButton.addEventListener("click", skipTrack);
    }
}

bootEqualizer();
