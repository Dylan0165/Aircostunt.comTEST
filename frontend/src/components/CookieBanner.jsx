import { useState, useEffect } from 'react'

const STORAGE_KEY = 'aircostunt_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Small delay so it doesn't flash on initial load
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-primary-dark border-t border-white/10 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <p className="text-white/80 text-sm leading-relaxed">
            Wij gebruiken functionele cookies om de website goed te laten werken. Er worden geen
            persoonlijke gegevens bijgehouden of gedeeld met derden.{' '}
            <a href="#" className="text-accent hover:underline">Meer info</a>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
