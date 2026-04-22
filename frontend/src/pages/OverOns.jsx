import About from '../components/About'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function OverOns() {
  return (
    <>
      {/* Page hero banner */}
      <div
        className="pt-28 pb-12 text-center"
        style={{ background: 'linear-gradient(145deg, #001a33 0%, #003366 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Over AircoStunt
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Over ons &amp; Contact</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            15 jaar ervaring als betrouwbare groothandel in split-unit airconditioners in de regio Dordrecht.
          </p>
        </div>
      </div>

      <About />
      <FAQ />
      <Contact />
    </>
  )
}
