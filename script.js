// ============================================
//  THIRUPATHI PORTFOLIO — SCRIPT.JS
// ============================================

// ===== CANVAS PARTICLE BACKGROUND =====
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Subtle grid lines
  function drawGrid() {
    ctx.strokeStyle = 'rgba(0,255,231,0.03)';
    ctx.lineWidth = 1;
    const spacing = 60;
    for (let x = 0; x < W; x += spacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.5 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
      const palette = ['0,255,231', '191,0,255', '255,45,120'];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  const COUNT = Math.min(120, Math.floor(W * H / 12000));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,255,231,${0.04 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.getAttribute('id');
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ===== TYPING ANIMATION =====
(function () {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Web Developer',
    'CSE Student',
    'Game Developer ',
    'Problem Solver',
    'Tech Enthusiast'
  ];

  let pi = 0;
  let ci = 0;
  let deleting = false;

  function type() {
    const phrase = phrases[pi];

    if (!deleting) {
      ci = Math.min(ci + 1, phrase.length);
      el.textContent = phrase.slice(0, ci);

      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      ci = Math.max(ci - 1, 0);
      el.textContent = phrase.slice(0, ci);

      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 55 : 90);
  }

  setTimeout(type, 600);
})();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        el.classList.remove('visible');
        void el.offsetWidth;
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ===== GITHUB PROJECTS =====
async function loadGitHub() {
  const container = document.getElementById('github-projects');
  if (!container) return;

  const username = 'Devil-Thirupu';

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error('API error');
    const repos = await res.json();

    container.innerHTML = '';

    if (!repos.length) {
      container.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--dim)">No repositories found.</p>';
      return;
    }

    const langColors = {
      JavaScript: '#f7df1e', Python: '#3776ab', HTML: '#e34c26',
      CSS: '#563d7c', C: '#a9b028', 'C++': '#00599c',
      TypeScript: '#3178c6', Shell: '#89e051'
    };

    repos.forEach((repo, i) => {
      const card = document.createElement('div');
      card.className = 'github-card reveal';
      card.style.transitionDelay = `${i * 0.07}s`;

      const desc  = repo.description || 'No description available.';
      const lang  = repo.language || '';
      const dot   = lang ? `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${langColors[lang] || '#888'};margin-right:4px;"></span>` : '';
      const stars = repo.stargazers_count;

      card.innerHTML = `
        <div class="github-card-name">
          <i class="fab fa-github"></i>${repo.name}
        </div>
        <p class="github-card-desc">${desc}</p>
        <div class="github-card-meta">
          <span>${dot}${lang}</span>
          <span>${stars > 0 ? `<i class="fas fa-star" style="color:#f7df1e"></i> ${stars}` : ''}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="github-card-link">
          View Repo <i class="fas fa-external-link-alt"></i>
        </a>
      `;
      container.appendChild(card);
      setTimeout(() => card.classList.add('visible'), 100 + i * 70);
    });

  } catch (err) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--dim)">
        <i class="fas fa-exclamation-circle" style="color:var(--neon3);font-size:2rem;margin-bottom:1rem;display:block"></i>
        Unable to load repositories.<br>
        <a href="https://github.com/Devil-Thirupu" target="_blank" style="color:var(--neon)">Visit GitHub directly →</a>
      </div>`;
  }
}

window.addEventListener('load', loadGitHub);

// ===== CONTACT FORM =====
const emailJsServiceId  = 'service_spzhu9o';
const emailJsTemplateId = 'template_pchkjn2';
const emailJsPublicKey  = 'UeAY4uKNoOYXmWK4W';
const emailJsAllowedHostnames = [
  'devil-thirupu.github.io',
  'localhost',
  'your-netlify-domain.netlify.app',
  'your-vercel-domain.vercel.app'
];
const contactRateLimit = {
  intervalMs: 20_000,
  windowMs: 60 * 60 * 1000,
  maxAttempts: 5
};
const form = document.getElementById('contact-form');

function sanitizeInput(value) {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u0009|\u000A|\u000B|\u000C|\u000D|\u000E|\u000F|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001A|\u001B|\u001C|\u001D|\u001E|\u001F|\u007F/g, '')
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name) {
  return name.length >= 2 && name.length <= 100;
}

function isValidMessage(message) {
  return message.length >= 10 && message.length <= 1200;
}

function getHoneypotValue() {
  const hp = document.getElementById('bot-field');
  return hp ? hp.value.trim() : '';
}

function isAllowedEmailJsHost() {
  return emailJsAllowedHostnames.includes(window.location.hostname);
}

function getRateLimitState() {
  const stored = localStorage.getItem('contactFormRate');
  return stored ? JSON.parse(stored) : { attempts: 0, windowStart: Date.now() };
}

function saveRateLimitState(state) {
  localStorage.setItem('contactFormRate', JSON.stringify(state));
}

function isRateLimited() {
  const now = Date.now();
  const state = getRateLimitState();

  if (now - state.windowStart > contactRateLimit.windowMs) {
    return false;
  }

  return state.attempts >= contactRateLimit.maxAttempts && now - state.lastAttempt < contactRateLimit.intervalMs;
}

function recordContactAttempt() {
  const now = Date.now();
  const state = getRateLimitState();

  if (now - state.windowStart > contactRateLimit.windowMs) {
    state.attempts = 0;
    state.windowStart = now;
  }

  state.attempts = (state.attempts || 0) + 1;
  state.lastAttempt = now;
  saveRateLimitState(state);
}

function setButtonState(button, isLoading) {
  button.disabled = isLoading;
  button.innerHTML = isLoading
    ? '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>'
    : button.dataset.originalLabel || button.innerHTML;
}

function showMsg(el, text, type) {
  el.textContent = text;
  el.className = 'form-msg ' + type;
  el.style.display = 'block';
}

function buildMailtoLink({subject, name, email, message}) {
  return `mailto:thirupathi2308@gmail.com?subject=${encodeURIComponent(subject)} from ${encodeURIComponent(name)}&body=From: ${encodeURIComponent(name)} <${encodeURIComponent(email)}>%0A%0A${encodeURIComponent(message)}`;
}

if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.dataset.originalLabel = submitButton.innerHTML;
  }

  if (window.emailjs && emailJsPublicKey && !emailJsPublicKey.includes('YOUR_') && isAllowedEmailJsHost()) {
    emailjs.init(emailJsPublicKey);
  } else if (window.emailjs && emailJsPublicKey && !emailJsPublicKey.includes('YOUR_')) {
    console.warn('EmailJS will not send from this host because it is not in the allowed host list. Update emailJsAllowedHostnames for your deployed domains.');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const rawName    = document.getElementById('name').value;
    const rawEmail   = document.getElementById('email').value;
    const rawMessage = document.getElementById('message').value;
    const subject    = document.getElementById('subject').value;
    const honeypot   = getHoneypotValue();
    const btn        = submitButton || this.querySelector('button');
    const msg        = document.getElementById('formMsg');

    const name    = sanitizeInput(rawName);
    const email   = sanitizeInput(rawEmail);
    const message = sanitizeInput(rawMessage);

    if (honeypot) {
      showMsg(msg, 'Spam detection blocked this request.', 'error');
      return;
    }

    if (isRateLimited()) {
      showMsg(msg, 'You are sending requests too quickly. Please wait and try again later.', 'error');
      return;
    }

    if (!name || !email || !message) {
      showMsg(msg, 'Please fill in all fields before sending.', 'error');
      return;
    }

    if (!isValidName(name)) {
      showMsg(msg, 'Please enter a valid name (2-100 characters).', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showMsg(msg, 'Please enter a valid email address.', 'error');
      return;
    }

    if (!isValidMessage(message)) {
      showMsg(msg, 'Please enter a longer message (10-1200 characters).', 'error');
      return;
    }

    const mailto = buildMailtoLink({ subject, name, email, message });
    const canUseEmailJs = window.emailjs &&
      !emailJsServiceId.includes('YOUR_') &&
      !emailJsTemplateId.includes('YOUR_') &&
      !emailJsPublicKey.includes('YOUR_') &&
      isAllowedEmailJsHost();

    setButtonState(btn, true);
    msg.style.display = 'none';

    try {
      if (canUseEmailJs) {
        await emailjs.send(emailJsServiceId, emailJsTemplateId, {
          from_name: name,
          from_email: email,
          message,
          subject
        });

        showMsg(msg, 'Message sent successfully. Thank you!', 'success');
        form.reset();
      } else {
        showMsg(msg, 'Direct email service is unavailable for this domain. Opening your mail client instead.', 'error');
        window.location.href = mailto;
      }
    } catch (err) {
      console.error('EmailJS send error:', err);
      showMsg(msg, 'Unable to send directly right now. Opening your mail client as fallback.', 'error');
      window.location.href = mailto;
    } finally {
      recordContactAttempt();
      setTimeout(() => {
        setButtonState(btn, false);
      }, 1200);
    }
  });
}


// ===== CONSOLE EGG =====
console.log('%c👾 Thirupathi\'s Portfolio', 'font-size:22px;font-weight:900;color:#00ffe7;text-shadow:0 0 10px #00ffe7');
console.log('%cOpen to opportunities — Let\'s build something amazing! 🚀', 'font-size:13px;color:#bf00ff');
