import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { BRANDS, SITE } from '../data/staticData'

function ProductModal({ product, onClose }) {
  const priceLabel = formatPrice(product.priceFrom, product.priceTo)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Fixed header */}
        <div className="flex items-center gap-4 p-5 border-b border-gray-100 flex-shrink-0">
          {product.image && (
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
              <img src={product.image} alt={product.name} className="max-w-[52px] max-h-[52px] object-contain" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            {product.brandId && (
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                {BRANDS.find((b) => b.id === product.brandId)?.name || ''}
              </span>
            )}
            <h2 className="text-lg font-bold text-primary leading-snug line-clamp-2">{product.name}</h2>
            <div className="flex items-baseline gap-2 mt-0.5">
              {priceLabel && <span className="text-accent font-bold text-xl">{priceLabel}</span>}
              <span className="text-xs text-gray-400">incl. BTW</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Sluiten"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            {product.inStock ? (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Op voorraad
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-400 text-xs font-bold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                Uitverkocht
              </span>
            )}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="spec-scroll overflow-y-auto flex-1 p-5 space-y-4">
          {/* Full specs table */}
          {product.specs && (
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Technische specificaties</div>
              <div className="rounded-xl overflow-hidden border border-gray-100">
                {[
                  ['Koelcapaciteit', product.specs.koelcapaciteit, true],
                  ['Verwarmingscapaciteit', product.specs.verwarmingscapaciteit, true],
                  ['Energielabel koeling', product.specs.energielabelKoeling, true],
                  ['Energielabel verwarming', product.specs.energielabelVerwarming, false],
                  ['SEER', product.specs.seer, false],
                  ['SCOP', product.specs.scop, false],
                  ['Geluid binnen', product.specs.geluidBinnen, false],
                  ['Geluid buiten', product.specs.geluidBuiten, false],
                  ['Koudemiddel', product.specs.koudemiddel, false],
                  ['Afmetingen binnenunit', product.specs.afmetingenBinnen, false],
                  ['Gewicht binnenunit', product.specs.gewichtBinnen, false],
                  ['WiFi', product.specs.wifi, true],
                  ['Geschikt voor', product.specs.geschiktVoor, true],
                  ['Stroomverbruik', product.specs.verbruikNominaal, false],
                  product.specs.aantalBinnenunits && ['Aantal binnenunits', product.specs.aantalBinnenunits, false],
                ].filter(Boolean).map(([label, value, highlight], i) => value && (
                  <div key={i} className={`flex justify-between items-center px-4 py-3 text-sm gap-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    style={{ borderLeft: highlight ? '3px solid #FF6600' : '3px solid transparent' }}>
                    <span className="text-gray-500 font-medium flex-shrink-0">{label}</span>
                    <span className={`font-bold text-right ${highlight ? 'text-primary' : 'text-gray-700'}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features if no specs */}
          {!product.specs && product.features && product.features.length > 0 && (
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Kenmerken</div>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Fixed footer CTA */}
        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <a
            href={`tel:${SITE.phone.replace(/[^0-9+]/g,'')}`}
            className="flex items-center justify-center gap-2 w-full text-center bg-accent hover:bg-accent-dark text-white font-bold py-3 rounded-xl transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
            </svg>
            Bel voor meer info
          </a>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function formatPrice(from, to) {
  if (!from) return null
  if (to && to > from) {
    return `€${from.toLocaleString('nl-NL')} – €${to.toLocaleString('nl-NL')}`
  }
  return `Vanaf €${from.toLocaleString('nl-NL')}`
}

function ProductCard({ product, brands, onInfoClick }) {
  const [ref, isVisible] = useIntersectionObserver()
  const priceLabel = formatPrice(product.priceFrom, product.priceTo)

  return (
    <div
      ref={ref}
      onClick={() => onInfoClick(product)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onInfoClick(product)}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} frost-card group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 border border-gray-100 flex flex-col cursor-pointer`}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-50 overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full img-placeholder flex items-center justify-center">
            <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 text-white/30" aria-hidden="true">
              <rect x="8" y="14" width="48" height="28" rx="4" stroke="currentColor" strokeWidth="2"/>
              <rect x="20" y="46" width="24" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 28h32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3"/>
            </svg>
          </div>
        )}
        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              Op voorraad
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-gray-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
              Uitverkocht
            </span>
          )}
        </div>
        {/* Brand label */}
        {product.brandId && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {brands.find((b) => b.id === product.brandId)?.name || ''}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-primary text-base mb-1 leading-snug">{product.name}</h3>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-1 mb-4 mt-2">
            {product.features.slice(0, 4).map((feature, i) => (
              <li key={i} className="flex items-start gap-1.5 text-gray-600 text-sm">
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          {priceLabel ? (
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Prijs</span>
              <p className="text-primary font-bold text-lg leading-tight">{priceLabel}</p>
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Prijs op aanvraag</span>
          )}

          <button
            onClick={() => onInfoClick(product)}
            className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:underline group/link"
          >
            Info
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products({ products, brands }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sectionRef, sectionVisible] = useIntersectionObserver()

  const filteredProducts =
    activeFilter === 'all'
      ? products
      : products.filter((p) => p.brandId === activeFilter)

  return (
    <section id="producten" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-10`}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            Direct afhalen
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Onze Producten</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Split-unit airco's voor iedere ruimte. Altijd scherp geprijsd, altijd op voorraad.
          </p>
        </div>

        {/* Brand filter */}
        {brands.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Alle merken
            </button>
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setActiveFilter(brand.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeFilter === brand.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        )}

        {/* Product grid — max 3 cols om wezenloos orphan te vermijden */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} brands={brands} onInfoClick={setSelectedProduct} />
          ))}
        </div>

        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-gray-300" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Geen producten gevonden voor dit merk.</p>
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-14 bg-primary rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-xl mb-1">Twijfel je over welk model?</h3>
              <p className="text-white/70 text-sm">Bel ons vrijblijvend, we helpen je graag het juiste model kiezen.</p>
            </div>
            <a
              href="tel:06-14700753"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
              </svg>
              Bel ons nu
            </a>
          </div>
      </div>
    </section>
  )
}
