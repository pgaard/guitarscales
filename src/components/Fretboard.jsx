import React from 'react';
import './Fretboard.css';
import { TUNING, getNoteIndex, getNoteFromIndex, getScaleNotes, getIntervalName } from '../utils/musicTheory';

const Fretboard = ({ keyNote, scaleType, displayMode }) => {
  const numFrets = 15;
  const strings = TUNING; // ['E', 'B', 'G', 'D', 'A', 'E']

  const scaleNotes = getScaleNotes(keyNote, scaleType);
  const rootNoteIndex = getNoteIndex(keyNote);

  const getNoteAtFret = (stringNote, fret) => {
    const stringBaseIndex = getNoteIndex(stringNote);
    return getNoteFromIndex(stringBaseIndex + fret);
  };

  const isNoteInScale = (note) => {
    return scaleNotes.includes(note);
  };

  const getInterval = (note) => {
    const noteIndex = getNoteIndex(note);
    let semitones = noteIndex - rootNoteIndex;
    if (semitones < 0) semitones += 12;
    return getIntervalName(semitones);
  };

  return (
    <div className="fretboard-container">
      <div className="fretboard">
        <div className="string fret-numbers">
          {[...Array(numFrets + 1)].map((_, i) => (
            <div key={i} className="fret"><span>{i}</span></div>
          ))}
        </div>
        {strings.map((stringNote, stringIndex) => (
          <div key={stringIndex} className="string">
            {/* Create frets 0 to 15 */}
            {[...Array(numFrets + 1)].map((_, fretIndex) => {
              const note = getNoteAtFret(stringNote, fretIndex);
              const inScale = isNoteInScale(note);
              const isRoot = note === keyNote;

              return (
                <div key={fretIndex} className="fret">
                  {inScale && (
                    <div className={`note-marker ${isRoot ? 'root' : ''}`}>
                      {displayMode === 'notes' ? note : getInterval(note)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem', color: '#888' }}>
        <small>Fret 0 is the nut (open string)</small>
      </div>
    </div>
  );
};

export default Fretboard;
