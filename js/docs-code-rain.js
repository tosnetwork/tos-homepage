(function() {
  'use strict';

  const canvases = Array.from(document.querySelectorAll('[data-code-rain-word]'));
  if (!canvases.length) {
    return;
  }

  const monoFamily = '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace';
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const debounce =
    window.TOS &&
    window.TOS.utils &&
    typeof window.TOS.utils.debounce === 'function'
      ? window.TOS.utils.debounce
      : (callback, wait) => {
          let timeoutId = 0;
          return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => callback(...args), wait);
          };
        };

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function hashValue(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453123;
    return value - Math.floor(value);
  }

  function createRain(canvas) {
    const stage = canvas.parentElement;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!stage || !ctx) {
      return null;
    }

    const glyphs = Array.from((canvas.dataset.codeRainWord || 'TOS').trim().toUpperCase()).filter(Boolean);
    if (!glyphs.length) {
      return null;
    }

    const state = {
      frame: 0,
      rafId: 0,
      active: false,
      visible: false,
      reduceMotion: reduceMotionQuery.matches,
      width: 0,
      height: 0,
      dpr: 1
    };

    function resize() {
      const rect = stage.getBoundingClientRect();
      const nextWidth = Math.max(Math.round(rect.width), 320);
      const nextHeight = Math.max(Math.round(rect.height), 220);
      const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);

      state.width = nextWidth;
      state.height = nextHeight;
      state.dpr = nextDpr;

      canvas.width = Math.round(nextWidth * nextDpr);
      canvas.height = Math.round(nextHeight * nextDpr);
      ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);
      render();
    }

    function render() {
      const width = state.width;
      const height = state.height;
      if (!width || !height) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const ambient = ctx.createLinearGradient(0, 0, 0, height);
      ambient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      ambient.addColorStop(0.38, 'rgba(10, 36, 22, 0.08)');
      ambient.addColorStop(1, 'rgba(3, 10, 8, 0.22)');
      ctx.fillStyle = ambient;
      ctx.fillRect(0, 0, width, height);

      const fontSize = clamp(height * 0.082, 18, 28);
      const lineHeight = fontSize * 1.16;
      const columnSpacing = clamp(width / 18, 34, 58);
      const columns = Math.max(6, Math.floor((width - 36) / columnSpacing));
      const wordHeight = glyphs.length * lineHeight;
      const frame = state.frame;

      ctx.save();
      ctx.font = `600 ${fontSize}px ${monoFamily}`;
      ctx.textBaseline = 'top';
      ctx.shadowBlur = 0;

      for (let column = 0; column < columns; column += 1) {
        const seed = column + 1;
        const x =
          18 +
          column * columnSpacing +
          (hashValue(seed * 1.7) - 0.5) * Math.min(18, columnSpacing * 0.3);
        const speed = 0.48 + hashValue(seed * 2.3) * 0.34;
        const stride = lineHeight * (0.96 + hashValue(seed * 4.1) * 0.16);
        const resetSpan = height + wordHeight + 120;
        const offset = hashValue(seed * 5.9) * resetSpan;
        const topY = (frame * speed + offset) % resetSpan - wordHeight - 60;
        const streakTop = topY - 18;
        const streakHeight = wordHeight + 56;
        const streak = ctx.createLinearGradient(0, streakTop, 0, streakTop + streakHeight);
        streak.addColorStop(0, 'rgba(0, 0, 0, 0)');
        streak.addColorStop(0.3, 'rgba(90, 255, 180, 0.025)');
        streak.addColorStop(0.78, 'rgba(90, 255, 180, 0.16)');
        streak.addColorStop(1, 'rgba(214, 255, 244, 0.34)');
        ctx.fillStyle = streak;
        ctx.fillRect(x + columnSpacing * 0.34, streakTop, 2, streakHeight);

        for (let step = 0; step < glyphs.length; step += 1) {
          const y = topY + step * stride;
          if (y < -lineHeight || y > height + lineHeight) {
            continue;
          }

          const fade = (step + 1) / glyphs.length;
          const pulse = 0.7 + 0.3 * ((Math.sin(frame * 0.045 + column * 0.62 + step * 0.84) + 1) / 2);
          const alpha = (0.09 + fade * 0.3) * pulse;
          const glyph = glyphs[step];

          if (step === glyphs.length - 1) {
            ctx.fillStyle = `rgba(236, 255, 246, ${0.94 * pulse})`;
            ctx.shadowBlur = 14;
            ctx.shadowColor = 'rgba(202, 255, 230, 0.72)';
          } else if (step >= glyphs.length - 2) {
            ctx.fillStyle = `rgba(128, 255, 206, ${0.4 + alpha * 1.5})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(76, 255, 184, 0.5)';
          } else {
            const green = Math.round(206 + fade * 42);
            const blue = Math.round(110 + fade * 40);
            ctx.fillStyle = `rgba(84, ${green}, ${blue}, ${alpha})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(40, 255, 162, 0.26)';
          }

          ctx.fillText(glyph, x, y);
        }
      }

      ctx.restore();
    }

    function shouldAnimate() {
      return state.visible && !document.hidden && !state.reduceMotion;
    }

    function frame() {
      state.rafId = 0;
      state.frame += 1;
      render();

      if (shouldAnimate()) {
        state.rafId = window.requestAnimationFrame(frame);
      } else {
        state.active = false;
      }
    }

    function start() {
      if (state.active || !shouldAnimate()) {
        if (!state.active) {
          render();
        }
        return;
      }

      state.active = true;
      state.rafId = window.requestAnimationFrame(frame);
    }

    function stop() {
      state.active = false;
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId);
        state.rafId = 0;
      }
    }

    function sync() {
      if (shouldAnimate()) {
        start();
      } else {
        stop();
        render();
      }
    }

    resize();

    const resizeHandler = debounce(() => {
      resize();
      sync();
    }, 140);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          state.visible = entry.isIntersecting && entry.intersectionRatio > 0.15;
        }
        sync();
      },
      {
        threshold: [0, 0.15, 0.35]
      }
    );

    observer.observe(stage);
    const resizeObserver =
      typeof ResizeObserver === 'function'
        ? new ResizeObserver(() => {
            resizeHandler();
          })
        : null;

    if (resizeObserver) {
      resizeObserver.observe(stage);
    }

    const mediaHandler = () => {
      state.reduceMotion = reduceMotionQuery.matches;
      sync();
    };

    window.addEventListener('resize', resizeHandler);
    document.addEventListener('visibilitychange', sync);

    if (typeof reduceMotionQuery.addEventListener === 'function') {
      reduceMotionQuery.addEventListener('change', mediaHandler);
    } else if (typeof reduceMotionQuery.addListener === 'function') {
      reduceMotionQuery.addListener(mediaHandler);
    }

    sync();

    return {
      destroy() {
        stop();
        observer.disconnect();
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        window.removeEventListener('resize', resizeHandler);
        document.removeEventListener('visibilitychange', sync);
        if (typeof reduceMotionQuery.removeEventListener === 'function') {
          reduceMotionQuery.removeEventListener('change', mediaHandler);
        } else if (typeof reduceMotionQuery.removeListener === 'function') {
          reduceMotionQuery.removeListener(mediaHandler);
        }
      }
    };
  }

  function init() {
    canvases.forEach((canvas) => {
      createRain(canvas);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
