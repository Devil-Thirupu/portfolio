# Thirupathi | Portfolio Website 🚀

A professional dark neon-themed portfolio website for **Thirupathi**, CSE Student at JKKN College of Engineering and Technology.

---

## 📁 Folder Structure

```
portfolio/
├── index.html       ← Main HTML (all sections)
├── style.css        ← Dark neon theme styles
├── script.js        ← Particles, typing, GitHub API, animations
├── images/
│   └── Picsart_25-08-13_00-25-26-495.png   ← Your profile photo (copy here)
├── assets/
│   └── resume.pdf   ← Add your resume PDF here
└── README.md
```

---

## ✅ Setup Steps

### 1. Add your profile photo
Copy your photo into the `images/` folder:
```
images/Picsart_25-08-13_00-25-26-495.png
```
If you use a different filename, update the `src` in `index.html`:
```html
<img src="images/YOUR_PHOTO.png" alt="Thirupathi" class="hero-img" .../>
```

### 2. Add your resume
Place your resume PDF in `assets/`:
```
assets/resume.pdf
```

### 3. Open in Browser
Just open `index.html` in your browser (double-click or use VS Code Live Server).

---

## 🎨 Design

- **Theme**: Dark Neon (Black + Cyan + Purple)
- **Fonts**: Orbitron (headings) + Exo 2 (body)
- **Background**: Animated particle canvas with grid
- **Animations**: Typing effect, scroll reveal, glowing rings

---

## 🔧 Customization

### Update Social Links (index.html)
```html
<!-- Replace these URLs -->
<a href="https://github.com/Devil-Thirupu">
<a href="https://linkedin.com/in/YOUR-USERNAME">
<a href="https://wa.me/91YOURNUMBER">
```

### Change Neon Colors (style.css)
```css
:root {
  --neon:  #00ffe7;   /* Main cyan */
  --neon2: #bf00ff;   /* Purple accent */
  --neon3: #ff2d78;   /* Pink accent */
}
```

### Add More Projects (index.html)
Copy a `.project-card` block in the projects section and update the content.

---

## 🚀 Deployment

| Platform | Steps |
|---|---|
| **GitHub Pages** | Push to `yourusername.github.io` repo |
| **Netlify** | Drag & drop the folder at netlify.com/drop |
| **Vercel** | Import GitHub repo at vercel.com |

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Photo not showing | Check the filename matches exactly in `images/` |
| GitHub repos not loading | Ensure your GitHub username is public |
| Styles not applying | Use VS Code Live Server (not file://) |

---

**Good luck Thirupathi! 🎯**
