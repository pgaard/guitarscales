// Basic Audio Context singleton
let audioCtx;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

// Base frequencies for open strings (High E to Low E)
// Standard Tuning: E4, B3, G3, D3, A2, E2
export const STRING_FREQUENCIES = [
  329.63, // E4 (High E)
  246.94, // B3
  196.00, // G3
  146.83, // D3
  110.00, // A2
  82.41   // E2 (Low E)
];

export const getNoteFrequency = (stringIndex, fret) => {
  const baseFreq = STRING_FREQUENCIES[stringIndex];
  // Frequency formula: f = f0 * (2 ^ (n / 12))
  return baseFreq * Math.pow(2, fret / 12);
};

export const playNote = (frequency) => {
  const ctx = initAudio();

  // Create oscillator
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = 'triangle'; // Triangle wave sounds somewhat like a plucked string
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Connect graph
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  // Envelope to simulate pluck
  // Attack
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
  // Decay
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 1.5);
};
