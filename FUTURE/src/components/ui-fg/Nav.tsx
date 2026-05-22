import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#how", label: "How" },
  { href: "#classes", label: "Classes" },
  { href: "#agents", label: "Agents" },
  { href: "#demo", label: "Demo" },
  { href: "#tech", label: "Tech" },
  { href: "#team", label: "Team" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 transition-all duration-500 ${
          scrolled ? "scale-[0.98]" : "scale-100"
        }`}
      >
        <div className={`flex items-center justify-between rounded-2xl px-5 py-3 ${scrolled ? "glass-strong" : ""}`}>
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-primary shadow-glow flex items-center justify-center">
              <div className="absolute inset-1 rounded-md bg-background/40 backdrop-blur" />
              <span className="relative font-display font-bold text-sm">F</span>
            </div>
            <span className="font-display font-semibold tracking-tight">
              FUTURE <span className="text-gradient-primary">GRID</span>
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
