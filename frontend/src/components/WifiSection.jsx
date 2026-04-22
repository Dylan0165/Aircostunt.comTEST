import { SITE } from '../data/staticData'

export default function WifiSection() {
  const apps = ['MyDaikin', 'MELCloud', 'SmartThings', 'LG ThinQ']
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Standaard inbegrepen
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5" style={{ letterSpacing: '-0.02em' }}>
              Gratis WiFi-module<br />bij elke airco
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Bedien uw airco eenvoudig via de smartphone-app. Elke split-unit die u bij ons afhaalt is voorzien van een ingebouwde wifi-module zonder extra kosten.
            </p>
            <div className="flex flex-wrap gap-3">
              {apps.map(app => (
                <span
                  key={app}
                  className="bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-2 rounded-full"
                >
                  {app}
                </span>
              ))}
            </div>
            <a
              href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}
              className="inline-flex items-center gap-2 mt-8 bg-accent hover:bg-accent-dark text-white px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
              </svg>
              Vraag naar de mogelijkheden
            </a>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-75" />
              <img
                src="/wifi.png"
                alt="WiFi module voor airco"
                className="relative max-w-xs w-full object-contain drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 20px 48px rgba(255,102,0,0.25))' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
