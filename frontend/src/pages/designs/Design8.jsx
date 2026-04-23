/**
 * Design 8 — Premium Soft Structuralism
 * Vibe: Warm cream/white, massive Syne typography, ultra-soft ambient shadows
 * Layout: Floating pill nav + Asymmetric bento hero + Double-bezel cards
 * Skill: high-end-visual-design
 */
import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, OPENING_HOURS } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/8'

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.08, rootMargin: '0px', ...options })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.d8 *, .d8 *::before, .d8 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d8 {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  background: #FAFAF8;
  color: #0d1117;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.d8 a { text-decoration: none; color: inherit; }
.d8-display { font-family: 'Syne', sans-serif; font-weight: 800; }

/* ── FLOATING PILL NAV ── */
.d8-nav-wrap {
  position: fixed; top: 20px; left: 0; right: 0;
  z-index: 200;
  display: flex; justify-content: center;
  pointer-events: none;
}
.d8-nav {
  pointer-events: all;
  display: flex; align-items: center; gap: 4px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 100px;
  padding: 6px 6px 6px 20px;
  height: 52px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04);
  gap: 2px;
}
.d8-nav-logo { margin-right: 16px; display: flex; align-items: center; }
.d8-nav-logo img { height: 28px; width: auto; }
.d8-nav-links { display: flex; gap: 2px; }
.d8-nav-links a {
  font-size: 13px; font-weight: 600; color: #555;
  padding: 6px 14px; border-radius: 100px;
  transition: background 0.25s cubic-bezier(0.32,0.72,0,1), color 0.25s cubic-bezier(0.32,0.72,0,1);
  white-space: nowrap;
}
.d8-nav-links a:hover { background: #f5f5f0; color: #111; }
.d8-nav-links a.active { background: #f0ede8; color: #111; }
.d8-nav-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: #0d1117; color: #fff;
  padding: 8px 18px; border-radius: 100px;
  font-size: 13px; font-weight: 700;
  transition: transform 0.3s cubic-bezier(0.32,0.72,0,1), background 0.25s;
  margin-left: 8px;
  white-space: nowrap;
}
.d8-nav-cta:hover { background: #FF5500; transform: scale(1.03); }

/* hamburger */
.d8-hamburger {
  display: none; flex-direction: column; gap: 4.5px;
  background: none; border: none; cursor: pointer; padding: 8px; margin-left: 4px;
}
.d8-hamburger span {
  display: block; width: 20px; height: 1.5px;
  background: #111; border-radius: 99px;
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.25s;
}
.d8-hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.d8-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.d8-hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* mobile overlay */
.d8-mobile-overlay {
  display: none; position: fixed; inset: 0; z-index: 190;
  background: rgba(255,255,255,0.96); backdrop-filter: blur(24px);
  flex-direction: column; align-items: center; justify-content: center; gap: 8px;
}
.d8-mobile-overlay.open { display: flex; }
.d8-mobile-overlay a {
  font-size: 28px; font-weight: 700; color: #111;
  font-family: 'Syne', sans-serif;
  padding: 10px 24px; border-radius: 16px;
  opacity: 0; transform: translateY(16px);
  transition: opacity 0.4s cubic-bezier(0.32,0.72,0,1), transform 0.4s cubic-bezier(0.32,0.72,0,1), background 0.2s;
}
.d8-mobile-overlay.open a { opacity: 1; transform: translateY(0); }
.d8-mobile-overlay.open a:nth-child(1) { transition-delay: 60ms; }
.d8-mobile-overlay.open a:nth-child(2) { transition-delay: 110ms; }
.d8-mobile-overlay.open a:nth-child(3) { transition-delay: 160ms; }
.d8-mobile-overlay.open a:nth-child(4) { transition-delay: 210ms; }
.d8-mobile-overlay.open a:nth-child(5) { transition-delay: 260ms; }
.d8-mobile-overlay a:hover { background: #f5f5f0; }
.d8-mobile-close {
  position: absolute; top: 24px; right: 24px;
  font-size: 24px; color: #555; background: none; border: none; cursor: pointer;
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.d8-mobile-close:hover { background: #f0ede8; }

/* ── HERO ── */
.d8-hero {
  min-height: 100dvh;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 120px 64px 80px;
  max-width: 1360px; margin: 0 auto;
  gap: 64px;
}
.d8-hero-left { display: flex; flex-direction: column; align-items: flex-start; }
.d8-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,85,0,0.08); color: #FF5500;
  border-radius: 100px; padding: 5px 14px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
  margin-bottom: 28px;
}
.d8-hero-eyebrow-dot { width: 6px; height: 6px; background: #FF5500; border-radius: 50%; }
.d8-hero-h1 {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(44px, 5.5vw, 76px);
  color: #0d1117; line-height: 1.0; letter-spacing: -0.04em;
  margin-bottom: 24px;
}
.d8-hero-h1 em { font-style: normal; color: #FF5500; }
.d8-hero-sub { font-size: 16px; color: #777; line-height: 1.8; margin-bottom: 40px; max-width: 420px; }
.d8-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }

/* Primary pill button with nested icon */
.d8-btn-primary {
  display: inline-flex; align-items: center; gap: 0;
  background: #0d1117; color: #fff;
  border-radius: 100px; padding: 14px 14px 14px 24px;
  font-size: 14px; font-weight: 700; cursor: pointer; border: none;
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), background 0.25s;
}
.d8-btn-primary:hover { background: #FF5500; transform: scale(1.03); }
.d8-btn-primary:active { transform: scale(0.98); }
.d8-btn-icon {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,0.15);
  display: inline-flex; align-items: center; justify-content: center;
  margin-left: 10px; font-size: 14px;
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1);
}
.d8-btn-primary:hover .d8-btn-icon { transform: translate(2px,-2px) scale(1.1); }

/* Ghost button */
.d8-btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent;
  border: 1.5px solid rgba(0,0,0,0.12);
  border-radius: 100px; padding: 13px 22px;
  font-size: 14px; font-weight: 600; cursor: pointer; color: #555;
  transition: border-color 0.25s, color 0.25s, transform 0.3s cubic-bezier(0.32,0.72,0,1);
}
.d8-btn-ghost:hover { border-color: #0d1117; color: #0d1117; transform: scale(1.02); }
.d8-btn-ghost:active { transform: scale(0.98); }

/* Dark button */
.d8-btn-dark {
  display: inline-flex; align-items: center; gap: 8px;
  background: #0d1117; color: #fff;
  border-radius: 100px; padding: 13px 24px;
  font-size: 14px; font-weight: 700; cursor: pointer; border: none;
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), background 0.25s;
}
.d8-btn-dark:hover { background: #1e2836; transform: scale(1.02); }
.d8-btn-dark:active { transform: scale(0.98); }

/* ── HERO BENTO (right side) ── */
.d8-hero-bento {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
}

/* Double-bezel card shell */
.d8-shell {
  background: rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 28px; padding: 6px;
}
.d8-core {
  background: #fff;
  border-radius: 22px;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.9), 0 2px 20px rgba(0,0,0,0.04);
  overflow: hidden;
  height: 100%;
}

/* Large bento card (spans 2 cols) */
.d8-bento-main { grid-column: span 2; }
.d8-bento-main .d8-core { padding: 28px; display: flex; align-items: center; gap: 20px; }
.d8-bento-main-img { width: 140px; height: 140px; object-fit: contain; flex-shrink: 0; }
.d8-bento-main-text {}
.d8-bento-main-label { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #FF5500; margin-bottom: 8px; }
.d8-bento-main-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; color: #0d1117; margin-bottom: 8px; line-height: 1.2; }
.d8-bento-main-price { font-size: 28px; font-weight: 800; color: #0d1117; }
.d8-bento-main-price small { font-size: 13px; color: #aaa; font-weight: 500; }

/* Small bento USP cards */
.d8-bento-usp .d8-core { padding: 22px 20px; }
.d8-bento-usp-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,85,0,0.08); display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
.d8-bento-usp-icon svg { width: 18px; height: 18px; color: #FF5500; }
.d8-bento-usp-title { font-size: 13px; font-weight: 700; color: #0d1117; margin-bottom: 4px; }
.d8-bento-usp-sub { font-size: 11px; color: #aaa; }

/* Stat bento */
.d8-bento-stat .d8-core { padding: 22px 20px; display: flex; flex-direction: column; justify-content: flex-end; background: #0d1117; }
.d8-bento-stat-val { font-family: 'Syne', sans-serif; font-size: 36px; font-weight: 800; color: #fff; line-height: 1; }
.d8-bento-stat-label { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 6px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }

/* ── SECTIONS ── */
.d8-section { max-width: 1280px; margin: 0 auto; padding: 96px 64px; }
.d8-section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #FF5500; margin-bottom: 12px; }
.d8-section-title { font-family: 'Syne', sans-serif; font-size: clamp(28px, 3.2vw, 48px); font-weight: 800; color: #0d1117; letter-spacing: -0.04em; line-height: 1.08; margin-bottom: 48px; }
.d8-section-title-sm { font-family: 'Syne', sans-serif; font-size: clamp(22px, 2.5vw, 36px); font-weight: 800; color: #0d1117; letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 12px; }

/* ── TRUST BAND ── */
.d8-trust-band { background: #0d1117; padding: 22px 64px; display: flex; align-items: center; justify-content: center; gap: 56px; flex-wrap: wrap; }
.d8-trust-item { display: flex; align-items: center; gap: 10px; }
.d8-trust-item svg { width: 16px; height: 16px; color: #FF5500; flex-shrink: 0; }
.d8-trust-item span { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.65); }

/* ── PRODUCT CARDS (double-bezel) ── */
.d8-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-bottom: 48px; }
.d8-product-shell {
  background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px; padding: 5px;
  transition: transform 0.4s cubic-bezier(0.32,0.72,0,1), box-shadow 0.4s cubic-bezier(0.32,0.72,0,1);
  cursor: pointer;
}
.d8-product-shell:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.09); }
.d8-product-shell:active { transform: translateY(-1px) scale(0.995); }
.d8-product-core { background: #fff; border-radius: 20px; box-shadow: inset 0 1px 1px rgba(255,255,255,0.9); overflow: hidden; }
.d8-product-img-wrap { background: #f8f7f5; padding: 24px; position: relative; border-bottom: 1px solid rgba(0,0,0,0.04); }
.d8-product-img { width: 100%; height: 140px; object-fit: contain; }
.d8-product-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 100px; }
.d8-badge-in { background: #ecfdf5; color: #059669; }
.d8-badge-out { background: #f5f5f0; color: #999; }
.d8-product-body { padding: 18px 20px 20px; }
.d8-product-brand { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #FF5500; margin-bottom: 5px; }
.d8-product-name { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800; color: #0d1117; margin-bottom: 10px; line-height: 1.3; }
.d8-product-feats { list-style: none; margin-bottom: 14px; }
.d8-product-feats li { font-size: 12px; color: #888; padding: 2px 0; display: flex; align-items: center; gap: 7px; }
.d8-product-feats li::before { content: ''; width: 4px; height: 4px; background: #FF5500; border-radius: 50%; flex-shrink: 0; }
.d8-product-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); }
.d8-product-price { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #0d1117; }
.d8-product-price small { font-size: 11px; color: #bbb; font-weight: 500; }
.d8-product-info-btn {
  width: 32px; height: 32px; border-radius: 50%;
  background: #f5f5f0; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; color: #555;
  transition: background 0.2s, transform 0.3s cubic-bezier(0.32,0.72,0,1);
}
.d8-product-info-btn:hover { background: #0d1117; color: #fff; transform: rotate(45deg); }

/* ── BRANDS ── */
.d8-brands-row { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.d8-brand-card {
  background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px; padding: 14px 24px;
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), box-shadow 0.35s, background 0.2s;
  display: flex; align-items: center;
}
.d8-brand-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); background: #fff; }
.d8-brand-card img { height: 26px; width: auto; object-fit: contain; }

/* ── REVIEWS ── */
.d8-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
.d8-review-shell { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.05); border-radius: 20px; padding: 4px; }
.d8-review-core { background: #fff; border-radius: 16px; padding: 22px; box-shadow: inset 0 1px 1px rgba(255,255,255,0.9); }
.d8-review-stars { color: #FF5500; font-size: 12px; letter-spacing: 2px; margin-bottom: 12px; }
.d8-review-text { font-size: 13px; color: #666; line-height: 1.8; margin-bottom: 14px; }
.d8-review-name { font-size: 12px; font-weight: 700; color: #bbb; }

/* ── CTA DARK ── */
.d8-cta { background: #0d1117; }
.d8-cta-inner { max-width: 1280px; margin: 0 auto; padding: 88px 64px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.d8-cta h2 { font-family: 'Syne', sans-serif; font-size: clamp(28px, 3.5vw, 52px); font-weight: 800; color: #fff; letter-spacing: -0.04em; line-height: 1.08; }
.d8-cta p { font-size: 15px; color: rgba(255,255,255,0.45); margin-top: 10px; }
.d8-btn-orange {
  display: inline-flex; align-items: center; gap: 0;
  background: #FF5500; color: #fff;
  border-radius: 100px; padding: 14px 14px 14px 24px;
  font-size: 14px; font-weight: 700; cursor: pointer; border: none;
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), background 0.25s;
  white-space: nowrap;
}
.d8-btn-orange:hover { background: #e64d00; transform: scale(1.04); }
.d8-btn-orange:active { transform: scale(0.97); }

/* ── PAGE HERO ── */
.d8-page-hero { background: #fafaf8; border-bottom: 1px solid rgba(0,0,0,0.06); padding: 130px 64px 72px; }
.d8-page-hero-inner { max-width: 1280px; margin: 0 auto; }
.d8-page-hero-label { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #FF5500; margin-bottom: 14px; }
.d8-page-hero h1 { font-family: 'Syne', sans-serif; font-size: clamp(36px, 5vw, 68px); font-weight: 800; color: #0d1117; letter-spacing: -0.04em; line-height: 1.04; }

/* ── BRANDS PAGE ── */
.d8-brands-pg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
.d8-brand-pg-shell { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; padding: 5px; transition: transform 0.4s cubic-bezier(0.32,0.72,0,1), box-shadow 0.4s; }
.d8-brand-pg-shell:hover { transform: translateY(-4px); box-shadow: 0 14px 40px rgba(0,0,0,0.07); }
.d8-brand-pg-core { background: #fff; border-radius: 20px; padding: 32px; box-shadow: inset 0 1px 1px rgba(255,255,255,0.9); }
.d8-brand-pg-logo-wrap { background: #f8f7f5; border-radius: 10px; padding: 10px 16px; display: inline-flex; margin-bottom: 20px; }
.d8-brand-pg-logo { height: 28px; object-fit: contain; }
.d8-brand-pg-line { width: 24px; height: 2px; background: #FF5500; border-radius: 2px; margin-bottom: 12px; }
.d8-brand-pg-name { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #0d1117; margin-bottom: 8px; }
.d8-brand-pg-desc { font-size: 13px; color: #888; line-height: 1.75; }

/* ── FILTER ── */
.d8-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
.d8-filter-btn { font-size: 12px; font-weight: 700; padding: 7px 18px; border-radius: 100px; border: 1.5px solid rgba(0,0,0,0.1); background: #fff; color: #888; cursor: pointer; transition: all 0.2s cubic-bezier(0.32,0.72,0,1); }
.d8-filter-btn:hover { border-color: #0d1117; color: #0d1117; }
.d8-filter-btn.active { background: #0d1117; border-color: #0d1117; color: #fff; }

/* ── ACCESSORIES ── */
.d8-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
.d8-acc-shell { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: 18px; padding: 4px; }
.d8-acc-core { background: #fff; border-radius: 14px; padding: 20px; }
.d8-acc-name { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 800; color: #0d1117; margin-bottom: 7px; }
.d8-acc-desc { font-size: 12px; color: #999; line-height: 1.65; margin-bottom: 12px; }
.d8-acc-price { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #0d1117; }

/* ── OVER ONS ── */
.d8-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.d8-about-text h2 em { font-style: normal; color: #FF5500; }
.d8-about-text p { font-size: 15px; color: #777; line-height: 1.85; margin-bottom: 14px; }
.d8-stats-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
.d8-stat2-shell { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.05); border-radius: 18px; padding: 4px; }
.d8-stat2-core { background: #fff; border-radius: 14px; padding: 22px; text-align: center; }
.d8-stat2-val { font-family: 'Syne', sans-serif; font-size: 34px; font-weight: 800; color: #0d1117; line-height: 1; }
.d8-stat2-label { font-size: 10px; font-weight: 700; color: #ccc; margin-top: 5px; text-transform: uppercase; letter-spacing: 0.08em; }
.d8-hours-box { background: #0d1117; border-radius: 16px; padding: 24px; }
.d8-hours-title { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 14px; }
.d8-hours-row { font-size: 13px; color: rgba(255,255,255,0.6); padding: 5px 0; }
.d8-hours-note { font-size: 12px; color: #FF7744; margin-top: 10px; font-weight: 600; }

/* ── FAQ ── */
.d8-faq { margin-top: 80px; }
.d8-faq-item { border: 1px solid rgba(0,0,0,0.07); border-radius: 14px; margin-bottom: 8px; overflow: hidden; background: #fff; }
.d8-faq-q { width: 100%; text-align: left; background: #fff; border: none; cursor: pointer; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 600; color: #0d1117; transition: background 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
.d8-faq-q:hover { background: #fafaf8; }
.d8-faq-icon { width: 26px; height: 26px; background: #f5f5f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #555; transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), background 0.2s, color 0.2s; flex-shrink: 0; }
.d8-faq-q.open .d8-faq-icon { transform: rotate(45deg); background: #FF5500; color: #fff; }
.d8-faq-a { padding: 0 22px 18px; font-size: 14px; color: #777; line-height: 1.8; }

/* ── CONTACT ── */
.d8-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.d8-contact-icon-wrap { width: 40px; height: 40px; background: rgba(255,85,0,0.08); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.d8-contact-icon-wrap svg { width: 18px; height: 18px; color: #FF5500; }
.d8-contact-label { font-size: 10px; font-weight: 700; color: #ccc; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2px; }
.d8-contact-val { font-size: 14px; font-weight: 600; color: #0d1117; }
.d8-form-shell { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: 24px; padding: 5px; }
.d8-form-core { background: #fff; border-radius: 20px; padding: 32px; box-shadow: inset 0 1px 1px rgba(255,255,255,0.9); }
.d8-form-group { margin-bottom: 16px; }
.d8-form-label { display: block; font-size: 10px; font-weight: 700; color: #bbb; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 7px; }
.d8-form-control { width: 100%; padding: 12px 16px; border: 1.5px solid rgba(0,0,0,0.08); border-radius: 10px; font-size: 14px; color: #0d1117; background: #fafaf8; outline: none; transition: border-color 0.25s cubic-bezier(0.32,0.72,0,1), background 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
.d8-form-control:focus { border-color: #FF5500; background: #fff; }
.d8-form-control::placeholder { color: #ddd; }
textarea.d8-form-control { resize: vertical; min-height: 100px; }

/* ── WIFI SECTION ── */
.d8-wifi-section { background: #fff; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); }
.d8-wifi-inner { max-width: 1280px; margin: 0 auto; padding: 88px 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.d8-wifi-img-shell { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.05); border-radius: 28px; padding: 6px; }
.d8-wifi-img-core { background: #f8f7f5; border-radius: 22px; padding: 48px; display: flex; align-items: center; justify-content: center; }
.d8-wifi-img { max-width: 160px; max-height: 160px; object-fit: contain; }
.d8-app-pills { display: flex; flex-wrap: wrap; gap: 8px; }
.d8-app-pill { background: #0d1117; color: #fff; font-size: 12px; font-weight: 700; padding: 7px 16px; border-radius: 100px; }

/* ── SPEC MODAL ── */
.d8-spec-scroll::-webkit-scrollbar { width: 3px; }
.d8-spec-scroll::-webkit-scrollbar-thumb { background: #FF5500; border-radius: 10px; }

/* ── FOOTER ── */
.d8-footer { background: #0d1117; padding: 72px 64px 32px; }
.d8-footer-inner { max-width: 1280px; margin: 0 auto; }
.d8-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 56px; margin-bottom: 56px; }
.d8-footer-logo-bg { background: rgba(255,255,255,0.06); border-radius: 12px; padding: 8px 14px; display: inline-flex; margin-bottom: 16px; }
.d8-footer-logo { height: 26px; width: auto; }
.d8-footer-tagline { font-size: 13px; color: rgba(255,255,255,0.25); line-height: 1.75; max-width: 220px; }
.d8-footer-col-title { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.18); margin-bottom: 18px; }
.d8-footer-nav a, .d8-footer-nav span { display: block; font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.32); margin-bottom: 10px; transition: color 0.2s; }
.d8-footer-nav a:hover { color: rgba(255,255,255,0.75); }
.d8-footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px; display: flex; justify-content: space-between; font-size: 12px; color: rgba(255,255,255,0.18); flex-wrap: wrap; gap: 8px; }

/* ── REVEAL ANIMATIONS ── */
.d8-reveal {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.7s cubic-bezier(0.32,0.72,0,1), transform 0.7s cubic-bezier(0.32,0.72,0,1);
}
.d8-reveal.visible { opacity: 1; transform: translateY(0); }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .d8-hero { grid-template-columns: 1fr; min-height: auto; padding: 100px 40px 64px; gap: 48px; }
  .d8-section { padding: 72px 40px; }
  .d8-about-grid, .d8-contact-grid, .d8-wifi-inner { grid-template-columns: 1fr; gap: 48px; }
  .d8-cta-inner { padding: 72px 40px; }
  .d8-page-hero { padding: 110px 40px 60px; }
  .d8-trust-band { padding: 18px 40px; gap: 32px; }
  .d8-footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
  .d8-footer { padding: 60px 40px 28px; }
}
@media (max-width: 768px) {
  .d8-nav { padding: 5px 5px 5px 16px; gap: 0; }
  .d8-nav-links { display: none; }
  .d8-nav-cta { display: none; }
  .d8-hamburger { display: flex; }
  .d8-hero { padding: 90px 20px 56px; gap: 40px; }
  .d8-hero-bento { grid-template-columns: 1fr 1fr; }
  .d8-hero-h1 { font-size: 38px; }
  .d8-section { padding: 56px 20px; }
  .d8-trust-band { padding: 18px 20px; gap: 18px; flex-direction: column; align-items: flex-start; }
  .d8-products-grid { grid-template-columns: 1fr; }
  .d8-cta-inner { padding: 56px 20px; flex-direction: column; align-items: flex-start; }
  .d8-footer-top { grid-template-columns: 1fr; gap: 28px; }
  .d8-footer { padding: 48px 20px 20px; }
  .d8-page-hero { padding: 90px 20px 48px; }
  .d8-about-grid { gap: 36px; }
  .d8-wifi-inner { padding: 56px 20px; }
}
@media (max-width: 480px) {
  .d8-hero-bento { grid-template-columns: 1fr; }
  .d8-bento-main { grid-column: span 1; }
  .d8-stats-2x2 { grid-template-columns: 1fr 1fr; }
}
`

// ─── Reveal wrapper component ─────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <div
      ref={ref}
      className={`d8-reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────
function D8Header() {
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
      <div className="d8-nav-wrap">
        <nav className="d8-nav">
          <NavLink to={`${BASE}/`} className="d8-nav-logo">
            <img src={SITE.logo} alt="AircoStunt" onError={e => { e.currentTarget.style.display = 'none' }} />
          </NavLink>
          <div className="d8-nav-links">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`}
                className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} className="d8-nav-cta">
            {SITE.phone}
          </a>
          <button
            className={`d8-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </nav>
      </div>

      <div className={`d8-mobile-overlay${menuOpen ? ' open' : ''}`}>
        <button className="d8-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
        ))}
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} onClick={() => setMenuOpen(false)} style={{ color: '#FF5500' }}>{SITE.phone}</a>
      </div>
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function D8Footer() {
  const slugs = ['/', '/merken', '/producten', '/over-ons', '/contact']
  const labels = ['Home', 'Merken', 'Producten', 'Over ons', 'Contact']
  return (
    <footer className="d8-footer">
      <div className="d8-footer-inner">
        <div className="d8-footer-top">
          <div>
            <div className="d8-footer-logo-bg">
              <img src={SITE.logo} alt="AircoStunt" className="d8-footer-logo" onError={e => { e.currentTarget.style.display = 'none' }} />
            </div>
            <p className="d8-footer-tagline">Split-unit airco's van A-merken voor de laagste prijs. 15 jaar ervaring. Alleen afhalen uit Dordrecht.</p>
          </div>
          <div>
            <div className="d8-footer-col-title">Navigatie</div>
            <div className="d8-footer-nav">
              {labels.map((l, i) => <NavLink key={l} to={`${BASE}${slugs[i]}`}>{l}</NavLink>)}
            </div>
          </div>
          <div>
            <div className="d8-footer-col-title">Contact</div>
            <div className="d8-footer-nav">
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>{SITE.address}</span>
              <span>Ma–Vr {OPENING_HOURS.weekdaysFrom}–{OPENING_HOURS.weekdaysTo}</span>
              <span>Za {OPENING_HOURS.saturdayFrom}–{OPENING_HOURS.saturdayTo}</span>
            </div>
          </div>
        </div>
        <div className="d8-footer-bottom">
          <span>&copy; {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
          <span>Alleen afhalen — geen verzending</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Trust Band ───────────────────────────────────────────────────────────────
function TrustBand() {
  const items = [
    { label: '2 jaar fabrieksgarantie', path: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
    { label: 'Laagste prijs garantie', path: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: 'Direct afhalen Dordrecht', path: <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /> },
    { label: 'WiFi-module inbegrepen', path: <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" /> },
  ]
  return (
    <div className="d8-trust-band">
      {items.map((item, i) => (
        <div key={i} className="d8-trust-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            {item.path}
          </svg>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Spec Modal ───────────────────────────────────────────────────────────────
function D8SpecModal({ product, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const s = product.specs || {}
  const rows = [
    ['Koelcapaciteit', s.koelcapaciteit], ['Verwarmingscapaciteit', s.verwarmingscapaciteit],
    ['Energielabel koeling', s.energielabelKoeling], ['Energielabel verwarming', s.energielabelVerwarming],
    ['SEER', s.seer], ['SCOP', s.scop], ['Geluid (binnen)', s.geluidBinnen],
    ['Geluid (buiten)', s.geluidBuiten], ['Koudemiddel', s.koudemiddel],
    ['Afmetingen binnenunit', s.afmetingenBinnen], ['Gewicht binnenunit', s.gewichtBinnen],
    ['WiFi', s.wifi], ['Geschikt voor', s.geschiktVoor],
  ].filter(([, v]) => v)

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(13,17,23,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        className="d8-spec-scroll"
        style={{ background: '#fff', borderRadius: 24, width: '100%', maxWidth: 520, maxHeight: '88vh', overflowY: 'auto', boxShadow: '0 40px 100px rgba(0,0,0,0.3)', scrollbarWidth: 'thin', scrollbarColor: '#FF5500 transparent' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <div>
            <div style={{ fontSize: 10, color: '#FF5500', fontWeight: 700, letterSpacing: '0.14em', marginBottom: 3, textTransform: 'uppercase' }}>{BRANDS.find(b => b.id === product.brandId)?.name}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: '#0d1117', lineHeight: 1.25 }}>{product.name}</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#f5f5f0', border: 'none', width: 34, height: 34, borderRadius: 50, cursor: 'pointer', fontSize: 16, color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          >✕</button>
        </div>
        {product.image && (
          <div style={{ background: '#f8f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
            <img src={product.image} alt={product.name} style={{ maxHeight: 130, maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        )}
        <div style={{ padding: '18px 24px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: '#ccc', marginBottom: 10, textTransform: 'uppercase' }}>Specificaties</div>
          {rows.map(([label, value], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(0,0,0,0.04)', fontSize: 13, background: i % 2 === 0 ? '#fafaf8' : '#fff', borderRadius: 8 }}>
              <span style={{ color: '#999', fontWeight: 500 }}>{label}</span>
              <span style={{ color: '#0d1117', fontWeight: 700, textAlign: 'right', marginLeft: 12 }}>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, background: '#0d1117', borderRadius: 16, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Prijs</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: '#fff' }}>€{product.priceFrom} <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>incl. BTW</span></div>
            </div>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} style={{ background: '#FF5500', color: '#fff', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Bel voor info</a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function D8HomePage() {
  const navigate = useNavigate()
  const [sel, setSel] = useState(null)
  const featuredProduct = PRODUCTS[0]

  return (
    <div>
      {sel && <D8SpecModal product={sel} onClose={() => setSel(null)} />}

      {/* ── HERO ── */}
      <section>
        <div className="d8-hero">
          {/* Left: Typography */}
          <div className="d8-hero-left">
            <div className="d8-hero-eyebrow">
              <span className="d8-hero-eyebrow-dot" />
              Dordrecht, Nederland
            </div>
            <h1 className="d8-hero-h1">
              Airco's van<br /><em>A-merken</em><br />laagste prijs
            </h1>
            <p className="d8-hero-sub">Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct afhalen, 15 jaar ervaring, 2 jaar garantie.</p>
            <div className="d8-hero-actions">
              <button className="d8-btn-primary" onClick={() => navigate(`${BASE}/producten`)}>
                Bekijk producten
                <span className="d8-btn-icon">↗</span>
              </button>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} className="d8-btn-ghost">{SITE.phone}</a>
            </div>
          </div>

          {/* Right: Bento Grid */}
          <div className="d8-hero-bento">
            {/* Main featured product card (spans 2 cols) */}
            <div className="d8-shell d8-bento-main">
              <div className="d8-core d8-bento-main">
                {featuredProduct.image && (
                  <img src={featuredProduct.image} alt={featuredProduct.name} className="d8-bento-main-img" />
                )}
                <div className="d8-bento-main-text">
                  <div className="d8-bento-main-label">Bestseller</div>
                  <div className="d8-bento-main-title">{featuredProduct.name}</div>
                  <div className="d8-bento-main-price">€{featuredProduct.priceFrom} <small>incl. BTW</small></div>
                </div>
              </div>
            </div>

            {/* USP cards */}
            <div className="d8-shell d8-bento-usp">
              <div className="d8-core d8-bento-usp">
                <div className="d8-bento-usp-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div className="d8-bento-usp-title">2 jaar garantie</div>
                <div className="d8-bento-usp-sub">Fabrieksgarantie op alle modellen</div>
              </div>
            </div>

            <div className="d8-shell d8-bento-stat">
              <div className="d8-core d8-bento-stat">
                <div className="d8-bento-stat-val">15+</div>
                <div className="d8-bento-stat-label">Jaar ervaring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <TrustBand />

      {/* ── PRODUCTS ── */}
      <section style={{ background: '#fafaf8' }}>
        <div className="d8-section">
          <Reveal>
            <div className="d8-section-label">Ons assortiment</div>
            <div className="d8-section-title">Populaire airconditioners</div>
          </Reveal>
          <div className="d8-products-grid">
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <div className="d8-product-shell" onClick={() => setSel(p)}>
                  <div className="d8-product-core">
                    <div className="d8-product-img-wrap">
                      {p.image
                        ? <img src={p.image} alt={p.name} className="d8-product-img" />
                        : <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ddd', fontSize: 12 }}>Afbeelding</div>
                      }
                      <div className={`d8-product-badge ${p.inStock ? 'd8-badge-in' : 'd8-badge-out'}`}>
                        {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                      </div>
                    </div>
                    <div className="d8-product-body">
                      <div className="d8-product-brand">{BRANDS.find(b => b.id === p.brandId)?.name}</div>
                      <div className="d8-product-name">{p.name}</div>
                      <ul className="d8-product-feats">
                        {p.features.slice(0, 3).map((f, fi) => <li key={fi}>{f}</li>)}
                      </ul>
                      <div className="d8-product-footer">
                        <div className="d8-product-price"><small>v.a. </small>€{p.priceFrom}</div>
                        <button className="d8-product-info-btn" onClick={e => { e.stopPropagation(); setSel(p) }} aria-label="Specs">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="d8-btn-dark" onClick={() => navigate(`${BASE}/producten`)}>
              Alle producten bekijken
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginLeft: 8, fontSize: 12 }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="d8-section" style={{ paddingBottom: 72 }}>
          <Reveal>
            <div className="d8-section-label">Topmerken</div>
            <div className="d8-section-title">Merken die wij voeren</div>
          </Reveal>
          <Reveal delay={120}>
            <div className="d8-brands-row">
              {BRANDS.map(b => b.logo
                ? <div key={b.id} className="d8-brand-card"><img src={b.logo} alt={b.name} /></div>
                : <div key={b.id} className="d8-brand-card"><span style={{ fontSize: 13, fontWeight: 700, color: '#bbb' }}>{b.name}</span></div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WIFI ── */}
      <div className="d8-wifi-section">
        <div className="d8-wifi-inner">
          <Reveal>
            <div className="d8-wifi-img-shell">
              <div className="d8-wifi-img-core">
                <img src="/wifi.png" alt="WiFi-module" className="d8-wifi-img" onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="d8-section-label">Standaard inbegrepen</div>
            <div className="d8-section-title-sm">Gratis WiFi-module bij elke airco</div>
            <p style={{ fontSize: 15, color: '#888', lineHeight: 1.8, marginBottom: 24 }}>Bedien uw airco overal ter wereld via de smartphone-app van uw merk. Geen extra kosten, altijd inbegrepen.</p>
            <div className="d8-app-pills">
              {['MyDaikin', 'MELCloud', 'SmartThings', 'LG ThinQ'].map(app => (
                <span key={app} className="d8-app-pill">{app}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <section style={{ background: '#fafaf8', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="d8-section">
          <Reveal>
            <div className="d8-section-label">Google reviews</div>
            <div className="d8-section-title">Wat klanten zeggen</div>
          </Reveal>
          <div className="d8-reviews-grid">
            {REVIEWS.slice(0, 6).map((r, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="d8-review-shell">
                  <div className="d8-review-core">
                    <div className="d8-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                    <p className="d8-review-text">"{r.text}"</p>
                    <div className="d8-review-name">{r.name}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="d8-cta">
        <div className="d8-cta-inner">
          <div>
            <h2>Klaar voor uw nieuwe airco?</h2>
            <p>Bel direct of kom langs in Dordrecht</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} className="d8-btn-orange">
              {SITE.phone}
              <span className="d8-btn-icon">↗</span>
            </a>
            <button className="d8-btn-ghost" style={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.15)' }} onClick={() => navigate(`${BASE}/contact`)}>
              Stuur bericht
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Merken Page ──────────────────────────────────────────────────────────────
function D8MerkenPage() {
  return (
    <div>
      <div className="d8-page-hero">
        <div className="d8-page-hero-inner">
          <div className="d8-page-hero-label">Ons assortiment</div>
          <h1>Merken</h1>
        </div>
      </div>
      <section style={{ background: '#fafaf8' }}>
        <div className="d8-section">
          <div className="d8-brands-pg-grid">
            {BRANDS.map((b, i) => (
              <Reveal key={b.id} delay={i * 60}>
                <div className="d8-brand-pg-shell">
                  <div className="d8-brand-pg-core">
                    {b.logo && (
                      <div className="d8-brand-pg-logo-wrap">
                        <img src={b.logo} alt={b.name} className="d8-brand-pg-logo" />
                      </div>
                    )}
                    <div className="d8-brand-pg-line" />
                    <div className="d8-brand-pg-name">{b.name}</div>
                    <p className="d8-brand-pg-desc">{b.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Producten Page ───────────────────────────────────────────────────────────
function D8ProductenPage() {
  const [active, setActive] = useState('all')
  const [sel, setSel] = useState(null)
  const brandIds = ['all', ...BRANDS.map(b => b.id)]
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === active)
  return (
    <div>
      {sel && <D8SpecModal product={sel} onClose={() => setSel(null)} />}
      <div className="d8-page-hero">
        <div className="d8-page-hero-inner">
          <div className="d8-page-hero-label">Assortiment</div>
          <h1>Alle producten</h1>
        </div>
      </div>
      <section style={{ background: '#fafaf8' }}>
        <div className="d8-section">
          <div className="d8-filter-bar">
            {brandIds.map(id => (
              <button key={id} className={`d8-filter-btn${active === id ? ' active' : ''}`} onClick={() => setActive(id)}>
                {id === 'all' ? 'Alles' : BRANDS.find(b => b.id === id)?.name}
              </button>
            ))}
          </div>
          <div className="d8-products-grid" style={{ marginBottom: 72 }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="d8-product-shell" onClick={() => setSel(p)}>
                <div className="d8-product-core">
                  <div className="d8-product-img-wrap">
                    {p.image
                      ? <img src={p.image} alt={p.name} className="d8-product-img" />
                      : <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ddd', fontSize: 12 }}>Afbeelding</div>
                    }
                    <div className={`d8-product-badge ${p.inStock ? 'd8-badge-in' : 'd8-badge-out'}`}>
                      {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                    </div>
                  </div>
                  <div className="d8-product-body">
                    <div className="d8-product-brand">{BRANDS.find(b => b.id === p.brandId)?.name}</div>
                    <div className="d8-product-name">{p.name}</div>
                    <ul className="d8-product-feats">
                      {p.features.slice(0, 3).map((f, fi) => <li key={fi}>{f}</li>)}
                    </ul>
                    <div className="d8-product-footer">
                      <div className="d8-product-price"><small>v.a. </small>€{p.priceFrom}</div>
                      <button className="d8-product-info-btn" onClick={e => { e.stopPropagation(); setSel(p) }} aria-label="Specs">+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Reveal>
            <div className="d8-section-label">Accessoires</div>
            <div className="d8-section-title-sm" style={{ marginBottom: 24 }}>Extra's</div>
          </Reveal>
          <div className="d8-acc-grid">
            {ACCESSORIES.map(a => (
              <div key={a.id} className="d8-acc-shell">
                <div className="d8-acc-core">
                  <div className="d8-acc-name">{a.name}</div>
                  <p className="d8-acc-desc">{a.description}</p>
                  <div className="d8-acc-price">€{a.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Over Ons Page ────────────────────────────────────────────────────────────
function D8OverOnsPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      <div className="d8-page-hero">
        <div className="d8-page-hero-inner">
          <div className="d8-page-hero-label">Ons verhaal</div>
          <h1>Over ons</h1>
        </div>
      </div>
      <section style={{ background: '#fafaf8' }}>
        <div className="d8-section">
          <div className="d8-about-grid">
            <Reveal>
              <div className="d8-about-text">
                <div className="d8-section-label">Onze aanpak</div>
                <div className="d8-section-title-sm" style={{ marginBottom: 20 }}>15 jaar de <em style={{ color: '#FF5500', fontStyle: 'normal' }}>goedkoopste</em> airco-specialist</div>
                <p className="d8-about-text p">AircoStunt is gevestigd in Dordrecht en al meer dan 15 jaar gespecialiseerd in split-unit airconditioners van A-merken tegen de laagste prijs van Nederland.</p>
                <p>Door direct bij de fabrikant in te kopen en de overhead laag te houden, besparen onze klanten honderden euro's op topmerken als Daikin, Mitsubishi en Samsung.</p>
                <p>Altijd de eigenaar aan de lijn. Eerlijk advies, geen onnodig dure installateurs, gewoon goed product voor een scherpe prijs.</p>
                <div style={{ marginTop: 32 }}>
                  <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} className="d8-btn-primary">
                    Bel ons
                    <span className="d8-btn-icon">↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <div className="d8-stats-2x2">
                  {[{ val: '15+', label: 'Jaar ervaring' }, { val: '5', label: 'A-merken' }, { val: '2 jr', label: 'Garantie' }, { val: '100%', label: 'Tevredenheid' }].map(s => (
                    <div key={s.label} className="d8-stat2-shell">
                      <div className="d8-stat2-core">
                        <div className="d8-stat2-val">{s.val}</div>
                        <div className="d8-stat2-label">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d8-hours-box">
                  <div className="d8-hours-title">Openingstijden</div>
                  <div className="d8-hours-row">Maandag t/m vrijdag: {OPENING_HOURS.weekdaysFrom} – {OPENING_HOURS.weekdaysTo}</div>
                  <div className="d8-hours-row">Zaterdag: {OPENING_HOURS.saturdayFrom} – {OPENING_HOURS.saturdayTo}</div>
                  <div className="d8-hours-note">Altijd bellen voor u langs komt!</div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="d8-faq">
            <Reveal>
              <div className="d8-section-title-sm" style={{ marginBottom: 20 }}>Veelgestelde vragen</div>
            </Reveal>
            {FAQ.map((item, i) => (
              <div key={i} className="d8-faq-item">
                <button className={`d8-faq-q${openIdx === i ? ' open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  {item.q}
                  <div className="d8-faq-icon">+</div>
                </button>
                {openIdx === i && <p className="d8-faq-a">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function D8ContactPage() {
  return (
    <div>
      <div className="d8-page-hero">
        <div className="d8-page-hero-inner">
          <div className="d8-page-hero-label">Neem contact op</div>
          <h1>Contact</h1>
        </div>
      </div>
      <section style={{ background: '#fafaf8' }}>
        <div className="d8-section">
          <div className="d8-contact-grid">
            <Reveal>
              <div>
                <div className="d8-section-title-sm" style={{ marginBottom: 28 }}>Wij helpen u graag</div>
                {[
                  { label: 'Telefoon', val: <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}>{SITE.phone}</a>, path: <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" /> },
                  { label: 'E-mail', val: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, path: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /> },
                  { label: 'Adres', val: SITE.address, path: <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /> },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'flex-start' }}>
                    <div className="d8-contact-icon-wrap">
                      <svg viewBox="0 0 24 24" fill="currentColor">{item.path}</svg>
                    </div>
                    <div>
                      <div className="d8-contact-label">{item.label}</div>
                      <div className="d8-contact-val">{item.val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 28, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <iframe
                    src="https://maps.google.com/maps?q=Veerplaat+10,+3313+LJ+Dordrecht&output=embed"
                    width="100%" height="220" style={{ border: 0, display: 'block' }}
                    allowFullScreen loading="lazy" title="AircoStunt locatie"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="d8-form-shell">
                <div className="d8-form-core">
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: '#0d1117', marginBottom: 22 }}>Stuur ons een bericht</div>
                  <div className="d8-form-group">
                    <label className="d8-form-label">Naam</label>
                    <input type="text" className="d8-form-control" placeholder="Uw naam" />
                  </div>
                  <div className="d8-form-group">
                    <label className="d8-form-label">E-mail</label>
                    <input type="email" className="d8-form-control" placeholder="uw@email.nl" />
                  </div>
                  <div className="d8-form-group">
                    <label className="d8-form-label">Telefoon</label>
                    <input type="tel" className="d8-form-control" placeholder="06 12 34 56 78" />
                  </div>
                  <div className="d8-form-group">
                    <label className="d8-form-label">Bericht</label>
                    <textarea className="d8-form-control" placeholder="Uw vraag of opmerking..." />
                  </div>
                  <button className="d8-btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}>
                    Verstuur bericht
                    <span className="d8-btn-icon">↗</span>
                  </button>
                </div>
              </div>
              <div style={{ marginTop: 14, padding: '12px 16px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, fontSize: 13, color: '#aaa', fontWeight: 500 }}>
                Ma–Vr {OPENING_HOURS.weekdaysFrom}–{OPENING_HOURS.weekdaysTo} &nbsp;·&nbsp; Za {OPENING_HOURS.saturdayFrom}–{OPENING_HOURS.saturdayTo} &nbsp;·&nbsp; Alleen afhalen
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Layout & Export ──────────────────────────────────────────────────────────
function Layout({ children }) {
  return (
    <div className="d8">
      <D8Header />
      <div style={{ paddingTop: 0 }}>{children}</div>
      <D8Footer />
    </div>
  )
}

export default function Design8() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D8HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D8MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D8ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D8OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D8ContactPage /></Layout>} />
      </Routes>
      <WhatsAppButton />
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 80, right: 24, zIndex: 9999,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#0d1117', color: '#fff',
          padding: '10px 20px', borderRadius: 100, textDecoration: 'none',
          fontSize: 13, fontWeight: 700,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'background 0.25s',
        }}
      >
        Alle ontwerpen
      </Link>
    </>
  )
}
