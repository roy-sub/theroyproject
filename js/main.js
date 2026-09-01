/*!
 * Subhradip Roy — portfolio site
 * Shared behaviour for every page: live clock, decode/scramble headings,
 * reveal-on-scroll, count-up stats, and the Work page scrollspy.
 * Ported (rewritten, not copied) from the Claude Design prototype's
 * DCLogic component in Portfolio.dc.html — see chats/chat1.md for intent.
 */
(function () {
  'use strict';

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------ *
   * Live clock — India Standard Time, ticks every second.
   * ------------------------------------------------------------------ */
  function startClock() {
    var el = document.querySelector('[data-clock]');
    if (!el) return;
    var fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: 'Asia/Kolkata'
      });
    } catch (e) { fmt = null; }
    function tick() {
      el.textContent = fmt ? fmt.format(new Date()) : new Date().toLocaleTimeString();
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------ *
   * Decode / scramble heading effect (the "Liam Jackson" reveal).
   * Reads the element's own text as the decode target, then types-and-
   * scrambles into it. Respects prefers-reduced-motion.
   * ------------------------------------------------------------------ */
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#%@{}*+:;>|/\\';

  function scramble(el) {
    if (el.dataset.scrambled) return;
    el.dataset.scrambled = '1';
    var target = (el.textContent || '').trim();
    if (!target) return;
    if (prefersReducedMotion) { el.textContent = target; return; }

    var dur = Math.min(2200, 620 + target.length * 62);
    var start = Date.now();
    el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

    var id = setInterval(function () {
      var p = Math.min(1, (Date.now() - start) / dur);
      var eased = p * p * (3 - 2 * p);
      var locked = Math.floor(eased * target.length);
      var grown = Math.min(target.length, Math.max(1, Math.ceil(eased * target.length * 1.35)));
      var out = target.slice(0, locked);
      for (var i = locked; i < grown; i++) {
        out += target[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (p >= 1) { clearInterval(id); el.textContent = target; }
    }, 45);

    // Safety: never leave a heading stuck mid-scramble.
    setTimeout(function () {
      if (el.textContent.length < 2 && target.length > 2) {
        clearInterval(id);
        el.textContent = target;
      }
    }, dur + 400);
  }

  /* ------------------------------------------------------------------ *
   * Reveal-on-scroll for [data-reveal] + count-up for [data-count].
   * [data-reveal-now] elements ignore scroll position and fire on a
   * fixed timer after load (the hero's bottom-corner labels).
   * ------------------------------------------------------------------ */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (prefersReducedMotion) { el.textContent = String(target); return; }
    var dur = 2600, start = Date.now();
    el.textContent = '0';
    var id = setInterval(function () {
      var p = Math.min(1, (Date.now() - start) / dur);
      var eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      el.textContent = String(Math.round(target * eased));
      if (p >= 1) { clearInterval(id); el.textContent = String(target); }
    }, 40);
  }

  function reveal(el) {
    if (el.classList.contains('is-revealed')) return;
    el.classList.add('is-revealed');
    if (el.getAttribute('data-reveal') === 'scramble') {
      scramble(el);
    }
    el.querySelectorAll('[data-count]').forEach(countUp);
  }

  function setupReveals() {
    var targets = document.querySelectorAll('[data-reveal]');
    var now = document.querySelectorAll('[data-reveal-now]');

    now.forEach(function (el) {
      setTimeout(function () { reveal(el); }, 2100);
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(reveal);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (el) {
      if (el.hasAttribute('data-reveal-now')) return; // handled above
      io.observe(el);
    });
  }

  /* ------------------------------------------------------------------ *
   * Work page: highlight the left project nav as its card scrolls
   * through the midpoint of the independently-scrolling right column.
   * ------------------------------------------------------------------ */
  function setupWorkSpy() {
    var root = document.querySelector('[data-work-scroll]');
    if (!root) return;
    var cards = Array.prototype.slice.call(root.querySelectorAll('[data-workcard]'));
    var navItems = document.querySelectorAll('[data-worknav]');
    if (!cards.length || !navItems.length) return;

    function update() {
      var mid = root.scrollTop + root.clientHeight * 0.42;
      var active = cards[0].getAttribute('data-workcard');
      cards.forEach(function (c) {
        if (c.offsetTop <= mid) active = c.getAttribute('data-workcard');
      });
      navItems.forEach(function (n) {
        n.classList.toggle('is-active', n.getAttribute('data-worknav') === active);
      });
    }
    root.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------ *
   * Dump page: the "Now playing" card actually plays images/dump/
   * spotify-audio.mp3 in-page (native <audio>, custom transport UI) —
   * the play button no longer sends visitors out to open.spotify.com.
   * ------------------------------------------------------------------ */
  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function setupDumpPlayer() {
    var card = document.querySelector('[data-player]');
    var audio = document.querySelector('[data-player-audio]');
    var btn = document.querySelector('[data-player-btn]');
    var scrub = document.querySelector('[data-player-scrub]');
    var fill = document.querySelector('[data-player-fill]');
    var time = document.querySelector('[data-player-time]');
    if (!card || !audio || !btn) return;

    function render() {
      var dur = audio.duration || 0;
      var pct = dur ? (audio.currentTime / dur) * 100 : 0;
      if (fill) fill.style.width = pct + '%';
      if (scrub) scrub.setAttribute('aria-valuenow', String(Math.round(pct)));
      if (time) time.textContent = fmtTime(audio.currentTime);
    }

    function seekTo(ratio) {
      if (!audio.duration) return;
      audio.currentTime = Math.min(1, Math.max(0, ratio)) * audio.duration;
      render();
    }

    btn.addEventListener('click', function () {
      if (audio.paused) audio.play().catch(function () { /* no source yet — ignore */ }); else audio.pause();
    });
    audio.addEventListener('play', function () {
      btn.textContent = '⏸';
      btn.setAttribute('aria-label', 'Pause');
      card.classList.add('is-playing');
    });
    ['pause', 'ended'].forEach(function (evt) {
      audio.addEventListener(evt, function () {
        btn.textContent = '▶';
        btn.setAttribute('aria-label', 'Play');
        card.classList.remove('is-playing');
      });
    });
    audio.addEventListener('timeupdate', render);
    audio.addEventListener('loadedmetadata', render);

    if (scrub) {
      scrub.addEventListener('click', function (e) {
        var rect = scrub.getBoundingClientRect();
        seekTo((e.clientX - rect.left) / rect.width);
      });
      scrub.addEventListener('keydown', function (e) {
        if (!audio.duration) return;
        if (e.key === 'ArrowRight') { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); render(); }
        if (e.key === 'ArrowLeft') { audio.currentTime = Math.max(0, audio.currentTime - 5); render(); }
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Exposed so js/i18n.js can replay the decode animation on headings
   * whose text changes when the language toggle is used.
   * ------------------------------------------------------------------ */
  window.SiteAnim = { scramble: scramble };

  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    startClock();
    setupReveals();
    setupWorkSpy();
    setupDumpPlayer();
  });
})();
