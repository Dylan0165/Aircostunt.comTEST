import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE } from '../data/staticData'

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

const getNavLinks = (base) => [
  { label: 'Home', to: `${base}/`, type: 'route' },
  { label: 'Merken', to: `${base}/merken`, type: 'route' },
  { label: 'Producten', to: `${base}/producten`, type: 'route' },
  { label: 'Over ons', to: `${base}/over-ons`, type: 'route' },
  { label: 'Contact', to: `${base}/contact`, type: 'route' },
]

export default function Header({ base = '/design/1' }) {
  const NAV_LINKS = getNavLinks(base)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const phone = SITE.phone
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary shadow-xl border-b border-white/5'
          : 'bg-primary shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site name */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <img
                  src="/logo.png"
                  alt=""
                  className="w-7 h-7 object-contain"
                  aria-hidden="true"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <span className="text-white font-bold text-lg tracking-tight leading-none">
                Airco<span className="text-accent">Stunt</span>
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Hoofdnavigatie">
            {NAV_LINKS.map((link) =>
              link.type === 'anchor' ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 text-white/75 hover:text-white hover:bg-white/5"
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-accent bg-white/10'
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Phone CTA — desktop */}
          <div className="hidden md:block">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <PhoneIcon />
              {phone}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        } bg-primary-dark border-t border-white/10`}
      >
        <nav className="px-4 py-4 space-y-1" aria-label="Mobiele navigatie">
          {NAV_LINKS.map((link) =>
            link.type === 'anchor' ? (
              <a
                key={link.to}
                href={link.to}
                className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-accent bg-white/10'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            )
          )}
          <div className="pt-2">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 w-full justify-center"
            >
              <PhoneIcon />
              {phone}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
