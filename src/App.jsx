import { useState, useEffect, useRef } from 'react'
import Particles from './components/Particles'
import NavDock from './components/NavDock'
import ScrambledText from './components/ScrambledText'
import TextPressure from './components/TextPressure'
import TiltedCard from './components/TiltedCard'
import RotatingText from './components/RotatingText'
import BorderGlow from './components/BorderGlow'
import CardSwap, { Card } from './components/CardSwap'
import ProjectPage from './components/ProjectPage'
import resume from './assets/Documents/Resume.pdf'
import aaronDark from './assets/Images/aaron.png'
import aaronLight from './assets/Images/aaronShades.png'
import aaron1Dark from './assets/Images/aaron1.png'
import aaron1Light from './assets/Images/aaron1Shades.png'
import logo from './assets/Images/logo.png'
import VariableProximity from './components/VariableProximity'
import CertPreview from './components/CertPreview'
import LogoLoop from './components/LogoLoop'
import MetaBalls from './components/MetaBalls'
import StaggeredMenu from './components/StaggeredMenu'
import Folder from './components/Folder'
import { navItems, SUMMARY, PROJECTS, ABOUT_SUMMARY, ABOUT_FACTS, EDUCATION, CERTIFICATIONS, SKILL_LOGOS, SKILL_CATEGORIES } from './constants.jsx'


function App() {
  const [isDark, setIsDark] = useState(true)
  const [activeProject, setActiveProject] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState(0)
  const projectsTitleRef = useRef(null)
  const aboutTitleRef = useRef(null)
  const contactTitleRef = useRef(null)
  const skillsTitleRef = useRef(null)

  const [rotatingIndex, setRotatingIndex] = useState(0)
  const [hoveredCert, setHoveredCert] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredFolder, setHoveredFolder] = useState(null)

  const menuItems = navItems.map(item => ({
    label: item.label,
    ariaLabel: `Go to ${item.label}`,
    link: item.href,
  }))

  const [cardSize, setCardSize] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 768
    return {
        w: w < 768 ? Math.min(Math.round((w - 48) * 0.85), 360) : 660,
      h: w < 768 ? 220 : 430,
    }
  })

  const [tiltedSize, setTiltedSize] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 768
    return w < 768 ? { w: Math.round((w - 48) * 0.85), h: Math.round((w - 48) * 0.85 * 1.33) } : { w: 450, h: 600 }
  })

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      setCardSize({
      w: w < 768 ? Math.min(Math.round((w - 48) * 0.85), 360) : 660,
        h: w < 768 ? 220 : 430,
      })
      setTiltedSize(
        w < 768
          ? { w: Math.round((w - 48) * 0.85), h: Math.round((w - 48) * 0.85 * 1.33) }
          : { w: 450, h: 600 }
      )
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])



  // Drive body background for light/dark mode
  useEffect(() => {
    document.body.style.background = isDark ? '#111111' : '#f5f5f5'
    document.body.style.transition = 'background 0.4s ease'
  }, [isDark])

  // Detect when user has scrolled past the hero
  useEffect(() => {
  const sectionIds = ['home', 'projects', 'about', 'contact']
  const navIndexMap = { home: 0, projects: 1, about: 2, contact: 3 }

  const onScroll = () => {
    setIsScrolled(window.scrollY > window.innerHeight * 0.6)

    // Find which section is currently in view
    let current = 'home'
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
        current = id
      }
    }
    setActiveProject(prev => prev) // keep project state untouched
    setActiveNav(navIndexMap[current])
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])

  const textPrimary   = isDark ? '#ffffff'                : '#111111'
  const textSecondary = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const textMuted     = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)'
  const rotateBg      = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'
  const rotateText    = isDark ? '#ffffff'                : '#111111'
  const cardBg        = isDark ? '#1a1a1a'               : '#ffffff'
  const cardBorder    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const tagBg         = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'
  const tagText       = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)'
  const folderColor   = isDark ? '#2a2a2a'               : '#d4d4d4'

  const active = PROJECTS[activeProject]

  return (
    <>
    {selectedProject !== null && (
      <ProjectPage
        projects={PROJECTS}
        isDark={isDark}
        initialIndex={selectedProject}
        onBack={() => setSelectedProject(null)}
        onThemeToggle={() => setIsDark(d => !d)}
      />
    )}
    <div
      className="w-screen overflow-x-hidden"
      style={{ background: 'transparent', display: selectedProject !== null ? 'none' : 'block' }}
    >

      {/* ── GLOBAL PARTICLES BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          isDark={isDark}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* ── FLOATING NAV (desktop) ── */}
      <div
        className="fixed left-0 right-0 justify-center z-50 hidden lg:flex"
        style={{
          top: 0,
          padding: isScrolled ? '12px 0' : '0',
          transform: isScrolled ? 'translateY(0)' : 'translateY(calc(100vh - 72px - 16px))',
          transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1), padding 0.4s ease',
        }}
      >
        <NavDock
          items={navItems}
          isDark={isDark}
          onThemeToggle={() => setIsDark(d => !d)}
          activeIndex={activeNav}
          onNavClick={(index, href) => {
            setActiveNav(index)
            const target = document.querySelector(href)
            if (target) target.scrollIntoView({ behavior: 'smooth' })
          }}
        />
      </div>

      {/* ── MOBILE/TABLET MENU ── */}
      <div className={`lg:hidden ${isDark ? 'dark' : ''}`}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering
          menuButtonColor={isDark ? '#ffffff' : '#111111'}
          openMenuButtonColor="#111111"
          changeMenuColorOnOpen
          colors={isDark ? ['#1a1a1a', '#2a2a2a'] : ['#ffffff', '#f0f0f0']}
          accentColor={isDark ? '#ffffff' : '#111111'}
          isFixed
          closeOnClickAway
          logoUrl={logo}
        />
      </div>

      {/* ── MOBILE THEME TOGGLE ── */}
      <button
        className="lg:hidden fixed z-50 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          bottom: '24px',
          left: '24px',
          width: '44px',
          height: '44px',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
          color: isDark ? '#ffffff' : '#111111',
          touchAction: 'manipulation',
        }}
        onClick={() => setIsDark(d => !d)}
        aria-label="Toggle theme"
        onMouseEnter={e => {
          e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
        }}
        onTouchStart={e => {
          e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)'
        }}
        onTouchEnd={e => {
          e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
        }}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      {/* ── HERO SECTION ── */}
      <section id="home" className="relative w-full h-screen overflow-hidden">

        <div className="absolute inset-0 z-10 flex items-center px-6 sm:px-12 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 lg:gap-16 items-center">

            <div className="flex flex-col justify-center gap-4 lg:gap-5 w-full">
              <div className="flex items-center gap-2 flex-wrap">
                <p
                  className="text-xs sm:text-sm font-mono tracking-widest uppercase"
                  style={{ color: textMuted, transition: 'color 0.4s ease' }}
                >
                  Hey there, I'm a
                </p>
              </div>

              <div className="w-full" style={{ height: 'clamp(50px, 8vw, 100px)' }}>
                <TextPressure
                  text="Aaron Manuel C. Custodio"
                  flex={true} alpha={false} stroke={false}
                  width={true} weight={true} italic={true} scale={false}
                  textColor={textPrimary} minFontSize={14}
                />
              </div>

              <div className="w-full h-px" style={{ background: textMuted, transition: 'background 0.4s ease' }} />

              <div className="w-full">
                <ScrambledText
                  radius={80} duration={1} speed={0.5} scrambleChars=".:"
                  className="text-sm sm:text-base leading-relaxed font-mono w-full"
                  style={{ color: textSecondary, transition: 'color 0.4s ease' }}
                >
                  {SUMMARY}
                </ScrambledText>
              </div>

              <div className="inline-flex">
                <BorderGlow
                  edgeSensitivity={20}
                  glowColor={isDark ? '0 0 100' : '0 0 0'}
                  backgroundColor={isDark ? '#1a1a1a' : '#e8e8e8'}
                  borderRadius={10} glowRadius={35} glowIntensity={0.9}
                  coneSpread={25} animated={false}
                  colors={isDark ? ['#ffffff', '#aaaaaa', '#555555'] : ['#000000', '#444444', '#888888']}
                >
                  <button
                    onClick={() => {
                      fetch(resume)
                        .then(res => res.blob())
                        .then(blob => {
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = 'Resume_Aaron_Custodio.pdf'
                          document.body.appendChild(a)
                          a.click()
                          document.body.removeChild(a)
                          URL.revokeObjectURL(url)
                        })
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 font-mono text-xs sm:text-sm tracking-widest uppercase no-underline"
                    style={{ color: textPrimary, transition: 'color 0.4s ease', whiteSpace: 'nowrap', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Get my Resume
                  </button>
                </BorderGlow>
              </div>

              {/* Social circle buttons */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://github.com/aaroncustodio11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full no-underline transition-all duration-300"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: tagBg,
                    border: `1px solid ${cardBorder}`,
                    color: textPrimary,
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = tagBg
                  }}
                  onTouchStart={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                  onTouchEnd={e => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = tagBg
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/aaron-manuel-custodio-4040393a3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full no-underline transition-all duration-300"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: tagBg,
                    border: `1px solid ${cardBorder}`,
                    color: textPrimary,
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = tagBg
                  }}
                  onTouchStart={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                  onTouchEnd={e => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = tagBg
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/aaron.dredron.11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full no-underline transition-all duration-300"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: tagBg,
                    border: `1px solid ${cardBorder}`,
                    color: textPrimary,
                    touchAction: 'manipulation',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = tagBg
                  }}
                  onTouchStart={e => {
                    e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                  }}
                  onTouchEnd={e => {
                    e.currentTarget.style.borderColor = cardBorder
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.background = tagBg
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <TiltedCard
                imageSrc={isDark ? aaronDark : aaronLight}
                altText="Aaron Manuel C. Custodio"
                captionText="Aaron Manuel C. Custodio"
                containerHeight={tiltedSize.h + 'px'}
                containerWidth={tiltedSize.w + 'px'}
                imageHeight={tiltedSize.h + 'px'}
                imageWidth={tiltedSize.w + 'px'}
                rotateAmplitude={12} scaleOnHover={1.05}
                showMobileWarning={false} showTooltip={true}
                displayOverlayContent={false}
              />
            </div>
          </div>
        </div>

      </section>

      {/* Spacer between Hero and Projects */}
      <div className="w-full" style={{ height: 'clamp(40px, 6vh, 80px)' }} />

      {/* ── PROJECTS SECTION ── */}
      <section
        id="projects"
        className="relative w-full min-h-screen flex items-center overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 py-24 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 items-start w-full">

            {/* ── LEFT ── */}
            <div className="flex flex-col gap-5">

              <div
                ref={projectsTitleRef}
                style={{
                  position: 'relative',
                  fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                  color: textPrimary,
                  transition: 'color 0.4s ease',
                  letterSpacing: '-0.02em',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                <VariableProximity
                  label="Projects"
                  fromFontVariationSettings="'wght' 700, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={projectsTitleRef}
                  radius={150}
                  falloff="linear"
                />
              </div>

              <div className="w-16 h-px" style={{ background: textMuted, transition: 'background 0.4s ease' }} />

              <div key={active.number + '-title'} style={{ animation: 'fadeSlideIn 0.4s ease forwards' }}>
                  <div className="flex items-center gap-3 mb-1">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: tagBg, border: `1px solid ${cardBorder}` }}
                    >
                      {active.icon(textMuted)}
                    </div>
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: tagText }}>
                      {active.type}
                    </span>
                    <span className="font-mono text-xs ml-auto" style={{ color: textMuted }}>
                      {active.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6" />
                    <span className="font-mono text-xs" style={{ color: textSecondary }}>
                      {active.role}
                    </span>
                  </div>

                <h3
                  className="font-mono font-bold mb-3"
                  style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    color: textPrimary,
                    transition: 'color 0.4s ease',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {active.title}
                </h3>

                <ScrambledText
                  radius={80} duration={1} speed={0.5} scrambleChars=".:"
                  className="font-mono text-sm leading-relaxed mb-5"
                  style={{ color: textSecondary, transition: 'color 0.4s ease' }}
                >
                  {active.description}
                </ScrambledText>

                <div className="flex flex-col gap-3">
                  {active.contributions.map((c, ci) => (
                    <div key={ci} className="flex gap-3 items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {active.icon(textMuted)}
                      </div>
                      <div className="w-px self-stretch flex-shrink-0" style={{ background: cardBorder }} />
                      <ScrambledText
                        radius={80} duration={1} speed={0.5} scrambleChars=".:"
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: textSecondary, transition: 'color 0.4s ease' }}
                      >
                        {c}
                      </ScrambledText>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                {PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveProject(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeProject === i ? '20px' : '6px',
                      height: '6px',
                      background: activeProject === i ? textPrimary : textMuted,
                    }}
                  />
                ))}
              </div>

            </div>

            {/* ── RIGHT: CardSwap ── */}
            <div className="relative flex flex-col items-start lg:items-end w-full mt-12 lg:mt-0 lg:self-center">
              <CardSwap
                width={cardSize.w}
                height={cardSize.h}
                cardDistance={55}
                verticalDistance={60}
                delay={4000}
                pauseOnHover={true}
                skewAmount={5}
                easing="elastic"
                onCardClick={(i) => setActiveProject(i)}
                onFrontChange={(i) => setActiveProject(i)}
              >
                {PROJECTS.map((p, i) => (
                  <Card
                    key={i}
                    style={{
                      background: cardBg,
                      borderColor: cardBorder,
                      transition: 'background 0.4s ease, border-color 0.4s ease',
                    }}
                  >
                    <div className="flex flex-col h-full">

                      {/* TOP BAR */}
                      <div
                        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                        style={{ borderBottom: `1px solid ${cardBorder}`, transition: 'border-color 0.4s ease' }}
                      >
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: tagBg, border: `1px solid ${cardBorder}` }}
                        >
                          {p.icon(textMuted)}
                        </div>
                        <span
                          className="font-mono text-sm font-semibold tracking-wide truncate"
                          style={{ color: textPrimary, transition: 'color 0.4s ease' }}
                        >
                          {p.title}
                        </span>
                        <span className="ml-auto font-mono text-xs flex-shrink-0" style={{ color: textMuted }}>
                          {p.number}
                        </span>
                      </div>

                      {/* IMAGE AREA */}
                      <div className="relative flex-1 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }}
                        />
                        <div className="absolute inset-0 flex flex-col justify-between p-4">
                          <div className="flex justify-end">
                            <span
                              className="font-mono text-xs px-2.5 py-1 rounded-full backdrop-blur-sm"
                              style={{
                                background: 'rgba(0,0,0,0.45)',
                                color: 'rgba(255,255,255,0.75)',
                                border: '1px solid rgba(255,255,255,0.12)',
                              }}
                            >
                              {p.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {p.tags.map((tag, t) => (
                              <span
                                key={t}
                                className="font-mono text-xs px-2 py-1 rounded backdrop-blur-sm"
                                style={{
                                  background: 'rgba(0,0,0,0.5)',
                                  color: 'rgba(255,255,255,0.7)',
                                  border: '1px solid rgba(255,255,255,0.1)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                            <button
                              className="flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs tracking-widest uppercase backdrop-blur-sm ml-auto flex-shrink-0"
                              style={{
                                background: 'rgba(255,255,255,0.12)',
                                color: '#ffffff',
                                border: '1px solid rgba(255,255,255,0.22)',
                                transition: 'background 0.2s ease',
                                touchAction: 'manipulation',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                              onTouchStart={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
                              onTouchEnd={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                              onClick={e => { e.stopPropagation(); setSelectedProject(i) }}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                              View Project
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>

          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={() => setSelectedProject(activeProject)}
              className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                color: textPrimary,
                border: `1px solid ${cardBorder}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = textSecondary }}
              onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = cardBorder }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section
        id="about"
        className="relative w-full min-h-screen overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 py-24 flex flex-col gap-20">

          {/* ── TOP: Photo + Bio ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Photo as TiltedCard */}
            <div className="flex items-center justify-center w-full">
              <TiltedCard
                imageSrc={isDark ? aaron1Dark : aaron1Light}
                altText="Aaron Manuel Custodio"
                captionText="Aaron Manuel Custodio"
                containerHeight={tiltedSize.h + 'px'}
                containerWidth={tiltedSize.w + 'px'}
                imageHeight={tiltedSize.h + 'px'}
                imageWidth={tiltedSize.w + 'px'}
                rotateAmplitude={12} scaleOnHover={1.05}
                showMobileWarning={false} showTooltip={true}
                displayOverlayContent={false}
              />
            </div>

            {/* Right: Bio */}
            <div className="flex flex-col gap-6">
              <div>
                {/* About Me title — VariableProximity, left-aligned */}
                <div
                  ref={aboutTitleRef}
                  style={{
                    position: 'relative',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    color: textPrimary,
                    transition: 'color 0.4s ease',
                    letterSpacing: '-0.02em',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    lineHeight: 1,
                    textAlign: 'left',
                    marginBottom: '1rem',
                  }}
                >
                  <VariableProximity
                    label="About Me"
                    fromFontVariationSettings="'wght' 700, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={aboutTitleRef}
                    radius={150}
                    falloff="linear"
                  />
                </div>

                <div className="w-16 h-px mb-6" style={{ background: textMuted }} />

                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-mono mb-4">
                  <span className="tracking-widest uppercase" style={{ color: textMuted, transition: 'color 0.4s ease' }}>
                    {[1].includes(rotatingIndex) ? "An" : "A"}
                  </span>
                  <RotatingText
                    texts={['Web', 'App', 'Game', 'Project']}
                    mainClassName="px-2 py-0.5 rounded-md overflow-hidden justify-center font-mono text-xs sm:text-sm tracking-widest uppercase"
                    style={{ background: rotateBg, color: rotateText, transition: 'background 0.4s ease, color 0.4s ease' }}
                    staggerFrom="last"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                    splitBy="characters"
                    auto
                    loop
                    onNext={(i) => setRotatingIndex(i)}
                  />
                  <span className="tracking-widest uppercase" style={{ color: textMuted, transition: 'color 0.4s ease' }}>
                    {rotatingIndex === 3 ? 'Manager' : 'Developer'}
                  </span>
                </div>

                <ScrambledText
                  radius={80} duration={1} speed={0.5} scrambleChars=".:"
                  className="font-mono text-sm leading-relaxed"
                  style={{ color: textSecondary, transition: 'color 0.4s ease' }}
                >
                  {ABOUT_SUMMARY}
                </ScrambledText>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {ABOUT_FACTS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-1 p-3 rounded-xl"
                    style={{
                      background: tagBg,
                      border: `1px solid ${cardBorder}`,
                      transition: 'border-color 0.25s ease, transform 0.25s ease, background 0.25s ease',
                      cursor: 'pointer',
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                    onTouchStart={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.09)'
                    }}
                    onTouchEnd={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                  >
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: textMuted }}>{label}</span>
                    <span className="font-mono text-sm font-semibold" style={{ color: textPrimary }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

           {/* Education + Certifications */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-10 col-span-1 lg:col-span-2">

  {/* ===================== LEFT : EDUCATION ===================== */}
  <div className="flex flex-col gap-4 items-center">

    {/* Education */}
    <div className="flex flex-col gap-4 w-full items-center">
      <div
        className="flex items-center gap-3 mb-1 w-full"
        style={{ width: '100%',
maxWidth: '700px' }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={textMuted}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
        <h3
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: textMuted }}
        >
          Education
        </h3>
      </div>

      <div
        className="w-full h-px"
        style={{ background: cardBorder, maxWidth: '700px' }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '700px',
          aspectRatio: '700 / 420',
          perspective: '1000px',
          flexShrink: 0,
          touchAction: 'none',
        }}
        onMouseMove={e => {
          const el = e.currentTarget.querySelector('.edu-card-inner')
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const cx = rect.width / 2
          const cy = rect.height / 2
          const rotX = ((y - cy) / cy) * -10
          const rotY = ((x - cx) / cx) * 10
          el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget.querySelector('.edu-card-inner')
          el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
        }}
        onTouchMove={e => {
          const el = e.currentTarget.querySelector('.edu-card-inner')
          if (!el || !e.touches[0]) return
          const rect = e.currentTarget.getBoundingClientRect()
          const touch = e.touches[0]
          const x = touch.clientX - rect.left
          const y = touch.clientY - rect.top
          const cx = rect.width / 2
          const cy = rect.height / 2
          const rotX = ((y - cy) / cy) * -10
          const rotY = ((x - cx) / cx) * 10
          el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`
        }}
        onTouchEnd={e => {
          const el = e.currentTarget.querySelector('.edu-card-inner')
          if (el) el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
        }}
      >
        <div
          className="edu-card-inner relative w-full h-full rounded-2xl overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.25s ease',
            border: `1px solid ${cardBorder}`,
            willChange: 'transform',
          }}
        >
          <img
            src={isDark ? EDUCATION.imageDark : EDUCATION.imageLight}
            alt={EDUCATION.school}
            className="w-full h-full object-cover"
            draggable={false}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-7 gap-1">
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {EDUCATION.level}
            </span>

            <span
              className="font-mono text-xl font-bold leading-tight"
              style={{ color: '#ffffff' }}
            >
              {EDUCATION.school}
            </span>

            <span
              className="font-mono text-sm"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {EDUCATION.degree}
            </span>

            <span
              className="font-mono text-xs"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {EDUCATION.address}
            </span>

            <div className="flex items-center gap-2 mt-2">
              <span
                className="font-mono text-xs"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {EDUCATION.period}
              </span>

              <span
                className="font-mono text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              >
                {EDUCATION.note}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  {/* ===================== RIGHT : CERTIFICATIONS ===================== */}
  <div className="flex flex-col gap-4">

    {/* Certifications */}
    <div className="flex items-center gap-3 mb-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={textMuted}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>

      <h3
        className="font-mono text-xs tracking-widest uppercase"
        style={{ color: textMuted }}
      >
        Certifications & Achievements
      </h3>
    </div>

    <div className="w-full h-px" style={{ background: cardBorder }} />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
      {[...CERTIFICATIONS].sort((a, b) => Number(b.year) - Number(a.year)).map((cert, i) => {
        const categoryColor = {
          Award: { bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.35)', text: '#eab308' },
          'Academic Honor': { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', text: '#3b82f6' },
          Scholarship: { bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.35)', text: '#22c55e' },
        }
        const cat = categoryColor[cert.category] ?? categoryColor['Award']

        return (
                    <div
  key={i}
  className="relative flex flex-col gap-1.5 p-3 rounded-xl overflow-hidden"
  style={{
    background: tagBg,
    border: `1px solid ${cardBorder}`,
    transition:
      'border-color 0.25s ease, transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
    touchAction: 'manipulation',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.borderColor = cat.border
    e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'
    e.currentTarget.style.background = isDark
      ? 'rgba(255,255,255,0.07)'
      : 'rgba(0,0,0,0.05)'
    e.currentTarget.style.boxShadow =
      `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${cat.border}`
    setHoveredCert(cert)
  }}
  onMouseMove={e =>
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    })
  }
  onMouseLeave={e => {
    e.currentTarget.style.borderColor = cardBorder
    e.currentTarget.style.transform = 'translateY(0) scale(1)'
    e.currentTarget.style.background = tagBg
    e.currentTarget.style.boxShadow = 'none'
    setHoveredCert(null)
  }}
  onTouchStart={e => {
    e.currentTarget.style.borderColor = cat.border
    e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)'
    e.currentTarget.style.background = isDark
      ? 'rgba(255,255,255,0.07)'
      : 'rgba(0,0,0,0.05)'
    e.currentTarget.style.boxShadow =
      `0 8px 24px rgba(0,0,0,0.2), 0 0 0 1px ${cat.border}`
    setHoveredCert(cert)
  }}
  onTouchMove={e =>
    setMousePos({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    })
  }
  onTouchEnd={e => {
    e.currentTarget.style.borderColor = cardBorder
    e.currentTarget.style.transform = 'translateY(0) scale(1)'
    e.currentTarget.style.background = tagBg
    e.currentTarget.style.boxShadow = 'none'
    setHoveredCert(null)
  }}
>
  {/* Subtle left accent bar */}
  <div
    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
    style={{ background: cat.border }}
  />

  {/* Top row: category tag + GWA */}
  <div className="flex items-center justify-between gap-2">
    <span
      className="font-mono text-xs px-2.5 py-0.5 rounded-full font-medium"
      style={{
        background: cat.bg,
        border: `1px solid ${cat.border}`,
        color: cat.text,
      }}
    >
      {cert.category}
    </span>

    {cert.gwa && (
      <span
        className="font-mono text-xs px-2.5 py-0.5 rounded-full"
        style={{
          background: isDark
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(0,0,0,0.05)',
          border: `1px solid ${cardBorder}`,
          color: textSecondary,
        }}
      >
        {cert.gwa}
      </span>
    )}
  </div>

  {/* Title */}
  <span
    className="font-mono text-sm font-semibold leading-snug"
    style={{ color: textPrimary }}
  >
    {cert.name}
  </span>

  {/* Detail */}
  <span
    className="font-mono text-xs leading-relaxed"
    style={{ color: textSecondary }}
  >
    {cert.detail}
  </span>
</div>
                  )
              })}
    </div>
  </div>
</div>

{/* Cert Preview Tooltip */}
<CertPreview
  cert={hoveredCert}
  mouseX={mousePos.x}
  mouseY={mousePos.y}
  visible={!!hoveredCert}
  isDark={isDark}
/>

            {/* Skills */}
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
              <LogoLoop
                logos={SKILL_LOGOS.map(l => ({
                  ...l,
                  src: l.src.startsWith('http') ? `${l.src.split('?')[0]}/${isDark ? 'ffffff' : '111111'}` : l.src,
                  ...(!l.src.startsWith('http') && { style: { filter: isDark ? 'none' : 'invert(1)' } }),
                }))}
                speed={80}
                direction="left"
                logoHeight={36}
                gap={40}
                pauseOnHover={true}
                fadeOut={true}
                fadeOutColor={isDark ? '#111111' : '#f5f5f5'}
                scaleOnHover={true}
              />

              <div className="flex flex-col items-center gap-1 w-full mt-10">
                <div
                  ref={skillsTitleRef}
                  className="font-mono font-bold"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    color: textPrimary,
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    textAlign: 'center',
                  }}
                >
                  <VariableProximity
                    label="My Skills"
                    fromFontVariationSettings="'wght' 700, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={skillsTitleRef}
                    radius={150}
                    falloff="linear"
                  />
                </div>
                <div className="w-16 h-px mt-3 mb-2" style={{ background: textMuted }} />
              </div>

              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 items-start mx-auto"
                style={{ maxWidth: '900px' }}
              >
                {SKILL_CATEGORIES.map((group, gi) => (
                  <div
                    key={group.category}
                    className="flex flex-col items-center gap-2.5"
                    onMouseEnter={() => setHoveredFolder(gi)}
                    onMouseLeave={() => setHoveredFolder(null)}
                    onTouchStart={() => setHoveredFolder(hoveredFolder === gi ? null : gi)}
                  >
                    <Folder
                      color={folderColor}
                      size={1.1}
                      isOpen={hoveredFolder === gi}
                      logo={group.folderLogo.startsWith('http') ? `${group.folderLogo}/${isDark ? 'ffffff' : '111111'}` : group.folderLogo}
                      items={group.skills.map(skill => (
                        <div className="flex items-center justify-center w-full h-full p-1">
                          <img
                            src={skill.logo.startsWith('http') ? `${skill.logo}/111111` : skill.logo}
                            alt={skill.name}
                            className="w-5 h-5 object-contain"
                            loading="lazy"
                            style={!skill.logo.startsWith('http') ? { filter: 'invert(1)' } : undefined}
                          />
                        </div>
                      ))}
                    />
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase text-center leading-tight"
                      style={{ color: textMuted }}
                    >
                      {group.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section
        id="contact"
        className="relative w-full min-h-screen flex items-center overflow-hidden"
        style={{ background: 'transparent' }}
      >
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left column: contact content */}
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: textMuted }}>
                  Get in touch
                </span>
                <div
                  ref={contactTitleRef}
                  style={{
                    position: 'relative',
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    color: textPrimary,
                    letterSpacing: '-0.02em',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  <VariableProximity
                    label="Let's work together"
                    fromFontVariationSettings="'wght' 700, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={contactTitleRef}
                    radius={150}
                    falloff="linear"
                  />
                </div>
                <ScrambledText
                  radius={80} duration={1} speed={0.5} scrambleChars=".:"
                  className="font-mono text-sm leading-relaxed"
                  style={{ color: textSecondary }}
                >
                  Have a project, internship opportunity, or just want to say hi? I'd love to hear from you.
                </ScrambledText>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col gap-6 w-full">
                {/* Row: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="mailto:aaronmanuelcustodio11@gmail.com"
                    className="flex items-center gap-4 px-5 py-4 rounded-xl no-underline transition-all duration-300"
                    style={{
                      background: tagBg,
                      border: `1px solid ${cardBorder}`,
                      color: textPrimary,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                    onTouchStart={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onTouchEnd={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-10 7L2 7"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>Email</span>
                      <span className="font-mono text-sm break-all">aaronmanuelcustodio11@gmail.com</span>
                    </div>
                  </a>

                  <a
                    href="tel:+639511496265"
                    className="flex items-center gap-4 px-5 py-4 rounded-xl no-underline transition-all duration-300"
                    style={{
                      background: tagBg,
                      border: `1px solid ${cardBorder}`,
                      color: textPrimary,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                    onTouchStart={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onTouchEnd={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>Phone</span>
                      <span className="font-mono text-sm break-all">+63 951 149 6265</span>
                    </div>
                  </a>
                </div>

                {/* Row: Social circle buttons */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/aaroncustodio11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full no-underline transition-all duration-300"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: tagBg,
                      border: `1px solid ${cardBorder}`,
                      color: textPrimary,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                    onTouchStart={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onTouchEnd={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/aaron-manuel-custodio-4040393a3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full no-underline transition-all duration-300"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: tagBg,
                      border: `1px solid ${cardBorder}`,
                      color: textPrimary,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                    onTouchStart={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onTouchEnd={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>

                  <a
                    href="https://www.facebook.com/aaron.dredron.11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-full no-underline transition-all duration-300"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: tagBg,
                      border: `1px solid ${cardBorder}`,
                      color: textPrimary,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                    onTouchStart={e => {
                      e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.3)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                    }}
                    onTouchEnd={e => {
                      e.currentTarget.style.borderColor = cardBorder
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = tagBg
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: MetaBalls */}
            <div className="relative w-full min-h-[400px] overflow-hidden metaballs-container">
              <MetaBalls
                color={isDark ? '#ffffff' : '#111111'}
                cursorBallColor={isDark ? '#ffffff' : '#111111'}
                cursorBallSize={2}
                ballCount={15}
                animationSize={30}
                enableMouseInteraction
                enableTransparency={true}
                hoverSmoothness={0.15}
                clumpFactor={1}
                speed={0.3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="relative w-full"
        style={{ background: 'transparent' }}
      >
        <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24 py-8 flex flex-col items-center gap-4">
          <div className="w-full h-px max-w-lg" style={{ background: cardBorder }} />
          <p className="font-mono text-xs tracking-widest" style={{ color: textMuted }}>
            &copy; {new Date().getFullYear()} Aaron Manuel Custodio
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dark .sm-logo-img { filter: invert(1); }
      `}      </style>
    </div>
    </>
  )
}

export default App