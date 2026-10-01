# Ayaan - Supercharged Antigravity Space Memory Game 🚀🪐

An accessible, zero-gravity mobile spatial memory game engineered specifically for **Ayaan** (a 6-year-old child), focused on developing **working memory**, **visuospatial sequencing**, and **auditory-motor coordination** through high-frequency positive reinforcement and zero-friction play.

---

## 🧠 Cognitive Neuroscience Principles (Tailored for Ayaan)

1. **Working Memory & Chunking Capacity**:
   - For a 6-year-old child, Miller-Cowan working memory spans are typically 3 to 4 chunks ($K \approx 3–4$).
   - Progressive Orbits gently scale from **Orbit 1 (3 items, 3 notes)** up to **Orbit 6 (6 items, 6 notes)**.
   - Immediate visual cues (glowing auras) paired with musical pentatonic notes support multi-modal sensory binding in the prefrontal cortex.

2. **Zero Reading Barrier (Pre-Reader Friendly)**:
   - Everything is communicated intuitively through visual sparkles, glowing orbits, and musical chimes. No complex text instructions to decipher.

3. **Pure Single-Tap Motor Flow (Zero Drag Friction)**:
   - Extra-large $\ge 88\text{px} \times 88\text{px}$ touch targets.
   - Eliminates cumbersome screen dragging in favor of responsive, rhythmic, single-tap interaction.

4. **Multi-Instrument Auditory Dopamine**:
   - Ayaan can switch between 3 joyful instruments:
     - 🔔 **Crystal Bells** (sparkling, glassy xylophone tones)
     - 🎹 **Cosmic Piano** (warm, deep acoustic tones)
     - 🚀 **Space Synth** (playful sci-fi space beeps)

5. **Dopamine Regulation & Growth-Mindset Feedback**:
   - **Zero failure states**: No harsh buzzers, red penalty screens, or score loss.
   - If an incorrect tap occurs, a warm low harmonic chime plays, the object wobbles gently, and the melody automatically replays with encouraging guidance: *"Almost there! Let's listen together again!"*.
   - **Replay Hint Cue (👀)**: Ayaan can watch the melody demonstrated again anytime.

---

## 🌟 Supercharged Features

### 1. 🪐 Progressive Cosmic Orbits
- **Orbit 1: Starlight Cradle ⭐** — 3 stationary floating items, 3-note melody.
- **Orbit 2: Planet Walk 🪐** — 4 gently drifting items, 4-note melody.
- **Orbit 3: Asteroid Symphony ☄️** — 4 drifting items with zero-g rebounds, 4-note melody.
- **Orbit 4: Crystal Galaxy 💎** — 5 drifting items, 5-note melody.
- **Orbit 5: Rocket Launch 🚀** — 5 drifting items with rebounds, 5-note melody.
- **Orbit 6: Supernova Universe 👑** — 6 drifting items, 6-note grand melody.

### 2. ✨ Star Rush Bonus Round (Pure Sensory Joy)
- Pop drifting golden stars, comets, and cosmic gems in zero gravity!
- Every single pop plays a crisp musical note, showers rainbow stardust, and adds bonus stars to Ayaan's bank.
- 12 seconds of pure reward with zero pressure.

### 3. 🎖️ Astronaut Badges & Trophy Case
- Unlockable badges for milestones (e.g. *Cadet Launch*, *Melody Maestro*, *Star Hunter*, *Star Popper*, *Galaxy Legend*).
- Unlocks trigger a royal fanfare chime and confetti celebration.

---

## 📁 Repository File Structure

```text
Ayaan/
├── .github/
│   └── workflows/
│       └── build-apk.yml       # GitHub Actions workflow for automated Android APK builds
├── www/                        # Production web application assets
│   ├── index.html              # Core game viewport, Galaxy Map & HUD markup
│   ├── style.css               # Mobile-first CSS3 styles, safe-area insets & zero-g animations
│   ├── script.js               # Supercharged physics engine, multi-pack audio & state loop
│   └── assets/
│       └── icon.svg            # High-resolution cosmic vector app icon
├── capacitor.config.json       # Mobile wrapper configuration (Android)
├── package.json                # Dependencies & Capacitor build scripts
├── .gitignore                  # Git ignore rules for Node & Android Gradle builds
├── index.html                  # Root entry point redirect
└── README.md                   # Documentation & Neuroscience architecture
```

---

## 🛠️ Local Development & Web Testing

### Quick Start (Web Browser)
You can test the game in any modern browser with zero build steps:

1. Open `www/index.html` directly in your browser, or run a local static file server:
   ```bash
   npx serve .
   ```
2. Open DevTools (`F12`), toggle **Device Emulation** (e.g., Pixel 7 or Galaxy S24), and test touch interactions!

---

## 📱 Mobile Native Build with Capacitor

To build and run the native Android app locally:

1. **Install dependencies**:
   ```bash
   npm.cmd install
   ```

2. **Add and sync the Android platform**:
   ```bash
   npx.cmd cap add android
   npx.cmd cap sync android
   ```

3. **Open in Android Studio**:
   ```bash
   npx.cmd cap open android
   ```

---

## 🤖 CI/CD Pipeline (Automated APK Build via GitHub Actions)

The repository includes an automated GitHub Actions workflow (`.github/workflows/build-apk.yml`).

### How It Works:
1. Whenever code is pushed to `main` or `master`:
   - Sets up Node.js 20 and Java JDK 17 (Temurin).
   - Installs dependencies and runs Capacitor to initialize and sync the Android project.
   - Builds the Android debug APK with Gradle (`./gradlew assembleDebug`).
   - Automatically uploads the compiled APK as a downloadable artifact named `Ayaan-Antigravity-Debug-APK`.
2. **Download the APK**:
   - Go to the **Actions** tab on your GitHub repository.
   - Click the latest workflow run.
   - Under **Artifacts**, download `Ayaan-Antigravity-Debug-APK` and install it directly on Ayaan's Android tablet or phone!
