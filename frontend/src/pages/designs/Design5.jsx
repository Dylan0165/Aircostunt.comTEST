import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, BRANDS } from '../../data/staticData'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

.d5 * { box-sizing: border-box; margin: 0; padding: 0; }
.d5 { font-family: 'Space Mono', monospace; background: #FFFFFF; color: #000000; }
.d5-nav { background: #FF6600; display: flex; align-items: stretch; justify-content: space-between; border-bottom: 4px solid #000; position: sticky; top: 0; z-index: 100; }
.d5-nav-logo { font-family: 'Anton', sans-serif; font-size: 28px; letter-spacing: 0.04em; color: #fff; padding: 18px 32px; border-right: 4px solid #000; line-height: 1; display: flex; align-items: center; }
.d5-nav-logo span { color: #003366; }
.d5-nav-links { display: flex; align-items: stretch; }
.d5-nav-links a { display: flex; align-items: center; padding: 0 24px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.8); border-right: 2px solid rgba(0,0,0,0.2); text-decoration: none; transition: background 0.15s; }
.d5-nav-links a:hover { background: rgba(0,0,0,0.15); color: #fff; }
.d5-nav-phone { display: flex; align-items: center; padding: 0 32px; font-family: 'Anton', sans-serif; font-size: 16px; letter-spacing: 0.04em; color: #fff; border-left: 4px solid #000; }
.d5-hero { display: grid; grid-template-columns: 1fr 1fr; min-height: 85vh; border-bottom: 4px solid #000; }
.d5-hero-left { padding: 64px 56px; display: flex; flex-direction: column; justify-content: center; border-right: 4px solid #000; }
.d5-hero-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; background: #FF6600; color: #fff; display: inline-block; padding: 6px 14px; margin-bottom: 32px; }
.d5-hero h1 { font-family: 'Anton', sans-serif; font-size: clamp(52px, 7vw, 96px); line-height: 0.92; letter-spacing: 0.01em; text-transform: uppercase; color: #000; margin-bottom: 32px; }
.d5-hero h1 .blue { color: #003366; }
.d5-hero-body { font-size: 14px; line-height: 1.75; color: rgba(0,0,0,0.6); max-width: 380px; margin-bottom: 40px; }
.d5-cta-row { display: flex; gap: 0; }
.d5-btn-main { font-family: 'Anton', sans-serif; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase; padding: 18px 36px; background: #003366; color: #fff; border: 4px solid #003366; text-decoration: none; display: inline-flex; align-items: center; gap: 10px; transition: all 0.15s; }
.d5-btn-main:hover { background: #FF6600; border-color: #FF6600; }
.d5-btn-sec { font-family: 'Anton', sans-serif; font-size: 18px; letter-spacing: 0.04em; text-transform: uppercase; padding: 18px 32px; background: #fff; color: #000; border: 4px solid #000; text-decoration: none; display: inline-flex; align-items: center; transition: all 0.15s; margin-left: -4px; }
.d5-btn-sec:hover { background: #000; color: #fff; }
.d5-hero-right { background: #003366; display: flex; flex-direction: column; position: relative; overflow: hidden; }
.d5-hero-right-content { padding: 48px; display: flex; flex-direction: column; justify-content: flex-end; height: 100%; position: relative; z-index: 1; }
.d5-price-block { background: #FF6600; color: #fff; padding: 28px 32px; display: inline-block; margin-bottom: 24px; width: fit-content; }
.d5-price-block .label { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
.d5-price-block .price { font-family: 'Anton', sans-serif; font-size: 64px; line-height: 1; letter-spacing: -0.01em; }
.d5-slogan { font-family: 'Anton', sans-serif; font-size: 24px; letter-spacing: 0.03em; text-transform: uppercase; color: rgba(255,255,255,0.9); line-height: 1.2; }
.d5-manifesto { background: #000; color: #fff; padding: 0; border-bottom: 4px solid #FF6600; overflow: hidden; }
.d5-manifesto-inner { display: flex; overflow: hidden; white-space: nowrap; padding: 20px 0; animation: d5-scroll 20s linear infinite; }
.d5-manifesto-inner span { font-family: 'Anton', sans-serif; font-size: 22px; letter-spacing: 0.08em; text-transform: uppercase; padding: 0 48px; color: #FF6600; flex-shrink: 0; }
.d5-manifesto-inner span.white { color: #fff; }
@keyframes d5-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.d5-usps { display: grid; grid-template-columns: repeat(5, 1fr); border-bottom: 4px solid #000; }
.d5-usp { padding: 32px 28px; border-right: 4px solid #000; }
.d5-usp:last-child { border-right: none; }
.d5-usp:nth-child(odd) { background: #F5F5F5; }
.d5-usp-val { font-family: 'Anton', sans-serif; font-size: 52px; color: #FF6600; line-height: 1; letter-spacing: -0.01em; }
.d5-usp-key { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(0,0,0,0.5); margin-top: 6px; }
.d5-products-section { max-width: 100%; }
.d5-products-header { padding: 48px 48px 0; display: flex; align-items: baseline; gap: 0; justify-content: space-between; border-bottom: 4px solid #000; }
.d5-products-header h2 { font-family: 'Anton', sans-serif; font-size: 48px; text-transform: uppercase; letter-spacing: 0.02em; padding-bottom: 24px; }
.d5-products-header span { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.4); }
.d5-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); border-bottom: 4px solid #000; }
.d5-product { padding: 36px; border-right: 4px solid #000; border-bottom: 4px solid #000; transition: background 0.15s; cursor: pointer; position: relative; }
.d5-product:hover { background: #FF6600; color: #fff; }
.d5-product:hover .d5-product-price { color: #fff; }
.d5-product:hover .d5-product-brand { color: rgba(255,255,255,0.7); }
.d5-product:hover .d5-product-feat { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.8); }
.d5-product-brand { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(0,0,0,0.4); margin-bottom: 10px; transition: color 0.15s; }
.d5-product-name { font-family: 'Anton', sans-serif; font-size: 24px; text-transform: uppercase; letter-spacing: 0.02em; margin-bottom: 16px; line-height: 1.1; }
.d5-product-price { font-family: 'Anton', sans-serif; font-size: 44px; color: #003366; line-height: 1; margin-bottom: 20px; transition: color 0.15s; }
.d5-product-feat { font-size: 12px; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.1); color: rgba(0,0,0,0.6); transition: all 0.15s; }
.d5-product-badge { position: absolute; top: 24px; right: 24px; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border: 2px solid currentColor; }
.d5-product-badge.in { color: #003366; border-color: #003366; }
.d5-product-badge.out { color: rgba(0,0,0,0.3); border-color: rgba(0,0,0,0.3); }
.d5-brands { background: #003366; padding: 0; display: flex; }
.d5-brands-label { font-family: 'Anton', sans-serif; font-size: 18px; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.35); padding: 32px 40px; border-right: 4px solid rgba(255,255,255,0.15); white-space: nowrap; display: flex; align-items: center; }
.d5-brands-list { display: flex; align-items: stretch; flex: 1; }
.d5-brand { flex: 1; display: flex; align-items: center; justify-content: center; padding: 32px 20px; border-right: 4px solid rgba(255,255,255,0.1); font-family: 'Anton', sans-serif; font-size: 22px; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.55); transition: all 0.2s; }
.d5-brand:last-child { border-right: none; }
.d5-brand:hover { background: #FF6600; color: #fff; }
.d5-contact { display: grid; grid-template-columns: 1fr 1fr; border-top: 4px solid #000; }
.d5-contact-left { padding: 64px; background: #FF6600; color: #fff; }
.d5-contact-left h2 { font-family: 'Anton', sans-serif; font-size: 52px; text-transform: uppercase; line-height: 0.95; letter-spacing: 0.02em; margin-bottom: 28px; }
.d5-contact-right { padding: 64px; border-left: 4px solid #000; display: flex; flex-direction: column; gap: 24px; }
.d5-contact-item { display: flex; flex-direction: column; gap: 4px; }
.d5-contact-item-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(0,0,0,0.4); }
.d5-contact-item-val { font-family: 'Anton', sans-serif; font-size: 24px; letter-spacing: 0.03em; }
.d5-footer { background: #000; color: #fff; padding: 24px 48px; display: flex; align-items: center; justify-content: space-between; }
.d5-footer-logo { font-family: 'Anton', sans-serif; font-size: 22px; letter-spacing: 0.04em; text-transform: uppercase; }
.d5-footer-logo span { color: #FF6600; }
.d5-footer-copy { font-size: 11px; letter-spacing: 0.08em; color: rgba(255,255,255,0.35); }
@media (max-width: 768px) {
  .d5-nav { flex-wrap: wrap; }
  .d5-nav-links { display: none; }
  .d5-hero { grid-template-columns: 1fr; }
  .d5-hero-right { min-height: 300px; }
  .d5-hero-left { padding: 40px 24px; }
  .d5-usps { grid-template-columns: repeat(2, 1fr); }
  .d5-usp { border-bottom: 4px solid #000; }
  .d5-products-header { padding: 32px 24px 0; }
  .d5-brands { flex-direction: column; }
  .d5-brands-label { padding: 24px; border-right: none; border-bottom: 4px solid rgba(255,255,255,0.15); }
  .d5-contact { grid-template-columns: 1fr; }
  .d5-contact-left { padding: 48px 24px; }
  .d5-contact-right { padding: 48px 24px; border-left: none; border-top: 4px solid #000; }
  .d5-footer { padding: 24px; flex-direction: column; gap: 12px; }
}
`

export default function Design5() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <div className="d5">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav className="d5-nav">
        <div className="d5-nav-logo">Airco<span>Stunt</span></div>
        <div className="d5-nav-links">
          <a href="#producten">Airco's</a>
          <a href="#merken">Merken</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="d5-nav-phone">06-147 00 753</div>
      </nav>

      {/* Hero */}
      <section className="d5-hero">
        <div className="d5-hero-left">
          <div className="d5-hero-tag">Dordrecht — Nederland</div>
          <h1>
            De laagste<br />
            <span className="blue">airco</span><br />
            prijzen.
          </h1>
          <p className="d5-hero-body">
            Wij geven geen korting — die heb je al. Split-unit airco's van Daikin, Mitsubishi, Samsung en LG. Direct afhaalbaar uit onze showroom.
          </p>
          <div className="d5-cta-row">
            <a href="#producten" className="d5-btn-main">
              Bekijk alle sets
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="d5-btn-sec">Contact</a>
          </div>
        </div>
        <div className="d5-hero-right">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 40% 50%, rgba(255,102,0,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundImage: "url('https://www.aircostunt.com/wp-content/uploads/2020/11/Daikin-Sensira-FTXF35B-10.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
          <div className="d5-hero-right-content">
            <div className="d5-price-block">
              <div className="label">Laagste prijs v.a.</div>
              <div className="price">€479</div>
            </div>
            <div className="d5-slogan">
              Grootste<br />voorraad van<br />de regio.
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling manifesto */}
      <div className="d5-manifesto">
        <div className="d5-manifesto-inner">
          {[...Array(4)].map((_, i) => (
            <span key={i * 10 + 1}>LAAGSTE PRIJS</span>
          )).concat([...Array(4)].flatMap((_, i) => [
            <span key={i * 10 + 2} className="white">·</span>,
            <span key={i * 10 + 3}>DIRECT AFHALEN</span>,
            <span key={i * 10 + 4} className="white">·</span>,
            <span key={i * 10 + 5}>15 JAAR ERVARING</span>,
            <span key={i * 10 + 6} className="white">·</span>,
            <span key={i * 10 + 7}>LAAGSTE PRIJS</span>,
            <span key={i * 10 + 8} className="white">·</span>,
          ]))}
        </div>
      </div>

      {/* USPs */}
      <div className="d5-usps">
        {[
          { val: '15', key: 'Jaar ervaring' },
          { val: '€479', key: 'Vanafprijs' },
          { val: '5', key: 'A-merken' },
          { val: '2jr', key: 'Garantie' },
          { val: '100%', key: 'Op voorraad' },
        ].map((u, i) => (
          <div key={i} className="d5-usp">
            <div className="d5-usp-val">{u.val}</div>
            <div className="d5-usp-key">{u.key}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="d5-products-section" id="producten">
        <div className="d5-products-header">
          <h2>Onze airco's</h2>
          <span>{PRODUCTS.length} sets op voorraad</span>
        </div>
        <div className="d5-products-grid">
          {PRODUCTS.map(p => {
            const brand = BRANDS.find(b => b.id === p.brandId)
            return (
              <div key={p.id} className="d5-product">
                <div className={`d5-product-badge ${p.inStock ? 'in' : 'out'}`}>
                  {p.inStock ? 'Voorraad' : 'Uitverkocht'}
                </div>
                <div className="d5-product-brand">{brand?.name}</div>
                <div className="d5-product-name">{p.name}</div>
                <div className="d5-product-price">€{p.priceFrom}</div>
                <div>
                  {p.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="d5-product-feat">{f}</div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="d5-brands" id="merken">
        <div className="d5-brands-label">Merken</div>
        <div className="d5-brands-list">
          {BRANDS.map(b => (
            <div key={b.id} className="d5-brand">{b.name}</div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="d5-contact" id="contact">
        <div className="d5-contact-left">
          <h2>Bel ons. Kom langs. Haal op.</h2>
          <p style={{ fontSize: 14, lineHeight: 1.75, opacity: 0.85, marginBottom: 32 }}>
            Wij geven gratis advies bij afhalen. Altijd 30 minuten van tevoren bellen.
          </p>
          <a href="tel:0614700753" style={{ fontFamily: 'Anton, sans-serif', fontSize: 28, letterSpacing: '0.04em', color: '#fff', textDecoration: 'none', display: 'inline-block', padding: '16px 32px', background: '#000', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#003366'}
            onMouseLeave={e => e.currentTarget.style.background = '#000'}>
            06-147 00 753
          </a>
        </div>
        <div className="d5-contact-right">
          <div className="d5-contact-item">
            <div className="d5-contact-item-label">Adres</div>
            <div className="d5-contact-item-val">Veerplaat 10<br />Dordrecht</div>
          </div>
          <div className="d5-contact-item">
            <div className="d5-contact-item-label">E-mail</div>
            <div className="d5-contact-item-val" style={{ fontSize: 18 }}>info@aircostunt.com</div>
          </div>
          <div className="d5-contact-item">
            <div className="d5-contact-item-label">Openingstijden</div>
            <div className="d5-contact-item-val" style={{ fontSize: 18 }}>
              Ma-vr 09:00–20:00<br />Za 09:00–13:00
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="d5-footer">
        <div className="d5-footer-logo">Airco<span>Stunt</span></div>
        <div className="d5-footer-copy">© 2024 AircoStunt · Dordrecht · Alle rechten voorbehouden</div>
      </footer>

      <Link to="/" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: '#000', color: '#fff', padding: '12px 22px', textDecoration: 'none', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', border: '3px solid #FF6600', boxShadow: '4px 4px 0 #FF6600' }}>
        ← Alle ontwerpen
      </Link>
    </div>
  )
}
