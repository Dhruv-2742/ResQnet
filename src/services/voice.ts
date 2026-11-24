// Voice Service: Supports ElevenLabs API or Web Speech API fallback for audio briefings

export interface VoicePlaybackState {
  isPlaying: boolean;
  voiceName: string;
  source: 'elevenlabs' | 'web_speech' | 'none';
}

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioEl: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): VoicePlaybackState {
    this.stop();

    // Strip markdown formatting symbols for spoken clarity
    const cleanText = text
      .replace(/[*#_`~>\[\]\(\)]/g, ' ')
      .replace(/https?:\/\/\S+/g, 'link provided')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      return { isPlaying: false, voiceName: 'None', source: 'none' };
    }

    if (this.synth) {
      this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance.rate = 1.0;
      this.currentUtterance.pitch = 1.0;
      this.currentUtterance.lang = 'en-US';

      // Pick natural sounding voice if available
      const voices = this.synth.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David'))
      );
      if (preferred) {
        this.currentUtterance.voice = preferred;
      }

      this.currentUtterance.onstart = () => {
        onStart?.();
      };
      this.currentUtterance.onend = () => {
        onEnd?.();
      };
      this.currentUtterance.onerror = (e) => {
        onError?.(e);
      };

      this.synth.speak(this.currentUtterance);
      return {
        isPlaying: true,
        voiceName: this.currentUtterance.voice?.name || 'Standard Assistant',
        source: 'web_speech',
      };
    }

    return { isPlaying: false, voiceName: 'Unavailable', source: 'none' };
  }

  public stop(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 0;
      this.audioEl = null;
    }
  }

  public isSpeaking(): boolean {
    return !!(this.synth?.speaking || (this.audioEl && !this.audioEl.paused));
  }
}

export const voiceService = new VoiceService();
