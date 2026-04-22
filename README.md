# AircoStunt — Website Concepten

Multi-design website voor **AircoStunt** — airconditioning specialist in Dordrecht.

## Stack

- **React 19** + Vite 7
- **Tailwind CSS 3** + custom design tokens
- **React Router 6** (client-side routing)
- Alle content in `frontend/src/data/staticData.js` (geen CMS nodig)

## Structuur

```
frontend/
├── public/           # Statische bestanden (logo, merken, wifi.png)
├── src/
│   ├── App.jsx       # Router setup
│   ├── components/   # Gedeelde componenten (Header, Footer, etc.)
│   ├── data/
│   │   └── staticData.js  # Alle content (producten, merken, reviews, etc.)
│   ├── hooks/
│   └── pages/
│       ├── designs/  # Design1.jsx t/m Design7.jsx (zelfstandige concepten)
│       └── Dashboard.jsx
```

## Ontwerpen

| Route | Beschrijving |
|---|---|
| `/` of `/dashboard` | Overzicht van alle concepten |
| `/design/1/*` | Modern & Technisch (huidig concept) |
| `/design/2/*` | Webshop Concept 1 — Click & Collect |
| `/design/3/*` | Webshop Concept 2 — Dark Premium |
| `/design/4/*` | Donker & Futuristisch |
| `/design/5/*` | Licht & Professioneel |
| `/design/6/*` | Warm & Vriendelijk |
| `/design/7/*` | Premium Minimalistisch |

## Lokaal starten

```bash
cd frontend
npm install
npm run dev
```

## Deployen (Vercel)

1. Importeer de GitHub repo in Vercel
2. Stel **Root Directory** in op `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
