import { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, OPENING_HOURS } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/7'

const CSS = `
.d7 *, .d7 *::before, .d7 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d7 { font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif; font-weight: 400; background: #fff; color: #0a1628; line-height: 1.6; min-height: 100vh; }
.d7 a { text-decoration: none; color: inherit; }

.d7-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(0,18,38,0.98); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 68px; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.d7-nav-logo { font-size: 20px; font-weight: 800; letter-spacing: -0.03em; color: #fff; }
.d7-nav-logo span { color: #FF6600; }
.d7-nav-links { display: flex; gap: 4px; }
.d7-nav-links a { font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.55); padding: 8px 14px; border-radius: 8px; transition: all 0.18s; }
.d7-nav-links a:hover { background: rgba(255,255,255,0.07); color: #fff; }
.d7-nav-links a.active { color: #fff; background: rgba(255,255,255,0.08); }
.d7-nav-cta { background: #FF6600; color: #fff; padding: 10px 22px; border-radius: 8px; font-size: 14px; font-weight: 700; transition: all 0.2s; }
.d7-nav-cta:hover { background: #e65c00; transform: translateY(-1px); }
.d7-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
.d7-hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; }
.d7-mobile-menu { display: none; position: fixed; top: 68px; left: 0; right: 0; background: #000c1e; border-bottom: 1px solid rgba(255,255,255,0.08); z-index: 99; padding: 20px 24px; }
.d7-mobile-menu.open { display: block; }
.d7-mobile-menu a { display: block; font-size: 15px; font-weight: 500; color: rgba(255,255,255,0.7); padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }

/* Hero — dark section */
.d7-hero { background: linear-gradient(160deg, #001226 0%, #001E3C 100%); padding: 120px 48px 96px; position: relative; overflow: hidden; }
.d7-hero-glow { position: absolute; right: -100px; top: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(255,102,0,0.08) 0%, transparent 70%); }
.d7-hero-glow2 { position: absolute; left: -60px; bottom: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(0,100,255,0.06) 0%, transparent 70%); }
.d7-hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
.d7-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,102,0,0.12); border: 1px solid rgba(255,102,0,0.25); border-radius: 6px; padding: 6px 14px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF9944; margin-bottom: 28px; }
.d7-hero h1 { font-size: clamp(38px, 5vw, 62px); font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 20px; }
.d7-hero h1 em { font-style: normal; color: #FF6600; }
.d7-hero-sub { font-size: 17px; color: rgba(255,255,255,0.55); line-height: 1.75; margin-bottom: 44px; max-width: 480px; }
.d7-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.d7-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; padding: 13px 24px; border-radius: 8px; transition: all 0.2s; cursor: pointer; border: none; }
.d7-btn-orange { background: #FF6600; color: #fff; box-shadow: 0 4px 16px rgba(255,102,0,0.3); }
.d7-btn-orange:hover { background: #e65c00; box-shadow: 0 8px 24px rgba(255,102,0,0.4); transform: translateY(-1px); }
.d7-btn-ghost-light { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); color: #fff; }
.d7-btn-ghost-light:hover { background: rgba(255,255,255,0.12); }
.d7-btn-navy { background: #001E3C; color: #fff; border: 1px solid rgba(255,255,255,0.1); }
.d7-btn-navy:hover { background: #002855; }
.d7-btn-orange-outline { background: transparent; border: 2px solid #FF6600; color: #FF6600; }
.d7-btn-orange-outline:hover { background: #FF6600; color: #fff; }
.d7-hero-trust { display: flex; flex-direction: column; gap: 12px; }
.d7-trust-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
.d7-trust-icon { width: 44px; height: 44px; background: rgba(255,102,0,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.d7-trust-icon svg { width: 22px; height: 22px; color: #FF6600; }
.d7-trust-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 2px; }
.d7-trust-sub { font-size: 12px; color: rgba(255,255,255,0.4); }

/* White sections */
.d7-white-section { background: #fff; }
.d7-dark-section { background: #001226; }
.d7-gray-section { background: #f8faff; }

.d7-section { max-width: 1200px; margin: 0 auto; padding: 88px 48px; }
.d7-section-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; margin-bottom: 10px; }
.d7-section-title { font-size: clamp(26px, 3.2vw, 42px); font-weight: 800; color: #001E3C; letter-spacing: -0.03em; margin-bottom: 40px; line-height: 1.15; }
.d7-section-title-light { color: #fff; }

.d7-stats-row { display: flex; gap: 1px; background: rgba(0,30,60,0.08); border-radius: 16px; overflow: hidden; margin-bottom: 80px; }
.d7-stat { flex: 1; background: #fff; padding: 32px 24px; text-align: center; }
.d7-stat:first-child { border-radius: 16px 0 0 16px; }
.d7-stat:last-child { border-radius: 0 16px 16px 0; }
.d7-stat-val { font-size: 44px; font-weight: 800; color: #001E3C; letter-spacing: -0.04em; line-height: 1; }
.d7-stat-label { font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.4); margin-top: 8px; }

.d7-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin-bottom: 52px; }
.d7-product-card { background: #f8faff; border: 1px solid rgba(0,30,60,0.08); border-radius: 16px; overflow: hidden; transition: all 0.25s; }
.d7-product-card:hover { border-color: rgba(0,30,60,0.18); box-shadow: 0 12px 36px rgba(0,0,0,0.1); transform: translateY(-3px); }
.d7-product-img-wrap { background: #fff; padding: 24px; position: relative; border-bottom: 1px solid rgba(0,30,60,0.06); }
.d7-product-img { width: 100%; height: 160px; object-fit: contain; }
.d7-product-placeholder { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; }
.d7-product-placeholder span { font-size: 13px; color: rgba(10,22,40,0.2); font-weight: 600; }
.d7-product-badge { position: absolute; top: 12px; right: 12px; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; }
.d7-badge-in { background: rgba(0,180,80,0.1); color: #00a855; }
.d7-badge-out { background: rgba(0,0,0,0.06); color: rgba(10,22,40,0.35); }
.d7-product-body { padding: 20px; }
.d7-product-brand { font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; margin-bottom: 6px; }
.d7-product-name { font-size: 16px; font-weight: 700; color: #001E3C; margin-bottom: 10px; }
.d7-product-feats { list-style: none; margin-bottom: 16px; }
.d7-product-feats li { font-size: 12px; color: rgba(10,22,40,0.5); padding: 3px 0; display: flex; align-items: center; gap: 7px; }
.d7-product-feats li::before { content: ''; width: 5px; height: 5px; background: #001E3C; border-radius: 50%; flex-shrink: 0; opacity: 0.3; }
.d7-product-price { font-size: 22px; font-weight: 800; color: #001E3C; }
.d7-product-price small { font-size: 12px; font-weight: 600; color: rgba(10,22,40,0.35); }

/* Dark reviews section */
.d7-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.d7-review-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px; }
.d7-review-stars { color: #FF6600; font-size: 13px; letter-spacing: 2px; margin-bottom: 12px; }
.d7-review-text { font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.75; margin-bottom: 14px; }
.d7-review-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.35); }

.d7-brands-logos { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; margin-top: 32px; }
.d7-brand-logo { height: 38px; object-fit: contain; filter: grayscale(1) opacity(0.4); transition: filter 0.3s; }
.d7-brand-logo:hover { filter: grayscale(0) opacity(1); }
.d7-brand-logo-dark { filter: grayscale(1) brightness(2) opacity(0.3); height: 28px; max-width: 100px; }
.d7-brand-logo-dark:hover { filter: grayscale(0) opacity(1); }
.d7-brand-text { font-size: 13px; font-weight: 700; color: rgba(10,22,40,0.3); }
.d7-brand-text-dark { color: rgba(255,255,255,0.25); }

/* CTA strip */
.d7-cta-strip { background: #FF6600; padding: 56px 48px; }
.d7-cta-strip-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.d7-cta-strip h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 800; color: #fff; letter-spacing: -0.03em; }
.d7-cta-strip p { font-size: 16px; color: rgba(255,255,255,0.7); margin-top: 6px; }

.d7-brands-pg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.d7-brand-pg-card { background: #fff; border: 1px solid rgba(0,30,60,0.08); border-radius: 16px; padding: 36px; transition: all 0.25s; }
.d7-brand-pg-card:hover { border-color: rgba(0,30,60,0.2); box-shadow: 0 12px 32px rgba(0,0,0,0.08); transform: translateY(-3px); }
.d7-brand-pg-logo { height: 44px; object-fit: contain; margin-bottom: 24px; }
.d7-brand-pg-stripe { width: 28px; height: 3px; background: #FF6600; border-radius: 3px; margin-bottom: 14px; }
.d7-brand-pg-name { font-size: 18px; font-weight: 800; color: #001E3C; margin-bottom: 10px; }
.d7-brand-pg-desc { font-size: 14px; color: rgba(10,22,40,0.5); line-height: 1.7; }

.d7-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.d7-filter-btn { font-size: 13px; font-weight: 700; padding: 8px 20px; border-radius: 8px; border: 2px solid rgba(0,30,60,0.1); background: #fff; color: rgba(10,22,40,0.5); cursor: pointer; transition: all 0.2s; }
.d7-filter-btn:hover { border-color: #001E3C; color: #001E3C; }
.d7-filter-btn.active { background: #001E3C; border-color: #001E3C; color: #fff; }

.d7-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.d7-acc-card { background: #fff; border: 1px solid rgba(0,30,60,0.08); border-radius: 14px; padding: 24px; }
.d7-acc-name { font-size: 15px; font-weight: 800; color: #001E3C; margin-bottom: 8px; }
.d7-acc-desc { font-size: 13px; color: rgba(10,22,40,0.5); line-height: 1.65; margin-bottom: 14px; }
.d7-acc-price { font-size: 20px; font-weight: 800; color: #001E3C; }

.d7-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.d7-about-text h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #001E3C; letter-spacing: -0.03em; margin-bottom: 24px; line-height: 1.1; }
.d7-about-text p { font-size: 15px; color: rgba(10,22,40,0.55); line-height: 1.8; margin-bottom: 16px; }
.d7-stats-2x2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.d7-stat2 { background: #f8faff; border: 1px solid rgba(0,30,60,0.07); border-radius: 14px; padding: 24px; text-align: center; }
.d7-stat2-val { font-size: 40px; font-weight: 800; color: #001E3C; letter-spacing: -0.04em; }
.d7-stat2-label { font-size: 12px; font-weight: 600; color: rgba(10,22,40,0.4); margin-top: 4px; }
.d7-hours-box { background: #001E3C; border-radius: 14px; padding: 24px; margin-top: 12px; }
.d7-hours-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 14px; }
.d7-hours-row { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.7); padding: 5px 0; }
.d7-hours-note { font-size: 12px; color: #FF9944; margin-top: 10px; font-weight: 600; }

.d7-faq { margin-top: 72px; }
.d7-faq-title { font-size: 28px; font-weight: 800; color: #001E3C; letter-spacing: -0.03em; margin-bottom: 24px; }
.d7-faq-item { border: 1px solid rgba(0,30,60,0.08); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
.d7-faq-q { width: 100%; text-align: left; background: #fff; border: none; cursor: pointer; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 700; color: #001E3C; transition: background 0.2s; }
.d7-faq-q:hover { background: #f8faff; }
.d7-faq-icon { width: 26px; height: 26px; background: rgba(0,30,60,0.07); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #001E3C; transition: transform 0.25s; flex-shrink: 0; }
.d7-faq-q.open .d7-faq-icon { transform: rotate(45deg); background: #FF6600; color: #fff; }
.d7-faq-a { padding: 0 24px 20px; font-size: 14px; color: rgba(10,22,40,0.55); line-height: 1.8; }

.d7-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
.d7-contact-info h2 { font-size: 32px; font-weight: 800; color: #001E3C; letter-spacing: -0.03em; margin-bottom: 32px; }
.d7-contact-detail { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
.d7-contact-icon { width: 44px; height: 44px; background: rgba(255,102,0,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.d7-contact-icon svg { width: 20px; height: 20px; color: #FF6600; }
.d7-contact-label { font-size: 11px; font-weight: 700; color: rgba(10,22,40,0.35); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2px; }
.d7-contact-val { font-size: 15px; font-weight: 600; color: #001E3C; }
.d7-contact-val a { color: #001E3C; }
.d7-form-card { background: #001E3C; border-radius: 20px; padding: 36px; }
.d7-form-group { margin-bottom: 18px; }
.d7-form-label { display: block; font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.35); letter-spacing: 0.06em; margin-bottom: 8px; text-transform: uppercase; }
.d7-form-control { width: 100%; padding: 13px 18px; border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; font-size: 14px; font-weight: 500; color: #fff; background: rgba(255,255,255,0.06); outline: none; transition: border-color 0.2s; font-family: inherit; }
.d7-form-control:focus { border-color: rgba(255,102,0,0.5); background: rgba(255,255,255,0.08); }
.d7-form-control::placeholder { color: rgba(255,255,255,0.2); }
textarea.d7-form-control { resize: vertical; min-height: 100px; }

.d7-footer { background: #000c1e; padding: 64px 48px 32px; border-top: 1px solid rgba(255,255,255,0.05); }
.d7-footer-inner { max-width: 1200px; margin: 0 auto; }
.d7-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.d7-footer-brand { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 12px; }
.d7-footer-brand span { color: #FF6600; }
.d7-footer-tagline { font-size: 14px; color: rgba(255,255,255,0.25); line-height: 1.7; max-width: 240px; }
.d7-footer-col-title { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 16px; }
.d7-footer-nav a, .d7-footer-nav span { display: block; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.35); margin-bottom: 12px; transition: color 0.2s; }
.d7-footer-nav a:hover { color: rgba(255,255,255,0.8); }
.d7-footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px; display: flex; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.2); flex-wrap: wrap; gap: 8px; }

.d7-page-hero { background: linear-gradient(160deg, #001226 0%, #001E3C 100%); padding: 136px 48px 72px; }
.d7-page-hero-inner { max-width: 1200px; margin: 0 auto; }
.d7-page-hero-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF9944; margin-bottom: 14px; }
.d7-page-hero h1 { font-size: clamp(36px, 5vw, 62px); font-weight: 800; color: #fff; letter-spacing: -0.03em; }

@media (max-width: 900px) {
  .d7-nav { padding: 0 20px; }
  .d7-nav-links, .d7-nav-cta { display: none; }
  .d7-hamburger { display: flex; }
  .d7-hero { padding: 100px 24px 72px; }
  .d7-hero-inner { grid-template-columns: 1fr; }
  .d7-hero-trust { display: none; }
  .d7-section { padding: 64px 24px; }
  .d7-about-grid, .d7-contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .d7-stats-row { flex-direction: column; gap: 0; border-radius: 0; }
  .d7-footer-top { grid-template-columns: 1fr; gap: 32px; }
  .d7-cta-strip { padding: 48px 24px; }
  .d7-page-hero { padding: 108px 24px 56px; }
}
@media (max-width: 768px) {
  .d7-nav { padding: 0 16px; height: 60px; }
  .d7-nav-logo { font-size: 17px; }
  .d7-nav-links, .d7-nav-cta { display: none; }
  .d7-hamburger { display: flex; }
  .d7-mobile-menu { top: 60px; }
  .d7-hero { padding: 80px 16px 56px; }
  .d7-hero-inner { grid-template-columns: 1fr; gap: 0; }
  .d7-hero-trust { display: none; }
  .d7-hero-actions { flex-direction: column; gap: 10px; }
  .d7-hero-actions .d7-btn { width: 100%; justify-content: center; }
  .d7-section { padding: 40px 16px; }
  .d7-products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
  .d7-reviews-grid { grid-template-columns: 1fr; }
  .d7-brands-logos { gap: 20px; }
  .d7-about-grid { grid-template-columns: 1fr; gap: 32px; }
  .d7-contact-grid { grid-template-columns: 1fr; gap: 32px; }
  .d7-stats-row { flex-direction: column; gap: 0; }
  .d7-stat { border-radius: 0; }
  .d7-stat:first-child { border-radius: 16px 16px 0 0; }
  .d7-stat:last-child { border-radius: 0 0 16px 16px; }
  .d7-footer-top { grid-template-columns: 1fr; gap: 24px; }
  .d7-footer { padding: 40px 16px 20px; }
  .d7-page-hero { padding: 88px 16px 40px; }
  .d7-cta-strip { padding: 40px 16px; }
  .d7-cta-strip-inner { flex-direction: column; gap: 20px; }
  .d7-acc-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  .d7-brands-pg-grid { grid-template-columns: 1fr; }
  .d7-stats-2x2 { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .d7-products-grid { grid-template-columns: 1fr; }
  .d7-acc-grid { grid-template-columns: 1fr; }
  .d7-brands-logos { flex-direction: column; align-items: center; gap: 16px; }
  .d7-section { padding: 32px 14px; }
  .d7-hero { padding: 72px 14px 48px; }
  .d7-cta-strip { padding: 36px 14px; }
}
@keyframes d7-fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes d7-fadeIn { from { opacity: 0; } to { opacity: 1; } }
.d7-hero-eyebrow { animation: d7-fadeUp 0.5s ease both; }
.d7-hero-left h1 { animation: d7-fadeUp 0.65s ease both; animation-delay: 0.1s; }
.d7-hero-left > p { animation: d7-fadeUp 0.65s ease both; animation-delay: 0.22s; }
.d7-hero-left > div { animation: d7-fadeUp 0.65s ease both; animation-delay: 0.34s; }
.d7-hero-trust { animation: d7-fadeIn 0.8s ease both; animation-delay: 0.45s; }
.d7-prod-card { transition: transform 0.25s, box-shadow 0.25s; }
.d7-prod-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(0,100,200,0.12); }
.d7-brand-logo-box { transition: transform 0.2s, box-shadow 0.2s; }
.d7-brand-logo-box:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.d7-spec-body::-webkit-scrollbar { width: 5px; }
.d7-spec-body::-webkit-scrollbar-track { background: transparent; }
.d7-spec-body::-webkit-scrollbar-thumb { background: #FF6600; border-radius: 10px; }
`

function D7Header() {
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
      <nav className="d7-nav">
        <NavLink to={`${BASE}/`} className="d7-nav-logo">
          <div style={{ background: '#fff', borderRadius: 7, padding: '2px 5px', display: 'inline-flex', alignItems: 'center' }}>
            <img src="/logoairco.png" alt="AircoStunt" style={{ height: 30, width: 'auto', display: 'block' }} onError={e => { e.currentTarget.style.display='none' }} />
          </div>
          <span style={{ display: 'none' }}>Airco<span style={{ color: '#FF6600' }}>Stunt</span></span>
        </NavLink>
        <div className="d7-nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`}
              className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d7-nav-cta">{SITE.phone}</a>
        <button className="d7-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`d7-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
        ))}
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{ color: '#FF6600', fontWeight: 700 }}>{SITE.phone}</a>
      </div>
    </>
  )
}

function D7Footer() {
  const slugs = ['/', '/merken', '/producten', '/over-ons', '/contact']
  const labels = ['Home', 'Merken', 'Producten', 'Over ons', 'Contact']
  return (
    <footer className="d7-footer">
      <div className="d7-footer-inner">
        <div className="d7-footer-top">
          <div>
            <div className="d7-footer-brand">Airco<span>Stunt</span></div>
            <p className="d7-footer-tagline">Split-unit airco's van A-merken voor de laagste prijs. 15 jaar ervaring. Alleen afhalen uit Dordrecht.</p>
          </div>
          <div>
            <div className="d7-footer-col-title">Navigatie</div>
            <div className="d7-footer-nav">
              {labels.map((l, i) => <NavLink key={l} to={`${BASE}${slugs[i]}`}>{l}</NavLink>)}
            </div>
          </div>
          <div>
            <div className="d7-footer-col-title">Contact</div>
            <div className="d7-footer-nav">
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>{SITE.address}</span>
              <span>Ma-Vr 09:00-20:00</span>
              <span>Za 09:00-13:00</span>
            </div>
          </div>
        </div>
        <div className="d7-footer-bottom">
          <span>&copy; {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
          <span>Alleen afhalen, geen webshop</span>
        </div>
      </div>
    </footer>
  )
}

const trustItems = [
  { icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>, title: '2 jaar fabrieksgarantie', sub: 'Op alle airconditioners' },
  { icon: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>, title: 'Laagste prijs garantie', sub: 'Direct bij de fabrikant' },
  { icon: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>, title: 'Persoonlijk advies', sub: 'Altijd de eigenaar aan de lijn' },
]

function D7HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      {/* Dark Hero */}
      <section className="d7-hero">
        <div className="d7-hero-glow" />
        <div className="d7-hero-glow2" />
        <div className="d7-hero-inner">
          <div>
            <div className="d7-hero-eyebrow">Dordrecht, Nederland</div>
            <h1>Airco's van <em>A-merken</em> voor de laagste prijs</h1>
            <p className="d7-hero-sub">Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct afhalen, 15 jaar ervaring, 2 jaar garantie.</p>
            <div className="d7-hero-actions">
              <button className="d7-btn d7-btn-orange" onClick={() => navigate(`${BASE}/producten`)}>Bekijk producten</button>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d7-btn d7-btn-ghost-light">{SITE.phone}</a>
            </div>
          </div>
          <div className="d7-hero-trust">
            {trustItems.map((t, i) => (
              <div key={i} className="d7-trust-card">
                <div className="d7-trust-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{t.icon}</svg>
                </div>
                <div>
                  <div className="d7-trust-title">{t.title}</div>
                  <div className="d7-trust-sub">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White stats */}
      <div className="d7-white-section">
        <div className="d7-section">
          <div className="d7-stats-row">
            {[
              { val: '15+', label: 'Jaar ervaring' },
              { val: '5', label: 'A-merken' },
              { val: '2 jr', label: 'Garantie' },
              { val: '100%', label: 'Tevredenheid' },
            ].map(s => (
              <div key={s.label} className="d7-stat">
                <div className="d7-stat-val">{s.val}</div>
                <div className="d7-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="d7-section-eyebrow">Ons assortiment</div>
          <div className="d7-section-title">Populaire producten</div>
          <div className="d7-products-grid">
            {PRODUCTS.slice(0, 6).map(p => (
              <div key={p.id} className="d7-product-card">
                <div className="d7-product-img-wrap">
                  {p.image
                    ? <img src={p.image} alt={p.name} className="d7-product-img" />
                    : <div className="d7-product-placeholder"><span>Afbeelding</span></div>
                  }
                  <div className={`d7-product-badge ${p.inStock ? 'd7-badge-in' : 'd7-badge-out'}`}>
                    {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                  </div>
                </div>
                <div className="d7-product-body">
                  <div className="d7-product-brand">{p.brandId}</div>
                  <div className="d7-product-name">{p.name}</div>
                  <ul className="d7-product-feats">
                    {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <div className="d7-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="d7-btn d7-btn-navy" onClick={() => navigate(`${BASE}/producten`)}>Alle producten bekijken</button>
          </div>
        </div>
      </div>

      {/* Dark brands */}
      <div className="d7-dark-section">
        <div className="d7-section">
          <div className="d7-section-eyebrow">Topmerken</div>
          <div className="d7-section-title d7-section-title-light">Merken die wij voeren</div>
          <div className="d7-brands-logos">
            {BRANDS.map(b => b.logo
              ? <div key={b.id} style={{ background: '#fff', borderRadius: 10, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={b.logo} alt={b.name} style={{ height: 28, objectFit: 'contain', maxWidth: 100 }} />
                </div>
              : <span key={b.id} className="d7-brand-text d7-brand-text-dark">{b.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* White reviews */}
      <div className="d7-dark-section">
        <div className="d7-section">
          <div className="d7-section-eyebrow">Google reviews</div>
          <div className="d7-section-title d7-section-title-light">Wat klanten zeggen</div>
          <div className="d7-reviews-grid">
            {REVIEWS.slice(0, 6).map((r, i) => (
              <div key={i} className="d7-review-card">
                <div className="d7-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="d7-review-text">"{r.text}"</p>
                <div className="d7-review-name">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WiFi feature section */}
      <section style={{ background: '#f8fafc', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 8px 40px rgba(0,51,102,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/wifi.png" alt="WiFi module" style={{ maxWidth: 200, maxHeight: 200, objectFit: 'contain' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#FF6600', textTransform: 'uppercase', marginBottom: 14 }}>Inbegrepen bij elke airco</div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
              Gratis WiFi-module inbegrepen
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, marginBottom: 24 }}>
              Elke airco die u bij ons afhaalt heeft standaard een ingebouwde wifi-module. Bedien uw installatie overal ter wereld via de smartphone-app van uw merk.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['MyDaikin', 'MELCloud', 'SmartThings', 'LG ThinQ'].map(app => (
                <span key={app} style={{ background: '#001E3C', color: '#fff', fontSize: 12, padding: '7px 18px', borderRadius: 6, fontWeight: 600 }}>{app}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orange CTA */}
      <div className="d7-cta-strip">
        <div className="d7-cta-strip-inner">
          <div>
            <h2>Klaar voor uw nieuwe airco?</h2>
            <p>Bel direct of kom langs in Dordrecht</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d7-btn d7-btn-ghost-light" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>{SITE.phone}</a>
            <button className="d7-btn" style={{ background: '#fff', color: '#FF6600', fontWeight: 700 }} onClick={() => navigate(`${BASE}/contact`)}>Stuur bericht</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function D7MerkenPage() {
  return (
    <div>
      <div className="d7-page-hero">
        <div className="d7-page-hero-inner">
          <div className="d7-page-hero-eyebrow">Ons assortiment</div>
          <h1>De merken</h1>
        </div>
      </div>
      <div className="d7-white-section">
        <section className="d7-section">
          <div className="d7-brands-pg-grid">
            {BRANDS.map(b => (
              <div key={b.id} className="d7-brand-pg-card">
                {b.logo && <div style={{ background: 'rgba(0,30,60,0.05)', borderRadius: 10, padding: '12px 20px', marginBottom: 16, display: 'inline-flex' }}><img src={b.logo} alt={b.name} style={{ height: 36, objectFit: 'contain', maxWidth: 120 }} /></div>}
                <div className="d7-brand-pg-stripe" />
                <div className="d7-brand-pg-name">{b.name}</div>
                <p className="d7-brand-pg-desc">{b.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function D7SpecModal({ product, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const s = product.specs || {}
  const rows = [['Koelcapaciteit',s.koelcapaciteit],['Verwarmingscapaciteit',s.verwarmingscapaciteit],['Energielabel koeling',s.energielabelKoeling],['Energielabel verwarming',s.energielabelVerwarming],['SEER',s.seer],['SCOP',s.scop],['Geluid (binnen)',s.geluidBinnen],['Geluid (buiten)',s.geluidBuiten],['Koudemiddel',s.koudemiddel],['Afmetingen binnenunit',s.afmetingenBinnen],['Gewicht binnenunit',s.gewichtBinnen],['WiFi',s.wifi],['Geschikt voor',s.geschiktVoor],['Stroomverbruik',s.verbruikNominaal]].filter(([,v])=>v)
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(0,10,30,0.8)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div className="d7-spec-body" style={{background:'#fff',borderRadius:16,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto',boxShadow:'0 40px 100px rgba(0,0,0,0.4)',scrollbarWidth:'thin',scrollbarColor:'#FF6600 transparent'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',borderBottom:'1px solid #f0f4f8',background:'#f8fafc',borderRadius:'16px 16px 0 0'}}>
          <div><div style={{fontSize:11,color:'#FF6600',fontWeight:700,letterSpacing:'0.1em',marginBottom:4,textTransform:'uppercase'}}>{BRANDS.find(b=>b.id===product.brandId)?.name}</div><div style={{fontSize:20,fontWeight:800,color:'#0f172a'}}>{product.name}</div></div>
          <button onClick={onClose} style={{background:'#e2e8f0',border:'none',width:36,height:36,borderRadius:8,cursor:'pointer',fontSize:20,color:'#64748b'}}>×</button>
        </div>
        {product.image&&<div style={{background:'#f8fafc',display:'flex',alignItems:'center',justifyContent:'center',height:180}}><img src={product.image} alt={product.name} style={{maxHeight:140,maxWidth:'100%',objectFit:'contain'}}/></div>}
        <div style={{padding:'20px 24px'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'#94a3b8',marginBottom:12,textTransform:'uppercase'}}>Technische specificaties</div>
          {rows.map(([label,value],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid #e8eef5',fontSize:14,background:i%2===0?'#f8faff':'transparent'}}>
              <span style={{color:'#64748b',fontWeight:600}}>{label}</span>
              <span style={{color:'#FF6600',fontWeight:700,textAlign:'right',marginLeft:16,maxWidth:'55%'}}>{value}</span>
            </div>
          ))}
          <div style={{marginTop:20,background:'#001E3C',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div><div style={{fontSize:11,color:'rgba(255,255,255,0.4)',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Prijs</div><div style={{fontSize:26,fontWeight:800,color:'#fff'}}>€{product.priceFrom} <span style={{fontSize:13,color:'rgba(255,255,255,0.5)',fontWeight:400}}>incl. BTW</span></div></div>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{background:'#FF6600',color:'#fff',padding:'12px 24px',borderRadius:8,fontSize:13,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Bel voor info</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function D7ProductenPage() {
  const [active, setActive] = useState('all')
  const [sel, setSel] = useState(null)
  const brandIds = ['all', ...BRANDS.map(b => b.id)]
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === active)
  return (
    <div>
      {sel && <D7SpecModal product={sel} onClose={() => setSel(null)} />}
      <div className="d7-page-hero">
        <div className="d7-page-hero-inner">
          <div className="d7-page-hero-eyebrow">Assortiment</div>
          <h1>Alle producten</h1>
        </div>
      </div>
      <div className="d7-white-section">
        <section className="d7-section">
          <div className="d7-filter-bar">
            {brandIds.map(id => (
              <button key={id} className={`d7-filter-btn ${active === id ? 'active' : ''}`} onClick={() => setActive(id)}>
                {id === 'all' ? 'Alles' : BRANDS.find(b => b.id === id)?.name}
              </button>
            ))}
          </div>
          <div className="d7-products-grid" style={{ marginBottom: 80 }}>
            {filtered.map(p => (
              <div key={p.id} className="d7-product-card">
                <div className="d7-product-img-wrap">
                  {p.image
                    ? <img src={p.image} alt={p.name} className="d7-product-img" />
                    : <div className="d7-product-placeholder"><span>Afbeelding</span></div>
                  }
                  <div className={`d7-product-badge ${p.inStock ? 'd7-badge-in' : 'd7-badge-out'}`}>
                    {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                  </div>
                </div>
                <div className="d7-product-body">
                  <div className="d7-product-brand">{p.brandId}</div>
                  <div className="d7-product-name">{p.name}</div>
                  <ul className="d7-product-feats">
                    {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                    <div className="d7-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
                    <button onClick={() => setSel(p)} style={{background:'none',border:'1.5px solid #003366',color:'#003366',padding:'5px 16px',borderRadius:6,fontSize:12,fontWeight:700,cursor:'pointer'}}>Specs</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d7-section-eyebrow">Extra</div>
          <div className="d7-section-title">Accessoires</div>
          <div className="d7-acc-grid">
            {ACCESSORIES.map(a => (
              <div key={a.id} className="d7-acc-card">
                <div className="d7-acc-name">{a.name}</div>
                <p className="d7-acc-desc">{a.description}</p>
                <div className="d7-acc-price">&euro;{a.price}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function D7OverOnsPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      <div className="d7-page-hero">
        <div className="d7-page-hero-inner">
          <div className="d7-page-hero-eyebrow">Ons verhaal</div>
          <h1>Over ons</h1>
        </div>
      </div>
      <div className="d7-white-section">
        <section className="d7-section">
          <div className="d7-about-grid">
            <div className="d7-about-text">
              <h2>15 jaar de <span style={{ color: '#FF6600' }}>goedkoopste</span> airco-specialist</h2>
              <p>AircoStunt is gevestigd in Dordrecht en al meer dan 15 jaar gespecialiseerd in split-unit airconditioners van A-merken tegen de laagste prijs van Nederland.</p>
              <p>Door direct bij de fabrikant in te kopen en overhead laag te houden, besparen onze klanten honderden euros op topmerken als Daikin, Mitsubishi en Samsung.</p>
              <p>Altijd de eigenaar aan de lijn. Eerlijk advies, geen onnodig dure installateurs, gewoon goed product voor een scherpe prijs.</p>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d7-btn d7-btn-orange">{SITE.phone}</a>
              </div>
            </div>
            <div>
              <div className="d7-stats-2x2">
                {[{ val: '15+', label: 'Jaar ervaring' }, { val: '5', label: 'A-merken' }, { val: '2 jr', label: 'Garantie' }, { val: '100%', label: 'Tevredenheid' }].map(s => (
                  <div key={s.label} className="d7-stat2">
                    <div className="d7-stat2-val">{s.val}</div>
                    <div className="d7-stat2-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="d7-hours-box">
                <div className="d7-hours-title">Openingstijden</div>
                <div className="d7-hours-row">Maandag t/m vrijdag: 09:00 - 20:00</div>
                <div className="d7-hours-row">Zaterdag: 09:00 - 13:00</div>
                <div className="d7-hours-note">Altijd bellen voor u langs komt!</div>
              </div>
            </div>
          </div>
          <div className="d7-faq">
            <div className="d7-faq-title">Veelgestelde vragen</div>
            {FAQ.map((item, i) => (
              <div key={i} className="d7-faq-item">
                <button className={`d7-faq-q ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                  {item.q}
                  <div className="d7-faq-icon">+</div>
                </button>
                {openIdx === i && <p className="d7-faq-a">{item.a}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function D7ContactPage() {
  return (
    <div>
      <div className="d7-page-hero">
        <div className="d7-page-hero-inner">
          <div className="d7-page-hero-eyebrow">Neem contact op</div>
          <h1>Contact</h1>
        </div>
      </div>
      <div className="d7-white-section">
        <section className="d7-section">
          {/* Opening hours + contact info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
            {/* Opening hours card */}
            <div style={{ background: '#f8faff', border: '1px solid rgba(0,30,60,0.08)', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF6600', marginBottom: 20 }}>Openingstijden</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(0,30,60,0.06)' }}>
                    <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'rgba(10,22,40,0.55)' }}>Maandag t/m vrijdag</td>
                    <td style={{ padding: '10px 0', fontSize: 14, color: '#001E3C', textAlign: 'right', fontWeight: 700 }}>{OPENING_HOURS.weekdaysFrom} - {OPENING_HOURS.weekdaysTo}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(0,30,60,0.06)' }}>
                    <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'rgba(10,22,40,0.55)' }}>Zaterdag</td>
                    <td style={{ padding: '10px 0', fontSize: 14, color: '#001E3C', textAlign: 'right', fontWeight: 700 }}>{OPENING_HOURS.saturdayFrom} - {OPENING_HOURS.saturdayTo}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'rgba(10,22,40,0.55)' }}>Zondag</td>
                    <td style={{ padding: '10px 0', fontSize: 14, color: 'rgba(10,22,40,0.3)', textAlign: 'right', fontWeight: 600 }}>{OPENING_HOURS.sundayClosed ? 'Gesloten' : 'Open'}</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(255,102,0,0.08)', borderRadius: 8, fontSize: 13, color: '#FF6600', fontWeight: 700 }}>
                Bel {OPENING_HOURS.callAheadMinutes} minuten van tevoren
              </div>
            </div>

            {/* Contact info card */}
            <div style={{ background: '#f8faff', border: '1px solid rgba(0,30,60,0.08)', borderRadius: 16, padding: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF6600', marginBottom: 20 }}>Contactgegevens</div>
              <div className="d7-contact-detail">
                <div className="d7-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, color: '#FF6600' }}><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div>
                  <div className="d7-contact-label">Telefoon</div>
                  <div className="d7-contact-val"><a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a></div>
                </div>
              </div>
              <div className="d7-contact-detail">
                <div className="d7-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, color: '#FF6600' }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <div className="d7-contact-label">E-mail</div>
                  <div className="d7-contact-val"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
                </div>
              </div>
              <div className="d7-contact-detail">
                <div className="d7-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, color: '#FF6600' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div>
                  <div className="d7-contact-label">Adres</div>
                  <div className="d7-contact-val">{SITE.address}</div>
                </div>
              </div>
              <div style={{ marginTop: 16, padding: '10px 14px', background: '#fff', borderRadius: 8, fontSize: 13, color: 'rgba(10,22,40,0.45)', fontWeight: 600, border: '1px solid rgba(0,30,60,0.08)' }}>
                Alleen afhalen — geen verzending
              </div>
            </div>
          </div>

          {/* Google Maps embed */}
          <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', marginBottom: 40, border: '1px solid rgba(0,30,60,0.08)' }}>
            <iframe
              src="https://maps.google.com/maps?q=Veerplaat+10,+3313+LJ+Dordrecht&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="AircoStunt locatie"
            />
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d7-btn d7-btn-orange">Bel nu</a>
            <a href={`mailto:${SITE.email}`} className="d7-btn d7-btn-navy">Stuur e-mail</a>
          </div>
        </section>
      </div>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="d7">
      <D7Header />
      <div style={{ paddingTop: 68 }}>{children}</div>
      <D7Footer />
    </div>
  )
}

export default function Design7() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D7HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D7MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D7ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D7OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D7ContactPage /></Layout>} />
      </Routes>
      <WhatsAppButton />
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#001E3C', color: '#fff',
          padding: '10px 20px', borderRadius: 8, textDecoration: 'none',
          fontSize: 13, fontWeight: 700,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        Alle ontwerpen
      </Link>
    </>
  )
}
