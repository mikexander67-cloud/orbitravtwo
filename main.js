(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', function(){
    // Scroll reveal
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .section-head, .hero');
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // Header scroll state
    var header = document.querySelector('.site-header');
    if(header){
      var onScroll = function(){
        if(window.scrollY > 32){ header.classList.add('scrolled'); }
        else { header.classList.remove('scrolled'); }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Mobile nav toggle
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if(navToggle && nav){
      navToggle.addEventListener('click', function(){
        nav.classList.toggle('open');
        var open = nav.classList.contains('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      nav.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){ nav.classList.remove('open'); });
      });
    }

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = a.getAttribute('href');
        if(href.length > 1){
          var target = document.querySelector(href);
          if(target){
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.pageYOffset - 72;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        }
      });
    });

    // Hero underline draw-in
    var heroUnderline = document.querySelector('.hero h1 .accent-underline');
    if(heroUnderline){
      setTimeout(function(){ heroUnderline.classList.add('drawn'); }, 350);
    }

    // Mark active nav link
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-link').forEach(function(l){
      var href = l.getAttribute('href');
      if(!href) return;
      var clean = href.replace(/\/$/, '') || '/';
      if(clean === path){ l.classList.add('active'); }
    });
  });
})();
