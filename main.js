(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', function(){

    // Header scrolled state
    var header = document.querySelector('.site-header');
    function onScroll(){
      if (!header) return;
      if (window.scrollY > 50) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu
    var toggle = document.querySelector('.mobile-toggle');
    var menu = document.querySelector('.mobile-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function(){
        menu.classList.toggle('open');
      });
      menu.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ menu.classList.remove('open'); });
      });
    }

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function(link){
      link.addEventListener('click', function(e){
        var href = link.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });

    // Intersection-based reveal
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    if ('IntersectionObserver' in window && revealEls.length) {
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

    // Subtle cursor glow on hero (desktop only)
    var hero = document.querySelector('.hero');
    if (hero && window.matchMedia('(min-width: 880px)').matches) {
      var glow = document.createElement('div');
      glow.style.cssText = 'position:absolute;top:0;left:0;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle, rgba(47,124,171,0.10), transparent 60%);pointer-events:none;transform:translate(-50%,-50%);transition:opacity 400ms ease;opacity:0;z-index:0;';
      hero.appendChild(glow);
      hero.addEventListener('mousemove', function(e){
        var rect = hero.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
        glow.style.opacity = '1';
      });
      hero.addEventListener('mouseleave', function(){ glow.style.opacity = '0'; });
    }

  });
})();
