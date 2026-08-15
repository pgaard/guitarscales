// Width the board needs to lay out without squishing: the nut plus one slot per fret.
export const getBoardWidth = (numFrets) => Math.max(100 + (numFrets * 55), 300);
