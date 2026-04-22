import { useEffect } from 'react'

export default function PrivacyModal({ onClose }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Privacybeleid"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary">Privacybeleid</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Sluiten"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 text-sm text-gray-600 leading-relaxed">
          <p className="text-gray-400 text-xs">Laatste wijziging: april 2026</p>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">1. Wie zijn wij?</h3>
            <p>
              V.O.F. Aircostunt, gevestigd aan Veerplaat 10, 3313 LJ Dordrecht, KvK-nummer 85035718.
              Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid.
              Vragen? Stuur een e-mail naar{' '}
              <a href="mailto:info@aircostunt.com" className="text-accent hover:underline">info@aircostunt.com</a>.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">2. Welke gegevens verwerken wij?</h3>
            <p>Wij verwerken alleen gegevens die u zelf aan ons verstrekt, zoals:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Naam</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>Bericht dat u via het contactformulier stuurt</li>
            </ul>
            <p className="mt-2">
              Wij verzamelen geen gegevens via cookies, tracking-pixels of analysesoftware van derden.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">3. Waarvoor gebruiken wij uw gegevens?</h3>
            <p>Uw gegevens worden uitsluitend gebruikt om:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Uw vraag of aanvraag te beantwoorden</li>
              <li>Een afspraak in te plannen voor het afhalen van een product</li>
            </ul>
            <p className="mt-2">
              Wij verkopen uw gegevens nooit aan derden en verstrekken ze niet zonder uw toestemming.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">4. Hoe lang bewaren wij uw gegevens?</h3>
            <p>
              Wij bewaren uw persoonsgegevens niet langer dan nodig is voor het doel waarvoor ze zijn
              verstrekt. In de meeste gevallen maximaal 1 jaar na uw laatste contact met ons.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">5. Cookies</h3>
            <p>
              Deze website gebruikt uitsluitend functionele cookies die nodig zijn voor een goede werking
              van de site. Er worden geen marketing- of trackingcookies geplaatst. Functionele cookies
              vereisen geen toestemming onder de AVG.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">6. Beveiliging</h3>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te
              beschermen tegen verlies of onrechtmatig gebruik.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-primary text-base mb-1">7. Uw rechten (AVG)</h3>
            <p>U heeft het recht om:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Uw gegevens in te zien</li>
              <li>Uw gegevens te corrigeren of te laten verwijderen</li>
              <li>Bezwaar te maken tegen de verwerking</li>
            </ul>
            <p className="mt-2">
              Stuurt u hiervoor een e-mail naar{' '}
              <a href="mailto:info@aircostunt.com" className="text-accent hover:underline">info@aircostunt.com</a>.
              Wij reageren binnen 30 dagen. U kunt ook een klacht indienen bij de{' '}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Autoriteit Persoonsgegevens
              </a>.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-xl transition-colors duration-200"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  )
}
