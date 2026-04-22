/**
 * AircoStunt — Statische websitedata
 *
 * Pas dit bestand aan om teksten, producten, prijzen en openingstijden
 * bij te werken. Geen CMS nodig — gewoon opslaan en opnieuw bouwen.
 */

// ─── Bedrijfsinformatie ────────────────────────────────────────────────────────
export const SITE = {
  name: 'AircoStunt',
  phone: '06-147 00 753',
  email: 'info@aircostunt.com',
  address: 'Veerplaat 10, Dordrecht',
  heroTitle: "Airco's van A-merken voor de laagste prijs",
  heroSubtitle:
    'Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Afhalen uit onze showroom, geen wachttijden.',
  heroCtaText: 'Bekijk onze producten',
}

// ─── Openingstijden ────────────────────────────────────────────────────────────
export const OPENING_HOURS = {
  weekdaysFrom: '09:00',
  weekdaysTo: '20:00',
  saturdayFrom: '09:00',
  saturdayTo: '13:00',
  sundayClosed: true,
  callAheadMinutes: 30,
  extraNote: 'Altijd bellen voor u langs komt!',
}

// ─── Merken ────────────────────────────────────────────────────────────────────
export const BRANDS = [
  {
    id: 'daikin',
    name: 'Daikin',
    description:
      'Japans topkwaliteit. Bekend om stille werking, energiezuinigheid en ingebouwde wifi.',
  },
  {
    id: 'mitsubishi-heavy',
    name: 'Mitsubishi Heavy',
    description: 'Robuust en betrouwbaar. De workhorsens van de airco-wereld.',
  },
  {
    id: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    description: 'Uiterst stil en energiezuinig. Premium kwaliteit voor veeleisende klanten.',
  },
  {
    id: 'samsung',
    name: 'Samsung',
    description: 'Moderne designlijn met slimme functies en uitstekende prijs-kwaliteitverhouding.',
  },
  {
    id: 'lg',
    name: 'LG',
    description: "Stijlvol en stil. LG airco's zijn compact en energiezuinig.",
  },
]

// ─── Producten ─────────────────────────────────────────────────────────────────
// Voeg /public/producten/<bestandsnaam>.jpg toe en verwijs ernaar via image.
export const PRODUCTS = [
  {
    id: 'daikin-ftxc25',
    name: 'Daikin FTXC25C',
    brandId: 'daikin',
    image: null, // bijv. '/producten/daikin-ftxc25.jpg'
    priceFrom: 499,
    priceTo: null,
    features: [
      '2,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'Ingebouwde wifi (MyDaikin)',
      'A++ energielabel',
      'Ultra stil: 19 dB',
    ],
    inStock: true,
  },
  {
    id: 'daikin-ftxc35',
    name: 'Daikin FTXC35C',
    brandId: 'daikin',
    image: null,
    priceFrom: 549,
    priceTo: null,
    features: [
      '3,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'Ingebouwde wifi (MyDaikin)',
      'A++ energielabel',
    ],
    inStock: true,
  },
  {
    id: 'daikin-ftxc50',
    name: 'Daikin FTXC50C',
    brandId: 'daikin',
    image: null,
    priceFrom: 649,
    priceTo: null,
    features: [
      '5,0 kW koelcapaciteit',
      'R32 koudemiddel',
      'Ingebouwde wifi (MyDaikin)',
      'A+ energielabel',
    ],
    inStock: true,
  },
  {
    id: 'mitsubishi-heavy-srk25',
    name: 'Mitsubishi Heavy SRK25ZSP-W',
    brandId: 'mitsubishi-heavy',
    image: null,
    priceFrom: 499,
    priceTo: null,
    features: [
      '2,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'A++ energielabel',
      'Zelfreinigend filter',
    ],
    inStock: true,
  },
  {
    id: 'mitsubishi-heavy-srk35',
    name: 'Mitsubishi Heavy SRK35ZSP-W',
    brandId: 'mitsubishi-heavy',
    image: null,
    priceFrom: 549,
    priceTo: null,
    features: [
      '3,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'A++ energielabel',
      'Zelfreinigend filter',
    ],
    inStock: false,
  },
  {
    id: 'mitsubishi-electric-hr25',
    name: 'Mitsubishi Electric MSZ-HR25VF',
    brandId: 'mitsubishi-electric',
    image: null,
    priceFrom: 529,
    priceTo: null,
    features: [
      '2,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'A++ energielabel',
      'Weekprogramma timer',
    ],
    inStock: true,
  },
  {
    id: 'samsung-ar09',
    name: 'Samsung WindFree AR09',
    brandId: 'samsung',
    image: null,
    priceFrom: 519,
    priceTo: null,
    features: [
      '2,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'A+++ energielabel',
      'WindFree koeling',
    ],
    inStock: true,
  },
  {
    id: 'lg-s09et',
    name: 'LG S09ET Dualcool',
    brandId: 'lg',
    image: null,
    priceFrom: 479,
    priceTo: null,
    features: [
      '2,5 kW koelcapaciteit',
      'R32 koudemiddel',
      'A++ energielabel',
      'WiFi Connect',
    ],
    inStock: true,
  },
]

// ─── Accessoires ───────────────────────────────────────────────────────────────
export const ACCESSORIES = [
  {
    id: 'leidingset-3m',
    name: 'Leidingset 3 meter',
    image: null,
    price: 89,
    priceUnit: null,
    description:
      'Complete leidingset inclusief koelleidingen, condensafvoer en mantelbuizen. Lengte: 3 meter.',
  },
  {
    id: 'leidingset-5m',
    name: 'Leidingset 5 meter',
    image: null,
    price: 119,
    priceUnit: null,
    description:
      'Complete leidingset inclusief koelleidingen, condensafvoer en mantelbuizen. Lengte: 5 meter.',
  },
  {
    id: 'wandbeugel',
    name: 'Wandbeugel buitenunit',
    image: null,
    price: 29,
    priceUnit: null,
    description: 'Verstevigde stalen wandbeugel geschikt voor alle gangbare buitenunits.',
  },
  {
    id: 'condenspomp',
    name: 'Condensafvoerpomp',
    image: null,
    price: 49,
    priceUnit: null,
    description:
      'Mini condensafvoerpomp voor situaties waar condenswater omhoog gepompt moet worden.',
  },
  {
    id: 'wifi-module',
    name: 'Wifi-module (universeel)',
    image: null,
    price: 59,
    priceUnit: null,
    description: 'Universele wifi-adapter voor het aansturen van uw airco via smartphone.',
  },
  {
    id: 'afstandsbediening',
    name: 'Extra afstandsbediening',
    image: null,
    price: 29,
    priceUnit: null,
    description: 'Universele afstandsbediening compatibel met alle merken die wij voeren.',
  },
]

// ─── Galerij ──────────────────────────────────────────────────────────────────
// Voeg hier foto's toe vanuit de /public/galerij/ map.
// Voorbeeld: { src: '/galerij/foto1.jpg', alt: 'Showroom Dordrecht', caption: 'Onze showroom' }
export const GALLERY_IMAGES = [
  // { src: '/galerij/foto1.jpg', alt: 'Showroom Dordrecht', caption: 'Onze showroom' },
  // { src: '/galerij/foto2.jpg', alt: 'Daikin airco installatie', caption: 'Daikin installatie' },
  // { src: '/galerij/foto3.jpg', alt: 'Mitsubishi binnen-unit', caption: 'Mitsubishi Heavy' },
  // { src: '/galerij/foto4.jpg', alt: 'Samsung airco buitenunit', caption: 'Samsung buitenunit' },
  // { src: '/galerij/foto5.jpg', alt: 'Ons team bezig met advies', caption: 'Persoonlijk advies' },
  // { src: '/galerij/foto6.jpg', alt: 'Accessoires overzicht', caption: 'Accessoires op voorraad' },
]
