import { useState, useCallback, useEffect, useRef } from 'react'
import Particles from './Particles'
import OptionWheel from './OptionWheel'
import { PROJECTS } from '../constants'
import ScrambledText from './ScrambledText'

const WHEEL_ITEMS = ['Rumini', 'BokaDex', 'Easy tickIT', 'The Last Chapter']

function DetailCarousel({ images, isDark, cardBorder, textMuted }) {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState({})
  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  const trackStyle = {
    transform: `translateX(-${current * 100}%)`,
    transition: 'transform 0.45s cubic-bezier(0.25, 0.1, 0.25, 1.0)'
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>Gallery</span>
        <span className="font-mono text-[10px]" style={{ color: textMuted }}>{current + 1} / {images.length}</span>
      </div>
      <div className="relative w-full rounded-xl overflow-hidden group" style={{ aspectRatio: '16 / 9', border: `1px solid ${cardBorder}`, background: isDark ? '#1a1a1a' : '#e0e0e0' }}>
        <div className="flex h-full" style={trackStyle}>
          {images.map((src, i) => (
            <div key={i} className="w-full h-full flex-shrink-0 flex items-center justify-center" style={{ background: isDark ? '#1a1a1a' : '#e0e0e0' }}>
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-contain"
                style={{ opacity: loaded[i] ? 1 : 0, transition: 'opacity 0.3s' }}
                onLoad={() => setLoaded(p => ({ ...p, [i]: true }))}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: 'none', cursor: 'pointer', backdropFilter: 'blur(4px)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.55)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className="rounded-full transition-all duration-300" style={{ border: 'none', cursor: 'pointer', width: i === current ? '18px' : '6px', height: '6px', background: i === current ? '#fff' : 'rgba(255,255,255,0.4)' }} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button key={i} onClick={() => setCurrent(i)} className="flex-shrink-0 w-16 h-10 rounded-md overflow-hidden transition-all duration-200" style={{ border: i === current ? '2px solid #fff' : `1px solid ${cardBorder}`, opacity: i === current ? 1 : 0.5, padding: 0, cursor: 'pointer', background: isDark ? '#1a1a1a' : '#e0e0e0' }}
            onMouseEnter={e => { if (i !== current) e.currentTarget.style.opacity = '0.75' }}
            onMouseLeave={e => { if (i !== current) e.currentTarget.style.opacity = '0.5' }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

function ProjectPage({ isDark, onBack, initialIndex = 0 }) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex)
  const project = PROJECTS[selectedIndex]
  const wheelRef = useRef(null)

  const swipeRef = useRef({ x: 0 })

  const handleTouchStart = useCallback(e => {
    swipeRef.current.x = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(e => {
    const dx = e.changedTouches[0].clientX - swipeRef.current.x
    const threshold = 50
    if (dx > threshold) wheelRef.current?.goPrev()
    else if (dx < -threshold) wheelRef.current?.goNext()
  }, [])

  const textSecondary = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const textPrimary   = isDark ? '#ffffff'                : '#111111'
  const cardBorder    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const textMuted     = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)'

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" style={{ background: isDark ? '#111111' : '#f5f5f5' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          isDark={isDark}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 w-full min-h-screen lg:pl-[500px]">
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 h-[120px]" style={{ background: isDark ? '#111111' : '#f5f5f5' }}>
          <div className="absolute top-0 left-0 right-0 text-center font-mono text-[10px] tracking-widest uppercase pointer-events-none" style={{ color: textMuted, lineHeight: '24px' }}>
            Slide left or right to switch project
          </div>
          <OptionWheel
            ref={wheelRef}
            className="h-full w-full"
            items={WHEEL_ITEMS}
            defaultSelected={selectedIndex}
            textColor="#a6a6a6"
            activeColor="#ffffff"
            side="up"
            fontSize={2}
            spacing={10}
            curve={0}
            tilt={0}
            blur={0}
            fade={0.25}
            smoothing={200}
            inset={40}
            loop
            draggable
            soundUrl="/assets/sounds/click-soft.mp3"
            soundVolume={0.5}
            onChange={(index) => setSelectedIndex(index)}
          />
        </div>

        <div className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-[500px] lg:z-20 flex-col" style={{ background: isDark ? '#111111' : '#f5f5f5' }}>
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase no-underline transition-all duration-300 px-8 pt-8 pb-4"
            style={{ color: textSecondary, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            onMouseEnter={e => e.currentTarget.style.color = textPrimary}
            onMouseLeave={e => e.currentTarget.style.color = textSecondary}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <div className="flex-1 min-h-0">
            <OptionWheel
              className="h-full w-full"
              items={WHEEL_ITEMS}
              defaultSelected={selectedIndex}
              textColor="#a6a6a6"
              activeColor="#ffffff"
              side="left"
              fontSize={3}
              spacing={1.4}
              curve={1}
              tilt={6}
              blur={2}
              fade={0.25}
              smoothing={200}
              inset={80}
              loop
              draggable
              soundUrl="/assets/sounds/click-soft.mp3"
              soundVolume={0.5}
              onChange={(index) => setSelectedIndex(index)}
            />
          </div>
        </div>

        <div className="px-6 py-6 lg:px-10 lg:py-8 pb-[180px] lg:pb-8">
          <div className="lg:hidden mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase no-underline transition-all duration-300"
              style={{ color: textSecondary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = textPrimary}
              onMouseLeave={e => e.currentTarget.style.color = textSecondary}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back
            </button>
          </div>
          <h1 className="font-mono font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: textPrimary }}>
            {project.title}
          </h1>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="fixed top-6 right-6 lg:top-8 lg:right-10 z-30 flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm border transition-all duration-200 hover:scale-105 font-mono text-xs tracking-wider"
              style={{
                color: textPrimary,
                background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                borderColor: cardBorder,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = textSecondary }}
              onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = cardBorder }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View Repository</span>
            </a>
          )}

          <div className="flex flex-wrap gap-x-10 gap-y-3 mb-8">
            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: textMuted }}>Type</span>
              <span className="font-mono text-sm" style={{ color: textPrimary }}>{project.type}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: textMuted }}>Role</span>
              <span className="font-mono text-sm" style={{ color: textPrimary }}>{project.role}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: textMuted }}>Date</span>
              <span className="font-mono text-sm" style={{ color: textPrimary }}>{project.date}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, i) => (
              <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded border-dashed border" style={{ borderColor: textSecondary, color: textSecondary }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="w-full h-px mb-8" style={{ background: cardBorder }} />

          <ScrambledText className="font-mono text-sm leading-relaxed mb-8" style={{ color: textSecondary }}>
            {project.description}
          </ScrambledText>

          <div className="w-full h-px mb-8" style={{ background: cardBorder }} />

          <DetailCarousel images={project.gallery} isDark={isDark} cardBorder={cardBorder} textMuted={textMuted} />

          <div className="w-full h-px mb-8" style={{ background: cardBorder }} />

          <div className="mb-8">
            <span className="font-mono text-[10px] tracking-widest uppercase block mb-3" style={{ color: textMuted }}>My Contributions</span>
            <ul className="font-mono text-sm leading-relaxed space-y-2" style={{ color: textSecondary }}>
              {project.contributions.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: textMuted }}>—</span>
                  <ScrambledText>{c}</ScrambledText>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px mb-8" style={{ background: cardBorder }} />

          <div>
            <span className="font-mono text-[10px] tracking-widest uppercase block mb-3" style={{ color: textMuted }}>Demo Video</span>
            <div className="w-full rounded-xl flex items-center justify-center" style={{ aspectRatio: '16 / 9', border: `1px solid ${cardBorder}`, background: isDark ? '#1a1a1a' : '#ffffff' }}>
              <div className="flex flex-col items-center gap-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span className="font-mono text-xs" style={{ color: textMuted }}>Demo video coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage
