import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, BRANDS } from '../../data/staticData'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@200;300;400;600&display=swap');

.d4 * { box-sizing: border-box; margin: 0; padding: 0; }
.d4 { font-family: 'Exo 2', sans-serif; font-weight: 300; background: #060C18; color: #C8D8F0; min-height: 100vh; }
.d4-heading { font-family: 'Rajdhani', sans-serif; text-transform: uppercase; letter-spacing: 0.05em; }
.d4-grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background-image: linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px; }
.d4-glow { position: fixed; pointer-events: none; z-index: 0; border-radius: 50%; }
.d4-nav { position: sticky; top: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 64px; background: rgba(6,12,24,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,200,255,0.12); }
.d4-nav-logo { font-family: 'Rajdhani', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; }
.d4-nav-logo span { color: #FF6600; }
.d4-nav-links { display: flex; gap: 32px; }
.d4-nav-links a { font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(200,216,240,0.45); transition: color 0.2s; text-decoration: none; }
.d4-nav-links a:hover { color: #00C8FF; }
.d4-nav-cta { font-family: 'Rajdhani', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 9px 22px; background: transparent; border: 1px solid rgba(0,200,255,0.5); color: #00C8FF; text-decoration: none; transition: all 0.25s; }
.d4-nav-cta:hover { background: rgba(0,200,255,0.1); border-color: #00C8FF; }
.d4-hero { position: relative; z-index: 1; min-height: 95vh; display: flex; flex-direction: column; justify-content: center; padding: 60px 48px; overflow: hidden; }
.d4-hero-label { font-size: 11px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: #00C8FF; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
.d4-hero-label::before { content: ''; width: 24px; height: 1px; background: #00C8FF; display: block; }
.d4-hero h1 { font-family: 'Rajdhani', sans-serif; font-size: clamp(52px, 8vw, 120px); font-weight: 700; line-height: 0.9; letter-spacing: -0.01em; text-transform: uppercase; color: #fff; margin-bottom: 32px; max-width: 900px; }
.d4-hero h1 span { color: #FF6600; -webkit-text-stroke: 0; }
.d4-hero h1 .outline { -webkit-text-stroke: 2px rgba(255,255,255,0.3); color: transparent; }
.d4-hero-desc { font-size: 16px; font-weight: 300; color: rgba(200,216,240,0.6); max-width: 480px; line-height: 1.75; margin-bottom: 48px; }
.d4-hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }
.d4-btn-primary { font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 36px; background: #FF6600; color: #fff; border: none; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; transition: all 0.25s; clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px)); }
.d4-btn-primary:hover { background: #FF8533; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,102,0,0.4); }
.d4-btn-outline { font-family: 'Rajdhani', sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; padding: 14px 36px; background: transparent; border: 1px solid rgba(0,200,255,0.4); color: #00C8FF; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; transition: all 0.25s; }
.d4-btn-outline:hover { background: rgba(0,200,255,0.08); border-color: #00C8FF; }
.d4-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(0,200,255,0.1); margin: 0 48px; position: relative; z-index: 1; }
.d4-stat { background: #060C18; padding: 32px 28px; position: relative; overflow: hidden; }
.d4-stat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #00C8FF, transparent); }
.d4-stat-val { font-family: 'Rajdhani', sans-serif; font-size: 48px; font-weight: 700; color: #00C8FF; line-height: 1; }
.d4-stat-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(200,216,240,0.4); margin-top: 6px; }
.d4-section { position: relative; z-index: 1; padding: 80px 48px; max-width: 1240px; margin: 0 auto; }
.d4-section-title { display: flex; align-items: center; gap: 16px; margin-bottom: 48px; }
.d4-section-title h2 { font-family: 'Rajdhani', sans-serif; font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #fff; }
.d4-section-title span { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(200,216,240,0.3); }
.d4-section-title::before { content: '//'; color: #00C8FF; font-family: 'Rajdhani', sans-serif; font-weight: 700; }
.d4-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1px; background: rgba(0,200,255,0.08); }
.d4-product { background: #0A1428; padding: 32px; transition: all 0.3s; cursor: pointer; position: relative; overflow: hidden; }
.d4-product::before { content: ''; position: absolute; inset: 0; border: 1px solid transparent; transition: border-color 0.3s; }
.d4-product:hover::before { border-color: rgba(0,200,255,0.4); }
.d4-product:hover { background: #0E1C38; box-shadow: 0 0 32px rgba(0,200,255,0.08); }
.d4-product-brand { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #00C8FF; margin-bottom: 12px; opacity: 0.7; }
.d4-product-name { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: #fff; letter-spacing: 0.04em; margin-bottom: 16px; line-height: 1.2; }
.d4-product-price { font-family: 'Rajdhani', sans-serif; font-size: 36px; font-weight: 700; color: #FF6600; margin-bottom: 20px; }
.d4-product-price span { font-size: 14px; color: rgba(200,216,240,0.4); font-weight: 400; margin-left: 4px; }
.d4-product-specs { display: flex; flex-direction: column; gap: 6px; }
.d4-spec { display: flex; align-items: center; gap: 8px; font-size: 12px; color: rgba(200,216,240,0.55); }
.d4-spec::before { content: '>'; color: #00C8FF; font-family: 'Rajdhani', monospace; font-size: 10px; }
.d4-stock { position: absolute; top: 20px; right: 20px; font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; padding: 4px 8px; }
.d4-stock-ok { background: rgba(0,200,100,0.15); color: #00C864; border: 1px solid rgba(0,200,100,0.3); }
.d4-stock-no { background: rgba(255,100,0,0.15); color: #FF6400; border: 1px solid rgba(255,100,0,0.3); }
.d4-brands { position: relative; z-index: 1; background: #080E1E; border-top: 1px solid rgba(0,200,255,0.1); border-bottom: 1px solid rgba(0,200,255,0.1); padding: 48px; }
.d4-brands-inner { max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; }
.d4-brand { font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(200,216,240,0.25); transition: color 0.2s; }
.d4-brand:hover { color: #00C8FF; }
.d4-cta-section { position: relative; z-index: 1; background: linear-gradient(135deg, #FF6600 0%, #CC4400 100%); padding: 80px 48px; text-align: center; }
.d4-cta-section::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
.d4-cta-section h2 { font-family: 'Rajdhani', sans-serif; font-size: clamp(28px, 4vw, 52px); font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #fff; margin-bottom: 16px; position: relative; }
.d4-cta-section p { font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 40px; position: relative; }
.d4-footer { position: relative; z-index: 1; background: #030810; border-top: 1px solid rgba(0,200,255,0.08); padding: 40px 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.d4-footer-logo { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(200,216,240,0.4); }
.d4-footer-logo span { color: #FF6600; }
.d4-footer-info { font-size: 12px; letter-spacing: 0.06em; color: rgba(200,216,240,0.3); }
@media (max-width: 768px) {
  .d4-nav { padding: 0 20px; }
  .d4-nav-links { display: none; }
  .d4-hero { padding: 60px 24px; }
  .d4-stats { grid-template-columns: repeat(2, 1fr); margin: 0 24px; }
  .d4-section { padding: 60px 24px; }
  .d4-brands { padding: 40px 24px; }
  .d4-cta-section { padding: 60px 24px; }
  .d4-footer { padding: 32px 24px; flex-direction: column; }
}
`

export default function Design4() {
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@200;300;400;600&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === activeFilter)

  return (
    <div className="d4">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="d4-grid-bg" />
      <div className="d4-glow" style={{ top: '-20vh', right: '-15vw', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(0,50,100,0.5) 0%, transparent 70%)' }} />
      <div className="d4-glow" style={{ bottom: '-20vh', left: '-10vw', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(255,80,0,0.15) 0%, transparent 70%)' }} />

      {/* Nav */}
      <nav className="d4-nav">
        <div className="d4-nav-logo">Airco<span>Stunt</span></div>
        <div className="d4-nav-links">
          <a href="#producten">Systemen</a>
          <a href="#merken">Merken</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="tel:0614700753" className="d4-nav-cta">Bel: 06-147 00 753</a>
      </nav>

      {/* Hero */}
      <section className="d4-hero">
        <div className="d4-hero-label">// Koelsystemen — Dordrecht</div>
        <h1 className="d4-heading">
          Maximale<br />
          <span>koelkracht.</span><br />
          <span className="outline">Minimale</span><br />
          <span className="outline">kosten.</span>
        </h1>
        <p className="d4-hero-desc">
          Split-unit airconditioners van topmerken. 15 jaar ervaring, grootste voorraad in de regio, direct afhaalbaar. Laagste prijzen gegarandeerd.
        </p>
        <div className="d4-hero-ctas">
          <a href="#producten" className="d4-btn-primary">
            Bekijk systemen
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="tel:0614700753" className="d4-btn-outline">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Directe lijn
          </a>
        </div>
      </section>

      {/* Stats */}
      <div className="d4-stats">
        {[
          { val: '15+', label: 'Jaar expertise' },
          { val: '€479', label: 'Vanafprijs' },
          { val: '5', label: 'Topmerken' },
          { val: '24h', label: 'Afhaalklaar' },
        ].map((s, i) => (
          <div key={i} className="d4-stat">
            <div className="d4-stat-val d4-heading">{s.val}</div>
            <div className="d4-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="d4-section" id="producten">
        <div className="d4-section-title">
          <h2>Koelsystemen</h2>
          <span>{PRODUCTS.length} modellen beschikbaar</span>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {['all', ...BRANDS.map(b => b.id)].map(id => (
            <button key={id} onClick={() => setActiveFilter(id)} style={{
              fontFamily: 'Rajdhani, sans-serif', fontSize: 12, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 18px',
              background: activeFilter === id ? '#00C8FF' : 'transparent',
              color: activeFilter === id ? '#060C18' : 'rgba(200,216,240,0.4)',
              border: `1px solid ${activeFilter === id ? '#00C8FF' : 'rgba(0,200,255,0.2)'}`,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {id === 'all' ? 'Alle' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>

        <div className="d4-products">
          {filtered.map(p => {
            const brand = BRANDS.find(b => b.id === p.brandId)
            return (
              <div key={p.id} className="d4-product">
                <div className={`d4-stock ${p.inStock ? 'd4-stock-ok' : 'd4-stock-no'}`}>
                  {p.inStock ? '● Online' : '○ Uitverkocht'}
                </div>
                <div className="d4-product-brand">{brand?.name}</div>
                <div className="d4-product-name">{p.name}</div>
                <div className="d4-product-price">€{p.priceFrom} <span>incl. btw</span></div>
                <div className="d4-product-specs">
                  {p.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="d4-spec">{f}</div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="d4-brands" id="merken">
        <div className="d4-brands-inner">
          <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,216,240,0.25)' }}>
            Gecertificeerde merken //
          </div>
          {BRANDS.map(b => (
            <div key={b.id} className="d4-brand">{b.name}</div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="d4-cta-section" id="contact">
        <h2>Klaar voor uw systeem?</h2>
        <p>Bel ons of kom langs in onze showroom in Dordrecht. Altijd 30 min van tevoren bellen.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <a href="tel:0614700753" className="d4-btn-primary">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            06-147 00 753
          </a>
          <a href="mailto:info@aircostunt.com" className="d4-btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
            info@aircostunt.com
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="d4-footer">
        <div className="d4-footer-logo">Airco<span>Stunt</span></div>
        <div className="d4-footer-info">Veerplaat 10 · Dordrecht · ma-vr 09:00–20:00</div>
        <div className="d4-footer-info">© 2024 AircoStunt</div>
      </footer>

      <Link to="/" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(6,12,24,0.95)', color: '#00C8FF', padding: '11px 20px', borderRadius: 9999, textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', border: '1px solid rgba(0,200,255,0.3)' }}>
        ← Alle ontwerpen
      </Link>
    </div>
  )
}
