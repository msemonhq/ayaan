import json
import os
import math

os.makedirs("www/assets/lottie", exist_ok=True)

def kf(val):
    """Constant value property"""
    return {"a": 0, "k": val, "ix": 1}

def animated_p(keyframes):
    """Animated position property"""
    return {"a": 1, "k": keyframes, "ix": 2}

def animated_s(keyframes):
    """Animated scale property"""
    return {"a": 1, "k": keyframes, "ix": 6}

def animated_r(keyframes):
    """Animated rotation property"""
    return {"a": 1, "k": keyframes, "ix": 7}

# ==============================================================================
# 1. Astronaut Celebrate Animation (Moonwalk Bounce & Star Radiance)
# ==============================================================================
def create_astronaut_celebrate():
    # 60 frames @ 60fps = 1 second loop
    frames = 60
    
    # Bouncing body keyframes (bobbing up and down)
    pos_kf = [
        {"t": 0, "s": [80, 84, 0], "e": [80, 68, 0], "i": {"x": 0.4, "y": 1}, "o": {"x": 0.2, "y": 0}},
        {"t": 30, "s": [80, 68, 0], "e": [80, 84, 0], "i": {"x": 0.4, "y": 1}, "o": {"x": 0.2, "y": 0}},
        {"t": 60, "s": [80, 84, 0]}
    ]
    # Squash & stretch scale
    scale_kf = [
        {"t": 0, "s": [100, 92, 100], "e": [92, 108, 100], "i": {"x": 0.4, "y": 1}, "o": {"x": 0.2, "y": 0}},
        {"t": 30, "s": [92, 108, 100], "e": [100, 92, 100], "i": {"x": 0.4, "y": 1}, "o": {"x": 0.2, "y": 0}},
        {"t": 60, "s": [100, 92, 100]}
    ]
    # Rotation wobble (cheering left and right)
    rot_kf = [
        {"t": 0, "s": [-6], "e": [6], "i": {"x": 0.5, "y": 1}, "o": {"x": 0.5, "y": 0}},
        {"t": 30, "s": [6], "e": [-6], "i": {"x": 0.5, "y": 1}, "o": {"x": 0.5, "y": 0}},
        {"t": 60, "s": [-6]}
    ]

    layers = []

    # Layer 0: Radiating golden starbursts (behind astronaut)
    for star_idx in range(6):
        angle = (star_idx / 6.0) * math.pi * 2
        dist_start = 25
        dist_end = 65
        sx = 80 + math.cos(angle) * dist_start
        sy = 80 + math.sin(angle) * dist_start
        ex = 80 + math.cos(angle) * dist_end
        ey = 80 + math.sin(angle) * dist_end
        
        star_pos = [
            {"t": 0, "s": [sx, sy, 0], "e": [ex, ey, 0]},
            {"t": 45, "s": [ex, ey, 0], "e": [sx, sy, 0]},
            {"t": 60, "s": [sx, sy, 0]}
        ]
        star_scale = [
            {"t": 0, "s": [0, 0, 100], "e": [130, 130, 100]},
            {"t": 35, "s": [130, 130, 100], "e": [0, 0, 100]},
            {"t": 60, "s": [0, 0, 100]}
        ]

        layers.append({
            "ddd": 0, "ind": star_idx + 1, "ty": 4, "nm": f"Sparkle {star_idx}",
            "sr": 1, "st": 0, "op": 60, "ip": 0,
            "ks": {
                "o": kf(90), "r": kf(star_idx * 60),
                "p": animated_p(star_pos), "a": kf([0, 0, 0]),
                "s": animated_s(star_scale)
            },
            "shapes": [
                {
                    "ty": "gr", "nm": "Star",
                    "it": [
                        {"ty": "el", "nm": "Circle", "p": kf([0, 0]), "s": kf([12, 12])},
                        {"ty": "fl", "nm": "Fill", "c": kf([1.0, 0.82, 0.2, 1]), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                }
            ]
        })

    # Layer 1: Astronaut Body & Helmet
    layers.append({
        "ddd": 0, "ind": 10, "ty": 4, "nm": "Astronaut Ayaan",
        "sr": 1, "st": 0, "op": 60, "ip": 0,
        "ks": {
            "o": kf(100),
            "r": animated_r(rot_kf),
            "p": animated_p(pos_kf),
            "a": kf([0, 0, 0]),
            "s": animated_s(scale_kf)
        },
        "shapes": [
            # Spacesuit Collar / Shoulders
            {
                "ty": "gr", "nm": "Suit Shoulders",
                "it": [
                    {"ty": "rc", "nm": "Shoulders", "p": kf([0, 22]), "s": kf([52, 26]), "r": kf(10)},
                    {"ty": "fl", "nm": "White Suit", "c": kf([0.94, 0.96, 0.98, 1]), "o": kf(100)},
                    {"ty": "st", "nm": "Outline", "c": kf([0.58, 0.64, 0.72, 1]), "w": kf(3), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Gold Mission Collar Strip
            {
                "ty": "gr", "nm": "Gold Trim",
                "it": [
                    {"ty": "rc", "nm": "Trim", "p": kf([0, 14]), "s": kf([34, 6]), "r": kf(3)},
                    {"ty": "fl", "nm": "Gold Fill", "c": kf([1.0, 0.82, 0.2, 1]), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Helmet Outer Shell
            {
                "ty": "gr", "nm": "Helmet Shell",
                "it": [
                    {"ty": "el", "nm": "Helmet", "p": kf([0, -10]), "s": kf([64, 64])},
                    {"ty": "fl", "nm": "Suit White", "c": kf([1.0, 1.0, 1.0, 1]), "o": kf(100)},
                    {"ty": "st", "nm": "Suit Border", "c": kf([0.58, 0.64, 0.72, 1]), "w": kf(3), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Gold Visor Trim
            {
                "ty": "gr", "nm": "Visor Ring",
                "it": [
                    {"ty": "el", "nm": "Ring", "p": kf([0, -10]), "s": kf([54, 54])},
                    {"ty": "st", "nm": "Gold Rim", "c": kf([1.0, 0.82, 0.2, 1]), "w": kf(3.5), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Visor Dark Cosmic Glass
            {
                "ty": "gr", "nm": "Visor Glass",
                "it": [
                    {"ty": "el", "nm": "Glass", "p": kf([0, -10]), "s": kf([48, 48])},
                    {"ty": "fl", "nm": "Dark Blue Glass", "c": kf([0.06, 0.09, 0.16, 1]), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Ayaan Face Inside Helmet
            {
                "ty": "gr", "nm": "Ayaan Face",
                "it": [
                    {"ty": "el", "nm": "Face", "p": kf([0, -10]), "s": kf([34, 34])},
                    {"ty": "fl", "nm": "Skin Tone", "c": kf([1.0, 0.82, 0.65, 1]), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Cute Happy Eyes
            {
                "ty": "gr", "nm": "Happy Eyes",
                "it": [
                    {"ty": "el", "nm": "Left Eye", "p": kf([-7, -11]), "s": kf([5.5, 7])},
                    {"ty": "el", "nm": "Right Eye", "p": kf([7, -11]), "s": kf([5.5, 7])},
                    {"ty": "fl", "nm": "Eye Color", "c": kf([0.1, 0.08, 0.06, 1]), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Rosy Cheeks
            {
                "ty": "gr", "nm": "Rosy Cheeks",
                "it": [
                    {"ty": "el", "nm": "Left Cheek", "p": kf([-11, -5]), "s": kf([5, 3.5])},
                    {"ty": "el", "nm": "Right Cheek", "p": kf([11, -5]), "s": kf([5, 3.5])},
                    {"ty": "fl", "nm": "Cheek Pink", "c": kf([1.0, 0.46, 0.58, 1]), "o": kf(80)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Joyful Smile Mouth
            {
                "ty": "gr", "nm": "Open Smile",
                "it": [
                    {"ty": "el", "nm": "Smile Mouth", "p": kf([0, -4]), "s": kf([10, 6])},
                    {"ty": "fl", "nm": "Smile Fill", "c": kf([0.75, 0.15, 0.83, 1]), "o": kf(100)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                ]
            },
            # Visor Light Glare Reflection
            {
                "ty": "gr", "nm": "Visor Glare",
                "it": [
                    {"ty": "el", "nm": "Glare", "p": kf([-12, -22]), "s": kf([14, 7])},
                    {"ty": "fl", "nm": "Glare White", "c": kf([1.0, 1.0, 1.0, 1]), "o": kf(55)},
                    {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(-25), "o": kf(100)}
                ]
            }
        ]
    })

    return {
        "v": "5.5.7", "fr": 60, "ip": 0, "op": frames,
        "w": 160, "h": 160, "nm": "Astronaut Celebrate",
        "ddd": 0, "assets": [], "layers": layers
    }

# ==============================================================================
# 2. Rocket Blastoff Animation (Exhaust Smoke, Flame & Ascent)
# ==============================================================================
def create_rocket_launch():
    frames = 60
    # Rocket zooming up from bottom to top
    rocket_pos = [
        {"t": 0, "s": [80, 160, 0], "e": [80, 70, 0], "i": {"x": 0.2, "y": 1}, "o": {"x": 0.4, "y": 0}},
        {"t": 25, "s": [80, 70, 0], "e": [80, 65, 0]},
        {"t": 45, "s": [80, 65, 0], "e": [80, -80, 0], "i": {"x": 0.1, "y": 1}, "o": {"x": 0.8, "y": 0}},
        {"t": 60, "s": [80, -80, 0]}
    ]
    # Flame flickering scale
    flame_scale = [
        {"t": 0, "s": [100, 70, 100], "e": [100, 140, 100]},
        {"t": 15, "s": [100, 140, 100], "e": [100, 85, 100]},
        {"t": 30, "s": [100, 85, 100], "e": [100, 150, 100]},
        {"t": 45, "s": [100, 150, 100], "e": [100, 95, 100]},
        {"t": 60, "s": [100, 95, 100]}
    ]

    layers = [
        # Rocket Ship Layer
        {
            "ddd": 0, "ind": 1, "ty": 4, "nm": "Rocket Ship",
            "sr": 1, "st": 0, "op": 60, "ip": 0,
            "ks": {
                "o": kf(100), "r": kf(0),
                "p": animated_p(rocket_pos), "a": kf([0, 0, 0]),
                "s": kf([100, 100, 100])
            },
            "shapes": [
                # Exhaust Flame
                {
                    "ty": "gr", "nm": "Exhaust Flame",
                    "it": [
                        {"ty": "el", "nm": "Outer Fire", "p": kf([0, 36]), "s": kf([18, 36])},
                        {"ty": "fl", "nm": "Fire Red", "c": kf([1.0, 0.27, 0.0, 1]), "o": kf(90)},
                        {"ty": "el", "nm": "Inner Fire", "p": kf([0, 32]), "s": kf([10, 22])},
                        {"ty": "fl", "nm": "Fire Yellow", "c": kf([1.0, 0.82, 0.2, 1]), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": animated_s(flame_scale), "r": kf(0), "o": kf(100)}
                    ]
                },
                # Rocket Fins
                {
                    "ty": "gr", "nm": "Fins",
                    "it": [
                        {"ty": "rc", "nm": "Left Fin", "p": kf([-18, 16]), "s": kf([14, 20]), "r": kf(4)},
                        {"ty": "rc", "nm": "Right Fin", "p": kf([18, 16]), "s": kf([14, 20]), "r": kf(4)},
                        {"ty": "fl", "nm": "Fin Blue", "c": kf([0.22, 0.74, 0.97, 1]), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                },
                # Fuselage
                {
                    "ty": "gr", "nm": "Fuselage",
                    "it": [
                        {"ty": "el", "nm": "Nosecone", "p": kf([0, -18]), "s": kf([28, 48])},
                        {"ty": "rc", "nm": "Body", "p": kf([0, 6]), "s": kf([28, 34]), "r": kf(6)},
                        {"ty": "fl", "nm": "Fuselage Ruby", "c": kf([1.0, 0.16, 0.52, 1]), "o": kf(100)},
                        {"ty": "st", "nm": "Fuselage Outline", "c": kf([0.59, 0.0, 0.24, 1]), "w": kf(2.5), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                },
                # Porthole Window
                {
                    "ty": "gr", "nm": "Porthole",
                    "it": [
                        {"ty": "el", "nm": "Window Frame", "p": kf([0, -4]), "s": kf([16, 16])},
                        {"ty": "fl", "nm": "Gold Frame", "c": kf([1.0, 0.82, 0.2, 1]), "o": kf(100)},
                        {"ty": "el", "nm": "Window Glass", "p": kf([0, -4]), "s": kf([11, 11])},
                        {"ty": "fl", "nm": "Glass Cyan", "c": kf([0.22, 0.74, 0.97, 1]), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                }
            ]
        }
    ]

    return {
        "v": "5.5.7", "fr": 60, "ip": 0, "op": frames,
        "w": 160, "h": 160, "nm": "Rocket Blastoff",
        "ddd": 0, "assets": [], "layers": layers
    }

# ==============================================================================
# 3. Trophy Unlock Fanfare (Rotating Starburst & Golden Crown)
# ==============================================================================
def create_trophy_unlock():
    frames = 60
    trophy_scale = [
        {"t": 0, "s": [0, 0, 100], "e": [125, 125, 100], "i": {"x": 0.34, "y": 1.56}, "o": {"x": 0.64, "y": 1}},
        {"t": 25, "s": [125, 125, 100], "e": [100, 100, 100]},
        {"t": 40, "s": [100, 100, 100], "e": [108, 108, 100]},
        {"t": 50, "s": [108, 108, 100], "e": [100, 100, 100]},
        {"t": 60, "s": [100, 100, 100]}
    ]
    sunburst_rot = [
        {"t": 0, "s": [0], "e": [180]},
        {"t": 60, "s": [180]}
    ]

    layers = [
        # Rotating Sunburst Rays
        {
            "ddd": 0, "ind": 1, "ty": 4, "nm": "Sunburst",
            "sr": 1, "st": 0, "op": 60, "ip": 0,
            "ks": {
                "o": kf(45),
                "r": animated_r(sunburst_rot),
                "p": kf([80, 80, 0]),
                "a": kf([0, 0, 0]),
                "s": kf([100, 100, 100])
            },
            "shapes": [
                {
                    "ty": "gr", "nm": "Rays",
                    "it": [
                        {"ty": "rc", "nm": "Ray 1", "p": kf([0, 0]), "s": kf([8, 120]), "r": kf(4)},
                        {"ty": "rc", "nm": "Ray 2", "p": kf([0, 0]), "s": kf([120, 8]), "r": kf(4)},
                        {"ty": "rc", "nm": "Ray 3", "p": kf([0, 0]), "s": kf([8, 120]), "r": kf(4)},
                        {"ty": "fl", "nm": "Gold Ray", "c": kf([1.0, 0.82, 0.2, 1]), "o": kf(60)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(45), "o": kf(100)}
                    ]
                }
            ]
        },
        # Golden Trophy Medallion
        {
            "ddd": 0, "ind": 2, "ty": 4, "nm": "Trophy Medallion",
            "sr": 1, "st": 0, "op": 60, "ip": 0,
            "ks": {
                "o": kf(100), "r": kf(0),
                "p": kf([80, 80, 0]), "a": kf([0, 0, 0]),
                "s": animated_s(trophy_scale)
            },
            "shapes": [
                # Outer Gold Disk
                {
                    "ty": "gr", "nm": "Outer Disk",
                    "it": [
                        {"ty": "el", "nm": "Disk", "p": kf([0, 0]), "s": kf([88, 88])},
                        {"ty": "fl", "nm": "Gold", "c": kf([1.0, 0.82, 0.2, 1]), "o": kf(100)},
                        {"ty": "st", "nm": "Border", "c": kf([0.7, 0.4, 0.05, 1]), "w": kf(3.5), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                },
                # Inner Purple Core
                {
                    "ty": "gr", "nm": "Core",
                    "it": [
                        {"ty": "el", "nm": "Core Circle", "p": kf([0, 0]), "s": kf([70, 70])},
                        {"ty": "fl", "nm": "Deep Purple", "c": kf([0.16, 0.12, 0.4, 1]), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                },
                # Crown / Star Symbol
                {
                    "ty": "gr", "nm": "Symbol",
                    "it": [
                        {"ty": "el", "nm": "Gem", "p": kf([0, 0]), "s": kf([34, 34])},
                        {"ty": "fl", "nm": "Crown Gold", "c": kf([1.0, 0.88, 0.35, 1]), "o": kf(100)},
                        {"ty": "tr", "p": kf([0, 0]), "a": kf([0, 0]), "s": kf([100, 100]), "r": kf(0), "o": kf(100)}
                    ]
                }
            ]
        }
    ]

    return {
        "v": "5.5.7", "fr": 60, "ip": 0, "op": frames,
        "w": 160, "h": 160, "nm": "Trophy Unlock",
        "ddd": 0, "assets": [], "layers": layers
    }

# Write files
with open("www/assets/lottie/lottie_astronaut_celebrate.json", "w") as f:
    json.dump(create_astronaut_celebrate(), f, indent=2)
print("Generated: lottie_astronaut_celebrate.json")

with open("www/assets/lottie/lottie_rocket_launch.json", "w") as f:
    json.dump(create_rocket_launch(), f, indent=2)
print("Generated: lottie_rocket_launch.json")

with open("www/assets/lottie/lottie_trophy_unlock.json", "w") as f:
    json.dump(create_trophy_unlock(), f, indent=2)
print("Generated: lottie_trophy_unlock.json")
