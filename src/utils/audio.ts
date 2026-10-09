// Audio and Speech Synthesis Utilities for WonderWorld

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (!enabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function triggerHaptic(pattern: number[] = [25, 40, 25]) {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(pattern);
    } catch {
      // Ignore vibration errors
    }
  }
}

export function playChime(freq = 520, type: OscillatorType = 'sine', duration = 0.35, gainVal = 0.12) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silent fallback
  }
}

export function playSuccessFanfare() {
  if (!soundEnabled) return;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playChime(freq, 'triangle', 0.4, 0.15);
    }, idx * 110);
  });
}

export function playWaterDropSound() {
  if (!soundEnabled) return;
  playChime(850, 'sine', 0.15, 0.18);
  setTimeout(() => {
    playChime(1120, 'sine', 0.2, 0.14);
  }, 70);
}

export function playSunnySound() {
  if (!soundEnabled) return;
  playChime(440, 'triangle', 0.3, 0.12);
  setTimeout(() => playChime(554.37, 'triangle', 0.35, 0.12), 100);
  setTimeout(() => playChime(659.25, 'triangle', 0.4, 0.12), 200);
}

export function playChillSound() {
  if (!soundEnabled) return;
  playChime(987.77, 'sine', 0.25, 0.1);
  setTimeout(() => playChime(880, 'sine', 0.25, 0.08), 80);
  setTimeout(() => playChime(783.99, 'sine', 0.3, 0.08), 160);
}

export function speakPhrase(text: string, onEnd?: () => void) {
  triggerHaptic([30]);
  if (!soundEnabled) return;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.3; // Cheerful friendly Pip mascot pitch
    utterance.rate = 0.96; // Easy for kids to understand
    if (onEnd) {
      utterance.onend = onEnd;
    }
    window.speechSynthesis.speak(utterance);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
