/**
 * Nine Hills Family Salon - Main Application Logic
 * Preloader, Sticky Nav, ScrollSpy, Tab Switching, Animated Counters, Custom Cursor, and Scroll-Reveal.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Snip & Reveal
  const preloader = document.getElementById('preloader');
  if (preloader) {
    function hidePreloader() {
      if (preloader.classList.contains('loaded')) return;
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
        triggerInitialReveals();
      }, 500);
    }

    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 700);
    });

    // Fallback if load already happened or takes too long
    setTimeout(hidePreloader, 1800);
  }

  // 2. Sticky Navbar & Header Scroll State
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Drawer
  const hamburgerBtn = document.getElementById('hamburgerToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    hamburgerBtn.setAttribute('aria-expanded', !isOpen);
    mobileDrawer.classList.toggle('is-open');
    document.body.classList.toggle('no-scroll', !isOpen);
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mobileDrawer.classList.contains('is-open')) {
          toggleMobileMenu();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        toggleMobileMenu();
      }
    });
  }

  // 4. ScrollSpy for Navbar Links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 5. Family Section Interactive Tabs
  const familyTabBtns = document.querySelectorAll('.family-tab-btn');
  const familyTabPanels = document.querySelectorAll('.family-tab-panel');

  familyTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      familyTabBtns.forEach((b) => b.classList.remove('active'));
      familyTabPanels.forEach((p) => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // 6. Animated Statistics Counters
  const counterElements = document.querySelectorAll('.stat-counter-number');
  let countersAnimated = false;

  function runCounters() {
    counterElements.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  const statsSection = document.querySelector('.why-us-section');
  if (statsSection && counterElements.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // 7. Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 80px 0px', threshold: 0.05 });

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  function triggerInitialReveals() {
    const heroReveals = document.querySelectorAll('.hero-section .reveal-on-scroll');
    heroReveals.forEach((el) => el.classList.add('is-visible'));
  }

  // 8. Custom Gold Cursor & Aura Follower (Desktop only with mouse pointer)
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const cursorDot = document.getElementById('cursorDot');
  const cursorAura = document.getElementById('cursorAura');

  if (isFinePointer && cursorDot && cursorAura) {
    let mouseX = -100, mouseY = -100;
    let auraX = -100, auraY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    function renderAura() {
      // Smooth lerp aura to mouse
      auraX += (mouseX - auraX) * 0.18;
      auraY += (mouseY - auraY) * 0.18;
      cursorAura.style.transform = `translate(${auraX}px, ${auraY}px)`;
      requestAnimationFrame(renderAura);
    }
    requestAnimationFrame(renderAura);

    // Enlarge aura on clickable elements
    const clickables = document.querySelectorAll('a, button, input, select, textarea, .gallery-item, .service-card');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorAura.style.width = '54px';
        cursorAura.style.height = '54px';
        cursorAura.style.borderColor = '#F3E2A0';
        cursorAura.style.backgroundColor = 'rgba(243, 226, 160, 0.15)';
      });
      el.addEventListener('mouseleave', () => {
        cursorAura.style.width = '36px';
        cursorAura.style.height = '36px';
        cursorAura.style.borderColor = 'var(--color-gold-primary)';
        cursorAura.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
      });
    });
  }
});
