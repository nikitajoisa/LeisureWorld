/* ==========================================================================
   LeisureWorld Cork — Site-wide JavaScript
   --------------------------------------------------------------------------
   One file used by every page. All handlers detect their own elements, so
   pages without (e.g.) a contact form simply skip that block. Nothing in
   here ever throws if an element is missing.
   ========================================================================== */

(function () {
  'use strict';


  /* ── Custom cursor ──────────────────────────────────────────────────────
     Replaces the native cursor with the floating dot defined by `#cur` in
     the CSS. Skips on touch devices, since they don't have a cursor. */
  function initCustomCursor() {
    const cur = document.getElementById('cur');
    if (!cur) return;
    if (window.matchMedia('(hover: none)').matches) return;

    document.addEventListener('mousemove', (e) => {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    });

    const hoverables = 'a, button, .loc-card, .ed-item, .acc-trigger, .acc-cell, ' +
                       '.cloc, .price-row, .hours-card, .ctc-card, .cform, .btn-submit';
    document.querySelectorAll(hoverables).forEach((el) => {
      el.addEventListener('mouseenter', () => cur.classList.add('big'));
      el.addEventListener('mouseleave', () => cur.classList.remove('big'));
    });
  }


  /* ── Sticky nav ─────────────────────────────────────────────────────────
     Adds `.stuck` to the nav after the user scrolls past 30px so the nav
     can change its background/shadow via CSS. */
  function initStickyNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('stuck', window.scrollY > 30);
    }, { passive: true });
  }


  /* ── Mobile menu ────────────────────────────────────────────────────────
     Hamburger button opens the slide-over menu; the close button and any
     link inside close it again. */
  function initMobileMenu() {
    const mob   = document.getElementById('mob');
    const ham   = document.getElementById('ham');
    const close = document.getElementById('mob-close');
    if (!mob || !ham) return;

    ham.addEventListener('click', () => mob.classList.add('open'));
    if (close) close.addEventListener('click', () => mob.classList.remove('open'));

    document.querySelectorAll('.mlink').forEach((a) => {
      a.addEventListener('click', () => mob.classList.remove('open'));
    });
  }


  /* ── Scroll-reveal ──────────────────────────────────────────────────────
     Any element with class `.r` fades/slides into view (rule defined in
     the CSS) the first time it enters the viewport. */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.r');
    if (!targets.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.1 });

    targets.forEach((el) => io.observe(el));
  }


  /* ── Doc-page sidebar scrollspy ─────────────────────────────────────────
     Used on policy pages: highlights the matching `.doc-nav a` link as the
     reader scrolls through the corresponding section. We accept any of the
     section-like containers used across the policy pages. */
  function initDocScrollspy() {
    const navLinks = document.querySelectorAll('.doc-nav a');
    if (!navLinks.length) return;

    const sectionSelectors = '.doc-section, .rules-group, .charter-item';
    const sections = document.querySelectorAll(sectionSelectors);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => a.classList.remove('active'));
        const active = document.querySelector(`.doc-nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      });
    }, { threshold: 0.3 });

    sections.forEach((s) => observer.observe(s));

    // Also reveal-on-scroll for these sections, matching the original behaviour.
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
    }, { threshold: 0.08 });
    sections.forEach((el) => reveal.observe(el));
  }


  /* ── Activities accordion (home page) ───────────────────────────────────
     Exposed globally because the markup uses inline `onclick="accToggle(this)"`. */
  window.accToggle = function (btn) {
    const item = btn.closest('.acc-item');
    if (!item) return;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach((i) => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  };


  /* ── Pricing tabs (home page) ───────────────────────────────────────────
     The home-page pricing strip uses `onclick="showTab('payg', this)"`. */
  window.showTab = function (id, btn) {
    document.querySelectorAll('.price-panel').forEach((p) => p.classList.remove('show'));
    document.querySelectorAll('.ptab').forEach((b) => b.classList.remove('active'));
    const panel = document.getElementById('tab-' + id);
    if (panel) panel.classList.add('show');
    if (btn) btn.classList.add('active');
  };


  /* ── Pricing-page centre tabs ───────────────────────────────────────────
     pricing.html uses `onclick="showCentre('btown', this)"` to switch
     between Bishopstown / Churchfield / Douglas panels. */
  window.showCentre = function (id, btn) {
    document.querySelectorAll('.centre-panel').forEach((p) => p.classList.remove('show'));
    document.querySelectorAll('.ctab').forEach((b) => b.classList.remove('active'));
    const panel = document.getElementById('panel-' + id);
    if (panel) panel.classList.add('show');
    if (btn) btn.classList.add('active');
  };


  /* ── Live-chat status indicator (contact page) ──────────────────────────
     Shows a green pulsing dot during live-chat hours, red otherwise. The
     hours: Mon–Thu 09:00–17:00, Fri 09:00–16:30. Re-checks every minute. */
  function initChatStatus() {
    const dot = document.getElementById('chat-dot');
    const txt = document.getElementById('chat-status-text');
    if (!dot || !txt) return;

    function update() {
      const now  = new Date();
      const day  = now.getDay();        // 0 = Sun … 6 = Sat
      const time = now.getHours() + now.getMinutes() / 60;

      let online = false;
      if (day >= 1 && day <= 4 && time >= 9 && time < 17)   online = true;
      if (day === 5            && time >= 9 && time < 16.5) online = true;

      dot.style.background = online ? '#22c55e' : '#d93025';
      dot.style.animation  = online ? '' : 'none';
      txt.textContent      = online ? 'Online Now' : 'Currently Offline';
    }

    update();
    setInterval(update, 60000);
  }


  /* ── Contact form ───────────────────────────────────────────────────────
     Posts the form to send-mail.php. Exposed globally because the markup
     uses inline `onclick="handleForm()"`. */
  window.handleForm = async function () {
    const fname   = document.getElementById('cf-fname');
    const lname   = document.getElementById('cf-lname');
    const email   = document.getElementById('cf-email');
    const centre  = document.getElementById('cf-loc');
    const enquiry = document.getElementById('cf-topic');
    const message = document.getElementById('cf-msg');
    const errEl   = document.getElementById('formError');
    const btn     = document.getElementById('submitBtn');
    if (!fname || !lname || !email || !centre || !enquiry || !message || !errEl || !btn) return;

    const data = {
      fname:   fname.value.trim(),
      lname:   lname.value.trim(),
      email:   email.value.trim(),
      centre:  centre.value,
      enquiry: enquiry.value,
      message: message.value.trim(),
    };

    if (!data.fname || !data.lname || !data.email || !data.centre || !data.enquiry || !data.message) {
      errEl.textContent   = 'Please fill in all fields before sending.';
      errEl.style.display = 'block';
      return;
    }
    errEl.style.display = 'none';

    // Save the original button content so we can restore it on error.
    const originalBtn = btn.innerHTML;
    btn.disabled  = true;
    btn.innerHTML = 'Sending…';

    try {
      const res  = await fetch('send-mail.php', { method: 'POST', body: new URLSearchParams(data) });
      const json = await res.json();

      if (json.success) {
        const wrap = document.getElementById('formWrap');
        const ok   = document.getElementById('formOk');
        if (wrap) wrap.style.display = 'none';
        if (ok)   ok.style.display   = 'block';
      } else {
        errEl.textContent   = json.error || 'Something went wrong. Please try again.';
        errEl.style.display = 'block';
        btn.disabled  = false;
        btn.innerHTML = originalBtn;
      }
    } catch (err) {
      errEl.textContent   = 'Could not reach the server. Please try again later.';
      errEl.style.display = 'block';
      btn.disabled  = false;
      btn.innerHTML = originalBtn;
    }
  };


  /* ── Reusable bubble canvas engine ──────────────────────────────────────
     Draws softly rising bubbles inside a <canvas>. color = "r,g,b" string,
     e.g. "255,107,53". Used by initSwimLevelCards() below, and exposed on
     `window` in case a page ever needs to call it directly. */
  function initBubbleCanvas(canvas, color, count) {
    const ctx = canvas.getContext('2d');
    let bubbles = [];

    function resize() {
      canvas.width  = canvas.parentElement.offsetWidth  || canvas.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight || canvas.offsetHeight;
    }

    function makeBubble(spreadY) {
      return {
        x: Math.random() * canvas.width,
        y: spreadY ? Math.random() * canvas.height : canvas.height + Math.random() * 80,
        r: 3 + Math.random() * 20,
        speed: 0.25 + Math.random() * 0.6,
        drift: (Math.random() - 0.5) * 0.35,
        alpha: 0.05 + Math.random() * 0.12,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.018
      };
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bubbles.forEach((b) => {
        b.wobble += b.wobbleSpeed;
        b.x += b.drift + Math.sin(b.wobble) * 0.25;
        b.y -= b.speed;
        if (b.y + b.r < 0) Object.assign(b, makeBubble(false));

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color},${b.alpha * 2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${b.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    bubbles = Array.from({ length: count }, () => makeBubble(true));
    window.addEventListener('resize', resize);
    draw();
  }
  window.initBubbleCanvas = initBubbleCanvas;


  /* ── Swim-lesson level-card pages ────────────────────────────────────────
     Shared by Activities/Swimlessons/{rl,ss,swimschool,wsf}.html: the hero
     + per-card bubble canvases, level-card scroll reveal, the stat
     count-up, the level-image click "pop", and the FAQ accordion. Every
     selector here is unique to those pages, so this is a no-op elsewhere. */
  function initSwimLevelCards() {
    const hero = document.getElementById('bubbleCanvas');
    if (hero) initBubbleCanvas(hero, hero.dataset.color || '34,211,238', 35);

    document.querySelectorAll('.card-bubbles').forEach((canvas) => {
      initBubbleCanvas(canvas, canvas.dataset.color, 18);
    });

    const cards = document.querySelectorAll('.level-card');
    if (cards.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 120);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      cards.forEach((c) => io.observe(c));
    }

    const statCounts = document.querySelectorAll('.stat-count');
    if (statCounts.length) {
      const statObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const duration = 1200;
          const start = performance.now();
          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
          }
          requestAnimationFrame(tick);
          statObserver.unobserve(el);
        });
      }, { threshold: 0.5 });
      statCounts.forEach((el) => statObserver.observe(el));
    }

    document.querySelectorAll('.level-img').forEach((img) => {
      img.addEventListener('click', () => {
        img.classList.remove('popped');
        void img.offsetWidth; /* reflow to restart */
        img.classList.add('popped');
        img.addEventListener('animationend', () => img.classList.remove('popped'), { once: true });
      });
    });

    document.querySelectorAll('.faq-question').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((el) => {
          el.classList.remove('open');
          el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          el.querySelector('.faq-icon').textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          btn.querySelector('.faq-icon').textContent = '−';
        }
      });
    });
  }


  /* ── Boot ──────────────────────────────────────────────────────────────
     Run everything once the DOM is parsed. We run the universal pieces on
     every page; page-specific helpers (showTab, accToggle, handleForm)
     are exposed on `window` so inline onclick attributes can find them. */
  function boot() {
    initCustomCursor();
    initStickyNav();
    initMobileMenu();
    initScrollReveal();
    initDocScrollspy();
    initChatStatus();
    initSwimLevelCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
