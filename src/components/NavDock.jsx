import { useRef, useCallback, useState, useEffect, useLayoutEffect } from 'react';
import logo from '../assets/Images/logo.png';



function buildBoxShadow(isDark, intensity = 1) {
  const hsl = isDark ? '0deg 0% 100%' : '0deg 0% 0%';
  const layers = [
    [0,0,0,1,100,true],[0,0,1,0,60,true],[0,0,3,0,50,true],[0,0,6,0,40,true],
    [0,0,15,0,30,true],[0,0,25,2,20,true],[0,0,50,2,10,true],
    [0,0,1,0,60,false],[0,0,3,0,50,false],[0,0,6,0,40,false],
    [0,0,15,0,30,false],[0,0,25,2,20,false],[0,0,50,2,10,false],
  ];
  return layers.map(([x,y,blur,spread,alpha,inset]) =>
    `${inset?'inset ':''}${x}px ${y}px ${blur}px ${spread}px hsl(${hsl} / ${Math.min(alpha*intensity,100)}%)`
  ).join(', ');
}

const ITEMS = [
  { label: 'Home',     href: '#home'     },
  { label: 'Projects',    href: '#projects'    },
  { label: 'About', href: '#about' },
  { label: 'Contact',  href: '#contact'  },
];

// isDark and onThemeToggle are optional — use internally if not provided
const NavDock = ({
  items = ITEMS,
  initialActiveIndex = 0,
  isDark: isDarkProp,
  onThemeToggle,
   activeIndex: activeIndexProp,   // add this
  onNavClick, 
}) => {
  const dockRef      = useRef(null);
  const borderRef    = useRef(null);
  const glowWrapRef  = useRef(null);
  const glowInnerRef = useRef(null);
  const navRef       = useRef(null);
  const pillRef      = useRef(null);
  const rafRef       = useRef(null);
  const stateRef     = useRef({
    angle: 45, targetAngle: 45,
    prox: 0,   targetProx: 0,
    hovered: false,
  });

  const [activeIndexInternal, setActiveIndexInternal] = useState(initialActiveIndex)
const isNavControlled = activeIndexProp !== undefined
const activeIndex = isNavControlled ? activeIndexProp : activeIndexInternal
  const [isDarkInternal, setIsDarkInternal] = useState(true);

  // Controlled vs uncontrolled
  const isControlled = isDarkProp !== undefined;
  const isDark       = isControlled ? isDarkProp : isDarkInternal;

  const toggleTheme = () => {
    if (isControlled) {
      onThemeToggle?.();
    } else {
      setIsDarkInternal(d => !d);
    }
  };

  const lerp = (a, b, t) => a + (b - a) * t;

  const getAngle = (el, x, y) => {
    const { width, height } = el.getBoundingClientRect();
    let deg = Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return deg;
  };

  const getProx = (el, x, y) => {
    const { width, height } = el.getBoundingClientRect();
    const cx = width / 2, cy = height / 2;
    const dx = x - cx, dy = y - cy;
    const kx = dx ? cx / Math.abs(dx) : Infinity;
    const ky = dy ? cy / Math.abs(dy) : Infinity;
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  };

  const updatePill = useCallback(() => {
    const pill = pillRef.current;
    const nav  = navRef.current;
    if (!pill || !nav) return;
    const btns   = nav.querySelectorAll('button');
    const active = btns[activeIndex];
    if (!active) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    pill.style.left   = `${btnRect.left - navRect.left}px`;
    pill.style.top    = `${btnRect.top  - navRect.top}px`;
    pill.style.width  = `${btnRect.width}px`;
    pill.style.height = `${btnRect.height}px`;
  }, [activeIndex]);

  useLayoutEffect(() => { updatePill(); }, [updatePill, isDark]);

  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const tick = () => {
      const s  = stateRef.current;
      const dk = isDarkRef.current;

      s.angle = lerp(s.angle, s.targetAngle, 0.12);
      s.prox  = lerp(s.prox, s.hovered ? s.targetProx : 0, 0.1);

      const edgeSens  = 30;
      const colorSens = 50;
      const p         = s.prox;
      const borderOp  = Math.max(0, (p * 100 - colorSens) / (100 - colorSens));
      const glowOp    = Math.max(0, (p * 100 - edgeSens)  / (100 - edgeSens));

      const deg     = `${s.angle.toFixed(3)}deg`;
      const cone    = 5;
      const feather = 5;
      const bgColor = dk ? '#111111' : '#f5f5f5';
      const glowStr = dk ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)';

      if (borderRef.current) {
        borderRef.current.style.opacity = borderOp;
        borderRef.current.style.background = [
          `linear-gradient(${bgColor} 0 100%) padding-box`,
          `linear-gradient(${glowStr}) border-box`,
        ].join(', ');
        const mask = `conic-gradient(from ${deg} at center, transparent 0%, black ${feather}%, black ${feather+cone}%, transparent ${feather*2+cone}%)`;
        borderRef.current.style.maskImage = mask;
        borderRef.current.style.webkitMaskImage = mask;
      }

      if (glowWrapRef.current && glowInnerRef.current) {
        glowWrapRef.current.style.opacity = glowOp;
        glowWrapRef.current.style.mixBlendMode = dk ? 'plus-lighter' : 'normal';
        const glowMask = `conic-gradient(from ${deg} at center, transparent 0%, black ${feather}%, black ${feather+cone}%, transparent ${feather*2+cone}%)`;
        glowWrapRef.current.style.maskImage = glowMask;
        glowWrapRef.current.style.webkitMaskImage = glowMask;
        glowInnerRef.current.style.boxShadow = buildBoxShadow(dk, 1.0);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerMove = useCallback((e) => {
    const dock = dockRef.current;
    if (!dock) return;
    const rect = dock.getBoundingClientRect();
    stateRef.current.targetAngle = getAngle(dock, e.clientX - rect.left, e.clientY - rect.top);
    stateRef.current.targetProx  = getProx(dock, e.clientX - rect.left, e.clientY - rect.top);
  }, []);

  const bgColor      = isDark ? '#111111'                : '#f5f5f5';
  const borderColor  = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const pillBg       = isDark ? '#ffffff'                : '#111111';
  const pillShadow   = isDark
    ? '0 0 14px rgba(255,255,255,0.3), 0 0 2px rgba(255,255,255,0.7)'
    : '0 0 14px rgba(0,0,0,0.18),      0 0 2px rgba(0,0,0,0.45)';
  const textActive   = isDark ? '#000000'                : '#ffffff';
  const textInactive = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.35)';
  const textHover    = isDark ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.82)';
  const dividerColor = isDark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)';
  const iconColor    = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.35)';

  // Logo: black text on transparent → invert in dark mode to show white
  const logoFilter = isDark ? 'invert(1)' : 'none';

  return (
    <>
      <style>{`
        .nd-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          border-radius: 18px;
          padding: 6px 8px;
          transform: translate3d(0,0,0.01px);
          isolation: isolate;
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .nd-border-layer {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 0;
          border: 1.5px solid transparent;
          opacity: 0;
        }
        .nd-glow-wrap {
          position: absolute;
          inset: -40px;
          border-radius: 18px;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
        }
        .nd-glow-inner {
          position: absolute;
          inset: 40px;
          border-radius: 18px;
        }
        .nd-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 12px;
          flex-shrink: 0;
          margin-right: 120px;
          position: relative;
          z-index: 3;
          overflow: hidden;
          transition: filter 0.4s ease;
        }
        .nd-logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          transition: filter 0.4s ease;
          display: block;
        }
        .nd-items {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          z-index: 3;
        }
        .nd-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 9px 20px;
          border-radius: 12px;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s ease;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .nd-btn span {
          position: relative;
          z-index: 4;
          pointer-events: none;
        }
        .nd-pill {
          position: absolute;
          border-radius: 10px;
          pointer-events: none;
          z-index: 2;
          transition:
            left   0.38s cubic-bezier(0.4,0,0.2,1),
            top    0.38s cubic-bezier(0.4,0,0.2,1),
            width  0.38s cubic-bezier(0.4,0,0.2,1),
            height 0.38s cubic-bezier(0.4,0,0.2,1),
            background 0.4s ease,
            box-shadow 0.4s ease;
        }
        .nd-divider {
          width: 1px;
          height: 20px;
          margin: 0 6px;
          flex-shrink: 0;
          position: relative;
          z-index: 3;
          transition: background 0.4s ease;
        }
        .nd-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          flex-shrink: 0;
          margin-left: 4px;
          position: relative;
          z-index: 3;
        }
      `}</style>

      <div
        ref={dockRef}
        className="nd-wrap"
        style={{ background: bgColor, border: `1px solid ${borderColor}` }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => { stateRef.current.hovered = true; }}
        onPointerLeave={() => {
          stateRef.current.hovered    = false;
          stateRef.current.targetProx = 0;
        }}
      >
        <div className="nd-border-layer" ref={borderRef} />
        <div className="nd-glow-wrap" ref={glowWrapRef}>
          <div className="nd-glow-inner" ref={glowInnerRef} />
        </div>

        {/* Logo — left side */}
        <div className="nd-logo-wrap">
          <img
            src={logo}
            alt="Logo"
            className="nd-logo-img"
            style={{ filter: logoFilter }}
          />
        </div>

        <div className="nd-divider" style={{ background: dividerColor }} />

        {/* Nav items — center */}
        <ul className="nd-items" ref={navRef}>
          <div
            ref={pillRef}
            className="nd-pill"
            style={{ background: pillBg, boxShadow: pillShadow }}
          />
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <li key={index}>
                <button
                  className="nd-btn"
                  style={{ color: isActive ? textActive : textInactive }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = textHover;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = isActive ? textActive : textInactive;
                  }}
                  onClick={() => {
  if (isNavControlled) {
    onNavClick?.(index, item.href)
  } else {
    setActiveIndexInternal(index)
    const target = document.querySelector(item.href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }
}}
                >
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="nd-divider" style={{ background: dividerColor }} />

        {/* Theme toggle — right side */}
        <button
          className="nd-icon-btn"
          style={{ color: iconColor }}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark
            ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1"  x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1"  y1="12" x2="3"  y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
                <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
              </svg>
            )
          }
        </button>
      </div>
    </>
  );
};

export default NavDock;