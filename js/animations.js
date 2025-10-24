/**
 * TOS Network - Animations
 * Scroll animations and card interactions
 */

(function() {
  'use strict';

  /**
   * Scroll Animations using Intersection Observer
   */
  class ScrollAnimations {
    constructor() {
      this.observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
      };

      this.init();
    }

    init() {
      this.setupIntersectionObserver();
      this.setupParallax();
    }

    /**
     * Setup Intersection Observer for fade-in animations
     */
    setupIntersectionObserver() {
      // Check if IntersectionObserver is supported
      if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        document.querySelectorAll('.feature-card, .docs-card, .whitepaper-card, .faq-item').forEach(el => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('animate-in');

            // Unobserve after animation (only animate once)
            observer.unobserve(entry.target);
          }
        });
      }, this.observerOptions);

      // Observe all elements that should animate
      const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .docs-card, .whitepaper-card, .faq-item'
      );

      elementsToAnimate.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
      });
    }

    /**
     * Setup parallax scrolling effect (optional)
     */
    setupParallax() {
      const parallaxElements = document.querySelectorAll('[data-parallax]');

      if (parallaxElements.length === 0) return;

      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.updateParallax(parallaxElements);
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    /**
     * Update parallax element positions
     */
    updateParallax(elements) {
      const scrollY = window.pageYOffset;

      elements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    }
  }

  /**
   * Card Interactions
   */
  class CardInteractions {
    constructor() {
      this.cards = document.querySelectorAll('.feature-card');
      this.init();
    }

    init() {
      this.attachHoverEffects();
    }

    /**
     * Attach hover effects to cards
     */
    attachHoverEffects() {
      this.cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          this.onCardEnter(card);
        });

        card.addEventListener('mouseleave', () => {
          this.onCardLeave(card);
        });
      });
    }

    /**
     * Card hover enter
     */
    onCardEnter(card) {
      const icon = card.querySelector('.card-icon');
      if (icon) {
        icon.style.willChange = 'transform';
      }
    }

    /**
     * Card hover leave
     */
    onCardLeave(card) {
      const icon = card.querySelector('.card-icon');
      if (icon) {
        icon.style.willChange = 'auto';
      }
    }
  }

  /**
   * Button Interactions
   */
  class ButtonInteractions {
    constructor() {
      this.buttons = document.querySelectorAll('.btn');
      this.init();
    }

    init() {
      this.buttons.forEach(button => {
        // Add ripple effect on click (optional)
        button.addEventListener('click', (e) => {
          this.createRipple(e, button);
        });
      });
    }

    /**
     * Create ripple effect
     */
    createRipple(event, button) {
      // Skip if button already has a ripple
      const existingRipple = button.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      // Create ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      // Get button position
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      // Set ripple styles
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      ripple.style.pointerEvents = 'none';

      // Ensure button has position relative
      if (window.getComputedStyle(button).position === 'static') {
        button.style.position = 'relative';
      }

      // Ensure button has overflow hidden
      button.style.overflow = 'hidden';

      // Add ripple to button
      button.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  }

  /**
   * Performance Monitor (for debugging)
   */
  class PerformanceMonitor {
    constructor() {
      this.enabled = false; // Set to true for debugging
    }

    logPerformance() {
      if (!this.enabled || !window.performance) return;

      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.group('⚡ Performance Metrics');
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`Connection Time: ${connectTime}ms`);
      console.log(`Render Time: ${renderTime}ms`);
      console.groupEnd();
    }
  }

  /**
   * Initialize all animation modules
   */
  function init() {
    // Initialize scroll animations
    new ScrollAnimations();

    // Initialize card interactions
    new CardInteractions();

    // Initialize button interactions
    new ButtonInteractions();

    // Log performance (if enabled)
    const perfMonitor = new PerformanceMonitor();
    window.addEventListener('load', () => {
      perfMonitor.logPerformance();
    });
  }

  // Add ripple animation CSS if it doesn't exist
  if (!document.querySelector('#ripple-animation-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation-style';
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
