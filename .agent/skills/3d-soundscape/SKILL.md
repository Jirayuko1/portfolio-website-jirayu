---
name: 3d-soundscape
description: "Guidelines and architecture for designing, synthesizing, and optimizing Web Audio API soundscapes for interactive 3D and WebGL websites. Use when adding tactile sound effects, micro-audio feedback, spatial audio, or ambient sound without heavy audio files."
---

# 3D Soundscape: Tactile Audio for WebGL & Interactive Web

This skill provides patterns for zero-latency, zero-bundle-overhead audio in interactive 3D websites.

## Core Philosophy
1. **Polite by Default:** Sound should never blast unexpectedly. Provide an accessible Mute/Unmute toggle, remember user choice in `localStorage`, and respect system autoplay policies by resuming `AudioContext` only on the first user interaction.
2. **Tactile Synthesis over MP3s:** Use procedural audio synthesis via `OscillatorNode`, `GainNode`, and `BiquadFilterNode` for UI feedback. Procedural sounds load in 0ms, require 0KB asset downloads, and can be pitched dynamically.
3. **Micro-feedback Hierarchy:**
   - **Hover:** Extremely subtle, high-frequency blip (<40ms, gain <0.02) to signify interactive 3D raycast targets.
   - **Click / Tap:** Crisp triangular/square downward pitch envelope simulating tactile switches or typewriter keys.
   - **Physical Objects:**
     - *Rotary Phone:* Dual-tone multi-frequency (DTMF) bell ring.
     - *Books & Wooden Shelves:* Low-frequency sine resonance with exponential decay.
     - *Paper / Post-its / Posters:* Bandpass-filtered white noise burst mimicking parchment rustle.
     - *Cat / Living Companions:* Modulated frequency curve simulating soft meows or purrs.

## Integration in Next.js & Three.js
- Keep audio logic isolated in `@/lib/soundEffects.ts`.
- In Three.js click handlers or raycasters, trigger `sound.playObjectSound(meshId)` only once per click event.
- Ensure audio context is suspended when the tab loses focus or when a modal overlay demands quiet focus.
