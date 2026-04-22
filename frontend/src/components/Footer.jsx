import { useState } from 'react'
import { Link } from 'react-router-dom'
import PrivacyModal from './PrivacyModal'
import { SITE } from '../data/staticData'

const NAV_LINKS = [
  { label: 'Home', to: '/', type: 'route' },
  { label: 'Merken', to: '/merken', type: 'route' },
  { label: 'Producten', to: '/producten', type: 'route' },
  { label: 'Galerij', to: '/galerij', type: 'route' },
  { label: 'Over ons', to: '/over-ons', type: 'route' },
  { label: 'Contact', to: '/contact', type: 'route' },
]

const BRAND_NAMES = ['Daikin', 'Mitsubishi Heavy', 'Mitsubishi Electric', 'Samsung', 'LG']

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const { name: siteName, phone, email } = SITE
  const year = new Date().getFullYear()

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">{siteName}</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Split-unit airco's van A-merken voor de laagste prijs in Nederland.
              15 jaar ervaring. Alleen afhalen.
            </p>
            {/* USPs */}
            <div className="space-y-2">
              {[
                '✓ Grootste voorraad in de regio',
                '✓ 15 jaar ervaring',
                '✓ 2 jaar garantie',
                '✓ Contant & pin betalen',
              ].map((usp) => (
                <p key={usp} className="text-white/60 text-sm">{usp}</p>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Navigatie</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  {link.type === 'anchor' ? (
                    <a
                      href={link.to}
                      className="text-white/55 hover:text-white text-sm transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-white/55 hover:text-white text-sm transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Merken</h4>
            <ul className="space-y-2.5">
              {BRAND_NAMES.map((brand) => (
                <li key={brand}>
                  <span className="text-white/55 text-sm">{brand}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent" aria-hidden="true">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <a
                  href={`mailto:${email}`}
                  className="text-white/70 hover:text-white text-sm transition-colors duration-200 break-all"
                >
                  {email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent" aria-hidden="true">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                  </svg>
                </div>
                <div className="text-white/70 text-sm">
                  <span className="block">Ma–Vr: 09:00–20:00</span>
                  <span className="block">Za: 09:00–13:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} {siteName}. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200 underline underline-offset-2"
            >
              Privacybeleid
            </button>
            <p className="text-white/30 text-xs">
              Alleen afhalen, geen webshop
            </p>
          </div>
        </div>
      </div>

      {privacyOpen && <PrivacyModal onClose={() => setPrivacyOpen(false)} />}
    </footer>
  )
}
