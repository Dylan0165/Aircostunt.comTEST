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
  },
  {
    id: 2,
    name: 'Redactioneel & Magazine',
    tag: 'Editorial stijl',
    desc: 'Playfair Display serif, asymmetrische kolommen, crème achtergrond en een chique magazine-uitstraling.',
    font: 'Playfair Display',
    preview: {
      header: '#F7F2E8', headerAccent: '#FF6600',
      hero: 'linear-gradient(90deg, #F5EDD8 0%, #fff 100%)',
      heroText: '#1a1208', card: '#ffffff', cardBorder: '#e8e0d0',
      accent: '#FF6600',
    },
  },
  {
    id: 3,
    name: 'Ultra Minimaal',
    tag: 'Premium wit',
    desc: 'Veel witruimte, Cormorant Garamond lettertype, haarfijne gouden lijnen en een spaarzame, luxueuze uitstraling.',
    font: 'Cormorant Garamond',
    preview: {
      header: '#ffffff', headerAccent: '#003366',
      hero: 'linear-gradient(180deg, #fafaf7 0%, #f0ede6 100%)',
      heroText: '#1c1c1c', card: '#fafaf7', cardBorder: '#e8e0cc',
      accent: '#003366',
    },
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
  },
]

function MiniPreview({ p }) {
  return (
    <div style={{
      width: '100%', height: 148, borderRadius: 10, overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)', flexShrink: 0,
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Mini header */}
      <div style={{
        height: 22, background: p.header,
        borderBottom: `2px solid ${p.headerAccent}`,
        display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6,
      }}>
        <div style={{ width: 22, height: 10, background: p.header === '#ffffff' ? '#003366' : '#fff', borderRadius: 3, opacity: 0.85 }} />
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[38, 32, 44, 36].map((w, i) => (
            <div key={i} style={{ width: w, height: 6, background: p.header === '#ffffff' ? 'rgba(0,51,102,0.25)' : 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ width: 48, height: 14, background: p.headerAccent, borderRadius: 8 }} />
      </div>
      {/* Mini hero */}
      <div style={{ height: 62, background: p.hero, padding: '10px 12px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: '55%', height: 9, background: p.heroText, opacity: 0.7, borderRadius: 3, marginBottom: 5 }} />
        <div style={{ width: '38%', height: 7, background: p.heroText, opacity: 0.35, borderRadius: 3, marginBottom: 10 }} />
        <div style={{ width: 44, height: 16, background: p.accent, borderRadius: 5 }} />
        {p.hero.includes('#060C18') && (
          <div style={{ position: 'absolute', right: 10, top: 8, width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,255,0.25), transparent)' }} />
        )}
      </div>
      {/* Mini content strip */}
      <div style={{ height: 64, background: p.card, padding: '8px 10px', display: 'flex', gap: 6 }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: 5,
            background: i === 0 ? p.accent : p.cardBorder,
            opacity: i === 0 ? 0.18 : 0.4,
          }} />
        ))}
      </div>
    </div>
  )
}

function DesignCard({ design: d }) {
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
        {/* Preview thumbnail */}
        <div style={{ padding: '14px 14px 0' }}>
          <MiniPreview p={d.preview} />
        </div>

        <div style={{ padding: '18px 20px 20px' }}>
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
          {/* Logo */}
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
            Hieronder staan 7 volledig uitgewerkte websiteconcepten. Elk ontwerp heeft alle pagina's (Home, Merken, Producten, Over ons en Contact) met werkende navigatie, echte producten en klantreviews. Klik op een kaart om het volledige design te bekijken.
          </p>
        </header>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 18 }}>
          {designs.map(d => <DesignCard key={d.id} design={d} />)}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: 72, opacity: 0.3, fontSize: 12, lineHeight: 1.8 }}>
          <p>AircoStunt · Veerplaat 10, Dordrecht · 06-147 00 753 · info@aircostunt.com</p>
          <p>Alle designs zijn responsief en direct deploybaar via Vercel</p>
        </div>
      </div>
    </div>
  )
}
