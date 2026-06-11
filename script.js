/* =========================================================
   HOPEANCHOR TECH — script.js
   Mobile nav toggle | Scroll effects | Smooth scroll
   Form validation | Netlify form handling
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     1. MOBILE NAV TOGGLE
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ============================================================
     2. NAVBAR SCROLL EFFECT
     ============================================================ */
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ============================================================
     3. SMOOTH SCROLL for anchor links
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     4. SCROLL REVEAL (fade-up) — IntersectionObserver
     ============================================================ */
  const fadeTargets = document.querySelectorAll(
    '.pillar-card, .mission-item, .course-card, .testi-card, ' +
    '.impact-item, .mvv-card, .svc-detail-card, .why-svc-item, ' +
    '.ta-item, .course-full-card, .faq-item, .ql-card, .model-step, ' +
    '.cd-item, .founder-avatar-wrap, .founder-text'
  );

  fadeTargets.forEach(function (el) {
    el.classList.add('fade-up');
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeTargets.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ============================================================
     5. STAGGERED ANIMATION for grid children
     ============================================================ */
  const staggerGroups = document.querySelectorAll(
    '.pillars-grid, .mission-grid, .courses-row, .testi-grid, ' +
    '.mvv-grid, .why-svc-grid, .training-approach-grid, .quick-links-grid'
  );

  staggerGroups.forEach(function (group) {
    Array.from(group.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  /* ============================================================
     6. CONTACT FORM VALIDATION & NETLIFY SUBMISSION
     ============================================================ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');
  const btnText     = document.getElementById('btnText');
  const btnLoading  = document.getElementById('btnLoading');

  if (contactForm) {

    // Real-time validation on blur
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.classList.contains('error')) {
          validateField(field);
        }
      });
    });

    function validateField(field) {
      const errorEl = document.getElementById(field.id + 'Error');
      let errorMsg = '';

      field.classList.remove('error');

      if (!field.value.trim()) {
        errorMsg = 'This field is required.';
      } else if (field.type === 'email') {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(field.value.trim())) {
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (field.tagName === 'SELECT' && field.value === '') {
        errorMsg = 'Please select an option.';
      } else if (field.id === 'message' && field.value.trim().length < 10) {
        errorMsg = 'Please write at least 10 characters.';
      }

      if (errorMsg) {
        field.classList.add('error');
        if (errorEl) errorEl.textContent = errorMsg;
        return false;
      }

      if (errorEl) errorEl.textContent = '';
      return true;
    }

    function validateForm() {
      let isValid = true;
      requiredFields.forEach(function (field) {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      return isValid;
    }

    // Form submit — encode and POST to Netlify
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) {
        // Scroll to first error
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      // Show loading state
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (submitBtn) submitBtn.disabled = true;

      // Encode form data for Netlify
      const formData = new FormData(contactForm);
      const body = new URLSearchParams(formData).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
      .then(function (response) {
        if (response.ok) {
          // Show success
          contactForm.style.display = 'none';
          if (formSuccess) {
            formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(function () {
        // Fallback — allow native Netlify form submission
        contactForm.submit();
      })
      .finally(function () {
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  /* ============================================================
     7. ACTIVE NAV LINK (highlight based on current page)
     ============================================================ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ============================================================
     8. HERO STAT COUNTER ANIMATION
     ============================================================ */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    function tick() {
      start += step;
      if (start >= target) {
        el.textContent = target + (el.dataset.suffix || '');
        return;
      }
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Only run counters if stat numbers exist and IntersectionObserver is supported
  const statNums = document.querySelectorAll('.stat-num[data-count]');
  if (statNums.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target, 1200);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

});

/* ============================================================
   9. DARK / LIGHT THEME TOGGLE
   ============================================================ */
(function () {
  const html      = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const icon      = document.getElementById('themeIcon');

  // Read saved preference; default to 'light'
  const saved = localStorage.getItem('hat-theme') || 'light';
  applyTheme(saved);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme') || 'light';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('hat-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }
})();
