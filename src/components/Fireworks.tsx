"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

type Rocket = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
};

const PALETTE = [
  "#ffc857",
  "#5ed6c0",
  "#ff7b7b",
  "#8f8cf0",
  "#ff9f68",
  "#ffe9b0",
  "#ffffff",
];

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = (values: string[]) => values[Math.floor(Math.random() * values.length)];

export default function Fireworks() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleOpen = () => setActive(true);
    window.addEventListener("wedding:open", handleOpen);
    return () => window.removeEventListener("wedding:open", handleOpen);
  }, []);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let width = 0;
    let height = 0;
    let frame = 0;
    let previous = performance.now();
    let elapsed = 0;
    let nextBurst = 0.15;
    let colorIndex = Math.floor(Math.random() * PALETTE.length);
    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const launch = () => {
      rockets.push({
        x: rand(width * 0.12, width * 0.88),
        y: height + 12,
        vx: rand(-26, 26),
        vy: rand(-height * 0.82, -height * 0.6),
        targetY: rand(height * 0.12, height * 0.46),
        color: PALETTE[colorIndex++ % PALETTE.length],
      });
    };

    const explode = (rocket: Rocket) => {
      const count = width < 640 ? 64 : 104;
      const secondary = pick(PALETTE.filter((color) => color !== rocket.color));
      for (let index = 0; index < count; index += 1) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(45, width < 640 ? 195 : 270);
        const life = rand(0.9, 1.9);
        const roll = Math.random();
        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life,
          maxLife: life,
          size: rand(1.2, 2.7),
          color:
            roll > 0.42 ? rocket.color : roll > 0.12 ? secondary : "#fff8e6",
        });
      }
    };

    const tick = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      elapsed += delta;

      if (elapsed > 18) {
        context.clearRect(0, 0, width, height);
        return;
      }

      context.globalCompositeOperation = "destination-out";
      context.fillStyle = "rgba(0, 0, 0, 0.13)";
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = "source-over";

      if (elapsed >= nextBurst) {
        launch();
        if (elapsed < 3) {
          nextBurst = elapsed + rand(0.35, 0.6);
        } else {
          nextBurst = elapsed + rand(2.8, 4.8);
        }
      }

      for (let index = rockets.length - 1; index >= 0; index -= 1) {
        const rocket = rockets[index];
        const prevX = rocket.x;
        const prevY = rocket.y;
        rocket.x += rocket.vx * delta;
        rocket.y += rocket.vy * delta;

        context.beginPath();
        context.strokeStyle = rocket.color;
        context.globalAlpha = 0.85;
        context.lineWidth = 1.6;
        context.moveTo(prevX, prevY);
        context.lineTo(rocket.x, rocket.y);
        context.stroke();
        context.globalAlpha = 1;

        if (rocket.y <= rocket.targetY || rocket.vy > -40) {
          explode(rocket);
          rockets.splice(index, 1);
        }
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        const drag = Math.pow(0.988, delta * 60);
        particle.vx *= drag;
        particle.vy = particle.vy * drag + 42 * delta;
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.life -= delta;

        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }

        const alpha = Math.max(0, particle.life / particle.maxLife);
        const radius = particle.size * (0.6 + alpha * 0.7);

        context.fillStyle = particle.color;
        context.globalAlpha = alpha * 0.18;
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 2.1, 0, Math.PI * 2);
        context.fill();

        context.globalAlpha = Math.min(1, alpha * 1.15);
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
