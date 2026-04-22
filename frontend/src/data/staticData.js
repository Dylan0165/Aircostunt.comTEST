/**
 * AircoStunt — Statische websitedata
 */

export const SITE = {
  name: 'AircoStunt',
  phone: '06-147 00 753',
  email: 'info@aircostunt.com',
  address: 'Veerplaat 10, Dordrecht',
  heroTitle: "Airco's van A-merken voor de laagste prijs",
  heroSubtitle:
    "Split-unit airconditioners van Daikin, Mitsubishi, Samsung en LG. Afhalen uit onze showroom, geen wachttijden.",
  heroCtaText: 'Bekijk onze producten',
}

export const OPENING_HOURS = {
  weekdaysFrom: '09:00',
  weekdaysTo: '20:00',
  saturdayFrom: '09:00',
  saturdayTo: '13:00',
  sundayClosed: true,
  callAheadMinutes: 30,
  extraNote: 'Altijd bellen voor u langs komt!',
}

export const BRAND_LOGOS = {
  daikin: 'https://www.aircostunt.com/wp-content/uploads/2022/01/Nieuw-Daikin-logo-2-1.jpg',
  'mitsubishi-heavy': 'https://www.aircostunt.com/wp-content/uploads/2022/01/mitsubishi-heavy_new.png',
  'mitsubishi-electric': 'https://www.aircostunt.com/wp-content/uploads/2020/11/mitsubishi-electric-2.png',
  samsung: 'https://www.aircostunt.com/wp-content/uploads/2020/05/samsung-logo-1.jpg',
  lg: 'https://www.aircostunt.com/wp-content/uploads/2021/04/Logo_LG-6.png',
}

export const PRODUCT_IMGS = {
  daikin: 'https://www.aircostunt.com/wp-content/uploads/2020/11/Daikin-Sensira-FTXF35B-10.jpg',
  'mitsubishi-heavy': null,
  'mitsubishi-electric': null,
  samsung: 'https://www.aircostunt.com/wp-content/uploads/2020/11/Samsung-12000.jpg',
  lg: 'https://www.aircostunt.com/wp-content/uploads/2021/04/lg-split-airco-s12et-7001-nl-G.jpg',
}

export const BRANDS = [
  {
    id: 'daikin',
    name: 'Daikin',
    description: 'Japans topkwaliteit. Bekend om stille werking, energiezuinigheid en ingebouwde wifi.',
    logo: BRAND_LOGOS.daikin,
  },
  {
    id: 'mitsubishi-heavy',
    name: 'Mitsubishi Heavy',
    description: 'Robuust en betrouwbaar. De workhorses van de airco-wereld.',
    logo: BRAND_LOGOS['mitsubishi-heavy'],
  },
  {
    id: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    description: 'Uiterst stil en energiezuinig. Premium kwaliteit voor veeleisende klanten.',
    logo: BRAND_LOGOS['mitsubishi-electric'],
  },
  {
    id: 'samsung',
    name: 'Samsung',
    description: 'Moderne designlijn met slimme functies en uitstekende prijs-kwaliteitverhouding.',
    logo: BRAND_LOGOS.samsung,
  },
  {
    id: 'lg',
    name: 'LG',
    description: "Stijlvol en stil. LG airco's zijn compact en energiezuinig.",
    logo: BRAND_LOGOS.lg,
  },
]

export const PRODUCTS = [
  {
    id: 'daikin-ftxc25',
    name: 'Daikin FTXC25C',
    brandId: 'daikin',
    image: PRODUCT_IMGS.daikin,
    priceFrom: 499,
    priceTo: null,
    features: ['2,5 kW koelcapaciteit', 'R32 koudemiddel', 'Ingebouwde wifi (MyDaikin)', 'A++ energielabel', 'Ultra stil: 19 dB'],
    inStock: true,
  },
  {
    id: 'daikin-ftxc35',
    name: 'Daikin FTXC35C',
    brandId: 'daikin',
    image: PRODUCT_IMGS.daikin,
    priceFrom: 549,
    priceTo: null,
    features: ['3,5 kW koelcapaciteit', 'R32 koudemiddel', 'Ingebouwde wifi (MyDaikin)', 'A++ energielabel'],
    inStock: true,
  },
  {
    id: 'daikin-ftxc50',
    name: 'Daikin FTXC50C',
    brandId: 'daikin',
    image: PRODUCT_IMGS.daikin,
    priceFrom: 649,
    priceTo: null,
    features: ['5,0 kW koelcapaciteit', 'R32 koudemiddel', 'Ingebouwde wifi (MyDaikin)', 'A+ energielabel'],
    inStock: true,
  },
  {
    id: 'mitsubishi-heavy-srk25',
    name: 'Mitsubishi Heavy SRK25ZSP-W',
    brandId: 'mitsubishi-heavy',
    image: PRODUCT_IMGS['mitsubishi-heavy'],
    priceFrom: 499,
    priceTo: null,
    features: ['2,5 kW koelcapaciteit', 'R32 koudemiddel', 'A++ energielabel', 'Zelfreinigend filter'],
    inStock: true,
  },
  {
    id: 'mitsubishi-heavy-srk35',
    name: 'Mitsubishi Heavy SRK35ZSP-W',
    brandId: 'mitsubishi-heavy',
    image: PRODUCT_IMGS['mitsubishi-heavy'],
    priceFrom: 549,
    priceTo: null,
    features: ['3,5 kW koelcapaciteit', 'R32 koudemiddel', 'A++ energielabel', 'Zelfreinigend filter'],
    inStock: false,
  },
  {
    id: 'mitsubishi-electric-hr25',
    name: 'Mitsubishi Electric MSZ-HR25VF',
    brandId: 'mitsubishi-electric',
    image: PRODUCT_IMGS['mitsubishi-electric'],
    priceFrom: 529,
    priceTo: null,
    features: ['2,5 kW koelcapaciteit', 'R32 koudemiddel', 'A++ energielabel', 'Weekprogramma timer'],
    inStock: true,
  },
  {
    id: 'samsung-ar09',
    name: 'Samsung WindFree AR09',
    brandId: 'samsung',
    image: PRODUCT_IMGS.samsung,
    priceFrom: 519,
    priceTo: null,
    features: ['2,5 kW koelcapaciteit', 'R32 koudemiddel', 'A+++ energielabel', 'WindFree koeling'],
    inStock: true,
  },
  {
    id: 'lg-s09et',
    name: 'LG S09ET Dualcool',
    brandId: 'lg',
    image: PRODUCT_IMGS.lg,
    priceFrom: 479,
    priceTo: null,
    features: ['2,5 kW koelcapaciteit', 'R32 koudemiddel', 'A++ energielabel', 'WiFi Connect'],
    inStock: true,
  },
]

export const ACCESSORIES = [
  {
    id: 'leidingset-3m',
    name: 'Leidingset 3 meter',
    image: 'https://www.aircostunt.com/wp-content/uploads/2020/04/leidinggoot.jpg',
    price: 89,
    description: 'Complete leidingset inclusief koelleidingen, condensafvoer en mantelbuizen. Lengte: 3 meter.',
  },
  {
    id: 'leidingset-5m',
    name: 'Leidingset 5 meter',
    image: 'https://www.aircostunt.com/wp-content/uploads/2020/04/leidinggoot.jpg',
    price: 119,
    description: 'Complete leidingset inclusief koelleidingen, condensafvoer en mantelbuizen. Lengte: 5 meter.',
  },
  {
    id: 'wandbeugel',
    name: 'Wandbeugel buitenunit',
    image: 'https://www.aircostunt.com/wp-content/uploads/2020/04/muurbeugel.jpg',
    price: 29,
    description: 'Verstevigde stalen wandbeugel geschikt voor alle gangbare buitenunits.',
  },
  {
    id: 'condenspomp',
    name: 'Condensafvoerpomp',
    image: null,
    price: 49,
    description: 'Mini condensafvoerpomp voor situaties waar condenswater omhoog gepompt moet worden.',
  },
  {
    id: 'wifi-module',
    name: 'Wifi-module (universeel)',
    image: null,
    price: 59,
    description: 'Universele wifi-adapter voor het aansturen van uw airco via smartphone.',
  },
  {
    id: 'afstandsbediening',
    name: 'Extra afstandsbediening',
    image: null,
    price: 29,
    description: 'Universele afstandsbediening compatibel met alle merken die wij voeren.',
  },
]

export const REVIEWS = [
  { text: "Super geholpen, goede uitleg gehad over de airco's en het verschil. Goede scherpe prijs.", name: 'Vincent Haar', stars: 5, period: '8 maanden geleden' },
  { text: "Altijd de beste airco's, altijd de beste prijs, altijd vriendelijke ontvangst! Ron en Rene denken met je mee en niets is ze teveel moeite, we komen hier al jaren.", name: 'Inge Schalij', stars: 5, period: '2 jaar geleden' },
  { text: 'Ik kocht 2 Daikin FTXC airconditioning model 2022. Alles was efficient en snel geregeld, ik werd ook goed geadviseerd over airconditioning.', name: 'Kamil Zimolag', stars: 5, period: '3 jaar geleden' },
  { text: 'Goede kwaliteit en prijs, zeer vriendelijk en behulpzaam personeel die weten waar het over gaat. Rene ga zo door, dank!', name: 'Leo Peters', stars: 5, period: '2 jaar geleden' },
  { text: "Zeer aardig persoon met uitstekende kennis van airco's. Zeer concurrerende prijzen en dienstverlening.", name: 'MC', stars: 5, period: '4 jaar geleden' },
  { text: 'Een bedrijf waar je zelfs in de avond je airco kan ophalen, en met goede service! Bedankt!', name: 'G-J Gmail', stars: 5, period: '3 jaar geleden' },
  { text: 'Vriendelijk geholpen, eerlijk advies. Mooie kwaliteit. Aanrader!', name: 'Janet Rietveld', stars: 5, period: '4 jaar geleden' },
  { text: 'Snel, efficient en naar mijn idee krijg je echt de laagste prijs.', name: 'DCrom', stars: 5, period: '2 jaar geleden' },
  { text: 'Correct en vriendelijk aan de telefoon en op locatie, volgens afspraak op tijd. Goed geregeld.', name: 'Aad van den Hoegen', stars: 4, period: '3 jaar geleden' },
]

export const FAQ = [
  {
    q: 'Mag ik zelf een airco installeren?',
    a: 'Ja, het ophangen van de binnenunit en het doorboren van de muur mag u zelf doen. Voor het aansluiten van het koelmiddelcircuit heeft u een F-gascertificaat nodig. Wij geven bij afhalen gratis advies.',
  },
  {
    q: 'Wat is er inbegrepen bij een split-unit set?',
    a: 'Een complete split-unit set bestaat uit een binnenunit, een buitenunit en de bijbehorende leidingen. Accessoires zoals montagebeugels en leidingsets kunt u los bij ons bestellen.',
  },
  {
    q: 'Hoe lang is de garantie?',
    a: 'Alle airco sets worden geleverd met 2 jaar fabrieksgarantie. Daikin biedt op sommige modellen tot 5 jaar garantie bij registratie.',
  },
  {
    q: 'Waarom zijn uw prijzen zo laag?',
    a: 'Wij kopen rechtstreeks in grote hoeveelheden in bij fabrikanten en importeurs in Europa. Geen tussenhandelaar, minimale overhead en een efficiënte opzet maken onze lage prijzen mogelijk.',
  },
  {
    q: 'Kan ik betalen met pin?',
    a: 'Ja, u kunt zowel contant als met pin betalen bij afhalen. Facturering is ook mogelijk voor zakelijke klanten.',
  },
]

export const GALLERY_IMAGES = []
