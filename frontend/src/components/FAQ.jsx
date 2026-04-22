import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const FAQS = [
  {
    question: 'Wat zijn jullie openingstijden?',
    answer:
      'Wij zijn 6 dagen per week telefonisch bereikbaar, van maandag t/m zaterdag. U kunt uw airco afhalen van maandag t/m vrijdag van 09:00 tot 20:00 uur. Zaterdag zijn we open voor afhalen van 09:00 tot 13:00 uur. Afhalen altijd na telefonische afspraak via 06-147 00 753. Bel altijd minimaal 30 minuten van tevoren.',
  },
  {
    question: 'Kan ik de airco ook door jullie laten installeren?',
    answer:
      'Wij installeren de airco niet zelf, maar geven bij ophalen wel gratis advies van onze gecertificeerde monteur. U dient zelf zorg te dragen voor een deugdelijke inbedrijfstelling door een gecertificeerd F-gassen bedrijf.',
  },
  {
    question: 'Heb ik garantie op mijn nieuwe airco?',
    answer:
      'Op elke airco krijgt u standaard 2 jaar fabrieksgarantie op onderdelen, mits de airco vakkundig en correct volgens de F-gasreglementen geïnstalleerd en in bedrijf gesteld is.',
  },
  {
    question: 'Kunnen jullie de airco ook bezorgen?',
    answer:
      'Nee, wij bezorgen niet. Wij zijn een groothandel en verkopen uitsluitend via afhalen vanuit onze locatie in Dordrecht (Veerplaat 10). Dit is één van de redenen waarom we zo scherp geprijsd zijn.',
  },
  {
    question: 'Mag ik het aircosysteem zelf monteren en aansluiten?',
    answer:
      'Het mechanisch monteren (beugel, leidingen, bedrading) mag u zelf doen. Het koelmiddelgedeelte (aansluiting koelleidingen en vacumeren) moet echter altijd worden uitgevoerd door een gecertificeerd F-gassen bedrijf. Dit is wettelijk verplicht.',
  },
  {
    question: 'Hoe kunnen jullie zo goedkoop leveren?',
    answer:
      'Wij werken als groothandel en slaan grote voorraden in. Door te verkopen vanuit voorraad zonder webshoplogistiek, tussenhandel of werkplaatskosten houden wij de prijs laag. Wij geven geen kortingen; die heeft u al in onze basisprijs verwerkt.',
  },
  {
    question: 'Welk koudemiddel gebruiken jullie?',
    answer:
      'Al onze airco\'s werken met R32 koudemiddel. Dit is het milieuvriendelijkste koudemiddel dat momenteel beschikbaar is voor split-unit systemen. R32 heeft een lagere Global Warming Potential (GWP) dan het oudere R410A.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} border border-gray-200 rounded-2xl overflow-hidden`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left px-6 py-5 bg-white hover:bg-gray-50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-primary text-base pr-4">{faq.question}</span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border-2 border-primary/20 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? 'rotate-45 bg-accent border-accent' : ''
          }`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-primary'}`} aria-hidden="true">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const [sectionRef, sectionVisible] = useIntersectionObserver()

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-12`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/8 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M11.07 12.85c.77-1.39 2.25-2.21 3.11-3.44.91-1.29.4-3.7-2.18-3.7-1.69 0-2.52 1.28-2.87 2.34L7.1 7.05C7.83 4.99 9.75 3 12.04 3c2.51 0 4.06 1.32 4.75 2.69.57 1.15.64 3.06-.98 4.55-.86.79-2.18 1.62-2.62 2.45-.17.32-.24.52-.24 1.52H11c.01-.55.06-1.45.07-1.36zm1.43 5.15c-.91 0-1.64-.73-1.64-1.64 0-.91.73-1.64 1.64-1.64s1.64.73 1.64 1.64c0 .91-.73 1.64-1.64 1.64z"/>
            </svg>
            Veelgestelde vragen
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            Heeft u een vraag?
          </h2>
          <p className="text-gray-500 text-lg">
            De meest gestelde vragen op een rij. Staat uw vraag er niet bij? Bel ons gerust.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-3">Staat uw vraag er niet bij?</p>
          <a
            href="tel:06-14700753"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/>
            </svg>
            Bel ons: 06-147 00 753
          </a>
        </div>
      </div>
    </section>
  )
}
