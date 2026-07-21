import { useMemo } from 'react'
import Particles from './Particles'
import CircularGallery from './CircularGallery'
import MagicBento from './MagicBento'

function VideoPlaceholder({ isDark }) {
  const borderColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const textMuted = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)'

  return (
    <div
      className="w-full rounded-xl flex items-center justify-center"
      style={{
        aspectRatio: '16 / 9',
        border: `1px solid ${borderColor}`,
        background: isDark ? '#1a1a1a' : '#ffffff',
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span className="font-mono text-xs" style={{ color: textMuted }}>Demo video coming soon</span>
      </div>
    </div>
  )
}

function ProjectSection({ project, isDark }) {
  const textPrimary   = isDark ? '#ffffff'                : '#111111'
  const textSecondary = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const textMuted     = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)'
  const cardBorder    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'

  const galleryItems = useMemo(() => (
    project.gallery.map(src => ({ image: src, text: '' }))
  ), [project.gallery])

  const cardColor = isDark ? '#111111' : '#ffffff'

  const bentoItems = useMemo(() => [
    { id: 'title',        colSpan: 3, aspectRatio: 'auto', minH: 'auto', color: cardColor },
    { id: 'details',      colSpan: 1, aspectRatio: 'auto', minH: 'auto', color: cardColor },
    { id: 'video',        colSpan: 2, rowSpan: 2, aspectRatio: 'auto', minH: 'auto', color: cardColor },
    { id: 'about',        colSpan: 2, aspectRatio: 'auto', minH: 'auto', color: cardColor },
    { id: 'techstack',    colSpan: 2, aspectRatio: 'auto', minH: 'auto', color: cardColor },
    { id: 'contribution', colSpan: 2, aspectRatio: 'auto', minH: 'auto', color: cardColor },
    { id: 'github',       colSpan: 2, aspectRatio: 'auto', minH: 'auto', color: cardColor },
  ], [cardColor])

  return (
    <section className="w-full py-20 lg:py-28" style={{ borderBottom: `1px solid ${cardBorder}` }}>

      {/* 1. CAROUSEL — full width */}
      <div className="w-screen relative left-1/2 -translate-x-1/2" style={{ height: 'clamp(300px, 56.25vw, 85vh)' }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          textColor="#ffffff"
          borderRadius={0.08}
          scrollEase={0.08}
          scrollSpeed={0.8}
        />
      </div>

      {/* 2. CONTENT — MagicBento multi-card grid (full width) */}
      <div
        className="w-full magicbento-fullwidth"
        style={{
          '--background-dark': isDark ? '#111111' : '#ffffff',
          '--border-color': isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
          '--purple-primary': isDark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
          '--purple-glow': isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          '--purple-border': isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
        }}
      >
        <MagicBento
          items={bentoItems}
        renderCard={(card) => {
          if (card.id === 'title') {
            return (
              <div className="flex items-center w-full h-full">
                <h2
                  className="font-mono font-bold leading-tight"
                  style={{
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                    color: textPrimary,
                  }}
                >
                  {project.title}
                </h2>
              </div>
            )
          }
          if (card.id === 'details') {
            return (
              <div className="flex flex-col items-end justify-center gap-2 w-full h-full">
                <div className="text-right">
                  <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: textMuted }}>Role</span>
                  <span className="font-mono text-[11px]" style={{ color: textPrimary }}>{project.role}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: textMuted }}>Type</span>
                  <span className="font-mono text-[11px]" style={{ color: textPrimary }}>{project.type}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] tracking-widest uppercase block" style={{ color: textMuted }}>Date</span>
                  <span className="font-mono text-[11px]" style={{ color: textPrimary }}>{project.date}</span>
                </div>
              </div>
            )
          }
          if (card.id === 'video') {
            return (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>Watch Demo</span>
                </div>
                {project.videoUrl ? (
                  <video src={project.videoUrl} controls className="w-full rounded-lg" style={{ aspectRatio: '16 / 9' }} />
                ) : (
                  <VideoPlaceholder isDark={isDark} />
                )}
              </div>
            )
          }
          if (card.id === 'about') {
            return (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>The Story</span>
                </div>
                <p className="font-mono text-sm leading-relaxed" style={{ color: textSecondary }}>
                  {project.description}
                </p>
              </div>
            )
          }
          if (card.id === 'techstack') {
            return (
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border-dashed border" style={{ borderColor: textSecondary, color: textSecondary }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          }
          if (card.id === 'contribution') {
            return (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>What I Did</span>
                </div>
                <p className="font-mono text-sm leading-relaxed" style={{ color: textSecondary }}>
                  {project.contribution}
                </p>
              </div>
            )
          }
          if (card.id === 'github') {
            return (
              <div className="flex flex-col gap-3 w-full">
                <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: textMuted }}>Open with</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={project.githubUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[11px] no-underline transition-all duration-200 border"
                    style={{
                      borderColor: textSecondary,
                      color: textPrimary,
                      background: 'transparent',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            )
          }
          return null
        }}
        textAutoHide={false}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor={isDark ? "255, 255, 255" : "0, 0, 0"}
        disableAnimations={false}
      />
      </div>
    </section>
  )
}

function ProjectPage({ projects, isDark, onBack }) {
  const textPrimary   = isDark ? '#ffffff'                : '#111111'
  const textSecondary = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const cardBorder    = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" style={{ background: isDark ? '#111111' : '#f5f5f5' }}>
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

      <div className="relative z-10 w-full min-h-screen px-6 sm:px-12 md:px-16 lg:px-24 py-8 pb-32">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase no-underline transition-all duration-300 mb-8"
          style={{ color: textSecondary, background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = textPrimary}
          onMouseLeave={e => e.currentTarget.style.color = textSecondary}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Home
        </button>

        <h1
          className="font-mono font-bold mb-2"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: textPrimary, letterSpacing: '-0.02em' }}
        >
          All Projects
        </h1>
        <div className="w-16 h-px mb-16" style={{ background: cardBorder }} />

        <style>{`.magicbento-fullwidth .bento-section { max-width: 100% !important; }`}</style>

        {projects.map((project, i) => (
          <ProjectSection key={i} project={project} isDark={isDark} />
        ))}
      </div>
    </div>
  )
}

export default ProjectPage
