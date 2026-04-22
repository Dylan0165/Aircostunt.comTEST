import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, BRANDS } from '../../data/staticData'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@200;300;400;500&display=swap');

.d7 * { box-sizing: border-box; margin: 0; padding: 0; }
.d7 { font-family: 'Outfit', sans-serif; font-weight: 300; background: #fff; color: #0A0E1A; }
.d7 a { text-decoration: none; color: inherit; }
.d7-heading { font-family: 'Plus Jakarta Sans', sans-serif; }
.d7-nav { position: sticky; top: 0; z-index: 100; background: rgba(1,26,56,0.98); backdrop-filter: blur(20px); height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; }
.d7-nav-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 22px; font-weight: 800; color: #fff; }
.d7-nav-logo span { color: #FF6600; }
.d7-nav-links { display: flex; gap: 36px; }
.d7-nav-links a { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.55); transition: color 0.2s; letter-spacing: 0.02em; }
.d7-nav-links a:hover { color: #fff; }
.d7-nav-cta { background: #FF6600; color: #fff; padding: 11px 28px; border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
.d7-nav-cta:hover { background: #FF8533; transform: translateY(-1px); }
/* Hero - full dark */
.d7-hero { background: linear-gradient(160deg, #001226 0%, #001E3C 50%, #011529 100%); min-height: 95vh; display: flex; align-items: center; position: relative; overflow: hidden; padding: 80px 48px; }
.d7-hero-dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 32px 32px; pointer-events: none; }
.d7-hero-glow { position: absolute; top: -20%; right: -10%; width: 60%; height: 100%; background: radial-gradient(ellipse, rgba(0,60,140,0.6) 0%, transparent 70%); pointer-events: none; }
.d7-hero-glow2 { position: absolute; bottom: -20%; left: 20%; width: 40%; height: 60%; background: radial-gradient(ellipse, rgba(255,102,0,0.12) 0%, transparent 70%); pointer-events: none; }
.d7-hero-content { position: relative; z-index: 1; max-width: 700px; }
.d7-hero-label { display: inline-flex; align-items: center; gap: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #FF6600; margin-bottom: 32px; }
.d7-hero-label::before { content: ''; width: 28px; height: 1px; background: #FF6600; }
.d7-hero h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(44px, 6vw, 84px); font-weight: 800; line-height: 1.05; color: #fff; margin-bottom: 28px; letter-spacing: -0.02em; }
.d7-hero h1 em { font-style: normal; color: #FF6600; }
.d7-hero-desc { font-size: 18px; color: rgba(255,255,255,0.55); line-height: 1.8; margin-bottom: 48px; max-width: 520px; }
.d7-hero-ctas { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
.d7-hero-btn { background: #FF6600; color: #fff; padding: 18px 44px; border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; display: inline-flex; align-items: center; gap: 12px; transition: all 0.25s; box-shadow: 0 8px 24px rgba(255,102,0,0.3); }
.d7-hero-btn:hover { background: #FF8533; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(255,102,0,0.4); }
.d7-hero-link { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.5); display: inline-flex; align-items: center; gap: 8px; transition: color 0.2s; }
.d7-hero-link:hover { color: #fff; }
.d7-hero-trust { position: absolute; bottom: 48px; right: 48px; z-index: 1; display: flex; gap: 12px; flex-wrap: wrap; }
.d7-trust-badge { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 8px; padding: 14px 20px; text-align: center; backdrop-filter: blur(8px); }
.d7-trust-badge-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800; color: #fff; line-height: 1; }
.d7-trust-badge-label { font-size: 11px; letter-spacing: 0.08em; color: rgba(255,255,255,0.4); margin-top: 4px; text-transform: uppercase; }
/* Stats strip */
.d7-stats { background: #F8FAFF; border-bottom: 1px solid #E8EFFF; display: grid; grid-template-columns: repeat(4, 1fr); }
.d7-stat { padding: 40px 32px; text-align: center; border-right: 1px solid #E8EFFF; }
.d7-stat:last-child { border-right: none; }
.d7-stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 48px; font-weight: 800; color: #001E3C; line-height: 1; }
.d7-stat-num span { color: #FF6600; }
.d7-stat-text { font-size: 14px; color: rgba(10,14,26,0.5); margin-top: 6px; font-weight: 400; }
/* Products - dark bg */
.d7-products-section { background: #001226; padding: 96px 48px; }
.d7-products-inner { max-width: 1240px; margin: 0 auto; }
.d7-products-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 48px; }
.d7-products-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #fff; letter-spacing: -0.02em; }
.d7-products-header p { font-size: 14px; color: rgba(255,255,255,0.4); margin-top: 6px; }
.d7-filter-strip { display: flex; gap: 8px; flex-shrink: 0; }
.d7-filter-btn { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 600; padding: 9px 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.2s; }
.d7-filter-btn.active, .d7-filter-btn:hover { background: #FF6600; border-color: #FF6600; color: #fff; }
.d7-products { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 16px; }
.d7-product { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 28px; transition: all 0.3s; cursor: pointer; position: relative; overflow: hidden; }
.d7-product:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,102,0,0.4); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
.d7-product::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #FF6600, transparent); opacity: 0; transition: opacity 0.3s; }
.d7-product:hover::before { opacity: 1; }
.d7-product-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
.d7-product-brand { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; background: rgba(255,102,0,0.12); padding: 4px 10px; border-radius: 4px; }
.d7-product-stock { font-size: 11px; font-weight: 600; }
.d7-product-stock.in { color: #4CAF50; }
.d7-product-stock.out { color: rgba(255,255,255,0.3); }
.d7-product-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 20px; line-height: 1.3; }
.d7-product-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 36px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 20px; }
.d7-product-price small { font-size: 14px; color: rgba(255,255,255,0.35); font-weight: 400; margin-right: 4px; }
.d7-product-feats { display: flex; flex-direction: column; gap: 7px; }
.d7-product-feat { font-size: 13px; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 8px; }
.d7-product-feat::before { content: ''; width: 4px; height: 4px; border-radius: 50%; background: #FF6600; flex-shrink: 0; }
/* Testimonials - light */
.d7-testimonials { padding: 80px 48px; max-width: 1240px; margin: 0 auto; }
.d7-testimonials-header { text-align: center; margin-bottom: 48px; }
.d7-testimonials-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(24px, 3vw, 40px); font-weight: 800; color: #001E3C; margin-bottom: 8px; letter-spacing: -0.02em; }
.d7-testimonials-header p { font-size: 15px; color: rgba(10,14,26,0.5); }
.d7-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.d7-review { background: #F8FAFF; border-radius: 12px; padding: 28px; border: 1px solid #E8EFFF; }
.d7-review-stars { color: #FF6600; font-size: 16px; margin-bottom: 12px; letter-spacing: 2px; }
.d7-review-text { font-size: 15px; line-height: 1.7; color: rgba(10,14,26,0.75); margin-bottom: 16px; font-style: italic; }
.d7-review-author { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 700; color: #001E3C; }
/* CTA - orange */
.d7-cta { background: linear-gradient(135deg, #FF6600 0%, #E04E00 100%); padding: 96px 48px; position: relative; overflow: hidden; }
.d7-cta::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 28px 28px; pointer-events: none; }
.d7-cta-inner { max-width: 700px; margin: 0 auto; text-align: center; position: relative; }
.d7-cta h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(32px, 4.5vw, 60px); font-weight: 800; color: #fff; margin-bottom: 16px; letter-spacing: -0.02em; }
.d7-cta p { font-size: 18px; color: rgba(255,255,255,0.8); margin-bottom: 40px; line-height: 1.7; }
.d7-cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.d7-cta-btn-white { background: #fff; color: #FF6600; padding: 18px 44px; border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 800; display: inline-flex; align-items: center; gap: 12px; transition: all 0.25s; box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
.d7-cta-btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
.d7-cta-btn-outline { background: transparent; color: #fff; padding: 18px 40px; border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; border: 2px solid rgba(255,255,255,0.5); display: inline-flex; align-items: center; gap: 10px; transition: all 0.25s; }
.d7-cta-btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.1); }
/* Footer */
.d7-footer { background: #00091A; padding: 56px 48px 40px; }
.d7-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.d7-footer-brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 12px; }
.d7-footer-brand span { color: #FF6600; }
.d7-footer-tagline { font-size: 14px; color: rgba(255,255,255,0.35); line-height: 1.7; max-width: 280px; }
.d7-footer-col h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 20px; }
.d7-footer-col-item { display: block; font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 10px; transition: color 0.2s; }
.d7-footer-col-item:hover { color: #fff; }
.d7-footer-bottom { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.d7-footer-copy { font-size: 12px; color: rgba(255,255,255,0.3); }
@media (max-width: 768px) {
  .d7-nav { padding: 0 20px; }
  .d7-nav-links { display: none; }
  .d7-hero { padding: 60px 24px 100px; }
  .d7-hero-trust { position: relative; bottom: auto; right: auto; padding: 24px; }
  .d7-stats { grid-template-columns: repeat(2, 1fr); }
  .d7-products-section { padding: 64px 24px; }
  .d7-products-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  .d7-testimonials { padding: 60px 24px; }
  .d7-cta { padding: 64px 24px; }
  .d7-footer { padding: 40px 24px 32px; }
  .d7-footer-top { grid-template-columns: 1fr; gap: 32px; }
}
`

const REVIEWS = [
  { text: "René heeft ons uitstekend geholpen. Airco werkt geweldig, beste koop die ik ooit heb gedaan.", author: "Coert A." },
  { text: "15 jaar ervaring merkt u direct. Eerlijk advies, lage prijs en direct afhaalbaar. Aanrader!", author: "Z.N." },
  { text: "Grootste voorraad die ik heb gezien. Alles op voorraad, vriendelijke service en topkwaliteit.", author: "Johan" },
]

export default function Design7() {
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Outfit:wght@200;300;400;500&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  const filtered = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === activeFilter)

  return (
    <div className="d7">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Nav */}
      <nav className="d7-nav">
        <div className="d7-nav-logo d7-heading">Airco<span>Stunt</span></div>
        <div className="d7-nav-links">
          <a href="#producten">Airco's</a>
          <a href="#merken">Merken</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="tel:0614700753" className="d7-nav-cta">
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Bel nu
        </a>
      </nav>

      {/* Hero */}
      <section className="d7-hero">
        <div className="d7-hero-dots" />
        <div className="d7-hero-glow" />
        <div className="d7-hero-glow2" />

        <div className="d7-hero-content">
          <div className="d7-hero-label">Laagste prijs in Nederland</div>
          <h1 className="d7-heading">
            Airco's van<br />
            <em>topmerken</em><br />
            direct uit<br />
            voorraad.
          </h1>
          <p className="d7-hero-desc">
            Daikin, Mitsubishi, Samsung en LG — 15 jaar ervaring, grootste voorraad in de regio. Wij geven geen korting, want onze prijzen zijn al het laagst.
          </p>
          <div className="d7-hero-ctas">
            <a href="#producten" className="d7-hero-btn">
              Bekijk alle modellen
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:0614700753" className="d7-hero-link">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              06-147 00 753
            </a>
          </div>
        </div>

        <div className="d7-hero-trust">
          {[
            { val: '15+', label: 'Jaar ervaring' },
            { val: '€479', label: 'Vanafprijs' },
            { val: '5', label: 'Topmerken' },
            { val: '2jr', label: 'Garantie' },
          ].map((b, i) => (
            <div key={i} className="d7-trust-badge">
              <div className="d7-trust-badge-val d7-heading">{b.val}</div>
              <div className="d7-trust-badge-label">{b.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <div className="d7-stats">
        {[
          { num: '15', suffix: '+', text: 'Jaar in de branche' },
          { num: '€479', suffix: '', text: 'Laagste vanafprijs' },
          { num: '100', suffix: '%', text: 'Op voorraad' },
          { num: '500', suffix: '+', text: 'Tevreden klanten' },
        ].map((s, i) => (
          <div key={i} className="d7-stat">
            <div className="d7-stat-num d7-heading">{s.num}<span>{s.suffix}</span></div>
            <div className="d7-stat-text">{s.text}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <section className="d7-products-section" id="producten">
        <div className="d7-products-inner">
          <div className="d7-products-header">
            <div>
              <h2 className="d7-heading">Onze airco's</h2>
              <p>Alle sets direct afhaalbaar in Dordrecht</p>
            </div>
            <div className="d7-filter-strip">
              {['all', ...BRANDS.map(b => b.id)].map(id => (
                <button key={id} onClick={() => setActiveFilter(id)} className={`d7-filter-btn ${activeFilter === id ? 'active' : ''}`}>
                  {id === 'all' ? 'Alle' : BRANDS.find(b => b.id === id)?.name}
                </button>
              ))}
            </div>
          </div>
          <div className="d7-products">
            {filtered.map(p => {
              const brand = BRANDS.find(b => b.id === p.brandId)
              return (
                <div key={p.id} className="d7-product">
                  <div className="d7-product-top">
                    <span className="d7-product-brand">{brand?.name}</span>
                    <span className={`d7-product-stock ${p.inStock ? 'in' : 'out'}`}>
                      {p.inStock ? '● Op voorraad' : '○ Uitverkocht'}
                    </span>
                  </div>
                  <div className="d7-product-name d7-heading">{p.name}</div>
                  <div className="d7-product-price d7-heading">
                    <small>v.a.</small>€{p.priceFrom}
                  </div>
                  <div className="d7-product-feats">
                    {p.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="d7-product-feat">{f}</div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="d7-testimonials" id="reviews">
        <div className="d7-testimonials-header">
          <h2 className="d7-heading">Wat klanten zeggen</h2>
          <p>★ 4.8 / 5 op Google — Honderden tevreden klanten</p>
        </div>
        <div className="d7-reviews-grid">
          {REVIEWS.map((r, i) => (
            <div key={i} className="d7-review">
              <div className="d7-review-stars">★★★★★</div>
              <p className="d7-review-text">"{r.text}"</p>
              <div className="d7-review-author d7-heading">{r.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="d7-cta" id="contact">
        <div className="d7-cta-inner">
          <h2 className="d7-heading">Klaar voor uw nieuwe airco?</h2>
          <p>
            Bel ons of stuur een e-mail. Wij helpen u graag. Kom langs in onze showroom in Dordrecht — altijd 30 minuten van tevoren bellen.
          </p>
          <div className="d7-cta-btns">
            <a href="tel:0614700753" className="d7-cta-btn-white">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Bel: 06-147 00 753
            </a>
            <a href="mailto:info@aircostunt.com" className="d7-cta-btn-outline">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              E-mail ons
            </a>
          </div>
          <p style={{ marginTop: 32, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
            Veerplaat 10 · Dordrecht · ma-vr 09:00–20:00 · za 09:00–13:00
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="d7-footer">
        <div className="d7-footer-top">
          <div>
            <div className="d7-footer-brand d7-heading">Airco<span>Stunt</span></div>
            <div className="d7-footer-tagline">Airco's van topmerken voor de laagste prijs. 15 jaar ervaring, grootste voorraad in de regio, direct afhaalbaar.</div>
          </div>
          <div>
            <div className="d7-footer-col">
              <h4>Merken</h4>
              {BRANDS.map(b => <span key={b.id} className="d7-footer-col-item">{b.name}</span>)}
            </div>
          </div>
          <div>
            <div className="d7-footer-col">
              <h4>Contact</h4>
              <a href="tel:0614700753" className="d7-footer-col-item">06-147 00 753</a>
              <a href="mailto:info@aircostunt.com" className="d7-footer-col-item">info@aircostunt.com</a>
              <span className="d7-footer-col-item">Veerplaat 10, Dordrecht</span>
              <span className="d7-footer-col-item">Ma-vr: 09:00–20:00</span>
              <span className="d7-footer-col-item">Za: 09:00–13:00</span>
            </div>
          </div>
        </div>
        <div className="d7-footer-bottom">
          <div className="d7-footer-copy">© 2024 AircoStunt · Alle rechten voorbehouden</div>
          <div className="d7-footer-copy">Dordrecht, Nederland</div>
        </div>
      </footer>

      <Link to="/" style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: '#FF6600', color: '#fff', padding: '12px 22px', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700, boxShadow: '0 6px 24px rgba(255,102,0,0.4)' }}>
        ← Alle ontwerpen
      </Link>
    </div>
  )
}
