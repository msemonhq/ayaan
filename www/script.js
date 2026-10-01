/**
 * Ayaan - Supercharged Antigravity Space Memory Game
 * Designed for 6-Year-Old Astronaut Ayaan
 * Pure Single-Tap Fun, High Dopamine, Zero Text Friction & Growth Mindset
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Sound Synthesizer (Web Audio API)
     Switchable Sound Packs: Bells 🔔, Cosmic Piano 🎹, Space Synth 🚀
     ========================================================================== */
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('ayaan_muted') === 'true';
      this.soundPack = localStorage.getItem('ayaan_sound_pack') || 'bells';
      this.frequencies = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51]; // C5 to E6 Pentatonic
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('ayaan_muted', this.muted);
      return this.muted;
    }

    cycleSoundPack() {
      const packs = ['bells', 'piano', 'synth'];
      const currentIndex = packs.indexOf(this.soundPack);
      this.soundPack = packs[(currentIndex + 1) % packs.length];
      localStorage.setItem('ayaan_sound_pack', this.soundPack);
      this.playTone(2, 0.4); // Preview note
      return this.soundPack;
    }

    getSoundPackIcon() {
      if (this.soundPack === 'piano') return '🎹';
      if (this.soundPack === 'synth') return '🚀';
      return '🔔';
    }

    playTone(index, duration = 0.35) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const freq = this.frequencies[Math.abs(index) % this.frequencies.length];
      const now = this.ctx.currentTime;

      if (this.soundPack === 'piano') {
        // Warm acoustic piano
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const oscSub = this.ctx.createOscillator();
        const gainSub = this.ctx.createGain();
        oscSub.type = 'sine';
        oscSub.frequency.setValueAtTime(freq * 0.5, now);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

        gainSub.gain.setValueAtTime(0.2, now);
        gainSub.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        oscSub.connect(gainSub);
        gainSub.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration * 1.2);
        oscSub.start(now);
        oscSub.stop(now + duration);
      } else if (this.soundPack === 'synth') {
        // Space retro synth
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + duration);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration * 0.9);
      } else {
        // Default: Sparkling Crystal Bells
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, now);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        gain2.gain.setValueAtTime(0.12, now);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc2.connect(gain2);
        gain2.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
        osc2.start(now);
        osc2.stop(now + duration);
      }
    }

    playPop() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.1);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }

    playGentleRetry() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.3); // C4

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    }

    playCelebration() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
      });
    }

    playBadgeFanfare() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq) => {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
      });
    }
  }

  /* ==========================================================================
     2. Particle & Stardust Visual FX Canvas
     ========================================================================== */
  class ParticleFX {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.backgroundStars = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initBackgroundStars();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    initBackgroundStars() {
      this.backgroundStars = [];
      const count = Math.floor((this.width * this.height) / 8000);
      for (let i = 0; i < count; i++) {
        this.backgroundStars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    }

    burst(x, y, color = '#ffd233', count = 16) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          radius: Math.random() * 3 + 2,
          life: 1.0,
          decay: Math.random() * 0.025 + 0.02,
        });
      }
    }

    rainbowBurst(x, y, count = 22) {
      const colors = ['#ffd233', '#00f0ff', '#bd7aff', '#ff763b', '#00f5a0', '#ff2a85'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: Math.random() * 4 + 2.5,
          life: 1.0,
          decay: 0.03,
        });
      }
    }

    confettiBurst() {
      const colors = ['#ffd233', '#00f0ff', '#bd7aff', '#ff763b', '#00f5a0', '#ff2a85'];
      for (let i = 0; i < 75; i++) {
        this.particles.push({
          x: this.width * 0.5 + (Math.random() - 0.5) * 60,
          y: this.height * 0.45 + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 12,
          vy: Math.random() * -10 - 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: Math.random() * 5 + 3,
          life: 1.0,
          decay: Math.random() * 0.015 + 0.01,
          gravity: 0.18,
        });
      }
    }

    updateAndRender() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (const star of this.backgroundStars) {
        star.alpha += star.speed;
        const currentAlpha = Math.abs(Math.sin(star.alpha)) * 0.6 + 0.2;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.gravity) {
          p.vy += p.gravity;
        } else {
          p.vx *= 0.96;
          p.vy *= 0.96;
        }
        p.life -= p.decay;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.life);
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      }
    }
  }

  /* ==========================================================================
     3. Expanded Celestial Presets (8 Friendly Space Wonders)
     ========================================================================== */
  const CELESTIAL_PRESETS = [
    { id: 0, name: 'Star', icon: '⭐', class: 'obj-star', color: '#ffd233' },
    { id: 1, name: 'Planet', icon: '🪐', class: 'obj-planet', color: '#00f0ff' },
    { id: 2, name: 'Moon', icon: '🌙', class: 'obj-moon', color: '#bd7aff' },
    { id: 3, name: 'Comet', icon: '☄️', class: 'obj-comet', color: '#ff763b' },
    { id: 4, name: 'Crystal', icon: '💎', class: 'obj-crystal', color: '#00f5a0' },
    { id: 5, name: 'Rocket', icon: '🚀', class: 'obj-rocket', color: '#ff2a85' },
    { id: 6, name: 'UFO', icon: '🛸', class: 'obj-ufo', color: '#38bdf8' },
    { id: 7, name: 'Alien', icon: '👾', class: 'obj-alien', color: '#a855f7' },
  ];

  /* ==========================================================================
     4. Orbits Configuration & Astronaut Badges
     ========================================================================== */
  const ORBITS_CONFIG = {
    1: { name: 'Orbit 1: Starlight Cradle ⭐', count: 3, seqLen: 3, icon: '⭐', drift: 0 },
    2: { name: 'Orbit 2: Planet Walk 🪐', count: 4, seqLen: 4, icon: '🪐', drift: 1 },
    3: { name: 'Orbit 3: Asteroid Symphony ☄️', count: 4, seqLen: 4, icon: '☄️', drift: 2 },
    4: { name: 'Orbit 4: Crystal Galaxy 💎', count: 5, seqLen: 5, icon: '💎', drift: 2 },
    5: { name: 'Orbit 5: Rocket Launch 🚀', count: 5, seqLen: 5, icon: '🚀', drift: 3 },
    6: { name: 'Orbit 6: Supernova Universe 👑', count: 6, seqLen: 6, icon: '👑', drift: 3 },
  };

  const BADGES_CONFIG = [
    { id: 'badge_orbit1', icon: '🎖️', title: 'Cadet Launch', desc: 'Clear Orbit 1' },
    { id: 'badge_notes4', icon: '🎶', title: 'Melody Maestro', desc: 'Clear a 4-note melody' },
    { id: 'badge_orbit3', icon: '🚀', title: 'Deep Space Cadet', desc: 'Reach & Clear Orbit 3' },
    { id: 'badge_stars30', icon: '⭐', title: 'Star Hunter', desc: 'Collect 30 Cosmic Stars' },
    { id: 'badge_starrush', icon: '🛸', title: 'Star Popper', desc: 'Pop 10 stars in Star Rush' },
    { id: 'badge_orbit5', icon: '👑', title: 'Galaxy Legend', desc: 'Reach & Clear Orbit 5' },
  ];

  /* ==========================================================================
     5. Antigravity Physics Body (Zero-G Drift & Boundary Rebounds)
     ========================================================================== */
  class AntigravityBody {
    constructor(preset, index, isBonusStar = false) {
      this.preset = preset;
      this.index = index;
      this.isBonusStar = isBonusStar;
      this.radius = 44; // 88px touch target
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.floatPhase = Math.random() * Math.PI * 2;
      this.floatSpeed = 0.02 + Math.random() * 0.02;
      this.floatAmplitude = 4;
      this.element = this.createElement();
    }

    createElement() {
      const el = document.createElement('div');
      el.className = `floating-body ${this.preset.class}${this.isBonusStar ? ' bonus-star' : ''}`;
      el.setAttribute('data-id', this.preset.id);
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `${this.preset.name}`);

      el.innerHTML = `
        <div class="body-inner">
          <span class="object-icon">${this.preset.icon}</span>
          <span class="object-label">${this.preset.name}</span>
        </div>
      `;
      return el;
    }

    setPhysicsMode(level, totalObjects, chamberWidth, chamberHeight) {
      const margin = this.radius + 15;
      const usableW = Math.max(100, chamberWidth - margin * 2);
      const usableH = Math.max(100, chamberHeight - margin * 2);

      const cols = totalObjects <= 3 ? totalObjects : Math.ceil(Math.sqrt(totalObjects));
      const row = Math.floor(this.index / cols);
      const col = this.index % cols;

      const spacingX = usableW / (cols || 1);
      const spacingY = usableH / (Math.ceil(totalObjects / cols) || 1);

      this.x = margin + col * spacingX + spacingX * 0.5 + (Math.random() - 0.5) * 20;
      this.y = margin + row * spacingY + spacingY * 0.5 + (Math.random() - 0.5) * 20;

      if (this.isBonusStar) {
        // Floating upward in Star Rush
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = -1.2 - Math.random() * 1.5;
        this.floatAmplitude = 5;
        return;
      }

      if (level === 1) {
        this.vx = 0;
        this.vy = 0;
        this.floatAmplitude = 3;
      } else if (level === 2 || level === 3) {
        const speed = 0.4 + Math.random() * 0.3;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.floatAmplitude = 5;
      } else {
        const speed = 0.75 + Math.random() * 0.4;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.floatAmplitude = 6;
      }
    }

    update(chamberWidth, chamberHeight) {
      this.floatPhase += this.floatSpeed;
      const bobbing = Math.sin(this.floatPhase) * this.floatAmplitude;

      this.x += this.vx;
      this.y += this.vy;

      const minX = this.radius;
      const maxX = chamberWidth - this.radius;
      const minY = this.radius;
      const maxY = chamberHeight - this.radius;

      if (this.isBonusStar) {
        // Wrap around bottom if floated above top
        if (this.y < -this.radius) {
          this.y = chamberHeight + this.radius;
          this.x = minX + Math.random() * (maxX - minX);
        }
        if (this.x < minX || this.x > maxX) {
          this.vx = -this.vx;
        }
      } else {
        // Boundary rebound
        if (this.x < minX) {
          this.x = minX;
          this.vx = Math.abs(this.vx);
        } else if (this.x > maxX) {
          this.x = maxX;
          this.vx = -Math.abs(this.vx);
        }

        if (this.y < minY) {
          this.y = minY;
          this.vy = Math.abs(this.vy);
        } else if (this.y > maxY) {
          this.y = maxY;
          this.vy = -Math.abs(this.vy);
        }
      }

      const renderX = Math.round(this.x - this.radius);
      const renderY = Math.round(this.y - this.radius + bobbing);
      this.element.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
    }
  }

  /* ==========================================================================
     6. Supercharged Game Master Controller
     ========================================================================== */
  class AyaanSuperchargedApp {
    constructor() {
      // DOM Elements - Shell & HUD
      this.gameApp = document.getElementById('gameApp');
      this.orbitMapScreen = document.getElementById('orbitMapScreen');
      this.gameChamberScreen = document.getElementById('gameChamberScreen');
      this.chamber = document.getElementById('chamber');
      this.physicsWorld = document.getElementById('physicsWorld');

      this.levelPill = document.getElementById('levelPill');
      this.levelDisplay = document.getElementById('levelDisplay');
      this.scoreDisplay = document.getElementById('scoreDisplay');
      this.totalStarsDisplay = document.getElementById('totalStarsDisplay');
      this.levelNameTag = document.getElementById('levelNameTag');
      this.hubTrackerLabel = document.getElementById('hubTrackerLabel');
      this.sequenceTracker = document.getElementById('sequenceTracker');

      this.promptBubble = document.getElementById('promptBubble');
      this.promptText = document.getElementById('promptText');
      this.promptIcon = document.getElementById('promptIcon');

      this.instrumentBtn = document.getElementById('instrumentBtn');
      this.instrumentIcon = document.getElementById('instrumentIcon');
      this.soundToggleBtn = document.getElementById('soundToggleBtn');
      this.soundIcon = document.getElementById('soundIcon');
      this.hintBtn = document.getElementById('hintBtn');
      this.trophyBtn = document.getElementById('trophyBtn');
      this.homeBtn = document.getElementById('homeBtn');
      this.homeIcon = document.getElementById('homeIcon');

      // Map Elements
      this.quickPlayBtn = document.getElementById('quickPlayBtn');
      this.quickPlayLevelNum = document.getElementById('quickPlayLevelNum');
      this.startStarRushBtn = document.getElementById('startStarRushBtn');
      this.orbitsGrid = document.getElementById('orbitsGrid');

      // Modals
      this.celebrationModal = document.getElementById('celebrationModal');
      this.celebrationTitle = document.getElementById('celebrationTitle');
      this.celebrationMessage = document.getElementById('celebrationMessage');
      this.nextLevelBtn = document.getElementById('nextLevelBtn');
      this.celebrationMapBtn = document.getElementById('celebrationMapBtn');

      this.badgeModal = document.getElementById('badgeModal');
      this.badgesListContainer = document.getElementById('badgesListContainer');
      this.closeBadgesBtn = document.getElementById('closeBadgesBtn');

      this.starRushEndModal = document.getElementById('starRushEndModal');
      this.starRushPoppedCount = document.getElementById('starRushPoppedCount');
      this.playStarRushAgainBtn = document.getElementById('playStarRushAgainBtn');
      this.starRushBackBtn = document.getElementById('starRushBackBtn');

      // Systems
      this.sound = new SoundManager();
      this.fx = new ParticleFX(document.getElementById('particleCanvas'));

      // Persistent State
      this.totalStars = parseInt(localStorage.getItem('ayaan_total_stars') || '0', 10);
      this.currentOrbit = parseInt(localStorage.getItem('ayaan_current_orbit') || '1', 10);
      this.unlockedBadges = JSON.parse(localStorage.getItem('ayaan_badges') || '[]');

      // Runtime State
      this.sessionStars = 0;
      this.bodies = [];
      this.sequence = [];
      this.playerStep = 0;
      this.isShowingSequence = false;
      this.isStarRushActive = false;
      this.starRushPopped = 0;
      this.starRushTimer = null;
      this.chamberWidth = 360;
      this.chamberHeight = 500;

      this.initEvents();
      this.updateHUD();
      this.renderOrbitsGrid();

      // Launch straight into Ayaan's favorite Memory Orbit!
      this.startOrbit(this.currentOrbit);
      this.startPhysicsLoop();
    }

    initEvents() {
      // Instrument cycle button
      this.instrumentBtn.addEventListener('click', () => {
        this.sound.cycleSoundPack();
        this.instrumentIcon.textContent = this.sound.getSoundPackIcon();
      });

      // Sound mute toggle
      this.soundToggleBtn.addEventListener('click', () => {
        this.sound.toggleMute();
        this.updateSoundIcon();
      });

      // Home / Map Button
      this.homeBtn.addEventListener('click', () => {
        if (this.orbitMapScreen.classList.contains('hidden')) {
          this.showGalaxyMap();
        } else {
          this.startOrbit(this.currentOrbit);
        }
      });

      // Trophy Badges Button
      this.trophyBtn.addEventListener('click', () => {
        this.showBadgesModal();
      });

      this.closeBadgesBtn.addEventListener('click', () => {
        this.badgeModal.classList.add('hidden');
      });

      // Hint Replay Button
      this.hintBtn.addEventListener('click', () => {
        if (!this.isShowingSequence && !this.isStarRushActive && this.sequence.length > 0) {
          this.setPrompt('👀', 'Watch the melody once more, Ayaan!');
          this.playSequenceDemo();
        }
      });

      // Quick Play Button on Galaxy Map
      this.quickPlayBtn.addEventListener('click', () => {
        this.startOrbit(this.currentOrbit);
      });

      // Star Rush Button on Galaxy Map
      this.startStarRushBtn.addEventListener('click', () => {
        this.startStarRush();
      });

      // Celebration Modal
      this.nextLevelBtn.addEventListener('click', () => {
        this.celebrationModal.classList.add('hidden');
        const nextOrbit = Math.min(6, this.currentOrbit + 1);
        this.startOrbit(nextOrbit);
      });

      this.celebrationMapBtn.addEventListener('click', () => {
        this.celebrationModal.classList.add('hidden');
        this.showGalaxyMap();
      });

      // Star Rush End Modal
      this.playStarRushAgainBtn.addEventListener('click', () => {
        this.starRushEndModal.classList.add('hidden');
        this.startStarRush();
      });

      this.starRushBackBtn.addEventListener('click', () => {
        this.starRushEndModal.classList.add('hidden');
        this.startOrbit(this.currentOrbit);
      });

      // Window resize
      window.addEventListener('resize', () => {
        this.updateChamberBounds();
      });

      // Interactive Pointer Down Handler (Single-tap on floating bodies)
      this.physicsWorld.addEventListener('pointerdown', (e) => {
        const targetBodyEl = e.target.closest('.floating-body');
        if (!targetBodyEl) return;

        const bodyId = parseInt(targetBodyEl.getAttribute('data-id'), 10);
        const body = this.bodies.find((b) => b.preset.id === bodyId);
        if (!body) return;

        if (this.isStarRushActive) {
          this.handleStarRushPop(body);
        } else if (!this.isShowingSequence) {
          this.handlePlayerMemoryTap(bodyId, targetBodyEl, body);
        }
      });
    }

    updateHUD() {
      this.totalStarsDisplay.textContent = this.totalStars;
      this.scoreDisplay.textContent = this.sessionStars;
      this.levelDisplay.textContent = this.currentOrbit;
      this.quickPlayLevelNum.textContent = this.currentOrbit;
      this.instrumentIcon.textContent = this.sound.getSoundPackIcon();
      this.updateSoundIcon();
    }

    updateSoundIcon() {
      this.soundIcon.textContent = this.sound.muted ? '🔇' : '🔊';
    }

    addStars(count) {
      this.totalStars += count;
      this.sessionStars += count;
      localStorage.setItem('ayaan_total_stars', this.totalStars.toString());
      this.updateHUD();
      this.checkBadges();
    }

    updateChamberBounds() {
      const rect = this.chamber.getBoundingClientRect();
      this.chamberWidth = rect.width;
      this.chamberHeight = rect.height;
    }

    setPrompt(icon, text, pulse = true) {
      this.promptIcon.textContent = icon;
      this.promptText.textContent = text;
      if (pulse) {
        this.promptBubble.classList.remove('pulse-attention');
        void this.promptBubble.offsetWidth;
        this.promptBubble.classList.add('pulse-attention');
      }
    }

    renderTracker(total, activeStep = 0) {
      this.sequenceTracker.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'seq-dot';
        if (i < activeStep) {
          dot.classList.add('completed');
        } else if (i === activeStep) {
          dot.classList.add('active-target');
        }
        this.sequenceTracker.appendChild(dot);
      }
    }

    /* ========================================================================
       Screen Transitions: Galaxy Map vs Game Chamber
       ======================================================================== */
    showGalaxyMap() {
      if (this.isStarRushActive) this.stopStarRush();
      this.orbitMapScreen.classList.remove('hidden');
      this.gameChamberScreen.classList.add('hidden');
      this.levelPill.classList.add('hidden');
      this.hintBtn.classList.add('hidden');
      this.sequenceTracker.classList.add('hidden');
      this.hubTrackerLabel.classList.remove('hidden');
      this.homeIcon.textContent = '🚀';
      this.renderOrbitsGrid();
    }

    startOrbit(orbitNum) {
      if (this.isStarRushActive) this.stopStarRush();
      this.currentOrbit = orbitNum;
      localStorage.setItem('ayaan_current_orbit', this.currentOrbit.toString());

      this.orbitMapScreen.classList.add('hidden');
      this.gameChamberScreen.classList.remove('hidden');
      this.levelPill.classList.remove('hidden');
      this.hintBtn.classList.remove('hidden');
      this.sequenceTracker.classList.remove('hidden');
      this.hubTrackerLabel.classList.add('hidden');
      this.homeIcon.textContent = '🗺️';

      this.updateHUD();
      this.updateChamberBounds();

      const config = ORBITS_CONFIG[this.currentOrbit] || ORBITS_CONFIG[1];
      this.levelNameTag.textContent = config.name;

      // Spawn zero-g objects
      this.physicsWorld.innerHTML = '';
      this.bodies = [];
      const presets = CELESTIAL_PRESETS.slice(0, config.count);
      presets.forEach((preset, idx) => {
        const body = new AntigravityBody(preset, idx, false);
        body.setPhysicsMode(this.currentOrbit, config.count, this.chamberWidth, this.chamberHeight);
        this.physicsWorld.appendChild(body.element);
        this.bodies.push(body);
      });

      // Generate sequence
      this.sequence = [];
      for (let i = 0; i < config.seqLen; i++) {
        const randId = Math.floor(Math.random() * config.count);
        this.sequence.push(randId);
      }
      this.playerStep = 0;
      this.renderTracker(config.seqLen, 0);

      // Play demonstration
      setTimeout(() => {
        this.setPrompt('👀', 'Watch the glowing space melody, Ayaan!');
        this.playSequenceDemo();
      }, 650);
    }

    async playSequenceDemo() {
      this.isShowingSequence = true;
      this.playerStep = 0;
      this.renderTracker(this.sequence.length, 0);

      await this.sleep(400);

      for (let i = 0; i < this.sequence.length; i++) {
        const objId = this.sequence[i];
        const body = this.bodies.find((b) => b.preset.id === objId);

        if (body) {
          body.element.classList.add('cue-active');
          this.sound.playTone(objId);
          this.triggerSparkle(body);

          await this.sleep(600);
          body.element.classList.remove('cue-active');
          await this.sleep(220);
        }
      }

      this.isShowingSequence = false;
      this.setPrompt('👆', "Ayaan's turn! Tap the melody!");
    }

    handlePlayerMemoryTap(tappedId, element, body) {
      const expectedId = this.sequence[this.playerStep];

      if (navigator.vibrate) navigator.vibrate(30);

      if (tappedId === expectedId) {
        // Correct tap!
        this.sound.playTone(tappedId);
        element.classList.add('tap-correct');
        this.triggerSparkle(body, 22);

        setTimeout(() => element.classList.remove('tap-correct'), 250);

        this.playerStep++;
        this.renderTracker(this.sequence.length, this.playerStep);

        if (this.playerStep === this.sequence.length) {
          this.handleOrbitCleared();
        }
      } else {
        // Gentle retry without penalty
        this.sound.playGentleRetry();
        element.classList.add('tap-wobble');
        setTimeout(() => element.classList.remove('tap-wobble'), 650);

        this.setPrompt('💫', "Almost there! Let's listen together again!");
        setTimeout(() => {
          this.playSequenceDemo();
        }, 1100);
      }
    }

    handleOrbitCleared() {
      this.isShowingSequence = true;
      const starsEarned = this.sequence.length * 2;
      this.addStars(starsEarned);

      this.sound.playCelebration();
      this.fx.confettiBurst();
      this.setPrompt('🏆', 'Brilliant, Super Astronaut Ayaan!');

      // Check badges
      if (this.currentOrbit === 1) this.unlockBadge('badge_orbit1');
      if (this.sequence.length >= 4) this.unlockBadge('badge_notes4');
      if (this.currentOrbit >= 3) this.unlockBadge('badge_orbit3');
      if (this.currentOrbit >= 5) this.unlockBadge('badge_orbit5');

      setTimeout(() => {
        this.celebrationTitle.textContent = `Orbit ${this.currentOrbit} Mastered!`;
        this.celebrationMessage.textContent = `Ayaan remembered all ${this.sequence.length} floating musical wonders!`;
        this.celebrationModal.classList.remove('hidden');
      }, 950);
    }

    /* ========================================================================
       7. Star Rush Bonus Round (Pure Sensory Dopamine Reward)
       ======================================================================== */
    startStarRush() {
      this.isStarRushActive = true;
      this.starRushPopped = 0;

      this.orbitMapScreen.classList.add('hidden');
      this.gameChamberScreen.classList.remove('hidden');
      this.levelPill.classList.remove('hidden');
      this.hintBtn.classList.add('hidden');
      this.sequenceTracker.classList.remove('hidden');
      this.hubTrackerLabel.classList.add('hidden');
      this.levelNameTag.textContent = '🌟 Star Rush Bonus! 🌟';

      this.updateChamberBounds();
      this.setPrompt('✨', 'POP AS MANY FLOATING STARS AS YOU CAN!');

      // Spawn drifting bonus stars & gems
      this.physicsWorld.innerHTML = '';
      this.bodies = [];
      const bonusItems = [
        CELESTIAL_PRESETS[0], // Star
        CELESTIAL_PRESETS[4], // Crystal
        CELESTIAL_PRESETS[0], // Star
        CELESTIAL_PRESETS[5], // Rocket
        CELESTIAL_PRESETS[0], // Star
      ];

      bonusItems.forEach((preset, idx) => {
        const body = new AntigravityBody(preset, idx, true);
        body.setPhysicsMode(3, bonusItems.length, this.chamberWidth, this.chamberHeight);
        body.y = this.chamberHeight + idx * 80;
        this.physicsWorld.appendChild(body.element);
        this.bodies.push(body);
      });

      // 12-second joyful bonus round
      let timeLeft = 12;
      this.renderTracker(12, 12);

      this.starRushTimer = setInterval(() => {
        timeLeft--;
        this.renderTracker(12, timeLeft);
        if (timeLeft <= 0) {
          this.endStarRush();
        }
      }, 1000);
    }

    handleStarRushPop(body) {
      if (navigator.vibrate) navigator.vibrate(40);
      this.sound.playPop();
      this.fx.rainbowBurst(body.x, body.y, 24);

      this.starRushPopped++;
      this.addStars(1);

      // Reposition popped star at the bottom
      body.y = this.chamberHeight + 30;
      body.x = body.radius + Math.random() * (this.chamberWidth - body.radius * 2);

      if (this.starRushPopped >= 10) {
        this.unlockBadge('badge_starrush');
      }
    }

    stopStarRush() {
      this.isStarRushActive = false;
      if (this.starRushTimer) clearInterval(this.starRushTimer);
    }

    endStarRush() {
      this.stopStarRush();
      this.sound.playCelebration();
      this.fx.confettiBurst();

      this.starRushPoppedCount.textContent = this.starRushPopped;
      this.starRushEndModal.classList.remove('hidden');
    }

    /* ========================================================================
       8. Galaxy Map & Orbits Grid
       ======================================================================== */
    renderOrbitsGrid() {
      this.orbitsGrid.innerHTML = '';
      Object.keys(ORBITS_CONFIG).forEach((orbitKey) => {
        const orbitNum = parseInt(orbitKey, 10);
        const cfg = ORBITS_CONFIG[orbitNum];
        const card = document.createElement('div');
        card.className = `orbit-card${orbitNum === this.currentOrbit ? ' is-active' : ''}`;
        card.innerHTML = `
          <div class="orbit-icon">${cfg.icon}</div>
          <div class="orbit-title">Orbit ${orbitNum}</div>
          <div class="orbit-meta">${cfg.count} Objects • ${cfg.seqLen} Notes</div>
          <div class="orbit-stars-pill">⭐ +${cfg.seqLen * 2} Stars</div>
        `;
        card.addEventListener('click', () => {
          this.startOrbit(orbitNum);
        });
        this.orbitsGrid.appendChild(card);
      });
    }

    /* ========================================================================
       9. Badges & Trophy Modal
       ======================================================================== */
    checkBadges() {
      if (this.totalStars >= 30) this.unlockBadge('badge_stars30');
    }

    unlockBadge(badgeId) {
      if (this.unlockedBadges.includes(badgeId)) return;
      this.unlockedBadges.push(badgeId);
      localStorage.setItem('ayaan_badges', JSON.stringify(this.unlockedBadges));
      this.sound.playBadgeFanfare();
      this.fx.confettiBurst();

      const badge = BADGES_CONFIG.find((b) => b.id === badgeId);
      if (badge) {
        this.setPrompt('🎖️', `NEW BADGE UNLOCKED: ${badge.title}! Super Ayaan!`);
      }
    }

    showBadgesModal() {
      this.badgesListContainer.innerHTML = '';
      BADGES_CONFIG.forEach((badge) => {
        const isUnlocked = this.unlockedBadges.includes(badge.id);
        const item = document.createElement('div');
        item.className = `badge-item${isUnlocked ? ' unlocked' : ''}`;
        item.innerHTML = `
          <span class="badge-icon">${badge.icon}</span>
          <div class="badge-info">
            <div class="badge-title">${badge.title}</div>
            <div class="badge-desc">${badge.desc}</div>
          </div>
          <span class="badge-status">${isUnlocked ? 'UNLOCKED ⭐' : 'LOCKED 🔒'}</span>
        `;
        this.badgesListContainer.appendChild(item);
      });
      this.badgeModal.classList.remove('hidden');
    }

    triggerSparkle(body, count = 18) {
      if (!body) return;
      const rect = body.element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      this.fx.burst(centerX, centerY, body.preset.color, count);
    }

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    startPhysicsLoop() {
      const loop = () => {
        const len = this.bodies.length;

        // Soft inter-body repulsion
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const b1 = this.bodies[i];
            const b2 = this.bodies[j];
            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = (b1.radius + b2.radius) * 0.95;

            if (dist < minDist && dist > 0.001) {
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;

              b1.x -= nx * overlap * 0.3;
              b1.y -= ny * overlap * 0.3;
              b2.x += nx * overlap * 0.3;
              b2.y += ny * overlap * 0.3;

              if (this.currentOrbit >= 2 && !this.isStarRushActive) {
                const tempVx = b1.vx;
                const tempVy = b1.vy;
                b1.vx = b2.vx * 0.9;
                b1.vy = b2.vy * 0.9;
                b2.vx = tempVx * 0.9;
                b2.vy = tempVy * 0.9;
              }
            }
          }
        }

        // Update body coordinates
        for (let i = 0; i < len; i++) {
          this.bodies[i].update(this.chamberWidth, this.chamberHeight);
        }

        // Update FX canvas
        this.fx.updateAndRender();

        requestAnimationFrame(loop);
      };

      requestAnimationFrame(loop);
    }
  }

  // Launch when DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    window.ayaanApp = new AyaanSuperchargedApp();
  });
})();
