import { useEffect, useRef, useState } from 'react'

export default function CertPreview({ cert, mouseX, mouseY, visible, isDark }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [cardWidth, setCardWidth] = useState(380)

  useEffect(() => {
    const onResize = () => setCardWidth(window.innerWidth < 640 ? Math.min(window.innerWidth - 32, 380) : 380)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!ref.current) return
    const { height } = ref.current.getBoundingClientRect()
    const padding = 20
    const w = cardWidth
    let x = mouseX + padding
    let y = mouseY + padding

    if (x + w > window.innerWidth - padding) x = mouseX - w - padding
    if (y + height > window.innerHeight - padding) y = mouseY - height - padding
    if (x < padding) x = padding
    if (y < padding) y = padding

    setPos({ x, y })
  }, [mouseX, mouseY, cardWidth])

  const cardBg     = isDark ? '#1a1a1a'                : '#ffffff'
  const cardBorder = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'
  const textPrimary   = isDark ? '#ffffff'                : '#111111'
  const textSecondary = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)'
  const textMuted     = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)'
  const tagBg         = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'

  const categoryColor = {
    'Award':          { bg: 'rgba(234,179,8,0.15)',  border: 'rgba(234,179,8,0.4)',  text: '#eab308' },
    'Academic Honor': { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: '#3b82f6' },
    'Scholarship':    { bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.4)',  text: '#22c55e' },
  }
  const cat = categoryColor[cert?.category] ?? categoryColor['Award']

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: pos.y,
        left: pos.x,
        zIndex: 9999,
        width: cardWidth + 'px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0px)' : 'scale(0.95) translateY(6px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: 'none',
        borderRadius: '16px',
        overflow: 'hidden',
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: isDark
          ? '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 24px 48px rgba(0,0,0,0.15)',
      }}
    >
      {/* Image */}
      <div className="relative w-full" style={{ height: cardWidth < 380 ? '140px' : '205px' }}>
        <img
          src={cert?.image ?? 'https://placehold.co/260x140/111111/333333?text=Preview'}
          alt={cert?.name}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
        />
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span
            className="font-mono text-xs px-2.5 py-1 rounded-full"
            style={{
              background: cat.bg,
              border: `1px solid ${cat.border}`,
              color: cat.text,
              backdropFilter: 'blur(8px)',
            }}
          >
            {cert?.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.5)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {cert?.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        <span className="font-mono text-sm font-bold leading-snug" style={{ color: textPrimary }}>
          {cert?.name}
        </span>
        <span className="font-mono text-xs leading-relaxed" style={{ color: textSecondary }}>
          {cert?.detail}
        </span>
        {cert?.gwa && (
          <div
            className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg"
            style={{ background: tagBg, border: `1px solid ${cardBorder}` }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              <polyline points="16 7 22 7 22 13"/>
            </svg>
            <span className="font-mono text-xs font-semibold" style={{ color: textPrimary }}>
              {cert?.gwa}
            </span>
            <span className="font-mono text-xs ml-auto" style={{ color: textMuted }}>GWA</span>
          </div>
        )}
      </div>
    </div>
  )
}