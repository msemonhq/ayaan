# Ayaan - Antigravity Mobile Brain Exercise Games 🚀🪐

An accessible, multi-mission zero-gravity mobile brain exercise app engineered for **Ayaan** (a 6-year-old child), focused on developing **working memory**, **spatial reasoning**, and **cognitive flexibility** through high-frequency positive reinforcement.

---

## 🧠 Cognitive Neuroscience Architecture

1. **Visuospatial Working Memory (Baddeley's Model & Miller-Cowan Span)**:
   - For a 6-year-old child, working memory capacity is typically 3 to 4 chunks ($K \approx 3–4$).
   - **Mission 1 (Memory Matrix)** engages sequential encoding and active recall of drifting space wonders without time-pressure stress.

2. **Sensorimotor Drag Tracking & Spatial Categorization**:
   - Developing fine motor coordination benefits from zero-latency physical drag targets with magnetic target wells.
   - **Mission 2 (Vortex Sorter)** trains multiple object tracking (MOT) and categorization as Ayaan navigates drifting wonders into **Solar** vs. **Nebula** cosmic portals.

3. **Cognitive Flexibility & Inhibitory Control (Dimensional Change Card Sort - DCCS)**:
   - At age 6, children develop executive function milestones transitioning from single-dimension rules to dynamic task switching.
   - **Mission 3 (Orbit Switcher)** challenges Ayaan to adapt when rules switch between **Shape** (e.g. *"Find the Planet!"*) and **Color** (e.g. *"Rule Switch! Find the Yellow wonder!"*), reinforcing inhibitory control against perseveration.

4. **Dopamine Regulation & Positive Reinforcement**:
   - Every tap or drag match triggers instant multi-sensory feedback: harmonic pentatonic synth bells (Web Audio API), visual aura glow, and stardust particle explosions.
   - **Growth-Mindset Non-Punitive Feedback**: Zero buzzers, red penalty screens, or score loss. If a mismatch occurs, a warm low harmonic chime plays, the object wobbles gently, and encouraging guidance prompts Ayaan to try again without stress.
   - **Cosmic Star Bank**: All stars earned across all missions accumulate in a persistent star bank stored locally.

5. **Motor Skill Accessibility**:
   - Minimum $88\text{px} \times 88\text{px}$ touch targets optimized for young children's motor coordination.
   - High-contrast, colorblind-accessible celestial shapes (Star, Planet, Moon, Comet, Crystal, Rocket) with distinct icons, colors, and musical frequencies.

---

## 🎮 Game Modes in Version 1

### 🛸 Mission Hub (Central Command)
- Intuitive single-tap game launcher displaying Ayaan's total star bank, sound controls, and colorful mission cards with cognitive superpower badges.
- One-tap return button (🛸) in the HUD allows Ayaan to easily switch games at any time.

### 1. 🧠 Memory Matrix (Working Memory & Sequencing)
- Space wonders drift in zero-gravity with soft repulsion.
- The computer demonstrates a glowing sequence with musical pentatonic notes.
- Ayaan reproduces the sequence. Replay cue button (👀) available anytime.
- **Progression**:
  - *Level 1 (Cadet Memory)*: 3 stationary floating items.
  - *Level 2 (Cosmic Memory)*: 4 gently drifting items.
  - *Level 3 (Supernova Memory)*: 5 drifting items with rebounds.

### 2. 🌀 Vortex Sorter (Spatial Tracking & Drag Sorting)
- Drifting celestial bodies float freely across the antigravity chamber.
- Two cosmic vortex portals hover at the top:
  - **Solar Vortex ☀️**: Accepts Solar wonders (Stars ⭐, Comets ☄️, Rockets 🚀).
  - **Nebula Vortex 🌌**: Accepts Deep Space wonders (Planets 🪐, Moons 🌙, Crystals 💎).
- Smooth pointer drag-and-drop with stardust trails and magnetic suction animations.

### 3. ⚡ Orbit Switcher (Cognitive Flexibility & Task Switching)
- Drifting space wonders float in zero-g.
- Mission Commander issues alternating rules with an enchanting double-chime:
  - **Shape Rule**: e.g., *"Find the ⭐ Star!"*, *"Find the 🪐 Planet!"*
  - **Color Rule**: e.g., *"RULE SWITCH! 🎨 Find the 💛 Yellow wonder!"*
- Trains task switching, attention shifting, and inhibitory control.

---

## 📁 Repository File Structure

```text
Ayaan/
├── .github/
│   └── workflows/
│       └── build-apk.yml       # GitHub Actions workflow for automated Android APK builds
├── www/                        # Production web application assets
│   ├── index.html              # Mission Hub, viewport, chamber & HUD markup
│   ├── style.css               # Mobile-first CSS3 styles, safe-area insets & zero-g animations
│   ├── script.js               # Multi-game engine, physics loop & Web Audio synthesizer
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
