(() => {
    "use strict";

    const scene = document.querySelector("[data-portal-scene]");
    const flowCanvas = document.getElementById("portalFlowCanvas");
    const webglCanvas = document.getElementById("portalWebglCanvas");
    const motionToggle = document.getElementById("portalMotionToggle");

    if (!scene || !flowCanvas || !webglCanvas) {
        return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const flow = createFlowRenderer(flowCanvas);
    const portal = createPortalRenderer(webglCanvas);

    let animationFrame = 0;
    let lastFrame = 0;
    let paused = reducedMotion.matches;
    let sceneVisible = true;
    let pageVisible = !document.hidden;

    if (portal) {
        scene.classList.add("webgl-ready");
    }

    const resize = () => {
        const rect = scene.getBoundingClientRect();
        const width = Math.max(1, Math.round(rect.width));
        const height = Math.max(1, Math.round(rect.height));
        flow.resize(width, height);
        portal?.resize(width, height);
        render(performance.now(), 0, true);
    };

    const render = (time, delta, staticFrame = false) => {
        pointer.x += (pointer.targetX - pointer.x) * (staticFrame ? 1 : 0.055);
        pointer.y += (pointer.targetY - pointer.y) * (staticFrame ? 1 : 0.055);

        scene.style.setProperty("--portal-pointer-x", pointer.x.toFixed(3));
        scene.style.setProperty("--portal-pointer-y", pointer.y.toFixed(3));
        scene.style.setProperty("--portal-rotation", `${(time * 0.009) % 360}deg`);

        flow.render(time * 0.001, delta, pointer, staticFrame);
        portal?.render(time * 0.001, pointer);
    };

    const shouldAnimate = () => !paused && sceneVisible && pageVisible;

    const stop = () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = 0;
        }
    };

    const frame = (time) => {
        if (!shouldAnimate()) {
            stop();
            return;
        }

        const minimumFrameTime = window.innerWidth < 700 ? 1000 / 30 : 1000 / 48;
        const elapsed = lastFrame ? time - lastFrame : minimumFrameTime;

        if (!lastFrame || elapsed >= minimumFrameTime) {
            const delta = Math.min(0.05, elapsed / 1000);
            render(time, delta);
            lastFrame = time;
        }

        animationFrame = requestAnimationFrame(frame);
    };

    const start = () => {
        if (!shouldAnimate() || animationFrame) {
            return;
        }
        lastFrame = 0;
        animationFrame = requestAnimationFrame(frame);
    };

    const setPaused = (nextPaused) => {
        paused = nextPaused;
        motionToggle?.setAttribute("aria-pressed", String(paused));
        scene.classList.toggle("portal-scene-paused", paused);

        if (paused) {
            stop();
            render(performance.now(), 0, true);
        } else {
            start();
        }
    };

    motionToggle?.addEventListener("click", () => setPaused(!paused));

    scene.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") {
            return;
        }
        const rect = scene.getBoundingClientRect();
        pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }, { passive: true });

    scene.addEventListener("pointerleave", () => {
        pointer.targetX = 0;
        pointer.targetY = 0;
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
        pageVisible = !document.hidden;
        if (pageVisible) {
            start();
        } else {
            stop();
        }
    });

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            sceneVisible = entries[0]?.isIntersecting ?? true;
            if (sceneVisible) {
                start();
            } else {
                stop();
            }
        }, { threshold: 0.02 });
        observer.observe(scene);
    }

    const handleReducedMotionChange = (event) => setPaused(event.matches);
    if (typeof reducedMotion.addEventListener === "function") {
        reducedMotion.addEventListener("change", handleReducedMotionChange);
    } else {
        reducedMotion.addListener?.(handleReducedMotionChange);
    }

    if ("ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(scene);
    } else {
        window.addEventListener("resize", resize, { passive: true });
    }

    resize();
    setPaused(paused);
    start();

    function createFlowRenderer(canvas) {
        const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
        const random = mulberry32(0x544f534e);
        const portalCenter = { x: 0.5, y: 0.49 };
        let width = 1;
        let height = 1;
        let ratio = 1;
        let signals = [];
        let lanes = [];
        let laneGradient = null;
        const brandCanvas = document.createElement("canvas");
        const brandContext = brandCanvas.getContext("2d", { alpha: true });
        let lastBrandFrame = -Infinity;

        const palettes = [
            { h: 31, s: 94, l: 71 },
            { h: 202, s: 96, l: 72 },
            { h: 224, s: 92, l: 70 },
            { h: 266, s: 92, l: 72 },
            { h: 314, s: 84, l: 70 }
        ];

        const createSignal = (index, total) => {
            const targetBands = [0.19, 0.27, 0.35, 0.43, 0.51, 0.59, 0.67, 0.76, 0.84];
            const startY = 0.08 + random() * 0.84;
            const gateOffset = (random() - 0.5) * 0.008;
            const endY = targetBands[index % targetBands.length] + (random() - 0.5) * 0.045;
            const palette = palettes[index % palettes.length];

            return {
                t: random(),
                // Keep the packets visibly moving even on wide desktop displays.
                // The former range took up to ~26 seconds to cross the scene,
                // which made the flow read as static beside the rotating portal.
                speed: 0.065 + random() * 0.12,
                startY,
                middleY: portalCenter.y + gateOffset,
                endY,
                wave: 0.009 + random() * 0.022,
                waveSpeed: 1.2 + random() * 2.4,
                phase: random() * Math.PI * 2,
                size: 0.7 + random() * 1.9,
                shape: index % 5,
                hue: palette.h,
                saturation: palette.s,
                lightness: palette.l,
                alpha: 0.35 + random() * 0.55,
                depth: index / Math.max(1, total - 1)
            };
        };

        const rebuild = () => {
            const compact = width < 700;
            const count = compact ? 64 : Math.min(150, Math.round(width / 10));
            signals = Array.from({ length: count }, (_, index) => createSignal(index, count));
            lanes = signals.filter((_, index) => index % (compact ? 3 : 4) === 0);
        };

        const resize = (nextWidth, nextHeight) => {
            width = nextWidth;
            height = nextHeight;
            ratio = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.2 : 1.6);
            canvas.width = Math.max(1, Math.round(width * ratio));
            canvas.height = Math.max(1, Math.round(height * ratio));
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            brandCanvas.width = width;
            brandCanvas.height = height;
            lastBrandFrame = -Infinity;
            laneGradient = context.createLinearGradient(0, 0, width, 0);
            laneGradient.addColorStop(0, "rgba(255, 184, 96, 0.26)");
            laneGradient.addColorStop(0.36, "rgba(255, 213, 156, 0.42)");
            laneGradient.addColorStop(0.49, "rgba(255, 246, 226, 0.88)");
            laneGradient.addColorStop(0.51, "rgba(229, 246, 255, 0.9)");
            laneGradient.addColorStop(0.66, "rgba(96, 190, 255, 0.48)");
            laneGradient.addColorStop(1, "rgba(144, 102, 255, 0.26)");
            rebuild();
        };

        const render = (time, delta, pointerState, staticFrame) => {
            context.clearRect(0, 0, width, height);

            drawProtocolMembrane(time, pointerState);

            context.save();
            context.globalCompositeOperation = "lighter";

            drawPortalBloom(time, pointerState);
            drawProtocolAperture(time, pointerState);
            lanes.forEach((signal) => drawLane(signal, time, pointerState));

            signals.forEach((signal) => {
                if (!staticFrame) {
                    signal.t = (signal.t + delta * signal.speed) % 1;
                }
                drawSignal(signal, time, pointerState);
            });

            context.restore();
        };

        const drawPortalBloom = (time, pointerState) => {
            const centerX = width * (portalCenter.x + pointerState.x * 0.002);
            const centerY = height * (portalCenter.y + pointerState.y * 0.002);
            const radius = Math.min(width, height) * (0.23 + Math.sin(time * 1.2) * 0.005);
            const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, "rgba(120, 95, 255, 0.12)");
            gradient.addColorStop(0.35, "rgba(70, 171, 255, 0.08)");
            gradient.addColorStop(1, "rgba(30, 85, 255, 0)");
            context.fillStyle = gradient;
            context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
        };

        const getApertureMetrics = (time, pointerState) => {
            const compact = width < 700;
            const pulse = 1 + Math.sin(time * 0.78) * 0.006;
            return {
                centerX: width * (portalCenter.x + pointerState.x * 0.002),
                centerY: height * (portalCenter.y + pointerState.y * 0.002),
                radiusX: (compact
                    ? Math.min(width * 0.29, height * 0.16)
                    : Math.min(width * 0.115, height * 0.18)) * pulse,
                radiusY: (compact
                    ? Math.min(height * 0.37, width * 0.8)
                    : Math.min(height * 0.385, width * 0.29)) * pulse
            };
        };

        const drawProtocolMembrane = (time, pointerState) => {
            const aperture = getApertureMetrics(time, pointerState);
            const { centerX, centerY, radiusX, radiusY } = aperture;

            context.save();
            context.translate(centerX, centerY);
            context.scale(radiusX / radiusY, 1);

            const membrane = context.createRadialGradient(0, 0, radiusY * 0.08, 0, 0, radiusY);
            membrane.addColorStop(0, "rgba(7, 18, 51, 0.14)");
            membrane.addColorStop(0.58, "rgba(3, 12, 37, 0.28)");
            membrane.addColorStop(0.84, "rgba(2, 8, 27, 0.58)");
            membrane.addColorStop(1, "rgba(2, 7, 22, 0.42)");

            context.beginPath();
            context.arc(0, 0, radiusY, 0, Math.PI * 2);
            context.fillStyle = membrane;
            context.fill();
            context.restore();
        };

        const drawProtocolAperture = (time, pointerState) => {
            const aperture = getApertureMetrics(time, pointerState);
            const { centerX, centerY, radiusX, radiusY } = aperture;
            const compact = width < 700;

            context.save();
            context.translate(centerX, centerY);
            context.lineCap = "round";
            context.shadowColor = "rgba(87, 190, 255, 0.72)";
            context.shadowBlur = compact ? 5 : 8;

            context.save();
            context.scale(radiusX, radiusY);
            context.beginPath();
            context.arc(0, 0, 0.965, 0, Math.PI * 2);
            context.clip();
            context.rotate(time * 0.055);
            context.lineWidth = compact ? 0.0034 : 0.0025;
            context.shadowBlur = 0;

            context.beginPath();
            for (let offset = -1.5; offset <= 1.5; offset += 0.15) {
                context.moveTo(-1.5, offset);
                context.lineTo(1.5, offset);
                context.moveTo(offset, -1.5);
                context.lineTo(offset, 1.5);
            }
            context.strokeStyle = "rgba(95, 194, 255, 0.105)";
            context.stroke();

            context.beginPath();
            for (let offset = -1.5; offset <= 1.5; offset += 0.15) {
                context.moveTo(-1.5, offset - 0.72);
                context.lineTo(1.5, offset + 0.72);
            }
            context.strokeStyle = "rgba(172, 118, 255, 0.075)";
            context.stroke();

            for (let group = 0; group < 3; group += 1) {
                context.beginPath();
                for (let node = group; node < 22; node += 3) {
                    const angle = node * 2.3999632297 + time * (node % 2 === 0 ? 0.035 : -0.024);
                    const radius = 0.18 + ((node * 17) % 67) / 100;
                    context.moveTo(Math.cos(angle) * radius + 0.006, Math.sin(angle) * radius);
                    context.arc(Math.cos(angle) * radius, Math.sin(angle) * radius, node % 5 === 0 ? 0.012 : 0.006, 0, Math.PI * 2);
                }
                context.fillStyle = group === 0
                    ? "rgba(186, 135, 255, 0.42)"
                    : "rgba(113, 219, 255, 0.42)";
                context.fill();
            }
            context.restore();

            [0.64, 0.79, 0.92, 1].forEach((scale, index) => {
                context.beginPath();
                context.setLineDash(index % 2 === 0 ? [3, 9, 15, 8] : [1, 12, 6, 11]);
                context.lineDashOffset = (index % 2 === 0 ? -1 : 1) * time * (13 + index * 4);
                context.ellipse(0, 0, radiusX * scale, radiusY * scale, 0, 0, Math.PI * 2);
                context.lineWidth = index === 3 ? 1.25 : 0.7;
                context.strokeStyle = index % 2 === 0
                    ? `rgba(91, 205, 255, ${0.24 + index * 0.06})`
                    : `rgba(154, 112, 255, ${0.23 + index * 0.05})`;
                context.stroke();
            });

            context.setLineDash([]);
            for (let index = 0; index < 18; index += 1) {
                const direction = index % 3 === 0 ? -1 : 1;
                const angle = (index / 18) * Math.PI * 2 + time * 0.17 * direction;
                const inner = index % 4 === 0 ? 0.72 : 0.84;
                const outer = index % 5 === 0 ? 1.045 : 1.015;
                context.beginPath();
                context.moveTo(Math.cos(angle) * radiusX * inner, Math.sin(angle) * radiusY * inner);
                context.lineTo(Math.cos(angle) * radiusX * outer, Math.sin(angle) * radiusY * outer);
                context.lineWidth = index % 4 === 0 ? 1.35 : 0.65;
                context.strokeStyle = index % 2 === 0
                    ? "rgba(124, 221, 255, 0.54)"
                    : "rgba(178, 130, 255, 0.42)";
                context.stroke();
            }

            context.restore();
            drawOrbitingBrand(aperture, time, compact);
        };

        const drawOrbitingBrand = (aperture, time, compact) => {
            if (!brandContext) {
                return;
            }

            const phrase = "TOS NETWORK  ·  ".repeat(4);
            const radiusX = aperture.radiusX * 1.085;
            const radiusY = aperture.radiusY * 1.085;
            const rotation = time * 0.16 - Math.PI * 0.5;

            if (time - lastBrandFrame >= 0.075) {
                brandContext.clearRect(0, 0, width, height);
                brandContext.save();
                brandContext.font = `600 ${compact ? 9.5 : 11.5}px "IBM Plex Mono", monospace`;
                brandContext.textAlign = "center";
                brandContext.textBaseline = "middle";
                brandContext.fillStyle = "rgba(196, 235, 255, 0.78)";

                Array.from(phrase).forEach((character, index) => {
                    const angle = rotation + (index / phrase.length) * Math.PI * 2;
                    const x = aperture.centerX + Math.cos(angle) * radiusX;
                    const y = aperture.centerY + Math.sin(angle) * radiusY;
                    const tangent = Math.atan2(radiusY * Math.cos(angle), -radiusX * Math.sin(angle));

                    brandContext.save();
                    brandContext.translate(x, y);
                    brandContext.rotate(tangent);
                    brandContext.fillText(character, 0, 0);
                    brandContext.restore();
                });

                brandContext.restore();
                lastBrandFrame = time;
            }

            context.drawImage(brandCanvas, 0, 0, width, height);
        };

        const drawLane = (signal, time, pointerState) => {
            context.save();
            context.beginPath();
            const steps = width < 700 ? 48 : 72;
            for (let index = 0; index <= steps; index += 1) {
                const point = pointOnPath(signal, index / steps, time, pointerState);
                if (index === 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            }

            const baseWidth = 0.55 + signal.depth * 0.72;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.lineWidth = baseWidth;
            context.globalAlpha = 0.56 + signal.depth * 0.16;
            context.strokeStyle = laneGradient || "rgba(164, 218, 255, 0.42)";
            context.shadowBlur = 1.5;
            context.shadowColor = `hsla(${signal.hue}, ${signal.saturation}%, ${signal.lightness}%, 0.32)`;
            context.stroke();

            context.setLineDash(width < 700 ? [10, 25] : [14, 34]);
            context.lineDashOffset = -(time * (92 + signal.speed * 220) + signal.phase * 18);
            context.lineWidth = baseWidth + 0.68;
            context.globalAlpha = 0.52;
            context.strokeStyle = `hsla(${signal.hue}, ${signal.saturation}%, 84%, 0.72)`;
            context.shadowBlur = 4;
            context.shadowColor = `hsla(${signal.hue}, ${signal.saturation}%, 76%, 0.68)`;
            context.stroke();
            context.restore();
        };

        const drawSignal = (signal, time, pointerState) => {
            const trailSteps = width < 700 ? 7 : 11;
            const trailLength = signal.t < 0.5 ? 0.1 : 0.135;
            const trailStart = Math.max(0, signal.t - trailLength);

            context.beginPath();
            for (let index = 0; index <= trailSteps; index += 1) {
                const trailT = trailStart + (signal.t - trailStart) * (index / trailSteps);
                const point = pointOnPath(signal, trailT, time, pointerState);
                if (index === 0) {
                    context.moveTo(point.x, point.y);
                } else {
                    context.lineTo(point.x, point.y);
                }
            }

            const intensity = signal.t > 0.47 && signal.t < 0.57 ? 1 : signal.alpha;
            context.lineWidth = signal.size * (signal.t > 0.5 ? 1.18 : 0.9);
            context.strokeStyle = `hsla(${signal.hue}, ${signal.saturation}%, ${signal.lightness}%, ${0.24 + intensity * 0.5})`;
            context.shadowBlur = 3 + signal.size * 3;
            context.shadowColor = `hsla(${signal.hue}, ${signal.saturation}%, ${signal.lightness}%, 0.62)`;
            context.stroke();

            const point = pointOnPath(signal, signal.t, time, pointerState);
            drawGlyph(point.x, point.y, signal, signal.t);
            context.shadowBlur = 0;
        };

        const drawGlyph = (x, y, signal, progress) => {
            const transformed = progress > 0.5;
            const size = signal.size * (transformed ? 2.55 : 1.95);
            context.save();
            context.translate(x, y);
            context.rotate((progress + signal.phase) * 1.8);
            context.fillStyle = `hsla(${signal.hue}, ${signal.saturation}%, ${Math.min(88, signal.lightness + 8)}%, ${signal.alpha})`;
            context.strokeStyle = `hsla(${signal.hue}, ${signal.saturation}%, 88%, ${signal.alpha})`;
            context.lineWidth = 0.8;

            if (transformed || signal.shape === 0) {
                context.beginPath();
                context.moveTo(0, -size);
                context.lineTo(size, 0);
                context.lineTo(0, size);
                context.lineTo(-size, 0);
                context.closePath();
                if (transformed) {
                    context.stroke();
                } else {
                    context.fill();
                }
            } else if (signal.shape === 1) {
                context.fillRect(-size, -size * 0.62, size * 2, size * 1.24);
            } else if (signal.shape === 2) {
                context.beginPath();
                context.arc(0, 0, size, 0, Math.PI * 2);
                context.fill();
            } else if (signal.shape === 3) {
                context.beginPath();
                context.moveTo(-size, -size * 0.7);
                context.lineTo(size, -size * 0.7);
                context.lineTo(size, size * 0.7);
                context.lineTo(-size, size * 0.7);
                context.closePath();
                context.stroke();
            } else {
                context.beginPath();
                context.arc(0, 0, size, 0, Math.PI * 2);
                context.stroke();
                context.beginPath();
                context.arc(0, 0, Math.max(0.8, size * 0.25), 0, Math.PI * 2);
                context.fill();
            }
            context.restore();
        };

        const pointOnPath = (signal, progress, time, pointerState) => {
            const portalX = portalCenter.x;
            let x;
            let y;

            if (progress <= 0.5) {
                const t = progress * 2;
                x = cubic(-0.08, 0.13, 0.35, portalX, t);
                y = cubic(signal.startY, signal.startY * 0.82 + 0.09, signal.middleY, signal.middleY, t);
                y += Math.sin(time * signal.waveSpeed + signal.phase + t * 7) * signal.wave * (1 - t);
            } else {
                const t = (progress - 0.5) * 2;
                x = cubic(portalX, 0.64, 0.81, 1.08, t);
                y = cubic(signal.middleY, signal.middleY, signal.endY, signal.endY, t);
                y += Math.sin(time * (signal.waveSpeed * 0.72) + signal.phase + t * 4) * signal.wave * 0.32 * t;
            }

            const gateInfluence = Math.max(0, 1 - Math.abs(progress - 0.5) / 0.18);
            const depthShiftX = pointerState.x * (signal.depth - 0.5) * 8 * (1 - gateInfluence)
                + pointerState.x * width * 0.002 * gateInfluence;
            const depthShiftY = pointerState.y * (signal.depth - 0.5) * 5 * (1 - gateInfluence)
                + pointerState.y * height * 0.002 * gateInfluence;
            return { x: x * width + depthShiftX, y: y * height + depthShiftY };
        };

        return { resize, render };
    }

    function createPortalRenderer(canvas) {
        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: true,
            depth: false,
            premultipliedAlpha: true,
            powerPreference: "high-performance"
        });

        if (!gl) {
            return null;
        }

        const vertexSource = `
            attribute vec3 aPosition;
            attribute float aPhase;
            uniform float uTime;
            uniform float uAspect;
            uniform float uScale;
            uniform float uRotation;
            uniform vec2 uPointer;
            varying float vPulse;

            void main() {
                vec3 point = aPosition * uScale;
                float spinCos = cos(uRotation);
                float spinSin = sin(uRotation);
                point.xy = vec2(
                    point.x * spinCos - point.y * spinSin,
                    point.x * spinSin + point.y * spinCos
                );

                point.x *= 0.43;
                point.z += sin(uTime * 0.82 + aPhase * 6.28318) * 0.009;

                float angleY = 0.04 + uPointer.x * 0.075 + sin(uTime * 0.17) * 0.012;
                float cosY = cos(angleY);
                float sinY = sin(angleY);
                point = vec3(
                    point.x * cosY + point.z * sinY,
                    point.y,
                    -point.x * sinY + point.z * cosY
                );

                float angleX = -0.035 + uPointer.y * 0.045;
                float cosX = cos(angleX);
                float sinX = sin(angleX);
                point = vec3(
                    point.x,
                    point.y * cosX - point.z * sinX,
                    point.y * sinX + point.z * cosX
                );

                float perspective = 2.42 / (3.55 + point.z);
                vec2 projected = point.xy * perspective;
                projected.x /= uAspect;
                projected += vec2(uPointer.x * 0.007, uPointer.y * 0.007);

                gl_Position = vec4(projected, 0.0, 1.0);
                vPulse = 0.58 + 0.42 * sin(uTime * 1.35 + aPhase * 6.28318);
            }
        `;

        const fragmentSource = `
            precision mediump float;
            uniform vec3 uColor;
            uniform float uAlpha;
            varying float vPulse;

            void main() {
                vec3 color = mix(uColor * 0.72, min(vec3(1.0), uColor * 1.28), vPulse);
                gl_FragColor = vec4(color, uAlpha * (0.46 + vPulse * 0.54));
            }
        `;

        const program = createProgram(gl, vertexSource, fragmentSource);
        if (!program) {
            return null;
        }

        const geometry = createApertureGeometry(128);
        const positionBuffer = gl.createBuffer();
        const phaseBuffer = gl.createBuffer();
        const indexBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, geometry.positions, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, geometry.phases, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

        const locations = {
            position: gl.getAttribLocation(program, "aPosition"),
            phase: gl.getAttribLocation(program, "aPhase"),
            time: gl.getUniformLocation(program, "uTime"),
            aspect: gl.getUniformLocation(program, "uAspect"),
            scale: gl.getUniformLocation(program, "uScale"),
            rotation: gl.getUniformLocation(program, "uRotation"),
            pointer: gl.getUniformLocation(program, "uPointer"),
            color: gl.getUniformLocation(program, "uColor"),
            alpha: gl.getUniformLocation(program, "uAlpha")
        };

        let width = 1;
        let height = 1;

        const resize = (nextWidth, nextHeight) => {
            width = nextWidth;
            height = nextHeight;
            const ratio = Math.min(window.devicePixelRatio || 1, width < 700 ? 1.15 : 1.5);
            canvas.width = Math.max(1, Math.round(width * ratio));
            canvas.height = Math.max(1, Math.round(height * ratio));
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        const render = (time, pointerState) => {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.useProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(locations.position);
            gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, phaseBuffer);
            gl.enableVertexAttribArray(locations.phase);
            gl.vertexAttribPointer(locations.phase, 1, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.uniform1f(locations.time, time);
            gl.uniform1f(locations.aspect, width / Math.max(1, height));
            gl.uniform2f(locations.pointer, pointerState.x, pointerState.y);

            const layers = [
                { scale: 0.76, color: [0.49, 0.84, 1], alpha: 0.2, speed: -0.13, phase: 0.8 },
                { scale: 0.94, color: [0.35, 0.62, 1], alpha: 0.32, speed: 0.17, phase: 0 },
                { scale: 1.075, color: [0.63, 0.36, 1], alpha: 0.22, speed: -0.075, phase: 2.1 }
            ];

            layers.forEach((layer, index) => {
                gl.uniform1f(locations.scale, layer.scale + Math.sin(time * 0.42 + index) * 0.004);
                gl.uniform1f(locations.rotation, time * layer.speed + layer.phase);
                gl.uniform3fv(locations.color, layer.color);
                gl.uniform1f(locations.alpha, layer.alpha);
                gl.drawElements(gl.LINES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
            });
        };

        canvas.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            scene.classList.remove("webgl-ready");
        });

        return { resize, render };
    }

    function createApertureGeometry(segments) {
        const positions = [];
        const phases = [];
        const indices = [];

        const addPoint = (radius, angle, phase, depth = 0) => {
            const index = positions.length / 3;
            positions.push(
                radius * Math.cos(angle),
                radius * Math.sin(angle),
                depth
            );
            phases.push(phase % 1);
            return index;
        };

        [0.28, 0.46, 0.64, 0.82, 1].forEach((radius, ringIndex) => {
            const start = positions.length / 3;
            for (let segment = 0; segment < segments; segment += 1) {
                const angle = (segment / segments) * Math.PI * 2;
                addPoint(radius, angle, segment / segments + ringIndex * 0.11, Math.sin(angle * 3 + ringIndex) * 0.006);
            }
            for (let segment = 0; segment < segments; segment += 1) {
                indices.push(start + segment, start + ((segment + 1) % segments));
            }
        });

        for (let spoke = 0; spoke < 19; spoke += 1) {
            const angle = (spoke / 19) * Math.PI * 2 + (spoke % 3) * 0.035;
            const inner = 0.2 + (spoke % 4) * 0.045;
            const outer = 0.74 + (spoke % 5) * 0.055;
            const first = addPoint(inner, angle, spoke / 19);
            const second = addPoint(outer, angle, spoke / 19 + 0.08);
            indices.push(first, second);
        }

        const sectors = [0.08, 0.73, 1.62, 2.48, 3.86, 5.14];
        sectors.forEach((startAngle, sectorIndex) => {
            const arcSegments = 12 + (sectorIndex % 3) * 4;
            const radius = 1.065 + (sectorIndex % 2) * 0.045;
            let previous = -1;
            for (let segment = 0; segment <= arcSegments; segment += 1) {
                const angle = startAngle + segment * 0.018;
                const current = addPoint(radius, angle, sectorIndex / sectors.length + segment * 0.01);
                if (previous >= 0) {
                    indices.push(previous, current);
                }
                previous = current;
            }
        });

        return {
            positions: new Float32Array(positions),
            phases: new Float32Array(phases),
            indices: new Uint16Array(indices)
        };
    }

    function createProgram(gl, vertexSource, fragmentSource) {
        const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn("Realtime protocol geometry unavailable.", gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }

        return program;
    }

    function compileShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn("Realtime shader unavailable.", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    function cubic(a, b, c, d, t) {
        const inverse = 1 - t;
        return inverse * inverse * inverse * a
            + 3 * inverse * inverse * t * b
            + 3 * inverse * t * t * c
            + t * t * t * d;
    }

    function mulberry32(seed) {
        return () => {
            let value = seed += 0x6D2B79F5;
            value = Math.imul(value ^ value >>> 15, value | 1);
            value ^= value + Math.imul(value ^ value >>> 7, value | 61);
            return ((value ^ value >>> 14) >>> 0) / 4294967296;
        };
    }
})();
