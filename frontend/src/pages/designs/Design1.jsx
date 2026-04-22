import { Routes, Route, Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CookieBanner from '../../components/CookieBanner'
import WhatsAppButton from '../../components/WhatsAppButton'
import Home from '../Home'
import Merken from '../Merken'
import Producten from '../Producten'
import OverOns from '../OverOns'
import ContactPage from '../ContactPage'

const BASE = '/design/1'

function Layout({ children }) {
  return (
    <div className="font-sans min-h-screen">
      <Header base={BASE} />
      <main>{children}</main>
      <Footer base={BASE} />
      <CookieBanner />
    </div>
  )
}

export default function Design1() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="merken" element={<Layout><Merken /></Layout>} />
        <Route path="producten" element={<Layout><Producten /></Layout>} />
        <Route path="over-ons" element={<Layout><OverOns /></Layout>} />
        <Route path="contact" element={<Layout><ContactPage /></Layout>} />
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
    </>
  )
}
