# Ayaan - Supercharged Antigravity Space Memory Game (V2.0) 🚀🪐

An accessible, zero-gravity mobile spatial memory game engineered specifically for **Ayaan** (a 6-year-old child), focused on developing **working memory**, **visuospatial sequencing**, and **auditory-motor coordination** through high-frequency positive reinforcement, spoken companion guidance, and zero-friction play.

---

## 🌟 What's New in V2.0 (Supercharged Multisensory Engine)

- 🗣️ **Spoken Companion Voiceovers**: Warm, joyful spoken voice prompts ("Ready, Super Ayaan?", "Watch the glowing melody!", "Your turn!") eliminate reading friction.
- 🎶 **Studio Acoustic Multi-Sampled Instruments**: 24 pentatonic harmonic notes across Crystal Bells, Warm Grand Piano, and Acoustic Kalimba with Web Audio `AudioBuffer` preloading.
- 🎬 **60–120 FPS Lottie Vector Celebrations**: Full-screen Rocket Blast Off transition, Astronaut celebration dance, and Trophy unlock modal animations running 100% offline.
- 🎨 **Bespoke Illustrated SVGs & Brand-New Game Icon**: High-DPI celestial bodies, Astronaut Ayaan HUD avatar, 6 Trophy Badges, and a gorgeous 3D-styled kawaii app launcher icon.
- 📳 **Multisensory Native Haptics**: `@capacitor/haptics` synchronized physical feedback for note taps, bubble pops, and fanfare rewards.

---

## 📁 Repository File Structure

```text
Ayaan/
├── .github/
│   └── workflows/
│       └── build-apk.yml       # Automated Android APK builds via GitHub Actions
├── scripts/                    # Reproducible asset generation scripts
│   ├── generate_voices.ps1     # Windows SAPI voice synthesizer
│   ├── generate_sfx.py         # Acoustic bubble pop & fanfare generator
│   ├── generate_instruments.py # 24 pentatonic multi-sampled instrument notes
│   └── generate_lottie_assets.py # Vector Lottie JSON animation generator
├── www/                        # Production web application assets (2.69 MB total)
│   ├── index.html              # Core game viewport, Galaxy Map & HUD markup
│   ├── style.css               # Mobile-first CSS3 styles, safe-area insets & zero-g animations
│   ├── script.js               # Physics engine, multi-pack audio, Lottie & haptics loop
│   └── assets/
│       ├── icon.svg            # High-resolution cosmic vector app icon
│       ├── audio/              # Spoken voices, tactile pops, and instrument notes
│       ├── images/             # Celestial SVGs, avatars, and trophy badges
│       ├── lottie/             # 60fps vector animations (blast off, dance, trophy)
│       └── vendor/             # Offline Lottie animation player
├── capacitor.config.json       # Mobile wrapper configuration (Android)
├── package.json                # Dependencies & Capacitor build scripts (v2.0.0)
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
