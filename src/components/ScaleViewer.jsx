import React, { useState, useEffect } from 'react';
import Fretboard from './Fretboard';
import { NOTES, SCALES, getScaleNotes, getTriadNotes, getChordName } from '../utils/musicTheory';

const ScaleViewer = () => {
  const [keyNote, setKeyNote] = useState('C');
  const [scaleType, setScaleType] = useState('minor');
  const [displayMode, setDisplayMode] = useState('notes');
  const [triadRoot, setTriadRoot] = useState('');

  // Reset triad when key or scale changes
  useEffect(() => {
    setTriadRoot('');
  }, [keyNote, scaleType]);

  const scaleNotes = getScaleNotes(keyNote, scaleType);

  // Use parent scale notes for triad options if available
  const scaleInfo = SCALES[scaleType];
  const triadOptions = scaleInfo.parentScale
    ? getScaleNotes(keyNote, scaleInfo.parentScale)
    : scaleNotes;

  const triadNotes = triadRoot ? getTriadNotes(triadRoot, scaleType, keyNote) : null;
  const chordName = triadNotes ? getChordName(triadNotes) : '';

  const labelStyle = { marginRight: '1.5rem', display: 'inline-block' };

  return (
    <div className="scale-viewer">
      <div className="controls card">
        <label style={labelStyle}>
          Key: <select value={keyNote} onChange={(e) => setKeyNote(e.target.value)}>
            {NOTES.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Scale: <select value={scaleType} onChange={(e) => setScaleType(e.target.value)}>
            {Object.entries(SCALES).map(([key, info]) => (
              <option key={key} value={key}>{info.name}</option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          Display: <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
            <option value="notes">Notes</option>
            <option value="intervals">Intervals</option>
          </select>
        </label>

        <label style={labelStyle}>
          Triads: <select value={triadRoot} onChange={(e) => setTriadRoot(e.target.value)}>
            <option value="">Off</option>
            {triadOptions.map(note => (
              <option key={note} value={note}>{note}</option>
            ))}
          </select>
          {chordName && <span style={{ marginLeft: '0.5rem', fontWeight: 'bold', color: '#ffc107' }}>{triadRoot} {chordName}</span>}
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
          triadNotes={triadNotes}
        />
      </div>
    </div>
  );
};

export default ScaleViewer;
