import React from 'react';
import ScaleViewer from './components/ScaleViewer';

function App() {
  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Guitar Scales</h1>

      </header>

      <main>
        <ScaleViewer />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#555' }}>
        <small>&copy; {new Date().getFullYear()} Guitar Scales App</small>
      </footer>
    </div>
  );
}

export default App;
