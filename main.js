(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', function(){

    // Scroll reveal via IntersectionObserver
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger, .headline-underline');
    if ('IntersectionObserver' in window && revealEls.length){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting){
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // Sticky header backdrop on scroll
    var header = document.querySelector('.site-header');
    if (header){
      var onScroll = function(){
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = a.getAttribute('href');
        if (href.length > 1){
          var target = document.querySelector(href);
          if (target){
            e.preventDefault();
            var top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        }
      });
    });

    // Number counter for stat blocks
    function animateCount(el){
      var target = parseFloat(el.getAttribute('data-count') || el.textContent);
      if (isNaN(target)) return;
      var duration = 1200;
      var startTime = null;
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      function step(ts){
        if (!startTime) startTime = ts;
        var p = Math.min((ts - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.floor(eased * target);
        el.textContent = prefix + val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString() + suffix;
      }
      requestAnimationFrame(step);
    }
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window){
      var co = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){ animateCount(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function(c){ co.observe(c); });
    }

    // Mobile nav toggle (if present)
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (navToggle && nav){
      navToggle.addEventListener('click', function(){
        nav.classList.toggle('open');
      });
    }

  });
})();