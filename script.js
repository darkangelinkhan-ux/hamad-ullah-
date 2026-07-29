// =====================================================================
// PORTFOLIO SITE — MAIN SCRIPT
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. LOADING SCREEN
  ============================================================ */
  (function initLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    const fill = document.getElementById('loading-bar-fill');
    const percentLabel = document.getElementById('loading-percent');
    const sparkWrap = document.getElementById('loading-sparkles');
    let progress = 0;

    // Only show the full ~10s loading animation once per browser session.
    // Repeat visits (same tab/session) skip straight to the site.
    let alreadyVisited = false;
    try {
      alreadyVisited = sessionStorage.getItem('hw_visited') === '1';
    } catch (e) { /* sessionStorage unavailable (e.g. file:// in some browsers) — fall back to showing it */ }

    if (alreadyVisited) {
      screen.style.display = 'none';
      document.body.classList.remove('no-scroll');
      return;
    }

    try { sessionStorage.setItem('hw_visited', '1'); } catch (e) {}

    // Scatter sparkles randomly around the loading screen
    if (sparkWrap) {
      const sparkCount = 24;
      for (let i = 0; i < sparkCount; i++) {
        const s = document.createElement('span');
        s.className = 'spark';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDelay = (Math.random() * 2.6) + 's';
        s.style.opacity = '0';
        sparkWrap.appendChild(s);
      }
    }

    const timer = setInterval(() => {
      const increment = progress < 60 ? 3 : progress < 85 ? 1.5 : 0.8;
      progress = Math.min(progress + increment, 100);
      fill.style.width = progress + '%';
      percentLabel.textContent = Math.round(progress) + '%';

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          screen.classList.add('fade-out');
          document.body.classList.remove('no-scroll');
          setTimeout(() => {
            screen.style.display = 'none';
          }, 900);
        }, 400);
      }
    }, 180); // ~10s total load animation
  })();

  /* ============================================================
     2. CUSTOM CURSOR
  ============================================================ */
  (function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
    });

    const hoverables = 'a, button, input, textarea, .skill-tab, .filter-btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.style.transform += ' scale(0.5)';
        cursor.style.backgroundColor = 'hsl(var(--primary))';
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.style.backgroundColor = 'transparent';
      }
    });
  })();

  /* ============================================================
     2b. CURSOR FIRE TRAIL — flame particles that change color per section
  ============================================================ */
  (function initFireTrail() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Flame color per active section — warm fire tones tinted by section mood
    const SECTION_FLAME_COLORS = {
      home:       ['#ff5e3a', '#ff9d42'],
      about:      ['#a855f7', '#f472b6'],
      education:  ['#3b82f6', '#60a5fa'],
      skills:     ['#6366f1', '#8b5cf6'],
      experience: ['#f43f5e', '#fb923c'],
      projects:   ['#14b8a6', '#22d3ee'],
      services:   ['#f59e0b', '#fbbf24'],
      contact:    ['#22c55e', '#4ade80'],
    };

    let lastSpawn = 0;
    const SPAWN_INTERVAL = 35; // ms between particles

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL) return;
      lastSpawn = now;
      spawnFlame(e.clientX, e.clientY);
    });

    function spawnFlame(x, y) {
      const section = document.body.getAttribute('data-active-section') || 'home';
      const colors = SECTION_FLAME_COLORS[section] || SECTION_FLAME_COLORS.home;
      const size = 6 + Math.random() * 8;
      const drift = (Math.random() - 0.5) * 40;

      const particle = document.createElement('div');
      particle.className = 'fire-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.setProperty('--fx', drift + 'px');
      particle.style.background = `radial-gradient(circle at 50% 30%, ${colors[1]}, ${colors[0]} 70%)`;
      particle.style.boxShadow = `0 0 ${size * 1.5}px ${colors[0]}`;

      document.body.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove());
    }
  })();

  /* ============================================================
     3. SCROLL PROGRESS BAR
  ============================================================ */
  (function initScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    function update() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update);
    update();
  })();

  /* ============================================================
     4. NAVBAR — scroll style + active section + mobile menu
  ============================================================ */
  (function initNavbar() {
    const navbar = document.getElementById('navbar');
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.classList.add('no-scroll');
    }
    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    document.querySelectorAll('#mobile-menu-links a, #mobile-hire-btn').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    // Active section highlighting via IntersectionObserver
    const sectionIds = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'results', 'services', 'faq', 'contact'];
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-links a');

    function setActive(id) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
      document.body.setAttribute('data-active-section', id);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  })();

  /* ============================================================
     5. TYPEWRITER — Hero role pill
  ============================================================ */
  (function initTypewriter() {
    const el = document.getElementById('typewriter-role');
    if (!el || typeof HERO_ROLES === 'undefined') return;

    const words = HERO_ROLES;
    let wordIndex = 0;
    let text = '';
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function tick() {
      const currentWord = words[wordIndex];
      let delay;

      if (isDeleting) {
        text = currentWord.substring(0, text.length - 1);
        delay = deletingSpeed;
      } else {
        text = currentWord.substring(0, text.length + 1);
        delay = typingSpeed;
      }

      el.textContent = text;

      if (!isDeleting && text === currentWord) {
        delay = pauseTime;
        isDeleting = true;
      } else if (isDeleting && text === '') {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = typingSpeed;
      }

      setTimeout(tick, delay);
    }
    tick();
  })();

  /* ============================================================
     6. SCROLL REVEAL ANIMATIONS (.reveal / .reveal-left / .reveal-right)
  ============================================================ */
  (function initScrollReveal() {
    // Auto-stagger: give each card in a grid/row a slightly increasing delay
    // so groups cascade in one after another instead of popping together.
    const staggerGroups = document.querySelectorAll(
      '.highlights-grid, .about-stats, .certs-grid, .services-grid, .projects-grid, .faq-list, .skills-bars, .satisfaction-stats-row, .clients-grid, .project-mix-legend'
    );
    staggerGroups.forEach(group => {
      Array.from(group.children).forEach((child, i) => {
        if (child.classList.contains('reveal')) {
          child.style.transitionDelay = Math.min(i * 0.09, 0.54) + 's';
        }
      });
    });

    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline-line, .text-reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '-40px' });

    targets.forEach(t => observer.observe(t));
  })();

  /* ============================================================
     6b. PREMIUM TEXT REVEAL — headings animate in word by word
  ============================================================ */
  (function initTextReveal() {
    const els = document.querySelectorAll('.text-reveal');
    els.forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map((word, i) => `<span class="tr-word" style="--i:${i}"><span class="tr-word-inner">${word}</span></span>`)
        .join(' ');
    });
  })();

  /* ============================================================
     7. ANIMATED COUNTERS (About stats)
  ============================================================ */
  (function initCounters() {
    const counters = document.querySelectorAll('.stat-num, .sat-stat-num');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(el) {
      const end = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      let startTimestamp = null;

      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * end) + suffix;
        if (progress < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  })();

  /* ============================================================
     8. SKILLS SECTION — tabs + bars render
  ============================================================ */
  (function initSkills() {
    const tabsWrap = document.getElementById('skills-tabs');
    const barsWrap = document.getElementById('skills-bars');
    const allListWrap = document.getElementById('skills-all-list');
    if (!tabsWrap || typeof SKILL_CATEGORIES === 'undefined') return;

    function renderBars(category) {
      const cat = SKILL_CATEGORIES.find(c => c.category === category);
      if (!cat) return;
      barsWrap.innerHTML = cat.skills.map((skill, i) => `
        <div class="skill-bar-item">
          <div class="skill-bar-top">
            <div class="skill-bar-left">
              <span class="s-icon"><i class="${SKILL_ICON_MAP[skill.icon] || 'fa-solid fa-code'}"></i></span>
              <span class="s-name">${skill.name}</span>
            </div>
            <span class="s-level">${skill.level}%</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-level="${skill.level}" style="transition-delay:${i * 0.08}s"></div>
          </div>
        </div>
      `).join('');

      // Animate bar fills on next frame
      requestAnimationFrame(() => {
        barsWrap.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.width = fill.dataset.level + '%';
        });
      });
    }

    function renderAllSkills() {
      const all = SKILL_CATEGORIES.flatMap(c => c.skills);
      allListWrap.innerHTML = all.map(skill => `
        <span>
          <span class="s-icon"><i class="${SKILL_ICON_MAP[skill.icon] || 'fa-solid fa-code'}"></i></span>
          ${skill.name}
        </span>
      `).join('');
    }

    tabsWrap.querySelectorAll('.skill-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsWrap.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderBars(tab.dataset.cat);
      });
    });

    renderBars(SKILL_CATEGORIES[0].category);
    renderAllSkills();
  })();

  /* ============================================================
     9. PROJECTS SECTION — render + filter
  ============================================================ */
  (function initProjects() {
    const grid = document.getElementById('projects-grid');
    const filtersWrap = document.getElementById('project-filters');
    if (!grid || typeof PROJECTS === 'undefined') return;

    function projectCard(project) {
      const media = project.image
        ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
        : `<div class="project-icon-tile"><i class="${project.icon || 'fa-solid fa-globe'}"></i><span>Screenshot coming soon</span></div>`;
      return `
        <div class="project-card glass ${project.featured ? 'featured' : ''}">
          <div class="project-img-wrap">
            <div class="project-img-overlay"></div>
            ${media}
            ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
          </div>
          <div class="project-body">
            <div>
              <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="project-tech">
                ${project.tech.map(t => `<span>${t}</span>`).join('')}
              </div>
            </div>
            <div class="project-links">
              <a href="${project.link || '#'}" target="_blank" rel="noopener noreferrer" aria-label="Live site"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          </div>
        </div>
      `;
    }

    function render(filter) {
      const list = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
      grid.innerHTML = list.map(projectCard).join('');
    }

    filtersWrap.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.filter);
      });
    });

    render('All');
  })();

  /* ============================================================
     9b. SERVICE CARD ICONS — 3D tilt on mouse move
  ============================================================ */
  (function initServiceIconTilt() {
    document.querySelectorAll('.service-card').forEach(card => {
      const icon = card.querySelector('.service-icon');
      if (!icon) return;

      card.addEventListener('mousemove', (e) => {
        const rect = icon.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const clampedX = Math.max(-2.2, Math.min(2.2, dx));
        const clampedY = Math.max(-2.2, Math.min(2.2, dy));
        icon.style.transform = `perspective(500px) rotateY(${clampedX * 22}deg) rotateX(${-clampedY * 22}deg) translateZ(10px) scale(1.08)`;
      });

      card.addEventListener('mouseleave', () => {
        icon.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg) translateZ(0) scale(1)';
      });
    });
  })();

  /* ============================================================
     10. CONTACT FORM
  ============================================================ */
  (function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const submitContent = document.getElementById('submit-btn-content');
    const successOverlay = document.getElementById('form-success');
    if (!form) return;

    // ------------------------------------------------------------------
    // REAL EMAIL DELIVERY VIA FORMSPREE
    // 1. Go to https://formspree.io and sign up free with your email.
    // 2. Create a new form — it gives you an endpoint like:
    //       https://formspree.io/f/xxxxabcd
    // 3. Paste that endpoint below, replacing the placeholder.
    // 4. Formspree emails every submission straight to your inbox.
    // ------------------------------------------------------------------
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID';

    const errorBox = document.createElement('div');
    errorBox.className = 'form-error-msg';
    errorBox.style.cssText = 'display:none;margin-top:12px;padding:12px 16px;border-radius:10px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.35);color:#fca5a5;font-size:13px;';
    form.appendChild(errorBox);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorBox.style.display = 'none';
      submitBtn.disabled = true;
      submitContent.innerHTML = '<span class="spinner"></span> Sending...';

      const payload = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      };

      try {
        if (FORMSPREE_ENDPOINT.includes('REPLACE_WITH_YOUR_FORM_ID')) {
          // Endpoint not configured yet — tell the developer instead of
          // pretending the message was sent.
          throw new Error('NOT_CONFIGURED');
        }

        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('SEND_FAILED');

        successOverlay.classList.add('show');
        setTimeout(() => {
          successOverlay.classList.remove('show');
          form.reset();
        }, 4000);
      } catch (err) {
        if (err.message === 'NOT_CONFIGURED') {
          errorBox.textContent = 'Form is not connected to an email service yet. Set FORMSPREE_ENDPOINT in script.js (see comment above initContactForm).';
        } else {
          errorBox.textContent = 'Something went wrong sending your message. Please email me directly instead.';
        }
        errorBox.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitContent.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }
    });
  })();

  /* ============================================================
     11. BACK TO TOP BUTTON
  ============================================================ */
  (function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    function toggle() {
      btn.classList.toggle('show', window.scrollY > 400);
    }
    window.addEventListener('scroll', toggle);
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggle();
  })();

  /* ============================================================
     12. FOOTER YEAR
  ============================================================ */
  (function initFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  })();

  /* ============================================================
     13. HERO FLOATING PARTICLES
  ============================================================ */
  (function initHeroParticles() {
    const wrap = document.getElementById('hero-particles');
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COUNT = window.innerWidth < 768 ? 14 : 28;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'hero-particle';
      const size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--drift', (Math.random() - 0.5) * 120 + 'px');
      const duration = 9 + Math.random() * 10;
      const delay = Math.random() * duration;
      p.style.animationDuration = duration + 's';
      p.style.animationDelay = '-' + delay + 's';
      p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
      wrap.appendChild(p);
    }
  })();

  /* ============================================================
     14. SERVICE CARDS — 3D icon tilt on mouse move
  ============================================================ */
  (function initServiceTilt() {
    const cards = document.querySelectorAll('.service-card');
    if (!cards.length) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    cards.forEach(card => {
      const icon = card.querySelector('.service-icon');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Glow follow position
        card.style.setProperty('--mx', mx + 'px');
        card.style.setProperty('--my', my + 'px');

        if (icon) {
          const cx = mx - rect.width / 2;
          const cy = my - rect.height / 2;
          const rotateY = (cx / rect.width) * 34;
          const rotateX = -(cy / rect.height) * 34;
          icon.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(14px)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (icon) icon.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  })();

  /* ============================================================
     15. FAQ — render + accordion toggle
  ============================================================ */
  (function initFAQ() {
    const list = document.getElementById('faq-list');
    if (!list || typeof FAQS === 'undefined') return;

    list.innerHTML = FAQS.map((faq, i) => `
      <div class="faq-item glass reveal">
        <button class="faq-question" data-index="${i}">
          <span>${faq.question}</span>
          <span class="faq-icon"><i class="fa-solid fa-plus"></i></span>
        </button>
        <div class="faq-answer-wrap">
          <div class="faq-answer-inner">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Re-apply stagger delay + observe the freshly rendered items,
    // since they were created after the main scroll-reveal observer ran.
    const items = list.querySelectorAll('.faq-item');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '-40px' });

    items.forEach((item, i) => {
      item.style.transitionDelay = Math.min(i * 0.09, 0.54) + 's';
      revealObserver.observe(item);
    });

    list.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const wasOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  })();

  /* ============================================================
     16. PROJECT MIX — real category breakdown, animated donut chart
  ============================================================ */
  (function initProjectMix() {
    const svg = document.getElementById('project-mix-donut');
    const legend = document.getElementById('project-mix-legend');
    const totalEl = document.getElementById('pm-total');
    const wrap = document.querySelector('.project-mix-donut-wrap');
    if (!svg || typeof PROJECT_MIX === 'undefined' || !wrap) return;

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const total = PROJECT_MIX.reduce((sum, d) => sum + d.count, 0);
    if (totalEl) totalEl.textContent = total;

    // Build one <circle> segment per category, offset around the ring.
    let cumulativeLength = 0;
    const segments = PROJECT_MIX.map((d) => {
      const segLength = (d.count / total) * circumference;

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '100');
      circle.setAttribute('cy', '100');
      circle.setAttribute('r', String(radius));
      circle.setAttribute('class', 'pm-segment');
      circle.style.stroke = d.color;
      circle.style.strokeDasharray = `0 ${circumference}`;
      circle.style.strokeDashoffset = String(-cumulativeLength);
      circle.dataset.dash = segLength;
      circle.dataset.gap = circumference - segLength;
      svg.appendChild(circle);

      cumulativeLength += segLength;
      return circle;
    });

    // Legend
    if (legend) {
      legend.innerHTML = PROJECT_MIX.map(d => `
        <div class="pm-legend-item">
          <span class="pm-dot" style="background:${d.color}"></span>
          <span class="pm-name">${d.label}</span>
          <span class="pm-count">${d.count}</span>
        </div>
      `).join('');
    }

    function animate() {
      segments.forEach((circle, i) => {
        setTimeout(() => {
          circle.style.transition = 'stroke-dasharray 1.1s cubic-bezier(0.16,1,0.3,1)';
          circle.style.strokeDasharray = `${circle.dataset.dash} ${circle.dataset.gap}`;
        }, i * 150);
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observer.observe(wrap);
  })();

  /* ============================================================
     17. TESTIMONIALS CAROUSEL
  ============================================================ */
  (function initTestimonials() {
    const track = document.getElementById('testimonials-track');
    const dotsWrap = document.getElementById('testimonials-dots');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    if (!track || typeof TESTIMONIALS === 'undefined') return;

    function starIcons(rating) {
      let html = '';
      for (let i = 1; i <= 5; i++) {
        html += i <= rating
          ? '<i class="fa-solid fa-star"></i>'
          : '<i class="fa-regular fa-star"></i>';
      }
      return html;
    }

    track.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card glass">
        <i class="fa-solid fa-quote-left testi-quote-icon"></i>
        <div class="testi-stars">${starIcons(t.rating)}</div>
        <p class="testi-quote">${t.quote}</p>
        <div class="testi-person">
          <div class="testi-avatar-icon"><i class="${t.icon}"></i></div>
          <div>
            <div class="testi-name">${t.name}</div>
            <div class="testi-role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join('');

    const cards = track.querySelectorAll('.testimonial-card');
    let currentPage = 0;

    function cardsPerView() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1100) return 2;
      return 3;
    }

    function totalPages() {
      return Math.max(1, Math.ceil(cards.length / cardsPerView()));
    }

    function renderDots() {
      dotsWrap.innerHTML = '';
      const pages = totalPages();
      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === currentPage ? ' active' : '');
        dot.addEventListener('click', () => goToPage(i));
        dotsWrap.appendChild(dot);
      }
    }

    function goToPage(page) {
      const pages = totalPages();
      currentPage = (page + pages) % pages;
      const perView = cardsPerView();
      const card = cards[0];
      if (!card) return;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 20;
      const offset = currentPage * perView * (cardWidth + gap);
      track.scrollTo({ left: offset, behavior: 'smooth' });
      dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === currentPage));
    }

    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentPage = 0;
        renderDots();
      }, 200);
    });

    renderDots();
  })();

});
