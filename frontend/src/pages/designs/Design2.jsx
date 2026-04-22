import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE } from '../../data/staticData'

const BASE = '/design/2'
const DAIKIN_IMG = 'https://www.aircostunt.com/wp-content/uploads/2020/11/Daikin-Sensira-FTXF35B-10.jpg'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600&display=swap');
.d2*{box-sizing:border-box;margin:0;padding:0}
.d2{font-family:'Source Sans 3',sans-serif;background:#F7F2E8;color:#1a1208;min-height:100vh}
.d2 a{text-decoration:none;color:inherit}
.d2-serif{font-family:'Playfair Display',Georgia,serif}
.d2-nav{position:fixed;top:0;left:0;right:0;z-index:100;background:#F7F2E8;border-bottom:2px solid #003366;display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px}
.d2-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;letter-spacing:-0.01em}
.d2-logo span{color:#FF6600}
.d2-nav-links{display:flex;align-items:center;gap:4px}
.d2-nav-links a{padding:8px 14px;font-size:13px;font-weight:600;letter-spacing:0.03em;color:rgba(26,18,8,0.6);border-radius:4px;transition:all 0.2s}
.d2-nav-links a:hover,.d2-nav-links a.active{color:#003366;background:rgba(0,51,102,0.07)}
.d2-nav-cta{background:#FF6600;color:#fff;padding:9px 22px;font-size:13px;font-weight:700;border-radius:4px;transition:all 0.2s;margin-left:12px;white-space:nowrap}
.d2-nav-cta:hover{background:#CC5200}
.d2-mobile-btn{display:none;background:none;border:none;cursor:pointer;padding:8px;color:#1a1208}
.d2-mobile-menu{display:none;position:fixed;top:64px;left:0;right:0;background:#F7F2E8;border-bottom:2px solid #003366;z-index:99;padding:16px}
.d2-mobile-menu.open{display:block}
.d2-mobile-menu a{display:block;padding:12px 16px;font-size:15px;font-weight:600;color:rgba(26,18,8,0.7);border-radius:4px;transition:all 0.2s}
.d2-mobile-menu a:hover{color:#003366;background:rgba(0,51,102,0.07)}
.d2-page-hero{background:linear-gradient(145deg,#001a33 0%,#003366 100%);padding:96px 48px 56px;text-align:center;color:#fff}
.d2-page-hero h1{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,52px);font-weight:900;margin-bottom:12px}
.d2-page-hero p{font-size:17px;opacity:0.65;max-width:500px;margin:0 auto;font-weight:300}
.d2-section{padding:72px 48px;max-width:1240px;margin:0 auto}
.d2-section-title{margin-bottom:48px}
.d2-section-title h2{font-family:'Playfair Display',serif;font-size:clamp(28px,3.5vw,44px);font-weight:900;letter-spacing:-0.02em;margin-bottom:8px}
.d2-section-title p{font-size:16px;color:rgba(26,18,8,0.55);font-weight:300}
.d2-overline{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#FF6600;font-weight:700;margin-bottom:12px}
.d2-hero{display:grid;grid-template-columns:1fr 1fr;min-height:92vh;margin-top:64px}
.d2-hero-left{display:flex;flex-direction:column;justify-content:center;padding:64px 56px 64px 48px;border-right:2px solid #003366}
.d2-hero-right{background:#003366;position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end}
.d2-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.35;mix-blend-mode:luminosity}
.d2-hero-badge{position:absolute;top:32px;left:32px;background:#FF6600;color:#fff;padding:20px 24px}
.d2-hero-badge strong{display:block;font-family:'Playfair Display',serif;font-size:42px;font-weight:900;line-height:1}
.d2-hero-badge span{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.9}
.d2-hero h1{font-family:'Playfair Display',serif;font-size:clamp(40px,5vw,72px);line-height:1.0;letter-spacing:-0.02em;margin-bottom:28px;font-weight:900}
.d2-hero h1 em{font-style:italic;color:#FF6600}
.d2-hero-desc{font-size:17px;line-height:1.75;color:rgba(26,18,8,0.6);max-width:400px;margin-bottom:40px;font-weight:300}
.d2-hero-ctas{display:flex;align-items:center;gap:0;flex-wrap:wrap}
.d2-btn{display:inline-flex;align-items:center;gap:10px;background:#003366;color:#fff;padding:15px 30px;font-size:14px;font-weight:700;letter-spacing:0.04em;border-radius:0;transition:all 0.2s;cursor:pointer;border:none}
.d2-btn:hover{background:#FF6600}
.d2-btn-outline{display:inline-flex;align-items:center;gap:8px;padding:15px 24px;font-size:14px;font-weight:600;color:rgba(26,18,8,0.6);border:2px solid rgba(26,18,8,0.2);background:transparent;transition:all 0.2s;cursor:pointer;margin-left:-2px}
.d2-btn-outline:hover{border-color:#003366;color:#003366}
.d2-hero-bottom{position:relative;z-index:1;padding:32px;color:#fff}
.d2-usps{display:flex;background:#003366;border-top:3px solid #FF6600}
.d2-usp{flex:1;padding:28px 20px;border-right:1px solid rgba(255,255,255,0.1);text-align:center}
.d2-usp:last-child{border-right:none}
.d2-usp-val{font-family:'Playfair Display',serif;font-size:40px;font-weight:900;color:#FF6600;line-height:1;margin-bottom:4px}
.d2-usp-key{font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.6)}
.d2-products{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:2px;background:rgba(26,18,8,0.12)}
.d2-product{background:#F7F2E8;padding:32px;transition:all 0.25s;cursor:pointer;position:relative}
.d2-product:hover{background:#fff;box-shadow:0 12px 40px rgba(0,0,0,0.1);z-index:1}
.d2-product-img{width:100%;height:160px;object-fit:contain;margin-bottom:16px;background:#fff;padding:8px}
.d2-product-img-placeholder{width:100%;height:160px;background:linear-gradient(135deg,#003366,#004488);margin-bottom:16px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.4);font-size:13px}
.d2-product-brand{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#FF6600;font-weight:700;margin-bottom:8px}
.d2-product-name{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;margin-bottom:14px;line-height:1.2}
.d2-product-price{font-family:'Playfair Display',serif;font-size:36px;font-weight:900;color:#003366;margin-bottom:16px}
.d2-product-price sup{font-size:16px;vertical-align:super}
.d2-feat{font-size:13px;color:rgba(26,18,8,0.55);padding:5px 0;border-bottom:1px solid rgba(26,18,8,0.07);display:flex;align-items:center;gap:8px}
.d2-feat::before{content:'';width:4px;height:4px;background:#FF6600;border-radius:50%;flex-shrink:0}
.d2-stock{position:absolute;top:20px;right:20px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:3px 8px}
.d2-stock-in{background:#e8f5e9;color:#2e7d32}
.d2-stock-out{background:#fff3e0;color:#e65100}
.d2-brand-card{background:#fff;padding:32px;border:1px solid rgba(26,18,8,0.08);border-radius:4px;transition:all 0.25s}
.d2-brand-card:hover{border-color:#003366;box-shadow:0 8px 24px rgba(0,51,102,0.1)}
.d2-brand-logo{height:56px;object-fit:contain;margin-bottom:16px;max-width:140px}
.d2-brand-logo-placeholder{height:56px;display:flex;align-items:center;margin-bottom:16px}
.d2-brand-logo-placeholder span{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#003366}
.d2-review-card{background:#fff;padding:28px;border-left:3px solid #FF6600}
.d2-stars{color:#FBBC04;font-size:14px;letter-spacing:2px;margin-bottom:10px}
.d2-review-text{font-size:14px;line-height:1.7;color:rgba(26,18,8,0.65);margin-bottom:16px;font-style:italic}
.d2-review-author{font-weight:700;font-size:14px;color:#003366}
.d2-review-period{font-size:12px;color:rgba(26,18,8,0.4);margin-top:2px}
.d2-google-badge{display:inline-flex;align-items:center;gap:10px;background:#fff;border:1px solid rgba(26,18,8,0.12);padding:12px 20px;margin-bottom:40px}
.d2-faq-item{border-bottom:1px solid rgba(26,18,8,0.12)}
.d2-faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:20px 0;font-size:16px;font-weight:600;cursor:pointer;background:none;border:none;text-align:left;color:#1a1208;transition:color 0.2s}
.d2-faq-q:hover{color:#003366}
.d2-faq-a{font-size:15px;line-height:1.7;color:rgba(26,18,8,0.6);padding:0 0 20px;font-weight:300}
.d2-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.d2-contact-item{display:flex;align-items:flex-start;gap:16px;margin-bottom:24px}
.d2-contact-icon{width:40px;height:40px;background:#003366;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.d2-contact-label{font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(26,18,8,0.4);margin-bottom:4px}
.d2-contact-val{font-size:16px;font-weight:600;color:#1a1208}
.d2-cta-section{background:#003366;color:#fff;text-align:center;padding:80px 48px}
.d2-cta-section h2{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,52px);font-weight:900;margin-bottom:12px}
.d2-cta-section p{font-size:17px;opacity:0.7;margin-bottom:40px;font-weight:300}
.d2-footer{background:#1a1208;color:rgba(255,255,255,0.55);padding:48px}
.d2-footer-grid{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.08)}
.d2-footer-logo{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#fff;margin-bottom:12px}
.d2-footer-logo span{color:#FF6600}
.d2-footer-col h4{font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:16px}
.d2-footer-col a,.d2-footer-col span{display:block;font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:8px;transition:color 0.2s}
.d2-footer-col a:hover{color:#FF6600}
.d2-footer-bottom{max-width:1240px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;font-size:12px;flex-wrap:wrap;gap:8px}
@media(max-width:900px){
  .d2-hero{grid-template-columns:1fr;margin-top:64px}
  .d2-hero-right{min-height:280px}
  .d2-hero-left{padding:48px 24px}
  .d2-nav-links,.d2-nav-cta{display:none}
  .d2-mobile-btn{display:block}
  .d2-usps{flex-wrap:wrap}
  .d2-usp{flex:0 0 50%}
  .d2-section{padding:56px 24px}
  .d2-page-hero{padding:80px 24px 48px}
  .d2-contact-grid{grid-template-columns:1fr}
  .d2-footer-grid{grid-template-columns:1fr 1fr}
  .d2-footer{padding:40px 24px}
}
`

function D2Header() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Home', to: `${BASE}/` },
    { label: 'Merken', to: `${BASE}/merken` },
    { label: 'Producten', to: `${BASE}/producten` },
    { label: 'Over ons', to: `${BASE}/over-ons` },
    { label: 'Contact', to: `${BASE}/contact` },
  ]
  return (
    <>
      <nav className="d2-nav">
        <Link to={`${BASE}/`} className="d2-logo d2-serif">Airco<span>Stunt</span></Link>
        <div className="d2-nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`} className={({ isActive }) => `${isActive ? 'active' : ''}`}>{l.label}</NavLink>
          ))}
        </div>
        <a href="tel:0614700753" className="d2-nav-cta">Bel: 06-147 00 753</a>
        <button className="d2-mobile-btn" onClick={() => setOpen(v => !v)} aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      <div className={`d2-mobile-menu ${open ? 'open' : ''}`}>
        {links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>)}
        <a href="tel:0614700753" style={{ display: 'block', padding: '12px 16px', fontWeight: 700, color: '#FF6600' }}>Bel: 06-147 00 753</a>
      </div>
    </>
  )
}

function D2Footer() {
  const links = [
    { label: 'Home', to: `${BASE}/` },
    { label: 'Merken', to: `${BASE}/merken` },
    { label: 'Producten', to: `${BASE}/producten` },
    { label: 'Over ons', to: `${BASE}/over-ons` },
    { label: 'Contact', to: `${BASE}/contact` },
  ]
  return (
    <footer className="d2-footer">
      <div className="d2-footer-grid">
        <div>
          <div className="d2-footer-logo d2-serif">Airco<span>Stunt</span></div>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Split-unit airco's van A-merken voor de laagste prijs in Nederland. 15 jaar ervaring.</p>
          {['Grootste voorraad in de regio', '2 jaar fabrieksgarantie', 'Contant en pin betalen'].map(u => (
            <div key={u} style={{ fontSize: 13, opacity: 0.6, marginBottom: 4 }}>&#10003; {u}</div>
          ))}
        </div>
        <div className="d2-footer-col">
          <h4>Navigatie</h4>
          {links.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </div>
        <div className="d2-footer-col">
          <h4>Merken</h4>
          {BRANDS.map(b => <span key={b.id}>{b.name}</span>)}
        </div>
        <div className="d2-footer-col">
          <h4>Contact</h4>
          <a href="tel:0614700753">06-147 00 753</a>
          <a href="mailto:info@aircostunt.com">info@aircostunt.com</a>
          <span>Veerplaat 10, Dordrecht</span>
          <span>Ma-vr: 09:00 - 20:00</span>
          <span>Za: 09:00 - 13:00</span>
        </div>
      </div>
      <div className="d2-footer-bottom">
        <span>© {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
        <span>Alleen afhalen, geen webshop</span>
      </div>
    </footer>
  )
}

function D2HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="d2-hero">
        <div className="d2-hero-left">
          <div className="d2-overline">AircoStunt Dordrecht · Opgericht 2009</div>
          <h1 className="d2-serif">
            De scherpste<br />
            aircoprijzen<br />
            in <em>Nederland.</em>
          </h1>
          <p className="d2-hero-desc">
            Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct af te halen uit onze showroom in Dordrecht, geen wachttijden, geen tussenpersoon.
          </p>
          <div className="d2-hero-ctas">
            <Link to={`${BASE}/producten`} className="d2-btn">
              Alle airco's bekijken
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <a href="tel:0614700753" className="d2-btn-outline">
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              06-147 00 753
            </a>
          </div>
        </div>
        <div className="d2-hero-right">
          <div className="d2-hero-badge">
            <span>Vanaf</span>
            <strong>€479</strong>
            <span>split-unit set</span>
          </div>
          <img className="d2-hero-img" src={DAIKIN_IMG} alt="Daikin airco" onError={e => { e.target.style.display = 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
          <div className="d2-hero-bottom">
            <div className="d2-serif" style={{ fontSize: 13, opacity: 0.7, fontStyle: 'italic', marginBottom: 4 }}>"Gratis WiFi-module bij Daikin airco's"</div>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.45 }}>Grootste voorraad van de regio</div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <div className="d2-usps">
        {[['15', 'Jaar ervaring'], ['€479', 'Vanafprijs'], ['5', 'A-merken'], ['2 jr', 'Garantie'], ['100%', 'Op voorraad']].map(([v, k]) => (
          <div key={k} className="d2-usp">
            <div className="d2-usp-val d2-serif">{v}</div>
            <div className="d2-usp-key">{k}</div>
          </div>
        ))}
      </div>

      {/* Products preview */}
      <div style={{ background: '#F0EBE0', padding: '72px 0' }}>
        <div className="d2-section" style={{ padding: '0 48px' }}>
          <div className="d2-section-title">
            <div className="d2-overline">Direct afhaalbaar</div>
            <h2 className="d2-serif">Populaire modellen</h2>
            <p>Bekijk ons volledige assortiment op de productenpagina</p>
          </div>
          <div className="d2-products">
            {PRODUCTS.slice(0, 4).map(p => {
              const brand = BRANDS.find(b => b.id === p.brandId)
              return (
                <div key={p.id} className="d2-product">
                  <div className={`d2-stock ${p.inStock ? 'd2-stock-in' : 'd2-stock-out'}`}>{p.inStock ? 'Op voorraad' : 'Uitverkocht'}</div>
                  {p.image ? <img className="d2-product-img" src={p.image} alt={p.name} onError={e => { e.target.className = 'd2-product-img-placeholder'; e.target.innerHTML = brand?.name || '' }} /> : <div className="d2-product-img-placeholder"><span>{brand?.name}</span></div>}
                  <div className="d2-product-brand">{brand?.name}</div>
                  <div className="d2-product-name d2-serif">{p.name}</div>
                  <div className="d2-product-price d2-serif"><sup>v.a. </sup>€{p.priceFrom}</div>
                  {p.features.slice(0, 3).map(f => <div key={f} className="d2-feat">{f}</div>)}
                </div>
              )
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to={`${BASE}/producten`} className="d2-btn">Alle {PRODUCTS.length} modellen bekijken</Link>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="d2-section">
        <div className="d2-section-title">
          <div className="d2-overline">Uitsluitend A-merken</div>
          <h2 className="d2-serif">Onze merken</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
          {BRANDS.map(b => (
            <div key={b.id} className="d2-brand-card">
              {b.logo ? <img src={b.logo} alt={b.name} className="d2-brand-logo" onError={e => { e.target.style.display = 'none' }} /> : <div className="d2-brand-logo-placeholder"><span>{b.name}</span></div>}
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{b.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(26,18,8,0.55)', lineHeight: 1.6 }}>{b.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ background: '#EEE8D9', padding: '72px 0' }}>
        <div className="d2-section" style={{ padding: '0 48px' }}>
          <div className="d2-section-title" style={{ textAlign: 'center' }}>
            <div className="d2-overline">Klantbeoordelingen</div>
            <h2 className="d2-serif">Wat klanten zeggen</h2>
            <div className="d2-google-badge" style={{ margin: '16px auto 0' }}>
              <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }}><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              <span style={{ fontWeight: 700, fontSize: 16 }}>4,8</span>
              <span style={{ color: '#FBBC04', fontSize: 14 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span style={{ fontSize: 13, color: 'rgba(26,18,8,0.45)' }}>23 Google reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {REVIEWS.slice(0, 6).map(r => (
              <div key={r.name} className="d2-review-card">
                <div className="d2-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="d2-review-text">"{r.text}"</p>
                <div className="d2-review-author">{r.name}</div>
                {r.period && <div className="d2-review-period">{r.period}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="d2-cta-section">
        <div className="d2-overline" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Klaar om te bestellen?</div>
        <h2 className="d2-serif">Kom langs in Dordrecht</h2>
        <p>Altijd 30 minuten van tevoren bellen. Wij staan voor u klaar.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:0614700753" className="d2-btn" style={{ background: '#FF6600' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            Bel: 06-147 00 753
          </a>
          <Link to={`${BASE}/contact`} className="d2-btn-outline" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Contact</Link>
        </div>
      </div>
    </>
  )
}

function D2MerkenPage() {
  return (
    <>
      <div className="d2-page-hero">
        <h1 className="d2-serif">Onze Merken</h1>
        <p>Wij leveren uitsluitend split-unit airco's van de beste A-merken ter wereld.</p>
      </div>
      <div className="d2-section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 24 }}>
          {BRANDS.map(b => (
            <div key={b.id} className="d2-brand-card" style={{ padding: 40 }}>
              {b.logo ? <img src={b.logo} alt={b.name} style={{ height: 64, objectFit: 'contain', marginBottom: 20, maxWidth: 160 }} onError={e => { e.target.style.display = 'none' }} /> : null}
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, marginBottom: 10, color: '#003366' }}>{b.name}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(26,18,8,0.6)', fontWeight: 300, marginBottom: 20 }}>{b.description}</p>
              <div style={{ fontSize: 13, color: '#FF6600', fontWeight: 700, letterSpacing: '0.06em' }}>
                {PRODUCTS.filter(p => p.brandId === b.id).length} modellen op voorraad
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function D2ProductenPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === filter)
  return (
    <>
      <div className="d2-page-hero">
        <h1 className="d2-serif">Producten en Accessoires</h1>
        <p>Split-unit airco's van A-merken en alle accessoires voor een complete installatie.</p>
      </div>
      <div className="d2-section">
        <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
          {['all', ...BRANDS.map(b => b.id)].map(id => (
            <button key={id} onClick={() => setFilter(id)} style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, padding: '8px 18px', background: filter === id ? '#003366' : 'transparent', color: filter === id ? '#fff' : 'rgba(26,18,8,0.6)', border: `2px solid ${filter === id ? '#003366' : 'rgba(26,18,8,0.2)'}`, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em' }}>
              {id === 'all' ? 'Alle merken' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>
        <div className="d2-products" style={{ marginBottom: 64 }}>
          {filtered.map(p => {
            const brand = BRANDS.find(b => b.id === p.brandId)
            return (
              <div key={p.id} className="d2-product">
                <div className={`d2-stock ${p.inStock ? 'd2-stock-in' : 'd2-stock-out'}`}>{p.inStock ? 'Op voorraad' : 'Uitverkocht'}</div>
                {p.image ? <img className="d2-product-img" src={p.image} alt={p.name} onError={e => { e.target.style.display = 'none' }} /> : <div className="d2-product-img-placeholder"><span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{brand?.name}</span></div>}
                <div className="d2-product-brand">{brand?.name}</div>
                <div className="d2-product-name d2-serif">{p.name}</div>
                <div className="d2-product-price d2-serif"><sup>v.a. </sup>€{p.priceFrom}</div>
                {p.features.map(f => <div key={f} className="d2-feat">{f}</div>)}
              </div>
            )
          })}
        </div>
        <div className="d2-section-title">
          <h2 className="d2-serif">Accessoires</h2>
          <p>Alles wat u nodig heeft voor een complete installatie</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
          {ACCESSORIES.map(a => (
            <div key={a.id} className="d2-brand-card" style={{ padding: 28 }}>
              {a.image && <img src={a.image} alt={a.name} style={{ width: '100%', height: 120, objectFit: 'cover', marginBottom: 16 }} onError={e => { e.target.style.display = 'none' }} />}
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{a.name}</div>
              <div style={{ fontSize: 13, color: 'rgba(26,18,8,0.55)', lineHeight: 1.6, marginBottom: 12 }}>{a.description}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 900, color: '#FF6600' }}>€{a.price}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function D2OverOnsPage() {
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <>
      <div className="d2-page-hero">
        <h1 className="d2-serif">Over AircoStunt</h1>
        <p>15 jaar ervaring als betrouwbare specialist in split-unit airconditioners in de regio Dordrecht.</p>
      </div>
      <div className="d2-section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <div className="d2-overline">Ons verhaal</div>
            <h2 className="d2-serif" style={{ fontSize: 36, marginBottom: 20 }}>Waarom AircoStunt?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(26,18,8,0.65)', marginBottom: 20, fontWeight: 300 }}>
              AircoStunt verkoopt al meer dan 15 jaar kwalitatieve split-unit airco's voor scherpe prijzen. Wij kopen rechtstreeks in grote hoeveelheden in, waardoor wij de laagste prijzen in Nederland kunnen aanbieden.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(26,18,8,0.65)', fontWeight: 300 }}>
              Wij geven geen korting want onze prijzen zijn al het laagst. Direct afhalen uit onze showroom in Dordrecht, gratis advies bij afhalen en 2 jaar fabrieksgarantie op alle producten.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignContent: 'start' }}>
            {[['15+', 'Jaar ervaring'], ['€479', 'Vanafprijs'], ['5', 'Topmerken'], ['100%', 'Op voorraad']].map(([v, k]) => (
              <div key={k} style={{ background: '#fff', padding: 28, border: '1px solid rgba(26,18,8,0.08)' }}>
                <div className="d2-serif" style={{ fontSize: 40, fontWeight: 900, color: '#FF6600', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 13, color: 'rgba(26,18,8,0.5)', marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 72 }}>
          <div className="d2-section-title">
            <h2 className="d2-serif">Veelgestelde vragen</h2>
          </div>
          {FAQ.map((item, i) => (
            <div key={i} className="d2-faq-item">
              <button className="d2-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
              </button>
              {openFaq === i && <div className="d2-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function D2ContactPage() {
  return (
    <>
      <div className="d2-page-hero">
        <h1 className="d2-serif">Contact</h1>
        <p>Bel 30 minuten van tevoren. Wij staan voor u klaar in onze showroom in Dordrecht.</p>
      </div>
      <div className="d2-section">
        <div className="d2-contact-grid">
          <div>
            <div className="d2-section-title">
              <div className="d2-overline">Bereikbaarheid</div>
              <h2 className="d2-serif">Kom langs of bel ons</h2>
            </div>
            {[
              { icon: '📍', label: 'Adres', val: 'Veerplaat 10, 3313 LJ Dordrecht' },
              { icon: '📞', label: 'Telefoon', val: '06-147 00 753' },
              { icon: '✉️', label: 'E-mail', val: 'info@aircostunt.com' },
              { icon: '🕐', label: 'Openingstijden', val: 'Ma-vr: 09:00 - 20:00 | Za: 09:00 - 13:00' },
            ].map(c => (
              <div key={c.label} className="d2-contact-item">
                <div className="d2-contact-icon">
                  <span style={{ fontSize: 16 }}>{c.icon}</span>
                </div>
                <div>
                  <div className="d2-contact-label">{c.label}</div>
                  <div className="d2-contact-val">{c.val}</div>
                </div>
              </div>
            ))}
            <div style={{ background: '#FFF3E0', borderLeft: '3px solid #FF6600', padding: '16px 20px', marginTop: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#E65100', marginBottom: 4 }}>Let op!</div>
              <div style={{ fontSize: 14, color: 'rgba(26,18,8,0.7)' }}>Altijd 30 minuten van tevoren bellen voor u langs komt. Wij geven bij afhalen gratis advies.</div>
            </div>
          </div>
          <div>
            <div className="d2-section-title">
              <div className="d2-overline">Stuur een bericht</div>
              <h2 className="d2-serif">Contactformulier</h2>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[['Naam', 'text', 'Uw volledige naam'], ['E-mailadres', 'email', 'uw@email.nl'], ['Telefoonnummer', 'tel', '06-...']].map(([label, type, placeholder]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,18,8,0.5)', marginBottom: 6 }}>{label}</label>
                  <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '12px 14px', border: '2px solid rgba(26,18,8,0.15)', background: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => { e.target.style.borderColor = '#003366' }} onBlur={e => { e.target.style.borderColor = 'rgba(26,18,8,0.15)' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,18,8,0.5)', marginBottom: 6 }}>Bericht</label>
                <textarea placeholder="Uw vraag of opmerking..." rows={5} style={{ width: '100%', padding: '12px 14px', border: '2px solid rgba(26,18,8,0.15)', background: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s' }} onFocus={e => { e.target.style.borderColor = '#003366' }} onBlur={e => { e.target.style.borderColor = 'rgba(26,18,8,0.15)' }} />
              </div>
              <button type="submit" className="d2-btn" style={{ alignSelf: 'flex-start' }}>Verstuur bericht</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function Layout({ children }) {
  return (
    <div className="d2">
      <D2Header />
      <div style={{ paddingTop: 64 }}>{children}</div>
      <D2Footer />
    </div>
  )
}

export default function Design2() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600&display=swap'
    document.head.appendChild(link)
    return () => { if (document.head.contains(link)) document.head.removeChild(link) }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D2HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D2MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D2ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D2OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D2ContactPage /></Layout>} />
      </Routes>
      <Link to="/" style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, background: '#1a1208', color: '#fff', padding: '10px 18px', borderRadius: 0, textDecoration: 'none', fontSize: 13, fontWeight: 700, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Alle ontwerpen
      </Link>
    </>
  )
}
