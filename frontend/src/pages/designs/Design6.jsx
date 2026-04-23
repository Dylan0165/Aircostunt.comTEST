import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, OPENING_HOURS } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/6'

const CSS = `
.d6 *, .d6 *::before, .d6 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d6 { font-family: 'Nunito', 'Segoe UI', sans-serif; font-weight: 400; background: #FFF8F2; color: #1e2d45; line-height: 1.65; min-height: 100vh; overflow-x: hidden; }
.d6 a { text-decoration: none; color: inherit; }

.d6-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(255,248,242,0.97); backdrop-filter: blur(12px);
  box-shadow: 0 2px 20px rgba(30,45,69,0.06);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px; height: 68px;
}
.d6-nav-logo { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: #1e2d45; }
.d6-nav-logo span { color: #FF6B2C; }
.d6-nav-links { display: flex; gap: 4px; }
.d6-nav-links a { font-size: 14px; font-weight: 600; color: rgba(30,45,69,0.5); padding: 8px 16px; border-radius: 50px; transition: all 0.2s; }
.d6-nav-links a:hover { background: rgba(255,107,44,0.08); color: #FF6B2C; }
.d6-nav-links a.active { background: rgba(0,51,102,0.08); color: #003366; }
.d6-nav-cta { background: #FF6B2C; color: #fff; padding: 11px 24px; border-radius: 50px; font-size: 14px; font-weight: 700; transition: all 0.22s; box-shadow: 0 4px 14px rgba(255,107,44,0.28); }
.d6-nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,107,44,0.35); }
.d6-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
.d6-hamburger span { display: block; width: 24px; height: 2.5px; background: #1e2d45; border-radius: 4px; transition: all 0.3s; }
.d6-mobile-menu { display: none; position: fixed; top: 68px; left: 0; right: 0; background: #FFF8F2; border-bottom: 1px solid rgba(255,107,44,0.1); z-index: 99; padding: 20px 24px; }
.d6-mobile-menu.open { display: block; }
.d6-mobile-menu a { display: block; font-size: 15px; font-weight: 600; color: rgba(30,45,69,0.7); padding: 12px 0; border-bottom: 1px solid rgba(255,107,44,0.08); }

.d6-hero { padding: 120px 48px 88px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; min-height: 90vh; }
.d6-hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,107,44,0.1); border: 1px solid rgba(255,107,44,0.2); border-radius: 50px; padding: 6px 16px; font-size: 12px; font-weight: 700; color: #FF6B2C; margin-bottom: 24px; }
.d6-hero h1 { font-size: clamp(36px, 4.5vw, 58px); font-weight: 800; color: #1e2d45; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 20px; }
.d6-hero h1 span { color: #FF6B2C; }
.d6-hero-sub { font-size: 17px; color: rgba(30,45,69,0.55); line-height: 1.75; margin-bottom: 40px; }
.d6-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
.d6-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 50px; transition: all 0.22s; cursor: pointer; border: none; }
.d6-btn-primary { background: #FF6B2C; color: #fff; box-shadow: 0 4px 16px rgba(255,107,44,0.3); }
.d6-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,107,44,0.4); }
.d6-btn-secondary { background: #003366; color: #fff; }
.d6-btn-secondary:hover { background: #002855; transform: translateY(-1px); }
.d6-btn-outline { background: transparent; border: 2px solid rgba(30,45,69,0.15); color: #1e2d45; }
.d6-btn-outline:hover { border-color: #003366; color: #003366; }
.d6-hero-visual { background: linear-gradient(135deg, #FFE4CC 0%, #FFD0A8 100%); border-radius: 32px; padding: 40px; display: flex; flex-direction: column; gap: 16px; }
.d6-hero-usps { display: flex; flex-direction: column; gap: 12px; }
.d6-hero-usp { background: #fff; border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 14px; box-shadow: 0 4px 16px rgba(30,45,69,0.06); }
.d6-hero-usp-icon { width: 42px; height: 42px; background: rgba(255,107,44,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; }
.d6-hero-usp-title { font-size: 14px; font-weight: 700; color: #1e2d45; }
.d6-hero-usp-sub { font-size: 12px; color: rgba(30,45,69,0.45); }

.d6-brands-strip { background: #fff; border-top: 1px solid rgba(255,107,44,0.1); border-bottom: 1px solid rgba(255,107,44,0.1); padding: 36px 48px; }
.d6-brands-strip-inner { max-width: 1200px; margin: 0 auto; }
.d6-brands-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(30,45,69,0.3); text-align: center; margin-bottom: 24px; }
.d6-brands-logos { display: flex; align-items: center; justify-content: center; gap: 40px; flex-wrap: wrap; }
.d6-brand-logo { height: 36px; object-fit: contain; filter: grayscale(1) opacity(0.4); transition: filter 0.3s; mix-blend-mode: multiply; }
.d6-brand-logo:hover { filter: grayscale(0) opacity(1); }
.d6-brand-text { font-size: 14px; font-weight: 700; color: rgba(30,45,69,0.3); }

.d6-section { max-width: 1200px; margin: 0 auto; padding: 80px 48px; }
.d6-section-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6B2C; margin-bottom: 10px; }
.d6-section-title { font-size: clamp(26px, 3.2vw, 40px); font-weight: 800; color: #1e2d45; letter-spacing: -0.03em; margin-bottom: 40px; }

.d6-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-bottom: 48px; }
.d6-product-card { background: #fff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 20px rgba(30,45,69,0.06); transition: all 0.25s; border: 1px solid rgba(255,107,44,0.08); }
.d6-product-card:hover { box-shadow: 0 12px 36px rgba(30,45,69,0.12); transform: translateY(-4px); }
.d6-product-img-wrap { background: #FFF8F2; padding: 24px; position: relative; }
.d6-product-img { width: 100%; height: 160px; object-fit: contain; }
.d6-product-placeholder { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; }
.d6-product-placeholder span { font-size: 13px; color: rgba(30,45,69,0.2); font-weight: 600; }
.d6-product-badge { position: absolute; top: 12px; right: 12px; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 50px; }
.d6-badge-in { background: rgba(0,180,80,0.12); color: #00b050; }
.d6-badge-out { background: rgba(0,0,0,0.06); color: rgba(30,45,69,0.35); }
.d6-product-body { padding: 20px; }
.d6-product-brand { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6B2C; margin-bottom: 6px; }
.d6-product-name { font-size: 16px; font-weight: 800; color: #1e2d45; margin-bottom: 10px; }
.d6-product-feats { list-style: none; margin-bottom: 16px; }
.d6-product-feats li { font-size: 12px; color: rgba(30,45,69,0.5); padding: 3px 0; display: flex; align-items: center; gap: 7px; }
.d6-product-feats li::before { content: ''; width: 6px; height: 6px; background: #FFD0A8; border-radius: 50%; flex-shrink: 0; }
.d6-product-price { font-size: 22px; font-weight: 800; color: #003366; }
.d6-product-price small { font-size: 13px; font-weight: 600; color: rgba(30,45,69,0.35); }

.d6-reviews-section { background: linear-gradient(135deg, #FFF8F2 0%, #FFE4CC 100%); padding: 80px 48px; }
.d6-reviews-inner { max-width: 1200px; margin: 0 auto; }
.d6-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 40px; }
.d6-review-card { background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 4px 16px rgba(30,45,69,0.06); border: 1px solid rgba(255,107,44,0.08); }
.d6-review-stars { color: #FF6B2C; font-size: 14px; letter-spacing: 2px; margin-bottom: 12px; }
.d6-review-text { font-size: 14px; color: rgba(30,45,69,0.6); line-height: 1.75; margin-bottom: 14px; }
.d6-review-name { font-size: 13px; font-weight: 700; color: rgba(30,45,69,0.4); }

.d6-cta-section { background: #003366; padding: 80px 48px; text-align: center; }
.d6-cta-inner { max-width: 640px; margin: 0 auto; }
.d6-cta-section h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 14px; }
.d6-cta-section p { font-size: 17px; color: rgba(255,255,255,0.55); margin-bottom: 40px; }

.d6-brands-pg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.d6-brand-pg-card { background: #fff; border-radius: 24px; padding: 36px; border: 1px solid rgba(255,107,44,0.1); box-shadow: 0 4px 16px rgba(30,45,69,0.05); transition: all 0.25s; }
.d6-brand-pg-card:hover { box-shadow: 0 12px 32px rgba(30,45,69,0.1); transform: translateY(-3px); }
.d6-brand-pg-logo { height: 44px; object-fit: contain; margin-bottom: 20px; mix-blend-mode: multiply; }
.d6-brand-pg-name { font-size: 20px; font-weight: 800; color: #1e2d45; margin-bottom: 10px; }
.d6-brand-pg-desc { font-size: 14px; color: rgba(30,45,69,0.5); line-height: 1.7; }
.d6-brand-pg-dot { width: 32px; height: 4px; background: #FF6B2C; border-radius: 4px; margin-bottom: 16px; }

.d6-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.d6-filter-btn { font-size: 13px; font-weight: 700; padding: 8px 20px; border-radius: 50px; border: 2px solid rgba(30,45,69,0.12); background: #fff; color: rgba(30,45,69,0.5); cursor: pointer; transition: all 0.2s; }
.d6-filter-btn:hover { border-color: #FF6B2C; color: #FF6B2C; }
.d6-filter-btn.active { background: #FF6B2C; border-color: #FF6B2C; color: #fff; }

.d6-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.d6-acc-card { background: #fff; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,107,44,0.08); box-shadow: 0 2px 10px rgba(30,45,69,0.04); }
.d6-acc-name { font-size: 15px; font-weight: 800; color: #1e2d45; margin-bottom: 8px; }
.d6-acc-desc { font-size: 13px; color: rgba(30,45,69,0.5); line-height: 1.65; margin-bottom: 14px; }
.d6-acc-price { font-size: 20px; font-weight: 800; color: #003366; }

.d6-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.d6-about-text h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #1e2d45; letter-spacing: -0.03em; margin-bottom: 24px; line-height: 1.15; }
.d6-about-text p { font-size: 15px; color: rgba(30,45,69,0.55); line-height: 1.8; margin-bottom: 16px; }
.d6-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
.d6-stat-card { background: #fff; border-radius: 20px; padding: 24px; text-align: center; box-shadow: 0 4px 16px rgba(30,45,69,0.06); border: 1px solid rgba(255,107,44,0.08); }
.d6-stat-val { font-size: 36px; font-weight: 800; color: #FF6B2C; letter-spacing: -0.03em; }
.d6-stat-label { font-size: 12px; font-weight: 600; color: rgba(30,45,69,0.4); margin-top: 4px; }
.d6-hours-card { background: #FFF8F2; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,107,44,0.12); }
.d6-hours-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(30,45,69,0.4); margin-bottom: 14px; }
.d6-hours-row { font-size: 14px; font-weight: 600; color: rgba(30,45,69,0.7); padding: 5px 0; }
.d6-hours-note { font-size: 12px; color: #FF6B2C; font-weight: 700; margin-top: 10px; }

.d6-faq { margin-top: 72px; }
.d6-faq-title { font-size: 28px; font-weight: 800; color: #1e2d45; letter-spacing: -0.03em; margin-bottom: 24px; }
.d6-faq-item { background: #fff; border-radius: 16px; margin-bottom: 10px; border: 1px solid rgba(255,107,44,0.1); overflow: hidden; }
.d6-faq-q { width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 700; color: #1e2d45; }
.d6-faq-icon { width: 28px; height: 28px; background: rgba(255,107,44,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #FF6B2C; transition: transform 0.25s; flex-shrink: 0; }
.d6-faq-q.open .d6-faq-icon { transform: rotate(45deg); background: #FF6B2C; color: #fff; }
.d6-faq-a { padding: 0 24px 20px; font-size: 14px; color: rgba(30,45,69,0.55); line-height: 1.8; }

.d6-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
.d6-contact-info h2 { font-size: 32px; font-weight: 800; color: #1e2d45; letter-spacing: -0.03em; margin-bottom: 32px; }
.d6-contact-detail { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
.d6-contact-icon { width: 44px; height: 44px; background: rgba(255,107,44,0.1); border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 20px; }
.d6-contact-label { font-size: 11px; font-weight: 700; color: rgba(30,45,69,0.35); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2px; }
.d6-contact-val { font-size: 15px; font-weight: 600; color: #1e2d45; }
.d6-contact-val a { color: #003366; }
.d6-form-card { background: #fff; border-radius: 28px; padding: 36px; box-shadow: 0 8px 32px rgba(30,45,69,0.08); border: 1px solid rgba(255,107,44,0.08); }
.d6-form-group { margin-bottom: 18px; }
.d6-form-label { display: block; font-size: 13px; font-weight: 700; color: rgba(30,45,69,0.55); margin-bottom: 8px; }
.d6-form-control { width: 100%; padding: 14px 18px; border: 2px solid rgba(30,45,69,0.1); border-radius: 14px; font-size: 14px; font-weight: 500; color: #1e2d45; outline: none; transition: border-color 0.2s; font-family: inherit; background: #FFF8F2; }
.d6-form-control:focus { border-color: #FF6B2C; background: #fff; }
.d6-form-control::placeholder { color: rgba(30,45,69,0.25); }
textarea.d6-form-control { resize: vertical; min-height: 100px; }

.d6-footer { background: #1e2d45; padding: 64px 48px 32px; }
.d6-footer-inner { max-width: 1200px; margin: 0 auto; }
.d6-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
.d6-footer-brand { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 12px; }
.d6-footer-brand span { color: #FF6B2C; }
.d6-footer-tagline { font-size: 14px; color: rgba(255,255,255,0.35); line-height: 1.7; max-width: 240px; }
.d6-footer-col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
.d6-footer-nav a, .d6-footer-nav span { display: block; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.4); margin-bottom: 12px; transition: color 0.2s; }
.d6-footer-nav a:hover { color: rgba(255,255,255,0.85); }
.d6-footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.25); font-weight: 600; flex-wrap: wrap; gap: 8px; }

.d6-page-hero { background: linear-gradient(135deg, #FFF8F2 0%, #FFE4CC 100%); padding: 136px 48px 64px; }
.d6-page-hero-inner { max-width: 1200px; margin: 0 auto; }
.d6-page-hero-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6B2C; margin-bottom: 12px; }
.d6-page-hero h1 { font-size: clamp(36px, 5vw, 60px); font-weight: 800; color: #1e2d45; letter-spacing: -0.03em; }

@media (max-width: 900px) {
  .d6-nav { padding: 0 20px; }
  .d6-nav-links, .d6-nav-cta { display: none; }
  .d6-hamburger { display: flex; }
  .d6-hero { padding: 96px 24px 64px; grid-template-columns: 1fr; }
  .d6-hero-visual { display: none; }
  .d6-section { padding: 64px 24px; }
  .d6-about-grid, .d6-contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .d6-footer-top { grid-template-columns: 1fr; gap: 32px; }
  .d6-brands-strip { padding: 32px 24px; }
  .d6-reviews-section { padding: 64px 24px; }
  .d6-cta-section { padding: 64px 24px; }
  .d6-page-hero { padding: 108px 24px 48px; }
}
@media (max-width: 768px) {
  .d6-nav { padding: 0 16px; height: 60px; }
  .d6-nav-logo { font-size: 18px; }
  .d6-nav-links, .d6-nav-cta { display: none; }
  .d6-hamburger { display: flex; }
  .d6-mobile-menu { top: 60px; }
  .d6-hero { padding: 80px 16px 48px; grid-template-columns: 1fr; min-height: auto; }
  .d6-hero-visual { display: none; }
  .d6-hero-actions { flex-direction: column; gap: 10px; }
  .d6-hero-actions .d6-btn { width: 100%; justify-content: center; }
  .d6-section { padding: 40px 16px; }
  .d6-products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
  .d6-reviews-grid { grid-template-columns: 1fr; }
  .d6-brands-logos { gap: 20px; }
  .d6-brands-strip { padding: 28px 16px; }
  .d6-reviews-section { padding: 48px 16px; }
  .d6-cta-section { padding: 48px 16px; }
  .d6-about-grid { grid-template-columns: 1fr; gap: 32px; }
  .d6-contact-grid { grid-template-columns: 1fr; gap: 32px; }
  .d6-footer-top { grid-template-columns: 1fr; gap: 24px; }
  .d6-footer { padding: 40px 16px 20px; }
  .d6-page-hero { padding: 88px 16px 40px; }
  .d6-acc-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  .d6-brands-pg-grid { grid-template-columns: 1fr; }
  .d6-stats-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .d6-products-grid { grid-template-columns: 1fr; }
  .d6-acc-grid { grid-template-columns: 1fr; }
  .d6-brands-logos { flex-direction: column; align-items: center; gap: 16px; }
  .d6-section { padding: 32px 14px; }
  .d6-hero { padding: 72px 14px 40px; }
  .d6-cta-section { padding: 40px 14px; }
}
.d6-wifi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; max-width: 1100px; margin: 0 auto; }
@media (max-width: 768px) { .d6-wifi-grid { grid-template-columns: 1fr; gap: 32px; } }
@keyframes d6-fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes d6-fadeIn { from { opacity: 0; } to { opacity: 1; } }
.d6-hero-text > * { animation: d6-fadeUp 0.65s ease both; }
.d6-hero-text > *:nth-child(2) { animation-delay: 0.12s; }
.d6-hero-text > *:nth-child(3) { animation-delay: 0.24s; }
.d6-hero-text > *:nth-child(4) { animation-delay: 0.36s; }
.d6-hero-visual { animation: d6-fadeIn 0.9s ease both; animation-delay: 0.2s; }
.d6-prod-card { transition: transform 0.25s, box-shadow 0.25s; }
.d6-prod-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(255,107,44,0.15); }
.d6-brand-pill { transition: transform 0.2s, background 0.2s; }
.d6-brand-pill:hover { transform: scale(1.04); }
.d6-spec-body::-webkit-scrollbar { width: 5px; }
.d6-spec-body::-webkit-scrollbar-track { background: transparent; }
.d6-spec-body::-webkit-scrollbar-thumb { background: #FF6600; border-radius: 10px; }
.d6-reveal { opacity: 0; transform: translateY(24px) scale(0.98); transition: opacity 0.65s cubic-bezier(0.34,1.56,0.64,1), transform 0.65s cubic-bezier(0.34,1.56,0.64,1); }
.d6-reveal.visible { opacity: 1; transform: none; }
.d6-grid-reveal > * { opacity: 0; transform: translateY(24px) scale(0.98); transition: opacity 0.65s cubic-bezier(0.34,1.56,0.64,1), transform 0.65s cubic-bezier(0.34,1.56,0.64,1); }
.d6-grid-reveal.visible > *:nth-child(1) { opacity: 1; transform: none; }
.d6-grid-reveal.visible > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 65ms; }
.d6-grid-reveal.visible > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 130ms; }
.d6-grid-reveal.visible > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 195ms; }
.d6-grid-reveal.visible > *:nth-child(5) { opacity: 1; transform: none; transition-delay: 260ms; }
.d6-grid-reveal.visible > *:nth-child(6) { opacity: 1; transform: none; transition-delay: 325ms; }
`

function useReveal(opts = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el) }
    }, { threshold: 0.08, ...opts })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function D6Header() {
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
      <nav className="d6-nav">
        <NavLink to={`${BASE}/`} className="d6-nav-logo">
          <img src="/logoairco.png" alt="AircoStunt" style={{ height: 34, width: 'auto' }} onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='inline' }} />
          <span style={{ display: 'none' }}>Airco<span style={{ color: '#FF6B2C' }}>Stunt</span></span>
        </NavLink>
        <div className="d6-nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`}
              className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d6-nav-cta">{SITE.phone}</a>
        <button className="d6-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`d6-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
        ))}
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{ color: '#FF6B2C', fontWeight: 700 }}>{SITE.phone}</a>
      </div>
    </>
  )
}

function D6Footer() {
  const slugs = ['/', '/merken', '/producten', '/over-ons', '/contact']
  const labels = ['Home', 'Merken', 'Producten', 'Over ons', 'Contact']
  return (
    <footer className="d6-footer">
      <div className="d6-footer-inner">
        <div className="d6-footer-top">
          <div>
            <div className="d6-footer-brand">Airco<span>Stunt</span></div>
            <p className="d6-footer-tagline">Split-unit airco's van A-merken voor de laagste prijs. 15 jaar ervaring. Alleen afhalen.</p>
          </div>
          <div>
            <div className="d6-footer-col-title">Navigatie</div>
            <div className="d6-footer-nav">
              {labels.map((l, i) => <NavLink key={l} to={`${BASE}${slugs[i]}`}>{l}</NavLink>)}
            </div>
          </div>
          <div>
            <div className="d6-footer-col-title">Contact</div>
            <div className="d6-footer-nav">
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>{SITE.address}</span>
              <span>Ma-Vr 09:00-20:00</span>
              <span>Za 09:00-13:00</span>
            </div>
          </div>
        </div>
        <div className="d6-footer-bottom">
          <span>&copy; {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
          <span>Alleen afhalen, geen webshop</span>
        </div>
      </div>
    </footer>
  )
}

function D6HomePage() {
  const navigate = useNavigate()
  const [headerRef, headerVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()
  const [revRef, revVisible] = useReveal()
  const heroUsps = [
    { emoji: '🏆', title: '15 jaar ervaring', sub: 'Specialist in airco' },
    { emoji: '💰', title: 'Laagste prijs', sub: 'Direct bij fabrikant' },
    { emoji: '✅', title: '2 jaar garantie', sub: 'Op alle producten' },
    { emoji: '🚀', title: 'Direct beschikbaar', sub: 'Uit voorraad afhalen' },
  ]
  return (
    <div>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <section className="d6-hero">
          <div>
            <div className="d6-hero-badge">Dordrecht, Nederland</div>
            <h1>Airco's van <span>A-merken</span> voor de laagste prijs</h1>
            <p className="d6-hero-sub">Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct afhalen, geen wachttijden, persoonlijk advies.</p>
            <div className="d6-hero-actions">
              <button className="d6-btn d6-btn-primary" onClick={() => navigate(`${BASE}/producten`)}>Bekijk producten</button>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d6-btn d6-btn-outline">{SITE.phone}</a>
            </div>
          </div>
          <div className="d6-hero-visual">
            <div className="d6-hero-usps">
              {heroUsps.map(u => (
                <div key={u.title} className="d6-hero-usp">
                  <div className="d6-hero-usp-icon">{u.emoji}</div>
                  <div>
                    <div className="d6-hero-usp-title">{u.title}</div>
                    <div className="d6-hero-usp-sub">{u.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="d6-brands-strip">
        <div className="d6-brands-strip-inner">
          <div className="d6-brands-label">Merken die wij voeren</div>
          <div className="d6-brands-logos">
            {BRANDS.map(b => b.logo
              ? <img key={b.id} src={b.logo} alt={b.name} className="d6-brand-logo" />
              : <span key={b.id} className="d6-brand-text">{b.name}</span>
            )}
          </div>
        </div>
      </div>

      <section className="d6-section">
        <div ref={headerRef} className={`d6-reveal${headerVisible ? ' visible' : ''}`}>
          <div className="d6-section-eyebrow">Ons aanbod</div>
          <div className="d6-section-title">Populaire producten</div>
        </div>
        <div ref={gridRef} className={`d6-products-grid d6-grid-reveal${gridVisible ? ' visible' : ''}`}>
          {PRODUCTS.slice(0, 6).map(p => (
            <div key={p.id} className="d6-product-card">
              <div className="d6-product-img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.name} className="d6-product-img" />
                  : <div className="d6-product-placeholder"><span>Afbeelding</span></div>
                }
                <div className={`d6-product-badge ${p.inStock ? 'd6-badge-in' : 'd6-badge-out'}`}>
                  {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                </div>
              </div>
              <div className="d6-product-body">
                <div className="d6-product-brand">{p.brandId}</div>
                <div className="d6-product-name">{p.name}</div>
                <ul className="d6-product-feats">
                  {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <div className="d6-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="d6-btn d6-btn-secondary" onClick={() => navigate(`${BASE}/producten`)}>Alle producten bekijken</button>
        </div>
      </section>

      <div className="d6-reviews-section">
        <div className="d6-reviews-inner">
          <div className="d6-section-eyebrow">Google reviews</div>
          <div className="d6-section-title">Tevreden klanten</div>
          <div ref={revRef} className={`d6-reviews-grid d6-grid-reveal${revVisible ? ' visible' : ''}`}>
            {REVIEWS.slice(0, 6).map((r, i) => (
              <div key={i} className="d6-review-card">
                <div className="d6-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="d6-review-text">"{r.text}"</p>
                <div className="d6-review-name">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WiFi feature section */}
      <section style={{ background: '#fff7f3', padding: '80px 48px' }}>
        <div className="d6-wifi-grid">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: '#FF6B2C', textTransform: 'uppercase', marginBottom: 12 }}>Standaard inbegrepen</div>
            <h2 style={{ fontFamily: 'Nunito,sans-serif', fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#1e2d45', lineHeight: 1.15, marginBottom: 16 }}>
              Gratis WiFi-module bij elke airco
            </h2>
            <p style={{ fontSize: 16, color: '#6b7c8d', lineHeight: 1.75, marginBottom: 24 }}>
              Bedien uw airco via de app op uw telefoon. Onze airco's zijn voorzien van een ingebouwde wifi-module, zodat u altijd de controle heeft.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['MyDaikin', 'MELCloud', 'SmartThings', 'LG ThinQ'].map(app => (
                <span key={app} style={{ background: '#fff', border: '1.5px solid #FF6B2C', color: '#FF6B2C', fontSize: 12, padding: '6px 16px', borderRadius: 50, fontWeight: 700 }}>{app}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 8px 40px rgba(0,51,102,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/wifi.png" alt="WiFi module" style={{ maxWidth: 200, maxHeight: 200, objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="d6-cta-section">
        <div className="d6-cta-inner">
          <h2>Klaar voor een frisse zomer?</h2>
          <p>Bel ons of kom langs in onze showroom in Dordrecht</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d6-btn d6-btn-primary">{SITE.phone}</a>
            <button className="d6-btn d6-btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }} onClick={() => navigate(`${BASE}/contact`)}>
              Stuur bericht
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

function D6MerkenPage() {
  return (
    <div>
      <div className="d6-page-hero">
        <div className="d6-page-hero-inner">
          <div className="d6-page-hero-eyebrow">Ons assortiment</div>
          <h1>De merken</h1>
        </div>
      </div>
      <section className="d6-section">
        <div className="d6-brands-pg-grid">
          {BRANDS.map(b => (
            <div key={b.id} className="d6-brand-pg-card">
              {b.logo && <img src={b.logo} alt={b.name} className="d6-brand-pg-logo" />}
              <div className="d6-brand-pg-dot" />
              <div className="d6-brand-pg-name">{b.name}</div>
              <p className="d6-brand-pg-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D6SpecModal({ product, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const s = product.specs || {}
  const rows = [['Koelcapaciteit',s.koelcapaciteit],['Verwarmingscapaciteit',s.verwarmingscapaciteit],['Energielabel koeling',s.energielabelKoeling],['Energielabel verwarming',s.energielabelVerwarming],['SEER',s.seer],['SCOP',s.scop],['Geluid (binnen)',s.geluidBinnen],['Geluid (buiten)',s.geluidBuiten],['Koudemiddel',s.koudemiddel],['Afmetingen binnenunit',s.afmetingenBinnen],['Gewicht binnenunit',s.gewichtBinnen],['WiFi',s.wifi],['Geschikt voor',s.geschiktVoor],['Stroomverbruik',s.verbruikNominaal]].filter(([,v])=>v)
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div className="d6-spec-body" style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto',boxShadow:'0 32px 80px rgba(255,107,44,0.15)',scrollbarWidth:'thin',scrollbarColor:'#FF6600 transparent'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',borderBottom:'1px solid #fce8df'}}>
          <div><div style={{fontSize:11,color:'#FF6B2C',fontWeight:700,letterSpacing:'0.1em',marginBottom:4,textTransform:'uppercase'}}>{BRANDS.find(b=>b.id===product.brandId)?.name}</div><div style={{fontSize:20,fontWeight:800,color:'#1e2d45'}}>{product.name}</div></div>
          <button onClick={onClose} style={{background:'#fff5f0',border:'none',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:20,color:'#FF6B2C'}}>×</button>
        </div>
        {product.image&&<div style={{background:'#fdf5f0',display:'flex',alignItems:'center',justifyContent:'center',height:180}}><img src={product.image} alt={product.name} style={{maxHeight:140,maxWidth:'100%',objectFit:'contain'}}/></div>}
        <div style={{padding:'20px 24px'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'#aaa',marginBottom:12,textTransform:'uppercase'}}>Technische specificaties</div>
          {rows.map(([label,value],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid #f0e8e0',fontSize:14,background:i%2===0?'#fff8f5':'transparent'}}>
              <span style={{color:'#aaa',fontWeight:600}}>{label}</span>
              <span style={{color:'#FF6B2C',fontWeight:700,textAlign:'right',marginLeft:16,maxWidth:'55%'}}>{value}</span>
            </div>
          ))}
          <div style={{marginTop:20,background:'#fff5f0',borderRadius:16,padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div><div style={{fontSize:11,color:'#aaa',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Prijs</div><div style={{fontSize:26,fontWeight:800,color:'#1e2d45'}}>€{product.priceFrom} <span style={{fontSize:13,color:'#aaa',fontWeight:500}}>incl. BTW</span></div></div>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{background:'#FF6B2C',color:'#fff',padding:'12px 24px',borderRadius:50,fontSize:13,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Bel voor info</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function D6ProductenPage() {
  const [active, setActive] = useState('all')
  const [sel, setSel] = useState(null)
  const brandIds = ['all', ...BRANDS.map(b => b.id)]
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === active)
  return (
    <div>
      {sel && <D6SpecModal product={sel} onClose={() => setSel(null)} />}
      <div className="d6-page-hero">
        <div className="d6-page-hero-inner">
          <div className="d6-page-hero-eyebrow">Ons assortiment</div>
          <h1>Alle producten</h1>
        </div>
      </div>
      <section className="d6-section">
        <div className="d6-filter-bar">
          {brandIds.map(id => (
            <button key={id} className={`d6-filter-btn ${active === id ? 'active' : ''}`} onClick={() => setActive(id)}>
              {id === 'all' ? 'Alles' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>
        <div className="d6-products-grid" style={{ marginBottom: 80 }}>
          {filtered.map(p => (
            <div key={p.id} className="d6-product-card">
              <div className="d6-product-img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.name} className="d6-product-img" />
                  : <div className="d6-product-placeholder"><span>Afbeelding</span></div>
                }
                <div className={`d6-product-badge ${p.inStock ? 'd6-badge-in' : 'd6-badge-out'}`}>
                  {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                </div>
              </div>
              <div className="d6-product-body">
                <div className="d6-product-brand">{p.brandId}</div>
                <div className="d6-product-name">{p.name}</div>
                <ul className="d6-product-feats">
                  {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:10}}>
                  <div className="d6-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
                  <button onClick={() => setSel(p)} style={{background:'none',border:'1.5px solid #FF6B2C',color:'#FF6B2C',padding:'5px 14px',borderRadius:50,fontSize:12,fontWeight:700,cursor:'pointer'}}>Specs</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d6-section-eyebrow">Extra</div>
        <div className="d6-section-title">Accessoires</div>
        <div className="d6-acc-grid">
          {ACCESSORIES.map(a => (
            <div key={a.id} className="d6-acc-card">
              <div className="d6-acc-name">{a.name}</div>
              <p className="d6-acc-desc">{a.description}</p>
              <div className="d6-acc-price">&euro;{a.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D6OverOnsPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      <div className="d6-page-hero">
        <div className="d6-page-hero-inner">
          <div className="d6-page-hero-eyebrow">Ons verhaal</div>
          <h1>Over ons</h1>
        </div>
      </div>
      <section className="d6-section">
        <div className="d6-about-grid">
          <div className="d6-about-text">
            <h2>Al 15 jaar uw <span style={{ color: '#FF6B2C' }}>airco-specialist</span></h2>
            <p>AircoStunt is gevestigd in Dordrecht en al meer dan 15 jaar specialist in split-unit airconditioners van A-merken.</p>
            <p>Ons geheim? We kopen direct bij de fabrikant en hebben geen dure showroomkosten, zodat u altijd de laagste prijs krijgt.</p>
            <p>Bij ons heeft u altijd de eigenaar aan de lijn. Eerlijk advies, persoonlijk contact en direct ophalen uit onze ruime voorraad.</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d6-btn d6-btn-primary">{SITE.phone}</a>
            </div>
          </div>
          <div>
            <div className="d6-stats-grid">
              {[{ val: '15+', label: 'Jaar ervaring' }, { val: '5', label: 'A-merken' }, { val: '2 jr', label: 'Garantie' }, { val: '100%', label: 'Tevredenheid' }].map(s => (
                <div key={s.label} className="d6-stat-card">
                  <div className="d6-stat-val">{s.val}</div>
                  <div className="d6-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="d6-hours-card">
              <div className="d6-hours-title">Openingstijden</div>
              <div className="d6-hours-row">Maandag t/m vrijdag: 09:00 - 20:00</div>
              <div className="d6-hours-row">Zaterdag: 09:00 - 13:00</div>
              <div className="d6-hours-note">Altijd bellen voor u langs komt!</div>
            </div>
          </div>
        </div>
        <div className="d6-faq">
          <div className="d6-faq-title">Veelgestelde vragen</div>
          {FAQ.map((item, i) => (
            <div key={i} className="d6-faq-item">
              <button className={`d6-faq-q ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {item.q}
                <div className="d6-faq-icon">+</div>
              </button>
              {openIdx === i && <p className="d6-faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D6ContactPage() {
  return (
    <div>
      <div className="d6-page-hero">
        <div className="d6-page-hero-inner">
          <div className="d6-page-hero-eyebrow">Neem contact op</div>
          <h1>Contact</h1>
        </div>
      </div>
      <section className="d6-section">
        {/* Opening hours + contact info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
          {/* Opening hours card */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(30,45,69,0.06)', border: '1px solid rgba(255,107,44,0.1)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FF6B2C', marginBottom: 20 }}>Openingstijden</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,107,44,0.08)' }}>
                  <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'rgba(30,45,69,0.6)' }}>Maandag t/m vrijdag</td>
                  <td style={{ padding: '10px 0', fontSize: 14, color: '#FF6B2C', textAlign: 'right', fontWeight: 700 }}>{OPENING_HOURS.weekdaysFrom} - {OPENING_HOURS.weekdaysTo}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,107,44,0.08)' }}>
                  <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'rgba(30,45,69,0.6)' }}>Zaterdag</td>
                  <td style={{ padding: '10px 0', fontSize: 14, color: '#FF6B2C', textAlign: 'right', fontWeight: 700 }}>{OPENING_HOURS.saturdayFrom} - {OPENING_HOURS.saturdayTo}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 0', fontSize: 14, fontWeight: 600, color: 'rgba(30,45,69,0.6)' }}>Zondag</td>
                  <td style={{ padding: '10px 0', fontSize: 14, color: 'rgba(30,45,69,0.3)', textAlign: 'right', fontWeight: 600 }}>{OPENING_HOURS.sundayClosed ? 'Gesloten' : 'Open'}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: 20, padding: '10px 16px', background: 'rgba(255,107,44,0.08)', borderRadius: 12, fontSize: 13, color: '#FF6B2C', fontWeight: 700 }}>
              Bel {OPENING_HOURS.callAheadMinutes} minuten van tevoren
            </div>
          </div>

          {/* Contact info card */}
          <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 20px rgba(30,45,69,0.06)', border: '1px solid rgba(255,107,44,0.1)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#FF6B2C', marginBottom: 20 }}>Contactgegevens</div>
            <div className="d6-contact-detail">
              <div className="d6-contact-icon">📞</div>
              <div>
                <div className="d6-contact-label">Telefoon</div>
                <div className="d6-contact-val"><a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a></div>
              </div>
            </div>
            <div className="d6-contact-detail">
              <div className="d6-contact-icon">✉️</div>
              <div>
                <div className="d6-contact-label">E-mail</div>
                <div className="d6-contact-val"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              </div>
            </div>
            <div className="d6-contact-detail">
              <div className="d6-contact-icon">📍</div>
              <div>
                <div className="d6-contact-label">Adres</div>
                <div className="d6-contact-val">{SITE.address}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: '10px 16px', background: '#FFF8F2', borderRadius: 12, fontSize: 13, color: 'rgba(30,45,69,0.5)', fontWeight: 600 }}>
              Alleen afhalen — geen verzending
            </div>
          </div>
        </div>

        {/* Google Maps embed */}
        <div style={{ width: '100%', height: 300, borderRadius: 20, overflow: 'hidden', marginBottom: 40, border: '1px solid rgba(255,107,44,0.1)' }}>
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
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d6-btn d6-btn-primary">Bel nu</a>
          <a href={`mailto:${SITE.email}`} className="d6-btn d6-btn-secondary">Stuur e-mail</a>
        </div>
      </section>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="d6">
      <D6Header />
      <div style={{ paddingTop: 68 }}>{children}</div>
      <D6Footer />
    </div>
  )
}

export default function Design6() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D6HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D6MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D6ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D6OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D6ContactPage /></Layout>} />
      </Routes>
      <WhatsAppButton />
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#FF6B2C', color: '#fff',
          padding: '10px 20px', borderRadius: 50, textDecoration: 'none',
          fontSize: 13, fontWeight: 700,
          boxShadow: '0 4px 16px rgba(255,107,44,0.35)',
        }}
      >
        Alle ontwerpen
      </Link>
    </>
  )
}
