(() => {
    "use strict";

    const header = document.getElementById("siteHeader");
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");
    const currentYear = document.getElementById("currentYear");

    const setHeaderState = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    const closeNavigation = () => {
        if (!navToggle || !siteNav) {
            return;
        }
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
        siteNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
    };

    navToggle?.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        siteNav?.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    });

    siteNav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });

    document.querySelectorAll(".faq-item").forEach((item) => {
        const button = item.querySelector("button");
        button?.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
                openItem.classList.remove("is-open");
                openItem.querySelector("button")?.setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll(".reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: "0px 0px -9% 0px",
            threshold: 0.08
        });

        revealItems.forEach((item) => revealObserver.observe(item));
    }

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
})();
