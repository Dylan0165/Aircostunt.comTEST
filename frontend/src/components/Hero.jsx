import { Link } from 'react-router-dom'
import { SITE } from '../data/staticData'

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

const USP_ITEMS = [
  { icon: '★', text: '15 jaar ervaring' },
  { icon: '📦', text: 'Grootste voorraad in de regio' },
  { icon: '🛡', text: '2 jaar garantie' },
  { icon: '💳', text: 'Contant & pin' },
]

// Decoratieve koele luchtpartikels voor de hero
const PARTICLES = [
  { left: '7%',  delay: '0s',    dur: '9s',  size: 3 },
  { left: '14%', delay: '2.1s',  dur: '12s', size: 2 },
  { left: '22%', delay: '0.7s',  dur: '8s',  size: 4 },
  { left: '31%', delay: '3.4s',  dur: '11s', size: 2 },
  { left: '40%', delay: '1.3s',  dur: '10s', size: 3 },
  { left: '50%', delay: '4.2s',  dur: '9s',  size: 2 },
  { left: '59%', delay: '0.9s',  dur: '13s', size: 3 },
  { left: '67%', delay: '2.7s',  dur: '8s',  size: 2 },
  { left: '75%', delay: '5s',    dur: '11s', size: 4 },
  { left: '83%', delay: '1.8s',  dur: '10s', size: 2 },
  { left: '91%', delay: '3.1s',  dur: '12s', size: 3 },
  { left: '97%', delay: '0.4s',  dur: '9s',  size: 2 },
]

export default function Hero() {
  const { heroTitle: title, heroSubtitle: subtitle, heroCtaText: ctaText, phone } = SITE
  const telHref = `tel:${phone.replace(/[^0-9+]/g, '')}`

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #001a33 0%, #003366 45%, #004080 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Large circle top-right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF6600 0%, transparent 70%)' }}
        />
        {/* Small circle bottom-left */}
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
        />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Zwevende koele luchtpartikels */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="air-particle"
            style={{
              left: p.left,
              bottom: 0,
              width: p.size,
              height: p.size,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}

      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            Grootste airco voorraad in de regio
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/75 leading-relaxed mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: '200ms' }}>
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up" style={{ animationDelay: '300ms' }}>
            <Link
              to="/producten"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:shadow-2xl hover:scale-105 group"
            >
              {ctaText}
              <ArrowRightIcon />
            </Link>
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-200 hover:border-white/40 backdrop-blur-sm"
            >
              <PhoneIcon />
              {phone}
            </a>
          </div>

          {/* USP strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up" style={{ animationDelay: '400ms' }}>
            {USP_ITEMS.map((usp) => (
              <div
                key={usp.text}
                className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 backdrop-blur-sm"
              >
                <span className="text-lg">{usp.icon}</span>
                <span className="text-white/85 text-sm font-medium leading-tight">{usp.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20 fill-white"
        >
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  )
}
