import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const BRAND_COLORS = {
  'daikin':              { from: '#0067B1', to: '#004d88', light: 'rgba(0,103,177,0.08)' },
  'mitsubishi-heavy':    { from: '#CC1B1B', to: '#991414', light: 'rgba(204,27,27,0.08)' },
  'mitsubishi-electric': { from: '#CC1B1B', to: '#991414', light: 'rgba(204,27,27,0.08)' },
  'samsung':             { from: '#1428A0', to: '#0d1c78', light: 'rgba(20,40,160,0.08)' },
  'lg':                  { from: '#A50034', to: '#7a0026', light: 'rgba(165,0,52,0.08)'  },
}

const BRAND_FEATURES = {
  'daikin':              ['Stille werking', 'WiFi inbegrepen', 'Hoge energiezuinigheid', 'FTXC-serie bestseller'],
  'mitsubishi-heavy':    ['Robuust & betrouwbaar', 'Intensief gebruik', 'Lange levensduur', 'Workhorses'],
  'mitsubishi-electric': ['Ultra stil', 'WiFi + zelfreinigend filter', 'Premium MSZ-HR serie', 'A-merken kwaliteit'],
  'samsung':             ['WindFree technologie', 'Geen directe luchtstroom', 'Slimme functies', 'Modern design'],
  'lg':                  ['Fluisterstil', 'A++ / A+++ energielabel', 'Compact formaat', 'LG Dualcool'],
}

const MODAL_CSS = `
@keyframes bm-backdrop {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes bm-card {
  from { opacity: 0; transform: scale(0.86) translateY(36px); filter: blur(8px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);    filter: blur(0);   }
}
@keyframes bm-logo {
  0%   { opacity: 0; transform: scale(0.55) rotate(-14deg); }
  65%  { transform: scale(1.1)  rotate(3deg);  }
  100% { opacity: 1; transform: scale(1)    rotate(0deg);   }
}
@keyframes bm-title {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}
@keyframes bm-badge {
  from { opacity: 0; transform: scale(0.75) translateY(10px); }
  to   { opacity: 1; transform: scale(1)    translateY(0);    }
}
@keyframes bm-cta {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.bm-backdrop { animation: bm-backdrop 0.28s ease both; }
.bm-card     { animation: bm-card    0.48s cubic-bezier(0.34,1.56,0.64,1) both; }
.bm-logo     { animation: bm-logo    0.62s cubic-bezier(0.34,1.56,0.64,1) 0.08s both; }
.bm-title    { animation: bm-title   0.44s cubic-bezier(0.32,0.72,0,1)   0.18s both; }
.bm-desc     { animation: bm-title   0.44s cubic-bezier(0.32,0.72,0,1)   0.27s both; }
.bm-badges   { animation: bm-title   0.44s cubic-bezier(0.32,0.72,0,1)   0.32s both; }
.bm-badge    { animation: bm-badge   0.38s cubic-bezier(0.34,1.56,0.64,1) both; }
.bm-badge:nth-child(1) { animation-delay: 0.34s; }
.bm-badge:nth-child(2) { animation-delay: 0.42s; }
.bm-badge:nth-child(3) { animation-delay: 0.50s; }
.bm-badge:nth-child(4) { animation-delay: 0.58s; }
.bm-cta      { animation: bm-cta     0.44s cubic-bezier(0.32,0.72,0,1)   0.52s both; }
`

function BrandModal({ brand, onClose }) {
  const color    = BRAND_COLORS[brand.id]    || { from: '#003366', to: '#001a33', light: 'rgba(0,51,102,0.08)' }
  const features = BRAND_FEATURES[brand.id] || []

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="bm-backdrop fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', zIndex: 9999 }}
      onClick={onClose}
    >
      <style dangerouslySetInnerHTML={{ __html: MODAL_CSS }} />

      {/* Modal card */}
      <div
        className="bm-card relative w-full sm:max-w-lg overflow-hidden"
        style={{ borderRadius: '28px 28px 0 0', maxHeight: '92vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* On desktop: fully rounded */}
        <style>{`@media(min-width:640px){.bm-card{border-radius:28px!important;max-height:88vh!important;}}`}</style>

        {/* Gradient header */}
        <div
          className="relative flex flex-col items-center px-6 pt-10 pb-14"
          style={{ background: `linear-gradient(145deg, ${color.from} 0%, ${color.to} 100%)` }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.15)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Large logo */}
          <div
            className="bm-logo w-28 h-28 bg-white rounded-2xl flex items-center justify-center mb-5 p-4"
            style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.25)' }}
          >
            {brand.logo
              ? <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" style={{ mixBlendMode: 'multiply' }} />
              : <span className="text-2xl font-bold" style={{ color: color.from }}>{brand.name[0]}</span>
            }
          </div>

          <h2 className="bm-title text-white text-2xl sm:text-3xl font-bold tracking-tight text-center">{brand.name}</h2>
        </div>

        {/* White content — overlaps gradient with rounded top */}
        <div className="bg-white px-6 sm:px-8 pt-8 pb-8" style={{ marginTop: -20, borderRadius: '24px 24px 0 0' }}>

          {/* Full description */}
          <p className="bm-desc text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
            {brand.description}
          </p>

          {/* Feature badges */}
          {features.length > 0 && (
            <div className="bm-badges flex flex-wrap gap-2 mb-7">
              {features.map(f => (
                <span
                  key={f}
                  className="bm-badge inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: color.light, color: color.from }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="bm-cta">
            <Link
              to="../producten"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full text-white font-bold text-base py-4 rounded-2xl transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                boxShadow: `0 8px 28px ${color.from}55`,
                transition: 'opacity 0.2s, transform 0.15s',
              }}
            >
              Bekijk {brand.name} producten
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function BrandCard({ brand, onOpen }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <button
      ref={ref}
      onClick={() => onOpen(brand)}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} frost-card group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
    >
      {/* Logo */}
      <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden p-3 transition-colors duration-300 group-hover:bg-primary/5">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-20 max-w-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            style={{ mixBlendMode: 'multiply' }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full img-placeholder-light rounded-xl flex items-center justify-center">
            <span className="text-primary font-bold text-xl tracking-wide">{brand.name}</span>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-bold text-primary text-lg mb-2">{brand.name}</h3>

      {/* Truncated description */}
      {brand.description && (
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-3">{brand.description}</p>
      )}

      {/* "Meer lezen" hint */}
      <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold mt-auto opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
        Meer lezen
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </span>
    </button>
  )
}

export default function Brands({ brands }) {
  const [sectionRef, sectionVisible] = useIntersectionObserver()
  const [selected, setSelected] = useState(null)

  return (
    <>
      {selected && <BrandModal brand={selected} onClose={() => setSelected(null)} />}

      <section id="merken" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div
            ref={sectionRef}
            className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-14`}
          >
            <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              A-merken
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Onze Merken</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Klik op een merk om meer te lezen over de kwaliteit en technologie.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 stagger-children">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
