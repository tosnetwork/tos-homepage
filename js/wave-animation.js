/* ============================================
   TOS Network - Wave Point Cloud Animation
   Adapted from creative coding by @yuruyurau
   Blue & Cyan color scheme matching AGI Earns Money highlight
   ============================================ */

class WaveAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) return;
        this.visible = false;
        this.motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
        this.t = 0;
        this.running = false;
        this.animId = null;
        this.resize();
        this.bindEvents();
        this.draw();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.w = rect.width;
        this.h = rect.height;
        this.canvas.width = this.w * dpr;
        this.canvas.height = this.h * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Scale factor — use width on mobile (narrow screens) for better fit
        this.scale = Math.min(this.w, this.h) / 400;
        this.cx = this.w / 2;
        this.cy = this.h * 0.35; // shift up on tall containers
        this.isMobile = this.w < 768;
    }

    bindEvents() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { this.resize(); this.draw(); }, 150);
        });

        const update = () => {
            if (this.visible && !document.hidden && !this.motionPreference.matches) this.start();
            else this.stop();
        };
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(entries => {
                this.visible = entries[0].isIntersecting;
                update();
            }, { threshold: 0.05 });
            observer.observe(this.canvas);
        } else {
            this.visible = true;
            update();
        }
        document.addEventListener('visibilitychange', update);
        this.motionPreference.addEventListener('change', update);
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.animate();
    }

    stop() {
        this.running = false;
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
    }

    mag(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    draw() {

        const ctx = this.ctx;
        const scale = this.scale;
        const cx = this.cx;
        const cy = this.cy;

        // Dark background
        ctx.clearRect(0, 0, this.w, this.h);

        // Fewer particles on mobile for performance and cleaner look
        const totalPoints = this.isMobile ? 10000 : 20000;

        for (let i = 0; i < totalPoints; i++) {
            const k = (i / 8) % 25 - 12.5;
            const e = (this.isMobile ? i / 400 : i / 800) - 12.5;
            const dist = this.mag(k, e);
            const d = 7 * Math.cos(dist / 3 - this.t / 2);

            const px = (k * 4 + d * k / 2 * Math.sin(d + e / 19 + this.t)) * scale + cx;
            const py = (e * 2 - d * 9 - d * 9 * Math.cos(d + this.t)) * scale + cy;

            // Color: blend between blue and cyan based on wave value
            const blend = (Math.sin(d * 0.5 + this.t * 0.7 + dist * 0.15) + 1) / 2;

            // Highlight blue: #60a5fa, Accent cyan: #00d4ff
            const r = Math.round(96 * (1 - blend) + 0 * blend);
            const g = Math.round(165 * (1 - blend) + 212 * blend);
            const b = Math.round(250 * (1 - blend) + 255 * blend);
            const alpha = 0.25 + 0.18 * Math.abs(Math.cos(d));

            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            const sz = (this.isMobile ? 1.8 : 1.5) * scale;
            ctx.fillRect(px, py, sz, sz);
        }

    }

    animate() {
        if (!this.running) return;
        this.t += Math.PI / 240;
        this.draw();
        this.animId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Respect reduced motion preference
    new WaveAnimation('closing-wave-canvas');
});
