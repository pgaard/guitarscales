// Width the board needs to lay out without squishing: the nut plus one slot per fret.
export const getBoardWidth = (numFrets) => Math.max(100 + (numFrets * 55), 300);

// Position markers on a standard neck: a single dot at the 3rd, 5th, 7th and 9th
// of each octave, and a double dot at the octave itself (12th, 24th).
// Returns how many dots the given fret gets.
export const getInlayCount = (fret) => {
  if (fret === 0) return 0;
  const position = fret % 12;
  if (position === 0) return 2;
  return [3, 5, 7, 9].includes(position) ? 1 : 0;
};
