import Products from '../components/Products'
import Accessories from '../components/Accessories'
import { PRODUCTS, ACCESSORIES, BRANDS } from '../data/staticData'

export default function Producten() {
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
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            Direct afhalen uit showroom
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Producten &amp; Accessoires</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Split-unit airco&apos;s van A-merken én alle benodigde accessoires voor een complete installatie.
          </p>
        </div>
      </div>

      <Products products={PRODUCTS} brands={BRANDS} />
      <Accessories accessories={ACCESSORIES} />
    </>
  )
}
