/**
 * TOS Network - Navigation
 * Navbar scroll effects and mobile menu
 */

(function() {
  'use strict';

  class Navigation {
    constructor() {
      this.navbar = document.getElementById('navbar');
      this.mobileToggle = document.getElementById('mobileToggle');
      this.navbarMenu = document.getElementById('navbarMenu');
      this.scrollThreshold = 50;
      this.lastScrollY = 0;
      this.ticking = false;

      if (!this.navbar) return;

      this.init();
    }

    init() {
      this.setupScrollEffects();
      this.setupMobileMenu();
      this.setupClickOutside();
    }

    /**
     * Setup scroll effects for navbar
     */
    setupScrollEffects() {
      window.addEventListener('scroll', () => {
        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.handleScroll();
            this.ticking = false;
          });
          this.ticking = true;
        }
      });

      // Initial check
      this.handleScroll();
    }

    /**
     * Handle navbar behavior on scroll
     */
    handleScroll() {
      const currentScrollY = window.pageYOffset;

      // Add blur/background when scrolled
      if (currentScrollY > this.scrollThreshold) {
        this.navbar.classList.add('navbar--scrolled');
      } else {
        this.navbar.classList.remove('navbar--scrolled');
      }

      // Hide navbar on scroll down, show on scroll up (optional)
      // Uncomment to enable auto-hide behavior
      /*
      if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
        this.navbar.classList.add('navbar--hidden');
      } else {
        this.navbar.classList.remove('navbar--hidden');
      }
      */

      this.lastScrollY = currentScrollY;
    }

    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
      if (!this.mobileToggle || !this.navbarMenu) return;

      this.mobileToggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });

      // Close menu when clicking on a link
      const menuLinks = this.navbarMenu.querySelectorAll('a');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Only close if it's not a dropdown parent
          if (!link.closest('.has-dropdown') || link.classList.contains('dropdown-link')) {
            this.closeMobileMenu();
          }
        });
      });

      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
          this.closeMobileMenu();
        }
      });
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
      const isExpanded = this.mobileToggle.getAttribute('aria-expanded') === 'true';

      this.mobileToggle.setAttribute('aria-expanded', !isExpanded);
      this.navbarMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');

      // Prevent body scroll when menu is open
      if (!isExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
      if (this.mobileToggle && this.navbarMenu) {
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        this.navbarMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      }
    }

    /**
     * Setup click outside to close mobile menu
     */
    setupClickOutside() {
      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
          const isClickInsideNav = this.navbar.contains(e.target);
          const isMenuOpen = this.navbarMenu && this.navbarMenu.classList.contains('active');

          if (!isClickInsideNav && isMenuOpen) {
            this.closeMobileMenu();
          }
        }
      });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new Navigation();
    });
  } else {
    new Navigation();
  }

})();
