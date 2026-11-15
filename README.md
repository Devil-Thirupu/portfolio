# Thirupathi | Developer Portfolio 🚀

A modern, human-centered developer portfolio website crafted for **Thirupathi**, Computer Science Engineering student at JKKN College of Engineering and Technology.

Built with clean Vanilla HTML5, modern CSS3 (Custom Design System), and JavaScript — no heavy frameworks or build steps required.

---

## 📁 Project Structure

```text
portfolio/
├── index.html       ← Main semantic HTML structure & meta tags
├── style.css        ← Human-centered design system, layout & animations
├── script.js        ← Ambient canvas particles, typing effect, GitHub API & form logic
├── image/
│   └── thiru pic.png← Profile image
├── assets/
│   └── resume.pdf   ← Place your resume PDF here (download target)
└── README.md        ← Documentation
```

---

## 🎨 Design System & Highlights

- **Theme**: Obsidian Slate (`#090d16`) with midnight navy surfaces (`#141c2e`) and soft radial illumination.
- **Color Accents**: Sky Blue (`#38bdf8`), Soft Indigo (`#818cf8`), and Muted Teal (`#2dd4bf`).
- **Typography Pairing**:
  - **[Sora](https://fonts.google.com/specimen/Sora)** — Display titles & headlines.
  - **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** — High-legibility UI & body copy.
  - **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)** — Code chips, technical tags, and metric numerals.
- **Ambient Canvas**: Gentle, low-opacity particle mesh that adds atmospheric depth without distracting grid lines.
- **OpenGraph Ready**: Full meta tags configured for rich previews when shared on LinkedIn, WhatsApp, and Twitter.
- **Cross-Browser Standards**: Fully compliant standard and vendor-prefixed properties (e.g., standard `background-clip: text` paired with `-webkit-background-clip: text`).

---

## ⚡ Features

1. **Hero Section**: Architectural portrait frame with depth lighting, living "Open to Opportunities" status pill with emerald pulse, and dynamic role typing.
2. **About Section**: Bento-style layout with interactive focus chips (`CSE Student`, `Embedded Dev`, `Experimenter`, `AI Enthusiast`, `Game Developer`) and metric statistic cards.
3. **Skills Matrix**: Organized category cards for Programming, Hardware, AI Tools, Game Development, and Tools with subtle hover lines.
4. **Featured Work**: Project showcase cards with live demo and repository links, feature checklists, and technology pills.
5. **Live GitHub Repositories**: Real-time integration with GitHub REST API displaying latest public repositories, primary languages, and star counts.
6. **Education Credentials**: Academic milestone card highlighting degree, institution, and active enrollment.
7. **Production Contact Form**: Includes input sanitization, honeypot spam protection, client-side rate limiting, EmailJS direct submission, and automatic `mailto:` fallback.

---

## 🚀 Getting Started

### 1. Place Your Resume
Ensure your resume PDF is named `resume.pdf` and placed inside the `assets/` directory:
```text
assets/resume.pdf
```

### 2. Run Locally
Open `index.html` in your browser, or use the **Live Server** extension in VS Code:
1. Right-click `index.html` in VS Code.
2. Select **Open with Live Server**.

---

## 🔧 Configuration & Customization

### Updating EmailJS (Contact Form)
In `script.js`:
```javascript
const emailJsServiceId  = 'service_spzhu9o';
const emailJsTemplateId = 'template_pchkjn2';
const emailJsPublicKey  = 'UeAY4uKNoOYXmWK4W';
```
When deploying to a custom domain, add your hostname to `emailJsAllowedHostnames` in `script.js`:
```javascript
const emailJsAllowedHostnames = [
  'devil-thirupu.github.io',
  'localhost',
  '127.0.0.1',
  'your-custom-domain.com'
];
```

### Adjusting Accent Colors
In `style.css`:
```css
:root {
  --primary:   #38bdf8; /* Primary accent */
  --secondary: #818cf8; /* Secondary accent */
  --teal:      #2dd4bf; /* Highlight color */
}
```

---

## 🌐 Deployment

| Platform | Deployment Steps |
|---|---|
| **GitHub Pages** | Push repository to GitHub $\rightarrow$ Settings $\rightarrow$ Pages $\rightarrow$ Deploy from `main` branch |
| **Vercel** | Import your GitHub repository directly at [vercel.com](https://vercel.com) |
| **Netlify** | Drag & drop this folder at [app.netlify.com/drop](https://app.netlify.com/drop) |

---

© 2026 Thirupathi. Built with precision & caffeine.
