/**
 * Ayaan - Mobile Antigravity Brain Exercise Game
 * Core Engine: Antigravity Physics, Web Audio Synthesizer, & Working Memory Loop
 * Designed for 6-Year-Old Cognitive Development & Positive Reinforcement
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Sound Synthesizer (Web Audio API)
     Zero-latency, offline native audio with pleasant musical pentatonic scale
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

      const freq = this.frequencies[index % this.frequencies.length];
      const now = this.ctx.currentTime;

      // Primary oscillator (warm marimba-like bell)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Soft harmonic chime
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Exponential gain decay for natural acoustic warmth
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
      // Gentle, low-frequency warm wobble (non-punitive)
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

      // Joyful ascending arpeggio fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const now = this.ctx.currentTime + idx * 0.1;
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

      // Render subtle background twinkling stardust
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
          // Zero-g drag
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
     3. Antigravity Physics Engine (The Zero-G Chamber)
     Smooth 2D buoyancy, drift vectors, and boundary rebounds
     ========================================================================== */
  const CELESTIAL_PRESETS = [
    { id: 0, name: 'Star', icon: '⭐', class: 'obj-star', color: '#ffd233' },
    { id: 1, name: 'Planet', icon: '🪐', class: 'obj-planet', color: '#00f0ff' },
    { id: 2, name: 'Moon', icon: '🌙', class: 'obj-moon', color: '#bd7aff' },
    { id: 3, name: 'Comet', icon: '☄️', class: 'obj-comet', color: '#ff763b' },
    { id: 4, name: 'Crystal', icon: '💎', class: 'obj-crystal', color: '#00f5a0' },
    { id: 5, name: 'Rocket', icon: '🚀', class: 'obj-rocket', color: '#ff2a85' },
  ];

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

      this.element = this.createElement();
    }

    createElement() {
      const el = document.createElement('div');
      el.className = `floating-body ${this.preset.class}`;
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
      // Compute safe distribution so objects spawn evenly spaced
      const margin = this.radius + 15;
      const usableW = Math.max(100, chamberWidth - margin * 2);
      const usableH = Math.max(100, chamberHeight - margin * 2);

      // Spread initial anchors across grid positions
      const cols = totalObjects <= 3 ? totalObjects : Math.ceil(Math.sqrt(totalObjects));
      const row = Math.floor(this.index / cols);
      const col = this.index % cols;

      const spacingX = usableW / (cols || 1);
      const spacingY = usableH / (Math.ceil(totalObjects / cols) || 1);

      this.x = margin + col * spacingX + spacingX * 0.5 + (Math.random() - 0.5) * 20;
      this.y = margin + row * spacingY + spacingY * 0.5 + (Math.random() - 0.5) * 20;

      // Speed profiles tailored for cognitive neuroscience progression
      if (level === 1) {
        // Level 1: Stationary anchor with gentle micro-buoyancy (easy tracking for 6yo)
        this.vx = 0;
        this.vy = 0;
        this.floatAmplitude = 3;
      } else if (level === 2) {
        // Level 2: Slow, gentle zero-g drift
        const speed = 0.4 + Math.random() * 0.3;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.floatAmplitude = 5;
      } else {
        // Level 3+: Moderate drift with bouncy rebounds
        const speed = 0.8 + Math.random() * 0.45;
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

      // Hardware-accelerated CSS transform positioning
      const renderX = Math.round(this.x - this.radius);
      const renderY = Math.round(this.y - this.radius + bobbing);
      this.element.style.transform = `translate3d(${renderX}px, ${renderY}px, 0)`;
    }
  }

  /* ==========================================================================
     4. Main Game Controller & Neuroscience Progression Loop
     ========================================================================== */
  class AyaanGame {
    constructor() {
      // DOM Elements
      this.chamber = document.getElementById('chamber');
      this.physicsWorld = document.getElementById('physicsWorld');
      this.levelDisplay = document.getElementById('levelDisplay');
      this.scoreDisplay = document.getElementById('scoreDisplay');
      this.levelNameTag = document.getElementById('levelNameTag');
      this.promptBubble = document.getElementById('promptBubble');
      this.promptText = document.getElementById('promptText');
      this.promptIcon = document.getElementById('promptIcon');
      this.sequenceTracker = document.getElementById('sequenceTracker');
      this.soundToggleBtn = document.getElementById('soundToggleBtn');
      this.soundIcon = document.getElementById('soundIcon');
      this.hintBtn = document.getElementById('hintBtn');
      this.startModal = document.getElementById('startModal');
      this.celebrationModal = document.getElementById('celebrationModal');
      this.startPlayBtn = document.getElementById('startPlayBtn');
      this.nextLevelBtn = document.getElementById('nextLevelBtn');

      // Systems
      this.sound = new SoundManager();
      this.fx = new ParticleFX(document.getElementById('particleCanvas'));

      // State
      this.level = 1;
      this.starsScore = 0;
      this.bodies = [];
      this.sequence = [];
      this.playerStep = 0;
      this.isInteracting = false;
      this.isShowingSequence = false;
      this.chamberWidth = 360;
      this.chamberHeight = 500;

      this.levelConfigs = {
        1: { name: 'Cadet Float', objects: 3, seqLength: 3 },
        2: { name: 'Cosmic Drift', objects: 4, seqLength: 4 },
        3: { name: 'Supernova Orbit', objects: 5, seqLength: 5 },
      };

      this.initEvents();
      this.updateSoundIcon();
      this.startPhysicsLoop();
    }

    initEvents() {
      // Sound Toggle
      this.soundToggleBtn.addEventListener('click', () => {
        const isMuted = this.sound.toggleMute();
        this.updateSoundIcon();
      });

      // Hint / Repeat sequence button
      this.hintBtn.addEventListener('click', () => {
        if (!this.isShowingSequence && this.sequence.length > 0) {
          this.setPrompt('👀', 'Watch closely once more, Ayaan!');
          this.playSequenceDemo();
        }
      });

      // Start Game Modal
      this.startPlayBtn.addEventListener('click', () => {
        this.sound.init();
        this.startModal.classList.add('hidden');
        this.startLevel(1);
      });

      // Next Level Modal
      this.nextLevelBtn.addEventListener('click', () => {
        this.celebrationModal.classList.add('hidden');
        this.startLevel(this.level + 1);
      });

      // Window resize
      window.addEventListener('resize', () => {
        this.updateChamberBounds();
        this.relocateBodies();
      });

      // Touch / Pointer handler on the physics world using event delegation
      this.physicsWorld.addEventListener('pointerdown', (e) => {
        const targetBody = e.target.closest('.floating-body');
        if (!targetBody || !this.isInteracting || this.isShowingSequence) return;

        const bodyId = parseInt(targetBody.getAttribute('data-id'), 10);
        this.handlePlayerTap(bodyId, targetBody);
      });
    }

    updateSoundIcon() {
      this.soundIcon.textContent = this.sound.muted ? '🔇' : '🔊';
    }

    updateChamberBounds() {
      const rect = this.chamber.getBoundingClientRect();
      this.chamberWidth = rect.width;
      this.chamberHeight = rect.height;
    }

    setPrompt(icon, message, pulse = true) {
      this.promptIcon.textContent = icon;
      this.promptText.textContent = message;
      if (pulse) {
        this.promptBubble.classList.remove('pulse-attention');
        void this.promptBubble.offsetWidth; // Trigger reflow
        this.promptBubble.classList.add('pulse-attention');
      }
    }

    renderSequenceTracker(totalDots, activeIndex = 0) {
      this.sequenceTracker.innerHTML = '';
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'seq-dot';
        if (i < activeIndex) {
          dot.classList.add('completed');
        } else if (i === activeIndex) {
          dot.classList.add('active-target');
        }
        this.sequenceTracker.appendChild(dot);
      }
    }

    startLevel(newLevel) {
      this.level = newLevel;
      const config = this.levelConfigs[this.level] || {
        name: `Orbit Mastery ${this.level}`,
        objects: Math.min(6, 3 + (this.level - 1)),
        seqLength: Math.min(6, 3 + (this.level - 1)),
      };

      this.levelDisplay.textContent = this.level;
      this.levelNameTag.textContent = config.name;
      this.updateChamberBounds();

      // Spawn floating objects in zero-g chamber
      this.physicsWorld.innerHTML = '';
      this.bodies = [];

      const activePresets = CELESTIAL_PRESETS.slice(0, config.objects);
      activePresets.forEach((preset, idx) => {
        const body = new AntigravityBody(preset, idx, this.chamber.getBoundingClientRect());
        body.setPhysicsMode(this.level, config.objects, this.chamberWidth, this.chamberHeight);
        this.physicsWorld.appendChild(body.element);
        this.bodies.push(body);
      });

      // Generate sequence
      this.sequence = [];
      for (let i = 0; i < config.seqLength; i++) {
        const randomObjId = Math.floor(Math.random() * config.objects);
        this.sequence.push(randomObjId);
      }

      this.playerStep = 0;
      this.renderSequenceTracker(config.seqLength, 0);

      // Neuro-supportive pause before demonstration
      setTimeout(() => {
        this.setPrompt('👀', 'Watch the cosmic sequence, Ayaan!');
        this.playSequenceDemo();
      }, 700);
    }

    relocateBodies() {
      const config = this.levelConfigs[this.level] || { objects: this.bodies.length };
      this.bodies.forEach((body) => {
        body.setPhysicsMode(this.level, config.objects, this.chamberWidth, this.chamberHeight);
      });
    }

    async playSequenceDemo() {
      this.isShowingSequence = true;
      this.isInteracting = false;
      this.playerStep = 0;
      this.renderSequenceTracker(this.sequence.length, 0);

      await this.sleep(400);

      for (let i = 0; i < this.sequence.length; i++) {
        const objId = this.sequence[i];
        const body = this.bodies.find((b) => b.preset.id === objId);

        if (body) {
          // Glow and chime
          body.element.classList.add('cue-active');
          this.sound.playTone(objId);
          this.triggerObjectSparkle(body);

          await this.sleep(650);
          body.element.classList.remove('cue-active');
          await this.sleep(250);
        }
      }

      this.isShowingSequence = false;
      this.isInteracting = true;
      this.setPrompt('👆', "Ayaan's turn! Tap the sequence!");
    }

    handlePlayerTap(tappedId, element) {
      const expectedId = this.sequence[this.playerStep];
      const body = this.bodies.find((b) => b.preset.id === tappedId);

      // Tactile haptic feedback (Android Vibration API)
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      if (tappedId === expectedId) {
        // Correct step! Immediate dopamine reinforcement
        this.sound.playTone(tappedId);
        element.classList.add('tap-correct');
        this.triggerObjectSparkle(body, 22);

        setTimeout(() => element.classList.remove('tap-correct'), 250);

        this.playerStep++;
        this.renderSequenceTracker(this.sequence.length, this.playerStep);

        if (this.playerStep === this.sequence.length) {
          // Level Completed successfully!
          this.handleSequenceSuccess();
        }
      } else {
        // Gentle retry - No frustration, encourage learning
        this.handleGentleRetry(element);
      }
    }

    handleSequenceSuccess() {
      this.isInteracting = false;
      this.starsScore += this.sequence.length * 2;
      this.scoreDisplay.textContent = this.starsScore;

      this.sound.playCelebration();
      this.fx.confettiBurst();
      this.setPrompt('🌟', 'Brilliant, Ayaan! Super Astronaut!');

      setTimeout(() => {
        const celebrationTitle = document.getElementById('celebrationTitle');
        const celebrationMsg = document.getElementById('celebrationMessage');

        celebrationTitle.textContent = `Cosmic Level ${this.level} Cleared!`;
        celebrationMsg.textContent = `Ayaan remembered all ${this.sequence.length} objects drifting in zero gravity!`;

        this.celebrationModal.classList.remove('hidden');
      }, 900);
    }

    handleGentleRetry(element) {
      this.isInteracting = false;
      this.sound.playGentleRetry();

      // Gentle wobble animation
      element.classList.add('tap-wobble');
      setTimeout(() => element.classList.remove('tap-wobble'), 650);

      this.setPrompt('💫', "Almost there! Let's watch together again!");

      // Replay sequence automatically after a brief moment
      setTimeout(() => {
        this.playSequenceDemo();
      }, 1200);
    }

    triggerObjectSparkle(body, count = 14) {
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
        // Apply soft inter-body repulsion so zero-g objects don't merge
        const len = this.bodies.length;
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

              // Soft bounce exchange if moving
              if (this.level >= 2) {
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
    window.ayaanGame = new AyaanGame();
  });
})();
