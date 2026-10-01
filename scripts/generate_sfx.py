import os
import wave
import math
import struct

os.makedirs("www/assets/audio/sfx", exist_ok=True)
SAMPLE_RATE = 44100

def write_wav(filename, samples):
    filepath = os.path.join("www/assets/audio/sfx", filename)
    with wave.open(filepath, "w") as wav:
        wav.setnchannels(1)  # Mono
        wav.setsampwidth(2)  # 16-bit
        wav.setframerate(SAMPLE_RATE)
        packed = struct.pack(f"<{len(samples)}h", *[max(-32767, min(32767, int(s * 32767))) for s in samples])
        wav.writeframes(packed)
    print(f"Generated: {filepath}")

# 1. Bubble Pop 1 (Bright Crisp Pop)
duration = 0.08
num_samples = int(SAMPLE_RATE * duration)
samples = []
for i in range(num_samples):
    t = i / SAMPLE_RATE
    env = math.exp(-t * 45)
    freq = 480 + (1200 - 480) * (1 - math.exp(-t * 60))
    val = math.sin(2 * math.pi * freq * t) * env * 0.8
    samples.append(val)
write_wav("pop_bubble_1.wav", samples)

# 2. Bubble Pop 2 (Deep Hollow Suction Pop)
duration = 0.09
num_samples = int(SAMPLE_RATE * duration)
samples = []
for i in range(num_samples):
    t = i / SAMPLE_RATE
    env = math.exp(-t * 38)
    freq = 350 + (980 - 350) * (1 - math.exp(-t * 45))
    # Fundamental + warm second harmonic
    val = (0.7 * math.sin(2 * math.pi * freq * t) + 0.3 * math.sin(4 * math.pi * freq * t)) * env * 0.85
    samples.append(val)
write_wav("pop_bubble_2.wav", samples)

# 3. Bubble Pop 3 (Glassy Crystal Ping Pop)
duration = 0.11
num_samples = int(SAMPLE_RATE * duration)
samples = []
for i in range(num_samples):
    t = i / SAMPLE_RATE
    env = math.exp(-t * 32)
    freq = 680 + (1550 - 680) * (1 - math.exp(-t * 50))
    val = (0.6 * math.sin(2 * math.pi * freq * t) + 0.4 * math.sin(2 * math.pi * (freq * 1.5) * t)) * env * 0.8
    samples.append(val)
write_wav("pop_bubble_3.wav", samples)

# 4. Badge Fanfare (Harmonized Royal Chime Chords)
duration = 0.75
num_samples = int(SAMPLE_RATE * duration)
samples = []
notes = [523.25, 659.25, 783.99, 1046.50] # C5, E5, G5, C6
for i in range(num_samples):
    t = i / SAMPLE_RATE
    val = 0
    for idx, f in enumerate(notes):
        delay = idx * 0.08
        if t >= delay:
            dt = t - delay
            env = math.exp(-dt * 5.5)
            # Marimba/Celesta tone: fundamental + 2nd overtone
            tone = 0.7 * math.sin(2 * math.pi * f * dt) + 0.3 * math.sin(2 * math.pi * f * 2.76 * dt)
            val += tone * env * 0.22
    samples.append(val)
write_wav("badge_fanfare.wav", samples)

# 5. Hint Peek (Gentle Cosmic Twinkle Sweep)
duration = 0.35
num_samples = int(SAMPLE_RATE * duration)
samples = []
for i in range(num_samples):
    t = i / SAMPLE_RATE
    env = math.sin(math.pi * (t / duration)) ** 1.5
    f1 = 600 + 400 * math.sin(2 * math.pi * 3 * t)
    f2 = f1 * 1.5
    val = (0.6 * math.sin(2 * math.pi * f1 * t) + 0.4 * math.sin(2 * math.pi * f2 * t)) * env * 0.6
    samples.append(val)
write_wav("hint_peek.wav", samples)
