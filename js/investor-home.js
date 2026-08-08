(() => {
    "use strict";

    const root = document.documentElement;
    const header = document.getElementById("siteHeader");
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");
    const currentYear = document.getElementById("currentYear");
    const mobileNavigation = window.matchMedia("(max-width: 820px)");

    root.classList.add("js");

    const initializeOfficialAgentIcons = () => {
        const officialAssets = {
            "ChatGPT Agent": "img/agents/openai.png",
            "Claude": "img/agents/claude.png",
            "Codex": "img/agents/openai.png",
            "Cursor": "img/agents/cursor.svg",
            "Devin": "img/agents/devin.png",
            "Gemini CLI": "img/agents/gemini-cli.png",
            "GenSpark": "img/agents/genspark.svg",
            "GitHub Copilot": "img/agents/github-copilot.svg",
            "Hermes Agent": "img/agents/hermes-agent.png",
            "LobsterAI": "img/agents/lobsterai.png",
            "Manus": "img/agents/manus.svg",
            "Marvis": "img/agents/marvis.png",
            "OpenClaw": "img/agents/openclaw.svg",
            "Windsurf": "img/agents/windsurf.svg",
            "WorkBuddy": "img/agents/workbuddy.png"
        };

        document.querySelectorAll("#agent-ecosystem .agent-chip").forEach((chip) => {
            const name = chip.querySelector(".agent-name")?.textContent?.trim();
            const icon = chip.querySelector(".agent-icon");
            const source = name ? officialAssets[name] : null;

            // OpenFox already uses the project's own first-party image asset.
            if (!source || !icon || name === "OpenFox") {
                return;
            }

            const image = document.createElement("img");
            image.src = source;
            image.alt = "";
            image.width = 40;
            image.height = 40;
            image.loading = "lazy";
            image.decoding = "async";
            icon.replaceChildren(image);
        });
    };

    initializeOfficialAgentIcons();

    const initializeReveal = () => {
        const revealItems = [...document.querySelectorAll(".reveal")];
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reducedMotion || !("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

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

        revealItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.classList.add("is-visible");
            } else {
                revealObserver.observe(item);
            }
        });

        // Content is hidden only after the observer has been installed.
        // If this controller is blocked or throws earlier, every section stays visible.
        root.classList.add("reveal-ready");
    };

    try {
        initializeReveal();
    } catch (error) {
        root.classList.remove("reveal-ready");
        document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
        console.warn("Reveal enhancement unavailable; content remains visible.", error);
    }

    const setHeaderState = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    const navigationIsOpen = () => navToggle?.getAttribute("aria-expanded") === "true";

    const closeNavigation = ({ restoreFocus = false } = {}) => {
        if (!navToggle || !siteNav) {
            return;
        }

        const wasOpen = navigationIsOpen();
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
        siteNav.classList.remove("is-open");
        document.body.classList.remove("nav-open");

        if (restoreFocus && wasOpen && mobileNavigation.matches) {
            navToggle.focus();
        }
    };

    navToggle?.addEventListener("click", () => {
        const isOpen = navigationIsOpen();
        navToggle.setAttribute("aria-expanded", String(!isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
        siteNav?.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("nav-open", !isOpen);
    });

    siteNav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => closeNavigation());
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigationIsOpen()) {
            closeNavigation({ restoreFocus: true });
        }
    });

    const resetNavigationMode = () => closeNavigation();
    if (typeof mobileNavigation.addEventListener === "function") {
        mobileNavigation.addEventListener("change", resetNavigationMode);
    } else {
        mobileNavigation.addListener?.(resetNavigationMode);
    }

    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
})();
