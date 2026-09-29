# Ayaan - Antigravity Mobile Brain Exercise Game 🚀🪐

An accessible, zero-gravity mobile spatial memory game engineered for **Ayaan** (a 6-year-old child), focused on developing **working memory**, **spatial reasoning**, and **cognitive flexibility** through high-frequency positive reinforcement.

---

## 🧠 Cognitive Neuroscience Architecture

1. **Working Memory & Chunking Capacity**:
   - For a 6-year-old child, Miller-Cowan working memory spans are typically 3 to 5 chunks.
   - The game begins with **Level 1 (3 items)**, advancing to **Level 2 (4 items)**, and **Level 3 (5 items)**.
2. **Spatial Reasoning in Zero-Gravity**:
   - Objects drift, rotate, and rebound fluidly using a 2D antigravity physics simulation.
   - Requires dynamic object tracking (*Visual-Spatial Sketchpad*), training the brain to decouple static spatial coordinates from temporal sequence order.
3. **Dopamine Regulation & Positive Reinforcement**:
   - Every tap triggers instant multi-sensory feedback: a pentatonic chime (Web Audio API), glowing visual aura, and starburst particle explosion.
   - **Growth-Mindset Error State**: No harsh buzzers, red penalty screens, or score loss. If an incorrect tap occurs, a warm low harmonic chime plays, the object wobbles gently, and the sequence automatically replays with encouraging guidance: *"Let's watch that sequence again together, Ayaan!"*
4. **Motor Skill Accessibility**:
   - Minimum $88\text{px} \times 88\text{px}$ touch targets optimized for young children's fine motor skills.
   - High-contrast, colorblind-accessible celestial shapes (Star, Planet, Moon, Comet, Crystal, Rocket) with distinct glyphs, outlines, and musical frequencies.

---

## 🕹️ Game Progression

| Level | Name | Objects | Sequence Length | Physics State |
| :--- | :--- | :---: | :---: | :--- |
| **Level 1** | **Cadet Float** | 3 | 3 | Stationary zero-g hover (no drift). Focuses on sequence encoding. |
| **Level 2** | **Cosmic Drift** | 4 | 4 | Slow zero-g drift with soft chamber boundary rebounding. |
| **Level 3** | **Supernova Orbit** | 5 | 5 | Moderate velocity drift with chamber rebounds & inter-object repulsion. |
| **Level 4+** | **Galaxy Mastery** | 6 | 5–6 | Dynamic orbits with celebratory badges and star multipliers. |

---

## 📁 Repository File Structure

```text
Ayaan/
├── .github/
│   └── workflows/
│       └── build-apk.yml       # GitHub Actions workflow for automated Android APK builds
├── www/                        # Production web application assets
│   ├── index.html              # Core game viewport & HUD markup
│   ├── style.css               # Mobile-first CSS3 styles, safe-area insets & zero-g animations
│   ├── script.js               # Physics engine, Web Audio synthesizer & state loop
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
2. Open Chrome DevTools (`F12`), toggle **Device Emulation** (e.g., Pixel 7 or Galaxy S20), and enjoy zero-gravity memory training!

---

## 📱 Mobile Native Build with Capacitor

To build and run the native Android app locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add and sync the Android platform**:
   ```bash
   npx cap add android
   npx cap sync android
   ```

3. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

---

## 🤖 CI/CD Pipeline (Automated APK Build via GitHub Actions)

The repository includes a ready-to-run GitHub Actions workflow (`.github/workflows/build-apk.yml`).

### How It Works:
1. Whenever code is pushed to `main` or `master` (or triggered manually via **Run workflow**):
   - Sets up Node.js 20 and Java JDK 17 (Temurin).
   - Installs dependencies and runs Capacitor to initialize/sync the Android project.
   - Grants execute permissions to the Gradle wrapper (`chmod +x android/gradlew`).
   - Executes `./gradlew assembleDebug` to compile the native Android APK.
   - Automatically uploads the compiled APK as a downloadable GitHub Actions artifact named `Ayaan-Antigravity-Debug-APK`.
2. **Download the APK**:
   - Go to the **Actions** tab on your GitHub repository.
   - Click the latest workflow run.
   - Under **Artifacts**, download `Ayaan-Antigravity-Debug-APK` and install it on any Android device!
