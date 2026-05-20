(function(){
  'use strict';

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    // Reveal on scroll
    var revealEls = document.querySelectorAll('.reveal, .stagger, .section-heading');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // Sticky header background on scroll
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function(){
        if (window.scrollY > 32) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Mobile nav toggle
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function(){
        var isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      nav.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ nav.classList.remove('open'); });
      });
    }

    // Smooth scroll for in-page anchors (native smooth-scroll handles, but enforce offset)
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  });
})();
