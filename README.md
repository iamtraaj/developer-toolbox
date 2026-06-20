# Developer Toolbox 🧰

> **Free Developer Utilities in One Place**

A production-ready, SaaS-style developer utility platform built with React 19, Vite 8, Tailwind CSS, and React Router DOM. Runs 100% client-side — no backend, no database, no sign-up.

---

## ✨ Features

| Tool | Description |
|------|-------------|
| **JSON Formatter** | Beautify, minify, and validate JSON with error reporting |
| **Password Generator** | Cryptographically secure passwords with strength meter |
| **QR Code Generator** | Generate QR codes from text/URL with color picker + download |
| **UUID Generator** | Generate 1–20 UUID v4 identifiers with copy support |
| **Base64 Tool** | Encode/decode Base64 with Unicode support + error handling |
| **JWT Decoder** | Decode JWT tokens locally, check expiry, inspect header/payload |
| **Timestamp Converter** | Unix timestamp ↔ human-readable date bidirectional converter |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# 1. Navigate to the project directory
cd developer-toolbox

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:5173 in your browser.

## 📦 Build for Production

```bash
npm run build
```

Output is in the dist/ directory. Preview locally with:

```bash
npm run preview
```

## ☁️ Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel         # first time
vercel --prod  # subsequent deploys
```

### Option B — Vercel Dashboard (Recommended)

1. Push your project to a GitHub repository
2. Go to vercel.com → New Project
3. Import your GitHub repository
4. Set Framework Preset to Vite
5. Build Command: npm run build, Output Directory: dist
6. Click Deploy

The vercel.json file included in the project handles SPA routing automatically.

## 🗂️ Project Structure

```
developer-toolbox/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/Layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── hooks/
│   │   ├── useTheme.js
│   │   └── useLastTool.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── JsonFormatter.jsx
│   │   ├── PasswordGenerator.jsx
│   │   ├── QrGenerator.jsx
│   │   ├── UuidGenerator.jsx
│   │   ├── Base64Tool.jsx
│   │   ├── JwtDecoder.jsx
│   │   └── TimestampConverter.jsx
│   ├── router/navConfig.js
│   ├── utils/
│   │   ├── copyToClipboard.js
│   │   ├── passwordUtils.js
│   │   └── base64Utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── vercel.json
└── package.json
```

## 🛠️ Tech Stack

- React 19 + Vite 8
- Tailwind CSS 3
- React Router DOM 6
- Lucide React icons
- react-hot-toast
- qrcode, uuid, jwt-decode

---

Built with love by Md Tauseef Alam — mdtauseefalam16@gmail.com
Built for Digital Heroes: https://digitalheroesco.com
