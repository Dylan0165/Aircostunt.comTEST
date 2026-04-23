import { useState, useEffect } from 'react'
import { Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom'
import { PRODUCTS, BRANDS, ACCESSORIES, REVIEWS, FAQ, SITE, BRAND_LOGOS } from '../../data/staticData'
import WhatsAppButton from '../../components/WhatsAppButton'

const BASE = '/design/2'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

.d2 *, .d2 *::before, .d2 *::after { box-sizing: border-box; margin: 0; padding: 0; }

.d2 {
  font-family: 'DM Sans', sans-serif;
  background: #FAFAFA;
  color: #1a1a2e;
  min-height: 100vh;
}

@keyframes d2-fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes d2-slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}
@keyframes d2-cartBounce {
  0%,100% { transform: scale(1); }
  30%     { transform: scale(1.35); }
  60%     { transform: scale(0.92); }
}
@keyframes d2-fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes d2-popIn {
  from { opacity: 0; transform: scale(0.93) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

/* HEADER */
.d2-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: #fff;
  border-bottom: 1px solid #e8e8ee;
  box-shadow: 0 2px 12px rgba(0,51,102,0.07);
  height: 68px;
  display: flex; align-items: center;
}
.d2-header-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
  width: 100%;
}
.d2-logo img {
  height: 44px; width: auto;
  display: block;
}
.d2-nav {
  display: flex; align-items: center; gap: 4px;
}
.d2-nav a {
  text-decoration: none; color: #444;
  font-size: 15px; font-weight: 500;
  padding: 8px 14px; border-radius: 8px;
  transition: background 0.18s, color 0.18s;
}
.d2-nav a:hover { background: #f0f4f8; color: #003366; }
.d2-nav a.active { color: #003366; background: #e8f0fb; font-weight: 600; }
.d2-cart-btn {
  position: relative; background: none; border: none; cursor: pointer;
  padding: 8px; border-radius: 10px; color: #003366;
  transition: background 0.18s;
  display: flex; align-items: center; justify-content: center;
  margin-left: 8px;
}
.d2-cart-btn:hover { background: #e8f0fb; }
.d2-cart-btn.bounce svg { animation: d2-cartBounce 0.45s ease; }
.d2-cart-badge {
  position: absolute; top: 2px; right: 2px;
  background: #FF6600; color: #fff;
  font-size: 10px; font-weight: 700;
  width: 18px; height: 18px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  line-height: 1;
}
.d2-hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer; padding: 8px;
}
.d2-hamburger span {
  display: block; width: 22px; height: 2px;
  background: #003366; border-radius: 2px;
  transition: all 0.25s;
}
.d2-mobile-nav {
  display: none;
  position: fixed; top: 68px; left: 0; right: 0; z-index: 99;
  background: #fff; border-bottom: 1px solid #e8e8ee;
  padding: 12px 0;
  animation: d2-fadeIn 0.2s ease;
}
.d2-mobile-nav.open { display: block; }
.d2-mobile-nav a {
  display: block; padding: 12px 24px;
  text-decoration: none; color: #444;
  font-size: 16px; font-weight: 500;
  transition: background 0.15s;
}
.d2-mobile-nav a:hover { background: #f0f4f8; color: #003366; }

/* LAYOUT */
.d2-layout { padding-top: 68px; min-height: 100vh; display: flex; flex-direction: column; }
.d2-main { flex: 1; }

/* FOOTER */
.d2-footer {
  background: #003366; color: #c8d8e8;
  padding: 48px 24px 32px;
  margin-top: 80px;
}
.d2-footer-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px;
}
.d2-footer-brand img { height: 38px; filter: brightness(0) invert(1); margin-bottom: 14px; }
.d2-footer-brand p { font-size: 14px; line-height: 1.6; opacity: 0.75; max-width: 260px; }
.d2-footer h4 { color: #fff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
.d2-footer ul { list-style: none; }
.d2-footer ul li { margin-bottom: 10px; }
.d2-footer ul li a { color: #c8d8e8; text-decoration: none; font-size: 14px; opacity: 0.8; transition: opacity 0.15s; }
.d2-footer ul li a:hover { opacity: 1; color: #FF6600; }
.d2-footer-bottom {
  max-width: 1200px; margin: 32px auto 0;
  padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 13px; opacity: 0.5; text-align: center;
}

/* HERO */
.d2-hero {
  background: linear-gradient(135deg, #003366 0%, #00509e 100%);
  color: #fff; padding: 90px 24px 80px;
  position: relative; overflow: hidden;
}
.d2-hero::before {
  content: ''; position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.d2-hero-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center;
  position: relative; z-index: 1;
}
.d2-hero-text { animation: d2-fadeUp 0.7s ease both; }
.d2-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,102,0,0.2); color: #ffaa66;
  font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
  padding: 6px 14px; border-radius: 100px;
  border: 1px solid rgba(255,102,0,0.3);
  margin-bottom: 20px;
}
.d2-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; line-height: 1.15;
  margin-bottom: 18px; color: #fff;
}
.d2-hero h1 span { color: #FF6600; }
.d2-hero p {
  font-size: 17px; line-height: 1.65; opacity: 0.85;
  margin-bottom: 32px; max-width: 480px;
}
.d2-hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.d2-btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: #FF6600; color: #fff;
  padding: 14px 28px; border-radius: 10px;
  font-weight: 700; font-size: 16px;
  text-decoration: none; border: none; cursor: pointer;
  transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
  box-shadow: 0 4px 20px rgba(255,102,0,0.4);
  font-family: inherit;
}
.d2-btn-primary:hover {
  background: #e55a00; transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255,102,0,0.5);
}
.d2-btn-outline {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: #fff;
  padding: 14px 28px; border-radius: 10px;
  font-weight: 600; font-size: 16px;
  text-decoration: none; border: 2px solid rgba(255,255,255,0.35); cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  font-family: inherit;
}
.d2-btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.08); }
.d2-hero-image {
  display: flex; align-items: center; justify-content: center;
  animation: d2-fadeUp 0.7s 0.15s ease both;
}
.d2-hero-image img {
  max-width: 100%; max-height: 340px; object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.35));
}
.d2-hero-stats-wrap { padding: 0 24px; }
.d2-hero-stats {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
  background: #fff; border-radius: 14px;
  box-shadow: 0 8px 40px rgba(0,51,102,0.12);
  transform: translateY(-32px);
}
.d2-hero-stat {
  padding: 24px 20px; text-align: center;
  border-right: 1px solid #f0f0f5;
}
.d2-hero-stat:last-child { border-right: none; }
.d2-hero-stat strong { display: block; font-size: 26px; font-weight: 700; color: #003366; }
.d2-hero-stat span { font-size: 13px; color: #888; margin-top: 4px; display: block; }

/* SECTION */
.d2-section { padding: 72px 24px; }
.d2-section-inner { max-width: 1200px; margin: 0 auto; }
.d2-section-header { text-align: center; margin-bottom: 48px; }
.d2-section-label {
  display: inline-block;
  font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
  color: #FF6600; margin-bottom: 12px;
}
.d2-section-header h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: #003366;
  margin-bottom: 14px;
}
.d2-section-header p { font-size: 16px; color: #666; max-width: 560px; margin: 0 auto; line-height: 1.6; }

/* PRODUCT GRID */
.d2-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.d2-product-card {
  background: #fff; border-radius: 16px;
  border: 1px solid #e8e8ee;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  transition: transform 0.22s, box-shadow 0.22s;
  overflow: hidden; display: flex; flex-direction: column;
}
.d2-product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,51,102,0.13);
}
.d2-product-img-wrap {
  background: #f5f7fa; padding: 28px 20px;
  display: flex; align-items: center; justify-content: center;
  height: 200px; position: relative;
}
.d2-product-img-wrap img { max-height: 150px; max-width: 100%; object-fit: contain; }
.d2-product-badges {
  position: absolute; top: 12px; left: 12px;
  display: flex; flex-direction: column; gap: 6px;
}
.d2-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: 100px;
  font-size: 11px; font-weight: 700;
}
.d2-badge-wifi { background: #e8f4fd; color: #0077b6; }
.d2-badge-set { background: #fff3e8; color: #FF6600; border: 1px solid #ffd4aa; }
.d2-badge-stock { background: #edfaf0; color: #1a9e4a; }
.d2-product-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
.d2-product-brand { font-size: 11px; font-weight: 700; color: #FF6600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.d2-product-name { font-size: 15px; font-weight: 600; color: #003366; margin-bottom: 12px; line-height: 1.35; }
.d2-product-features { list-style: none; margin-bottom: 16px; flex: 1; }
.d2-product-features li {
  font-size: 13px; color: #555;
  padding: 4px 0; display: flex; align-items: flex-start; gap: 7px;
}
.d2-product-features li::before {
  content: '✓'; color: #1a9e4a; font-weight: 700; font-size: 12px; flex-shrink: 0; margin-top: 1px;
}
.d2-product-price-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.d2-product-price { font-size: 22px; font-weight: 700; color: #003366; }
.d2-product-price-btw { font-size: 11px; color: #999; font-weight: 400; display: block; }
.d2-product-actions { display: flex; gap: 8px; }
.d2-btn-info {
  flex: 0 0 auto;
  padding: 10px 16px; border-radius: 8px;
  border: 1.5px solid #003366; color: #003366;
  background: none; cursor: pointer; font-size: 14px; font-weight: 600;
  transition: background 0.15s, color 0.15s;
  font-family: inherit;
}
.d2-btn-info:hover { background: #003366; color: #fff; }
.d2-btn-cart {
  flex: 1;
  padding: 10px 16px; border-radius: 8px;
  background: #FF6600; color: #fff; border: none;
  cursor: pointer; font-size: 14px; font-weight: 600;
  transition: background 0.15s, transform 0.15s;
  font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 6px;
}
.d2-btn-cart:hover { background: #e55a00; }
.d2-btn-cart:active { transform: scale(0.97); }

/* BRAND FILTERS */
.d2-brand-filters {
  display: flex; gap: 8px; flex-wrap: wrap;
  margin-bottom: 32px;
}
.d2-filter-btn {
  padding: 8px 20px; border-radius: 100px;
  border: 1.5px solid #e0e0ea; background: #fff;
  color: #555; font-size: 14px; font-weight: 500;
  cursor: pointer; transition: all 0.18s;
  font-family: inherit;
}
.d2-filter-btn:hover { border-color: #003366; color: #003366; }
.d2-filter-btn.active { background: #003366; color: #fff; border-color: #003366; }

/* WIFI SECTION */
.d2-wifi-section {
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  border-radius: 20px; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  border: 1px solid #d4e8f8;
}
.d2-wifi-text { padding: 56px 48px; }
.d2-wifi-text h2 { font-size: 2rem; font-weight: 700; color: #003366; margin-bottom: 16px; }
.d2-wifi-text p { font-size: 16px; color: #555; line-height: 1.65; margin-bottom: 24px; }
.d2-wifi-features { list-style: none; margin-bottom: 32px; }
.d2-wifi-features li {
  display: flex; align-items: center; gap: 10px;
  font-size: 15px; color: #333; padding: 6px 0;
}
.d2-wifi-image {
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #003366 0%, #00509e 100%);
  padding: 40px; min-height: 300px;
}
.d2-wifi-image img { max-width: 100%; max-height: 260px; object-fit: contain; }

/* REVIEWS */
.d2-reviews-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;
}
.d2-review-card {
  background: #fff; border-radius: 14px; padding: 24px;
  border: 1px solid #e8e8ee;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}
.d2-review-stars { color: #FFB800; font-size: 16px; margin-bottom: 12px; letter-spacing: 2px; }
.d2-review-text { font-size: 14px; color: #444; line-height: 1.65; margin-bottom: 16px; font-style: italic; }
.d2-review-author { font-size: 13px; font-weight: 600; color: #003366; }
.d2-review-period { font-size: 12px; color: #aaa; }

/* BRAND LOGOS STRIP */
.d2-brand-strip { display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap; }
.d2-brand-logo-item {
  background: #fff; border: 1px solid #e8e8ee;
  border-radius: 12px; padding: 16px 28px;
  display: flex; align-items: center; justify-content: center;
  transition: box-shadow 0.18s, transform 0.18s;
  text-decoration: none;
}
.d2-brand-logo-item:hover { box-shadow: 0 6px 24px rgba(0,51,102,0.1); transform: translateY(-2px); }
.d2-brand-logo-item img { height: 36px; object-fit: contain; mix-blend-mode: multiply; }

/* MERKEN PAGE */
.d2-brands-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px;
}
.d2-brand-card {
  background: #fff; border-radius: 16px; padding: 32px;
  border: 1px solid #e8e8ee;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  transition: transform 0.22s, box-shadow 0.22s;
}
.d2-brand-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,51,102,0.1); }
.d2-brand-card-logo {
  background: #f5f7fa; border-radius: 10px; padding: 20px 28px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px; height: 88px;
}
.d2-brand-card-logo img { max-height: 50px; max-width: 160px; object-fit: contain; mix-blend-mode: multiply; }
.d2-brand-card h3 { font-size: 18px; font-weight: 700; color: #003366; margin-bottom: 10px; }
.d2-brand-card p { font-size: 14px; color: #555; line-height: 1.65; }
.d2-brand-card-link {
  display: inline-flex; align-items: center; gap: 6px;
  color: #003366; font-weight: 600; font-size: 14px;
  text-decoration: none; margin-top: 20px;
  transition: color 0.15s;
}
.d2-brand-card-link:hover { color: #FF6600; }

/* PAGE HEADER */
.d2-page-header {
  background: linear-gradient(135deg, #003366 0%, #00509e 100%);
  color: #fff; padding: 60px 24px 48px;
  text-align: center;
}
.d2-page-header h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; margin-bottom: 12px; }
.d2-page-header p { font-size: 16px; opacity: 0.8; max-width: 500px; margin: 0 auto; }

/* CART DRAWER */
.d2-cart-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  z-index: 150; animation: d2-fadeIn 0.2s ease;
}
.d2-cart-drawer {
  position: fixed; top: 0; right: 0; height: 100vh; width: 420px;
  z-index: 200; background: #fff;
  box-shadow: -8px 0 40px rgba(0,0,0,0.15);
  display: flex; flex-direction: column;
  animation: d2-slideInRight 0.3s ease;
}
.d2-cart-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px; border-bottom: 1px solid #e8e8ee;
}
.d2-cart-header h3 { font-size: 18px; font-weight: 700; color: #003366; }
.d2-cart-close {
  background: none; border: none; cursor: pointer;
  padding: 6px; border-radius: 8px; color: #555;
  transition: background 0.15s;
}
.d2-cart-close:hover { background: #f0f0f5; }
.d2-cart-items { flex: 1; overflow-y: auto; padding: 20px 24px; }
.d2-cart-empty { text-align: center; color: #999; font-size: 15px; padding: 40px 0; }
.d2-cart-item {
  display: flex; gap: 14px; align-items: flex-start;
  padding: 16px 0; border-bottom: 1px solid #f0f0f5;
}
.d2-cart-item-img {
  width: 64px; height: 64px; background: #f5f7fa;
  border-radius: 10px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.d2-cart-item-img img { max-width: 52px; max-height: 52px; object-fit: contain; }
.d2-cart-item-info { flex: 1; }
.d2-cart-item-name { font-size: 14px; font-weight: 600; color: #003366; margin-bottom: 4px; line-height: 1.3; }
.d2-cart-item-qty { font-size: 13px; color: #888; }
.d2-cart-item-price { font-size: 15px; font-weight: 700; color: #003366; }
.d2-cart-item-remove {
  background: none; border: none; cursor: pointer;
  color: #ccc; padding: 4px;
  transition: color 0.15s;
}
.d2-cart-item-remove:hover { color: #e53e3e; }
.d2-cart-footer { padding: 20px 24px; border-top: 1px solid #e8e8ee; }
.d2-cart-total {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.d2-cart-total span { font-size: 16px; color: #555; }
.d2-cart-total strong { font-size: 22px; font-weight: 700; color: #003366; }
.d2-cart-note { font-size: 12px; color: #aaa; margin-bottom: 16px; text-align: center; }
.d2-btn-full {
  display: block; width: 100%;
  padding: 14px; border-radius: 10px;
  background: #FF6600; color: #fff; border: none;
  font-size: 16px; font-weight: 700; cursor: pointer;
  text-align: center; text-decoration: none;
  transition: background 0.18s; font-family: inherit;
}
.d2-btn-full:hover { background: #e55a00; }
.d2-btn-full:disabled { background: #ccc; cursor: not-allowed; }
.d2-btn-full-outline {
  display: block; width: 100%;
  padding: 12px; border-radius: 10px;
  background: none; color: #003366;
  border: 1.5px solid #003366;
  font-size: 14px; font-weight: 600; cursor: pointer;
  text-align: center; margin-top: 10px;
  transition: background 0.15s; font-family: inherit;
}
.d2-btn-full-outline:hover { background: #e8f0fb; }

/* MODAL */
.d2-modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  z-index: 300; display: flex; align-items: center; justify-content: center;
  padding: 20px; animation: d2-fadeIn 0.2s ease;
}
.d2-modal {
  background: #fff; border-radius: 20px;
  max-width: 680px; width: 100%;
  max-height: 90vh; overflow-y: auto;
  animation: d2-popIn 0.25s ease;
}
.d2-modal-header {
  padding: 28px 32px 20px; border-bottom: 1px solid #e8e8ee;
  position: sticky; top: 0; background: #fff; z-index: 1;
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
}
.d2-modal-header h3 { font-size: 20px; font-weight: 700; color: #003366; line-height: 1.3; }
.d2-modal-close {
  background: none; border: none; cursor: pointer;
  color: #888; padding: 4px; flex-shrink: 0;
  transition: color 0.15s;
}
.d2-modal-close:hover { color: #333; }
.d2-modal-body { padding: 28px 32px; }
.d2-modal-img {
  background: #f5f7fa; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  padding: 28px; margin-bottom: 28px; height: 200px;
}
.d2-modal-img img { max-height: 160px; max-width: 100%; object-fit: contain; }
.d2-specs-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  border: 1px solid #e8e8ee; border-radius: 12px; overflow: hidden;
  margin-bottom: 28px;
}
.d2-spec-label {
  padding: 11px 16px; font-size: 13px; color: #666; font-weight: 500;
  border-bottom: 1px solid #e8e8ee; border-right: 1px solid #e8e8ee;
  background: #fff;
}
.d2-spec-value {
  padding: 11px 16px; font-size: 13px; color: #1a1a2e; font-weight: 600;
  border-bottom: 1px solid #e8e8ee; background: #fff;
}
.d2-specs-grid > div:nth-child(4n+3),
.d2-specs-grid > div:nth-child(4n+4) {
  background: #f9f9fc;
}
.d2-modal-price {
  display: flex; align-items: center; justify-content: space-between;
  background: #f0f4ff; border-radius: 12px; padding: 20px 24px;
  gap: 16px; flex-wrap: wrap;
}
.d2-modal-price-val { font-size: 28px; font-weight: 700; color: #003366; }
.d2-modal-price-sub { font-size: 12px; color: #888; display: block; }

/* CHECKOUT PAGE */
.d2-checkout-grid {
  display: grid; grid-template-columns: 1fr 420px; gap: 32px; align-items: flex-start;
}
.d2-form-card {
  background: #fff; border-radius: 16px; padding: 36px;
  border: 1px solid #e8e8ee;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.d2-form-card h2 { font-size: 20px; font-weight: 700; color: #003366; margin-bottom: 28px; }
.d2-form-group { margin-bottom: 20px; }
.d2-form-group label {
  display: block; font-size: 14px; font-weight: 600; color: #333;
  margin-bottom: 8px;
}
.d2-form-group input,
.d2-form-group select,
.d2-form-group textarea {
  width: 100%; padding: 12px 16px; border-radius: 10px;
  border: 1.5px solid #e0e0ea; font-size: 15px; color: #1a1a2e;
  background: #fff; transition: border-color 0.18s;
  font-family: inherit; outline: none;
}
.d2-form-group input:focus,
.d2-form-group select:focus,
.d2-form-group textarea:focus { border-color: #003366; }
.d2-form-group textarea { resize: vertical; min-height: 100px; }
.d2-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.d2-order-summary {
  background: #fff; border-radius: 16px; padding: 28px;
  border: 1px solid #e8e8ee;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  position: sticky; top: 88px;
}
.d2-order-summary h3 { font-size: 17px; font-weight: 700; color: #003366; margin-bottom: 20px; }
.d2-order-item {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 12px 0; border-bottom: 1px solid #f0f0f5; gap: 12px;
}
.d2-order-item-name { font-size: 14px; color: #333; line-height: 1.4; }
.d2-order-item-qty { font-size: 12px; color: #999; }
.d2-order-item-price { font-size: 14px; font-weight: 600; color: #003366; white-space: nowrap; }
.d2-order-total {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; padding-top: 16px; border-top: 2px solid #003366;
}
.d2-order-total span { font-size: 15px; font-weight: 600; color: #333; }
.d2-order-total strong { font-size: 22px; font-weight: 700; color: #003366; }
.d2-pickup-notice {
  background: #fff8f0; border: 1px solid #ffd4aa;
  border-radius: 12px; padding: 16px 18px; margin-top: 20px;
}
.d2-pickup-notice p { font-size: 13px; color: #cc5500; line-height: 1.55; }
.d2-pickup-notice strong { display: block; margin-bottom: 4px; font-size: 14px; color: #cc5500; }

/* CONFIRMATION PAGE */
.d2-confirm-wrap { max-width: 600px; margin: 0 auto; padding: 60px 24px; text-align: center; }
.d2-confirm-icon {
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #1a9e4a, #27ae60);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 28px; box-shadow: 0 8px 28px rgba(26,158,74,0.35);
}
.d2-confirm-wrap h1 { font-size: 2rem; font-weight: 700; color: #003366; margin-bottom: 14px; }
.d2-confirm-wrap > p { font-size: 16px; color: #555; line-height: 1.65; margin-bottom: 32px; }
.d2-confirm-box {
  background: #fff; border-radius: 16px; padding: 28px;
  border: 1px solid #e8e8ee; text-align: left; margin-bottom: 24px;
}
.d2-confirm-box h3 { font-size: 16px; font-weight: 700; color: #003366; margin-bottom: 16px; }

/* ABOUT PAGE */
.d2-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.d2-about-text h2 { font-size: 2rem; font-weight: 700; color: #003366; margin-bottom: 20px; }
.d2-about-text p { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 16px; }
.d2-stats-row { display: flex; gap: 32px; margin-top: 32px; flex-wrap: wrap; }
.d2-stat { text-align: center; }
.d2-stat strong { display: block; font-size: 2.2rem; font-weight: 700; color: #FF6600; }
.d2-stat span { font-size: 13px; color: #888; }

/* CONTACT PAGE */
.d2-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.d2-contact-info h2 { font-size: 1.5rem; font-weight: 700; color: #003366; margin-bottom: 24px; }
.d2-contact-item { display: flex; gap: 14px; margin-bottom: 22px; }
.d2-contact-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: #e8f0fb; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: #003366;
}
.d2-contact-item h4 { font-size: 13px; color: #888; margin-bottom: 4px; font-weight: 500; }
.d2-contact-item p { font-size: 15px; color: #003366; font-weight: 600; }
.d2-hours-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
.d2-hours-table tr td { padding: 8px 0; font-size: 14px; color: #444; border-bottom: 1px solid #f0f0f5; }
.d2-hours-table tr td:first-child { color: #888; width: 50%; }

/* FAQ */
.d2-faq-item { border-bottom: 1px solid #e8e8ee; }
.d2-faq-q {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 0; cursor: pointer;
  font-size: 15px; font-weight: 600; color: #003366;
  background: none; border: none; width: 100%; text-align: left;
  font-family: inherit; gap: 16px;
  transition: color 0.15s;
}
.d2-faq-q:hover { color: #FF6600; }
.d2-faq-q svg { flex-shrink: 0; transition: transform 0.25s; }
.d2-faq-q.open svg { transform: rotate(180deg); }
.d2-faq-a { font-size: 14px; color: #555; line-height: 1.7; padding: 0 0 20px; }

/* BG SECTION */
.d2-bg-light { background: #f5f7fa; }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .d2-footer-inner { grid-template-columns: 1fr 1fr; }
  .d2-checkout-grid { grid-template-columns: 1fr; }
  .d2-order-summary { position: static; }
}
@media (max-width: 768px) {
  .d2-nav { display: none; }
  .d2-hamburger { display: flex; }
  .d2-hero-inner { grid-template-columns: 1fr; }
  .d2-hero-image { display: none; }
  .d2-hero-stats { grid-template-columns: 1fr 1fr; transform: translateY(-20px); }
  .d2-hero-stat { border-right: none; border-bottom: 1px solid #f0f0f5; }
  .d2-wifi-section { grid-template-columns: 1fr; }
  .d2-wifi-image { display: none; }
  .d2-about-grid { grid-template-columns: 1fr; }
  .d2-contact-grid { grid-template-columns: 1fr; }
  .d2-footer-inner { grid-template-columns: 1fr; gap: 28px; }
  .d2-cart-drawer { width: 100%; }
  .d2-modal-overlay { align-items: flex-end; padding: 0; }
  .d2-modal { max-width: 100%; border-radius: 20px 20px 0 0; max-height: 95vh; }
  .d2-specs-grid { grid-template-columns: 1fr; }
  .d2-spec-label { border-right: none; }
  .d2-form-row { grid-template-columns: 1fr; }
  .d2-section { padding: 48px 24px; }
  .d2-wifi-text { padding: 36px 28px; }
}
`

const SPEC_LABELS = {
  koelcapaciteit: 'Koelcapaciteit',
  verwarmingscapaciteit: 'Verwarmingscapaciteit',
  energielabelKoeling: 'Energielabel koeling',
  energielabelVerwarming: 'Energielabel verwarming',
  seer: 'SEER',
  scop: 'SCOP',
  geluidBinnen: 'Geluid binnenunit',
  geluidBuiten: 'Geluid buitenunit',
  koudemiddel: 'Koudemiddel',
  afmetingenBinnen: 'Afmetingen binnenunit',
  gewichtBinnen: 'Gewicht binnenunit',
  wifi: 'WiFi',
  geschiktVoor: 'Geschikt voor',
  verbruikNominaal: 'Verbruik nominaal',
  aantalBinnenunits: 'Aantal binnenunits',
}

function Stars({ n }) {
  return <span className="d2-review-stars">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

// ── PRODUCT SPEC MODAL ──
function ProductSpecModal({ product, onClose, onAddToCart }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const brand = BRANDS.find(b => b.id === product.brandId)

  return (
    <div className="d2-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="d2-modal" role="dialog" aria-modal="true">
        <div className="d2-modal-header">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#FF6600', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              {brand?.name}
            </div>
            <h3>{product.name}</h3>
          </div>
          <button className="d2-modal-close" onClick={onClose} aria-label="Sluiten">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="d2-modal-body">
          <div className="d2-modal-img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="d2-specs-grid">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} style={{ display: 'contents' }}>
                <div className="d2-spec-label">{SPEC_LABELS[key] || key}</div>
                <div className="d2-spec-value">{val}</div>
              </div>
            ))}
          </div>
          <div className="d2-modal-price">
            <div>
              <div className="d2-modal-price-val">€{product.priceFrom.toLocaleString('nl-NL')}</div>
              <span className="d2-modal-price-sub">incl. 21% BTW · WiFi inbegrepen</span>
            </div>
            <button
              className="d2-btn-primary"
              onClick={() => { onAddToCart(product); onClose() }}
              style={{ fontSize: 14 }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              In winkelwagen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── CART DRAWER ──
function CartDrawer({ cart, onClose, onRemoveFromCart, navigate }) {
  const total = cart.reduce((s, item) => s + item.priceFrom * item.qty, 0)
  const itemCount = cart.reduce((s, item) => s + item.qty, 0)

  const handleOrder = () => {
    onClose()
    navigate(`${BASE}/bestellen`)
  }

  return (
    <>
      <div className="d2-cart-overlay" onClick={onClose} />
      <div className="d2-cart-drawer" role="dialog" aria-label="Winkelwagen">
        <div className="d2-cart-header">
          <h3>Winkelwagen ({itemCount})</h3>
          <button className="d2-cart-close" onClick={onClose} aria-label="Sluiten">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="d2-cart-items">
          {cart.length === 0 ? (
            <div className="d2-cart-empty">
              <svg width="48" height="48" fill="none" stroke="#ddd" strokeWidth="1.5" viewBox="0 0 24 24" style={{ display: 'block', margin: '0 auto 12px' }}>
                <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p>Uw winkelwagen is leeg</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="d2-cart-item" key={item.id}>
                <div className="d2-cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="d2-cart-item-info">
                  <div className="d2-cart-item-name">{item.name}</div>
                  <div className="d2-cart-item-qty">Aantal: {item.qty}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <div className="d2-cart-item-price">€{(item.priceFrom * item.qty).toLocaleString('nl-NL')}</div>
                  <button
                    className="d2-cart-item-remove"
                    onClick={() => onRemoveFromCart(item.id)}
                    aria-label="Verwijderen"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="d2-cart-footer">
          <div className="d2-cart-total">
            <span>Totaal incl. BTW</span>
            <strong>€{total.toLocaleString('nl-NL')}</strong>
          </div>
          <p className="d2-cart-note">Alleen afhalen · Veerplaat 10, Dordrecht</p>
          <button className="d2-btn-full" onClick={handleOrder} disabled={cart.length === 0}>
            Naar bestellen →
          </button>
          <button className="d2-btn-full-outline" onClick={onClose}>
            Verder winkelen
          </button>
        </div>
      </div>
    </>
  )
}

// ── HEADER ──
function D2Header({ cartCount, onCartOpen, cartBounce }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: `${BASE}/`, label: 'Home', end: true },
    { to: `${BASE}/merken`, label: 'Merken' },
    { to: `${BASE}/producten`, label: 'Producten' },
    { to: `${BASE}/over-ons`, label: 'Over ons' },
    { to: `${BASE}/contact`, label: 'Contact' },
  ]

  return (
    <>
      <header className="d2-header">
        <div className="d2-header-inner">
          <Link to={`${BASE}/`} className="d2-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logoairco.png" alt="AircoStunt" style={{ mixBlendMode: 'multiply' }} />
          </Link>
          <nav className="d2-nav">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => isActive ? 'active' : undefined}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              className={`d2-cart-btn${cartBounce ? ' bounce' : ''}`}
              onClick={onCartOpen}
              aria-label="Winkelwagen openen"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="d2-cart-badge">{cartCount}</span>}
            </button>
            <button
              className="d2-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu openen"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <nav className={`d2-mobile-nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

// ── FOOTER ──
function D2Footer() {
  return (
    <footer className="d2-footer">
      <div className="d2-footer-inner">
        <div className="d2-footer-brand">
          <img src="/logoairco.png" alt="AircoStunt" />
          <p>Airco's van A-merken direct afhalen uit Dordrecht. Geen verzending, wél de scherpste prijs.</p>
        </div>
        <div>
          <h4>Navigatie</h4>
          <ul>
            <li><Link to={`${BASE}/`}>Home</Link></li>
            <li><Link to={`${BASE}/merken`}>Merken</Link></li>
            <li><Link to={`${BASE}/producten`}>Producten</Link></li>
            <li><Link to={`${BASE}/over-ons`}>Over ons</Link></li>
            <li><Link to={`${BASE}/contact`}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href="https://maps.google.com/?q=Veerplaat+10+Dordrecht" target="_blank" rel="noopener noreferrer">{SITE.address}</a></li>
          </ul>
        </div>
        <div>
          <h4>Openingstijden</h4>
          <ul>
            <li><span style={{ color: '#c8d8e8', fontSize: 14, opacity: 0.8 }}>Ma–Vr: 09:00–20:00</span></li>
            <li><span style={{ color: '#c8d8e8', fontSize: 14, opacity: 0.8 }}>Zaterdag: 09:00–13:00</span></li>
            <li><span style={{ color: '#c8d8e8', fontSize: 14, opacity: 0.8 }}>Zondag: Gesloten</span></li>
          </ul>
        </div>
      </div>
      <div className="d2-footer-bottom">
        © {new Date().getFullYear()} AircoStunt · Alle prijzen incl. 21% BTW · Veerplaat 10, Dordrecht
      </div>
    </footer>
  )
}

// ── LAYOUT ──
function Layout({ children, cartCount, onCartOpen, cartBounce }) {
  return (
    <div className="d2-layout">
      <D2Header cartCount={cartCount} onCartOpen={onCartOpen} cartBounce={cartBounce} />
      <main className="d2-main">{children}</main>
      <D2Footer />
    </div>
  )
}

// ── FAQ ITEM ──
function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="d2-faq-item">
      <button className={`d2-faq-q${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        {item.q}
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && <div className="d2-faq-a">{item.a}</div>}
    </div>
  )
}

// ── WIFI ICON ──
function WifiIcon({ size = 18, color = '#FF6600' }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" viewBox="0 0 24 24">
      <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
    </svg>
  )
}

// ── CART ICON ──
function CartIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: HOME
// ══════════════════════════════════════════════════════════
function D2HomePage({ onAddToCart, navigate }) {
  const featured = PRODUCTS.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="d2-hero">
        <div className="d2-hero-inner">
          <div className="d2-hero-text">
            <div className="d2-hero-badge">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Bestel en Haal Op - Dordrecht
            </div>
            <h1>Airco's direct afhalen<br />uit <span>Dordrecht</span></h1>
            <p>Bestel online en haal op uit onze showroom. A-merken voor de laagste prijs, met gratis WiFi-module bij elke airco.</p>
            <div className="d2-hero-actions">
              <Link to={`${BASE}/producten`} className="d2-btn-primary">
                <CartIcon size={18} />
                Bestel online, haal op
              </Link>
              <Link to={`${BASE}/merken`} className="d2-btn-outline">
                Onze merken
              </Link>
            </div>
          </div>
          <div className="d2-hero-image">
            <img src={PRODUCTS[3].image} alt="Daikin airco" />
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="d2-hero-stats-wrap">
        <div className="d2-hero-stats">
          <div className="d2-hero-stat">
            <strong>15+</strong><span>Jaar ervaring</span>
          </div>
          <div className="d2-hero-stat">
            <strong>5</strong><span>A-merken</span>
          </div>
          <div className="d2-hero-stat">
            <strong>2 jaar</strong><span>Fabrieksgarantie</span>
          </div>
          <div className="d2-hero-stat">
            <strong>100%</strong><span>WiFi inbegrepen</span>
          </div>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="d2-section" style={{ paddingTop: 16 }}>
        <div className="d2-section-inner">
          <div className="d2-section-header">
            <span className="d2-section-label">Bestsellers</span>
            <h2>Meest verkochte airco's</h2>
            <p>Direct beschikbaar in onze showroom in Dordrecht. Bestel online en haal vandaag nog op.</p>
          </div>
          <div className="d2-product-grid">
            {featured.map(product => (
              <HomeProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to={`${BASE}/producten`} className="d2-btn-primary" style={{ display: 'inline-flex' }}>
              Alle producten bekijken →
            </Link>
          </div>
        </div>
      </section>

      {/* WIFI SECTION */}
      <section className="d2-section" style={{ paddingTop: 0 }}>
        <div className="d2-section-inner">
          <div className="d2-wifi-section">
            <div className="d2-wifi-text">
              <span className="d2-section-label">Standaard inbegrepen</span>
              <h2>Gratis WiFi-module bij elke airco</h2>
              <p>Bij elke airco die u bij AircoStunt koopt zit de WiFi-module standaard inbegrepen. Bedien uw airco eenvoudig via de smartphone-app van uw merk.</p>
              <ul className="d2-wifi-features">
                {[
                  'Bedien uw airco via smartphone',
                  "Schema's instellen vanuit bed",
                  'Verbruik monitoren in real-time',
                  'Compatibel met Google Home & Alexa',
                ].map(item => (
                  <li key={item}>
                    <WifiIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`${BASE}/producten`} className="d2-btn-primary" style={{ display: 'inline-flex' }}>
                Bekijk alle airco's
              </Link>
            </div>
            <div className="d2-wifi-image">
              <img src="/wifi.png" alt="WiFi module" />
            </div>
          </div>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="d2-section" style={{ paddingTop: 0 }}>
        <div className="d2-section-inner">
          <div className="d2-section-header">
            <span className="d2-section-label">Onze merken</span>
            <h2>A-merken voor de scherpste prijs</h2>
          </div>
          <div className="d2-brand-strip">
            {Object.entries(BRAND_LOGOS).map(([key, src]) => (
              <Link to={`${BASE}/merken`} key={key} className="d2-brand-logo-item">
                <img src={src} alt={key} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="d2-section d2-bg-light">
        <div className="d2-section-inner">
          <div className="d2-section-header">
            <span className="d2-section-label">Google Reviews</span>
            <h2>Wat onze klanten zeggen</h2>
            <p>Meer dan 200 tevreden klanten gingen u voor.</p>
          </div>
          <div className="d2-reviews-grid">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div className="d2-review-card" key={i}>
                <Stars n={r.stars} />
                <p className="d2-review-text">"{r.text}"</p>
                <div className="d2-review-author">{r.name}</div>
                <div className="d2-review-period">{r.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="d2-section">
        <div className="d2-section-inner">
          <div className="d2-section-header">
            <span className="d2-section-label">Veelgestelde vragen</span>
            <h2>Heeft u een vraag?</h2>
          </div>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {FAQ.slice(0, 4).map((item, i) => <FaqItem key={i} item={item} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to={`${BASE}/contact`} className="d2-btn-primary" style={{ display: 'inline-flex' }}>
              Stel uw vraag direct
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function HomeProductCard({ product, onAddToCart }) {
  const brand = BRANDS.find(b => b.id === product.brandId)
  return (
    <div className="d2-product-card">
      <div className="d2-product-img-wrap">
        <img src={product.image} alt={product.name} />
        <div className="d2-product-badges">
          <span className="d2-badge d2-badge-wifi">
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
            </svg>
            WiFi
          </span>
          {product.isMultiSplit && <span className="d2-badge d2-badge-set">Set</span>}
        </div>
      </div>
      <div className="d2-product-body">
        <div className="d2-product-brand">{brand?.name}</div>
        <div className="d2-product-name">{product.name}</div>
        <ul className="d2-product-features">
          {product.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div className="d2-product-price-row">
          <div>
            <div className="d2-product-price">€{product.priceFrom.toLocaleString('nl-NL')}</div>
            <span className="d2-product-price-btw">incl. BTW</span>
          </div>
          {product.inStock && <span className="d2-badge d2-badge-stock">Op voorraad</span>}
        </div>
        <button className="d2-btn-cart" style={{ width: '100%' }} onClick={() => onAddToCart(product)}>
          <CartIcon size={16} />
          In winkelwagen
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: MERKEN
// ══════════════════════════════════════════════════════════
function D2MerkenPage() {
  return (
    <>
      <div className="d2-page-header">
        <h1>Onze merken</h1>
        <p>Vijf A-merken, rechtstreeks ingekocht. Altijd de beste kwaliteit voor de laagste prijs.</p>
      </div>
      <section className="d2-section">
        <div className="d2-section-inner">
          <div className="d2-brands-grid">
            {BRANDS.map(brand => (
              <div className="d2-brand-card" key={brand.id}>
                <div className="d2-brand-card-logo">
                  <img src={brand.logo} alt={brand.name} />
                </div>
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
                <Link to={`${BASE}/producten`} className="d2-brand-card-link">
                  Bekijk {brand.name} producten
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* WHY AIRCOSTUNT */}
          <div style={{
            marginTop: 64,
            background: 'linear-gradient(135deg, #003366 0%, #00509e 100%)',
            borderRadius: 20, padding: '48px 40px', color: '#fff', textAlign: 'center'
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#ffaa66' }}>
              Waarom AircoStunt?
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '16px 0 12px' }}>
              Direct inkoop, geen tussenhandelaar
            </h2>
            <p style={{ fontSize: 15, opacity: 0.8, maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.65 }}>
              Wij kopen rechtstreeks in bij fabrikanten en grote importeurs. Geen tussenhandelaar, geen showroomkosten. Wel de laagste prijs.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
              {[['15+', 'Jaar ervaring'], ['5', 'A-merken'], ['2 jaar', 'Garantie'], ['100%', 'WiFi inbegrepen']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6600' }}>{val}</div>
                  <div style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: PRODUCTEN
// ══════════════════════════════════════════════════════════
function D2ProductenPage({ cart, onAddToCart, onRemoveFromCart }) {
  const [activeBrand, setActiveBrand] = useState('alle')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const brandIds = ['alle', ...BRANDS.map(b => b.id)]
  const getBrandLabel = (id) => id === 'alle' ? 'Alle' : BRANDS.find(b => b.id === id)?.name

  const filtered = activeBrand === 'alle'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.brandId === activeBrand)

  const isInCart = (id) => cart.some(i => i.id === id)

  return (
    <>
      {selectedProduct && (
        <ProductSpecModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
      <div className="d2-page-header">
        <h1>Alle airco's</h1>
        <p>Bestel online en haal op bij ons in Dordrecht. WiFi inbegrepen bij elke set.</p>
      </div>
      <section className="d2-section">
        <div className="d2-section-inner">
          <div className="d2-brand-filters">
            {brandIds.map(id => (
              <button
                key={id}
                className={`d2-filter-btn${activeBrand === id ? ' active' : ''}`}
                onClick={() => setActiveBrand(id)}
              >
                {getBrandLabel(id)}
              </button>
            ))}
          </div>
          <p style={{ marginBottom: 24, fontSize: 14, color: '#888' }}>
            {filtered.length} product{filtered.length !== 1 ? 'en' : ''} gevonden
          </p>
          <div className="d2-product-grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                inCart={isInCart(product.id)}
                onInfo={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="d2-section" style={{ paddingTop: 0 }}>
        <div className="d2-section-inner">
          <div className="d2-section-header">
            <span className="d2-section-label">Toebehoren</span>
            <h2>Accessoires &amp; montagemateriaal</h2>
            <p>Alles voor een complete installatie. Vraag naar beschikbaarheid bij afhalen.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
            {ACCESSORIES.map(acc => (
              <div key={acc.id} style={{
                background: '#fff', borderRadius: 14, padding: 22,
                border: '1px solid #e8e8ee', boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#003366', marginBottom: 8 }}>{acc.name}</div>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.55, marginBottom: 14 }}>{acc.description}</p>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#003366' }}>
                  €{acc.price}
                  <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>incl. BTW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ProductCard({ product, onAddToCart, onRemoveFromCart, inCart, onInfo }) {
  const brand = BRANDS.find(b => b.id === product.brandId)
  return (
    <div className="d2-product-card">
      <div className="d2-product-img-wrap">
        <img src={product.image} alt={product.name} />
        <div className="d2-product-badges">
          <span className="d2-badge d2-badge-wifi">
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>
            </svg>
            WiFi
          </span>
          {product.isMultiSplit && <span className="d2-badge d2-badge-set">Set</span>}
        </div>
      </div>
      <div className="d2-product-body">
        <div className="d2-product-brand">{brand?.name}</div>
        <div className="d2-product-name">{product.name}</div>
        <ul className="d2-product-features">
          {product.features.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}
        </ul>
        <div className="d2-product-price-row">
          <div>
            <div className="d2-product-price">€{product.priceFrom.toLocaleString('nl-NL')}</div>
            <span className="d2-product-price-btw">incl. BTW</span>
          </div>
          {product.inStock && <span className="d2-badge d2-badge-stock">Op voorraad</span>}
        </div>
        <div className="d2-product-actions">
          <button className="d2-btn-info" onClick={onInfo}>Info</button>
          {inCart ? (
            <button
              className="d2-btn-cart"
              style={{ background: '#1a9e4a' }}
              onClick={() => onRemoveFromCart(product.id)}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              Toegevoegd
            </button>
          ) : (
            <button className="d2-btn-cart" onClick={() => onAddToCart(product)}>
              <CartIcon size={16} />
              In winkelwagen
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: OVER ONS
// ══════════════════════════════════════════════════════════
function D2OverOnsPage() {
  return (
    <>
      <div className="d2-page-header">
        <h1>Over AircoStunt</h1>
        <p>Meer dan 15 jaar uw specialist in airconditioning. Eerlijk advies, scherpe prijzen.</p>
      </div>

      <section className="d2-section">
        <div className="d2-section-inner">
          <div className="d2-about-grid">
            <div className="d2-about-text">
              <span className="d2-section-label">Ons verhaal</span>
              <h2>Airco's voor de laagste prijs, direct uit Dordrecht</h2>
              <p>AircoStunt is opgericht met één doel: de beste airco's van de beste merken aanbieden voor de laagste prijs. Geen showroomkosten, geen onnodige tussenhandelaar. Gewoon eerlijke producten voor eerlijke prijzen.</p>
              <p>Wij kopen rechtstreeks in bij fabrikanten en grote importeurs in Europa. Hierdoor kunnen we aanbieden wat de grote ketens niet kunnen: A-merk kwaliteit voor een scherpe prijs, rechtstreeks bij u af te halen in Dordrecht.</p>
              <p>Ron en René staan altijd klaar voor persoonlijk advies. Of u nu een kleine slaapkamer wilt koelen of een complete woning, wij helpen u de juiste keuze te maken.</p>
              <div className="d2-stats-row">
                {[['15+', 'Jaar ervaring'], ['5', 'A-merken'], ['2 jaar', 'Garantie'], ['200+', 'Reviews']].map(([val, lbl]) => (
                  <div className="d2-stat" key={lbl}>
                    <strong>{val}</strong>
                    <span>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #003366 0%, #00509e 100%)',
                borderRadius: 20, padding: 48, width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320
              }}>
                <img src="/wifi.png" alt="WiFi airco" style={{ maxWidth: '100%', maxHeight: 220, objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WIFI SECTION */}
      <section className="d2-section" style={{ paddingTop: 0 }}>
        <div className="d2-section-inner">
          <div className="d2-wifi-section">
            <div className="d2-wifi-text">
              <span className="d2-section-label">Standaard inbegrepen</span>
              <h2>Gratis WiFi bij elke airco</h2>
              <p>Wij zijn de enige in de regio die bij elke airco een WiFi-module standaard meegeeft, zonder meerprijs. Zo bedient u uw airco altijd en overal via uw smartphone.</p>
              <ul className="d2-wifi-features">
                {[
                  'MyDaikin app (Daikin)',
                  'MELCloud app (Mitsubishi Electric)',
                  'MH-AC WiFi app (Mitsubishi Heavy)',
                  'SmartThings app (Samsung)',
                  'LG ThinQ app (LG)',
                ].map(item => (
                  <li key={item}>
                    <WifiIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`${BASE}/producten`} className="d2-btn-primary" style={{ display: 'inline-flex' }}>
                Bekijk alle airco's
              </Link>
            </div>
            <div className="d2-wifi-image">
              <img src="/wifi.png" alt="WiFi module airco" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="d2-section d2-bg-light">
        <div className="d2-section-inner">
          <div className="d2-section-header">
            <span className="d2-section-label">Google Reviews</span>
            <h2>Wat onze klanten zeggen</h2>
          </div>
          <div className="d2-reviews-grid">
            {REVIEWS.slice(0, 4).map((r, i) => (
              <div className="d2-review-card" key={i}>
                <Stars n={r.stars} />
                <p className="d2-review-text">"{r.text}"</p>
                <div className="d2-review-author">{r.name}</div>
                <div className="d2-review-period">{r.period}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: CONTACT
// ══════════════════════════════════════════════════════════
function D2ContactPage() {
  return (
    <>
      <div className="d2-page-header">
        <h1>Contact</h1>
        <p>Heeft u een vraag? Wij helpen u graag verder via telefoon, WhatsApp of e-mail.</p>
      </div>
      <section className="d2-section">
        <div className="d2-section-inner">
          <div className="d2-contact-grid">
            <div className="d2-contact-info">
              <h2>Bereikbaarheid</h2>

              <div className="d2-contact-item">
                <div className="d2-contact-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.75a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4>Telefoon</h4>
                  <p><a href={`tel:${SITE.phone}`} style={{ color: '#003366', textDecoration: 'none' }}>{SITE.phone}</a></p>
                </div>
              </div>

              <div className="d2-contact-item">
                <div className="d2-contact-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4>E-mail</h4>
                  <p><a href={`mailto:${SITE.email}`} style={{ color: '#003366', textDecoration: 'none' }}>{SITE.email}</a></p>
                </div>
              </div>

              <div className="d2-contact-item">
                <div className="d2-contact-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4>Adres (alleen afhalen)</h4>
                  <p>{SITE.address}</p>
                </div>
              </div>

              <h2 style={{ marginTop: 36, marginBottom: 20 }}>Openingstijden</h2>
              <table className="d2-hours-table">
                <tbody>
                  <tr><td>Maandag – vrijdag</td><td>09:00 – 20:00</td></tr>
                  <tr><td>Zaterdag</td><td>09:00 – 13:00</td></tr>
                  <tr><td>Zondag</td><td>Gesloten</td></tr>
                </tbody>
              </table>
              <div style={{ marginTop: 16, padding: '14px 18px', background: '#fff8f0', borderRadius: 10, border: '1px solid #ffd4aa' }}>
                <p style={{ fontSize: 13, color: '#cc5500', lineHeight: 1.55 }}>
                  <strong style={{ display: 'block', marginBottom: 4 }}>Let op:</strong>
                  Bel altijd minimaal 30 minuten voor aankomst om zeker te zijn dat we beschikbaar zijn.
                </p>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 20, border: '1px solid #e8edf5' }}>
                <iframe
                  title="AircoStunt locatie"
                  src="https://maps.google.com/maps?q=Veerplaat+10,+3313+LJ+Dordrecht&output=embed"
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`} className="d2-btn-primary" style={{ flex: 1, textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 015.11 12.75a19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Bel nu
                </a>
                <a href={`mailto:${SITE.email}`} className="d2-btn-outline" style={{ flex: 1, textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Stuur e-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: BESTELLEN (CHECKOUT)
// ══════════════════════════════════════════════════════════
function D2CartPage({ cart, onRemoveFromCart, onClearCart, navigate }) {
  const [form, setForm] = useState({
    naam: '', email: '', telefoon: '',
    datum: '', tijdslot: '09:00-12:00', opmerking: '',
  })
  const [errors, setErrors] = useState({})

  const total = cart.reduce((s, item) => s + item.priceFrom * item.qty, 0)

  const validate = () => {
    const e = {}
    if (!form.naam.trim()) e.naam = 'Naam is verplicht'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Geldig e-mailadres is verplicht'
    if (!form.telefoon.trim()) e.telefoon = 'Telefoonnummer is verplicht'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onClearCart()
    navigate(`${BASE}/bevestiging`)
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>
          <svg width="64" height="64" fill="none" stroke="#ccc" strokeWidth="1.5" viewBox="0 0 24 24" style={{ display: 'block', margin: '0 auto' }}>
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h2 style={{ color: '#003366', marginBottom: 12 }}>Uw winkelwagen is leeg</h2>
        <p style={{ color: '#666', marginBottom: 28 }}>Voeg producten toe om te kunnen bestellen.</p>
        <Link to={`${BASE}/producten`} className="d2-btn-primary" style={{ display: 'inline-flex' }}>
          Bekijk alle producten
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="d2-page-header">
        <h1>Bestelling plaatsen</h1>
        <p>Vul uw gegevens in en plan uw aftijdstip. Alleen afhalen bij onze locatie in Dordrecht.</p>
      </div>
      <section className="d2-section">
        <div className="d2-section-inner">
          <div className="d2-checkout-grid">
            <div className="d2-form-card">
              <h2>Uw gegevens</h2>
              <form onSubmit={handleSubmit}>
                <div className="d2-form-group">
                  <label>Naam *</label>
                  <input
                    type="text" required placeholder="Voor- en achternaam"
                    value={form.naam}
                    onChange={e => setForm(f => ({ ...f, naam: e.target.value }))}
                    style={errors.naam ? { borderColor: '#e53e3e' } : {}}
                  />
                  {errors.naam && <span style={{ fontSize: 12, color: '#e53e3e', marginTop: 4, display: 'block' }}>{errors.naam}</span>}
                </div>
                <div className="d2-form-row">
                  <div className="d2-form-group">
                    <label>E-mailadres *</label>
                    <input
                      type="email" required placeholder="uw@email.nl"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      style={errors.email ? { borderColor: '#e53e3e' } : {}}
                    />
                    {errors.email && <span style={{ fontSize: 12, color: '#e53e3e', marginTop: 4, display: 'block' }}>{errors.email}</span>}
                  </div>
                  <div className="d2-form-group">
                    <label>Telefoonnummer *</label>
                    <input
                      type="tel" required placeholder="06-12345678"
                      value={form.telefoon}
                      onChange={e => setForm(f => ({ ...f, telefoon: e.target.value }))}
                      style={errors.telefoon ? { borderColor: '#e53e3e' } : {}}
                    />
                    {errors.telefoon && <span style={{ fontSize: 12, color: '#e53e3e', marginTop: 4, display: 'block' }}>{errors.telefoon}</span>}
                  </div>
                </div>
                <div className="d2-form-row">
                  <div className="d2-form-group">
                    <label>Gewenste afhaaldatum</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={form.datum}
                      onChange={e => setForm(f => ({ ...f, datum: e.target.value }))}
                    />
                  </div>
                  <div className="d2-form-group">
                    <label>Gewenste afhaaltijdstip</label>
                    <select
                      value={form.tijdslot}
                      onChange={e => setForm(f => ({ ...f, tijdslot: e.target.value }))}
                    >
                      <option value="09:00-12:00">09:00 – 12:00</option>
                      <option value="12:00-16:00">12:00 – 16:00</option>
                      <option value="16:00-20:00">16:00 – 20:00</option>
                    </select>
                  </div>
                </div>
                <div className="d2-form-group">
                  <label>Opmerkingen (optioneel)</label>
                  <textarea
                    placeholder="Bijzonderheden, vragen over installatie, etc."
                    value={form.opmerking}
                    onChange={e => setForm(f => ({ ...f, opmerking: e.target.value }))}
                  />
                </div>
                <div className="d2-pickup-notice" style={{ marginBottom: 24 }}>
                  <strong>Alleen afhalen, geen verzending</strong>
                  <p>
                    Uw bestelling kunt u ophalen op: <strong style={{ display: 'inline' }}>Veerplaat 10, Dordrecht</strong><br />
                    Wij nemen na ontvangst van uw bestelling contact op om de aftijd te bevestigen.
                  </p>
                </div>
                <button type="submit" className="d2-btn-full">
                  Bestelling plaatsen →
                </button>
              </form>
            </div>

            <div className="d2-order-summary">
              <h3>Besteloverzicht</h3>
              {cart.map(item => (
                <div className="d2-order-item" key={item.id}>
                  <div>
                    <div className="d2-order-item-name">{item.name}</div>
                    <div className="d2-order-item-qty">Aantal: {item.qty}</div>
                  </div>
                  <div className="d2-order-item-price">€{(item.priceFrom * item.qty).toLocaleString('nl-NL')}</div>
                </div>
              ))}
              <div className="d2-order-total">
                <span>Totaal incl. BTW</span>
                <strong>€{total.toLocaleString('nl-NL')}</strong>
              </div>
              <div className="d2-pickup-notice">
                <strong>Afhaalinformatie</strong>
                <p>
                  Veerplaat 10, Dordrecht<br />
                  Ma–Vr 09:00–20:00 · Za 09:00–13:00<br />
                  <strong style={{ display: 'inline', fontSize: 12 }}>Bel altijd 30 min. van tevoren!</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ══════════════════════════════════════════════════════════
// PAGE: BEVESTIGING
// ══════════════════════════════════════════════════════════
function D2ConfirmationPage() {
  const orderNum = `AS-${Date.now().toString().slice(-6)}`

  return (
    <section className="d2-section">
      <div className="d2-section-inner">
        <div className="d2-confirm-wrap">
          <div className="d2-confirm-icon">
            <svg width="40" height="40" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h1>Uw bestelling is ontvangen!</h1>
          <p>Bedankt voor uw bestelling bij AircoStunt. Wij nemen binnen 2 uur contact met u op via telefoon of e-mail om de aftijd te bevestigen.</p>

          <div className="d2-confirm-box">
            <h3>Bevestigingsdetails</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['Ordernummer', orderNum],
                ['Afhaaladres', 'Veerplaat 10, Dordrecht'],
                ['Telefoon', SITE.phone],
                ['E-mail', SITE.email],
                ['Openingstijden', 'Ma–Vr 09:00–20:00 · Za 09:00–13:00'],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{
                  display: 'flex', justifyContent: 'space-between', gap: 16,
                  paddingTop: 12, paddingBottom: 12,
                  borderBottom: '1px solid #f0f0f5'
                }}>
                  <span style={{ fontSize: 14, color: '#888' }}>{lbl}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#003366', textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: '#fff8f0', borderRadius: 14, padding: '20px 24px',
            border: '1px solid #ffd4aa', marginBottom: 32, textAlign: 'left'
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <svg width="20" height="20" fill="none" stroke="#FF6600" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              <div>
                <strong style={{ color: '#cc5500', fontSize: 14, display: 'block', marginBottom: 4 }}>
                  Wij nemen contact op
                </strong>
                <p style={{ fontSize: 13, color: '#cc5500', lineHeight: 1.55 }}>
                  Binnen 2 uur ontvangt u een bevestiging via e-mail en/of telefoon. Bel ons altijd minimaal 30 minuten voor aankomst.
                </p>
              </div>
            </div>
          </div>

          <Link to={`${BASE}/producten`} className="d2-btn-primary" style={{ display: 'inline-flex', margin: '0 auto' }}>
            Verder winkelen
          </Link>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════
export default function Design2() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartBounce, setCartBounce] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartBounce(true)
    setTimeout(() => setCartBounce(false), 500)
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(i => i.id !== productId))
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="d2">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemoveFromCart={removeFromCart}
          navigate={navigate}
        />
      )}

      <Routes>
        <Route path="/" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2HomePage onAddToCart={addToCart} navigate={navigate} />
          </Layout>
        } />
        <Route path="merken" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2MerkenPage />
          </Layout>
        } />
        <Route path="producten" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2ProductenPage cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />
          </Layout>
        } />
        <Route path="over-ons" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2OverOnsPage />
          </Layout>
        } />
        <Route path="contact" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2ContactPage />
          </Layout>
        } />
        <Route path="bestellen" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2CartPage cart={cart} onRemoveFromCart={removeFromCart} onClearCart={clearCart} navigate={navigate} />
          </Layout>
        } />
        <Route path="bevestiging" element={
          <Layout cartCount={cartCount} onCartOpen={() => setCartOpen(true)} cartBounce={cartBounce}>
            <D2ConfirmationPage />
          </Layout>
        } />
      </Routes>

      <WhatsAppButton />

      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#003366', color: '#fff',
          padding: '10px 18px', borderRadius: 9999, textDecoration: 'none',
          fontSize: 13, fontWeight: 700, boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#FF6600' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#003366' }}
      >
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Alle ontwerpen
      </Link>
    </div>
  )
}
