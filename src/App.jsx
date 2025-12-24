import React from 'react';
import ScaleViewer from './components/ScaleViewer';

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Guitar Scales</h1>
        <p style={{ color: 'var(--color-text-dim)' }}>
          Visualize scales on a 15-fret guitar neck
        </p>
      </header>

      <main>
        <ScaleViewer />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#555' }}>
        <small>&copy; 2025 Guitar Scales App</small>
      </footer>
    </div>
  );
}

export default App;
