# 🏖️ Beach Booking Frontend

## 📁 Struttura Progetto

```
beach-booking-frontend/
├── public/
│   ├── images/
│   │   ├── hero-beach.jpg
│   │   ├── logo.png
│   │   └── ombrellone.svg
│   └── favicon.ico
│
├── src/
│   ├── api/
│   │   ├── axios.js              # Config Axios
│   │   ├── auth.js               # API Auth
│   │   ├── tenants.js            # API Tenants
│   │   ├── ombrelloni.js         # API Ombrelloni
│   │   └── prenotazioni.js       # API Prenotazioni
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── index.css         # Global CSS + Tailwind
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Loading.jsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── BookingPreview.jsx
│   │   │   └── Testimonials.jsx
│   │   │
│   │   ├── booking/
│   │   │   ├── MappaOmbrelloni.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── OmbrelloneCard.jsx
│   │   │   └── BookingForm.jsx
│   │   │
│   │   └── dashboard/
│   │       ├── Sidebar.jsx
│   │       ├── StatsCard.jsx
│   │       ├── PrenotazioniTable.jsx
│   │       └── OmbrelloniManager.jsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Booking.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ForgotPassword.jsx
│   │   │
│   │   └── dashboard/
│   │       ├── DashboardHome.jsx
│   │       ├── Prenotazioni.jsx
│   │       ├── Ombrelloni.jsx
│   │       ├── Clienti.jsx
│   │       └── Settings.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useTheme.js
│   │   └── useApi.js
│   │
│   ├── store/
│   │   ├── authStore.js          # Zustand store
│   │   ├── themeStore.js
│   │   └── bookingStore.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   │
│   ├── themes/
│   │   ├── classic.js            # Theme Shati-style
│   │   ├── modern.js
│   │   └── minimal.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Quick Start

```bash
# 1. Crea progetto
npm create vite@latest beach-booking-frontend -- --template react
cd beach-booking-frontend

# 2. Installa dipendenze
npm install

# 3. Installa librerie aggiuntive
npm install react-router-dom axios flowbite flowbite-react framer-motion swiper react-icons date-fns zustand

# 4. Installa Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 5. Avvia dev server
npm run dev
```

## 🎨 Design System

### Colori (ispirato a Shati)
- **Primary:** #0ea5e9 (Azzurro mare)
- **Secondary:** #e6cd99 (Sabbia)
- **Accent:** #f59e0b (Arancione)
- **Text:** #1f2937 (Grigio scuro)
- **Background:** #ffffff (Bianco)

### Typography
- **Font:** Inter
- **Headings:** font-bold
- **Body:** font-normal

### Spacing
- **Container:** max-w-7xl mx-auto px-4
- **Section:** py-16 md:py-24
- **Gap:** gap-8 md:gap-12

## 📱 Responsive Breakpoints
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

## 🔗 API Endpoints

```javascript
// Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

// Endpoints
/api/auth/login
/api/auth/register/customer
/api/tenants/current
/api/ombrelloni
/api/prenotazioni
```

## 🎯 Features

### Pubblico (Homepage)
- ✅ Hero fullscreen con immagine
- ✅ Sezione servizi
- ✅ Gallery fotografica
- ✅ Form prenotazione
- ✅ Recensioni
- ✅ Contatti + Mappa

### Area Clienti
- ✅ Login/Registrazione
- ✅ Le mie prenotazioni
- ✅ Nuova prenotazione
- ✅ Profilo utente

### Dashboard Admin/Staff
- ✅ Overview statistiche
- ✅ Gestione prenotazioni
- ✅ Gestione ombrelloni
- ✅ Lista clienti
- ✅ Personalizzazione tema

## 🎨 Theme System

```javascript
// Esempio configurazione tema
{
  name: "Lido Napoli",
  colors: {
    primary: "#0ea5e9",
    secondary: "#e6cd99"
  },
  logo: "/images/logo.png",
  hero: "/images/hero.jpg",
  layout: "classic",
  content: {
    slogan: "Il tuo angolo di paradiso",
    description: "...",
    services: ["WiFi", "Bar", "Docce"]
  }
}
```

## 📦 Build & Deploy

```bash
# Build production
npm run build

# Preview build
npm run preview

# Deploy su Vercel
vercel --prod
```

## 🔐 Environment Variables

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Beach Booking
```

---

**Pronto per iniziare lo sviluppo!** 🏖️