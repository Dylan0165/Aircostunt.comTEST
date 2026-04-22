import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

function AccessoryCard({ accessory }) {
  const [ref, isVisible] = useIntersectionObserver()

  const priceDisplay = accessory.priceUnit
    ? `€${accessory.price} ${accessory.priceUnit}`
    : `€${accessory.price}`

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} frost-card group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col`}
    >
      {/* Image */}
      <div className="h-44 overflow-hidden">
        {accessory.image ? (
          <img
            src={accessory.image}
            alt={accessory.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full img-placeholder-light flex items-center justify-center">
            <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-primary/30" aria-hidden="true">
              <rect x="8" y="16" width="32" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 16v-2a4 4 0 018 0v2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="24" cy="26" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-primary text-base mb-2 leading-snug">{accessory.name}</h3>
        {accessory.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {accessory.description}
          </p>
        )}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <span className="text-accent font-bold text-xl">{priceDisplay}</span>
        </div>
      </div>
    </div>
  )
}

export default function Accessories({ accessories }) {
  const [sectionRef, sectionVisible] = useIntersectionObserver()

  return (
    <section id="accessoires" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-14`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
            </svg>
            Montage & installatie
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Accessoires</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Alles voor een complete installatie: montagebeugels, leidingen en kokers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {accessories.map((accessory) => (
            <AccessoryCard key={accessory.id} accessory={accessory} />
          ))}
        </div>
      </div>
    </section>
  )
}
