import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, BRANDS } from '../../data/staticData'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');

.d3 * { box-sizing: border-box; margin: 0; padding: 0; }
.d3 { font-family: 'Jost', sans-serif; font-weight: 300; background: #FAFAF7; color: #1C1C1C; line-height: 1.6; }
.d3-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
.d3-rule { width: 100%; height: 1px; background: #C4924A; opacity: 0.35; margin: 0; border: none; }
.d3-rule-thick { width: 40px; height: 1px; background: #C4924A; margin: 0 auto 28px; border: none; }
.d3-nav { position: sticky; top: 0; z-index: 100; background: rgba(250,250,247,0.96); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: space-between; padding: 0 60px; height: 72px; border-bottom: 1px solid rgba(196,146,74,0.2); }
.d3-nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.04em; }
.d3-nav-logo span { color: #003366; }
.d3-nav-links { display: flex; gap: 40px; }
.d3-nav-links a { font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(28,28,28,0.5); transition: color 0.2s; }
.d3-nav-links a:hover { color: #003366; }
.d3-hero { min-height: 90vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 60px 80px; position: relative; }
.d3-hero::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1px; height: 80px; background: linear-gradient(to bottom, transparent, rgba(196,146,74,0.4)); }
.d3-hero-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #C4924A; margin-bottom: 40px; }
.d3-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 100px); font-weight: 300; line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 8px; color: #0D0D0D; }
.d3-hero h1 em { font-style: italic; color: #003366; }
.d3-hero-sub { font-family: 'Cormorant Garamond', serif; font-size: clamp(24px, 3vw, 40px); font-weight: 300; font-style: italic; color: rgba(28,28,28,0.4); margin-bottom: 48px; }
.d3-hero-desc { font-size: 15px; max-width: 440px; line-height: 1.85; color: rgba(28,28,28,0.55); margin-bottom: 56px; font-weight: 300; }
.d3-hero-actions { display: flex; align-items: center; gap: 40px; }
.d3-btn { display: inline-block; font-size: 11px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 32px; border: 1px solid #003366; color: #003366; transition: all 0.3s; }
.d3-btn:hover { background: #003366; color: #fff; }
.d3-btn-ghost { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(28,28,28,0.4); padding: 0; border: none; background: none; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
.d3-btn-ghost:hover { color: #003366; }
.d3-usps { display: flex; border-top: 1px solid rgba(196,146,74,0.2); border-bottom: 1px solid rgba(196,146,74,0.2); }
.d3-usp { flex: 1; padding: 32px 20px; text-align: center; border-right: 1px solid rgba(196,146,74,0.15); }
.d3-usp:last-child { border-right: none; }
.d3-usp-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #003366; line-height: 1; margin-bottom: 8px; }
.d3-usp-key { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(28,28,28,0.4); }
.d3-products-section { max-width: 900px; margin: 0 auto; padding: 96px 40px; }
.d3-products-header { text-align: center; margin-bottom: 64px; }
.d3-products-header h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 56px); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 12px; }
.d3-products-header p { font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(28,28,28,0.4); }
.d3-product-row { display: flex; align-items: center; justify-content: space-between; padding: 28px 0; border-bottom: 1px solid rgba(28,28,28,0.08); transition: all 0.25s; cursor: pointer; gap: 20px; }
.d3-product-row:hover { padding-left: 12px; }
.d3-product-row:first-of-type { border-top: 1px solid rgba(28,28,28,0.08); }
.d3-product-row-left { flex: 1; }
.d3-product-brand-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #C4924A; margin-bottom: 6px; }
.d3-product-row-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: #1C1C1C; }
.d3-product-row-specs { font-size: 12px; color: rgba(28,28,28,0.4); margin-top: 4px; letter-spacing: 0.04em; }
.d3-product-row-price { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #003366; white-space: nowrap; }
.d3-product-row-stock { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(28,28,28,0.35); margin-left: 24px; white-space: nowrap; }
.d3-brands { background: #F2EDE3; padding: 64px 40px; text-align: center; border-top: 1px solid rgba(196,146,74,0.2); border-bottom: 1px solid rgba(196,146,74,0.2); }
.d3-brands h3 { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(28,28,28,0.4); margin-bottom: 32px; }
.d3-brands-list { display: flex; justify-content: center; gap: 48px; flex-wrap: wrap; }
.d3-brands-list span { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: rgba(28,28,28,0.55); letter-spacing: 0.06em; }
.d3-contact { max-width: 600px; margin: 0 auto; padding: 96px 40px; text-align: center; }
.d3-contact h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 4vw, 52px); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 16px; }
.d3-contact h2 em { font-style: italic; color: #003366; }
.d3-contact p { font-size: 14px; color: rgba(28,28,28,0.55); line-height: 1.85; margin-bottom: 40px; }
.d3-contact-links { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.d3-contact-link { font-size: 13px; letter-spacing: 0.08em; color: rgba(28,28,28,0.5); display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
.d3-contact-link:hover { color: #003366; }
.d3-footer { border-top: 1px solid rgba(196,146,74,0.2); padding: 40px 60px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
.d3-footer-copy { font-size: 11px; letter-spacing: 0.1em; color: rgba(28,28,28,0.35); text-transform: uppercase; }
@media (max-width: 768px) {
  .d3-nav { padding: 0 24px; }
  .d3-nav-links { display: none; }
  .d3-hero { padding: 80px 24px 60px; }
  .d3-usps { flex-wrap: wrap; }
  .d3-usp { flex: 0 0 50%; }
  .d3-products-section { padding: 64px 24px; }
  .d3-product-row { flex-wrap: wrap; }
  .d3-footer { padding: 32px 24px; flex-direction: column; }
}
`

export default function Design3() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <div className="d3">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav className="d3-nav">
        <div className="d3-nav-logo">Airco<span>Stunt</span></div>
        <div className="d3-nav-links">
          <a href="#producten">Airco's</a>
          <a href="#merken">Merken</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="tel:0614700753" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(28,28,28,0.45)', fontFamily: 'Jost, sans-serif', textDecoration: 'none' }}>
          06-147 00 753
        </a>
      </nav>

      {/* Hero */}
      <section className="d3-hero">
        <div className="d3-hero-eyebrow">Aircostunt · Dordrecht · Opgericht 2009</div>
        <hr className="d3-rule-thick" />
        <h1 className="d3-serif">
          Airco's van<br />
          <em>topkwaliteit</em>
        </h1>
        <div className="d3-hero-sub">voor de laagste prijs in Nederland</div>
        <p className="d3-hero-desc">
          Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct uit voorraad afhalen in onze showroom — geen wachttijden, eerlijke prijzen.
        </p>
        <div className="d3-hero-actions">
          <a href="#producten" className="d3-btn">Bekijk alle modellen</a>
          <a href="tel:0614700753" className="d3-btn-ghost">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Bel voor advies
          </a>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: 60, background: 'linear-gradient(to bottom, rgba(196,146,74,0.35), transparent)' }} />
      </section>

      {/* USPs */}
      <div className="d3-usps">
        {[
          { val: '15', key: 'Jaar ervaring' },
          { val: 'v.a. €479', key: 'Laagste prijs' },
          { val: '5', key: 'Topmerken' },
          { val: '2 jaar', key: 'Garantie' },
          { val: 'Direct', key: 'Afhaalbaar' },
        ].map((u, i) => (
          <div key={i} className="d3-usp">
            <div className="d3-usp-val d3-serif">{u.val}</div>
            <div className="d3-usp-key">{u.key}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <section className="d3-products-section" id="producten">
        <div className="d3-products-header">
          <h2 className="d3-serif">Onze collectie</h2>
          <p>{PRODUCTS.length} modellen — allemaal op voorraad</p>
        </div>
        {PRODUCTS.map(p => {
          const brand = BRANDS.find(b => b.id === p.brandId)
          const specs = p.features[0] || ''
          return (
            <div key={p.id} className="d3-product-row">
              <div className="d3-product-row-left">
                <div className="d3-product-brand-tag">{brand?.name}</div>
                <div className="d3-product-row-name d3-serif">{p.name}</div>
                <div className="d3-product-row-specs">{specs}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="d3-product-row-price d3-serif">v.a. €{p.priceFrom}</div>
                <div className="d3-product-row-stock">{p.inStock ? 'Op voorraad' : 'Uitverkocht'}</div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Brands */}
      <section className="d3-brands" id="merken">
        <h3>Wij voeren uitsluitend A-merken</h3>
        <div className="d3-brands-list">
          {BRANDS.map(b => <span key={b.id}>{b.name}</span>)}
        </div>
      </section>

      {/* Contact */}
      <section className="d3-contact" id="contact">
        <hr className="d3-rule-thick" />
        <h2 className="d3-serif">Kom <em>langs</em> of bel ons</h2>
        <p>
          Altijd 30 minuten van tevoren bellen. Wij staan voor u klaar in onze showroom op werkdagen van 09:00 tot 20:00 en op zaterdag van 09:00 tot 13:00.
        </p>
        <div className="d3-contact-links">
          <a href="tel:0614700753" className="d3-contact-link">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            06-147 00 753
          </a>
          <a href="mailto:info@aircostunt.com" className="d3-contact-link">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            info@aircostunt.com
          </a>
          <span className="d3-contact-link">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Veerplaat 10, Dordrecht
          </span>
        </div>
        <div style={{ marginTop: 40 }}>
          <a href="#producten" className="d3-btn">Bekijk onze airco's</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="d3-footer">
        <div className="d3-footer-copy">© 2024 AircoStunt</div>
        <div className="d3-footer-copy">Veerplaat 10 · Dordrecht · info@aircostunt.com</div>
        <div className="d3-footer-copy">KvK Dordrecht</div>
      </footer>

      <Link to="/" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: '#1C1C1C', color: '#fff', padding: '11px 20px', borderRadius: 9999, textDecoration: 'none', fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
        ← Alle ontwerpen
      </Link>
    </div>
  )
}
