import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'adv-hero', label: 'Início' },
  { id: 'headers', label: 'Headers' },
  { id: 'idempotency', label: 'Idempotência' },
  { id: 'auth', label: 'Auth' },
  { id: 'cache', label: 'Cache' },
  { id: 'put-patch', label: 'PUT vs PATCH' },
  { id: 'protocols', label: 'Protocolos' },
];

interface AdvancedNavbarProps {
  activeSection: string;
}

export default function AdvancedNavbar({ activeSection }: AdvancedNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-background/60 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/10'
          : 'py-4 bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono font-bold text-sm tracking-widest text-primary hover:text-primary/80 transition-colors"
        >
          {'<API />'}
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`relative px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-300 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-primary glow-primary" />
                  )}
                </button>
              </li>
            );
          })}
          <li>
            <Link
              to="/"
              className="relative px-3 py-1.5 rounded-md text-xs font-mono text-primary hover:text-primary/80 transition-all duration-300"
            >
              ← Básico
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col gap-1 px-6 pb-4 pt-2 bg-background/80 backdrop-blur-xl border-b border-border/30">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/10 text-primary border-l-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
          <li>
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-mono text-primary hover:bg-primary/10 transition-all duration-300 block"
            >
              ← Básico
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

