import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, BRANDS, SITE } from '../../data/staticData'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600&display=swap');

.d2 * { box-sizing: border-box; margin: 0; padding: 0; }
.d2 { font-family: 'Source Sans 3', sans-serif; background: #F7F2E8; color: #1a1208; }
.d2 a { color: inherit; text-decoration: none; }
.d2-serif { font-family: 'Playfair Display', Georgia, serif; }
.d2-nav { position: sticky; top: 0; z-index: 100; background: #F7F2E8; border-bottom: 1px solid rgba(26,18,8,0.12); display: flex; align-items: center; justify-content: space-between; padding: 0 40px; height: 68px; }
.d2-nav-links a { margin-left: 28px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(26,18,8,0.6); transition: color 0.2s; }
.d2-nav-links a:hover { color: #FF6600; }
.d2-hero { min-height: 92vh; display: grid; grid-template-columns: 1fr 1fr; }
.d2-hero-left { display: flex; flex-direction: column; justify-content: center; padding: 80px 56px 80px 48px; border-right: 1px solid rgba(26,18,8,0.1); }
.d2-hero-right { display: flex; flex-direction: column; justify-content: flex-end; padding: 0; background: #003366; position: relative; overflow: hidden; }
.d2-overline { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(26,18,8,0.45); margin-bottom: 28px; display: flex; align-items: center; gap: 10px; }
.d2-overline::before { content: ''; width: 32px; height: 1px; background: #FF6600; display: block; }
.d2-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(48px, 5.5vw, 80px); line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 32px; font-weight: 900; }
.d2-hero h1 em { font-style: italic; color: #FF6600; }
.d2-hero-desc { font-size: 17px; line-height: 1.75; color: rgba(26,18,8,0.65); max-width: 400px; margin-bottom: 44px; font-weight: 300; }
.d2-btn-primary { display: inline-flex; align-items: center; gap: 10px; background: #003366; color: #fff; padding: 16px 32px; font-size: 14px; font-weight: 600; letter-spacing: 0.05em; border: none; cursor: pointer; transition: all 0.25s; }
.d2-btn-primary:hover { background: #FF6600; }
.d2-btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 16px 24px; font-size: 14px; font-weight: 600; color: rgba(26,18,8,0.55); letter-spacing: 0.03em; cursor: pointer; transition: color 0.2s; border: none; background: none; }
.d2-btn-secondary:hover { color: #FF6600; }
.d2-hero-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.65; mix-blend-mode: luminosity; }
.d2-hero-price-badge { position: absolute; top: 40px; left: 40px; background: #FF6600; color: #fff; font-family: 'Playfair Display', serif; padding: 20px 24px; }
.d2-hero-price-badge strong { display: block; font-size: 36px; font-weight: 900; line-height: 1; }
.d2-hero-price-badge span { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.85; }
.d2-usps { background: #003366; color: #fff; display: flex; border-bottom: 3px solid #FF6600; }
.d2-usp { flex: 1; padding: 28px 24px; border-right: 1px solid rgba(255,255,255,0.1); }
.d2-usp:last-child { border-right: none; }
.d2-usp-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 900; color: #FF6600; line-height: 1; margin-bottom: 6px; }
.d2-usp-label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }
.d2-section { padding: 96px 48px; max-width: 1240px; margin: 0 auto; }
.d2-section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 56px; padding-bottom: 20px; border-bottom: 1px solid rgba(26,18,8,0.15); }
.d2-section-header h2 { font-family: 'Playfair Display', serif; font-size: clamp(32px, 3.5vw, 48px); font-weight: 900; letter-spacing: -0.02em; }
.d2-section-header span { font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(26,18,8,0.4); }
.d2-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2px; background: rgba(26,18,8,0.1); }
.d2-product { background: #F7F2E8; padding: 36px; transition: all 0.3s; cursor: pointer; position: relative; }
.d2-product:hover { background: #fff; z-index: 1; box-shadow: 0 16px 48px rgba(0,0,0,0.12); transform: translateY(-2px); }
.d2-product-brand { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #FF6600; font-weight: 700; margin-bottom: 10px; }
.d2-product-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin-bottom: 16px; line-height: 1.25; }
.d2-product-price { font-size: 32px; font-family: 'Playfair Display', serif; font-weight: 900; color: #003366; margin-bottom: 20px; }
.d2-product-price sup { font-size: 16px; vertical-align: super; }
.d2-product-features { list-style: none; }
.d2-product-features li { font-size: 13px; color: rgba(26,18,8,0.6); padding: 6px 0; border-bottom: 1px solid rgba(26,18,8,0.07); display: flex; align-items: center; gap: 8px; }
.d2-product-features li::before { content: '—'; color: #FF6600; flex-shrink: 0; }
.d2-stock-badge { position: absolute; top: 36px; right: 36px; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; }
.d2-in-stock { background: #E8F5E9; color: #2E7D32; }
.d2-out-stock { background: #FFF3E0; color: #E65100; }
.d2-brands { background: #1a1208; padding: 64px 48px; }
.d2-brands-grid { max-width: 1240px; margin: 0 auto; display: flex; align-items: center; justify-content: center; gap: 0; flex-wrap: wrap; }
.d2-brand { flex: 1; min-width: 140px; padding: 32px 24px; text-align: center; border-right: 1px solid rgba(255,255,255,0.08); }
.d2-brand:last-child { border-right: none; }
.d2-brand-name { font-family: 'Playfair Display', serif; font-size: 18px; color: rgba(255,255,255,0.5); font-weight: 700; letter-spacing: 0.04em; transition: color 0.2s; }
.d2-brand:hover .d2-brand-name { color: #FF6600; }
.d2-cta { background: #FF6600; color: #fff; text-align: center; padding: 80px 48px; }
.d2-cta h2 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 52px); font-weight: 900; margin-bottom: 16px; }
.d2-cta p { font-size: 18px; opacity: 0.85; margin-bottom: 40px; font-weight: 300; }
.d2-cta-btn { display: inline-flex; align-items: center; gap: 10px; background: #fff; color: #FF6600; padding: 18px 40px; font-size: 15px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; transition: all 0.25s; }
.d2-cta-btn:hover { background: #003366; color: #fff; }
.d2-footer { background: #1a1208; color: rgba(255,255,255,0.5); padding: 48px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.d2-footer-logo { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 900; color: #fff; }
.d2-footer-logo span { color: #FF6600; }
.d2-footer-info { font-size: 13px; line-height: 1.8; }
@media (max-width: 768px) {
  .d2-hero { grid-template-columns: 1fr; }
  .d2-hero-right { min-height: 300px; }
  .d2-hero-left { padding: 48px 24px; }
  .d2-usps { flex-wrap: wrap; }
  .d2-usp { flex: 0 0 50%; }
  .d2-section { padding: 64px 24px; }
  .d2-nav { padding: 0 20px; }
  .d2-nav-links { display: none; }
  .d2-brands { padding: 48px 24px; }
  .d2-footer { padding: 40px 24px; flex-direction: column; }
}
`

export default function Design2() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <div className="d2">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav className="d2-nav">
        <div className="d2-serif" style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em' }}>
          Airco<span style={{ color: '#FF6600' }}>Stunt</span>
        </div>
        <div className="d2-nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          <a href="#producten">Airco's</a>
          <a href="#merken">Merken</a>
          <a href="#contact">Contact</a>
          <a href="tel:0614700753" style={{ marginLeft: 28, background: '#003366', color: '#fff', padding: '9px 20px', fontWeight: 700, letterSpacing: '0.06em', fontSize: 12, textTransform: 'uppercase' }}>
            Bel nu
          </a>
        </div>
        <Link to="/" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,18,8,0.35)', marginLeft: 20 }}>← Overzicht</Link>
      </nav>

      {/* Hero */}
      <section className="d2-hero">
        <div className="d2-hero-left">
          <div className="d2-overline">AircoStunt Dordrecht — Est. 2009</div>
          <h1 className="d2-serif">
            De scherpste<br />
            aircoprijzen<br />
            in <em>Nederland.</em>
          </h1>
          <p className="d2-hero-desc">
            Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct af te halen uit onze showroom in Dordrecht — geen wachttijden, geen tussenpersoon.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
            <a href="#producten" className="d2-btn-primary">
              Alle airco's bekijken
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:0614700753" className="d2-btn-secondary">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              06-147 00 753
            </a>
          </div>
        </div>
        <div className="d2-hero-right">
          <div className="d2-hero-price-badge">
            <span>Vanaf</span>
            <strong>€479</strong>
            <span>split-unit set</span>
          </div>
          <img
            className="d2-hero-img"
            src="https://www.aircostunt.com/wp-content/uploads/2020/11/Daikin-Sensira-FTXF35B-10.jpg"
            alt="Daikin airco"
            onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg, #003366 0%, #002244 100%)' ; e.target.style.display='none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
          <div style={{ position: 'relative', padding: '40px', color: '#fff' }}>
            <div className="d2-serif" style={{ fontSize: 14, opacity: 0.75, marginBottom: 6, fontStyle: 'italic' }}>
              "Gratis WiFi-module bij Daikin airco's"
            </div>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}>
              Grootste voorraad van de regio
            </div>
          </div>
        </div>
      </section>

      {/* USP bar */}
      <div className="d2-usps">
        {[
          { num: '15', label: 'Jaar ervaring' },
          { num: '€479', label: 'Vanaf prijs' },
          { num: '5', label: 'Topmerken' },
          { num: '2jr', label: 'Fabrieksgarantie' },
          { num: '100%', label: 'Op voorraad' },
        ].map((u, i) => (
          <div key={i} className="d2-usp">
            <div className="d2-usp-num">{u.num}</div>
            <div className="d2-usp-label">{u.label}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div id="producten">
        <div className="d2-section">
          <div className="d2-section-header">
            <h2>Onze airco's</h2>
            <span>{PRODUCTS.length} modellen op voorraad</span>
          </div>
        </div>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 48px 96px' }}>
          <div className="d2-products">
            {PRODUCTS.map(p => {
              const brand = BRANDS.find(b => b.id === p.brandId)
              return (
                <div key={p.id} className="d2-product">
                  <div className={`d2-stock-badge ${p.inStock ? 'd2-in-stock' : 'd2-out-stock'}`}>
                    {p.inStock ? 'Op voorraad' : 'Uitverkocht'}
                  </div>
                  <div className="d2-product-brand">{brand?.name}</div>
                  <div className="d2-product-name d2-serif">{p.name}</div>
                  <div className="d2-product-price">
                    <sup>v.a.</sup> €{p.priceFrom}
                  </div>
                  <ul className="d2-product-features">
                    {p.features.slice(0, 4).map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div id="merken" className="d2-brands">
        <div className="d2-brands-grid">
          {BRANDS.map(b => (
            <div key={b.id} className="d2-brand">
              <div className="d2-brand-name">{b.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6, letterSpacing: '0.06em' }}>A-merk</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div id="contact" className="d2-cta">
        <h2>Klaar om te bestellen?</h2>
        <p>Bel ons of kom langs in onze showroom in Dordrecht. Altijd 30 minuten van tevoren bellen.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:0614700753" className="d2-cta-btn">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            06-147 00 753
          </a>
        </div>
        <p style={{ marginTop: 24, fontSize: 14, opacity: 0.7 }}>Veerplaat 10, Dordrecht · ma-vr 09:00–20:00 · za 09:00–13:00</p>
      </div>

      {/* Footer */}
      <footer className="d2-footer">
        <div>
          <div className="d2-footer-logo">Airco<span>Stunt</span></div>
          <div style={{ fontSize: 11, opacity: 0.4, marginTop: 4, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Dordrecht — Est. 2009</div>
        </div>
        <div className="d2-footer-info">
          <div>Veerplaat 10, 3313 LJ Dordrecht</div>
          <div>06-147 00 753 · info@aircostunt.com</div>
        </div>
        <div style={{ fontSize: 12 }}>© 2024 AircoStunt · Alle rechten voorbehouden</div>
      </footer>

      {/* Back */}
      <Link to="/" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: '#1a1208', color: '#fff', padding: '11px 20px', borderRadius: 9999, textDecoration: 'none', fontSize: 13, fontWeight: 700, boxShadow: '0 6px 24px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Alle ontwerpen
      </Link>
    </div>
  )
}
