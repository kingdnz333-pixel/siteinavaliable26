// ======================
// CASA URBANA - APP CORE
// ======================

let siteData = {};

// ==================
// DATA LOADING
// ==================
async function loadSiteData() {
  try {
    const response = await fetch('content/site.json');
    if (!response.ok) throw new Error('Failed to load content');
    siteData = await response.json();
    renderApp();
  } catch (error) {
    console.error('Error loading site data:', error);
  }
}

// ==================
// RENDERING ENGINE
// ==================

function renderHero() {
  const hero = siteData.hero;
  const container = document.getElementById('hero');
  if (!container) return;

  container.innerHTML = `
    <div class="hero__bg">
      <img src="${hero.image}" alt="${hero.title}" loading="lazy" class="hero__img">
      <div class="hero__overlay"></div>
    </div>
    <div class="hero__content">
      <div class="container">
        <div class="logo-animation">
          <span>C</span><span>a</span><span>s</span><span>a</span> <span>U</span><span>r</span><span>b</span><span>a</span><span>n</span><span>a</span>
        </div>
        <h1 class="hero__title" data-reveal>${hero.title}</h1>
        <p class="hero__subtitle" data-reveal>${hero.subtitle}</p>
        <div class="hero__actions" data-reveal>
          <a href="#contact" class="btn btn--primary">${hero.cta_primary}</a>
          <a href="planos.pdf" target="_blank" rel="noreferrer" class="btn btn--secondary">${hero.cta_secondary}</a>
        </div>
      </div>
    </div>
  `;
}

function renderServices() {
  const services = siteData.services;
  const container = document.getElementById('services');
  if (!container) return;

  const servicesHTML = services
    .map(service => `
      <div class="service-card" data-reveal>
        <div class="service-icon">${service.icon}</div>
        <h3 class="service-title">${service.title}</h3>
        <p class="service-desc">${service.description}</p>
      </div>
    `)
    .join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 data-reveal>O que oferecemos</h2>
        <p data-reveal>Encontre o ambiente que combina com o seu ritmo de trabalho.</p>
      </div>
      <div class="services-grid">
        ${servicesHTML}
      </div>
    </div>
  `;
}

function renderBenefits() {
  const benefits = siteData.benefits;
  const container = document.getElementById('benefits');
  if (!container) return;

  const benefitsHTML = benefits
    .map(benefit => `
      <div class="benefit-item" data-reveal>
        <div class="benefit-icon">${benefit.icon}</div>
        <div>
          <h3 class="benefit-title">${benefit.title}</h3>
          <p class="benefit-desc">${benefit.description}</p>
        </div>
      </div>
    `)
    .join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 data-reveal>Por que trabalhar aqui?</h2>
        <p data-reveal>Experiência pensada para o seu conforto e produtividade.</p>
      </div>
      <div class="benefits-grid">
        ${benefitsHTML}
      </div>
    </div>
  `;
}

function renderGallery() {
  const gallery = siteData.gallery;
  const container = document.getElementById('gallery');
  if (!container) return;

  const galleryHTML = gallery
    .map(image => `
      <div class="gallery-item" data-reveal>
        <img src="${image.src}" alt="${image.alt}" loading="lazy" class="gallery-img">
        <div class="gallery-overlay">
          <button class="gallery-btn" aria-label="Ver em tamanho grande" data-src="${image.src}" data-alt="${image.alt}">
            <span>+</span>
          </button>
        </div>
      </div>
    `)
    .join('');

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 data-reveal>Galeria</h2>
        <p data-reveal>Veja como é trabalhar na Casa Urbana.</p>
      </div>
      <div class="gallery-container">
        ${galleryHTML}
      </div>
    </div>
  `;

  // Attach modal listeners
  document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openImageModal(btn.dataset.src, btn.dataset.alt);
    });
  });
}

function renderContact() {
  const site = siteData.site;
  const container = document.getElementById('contact');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2 data-reveal>Fale conosco</h2>
        <p data-reveal>Agende sua visita ou tire suas dúvidas.</p>
      </div>

      <div class="contact-grid">
        <form class="contact-form" id="contactForm" data-reveal>
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" required placeholder="Seu nome completo">
          </div>
          <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" required placeholder="seu@email.com">
          </div>
          <div class="form-group">
            <label for="phone">Telefone</label>
            <input type="tel" id="phone" name="phone" required placeholder="(68) 99999-9999">
          </div>
          <div class="form-group">
            <label for="message">Mensagem</label>
            <textarea id="message" name="message" rows="5" required placeholder="Como podemos ajudar?"></textarea>
          </div>
          <button type="submit" class="btn btn--primary">Enviar mensagem</button>
        </form>

        <aside class="contact-info" data-reveal>
          <h3>Estamos aqui para ajudar</h3>
          <p>Fale direto com nosso time pelo WhatsApp ou agende uma visita ao espaço.</p>
          <div class="contact-details">
            <p><strong>📍 Endereço:</strong><br>${site.address}</p>
            <a href="${site.maps_link}" target="_blank" rel="noreferrer" class="btn btn--secondary">Ver no Google Maps</a>
            <p><strong>📞 Telefone:</strong><br><a href="tel:${site.phone}">${site.phone}</a></p>
            <p><strong>📧 E-mail:</strong><br><a href="mailto:${site.email}">${site.email}</a></p>
          </div>
          <a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noreferrer" class="btn btn--whatsapp">
            💬 Chamar no WhatsApp
          </a>
        </aside>
      </div>
    </div>
  `;

  // Attach form handler
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function renderFooter() {
  const site = siteData.site;
  const container = document.getElementById('footer');
  if (!container) return;

  container.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <h4 class="footer-brand">${site.title}</h4>
          <p>Um espaço pensado para quem quer trabalhar com conforto, foco e networking.</p>
        </div>
        <div>
          <h4>Links</h4>
          <ul class="footer-links">
            <li><a href="#services">Serviços</a></li>
            <li><a href="planos.pdf" target="_blank" rel="noreferrer">Planos</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4>Redes sociais</h4>
          <ul class="footer-links">
            <li><a href="https://www.instagram.com/casaurbana.ac?igsh=MXc5emVpYjg5cXpnaw==" target="_blank">Instagram</a></li>
            <li><a href="https://www.facebook.com/share/184FmkJH6h/" target="_blank">Facebook</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <p><a href="mailto:${site.email}">${site.email}</a></p>
          <p>© <span id="year"></span> ${site.title}</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('year').textContent = new Date().getFullYear();
}

// ==================
// MASTER RENDERER
// ==================
function renderApp() {
  renderHero();
  renderServices();
  renderBenefits();
  renderGallery();
  renderContact();
  renderFooter();

  // Reinitialize animations after render
  initScrollReveal();
  initSmoothScroll();
  initMobileMenu();
  initScrollTop();
  initHoverEffects();
  initRippleEffect();
}

// ==================
// FORM HANDLING
// ==================
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const data = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    message: document.getElementById('message').value.trim(),
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  fetch('http://localhost:3000/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const body = await response.json();
      if (!response.ok || !body.success) {
        throw new Error(body.error || 'Falha ao enviar mensagem.');
      }
      submitBtn.textContent = '✓ Mensagem enviada!';
      form.reset();
    })
    .catch((error) => {
      console.error('Erro no envio do formulário:', error);
      submitBtn.textContent = 'Erro ao enviar';
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 2000);
    })
    .finally(() => {
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
}

// ==================
// IMAGE MODAL
// ==================
function openImageModal(src, alt) {
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
    <div class="modal-content">
      <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      <img src="${src}" alt="${alt}" class="modal-image">
    </div>
  `;
  document.body.appendChild(modal);
}

// ==================
// INITIALIZATION
// ==================
document.addEventListener('DOMContentLoaded', loadSiteData);