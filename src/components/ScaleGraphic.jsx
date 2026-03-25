import React from 'react';
import { SCALES, getScaleNotes, getIntervalName } from '../utils/musicTheory';



const ScaleGraphic = ({ keyNote, scaleType, triadNotes }) => {
  const scaleNotes = getScaleNotes(keyNote, scaleType);
  const intervals = SCALES[scaleType].intervals;

  // Compute steps as semitone numeric value
  const steps = [];
  for (let i = 0; i < intervals.length; i++) {
    const semitones = i === intervals.length - 1
      ? 12 - intervals[i]
      : intervals[i + 1] - intervals[i];
    steps.push(semitones);
  }

  // Note names + root interval names
  const items = scaleNotes.map((note, i) => {
    return {
      note,
      intervalName: getIntervalName(intervals[i])
    };
  });

  // Also push the octave root note to show the final step
  items.push({
    note: keyNote,
    intervalName: '8'
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'fit-content',
      minWidth: '50%',
      maxWidth: '100%',
      margin: '0 auto 2rem auto',
      fontFamily: 'monospace',
      background: 'var(--color-surface, #1e1e1e)',
      padding: '2rem 0.75rem 1rem',
      borderRadius: '8px',
      gap: '0.25rem',
      flexWrap: 'nowrap',
      overflowX: 'auto'
    }}>
      {items.map((item, i) => {
        const isTriadNote = triadNotes && triadNotes.includes(item.note);
        return (
          <React.Fragment key={i}>
            {/* Node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                color: isTriadNote ? '#ffc107' : 'var(--color-primary, #646cff)',
                textShadow: isTriadNote ? '0 0 8px rgba(255, 193, 7, 0.8)' : 'none',
                transition: 'all 0.2s ease'
              }}>{item.note}</span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: isTriadNote ? '#ddd' : 'var(--color-text-dim, #888)',
                transition: 'color 0.2s ease'
              }}>{item.intervalName}</span>
            </div>

            {/* Edge / Step */}
            {i < steps.length && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', margin: '0 0.25rem' }}>
                <span style={{ height: '2px', width: '10px', backgroundColor: '#444' }}></span>

                {[...Array(steps[i] - 1)].map((_, skipIdx) => (
                  <React.Fragment key={skipIdx}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#666' }}></div>
                    <span style={{ height: '2px', width: '10px', backgroundColor: '#444' }}></span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ScaleGraphic;
