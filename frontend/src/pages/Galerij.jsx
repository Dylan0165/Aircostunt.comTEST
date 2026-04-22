import { useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { GALLERY_IMAGES } from '../data/staticData'

function LightboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zM9 21l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zM21 15l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )
}

function ChevronIcon({ dir }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7" aria-hidden="true">
      {dir === 'left'
        ? <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        : <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />}
    </svg>
  )
}

function GalleryCard({ image, index, onOpen }) {
  const [ref, isVisible] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'is-visible' : ''} group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer`}
      onClick={() => onOpen(index)}
      role="button"
      tabIndex={0}
      aria-label={`Vergroot: ${image.alt}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(index) }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300 flex items-center justify-center">
        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <LightboxIcon />
        </span>
      </div>
      {/* Caption */}
      {image.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium">{image.caption}</p>
        </div>
      )}
    </div>
  )
}

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Foto lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Sluiten"
      >
        <CloseIcon />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Vorige foto"
        >
          <ChevronIcon dir="left" />
        </button>
      )}

      {/* Image */}
      <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center gap-3">
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="max-h-[78vh] w-auto max-w-full rounded-xl object-contain"
        />
        {images[index].caption && (
          <p className="text-white/70 text-sm text-center">{images[index].caption}</p>
        )}
        <p className="text-white/40 text-xs">{index + 1} / {images.length}</p>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Volgende foto"
        >
          <ChevronIcon dir="right" />
        </button>
      )}
    </div>
  )
}

export default function Galerij() {
  const [sectionRef, sectionVisible] = useIntersectionObserver()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const images = GALLERY_IMAGES
  const isEmpty = images.length === 0

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((i) => (i - 1 + images.length) % images.length)
  const nextImage = () => setLightboxIndex((i) => (i + 1) % images.length)

  return (
    <>
      {/* Page hero */}
      <div
        className="pt-28 pb-16 text-center"
        style={{ background: 'linear-gradient(145deg, #001a33 0%, #003366 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            Galerij
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">Onze showroom & producten</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Een kijkje in onze showroom, leidingen, installaties en onze airco&apos;s van dichtbij.
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isEmpty ? (
            // Placeholder als er nog geen foto's zijn
            <div
              ref={sectionRef}
              className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''}`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-2 text-primary/30"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8" aria-hidden="true">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                    <span className="text-xs font-medium">Foto {i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-400 mt-8 text-sm">
                Voeg foto&apos;s toe via <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">src/data/staticData.js</code>, zie de uitgecommentarieerde voorbeelden.
              </p>
            </div>
          ) : (
            <div
              ref={sectionRef}
              className={`animate-on-scroll ${sectionVisible ? 'is-visible' : ''} grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 stagger-children`}
            >
              {images.map((image, i) => (
                <GalleryCard key={image.src} image={image} index={i} onOpen={openLightbox} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </>
  )
}
