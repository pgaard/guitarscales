export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALES = {
  major: { name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11] },
  minor: { name: 'Minor', intervals: [0, 2, 3, 5, 7, 8, 10] },
  dorian: { name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10] },
  phrygian: { name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10] },
  lydian: { name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11] },
  mixolydian: { name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10] },
  locrian: { name: 'Locrian', intervals: [0, 1, 3, 5, 6, 8, 10] },
  pentatonic_minor: { name: 'Pentatonic Minor', intervals: [0, 3, 5, 7, 10], parentScale: 'minor' },
  pentatonic_major: { name: 'Pentatonic Major', intervals: [0, 2, 4, 7, 9], parentScale: 'major' },
  blues: { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10], parentScale: 'minor' },
  harmonic_minor: { name: 'Harmonic Minor', intervals: [0, 2, 3, 5, 7, 8, 11] },
  melodic_minor: { name: 'Melodic Minor', intervals: [0, 2, 3, 5, 7, 9, 11] },
  phrygian_dominant: { name: 'Phrygian Dominant', intervals: [0, 1, 4, 5, 7, 8, 10] },
  double_harmonic: { name: 'Double Harmonic', intervals: [0, 1, 4, 5, 7, 8, 11] },
  hirajoshi: { name: 'Hirajoshi', intervals: [0, 2, 3, 7, 8], parentScale: 'minor' },
  wholetone: { name: 'Whole Tone', intervals: [0, 2, 4, 6, 8, 10] },
  diminished: { name: 'Diminished', intervals: [0, 2, 3, 5, 6, 8, 9, 11] }
};

export const TUNINGS = {
  standard: { name: 'Standard', description: 'E-A-D-G-B-E', strings: ['E', 'B', 'G', 'D', 'A', 'E'], freqs: [329.63, 246.94, 196.00, 146.83, 110.00, 82.41] },
  drop_d: { name: 'Drop D', description: 'D-A-D-G-B-E', strings: ['E', 'B', 'G', 'D', 'A', 'D'], freqs: [329.63, 246.94, 196.00, 146.83, 110.00, 73.42] },
  open_g: { name: 'Open G', description: 'D-G-D-G-B-D', strings: ['D', 'B', 'G', 'D', 'G', 'D'], freqs: [293.66, 246.94, 196.00, 146.83, 98.00, 73.42] },
  dadgad: { name: 'DADGAD', description: 'D-A-D-G-A-D', strings: ['D', 'A', 'G', 'D', 'A', 'D'], freqs: [293.66, 220.00, 196.00, 146.83, 110.00, 73.42] },
  open_d: { name: 'Open D', description: 'D-A-D-F#-A-D', strings: ['D', 'A', 'F#', 'D', 'A', 'D'], freqs: [293.66, 220.00, 185.00, 146.83, 110.00, 73.42] },
  eb_standard: { name: 'Eb Standard', description: 'Eb-Ab-Db-Gb-Bb-Eb', strings: ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'], freqs: [311.13, 233.08, 185.00, 138.59, 103.83, 77.78] },
  open_e: { name: 'Open E', description: 'E-B-E-G#-B-E', strings: ['E', 'B', 'G#', 'E', 'B', 'E'], freqs: [329.63, 246.94, 207.65, 164.81, 123.47, 82.41] },
  open_a: { name: 'Open A', description: 'E-A-C#-E-A-E', strings: ['E', 'A', 'E', 'C#', 'A', 'E'], freqs: [329.63, 220.00, 164.81, 138.59, 110.00, 82.41] },
  drop_c: { name: 'Drop C', description: 'C-G-C-F-A-D', strings: ['D', 'A', 'F', 'C', 'G', 'C'], freqs: [293.66, 220.00, 174.61, 130.81, 98.00, 65.41] }
};

export const TUNING = TUNINGS.standard.strings; // Default fallback

export function getNoteIndex(note) {
  return NOTES.indexOf(note);
}

export function getNoteFromIndex(index) {
  return NOTES[index % 12];
}

export function getScaleNotes(rootNote, scaleType) {
  const rootIndex = getNoteIndex(rootNote);
  const intervals = SCALES[scaleType].intervals;
  return intervals.map(interval => getNoteFromIndex(rootIndex + interval));
}

export function getIntervalName(semitones) {
  const intervals = {
    0: 'R',
    1: 'b2',
    2: '2',
    3: 'b3',
    4: '3',
    5: '4',
    6: 'b5',
    7: '5',
    8: 'b6',
    9: '6',
    10: 'b7',
    11: '7'
  };
  return intervals[semitones % 12];
}

export function getTriadNotes(rootNote, scaleType, keyNote) {
  if (!rootNote) return null;

  const currentScaleNotes = getScaleNotes(keyNote, scaleType);

  const scaleInfo = SCALES[scaleType];

  // If this scale has a parent (e.g., Pentatonic -> Minor), derive triad from parent
  if (scaleInfo.parentScale) {
    const parentNotes = getScaleNotes(keyNote, scaleInfo.parentScale);
    const rootIndex = parentNotes.indexOf(rootNote);

    // We expect parent scales to be 7-note scales where triads are 1, 3, 5
    // Note: This assumes the rootNote exists in the parent scale
    if (rootIndex === -1) {
      return null;
    }

    const indices = [0, 2, 4];
    const theoreticalTriad = indices.map(offset => parentNotes[(rootIndex + offset) % parentNotes.length]);

    // Return theoretical triad (don't filter, so we can see outside notes)
    return theoreticalTriad;
  }

  // Standard logic for full scales (1, 3, 5 of the scale itself)
  if (!currentScaleNotes.includes(rootNote)) return null;
  const rootIndex = currentScaleNotes.indexOf(rootNote);
  const indices = [0, 2, 4];
  return indices.map(offset => currentScaleNotes[(rootIndex + offset) % currentScaleNotes.length]);
}

// Triad qualities keyed by "<third interval>,<fifth interval>" in semitones
const CHORD_QUALITIES = {
  '4,7': { name: 'Major', symbol: 'maj' },
  '3,7': { name: 'Minor', symbol: 'min' },
  '3,6': { name: 'Diminished', symbol: 'dim' },
  '4,8': { name: 'Augmented', symbol: 'aug' },
  '2,7': { name: 'Sus2', symbol: 'sus2' },
  '5,7': { name: 'Sus4', symbol: 'sus4' },
  '4,6': { name: 'Major b5', symbol: 'maj♭5' },
  '3,8': { name: 'Minor #5', symbol: 'min♯5' },
  '2,6': { name: 'Sus2 b5', symbol: 'sus2♭5' },
  '5,8': { name: 'Sus4 #5', symbol: 'sus4♯5' },
  '1,7': { name: 'Phrygian b2', symbol: '♭2' }
};

export function getChordQuality(triadNotes) {
  if (!triadNotes || triadNotes.length !== 3) return null;

  const rootIndex = getNoteIndex(triadNotes[0]);
  const thirdIndex = getNoteIndex(triadNotes[1]);
  const fifthIndex = getNoteIndex(triadNotes[2]);

  let firstInterval = thirdIndex - rootIndex;
  if (firstInterval < 0) firstInterval += 12;

  let secondInterval = fifthIndex - rootIndex;
  if (secondInterval < 0) secondInterval += 12;

  const quality = CHORD_QUALITIES[`${firstInterval},${secondInterval}`];
  if (quality) return quality;

  // Unusual stack of "thirds" - describe it by its intervals instead
  const label = `${getIntervalName(firstInterval)}/${getIntervalName(secondInterval)}`;
  return { name: label, symbol: label };
}

export function getChordName(triadNotes) {
  const quality = getChordQuality(triadNotes);
  return quality ? quality.name : '';
}

// Compact chord label for a scale degree, e.g. "Dmin", "B dim"
export function getDegreeChord(rootNote, scaleType, keyNote) {
  const triadNotes = getTriadNotes(rootNote, scaleType, keyNote);
  const quality = getChordQuality(triadNotes);
  if (!quality) return null;
  return { ...quality, root: rootNote, notes: triadNotes };
}
