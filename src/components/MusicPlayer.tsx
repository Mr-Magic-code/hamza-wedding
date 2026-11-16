"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/config/wedding";

const BPM = 100;
const STEP = 60 / BPM / 4;

type Bar = {
  root: number;
  notes: number[];
  melody: number[];
};

const PROGRESSION: Bar[] = [
  { root: 130.81, notes: [261.63, 329.63, 392.0], melody: [783.99, 659.25] },
  { root: 98.0, notes: [246.94, 293.66, 392.0], melody: [880.0, 783.99] },
  { root: 110.0, notes: [220.0, 261.63, 329.63], melody: [659.25, 880.0] },
  { root: 87.31, notes: [174.61, 220.0, 261.63], melody: [587.33, 659.25] },
];

const ARPEGGIO = [0, 1, 2, 1, 2, 0, 1, 2];

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

function createNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(
    1,
    Math.floor(context.sampleRate * 0.4),
    context.sampleRate,
  );
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) {
    data[index] = Math.random() * 2 - 1;
  }
  return buffer;
}

function playPad(
  context: AudioContext,
  output: GainNode,
  notes: number[],
  time: number,
) {
  const duration = STEP * 16;
  notes.forEach((frequency) => {
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency / 2;
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.045, time + 0.7);
    gain.gain.linearRampToValueAtTime(0.0001, time + duration);
    osc.connect(gain);
    gain.connect(output);
    osc.start(time);
    osc.stop(time + duration + 0.1);
  });
}

function playPluck(
  context: AudioContext,
  output: GainNode,
  frequency: number,
  time: number,
) {
  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  osc.type = "triangle";
  osc.frequency.value = frequency;
  filter.type = "lowpass";
  filter.frequency.value = 3200;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.075, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.48);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(output);
  osc.start(time);
  osc.stop(time + 0.5);
}

function playBass(
  context: AudioContext,
  output: GainNode,
  frequency: number,
  time: number,
) {
  const osc = context.createOscillator();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  osc.type = "triangle";
  osc.frequency.value = frequency;
  filter.type = "lowpass";
  filter.frequency.value = 520;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.13, time + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.36);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(output);
  osc.start(time);
  osc.stop(time + 0.4);
}

function playBell(
  context: AudioContext,
  output: GainNode,
  frequency: number,
  time: number,
) {
  const osc = context.createOscillator();
  const shimmer = context.createOscillator();
  const gain = context.createGain();

  osc.type = "sine";
  osc.frequency.value = frequency;
  shimmer.type = "sine";
  shimmer.frequency.value = frequency * 2.004;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.045, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.5);

  osc.connect(gain);
  shimmer.connect(gain);
  gain.connect(output);
  osc.start(time);
  shimmer.start(time);
  osc.stop(time + 1.6);
  shimmer.stop(time + 1.6);
}

function playKick(context: AudioContext, output: GainNode, time: number) {
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(155, time);
  osc.frequency.exponentialRampToValueAtTime(45, time + 0.13);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.2, time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

  osc.connect(gain);
  gain.connect(output);
  osc.start(time);
  osc.stop(time + 0.3);
}

function playShaker(
  context: AudioContext,
  output: GainNode,
  noise: AudioBuffer,
  time: number,
  volume: number,
) {
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = noise;
  filter.type = "highpass";
  filter.frequency.value = 7200;

  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(output);
  source.start(time);
  source.stop(time + 0.08);
}

function playClap(
  context: AudioContext,
  output: GainNode,
  noise: AudioBuffer,
  time: number,
) {
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = noise;
  filter.type = "bandpass";
  filter.frequency.value = 1700;
  filter.Q.value = 1.1;

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.05, time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(output);
  source.start(time);
  source.stop(time + 0.14);
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const stopAmbient = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const context = ctxRef.current;
    if (context) {
      void context.close();
      ctxRef.current = null;
    }
  }, []);

  const startAmbient = useCallback(async () => {
    const AudioCtor =
      window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioCtor) {
      setUnavailable(true);
      return false;
    }

    const context = new AudioCtor();
    await context.resume();

    const master = context.createGain();
    master.gain.value = 0.16;
    master.connect(context.destination);
    ctxRef.current = context;

    const noise = createNoiseBuffer(context);
    let stepIndex = 0;
    let nextTime = context.currentTime + 0.15;

    const scheduleStep = (step: number, time: number) => {
      const bar = PROGRESSION[Math.floor(step / 16) % PROGRESSION.length];
      const beat = step % 16;

      if (beat === 0) playPad(context, master, bar.notes, time);
      if (beat === 0 || beat === 6 || beat === 8 || beat === 14) {
        playBass(context, master, bar.root, time);
      }

      if (beat % 2 === 0) {
        const note = bar.notes[ARPEGGIO[(beat / 2) % ARPEGGIO.length]] * 2;
        playPluck(context, master, note, time);
        playShaker(context, master, noise, time, beat % 4 === 0 ? 0.02 : 0.012);
      }

      if (beat === 0) playBell(context, master, bar.melody[0], time);
      if (beat === 10) playBell(context, master, bar.melody[1], time);

      if (beat === 0 || beat === 8) playKick(context, master, time);
      if (beat === 4 || beat === 12) playClap(context, master, noise, time);
    };

    const scheduler = () => {
      const audioContext = ctxRef.current;
      if (!audioContext) return;

      if (nextTime < audioContext.currentTime - 0.5) {
        nextTime = audioContext.currentTime + 0.1;
      }

      while (nextTime < audioContext.currentTime + 0.25) {
        scheduleStep(stepIndex % 64, nextTime);
        nextTime += STEP;
        stepIndex += 1;
      }
    };

    scheduler();
    intervalRef.current = window.setInterval(scheduler, 50);
    return true;
  }, []);

  const start = useCallback(async () => {
    if (playing) return;

    if (wedding.music.src && audioRef.current) {
      try {
        audioRef.current.volume = 0.55;
        await audioRef.current.play();
        setPlaying(true);
        return;
      } catch {
        // Fall through to the generated celebration track.
      }
    }

    const started = await startAmbient();
    if (started) setPlaying(true);
  }, [playing, startAmbient]);

  const stop = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    stopAmbient();
    setPlaying(false);
  }, [stopAmbient]);

  useEffect(() => {
    const handleOpen = () => {
      void start();
    };
    window.addEventListener("wedding:open", handleOpen);
    return () => window.removeEventListener("wedding:open", handleOpen);
  }, [start]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      stopAmbient();
      audio?.pause();
    };
  }, [stopAmbient]);

  return (
    <>
      {wedding.music.src ? (
        <audio ref={audioRef} src={wedding.music.src} loop preload="none" />
      ) : null}

      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        <span className="hidden rounded-full border border-line bg-surface/80 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.22em] text-muted backdrop-blur sm:block">
          {wedding.music.title}
        </span>
        <button
          type="button"
          onClick={() => (playing ? stop() : void start())}
          disabled={unavailable}
          aria-pressed={playing}
          aria-label={playing ? "Pause background music" : "Play background music"}
          title={playing ? "Pause music" : "Play music"}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-surface/85 text-accent shadow-[0_18px_40px_-18px_var(--shadow)] backdrop-blur transition hover:border-accent hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40"
        >
          {playing ? (
            <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
              <span className="eq-bar h-5 w-[3px] rounded-full bg-current" />
              <span
                className="eq-bar h-5 w-[3px] rounded-full bg-current"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="eq-bar h-5 w-[3px] rounded-full bg-current"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="eq-bar h-5 w-[3px] rounded-full bg-current"
                style={{ animationDelay: "0.45s" }}
              />
            </span>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V6l10-2v12" />
              <circle cx="6.5" cy="18" r="2.5" />
              <circle cx="16.5" cy="16" r="2.5" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
