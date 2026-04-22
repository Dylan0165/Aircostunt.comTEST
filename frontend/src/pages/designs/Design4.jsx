import { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/4'

const CSS = `
.d4 *, .d4 *::before, .d4 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d4 { font-family: 'Rajdhani', 'Arial', sans-serif; font-weight: 400; background: #060C18; color: #c8d8f0; line-height: 1.6; min-height: 100vh; }
.d4 a { text-decoration: none; color: inherit; }

.d4-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(6,12,24,0.96); backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,200,255,0.12);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 64px;
}
.d4-nav-logo { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 700; letter-spacing: 0.06em; color: #fff; }
.d4-nav-logo-dot { width: 8px; height: 8px; background: #00C8FF; border-radius: 50%; box-shadow: 0 0 8px #00C8FF; animation: d4-pulse 2s ease-in-out infinite; }
.d4-nav-logo span { color: #FF6600; }
@keyframes d4-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.d4-nav-links { display: flex; gap: 8px; }
.d4-nav-links a { font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(200,216,240,0.5); padding: 6px 14px; border: 1px solid transparent; transition: all 0.2s; }
.d4-nav-links a:hover, .d4-nav-links a.active { color: #00C8FF; border-color: rgba(0,200,255,0.25); background: rgba(0,200,255,0.06); }
.d4-nav-cta { font-size: 13px; font-weight: 600; letter-spacing: 0.08em; padding: 8px 20px; background: linear-gradient(135deg, #FF6600, #FF8533); color: #fff; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); transition: opacity 0.2s; }
.d4-nav-cta:hover { opacity: 0.85; }
.d4-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
.d4-hamburger span { display: block; width: 22px; height: 2px; background: #c8d8f0; transition: all 0.3s; }
.d4-mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(6,12,24,0.98); border-bottom: 1px solid rgba(0,200,255,0.12); z-index: 99; padding: 20px 24px; }
.d4-mobile-menu.open { display: block; }
.d4-mobile-menu a { display: block; font-size: 14px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(200,216,240,0.6); padding: 12px 0; border-bottom: 1px solid rgba(0,200,255,0.08); }

.d4-hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 80px 40px; }
.d4-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,40,80,0.5), transparent), radial-gradient(ellipse 50% 70% at 20% 80%, rgba(0,200,255,0.06), transparent); }
.d4-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,200,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.04) 1px, transparent 1px); background-size: 60px 60px; }
.d4-hero-content { position: relative; z-index: 1; max-width: 760px; }
.d4-hero-eyebrow { font-size: 12px; color: #00C8FF; letter-spacing: 0.2em; margin-bottom: 28px; display: flex; align-items: center; gap: 12px; }
.d4-hero-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: #00C8FF; }
.d4-hero h1 { font-size: clamp(48px, 7vw, 88px); font-weight: 700; line-height: 0.95; letter-spacing: -0.01em; color: #fff; margin-bottom: 24px; text-transform: uppercase; }
.d4-hero h1 em { font-style: normal; color: #FF6600; }
.d4-hero h1 .d4-hero-sub-h { display: block; font-size: 0.5em; font-weight: 300; color: rgba(200,216,240,0.4); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.d4-hero-sub { font-size: 16px; color: rgba(200,216,240,0.5); max-width: 500px; line-height: 1.7; margin-bottom: 48px; }
.d4-hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
.d4-btn { display: inline-block; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 12px 28px; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%); transition: all 0.25s; cursor: pointer; border: none; }
.d4-btn-primary { background: linear-gradient(135deg, #FF6600, #FF8533); color: #fff; }
.d4-btn-primary:hover { background: linear-gradient(135deg, #FF8533, #FF6600); }
.d4-btn-ghost { background: rgba(0,200,255,0.06); border: 1px solid rgba(0,200,255,0.3); color: #00C8FF; }
.d4-btn-ghost:hover { background: rgba(0,200,255,0.12); }
.d4-hero-stats { position: absolute; right: 60px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 24px; z-index: 1; }
.d4-stat-badge { border: 1px solid rgba(0,200,255,0.15); background: rgba(0,200,255,0.04); padding: 16px 20px; }
.d4-stat-badge-val { font-size: 28px; font-weight: 700; color: #00C8FF; line-height: 1; }
.d4-stat-badge-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(200,216,240,0.35); margin-top: 4px; }

.d4-ticker { background: rgba(0,200,255,0.06); border-top: 1px solid rgba(0,200,255,0.12); border-bottom: 1px solid rgba(0,200,255,0.12); overflow: hidden; padding: 10px 0; }
.d4-ticker-inner { display: flex; gap: 64px; white-space: nowrap; animation: d4-scroll 20s linear infinite; }
@keyframes d4-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.d4-ticker-item { font-size: 12px; color: rgba(0,200,255,0.4); letter-spacing: 0.1em; }

.d4-section { max-width: 1200px; margin: 0 auto; padding: 88px 40px; }
.d4-section-header { margin-bottom: 56px; }
.d4-section-eyebrow { font-size: 11px; color: #00C8FF; letter-spacing: 0.2em; margin-bottom: 12px; }
.d4-section-title { font-size: clamp(28px, 4vw, 44px); font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: -0.01em; }
.d4-section-line { width: 40px; height: 2px; background: linear-gradient(90deg, #FF6600, transparent); margin-top: 12px; }

.d4-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1px; background: rgba(0,200,255,0.08); margin-bottom: 48px; }
.d4-product-card { background: #0a1428; padding: 28px; position: relative; transition: background 0.25s; }
.d4-product-card:hover { background: #0e1c38; }
.d4-product-card-img { width: 100%; height: 160px; object-fit: contain; margin-bottom: 20px; filter: drop-shadow(0 0 16px rgba(0,200,255,0.12)); }
.d4-product-card-placeholder { width: 100%; height: 160px; background: linear-gradient(135deg, #0a1428 0%, #1a2a4a 100%); margin-bottom: 20px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(0,200,255,0.08); }
.d4-product-card-placeholder span { font-size: 10px; color: rgba(200,216,240,0.2); letter-spacing: 0.1em; }
.d4-product-brand { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #FF6600; margin-bottom: 6px; }
.d4-product-name { font-size: 17px; font-weight: 600; color: #fff; margin-bottom: 12px; }
.d4-product-features { margin-bottom: 16px; list-style: none; }
.d4-product-features li { font-size: 12px; color: rgba(200,216,240,0.45); padding: 3px 0; display: flex; align-items: center; gap: 8px; }
.d4-product-features li::before { content: ''; display: block; width: 4px; height: 4px; background: #00C8FF; border-radius: 50%; flex-shrink: 0; }
.d4-product-price { font-size: 24px; font-weight: 700; color: #00C8FF; }
.d4-product-price small { font-size: 13px; color: rgba(200,216,240,0.3); font-weight: 400; }
.d4-product-stock { position: absolute; top: 12px; right: 12px; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
.d4-in-stock { color: #00C8FF; }
.d4-out-stock { color: rgba(200,216,240,0.3); }

.d4-brands-section { background: #0a1428; border-top: 1px solid rgba(0,200,255,0.08); border-bottom: 1px solid rgba(0,200,255,0.08); padding: 56px 40px; }
.d4-brands-grid { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; max-width: 1200px; margin: 24px auto 0; }
.d4-brand-logo { height: 36px; object-fit: contain; filter: grayscale(1) brightness(2) opacity(0.3); transition: filter 0.3s; }
.d4-brand-logo:hover { filter: grayscale(0) opacity(1); }
.d4-brand-text { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(200,216,240,0.25); }

.d4-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1px; background: rgba(0,200,255,0.08); }
.d4-review-card { background: #0a1428; padding: 28px; }
.d4-review-stars { color: #FF6600; font-size: 12px; letter-spacing: 3px; margin-bottom: 14px; }
.d4-review-text { font-size: 14px; color: rgba(200,216,240,0.55); line-height: 1.75; margin-bottom: 16px; }
.d4-review-name { font-size: 11px; color: rgba(200,216,240,0.3); letter-spacing: 0.1em; }

.d4-cta-section { background: linear-gradient(135deg, #0a1428, #0e1c38); border-top: 1px solid rgba(255,102,0,0.2); border-bottom: 1px solid rgba(255,102,0,0.2); padding: 96px 40px; text-align: center; }
.d4-cta-section h2 { font-size: clamp(32px, 4.5vw, 56px); font-weight: 700; color: #fff; text-transform: uppercase; margin-bottom: 16px; }
.d4-cta-section p { font-size: 16px; color: rgba(200,216,240,0.45); margin-bottom: 48px; }

.d4-brands-page-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1px; background: rgba(0,200,255,0.08); }
.d4-brand-card-pg { background: #0a1428; padding: 40px 32px; }
.d4-brand-card-pg-logo { height: 40px; object-fit: contain; margin-bottom: 24px; filter: grayscale(0.3) brightness(1.2); }
.d4-brand-card-pg-accent { width: 24px; height: 2px; background: #FF6600; margin-bottom: 16px; }
.d4-brand-card-pg-name { font-size: 20px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; }
.d4-brand-card-pg-desc { font-size: 13px; color: rgba(200,216,240,0.45); line-height: 1.7; }

.d4-filter-bar { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 40px; }
.d4-filter-btn { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 18px; background: rgba(0,200,255,0.04); border: 1px solid rgba(0,200,255,0.12); color: rgba(200,216,240,0.4); cursor: pointer; transition: all 0.2s; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
.d4-filter-btn:hover, .d4-filter-btn.active { background: rgba(0,200,255,0.1); border-color: rgba(0,200,255,0.4); color: #00C8FF; }

.d4-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1px; background: rgba(0,200,255,0.08); }
.d4-acc-card { background: #0a1428; padding: 24px; }
.d4-acc-name { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
.d4-acc-desc { font-size: 12px; color: rgba(200,216,240,0.4); line-height: 1.65; margin-bottom: 14px; }
.d4-acc-price { font-size: 20px; font-weight: 700; color: #00C8FF; }

.d4-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.d4-about-text h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 24px; }
.d4-about-text p { font-size: 15px; color: rgba(200,216,240,0.5); line-height: 1.8; margin-bottom: 16px; }
.d4-stats-block { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(0,200,255,0.08); }
.d4-stat-block { background: #0a1428; padding: 28px; text-align: center; }
.d4-stat-block-val { font-size: 40px; font-weight: 700; color: #00C8FF; line-height: 1; }
.d4-stat-block-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(200,216,240,0.35); margin-top: 6px; }
.d4-hours-block { margin-top: 1px; background: #0a1428; padding: 24px; border-top: 2px solid #FF6600; }
.d4-hours-block-title { font-size: 11px; color: rgba(200,216,240,0.3); letter-spacing: 0.15em; margin-bottom: 12px; }
.d4-hours-block-row { font-size: 14px; color: rgba(200,216,240,0.6); padding: 4px 0; }

.d4-faq { margin-top: 80px; }
.d4-faq-title { font-size: 28px; font-weight: 700; color: #fff; text-transform: uppercase; margin-bottom: 32px; }
.d4-faq-item { border-bottom: 1px solid rgba(0,200,255,0.08); }
.d4-faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 18px 0; display: flex; justify-content: space-between; align-items: center; font-size: 17px; font-weight: 600; color: rgba(200,216,240,0.8); }
.d4-faq-q .d4-faq-icon { color: #00C8FF; font-size: 18px; transition: transform 0.25s; }
.d4-faq-q.open .d4-faq-icon { transform: rotate(45deg); }
.d4-faq-a { font-size: 14px; color: rgba(200,216,240,0.45); line-height: 1.8; padding-bottom: 18px; max-width: 640px; }

.d4-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.d4-contact-info h2 { font-size: 32px; font-weight: 700; color: #fff; text-transform: uppercase; margin-bottom: 32px; }
.d4-contact-detail { margin-bottom: 24px; }
.d4-contact-label { font-size: 10px; color: rgba(200,216,240,0.3); letter-spacing: 0.2em; margin-bottom: 6px; }
.d4-contact-val { font-size: 15px; color: rgba(200,216,240,0.7); }
.d4-contact-val a { color: #00C8FF; }
.d4-form-group { margin-bottom: 18px; }
.d4-form-label { font-size: 10px; color: rgba(200,216,240,0.3); letter-spacing: 0.2em; display: block; margin-bottom: 8px; }
.d4-form-control { width: 100%; background: rgba(0,200,255,0.04); border: 1px solid rgba(0,200,255,0.12); color: #c8d8f0; font-size: 15px; padding: 12px 16px; outline: none; transition: border-color 0.2s; }
.d4-form-control:focus { border-color: rgba(0,200,255,0.4); }
.d4-form-control::placeholder { color: rgba(200,216,240,0.2); }
textarea.d4-form-control { resize: vertical; min-height: 100px; }

.d4-footer { background: #030810; border-top: 1px solid rgba(0,200,255,0.08); padding: 56px 40px 24px; }
.d4-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.d4-footer-brand { font-size: 22px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px; }
.d4-footer-brand span { color: #FF6600; }
.d4-footer-tagline { font-size: 13px; color: rgba(200,216,240,0.3); line-height: 1.7; }
.d4-footer-nav-title { font-size: 10px; color: rgba(0,200,255,0.4); letter-spacing: 0.2em; margin-bottom: 16px; }
.d4-footer-nav a, .d4-footer-nav span { display: block; font-size: 13px; color: rgba(200,216,240,0.35); margin-bottom: 10px; transition: color 0.2s; }
.d4-footer-nav a:hover { color: rgba(200,216,240,0.75); }
.d4-footer-bottom { border-top: 1px solid rgba(0,200,255,0.06); padding-top: 20px; display: flex; justify-content: space-between; font-size: 10px; color: rgba(200,216,240,0.2); flex-wrap: wrap; gap: 8px; }

.d4-page-hero { padding: 128px 40px 64px; border-bottom: 1px solid rgba(0,200,255,0.08); background: radial-gradient(ellipse 60% 80% at 50% 0%, rgba(0,40,80,0.3), transparent); }
.d4-page-hero-eyebrow { font-size: 11px; color: #00C8FF; letter-spacing: 0.2em; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
.d4-page-hero-eyebrow::before { content: ''; display: block; width: 24px; height: 1px; background: #00C8FF; }
.d4-page-hero h1 { font-size: clamp(36px, 5vw, 64px); font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: -0.01em; }

@media (max-width: 900px) {
  .d4-nav { padding: 0 20px; }
  .d4-nav-links, .d4-nav-cta { display: none; }
  .d4-hamburger { display: flex; }
  .d4-hero { padding: 80px 24px 60px; }
  .d4-hero-stats { display: none; }
  .d4-section { padding: 64px 24px; }
  .d4-about-grid, .d4-contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .d4-footer-top { grid-template-columns: 1fr; gap: 32px; }
  .d4-brands-section { padding: 48px 24px; }
  .d4-page-hero { padding: 100px 24px 48px; }
  .d4-cta-section { padding: 72px 24px; }
}
@keyframes d4-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes d4-fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes d4-slideRight { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
.d4-hero-eyebrow { animation: d4-slideRight 0.6s ease both; }
.d4-hero h1 { animation: d4-fadeUp 0.7s ease both; animation-delay: 0.1s; }
.d4-hero-sub { animation: d4-fadeUp 0.7s ease both; animation-delay: 0.22s; }
.d4-hero-actions { animation: d4-fadeUp 0.7s ease both; animation-delay: 0.34s; }
.d4-hero-stats { animation: d4-fadeIn 0.9s ease both; animation-delay: 0.5s; }
.d4-product-card { transition: transform 0.25s, box-shadow 0.25s; }
.d4-product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,200,255,0.12); }
.d4-brand-card-pg { transition: transform 0.2s; }
.d4-brand-card-pg:hover { transform: translateY(-2px); }
`

function D4Header() {
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
      <nav className="d4-nav">
        <NavLink to={`${BASE}/`} className="d4-nav-logo">
          <div className="d4-nav-logo-dot" />
          Airco<span>Stunt</span>
        </NavLink>
        <div className="d4-nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`}
              className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d4-nav-cta">
          {SITE.phone}
        </a>
        <button className="d4-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`d4-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
        ))}
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{ color: '#FF6600' }}>{SITE.phone}</a>
      </div>
    </>
  )
}

function D4Footer() {
  const slugs = ['/', '/merken', '/producten', '/over-ons', '/contact']
  const labels = ['Home', 'Merken', 'Producten', 'Over ons', 'Contact']
  return (
    <footer className="d4-footer">
      <div className="d4-footer-top">
        <div>
          <div className="d4-footer-brand">Airco<span>Stunt</span></div>
          <p className="d4-footer-tagline">Split-unit airco's van A-merken voor de laagste prijs. 15 jaar ervaring. Alleen afhalen uit Dordrecht.</p>
        </div>
        <div className="d4-footer-nav">
          <div className="d4-footer-nav-title">Navigatie</div>
          {labels.map((l, i) => <NavLink key={l} to={`${BASE}${slugs[i]}`}>{l}</NavLink>)}
        </div>
        <div className="d4-footer-nav">
          <div className="d4-footer-nav-title">Contact</div>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span>{SITE.address}</span>
          <span>Ma-Vr 09:00-20:00</span>
          <span>Za 09:00-13:00</span>
        </div>
      </div>
      <div className="d4-footer-bottom">
        <span>&copy; {new Date().getFullYear()} AircoStunt</span>
        <span>Alleen afhalen, geen webshop</span>
      </div>
    </footer>
  )
}

const tickerItems = ['Daikin', 'Mitsubishi Heavy', 'Mitsubishi Electric', 'Samsung', 'LG', 'A++ Energielabel', '15 jaar ervaring', '2 jaar garantie', 'Laagste prijs', 'Dordrecht']

function D4HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      <section className="d4-hero">
        <div className="d4-hero-bg" />
        <div className="d4-hero-grid" />
        <div className="d4-hero-content">
          <div className="d4-hero-eyebrow">Aircostunt.com // Dordrecht</div>
          <h1>
            <span className="d4-hero-sub-h">Split-unit airco's</span>
            Laagste <em>prijs</em>
          </h1>
          <p className="d4-hero-sub">A-merken direct uit voorraad. Daikin, Mitsubishi, Samsung en LG. Geen wachttijden.</p>
          <div className="d4-hero-actions">
            <button className="d4-btn d4-btn-primary" onClick={() => navigate(`${BASE}/producten`)}>Bekijk producten</button>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d4-btn d4-btn-ghost">{SITE.phone}</a>
          </div>
        </div>
        <div className="d4-hero-stats">
          {[{ val: '15+', label: 'Jaar' }, { val: '5', label: 'Merken' }, { val: '2jr', label: 'Garantie' }].map(s => (
            <div key={s.label} className="d4-stat-badge">
              <div className="d4-stat-badge-val">{s.val}</div>
              <div className="d4-stat-badge-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="d4-ticker">
        <div className="d4-ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="d4-ticker-item">// {item}</span>
          ))}
        </div>
      </div>

      <section className="d4-section">
        <div className="d4-section-header">
          <div className="d4-section-eyebrow">// Assortiment</div>
          <div className="d4-section-title">Uitgelichte producten</div>
          <div className="d4-section-line" />
        </div>
        <div className="d4-products-grid">
          {PRODUCTS.slice(0, 4).map(p => (
            <div key={p.id} className="d4-product-card">
              <div className={`d4-product-stock ${p.inStock ? 'd4-in-stock' : 'd4-out-stock'}`}>
                {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
              </div>
              {p.image
                ? <img src={p.image} alt={p.name} className="d4-product-card-img" />
                : <div className="d4-product-card-placeholder"><span>// image</span></div>
              }
              <div className="d4-product-brand">{p.brandId}</div>
              <div className="d4-product-name">{p.name}</div>
              <ul className="d4-product-features">
                {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="d4-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="d4-btn d4-btn-ghost" onClick={() => navigate(`${BASE}/producten`)}>Alle producten bekijken</button>
        </div>
      </section>

      <div className="d4-brands-section">
        <div className="d4-section-header" style={{ maxWidth: 1200, margin: '0 auto 0' }}>
          <div className="d4-section-eyebrow">// Merken</div>
          <div className="d4-section-title">A-merken</div>
          <div className="d4-section-line" />
        </div>
        <div className="d4-brands-grid">
          {BRANDS.map(b => b.logo
            ? <img key={b.id} src={b.logo} alt={b.name} className="d4-brand-logo" />
            : <span key={b.id} className="d4-brand-text">{b.name}</span>
          )}
        </div>
      </div>

      <section className="d4-section">
        <div className="d4-section-header">
          <div className="d4-section-eyebrow">// Google reviews</div>
          <div className="d4-section-title">Wat klanten zeggen</div>
          <div className="d4-section-line" />
        </div>
        <div className="d4-reviews-grid">
          {REVIEWS.slice(0, 6).map((r, i) => (
            <div key={i} className="d4-review-card">
              <div className="d4-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
              <p className="d4-review-text">"{r.text}"</p>
              <div className="d4-review-name">{r.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="d4-cta-section">
        <h2>Klaar voor uw <span style={{ color: '#FF6600' }}>nieuwe</span> airco?</h2>
        <p>Bel direct of kom langs in onze showroom in Dordrecht</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d4-btn d4-btn-primary">{SITE.phone}</a>
          <button className="d4-btn d4-btn-ghost" onClick={() => navigate(`${BASE}/contact`)}>Stuur bericht</button>
        </div>
      </section>
    </div>
  )
}

function D4MerkenPage() {
  return (
    <div>
      <div className="d4-page-hero">
        <div className="d4-page-hero-eyebrow">Ons assortiment</div>
        <h1>De merken</h1>
      </div>
      <section className="d4-section">
        <div className="d4-brands-page-grid">
          {BRANDS.map(b => (
            <div key={b.id} className="d4-brand-card-pg">
              {b.logo && <img src={b.logo} alt={b.name} className="d4-brand-card-pg-logo" />}
              <div className="d4-brand-card-pg-accent" />
              <div className="d4-brand-card-pg-name">{b.name}</div>
              <p className="d4-brand-card-pg-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D4ProductenPage() {
  const [active, setActive] = useState('all')
  const brandIds = ['all', ...BRANDS.map(b => b.id)]
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === active)
  return (
    <div>
      <div className="d4-page-hero">
        <div className="d4-page-hero-eyebrow">Assortiment</div>
        <h1>Alle producten</h1>
      </div>
      <section className="d4-section">
        <div className="d4-filter-bar">
          {brandIds.map(id => (
            <button key={id} className={`d4-filter-btn ${active === id ? 'active' : ''}`} onClick={() => setActive(id)}>
              {id === 'all' ? 'Alles' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>
        <div className="d4-products-grid" style={{ marginBottom: 80 }}>
          {filtered.map(p => (
            <div key={p.id} className="d4-product-card">
              <div className={`d4-product-stock ${p.inStock ? 'd4-in-stock' : 'd4-out-stock'}`}>
                {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
              </div>
              {p.image
                ? <img src={p.image} alt={p.name} className="d4-product-card-img" />
                : <div className="d4-product-card-placeholder"><span>// image</span></div>
              }
              <div className="d4-product-brand">{p.brandId}</div>
              <div className="d4-product-name">{p.name}</div>
              <ul className="d4-product-features">
                {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <div className="d4-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
            </div>
          ))}
        </div>
        <div className="d4-section-header">
          <div className="d4-section-eyebrow">// Extra</div>
          <div className="d4-section-title">Accessoires</div>
          <div className="d4-section-line" />
        </div>
        <div className="d4-acc-grid">
          {ACCESSORIES.map(a => (
            <div key={a.id} className="d4-acc-card">
              <div className="d4-acc-name">{a.name}</div>
              <p className="d4-acc-desc">{a.description}</p>
              <div className="d4-acc-price">&euro;{a.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D4OverOnsPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      <div className="d4-page-hero">
        <div className="d4-page-hero-eyebrow">Ons verhaal</div>
        <h1>Over ons</h1>
      </div>
      <section className="d4-section">
        <div className="d4-about-grid">
          <div className="d4-about-text">
            <h2>15 jaar <span style={{ color: '#FF6600' }}>expertise</span></h2>
            <p>AircoStunt is gevestigd in Dordrecht en gespecialiseerd in de verkoop van split-unit airconditioners van A-merken.</p>
            <p>Door direct in te kopen bij fabrikanten en geen showroomkosten te rekenen, besparen onze klanten honderden euros op topmerken.</p>
            <p>Altijd eerlijk advies, altijd de eigenaar aan de lijn.</p>
            <div style={{ marginTop: 32 }}>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d4-btn d4-btn-primary">{SITE.phone}</a>
            </div>
          </div>
          <div>
            <div className="d4-stats-block">
              {[{ val: '15+', label: 'Jaar ervaring' }, { val: '5', label: 'Topmerken' }, { val: '2jr', label: 'Garantie' }, { val: '100%', label: 'Tevredenheid' }].map(s => (
                <div key={s.label} className="d4-stat-block">
                  <div className="d4-stat-block-val">{s.val}</div>
                  <div className="d4-stat-block-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="d4-hours-block">
              <div className="d4-hours-block-title">// Openingstijden</div>
              <div className="d4-hours-block-row">Maandag t/m vrijdag: 09:00 - 20:00</div>
              <div className="d4-hours-block-row">Zaterdag: 09:00 - 13:00</div>
              <div style={{ color: '#FF6600', fontSize: 12, marginTop: 8 }}>Altijd bellen voor u langs komt!</div>
            </div>
          </div>
        </div>
        <div className="d4-faq">
          <div className="d4-faq-title">// FAQ</div>
          {FAQ.map((item, i) => (
            <div key={i} className="d4-faq-item">
              <button className={`d4-faq-q ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {item.q}
                <span className="d4-faq-icon">+</span>
              </button>
              {openIdx === i && <p className="d4-faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D4ContactPage() {
  return (
    <div>
      <div className="d4-page-hero">
        <div className="d4-page-hero-eyebrow">Neem contact op</div>
        <h1>Contact</h1>
      </div>
      <section className="d4-section">
        <div className="d4-contact-grid">
          <div className="d4-contact-info">
            <h2>Wij staan klaar</h2>
            {[
              { label: 'Telefoon', val: SITE.phone, href: `tel:${SITE.phone.replace(/[^0-9+]/g,'')}` },
              { label: 'E-mail', val: SITE.email, href: `mailto:${SITE.email}` },
              { label: 'Adres', val: SITE.address },
              { label: 'Openingstijden', val: 'Ma-Vr 09:00-20:00 | Za 09:00-13:00' },
            ].map(d => (
              <div key={d.label} className="d4-contact-detail">
                <div className="d4-contact-label">{d.label}</div>
                <div className="d4-contact-val">
                  {d.href ? <a href={d.href}>{d.val}</a> : d.val}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={e => e.preventDefault()}>
            {[
              { label: 'Naam', type: 'text', ph: 'Uw naam' },
              { label: 'Telefoon', type: 'tel', ph: 'Uw telefoonnummer' },
              { label: 'E-mail', type: 'email', ph: 'Uw e-mailadres' },
            ].map(f => (
              <div key={f.label} className="d4-form-group">
                <label className="d4-form-label">{f.label}</label>
                <input type={f.type} placeholder={f.ph} className="d4-form-control" />
              </div>
            ))}
            <div className="d4-form-group">
              <label className="d4-form-label">Bericht</label>
              <textarea placeholder="Uw bericht..." className="d4-form-control" rows={4} />
            </div>
            <button type="submit" className="d4-btn d4-btn-primary" style={{ width: '100%' }}>Verstuur bericht</button>
          </form>
        </div>
      </section>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="d4">
      <D4Header />
      <div style={{ paddingTop: 64 }}>{children}</div>
      <D4Footer />
    </div>
  )
}

export default function Design4() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D4HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D4MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D4ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D4OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D4ContactPage /></Layout>} />
      </Routes>
      <WhatsAppButton />
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#FF6600', color: '#fff',
          padding: '10px 18px', textDecoration: 'none',
          fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
        }}
      >
        Alle ontwerpen
      </Link>
    </>
  )
}
