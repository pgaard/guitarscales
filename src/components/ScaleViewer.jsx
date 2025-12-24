import React, { useState } from 'react';
import Fretboard from './Fretboard';
import { NOTES, SCALES } from '../utils/musicTheory';

const ScaleViewer = () => {
  const [keyNote, setKeyNote] = useState('C');
  const [scaleType, setScaleType] = useState('minor'); // Default to Pentatonic Minor maybe? Or just Minor
  const [displayMode, setDisplayMode] = useState('notes');

  return (
    <div className="scale-viewer">
      <div className="controls card">
        <label>
          Key:
          <select value={keyNote} onChange={(e) => setKeyNote(e.target.value)}>
            {NOTES.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </label>

        <label>
          Scale:
          <select value={scaleType} onChange={(e) => setScaleType(e.target.value)}>
            {Object.entries(SCALES).map(([key, info]) => (
              <option key={key} value={key}>{info.name}</option>
            ))}
          </select>
        </label>

        <label>
          Display:
          <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
            <option value="notes">Notes</option>
            <option value="intervals">Intervals</option>
          </select>
        </label>
      </div>

      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {keyNote} {SCALES[scaleType].name}
        </h2>
        <Fretboard
          keyNote={keyNote}
          scaleType={scaleType}
          displayMode={displayMode}
        />
      </div>
    </div>
  );
};

export default ScaleViewer;
