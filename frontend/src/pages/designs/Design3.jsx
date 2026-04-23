import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, BRAND_LOGOS } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/3'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

.d3 *, .d3 *::before, .d3 *::after { box-sizing: border-box; margin: 0; padding: 0; }
.d3 { font-family: 'Outfit', sans-serif; background: #111827; color: #F9FAFB; min-height: 100vh; overflow-x: hidden; }
.d3 a { text-decoration: none; color: inherit; }
.d3 button { font-family: 'Outfit', sans-serif; }

/* HEADER */
.d3-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  height: 68px;
  background: rgba(17,24,39,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center;
  padding: 0 40px;
  gap: 32px;
}
.d3-logo-wrap { background: #fff; border-radius: 8px; padding: 3px 6px; display: inline-flex; align-items: center; }
.d3-logo-img { height: 32px; object-fit: contain; display: block; }
.d3-nav-links { display: flex; align-items: center; gap: 2px; flex: 1; }
.d3-nav-links a {
  padding: 8px 16px; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.55);
  border-radius: 6px; transition: color 0.2s, background 0.2s; position: relative;
}
.d3-nav-links a:hover { color: #fff; background: rgba(255,255,255,0.06); }
.d3-nav-links a.d3-active { color: #FF6600; }
.d3-nav-links a.d3-active::after {
  content: '';
  position: absolute; bottom: -1px; left: 16px; right: 16px; height: 2px;
  background: #FF6600; border-radius: 2px 2px 0 0;
}
.d3-header-right { display: flex; align-items: center; gap: 16px; margin-left: auto; }
.d3-cart-btn {
  position: relative; background: rgba(255,102,0,0.12); border: 1px solid rgba(255,102,0,0.3);
  color: #FF6600; border-radius: 8px; padding: 8px 16px; font-size: 14px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s;
}
.d3-cart-btn:hover { background: rgba(255,102,0,0.2); border-color: #FF6600; }
.d3-cart-badge {
  background: #FF6600; color: #fff; font-size: 11px; font-weight: 700;
  min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center;
  justify-content: center; padding: 0 4px;
}
.d3-mobile-btn {
  display: none; background: none; border: none; color: #fff; cursor: pointer; padding: 4px;
}
.d3-mobile-menu {
  display: none; position: fixed; top: 68px; left: 0; right: 0; z-index: 199;
  background: #1F2937; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 16px;
}
.d3-mobile-menu.d3-open { display: block; }
.d3-mobile-menu a {
  display: block; padding: 13px 16px; font-size: 15px; font-weight: 500;
  color: rgba(255,255,255,0.7); border-radius: 6px; transition: all 0.2s;
}
.d3-mobile-menu a:hover { color: #FF6600; background: rgba(255,102,0,0.08); }

/* CART DRAWER */
.d3-cart-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 300;
  opacity: 0; pointer-events: none; transition: opacity 0.3s;
}
.d3-cart-overlay.d3-open { opacity: 1; pointer-events: all; }
.d3-cart-drawer {
  position: fixed; top: 0; right: 0; bottom: 0; width: 420px; max-width: 100vw;
  background: #1F2937; z-index: 301; display: flex; flex-direction: column;
  transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
  border-left: 1px solid rgba(255,255,255,0.08);
}
.d3-cart-drawer.d3-open { transform: translateX(0); }
.d3-cart-head {
  padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: space-between;
}
.d3-cart-head h3 { font-size: 18px; font-weight: 700; }
.d3-cart-close-btn {
  background: rgba(255,255,255,0.08); border: none; color: #fff; cursor: pointer;
  width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center;
  justify-content: center; transition: background 0.2s;
}
.d3-cart-close-btn:hover { background: rgba(255,255,255,0.14); }
.d3-cart-items { flex: 1; overflow-y: auto; padding: 16px 24px; }
.d3-cart-item {
  display: flex; gap: 14px; align-items: flex-start; padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.d3-cart-item-img {
  width: 68px; height: 68px; object-fit: contain; background: #111827;
  border-radius: 8px; padding: 6px; flex-shrink: 0;
}
.d3-cart-item-info { flex: 1; min-width: 0; }
.d3-cart-item-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; line-height: 1.3; }
.d3-cart-item-price { font-size: 15px; font-weight: 700; color: #FF6600; margin-bottom: 8px; }
.d3-qty-row { display: flex; align-items: center; gap: 10px; }
.d3-qty-btn {
  width: 28px; height: 28px; border-radius: 6px; background: rgba(255,255,255,0.08);
  border: none; color: #fff; cursor: pointer; font-size: 16px; display: flex;
  align-items: center; justify-content: center; transition: background 0.2s;
}
.d3-qty-btn:hover { background: rgba(255,102,0,0.25); color: #FF6600; }
.d3-qty-val { font-size: 14px; font-weight: 600; min-width: 20px; text-align: center; }
.d3-cart-remove {
  background: none; border: none; color: rgba(255,255,255,0.3); cursor: pointer;
  font-size: 18px; padding: 4px; transition: color 0.2s;
}
.d3-cart-remove:hover { color: #ef4444; }
.d3-cart-foot {
  padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.08);
}
.d3-cart-total-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 16px;
}
.d3-cart-total-label { font-size: 14px; color: rgba(255,255,255,0.55); }
.d3-cart-total-val { font-size: 24px; font-weight: 800; color: #FF6600; }
.d3-cart-empty {
  text-align: center; padding: 60px 24px; color: rgba(255,255,255,0.35); font-size: 15px;
}

/* MOBILE CART - BOTTOM SHEET */
@media (max-width: 768px) {
  .d3-cart-drawer {
    top: auto; left: 0; right: 0; bottom: 0; width: 100%;
    height: 85vh; border-left: none; border-radius: 20px 20px 0 0;
    border-top: 1px solid rgba(255,255,255,0.12);
    transform: translateY(100%);
  }
  .d3-cart-drawer.d3-open { transform: translateY(0); }
}

/* BUTTONS */
.d3-btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  background: #FF6600; color: #fff; border: none; border-radius: 10px;
  padding: 13px 24px; font-size: 15px; font-weight: 700; cursor: pointer;
  transition: all 0.2s; font-family: 'Outfit', sans-serif;
}
.d3-btn-primary:hover { background: #e55a00; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,102,0,0.35); }
.d3-btn-primary:active { transform: translateY(0); }
.d3-btn-secondary {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2);
  border-radius: 10px; padding: 13px 24px; font-size: 15px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;
}
.d3-btn-secondary:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.05); }
.d3-btn-outline-orange {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  background: transparent; color: #FF6600; border: 1px solid rgba(255,102,0,0.5);
  border-radius: 10px; padding: 10px 20px; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;
}
.d3-btn-outline-orange:hover { background: rgba(255,102,0,0.1); border-color: #FF6600; }
.d3-btn-full { width: 100%; }

/* PAGE WRAPPER */
.d3-main { padding-top: 68px; min-height: 100vh; animation: d3-fadeIn 0.4s ease; }
@keyframes d3-fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* HERO */
.d3-hero {
  min-height: 90vh; display: flex; flex-direction: column; justify-content: center;
  position: relative; overflow: hidden; padding: 80px 64px;
  background: radial-gradient(ellipse at 70% 50%, rgba(255,102,0,0.07) 0%, transparent 60%),
              radial-gradient(ellipse at 15% 80%, rgba(255,102,0,0.04) 0%, transparent 50%),
              #111827;
}
.d3-hero-content { position: relative; z-index: 1; max-width: 760px; }
.d3-hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,102,0,0.1); border: 1px solid rgba(255,102,0,0.2);
  color: #FF6600; font-size: 12px; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 6px 14px; border-radius: 100px; margin-bottom: 28px;
}
.d3-hero h1 {
  font-size: clamp(40px,6vw,78px); font-weight: 800; line-height: 1.05;
  letter-spacing: -0.02em; margin-bottom: 24px;
}
.d3-hero h1 span { color: #FF6600; }
.d3-hero-sub {
  font-size: clamp(16px,2vw,19px); color: rgba(255,255,255,0.5); font-weight: 400;
  line-height: 1.7; max-width: 520px; margin-bottom: 44px;
}
.d3-hero-ctas { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.d3-hero-stats {
  display: flex; gap: 48px; margin-top: 72px; flex-wrap: wrap;
  padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08);
}
.d3-hero-stat-val { font-size: 34px; font-weight: 800; color: #FF6600; line-height: 1; margin-bottom: 4px; }
.d3-hero-stat-label { font-size: 13px; color: rgba(255,255,255,0.35); font-weight: 400; }

/* BRAND STRIP */
.d3-brand-strip {
  background: #1a2234; border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06); padding: 22px 0; overflow: hidden;
}
.d3-brand-strip-inner {
  display: flex; align-items: center; gap: 48px; padding: 0 48px;
  overflow-x: auto; scrollbar-width: none;
}
.d3-brand-strip-inner::-webkit-scrollbar { display: none; }
.d3-brand-strip-label {
  font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  color: rgba(255,255,255,0.18); white-space: nowrap;
}
.d3-brand-strip-logo {
  height: 26px; object-fit: contain; filter: brightness(0) invert(1); opacity: 0.3;
  transition: opacity 0.2s; flex-shrink: 0;
}
.d3-brand-strip-logo:hover { opacity: 0.65; }

/* FEATURE CARDS */
.d3-features-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: rgba(255,255,255,0.05);
}
.d3-feature-card {
  background: #111827; padding: 40px 32px; transition: background 0.2s;
}
.d3-feature-card:hover { background: #151f30; }
.d3-feature-icon {
  width: 48px; height: 48px; background: rgba(255,102,0,0.08); border-radius: 12px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
  border: 1px solid rgba(255,102,0,0.18);
}
.d3-feature-img {
  width: 26px; height: 26px; object-fit: contain;
  filter: brightness(0) saturate(100%) invert(42%) sepia(82%) saturate(800%) hue-rotate(3deg) brightness(103%) contrast(103%);
}
.d3-feature-title { font-size: 16px; font-weight: 700; margin-bottom: 8px; }
.d3-feature-desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.65; }

/* SECTION */
.d3-section { padding: 96px 64px; max-width: 1400px; margin: 0 auto; }
.d3-section-header { margin-bottom: 52px; }
.d3-section-tag {
  display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: #FF6600; margin-bottom: 12px;
}
.d3-section-title {
  font-size: clamp(26px,4vw,46px); font-weight: 800; letter-spacing: -0.02em;
  line-height: 1.1; margin-bottom: 12px;
}
.d3-section-sub { font-size: 16px; color: rgba(255,255,255,0.4); font-weight: 400; max-width: 480px; }

/* PRODUCT GRIDS */
.d3-products-grid-home { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.d3-products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

/* PRODUCT CARD */
.d3-product-card {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
  overflow: hidden; transition: all 0.3s;
}
.d3-product-card:hover {
  border-color: rgba(255,102,0,0.28);
  box-shadow: 0 0 0 1px rgba(255,102,0,0.12), 0 20px 60px rgba(255,102,0,0.1), 0 8px 24px rgba(0,0,0,0.25);
  transform: translateY(-4px);
}
.d3-product-img-wrap {
  background: #111827; height: 220px; display: flex; align-items: center;
  justify-content: center; padding: 24px; position: relative;
}
.d3-product-img { width: 100%; height: 100%; object-fit: contain; }
.d3-product-badge {
  position: absolute; top: 12px; left: 12px;
  background: rgba(255,102,0,0.12); border: 1px solid rgba(255,102,0,0.25);
  color: #FF6600; font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; padding: 4px 10px; border-radius: 100px;
}
.d3-product-instock {
  position: absolute; top: 12px; right: 12px;
  background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.22);
  color: #4ade80; font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 100px;
}
.d3-product-body { padding: 24px; }
.d3-product-brand-tag {
  font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: #FF6600; margin-bottom: 6px;
}
.d3-product-name { font-size: 17px; font-weight: 700; line-height: 1.25; margin-bottom: 14px; }
.d3-product-price-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 16px; }
.d3-product-price { font-size: 32px; font-weight: 800; color: #FF6600; line-height: 1; }
.d3-product-price-label { font-size: 13px; color: rgba(255,255,255,0.3); }
.d3-product-features { margin-bottom: 20px; display: flex; flex-direction: column; gap: 5px; }
.d3-product-feat {
  font-size: 13px; color: rgba(255,255,255,0.45); display: flex; align-items: center; gap: 7px;
}
.d3-product-feat::before {
  content: ''; width: 5px; height: 5px; background: rgba(255,102,0,0.55);
  border-radius: 50%; flex-shrink: 0;
}
.d3-product-actions { display: flex; gap: 10px; }
.d3-product-actions .d3-btn-primary { flex: 1; padding: 11px 16px; font-size: 14px; border-radius: 8px; }
.d3-product-actions .d3-btn-outline-orange { padding: 11px 14px; font-size: 13px; border-radius: 8px; white-space: nowrap; }

/* FILTERS */
.d3-filters { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
.d3-filter-select {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.12); color: #fff;
  border-radius: 8px; padding: 10px 36px 10px 14px; font-size: 14px; font-weight: 500;
  font-family: 'Outfit', sans-serif; cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center; transition: border-color 0.2s;
}
.d3-filter-select:focus { outline: none; border-color: #FF6600; box-shadow: 0 0 0 3px rgba(255,102,0,0.15); }
.d3-filter-count { font-size: 14px; color: rgba(255,255,255,0.3); margin-left: auto; }

/* REVIEWS */
.d3-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.d3-review-card {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.07); border-radius: 14px;
  padding: 28px; transition: border-color 0.2s;
}
.d3-review-card:hover { border-color: rgba(255,102,0,0.18); }
.d3-review-stars { color: #FBBF24; font-size: 14px; letter-spacing: 2px; margin-bottom: 12px; }
.d3-review-text {
  font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.55);
  margin-bottom: 18px; font-style: italic;
}
.d3-review-author { font-size: 14px; font-weight: 700; color: #fff; }
.d3-review-period { font-size: 12px; color: rgba(255,255,255,0.28); margin-top: 2px; }
.d3-google-strip {
  display: inline-flex; align-items: center; gap: 12px;
  background: #1F2937; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px;
  padding: 14px 20px; margin-bottom: 40px;
}
.d3-google-score { font-size: 22px; font-weight: 800; color: #fff; }
.d3-google-label { font-size: 13px; color: rgba(255,255,255,0.4); }

/* BRANDS PAGE */
.d3-brands-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.d3-brand-card-full {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
  padding: 48px; transition: all 0.3s; display: flex; align-items: flex-start; gap: 36px;
}
.d3-brand-card-full:hover {
  border-color: rgba(255,102,0,0.22);
  box-shadow: 0 12px 40px rgba(255,102,0,0.06);
}
.d3-brand-logo-wrap {
  width: 120px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  background: #111827; border-radius: 12px; padding: 20px; height: 80px;
}
.d3-brand-logo {
  max-width: 90px; max-height: 44px; object-fit: contain;
  filter: brightness(0) invert(1); opacity: 0.75;
}
.d3-brand-card-name { font-size: 24px; font-weight: 800; margin-bottom: 10px; letter-spacing: -0.01em; }
.d3-brand-card-desc { font-size: 15px; color: rgba(255,255,255,0.45); line-height: 1.7; }
.d3-brand-card-link {
  display: inline-flex; align-items: center; gap: 6px; margin-top: 20px;
  font-size: 14px; font-weight: 600; color: #FF6600; transition: gap 0.2s;
}
.d3-brand-card-link:hover { gap: 10px; }

/* SPEC MODAL */
.d3-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.78); z-index: 500;
  display: flex; align-items: center; justify-content: center; padding: 24px;
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.d3-modal-overlay.d3-open { opacity: 1; pointer-events: all; }
.d3-modal {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
  width: 100%; max-width: 680px; max-height: 90vh; overflow-y: auto;
  transform: scale(0.96); transition: transform 0.25s;
}
.d3-modal-overlay.d3-open .d3-modal { transform: scale(1); }
.d3-modal-head {
  padding: 28px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
  position: sticky; top: 0; background: #1F2937; z-index: 1; border-radius: 20px 20px 0 0;
}
.d3-modal-title { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
.d3-modal-brand { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #FF6600; }
.d3-modal-close {
  background: rgba(255,255,255,0.08); border: none; color: #fff; cursor: pointer;
  width: 36px; height: 36px; border-radius: 8px; font-size: 18px; display: flex;
  align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s;
}
.d3-modal-close:hover { background: rgba(255,255,255,0.14); }
.d3-modal-body { padding: 28px 32px; }
.d3-modal-img {
  width: 100%; max-height: 200px; object-fit: contain; margin-bottom: 28px;
  background: #111827; border-radius: 12px; padding: 20px;
}
.d3-spec-table { width: 100%; border-collapse: collapse; }
.d3-spec-table tr:nth-child(odd) td { background: rgba(255,255,255,0.025); }
.d3-spec-table td {
  padding: 11px 14px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.d3-spec-table td:first-child { color: rgba(255,255,255,0.4); font-weight: 500; width: 50%; }
.d3-spec-table td:last-child { color: #fff; font-weight: 600; }
.d3-modal-foot {
  padding: 24px 32px; border-top: 1px solid rgba(255,255,255,0.08);
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  position: sticky; bottom: 0; background: #1F2937; border-radius: 0 0 20px 20px;
}
.d3-modal-price { font-size: 36px; font-weight: 800; color: #FF6600; }
.d3-modal-price-label { font-size: 13px; color: rgba(255,255,255,0.3); margin-top: 2px; }

/* CONTACT / OVER ONS */
.d3-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.d3-contact-block {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 40px;
}
.d3-contact-block h3 { font-size: 20px; font-weight: 700; margin-bottom: 28px; }
.d3-contact-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
.d3-contact-icon {
  width: 44px; height: 44px; background: rgba(255,102,0,0.08); border: 1px solid rgba(255,102,0,0.18);
  border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.d3-contact-label {
  font-size: 12px; color: rgba(255,255,255,0.3); text-transform: uppercase;
  letter-spacing: 0.08em; margin-bottom: 4px;
}
.d3-contact-val { font-size: 16px; font-weight: 600; color: #fff; }
.d3-contact-val a { color: #fff; transition: color 0.2s; }
.d3-contact-val a:hover { color: #FF6600; }
.d3-hours-row {
  display: flex; justify-content: space-between; padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 14px;
}
.d3-hours-day { color: rgba(255,255,255,0.45); }
.d3-hours-time { font-weight: 600; color: #fff; }
.d3-hours-closed { color: rgba(255,255,255,0.25); }

/* PAGE HEADER */
.d3-page-header {
  background: linear-gradient(180deg, #1a2234 0%, #111827 100%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 72px 64px 56px;
}
.d3-page-header h1 {
  font-size: clamp(32px,5vw,60px); font-weight: 800; letter-spacing: -0.02em;
  margin-bottom: 12px;
}
.d3-page-header h1 span { color: #FF6600; }
.d3-page-header p { font-size: 17px; color: rgba(255,255,255,0.4); max-width: 520px; }

/* CHECKOUT */
.d3-checkout { max-width: 640px; margin: 0 auto; }
.d3-steps { display: flex; align-items: center; gap: 0; margin-bottom: 48px; }
.d3-step {
  flex: 1; display: flex; align-items: center; gap: 12px;
  font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.25);
}
.d3-step.d3-step-active { color: #FF6600; }
.d3-step.d3-step-done { color: rgba(255,255,255,0.5); }
.d3-step-num {
  width: 32px; height: 32px; border-radius: 50%; border: 2px solid currentColor;
  display: flex; align-items: center; justify-content: center; font-size: 13px;
  font-weight: 800; flex-shrink: 0;
}
.d3-step-active .d3-step-num { background: #FF6600; border-color: #FF6600; color: #fff; }
.d3-step-done .d3-step-num { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
.d3-step-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); margin: 0 8px; }
.d3-form-section {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px;
  padding: 32px; margin-bottom: 20px;
}
.d3-form-section h3 { font-size: 18px; font-weight: 700; margin-bottom: 24px; }
.d3-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.d3-form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.d3-form-label { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.55); }
.d3-form-input, .d3-form-select, .d3-form-textarea {
  background: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
  color: #fff; font-family: 'Outfit', sans-serif; font-size: 15px; padding: 12px 16px;
  transition: border-color 0.2s, box-shadow 0.2s; width: 100%;
}
.d3-form-input:focus, .d3-form-select:focus, .d3-form-textarea:focus {
  outline: none; border-color: #FF6600; box-shadow: 0 0 0 3px rgba(255,102,0,0.15);
}
.d3-form-input::placeholder { color: rgba(255,255,255,0.18); }
.d3-form-select { appearance: none; cursor: pointer; }
.d3-form-textarea { resize: vertical; min-height: 80px; }
.d3-confirm-block {
  background: #111827; border-radius: 10px; padding: 18px 20px; margin-bottom: 12px;
}
.d3-confirm-label {
  font-size: 11px; color: rgba(255,255,255,0.3); text-transform: uppercase;
  letter-spacing: 0.08em; margin-bottom: 6px;
}
.d3-confirm-val { font-size: 16px; font-weight: 600; color: #fff; text-transform: capitalize; }
.d3-order-item-row {
  display: flex; align-items: center; gap: 14px; padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.d3-order-item-img {
  width: 56px; height: 56px; object-fit: contain; background: #111827;
  border-radius: 8px; padding: 6px; flex-shrink: 0;
}
.d3-order-item-name { flex: 1; font-size: 14px; font-weight: 600; }
.d3-order-item-qty { font-size: 13px; color: rgba(255,255,255,0.35); white-space: nowrap; }
.d3-order-item-price { font-size: 15px; font-weight: 700; color: #FF6600; white-space: nowrap; }
.d3-checkout-total {
  display: flex; justify-content: space-between; padding: 16px 0;
  font-size: 18px; font-weight: 800;
  border-top: 1px solid rgba(255,255,255,0.08); margin-top: 8px;
}
.d3-checkout-total span:last-child { color: #FF6600; }
.d3-notice {
  background: rgba(255,102,0,0.07); border: 1px solid rgba(255,102,0,0.18);
  border-radius: 10px; padding: 16px 20px; font-size: 14px;
  color: rgba(255,255,255,0.6); line-height: 1.65; margin-bottom: 24px;
}
.d3-notice strong { color: #FF6600; }

/* BEVESTIGING */
.d3-confirm-page { text-align: center; max-width: 540px; margin: 0 auto; padding: 96px 24px; }
.d3-confirm-icon {
  width: 80px; height: 80px; background: rgba(34,197,94,0.1); border: 2px solid rgba(34,197,94,0.28);
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 28px; font-size: 32px; color: #4ade80;
}
.d3-confirm-page h1 { font-size: 36px; font-weight: 800; margin-bottom: 16px; }
.d3-confirm-page > p { font-size: 16px; color: rgba(255,255,255,0.45); line-height: 1.7; margin-bottom: 32px; }

/* FAQ */
.d3-faq-list { display: flex; flex-direction: column; gap: 4px; }
.d3-faq-item {
  background: #1F2937; border: 1px solid rgba(255,255,255,0.07); border-radius: 10px;
  overflow: hidden; transition: border-color 0.2s;
}
.d3-faq-item.d3-open { border-color: rgba(255,102,0,0.2); }
.d3-faq-q {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 20px 24px; font-size: 16px; font-weight: 600; cursor: pointer;
  background: none; border: none; text-align: left; color: #fff; transition: color 0.2s;
}
.d3-faq-q:hover { color: #FF6600; }
.d3-faq-chevron { color: rgba(255,255,255,0.3); transition: transform 0.25s; flex-shrink: 0; }
.d3-faq-item.d3-open .d3-faq-chevron { transform: rotate(180deg); color: #FF6600; }
.d3-faq-a {
  padding: 0 24px 20px; font-size: 15px; line-height: 1.7;
  color: rgba(255,255,255,0.45); display: none;
}
.d3-faq-item.d3-open .d3-faq-a { display: block; }

/* CTA SECTION */
.d3-cta-section {
  background: linear-gradient(135deg, #1a1500 0%, #221200 50%, #111827 100%);
  border-top: 1px solid rgba(255,102,0,0.12); border-bottom: 1px solid rgba(255,102,0,0.08);
  padding: 96px 64px; text-align: center;
}
.d3-cta-section h2 {
  font-size: clamp(28px,4vw,52px); font-weight: 800;
  letter-spacing: -0.02em; margin-bottom: 16px;
}
.d3-cta-section h2 span { color: #FF6600; }
.d3-cta-section p { font-size: 17px; color: rgba(255,255,255,0.4); margin-bottom: 40px; }
.d3-cta-btns { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

/* FOOTER */
.d3-footer {
  background: #0D131E; border-top: 1px solid rgba(255,255,255,0.06); padding: 64px;
}
.d3-footer-grid {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
  padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 32px;
}
.d3-footer-logo { height: 30px; object-fit: contain; filter: brightness(0) invert(1); margin-bottom: 16px; }
.d3-footer-tagline { font-size: 14px; color: rgba(255,255,255,0.3); line-height: 1.7; margin-bottom: 20px; }
.d3-footer-col h4 {
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,0.22); margin-bottom: 16px;
}
.d3-footer-col a, .d3-footer-col span {
  display: block; font-size: 14px; color: rgba(255,255,255,0.4); margin-bottom: 10px; transition: color 0.2s;
}
.d3-footer-col a:hover { color: #FF6600; }
.d3-footer-bottom {
  max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between;
  align-items: center; font-size: 13px; color: rgba(255,255,255,0.22); flex-wrap: wrap; gap: 8px;
}

/* BACK LINK */
.d3-back-link {
  position: fixed; bottom: 24px; right: 24px; z-index: 9990;
  background: #1F2937; border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 600;
  padding: 10px 16px; border-radius: 8px; display: flex; align-items: center; gap: 6px;
  transition: all 0.2s; font-family: 'Outfit', sans-serif; cursor: pointer;
}
.d3-back-link:hover { color: #FF6600; border-color: rgba(255,102,0,0.3); background: rgba(255,102,0,0.05); }

/* RESPONSIVE */
@media (max-width: 1100px) {
  .d3-products-grid-home { grid-template-columns: repeat(2, 1fr); }
  .d3-products-grid { grid-template-columns: repeat(2, 1fr); }
  .d3-features-grid { grid-template-columns: repeat(2, 1fr); }
  .d3-reviews-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .d3-section { padding: 64px 24px; }
  .d3-page-header { padding: 72px 24px 48px; }
  .d3-hero { padding: 60px 24px; min-height: 80vh; }
  .d3-brands-grid { grid-template-columns: 1fr; }
  .d3-info-grid { grid-template-columns: 1fr; }
  .d3-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
  .d3-footer { padding: 48px 24px; }
  .d3-cta-section { padding: 72px 24px; }
  .d3-nav-links { display: none; }
  .d3-mobile-btn { display: flex; }
  .d3-form-row { grid-template-columns: 1fr; }
  .d3-brand-card-full { flex-direction: column; gap: 24px; padding: 32px; }
  .d3-brand-logo-wrap { width: 80px; height: 60px; }
  .d3-header-right a.d3-btn-primary { display: none; }
}
@media (max-width: 600px) {
  .d3-products-grid-home { grid-template-columns: 1fr; }
  .d3-products-grid { grid-template-columns: 1fr; }
  .d3-features-grid { grid-template-columns: 1fr; }
  .d3-reviews-grid { grid-template-columns: 1fr; }
  .d3-footer-grid { grid-template-columns: 1fr; }
  .d3-hero-stats { gap: 28px; }
  .d3-modal-overlay { padding: 0; align-items: flex-end; }
  .d3-modal { border-radius: 20px 20px 0 0; max-height: 92vh; }
}
@keyframes d3-scanLine { from { transform: translateX(-110%); } to { transform: translateX(110%); } }
.d3-feature-card { position: relative; overflow: hidden; }
.d3-feature-card::after { content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,102,0,0.6), transparent); animation: d3-scanLine 3s ease-in-out infinite; }
.d3-feature-card:nth-child(2)::after { animation-delay: 0.75s; }
.d3-feature-card:nth-child(3)::after { animation-delay: 1.5s; }
.d3-feature-card:nth-child(4)::after { animation-delay: 2.25s; }
.d3-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.32,0.72,0,1), transform 0.7s cubic-bezier(0.32,0.72,0,1); }
.d3-reveal.visible { opacity: 1; transform: none; }
.d3-grid-reveal > * { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.32,0.72,0,1), transform 0.7s cubic-bezier(0.32,0.72,0,1); }
.d3-grid-reveal.visible > *:nth-child(1) { opacity: 1; transform: none; }
.d3-grid-reveal.visible > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 70ms; }
.d3-grid-reveal.visible > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 140ms; }
.d3-grid-reveal.visible > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 210ms; }
.d3-grid-reveal.visible > *:nth-child(5) { opacity: 1; transform: none; transition-delay: 280ms; }
.d3-grid-reveal.visible > *:nth-child(6) { opacity: 1; transform: none; transition-delay: 350ms; }
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

const SPEC_LABELS = {
  koelcapaciteit: 'Koelcapaciteit',
  verwarmingscapaciteit: 'Verwarmingscapaciteit',
  energielabelKoeling: 'Energielabel koeling',
  energielabelVerwarming: 'Energielabel verwarming',
  seer: 'SEER',
  scop: 'SCOP',
  geluidBinnen: 'Geluid (binnen)',
  geluidBuiten: 'Geluid (buiten)',
  koudemiddel: 'Koudemiddel',
  afmetingenBinnen: 'Afmetingen binnenunit',
  gewichtBinnen: 'Gewicht binnenunit',
  wifi: 'WiFi',
  geschiktVoor: 'Geschikt voor',
  verbruikNominaal: 'Verbruik nominaal',
  aantalBinnenunits: 'Aantal binnenunits',
}

// ─── PRODUCT SPEC MODAL ────────────────────────────────────────────────────────
function ProductSpecModal({ product, onClose, onAdd }) {
  const brand = BRANDS.find(b => b.id === product.brandId)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="d3-modal-overlay d3-open" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="d3-modal">
        <div className="d3-modal-head">
          <div>
            <div className="d3-modal-brand">{brand?.name}</div>
            <div className="d3-modal-title">{product.name}</div>
          </div>
          <button className="d3-modal-close" onClick={onClose} aria-label="Sluiten">✕</button>
        </div>
        <div className="d3-modal-body">
          <img
            src={product.image}
            alt={product.name}
            className="d3-modal-img"
            onError={e => { e.target.style.display = 'none' }}
          />
          <table className="d3-spec-table">
            <tbody>
              {Object.entries(product.specs).map(([key, val]) => (
                <tr key={key}>
                  <td>{SPEC_LABELS[key] || key}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d3-modal-foot">
          <div>
            <div className="d3-modal-price">€{product.priceFrom.toLocaleString('nl-NL')}</div>
            <div className="d3-modal-price-label">{product.btw}</div>
          </div>
          <button
            className="d3-btn-primary"
            onClick={() => { onAdd(product); onClose() }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Toevoegen
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── CART DRAWER ───────────────────────────────────────────────────────────────
function CartDrawer({ cart, open, onClose, onQtyChange, onRemove }) {
  const navigate = useNavigate()
  const total = cart.reduce((s, i) => s + i.priceFrom * i.qty, 0)
  const totalQty = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <div className={`d3-cart-overlay ${open ? 'd3-open' : ''}`} onClick={onClose} />
      <div className={`d3-cart-drawer ${open ? 'd3-open' : ''}`}>
        <div className="d3-cart-head">
          <h3>Bestelling ({totalQty})</h3>
          <button className="d3-cart-close-btn" onClick={onClose} aria-label="Sluiten">✕</button>
        </div>

        <div className="d3-cart-items">
          {cart.length === 0 ? (
            <div className="d3-cart-empty">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ display: 'block', margin: '0 auto 16px', opacity: 0.3 }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Nog niets geselecteerd
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="d3-cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="d3-cart-item-img"
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className="d3-cart-item-info">
                  <div className="d3-cart-item-name">{item.name}</div>
                  <div className="d3-cart-item-price">€{(item.priceFrom * item.qty).toLocaleString('nl-NL')}</div>
                  <div className="d3-qty-row">
                    <button className="d3-qty-btn" onClick={() => onQtyChange(item.id, item.qty - 1)}>−</button>
                    <span className="d3-qty-val">{item.qty}</span>
                    <button className="d3-qty-btn" onClick={() => onQtyChange(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <button className="d3-cart-remove" onClick={() => onRemove(item.id)} aria-label="Verwijderen">✕</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="d3-cart-foot">
            <div className="d3-cart-total-row">
              <span className="d3-cart-total-label">Totaal incl. BTW</span>
              <span className="d3-cart-total-val">€{total.toLocaleString('nl-NL')}</span>
            </div>
            <button
              className="d3-btn-primary d3-btn-full"
              onClick={() => { onClose(); navigate(`${BASE}/bestellen`) }}
            >
              Bestelling plaatsen →
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// ─── HEADER ────────────────────────────────────────────────────────────────────
function D3Header({ cartCount, onCartOpen }) {
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
      <header className="d3-header">
        <Link to={`${BASE}/`}>
          <div className="d3-logo-wrap">
            <img src="/logoairco.png" alt="AircoStunt" className="d3-logo-img" />
          </div>
        </Link>
        <nav className="d3-nav-links">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === `${BASE}/`}
              className={({ isActive }) => isActive ? 'd3-active' : undefined}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="d3-header-right">
          <a
            href="/"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.2s', whiteSpace: 'nowrap', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Alle ontwerpen
          </a>
          <button className="d3-cart-btn" onClick={onCartOpen}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            Bestelling
            {cartCount > 0 && <span className="d3-cart-badge">{cartCount}</span>}
          </button>
          <a
            href="tel:0614700753"
            className="d3-btn-primary"
            style={{ padding: '9px 18px', fontSize: 14, borderRadius: 8 }}
          >
            Bel ons
          </a>
          <button
            className="d3-mobile-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </header>

      <div className={`d3-mobile-menu ${menuOpen ? 'd3-open' : ''}`}>
        {links.map(l => (
          <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
        <button
          className="d3-cart-btn"
          onClick={() => { setMenuOpen(false); onCartOpen() }}
          style={{ width: '100%', margin: '8px 0', justifyContent: 'center' }}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Bestelling {cartCount > 0 && `(${cartCount})`}
        </button>
        <a
          href="tel:0614700753"
          style={{ display: 'block', padding: '13px 16px', fontWeight: 700, color: '#FF6600' }}
        >
          Bel: 06-147 00 753
        </a>
      </div>
    </>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function D3Footer() {
  const links = [
    { label: 'Home', to: `${BASE}/` },
    { label: 'Merken', to: `${BASE}/merken` },
    { label: 'Producten', to: `${BASE}/producten` },
    { label: 'Over ons', to: `${BASE}/over-ons` },
    { label: 'Contact', to: `${BASE}/contact` },
  ]

  return (
    <footer className="d3-footer">
      <div className="d3-footer-grid">
        <div>
          <img src="/logoairco.png" alt="AircoStunt" className="d3-footer-logo" />
          <p className="d3-footer-tagline">
            Split-unit airconditioners van A-merken voor de laagste prijs.
            Alleen afhalen in Dordrecht. Geen verzending.
          </p>
          {['Daikin, Mitsubishi, Samsung & LG', '2 jaar fabrieksgarantie', 'Gratis advies bij afhalen'].map(u => (
            <div key={u} style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', marginBottom: 6 }}>
              <span style={{ color: '#FF6600', marginRight: 8 }}>✓</span>{u}
            </div>
          ))}
        </div>
        <div className="d3-footer-col">
          <h4>Navigatie</h4>
          {links.map(l => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </div>
        <div className="d3-footer-col">
          <h4>Merken</h4>
          {BRANDS.map(b => <span key={b.id}>{b.name}</span>)}
        </div>
        <div className="d3-footer-col">
          <h4>Contact</h4>
          <a href="tel:0614700753">06-147 00 753</a>
          <a href="mailto:info@aircostunt.com">info@aircostunt.com</a>
          <span>Veerplaat 10, Dordrecht</span>
          <span>Ma–vr: 09:00–20:00</span>
          <span>Za: 09:00–13:00</span>
          <span>Zo: Gesloten</span>
        </div>
      </div>
      <div className="d3-footer-bottom">
        <span>© {new Date().getFullYear()} AircoStunt. Alle rechten voorbehouden.</span>
        <span>Alleen afhalen · Geen verzending</span>
      </div>
    </footer>
  )
}

// ─── STARS ─────────────────────────────────────────────────────────────────────
function Stars({ n }) {
  return (
    <div className="d3-review-stars">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </div>
  )
}

// ─── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product, onAdd, onSpec }) {
  const brand = BRANDS.find(b => b.id === product.brandId)
  return (
    <div className="d3-product-card">
      <div className="d3-product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="d3-product-img"
          onError={e => { e.target.style.display = 'none' }}
        />
        {product.isMultiSplit && <span className="d3-product-badge">Multi-split</span>}
        {product.inStock && <span className="d3-product-instock">Op voorraad</span>}
      </div>
      <div className="d3-product-body">
        <div className="d3-product-brand-tag">{brand?.name}</div>
        <div className="d3-product-name">{product.name}</div>
        <div className="d3-product-price-row">
          <span className="d3-product-price">€{product.priceFrom.toLocaleString('nl-NL')}</span>
          <span className="d3-product-price-label">{product.btw}</span>
        </div>
        <div className="d3-product-features">
          {product.features.slice(0, 4).map(f => (
            <div key={f} className="d3-product-feat">{f}</div>
          ))}
        </div>
        <div className="d3-product-actions">
          <button className="d3-btn-primary" onClick={() => onAdd(product)}>
            Toevoegen
          </button>
          <button className="d3-btn-outline-orange" onClick={() => onSpec(product)}>
            Specificaties
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── FAQ LIST ──────────────────────────────────────────────────────────────────
function FaqList() {
  const [open, setOpen] = useState(null)
  return (
    <div className="d3-faq-list">
      {FAQ.map((item, i) => (
        <div key={i} className={`d3-faq-item ${open === i ? 'd3-open' : ''}`}>
          <button className="d3-faq-q" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <svg className="d3-faq-chevron" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div className="d3-faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  )
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ addToCart, onSpec }) {
  const featured = PRODUCTS.slice(0, 4)
  const [featRef, featVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()
  const [revRef, revVisible] = useReveal()

  return (
    <div className="d3-main">
      {/* HERO */}
      <section className="d3-hero">
        <div className="d3-hero-content">
          <div className="d3-hero-label">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF6600', display: 'inline-block' }} />
            Alleen Afhalen &middot; Geen Verzending
          </div>
          <h1>
            Airco's van <span>A-merken</span><br />
            voor de laagste prijs
          </h1>
          <p className="d3-hero-sub">
            Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG.
            Afhalen uit onze showroom in Dordrecht. Geen wachttijden, geen gedoe.
          </p>
          <div className="d3-hero-ctas">
            <Link
              to={`${BASE}/producten`}
              className="d3-btn-primary"
              style={{ fontSize: 16, padding: '15px 30px' }}
            >
              Bekijk producten →
            </Link>
            <Link
              to={`${BASE}/over-ons`}
              className="d3-btn-secondary"
              style={{ fontSize: 16, padding: '15px 30px' }}
            >
              Over ons
            </Link>
          </div>
          <div className="d3-hero-stats">
            {[
              ['15+', 'Jaar ervaring'],
              ['5.0★', 'Google reviews'],
              ['€479', 'Vanaf prijs'],
              ['Zelfde dag', 'Afhalen mogelijk'],
            ].map(([val, label]) => (
              <div key={label}>
                <div className="d3-hero-stat-val">{val}</div>
                <div className="d3-hero-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STRIP */}
      <div className="d3-brand-strip">
        <div className="d3-brand-strip-inner">
          <span className="d3-brand-strip-label">Onze merken</span>
          {Object.entries(BRAND_LOGOS).map(([key, src]) => (
            <img key={key} src={src} alt={key} className="d3-brand-strip-logo" />
          ))}
        </div>
      </div>

      {/* FEATURE CARDS */}
      <div ref={featRef} className={`d3-features-grid d3-grid-reveal${featVisible ? ' visible' : ''}`}>
        <div className="d3-feature-card">
          <div className="d3-feature-icon">
            <img
              src="/wifi.png"
              alt="WiFi inbegrepen"
              className="d3-feature-img"
              onError={e => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = `<svg width="24" height="24" fill="none" stroke="#FF6600" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>`
              }}
            />
          </div>
          <div className="d3-feature-title">Gratis WiFi inbegrepen</div>
          <div className="d3-feature-desc">Alle airco's worden geleverd met ingebouwde wifi. Bedien uw airco eenvoudig via de app van het merk.</div>
        </div>

        <div className="d3-feature-card">
          <div className="d3-feature-icon">
            <svg width="24" height="24" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="d3-feature-title">2 Jaar garantie</div>
          <div className="d3-feature-desc">Alle producten inclusief 2 jaar fabrieksgarantie. Daikin biedt tot 5 jaar bij productregistratie.</div>
        </div>

        <div className="d3-feature-card">
          <div className="d3-feature-icon">
            <svg width="24" height="24" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="d3-feature-title">Zelfde dag afhalen</div>
          <div className="d3-feature-desc">Bestel 's ochtends en haal dezelfde dag op. Bel 30 minuten van tevoren. Open tot 20:00 op weekdagen.</div>
        </div>

        <div className="d3-feature-card">
          <div className="d3-feature-icon">
            <svg width="24" height="24" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div className="d3-feature-title">Laagste prijs</div>
          <div className="d3-feature-desc">Directe inkoop bij fabrikanten en importeurs. Geen tussenhandel, minimale overhead. Altijd scherp geprijsd.</div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="d3-section">
        <div className="d3-section-header">
          <div className="d3-section-tag">Populaire modellen</div>
          <h2 className="d3-section-title">Bestsellers</h2>
          <p className="d3-section-sub">De meest verkochte split-units, altijd op voorraad in onze showroom.</p>
        </div>
        <div ref={gridRef} className={`d3-products-grid-home d3-grid-reveal${gridVisible ? ' visible' : ''}`}>
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} onSpec={onSpec} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Link
            to={`${BASE}/producten`}
            className="d3-btn-secondary"
            style={{ padding: '14px 32px', fontSize: 15, display: 'inline-flex' }}
          >
            Alle producten bekijken →
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background: '#0D131E', padding: '96px 0' }}>
        <div className="d3-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="d3-section-header">
            <div className="d3-section-tag">Wat klanten zeggen</div>
            <h2 className="d3-section-title">Beoordelingen</h2>
            <div className="d3-google-strip">
              <svg width="22" height="22" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,19.001,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              <div>
                <div className="d3-google-score">5.0 / 5.0</div>
                <div className="d3-google-label">Google Reviews · 9+ beoordelingen</div>
              </div>
            </div>
          </div>
          <div ref={revRef} className={`d3-reviews-grid d3-grid-reveal${revVisible ? ' visible' : ''}`}>
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} className="d3-review-card">
                <Stars n={r.stars} />
                <p className="d3-review-text">"{r.text}"</p>
                <div className="d3-review-author">{r.name}</div>
                <div className="d3-review-period">{r.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="d3-cta-section">
        <h2>Klaar om te <span>bestellen?</span></h2>
        <p>Kies uw airco, plaats een bestelling en haal op in Dordrecht.</p>
        <div className="d3-cta-btns">
          <Link
            to={`${BASE}/producten`}
            className="d3-btn-primary"
            style={{ fontSize: 16, padding: '15px 32px' }}
          >
            Bekijk alle airco's →
          </Link>
          <a
            href="tel:0614700753"
            className="d3-btn-secondary"
            style={{ fontSize: 16, padding: '15px 32px' }}
          >
            06-147 00 753
          </a>
        </div>
      </section>

      <D3Footer />
    </div>
  )
}

// ─── MERKEN PAGE ───────────────────────────────────────────────────────────────
function MerkenPage() {
  return (
    <div className="d3-main">
      <div className="d3-page-header">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="d3-section-tag">A-merken</div>
          <h1>Onze <span>merken</span></h1>
          <p>Wij verkopen uitsluitend airconditioners van de meest betrouwbare merken ter wereld.</p>
        </div>
      </div>

      <section className="d3-section">
        <div className="d3-brands-grid">
          {BRANDS.map(brand => (
            <div key={brand.id} className="d3-brand-card-full">
              <div className="d3-brand-logo-wrap">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="d3-brand-logo"
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
              <div>
                <div className="d3-brand-card-name">{brand.name}</div>
                <p className="d3-brand-card-desc">{brand.description}</p>
                <Link to={`${BASE}/producten`} className="d3-brand-card-link">
                  Bekijk {brand.name} modellen
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <D3Footer />
    </div>
  )
}

// ─── PRODUCTEN PAGE ────────────────────────────────────────────────────────────
function ProductenPage({ addToCart, onSpec }) {
  const [brandFilter, setBrandFilter] = useState('all')

  const filtered = brandFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.brandId === brandFilter)

  return (
    <div className="d3-main">
      <div className="d3-page-header">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="d3-section-tag">Bestel & Haal Op</div>
          <h1>Alle <span>airco's</span></h1>
          <p>Split-unit airconditioners voor elke ruimte en elk budget. Altijd op voorraad.</p>
        </div>
      </div>

      <section className="d3-section">
        {/* FILTERS */}
        <div className="d3-filters">
          <select
            className="d3-filter-select"
            value={brandFilter}
            onChange={e => setBrandFilter(e.target.value)}
          >
            <option value="all">Alle merken</option>
            {BRANDS.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
          <span className="d3-filter-count">{filtered.length} product{filtered.length !== 1 ? 'en' : ''}</span>
        </div>

        <div className="d3-products-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} onSpec={onSpec} />
          ))}
        </div>

        {/* ACCESSORIES */}
        <div style={{ marginTop: 80 }}>
          <div className="d3-section-header">
            <div className="d3-section-tag">Aanvullend</div>
            <h2 className="d3-section-title">Accessoires</h2>
            <p className="d3-section-sub">Alles wat u nodig heeft voor de installatie van uw airco.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {ACCESSORIES.map(acc => (
              <div
                key={acc.id}
                style={{
                  background: '#1F2937',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                  padding: 24,
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{acc.name}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, marginBottom: 16 }}>
                  {acc.description}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#FF6600' }}>€{acc.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 80 }}>
          <div className="d3-section-header">
            <div className="d3-section-tag">Veelgestelde vragen</div>
            <h2 className="d3-section-title">FAQ</h2>
          </div>
          <FaqList />
        </div>
      </section>

      <D3Footer />
    </div>
  )
}

// ─── OVER ONS PAGE ─────────────────────────────────────────────────────────────
function OverOnsPage() {
  return (
    <div className="d3-main">
      <div className="d3-page-header">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="d3-section-tag">Ons verhaal</div>
          <h1>Over <span>AircoStunt</span></h1>
          <p>Al meer dan 15 jaar dé specialist in betaalbare split-unit airconditioners in Nederland.</p>
        </div>
      </div>

      <section className="d3-section">
        <div className="d3-info-grid">
          <div>
            <div style={{
              background: '#1F2937', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 40, marginBottom: 20,
            }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Wie zijn wij?</h3>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
                AircoStunt is gespecialiseerd in de verkoop van split-unit airconditioners van topmerken als Daikin, Mitsubishi, Samsung en LG. Wij verkopen uitsluitend via ons afhaalmodel: u bestelt online of telefonisch en haalt uw airco op in onze showroom in Dordrecht.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 16 }}>
                Door rechtstreeks in te kopen bij fabrikanten en importeurs en door onze efficiënte bedrijfsopzet kunnen wij de laagste prijzen in Nederland aanbieden.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
                Bij afhalen geven wij altijd gratis advies over installatie, gebruik en onderhoud van uw nieuwe airco.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['15+', 'Jaar in de branche'],
                ['500+', 'Verkochte units per jaar'],
                ['5.0★', 'Gemiddelde Google score'],
                ['€0', 'Verborgen kosten'],
              ].map(([val, label]) => (
                <div
                  key={label}
                  style={{
                    background: '#1F2937', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: 24, textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#FF6600', marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              background: '#1F2937', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 40, marginBottom: 20,
            }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Hoe het werkt</h3>
              {[
                ['1', 'Kies uw airco', 'Bekijk ons assortiment online of bel ons voor persoonlijk advies op maat.'],
                ['2', 'Plaats bestelling', 'Vul het bestelformulier in met uw gegevens en gewenst afhaalmoment.'],
                ['3', 'Bevestiging', 'U ontvangt een bevestiging met afhaalinstructies en contactgegevens.'],
                ['4', 'Afhalen & betalen', 'Haal uw airco op in Dordrecht. Betaal per pin of contant.'],
              ].map(([num, title, desc]) => (
                <div
                  key={num}
                  style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'rgba(255,102,0,0.08)', border: '1px solid rgba(255,102,0,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800, color: '#FF6600', flexShrink: 0,
                  }}>{num}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{title}</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#1F2937', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 32,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Waarom AircoStunt?</h3>
              {[
                'Directe inkoop, geen tussenhandel',
                'Gratis advies bij afhalen',
                'Alle A-merken altijd op voorraad',
                '2 jaar fabrieksgarantie',
                'Contant en pin betalen',
                'Open tot 20:00 op weekdagen',
              ].map(u => (
                <div key={u} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#FF6600', fontSize: 16, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ marginTop: 80 }}>
          <div className="d3-section-header">
            <div className="d3-section-tag">Klantervaringen</div>
            <h2 className="d3-section-title">Wat zeggen onze klanten?</h2>
          </div>
          <div className="d3-reviews-grid">
            {REVIEWS.slice(0, 6).map((r, i) => (
              <div key={i} className="d3-review-card">
                <Stars n={r.stars} />
                <p className="d3-review-text">"{r.text}"</p>
                <div className="d3-review-author">{r.name}</div>
                <div className="d3-review-period">{r.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <D3Footer />
    </div>
  )
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────
function ContactPage() {

  return (
    <div className="d3-main">
      <div className="d3-page-header">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="d3-section-tag">Neem contact op</div>
          <h1>Contact <span>&</span> locatie</h1>
          <p>Heeft u vragen? Bel ons of stuur een bericht. Wij helpen u graag.</p>
        </div>
      </div>

      <section className="d3-section">
        <div className="d3-info-grid">
          <div>
            <div className="d3-contact-block" style={{ marginBottom: 20 }}>
              <h3>Contactgegevens</h3>
              {[
                {
                  label: 'Telefoon',
                  val: <a href="tel:0614700753">06-147 00 753</a>,
                  icon: (
                    <svg width="20" height="20" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013 10.81a19.79 19.79 0 01-3.07-8.67A2 2 0 011.95 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  ),
                },
                {
                  label: 'E-mail',
                  val: <a href="mailto:info@aircostunt.com">info@aircostunt.com</a>,
                  icon: (
                    <svg width="20" height="20" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                },
                {
                  label: 'Adres',
                  val: <span>Veerplaat 10, Dordrecht</span>,
                  icon: (
                    <svg width="20" height="20" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                },
              ].map(({ label, val, icon }) => (
                <div key={label} className="d3-contact-item">
                  <div className="d3-contact-icon">{icon}</div>
                  <div>
                    <div className="d3-contact-label">{label}</div>
                    <div className="d3-contact-val">{val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d3-contact-block">
              <h3>Openingstijden</h3>
              {[
                ['Maandag – Vrijdag', '09:00 – 20:00'],
                ['Zaterdag', '09:00 – 13:00'],
                ['Zondag', null],
              ].map(([day, time]) => (
                <div key={day} className="d3-hours-row">
                  <span className="d3-hours-day">{day}</span>
                  {time
                    ? <span className="d3-hours-time">{time}</span>
                    : <span className="d3-hours-closed">Gesloten</span>
                  }
                </div>
              ))}
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', marginTop: 16, lineHeight: 1.65 }}>
                Bel altijd 30 minuten van tevoren als u langs wilt komen.
              </p>
            </div>
          </div>

          <div>
            <div className="d3-contact-block" style={{ marginBottom: 20 }}>
              <div style={{ borderRadius: 12, overflow: 'hidden' }}>
                <iframe
                  title="AircoStunt locatie"
                  src="https://maps.google.com/maps?q=Veerplaat+10,+3313+LJ+Dordrecht&output=embed"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}
                className="d3-btn-primary"
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.75a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Bel nu
              </a>
              <a
                href={`mailto:${SITE.email}`}
                style={{ flex: 1, textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 8, border: '1px solid rgba(255,102,0,0.4)', color: '#FF6600', fontWeight: 600, fontSize: 14, textDecoration: 'none', transition: 'all 0.2s' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Stuur e-mail
              </a>
            </div>
          </div>
        </div>
      </section>

      <D3Footer />
    </div>
  )
}

// ─── CHECKOUT PAGE ─────────────────────────────────────────────────────────────
function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    naam: '', email: '', telefoon: '', afhaalmoment: '', opmerking: '',
  })

  const total = cart.reduce((s, i) => s + i.priceFrom * i.qty, 0)
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleStep1 = e => {
    e.preventDefault()
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleConfirm = e => {
    e.preventDefault()
    clearCart()
    navigate(`${BASE}/bevestiging`)
  }

  if (cart.length === 0) {
    return (
      <div className="d3-main">
        <section className="d3-section">
          <div className="d3-checkout">
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{ fontSize: 56, marginBottom: 20 }}>🛒</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>
                Geen producten geselecteerd
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontSize: 16 }}>
                Voeg eerst een airco toe aan uw bestelling.
              </p>
              <Link
                to={`${BASE}/producten`}
                className="d3-btn-primary"
                style={{ display: 'inline-flex' }}
              >
                Bekijk producten →
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="d3-main">
      <div className="d3-page-header">
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="d3-section-tag">Bestel & Haal Op</div>
          <h1>Uw <span>bestelling</span></h1>
          <p>Vul uw gegevens in en haal uw airco op in Dordrecht.</p>
        </div>
      </div>

      <section className="d3-section">
        <div className="d3-checkout">
          {/* STEPS */}
          <div className="d3-steps">
            <div className={`d3-step ${step === 1 ? 'd3-step-active' : 'd3-step-done'}`}>
              <div className="d3-step-num">{step > 1 ? '✓' : '1'}</div>
              <span>Uw gegevens</span>
            </div>
            <div className="d3-step-line" />
            <div className={`d3-step ${step === 2 ? 'd3-step-active' : ''}`}>
              <div className="d3-step-num">2</div>
              <span>Bevestigen</span>
            </div>
          </div>

          {/* NOTICE */}
          <div className="d3-notice">
            <strong>Alleen afhalen.</strong> Wij verzenden niet. U haalt uw bestelling op bij onze showroom op{' '}
            <strong>Veerplaat 10, Dordrecht</strong>. Bel 30 minuten van tevoren op{' '}
            <a href="tel:0614700753" style={{ color: '#FF6600' }}>06-147 00 753</a>.
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleStep1}>
              <div className="d3-form-section">
                <h3>Persoonlijke gegevens</h3>
                <div className="d3-form-row">
                  <div className="d3-form-group">
                    <label className="d3-form-label">Volledige naam *</label>
                    <input
                      type="text"
                      name="naam"
                      required
                      className="d3-form-input"
                      placeholder="Jan de Vries"
                      value={form.naam}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d3-form-group">
                    <label className="d3-form-label">Telefoonnummer *</label>
                    <input
                      type="tel"
                      name="telefoon"
                      required
                      className="d3-form-input"
                      placeholder="06-12345678"
                      value={form.telefoon}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d3-form-group">
                  <label className="d3-form-label">E-mailadres *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="d3-form-input"
                    placeholder="jan@voorbeeld.nl"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="d3-form-section">
                <h3>Afhaalmoment</h3>
                <div className="d3-form-group">
                  <label className="d3-form-label">Gewenst afhaalmoment *</label>
                  <select
                    name="afhaalmoment"
                    required
                    className="d3-form-input d3-form-select"
                    value={form.afhaalmoment}
                    onChange={handleChange}
                  >
                    <option value="">Kies een moment...</option>
                    <option value="vandaag-ochtend">Vandaag ochtend (09:00–12:00)</option>
                    <option value="vandaag-middag">Vandaag middag (12:00–17:00)</option>
                    <option value="vandaag-avond">Vandaag avond (17:00–20:00)</option>
                    <option value="morgen-ochtend">Morgen ochtend (09:00–12:00)</option>
                    <option value="morgen-middag">Morgen middag (12:00–17:00)</option>
                    <option value="morgen-avond">Morgen avond (17:00–20:00)</option>
                    <option value="in-overleg">In overleg (wij bellen u)</option>
                  </select>
                </div>
                <div className="d3-form-group">
                  <label className="d3-form-label">Opmerkingen (optioneel)</label>
                  <textarea
                    name="opmerking"
                    className="d3-form-input d3-form-textarea"
                    placeholder="Bijv. specifieke wensen of vragen..."
                    value={form.opmerking}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>

              <div className="d3-form-section">
                <h3>Uw producten</h3>
                {cart.map(item => (
                  <div key={item.id} className="d3-order-item-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="d3-order-item-img"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="d3-order-item-name">{item.name}</div>
                    <div className="d3-order-item-qty">×{item.qty}</div>
                    <div className="d3-order-item-price">€{(item.priceFrom * item.qty).toLocaleString('nl-NL')}</div>
                  </div>
                ))}
                <div className="d3-checkout-total">
                  <span>Totaal incl. BTW</span>
                  <span>€{total.toLocaleString('nl-NL')}</span>
                </div>
              </div>

              <button
                type="submit"
                className="d3-btn-primary d3-btn-full"
                style={{ fontSize: 16, padding: 15 }}
              >
                Doorgaan naar bevestiging →
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleConfirm}>
              <div className="d3-form-section">
                <h3>Controleer uw gegevens</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div className="d3-confirm-block">
                    <div className="d3-confirm-label">Naam</div>
                    <div className="d3-confirm-val">{form.naam}</div>
                  </div>
                  <div className="d3-confirm-block">
                    <div className="d3-confirm-label">Telefoon</div>
                    <div className="d3-confirm-val">{form.telefoon}</div>
                  </div>
                </div>
                <div className="d3-confirm-block">
                  <div className="d3-confirm-label">E-mail</div>
                  <div className="d3-confirm-val">{form.email}</div>
                </div>
                <div className="d3-confirm-block">
                  <div className="d3-confirm-label">Afhaalmoment</div>
                  <div className="d3-confirm-val">{form.afhaalmoment.replace(/-/g, ' ')}</div>
                </div>
                {form.opmerking && (
                  <div className="d3-confirm-block">
                    <div className="d3-confirm-label">Opmerkingen</div>
                    <div className="d3-confirm-val" style={{ textTransform: 'none' }}>{form.opmerking}</div>
                  </div>
                )}
              </div>

              <div className="d3-form-section">
                <h3>Bestelling</h3>
                {cart.map(item => (
                  <div key={item.id} className="d3-order-item-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="d3-order-item-img"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="d3-order-item-name">{item.name}</div>
                    <div className="d3-order-item-qty">×{item.qty}</div>
                    <div className="d3-order-item-price">€{(item.priceFrom * item.qty).toLocaleString('nl-NL')}</div>
                  </div>
                ))}
                <div className="d3-checkout-total">
                  <span>Totaal incl. BTW</span>
                  <span>€{total.toLocaleString('nl-NL')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  className="d3-btn-secondary"
                  onClick={() => setStep(1)}
                  style={{ flexShrink: 0, padding: '15px 24px' }}
                >
                  ← Terug
                </button>
                <button
                  type="submit"
                  className="d3-btn-primary d3-btn-full"
                  style={{ fontSize: 16, padding: 15 }}
                >
                  Bestelling bevestigen ✓
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <D3Footer />
    </div>
  )
}

// ─── BEVESTIGING PAGE ──────────────────────────────────────────────────────────
function BevestigingPage() {
  return (
    <div className="d3-main">
      <section className="d3-section">
        <div className="d3-confirm-page">
          <div className="d3-confirm-icon">
            <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1>Bestelling ontvangen!</h1>
          <p>
            Bedankt voor uw bestelling bij AircoStunt. Wij nemen zo snel mogelijk
            contact met u op om het afhaalmoment te bevestigen.
          </p>
          <div className="d3-notice" style={{ textAlign: 'left', marginBottom: 32 }}>
            <strong>Afhaalpunt:</strong> Veerplaat 10, Dordrecht<br />
            <strong>Openingstijden:</strong> Ma–vr 09:00–20:00, za 09:00–13:00<br />
            <strong>Bel 30 minuten van tevoren:</strong>{' '}
            <a href="tel:0614700753" style={{ color: '#FF6600' }}>06-147 00 753</a>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`${BASE}/`} className="d3-btn-primary" style={{ display: 'inline-flex' }}>
              Terug naar home
            </Link>
            <a
              href="tel:0614700753"
              className="d3-btn-secondary"
              style={{ display: 'inline-flex' }}
            >
              Bel ons
            </a>
          </div>
        </div>
      </section>
      <D3Footer />
    </div>
  )
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default function Design3() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [specProduct, setSpecProduct] = useState(null)

  useEffect(() => {
    const id = 'd3-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = CSS
      document.head.appendChild(style)
    }
    return () => {
      const el = document.getElementById(id)
      if (el) el.remove()
    }
  }, [])

  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id)
      if (existing) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...c, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const changeQty = (id, qty) => {
    if (qty < 1) {
      setCart(c => c.filter(i => i.id !== id))
    } else {
      setCart(c => c.map(i => i.id === id ? { ...i, qty } : i))
    }
  }

  const removeItem = (id) => setCart(c => c.filter(i => i.id !== id))
  const clearCart = () => setCart([])
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="d3">
      <D3Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQtyChange={changeQty}
        onRemove={removeItem}
      />

      {specProduct && (
        <ProductSpecModal
          product={specProduct}
          onClose={() => setSpecProduct(null)}
          onAdd={addToCart}
        />
      )}

      <Routes>
        <Route index element={<HomePage addToCart={addToCart} onSpec={setSpecProduct} />} />
        <Route path="merken" element={<MerkenPage />} />
        <Route path="producten" element={<ProductenPage addToCart={addToCart} onSpec={setSpecProduct} />} />
        <Route path="over-ons" element={<OverOnsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="bestellen" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
        <Route path="bevestiging" element={<BevestigingPage />} />
      </Routes>

      <WhatsAppButton />

      <a href="/" className="d3-back-link">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Alle ontwerpen
      </a>
    </div>
  )
}
