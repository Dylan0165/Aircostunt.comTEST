import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const REVIEWS = [
  {
    text: 'Super geholpen, goede uitleg gehad over de airco\'s en het verschil. Goede scherpe prijs.',
    name: 'Vincent Haar',
    stars: 5,
    period: '8 maanden geleden',
  },
  {
    text: 'Altijd de beste airco\'s, altijd de beste prijs, altijd vriendelijke ontvangst! Ron & René denken met je mee en niets is ze teveel moeite, we komen hier al jaren.',
    name: 'Inge Schalij',
    stars: 5,
    period: '2 jaar geleden',
  },
  {
    text: 'Ik kocht 2 Daikin FTXC airconditioning model 2022. Alles was efficiënt en snel geregeld, ik werd ook goed geadviseerd over airconditioning.',
    name: 'Kamil Zimolag',
    stars: 5,
    period: '3 jaar geleden',
  },
  {
    text: 'Goede kwaliteit en prijs, zeer vriendelijk en behulpzaam personeel die weten waar het over gaat. René ga zo door, dank!',
    name: 'Leo Peters',
    stars: 5,
    period: '2 jaar geleden',
  },
  {
    text: 'Zeer aardig persoon met uitstekende kennis van airco\'s. Zeer concurrerende prijzen en dienstverlening.',
    name: 'MC',
    stars: 5,
    period: '4 jaar geleden',
  },
  {
    text: 'Een bedrijf waar je zelfs in de avond je airco kan ophalen, en met goede service! Bedankt!',
    name: 'G-J Gmail',
    stars: 5,
    period: '3 jaar geleden',
  },
  {
    text: 'Vriendelijk geholpen, eerlijk advies. Mooie kwaliteit. Aanrader!',
    name: 'Janet Rietveld',
    stars: 5,
    period: '4 jaar geleden',
  },
  {
    text: 'Snel, efficiënt en naar mijn idee krijg je echt de laagste prijs.',
    name: 'DCrom',
    stars: 5,
    period: '2 jaar geleden',
  },
  {
    text: 'Correct en vriendelijk aan de telefoon en op locatie, volgens afspraak op tijd. Goed geregeld.',
    name: 'Aad van den Hoogen',
    stars: 4,
    period: '3 jaar geleden',
  },
]

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i < count ? 'text-[#FBBC04]' : 'text-gray-200'}`} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  const [ref, isVisible] = useIntersectionObserver()
  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} bg-white rounded-2xl p-5 shadow-card border border-gray-100 flex flex-col`}
    >
      {/* Top row: stars + Google */}
      <div className="flex items-center justify-between mb-3">
        <Stars count={review.stars} />
        {/* Google G icon */}
        <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google review" role="img">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">&ldquo;{review.text}&rdquo;</p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-bold text-sm">{review.name[0]}</span>
          </div>
          <div>
            <p className="text-primary font-semibold text-sm leading-none">{review.name}</p>
            {review.period && <p className="text-gray-400 text-xs mt-0.5">{review.period}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const [sectionRef, sectionVisible] = useIntersectionObserver()

  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={sectionRef}
          className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} text-center mb-10`}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            Klantervaringen
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Wat klanten zeggen</h2>

          {/* Google score badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm mt-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 text-lg leading-none">4,8</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#FBBC04]" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-gray-400 text-sm">· 23 Google reviews</span>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
