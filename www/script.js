/**
 * Ayaan - Mobile Antigravity Brain Exercise Games
 * Cognitive Objectives: Working Memory, Spatial Reasoning, Fine Motor Tracking & Cognitive Flexibility
 * Designed for 6-Year-Old Astronaut Ayaan with Zero Harsh Failures & High Positive Reinforcement
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Sound Synthesizer (Web Audio API)
     Zero-latency, 100% offline procedural audio with harmonic pentatonic scales
     ========================================================================== */
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('ayaan_muted') === 'true';
      this.frequencies = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5, D5, E5, G5, A5, C6 (Joyful Pentatonic)
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

    playTone(index, duration = 0.35) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const freq = this.frequencies[Math.abs(index) % this.frequencies.length];
      const now = this.ctx.currentTime;

      // Primary warm sine bell
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Soft harmonic chime
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      gain2.gain.setValueAtTime(0.1, now);
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

    playGentleRetry() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Gentle, low-frequency warm wobble (non-punitive learning cue)
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

    playGrab() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    }

    playVortexSuck() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Cosmic suction sweep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

      // Harmonic chime at conclusion
      setTimeout(() => {
        if (!this.ctx || this.muted) return;
        const chimeNow = this.ctx.currentTime;
        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(1046.50, chimeNow); // C6
        chimeGain.gain.setValueAtTime(0.2, chimeNow);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, chimeNow + 0.3);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.ctx.destination);
        chimeOsc.start(chimeNow);
        chimeOsc.stop(chimeNow + 0.3);
      }, 150);
    }

    playRuleSwitch() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      // Magical double chime announcing cognitive rule switch
      const now = this.ctx.currentTime;
      [587.33, 880.00].forEach((freq, idx) => {
        const time = now + idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.22, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.35);
      });
    }

    playCelebration() {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      // Joyful ascending pentatonic fanfare
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
  }

  /* ==========================================================================
     2. Particle & Stardust Visual FX Canvas
     Lightweight, high-performance visual rewards for dopamine regulation
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

    swirlBurst(targetX, targetY, color = '#ffd233', count = 22) {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const dist = 50 + Math.random() * 30;
        this.particles.push({
          x: targetX + Math.cos(angle) * dist,
          y: targetY + Math.sin(angle) * dist,
          vx: -Math.cos(angle) * 3 - Math.sin(angle) * 2,
          vy: -Math.sin(angle) * 3 + Math.cos(angle) * 2,
          color,
          radius: Math.random() * 3 + 2,
          life: 1.0,
          decay: 0.035,
        });
      }
    }

    trail(x, y, color = '#ffd233') {
      if (Math.random() > 0.4) return;
      this.particles.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color,
        radius: Math.random() * 2.5 + 1.5,
        life: 0.8,
        decay: 0.04,
      });
    }

    confettiBurst() {
      const colors = ['#ffd233', '#00f0ff', '#bd7aff', '#ff763b', '#00f5a0', '#ff2a85'];
      for (let i = 0; i < 70; i++) {
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

      // Render twinkling stardust
      for (const star of this.backgroundStars) {
        star.alpha += star.speed;
        const currentAlpha = Math.abs(Math.sin(star.alpha)) * 0.6 + 0.2;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Render dynamic burst particles
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
     3. Celestial Presets (Colorblind Accessible, Distinct Shapes & Auditory Tones)
     ========================================================================== */
  const CELESTIAL_PRESETS = [
    { id: 0, name: 'Star', icon: '⭐', class: 'obj-star', color: '#ffd233', category: 'solar', colorName: 'Yellow' },
    { id: 1, name: 'Planet', icon: '🪐', class: 'obj-planet', color: '#00f0ff', category: 'nebula', colorName: 'Blue' },
    { id: 2, name: 'Moon', icon: '🌙', class: 'obj-moon', color: '#bd7aff', category: 'nebula', colorName: 'Purple' },
    { id: 3, name: 'Comet', icon: '☄️', class: 'obj-comet', color: '#ff763b', category: 'solar', colorName: 'Orange' },
    { id: 4, name: 'Crystal', icon: '💎', class: 'obj-crystal', color: '#00f5a0', category: 'nebula', colorName: 'Green' },
    { id: 5, name: 'Rocket', icon: '🚀', class: 'obj-rocket', color: '#ff2a85', category: 'solar', colorName: 'Pink' },
  ];

  /* ==========================================================================
     4. Antigravity Physics Body
     Zero-gravity buoyancy, smooth drag & drop, and boundary rebounds
     ========================================================================== */
  class AntigravityBody {
    constructor(preset, index, containerRect) {
      this.preset = preset;
      this.index = index;
      this.radius = 44; // 88px diameter touch target
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.floatPhase = Math.random() * Math.PI * 2;
      this.floatSpeed = 0.02 + Math.random() * 0.02;
      this.floatAmplitude = 4;
      this.isDragging = false;
      this.isAbsorbed = false;

      this.element = this.createElement();
    }

    createElement() {
      const el = document.createElement('div');
      el.className = `floating-body ${this.preset.class}`;
      el.setAttribute('data-id', this.preset.id);
      el.setAttribute('data-category', this.preset.category);
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

      if (level === 1) {
        this.vx = 0;
        this.vy = 0;
        this.floatAmplitude = 3;
      } else if (level === 2) {
        const speed = 0.4 + Math.random() * 0.3;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.floatAmplitude = 5;
      } else {
        const speed = 0.8 + Math.random() * 0.45;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.floatAmplitude = 6;
      }
    }

    update(chamberWidth, chamberHeight) {
      if (this.isAbsorbed) return;

      if (!this.isDragging) {
        this.floatPhase += this.floatSpeed;
        const bobbing = Math.sin(this.floatPhase) * this.floatAmplitude;

        this.x += this.vx;
        this.y += this.vy;

        const minX = this.radius;
        const maxX = chamberWidth - this.radius;
        const minY = this.radius;
        const maxY = chamberHeight - this.radius;

        // Soft boundary rebound
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

        const renderX = Math.round(this.x - this.radius);
        const renderY = Math.round(this.y - this.radius + bobbing);
        this.element.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
      } else {
        // Positioned directly via pointer tracking
        const renderX = Math.round(this.x - this.radius);
        const renderY = Math.round(this.y - this.radius);
        this.element.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
      }
    }
  }

  /* ==========================================================================
     5. Master Controller & Game Modes System
     ========================================================================== */
  class AyaanStation {
    constructor() {
      // DOM Elements - Shell & HUD
      this.gameApp = document.getElementById('gameApp');
      this.missionHub = document.getElementById('missionHub');
      this.gameContainer = document.getElementById('gameContainer');
      this.chamber = document.getElementById('chamber');
      this.physicsWorld = document.getElementById('physicsWorld');
      this.portalContainer = document.getElementById('portalContainer');
      this.portalSolar = document.getElementById('portalSolar');
      this.portalNebula = document.getElementById('portalNebula');

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

      this.soundToggleBtn = document.getElementById('soundToggleBtn');
      this.soundIcon = document.getElementById('soundIcon');
      this.hintBtn = document.getElementById('hintBtn');
      this.hubBtn = document.getElementById('hubBtn');

      // Modals
      this.celebrationModal = document.getElementById('celebrationModal');
      this.celebrationTitle = document.getElementById('celebrationTitle');
      this.celebrationMessage = document.getElementById('celebrationMessage');
      this.nextLevelBtn = document.getElementById('nextLevelBtn');
      this.celebrationHubBtn = document.getElementById('celebrationHubBtn');

      // Mission Cards in Hub
      this.cardMemoryMatrix = document.getElementById('cardMemoryMatrix');
      this.cardVortexSorter = document.getElementById('cardVortexSorter');
      this.cardOrbitSwitcher = document.getElementById('cardOrbitSwitcher');

      // Subsystems
      this.sound = new SoundManager();
      this.fx = new ParticleFX(document.getElementById('particleCanvas'));

      // Persistent Star Bank
      this.totalStars = parseInt(localStorage.getItem('ayaan_total_stars') || '0', 10);
      this.updateTotalStarsDisplay();

      // State
      this.currentMode = null; // 'memory', 'sorter', 'switcher'
      this.level = 1;
      this.sessionStars = 0;
      this.bodies = [];
      this.chamberWidth = 360;
      this.chamberHeight = 500;

      // Mode-specific state trackers
      this.memoryState = { sequence: [], playerStep: 0, isShowing: false };
      this.sorterState = { totalItems: 0, sortedItems: 0, draggedBody: null };
      this.switcherState = { currentRule: null, targetValue: null, step: 0, totalSteps: 4 };

      this.initEvents();
      this.updateSoundIcon();
      this.showHub();
      this.startPhysicsLoop();
    }

    initEvents() {
      // Audio toggle
      this.soundToggleBtn.addEventListener('click', () => {
        this.sound.toggleMute();
        this.updateSoundIcon();
      });

      // Hub Button (Header 🛸)
      this.hubBtn.addEventListener('click', () => {
        this.showHub();
      });

      // Mission Hub Cards
      this.cardMemoryMatrix.addEventListener('click', () => {
        this.sound.init();
        this.launchMission('memory', 1);
      });

      this.cardVortexSorter.addEventListener('click', () => {
        this.sound.init();
        this.launchMission('sorter', 1);
      });

      this.cardOrbitSwitcher.addEventListener('click', () => {
        this.sound.init();
        this.launchMission('switcher', 1);
      });

      // Hint button (Memory Matrix)
      this.hintBtn.addEventListener('click', () => {
        if (this.currentMode === 'memory' && !this.memoryState.isShowing) {
          this.setPrompt('👀', 'Watch closely once more, Ayaan!');
          this.playMemoryDemo();
        }
      });

      // Celebration Modal Buttons
      this.nextLevelBtn.addEventListener('click', () => {
        this.celebrationModal.classList.add('hidden');
        this.launchMission(this.currentMode, this.level + 1);
      });

      this.celebrationHubBtn.addEventListener('click', () => {
        this.celebrationModal.classList.add('hidden');
        this.showHub();
      });

      // Window resize
      window.addEventListener('resize', () => {
        this.updateChamberBounds();
      });

      // Interactive Pointer Events on Physics World
      this.initPointerInteractions();
    }

    updateSoundIcon() {
      this.soundIcon.textContent = this.sound.muted ? '🔇' : '🔊';
    }

    updateTotalStarsDisplay() {
      this.totalStarsDisplay.textContent = this.totalStars;
    }

    addStars(count) {
      this.totalStars += count;
      this.sessionStars += count;
      localStorage.setItem('ayaan_total_stars', this.totalStars.toString());
      this.updateTotalStarsDisplay();
      this.scoreDisplay.textContent = this.sessionStars;
    }

    updateChamberBounds() {
      const rect = this.chamber.getBoundingClientRect();
      this.chamberWidth = rect.width;
      this.chamberHeight = rect.height;
    }

    setPrompt(icon, text, pulse = true, isRuleSwitch = false) {
      this.promptIcon.textContent = icon;
      this.promptText.textContent = text;
      if (isRuleSwitch) {
        this.promptBubble.classList.remove('rule-switch-flash');
        void this.promptBubble.offsetWidth;
        this.promptBubble.classList.add('rule-switch-flash');
      } else if (pulse) {
        this.promptBubble.classList.remove('pulse-attention');
        void this.promptBubble.offsetWidth;
        this.promptBubble.classList.add('pulse-attention');
      }
    }

    renderTracker(total, completedIndex = 0) {
      this.sequenceTracker.innerHTML = '';
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.className = 'seq-dot';
        if (i < completedIndex) {
          dot.classList.add('completed');
        } else if (i === completedIndex) {
          dot.classList.add('active-target');
        }
        this.sequenceTracker.appendChild(dot);
      }
    }

    /* ========================================================================
       Navigation & Screen Switching
       ======================================================================== */
    showHub() {
      this.currentMode = null;
      this.clearChamber();

      this.missionHub.classList.remove('hidden');
      this.gameContainer.classList.add('hidden');
      this.portalContainer.classList.add('hidden');

      this.levelPill.classList.add('hidden');
      this.hintBtn.classList.add('hidden');
      this.hubBtn.classList.add('hidden');
      this.sequenceTracker.classList.add('hidden');
      this.hubTrackerLabel.classList.remove('hidden');

      this.updateTotalStarsDisplay();
    }

    launchMission(modeKey, level = 1) {
      this.currentMode = modeKey;
      this.level = level;
      this.clearChamber();

      this.missionHub.classList.add('hidden');
      this.gameContainer.classList.remove('hidden');

      this.levelPill.classList.remove('hidden');
      this.levelDisplay.textContent = this.level;
      this.hubBtn.classList.remove('hidden');
      this.sequenceTracker.classList.remove('hidden');
      this.hubTrackerLabel.classList.add('hidden');

      this.updateChamberBounds();

      if (modeKey === 'memory') {
        this.hintBtn.classList.remove('hidden');
        this.portalContainer.classList.add('hidden');
        this.initMemoryMode();
      } else if (modeKey === 'sorter') {
        this.hintBtn.classList.add('hidden');
        this.portalContainer.classList.remove('hidden');
        this.initSorterMode();
      } else if (modeKey === 'switcher') {
        this.hintBtn.classList.add('hidden');
        this.portalContainer.classList.add('hidden');
        this.initSwitcherMode();
      }
    }

    clearChamber() {
      this.physicsWorld.innerHTML = '';
      this.bodies = [];
      this.sorterState.draggedBody = null;
    }

    /* ========================================================================
       GAME MODE 1: Antigravity Memory Matrix (Working Memory)
       ======================================================================== */
    initMemoryMode() {
      const levelConfigs = {
        1: { name: 'Cadet Memory', count: 3, seqLen: 3 },
        2: { name: 'Cosmic Memory', count: 4, seqLen: 4 },
        3: { name: 'Supernova Memory', count: 5, seqLen: 5 },
      };
      const cfg = levelConfigs[this.level] || {
        name: `Orbit Mastery ${this.level}`,
        count: Math.min(6, 3 + (this.level - 1)),
        seqLen: Math.min(6, 3 + (this.level - 1)),
      };

      this.levelNameTag.textContent = cfg.name;
      this.spawnBodies(cfg.count);

      // Generate sequence
      this.memoryState.sequence = [];
      for (let i = 0; i < cfg.seqLen; i++) {
        const randId = Math.floor(Math.random() * cfg.count);
        this.memoryState.sequence.push(randId);
      }
      this.memoryState.playerStep = 0;
      this.memoryState.isShowing = false;

      this.renderTracker(cfg.seqLen, 0);

      setTimeout(() => {
        this.setPrompt('👀', 'Watch the glowing space sequence, Ayaan!');
        this.playMemoryDemo();
      }, 600);
    }

    async playMemoryDemo() {
      this.memoryState.isShowing = true;
      this.memoryState.playerStep = 0;
      this.renderTracker(this.memoryState.sequence.length, 0);

      await this.sleep(400);

      for (let i = 0; i < this.memoryState.sequence.length; i++) {
        const objId = this.memoryState.sequence[i];
        const body = this.bodies.find((b) => b.preset.id === objId);

        if (body) {
          body.element.classList.add('cue-active');
          this.sound.playTone(objId);
          this.triggerSparkle(body);

          await this.sleep(650);
          body.element.classList.remove('cue-active');
          await this.sleep(250);
        }
      }

      this.memoryState.isShowing = false;
      this.setPrompt('👆', "Ayaan's turn! Tap the sequence!");
    }

    handleMemoryTap(tappedId, element) {
      if (this.memoryState.isShowing) return;

      const expectedId = this.memoryState.sequence[this.memoryState.playerStep];
      const body = this.bodies.find((b) => b.preset.id === tappedId);

      if (navigator.vibrate) navigator.vibrate(30);

      if (tappedId === expectedId) {
        this.sound.playTone(tappedId);
        element.classList.add('tap-correct');
        this.triggerSparkle(body, 20);

        setTimeout(() => element.classList.remove('tap-correct'), 250);

        this.memoryState.playerStep++;
        this.renderTracker(this.memoryState.sequence.length, this.memoryState.playerStep);

        if (this.memoryState.playerStep === this.memoryState.sequence.length) {
          this.handleMissionVictory(
            `Memory Level ${this.level} Cleared!`,
            `Ayaan remembered all ${this.memoryState.sequence.length} floating wonders in order!`,
            this.memoryState.sequence.length * 2
          );
        }
      } else {
        // Gentle Retry - non punitive
        this.sound.playGentleRetry();
        element.classList.add('tap-wobble');
        setTimeout(() => element.classList.remove('tap-wobble'), 650);

        this.setPrompt('💫', "Almost there! Let's watch together again!");
        setTimeout(() => {
          this.playMemoryDemo();
        }, 1100);
      }
    }

    /* ========================================================================
       GAME MODE 2: Cosmic Vortex Sorter (Spatial Reasoning & Drag Tracking)
       ======================================================================== */
    initSorterMode() {
      const sorterConfigs = {
        1: { name: 'Portal Cadet', count: 3 },
        2: { name: 'Vortex Navigator', count: 4 },
        3: { name: 'Black Hole Master', count: 6 },
      };
      const cfg = sorterConfigs[this.level] || {
        name: `Vortex Master ${this.level}`,
        count: Math.min(6, 3 + (this.level - 1)),
      };

      this.levelNameTag.textContent = cfg.name;
      this.spawnBodies(cfg.count);

      this.sorterState.totalItems = cfg.count;
      this.sorterState.sortedItems = 0;
      this.renderTracker(cfg.count, 0);

      this.setPrompt('🌀', 'Drag drifting wonders into their cosmic portals!');
    }

    handleSorterDrop(body, dropX, dropY) {
      const rectSolar = this.portalSolar.getBoundingClientRect();
      const rectNebula = this.portalNebula.getBoundingClientRect();
      const chamberRect = this.chamber.getBoundingClientRect();

      // Portal Centers relative to chamber
      const solarCenter = {
        x: rectSolar.left - chamberRect.left + rectSolar.width / 2,
        y: rectSolar.top - chamberRect.top + rectSolar.height / 2,
      };
      const nebulaCenter = {
        x: rectNebula.left - chamberRect.left + rectNebula.width / 2,
        y: rectNebula.top - chamberRect.top + rectNebula.height / 2,
      };

      const distSolar = Math.hypot(body.x - solarCenter.x, body.y - solarCenter.y);
      const distNebula = Math.hypot(body.x - nebulaCenter.x, body.y - nebulaCenter.y);
      const captureThreshold = 75; // Portal radius overlap

      let targetPortal = null;
      let portalCenter = null;

      if (distSolar < captureThreshold) {
        targetPortal = 'solar';
        portalCenter = solarCenter;
      } else if (distNebula < captureThreshold) {
        targetPortal = 'nebula';
        portalCenter = nebulaCenter;
      }

      this.portalSolar.classList.remove('drag-hover');
      this.portalNebula.classList.remove('drag-hover');

      if (targetPortal) {
        if (body.preset.category === targetPortal) {
          // MATCH! Sucked into portal with stardust swirl
          body.isAbsorbed = true;
          this.sound.playVortexSuck();
          this.fx.swirlBurst(body.x, body.y, body.preset.color, 24);

          body.element.classList.add('absorbed');
          setTimeout(() => {
            if (body.element.parentNode) {
              body.element.parentNode.removeChild(body.element);
            }
          }, 400);

          this.sorterState.sortedItems++;
          this.renderTracker(this.sorterState.totalItems, this.sorterState.sortedItems);
          this.setPrompt('🌟', `Super sorting! ${body.preset.name} is home!`);

          if (navigator.vibrate) navigator.vibrate(40);

          if (this.sorterState.sortedItems >= this.sorterState.totalItems) {
            this.handleMissionVictory(
              `Vortex Level ${this.level} Cleared!`,
              `Ayaan sorted all ${this.sorterState.totalItems} space wonders into their cosmic portals!`,
              this.sorterState.totalItems * 2
            );
          }
        } else {
          // MISMATCH - gentle bounce back without punishment
          this.sound.playGentleRetry();
          body.element.classList.add('tap-wobble');
          setTimeout(() => body.element.classList.remove('tap-wobble'), 650);

          // Push away from portal gently
          body.vx = (this.chamberWidth / 2 - body.x) * 0.05;
          body.vy = (this.chamberHeight / 2 - body.y) * 0.05;

          const correctPortalName = body.preset.category === 'solar' ? 'Solar ☀️' : 'Nebula 🌌';
          this.setPrompt('💫', `Try the ${correctPortalName} portal for ${body.preset.name}!`);
        }
      } else {
        // Dropped in free space - resumes gentle drifting
        body.vx = (Math.random() - 0.5) * 1.5;
        body.vy = (Math.random() - 0.5) * 1.5;
      }
    }

    /* ========================================================================
       GAME MODE 3: Orbit Rule Switcher (Cognitive Flexibility & DCCS)
       ======================================================================== */
    initSwitcherMode() {
      const count = Math.min(6, 4 + (this.level > 1 ? 1 : 0));
      this.levelNameTag.textContent = `Orbit Switcher ${this.level}`;
      this.spawnBodies(count);

      this.switcherState.step = 0;
      this.switcherState.totalSteps = 4;
      this.renderTracker(this.switcherState.totalSteps, 0);

      this.presentNextSwitchRule(true);
    }

    presentNextSwitchRule(isFirst = false) {
      // Alternate between 'shape' and 'color' rules
      const ruleType = isFirst
        ? (Math.random() > 0.5 ? 'shape' : 'color')
        : (this.switcherState.currentRule === 'shape' ? 'color' : 'shape');

      this.switcherState.currentRule = ruleType;

      // Pick a random available body in the chamber
      const randomBody = this.bodies[Math.floor(Math.random() * this.bodies.length)];

      if (ruleType === 'shape') {
        this.switcherState.targetValue = randomBody.preset.name;
        this.setPrompt(
          randomBody.preset.icon,
          `Find & tap the ${randomBody.preset.name}!`,
          true,
          !isFirst
        );
      } else {
        this.switcherState.targetValue = randomBody.preset.colorName;
        this.setPrompt(
          '🎨',
          `RULE SWITCH! Tap the ${randomBody.preset.colorName} wonder!`,
          true,
          true
        );
      }

      if (!isFirst) {
        this.sound.playRuleSwitch();
      }
    }

    handleSwitcherTap(tappedId, element) {
      const body = this.bodies.find((b) => b.preset.id === tappedId);
      if (!body) return;

      let isCorrect = false;
      if (this.switcherState.currentRule === 'shape') {
        isCorrect = body.preset.name === this.switcherState.targetValue;
      } else {
        isCorrect = body.preset.colorName === this.switcherState.targetValue;
      }

      if (navigator.vibrate) navigator.vibrate(35);

      if (isCorrect) {
        this.sound.playTone(tappedId);
        element.classList.add('tap-correct');
        this.triggerSparkle(body, 22);

        setTimeout(() => element.classList.remove('tap-correct'), 250);

        this.switcherState.step++;
        this.renderTracker(this.switcherState.totalSteps, this.switcherState.step);

        if (this.switcherState.step >= this.switcherState.totalSteps) {
          this.handleMissionVictory(
            `Orbit Switcher ${this.level} Cleared!`,
            `Ayaan adapted to every cosmic rule switch like a true space commander!`,
            8
          );
        } else {
          this.setPrompt('✨', 'Cosmic match! Get ready for the next wonder...');
          setTimeout(() => {
            this.presentNextSwitchRule(false);
          }, 850);
        }
      } else {
        // Gentle non-punitive perseveration support
        this.sound.playGentleRetry();
        element.classList.add('tap-wobble');
        setTimeout(() => element.classList.remove('tap-wobble'), 650);

        this.setPrompt(
          '💫',
          `Looking for ${this.switcherState.targetValue}! You can do it, Ayaan!`
        );
      }
    }

    /* ========================================================================
       Victory & Dopamine Rewards
       ======================================================================== */
    handleMissionVictory(title, message, starsEarned) {
      this.addStars(starsEarned);

      this.sound.playCelebration();
      this.fx.confettiBurst();
      this.setPrompt('🏆', 'Brilliant, Commander Ayaan! Mission accomplished!');

      setTimeout(() => {
        this.celebrationTitle.textContent = title;
        this.celebrationMessage.textContent = message;
        this.celebrationModal.classList.remove('hidden');
      }, 950);
    }

    /* ========================================================================
       Physics World & Spawning
       ======================================================================== */
    spawnBodies(count) {
      this.clearChamber();
      const activePresets = CELESTIAL_PRESETS.slice(0, count);

      activePresets.forEach((preset, idx) => {
        const body = new AntigravityBody(preset, idx, this.chamber.getBoundingClientRect());
        body.setPhysicsMode(this.level, count, this.chamberWidth, this.chamberHeight);
        this.physicsWorld.appendChild(body.element);
        this.bodies.push(body);
      });
    }

    initPointerInteractions() {
      // Unified Pointerdown for both taps and drag-and-drop
      this.physicsWorld.addEventListener('pointerdown', (e) => {
        const targetBodyEl = e.target.closest('.floating-body');
        if (!targetBodyEl) return;

        const bodyId = parseInt(targetBodyEl.getAttribute('data-id'), 10);
        const body = this.bodies.find((b) => b.preset.id === bodyId);
        if (!body || body.isAbsorbed) return;

        if (this.currentMode === 'memory') {
          this.handleMemoryTap(bodyId, targetBodyEl);
        } else if (this.currentMode === 'switcher') {
          this.handleSwitcherTap(bodyId, targetBodyEl);
        } else if (this.currentMode === 'sorter') {
          // Begin zero-g drag
          body.isDragging = true;
          this.sorterState.draggedBody = body;
          targetBodyEl.classList.add('is-dragging');
          targetBodyEl.setPointerCapture(e.pointerId);

          this.sound.playGrab();
          this.fx.burst(body.x, body.y, body.preset.color, 10);
        }
      });

      // Pointermove for smooth drag tracking
      this.physicsWorld.addEventListener('pointermove', (e) => {
        const body = this.sorterState.draggedBody;
        if (!body || !body.isDragging) return;

        const chamberRect = this.chamber.getBoundingClientRect();
        body.x = Math.max(body.radius, Math.min(this.chamberWidth - body.radius, e.clientX - chamberRect.left));
        body.y = Math.max(body.radius, Math.min(this.chamberHeight - body.radius, e.clientY - chamberRect.top));

        // Particle trail
        this.fx.trail(body.x, body.y, body.preset.color);

        // Hover feedback on portals
        const rectSolar = this.portalSolar.getBoundingClientRect();
        const rectNebula = this.portalNebula.getBoundingClientRect();
        const solarCenter = {
          x: rectSolar.left - chamberRect.left + rectSolar.width / 2,
          y: rectSolar.top - chamberRect.top + rectSolar.height / 2,
        };
        const nebulaCenter = {
          x: rectNebula.left - chamberRect.left + rectNebula.width / 2,
          y: rectNebula.top - chamberRect.top + rectNebula.height / 2,
        };

        const distSolar = Math.hypot(body.x - solarCenter.x, body.y - solarCenter.y);
        const distNebula = Math.hypot(body.x - nebulaCenter.x, body.y - nebulaCenter.y);

        if (distSolar < 80) {
          this.portalSolar.classList.add('drag-hover');
        } else {
          this.portalSolar.classList.remove('drag-hover');
        }

        if (distNebula < 80) {
          this.portalNebula.classList.add('drag-hover');
        } else {
          this.portalNebula.classList.remove('drag-hover');
        }
      });

      // Pointerup to drop
      const endDrag = (e) => {
        const body = this.sorterState.draggedBody;
        if (!body) return;

        body.isDragging = false;
        body.element.classList.remove('is-dragging');
        this.sorterState.draggedBody = null;

        if (this.currentMode === 'sorter') {
          this.handleSorterDrop(body, body.x, body.y);
        }
      };

      this.physicsWorld.addEventListener('pointerup', endDrag);
      this.physicsWorld.addEventListener('pointercancel', endDrag);
    }

    triggerSparkle(body, count = 16) {
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

        // Apply soft inter-body repulsion so zero-g floating wonders don't merge
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const b1 = this.bodies[i];
            const b2 = this.bodies[j];
            if (b1.isAbsorbed || b2.isAbsorbed) continue;

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = (b1.radius + b2.radius) * 0.95;

            if (dist < minDist && dist > 0.001) {
              const overlap = (minDist - dist) * 0.5;
              const nx = dx / dist;
              const ny = dy / dist;

              if (!b1.isDragging) {
                b1.x -= nx * overlap * 0.3;
                b1.y -= ny * overlap * 0.3;
              }
              if (!b2.isDragging) {
                b2.x += nx * overlap * 0.3;
                b2.y += ny * overlap * 0.3;
              }

              if (this.level >= 2 && !b1.isDragging && !b2.isDragging) {
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
    window.ayaanStation = new AyaanStation();
  });
})();
