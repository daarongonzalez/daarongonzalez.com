import { useEffect, useRef } from "react";

const SPACING = 22;
const DOT_RADIUS = 1.6;
const MOUSE_RADIUS = 70;
const STRENGTH = 14;
const SPRING = 0.06;
const DAMPING = 0.82;
const DOT_COLOR = "#B2B2B2";
const ACCENT_COLOR = "#FDB515";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  accent: boolean;
}

export default function DotGrid() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let frame = 0;

    function buildGrid() {
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SPACING;
          const y = row * SPACING;
          dots.push({
            baseX: x,
            baseY: y,
            x,
            y,
            vx: 0,
            vy: 0,
            accent: Math.random() < 0.05,
          });
        }
      }
    }

    function resize() {
      const rect = wrap!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      buildGrid();
    }

    function step() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const dot of dots) {
        const dx = mouse.x - (dot.baseX + (dot.x - dot.baseX));
        const dy = mouse.y - (dot.baseY + (dot.y - dot.baseY));
        const dist = Math.sqrt(dx * dx + dy * dy);

        let fx = (dot.baseX - dot.x) * SPRING;
        let fy = (dot.baseY - dot.y) * SPRING;

        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const force = (1 - dist / MOUSE_RADIUS) ** 2 * STRENGTH;
          fx -= (dx / dist) * force;
          fy -= (dy / dist) * force;
        }

        dot.vx = (dot.vx + fx) * DAMPING;
        dot.vy = (dot.vy + fy) * DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx!.beginPath();
        ctx!.fillStyle = dot.accent ? ACCENT_COLOR : DOT_COLOR;
        ctx!.arc(dot.x * dpr, dot.y * dpr, DOT_RADIUS * dpr, 0, Math.PI * 2);
        ctx!.fill();
      }
      frame = requestAnimationFrame(step);
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handlePointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);
    resize();
    frame = requestAnimationFrame(step);

    wrap.addEventListener("pointermove", handlePointerMove);
    wrap.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      wrap.removeEventListener("pointermove", handlePointerMove);
      wrap.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="h-full min-h-[220px] w-full overflow-hidden rounded-2xl bg-brand-lightest">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
