/**
 * TOS Network - Main JavaScript
 * Page initialization and utility functions
 */

(function() {
  'use strict';

  /**
   * Page Loader
   */
  class PageLoader {
    constructor() {
      this.loader = document.getElementById('pageLoader');
      this.init();
    }

    init() {
      // Hide loader when page is fully loaded
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.hideLoader();
        });
      } else {
        this.hideLoader();
      }

      window.addEventListener('load', () => {
        this.hideLoader();
      });
    }

    hideLoader() {
      if (this.loader) {
        setTimeout(() => {
          this.loader.classList.add('page-loader--hidden');
          setTimeout(() => {
            this.loader.style.display = 'none';
          }, 500);
        }, 300);
      }
    }
  }

  /**
   * Smooth Scroll
   */
  class SmoothScroll {
    constructor() {
      this.init();
    }

    init() {
      // Handle all anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');

          // Skip if href is just "#"
          if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
          }

          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();

            // Get navbar height for offset
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            // Calculate target position
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

            // Smooth scroll to target
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Update URL without triggering scroll
            history.pushState(null, '', href);
          }
        });
      });
    }
  }

  /**
   * Dropdown Menu Handler
   */
  class DropdownMenu {
    constructor() {
      this.dropdowns = document.querySelectorAll('.has-dropdown');
      this.init();
    }

    init() {
      this.dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.navbar-link');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!link || !menu) return;

        // Desktop: Hover behavior
        if (window.innerWidth > 991) {
          dropdown.addEventListener('mouseenter', () => {
            this.showMenu(dropdown);
          });

          dropdown.addEventListener('mouseleave', () => {
            this.hideMenu(dropdown);
          });
        } else {
          // Mobile: Click behavior
          link.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu(dropdown);
          });
        }
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        this.handleResize();
      });
    }

    showMenu(dropdown) {
      dropdown.classList.add('active');
    }

    hideMenu(dropdown) {
      dropdown.classList.remove('active');
    }

    toggleMenu(dropdown) {
      dropdown.classList.toggle('active');
    }

    handleResize() {
      // Reset dropdowns on resize
      this.dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  }

  /**
   * Utility Functions
   */
  const utils = {
    // Debounce function
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Throttle function
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= -offset &&
        rect.left >= -offset &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
      );
    },

    // Get scroll position
    getScrollPosition() {
      return window.pageYOffset || document.documentElement.scrollTop;
    },

    // Add class with animation
    addClassWithDelay(element, className, delay = 0) {
      setTimeout(() => {
        element.classList.add(className);
      }, delay);
    }
  };

  /**
   * Initialize all modules
   */
  function init() {
    // Initialize page loader
    new PageLoader();

    // Initialize smooth scroll
    new SmoothScroll();

    // Initialize dropdown menus
    new DropdownMenu();

    // Log initialization
    console.log('%c🚀 TOS Network Website Initialized', 'color: #4A90E2; font-size: 14px; font-weight: bold;');
    console.log('%c⚡ The First Blockchain Where AGI Earns Money', 'color: #60a5fa; font-size: 12px;');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export utils for use in other scripts
  window.TOS = window.TOS || {};
  window.TOS.utils = utils;

})();
