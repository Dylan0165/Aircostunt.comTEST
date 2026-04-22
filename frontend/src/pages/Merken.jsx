import Brands from '../components/Brands'
import { BRANDS } from '../data/staticData'

export default function Merken() {
  return (
    <>
      {/* Page hero banner */}
      <div
        className="pt-28 pb-12 text-center"
        style={{ background: 'linear-gradient(145deg, #001a33 0%, #003366 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            A-merken
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Onze Merken</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Wij leveren uitsluitend split-unit airco&apos;s van de beste A-merken ter wereld: Daikin, Mitsubishi, Samsung, LG en meer.
          </p>
        </div>
      </div>

      <Brands brands={BRANDS} />
    </>
  )
}
