import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

function BrandCard({ brand }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} frost-card group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center`}
    >
      {/* Brand initial placeholder */}
      <div className="w-full h-28 bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden p-3">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="max-h-20 max-w-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            style={{ mixBlendMode: 'multiply' }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full img-placeholder-light rounded-xl flex items-center justify-center">
            <span className="text-primary font-bold text-xl tracking-wide">{brand.name}</span>
          </div>
        )}
      </div>

      {/* Brand name */}
      <h3 className="font-bold text-primary text-lg mb-2">{brand.name}</h3>

      {/* Description */}
      {brand.description && (
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{brand.description}</p>
      )}
    </div>
  )
}

export default function Brands({ brands }) {
  const [sectionRef, sectionVisible] = useIntersectionObserver()

  return (
    <section id="merken" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-14`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            A-merken
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Onze Merken</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Wij leveren uitsluitend split-unit airco's van de beste merken ter wereld.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 stagger-children">
          {brands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
        </div>
      </div>
    </section>
  )
}
