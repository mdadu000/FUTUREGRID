import { useEffect, useRef } from "react";

const CLASS_COLORS = [
  "#ff5a6e", "#ff7a5a", "#ffa15a", // red tones
  "#ffd35a", "#ffec5a", "#d4ff5a", // yellow
  "#5affb6", "#5ad4ff", "#a98aff", // green/blue/violet (rich)
];

export function IslandMap() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    type Agent = { x: number; y: number; vx: number; vy: number; c: string; zone: "city" | "village" };
    let agents: Agent[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      agents = [];
      // city = left half, 300 agents
      for (let i = 0; i < 300; i++) {
        agents.push({
          x: Math.random() * (w * 0.46) + w * 0.02,
          y: Math.random() * (h * 0.86) + h * 0.07,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          c: CLASS_COLORS[Math.floor(Math.random() * 9)],
          zone: "city",
        });
      }
      // village = right half, 200 agents
      for (let i = 0; i < 200; i++) {
        agents.push({
          x: Math.random() * (w * 0.46) + w * 0.52,
          y: Math.random() * (h * 0.86) + h * 0.07,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          c: CLASS_COLORS[Math.floor(Math.random() * 9)],
          zone: "village",
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const drawBg = () => {
      // city zone
      const g1 = ctx.createLinearGradient(0, 0, w * 0.5, h);
      g1.addColorStop(0, "rgba(80,120,255,0.10)");
      g1.addColorStop(1, "rgba(140,90,255,0.06)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w * 0.5, h);
      // village zone
      const g2 = ctx.createLinearGradient(w * 0.5, 0, w, h);
      g2.addColorStop(0, "rgba(80,220,180,0.06)");
      g2.addColorStop(1, "rgba(255,200,90,0.06)");
      ctx.fillStyle = g2;
      ctx.fillRect(w * 0.5, 0, w * 0.5, h);
      // divider
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(w * 0.5, 0);
      ctx.lineTo(w * 0.5, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      drawBg();
      for (const a of agents) {
        a.x += a.vx; a.y += a.vy;
        const minX = a.zone === "city" ? w * 0.02 : w * 0.52;
        const maxX = a.zone === "city" ? w * 0.48 : w * 0.98;
        if (a.x < minX || a.x > maxX) a.vx *= -1;
        if (a.y < h * 0.05 || a.y > h * 0.95) a.vy *= -1;

        ctx.fillStyle = a.c;
        ctx.shadowColor = a.c;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden glass-strong shadow-glow">
      <canvas ref={ref} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass text-xs font-medium tracking-wider uppercase">
        <span className="text-cyan">●</span> City · 300 Agents
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass text-xs font-medium tracking-wider uppercase">
        <span className="text-success">●</span> Village · 200 Agents
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full glass text-[11px] tracking-widest uppercase text-muted-foreground">
        Live Simulation · Real-time Decisions
      </div>
    </div>
  );
}
