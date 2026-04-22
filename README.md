# AircoStunt Website

Volledige website voor **AircoStunt** — React 18 frontend + Sanity Studio v3 headless CMS.

## Projectstructuur

```
aircostunt/
├── frontend/          # React 18 + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/      # React componenten
│   │   ├── hooks/           # Custom hooks (Intersection Observer)
│   │   ├── sanity/          # Sanity client + GROQ queries
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── studio/            # Sanity Studio v3 (CMS dashboard)
    ├── schemas/             # Content modellen
    ├── .env.example
    ├── sanity.config.js
    └── package.json
```

---

## Vereisten

- **Node.js 18+**
- **npm**
- Een gratis account op [sanity.io](https://sanity.io)

---

## Stap-voor-stap setup

### Stap 1 — Sanity project aanmaken

1. Ga naar [sanity.io/manage](https://sanity.io/manage)
2. Klik op **"New Project"**
3. Geef het project de naam `aircostunt`
4. Kies dataset: `production`
5. Noteer je **Project ID** (te vinden in de project settings)

### Stap 2 — Sanity Studio installeren

```bash
cd studio
npm install
```

Maak een `.env` bestand aan in de `studio/` map:

```env
SANITY_STUDIO_PROJECT_ID=jouw_project_id_hier
SANITY_STUDIO_DATASET=production
```

Start de studio:

```bash
npm run dev
```

De Sanity Studio opent op **http://localhost:3333**

### Stap 3 — Frontend installeren

```bash
cd frontend
npm install
```

Maak een `.env` bestand aan in de `frontend/` map:

```env
VITE_SANITY_PROJECT_ID=jouw_project_id_hier
VITE_SANITY_DATASET=production
```

Start de frontend:

```bash
npm run dev
```

De website opent op **http://localhost:5173**

---

## Omgevingsvariabelen

### Frontend (`frontend/.env`)

| Variabele | Verplicht | Omschrijving |
|-----------|-----------|--------------|
| `VITE_SANITY_PROJECT_ID` | Ja | Jouw Sanity project ID |
| `VITE_SANITY_DATASET` | Nee (standaard: `production`) | Dataset naam |
| `VITE_SANITY_TOKEN` | Alleen bij privé dataset | Read-only API token |

### Studio (`studio/.env`)

| Variabele | Verplicht | Omschrijving |
|-----------|-----------|--------------|
| `SANITY_STUDIO_PROJECT_ID` | Ja | Jouw Sanity project ID |
| `SANITY_STUDIO_DATASET` | Nee (standaard: `production`) | Dataset naam |

---

## CMS — Inloggen en inhoud bewerken

### Inloggen

1. Start de studio: `cd studio && npm run dev`
2. Open **http://localhost:3333** in je browser
3. Log in met je Sanity account (of maak een account aan op [sanity.io](https://sanity.io))

### Inhoud bewerken

In de linkersidebar vind je:

| Menu item | Wat je kunt bewerken |
|-----------|---------------------|
| **Website Instellingen** | Sitenaam, logo, telefoonnummer, e-mail, hero tekst |
| **Openingstijden** | Openings- en sluitingstijden, bel-van-tevoren tijd |
| **Merken** | Daikin, Mitsubishi, Samsung, LG, etc. |
| **Producten** | Split-unit airco's met prijs, kenmerken, voorraad |
| **Accessoires** | Beugels, leidingen, kokers met prijs |

### Foto's uploaden

Bij elk item met een afbeeldingsveld:
1. Klik op het afbeeldingsvak
2. Sleep een foto erin of klik om te bladeren
3. Gebruik de **bijsnijdtool** (hotspot) om het brandpunt in te stellen
4. Klik op **"Publish"** om de wijziging live te zetten

> Let op: klik altijd op de groene **"Publish"** knop — anders worden je wijzigingen niet opgeslagen!

---

## Deployen

### Studio online zetten

```bash
cd studio
npm run deploy
```

Na het deployen is de studio beschikbaar via `https://jouw-project.sanity.studio`

### Frontend bouwen

```bash
cd frontend
npm run build
```

De `dist/` map kan worden gedeployed naar:
- [Netlify](https://netlify.com) (drag & drop de `dist/` map)
- [Vercel](https://vercel.com) (`vercel --prod`)
- Elke statische hosting

---

## CORS instellen voor live productie

Als de frontend live staat op bijv. `https://aircostunt.com`:

1. Ga naar [sanity.io/manage](https://sanity.io/manage) → jouw project → **API** → **CORS Origins**
2. Voeg `https://aircostunt.com` toe
3. Vink **"Allow credentials"** UIT (niet nodig voor publieke data)

---

## Technische details

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, @sanity/client v6, @sanity/image-url v1
- **CMS**: Sanity Studio v3
- **Font**: DM Sans via @fontsource (geen Google Fonts CDN)
- **Animaties**: Intersection Observer API (scroll-triggered fade-in)
- **Iconen**: Inline SVG, geen externe bibliotheken
- **Afbeeldingen**: Sanity image-url builder met hotspot cropping
