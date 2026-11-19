// Web Audio API Sound Engine (Zero external audio dependencies)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lofiInterval: NodeJS.Timeout | null = null;
  private isLofiPlaying: boolean = false;
  private rainNode: AudioNode | null = null;
  private isRainPlaying: boolean = false;
  private rainGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_sound_muted");
      this.isMuted = saved === "true";
    }
  }

  private initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_sound_muted", String(this.isMuted));
    }
    if (this.isMuted) {
      if (this.isLofiPlaying) this.stopLofiMusic();
      if (this.isRainPlaying) this.stopRainAmbience();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Soft tactile hover blip
  public playHover() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  }

  // Tactile wood/switch click
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } catch {}
  }

  // Lamp switch click
  public playLampSwitch(isOn: boolean) {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(isOn ? 520 : 380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  // Sparkling snow chime for Christmas Tree
  public playSnowChime() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C Major arpeggio
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
      });
    } catch {}
  }

  // Water bubble splash for feeding fish
  public playFishBubble() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  // Lo-Fi warm ambient synthesizer for speaker
  public toggleLofiMusic(): boolean {
    if (this.isLofiPlaying) {
      this.stopLofiMusic();
      return false;
    } else {
      this.startLofiMusic();
      return true;
    }
  }

  public getIsLofiPlaying(): boolean {
    return this.isLofiPlaying;
  }

  private startLofiMusic() {
    if (this.isMuted) {
      this.toggleMute(); // unmute if user clicks play
    }
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isLofiPlaying = true;

    // Cozy Lo-Fi progression: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
    const chords = [
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [164.81, 196.0, 246.94, 293.66], // Em7
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!this.isLofiPlaying) return;
      const current = chords[chordIdx % chords.length];
      chordIdx++;

      current.forEach((freq) => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(600, ctx.currentTime);

          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.3);
        } catch {}
      });
    };

    playChord();
    this.lofiInterval = setInterval(playChord, 2400);
  }

  public stopLofiMusic() {
    this.isLofiPlaying = false;
    if (this.lofiInterval) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }
  }

  // Paper rustle sound for postcards & notes
  public playPaperRustle() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  // Deep warm laptop/device click
  public playLaptopOpen() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }

  // Tactile Mechanical Keyboard Switch Clack (Thock)
  public playKeyboardClack() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      // Stage 1: Low woody thud (~140Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(140 + Math.random() * 30, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.04);
      gain1.gain.setValueAtTime(0.12, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.04);

      // Stage 2: High crisp switch bottom-out (~2200Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(2200 + Math.random() * 400, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.025);
      gain2.gain.setValueAtTime(0.06, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.025);
    } catch {}
  }

  // Warm Coffee Sip
  public playCoffeeSip() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.18);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      noise.stop(ctx.currentTime + 0.18);

      // Satisfied warm chime
      setTimeout(() => {
        if (this.isMuted || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime);
        g.gain.setValueAtTime(0.04, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
      }, 140);
    } catch {}
  }

  // Rain Ambience Soundscape
  public toggleRainAmbience(): boolean {
    if (this.isRainPlaying) {
      this.stopRainAmbience();
      return false;
    } else {
      this.startRainAmbience();
      return true;
    }
  }

  public getIsRainPlaying(): boolean {
    return this.isRainPlaying;
  }

  private startRainAmbience() {
    if (this.isMuted) this.toggleMute();
    const ctx = this.initCtx();
    if (!ctx) return;

    this.isRainPlaying = true;
    try {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.03;
        b2 = 0.85 * b2 + white * 0.01;
        data[i] = (b0 + b1 + b2) * 0.25;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.065, ctx.currentTime + 1.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      this.rainNode = noise;
      this.rainGain = gain;
    } catch {}
  }

  public stopRainAmbience() {
    this.isRainPlaying = false;
    if (this.rainGain && this.ctx) {
      try {
        this.rainGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          if (this.rainNode) {
            try { (this.rainNode as AudioScheduledSourceNode).stop(); } catch {}
            this.rainNode.disconnect();
            this.rainNode = null;
          }
        }, 500);
      } catch {}
    } else if (this.rainNode) {
      try { (this.rainNode as AudioScheduledSourceNode).stop(); } catch {}
      this.rainNode.disconnect();
      this.rainNode = null;
    }
  }

  // Mini-Game 8-bit Tap & Success Chimes
  public playGameTap() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  public playGameSuccess() {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.2);
      });
    } catch {}
  }

  // TikTok Live Gift sound effects
  public playGiftSound(tier: "rose" | "heart" | "coin" | "rocket") {
    if (this.isMuted) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      if (tier === "rose") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (tier === "heart") {
        const notes = [659.25, 987.77];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);
          gain.gain.setValueAtTime(0.08, now + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.04);
          osc.stop(now + idx * 0.04 + 0.14);
        });
      } else if (tier === "coin") {
        const notes = [987.77, 1318.51];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.1, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.25);
        });
      } else if (tier === "rocket") {
        const chord = [440, 554.37, 659.25, 880, 1108.73];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.09, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.35);
        });
      }
    } catch {}
  }

  // Play contextual sound based on object ID
  public playObjectSound(objectId: string) {
    switch (objectId) {
      case "coffee":
        this.playCoffeeSip();
        break;
      case "keyboard":
        this.playKeyboardClack();
        break;
      case "lamp":
        // handled dynamically with on/off
        break;
      case "tree":
        this.playSnowChime();
        break;
      case "aquarium":
        this.playFishBubble();
        break;
      case "speaker":
        // handled dynamically in toggle
        break;
      case "laptop":
        this.playLaptopOpen();
        break;
      case "green_art":
      case "yellow_vase":
      case "cards_red":
      case "cards_green":
      case "cards_blue":
      case "postit":
        this.playPaperRustle();
        break;
      default:
        this.playClick();
        break;
    }
  }
}

export const sound = new SoundEngine();
