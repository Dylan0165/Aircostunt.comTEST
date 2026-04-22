import { Link } from 'react-router-dom'

const designs = [
  {
    id: 1,
    name: 'Modern & Technisch',
    tag: 'Huidig concept',
    desc: 'Professioneel donkerblauw met oranje accenten, zweefde deeltjes-animatie in de hero en strakke productkaarten met frosted-glass hover.',
    palette: ['#003366', '#FF6600', '#004488', '#E8F0F8'],
    font: 'DM Sans',
  },
  {
    id: 2,
    name: 'Redactioneel & Magazine',
    tag: 'Editorial',
    desc: 'Playfair Display serif, asymmetrische kolommen, crème-achtergrond en een chique magazine-uitstraling met redactionele typografische hiërarchie.',
    palette: ['#1A0F06', '#FF6600', '#F5EDD8', '#003366'],
    font: 'Playfair Display',
  },
  {
    id: 3,
    name: 'Ultra Minimaal',
    tag: 'Premium Wit',
    desc: 'Veel witruimte, Cormorant Garamond lettertype, haarfijne goudgele lijnen en een spaarzame spa-uitstraling voor het premium segment.',
    palette: ['#FFFFFF', '#003366', '#C4924A', '#F5F5F0'],
    font: 'Cormorant Garamond',
  },
  {
    id: 4,
    name: 'Donker & Futuristisch',
    tag: 'Tech Dark Mode',
    desc: 'Bijna-zwarte achtergrond met cyaanblauwe gloeiplekken, Rajdhani lettertype en technische detail-stijl voor een high-tech sfeer.',
    palette: ['#080D1A', '#00C8FF', '#FF6600', '#0F2040'],
    font: 'Rajdhani',
  },
  {
    id: 5,
    name: 'Bold & Brutalistisch',
    tag: 'Dutch Brutalist',
    desc: 'Nederlandse grafische traditie: zware Anton-typografie, harde oranje en blauwe blokken, dikke randen en directe eerlijke boodschap.',
    palette: ['#FFFFFF', '#003366', '#FF6600', '#000000'],
    font: 'Anton',
  },
  {
    id: 6,
    name: 'Warm & Vriendelijk',
    tag: 'Organic & Cozy',
    desc: 'Warme crèmekleur, afgeronde hoeken, zachte schaduwen, Nunito lettertype en een uitnodigende buurtwinkel-sfeer die vertrouwen wekt.',
    palette: ['#FFF8F2', '#1B4F8A', '#FF6B2C', '#FFE4CC'],
    font: 'Nunito',
  },
  {
    id: 7,
    name: 'Premium & Overtuigend',
    tag: 'High-Conversion',
    desc: 'Afwisselende volle secties in donkerblauw en wit, krachtige CTA-knoppen, prominente vertrouwenssignalen en een sterk conversiegericht ontwerp.',
    palette: ['#001833', '#FFFFFF', '#FF6600', '#E8F4FF'],
    font: 'Plus Jakarta Sans',
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
      {/* Animated grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Glow orbs */}
      <div style={{ position: 'fixed', top: '-20vh', right: '-10vw', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,51,102,0.5) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20vh', left: '-10vw', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,102,0,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1320, margin: '0 auto', padding: '56px 24px 96px' }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: 80 }}>
          <img
            src="https://www.aircostunt.com/wp-content/uploads/2023/02/59395A75-35F5-4A35-8E23-E0CC5A75E259.png"
            alt="AircoStunt"
            onError={e => { e.target.style.display = 'none' }}
            style={{ height: 56, marginBottom: 32, filter: 'brightness(0) invert(1)' }}
          />
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,102,0,0.12)', border: '1px solid rgba(255,102,0,0.35)',
            borderRadius: 9999, padding: '6px 18px', fontSize: 12,
            letterSpacing: '0.12em', color: '#FF9944', marginBottom: 24, textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6600', display: 'inline-block' }} />
            Conceptpresentatie — 7 unieke websiteontwerpen
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 800, lineHeight: 1.08,
            marginBottom: 20, letterSpacing: '-0.03em', margin: '0 auto 20px',
          }}>
            Kies uw favoriete<br />
            <span style={{ color: '#FF6600' }}>websiteontwerp</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.6, maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Zeven unieke ontwerpen voor aircostunt.com — elk met een andere stijl, sfeer en doelgroep. Klik op een kaart om het volledige design te bekijken.
          </p>
        </header>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: 20,
        }}>
          {designs.map(d => (
            <DesignCard key={d.id} design={d} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: 'center', marginTop: 80, opacity: 0.35, fontSize: 13, lineHeight: 1.8 }}>
          <p style={{ margin: 0 }}>AircoStunt · Veerplaat 10, Dordrecht · 06-147 00 753 · info@aircostunt.com</p>
          <p style={{ margin: '4px 0 0' }}>Concept gemaakt voor presentatie — alle designs zijn volledig responsief en Vercel-ready</p>
        </div>
      </div>
    </div>
  )
}

function DesignCard({ design: d }) {
  return (
    <Link to={`/design/${d.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        className="design-card"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20,
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          cursor: 'pointer',
          height: '100%',
        }}
        onMouseEnter={e => {
          const card = e.currentTarget
          card.style.background = 'rgba(255,255,255,0.08)'
          card.style.borderColor = 'rgba(255,102,0,0.45)'
          card.style.transform = 'translateY(-6px) scale(1.01)'
          card.style.boxShadow = '0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,102,0,0.2)'
        }}
        onMouseLeave={e => {
          const card = e.currentTarget
          card.style.background = 'rgba(255,255,255,0.04)'
          card.style.borderColor = 'rgba(255,255,255,0.09)'
          card.style.transform = 'translateY(0) scale(1)'
          card.style.boxShadow = 'none'
        }}
      >
        {/* Palette strip */}
        <div style={{ display: 'flex', height: 5 }}>
          {d.palette.map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>

        <div style={{ padding: '26px 28px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <span style={{
                display: 'inline-block', marginBottom: 10,
                background: 'rgba(255,102,0,0.18)', color: '#FF9944',
                fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', padding: '3px 10px', borderRadius: 9999,
              }}>{d.tag}</span>
              <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700, lineHeight: 1.2, color: '#fff' }}>
                {d.name}
              </h3>
            </div>
            <div style={{
              flexShrink: 0, marginLeft: 14,
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
            }}>{d.id}</div>
          </div>

          <p style={{ margin: '0 0 18px', fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)' }}>
            {d.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Swatches */}
            <div style={{ display: 'flex', gap: 5 }}>
              {d.palette.map((c, i) => (
                <div key={i} title={c} style={{
                  width: 18, height: 18, borderRadius: '50%', background: c,
                  border: '2px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }} />
              ))}
            </div>
            {/* Font badge */}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>{d.font}</span>
          </div>

          <div style={{
            marginTop: 20, paddingTop: 18,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 6,
            color: '#FF9944', fontSize: 14, fontWeight: 700,
          }}>
            Bekijk ontwerp
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
