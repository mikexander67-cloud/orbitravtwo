(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){

    // 1. Scroll reveal
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .section-title');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // 2. Navbar background blur on scroll
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function(){
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // 3. Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', function(){
        navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
      });
      navLinks.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ navLinks.classList.remove('open'); });
      });
    }

    // 4. Smooth anchor scroll with header offset
    document.querySelectorAll('a[href^="#"]').forEach(function(link){
      link.addEventListener('click', function(e){
        var id = link.getAttribute('href');
        if (!id || id === '#' || id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var offset = (header ? header.offsetHeight : 0) + 12;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    // 5. Number counter for [data-count]
    function animateCount(el){
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      var decimals = (el.getAttribute('data-count') || '').split('.')[1];
      var dp = decimals ? decimals.length : 0;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = performance.now();
      function tick(now){
        var p = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        el.textContent = prefix + val.toFixed(dp) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window && counters.length) {
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function(c){ cio.observe(c); });
    }

    // 6. Current year in footer
    document.querySelectorAll('[data-year]').forEach(function(el){
      el.textContent = new Date().getFullYear();
    });

  });
})();
