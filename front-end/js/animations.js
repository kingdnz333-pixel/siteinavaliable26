// ============================
// CASA URBANA - ANIMATIONS
// ============================

// ==================
// SCROLL REVEAL
// ==================
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}

// ==================
// SMOOTH SCROLL NAVIGATION
// ==================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      const navToggle = document.querySelector('.nav-toggle');
      const nav = document.querySelector('.nav');
      if (navToggle && nav && nav.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('open');
        nav.classList.remove('open');
      }
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

// ==================
// MOBILE MENU TOGGLE
// ==================
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

if (btn && menu && overlay) {
  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  });

  // Close menu on link click
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      overlay.classList.remove("active");
    });
  });
}

// ==================
// SCROLL-TO-TOP BUTTON
// ==================
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    const isVisible = window.scrollY > 300;
    scrollTopBtn.classList.toggle('show', isVisible);
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================
// HOVER EFFECTS
// ==================
function initHoverEffects() {
  // Service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.gallery-img').style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
      this.querySelector('.gallery-img').style.transform = 'scale(1)';
    });
  });
}

// ==================
// BUTTON RIPPLE EFFECT
// ==================
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ==================
// MASTER INIT
// ==================
function initAllAnimations() {
  initScrollReveal();
  initSmoothScroll();
  initMobileMenu();
  initScrollTop();
  initHoverEffects();
  initRippleEffect();
}

// Start animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}

// Re-init after content loads from app.js
window.addEventListener('pageDataLoaded', initAllAnimations);
