/**
 * Ayaan - Supercharged Antigravity Space Memory Game
 * Designed for 6-Year-Old Astronaut Ayaan
 * Pure Single-Tap Fun, High Dopamine, Zero Text Friction & Growth Mindset
 */

(function () {
  'use strict';

  /* ==========================================================================
     0. Haptics Manager (Capacitor Native Haptics with Web Fallback)
     Tactile micro-feedback engineered for young sensory development
     ========================================================================== */
  class HapticsManager {
    constructor() {
      this.enabled = localStorage.getItem('ayaan_haptics') !== 'false';
    }

    async tapLight() {
      if (!this.enabled) return;
      try {
        if (window.Capacitor?.isPluginAvailable('Haptics')) {
          await window.Capacitor.Plugins.Haptics.impact({ style: 'LIGHT' });
        } else if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      } catch (e) {}
    }

    async tapMedium() {
      if (!this.enabled) return;
      try {
        if (window.Capacitor?.isPluginAvailable('Haptics')) {
          await window.Capacitor.Plugins.Haptics.impact({ style: 'MEDIUM' });
        } else if (navigator.vibrate) {
          navigator.vibrate(30);
        }
      } catch (e) {}
    }

    async success() {
      if (!this.enabled) return;
      try {
        if (window.Capacitor?.isPluginAvailable('Haptics')) {
          await window.Capacitor.Plugins.Haptics.notification({ type: 'SUCCESS' });
        } else if (navigator.vibrate) {
          navigator.vibrate([30, 40, 60]);
        }
      } catch (e) {}
    }

    async gentleWarning() {
      if (!this.enabled) return;
      try {
        if (window.Capacitor?.isPluginAvailable('Haptics')) {
          await window.Capacitor.Plugins.Haptics.notification({ type: 'WARNING' });
        } else if (navigator.vibrate) {
          navigator.vibrate([20, 30, 20]);
        }
      } catch (e) {}
    }
  }

  /* ==========================================================================
     1. Studio Sound & Synthesizer Engine (Web Audio API)
     Multi-Sampled Packs: Bells 🔔, Cosmic Piano 🎹, Kalimba 🪵, Retro Synth 🚀
     Tactile Bubble Pops, Fanfares & Low-Latency AudioBuffers
     ========================================================================== */
  class SoundManager {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('ayaan_muted') === 'true';
      this.soundPack = localStorage.getItem('ayaan_sound_pack') || 'bells';
      this.frequencies = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51]; // C5 to E6 Pentatonic
      this.noteNames = ['c5', 'd5', 'e5', 'g5', 'a5', 'c6', 'd6', 'e6'];
      this.bufferCache = new Map();
      this.preloadAudio();
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

    async preloadAudio() {
      if (!window.fetch) return;

      const toLoad = [
        { key: 'sfx_pop_1', url: 'assets/audio/sfx/pop_bubble_1.wav' },
        { key: 'sfx_pop_2', url: 'assets/audio/sfx/pop_bubble_2.wav' },
        { key: 'sfx_pop_3', url: 'assets/audio/sfx/pop_bubble_3.wav' },
        { key: 'sfx_fanfare', url: 'assets/audio/sfx/badge_fanfare.wav' },
        { key: 'sfx_hint', url: 'assets/audio/sfx/hint_peek.wav' },
      ];

      ['bells', 'piano', 'kalimba'].forEach((pack) => {
        this.noteNames.forEach((note) => {
          toLoad.push({ key: `${pack}_${note}`, url: `assets/audio/instruments/${pack}/${note}.wav` });
        });
      });

      for (const item of toLoad) {
        try {
          const resp = await fetch(item.url);
          if (resp.ok) {
            const arr = await resp.arrayBuffer();
            this.init();
            if (this.ctx) {
              const audioBuf = await this.ctx.decodeAudioData(arr);
              this.bufferCache.set(item.key, audioBuf);
            }
          }
        } catch (e) {}
      }
    }

    playBuffer(buf, volume = 1.0) {
      if (this.muted || !buf) return;
      this.init();
      if (!this.ctx) return;
      try {
        const source = this.ctx.createBufferSource();
        source.buffer = buf;
        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
        source.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        source.start(0);
      } catch (e) {}
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('ayaan_muted', this.muted);
      return this.muted;
    }

    cycleSoundPack() {
      const packs = ['bells', 'piano', 'kalimba', 'synth'];
      const currentIndex = packs.indexOf(this.soundPack);
      this.soundPack = packs[(currentIndex + 1) % packs.length];
      localStorage.setItem('ayaan_sound_pack', this.soundPack);
      this.playTone(2, 0.4); // Preview note
      return this.soundPack;
    }

    getSoundPackIcon() {
      if (this.soundPack === 'piano') return '🎹';
      if (this.soundPack === 'kalimba') return '🪵';
      if (this.soundPack === 'synth') return '🚀';
      return '🔔';
    }

    playTone(index, duration = 0.35) {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      const noteIdx = Math.abs(index) % this.noteNames.length;
      const noteName = this.noteNames[noteIdx];
      const cachedBuf = this.bufferCache.get(`${this.soundPack}_${noteName}`);

      if (cachedBuf) {
        this.playBuffer(cachedBuf, 0.85);
        return;
      }

      // Procedural oscillator fallback (or for synth pack)
      const freq = this.frequencies[noteIdx];
      const now = this.ctx.currentTime;

      if (this.soundPack === 'piano') {
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
        // Sparkling Crystal Bells
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

      const popKeys = ['sfx_pop_1', 'sfx_pop_2', 'sfx_pop_3'];
      const randomKey = popKeys[Math.floor(Math.random() * popKeys.length)];
      const buf = this.bufferCache.get(randomKey);

      if (buf) {
        this.playBuffer(buf, 0.9);
        return;
      }

      // Fallback procedural pop
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

    playHintPeek() {
      if (this.muted) return;
      const buf = this.bufferCache.get('sfx_hint');
      if (buf) {
        this.playBuffer(buf, 0.85);
      } else {
        this.playTone(3, 0.25);
      }
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
      const buf = this.bufferCache.get('sfx_fanfare');
      if (buf) {
        this.playBuffer(buf, 0.95);
        return;
      }

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
     1.5 Voice Companion (Spoken Pre-Reader Guidance with Web Speech Fallback)
     Warm, enthusiastic companion voice tailored for Astronaut Ayaan
     ========================================================================== */
  class VoiceCompanion {
    constructor(soundManager) {
      this.sound = soundManager;
      this.enabled = localStorage.getItem('ayaan_voice_enabled') !== 'false';
      this.bufferCache = new Map();
      this.clips = {
        ready: { file: 'assets/audio/voices/vo_ready_ayaan.wav', text: "Get ready, Astronaut Ayaan!" },
        listen: { file: 'assets/audio/voices/vo_listen_melody.wav', text: "Listen carefully to the melody!" },
        your_turn: { file: 'assets/audio/voices/vo_your_turn.wav', text: "Your turn! Tap the stars!" },
        almost: { file: 'assets/audio/voices/vo_almost_there.wav', text: "Almost there! Let's listen together again!" },
        orbit_complete: { file: 'assets/audio/voices/vo_orbit_complete.wav', text: "Super job, Ayaan! Orbit Complete!" },
        star_rush: { file: 'assets/audio/voices/vo_star_rush_start.wav', text: "Star Rush! Pop as many stars as you can!" },
        badge: { file: 'assets/audio/voices/vo_badge_unlocked.wav', text: "Wow! You unlocked a new Space Trophy!" }
      };
      this.preloadClips();
    }

    async preloadClips() {
      if (!window.fetch) return;
      for (const [key, item] of Object.entries(this.clips)) {
        try {
          const resp = await fetch(item.file);
          if (resp.ok) {
            const arr = await resp.arrayBuffer();
            this.sound.init();
            if (this.sound.ctx) {
              const audioBuf = await this.sound.ctx.decodeAudioData(arr);
              this.bufferCache.set(key, audioBuf);
            }
          }
        } catch (e) {}
      }
    }

    toggleVoice() {
      this.enabled = !this.enabled;
      localStorage.setItem('ayaan_voice_enabled', this.enabled.toString());
      return this.enabled;
    }

    speak(cueKey) {
      if (!this.enabled || this.sound.muted) return;
      const clip = this.clips[cueKey];
      if (!clip) return;

      // Try pre-recorded WAV buffer first
      const buf = this.bufferCache.get(cueKey);
      if (buf && this.sound.ctx) {
        this.sound.playBuffer(buf, 0.95);
        return;
      }

      // Try HTML5 Audio fallback
      try {
        const audio = new Audio(clip.file);
        audio.volume = 0.95;
        audio.play().catch(() => this.speakWebSpeech(clip.text));
        return;
      } catch (e) {}

      // Fallback: Web Speech API (Google TTS in Android / browser)
      this.speakWebSpeech(clip.text);
    }

    speakWebSpeech(text) {
      if (!window.speechSynthesis) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.25; // Friendly, warm, slightly higher pitch for kids
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  }

  /* ==========================================================================
     1.8 Lottie Vector Animation Manager (60-120fps Offline Vector Celebrations)
     ========================================================================== */
  class LottieManager {
    constructor() {
      this.animations = new Map();
      this.available = typeof window.lottie !== 'undefined';
    }

    play(containerId, path, loop = true) {
      const container = document.getElementById(containerId);
      if (!container) return null;

      // Clean up existing animation
      this.stop(containerId);

      if (!this.available && typeof window.lottie !== 'undefined') {
        this.available = true;
      }

      if (!this.available) {
        // Reveal fallback emoji if lottie is unavailable
        const parent = container.parentElement;
        if (parent) {
          const fallback = parent.querySelector('.fallback-badge');
          if (fallback) fallback.style.display = 'inline-block';
        }
        return null;
      }

      try {
        const anim = window.lottie.loadAnimation({
          container: container,
          renderer: 'svg',
          loop: loop,
          autoplay: true,
          path: path
        });
        this.animations.set(containerId, anim);
        return anim;
      } catch (e) {
        return null;
      }
    }

    stop(containerId) {
      if (this.animations.has(containerId)) {
        try {
          const anim = this.animations.get(containerId);
          anim.destroy();
        } catch (e) {}
        this.animations.delete(containerId);
      }
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
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
    { id: 0, name: 'Star', icon: '⭐', svg: 'assets/images/celestial/obj_star.svg', class: 'obj-star', color: '#ffd233' },
    { id: 1, name: 'Planet', icon: '🪐', svg: 'assets/images/celestial/obj_planet.svg', class: 'obj-planet', color: '#00f0ff' },
    { id: 2, name: 'Moon', icon: '🌙', svg: 'assets/images/celestial/obj_moon.svg', class: 'obj-moon', color: '#bd7aff' },
    { id: 3, name: 'Comet', icon: '☄️', svg: 'assets/images/celestial/obj_comet.svg', class: 'obj-comet', color: '#ff763b' },
    { id: 4, name: 'Crystal', icon: '💎', svg: 'assets/images/celestial/obj_crystal.svg', class: 'obj-crystal', color: '#00f5a0' },
    { id: 5, name: 'Rocket', icon: '🚀', svg: 'assets/images/celestial/obj_rocket.svg', class: 'obj-rocket', color: '#ff2a85' },
    { id: 6, name: 'UFO', icon: '🛸', svg: 'assets/images/celestial/obj_ufo.svg', class: 'obj-ufo', color: '#38bdf8' },
    { id: 7, name: 'Alien', icon: '👾', svg: 'assets/images/celestial/obj_alien.svg', class: 'obj-alien', color: '#a855f7' },
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
    { id: 'badge_orbit1', icon: '🎖️', svg: 'assets/images/badges/badge_orbit1.svg', title: 'Cadet Launch', desc: 'Clear Orbit 1' },
    { id: 'badge_notes4', icon: '🎶', svg: 'assets/images/badges/badge_notes4.svg', title: 'Melody Maestro', desc: 'Clear a 4-note melody' },
    { id: 'badge_orbit3', icon: '🚀', svg: 'assets/images/badges/badge_orbit3.svg', title: 'Deep Space Cadet', desc: 'Reach & Clear Orbit 3' },
    { id: 'badge_stars30', icon: '⭐', svg: 'assets/images/badges/badge_stars30.svg', title: 'Star Hunter', desc: 'Collect 30 Cosmic Stars' },
    { id: 'badge_starrush', icon: '🛸', svg: 'assets/images/badges/badge_starrush.svg', title: 'Star Popper', desc: 'Pop 10 stars in Star Rush' },
    { id: 'badge_orbit5', icon: '👑', svg: 'assets/images/badges/badge_orbit5.svg', title: 'Galaxy Legend', desc: 'Reach & Clear Orbit 5' },
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
          <div class="object-graphic">
            <img src="${this.preset.svg}" alt="${this.preset.name}" class="celestial-svg" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
            <span class="object-icon fallback-icon" style="display: none;">${this.preset.icon}</span>
          </div>
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
      this.voiceToggleBtn = document.getElementById('voiceToggleBtn');
      this.voiceIcon = document.getElementById('voiceIcon');
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
      this.voice = new VoiceCompanion(this.sound);
      this.haptics = new HapticsManager();
      this.lottie = new LottieManager();
      this.fx = new ParticleFX(document.getElementById('particleCanvas'));
      this.rocketLaunchOverlay = document.getElementById('rocketLaunchOverlay');

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
        this.haptics.tapLight();
        this.sound.cycleSoundPack();
        this.instrumentIcon.textContent = this.sound.getSoundPackIcon();
      });

      // Sound mute toggle
      this.soundToggleBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.sound.toggleMute();
        this.updateSoundIcon();
      });

      // Voice Companion toggle
      if (this.voiceToggleBtn) {
        this.voiceToggleBtn.addEventListener('click', () => {
          this.haptics.tapLight();
          const isEnabled = this.voice.toggleVoice();
          this.updateVoiceIcon();
          this.setPrompt('🗣️', isEnabled ? 'Voice Companion: ON!' : 'Voice Companion: OFF!');
        });
      }

      // Home / Map Button
      this.homeBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        if (this.orbitMapScreen.classList.contains('hidden')) {
          this.showGalaxyMap();
        } else {
          this.startOrbit(this.currentOrbit, true);
        }
      });

      // Trophy Badges Button
      this.trophyBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.showBadgesModal();
      });

      this.closeBadgesBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.badgeModal.classList.add('hidden');
        this.lottie.stop('badgeModalLottie');
      });

      // Hint Replay Button
      this.hintBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        if (!this.isShowingSequence && !this.isStarRushActive && this.sequence.length > 0) {
          this.sound.playHintPeek();
          this.setPrompt('👀', 'Watch the melody once more, Ayaan!');
          this.voice.speak('listen');
          this.playSequenceDemo();
        }
      });

      // Quick Play Button on Galaxy Map
      this.quickPlayBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.startOrbit(this.currentOrbit, true);
      });

      // Star Rush Button on Galaxy Map
      this.startStarRushBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.startStarRush();
      });

      // Celebration Modal
      this.nextLevelBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.celebrationModal.classList.add('hidden');
        this.lottie.stop('celebrationLottie');
        const nextOrbit = Math.min(6, this.currentOrbit + 1);
        this.startOrbit(nextOrbit, true);
      });

      this.celebrationMapBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.celebrationModal.classList.add('hidden');
        this.lottie.stop('celebrationLottie');
        this.showGalaxyMap();
      });

      // Star Rush End Modal
      this.playStarRushAgainBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.starRushEndModal.classList.add('hidden');
        this.lottie.stop('starRushLottie');
        this.startStarRush();
      });

      this.starRushBackBtn.addEventListener('click', () => {
        this.haptics.tapLight();
        this.starRushEndModal.classList.add('hidden');
        this.lottie.stop('starRushLottie');
        this.startOrbit(this.currentOrbit, true);
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
      this.updateVoiceIcon();
    }

    updateSoundIcon() {
      this.soundIcon.textContent = this.sound.muted ? '🔇' : '🔊';
    }

    updateVoiceIcon() {
      if (this.voiceIcon) {
        this.voiceIcon.textContent = this.voice.enabled ? '🗣️' : '🔇';
      }
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

    startOrbit(orbitNum, fromLaunch = false) {
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

      // Full-screen Rocket Launch animation if transitioning into orbit
      if (fromLaunch && this.rocketLaunchOverlay) {
        this.rocketLaunchOverlay.classList.remove('hidden');
        this.rocketLaunchOverlay.style.opacity = '1';
        this.lottie.play('rocketLaunchLottie', 'assets/lottie/lottie_rocket_launch.json', false);
        this.haptics.tapMedium();
        setTimeout(() => {
          this.rocketLaunchOverlay.style.opacity = '0';
          setTimeout(() => {
            this.rocketLaunchOverlay.classList.add('hidden');
            this.lottie.stop('rocketLaunchLottie');
          }, 350);
        }, 850);
      }

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
      const demoDelay = fromLaunch ? 1200 : 650;
      setTimeout(() => {
        this.setPrompt('👀', 'Watch the glowing space melody, Ayaan!');
        this.voice.speak('listen');
        this.playSequenceDemo();
      }, demoDelay);
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
      this.voice.speak('your_turn');
    }

    handlePlayerMemoryTap(tappedId, element, body) {
      const expectedId = this.sequence[this.playerStep];

      if (tappedId === expectedId) {
        // Correct tap!
        this.haptics.tapLight();
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
        this.haptics.gentleWarning();
        this.sound.playGentleRetry();
        this.voice.speak('almost');
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

      this.haptics.success();
      this.sound.playCelebration();
      this.voice.speak('orbit_complete');
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
        this.lottie.play('celebrationLottie', 'assets/lottie/lottie_astronaut_celebrate.json', true);
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
      this.voice.speak('star_rush');

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
      this.haptics.tapMedium();
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
      this.haptics.success();
      this.sound.playCelebration();
      this.fx.confettiBurst();

      this.starRushPoppedCount.textContent = this.starRushPopped;
      this.lottie.play('starRushLottie', 'assets/lottie/lottie_trophy_unlock.json', true);
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
          this.haptics.tapLight();
          this.startOrbit(orbitNum, true);
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
      this.haptics.success();
      this.sound.playBadgeFanfare();
      this.voice.speak('badge');
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
          <div class="badge-graphic">
            <img src="${badge.svg}" alt="${badge.title}" class="badge-svg" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';">
            <span class="badge-icon fallback-icon" style="display: none;">${badge.icon}</span>
          </div>
          <div class="badge-info">
            <div class="badge-title">${badge.title}</div>
            <div class="badge-desc">${badge.desc}</div>
          </div>
          <span class="badge-status">${isUnlocked ? 'UNLOCKED ⭐' : 'LOCKED 🔒'}</span>
        `;
        this.badgesListContainer.appendChild(item);
      });
      this.lottie.play('badgeModalLottie', 'assets/lottie/lottie_trophy_unlock.json', false);
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
