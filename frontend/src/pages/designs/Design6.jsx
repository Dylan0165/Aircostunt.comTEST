import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, BRANDS } from '../../data/staticData'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

.d6 * { box-sizing: border-box; margin: 0; padding: 0; }
.d6 { font-family: 'Nunito', sans-serif; background: #FFF9F4; color: #1E2D45; overflow-x: hidden; }
.d6 a { text-decoration: none; color: inherit; }
.d6-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,249,244,0.95); backdrop-filter: blur(12px); padding: 0 40px; height: 72px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,107,44,0.1); }
.d6-nav-logo { font-size: 24px; font-weight: 900; color: #1B4F8A; }
.d6-nav-logo span { color: #FF6B2C; }
.d6-nav-links { display: flex; gap: 32px; }
.d6-nav-links a { font-size: 15px; font-weight: 600; color: rgba(30,45,69,0.55); transition: color 0.2s; }
.d6-nav-links a:hover { color: #FF6B2C; }
.d6-nav-cta { background: #FF6B2C; color: #fff; padding: 12px 28px; border-radius: 9999px; font-size: 15px; font-weight: 800; display: inline-flex; align-items: center; gap: 8px; transition: all 0.25s; box-shadow: 0 4px 16px rgba(255,107,44,0.3); }
.d6-nav-cta:hover { background: #E55A1F; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,107,44,0.4); }
.d6-hero { position: relative; min-height: 92vh; display: flex; align-items: center; padding: 80px 40px; overflow: hidden; }
.d6-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.35; pointer-events: none; }
.d6-hero-content { position: relative; z-index: 1; max-width: 600px; }
.d6-hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #FFE4CC; color: #C45010; padding: 8px 18px; border-radius: 9999px; font-size: 13px; font-weight: 800; margin-bottom: 28px; }
.d6-hero-badge::before { content: '😎'; font-size: 16px; }
.d6-hero h1 { font-size: clamp(40px, 6vw, 80px); font-weight: 900; line-height: 1.05; color: #1B4F8A; margin-bottom: 24px; }
.d6-hero h1 em { font-style: normal; color: #FF6B2C; }
.d6-hero-desc { font-size: 18px; font-weight: 400; color: rgba(30,45,69,0.6); line-height: 1.75; margin-bottom: 40px; }
.d6-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.d6-btn-primary { background: #1B4F8A; color: #fff; padding: 16px 36px; border-radius: 9999px; font-size: 17px; font-weight: 800; display: inline-flex; align-items: center; gap: 10px; transition: all 0.25s; box-shadow: 0 6px 20px rgba(27,79,138,0.3); }
.d6-btn-primary:hover { background: #163F70; transform: translateY(-2px); box-shadow: 0 10px 28px rgba(27,79,138,0.4); }
.d6-btn-secondary { background: transparent; color: #1B4F8A; padding: 16px 32px; border-radius: 9999px; font-size: 16px; font-weight: 700; border: 2px solid rgba(27,79,138,0.25); transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px; }
.d6-btn-secondary:hover { border-color: #1B4F8A; background: rgba(27,79,138,0.05); }
.d6-hero-image { position: absolute; right: 0; top: 0; bottom: 0; width: 48%; overflow: hidden; border-radius: 0 0 0 80px; }
.d6-hero-image img { width: 100%; height: 100%; object-fit: cover; }
.d6-hero-image-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, #FFF9F4 0%, transparent 40%); }
.d6-usps { background: #fff; border-radius: 32px; margin: -32px 40px 0; position: relative; z-index: 2; box-shadow: 0 8px 48px rgba(27,79,138,0.1); display: flex; padding: 0; overflow: hidden; }
.d6-usp { flex: 1; padding: 32px 24px; text-align: center; border-right: 1px solid rgba(30,45,69,0.06); }
.d6-usp:last-child { border-right: none; }
.d6-usp-icon { font-size: 28px; margin-bottom: 8px; }
.d6-usp-val { font-size: 28px; font-weight: 900; color: #FF6B2C; line-height: 1; }
.d6-usp-label { font-size: 13px; font-weight: 600; color: rgba(30,45,69,0.55); margin-top: 4px; }
.d6-section { padding: 80px 40px; max-width: 1240px; margin: 0 auto; }
.d6-section-header { text-align: center; margin-bottom: 56px; }
.d6-section-header h2 { font-size: clamp(28px, 4vw, 48px); font-weight: 900; color: #1B4F8A; margin-bottom: 12px; }
.d6-section-header p { font-size: 16px; color: rgba(30,45,69,0.55); max-width: 440px; margin: 0 auto; }
.d6-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.d6-product { background: #fff; border-radius: 24px; padding: 32px; box-shadow: 0 4px 24px rgba(27,79,138,0.08); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; position: relative; overflow: hidden; }
.d6-product::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #1B4F8A, #FF6B2C); border-radius: 24px 24px 0 0; }
.d6-product:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 48px rgba(27,79,138,0.15); }
.d6-product-brand { display: inline-block; background: #EFF5FF; color: #1B4F8A; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-bottom: 14px; }
.d6-product-name { font-size: 18px; font-weight: 800; color: #1E2D45; margin-bottom: 16px; line-height: 1.25; }
.d6-product-price { font-size: 40px; font-weight: 900; color: #FF6B2C; line-height: 1; margin-bottom: 20px; }
.d6-product-price sup { font-size: 18px; vertical-align: super; }
.d6-product-features { display: flex; flex-direction: column; gap: 8px; }
.d6-product-feat { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(30,45,69,0.65); font-weight: 500; }
.d6-product-feat::before { content: '✓'; width: 18px; height: 18px; background: #E8F5E9; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #2E7D32; font-weight: 900; flex-shrink: 0; }
.d6-stock-chip { position: absolute; top: 24px; right: 24px; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 9999px; }
.d6-stock-in { background: #E8F5E9; color: #2E7D32; }
.d6-stock-out { background: #FFF3E0; color: #E65100; }
.d6-brands { background: linear-gradient(135deg, #1B4F8A 0%, #0D3366 100%); padding: 64px 40px; margin: 0 40px; border-radius: 32px; }
.d6-brands-inner { max-width: 1160px; margin: 0 auto; }
.d6-brands h3 { font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 40px; letter-spacing: 0.04em; }
.d6-brands-grid { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; }
.d6-brand-pill { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 9999px; padding: 14px 32px; font-size: 18px; font-weight: 800; color: rgba(255,255,255,0.8); transition: all 0.25s; }
.d6-brand-pill:hover { background: #FF6B2C; border-color: #FF6B2C; color: #fff; transform: translateY(-3px); }
.d6-contact { background: #fff; border-radius: 32px; margin: 40px; padding: 64px; box-shadow: 0 8px 48px rgba(27,79,138,0.08); display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.d6-contact-left h2 { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #1B4F8A; margin-bottom: 16px; line-height: 1.15; }
.d6-contact-left p { font-size: 16px; color: rgba(30,45,69,0.6); line-height: 1.75; margin-bottom: 32px; }
.d6-contact-right { display: flex; flex-direction: column; gap: 20px; }
.d6-contact-item { background: #FFF9F4; border-radius: 16px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
.d6-contact-icon { width: 44px; height: 44px; border-radius: 50%; background: #FFE4CC; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
.d6-contact-item-label { font-size: 12px; font-weight: 700; color: rgba(30,45,69,0.45); letter-spacing: 0.04em; margin-bottom: 2px; }
.d6-contact-item-val { font-size: 16px; font-weight: 700; color: #1E2D45; }
.d6-footer { background: #1B4F8A; color: rgba(255,255,255,0.6); padding: 40px; border-radius: 32px 32px 0 0; margin-top: 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.d6-footer-logo { font-size: 22px; font-weight: 900; color: #fff; }
.d6-footer-logo span { color: #FF6B2C; }
.d6-footer-info { font-size: 13px; }
@media (max-width: 768px) {
  .d6-nav { padding: 0 20px; }
  .d6-nav-links { display: none; }
  .d6-hero { padding: 60px 20px; }
  .d6-hero-image { display: none; }
  .d6-usps { margin: -24px 20px 0; flex-wrap: wrap; }
  .d6-usp { flex: 0 0 50%; }
  .d6-section { padding: 60px 20px; }
  .d6-brands { margin: 0 20px; padding: 48px 24px; }
  .d6-contact { margin: 20px; padding: 40px 24px; grid-template-columns: 1fr; gap: 32px; }
  .d6-footer { padding: 32px 24px; flex-direction: column; margin-top: 20px; }
}
`

export default function Design6() {
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === activeFilter)

  return (
    <div className="d6">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav className="d6-nav">
        <div className="d6-nav-logo">Airco<span>Stunt</span></div>
        <div className="d6-nav-links">
          <a href="#producten">Airco's</a>
          <a href="#merken">Merken</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="tel:0614700753" className="d6-nav-cta">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Bel ons!
        </a>
      </nav>

      {/* Hero */}
      <section className="d6-hero">
        {/* Blobs */}
        <div className="d6-blob" style={{ width: '60vw', height: '60vw', background: '#FFE4CC', top: '-20vh', right: '-10vw' }} />
        <div className="d6-blob" style={{ width: '40vw', height: '40vw', background: '#DBEAFE', bottom: '-10vh', left: '-5vw' }} />

        <div className="d6-hero-content">
          <div className="d6-hero-badge">Laagste prijs in heel Nederland!</div>
          <h1>
            Lekker koel<br />
            voor een <em>eerlijke</em><br />
            prijs.
          </h1>
          <p className="d6-hero-desc">
            Airco's van Daikin, Mitsubishi, Samsung en LG — direct uit voorraad. Wij geven geen korting, want onze prijzen zijn al het laagst. Gewoon eerlijk!
          </p>
          <div className="d6-hero-ctas">
            <a href="#producten" className="d6-btn-primary">
              Bekijk alle airco's
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:0614700753" className="d6-btn-secondary">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              06-147 00 753
            </a>
          </div>
        </div>

        <div className="d6-hero-image">
          <img src="https://www.aircostunt.com/wp-content/uploads/2020/11/Daikin-Sensira-FTXF35B-10.jpg" alt="Airco" onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg, #DBEAFE, #FFE4CC)'; e.target.style.display = 'none' }} />
          <div className="d6-hero-image-overlay" />
        </div>
      </section>

      {/* USPs */}
      <div style={{ padding: '0 40px' }}>
        <div className="d6-usps" style={{ marginTop: 40 }}>
          {[
            { icon: '🏆', val: '15 jaar', label: 'Ervaring' },
            { icon: '💰', val: '€479', label: 'Vanafprijs' },
            { icon: '📦', val: 'Direct', label: 'Afhaalbaar' },
            { icon: '🛡️', val: '2 jaar', label: 'Garantie' },
            { icon: '⭐', val: '5 merken', label: 'Topkwaliteit' },
          ].map((u, i) => (
            <div key={i} className="d6-usp">
              <div className="d6-usp-icon">{u.icon}</div>
              <div className="d6-usp-val">{u.val}</div>
              <div className="d6-usp-label">{u.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="d6-section" id="producten">
        <div className="d6-section-header">
          <h2>Onze airco's</h2>
          <p>Alle sets direct afhaalbaar uit onze showroom in Dordrecht</p>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40, flexWrap: 'wrap' }}>
          {['all', ...BRANDS.map(b => b.id)].map(id => (
            <button key={id} onClick={() => setActiveFilter(id)} style={{
              fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700,
              padding: '10px 24px', borderRadius: 9999, border: 'none',
              background: activeFilter === id ? '#FF6B2C' : '#fff',
              color: activeFilter === id ? '#fff' : 'rgba(30,45,69,0.6)',
              boxShadow: activeFilter === id ? '0 4px 16px rgba(255,107,44,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer', transition: 'all 0.25s',
            }}>
              {id === 'all' ? 'Alle merken' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>

        <div className="d6-products">
          {filtered.map(p => {
            const brand = BRANDS.find(b => b.id === p.brandId)
            return (
              <div key={p.id} className="d6-product">
                <div className={`d6-stock-chip ${p.inStock ? 'd6-stock-in' : 'd6-stock-out'}`}>
                  {p.inStock ? '✓ Op voorraad' : '✗ Uitverkocht'}
                </div>
                <div className="d6-product-brand">{brand?.name}</div>
                <div className="d6-product-name">{p.name}</div>
                <div className="d6-product-price">
                  <sup>v.a. </sup>€{p.priceFrom}
                </div>
                <div className="d6-product-features">
                  {p.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="d6-product-feat">{f}</div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Brands */}
      <div className="d6-brands" id="merken">
        <div className="d6-brands-inner">
          <h3>Wij leveren uitsluitend A-merken</h3>
          <div className="d6-brands-grid">
            {BRANDS.map(b => (
              <div key={b.id} className="d6-brand-pill">{b.name}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="d6-contact" id="contact">
        <div className="d6-contact-left">
          <h2>Hé, kom gerust langs! 👋</h2>
          <p>
            Wij staan altijd klaar om u te helpen. Bel 30 minuten van tevoren en wij zorgen dat alles voor u klaarstaat. Gratis advies bij afhalen!
          </p>
          <a href="tel:0614700753" className="d6-btn-primary">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Bel: 06-147 00 753
          </a>
        </div>
        <div className="d6-contact-right">
          {[
            { icon: '📍', label: 'Adres', val: 'Veerplaat 10, Dordrecht' },
            { icon: '📧', label: 'E-mail', val: 'info@aircostunt.com' },
            { icon: '🕐', label: 'Openingstijden', val: 'Ma–vr: 09:00–20:00 · Za: 09:00–13:00' },
            { icon: '⚠️', label: 'Let op', val: 'Altijd 30 min. van tevoren bellen!' },
          ].map((c, i) => (
            <div key={i} className="d6-contact-item">
              <div className="d6-contact-icon">{c.icon}</div>
              <div>
                <div className="d6-contact-item-label">{c.label}</div>
                <div className="d6-contact-item-val">{c.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="d6-footer">
        <div className="d6-footer-logo">Airco<span>Stunt</span></div>
        <div className="d6-footer-info">Veerplaat 10, Dordrecht · 06-147 00 753 · info@aircostunt.com</div>
        <div style={{ fontSize: 13 }}>© 2024 AircoStunt</div>
      </footer>

      <Link to="/" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: '#1B4F8A', color: '#fff', padding: '12px 22px', borderRadius: 9999, textDecoration: 'none', fontSize: 14, fontWeight: 800, boxShadow: '0 6px 20px rgba(27,79,138,0.35)' }}>
        ← Alle ontwerpen
      </Link>
    </div>
  )
}
