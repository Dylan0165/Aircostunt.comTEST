import { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, OPENING_HOURS } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/5'

const CSS = `
.d5 *, .d5 *::before, .d5 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d5 { font-family: 'Poppins', 'Segoe UI', sans-serif; font-weight: 400; background: #fff; color: #0a1628; line-height: 1.6; min-height: 100vh; }
.d5 a { text-decoration: none; color: inherit; }

.d5-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: #fff; box-shadow: 0 1px 0 rgba(0,0,0,0.08);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 68px;
}
.d5-nav-logo { display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800; letter-spacing: -0.03em; color: #003366; }
.d5-nav-logo-icon { width: 36px; height: 36px; background: #003366; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.d5-nav-logo-icon svg { width: 20px; height: 20px; }
.d5-nav-logo span { color: #FF6600; }
.d5-nav-links { display: flex; gap: 4px; }
.d5-nav-links a { font-size: 14px; font-weight: 500; color: rgba(10,22,40,0.55); padding: 8px 14px; border-radius: 8px; transition: all 0.18s; }
.d5-nav-links a:hover { background: rgba(0,51,102,0.06); color: #003366; }
.d5-nav-links a.active { background: rgba(0,51,102,0.08); color: #003366; font-weight: 600; }
.d5-nav-cta { display: flex; align-items: center; gap: 8px; background: #FF6600; color: #fff; padding: 10px 22px; border-radius: 50px; font-size: 14px; font-weight: 600; transition: all 0.2s; box-shadow: 0 4px 14px rgba(255,102,0,0.3); }
.d5-nav-cta:hover { background: #e65c00; box-shadow: 0 6px 20px rgba(255,102,0,0.4); transform: translateY(-1px); }
.d5-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
.d5-hamburger span { display: block; width: 24px; height: 2px; background: #003366; border-radius: 2px; transition: all 0.3s; }
.d5-mobile-menu { display: none; position: fixed; top: 68px; left: 0; right: 0; background: #fff; border-bottom: 1px solid rgba(0,0,0,0.08); z-index: 99; padding: 20px 24px; }
.d5-mobile-menu.open { display: block; }
.d5-mobile-menu a { display: block; font-size: 15px; font-weight: 500; color: rgba(10,22,40,0.7); padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.06); }

.d5-hero { background: linear-gradient(135deg, #003366 0%, #004488 100%); min-height: 88vh; display: flex; align-items: center; padding: 100px 48px 80px; position: relative; overflow: hidden; }
.d5-hero-decor { position: absolute; right: -80px; top: -80px; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%); }
.d5-hero-decor2 { position: absolute; left: -40px; bottom: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(255,102,0,0.08) 0%, transparent 70%); }
.d5-hero-inner { max-width: 1200px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
.d5-hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 50px; padding: 6px 16px; font-size: 12px; font-weight: 600; letter-spacing: 0.06em; color: rgba(255,255,255,0.8); margin-bottom: 24px; text-transform: uppercase; }
.d5-hero-badge-dot { width: 6px; height: 6px; background: #FF6600; border-radius: 50%; }
.d5-hero h1 { font-size: clamp(38px, 5vw, 64px); font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 20px; }
.d5-hero h1 em { font-style: normal; color: #FF6600; }
.d5-hero-sub { font-size: 17px; color: rgba(255,255,255,0.65); line-height: 1.7; margin-bottom: 40px; max-width: 460px; }
.d5-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.d5-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; padding: 13px 26px; border-radius: 50px; transition: all 0.2s; cursor: pointer; border: none; }
.d5-btn-white { background: #fff; color: #003366; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
.d5-btn-white:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.2); transform: translateY(-2px); }
.d5-btn-outline { background: transparent; border: 2px solid rgba(255,255,255,0.4); color: #fff; }
.d5-btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
.d5-btn-orange { background: #FF6600; color: #fff; box-shadow: 0 4px 14px rgba(255,102,0,0.3); }
.d5-btn-orange:hover { background: #e65c00; box-shadow: 0 8px 24px rgba(255,102,0,0.4); transform: translateY(-2px); }
.d5-btn-navy { background: #003366; color: #fff; }
.d5-btn-navy:hover { background: #002855; transform: translateY(-1px); }
.d5-hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.d5-hero-stat { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 24px; }
.d5-hero-stat-val { font-size: 36px; font-weight: 800; color: #fff; letter-spacing: -0.03em; line-height: 1; }
.d5-hero-stat-label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 6px; }

.d5-usps-strip { background: #f8faff; border-bottom: 1px solid rgba(0,51,102,0.08); }
.d5-usps-inner { max-width: 1200px; margin: 0 auto; padding: 0 48px; display: flex; }
.d5-usp-item { flex: 1; padding: 28px 24px; display: flex; align-items: center; gap: 14px; border-right: 1px solid rgba(0,51,102,0.08); }
.d5-usp-item:last-child { border-right: none; }
.d5-usp-icon { width: 42px; height: 42px; background: rgba(255,102,0,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.d5-usp-icon svg { width: 20px; height: 20px; color: #FF6600; }
.d5-usp-text-title { font-size: 14px; font-weight: 700; color: #003366; }
.d5-usp-text-sub { font-size: 12px; color: rgba(10,22,40,0.45); }

.d5-section { max-width: 1200px; margin: 0 auto; padding: 88px 48px; }
.d5-section-header { margin-bottom: 52px; }
.d5-section-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; margin-bottom: 12px; }
.d5-section-title { font-size: clamp(28px, 3.5vw, 42px); font-weight: 800; color: #003366; letter-spacing: -0.03em; line-height: 1.15; }
.d5-section-sub { font-size: 16px; color: rgba(10,22,40,0.5); margin-top: 12px; }

.d5-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin-bottom: 52px; }
.d5-product-card { background: #fff; border: 1px solid rgba(0,51,102,0.1); border-radius: 20px; overflow: hidden; transition: all 0.25s; }
.d5-product-card:hover { border-color: rgba(0,51,102,0.25); box-shadow: 0 16px 40px rgba(0,0,0,0.1); transform: translateY(-4px); }
.d5-product-card-img-wrap { background: #f8faff; padding: 24px; position: relative; }
.d5-product-card-img { width: 100%; height: 160px; object-fit: contain; }
.d5-product-card-placeholder { width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; }
.d5-product-card-placeholder span { font-size: 13px; color: rgba(10,22,40,0.2); font-weight: 500; }
.d5-product-card-badge { position: absolute; top: 12px; right: 12px; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 50px; }
.d5-badge-stock { background: rgba(0,200,100,0.12); color: #00a855; }
.d5-badge-out { background: rgba(0,0,0,0.06); color: rgba(10,22,40,0.4); }
.d5-product-card-body { padding: 20px; }
.d5-product-card-brand { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; margin-bottom: 6px; }
.d5-product-card-name { font-size: 16px; font-weight: 700; color: #003366; margin-bottom: 12px; }
.d5-product-card-features { list-style: none; margin-bottom: 16px; }
.d5-product-card-features li { font-size: 12px; color: rgba(10,22,40,0.5); padding: 3px 0; display: flex; align-items: center; gap: 8px; }
.d5-product-card-features li::before { content: ''; display: block; width: 5px; height: 5px; background: #003366; border-radius: 50%; flex-shrink: 0; opacity: 0.4; }
.d5-product-card-footer { display: flex; align-items: center; justify-content: space-between; }
.d5-product-price { font-size: 22px; font-weight: 800; color: #003366; }
.d5-product-price small { font-size: 12px; font-weight: 500; color: rgba(10,22,40,0.35); }

.d5-brands-section { background: #f8faff; padding: 64px 48px; border-top: 1px solid rgba(0,51,102,0.07); border-bottom: 1px solid rgba(0,51,102,0.07); }
.d5-brands-inner { max-width: 1200px; margin: 0 auto; }
.d5-brands-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(10,22,40,0.3); text-align: center; margin-bottom: 36px; }
.d5-brands-logos { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; }
.d5-brand-logo { height: 38px; object-fit: contain; filter: grayscale(1) opacity(0.45); transition: filter 0.3s; mix-blend-mode: multiply; }
.d5-brand-logo:hover { filter: grayscale(0) opacity(1); }
.d5-brand-text { font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.3); }

.d5-reviews-section { background: linear-gradient(135deg, #003366 0%, #004488 100%); padding: 88px 48px; }
.d5-reviews-inner { max-width: 1200px; margin: 0 auto; }
.d5-reviews-header { margin-bottom: 48px; }
.d5-reviews-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; margin-bottom: 12px; }
.d5-reviews-title { font-size: clamp(28px, 3.5vw, 42px); font-weight: 800; color: #fff; letter-spacing: -0.03em; }
.d5-reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.d5-review-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; }
.d5-review-stars { color: #FF6600; font-size: 14px; letter-spacing: 2px; margin-bottom: 12px; }
.d5-review-text { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.75; margin-bottom: 16px; }
.d5-review-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.45); }

.d5-cta-section { background: #FF6600; padding: 80px 48px; text-align: center; }
.d5-cta-section h2 { font-size: clamp(28px, 4vw, 48px); font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 12px; }
.d5-cta-section p { font-size: 17px; color: rgba(255,255,255,0.75); margin-bottom: 40px; }

.d5-brands-pg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.d5-brand-pg-card { background: #fff; border: 1px solid rgba(0,51,102,0.1); border-radius: 20px; padding: 36px; transition: all 0.25s; }
.d5-brand-pg-card:hover { border-color: rgba(0,51,102,0.25); box-shadow: 0 12px 32px rgba(0,0,0,0.08); transform: translateY(-3px); }
.d5-brand-pg-logo { height: 44px; object-fit: contain; margin-bottom: 24px; mix-blend-mode: multiply; }
.d5-brand-pg-name { font-size: 18px; font-weight: 800; color: #003366; margin-bottom: 10px; }
.d5-brand-pg-desc { font-size: 14px; color: rgba(10,22,40,0.5); line-height: 1.7; }

.d5-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
.d5-filter-btn { font-size: 13px; font-weight: 600; padding: 8px 20px; border-radius: 50px; border: 2px solid rgba(0,51,102,0.15); background: #fff; color: rgba(10,22,40,0.5); cursor: pointer; transition: all 0.2s; }
.d5-filter-btn:hover { border-color: #003366; color: #003366; }
.d5-filter-btn.active { background: #003366; border-color: #003366; color: #fff; }

.d5-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.d5-acc-card { background: #f8faff; border: 1px solid rgba(0,51,102,0.08); border-radius: 16px; padding: 24px; }
.d5-acc-name { font-size: 15px; font-weight: 700; color: #003366; margin-bottom: 8px; }
.d5-acc-desc { font-size: 13px; color: rgba(10,22,40,0.5); line-height: 1.65; margin-bottom: 14px; }
.d5-acc-price { font-size: 20px; font-weight: 800; color: #003366; }

.d5-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.d5-about-text h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 800; color: #003366; letter-spacing: -0.03em; margin-bottom: 24px; line-height: 1.1; }
.d5-about-text p { font-size: 15px; color: rgba(10,22,40,0.55); line-height: 1.8; margin-bottom: 16px; }
.d5-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.d5-stat-card { background: #fff; border: 1px solid rgba(0,51,102,0.1); border-radius: 16px; padding: 28px; text-align: center; }
.d5-stat-val { font-size: 40px; font-weight: 800; color: #003366; letter-spacing: -0.03em; line-height: 1; }
.d5-stat-label { font-size: 12px; color: rgba(10,22,40,0.4); margin-top: 6px; font-weight: 500; }
.d5-hours-card { background: #003366; border-radius: 16px; padding: 28px; }
.d5-hours-title { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 16px; }
.d5-hours-row { font-size: 14px; color: rgba(255,255,255,0.8); padding: 5px 0; }
.d5-hours-note { font-size: 12px; color: #FF9944; margin-top: 10px; }

.d5-faq { margin-top: 72px; }
.d5-faq-title { font-size: 28px; font-weight: 800; color: #003366; letter-spacing: -0.03em; margin-bottom: 28px; }
.d5-faq-item { border: 1px solid rgba(0,51,102,0.1); border-radius: 14px; margin-bottom: 10px; overflow: hidden; }
.d5-faq-q { width: 100%; text-align: left; background: #fff; border: none; cursor: pointer; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 600; color: #003366; transition: background 0.2s; }
.d5-faq-q:hover { background: #f8faff; }
.d5-faq-icon { width: 26px; height: 26px; background: rgba(0,51,102,0.08); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #003366; transition: transform 0.25s; flex-shrink: 0; }
.d5-faq-q.open .d5-faq-icon { transform: rotate(45deg); background: #003366; color: #fff; }
.d5-faq-a { padding: 0 24px 20px; font-size: 14px; color: rgba(10,22,40,0.55); line-height: 1.8; }

.d5-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.d5-contact-info h2 { font-size: 32px; font-weight: 800; color: #003366; letter-spacing: -0.03em; margin-bottom: 32px; }
.d5-contact-detail { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 24px; }
.d5-contact-icon { width: 42px; height: 42px; background: rgba(255,102,0,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.d5-contact-icon svg { width: 18px; height: 18px; color: #FF6600; }
.d5-contact-label { font-size: 12px; font-weight: 700; color: rgba(10,22,40,0.35); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2px; }
.d5-contact-val { font-size: 15px; font-weight: 500; color: #003366; }
.d5-contact-val a { color: #003366; }
.d5-form-card { background: #fff; border: 1px solid rgba(0,51,102,0.1); border-radius: 24px; padding: 36px; box-shadow: 0 8px 32px rgba(0,0,0,0.06); }
.d5-form-group { margin-bottom: 20px; }
.d5-form-label { display: block; font-size: 13px; font-weight: 600; color: rgba(10,22,40,0.6); margin-bottom: 8px; }
.d5-form-control { width: 100%; padding: 13px 18px; border: 2px solid rgba(0,51,102,0.1); border-radius: 12px; font-size: 14px; color: #0a1628; outline: none; transition: border-color 0.2s; font-family: inherit; }
.d5-form-control:focus { border-color: #003366; }
.d5-form-control::placeholder { color: rgba(10,22,40,0.25); }
textarea.d5-form-control { resize: vertical; min-height: 100px; }

.d5-footer { background: #003366; color: rgba(255,255,255,0.6); padding: 64px 48px 32px; }
.d5-footer-inner { max-width: 1200px; margin: 0 auto; }
.d5-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 56px; margin-bottom: 56px; }
.d5-footer-brand { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.03em; margin-bottom: 12px; }
.d5-footer-brand span { color: #FF6600; }
.d5-footer-tagline { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; max-width: 260px; }
.d5-footer-col-title { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 16px; }
.d5-footer-nav a, .d5-footer-nav span { display: block; font-size: 14px; color: rgba(255,255,255,0.45); margin-bottom: 12px; transition: color 0.2s; }
.d5-footer-nav a:hover { color: rgba(255,255,255,0.9); }
.d5-footer-bottom { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px; display: flex; justify-content: space-between; font-size: 13px; flex-wrap: wrap; gap: 8px; }

.d5-page-hero { background: linear-gradient(135deg, #003366 0%, #004488 100%); padding: 140px 48px 72px; }
.d5-page-hero-inner { max-width: 1200px; margin: 0 auto; }
.d5-page-hero-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 16px; }
.d5-page-hero h1 { font-size: clamp(36px, 5vw, 60px); font-weight: 800; color: #fff; letter-spacing: -0.03em; }

@media (max-width: 900px) {
  .d5-nav { padding: 0 20px; }
  .d5-nav-links, .d5-nav-cta { display: none; }
  .d5-hamburger { display: flex; }
  .d5-hero { padding: 88px 24px 64px; }
  .d5-hero-inner { grid-template-columns: 1fr; }
  .d5-hero-stats { display: none; }
  .d5-usps-inner { flex-direction: column; padding: 0 24px; }
  .d5-usp-item { border-right: none; border-bottom: 1px solid rgba(0,51,102,0.08); }
  .d5-usp-item:last-child { border-bottom: none; }
  .d5-section { padding: 64px 24px; }
  .d5-about-grid, .d5-contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .d5-footer-top { grid-template-columns: 1fr; gap: 32px; }
  .d5-brands-section { padding: 48px 24px; }
  .d5-reviews-section { padding: 64px 24px; }
  .d5-cta-section { padding: 64px 24px; }
  .d5-page-hero { padding: 108px 24px 56px; }
}
@media (max-width: 768px) {
  .d5-nav { padding: 0 16px; height: 60px; }
  .d5-nav-logo { font-size: 17px; }
  .d5-nav-links, .d5-nav-cta { display: none; }
  .d5-hamburger { display: flex; }
  .d5-mobile-menu { top: 60px; }
  .d5-hero { padding: 72px 16px 48px; }
  .d5-hero-inner { grid-template-columns: 1fr; gap: 0; }
  .d5-hero-stats { display: none; }
  .d5-hero-actions { flex-direction: column; gap: 10px; }
  .d5-hero-actions .d5-btn { width: 100%; justify-content: center; }
  .d5-section { padding: 40px 16px; }
  .d5-products-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
  .d5-reviews-grid { grid-template-columns: 1fr; }
  .d5-brands-logos { gap: 20px; }
  .d5-brands-section { padding: 36px 16px; }
  .d5-reviews-section { padding: 48px 16px; }
  .d5-cta-section { padding: 48px 16px; }
  .d5-about-grid { grid-template-columns: 1fr; gap: 32px; }
  .d5-contact-grid { grid-template-columns: 1fr; gap: 32px; }
  .d5-footer-top { grid-template-columns: 1fr; gap: 24px; }
  .d5-footer { padding: 40px 16px 20px; }
  .d5-page-hero { padding: 88px 16px 40px; }
  .d5-acc-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
  .d5-brands-pg-grid { grid-template-columns: 1fr; }
  .d5-stats-grid { grid-template-columns: 1fr 1fr; }
  .d5-usps-inner { padding: 0 16px; }
}
@media (max-width: 480px) {
  .d5-products-grid { grid-template-columns: 1fr; }
  .d5-acc-grid { grid-template-columns: 1fr; }
  .d5-brands-logos { flex-direction: column; align-items: center; gap: 16px; }
  .d5-section { padding: 32px 14px; }
  .d5-hero { padding: 64px 14px 40px; }
  .d5-cta-section { padding: 40px 14px; }
}
@keyframes d5-fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes d5-fadeIn { from { opacity: 0; } to { opacity: 1; } }
.d5-hero-tag { animation: d5-fadeUp 0.5s ease both; }
.d5-hero-left h1 { animation: d5-fadeUp 0.6s ease both; animation-delay: 0.1s; }
.d5-hero-left > p { animation: d5-fadeUp 0.6s ease both; animation-delay: 0.22s; }
.d5-hero-left > div:last-child { animation: d5-fadeUp 0.6s ease both; animation-delay: 0.34s; }
.d5-hero-stats { animation: d5-fadeIn 0.8s ease both; animation-delay: 0.5s; }
.d5-prod-card { transition: transform 0.25s, box-shadow 0.25s; }
.d5-prod-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,51,102,0.15); }
.d5-brand-card { transition: transform 0.2s, box-shadow 0.2s; }
.d5-brand-card:hover { transform: translateY(-3px); }
.d5-spec-body::-webkit-scrollbar { width: 5px; }
.d5-spec-body::-webkit-scrollbar-track { background: transparent; }
.d5-spec-body::-webkit-scrollbar-thumb { background: #FF6600; border-radius: 10px; }
`

function D5Header() {
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
      <nav className="d5-nav">
        <NavLink to={`${BASE}/`} className="d5-nav-logo">
          <img src="/logoairco.png" alt="AircoStunt" style={{ height: 34, width: 'auto' }} onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='inline' }} />
          <span style={{ display: 'none' }}>Airco<span style={{ color: '#FF6600' }}>Stunt</span></span>
        </NavLink>
        <div className="d5-nav-links">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === `${BASE}/`}
              className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </div>
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d5-nav-cta">
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
          {SITE.phone}
        </a>
        <button className="d5-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`d5-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</NavLink>
        ))}
        <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{ color: '#FF6600', fontWeight: 600 }}>{SITE.phone}</a>
      </div>
    </>
  )
}

function D5Footer() {
  const slugs = ['/', '/merken', '/producten', '/over-ons', '/contact']
  const labels = ['Home', 'Merken', 'Producten', 'Over ons', 'Contact']
  return (
    <footer className="d5-footer">
      <div className="d5-footer-inner">
        <div className="d5-footer-top">
          <div>
            <div className="d5-footer-brand">Airco<span>Stunt</span></div>
            <p className="d5-footer-tagline">Split-unit airco's van A-merken voor de laagste prijs. 15 jaar ervaring. Alleen afhalen.</p>
          </div>
          <div>
            <div className="d5-footer-col-title">Navigatie</div>
            <div className="d5-footer-nav">
              {labels.map((l, i) => <NavLink key={l} to={`${BASE}${slugs[i]}`}>{l}</NavLink>)}
            </div>
          </div>
          <div>
            <div className="d5-footer-col-title">Contact</div>
            <div className="d5-footer-nav">
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>{SITE.address}</span>
              <span>Ma-Vr 09:00-20:00</span>
              <span>Za 09:00-13:00</span>
            </div>
          </div>
        </div>
        <div className="d5-footer-bottom">
          <span>&copy; {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
          <span>Alleen afhalen, geen webshop</span>
        </div>
      </div>
    </footer>
  )
}

const USPS = [
  { icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>, title: '2 jaar garantie', sub: 'Op alle producten' },
  { icon: <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>, title: 'Laagste prijs', sub: 'Direct bij ons inkopen' },
  { icon: <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>, title: 'Contant en pin', sub: 'Flexibel betalen' },
  { icon: <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>, title: 'Grootste voorraad', sub: 'Altijd op voorraad' },
]

function D5HomePage() {
  const navigate = useNavigate()
  return (
    <div>
      {/* Hero */}
      <section className="d5-hero">
        <div className="d5-hero-decor" />
        <div className="d5-hero-decor2" />
        <div className="d5-hero-inner">
          <div>
            <div className="d5-hero-badge">
              <div className="d5-hero-badge-dot" />
              Dordrecht, Nederland
            </div>
            <h1>Airco's van <em>A-merken</em> voor de laagste prijs</h1>
            <p className="d5-hero-sub">Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Direct afhalen uit onze showroom in Dordrecht. Geen wachttijden.</p>
            <div className="d5-hero-actions">
              <button className="d5-btn d5-btn-white" onClick={() => navigate(`${BASE}/producten`)}>Bekijk producten</button>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d5-btn d5-btn-outline">{SITE.phone}</a>
            </div>
          </div>
          <div className="d5-hero-stats">
            {[
              { val: '15+', label: 'Jaar ervaring' },
              { val: '2 jr', label: 'Garantie' },
              { val: '5', label: 'A-merken' },
              { val: '100%', label: 'Klanttevredenheid' },
            ].map(s => (
              <div key={s.label} className="d5-hero-stat">
                <div className="d5-hero-stat-val">{s.val}</div>
                <div className="d5-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs */}
      <div className="d5-usps-strip">
        <div className="d5-usps-inner">
          {USPS.map((u, i) => (
            <div key={i} className="d5-usp-item">
              <div className="d5-usp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="d5-usp-icon"
                  style={{ width: 20, height: 20, color: '#FF6600', background: 'none', border: 'none' }}>
                  {u.icon}
                </svg>
              </div>
              <div>
                <div className="d5-usp-text-title">{u.title}</div>
                <div className="d5-usp-text-sub">{u.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="d5-section">
        <div className="d5-section-header">
          <div className="d5-section-eyebrow">Ons assortiment</div>
          <div className="d5-section-title">Populaire producten</div>
          <div className="d5-section-sub">Direct uit voorraad leverbaar</div>
        </div>
        <div className="d5-products-grid">
          {PRODUCTS.slice(0, 4).map(p => (
            <div key={p.id} className="d5-product-card">
              <div className="d5-product-card-img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.name} className="d5-product-card-img" />
                  : <div className="d5-product-card-placeholder"><span>Afbeelding</span></div>
                }
                <div className={`d5-product-card-badge ${p.inStock ? 'd5-badge-stock' : 'd5-badge-out'}`}>
                  {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                </div>
              </div>
              <div className="d5-product-card-body">
                <div className="d5-product-card-brand">{p.brandId}</div>
                <div className="d5-product-card-name">{p.name}</div>
                <ul className="d5-product-card-features">
                  {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <div className="d5-product-card-footer">
                  <div className="d5-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="d5-btn d5-btn-navy" onClick={() => navigate(`${BASE}/producten`)}>Alle producten bekijken</button>
        </div>
      </section>

      {/* Brands */}
      <div className="d5-brands-section">
        <div className="d5-brands-inner">
          <div className="d5-brands-eyebrow">Merken die wij voeren</div>
          <div className="d5-brands-logos">
            {BRANDS.map(b => b.logo
              ? <img key={b.id} src={b.logo} alt={b.name} className="d5-brand-logo" />
              : <span key={b.id} className="d5-brand-text">{b.name}</span>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="d5-reviews-section">
        <div className="d5-reviews-inner">
          <div className="d5-reviews-header">
            <div className="d5-reviews-eyebrow">Google reviews</div>
            <div className="d5-reviews-title">Wat onze klanten zeggen</div>
          </div>
          <div className="d5-reviews-grid">
            {REVIEWS.slice(0, 6).map((r, i) => (
              <div key={i} className="d5-review-card">
                <div className="d5-review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                <p className="d5-review-text">"{r.text}"</p>
                <div className="d5-review-name">{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WiFi feature section */}
      <section style={{ background: '#f0f4f8', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 8px 40px rgba(0,51,102,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/wifi.png" alt="WiFi module" style={{ maxWidth: 200, maxHeight: 200, objectFit: 'contain' }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#FF6600', textTransform: 'uppercase', marginBottom: 12 }}>Standaard inbegrepen</div>
            <h2 style={{ fontFamily: 'Poppins,sans-serif', fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: '#003366', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16 }}>
              Gratis WiFi-module bij elke airco
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.75, marginBottom: 24 }}>
              Bedien uw airco gemakkelijk via de smartphone-app. Elke split-unit die wij leveren is voorzien van een ingebouwde wifi-module zonder meerkosten.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['MyDaikin', 'MELCloud', 'SmartThings', 'LG ThinQ'].map(app => (
                <span key={app} style={{ background: '#fff', border: '1.5px solid #003366', color: '#003366', fontSize: 12, padding: '6px 16px', borderRadius: 50, fontWeight: 600 }}>{app}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d5-cta-section">
        <h2>Klaar voor uw nieuwe airco?</h2>
        <p>Bel ons direct of kom langs in onze showroom in Dordrecht</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d5-btn d5-btn-white" style={{ color: '#FF6600' }}>{SITE.phone}</a>
          <button className="d5-btn d5-btn-outline" style={{ border: '2px solid rgba(255,255,255,0.5)', color: '#fff' }} onClick={() => navigate(`${BASE}/contact`)}>
            Stuur een bericht
          </button>
        </div>
      </section>
    </div>
  )
}

function D5MerkenPage() {
  return (
    <div>
      <div className="d5-page-hero">
        <div className="d5-page-hero-inner">
          <div className="d5-page-hero-eyebrow">Ons assortiment</div>
          <h1>De merken</h1>
        </div>
      </div>
      <section className="d5-section">
        <div className="d5-brands-pg-grid">
          {BRANDS.map(b => (
            <div key={b.id} className="d5-brand-pg-card">
              {b.logo && <img src={b.logo} alt={b.name} className="d5-brand-pg-logo" />}
              <div className="d5-brand-pg-name">{b.name}</div>
              <p className="d5-brand-pg-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D5SpecModal({ product, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])
  const s = product.specs || {}
  const rows = [['Koelcapaciteit',s.koelcapaciteit],['Verwarmingscapaciteit',s.verwarmingscapaciteit],['Energielabel koeling',s.energielabelKoeling],['Energielabel verwarming',s.energielabelVerwarming],['SEER',s.seer],['SCOP',s.scop],['Geluid (binnen)',s.geluidBinnen],['Geluid (buiten)',s.geluidBuiten],['Koudemiddel',s.koudemiddel],['Afmetingen binnenunit',s.afmetingenBinnen],['Gewicht binnenunit',s.gewichtBinnen],['WiFi',s.wifi],['Geschikt voor',s.geschiktVoor],['Stroomverbruik',s.verbruikNominaal]].filter(([,v])=>v)
  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{position:'fixed',inset:0,zIndex:9000,background:'rgba(0,30,70,0.7)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
      <div className="d5-spec-body" style={{background:'#fff',borderRadius:16,width:'100%',maxWidth:540,maxHeight:'90vh',overflowY:'auto',boxShadow:'0 24px 80px rgba(0,51,102,0.25)',scrollbarWidth:'thin',scrollbarColor:'#FF6600 transparent'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'20px 24px',borderBottom:'1px solid #f0f0f0'}}>
          <div><div style={{fontSize:11,color:'#FF6600',fontWeight:700,letterSpacing:'0.1em',marginBottom:4,textTransform:'uppercase'}}>{BRANDS.find(b=>b.id===product.brandId)?.name}</div><div style={{fontSize:20,fontWeight:800,color:'#003366'}}>{product.name}</div></div>
          <button onClick={onClose} style={{background:'#f5f5f5',border:'none',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center',color:'#666'}}>×</button>
        </div>
        {product.image&&<div style={{background:'#f8f9fa',display:'flex',alignItems:'center',justifyContent:'center',height:180}}><img src={product.image} alt={product.name} style={{maxHeight:140,maxWidth:'100%',objectFit:'contain'}}/></div>}
        <div style={{padding:'20px 24px'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.1em',color:'#999',marginBottom:12,textTransform:'uppercase'}}>Technische specificaties</div>
          {rows.map(([label,value],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',borderBottom:'1px solid #f0f0f0',fontSize:14,background:i%2===0?'#f8faff':'transparent'}}>
              <span style={{color:'#888',fontWeight:600}}>{label}</span>
              <span style={{color:'#003366',fontWeight:700,textAlign:'right',marginLeft:16,maxWidth:'55%'}}>{value}</span>
            </div>
          ))}
          <div style={{marginTop:20,background:'#f8f9fa',borderRadius:12,padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
            <div><div style={{fontSize:11,color:'#999',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase'}}>Prijs</div><div style={{fontSize:28,fontWeight:800,color:'#003366'}}>€{product.priceFrom} <span style={{fontSize:13,color:'#999',fontWeight:500}}>incl. BTW</span></div></div>
            <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} style={{background:'#FF6600',color:'#fff',padding:'12px 24px',borderRadius:50,fontSize:13,fontWeight:700,textDecoration:'none',whiteSpace:'nowrap'}}>Bel voor info</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function D5ProductenPage() {
  const [active, setActive] = useState('all')
  const [sel, setSel] = useState(null)
  const brandIds = ['all', ...BRANDS.map(b => b.id)]
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.brandId === active)
  return (
    <div>
      {sel && <D5SpecModal product={sel} onClose={() => setSel(null)} />}
      <div className="d5-page-hero">
        <div className="d5-page-hero-inner">
          <div className="d5-page-hero-eyebrow">Ons assortiment</div>
          <h1>Alle producten</h1>
        </div>
      </div>
      <section className="d5-section">
        <div className="d5-filter-bar">
          {brandIds.map(id => (
            <button key={id} className={`d5-filter-btn ${active === id ? 'active' : ''}`} onClick={() => setActive(id)}>
              {id === 'all' ? 'Alles' : BRANDS.find(b => b.id === id)?.name}
            </button>
          ))}
        </div>
        <div className="d5-products-grid" style={{ marginBottom: 80 }}>
          {filtered.map(p => (
            <div key={p.id} className="d5-product-card">
              <div className="d5-product-card-img-wrap">
                {p.image
                  ? <img src={p.image} alt={p.name} className="d5-product-card-img" />
                  : <div className="d5-product-card-placeholder"><span>Afbeelding</span></div>
                }
                <div className={`d5-product-card-badge ${p.inStock ? 'd5-badge-stock' : 'd5-badge-out'}`}>
                  {p.inStock ? 'Op voorraad' : 'Tijdelijk uit'}
                </div>
              </div>
              <div className="d5-product-card-body">
                <div className="d5-product-card-brand">{p.brandId}</div>
                <div className="d5-product-card-name">{p.name}</div>
                <ul className="d5-product-card-features">
                  {p.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <div className="d5-product-card-footer">
                  <div className="d5-product-price"><small>v.a. </small>&euro;{p.priceFrom}</div>
                  <button onClick={() => setSel(p)} style={{background:'none',border:'1px solid #003366',color:'#003366',padding:'6px 16px',borderRadius:50,fontSize:12,fontWeight:600,cursor:'pointer'}}>Specs</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d5-section-header">
          <div className="d5-section-eyebrow">Extra</div>
          <div className="d5-section-title">Accessoires</div>
        </div>
        <div className="d5-acc-grid">
          {ACCESSORIES.map(a => (
            <div key={a.id} className="d5-acc-card">
              <div className="d5-acc-name">{a.name}</div>
              <p className="d5-acc-desc">{a.description}</p>
              <div className="d5-acc-price">&euro;{a.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D5OverOnsPage() {
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <div>
      <div className="d5-page-hero">
        <div className="d5-page-hero-inner">
          <div className="d5-page-hero-eyebrow">Ons verhaal</div>
          <h1>Over ons</h1>
        </div>
      </div>
      <section className="d5-section">
        <div className="d5-about-grid">
          <div className="d5-about-text">
            <h2>15 jaar <span style={{ color: '#FF6600' }}>ervaring</span> in airco's</h2>
            <p>AircoStunt is gevestigd in Dordrecht en al meer dan 15 jaar de specialist in split-unit airconditioners van A-merken.</p>
            <p>Door direct bij fabrikanten in te kopen en geen dure showroomkosten door te berekenen, kunt u rekenen op de laagste prijs in Nederland.</p>
            <p>Bij ons heeft u altijd de eigenaar aan de lijn: eerlijk advies, persoonlijk contact en direct ophalen uit onze voorraad.</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d5-btn d5-btn-orange">{SITE.phone}</a>
            </div>
          </div>
          <div>
            <div className="d5-stats-grid">
              {[{ val: '15+', label: 'Jaar ervaring' }, { val: '5', label: 'A-merken' }, { val: '2 jr', label: 'Garantie' }, { val: '100%', label: 'Tevredenheid' }].map(s => (
                <div key={s.label} className="d5-stat-card">
                  <div className="d5-stat-val">{s.val}</div>
                  <div className="d5-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="d5-hours-card" style={{ marginTop: 16 }}>
              <div className="d5-hours-title">Openingstijden</div>
              <div className="d5-hours-row">Maandag t/m vrijdag: 09:00 - 20:00</div>
              <div className="d5-hours-row">Zaterdag: 09:00 - 13:00</div>
              <div className="d5-hours-note">Altijd bellen voor u langs komt!</div>
            </div>
          </div>
        </div>
        <div className="d5-faq">
          <div className="d5-faq-title">Veelgestelde vragen</div>
          {FAQ.map((item, i) => (
            <div key={i} className="d5-faq-item">
              <button className={`d5-faq-q ${openIdx === i ? 'open' : ''}`} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {item.q}
                <div className="d5-faq-icon">+</div>
              </button>
              {openIdx === i && <p className="d5-faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function D5ContactPage() {
  return (
    <div>
      <div className="d5-page-hero">
        <div className="d5-page-hero-inner">
          <div className="d5-page-hero-eyebrow">Neem contact op</div>
          <h1>Contact</h1>
        </div>
      </div>
      <section className="d5-section">
        {/* Opening hours + contact info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 40 }}>
          {/* Opening hours card */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,51,102,0.1)', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF6600', marginBottom: 20 }}>Openingstijden</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(0,51,102,0.06)' }}>
                  <td style={{ padding: '10px 0', fontSize: 14, color: 'rgba(10,22,40,0.55)', fontWeight: 500 }}>Maandag t/m vrijdag</td>
                  <td style={{ padding: '10px 0', fontSize: 14, color: '#003366', textAlign: 'right', fontWeight: 700 }}>{OPENING_HOURS.weekdaysFrom} - {OPENING_HOURS.weekdaysTo}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(0,51,102,0.06)' }}>
                  <td style={{ padding: '10px 0', fontSize: 14, color: 'rgba(10,22,40,0.55)', fontWeight: 500 }}>Zaterdag</td>
                  <td style={{ padding: '10px 0', fontSize: 14, color: '#003366', textAlign: 'right', fontWeight: 700 }}>{OPENING_HOURS.saturdayFrom} - {OPENING_HOURS.saturdayTo}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 0', fontSize: 14, color: 'rgba(10,22,40,0.55)', fontWeight: 500 }}>Zondag</td>
                  <td style={{ padding: '10px 0', fontSize: 14, color: 'rgba(10,22,40,0.3)', textAlign: 'right', fontWeight: 600 }}>{OPENING_HOURS.sundayClosed ? 'Gesloten' : 'Open'}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: 20, padding: '10px 14px', background: 'rgba(255,102,0,0.08)', borderRadius: 10, fontSize: 13, color: '#FF6600', fontWeight: 600 }}>
              Bel {OPENING_HOURS.callAheadMinutes} minuten van tevoren
            </div>
          </div>

          {/* Contact info card */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,51,102,0.1)', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FF6600', marginBottom: 20 }}>Contactgegevens</div>
            <div className="d5-contact-detail">
              <div className="d5-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: '#FF6600' }}><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>
              </div>
              <div>
                <div className="d5-contact-label">Telefoon</div>
                <div className="d5-contact-val"><a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}>{SITE.phone}</a></div>
              </div>
            </div>
            <div className="d5-contact-detail">
              <div className="d5-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: '#FF6600' }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div>
                <div className="d5-contact-label">E-mail</div>
                <div className="d5-contact-val"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              </div>
            </div>
            <div className="d5-contact-detail">
              <div className="d5-contact-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: '#FF6600' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
              <div>
                <div className="d5-contact-label">Adres</div>
                <div className="d5-contact-val">{SITE.address}</div>
              </div>
            </div>
            <div style={{ marginTop: 16, padding: '10px 14px', background: '#f8faff', borderRadius: 10, fontSize: 13, color: 'rgba(10,22,40,0.5)', fontWeight: 500 }}>
              Alleen afhalen — geen verzending
            </div>
          </div>
        </div>

        {/* Google Maps embed */}
        <div style={{ width: '100%', height: 300, borderRadius: 16, overflow: 'hidden', marginBottom: 40, border: '1px solid rgba(0,51,102,0.1)' }}>
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
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`} className="d5-btn d5-btn-orange">Bel nu</a>
          <a href={`mailto:${SITE.email}`} className="d5-btn d5-btn-navy">Stuur e-mail</a>
        </div>
      </section>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div className="d5">
      <D5Header />
      <div style={{ paddingTop: 68 }}>{children}</div>
      <D5Footer />
    </div>
  )
}

export default function Design5() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Routes>
        <Route path="/" element={<Layout><D5HomePage /></Layout>} />
        <Route path="merken" element={<Layout><D5MerkenPage /></Layout>} />
        <Route path="producten" element={<Layout><D5ProductenPage /></Layout>} />
        <Route path="over-ons" element={<Layout><D5OverOnsPage /></Layout>} />
        <Route path="contact" element={<Layout><D5ContactPage /></Layout>} />
      </Routes>
      <WhatsAppButton />
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#003366', color: '#fff',
          padding: '10px 20px', borderRadius: 50, textDecoration: 'none',
          fontSize: 13, fontWeight: 600,
          boxShadow: '0 6px 20px rgba(0,51,102,0.3)',
        }}
      >
        Alle ontwerpen
      </Link>
    </>
  )
}
