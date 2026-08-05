(function () {
    'use strict';

    var switcher = document.getElementById('langSwitcher');
    var toggle = document.getElementById('langToggle');
    var toggleCode = document.getElementById('langToggleCode');
    var dropdown = document.getElementById('langDropdown');
    var backdrop = document.getElementById('langBackdrop');

    if (!switcher || !toggle || !dropdown) {
        return;
    }

    var options = Array.prototype.slice.call(dropdown.querySelectorAll('.lang-option'));
    var isOpen = false;

    function openDropdown() {
        isOpen = true;
        dropdown.classList.add('is-open');
        dropdown.setAttribute('aria-hidden', 'false');
        if (backdrop) {
            backdrop.classList.add('is-open');
        }
        toggle.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
        isOpen = false;
        dropdown.classList.remove('is-open');
        dropdown.setAttribute('aria-hidden', 'true');
        if (backdrop) {
            backdrop.classList.remove('is-open');
        }
        toggle.setAttribute('aria-expanded', 'false');
    }

    function toggleDropdown() {
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function updateActiveOption(lang) {
        options.forEach(function (option) {
            var isActive = option.getAttribute('data-lang') === lang;
            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-selected', String(isActive));
        });
        if (toggleCode) {
            toggleCode.textContent = lang.toUpperCase();
        }
    }

    toggle.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleDropdown();
    });

    if (backdrop) {
        backdrop.addEventListener('click', closeDropdown);
    }

    options.forEach(function (option) {
        option.addEventListener('click', function (event) {
            event.stopPropagation();
            var lang = option.getAttribute('data-lang');
            if (window.i18n) {
                window.i18n.setLanguage(lang);
            }
            closeDropdown();
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && isOpen) {
            closeDropdown();
            toggle.focus();
        }
    });

    window.addEventListener('languageChanged', function (event) {
        updateActiveOption(event.detail.lang);
    });

    if (window.i18n) {
        updateActiveOption(window.i18n.getCurrentLanguage());
    }
})();
