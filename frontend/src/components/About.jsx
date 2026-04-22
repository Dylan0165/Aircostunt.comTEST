import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
      </svg>
    ),
    title: 'Koelen & verwarmen',
    desc: 'Alle airco\'s kunnen zowel koelen als verwarmen, energiezuinig per kamer.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
    title: 'Direct afhalen',
    desc: 'Bijna alle sets zijn direct af te halen vanuit onze showroom in Dordrecht.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
      </svg>
    ),
    title: '15 jaar ervaring',
    desc: 'Wij kennen de markt door en door. Eerlijk advies, geen verkooppraatjes.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    title: '2 jaar garantie',
    desc: 'Op elke airco standaard 2 jaar fabrieksgarantie op onderdelen.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    ),
    title: 'Gratis wifi bij Daikin',
    desc: 'Daikin airco\'s worden standaard geleverd met een ingebouwde wifi-module.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    ),
    title: 'Gratis montage-advies',
    desc: 'Bij ophalen geeft onze gecertificeerde monteur gratis advies over de installatie.',
  },
]

export default function About() {
  const [sectionRef, sectionVisible] = useIntersectionObserver()
  const [textRef, textVisible] = useIntersectionObserver()

  return (
    <section id="over-ons" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-14`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            Over ons
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Airco van Aircostunt</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Al 15 jaar de betrouwbare groothandel voor split-unit airconditioning. Geen webshop, maar persoonlijk contact en eerlijke prijzen.
          </p>
        </div>

        {/* Story + quote */}
        <div
          ref={textRef}
          className={`animate-on-scroll ${textVisible ? 'is-visible' : ''} max-w-3xl mx-auto mb-14 text-center`}
        >
          <div className="space-y-4 text-gray-600 text-base leading-relaxed">
            <p>
              Met een airco van Aircostunt haal je A-kwaliteit split-unit airconditioning in huis,
              waarmee je jarenlang het hoofd koel houdt. We zijn groot geworden door voor goede prijzen
              kwaliteitsairco&apos;s te verkopen. Geen 100 modellen zodat je door de bomen het bos niet meer ziet.
            </p>
            <p>
              We zijn <strong>geen webwinkel</strong>, maar verkopen als groothandel vanuit voorraad. Bijna alle sets zijn
              direct af te halen vanuit onze locatie in Dordrecht. Nooit eerder kon je voor zo&apos;n lage prijs
              een kwaliteitsairco in huis halen. Het hele jaar door de nieuwste R32-modellen voor de beste prijs.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {FEATURES.map((f) => {
            const [ref, isVisible] = [null, true]
            return (
              <FeatureCard key={f.title} feature={f} />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }) {
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4 items-start`}
    >
      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
        {feature.icon}
      </div>
      <div>
        <h3 className="font-bold text-primary text-base mb-1">{feature.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </div>
  )
}
