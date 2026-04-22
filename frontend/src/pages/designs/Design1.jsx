import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Home from '../Home'
import Footer from '../../components/Footer'
import CookieBanner from '../../components/CookieBanner'

export default function Design1() {
  return (
    <div className="font-sans min-h-screen">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
      <CookieBanner />

      {/* Back button */}
      <Link
        to="/"
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#003366', color: '#fff',
          padding: '11px 20px', borderRadius: 9999, textDecoration: 'none',
          fontSize: 13, fontWeight: 700, boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.15)',
          transition: 'all 0.2s',
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
