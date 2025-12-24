export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALES = {
  major: { name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11] },
  minor: { name: 'Minor', intervals: [0, 2, 3, 5, 7, 8, 10] },
  dorian: { name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10] },
  phrygian: { name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10] },
  lydian: { name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11] },
  mixolydian: { name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10] },
  locrian: { name: 'Locrian', intervals: [0, 1, 3, 5, 6, 8, 10] },
  pentatonic_minor: { name: 'Pentatonic Minor', intervals: [0, 3, 5, 7, 10] },
  pentatonic_major: { name: 'Pentatonic Major', intervals: [0, 2, 4, 7, 9] },
  blues: { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10] },

};

export const TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E

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
