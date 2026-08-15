# Guitar Scales

An interactive fretboard for looking up guitar scales. Pick a key and a scale and the notes light
up on the neck; click any note to hear it.

## Features

- **17 scales and modes** — the seven diatonic modes (listed as major, minor, and dorian through
  locrian), pentatonic major/minor, blues, harmonic and melodic minor, phrygian dominant, double
  harmonic, hirajoshi, whole tone, and diminished.
- **9 tunings** — standard, drop D, drop C, Eb standard, DADGAD, and open G/D/E/A. Note positions
  follow the selected tuning.
- **Adjustable neck length** — show anywhere from 5 to 24 frets, with the usual inlay markers.
- **Three display modes** — label each position with its note name, its interval from the root
  (`R`, `b3`, `5`, …), or its fret number.
- **Triad overlay** — pick a scale degree to highlight the triad built on it. The dropdown names
  each chord's quality (major, minor, diminished, augmented, sus, and odd stacks described by
  interval). Notes in the triad stay bright, the rest of the scale dims, and any triad note falling
  outside the current scale is marked distinctly.
- **Scale diagram** — under the fretboard, the scale is laid out as a row of degrees showing the
  semitone step between each one, with the triad on every degree colour-coded by quality.
- **Click to play** — notes are synthesised in the browser with the Web Audio API (a plucked
  triangle wave), so there are no audio assets to load.

Pentatonic, blues, and hirajoshi scales declare a `parentScale`, so their triads are derived from
the parent seven-note scale. That is why those scales offer seven triads rather than one per scale
note — the extra chords are the ones the scale implies but does not fully contain.

## Development

Built with React 19 and Vite. No backend — it's a static site, and all the music theory lives in
`src/utils/musicTheory.js`.

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # eslint
```

Source layout:

| Path | Purpose |
| --- | --- |
| `src/utils/musicTheory.js` | Notes, scale/tuning tables, scale and triad derivation, chord naming |
| `src/utils/audioEngine.js` | Web Audio oscillator and pluck envelope |
| `src/components/ScaleViewer.jsx` | Top-level controls and state |
| `src/components/Fretboard.jsx` | The neck: note markers, highlighting, click-to-play |
| `src/components/ScaleGraphic.jsx` | Scale-degree diagram with steps and per-degree chords |
| `src/components/fretboardLayout.js` | Board width and inlay placement |

## Deployment

The site is published to two hosts. Both commands build first (via their `pre` script), and both
deploy whatever is in the working tree — not what is on `origin/main` — so push your source
separately.

| Command | Target |
| --- | --- |
| `npm run deploy` | GitHub Pages — pushes `dist/` to the `gh-pages` branch |
| `npm run deploy:cf` | Cloudflare Pages — `wrangler pages deploy` to the `guitarscales` project |

Notes:

- `base: './'` in `vite.config.js` produces relative asset paths, which is what lets the same build
  work under the GitHub Pages subpath (`/guitarscales/`) and at the Cloudflare root.
- Cloudflare deploys use `npx --yes wrangler`, so wrangler is not a dependency. It needs an
  interactive terminal the first time to complete the OAuth login; credentials are then cached
  globally (`%APPDATA%\xdg.config\.wrangler\` on Windows). In a non-interactive shell such as CI,
  set `CLOUDFLARE_API_TOKEN` instead.
- GitHub Pages source is configured once in repo Settings → Pages: "Deploy from a branch",
  `gh-pages` / root.
