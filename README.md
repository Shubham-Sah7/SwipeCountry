# SwipeCountry — Budarina

An interactive travel-site concept. Each destination (China, Japan, Kazakhstan) floats a hand-drawn SVG roof that sheds a curtain of native-script characters — a canvas verlet-physics simulation that sways, parts around your cursor, and trails behind the roof during transitions.

Vanilla HTML/CSS/JS. No build step, no dependencies.

## Run

```bash
python3 -m http.server 4173
# open http://localhost:4173
```

## Controls

- Click the side cards (or ← / → arrow keys) to change destination
- **Destinations** in the nav shows all three roofs
- Sound arms itself on your first click anywhere (browser rule); the **sound** chip bottom-left mutes/unmutes. It stays silent until you brush the threads — papery ticks as you cross each strand, a rustle that follows your speed, silence when you stop
- Move your cursor through the hanging text
