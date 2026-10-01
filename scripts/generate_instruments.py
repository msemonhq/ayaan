import os
import wave
import math
import struct

SAMPLE_RATE = 44100
NOTES = [
    ("c5", 523.25),
    ("d5", 587.33),
    ("e5", 659.25),
    ("g5", 783.99),
    ("a5", 880.00),
    ("c6", 1046.50),
    ("d6", 1174.66),
    ("e6", 1318.51)
]

def write_wav(folder, filename, samples):
    os.makedirs(folder, exist_ok=True)
    filepath = os.path.join(folder, filename)
    with wave.open(filepath, "w") as wav:
        wav.setnchannels(1)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        packed = struct.pack(f"<{len(samples)}h", *[max(-32767, min(32767, int(s * 32767))) for s in samples])
        wav.writeframes(packed)

# 1. Bells Pack (Sparkling Crystal Glockenspiel / Celesta)
bells_dir = "www/assets/audio/instruments/bells"
for name, freq in NOTES:
    duration = 0.55
    num_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env1 = math.exp(-t * 6.5)
        env2 = math.exp(-t * 12.0)
        # Fundamental + 2x octave shimmer + 3x harmonic
        tone = (
            0.65 * math.sin(2 * math.pi * freq * t) * env1 +
            0.25 * math.sin(2 * math.pi * freq * 2.0 * t) * env2 +
            0.10 * math.sin(2 * math.pi * freq * 3.01 * t) * env2
        )
        samples.append(tone * 0.85)
    write_wav(bells_dir, f"{name}.wav", samples)

# 2. Cosmic Piano Pack (Warm Acoustic Piano with Natural Harmonic Decay)
piano_dir = "www/assets/audio/instruments/piano"
for name, freq in NOTES:
    duration = 0.70
    num_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env1 = math.exp(-t * 4.2)
        env2 = math.exp(-t * 7.5)
        env3 = math.exp(-t * 14.0)
        # Hammer click transient
        hammer = math.exp(-t * 90) * 0.15 * math.sin(2 * math.pi * 320 * t)
        # Harmonics (1st, 2nd, 3rd, 4th)
        tone = (
            0.55 * math.sin(2 * math.pi * freq * t) * env1 +
            0.25 * math.sin(2 * math.pi * freq * 2 * t) * env2 +
            0.12 * math.sin(2 * math.pi * freq * 3 * t) * env2 +
            0.08 * math.sin(2 * math.pi * freq * 4 * t) * env3 +
            hammer
        )
        samples.append(tone * 0.8)
    write_wav(piano_dir, f"{name}.wav", samples)

# 3. Kalimba Pack (Organic Wooden Tines & Resonating Body)
kalimba_dir = "www/assets/audio/instruments/kalimba"
for name, freq in NOTES:
    duration = 0.60
    num_samples = int(SAMPLE_RATE * duration)
    samples = []
    for i in range(num_samples):
        t = i / SAMPLE_RATE
        env1 = math.exp(-t * 5.0)
        env2 = math.exp(-t * 18.0) # Inharmonic tine ping dies out quickly
        tone = (
            0.70 * math.sin(2 * math.pi * freq * t) * env1 +
            0.30 * math.sin(2 * math.pi * freq * 2.76 * t) * env2 # Metal tine overtone ratio ~2.76
        )
        samples.append(tone * 0.8)
    write_wav(kalimba_dir, f"{name}.wav", samples)

print("All instrument sound packs generated!")
