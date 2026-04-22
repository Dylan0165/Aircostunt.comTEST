import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { SITE, OPENING_HOURS } from '../data/staticData'

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-accent" aria-hidden="true">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
    </svg>
  )
}

export default function Contact() {
  const [sectionRef, sectionVisible] = useIntersectionObserver()
  const [colLeftRef, colLeftVisible] = useIntersectionObserver()
  const [colRightRef, colRightVisible] = useIntersectionObserver()

  const { phone, email, address } = SITE
  const {
    weekdaysFrom,
    weekdaysTo,
    saturdayFrom,
    saturdayTo,
    sundayClosed,
    callAheadMinutes: callAhead,
    extraNote,
  } = OPENING_HOURS

  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`
  const mailHref = `mailto:${email}`

  return (
    <section
      id="contact"
      className="py-20 relative"
      style={{
        background: 'linear-gradient(145deg, #001a33 0%, #003366 100%)',
      }}
    >
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 -translate-y-px" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-12 sm:h-16 fill-gray-50">
          <path d="M0,0 C480,60 960,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-14`}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <ClockIcon />
            Openingstijden & contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kom langs of bel ons</h2>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Fysieke afhaling vanuit onze showroom. Bel gerust van tevoren.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Opening Hours card */}
          <div
            ref={colLeftRef}
            className={`animate-on-scroll ${colLeftVisible ? 'is-visible' : ''} bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <ClockIcon />
              </div>
              <h3 className="text-white font-bold text-xl">Openingstijden</h3>
            </div>

            {/* Opening hours rows */}
            <div className="space-y-3">
              {/* Weekdays */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80 font-medium">Maandag – Vrijdag</span>
                  <span className="text-white font-semibold">
                    {weekdaysFrom} – {weekdaysTo}
                  </span>
                </div>

                {/* Saturday */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80 font-medium">Zaterdag</span>
                  <span className="text-white font-semibold">
                    {saturdayFrom} – {saturdayTo}
                  </span>
                </div>

                {/* Sunday */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-white/80 font-medium">Zondag</span>
                  <span className={sundayClosed ? 'text-gray-400 font-semibold' : 'text-white font-semibold'}>
                    {sundayClosed ? 'Gesloten' : 'Open'}
                  </span>
                </div>

                {/* Call-ahead notice */}
                {callAhead > 0 && (
                  <div className="flex items-start gap-3 mt-4 bg-accent/15 border border-accent/30 rounded-xl p-4">
                    <PhoneIcon />
                    <p className="text-white/85 text-sm leading-relaxed">
                      <strong className="text-white">Bel {callAhead} minuten van tevoren</strong> zodat we je order klaarleggen.
                    </p>
                  </div>
                )}

                {/* Extra note */}
                {extraNote && (
                  <div className="mt-3 bg-white/8 rounded-xl p-3">
                    <p className="text-white/70 text-sm">{extraNote}</p>
                  </div>
                )}
            </div>
          </div>

          {/* Contact info card */}
          <div
            ref={colRightRef}
            className={`animate-on-scroll ${colRightVisible ? 'is-visible' : ''} bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <PhoneIcon />
              </div>
              <h3 className="text-white font-bold text-xl">Contactgegevens</h3>
            </div>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-light/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Telefoon</p>
                  <a
                    href={telHref}
                    className="text-white font-semibold text-lg hover:text-accent transition-colors duration-200"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary-light/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <EmailIcon />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">E-mail</p>
                  <a
                    href={mailHref}
                    className="text-white font-semibold hover:text-accent transition-colors duration-200 break-all"
                  >
                    {email}
                  </a>
                </div>
              </div>

              {/* Address */}
              {address && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-light/40 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <LocationIcon />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Adres</p>
                    <p className="text-white font-semibold leading-snug whitespace-pre-line">{address}</p>
                  </div>
                </div>
              )}

              {/* Pickup only notice */}
              <div className="flex items-start gap-4 mt-2">
                <div className="w-10 h-10 bg-primary-light/40 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CarIcon />
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wide mb-0.5">Ophaallocatie</p>
                  <p className="text-white font-semibold">Alleen afhalen</p>
                  <p className="text-white/60 text-sm">Wij verzenden niet. Kom langs in onze showroom.</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={telHref}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105"
              >
                <PhoneIcon />
                Bel nu
              </a>
              <a
                href={mailHref}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              >
                <EmailIcon />
                Stuur e-mail
              </a>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-white/10 h-64">
          <iframe
            title="Aircostunt locatie"
            src="https://maps.google.com/maps?q=Veerplaat+10,+3313+LJ+Dordrecht&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
