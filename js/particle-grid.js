/* ============================================
   TOS Network - Spherical Particle Grid Animation
   Orthographic-projected lat/long grid, slow auto-orbit
   Blue & Cyan color scheme matching site accent palette
   ============================================ */

class ParticleGridAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.t = 0;
        this.running = false;
        this.animId = null;
        this.pointerX = 0;
        this.pointerActive = false;
        this.resize();
        this.buildGrid();
        this.bindEvents();
    }

    resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.w = rect.width;
        this.h = rect.height;
        this.canvas.width = this.w * dpr;
        this.canvas.height = this.h * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.cx = this.w / 2;
        this.cy = this.h * 0.42;
        this.projRadius = Math.max(this.w, this.h) * 0.62;
        this.isMobile = this.w < 768;
    }

    buildGrid() {
        const latSteps = this.isMobile ? 14 : 22;
        const lonSteps = this.isMobile ? 20 : 32;
        const latSpan = 1.28;
        const lonSpan = 1.5;

        this.latSteps = latSteps;
        this.lonSteps = lonSteps;
        this.latSpan = latSpan;
        this.lonSpan = lonSpan;
    }

    bindEvents() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.resize();
                this.buildGrid();
            }, 150);
        });

        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            if (e.clientY < rect.top - 200 || e.clientY > rect.bottom + 200) return;
            const nx = (e.clientX - rect.left) / Math.max(rect.width, 1);
            this.pointerX = Math.min(Math.max(nx - 0.5, -0.5), 0.5);
            this.pointerActive = true;
        }, { passive: true });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                } else {
                    this.stop();
                }
            });
        }, { threshold: 0.05 });
        observer.observe(this.canvas);
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

    animate() {
        if (!this.running) return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);

        this.t += 0.0016;
        const orbit = this.t + this.pointerX * 0.9;

        const { latSteps, lonSteps, latSpan, lonSpan, projRadius, cx, cy } = this;
        const cosOrbit = Math.cos(orbit);
        const sinOrbit = Math.sin(orbit);

        // Project every lat/long intersection to 2D once per frame
        const points = new Array((latSteps + 1) * (lonSteps + 1));
        let idx = 0;
        for (let i = 0; i <= latSteps; i++) {
            const phi = -latSpan + (2 * latSpan * i) / latSteps;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);
            for (let j = 0; j <= lonSteps; j++) {
                const theta = -lonSpan + (2 * lonSpan * j) / lonSteps;
                const x0 = Math.sin(theta) * cosPhi;
                const z0 = Math.cos(theta) * cosPhi;
                // rotate around vertical axis for the slow auto-orbit
                const x = x0 * cosOrbit - z0 * sinOrbit;
                const z = x0 * sinOrbit + z0 * cosOrbit;
                const y = sinPhi;

                points[idx++] = {
                    px: cx + x * projRadius,
                    py: cy + y * projRadius,
                    depth: (z + 1) / 2,
                };
            }
        }

        const cols = lonSteps + 1;

        // Mesh lines: along each latitude row and each longitude column
        ctx.lineWidth = 1;
        for (let i = 0; i <= latSteps; i++) {
            for (let j = 0; j < lonSteps; j++) {
                const a = points[i * cols + j];
                const b = points[i * cols + j + 1];
                const depth = (a.depth + b.depth) / 2;
                ctx.strokeStyle = `rgba(96, 165, 250, ${0.05 + 0.16 * depth})`;
                ctx.beginPath();
                ctx.moveTo(a.px, a.py);
                ctx.lineTo(b.px, b.py);
                ctx.stroke();
            }
        }
        for (let j = 0; j <= lonSteps; j++) {
            for (let i = 0; i < latSteps; i++) {
                const a = points[i * cols + j];
                const b = points[(i + 1) * cols + j];
                const depth = (a.depth + b.depth) / 2;
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 + 0.14 * depth})`;
                ctx.beginPath();
                ctx.moveTo(a.px, a.py);
                ctx.lineTo(b.px, b.py);
                ctx.stroke();
            }
        }

        // Particles at each intersection
        const baseSize = (this.isMobile ? 1.6 : 2) * Math.min(this.w, this.h) / 500;
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            const blend = p.depth;
            const r = Math.round(96 * (1 - blend) + 0 * blend);
            const g = Math.round(165 * (1 - blend) + 212 * blend);
            const b = Math.round(250 * (1 - blend) + 255 * blend);
            const alpha = 0.25 + 0.55 * blend;
            const sz = baseSize * (0.6 + 0.8 * blend);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fillRect(p.px - sz / 2, p.py - sz / 2, sz, sz);
        }

        this.animId = requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    new ParticleGridAnimation('mesh-grid-canvas');
});
