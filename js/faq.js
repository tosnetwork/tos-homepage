/**
 * TOS Network - FAQ Accordion
 * Interactive FAQ section
 */

(function() {
  'use strict';

  class FAQ {
    constructor() {
      this.items = document.querySelectorAll('.faq-item');
      this.init();
    }

    init() {
      if (this.items.length === 0) return;

      this.attachEventListeners();

      // Optionally expand first item by default
      // Uncomment the following line if you want first FAQ open by default
      // this.toggleItem(this.items[0], true);
    }

    /**
     * Attach event listeners to FAQ items
     */
    attachEventListeners() {
      this.items.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (!question || !answer) return;

        // Create answer content wrapper if it doesn't exist
        if (!answer.querySelector('.faq-answer-content')) {
          const content = answer.innerHTML;
          answer.innerHTML = `<div class="faq-answer-content">${content}</div>`;
        }

        // Click event
        question.addEventListener('click', () => {
          this.toggleItem(item);
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
          this.handleKeyboard(e, item, index);
        });

        // Set initial ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', `faq-answer-${index}`);
        answer.setAttribute('id', `faq-answer-${index}`);
        answer.setAttribute('aria-hidden', 'true');
      });
    }

    /**
     * Toggle FAQ item open/closed
     */
    toggleItem(item, forceOpen = false) {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const answerContent = answer.querySelector('.faq-answer-content');

      if (!question || !answer || !answerContent) return;

      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      if (forceOpen || !isExpanded) {
        // Expand
        question.setAttribute('aria-expanded', 'true');
        answer.setAttribute('aria-hidden', 'false');
        answer.style.maxHeight = answerContent.scrollHeight + 'px';

        // Optional: Close other items (accordion behavior)
        // Uncomment the following line for single-item-open behavior
        // this.closeOtherItems(item);
      } else {
        // Collapse
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0';
      }
    }

    /**
     * Close all items except the current one
     */
    closeOtherItems(currentItem) {
      this.items.forEach(item => {
        if (item !== currentItem) {
          const question = item.querySelector('.faq-question');
          const answer = item.querySelector('.faq-answer');

          if (question && answer) {
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            answer.style.maxHeight = '0';
          }
        }
      });
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboard(e, item, index) {
      const items = Array.from(this.items);

      switch(e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          this.toggleItem(item);
          break;

        case 'ArrowDown':
          e.preventDefault();
          this.focusNextItem(items, index);
          break;

        case 'ArrowUp':
          e.preventDefault();
          this.focusPreviousItem(items, index);
          break;

        case 'Home':
          e.preventDefault();
          this.focusFirstItem(items);
          break;

        case 'End':
          e.preventDefault();
          this.focusLastItem(items);
          break;
      }
    }

    /**
     * Focus next FAQ item
     */
    focusNextItem(items, currentIndex) {
      const nextIndex = (currentIndex + 1) % items.length;
      const nextQuestion = items[nextIndex].querySelector('.faq-question');
      if (nextQuestion) nextQuestion.focus();
    }

    /**
     * Focus previous FAQ item
     */
    focusPreviousItem(items, currentIndex) {
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      const prevQuestion = items[prevIndex].querySelector('.faq-question');
      if (prevQuestion) prevQuestion.focus();
    }

    /**
     * Focus first FAQ item
     */
    focusFirstItem(items) {
      const firstQuestion = items[0].querySelector('.faq-question');
      if (firstQuestion) firstQuestion.focus();
    }

    /**
     * Focus last FAQ item
     */
    focusLastItem(items) {
      const lastQuestion = items[items.length - 1].querySelector('.faq-question');
      if (lastQuestion) lastQuestion.focus();
    }

    /**
     * Expand all items (utility method)
     */
    expandAll() {
      this.items.forEach(item => {
        this.toggleItem(item, true);
      });
    }

    /**
     * Collapse all items (utility method)
     */
    collapseAll() {
      this.items.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
          question.setAttribute('aria-expanded', 'false');
          answer.setAttribute('aria-hidden', 'true');
          answer.style.maxHeight = '0';
        }
      });
    }
  }

  /**
   * Initialize FAQ
   */
  function init() {
    const faq = new FAQ();

    // Expose FAQ instance for external control
    window.TOS = window.TOS || {};
    window.TOS.faq = faq;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
