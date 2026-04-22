import { useState } from 'react'
import { Link } from 'react-router-dom'

const designs = [
  {
    id: 1,
    name: 'Modern & Technisch',
    tag: 'Huidig concept',
    desc: 'Het huidige concept: donkerblauw met oranje accenten, zwevende deeltjes-animatie in de hero en strakke productkaarten.',
    font: 'DM Sans',
    preview: {
      header: '#003366', headerAccent: '#FF6600',
      hero: 'linear-gradient(135deg, #001a33 0%, #003366 100%)',
      heroText: '#ffffff', card: '#ffffff', cardBorder: '#e2e8f0',
      accent: '#FF6600',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
  {
    id: 4,
    name: 'Donker & Futuristisch',
    tag: 'Dark mode',
    desc: 'Bijna-zwarte achtergrond met cyaanblauwe gloeiplekken, Rajdhani lettertype en een professioneel technisch karakter.',
    font: 'Rajdhani',
    preview: {
      header: '#060C18', headerAccent: '#FF6600',
      hero: 'linear-gradient(135deg, #060C18 0%, #0a1628 100%)',
      heroText: '#c8d8f0', card: '#0a1428', cardBorder: '#1a2a4a',
      accent: '#FF6600',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
  {
    id: 5,
    name: 'Modern & Krachtig',
    tag: 'Bold modern',
    desc: 'Poppins lettertype, grote typografische statements, strak wit met sterke oranje en blauwe accenten.',
    font: 'Poppins',
    preview: {
      header: '#ffffff', headerAccent: '#FF6600',
      hero: 'linear-gradient(135deg, #003366 0%, #004488 100%)',
      heroText: '#ffffff', card: '#f8faff', cardBorder: '#e0e8f8',
      accent: '#FF6600',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
  {
    id: 6,
    name: 'Warm & Vriendelijk',
    tag: 'Organic stijl',
    desc: 'Warme crèmekleur, afgeronde hoeken, zachte schaduwen, Nunito lettertype en een uitnodigende sfeer.',
    font: 'Nunito',
    preview: {
      header: '#ffffff', headerAccent: '#FF6600',
      hero: 'linear-gradient(135deg, #FFF8F2 0%, #FFE4CC 100%)',
      heroText: '#1e2d45', card: '#ffffff', cardBorder: '#ffe0c8',
      accent: '#FF6B2C',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
  {
    id: 7,
    name: 'Premium & Overtuigend',
    tag: 'High-conversion',
    desc: 'Afwisselende volle donkerblauwe en witte secties, krachtige calls-to-action en prominente vertrouwenssignalen.',
    font: 'Plus Jakarta Sans',
    preview: {
      header: '#001833', headerAccent: '#FF6600',
      hero: 'linear-gradient(160deg, #001226 0%, #001E3C 100%)',
      heroText: '#ffffff', card: '#f8faff', cardBorder: '#e0e8f8',
      accent: '#FF6600',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
]

const pageColors = {
  'Home': '#FF6600',
  'Merken': '#003366',
  'Producten': '#2563eb',
  'Over ons': '#7c3aed',
  'Contact': '#059669',
}

function MiniPreview({ p, activePage = 'Home' }) {
  return (
    <div style={{
      width: '100%', height: 148, borderRadius: 10, overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)', flexShrink: 0,
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        height: 22, background: p.header,
        borderBottom: `2px solid ${p.headerAccent}`,
        display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6,
      }}>
        <div style={{ width: 22, height: 10, background: p.header === '#ffffff' ? '#003366' : '#fff', borderRadius: 3, opacity: 0.85 }} />
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {['Home', 'Merken', 'Producten', 'Over ons', 'Contact'].map((pg, i) => (
            <div key={i} style={{
              width: pg === activePage ? 32 : 26, height: 5,
              background: pg === activePage ? p.headerAccent : (p.header === '#ffffff' ? 'rgba(0,51,102,0.25)' : 'rgba(255,255,255,0.3)'),
              borderRadius: 2,
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
        <div style={{ width: 40, height: 13, background: p.headerAccent, borderRadius: 7 }} />
      </div>

      {activePage === 'Home' && (
        <>
          <div style={{ height: 62, background: p.hero, padding: '10px 12px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '55%', height: 9, background: p.heroText, opacity: 0.7, borderRadius: 3, marginBottom: 5 }} />
            <div style={{ width: '38%', height: 7, background: p.heroText, opacity: 0.35, borderRadius: 3, marginBottom: 10 }} />
            <div style={{ width: 44, height: 16, background: p.accent, borderRadius: 5 }} />
            {p.hero.includes('#060C18') && (
              <div style={{ position: 'absolute', right: 10, top: 8, width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,255,0.25), transparent)' }} />
            )}
          </div>
          <div style={{ height: 64, background: p.card, padding: '8px 10px', display: 'flex', gap: 6 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 5, background: i === 0 ? p.accent : p.cardBorder, opacity: i === 0 ? 0.18 : 0.4 }} />
            ))}
          </div>
        </>
      )}

      {activePage === 'Merken' && (
        <>
          <div style={{ height: 30, background: p.hero, padding: '8px 12px' }}>
            <div style={{ width: '40%', height: 8, background: p.heroText, opacity: 0.6, borderRadius: 3 }} />
          </div>
          <div style={{ height: 96, background: p.card, padding: '10px 12px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ width: 'calc(50% - 4px)', height: 38, borderRadius: 6, background: p.cardBorder, opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '60%', height: 6, background: p.accent, opacity: 0.4, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </>
      )}

      {activePage === 'Producten' && (
        <>
          <div style={{ height: 20, background: p.hero, padding: '6px 12px' }}>
            <div style={{ width: '35%', height: 7, background: p.heroText, opacity: 0.5, borderRadius: 3 }} />
          </div>
          <div style={{ height: 106, background: p.card, padding: '8px 10px', display: 'flex', gap: 6 }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 6, border: `1px solid ${p.cardBorder}`, padding: '6px', overflow: 'hidden' }}>
                <div style={{ height: 40, background: p.cardBorder, borderRadius: 3, marginBottom: 4, opacity: 0.5 }} />
                <div style={{ height: 5, background: p.accent, borderRadius: 2, marginBottom: 3, width: '70%', opacity: 0.7 }} />
                <div style={{ height: 4, background: p.cardBorder, borderRadius: 2, marginBottom: 2, opacity: 0.5 }} />
                <div style={{ height: 7, background: p.accent, borderRadius: 2, width: '50%', opacity: 0.9 }} />
              </div>
            ))}
          </div>
        </>
      )}

      {activePage === 'Over ons' && (
        <>
          <div style={{ height: 20, background: p.hero, padding: '6px 12px' }}>
            <div style={{ width: '30%', height: 7, background: p.heroText, opacity: 0.5, borderRadius: 3 }} />
          </div>
          <div style={{ height: 106, background: p.card, padding: '10px 12px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              {[80, 60, 70, 50].map((w, i) => (
                <div key={i} style={{ height: 5, background: p.cardBorder, borderRadius: 2, width: `${w}%`, marginBottom: 4, opacity: 0.6 }} />
              ))}
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ background: p.accent, borderRadius: 5, opacity: 0.15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '50%', height: 8, background: p.accent, borderRadius: 2, opacity: 0.8 }} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activePage === 'Contact' && (
        <>
          <div style={{ height: 20, background: p.hero, padding: '6px 12px' }}>
            <div style={{ width: '28%', height: 7, background: p.heroText, opacity: 0.5, borderRadius: 3 }} />
          </div>
          <div style={{ height: 106, background: p.card, padding: '10px 12px', display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{ height: 12, background: p.cardBorder, borderRadius: 4, marginBottom: 5, opacity: 0.5 }} />
              ))}
              <div style={{ height: 22, background: p.cardBorder, borderRadius: 4, opacity: 0.4 }} />
            </div>
            <div style={{ flex: 1 }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ height: 5, background: p.cardBorder, borderRadius: 2, marginBottom: 4, width: `${[90, 70, 80, 60][i]}%`, opacity: 0.5 }} />
              ))}
              <div style={{ width: 36, height: 14, background: p.accent, borderRadius: 4, marginTop: 8 }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function DesignCard({ design: d }) {
  const [activePage, setActivePage] = useState('Home')

  return (
    <Link to={`/design/${d.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.045)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 18,
          overflow: 'hidden',
          transition: 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          cursor: 'pointer',
          height: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.borderColor = 'rgba(255,102,0,0.45)'
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)'
          e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.045)'
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ padding: '14px 14px 0' }}>
          <MiniPreview p={d.preview} activePage={activePage} />
        </div>

        {/* Page tabs */}
        <div style={{ padding: '10px 14px 0', display: 'flex', gap: 4, flexWrap: 'wrap' }}
          onClick={e => e.preventDefault()}>
          {d.pages.map(pg => (
            <button
              key={pg}
              onClick={e => { e.preventDefault(); e.stopPropagation(); setActivePage(pg) }}
              style={{
                fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 50,
                border: `1px solid ${activePage === pg ? pageColors[pg] : 'rgba(255,255,255,0.12)'}`,
                background: activePage === pg ? `${pageColors[pg]}22` : 'transparent',
                color: activePage === pg ? pageColors[pg] : 'rgba(255,255,255,0.35)',
                cursor: 'pointer', transition: 'all 0.18s',
                letterSpacing: '0.03em',
              }}
            >
              {pg}
            </button>
          ))}
        </div>

        <div style={{ padding: '14px 20px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <span style={{
                display: 'inline-block', marginBottom: 8,
                background: 'rgba(255,102,0,0.18)', color: '#FF9944',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', padding: '3px 10px', borderRadius: 9999,
              }}>{d.tag}</span>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, lineHeight: 1.2, color: '#fff' }}>
                {d.name}
              </h3>
            </div>
            <div style={{
              flexShrink: 0, marginLeft: 12, width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
            }}>{d.id}</div>
          </div>

          <p style={{ margin: '0 0 14px', fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>
            {d.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>{d.font}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FF9944', fontSize: 13, fontWeight: 700 }}>
              Bekijk design
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const webshopDesigns = [
  {
    id: 2,
    name: 'Webshop Concept 1',
    tag: 'Click & Collect',
    desc: 'Strak wit design met Manrope-lettertype. Winkelwagen, checkout met afhaalplanning en bevestigingspagina. Betalen bij afhalen.',
    font: 'Manrope',
    preview: {
      header: '#ffffff', headerAccent: '#FF6600',
      hero: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)',
      heroText: '#ffffff', card: '#F8FAFC', cardBorder: '#E2E8F0',
      accent: '#FF6600',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
  {
    id: 3,
    name: 'Webshop Concept 2',
    tag: 'Dark Premium',
    desc: 'Donker premium design met Outfit-lettertype. Cart drawer, spec modal, 2-staps checkout. Alleen afhalen in Dordrecht.',
    font: 'Outfit',
    preview: {
      header: '#111827', headerAccent: '#FF6600',
      hero: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
      heroText: '#F9FAFB', card: '#1F2937', cardBorder: '#374151',
      accent: '#FF6600',
    },
    pages: ['Home', 'Merken', 'Producten', 'Over ons', 'Contact'],
  },
]

export default function Dashboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #001328 0%, #002855 60%, #001A40 100%)',
      fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
      <div style={{ position: 'fixed', top: '-20vh', right: '-10vw', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,51,102,0.45) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-15vh', left: '-8vw', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,102,0,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '52px 24px 88px' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
            <div style={{ width: 44, height: 44, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <img src="/logo.png" alt="" style={{ width: 34, height: 34, objectFit: 'contain' }} onError={e => { e.target.style.display = 'none' }} />
            </div>
            <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Airco<span style={{ color: '#FF6600' }}>Stunt</span>
            </span>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.3)',
            borderRadius: 9999, padding: '5px 16px', fontSize: 11,
            letterSpacing: '0.12em', color: '#FF9944', marginBottom: 24, textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6600', display: 'inline-block' }} />
            7 unieke websiteconcepten voor aircostunt.com
          </div>

          <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 38px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em' }}>
            Welk websiteontwerp past het beste bij AircoStunt?
          </h1>
          <p style={{ fontSize: 16, opacity: 0.55, maxWidth: 560, margin: '0 auto', lineHeight: 1.75 }}>
            Hieronder staan 7 volledig uitgewerkte websiteconcepten — waarvan 2 werkende webshops met winkelwagen en checkout. Klik op een pagina-tab om de preview te wisselen, of klik op de kaart om het volledige design te bekijken.
          </p>
        </header>

        {/* Designs section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
            Zonder webshop
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Designs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18, marginBottom: 80 }}>
          {designs.map(d => <DesignCard key={d.id} design={d} />)}
        </div>

        {/* Webshop section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
            Werkende webshop — alleen afhalen
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          padding: '32px 32px 36px',
          marginBottom: 24,
        }}>
          <div style={{ marginBottom: 28, maxWidth: 680 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.3)',
              borderRadius: 9999, padding: '4px 14px', fontSize: 11,
              letterSpacing: '0.1em', color: '#FF9944', marginBottom: 14, textTransform: 'uppercase',
            }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 1 1-4 0M9 21a2 2 0 1 1-4 0" /></svg>
              Volledig werkende webshop — direct klikbaar
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 800, marginBottom: 10, letterSpacing: '-0.02em' }}>
              Bestellen & afhalen in Dordrecht
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
              Twee volledig uitgewerkte webshop-concepten met werkende winkelwagen, checkout en bevestigingspagina. Klanten kiezen een afhaaltijdstip en betalen bij afhalen. Geen verzending via PostNL.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
            {webshopDesigns.map(d => <DesignCard key={d.id} design={d} />)}
          </div>
        </div>

      </div>
    </div>
  )
}
