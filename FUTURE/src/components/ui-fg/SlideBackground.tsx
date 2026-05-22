import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- Math & 3D Utilities ---
const R = (a: number, b: number) => a + Math.random() * (b - a);
const gl = (ctx: CanvasRenderingContext2D, c: string, b = 20) => { ctx.shadowColor = c; ctx.shadowBlur = b; };
const ng = (ctx: CanvasRenderingContext2D) => { ctx.shadowBlur = 0; };

const proj = (x: number, y: number, z: number, cx: number, cy: number, fov = 800) => {
  const s = fov / Math.max(1, fov + z);
  return { sx: cx + x * s, sy: cy + y * s, s };
};
const rx = (y: number, z: number, a: number) => ({ y: y * Math.cos(a) - z * Math.sin(a), z: y * Math.sin(a) + z * Math.cos(a) });
const ry = (x: number, z: number, a: number) => ({ x: x * Math.cos(a) - z * Math.sin(a), z: x * Math.sin(a) + z * Math.cos(a) });

type Draw = (ctx: CanvasRenderingContext2D, W: number, H: number, t: number) => void;
type Init = (W: number, H: number) => Draw;

/* ── 0 Intro: AI Neural Galaxies (Cinematic Depth) ── */
const bg0: Init = (W, H) => {
  const pts = Array.from({ length: 150 }, () => ({
    x: R(-W, W), y: R(-H, H), z: R(-800, 800), p: R(0, 10), s: R(1, 3)
  }));
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W / 2, cy = H / 2;
    pts.forEach(pt => {
      const r = ry(pt.x, pt.z, t * 0.05);
      const pr = proj(r.x, pt.y + Math.sin(t + pt.p) * 50, r.z, cx, cy);
      if (pr.s < 0 || pr.s > 5) return;
      const alpha = Math.min(1, pr.s * 0.8) * (0.5 + 0.5 * Math.sin(t * 2 + pt.p));
      ctx.fillStyle = `rgba(0, 200, 255, ${alpha})`;
      ctx.beginPath(); ctx.arc(pr.sx, pr.sy, pt.s * pr.s, 0, Math.PI * 2); ctx.fill();
      if (Math.random() > 0.98) {
        ctx.fillStyle = `rgba(150, 100, 255, ${alpha * 0.5})`;
        ctx.beginPath(); ctx.arc(pr.sx, pr.sy, pt.s * pr.s * 4, 0, Math.PI * 2); ctx.fill();
      }
    });
    for(let i=0; i<80; i++) {
        for(let j=i+1; j<80; j++) {
            const p1 = pts[i], p2 = pts[j];
            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
            if(d < 250) {
                const r1 = ry(p1.x, p1.z, t * 0.05);
                const pr1 = proj(r1.x, p1.y + Math.sin(t + p1.p) * 50, r1.z, cx, cy);
                const r2 = ry(p2.x, p2.z, t * 0.05);
                const pr2 = proj(r2.x, p2.y + Math.sin(t + p2.p) * 50, r2.z, cx, cy);
                const a = (1 - d/250) * 0.4 * Math.min(pr1.s, pr2.s);
                if (a > 0) {
                  ctx.strokeStyle = `rgba(0, 150, 255, ${a})`;
                  ctx.lineWidth = pr1.s * 0.5;
                  ctx.beginPath(); ctx.moveTo(pr1.sx, pr1.sy); ctx.lineTo(pr2.sx, pr2.sy); ctx.stroke();
                }
            }
        }
    }
  };
};

/* ── 1 Problem: Red Data Abyss (Risk & Volatility) ── */
const bg1: Init = (W, H) => {
  const points = Array.from({ length: 120 }, () => ({
    x: R(-W, W), y: R(-H, H), z: R(-500, 1000),
    vx: R(-0.5, 0.5), vy: R(-0.5, 0.5), vz: R(-1, -3),
    size: R(1, 4), 
    pulse: R(0, Math.PI * 2),
    speed: R(1, 3)
  }));
  
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    const cx = W / 2, cy = H / 2;

    // Subtitle grid - slightly "glitchy" red
    ctx.strokeStyle = `rgba(220, 38, 38, 0.05)`;
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      const z = i * 200 + (t * 100) % 200;
      const { sx: x1, sy: y1, s: s1 } = proj(-W, H / 2, z, cx, cy);
      const { sx: x2, sy: y2, s: s2 } = proj(W, H / 2, z, cx, cy);
      if (s1 > 0) {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
    }

    points.forEach(p => {
      p.z += p.vz;
      if (p.z < -500) p.z = 1000;
      
      const { sx, sy, s } = proj(p.x, p.y + Math.sin(t * p.speed + p.pulse) * 40, p.z, cx, cy);
      if (s < 0) return;

      const opacity = Math.min(1, s) * (0.3 + 0.7 * Math.sin(t * 2 + p.pulse));
      
      // Outer glow
      ctx.fillStyle = `rgba(220, 38, 38, ${opacity * 0.2})`;
      ctx.beginPath(); ctx.arc(sx, sy, p.size * s * 10, 0, Math.PI * 2); ctx.fill();
      
      // Core point
      ctx.fillStyle = `rgba(255, 100, 100, ${opacity})`;
      ctx.beginPath(); ctx.arc(sx, sy, p.size * s, 0, Math.PI * 2); ctx.fill();

      // "Risk Lines" - connect close points with fragile red lines
      points.slice(0, 15).forEach(p2 => {
        const d = Math.hypot(p.x - p2.x, p.y - p2.y, p.z - p2.z);
        if (d < 300) {
          const { sx: sx2, sy: sy2, s: s2 } = proj(p2.x, p2.y + Math.sin(t * p2.speed + p2.pulse) * 40, p2.z, cx, cy);
          if (s2 > 0) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${(1 - d/300) * 0.2 * opacity})`;
            ctx.lineWidth = 1 * s;
            ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx2, sy2); ctx.stroke();
          }
        }
      });
    });

    // Dark red atmosphere - extremely intense for visibility test
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W);
    grad.addColorStop(0, "rgba(100, 0, 0, 0.1)");
    grad.addColorStop(1, "rgba(150, 0, 0, 0.4)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  };
};

/* ── 2 Objectives: Strategic Scanning Grid ── */
const bg2: Init = (W, H) => {
  const nodes = Array.from({ length: 40 }, () => ({
    x: R(-W/2, W/2), y: R(-H/2, H/2), z: R(0, 1000),
    active: Math.random() > 0.5
  }));
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    const cx = W / 2, cy = H / 2;
    
    // Background scanning lines
    ctx.strokeStyle = `rgba(0, 255, 255, 0.03)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const y = (t * 100 + i * (H / 20)) % H;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    nodes.forEach((n, i) => {
      const z = (n.z - t * 100) % 1000;
      const { sx, sy, s } = proj(n.x, n.y, z < 0 ? z + 1000 : z, cx, cy);
      if (s < 0) return;

      const alpha = Math.min(1, s) * 0.5;
      const col = n.active ? "0, 255, 255" : "150, 50, 255";
      
      // Target crosshair
      ctx.strokeStyle = `rgba(${col}, ${alpha})`;
      ctx.lineWidth = 1;
      const size = 15 * s;
      ctx.beginPath();
      ctx.moveTo(sx - size, sy); ctx.lineTo(sx + size, sy);
      ctx.moveTo(sx, sy - size); ctx.lineTo(sx, sy + size);
      ctx.stroke();

      // Glowing core
      if (n.active) {
        ctx.fillStyle = `rgba(${col}, ${alpha * (0.5 + 0.5 * Math.sin(t * 3 + i))})`;
        ctx.beginPath(); ctx.arc(sx, sy, 3 * s, 0, Math.PI * 2); ctx.fill();
        gl(ctx, `rgba(${col}, 1)`, 15 * s);
        ctx.beginPath(); ctx.arc(sx, sy, 1 * s, 0, Math.PI * 2); ctx.fill();
        ng(ctx);
      }
    });

    // Radar sweep
    const sweepY = (t * 200) % H;
    const sweepGrad = ctx.createLinearGradient(0, sweepY - 50, 0, sweepY);
    sweepGrad.addColorStop(0, "rgba(0, 255, 255, 0)");
    sweepGrad.addColorStop(1, "rgba(0, 255, 255, 0.1)");
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, sweepY - 50, W, 50);
    ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
    ctx.beginPath(); ctx.moveTo(0, sweepY); ctx.lineTo(W, sweepY); ctx.stroke();
  };
};

/* ── 3 How It Works: Neural Data Pipeline (The Flow) ── */
const bg3: Init = (W, H) => {
  const streams = Array.from({length: 40}, () => ({
    y: R(H * 0.1, H * 0.9),
    x: R(-500, W),
    speed: R(2, 6),
    len: R(100, 300),
    col: R(0, 1) > 0.5 ? '0, 255, 255' : '150, 50, 255'
  }));
  const nodes = Array.from({length: 15}, () => ({
    x: R(W * 0.2, W * 0.8),
    y: R(H * 0.2, H * 0.8),
    r: R(10, 30),
    pulse: R(0, Math.PI * 2)
  }));
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    // Draw Nodes
    nodes.forEach(n => {
      const p = Math.sin(t * 2 + n.pulse) * 5;
      const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r + p);
      grad.addColorStop(0, `rgba(255, 255, 255, 0.1)`);
      grad.addColorStop(1, `rgba(0, 255, 255, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r + p, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(0, 255, 255, 0.2)`;
      ctx.lineWidth = 1; ctx.stroke();
    });
    // Draw Streams
    streams.forEach(s => {
      s.x += s.speed;
      if (s.x > W) s.x = -s.len;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y);
      grad.addColorStop(0, `rgba(${s.col}, 0)`);
      grad.addColorStop(0.5, `rgba(${s.col}, 0.4)`);
      grad.addColorStop(1, `rgba(${s.col}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len, s.y); ctx.stroke();
      // Particle head
      ctx.fillStyle = `rgba(${s.col}, 0.8)`;
      ctx.beginPath(); ctx.arc(s.x + s.len, s.y, 2, 0, Math.PI * 2); ctx.fill();
    });
  }
}

/* ── 4 Classes: Minimalist Data Strata (Professional Depth) ── */
const bg4: Init = (W, H) => {
  const points = Array.from({length: 100}, () => ({
    x: R(-W, W), y: R(-H, H), z: R(-400, 400)
  }));
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W/2, cy = H/2;
    points.forEach(p => {
      const r = ry(p.x, p.z, t * 0.01);
      const pr = proj(r.x, p.y, r.z, cx, cy);
      if (pr.s < 0) return;
      const alpha = Math.min(1, pr.s) * 0.15;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 1 * pr.s, 0, Math.PI * 2); ctx.fill();
    });
  }
}

/* ── 5 Agents: Digital Oceans with Glowing Waves ── */
const bg5: Init = (W, H) => {
  const cols = 40, rows = 30;
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    const cx = W/2, cy = H/2 + 50;
    for(let z=0; z<rows; z++) {
      ctx.beginPath();
      for(let x=0; x<cols; x++) {
        const px = (x - cols/2) * 100;
        const pz = z * 80;
        const py = Math.sin(x*0.3 + t*2)*50 + Math.cos(z*0.3 + t*1.5)*50;
        const pr = proj(px, py, pz, cx, cy, 600);
        if (x===0) ctx.moveTo(pr.sx, pr.sy);
        else ctx.lineTo(pr.sx, pr.sy);
      }
      const alpha = Math.max(0, 1 - z/rows);
      ctx.strokeStyle = `rgba(0, 255, 200, ${alpha * 0.6})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

/* ── 6 Demo: Holographic Dashboard Realms ── */
const bg6: Init = (W, H) => {
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W/2, cy = H/2;
    for(let i=1; i<=6; i++) {
      const r = i * 120;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(0, 150, 255, 0.15)`;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      const speed = i%2===0 ? t*i*0.5 : -t*i*0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, speed, speed + Math.PI/1.5);
      ctx.strokeStyle = `rgba(0, 255, 200, 0.9)`;
      ctx.lineWidth = 4;
      gl(ctx, "rgba(0, 255, 200, 1)", 20);
      ctx.stroke();
      ng(ctx);
    }
    ctx.strokeStyle = "rgba(100, 50, 255, 0.1)";
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
    
    for(let j=0; j<20; j++) {
      const dist = (t * 500 + j*100) % Math.max(W,H);
      ctx.fillStyle = "rgba(255, 50, 150, 0.8)";
      ctx.fillRect(cx + dist, cy + 5, 20, 2);
      ctx.fillRect(cx - dist, cy - 7, 20, 2);
    }
  }
}

/* ── 7 Use Cases: Cyber Mountains ── */
const bg7: Init = (W, H) => {
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    const cx = W/2, cy = H/2 + 200;
    const w = 120, h = 120; 
    const speed = t * 150;
    const zOffset = speed % h;
    const maxZ = 20;
    
    const heightMap = (x: number, z: number) => {
      const v = Math.sin(x*0.05)*Math.cos(z*0.05)*200 + Math.sin(x*0.02 + z*0.02)*250;
      return Math.min(0, v + 100); 
    };

    for(let z=maxZ; z>=0; z--) {
      ctx.beginPath();
      for(let x=-15; x<=15; x++) {
        const px = x * w;
        const pz = z * h - zOffset;
        const absZ = pz + speed;
        const py = heightMap(px, absZ);
        const pr = proj(px, py, pz, cx, cy, 700);
        if (x===-15) ctx.moveTo(pr.sx, pr.sy);
        else ctx.lineTo(pr.sx, pr.sy);
      }
      const alpha = Math.max(0, 1 - z/maxZ);
      ctx.strokeStyle = `rgba(150, 50, 255, ${alpha * 0.8})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

/* ── 8 Tech: Luminous Particle Civilizations ── */
const bg8: Init = (W, H) => {
  const particles = Array.from({length: 400}, () => ({
    x: R(-W, W), y: R(-H, H), z: R(0, 1200),
    vx: R(-3, 3), vy: R(-3, 3), vz: R(-3, 3)
  }));
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W/2, cy = H/2;
    particles.forEach(p => {
      p.vx += (-p.x)*0.00005; p.vy += (-p.y)*0.00005; p.vz += (600-p.z)*0.00005;
      p.vx += Math.sin(t*2 + p.y*0.02)*0.2;
      p.vy += Math.cos(t*2 + p.x*0.02)*0.2;
      p.x += p.vx; p.y += p.vy; p.z += p.vz;
      const pr = proj(p.x, p.y, p.z, cx, cy, 800);
      if (pr.s < 0) return;
      ctx.fillStyle = `rgba(0, 200, 255, ${Math.min(1, pr.s*0.8)})`;
      ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 2.5*pr.s, 0, Math.PI*2); ctx.fill();
    });
  }
}

/* ── 9 Impact: Magnetic Landscapes ── */
const bg9: Init = (W, H) => {
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    for(let i=0; i<40; i++) {
      const yOff = Math.sin(t*0.5 + i*0.2)*300;
      ctx.beginPath();
      ctx.moveTo(0, H/2 + yOff);
      ctx.bezierCurveTo(W/3, H/2 - yOff + Math.sin(t*2)*400, 
                        W*0.66, H/2 + yOff - Math.cos(t*1.5)*400, 
                        W, H/2 - yOff);
      ctx.strokeStyle = `rgba(0, 255, 150, ${0.15 + (i%5)/20})`;
      ctx.lineWidth = 2 + (i%4);
      gl(ctx, "rgba(0, 255, 150, 0.5)", 10);
      ctx.stroke();
      ng(ctx);
    }
  }
}

/* ── 10 Team: Orbital Smart Cities ── */
const bg10: Init = (W, H) => {
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W/2, cy = H/2;
    [0.3, 0.6, 0.9, 1.2, 1.5].forEach((scale, idx) => {
      ctx.save(); ctx.translate(cx, cy);
      ctx.rotate(Math.PI/8); 
      ctx.scale(1, 0.25); 
      
      ctx.beginPath();
      ctx.arc(0, 0, 1000 * scale, 0, Math.PI*2);
      ctx.strokeStyle = `rgba(100, 50, 255, 0.3)`;
      ctx.lineWidth = 15;
      ctx.stroke();
      
      const ang = t * (2 - scale);
      const nx = Math.cos(ang) * 1000 * scale;
      const ny = Math.sin(ang) * 1000 * scale;
      
      gl(ctx, "rgba(0, 255, 255, 1)", 40);
      ctx.fillStyle = "rgba(0, 255, 255, 1)";
      ctx.beginPath(); ctx.arc(nx, ny, 15, 0, Math.PI*2); ctx.fill();
      ng(ctx);
      
      ctx.restore();
    });
  }
}

/* ── 11 Finale: Holographic Worlds ── */
const bg11: Init = (W, H) => {
  const nodes: {lat: number, lon: number}[] = [];
  for(let i=0; i<400; i++) {
    nodes.push({lat: Math.acos(R(-1, 1)) - Math.PI/2, lon: R(0, Math.PI*2)});
  }
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "screen";
    const cx = W/2, cy = H/2;
    const r = 350;
    
    nodes.forEach(n => {
      const x = r * Math.cos(n.lat) * Math.cos(n.lon + t*0.8);
      const y = r * Math.sin(n.lat);
      const z = r * Math.cos(n.lat) * Math.sin(n.lon + t*0.8);
      
      const r1 = rx(y, z, Math.PI/6);
      const pr = proj(x, r1.y, r1.z, cx, cy, 800);
      
      if(r1.z > 0) { 
        ctx.fillStyle = `rgba(0, 255, 200, ${pr.s})`;
        gl(ctx, "rgba(0, 255, 200, 1)", 10);
        ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 3*pr.s, 0, Math.PI*2); ctx.fill();
        ng(ctx);
      } else {
        ctx.fillStyle = `rgba(150, 50, 255, ${pr.s*0.2})`;
        ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 1.5*pr.s, 0, Math.PI*2); ctx.fill();
      }
    });
  }
}

/* ── 2 Solution: Minimalist Global Network (Precision & Clarity) ── */
const bgSolution: Init = (W, H) => {
  const dots = Array.from({ length: 200 }, () => ({
    x: R(-W, W), y: R(-H, H), z: R(-500, 500)
  }));
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W / 2, cy = H / 2;
    dots.forEach(p => {
      const r = ry(p.x, p.z, t * 0.02);
      const pr = proj(r.x, p.y, r.z, cx, cy);
      if (pr.s < 0) return;
      const a = Math.min(1, pr.s) * 0.2;
      ctx.fillStyle = `rgba(168, 85, 247, ${a})`;
      ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 1.5 * pr.s, 0, Math.PI * 2); ctx.fill();
    });
    
    // Subtle geometric horizon
    ctx.strokeStyle = "rgba(0, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy + 100); ctx.lineTo(W, cy + 100);
    ctx.stroke();
  };
};

/* ── 5 Use Cases: Global Strategic Network (3D Globe) ── */
const bgUseCases: Init = (W, H) => {
  const points: {x:number, y:number, z:number}[] = [];
  const radius = 280;
  for (let i = 0; i < 500; i++) {
    const phi = Math.acos(-1 + (2 * i) / 500);
    const theta = Math.sqrt(500 * Math.PI) * phi;
    points.push({
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi)
    });
  }
  return (ctx, W, H, t) => {
    ctx.globalCompositeOperation = "lighter";
    const cx = W/2, cy = H/2;
    
    // Draw Globe Connections
    ctx.strokeStyle = "rgba(0, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;
    for(let i=0; i<points.length; i+=10) {
      const p1 = ry(points[i].x, points[i].z, t * 0.1);
      const pr1 = proj(p1.x, points[i].y, p1.z, cx, cy);
      if(pr1.s < 0) continue;
      
      const p2 = ry(points[(i+20)%points.length].x, points[(i+20)%points.length].z, t * 0.1);
      const pr2 = proj(p2.x, points[(i+20)%points.length].y, p2.z, cx, cy);
      if(pr2.s > 0) {
        ctx.beginPath(); ctx.moveTo(pr1.sx, pr1.sy); ctx.lineTo(pr2.sx, pr2.sy); ctx.stroke();
      }
    }

    // Pulsing Strategic Nodes
    points.forEach((p, i) => {
      if(i % 15 !== 0) return;
      const r = ry(p.x, p.z, t * 0.1);
      const pr = proj(r.x, p.y, r.z, cx, cy);
      if(pr.s < 0) return;
      
      const pulse = Math.sin(t * 3 + i) * 0.5 + 0.5;
      const alpha = pr.s * (0.1 + pulse * 0.4);
      ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
      ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 2 * pr.s, 0, Math.PI * 2); ctx.fill();
      
      if(pulse > 0.8) {
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.3})`;
        ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 6 * pr.s * pulse, 0, Math.PI * 2); ctx.stroke();
      }
    });
  }
}

/* ── Minimalist Clean Background (No Dots/Clutter) ── */
const bgMinimal: Init = (W, H) => {
  return (ctx, W, H, t) => {
    // Just a very subtle grain/glow
    ctx.globalCompositeOperation = "screen";
    const cx = W/2, cy = H/2;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W);
    grad.addColorStop(0, "rgba(0, 255, 255, 0.02)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }
}

const BG_INITS: Init[] = [bg1, bg2, bgSolution, bg3, bg4, bgUseCases, bgMinimal, bgMinimal, bgMinimal];

export function SlideBackground({ index }: { index: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let W = 0, H = 0, raf = 0;
    const resize = () => { W = c.width = c.clientWidth; H = c.height = c.clientHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = BG_INITS[index % BG_INITS.length](W, H);
    const start = Date.now();
    const tick = () => { 
      const t = (Date.now() - start) / 1000; 
      
      // Premium dark luxury base background with subtle vignette
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, W);
      g.addColorStop(0, "rgba(5, 8, 15, 1)");
      g.addColorStop(1, "rgba(0, 2, 5, 1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      
      draw(ctx, W, H, t); 
      raf = requestAnimationFrame(tick); 
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [index]);
  
  return (
    <motion.canvas 
      ref={ref} 
      key={index} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full pointer-events-none z-0" 
    />
  );
}
