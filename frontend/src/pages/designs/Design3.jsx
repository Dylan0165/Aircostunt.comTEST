import { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, OPENING_HOURS } from '../../data/staticData'

const BASE = '/design/3'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');

.d3 *, .d3 *::before, .d3 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d3 { font-family: 'Jost', sans-serif; font-weight: 300; background: #FAFAF7; color: #1C1C1C; line-height: 1.6; min-height: 100vh; }
.d3 a { text-decoration: none; color: inherit; }

.d3-serif { font-family: 'Cormorant Garamond', Georgia, serif; }

.d3-rule { width: 100%; height: 1px; background: rgba(196,146,74,0.3); border: none; }
.d3-rule-sm { width: 40px; height: 1px; background: #C4924A; border: none; margin: 0 auto 24px; }

.d3-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(250,250,247,0.97); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 60px; height: 72px;
  border-bottom: 1px solid rgba(196,146,74,0.2);
}
.d3-nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.04em; color: #1C1C1C; }
.d3-nav-logo span { color: #003366; }
.d3-nav-links { display: flex; gap: 36px; }
.d3-nav-links a { font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(28,28,28,0.5); transition: color 0.2s; }
.d3-nav-links a:hover, .d3-nav-links a.active { color: #003366; }
.d3-nav-cta { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 10px 24px; border: 1px solid #003366; color: #003366; transition: all 0.25s; }
.d3-nav-cta:hover { background: #003366; color: #fff; }
.d3-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
.d3-hamburger span { display: block; width: 22px; height: 1px; background: #1C1C1C; transition: all 0.3s; }
.d3-mobile-menu { display: none; position: fixed; top: 72px; left: 0; right: 0; background: rgba(250,250,247,0.98); border-bottom: 1px solid rgba(196,146,74,0.2); z-index: 99; padding: 28px 32px; }
.d3-mobile-menu.open { display: block; }
.d3-mobile-menu a { display: block; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(28,28,28,0.6); padding: 12px 0; border-bottom: 1px solid rgba(196,146,74,0.1); }
.d3-mobile-menu a:last-child { border-bottom: none; }

.d3-hero { min-height: 90vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 60px 80px; position: relative; }
.d3-hero::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 1px; height: 80px; background: linear-gradient(to bottom, transparent, rgba(196,146,74,0.5)); }
.d3-hero-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #C4924A; margin-bottom: 40px; }
.d3-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 96px); font-weight: 300; line-height: 1.0; letter-spacing: -0.02em; margin-bottom: 8px; color: #0D0D0D; }
.d3-hero h1 em { font-style: italic; color: #003366; }
.d3-hero-sub { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 2.8vw, 38px); font-weight: 300; font-style: italic; color: rgba(28,28,28,0.38); margin-bottom: 48px; }
.d3-hero-desc { font-size: 14px; max-width: 420px; line-height: 1.9; color: rgba(28,28,28,0.5); margin-bottom: 52px; font-weight: 300; }
.d3-hero-actions { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; justify-content: center; }
.d3-btn { display: inline-block; font-size: 11px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 32px; border: 1px solid #003366; color: #003366; transition: all 0.3s; }
.d3-btn:hover { background: #003366; color: #fff; }
.d3-btn-orange { border-color: #FF6600; color: #FF6600; }
.d3-btn-orange:hover { background: #FF6600; color: #fff; }
.d3-link { font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(28,28,28,0.4); display: flex; align-items: center; gap: 8px; transition: color 0.2s; }
.d3-link:hover { color: #003366; }

.d3-usps { display: flex; border-top: 1px solid rgba(196,146,74,0.2); border-bottom: 1px solid rgba(196,146,74,0.2); }
.d3-usp { flex: 1; padding: 32px 20px; text-align: center; border-right: 1px solid rgba(196,146,74,0.12); }
.d3-usp:last-child { border-right: none; }
.d3-usp-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #003366; line-height: 1; margin-bottom: 8px; }
.d3-usp-key { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(28,28,28,0.4); }

.d3-section { max-width: 900px; margin: 0 auto; padding: 88px 40px; }
.d3-section-wide { max-width: 1200px; margin: 0 auto; padding: 88px 40px; }
.d3-section-header { text-align: center; margin-bottom: 64px; }
.d3-section-header h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(34px, 4vw, 52px); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 12px; }
.d3-section-header p { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(28,28,28,0.4); }

.d3-product-row { display: flex; align-items: center; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid rgba(28,28,28,0.07); transition: padding 0.25s; gap: 20px; }
.d3-product-row:first-of-type { border-top: 1px solid rgba(28,28,28,0.07); }
.d3-product-row:hover { padding-left: 16px; }
.d3-product-row-left { flex: 1; }
.d3-product-brand-tag { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #C4924A; margin-bottom: 5px; }
.d3-product-row-name { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; }
.d3-product-row-specs { font-size: 11px; color: rgba(28,28,28,0.4); margin-top: 3px; letter-spacing: 0.04em; }
.d3-product-row-right { display: flex; align-items: center; gap: 20px; }
.d3-product-row-price { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: #003366; white-space: nowrap; }
.d3-product-row-stock { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(28,28,28,0.3); white-space: nowrap; }

.d3-brands-bg { background: #F2EDE3; padding: 64px 40px; text-align: center; }
.d3-brands-eyebrow { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(28,28,28,0.4); margin-bottom: 36px; }
.d3-brands-logos { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; }
.d3-brand-logo-img { height: 32px; width: auto; object-fit: contain; filter: grayscale(1) opacity(0.5); transition: filter 0.3s; }
.d3-brand-logo-img:hover { filter: grayscale(0) opacity(1); }
.d3-brand-logo-text { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(28,28,28,0.35); }

.d3-reviews-section { background: #FAFAF7; }
.d3-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 32px; margin-top: 48px; }
.d3-review-card { padding: 32px; border: 1px solid rgba(196,146,74,0.2); }
.d3-review-stars { color: #C4924A; font-size: 12px; letter-spacing: 4px; margin-bottom: 16px; }
.d3-review-text { font-size: 14px; line-height: 1.8; color: rgba(28,28,28,0.65); margin-bottom: 20px; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 16px; }
.d3-review-name { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(28,28,28,0.35); }

.d3-cta-section { background: #003366; color: #fff; text-align: center; padding: 96px 40px; }
.d3-cta-section h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4.5vw, 60px); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 16px; }
.d3-cta-section p { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 48px; }
.d3-btn-white { border-color: rgba(255,255,255,0.5); color: #fff; }
.d3-btn-white:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

.d3-brands-page-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1px; background: rgba(196,146,74,0.15); }
.d3-brand-card { background: #FAFAF7; padding: 48px 36px; }
.d3-brand-card-logo { height: 44px; width: auto; object-fit: contain; margin-bottom: 28px; filter: grayscale(0.3); }
.d3-brand-card-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; margin-bottom: 12px; }
.d3-brand-card-desc { font-size: 13px; color: rgba(28,28,28,0.5); line-height: 1.75; }

.d3-filter-bar { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 48px; }
.d3-filter-btn { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; padding: 8px 20px; border: 1px solid rgba(28,28,28,0.15); background: none; cursor: pointer; color: rgba(28,28,28,0.5); transition: all 0.2s; }
.d3-filter-btn:hover, .d3-filter-btn.active { border-color: #003366; color: #003366; }

.d3-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: rgba(196,146,74,0.15); margin-bottom: 80px; }
.d3-product-card { background: #FAFAF7; padding: 32px; position: relative; }
.d3-product-card-img { width: 100%; height: 180px; object-fit: contain; margin-bottom: 24px; }
.d3-product-card-placeholder { width: 100%; height: 180px; background: linear-gradient(135deg, #f0ede6 0%, #e8e0d0 100%); margin-bottom: 24px; display: flex; align-items: center; justify-content: center; }
.d3-product-card-placeholder span { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(28,28,28,0.25); }
.d3-product-card-brand { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #C4924A; margin-bottom: 8px; }
.d3-product-card-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; margin-bottom: 12px; }
.d3-product-card-features { list-style: none; margin-bottom: 20px; }
.d3-product-card-features li { font-size: 12px; color: rgba(28,28,28,0.5); padding: 4px 0; border-bottom: 1px solid rgba(28,28,28,0.05); }
.d3-product-card-features li::before { content: '/ '; color: #C4924A; }
.d3-product-card-price { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #003366; }
.d3-product-card-price small { font-size: 13px; color: rgba(28,28,28,0.35); }
.d3-out-of-stock { position: absolute; top: 16px; right: 16px; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(28,28,28,0.3); }
.d3-in-stock { position: absolute; top: 16px; right: 16px; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: #C4924A; }

.d3-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1px; background: rgba(196,146,74,0.15); }
.d3-acc-card { background: #FAFAF7; padding: 28px; }
.d3-acc-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; margin-bottom: 8px; }
.d3-acc-desc { font-size: 12px; color: rgba(28,28,28,0.45); line-height: 1.7; margin-bottom: 16px; }
.d3-acc-price { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; color: #003366; }

.d3-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.d3-about-text h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 52px); font-weight: 300; letter-spacing: -0.02em; margin-bottom: 24px; line-height: 1.1; }
.d3-about-text p { font-size: 14px; color: rgba(28,28,28,0.55); line-height: 1.9; margin-bottom: 20px; }
.d3-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(196,146,74,0.15); }
.d3-stat { background: #FAFAF7; padding: 32px; text-align: center; }
.d3-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 48px; font-weight: 300; color: #003366; line-height: 1; margin-bottom: 8px; }
.d3-stat-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(28,28,28,0.4); }

.d3-faq { margin-top: 72px; }
.d3-faq-header { text-align: center; margin-bottom: 48px; }
.d3-faq-header h3 { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; }
.d3-faq-item { border-bottom: 1px solid rgba(196,146,74,0.2); }
.d3-faq-q { width: 100%; text-align: left; padding: 20px 0; background: none; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 400; color: #1C1C1C; font-family: 'Cormorant Garamond', serif; font-size: 18px; }
.d3-faq-q span { font-size: 16px; color: rgba(28,28,28,0.3); transition: transform 0.25s; }
.d3-faq-q.open span { transform: rotate(45deg); }
.d3-faq-a { font-size: 13px; color: rgba(28,28,28,0.55); line-height: 1.85; padding-bottom: 20px; max-width: 680px; }

.d3-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.d3-contact-info h2 { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 32px; }
.d3-contact-detail { margin-bottom: 28px; }
.d3-contact-detail-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(28,28,28,0.35); margin-bottom: 6px; }
.d3-contact-detail-val { font-size: 15px; font-weight: 300; }
.d3-contact-detail-val a { color: #003366; }
.d3-form-group { margin-bottom: 20px; }
.d3-form-group label { display: block; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(28,28,28,0.4); margin-bottom: 8px; }
.d3-form-control { width: 100%; padding: 12px 0; border: none; border-bottom: 1px solid rgba(28,28,28,0.15); background: transparent; font-family: 'Jost', sans-serif; font-size: 14px; font-weight: 300; color: #1C1C1C; outline: none; transition: border-color 0.2s; }
.d3-form-control:focus { border-color: #003366; }
.d3-form-control::placeholder { color: rgba(28,28,28,0.25); }
textarea.d3-form-control { resize: vertical; min-height: 100px; }

.d3-footer { background: #0D0D0D; color: rgba(255,255,255,0.5); padding: 64px 60px 32px; }
.d3-footer-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap; margin-bottom: 48px; }
.d3-footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: rgba(255,255,255,0.8); margin-bottom: 12px; }
.d3-footer-brand span { color: #C4924A; }
.d3-footer-tagline { font-size: 12px; color: rgba(255,255,255,0.3); max-width: 240px; line-height: 1.7; }
.d3-footer-nav { display: flex; flex-direction: column; gap: 12px; }
.d3-footer-nav-title { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 4px; }
.d3-footer-nav a { font-size: 13px; color: rgba(255,255,255,0.45); transition: color 0.2s; }
.d3-footer-nav a:hover { color: rgba(255,255,255,0.85); }
.d3-footer-bottom { border-top: 1px solid rgba(255,255,255,0.07); padding-top: 24px; display: flex; justify-content: space-between; font-size: 11px; flex-wrap: wrap; gap: 8px; }

.d3-page-hero { padding: 140px 60px 72px; text-align: center; border-bottom: 1px solid rgba(196,146,74,0.2); }
.d3-page-hero-eyebrow { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #C4924A; margin-bottom: 20px; }
.d3-page-hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 5vw, 72px); font-weight: 300; letter-spacing: -0.02em; }

@media (max-width: 900px) {
  .d3-nav { padding: 0 24px; }
  .d3-nav-links, .d3-nav-cta { display: none; }
  .d3-hamburger { display: flex; }
  .d3-hero { padding: 100px 24px 60px; }
  .d3-usps { flex-direction: column; }
  .d3-usp { border-right: none; border-bottom: 1px solid rgba(196,146,74,0.12); }
  .d3-usp:last-child { border-bottom: none; }
  .d3-section { padding: 64px 24px; }
  .d3-section-wide { padding: 64px 24px; }
  .d3-about-grid, .d3-contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .d3-brands-bg { padding: 48px 24px; }
  .d3-brands-logos { gap: 28px; }
  .d3-footer { padding: 48px 24px 24px; }
  .d3-footer-top { flex-direction: column; }
  .d3-page-hero { padding: 112px 24px 56px; }
  .d3-cta-section { padding: 72px 24px; }
}
`

function D3Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: 'Home', to: `${BASE}/` },
    { label: 'Merken', to: `${BASE}/merken` },
    { label: 'Producten', to: `${BASE}/producten` },
    { label: 'Over ons', to: `${BASE}/over-ons` },
    { label: 'Contact', to: `${BASE}/contact` },
  ]
  return (
    <>
      <nav className="d3-nav">
        <NavLink to={`${BASE}/`} className="d3-nav-logo">
          Airco<span>Stunt</span>
        </NavLink>
        <div className="d3-nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`}
              className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d3-nav-cta d3-btn">
          {SITE.phone}
        </a>
        <button className="d3-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`d3-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
        ))}
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{ color: '#003366' }}>{SITE.phone}</a>
      </div>
    </>
  )
}

function D3Footer() {
  return (
    <footer className="d3-footer">
      <div className="d3-footer-top">
        <div>
          <div className="d3-footer-brand">Airco<span>Stunt</span></div>
          <p className="d3-footer-tagline">Split-unit airco's van A-merken. 15 jaar ervaring. Alleen afhalen uit Dordrecht.</p>
        </div>
        <div className="d3-footer-nav">
          <span className="d3-footer-nav-title">Navigatie</span>
          {['Home', 'Merken', 'Producten', 'Over ons', 'Contact'].map((l, i) => {
            const slugs = ['/', '/merken', '/producten', '/over-ons', '/contact']
            return <NavLink key={l} to={`${BASE}${slugs[i]}`}>{l}</NavLink>
          })}
        </div>
        <div className="d3-footer-nav">
          <span className="d3-footer-nav-title">Contact</span>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{SITE.address}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Ma-Vr: 09:00-20:00 | Za: 09:00-13:00</span>
        </div>
      </div>
      <div className="d3-footer-bottom">
        <span>&copy; {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
        <span>Alleen afhalen, geen webshop</span>
      </div>
    </footer>
  )
}

function Stars({ n }) {
  return <div className="d3-review-stars">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</div>
}

function D3HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      {/* Hero */}
      <section className="d3-hero">
        <span className="d3-hero-eyebrow">Dordrecht, Nederland</span>
        <h1>Airco's van <em>A-merken</em></h1>
        <div className="d3-hero-sub">voor de laagste prijs</div>
        <p className="d3-hero-desc">Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct afhalen uit onze showroom.</p>
        <div className="d3-hero-actions">
          <button className="d3-btn" onClick={() => navigate(`${BASE}/producten`)}>Bekijk producten</button>
          <button className="d3-btn d3-btn-orange" onClick={() => navigate(`${BASE}/contact`)}>Neem contact op</button>
        </div>
      </section>

      {/* USPs */}
      <div className="d3-usps">
        {[
          { val: '15+', key: 'Jaar ervaring' },
          { val: '2 jr', key: 'Garantie' },
          { val: '5', key: 'A-merken' },
          { val: '0', key: 'Installatiekosten' },
        ].map(u => (
          <div key={u.key} className="d3-usp">
            <div className="d3-usp-val">{u.val}</div>
            <div className="d3-usp-key">{u.key}</div>
          </div>
        ))}
      </div>

      {/* Products preview */}
      <section className="d3-section">
        <div className="d3-section-header">
          <h2>Onze producten</h2>
          <p>Split-unit sets direct uit voorraad</p>
        </div>
        {PRODUCTS.slice(0, 5).map(p => (
          <div key={p.id} className="d3-product-row">
            <div className="d3-product-row-left">
              <div className="d3-product-brand-tag">{p.brandId}</div>
              <div className="d3-product-row-name">{p.name}</div>
              <div className="d3-product-row-specs">{p.features[0]}</div>
            </div>
            <div className="d3-product-row-right">
              <div className="d3-product-row-price">v.a. &euro;{p.priceFrom}</div>
              <div className="d3-product-row-stock">{p.inStock ? 'op voorraad' : 'tijdelijk uit'}</div>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="d3-btn" onClick={() => navigate(`${BASE}/producten`)}>Alle producten</button>
        </div>
      </section>

      <hr className="d3-rule" />

      {/* Brands */}
      <div className="d3-brands-bg">
        <div className="d3-brands-eyebrow">Merken die wij voeren</div>
        <div className="d3-brands-logos">
          {BRANDS.map(b => b.logo
            ? <img key={b.id} src={b.logo} alt={b.name} className="d3-brand-logo-img" />
            : <span key={b.id} className="d3-brand-logo-text">{b.name}</span>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="d3-reviews-section">
        <div className="d3-section-wide">
          <div className="d3-section-header">
            <div className="d3-rule-sm" style={{ marginBottom: 20 }} />
            <h2>Wat onze klanten zeggen</h2>
            <p>Google reviews</p>
          </div>
          <div className="d3-reviews-grid">
            {REVIEWS.slice(0, 6).map((r, i) => (
              <div key={i} className="d3-review-card">
                <Stars n={r.stars} />
                <p className="d3-review-text">"{r.text}"</p>
                <div className="d3-review-name">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d3-cta-section">
        <div className="d3-rule-sm" style={{ marginBottom: 40, background: 'rgba(255,255,255,0.2)' }} />
        <h2>Klaar om te bestellen?</h2>
        <p>Bel ons of kom langs in onze showroom in Dordrecht.</p>
        <div className="d3-hero-actions" style={{ justifyContent: 'center', marginTop: 48 }}>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d3-btn d3-btn-white">{SITE.phone}</a>
          <button className="d3-link" style={{ color: 'rgba(255,255,255,0.45)', cursor: 'pointer', background: 'none', border: 'none' }} onClick={() => navigate(`${BASE}/contact`)}>
            Of stuur een bericht
          </button>
        </div>
      </section>
    </div>
  )
}

function D3MerkenPage() {
  return (
    <div>
      <div className="d3-page-hero">
        <div className="d3-page-hero-eyebrow">Ons assortiment</div>
        <h1>De merken</h1>
      </div>
      <section className="d3-section-wide" style={{ paddingTop: 64 }}>
        <div className="d3-brands-page-grid">
          {BRANDS.map(b => (
            <div key={b.id} className="d3-brand-card">
              {b.logo
                ? <img src={b.logo} alt={b.name} className="d3-brand-card-logo" />
                : <div className="d3-brand-card-name" style={{ marginBottom: 16 }}>{b.name}</div>
              }
              {b.logo && <div className="d3-brand-card-name">{b.name}</div>}
              <p className="d3-brand-card-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D3ProductenPage() {
  const [active, setActive] = useState('all')
  const brandIds = ['all', ...BRANDS.map(b => b.id)]
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === active)
  return (
    <div>
      <div className="d3-page-hero">
        <div className="d3-page-hero-eyebrow">Ons assortiment</div>
        <h1>Alle producten</h1>
      </div>
      <section className="d3-section-wide" style={{ paddingTop: 64 }}>
        <div className="d3-filter-bar">
          {brandIds.map(id => (
            <button key={id} className={`d3-filter-btn ${active === id ? 'active' : ''}`}
              onClick={() => setActive(id)}>
              {id === 'all' ? 'Alles' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>
        <div className="d3-products-grid">
          {filtered.map(p => (
            <div key={p.id} className="d3-product-card">
              {p.inStock ? <div className="d3-in-stock">Op voorraad</div> : <div className="d3-out-of-stock">Tijdelijk uit</div>}
              {p.image
                ? <img src={p.image} alt={p.name} className="d3-product-card-img" />
                : <div className="d3-product-card-placeholder"><span>Afbeelding</span></div>
              }
              <div className="d3-product-card-brand">{p.brandId}</div>
              <div className="d3-product-card-name">{p.name}</div>
              <ul className="d3-product-card-features">
                {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="d3-product-card-price">
                <small>v.a. </small>&euro;{p.priceFrom}
              </div>
            </div>
          ))}
        </div>

        <div className="d3-section-header" style={{ marginBottom: 32 }}>
          <h2>Accessoires</h2>
          <p>Alles wat u nodig heeft voor de installatie</p>
        </div>
        <div className="d3-acc-grid">
          {ACCESSORIES.map(a => (
            <div key={a.id} className="d3-acc-card">
              <div className="d3-acc-name">{a.name}</div>
              <p className="d3-acc-desc">{a.description}</p>
              <div className="d3-acc-price">&euro;{a.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D3OverOnsPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      <div className="d3-page-hero">
        <div className="d3-page-hero-eyebrow">Ons verhaal</div>
        <h1>Over ons</h1>
      </div>
      <section className="d3-section-wide" style={{ paddingTop: 72 }}>
        <div className="d3-about-grid">
          <div className="d3-about-text">
            <h2>15 jaar <em style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', color: '#003366' }}>vakmanschap</em></h2>
            <p>AircoStunt is gevestigd in Dordrecht en al meer dan 15 jaar gespecialiseerd in de verkoop van split-unit airconditioners van A-merken.</p>
            <p>Wij werken uitsluitend met topmerken als Daikin, Mitsubishi Heavy, Mitsubishi Electric, Samsung en LG. Geen goedkope imitaties, geen compromissen op kwaliteit.</p>
            <p>Ons bedrijfsmodel is eenvoudig: geen showroomkosten, geen tussenpersonen, wel direct contact met de eigenaar. Dat scheelt u honderden euros.</p>
            <div style={{ marginTop: 32 }}>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d3-btn">{SITE.phone}</a>
            </div>
          </div>
          <div>
            <div className="d3-stats-grid">
              {[
                { val: '15+', label: 'Jaar ervaring' },
                { val: '2 jr', label: 'Garantie' },
                { val: '5', label: 'Topmerken' },
                { val: '100%', label: 'Klanttevredenheid' },
              ].map(s => (
                <div key={s.label} className="d3-stat">
                  <div className="d3-stat-val">{s.val}</div>
                  <div className="d3-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: 28, background: '#F2EDE3', borderTop: '2px solid #C4924A' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(28,28,28,0.4)', marginBottom: 8 }}>Openingstijden</div>
              <div style={{ fontSize: 14, lineHeight: 1.8 }}>
                <div>Maandag t/m vrijdag: 09:00 - 20:00</div>
                <div>Zaterdag: 09:00 - 13:00</div>
                <div style={{ color: '#C4924A', marginTop: 8, fontSize: 12 }}>Altijd bellen voor u langs komt!</div>
              </div>
            </div>
          </div>
        </div>

        <div className="d3-faq">
          <div className="d3-faq-header">
            <hr className="d3-rule-sm" style={{ marginBottom: 20 }} />
            <h3>Veelgestelde vragen</h3>
          </div>
          {FAQ.map((item, i) => (
            <div key={i} className="d3-faq-item">
              <button className={`d3-faq-q ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {item.q}
                <span>+</span>
              </button>
              {openIdx === i && <p className="d3-faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D3ContactPage() {
  return (
    <div>
      <div className="d3-page-hero">
        <div className="d3-page-hero-eyebrow">Neem contact op</div>
        <h1>Contact</h1>
      </div>
      <section className="d3-section-wide" style={{ paddingTop: 72 }}>
        <div className="d3-contact-grid">
          <div className="d3-contact-info">
            <h2>Wij staan voor u klaar</h2>
            {[
              { label: 'Telefoon', val: SITE.phone, href: `tel:${SITE.phone.replace(/[^0-9+]/g,'')}` },
              { label: 'E-mail', val: SITE.email, href: `mailto:${SITE.email}` },
              { label: 'Adres', val: SITE.address },
              { label: 'Openingstijden', val: 'Ma-Vr 09:00-20:00 | Za 09:00-13:00' },
            ].map(d => (
              <div key={d.label} className="d3-contact-detail">
                <div className="d3-contact-detail-label">{d.label}</div>
                <div className="d3-contact-detail-val">
                  {d.href ? <a href={d.href}>{d.val}</a> : d.val}
                </div>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={e => e.preventDefault()}>
              {[
                { label: 'Naam', type: 'text', placeholder: 'Uw naam' },
                { label: 'Telefoon', type: 'tel', placeholder: 'Uw telefoonnummer' },
                { label: 'E-mail', type: 'email', placeholder: 'Uw e-mailadres' },
              ].map(f => (
                <div key={f.label} className="d3-form-group">
                  <label>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="d3-form-control" />
                </div>
              ))}
              <div className="d3-form-group">
                <label>Bericht</label>
                <textarea placeholder="Uw bericht of vraag..." className="d3-form-control" rows={4} />
              </div>
              <button type="submit" className="d3-btn" style={{ width: '100%', textAlign: 'center', marginTop: 8 }}>
                Verstuur bericht
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="d3">
      <D3Header />
      <div style={{ paddingTop: 72 }}>{children}</div>
      <D3Footer />
    </div>
  )
}

export default function Design3() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D3HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D3MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D3ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D3OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D3ContactPage /></Layout>} />
      </Routes>
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#1C1C1C', color: '#fff',
          padding: '10px 18px', borderRadius: 0, textDecoration: 'none',
          fontSize: 11, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
      >
        Alle ontwerpen
      </Link>
    </>
  )
}
