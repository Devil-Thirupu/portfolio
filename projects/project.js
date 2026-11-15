// ============================================
//  PROJECT DETAILS — SCRIPT & LIGHTBOX
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Lightbox Modal Setup
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxCaption) {
    // Open Lightbox when clicking any screenshot media
    document.querySelectorAll('.screenshot-media-wrap').forEach((wrap) => {
      wrap.addEventListener('click', () => {
        const img = wrap.querySelector('.screenshot-img');
        const caption = wrap.closest('.screenshot-card')?.querySelector('.screenshot-caption strong');
        
        if (img && img.src && !img.src.endsWith('#') && img.style.display !== 'none') {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Project Screenshot';
          lightboxCaption.textContent = caption ? caption.textContent : (img.alt || '');
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close on button click
    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Scroll reveal for project page sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });
});
