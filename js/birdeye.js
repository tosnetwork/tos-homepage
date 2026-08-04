(() => {
    "use strict";

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    const viewport = canvas.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 34000;
    const state = {
        data: null,
        fixtureText: "",
        mode: "consensus",
        nodes: [],
        playing: !reducedMotion,
        speed: 1,
        elapsed: 0,
        lastFrame: performance.now(),
        selected: null,
        lowGpu: false,
        validatorSet: "current",
        validatorScope: "network",
        connected: true,
        receiptMode: "hash-only",
        stress: 1,
        keyboardIndex: -1,
        edges: [],
        correctionInjected: false,
        layers: { shards: true, particles: true, labels: true, failures: true },
        pointer: { x: -1000, y: -1000 },
        lastDialogTrigger: null,
        frameSamples: [],
        projection: { block_count: 10, signatures: false, shards: false, ai_phase: 2, expired: [] },
        pendingFocusId: null,
        recoveryCount: 0,
        stressProbe: null,
        aiSignalsRendered: 0,
        traceIds: null,
        frame: 0,
        labelBoxes: [],
        viewportSize: { width: 0, height: 0 },
        modeTransition: 0,
        alertTimer: 0,
        parallax: { x: 0, y: 0 },
        camera: { zoom: 1, targetZoom: 1, x: 0, y: 0, targetX: 0, targetY: 0, dragging: false, moved: false, dragX: 0, dragY: 0 }
    };

    const $ = (id) => document.getElementById(id);
    const modeCopy = {
        consensus: ["01 / SKYVIEW", "Consensus Matrix", "Simulated proof-derived participation · curated fixture evidence"],
        chain: ["02 / BLOCKSPACE", "Chain Matrix", "10-block fixture window · 243 tx total · 16 sampled transactions"],
        ai: ["03 / INTELLIGENCE", "AI Execution Cosmos", "384 modeled parallel tasks · selected T-2048 causal path · not live"]
    };

    const escapeHtml = (value) => String(value ?? "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);

    function makeRain(data) {
        const rain = $("rain");
        rain.replaceChildren();
        const tokens = [data.meta.schema_version, ...data.graph_events.map((event) => event.cursor), ...data.blocks.map((block) => String(block.seqno)), ...data.entities.map((entity) => entity.id)];
        const columns = Math.min(44, Math.ceil(innerWidth / 34));
        for (let i = 0; i < columns; i += 1) {
            const column = document.createElement("span");
            column.textContent = Array.from({ length: 20 }, (_, row) => tokens[(i * 7 + row * 3) % tokens.length]).join("\n");
            column.style.left = `${(i / columns) * 100}%`;
            column.style.animationDelay = `${-(i * 1.7) % 14}s`;
            column.style.animationDuration = `${10 + (i * 5) % 12}s`;
            rain.appendChild(column);
        }
    }

    function resize() {
        const rect = viewport.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function line(a, b, color = "rgba(47,255,136,.18)", width = 1, dash = []) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dash);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function directedLine(a, b, color, width = 1, dash = []) {
        line(a, b, color, width, dash);
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        const t = .72;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(-4, 3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawMatrixField(w, h) {
        const horizon = h * .52;
        ctx.save();
        const px = state.lowGpu ? 0 : (state.pointer.x - w / 2) * .012;
        const py = state.lowGpu ? 0 : (state.pointer.y - h / 2) * .008;
        state.parallax.x += (px - state.parallax.x) * .06;
        state.parallax.y += (py - state.parallax.y) * .06;
        ctx.translate(state.parallax.x, state.parallax.y);
        ctx.strokeStyle = "rgba(56,255,142,.055)";
        ctx.lineWidth = 1;
        for (let i = -12; i <= 12; i += 1) {
            ctx.beginPath();
            ctx.moveTo(w / 2 + i * 18, horizon);
            ctx.lineTo(w / 2 + i * w * .085, h);
            ctx.stroke();
        }
        for (let i = 0; i < 12; i += 1) {
            const depth = i / 11;
            const y = horizon + depth * depth * (h - horizon);
            ctx.globalAlpha = .2 + depth * .8;
            line({ x: 0, y }, { x: w, y }, "rgba(56,255,142,.08)");
        }
        ctx.globalAlpha = 1;
        const activeEvent = state.data ? [...state.data.graph_events].reverse().find((item) => item.at <= state.elapsed) : null;
        const glyphs = `${activeEvent?.cursor || "gd-0001"}${state.mode}TOSΔΣ◇`.replace(/[^a-zA-Z0-9ΔΣ◇]/g, "");
        ctx.font = "8px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(94,255,159,.11)";
        const columns = Math.min(24, Math.ceil(w / 58));
        for (let column = 0; column < columns; column += 1) {
            const x = 24 + column * (w - 48) / Math.max(columns - 1, 1);
            const offset = state.playing && !state.lowGpu ? (state.elapsed / 28 + column * 31) % (h + 120) : column * 41 % h;
            for (let row = 0; row < 5; row += 1) ctx.fillText(glyphs[(column * 3 + row) % glyphs.length], x, (offset + row * 17) % (h + 30) - 15);
        }
        ctx.restore();
    }

    function drawTransition(w, h, now) {
        const age = now - state.modeTransition;
        if (age < 0 || age > 520 || reducedMotion || state.lowGpu) return;
        const progress = age / 520;
        const x = w * progress;
        ctx.save();
        const gradient = ctx.createLinearGradient(x - 90, 0, x + 20, 0);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(.75, "rgba(120,255,178,.09)");
        gradient.addColorStop(1, "rgba(185,255,213,.65)");
        ctx.fillStyle = gradient;
        ctx.fillRect(Math.max(0, x - 100), 0, 120, h);
        ctx.restore();
    }

    function pointToSegment(point, a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length2 = dx * dx + dy * dy || 1;
        const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / length2));
        return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
    }

    function projectAt(elapsed) {
        const events = state.data.graph_events.filter((event) => event.at <= elapsed && event.state);
        const latest = events.at(-1) || state.data.graph_events.find((event) => event.state);
        return latest ? { ...latest.state, expired: [...latest.state.expired] } : { block_count: 10, signatures: false, shards: false, ai_phase: 2, expired: [] };
    }

    function buildTraceIds(selected) {
        if (!selected || !state.data) return null;
        const ids = new Set([selected.id]);
        const raw = selected.raw;
        if (selected.type === "edge") [raw.from, raw.to].forEach((id) => ids.add(id));
        state.data.edges.forEach((edge) => {
            if ([edge.id, edge.from, edge.to].includes(selected.id)) [edge.id, edge.from, edge.to].forEach((id) => ids.add(id));
        });
        state.data.transactions.forEach((transaction) => {
            if ([transaction.id, transaction.block, transaction.from, transaction.to].includes(selected.id)) [transaction.id, transaction.block, transaction.from, transaction.to].forEach((id) => ids.add(id));
        });
        state.data.shards.forEach((shard) => {
            if ([shard.id, shard.parent].includes(selected.id)) [shard.id, shard.parent].forEach((id) => ids.add(id));
        });
        if (selected.type === "validator") ids.add("block-4181741");
        return ids;
    }

    function updateTrace(selected) {
        state.traceIds = buildTraceIds(selected);
        const panel = $("traceStatus");
        panel.hidden = !selected;
        if (!selected) return;
        $("traceTitle").textContent = selected.raw.label || (selected.raw.seqno ? `#${selected.raw.seqno}` : selected.id);
        $("traceMeta").textContent = `${Math.max(0, state.traceIds.size - 1)} related entities / signals`;
    }

    function clearTrace() {
        const resetGalaxyCamera = state.selected?.raw?.kind === "ai_cluster";
        state.selected = null;
        state.traceIds = null;
        state.pendingFocusId = null;
        $("traceStatus").hidden = true;
        $("inspector").classList.remove("open");
        if (resetGalaxyCamera) resetCamera();
        const url = new URL(location.href);
        url.searchParams.delete("entity");
        history.replaceState(null, "", url);
        $("srStatus").textContent = "Causal trace cleared.";
    }

    function nodeSignalActive(node) {
        if (state.selected?.id === node.id) return true;
        const event = [...state.data.graph_events].reverse().find((item) => item.at <= state.elapsed);
        if (!event || state.elapsed - event.at > 1200) return false;
        if (state.mode === "consensus") return node.type === "block" || (node.type === "validator" && state.projection.signatures && node.raw.status === "signed");
        if (state.mode === "chain") return ["block", "transaction", "shard"].includes(node.type);
        return node.type === "entity" || node.type === "terminal";
    }

    function semanticEdges() {
        state.edges = [];
        state.data.edges.forEach((raw) => {
            if (raw.kind === "signed" && !state.projection.signatures) return;
            const from = state.nodes.find((node) => node.id === raw.from);
            const to = state.nodes.find((node) => node.id === raw.to);
            if (!from || !to) return;
            const edge = { id: raw.id, type: "edge", raw, from, to };
            state.edges.push(edge);
            const related = !state.traceIds || [raw.from, raw.to, raw.id].some((id) => state.traceIds.has(id));
            const failure = ["rejects", "refunds"].includes(raw.kind);
            const palette = failure ? ["255,99,120", "#ff6378"] : raw.truth === "signed_offchain" || raw.truth === "attested" ? ["35,214,255", "#23d6ff"] : raw.truth === "observed" ? ["255,204,107", "#ffcc6b"] : ["202,255,54", "#caff36"];
            const dash = failure ? [3, 5] : raw.truth === "signed_offchain" ? [6, 4] : raw.truth === "observed" ? [2, 5] : [];
            directedLine(from, to, `rgba(${palette[0]},${related ? .62 : .13})`, related ? 1.7 : .8, dash);
            if (related) particle(from, to, (state.edges.length * .173) % 1, palette[1]);
        });
    }

    function glowDot(node, radius, color, label, sublabel, shape = "circle") {
        const hover = Math.hypot(state.pointer.x - node.x, state.pointer.y - node.y) < radius + 12;
        ctx.save();
        if (state.traceIds && !state.traceIds.has(node.id)) ctx.globalAlpha = .22;
        ctx.shadowColor = color;
        ctx.shadowBlur = hover || state.selected?.id === node.id ? 24 : 12;
        ctx.strokeStyle = color;
        ctx.fillStyle = "rgba(2,14,9,.92)";
        ctx.lineWidth = hover ? 2 : 1;
        ctx.beginPath();
        if (shape === "diamond") {
            ctx.moveTo(node.x, node.y - radius);
            ctx.lineTo(node.x + radius, node.y);
            ctx.lineTo(node.x, node.y + radius);
            ctx.lineTo(node.x - radius, node.y);
            ctx.closePath();
        } else if (shape === "square") {
            ctx.rect(node.x - radius, node.y - radius, radius * 2, radius * 2);
        } else if (shape === "hex") {
            for (let side = 0; side < 6; side += 1) {
                const angle = Math.PI / 3 * side - Math.PI / 2;
                const x = node.x + Math.cos(angle) * radius;
                const y = node.y + Math.sin(angle) * radius;
                if (!side) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.closePath();
        } else {
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.stroke();
        if (!state.lowGpu && nodeSignalActive(node)) {
            const wave = (state.elapsed / 900 + node.x * .001) % 1;
            ctx.globalAlpha = 1 - wave;
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + 5 + wave * 13, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.lineWidth = .6;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
        ctx.shadowBlur = 0;
        ctx.fillStyle = color;
        ctx.font = `600 ${Math.max(7, radius * .48)}px 'IBM Plex Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.glyph || ({ validator: "V", block: "▦", transaction: "↦", shard: "S", terminal: "E", entity: "◇" })[node.type] || "·", node.x, node.y + .5);
        ctx.textBaseline = "alphabetic";
        if (state.selected?.id === node.id || (state.keyboardIndex >= 0 && state.nodes[state.keyboardIndex]?.id === node.id)) {
            ctx.save();
            ctx.translate(node.x, node.y);
            ctx.rotate(state.lowGpu ? 0 : state.elapsed / 1800);
            ctx.strokeStyle = "rgba(185,255,213,.8)";
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 5]);
            ctx.strokeRect(-radius - 12, -radius - 12, (radius + 12) * 2, (radius + 12) * 2);
            ctx.setLineDash([]);
            [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx,sy]) => {
                ctx.beginPath(); ctx.moveTo(sx * (radius + 17), sy * (radius + 9)); ctx.lineTo(sx * (radius + 9), sy * (radius + 9)); ctx.stroke();
            });
            ctx.restore();
        }
        if (state.layers.labels && label) drawSemanticLabel(node, radius, label, sublabel);
        ctx.restore();
    }

    function drawSemanticLabel(node, radius, label, sublabel) {
        const selected = state.selected?.id === node.id || (state.keyboardIndex >= 0 && state.nodes[state.keyboardIndex]?.id === node.id);
        const zoom = state.camera.zoom;
        ctx.font = "600 10px 'IBM Plex Mono', monospace";
        const width = Math.max(ctx.measureText(label).width, sublabel ? sublabel.length * 5.4 : 0) + 12;
        const height = sublabel ? 31 : 18;
        const gap = radius + 16;
        const candidates = [
            { x: node.x, y: node.y + gap, align: "center" },
            { x: node.x, y: node.y - gap - (sublabel ? 10 : 0), align: "center" },
            { x: node.x + radius + 12, y: node.y + 3, align: "left" },
            { x: node.x - radius - 12, y: node.y + 3, align: "right" }
        ];
        let placement = null;
        for (const candidate of candidates) {
            const left = candidate.align === "center" ? candidate.x - width / 2 : candidate.align === "left" ? candidate.x : candidate.x - width;
            const top = candidate.y - 11;
            const screenLeft = (left - state.viewportSize.width / 2) * zoom + state.viewportSize.width / 2 + state.camera.x;
            const screenTop = (top - state.viewportSize.height / 2) * zoom + state.viewportSize.height / 2 + state.camera.y;
            const box = { left: screenLeft - 3, top: screenTop - 3, right: screenLeft + width * zoom + 3, bottom: screenTop + height * zoom + 3 };
            const inspectorUnsafe = $("inspector").classList.contains("open") && innerWidth > 700 && box.right > state.viewportSize.width - 340;
            const overlap = state.labelBoxes.some((other) => box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top);
            if (selected || (!inspectorUnsafe && !overlap)) { placement = { ...candidate, box }; break; }
        }
        if (!placement) return;
        state.labelBoxes.push(placement.box);
        if (placement.x !== node.x || placement.y < node.y) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y + Math.sign(placement.y - node.y || 1) * (radius + 3));
            ctx.lineTo(placement.x, placement.y + (placement.y < node.y ? 5 : -8));
            ctx.strokeStyle = "rgba(122,190,154,.28)";
            ctx.lineWidth = .6;
            ctx.stroke();
        }
        ctx.fillStyle = "rgba(220,255,235,.92)";
        ctx.font = "600 10px 'IBM Plex Mono', monospace";
        ctx.textAlign = placement.align;
        ctx.fillText(label, placement.x, placement.y);
        if (sublabel) {
            ctx.fillStyle = "rgba(150,190,169,.7)";
            ctx.font = "9px 'IBM Plex Mono', monospace";
            ctx.fillText(sublabel, placement.x, placement.y + 13);
        }
    }

    function particle(a, b, offset, color = "#31ff89") {
        if (!state.layers.particles || state.lowGpu) return;
        const t = (state.elapsed / 1500 + offset) % 1;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        const tailT = Math.max(0, t - .07);
        const tailX = a.x + (b.x - a.x) * tailT;
        const tailY = a.y + (b.y - a.y) * tailT;
        ctx.save();
        const trail = ctx.createLinearGradient(tailX, tailY, x, y);
        trail.addColorStop(0, "transparent");
        trail.addColorStop(1, color);
        ctx.strokeStyle = trail;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawSignalLens() {
        if (!state.nodes.length) return;
        const hovered = [...state.nodes].reverse().find((node) => Math.hypot(state.pointer.x - node.x, state.pointer.y - node.y) < (node.hitRadius || 34));
        const target = hovered || (state.selected && state.nodes.find((node) => node.id === state.selected.id));
        if (!target) return;
        const truth = target.raw.truth || target.raw.provenance || target.raw.evidence || "node_validated";
        const palette = (["observed", "declared"].includes(truth)) ? "255,204,107" : (["attested", "signed_offchain"].includes(truth)) ? "104,232,255" : "120,255,178";
        const pulse = state.lowGpu || reducedMotion ? 0 : Math.sin(state.elapsed / 240) * 2.5;
        const radius = 29 + pulse;
        ctx.save();
        ctx.strokeStyle = `rgba(${palette},.62)`;
        ctx.lineWidth = .8;
        ctx.setLineDash([9, 7]);
        ctx.beginPath(); ctx.arc(target.x, target.y, radius, -.2, 1.35); ctx.stroke();
        ctx.beginPath(); ctx.arc(target.x, target.y, radius, Math.PI - .2, Math.PI + 1.35); ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = `rgba(${palette},.34)`;
        [[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([sx, sy]) => {
            ctx.beginPath();
            ctx.moveTo(target.x + sx * 37, target.y + sy * 29);
            ctx.lineTo(target.x + sx * 37, target.y + sy * 37);
            ctx.lineTo(target.x + sx * 29, target.y + sy * 37);
            ctx.stroke();
        });
        const labelOnLeft = target.x > state.viewportSize.width * .68;
        const labelX = target.x + (labelOnLeft ? -43 : 43);
        ctx.font = "7px 'IBM Plex Mono', monospace";
        ctx.textAlign = labelOnLeft ? "right" : "left";
        ctx.fillStyle = `rgba(${palette},.8)`;
        ctx.fillText(`LOCK · ${target.type.toUpperCase()} · ${truthLabel(truth)}`, labelX, target.y - 29);
        ctx.fillStyle = `rgba(${palette},.42)`;
        ctx.fillText(`ID ${target.id} / ${Math.round(target.x)},${Math.round(target.y)}`, labelX, target.y - 18);
        ctx.restore();
    }

    function drawEventShockwave(w, h) {
        if (state.lowGpu || reducedMotion) return;
        const event = [...state.data.graph_events].reverse().find((item) => state.elapsed >= item.at);
        if (!event) return;
        const age = state.elapsed - event.at;
        if (age > 1200) return;
        const progress = age / 1200;
        const anchors = {
            "gd-0001": ["block-4181741"],
            "gd-0002": ["block-4181741"],
            "gd-0003": ["shard-a-1741"],
            "gd-0004": ["contract-task"],
            "gd-0005": ["receipt-91"],
            "gd-0006": ["edge-syd"],
            "gd-0007": ["settlement-2048"],
            "gd-0008": ["block-4181740"]
        };
        const semanticAnchor = (anchors[event.cursor] || []).map((id) => state.nodes.find((node) => node.id === id)).find(Boolean);
        const chainHead = state.nodes.filter((node) => node.type === "block" && !node.pending).sort((a, b) => Number(b.raw.seqno) - Number(a.raw.seqno))[0];
        const center = semanticAnchor || (state.mode === "consensus" ? state.nodes.find((node) => node.id === "block-4181741") : state.mode === "chain" ? chainHead : null) || { x: w * .5, y: h * .5 };
        ctx.save();
        ctx.globalAlpha = 1 - progress;
        ctx.strokeStyle = event.kind === "retract" ? "#ff6378" : event.kind === "snapshot" ? "#68e8ff" : "#78ffb2";
        ctx.lineWidth = 2;
        const pulseReach = state.mode === "ai" ? .19 : .34;
        ctx.beginPath(); ctx.arc(center.x, center.y, 18 + progress * Math.min(w, h) * pulseReach, 0, Math.PI * 2); ctx.stroke();
        ctx.font = "8px 'IBM Plex Mono', monospace";
        ctx.fillStyle = ctx.strokeStyle;
        const labelOnLeft = center.x > w * .72;
        ctx.textAlign = labelOnLeft ? "right" : "left";
        ctx.fillText(`${event.cursor} · ${event.kind.toUpperCase()}`, center.x + (labelOnLeft ? -14 : 14), center.y - 16 - progress * 24);
        ctx.restore();
    }

    function applyCamera(w, h) {
        const camera = state.camera;
        camera.zoom += (camera.targetZoom - camera.zoom) * .12;
        camera.x += (camera.targetX - camera.x) * .12;
        camera.y += (camera.targetY - camera.y) * .12;
        ctx.translate(w / 2 + camera.x, h / 2 + camera.y);
        ctx.scale(camera.zoom, camera.zoom);
        ctx.translate(-w / 2, -h / 2);
    }

    function screenToWorld(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        const screenX = clientX - rect.left;
        const screenY = clientY - rect.top;
        return {
            x: (screenX - rect.width / 2 - state.camera.x) / state.camera.zoom + rect.width / 2,
            y: (screenY - rect.height / 2 - state.camera.y) / state.camera.zoom + rect.height / 2
        };
    }

    function resetCamera() {
        state.camera.targetZoom = 1;
        state.camera.targetX = 0;
        state.camera.targetY = 0;
        $("srStatus").textContent = "Matrix camera reset.";
    }

    function renderValidatorPopulation(w, h) {
        const population = state.data.validator_population;
        if (state.validatorScope !== "network" || !population) return [];
        const cx = w * .5;
        const cy = h * .5;
        const rx = Math.min(w * .43, 520);
        const ry = Math.min(h * .39, 270);
        const renderBudget = state.lowGpu ? Math.min(64, population.population_rendered) : population.population_rendered;
        let remaining = renderBudget;
        const clusters = population.clusters.map((raw, clusterIndex) => {
            const rendered = clusterIndex === population.clusters.length - 1 ? remaining : Math.floor(renderBudget * raw.count / population.population_total);
            remaining -= rendered;
            const node = { id: raw.id, x: cx + raw.x * rx, y: cy + raw.y * ry, type: "cluster", raw: { ...raw, kind: "validator_cluster", detail: `${raw.count} modeled validators · ${population.population_kind} population`, source: population.source, generated_at: population.generated_at } };
            const spread = 18 + Math.sqrt(raw.count) * 1.45;
            ctx.save();
            ctx.fillStyle = raw.truth === "declared" ? "rgba(181,158,255,.32)" : "rgba(104,232,255,.28)";
            for (let point = 0; point < rendered; point += 1) {
                const angle = point * 2.399963 + clusterIndex * .71;
                const distance = Math.sqrt((point + .5) / Math.max(rendered, 1)) * spread;
                const x = node.x + Math.cos(angle) * distance;
                const y = node.y + Math.sin(angle) * distance * .58;
                ctx.fillRect(x, y, point % 7 === 0 ? 1.8 : 1, point % 7 === 0 ? 1.8 : 1);
            }
            ctx.restore();
            glowDot(node, 7 + Math.sqrt(raw.count) * .28, raw.truth === "declared" ? "#b59eff" : "#68e8ff", raw.label, `${raw.count} · ${population.population_kind.toUpperCase()}`, "hex");
            return node;
        });
        if (w >= 700) {
            ctx.save();
            ctx.fillStyle = "rgba(104,232,255,.5)";
            ctx.font = "8px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(`GLOBAL VALIDATOR POPULATION · ${population.population_total.toLocaleString()} FIXTURE · ${renderBudget} RENDERED`, cx, Math.max(104, cy - ry - 18));
            ctx.restore();
        }
        return clusters;
    }

    function renderConsensus(w, h) {
        const cx = w * .5;
        const cy = h * .5;
        const populationNodes = renderValidatorPopulation(w, h);
        const rx = Math.min(w * (state.validatorScope === "network" ? .24 : .38), state.validatorScope === "network" ? 300 : 410);
        const ry = Math.min(h * (state.validatorScope === "network" ? .22 : .34), state.validatorScope === "network" ? 145 : 225);
        const core = { id: "block-4181741", x: cx, y: cy, type: "block", raw: state.data.blocks.at(-1) };
        const selectedSet = state.data.validator_sets[state.validatorSet];
        const validatorsById = new Map(state.data.validators.map((validator) => [validator.id, validator]));
        const allNodes = selectedSet.members.map((member, index) => {
            const base = validatorsById.get(member.id) || member;
            const angle = Math.PI * 2 * index / selectedSet.members.length - Math.PI / 2;
            const positioned = base.x === undefined ? { x: Math.cos(angle), y: Math.sin(angle) } : base;
            return {
            id: member.id, x: cx + positioned.x * rx, y: cy + positioned.y * ry, type: "validator", raw: { ...base, ...member, set: state.validatorSet, set_id: selectedSet.id, valid_from: selectedSet.valid_from, valid_to: selectedSet.valid_to }
            };
        });
        const nodes = state.validatorScope === "signers" ? (state.projection.signatures ? allNodes.filter((node) => node.raw.status === "signed") : []) : allNodes;
        nodes.forEach((n, i) => {
            const signed = state.projection.signatures && n.raw.status === "signed";
            line(n, core, signed ? "rgba(49,255,137,.22)" : "rgba(130,150,140,.12)", signed ? 1 : .6, signed ? [] : [4, 6]);
            if (signed) particle(n, core, i / nodes.length);
        });
        ctx.save();
        ctx.strokeStyle = "rgba(49,255,137,.14)";
        ctx.setLineDash([2, 8]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgba(104,232,255,.08)";
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx * .73, ry * .73, 0, 0, Math.PI * 2);
        ctx.stroke();
        if (state.projection.signatures) {
            const signedWeight = nodes.filter((node) => node.raw.status === "signed").reduce((sum, node) => sum + node.raw.weight, 0);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(202,255,54,.72)";
            ctx.shadowColor = "#caff36";
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx * .52, ry * .52, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * signedWeight / 100);
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = "rgba(202,255,54,.72)";
            ctx.font = "8px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(`THRESHOLD FIELD · ${signedWeight.toFixed(1)}%`, cx, cy - ry * .58);
        }
        ctx.restore();
        nodes.forEach((n) => glowDot(n, 5 + n.raw.weight * .32, n.raw.status === "signed" ? "#31ff89" : "#667a70", state.validatorScope === "network" ? "" : n.raw.label, state.validatorScope === "network" ? "" : `${n.raw.weight}% · ${n.raw.region}`));
        const signedCount = state.projection.signatures ? allNodes.filter((node) => node.raw.status === "signed").length : 0;
        glowDot(core, 34, "#caff36", "MC 4,181,741", `${state.validatorScope.toUpperCase()} · ${signedCount} / ${allNodes.length} SIGNERS`, "diamond");
        state.nodes = [...populationNodes, ...nodes, core];
    }

    function renderChain(w, h) {
        const y = h * .42;
        const left = Math.max(55, w * .055);
        const usable = w - left * 2;
        const windowStart = 9000;
        const commitInterval = 1000;
        const inReplayWindow = state.elapsed >= windowStart && state.elapsed < 15000;
        const replayPosition = inReplayWindow ? Math.max(0, (state.elapsed - windowStart) / commitInterval) : state.data.blocks.length - 4;
        const committedCount = Math.min(state.data.blocks.length, Math.floor(replayPosition) + 4);
        const incomingProgress = committedCount < state.data.blocks.length ? replayPosition - Math.floor(replayPosition) : 0;
        const renderedCount = Math.min(state.data.blocks.length, committedCount + (committedCount < state.data.blocks.length ? 1 : 0));
        const spacing = usable / Math.max(committedCount - 1, 4);
        const right = w - left;
        const blockData = state.data.blocks.slice(0, renderedCount);
        let blocks = blockData.map((b, i) => {
            const incoming = i >= committedCount;
            const x = incoming
                ? right + spacing * (1 - incomingProgress)
                : right - spacing * (committedCount - 1 - i) - spacing * incomingProgress;
            const corrected = b.id === "block-4181740" && state.correctionInjected ? { ...b, status: "replaced fixture view", view_hash: state.data.corrections[1].new_hash } : b;
            return { id: b.id, x, y, type: "block", pending: incoming, raw: incoming ? { ...corrected, status: "incoming fixture signal" } : corrected };
        });
        if (w < 700 && blocks.length > 1) {
            blocks = blocks.slice(-5);
            const mobileLeft = 48;
            const mobileRight = w - 48;
            blocks.forEach((block, index) => {
                block.x = mobileLeft + (mobileRight - mobileLeft) * index / Math.max(1, blocks.length - 1);
            });
        }
        const committedBlocks = blocks.filter((block) => !block.pending);
        const totalTransactions = committedBlocks.reduce((sum, block) => sum + block.raw.tx_count, 0);
        if (w >= 700) {
            ctx.fillStyle = "rgba(104,232,255,.46)";
            ctx.font = "8px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            const nextMs = committedCount < state.data.blocks.length ? Math.ceil((1 - incomingProgress) * commitInterval) : 0;
            ctx.fillText(`FIXTURE WINDOW REPLAY · ${committedCount}/10 COMMITTED · ${totalTransactions} TX · ${nextMs ? `NEXT SIGNAL ${nextMs}ms` : "WINDOW COMPLETE"}`, w / 2, 104);
        }
        ctx.save();
        ctx.strokeStyle = "rgba(202,255,54,.36)";
        ctx.setLineDash([2, 5]);
        ctx.beginPath(); ctx.moveTo(right, y - 58); ctx.lineTo(right, y + 58); ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(202,255,54,.72)";
        ctx.font = "7px 'IBM Plex Mono', monospace";
        ctx.textAlign = "right";
        ctx.fillText("CHAIN HEAD · FIXTURE REPLAY", right - 5, y - 65);
        ctx.restore();
        blocks.slice(0, -1).forEach((b, i) => {
            const entering = blocks[i + 1].pending;
            line(b, blocks[i + 1], entering ? "rgba(202,255,54,.42)" : "rgba(49,255,137,.35)", entering ? 1 : 2, entering ? [4, 6] : []);
            if (!entering) particle(b, blocks[i + 1], i * .19);
        });
        blocks.forEach((b, i) => {
            const head = b === committedBlocks.at(-1);
            const important = w >= 760 || i % 3 === 0 || head || b.pending || [state.selected?.id, state.pendingFocusId].includes(b.id);
            ctx.save();
            if (b.pending) ctx.globalAlpha = Math.max(.12, incomingProgress);
            glowDot(b, head ? 20 : b.pending ? 14 : 10, head ? "#caff36" : b.pending ? "#68e8ff" : "#31ff89", important ? `${b.pending ? "INCOMING " : ""}#${String(b.raw.seqno).slice(-4)}` : "", important ? `${b.raw.tx_count} TX · ${b.pending ? "FIXTURE SIGNAL" : "COMMITTED"}` : "", "square");
            ctx.restore();
            ctx.fillStyle = "rgba(80,255,150,.18)";
            ctx.font = "7px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            if (important) ctx.fillText(`LT ${String(b.raw.seqno).slice(-3)}·${i}`, b.x, y + 48);
        });
        const shardData = w < 700 ? state.data.shards.filter((shard) => shard.parent === committedBlocks.at(-1)?.id) : state.data.shards;
        const shards = state.layers.shards && state.projection.shards ? shardData.map((shard) => {
            const parent = committedBlocks.find((b) => b.id === shard.parent);
            if (!parent) return null;
            const transition = shard.split_state.includes("split") ? Math.sin(state.elapsed / 900) * 6 : shard.split_state.includes("merge") ? Math.cos(state.elapsed / 900) * 5 : 0;
            const node = { id: shard.id, x: parent.x + shard.lane * 24 + transition, y: y + (shard.lane || -0.45) * 88, type: "shard", raw: shard };
            line(parent, node, "rgba(255,204,107,.32)", 1, [3, 4]);
            return node;
        }).filter(Boolean) : [];
        shards.forEach((node) => glowDot(node, 8, "#ffcc6b", w < 700 ? "" : node.raw.label, w < 700 ? "" : node.raw.split_state, "diamond"));
        const requestedEntityId = state.pendingFocusId || state.selected?.id || null;
        const transactionWindow = state.data.transactions.filter((tx) => committedBlocks.some((block) => block.id === tx.block));
        const visibleTransactions = w < 700
            ? transactionWindow.filter((tx) => tx.block === committedBlocks.at(-1)?.id || ["bounced", "aborted", "compute_failed"].includes(tx.state) || [tx.id, tx.from, tx.to].includes(requestedEntityId))
            : transactionWindow;
        const txs = visibleTransactions.map((tx, i) => {
            const parent = blocks.find((b) => b.id === tx.block);
            const above = i % 2 === 0;
            const outcome = {
                success: { color: "#23d6ff", line: "rgba(35,214,255,.25)", shape: "circle", glyph: "↦", dash: [3, 5] },
                bounced: { color: "#ffcc6b", line: "rgba(255,204,107,.55)", shape: "diamond", glyph: "↶", dash: [3, 5] },
                compute_failed: { color: "#b59eff", line: "rgba(181,158,255,.58)", shape: "hex", glyph: "!", dash: [2, 4] },
                aborted: { color: "#ff6378", line: "rgba(255,99,120,.58)", shape: "square", glyph: "×", dash: [6, 4] }
            }[tx.state] || { color: "#8da99b", line: "rgba(141,169,155,.4)", shape: "circle", glyph: "?", dash: [2, 5] };
            const n = { id: tx.id, x: left + usable * (i + .5) / visibleTransactions.length, y: w < 700 ? h * .64 : y + (above ? -152 : 152), type: "transaction", raw: tx, outcome, glyph: outcome.glyph };
            line(parent, n, outcome.line, tx.state === "success" ? 1 : 2, outcome.dash);
            return n;
        });
        txs.forEach((n, index) => {
            const showLabel = w >= 700 || index % 2 === 0 || [state.selected?.id, state.pendingFocusId].includes(n.id);
            glowDot(n, 7, n.outcome.color, showLabel ? n.raw.label : "", showLabel ? `${n.raw.value} · ${n.raw.state.replace("_", " ")}` : "", n.outcome.shape);
        });
        if (w < 700) {
            ctx.fillStyle = "rgba(104,232,255,.48)";
            ctx.font = "8px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(`LOD · ${visibleTransactions.length} EXPANDED / ${transactionWindow.length} FIXTURE TX`, w / 2, h * .64 - 30);
        }
        const focusTx = txs.find((node) => node.id === requestedEntityId || [node.raw.from, node.raw.to].includes(requestedEntityId)) || txs.find((node) => node.id === "tx-a81f") || txs[0];
        const endpointData = focusTx ? state.data.entities.filter((e) => [focusTx.raw.from, focusTx.raw.to].includes(e.id)) : [];
        const endpoints = endpointData.map((entity, i) => ({ id: entity.id, x: focusTx.x + (i ? 105 : -105), y: focusTx.y, type: "entity", raw: entity }));
        endpoints.forEach((node) => { line(node, focusTx, "rgba(105,255,176,.28)", 1); glowDot(node, 11, "#78ffb2", node.raw.label, node.raw.kind, "circle"); });
        state.nodes = [...blocks, ...shards, ...txs, ...endpoints];
    }

    function renderAIGalaxies(w, h) {
        const population = state.data.ai_execution_population;
        if (!population) return [];
        const palette = { cyan: "104,232,255", amber: "255,204,107", green: "120,255,178", purple: "181,158,255" };
        const galaxyNodes = [];
        const focusedId = state.selected?.raw?.kind === "ai_cluster" ? state.selected.id : null;
        const taskBudget = state.lowGpu ? 72 : w < 700 ? 144 : population.concurrent_tasks;
        state.aiSignalsRendered = taskBudget;
        let remainingTasks = taskBudget;
        const renderedByCluster = population.clusters.map((cluster, index) => {
            const count = index === population.clusters.length - 1 ? remainingTasks : Math.round(taskBudget * cluster.tasks / population.concurrent_tasks);
            remainingTasks -= count;
            return count;
        });
        ctx.save();
        ctx.fillStyle = "rgba(104,232,255,.48)";
        ctx.font = "8px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        if (w >= 700) ctx.fillText(`AI EXECUTION COSMOS · ${population.concurrent_tasks} MODELED CONCURRENT TASKS · ${taskBudget} TASK SIGNALS RENDERED · ${population.clusters.length} FIXTURE GALAXIES · NOT LIVE`, w / 2, 104);
        population.clusters.forEach((cluster, index) => {
            const overview = !focusedId;
            const columns = w < 700 ? 2 : 3;
            const row = Math.floor(index / columns);
            const column = index % columns;
            const cx = w * (w < 700 ? .27 + column * .46 : .18 + column * .32);
            const cy = h * (w < 700 ? .27 + row * .23 : .30 + row * .40);
            const focused = focusedId === cluster.id;
            const radius = ((w < 700 ? 12 : 22) + Math.sqrt(cluster.tasks) * (w < 700 ? .65 : 1.2)) * (focused ? 1.42 : overview ? (w < 700 ? 1.18 : 1.48) : 1);
            const color = palette[cluster.color] || palette.green;
            const rotation = (state.lowGpu || reducedMotion ? index * .7 : state.elapsed / (5200 + index * 370)) + index * .9;
            ctx.save();
            ctx.globalAlpha = focusedId && !focused ? .1 : focused ? .92 : w < 700 ? .32 : .62;
            ctx.translate(cx, cy);
            ctx.rotate(rotation * .16);
            ctx.strokeStyle = `rgba(${color},.25)`;
            ctx.lineWidth = .7;
            ctx.setLineDash([2, 5]);
            ctx.beginPath(); ctx.ellipse(0, 0, radius * 1.7, radius * .72, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.rotate(-rotation * .35);
            ctx.beginPath(); ctx.ellipse(0, 0, radius * 1.15, radius * .48, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
            const taskSignals = renderedByCluster[index];
            for (let task = 0; task < taskSignals; task += 1) {
                const distance = Math.sqrt((task + .5) / taskSignals);
                const arm = task % 3;
                const angle = rotation * .55 + distance * 8.4 + arm * Math.PI * 2 / 3;
                const jitter = ((task * 37 + index * 19) % 17 - 8) / 45;
                const tx = Math.cos(angle + jitter) * radius * (w < 700 ? 2.15 : 3.05) * distance;
                const ty = Math.sin(angle + jitter) * radius * (w < 700 ? .92 : 1.28) * distance;
                const hot = task % 11 === 0;
                const pulse = state.lowGpu || reducedMotion ? 1 : .62 + .38 * Math.sin(state.elapsed / 280 + task * 1.7);
                ctx.fillStyle = `rgba(${color},${(hot ? .96 : w < 700 ? .32 : .44) * pulse})`;
                ctx.shadowColor = `rgb(${color})`;
                ctx.shadowBlur = hot ? 7 : 0;
                ctx.beginPath(); ctx.arc(tx, ty, hot ? (w < 700 ? 1.5 : 1.9) : (w < 700 ? .72 : .95), 0, Math.PI * 2); ctx.fill();
            }
            const satellites = focused ? Math.min(14, Math.max(10, Math.round(cluster.agents / 2.5))) : Math.min(7, Math.max(4, Math.round(cluster.agents / 5)));
            for (let satellite = 0; satellite < satellites; satellite += 1) {
                const angle = rotation + Math.PI * 2 * satellite / satellites;
                const orbit = radius * (satellite % 2 ? 1.05 : 1.55);
                const sx = Math.cos(angle) * orbit;
                const sy = Math.sin(angle) * orbit * .46;
                ctx.fillStyle = `rgba(${color},${satellite % 3 === 0 ? .85 : .5})`;
                ctx.shadowColor = `rgb(${color})`;
                ctx.shadowBlur = satellite % 3 === 0 ? 9 : 3;
                if (focused) {
                    ctx.strokeStyle = `rgba(${color},.13)`;
                    ctx.lineWidth = .5;
                    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(sx, sy); ctx.stroke();
                }
                ctx.beginPath(); ctx.arc(sx, sy, satellite % 3 === 0 ? (w < 700 ? 1.8 : 2.4) : (w < 700 ? 1 : 1.35), 0, Math.PI * 2); ctx.fill();
            }
            ctx.shadowBlur = 14;
            ctx.fillStyle = `rgba(${color},.75)`;
            ctx.beginPath(); ctx.arc(0, 0, Math.max(3, radius * .16), 0, Math.PI * 2); ctx.fill();
            ctx.restore();
            const raw = { ...cluster, kind: "ai_cluster", detail: `${cluster.tasks} modeled parallel tasks · ${cluster.agents} agents · ${cluster.terminals} terminals`, population_kind: population.population_kind, source: population.source };
            galaxyNodes.push({ id: cluster.id, x: cx, y: cy, type: "cluster", hitRadius: radius * (w < 700 ? 2.2 : 2.8), raw });
            if (w >= 700 || index % 2 === 0) {
                ctx.fillStyle = `rgba(${color},${w < 700 ? .38 : .68})`;
                ctx.font = `600 ${w < 700 ? 7 : 9}px 'IBM Plex Mono', monospace`;
                ctx.textAlign = "center";
                ctx.fillText(`${focused ? "FOCUS · " : ""}${cluster.label}`, cx, cy + radius + 13);
                if (w >= 700) {
                    ctx.fillStyle = "rgba(145,185,164,.42)";
                    ctx.font = "7px 'IBM Plex Mono', monospace";
                    ctx.fillText(`${cluster.tasks} TASKS · ${renderedByCluster[index]} SIGNALS · ${cluster.state.toUpperCase()} · ${cluster.truth.toUpperCase()}${focused ? ` · ${satellites} AGENT BUNDLES` : ""}`, cx, cy + radius + 23);
                }
            }
        });
        ctx.restore();
        return galaxyNodes;
    }

    function renderGalaxyExecutionDetail(w, h, galaxyNodes) {
        const cluster = state.selected.raw;
        const core = galaxyNodes.find((node) => node.id === cluster.id);
        if (!core) { state.nodes = galaxyNodes; return; }
        const reasoning = cluster.id === "ai-galaxy-reasoning";
        const realIds = ["contract-agent", "contract-task", "contract-service", "edge-sgp", "receipt-91", "settlement-2048"];
        const aggregateStages = [
            ["AGENT POOL", "agent", `${cluster.agents} modeled agents coordinating tasks`],
            ["TASK ESCROWS", "contract", `${cluster.tasks} modeled task escrows in aggregate`],
            ["SERVICE ROUTERS", "service", `${Math.max(3, Math.round(cluster.agents / 4))} modeled service policies`],
            ["EDGE TERMINALS", "terminal", `${cluster.terminals} modeled admitted terminals`],
            ["RECEIPT STREAM", "receipt", `${cluster.tasks} modeled receipt slots`],
            ["SETTLEMENT", "settlement", `${cluster.state} aggregate execution state`]
        ];
        const sourceEntities = reasoning
            ? realIds.map((id) => state.data.entities.find((entity) => entity.id === id)).filter(Boolean)
            : aggregateStages.map(([label, kind, detail], index) => ({ id: `${cluster.id}-stage-${index}`, label, kind: "ai_stage", stage_kind: kind, detail, state: cluster.state, truth: cluster.truth, population_kind: cluster.population_kind }));
        const rx = w < 700 ? 112 : 215;
        const ry = w < 700 ? 92 : 132;
        const stageNodes = sourceEntities.map((entity, index) => {
            const angle = -Math.PI / 2 + Math.PI * 2 * index / sourceEntities.length;
            return { id: entity.id, x: core.x + Math.cos(angle) * rx, y: core.y + Math.sin(angle) * ry, type: entity.kind === "terminal" ? "terminal" : "entity", raw: entity };
        });
        stageNodes.forEach((node, index) => {
            const next = stageNodes[(index + 1) % stageNodes.length];
            directedLine(node, next, reasoning ? "rgba(120,255,178,.42)" : "rgba(104,232,255,.34)", 1.2, reasoning ? [] : [4, 5]);
            particle(node, next, index / stageNodes.length, reasoning ? "#78ffb2" : "#68e8ff");
        });
        stageNodes.forEach((node) => {
            const kind = node.raw.stage_kind || node.raw.kind;
            const shape = kind === "terminal" ? "hex" : kind === "receipt" ? "diamond" : "square";
            const label = w < 700 ? node.raw.label.split(" ")[0] : node.raw.label;
            glowDot(node, kind === "terminal" ? 13 : 11, reasoning ? "#78ffb2" : "#68e8ff", label, reasoning ? kind.toUpperCase() : "MODELED AGGREGATE", shape);
        });
        ctx.save();
        ctx.fillStyle = reasoning ? "rgba(120,255,178,.72)" : "rgba(104,232,255,.68)";
        ctx.font = "8px 'IBM Plex Mono', monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${cluster.label} · ${reasoning ? "T-2048 FIXTURE EXECUTION" : "MODELED AGGREGATE EXECUTION"} · CLEAR TRACE TO RETURN`, core.x, core.y - ry - 28);
        ctx.restore();
        state.nodes = [...galaxyNodes, ...stageNodes];
    }

    function renderAI(w, h) {
        const galaxyNodes = renderAIGalaxies(w, h);
        const galaxyFocused = state.selected?.raw?.kind === "ai_cluster";
        if (!galaxyFocused) {
            $("sceneSubtitle").textContent = `${state.data.ai_execution_population.concurrent_tasks} modeled parallel tasks across 6 execution galaxies · select a galaxy · not live`;
            $("tourTitle").textContent = "EXECUTION GALAXIES";
            $("tourCopy").textContent = "Six modeled AI contract populations rotate in parallel. Select any task cloud to enter its execution field.";
            ctx.save();
            ctx.fillStyle = "rgba(104,232,255,.5)";
            ctx.font = "8px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText("SELECT A GALAXY TO ENTER ITS CONTRACT EXECUTION FIELD", w / 2, h - 54);
            ctx.restore();
            state.nodes = galaxyNodes;
            return;
        }
        $("sceneSubtitle").textContent = `${state.selected.raw.label} · ${state.selected.raw.tasks} modeled tasks · aggregate execution detail`;
        $("tourTitle").textContent = `INSIDE ${state.selected.raw.label}`;
        $("tourCopy").textContent = state.selected.raw.id === "ai-galaxy-reasoning" ? "Inspect the T-2048 fixture path inside this execution population." : "Inspect modeled aggregate Agent, Escrow, Service, Terminal, Receipt and Settlement stages.";
        renderGalaxyExecutionDetail(w, h, galaxyNodes);
        return;
        const ids = ["acct-user", "contract-agent", "contract-task", "contract-service", "edge-sgp", "receipt-91", "verifier-3", "settlement-2048"];
        const phaseCount = state.projection.ai_phase;
        const labels = state.data.entities.filter((e) => ids.includes(e.id)).slice(0, phaseCount);
        const pad = Math.max(70, w * .07);
        const y = h * .43;
        ctx.save();
        ctx.setLineDash([5, 9]);
        line({ x: pad * .55, y: h * .63 }, { x: w - pad * .55, y: h * .63 }, "rgba(104,232,255,.22)", 1, [5, 9]);
        ctx.fillStyle = "rgba(104,232,255,.42)";
        ctx.font = "8px 'IBM Plex Mono', monospace";
        ctx.textAlign = "right";
        ctx.fillText("CHAIN / OFF-CHAIN EVIDENCE BOUNDARY", w - pad * .55, h * .63 - 8);
        ctx.restore();
        const nodes = labels.map((entity, i) => ({
            id: entity.id,
            x: w < 700
                ? (Math.floor(i / 4) % 2 ? w - 42 - (w - 84) * (i % 4) / 3 : 42 + (w - 84) * (i % 4) / 3)
                : pad + (w - pad * 2) * i / Math.max(labels.length - 1, 1),
            y: w < 700 ? h * .29 + Math.floor(i / 4) * 104 : y + (i % 2 ? 28 : -28),
            type: "entity",
            raw: entity
        }));
        nodes.slice(0, -1).forEach((n, i) => {
            line(n, nodes[i + 1], i >= 4 ? "rgba(35,214,255,.5)" : "rgba(49,255,137,.34)", 1.5);
            particle(n, nodes[i + 1], i * .13, i >= 4 ? "#23d6ff" : "#31ff89");
        });
        const mobileNames = { "acct-user": "OPERATOR", "contract-agent": "AGENT", "contract-task": "ESCROW", "contract-service": "SERVICE", "edge-sgp": "EDGE 04", "receipt-91": "RECEIPT", "verifier-3": "VERIFY", "settlement-2048": "SETTLE" };
        nodes.forEach((n) => {
            const shape = n.raw.kind === "receipt" ? "diamond" : n.raw.kind === "terminal" ? "hex" : "square";
            const semanticNode = n.raw.kind === "terminal" ? { ...n, type: "terminal" } : n;
            glowDot(semanticNode, n.raw.kind === "terminal" ? 19 : 14, n.raw.kind === "receipt" ? "#23d6ff" : "#31ff89", w < 700 ? mobileNames[n.id] : n.raw.label, n.raw.kind.toUpperCase(), shape);
        });
        const forkIds = ["receipt-rejected", "dispute-17", "refund-17"];
        const expandMobileFork = forkIds.some((id) => [state.selected?.id, state.pendingFocusId].includes(id));
        const fullForkEntities = forkIds.map((id) => state.data.entities.find((entity) => entity.id === id)).filter(Boolean);
        const collapsedFork = { id: "failure-fork", label: "FAILURE FORK ×3", kind: "dispute", detail: "Rejected receipt → dispute → refund", truth: "observed" };
        const forkEntities = state.layers.failures && state.elapsed >= 26000 ? (w < 700 && !expandMobileFork ? [collapsedFork] : fullForkEntities) : [];
        const forkNodes = forkEntities.map((entity, index) => ({
            id: entity.id,
            x: w < 700 ? (forkEntities.length === 1 ? w - 80 : 52 + index * (w - 104) / Math.max(forkEntities.length - 1, 1)) : w * .82,
            y: w < 700 ? h * (forkEntities.length === 1 ? .57 : .62) : h * (.22 + index * .13),
            type: "entity",
            raw: entity
        }));
        forkNodes.slice(0, -1).forEach((node, index) => directedLine(node, forkNodes[index + 1], "rgba(255,99,120,.5)", 1.4, [4, 5]));
        forkNodes.forEach((node) => {
            const showLabel = w >= 700 || forkEntities.length === 1 || [state.selected?.id, state.pendingFocusId].includes(node.id);
            glowDot(node, 10, "#ff6378", showLabel ? node.raw.label : "", showLabel ? node.raw.kind.toUpperCase() : "", node.raw.kind === "receipt" ? "diamond" : "square");
        });
        const terminals = state.data.terminals.filter((t) => t.id !== "edge-sgp").map((t, i) => ({
            id: t.id, x: w < 700 ? 40 + (w - 80) * i / 3 : pad + (w - pad * 2) * (i + .7) / 4.7, y: w < 700 ? h * .79 : h * .74, type: "terminal", raw: state.projection.expired.includes(t.id) ? { ...t, evidence: "stale", state: "offline" } : { ...t, evidence: t.evidence === "stale" ? "declared" : t.evidence }
        }));
        terminals.forEach((n) => glowDot(n, 9, n.raw.evidence === "stale" ? "#ff6378" : n.raw.state === "available" ? "#31ff89" : "#768d81", n.raw.label, `${n.raw.latency} · ${n.raw.evidence}`, "hex"));
        ctx.fillStyle = "rgba(156,196,174,.55)";
        ctx.font = "10px 'IBM Plex Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText("REMOTE EDGE COMPUTE FIELD", pad, h * .67);
        state.nodes = [...galaxyNodes, ...nodes, ...forkNodes, ...terminals];
    }

    function render(now) {
        const rect = canvas.getBoundingClientRect();
        state.viewportSize = { width: rect.width, height: rect.height };
        state.labelBoxes = [];
        const delta = Math.min(now - state.lastFrame, 50);
        state.frameSamples.push(delta);
        if (state.frameSamples.length > 180) state.frameSamples.shift();
        if (state.stressProbe && state.stressProbe.level === state.stress) {
            state.stressProbe.samples.push(delta);
            if (state.stressProbe.samples.length === 90) reportStressProbe();
        }
        state.lastFrame = now;
        if (state.playing) {
            state.elapsed = (state.elapsed + delta * state.speed) % duration;
            $("timeline").value = Math.round(state.elapsed);
            updateTour();
        }
        ctx.clearRect(0, 0, rect.width, rect.height);
        const gradient = ctx.createRadialGradient(rect.width / 2, rect.height / 2, 0, rect.width / 2, rect.height / 2, rect.width * .65);
        gradient.addColorStop(0, "rgba(9,35,23,.38)");
        gradient.addColorStop(1, "rgba(0,4,3,.04)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);
        drawMatrixField(rect.width, rect.height);
        if (state.data) {
            ctx.save();
            applyCamera(rect.width, rect.height);
            if (state.mode === "consensus") renderConsensus(rect.width, rect.height);
            if (state.mode === "chain") renderChain(rect.width, rect.height);
            if (state.mode === "ai") renderAI(rect.width, rect.height);
            semanticEdges();
            drawSignalLens();
            if (state.selected?.raw?.kind !== "ai_cluster") drawEventShockwave(rect.width, rect.height);
            if (state.stress > 1) renderStress(rect.width, rect.height);
            ctx.restore();
            state.frame += 1;
            if (state.frame % 12 === 0) {
                $("hudMode").textContent = `PROJECTION · ${state.mode.toUpperCase()}`;
                $("hudFrame").textContent = `FRAME · ${String(state.frame).padStart(6, "0")}`;
                const visibleSignals = state.nodes.length + state.edges.length + (state.mode === "ai" ? state.aiSignalsRendered : 0);
                $("hudEntities").textContent = `VISIBLE · ${String(visibleSignals).padStart(3, "0")}`;
                $("hudCamera").textContent = `LENS · ${state.camera.zoom.toFixed(2)}× / ${Math.round(state.camera.x)},${Math.round(state.camera.y)}`;
                const activeEvent = [...state.data.graph_events].reverse().find((item) => item.at <= state.elapsed);
                $("hudSignal").textContent = `SIGNAL · ${activeEvent ? `${activeEvent.cursor} ${activeEvent.kind.toUpperCase()}` : "SNAPSHOT"}`;
            }
        }
        drawTransition(rect.width, rect.height, now);
        if (!document.hidden) requestAnimationFrame(render);
    }

    function renderStress(w, h) {
        ctx.save();
        ctx.beginPath();
        for (let i = 1; i < state.stress; i += 1) {
            const x = (i * 73) % w;
            const y = (i * 137) % h;
            const previousX = ((i - 1) * 73) % w;
            const previousY = ((i - 1) * 137) % h;
            ctx.moveTo(previousX, previousY);
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
            ctx.lineTo((i * 191) % w, (i * 47) % h);
        }
        ctx.strokeStyle = "rgba(35,214,255,.025)";
        ctx.lineWidth = .5;
        ctx.stroke();
        ctx.fillStyle = "rgba(49,255,137,.18)";
        for (let i = 0; i < state.stress; i += 1) {
            const x = (i * 73) % w;
            const y = (i * 137) % h;
            ctx.fillRect(x, y, 1, 1);
        }
        ctx.fillStyle = "rgba(185,255,213,.28)";
        ctx.font = "7px 'IBM Plex Mono', monospace";
        for (let i = 0; i < Math.min(50, state.stress); i += 1) ctx.fillText(`S${i}`, (i * 277) % w, (i * 89) % h);
        ctx.restore();
    }

    function setMode(mode, fromTour = false) {
        if (state.mode !== mode) state.modeTransition = performance.now();
        state.mode = mode;
        document.body.dataset.matrixMode = mode;
        document.querySelectorAll("[data-mode]").forEach((button) => {
            const active = button.dataset.mode === mode;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", String(active));
        });
        const copy = modeCopy[mode];
        const sigils = { consensus: ["CONSENSUS", "01 · WEIGHT FIELD"], chain: ["BLOCKSPACE", "02 · CAUSAL TIME"], ai: ["INTELLIGENCE", "03 · EVIDENCE PORTAL"] };
        $("modeSigil").querySelector("span").textContent = sigils[mode][0];
        $("modeSigil").querySelector("i").textContent = sigils[mode][1];
        $("sceneIndex").textContent = copy[0];
        $("sceneTitle").textContent = copy[1];
        $("sceneSubtitle").textContent = copy[2];
        if (mode === "consensus" && state.data) updateValidatorSummary();
        if (!fromTour) {
            state.playing = false;
            const url = new URL(location.href);
            url.searchParams.set("mode", mode);
            url.searchParams.set("t", String(Math.round(state.elapsed)));
            history.replaceState(null, "", url);
        }
        syncPlayButton();
    }

    function updateTour(changeMode = true) {
        if (!state.data) return;
        const event = [...state.data.tour].reverse().find((item) => state.elapsed >= item.at) || state.data.tour[0];
        if (changeMode) setMode(event.mode, true);
        $("tourTitle").textContent = event.title;
        $("tourCopy").textContent = event.copy;
        $("timelineTime").textContent = `00:${String(Math.floor(state.elapsed / 1000)).padStart(2, "0")}`;
        $("timeline").value = Math.round(state.elapsed);
        const events = state.data.graph_events.filter((item) => item.at <= state.elapsed);
        state.projection = projectAt(state.elapsed);
        if (state.validatorScope === "signers") updateValidatorSummary();
        const taskState = state.projection.ai_phase >= 8 ? ["T-2048 · SETTLED", "escrow release final"] : state.projection.ai_phase >= 6 ? ["T-2048 · RECEIPT", "evidence committed"] : state.projection.ai_phase >= 4 ? ["T-2048 · RUNNING", "remote execution"] : ["T-2048 · QUEUED", "fixture awaiting task event"];
        $("activeTaskValue").textContent = taskState[0];
        $("activeTaskMeta").textContent = taskState[1];
        $("streamCursor").textContent = `cursor · ${(events.at(-1) || state.data.graph_events[0]).cursor}`;
        $("eventRail").innerHTML = events.slice(-5).reverse().map((item) => `<span class="event-pill ${item.kind === "retract" ? "retract" : ""}"><b>${escapeHtml(item.kind.toUpperCase())}</b> ${escapeHtml(item.label)}</span>`).join("");
    }

    function syncPlayButton() {
        $("playToggle").textContent = state.playing ? "Ⅱ" : "▶";
        $("playToggle").setAttribute("aria-label", state.playing ? "Pause guided demo" : "Play guided demo");
        document.body.classList.toggle("paused-motion", !state.playing);
    }

    function truthLabel(value) {
        return ({ fixture_verified: "SIMULATED PROOF PASS", node_validated: "NODE VALIDATED FIXTURE", signed_offchain: "SIGNED OFF-CHAIN FIXTURE", attested: "ATTESTED FIXTURE", audited: "AUDITED FIXTURE", benchmarked: "BENCHMARKED FIXTURE", replicated: "REPLICATED FIXTURE", chain_reported: "CHAIN-REPORTED FIXTURE", observed: "OBSERVED FIXTURE", declared: "DECLARED FIXTURE", inferred: "INFERRED FIXTURE", stale: "EXPIRED / STALE FIXTURE" })[value] || "FIXTURE DATA";
    }

    function setTruthBadge(truth) {
        const badge = $("truthBadge");
        badge.dataset.truth = truth;
        badge.innerHTML = `<i aria-hidden="true"></i> ${escapeHtml(truthLabel(truth))}`;
    }

    function validateFixture(data) {
        const requiredArrays = ["validators", "blocks", "transactions", "entities", "graph_events", "edges", "tour"];
        const problems = [];
        if (data?.meta?.schema_version !== "birdeye.graph.v1") problems.push("schema_version");
        requiredArrays.forEach((key) => { if (!Array.isArray(data?.[key])) problems.push(key); });
        if (!data?.validator_sets?.current?.members?.length) problems.push("validator_sets.current");
        if (!data?.validator_population?.population_total || !Array.isArray(data?.validator_population?.clusters)) problems.push("validator_population");
        if (Array.isArray(data?.blocks) && new Set(data.blocks.map((item) => item.id)).size !== data.blocks.length) problems.push("duplicate block id");
        if (Array.isArray(data?.graph_events) && data.graph_events.some((item, index, list) => index && item.at < list[index - 1].at)) problems.push("event ordering");
        const duplicateIds = (items) => Array.isArray(items) && new Set(items.map((item) => item.id)).size !== items.length;
        ["validators", "transactions", "entities", "shards", "edges", "receipts"].forEach((key) => { if (duplicateIds(data?.[key])) problems.push(`duplicate ${key} id`); });
        const blockIds = new Set((data?.blocks || []).map((item) => item.id));
        const transactionIds = new Set((data?.transactions || []).map((item) => item.id));
        const entityIds = new Set((data?.entities || []).map((item) => item.id));
        const validatorIds = new Set([...(data?.validators || []).map((item) => item.id), ...Object.values(data?.validator_sets || {}).flatMap((set) => set.members || []).map((item) => item.id)]);
        const shardIds = new Set((data?.shards || []).map((item) => item.id));
        const terminalIds = new Set((data?.terminals || []).map((item) => item.id));
        const graphIds = new Set([...blockIds, ...transactionIds, ...entityIds, ...validatorIds, ...shardIds, ...terminalIds]);
        (data?.transactions || []).forEach((transaction) => {
            if (!blockIds.has(transaction.block)) problems.push(`transaction block ${transaction.id}`);
            if (!entityIds.has(transaction.from) || !entityIds.has(transaction.to)) problems.push(`transaction endpoint ${transaction.id}`);
        });
        (data?.shards || []).forEach((shard) => { if (!blockIds.has(shard.parent)) problems.push(`shard parent ${shard.id}`); });
        (data?.edges || []).forEach((edge) => { if (!graphIds.has(edge.from) || !graphIds.has(edge.to)) problems.push(`edge endpoint ${edge.id}`); });
        Object.entries(data?.validator_sets || {}).forEach(([name, set]) => {
            const weight = (set.members || []).reduce((sum, member) => sum + Number(member.weight || 0), 0);
            if (Math.abs(weight - 100) > .01) problems.push(`validator weight ${name}`);
        });
        const population = data?.validator_population;
        if (population && population.clusters.reduce((sum, cluster) => sum + cluster.count, 0) !== population.population_total) problems.push("validator population total");
        const aiPopulation = data?.ai_execution_population;
        if (aiPopulation && aiPopulation.clusters.reduce((sum, cluster) => sum + cluster.tasks, 0) !== aiPopulation.concurrent_tasks) problems.push("AI execution population total");
        if (Array.isArray(data?.graph_events) && new Set(data.graph_events.map((item) => item.cursor)).size !== data.graph_events.length) problems.push("duplicate event cursor");
        return problems;
    }

    function focusCamera(node) {
        if (!node) return;
        const rect = canvas.getBoundingClientRect();
        const inspectorAllowance = rect.width > 700 ? 155 : 0;
        state.camera.targetZoom = node.raw?.kind === "ai_cluster" ? (rect.width < 700 ? 1.22 : 1.5) : Math.max(1.08, Math.min(1.42, rect.width < 700 ? 1.14 : 1.26));
        state.camera.targetX = rect.width / 2 - node.x - inspectorAllowance;
        state.camera.targetY = rect.height / 2 - node.y;
        state.pointer = { x: node.x, y: node.y };
        $("srStatus").textContent = `Camera focused on ${node.raw.label || node.raw.seqno || node.id}.`;
    }

    function updateValidatorSummary() {
        const selectedSet = state.data.validator_sets[state.validatorSet];
        const signedWeight = selectedSet.members.filter((member) => member.status === "signed").reduce((sum, member) => sum + member.weight, 0);
        const signedCount = selectedSet.members.filter((member) => member.status === "signed").length;
        if (state.validatorScope === "network") {
            const population = state.data.validator_population;
            $("validatorCount").textContent = population.population_total.toLocaleString();
            $("validatorSetMeta").textContent = `${population.population_kind} population · ${state.lowGpu ? Math.min(64, population.population_rendered) : population.population_rendered} rendered`;
            if (state.mode === "consensus") $("sceneSubtitle").textContent = `${population.population_total.toLocaleString()}-validator fixture population · ${state.lowGpu ? Math.min(64, population.population_rendered) : population.population_rendered} rendered · not live`;
        } else if (state.validatorScope === "signers") {
            $("validatorCount").textContent = state.projection.signatures ? String(signedCount) : "0";
            $("validatorSetMeta").textContent = `proof-joined signers · ${state.validatorSet} set`;
            if (state.mode === "consensus") $("sceneSubtitle").textContent = `${state.projection.signatures ? signedCount : 0} proof-joined fixture signers · ${signedWeight.toFixed(1)}% selected-set weight`;
        } else {
            $("validatorCount").textContent = String(selectedSet.members.length);
            $("validatorSetMeta").textContent = `${state.validatorSet} active set · 100% weight mapped`;
            if (state.mode === "consensus") $("sceneSubtitle").textContent = `${selectedSet.members.length}-member ${state.validatorSet} active-set fixture · voting weight mapped`;
        }
        $("signedWeight").textContent = `${signedWeight.toFixed(1)}%`;
    }

    function inspect(node) {
        const raw = node.raw;
        state.selected = node;
        if (raw.kind === "ai_cluster" && Number.isFinite(node.x) && Number.isFinite(node.y)) focusCamera(node);
        updateTrace(node);
        $("inspector").classList.add("open");
        if (node.type === "edge") {
            $("entityMark").textContent = "→";
            $("entityKind").textContent = `${raw.kind.toUpperCase()} EDGE`;
            $("entityName").textContent = `${raw.from} → ${raw.to}`;
            $("entityId").textContent = raw.id;
            setTruthBadge(raw.truth);
            $("entityFacts").innerHTML = [["Relation", raw.kind], ["From", raw.from], ["To", raw.to], ["Value/event", raw.value]].map(([key, value]) => `<div><dt>${escapeHtml(key)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
            $("evidencePath").textContent = `${truthLabel(raw.truth)} edge → versioned graph projection`;
            $("relationsPanel").innerHTML = `<div class="relation-row"><b>UPSTREAM</b>${escapeHtml(raw.from)}</div><div class="relation-row"><b>DOWNSTREAM</b>${escapeHtml(raw.to)}</div>`;
            $("proofPanel").innerHTML = `<div class="proof-row"><b>EDGE PROVENANCE</b><span>${escapeHtml(truthLabel(raw.truth))}</span><br>${escapeHtml(raw.value)}<br>fixture schema · birdeye.graph.v1</div>`;
            $("rawPanel").textContent = JSON.stringify(raw, null, 2);
            selectInspectorTab("facts");
            return;
        }
        let kind = (raw.kind || node.type).toUpperCase();
        let name = raw.label || `#${raw.seqno}`;
        let id = raw.id;
        let truth = raw.truth || raw.provenance || raw.evidence || (node.type === "validator" || node.type === "block" ? "node_validated" : "chain_reported");
        let facts = [];
        if (node.type === "validator") facts = [["Vote weight", `${raw.weight}%`], ["Region", raw.region], ["Participation", raw.status], ["Set", raw.set], ["Set ID", raw.set_id], ["Validity", `#${raw.valid_from}–#${raw.valid_to}`]];
        else if (node.type === "block") {
            const samples = state.data.transactions.filter((transaction) => transaction.block === raw.id).length;
            facts = [["Transactions", `${raw.tx_count} total`], ["Fixture samples", samples], ["Sequence", raw.seqno], ["Finality", raw.status], ["Observed", raw.age], ["View hash", raw.view_hash || "fixture canonical view"]];
        }
        else if (node.type === "transaction") facts = [["Value", raw.value], ["Fee", raw.fee], ["State", raw.state], ["Compute", raw.exit_code === undefined ? "exit 0" : `exit ${raw.exit_code} · ${raw.gas_used} gas`], ["Block", raw.block.replace("block-", "#")]];
        else if (node.type === "shard") facts = [["Masterchain", raw.parent.replace("block-", "#")], ["Transactions", raw.tx_count], ["Split state", raw.split_state], ["Lane", raw.lane]];
        else if (node.type === "terminal") facts = [["Region", raw.region], ["Hardware claim", raw.hardware], ["Model", raw.model], ["Capabilities", raw.capabilities.join(", ")], ["Price", raw.price], ["Admission", raw.state], ["Latency", raw.latency], ["Manifest expires", raw.expires_at]];
        else if (raw.kind === "ai_cluster") facts = [["Modeled tasks", raw.tasks], ["Agent population", raw.agents], ["Terminal population", raw.terminals], ["Aggregate state", raw.state], ["Evidence class", truthLabel(raw.truth)], ["Population", raw.population_kind], ["Source", raw.source]];
        else facts = [["Type", raw.kind], ["Detail", raw.detail], ...(raw.kind === "receipt" ? [["Disclosure", state.receiptMode]] : []), ["Balance", raw.balance || "—"], ["State", raw.state || "active"], ["Truth", truthLabel(truth)], ["Graph", state.mode === "chain" ? "Chain account/contract neighborhood" : "AI task T-2048"]];
        const marks = { account: "AC", contract: "CT", agent: "AG", service: "SV", terminal: "ET", receipt: "RC", verifier: "VR", settlement: "ST", dispute: "DP", refund: "RF", validator_cluster: "CL", ai_cluster: "GX" };
        $("entityMark").textContent = marks[raw.kind] || kind.slice(0, 2);
        $("entityKind").textContent = kind;
        $("entityName").textContent = name;
        $("entityId").textContent = id;
        setTruthBadge(truth);
        $("entityFacts").innerHTML = facts.map(([key, value]) => {
            const field = String(key).toLowerCase().replace(/ claim$/, "");
            const provenance = state.data.field_provenance[`${raw.id}.${field}`];
            const source = provenance
                ? `<span class="field-source"><b>${truthLabel(provenance.class)}</b> · ${escapeHtml(provenance.source)} · ${escapeHtml(provenance.observed_at)}</span>`
                : `<span class="field-source"><b>CURATED FIXTURE</b> · birdeye-demo.json · ${escapeHtml(state.data.meta.generated_at)}</span>`;
            return `<div><dt>${escapeHtml(key)}${source}</dt><dd>${escapeHtml(value)}</dd></div>`;
        }).join("");
        $("evidencePath").textContent = `${truthLabel(truth)} → deterministic JSON projection → Birdeye scene`;
        const relations = [];
        state.data.transactions.filter((tx) => [tx.from, tx.to, tx.id, tx.block].includes(raw.id)).forEach((tx) => relations.push(`${tx.from} → ${tx.to}`, `${tx.label} · ${tx.state}`));
        state.data.shards.filter((shard) => shard.parent === raw.id || shard.id === raw.id).forEach((shard) => relations.push(`${shard.parent} → ${shard.id}`, `${shard.tx_count} transactions`));
        $("relationsPanel").innerHTML = (relations.length ? relations : ["Upstream · graph snapshot", "Downstream · no expanded neighbors"]).map((value, i) => `<div class="relation-row"><b>${i % 2 ? "RELATION" : "NEIGHBOR"}</b>${escapeHtml(value)}</div>`).join("");
        const proofs = state.data.proofs.filter((proof) => proof.entity === raw.id);
        const receipt = state.data.receipts.find((item) => item.id === raw.id);
        $("proofPanel").innerHTML = [...proofs.map((proof) => `<div class="proof-row"><b>${escapeHtml(proof.result)}</b><span>${escapeHtml(truthLabel(proof.class))}</span><br>${escapeHtml(proof.source)}<br>root · ${escapeHtml(proof.trust_root)}<br>${escapeHtml(proof.hash)}</div>`), receipt ? `<div class="proof-row"><b>RECEIPT ENVELOPE</b><span>${escapeHtml(receipt.signature)}</span><br>${escapeHtml(receipt.request_hash)}<br>${escapeHtml(receipt.output_hash)}<br>disclosure · ${escapeHtml(receipt.mode)}</div>` : ""].join("") || `<div class="proof-row"><b>NO CLIENT PROOF PACKAGE</b>${escapeHtml(truthLabel(truth))}. The browser has not independently verified this field.</div>`;
        $("rawPanel").textContent = JSON.stringify(raw, null, 2);
        selectInspectorTab("facts");
    }

    function allSearchables() {
        const validatorBase = new Map(state.data.validators.map((validator) => [validator.id, validator]));
        const validatorMap = new Map();
        ["current", "previous", "next"].forEach((set) => {
            const snapshot = state.data.validator_sets[set];
            snapshot.members.forEach((member) => {
                if (validatorMap.has(member.id)) return;
                const raw = { ...(validatorBase.get(member.id) || {}), ...member, set, set_id: snapshot.id, valid_from: snapshot.valid_from, valid_to: snapshot.valid_to };
                validatorMap.set(raw.id, { raw, type: "validator" });
            });
        });
        const validators = [...validatorMap.values()];
        return [
            ...validators,
            ...state.data.blocks.map((raw) => ({ raw, type: "block" })),
            ...state.data.transactions.map((raw) => ({ raw, type: "transaction" })),
            ...state.data.shards.map((raw) => ({ raw, type: "shard" })),
            ...state.data.validator_population.clusters.map((raw) => ({ raw: { ...raw, kind: "validator_cluster", detail: `${raw.count} modeled validators · fixture population` }, type: "cluster" })),
            ...(state.data.ai_execution_population?.clusters || []).map((raw) => ({ raw: { ...raw, kind: "ai_cluster", detail: `${raw.tasks} modeled parallel AI tasks · fixture aggregate`, population_kind: state.data.ai_execution_population.population_kind, source: state.data.ai_execution_population.source }, type: "cluster" })),
            ...state.data.entities.map((raw) => ({ raw, type: "entity" })),
            ...state.data.terminals.map((raw) => ({ raw, type: "terminal" }))
        ];
    }

    function search(value) {
        const query = value.trim().toLowerCase();
        if (!query || !state.data) return;
        const candidates = allSearchables().map((item) => ({ ...item, haystack: Object.values(item.raw).flat().join(" ").toLowerCase() }));
        const exact = candidates.find(({ raw }) => [raw.id, raw.label, String(raw.seqno || "")].some((value) => String(value || "").toLowerCase() === query));
        const matches = candidates.filter((item) => item.haystack.includes(query)).slice(0, 8);
        const result = exact || (matches.length === 1 ? matches[0] : null);
        if (!result) {
            renderSearchResults(matches, query);
            return;
        }
        $("searchResults").hidden = true;
        $("entitySearch").setAttribute("aria-expanded", "false");
        openSearchResult(result);
    }

    function renderSearchResults(matches, query) {
        const panel = $("searchResults");
        panel.replaceChildren();
        if (!matches.length) {
            const message = document.createElement("p");
            message.textContent = `No fixture entity matches “${query}”.`;
            panel.append(message);
            $("srStatus").textContent = message.textContent;
        } else {
            matches.forEach((result, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.setAttribute("role", "option");
                button.id = `searchResult${index}`;
                button.textContent = `${result.type.toUpperCase()} · ${result.raw.label || result.raw.id || result.raw.seqno}`;
                button.addEventListener("click", () => { panel.hidden = true; openSearchResult(result); });
                button.addEventListener("keydown", (event) => {
                    if (!["ArrowDown", "ArrowUp", "Escape"].includes(event.key)) return;
                    event.preventDefault();
                    if (event.key === "Escape") { panel.hidden = true; $("entitySearch").setAttribute("aria-expanded", "false"); $("entitySearch").focus(); return; }
                    const options = [...panel.querySelectorAll("button")];
                    const current = options.indexOf(button);
                    options[(current + (event.key === "ArrowUp" ? -1 : 1) + options.length) % options.length].focus();
                });
                panel.append(button);
            });
            $("srStatus").textContent = `${matches.length} fixture search results available.`;
        }
        panel.hidden = false;
        $("entitySearch").setAttribute("aria-expanded", "true");
    }

    function openSearchResult(result) {
        const aiEntityIds = new Set(["contract-agent", "contract-task", "contract-service", "edge-sgp", "receipt-91", "receipt-rejected", "verifier-3", "settlement-2048", "dispute-17", "refund-17"]);
        const chainEntity = result.type === "entity" && (result.raw.kind === "account" || !aiEntityIds.has(result.raw.id));
        const mode = result.raw.kind === "ai_cluster" ? "ai" : ["validator", "cluster"].includes(result.type) ? "consensus" : ["block", "transaction", "shard"].includes(result.type) || chainEntity ? "chain" : "ai";
        if (result.type === "validator" && result.raw.set && state.data.validator_sets[result.raw.set]) {
            state.validatorScope = "active";
            $("validatorScope").value = "active";
            state.validatorSet = result.raw.set;
            $("validatorSet").value = result.raw.set;
            updateValidatorSummary();
        }
        if (result.type === "cluster" && result.raw.kind !== "ai_cluster") {
            state.validatorScope = "network";
            $("validatorScope").value = "network";
            updateValidatorSummary();
        }
        if (mode === "ai" && state.elapsed < 28500) {
            state.elapsed = 28500;
            updateTour(false);
        }
        state.pendingFocusId = result.raw.id;
        setMode(mode);
        const url = new URL(location.href);
        url.searchParams.set("entity", result.raw.id);
        url.searchParams.set("t", String(Math.round(state.elapsed)));
        history.replaceState(null, "", url);
        requestAnimationFrame(() => {
            const visible = state.nodes.find((node) => node.id === result.raw.id);
            if (visible) focusCamera(visible);
            inspect(visible || { id: result.raw.id, raw: result.raw, type: result.type });
            state.pendingFocusId = null;
        });
    }

    function activateMode(mode) {
        const anchors = { consensus: 0, chain: 9000, ai: 15000 };
        state.elapsed = anchors[mode];
        state.playing = true;
        setMode(mode, true);
        updateTour(false);
        const url = new URL(location.href);
        url.searchParams.set("mode", mode);
        url.searchParams.set("t", String(state.elapsed));
        history.replaceState(null, "", url);
        syncPlayButton();
    }

    function bind() {
        addEventListener("resize", resize);
        document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => activateMode(button.dataset.mode)));
        document.querySelector(".mode-switch").addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const tabs = [...document.querySelectorAll("[data-mode]")];
            const current = tabs.indexOf(document.activeElement);
            const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowLeft" ? -1 : 1) + tabs.length) % tabs.length;
            tabs[next].focus();
            activateMode(tabs[next].dataset.mode);
        });
        $("playToggle").addEventListener("click", () => { state.playing = !state.playing; syncPlayButton(); });
        $("restartTour").addEventListener("click", () => { state.elapsed = 0; state.playing = true; updateTour(); syncPlayButton(); });
        $("speedToggle").addEventListener("click", () => {
            state.speed = state.speed === 1 ? 2 : state.speed === 2 ? .5 : 1;
            $("speedToggle").textContent = `${state.speed}×`;
        });
        $("timeline").addEventListener("input", (event) => {
            state.elapsed = Number(event.target.value);
            state.playing = false;
            updateTour();
            const url = new URL(location.href);
            url.searchParams.set("mode", state.mode);
            url.searchParams.set("t", String(Math.round(state.elapsed)));
            history.replaceState(null, "", url);
            syncPlayButton();
        });
        $("entitySearch").addEventListener("keydown", (event) => {
            if (event.key === "Enter") search(event.currentTarget.value);
            if (event.key === "ArrowDown" && !$("searchResults").hidden) { event.preventDefault(); $("searchResults").querySelector("button")?.focus(); }
            if (event.key === "Escape") { $("searchResults").hidden = true; event.currentTarget.setAttribute("aria-expanded", "false"); }
        });
        $("closeInspector").addEventListener("click", () => { $("inspector").classList.remove("open"); });
        $("clearTrace").addEventListener("click", clearTrace);
        $("demoNotice").addEventListener("click", () => {
            const popover = $("noticePopover");
            popover.hidden = !popover.hidden;
            $("demoNotice").setAttribute("aria-expanded", String(!popover.hidden));
        });
        document.querySelectorAll("[data-layer]").forEach((input) => input.addEventListener("change", () => { state.layers[input.dataset.layer] = input.checked; }));
        $("validatorSet").addEventListener("change", (event) => { state.validatorSet = event.target.value; state.playing = false; updateValidatorSummary(); syncPlayButton(); });
        $("validatorScope").addEventListener("change", (event) => {
            state.validatorScope = event.target.value;
            state.playing = false;
            clearTrace();
            const url = new URL(location.href);
            url.searchParams.set("scope", state.validatorScope);
            history.replaceState(null, "", url);
            updateValidatorSummary();
            syncPlayButton();
        });
        $("gpuToggle").addEventListener("click", () => {
            state.lowGpu = !state.lowGpu;
            $("gpuToggle").textContent = state.lowGpu ? "GPU · LOW" : "GPU · HIGH";
            $("gpuToggle").setAttribute("aria-pressed", String(state.lowGpu));
            document.body.classList.toggle("low-gpu", state.lowGpu);
            $("hudRenderer").textContent = state.lowGpu ? "RENDER · SEMANTIC 2D FALLBACK" : "RENDER · WEBGL2 + SEMANTIC 2D";
            if (state.data) updateValidatorSummary();
        });
        $("streamToggle").addEventListener("click", simulateTransport);
        $("reorgButton").addEventListener("click", simulateReorg);
        $("receiptMode").addEventListener("click", cycleReceiptMode);
        $("proofVerify").addEventListener("click", verifyFixtureProof);
        $("stressToggle").addEventListener("click", cycleStress);
        $("entityNavToggle").addEventListener("click", openEntityNavigator);
        $("explorerToggle").addEventListener("click", () => showExplorerIndex("blocks", 0));
        $("grammarToggle").addEventListener("click", showVisualGrammar);
        $("closeSystem").addEventListener("click", () => closeDialog("systemPanel"));
        $("closeEntityNav").addEventListener("click", () => closeDialog("entityNavigator"));
        document.querySelectorAll("[data-inspector-tab]").forEach((button) => button.addEventListener("click", () => selectInspectorTab(button.dataset.inspectorTab)));
        document.querySelector(".inspector-tabs").addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const tabs = [...document.querySelectorAll("[data-inspector-tab]")];
            const current = tabs.indexOf(document.activeElement);
            const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (current + (event.key === "ArrowLeft" ? -1 : 1) + tabs.length) % tabs.length;
            tabs[next].focus();
            selectInspectorTab(tabs[next].dataset.inspectorTab);
        });
        document.addEventListener("keydown", (event) => {
            const dialog = !$("systemPanel").hidden ? $("systemPanel") : !$("entityNavigator").hidden ? $("entityNavigator") : null;
            if (!dialog || event.key !== "Tab") return;
            const controls = [...dialog.querySelectorAll("button, [href], input, select, [tabindex]:not([tabindex='-1'])")].filter((element) => !element.disabled && !element.hidden);
            if (!controls.length) return;
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        });
        canvas.addEventListener("pointermove", (event) => {
            if (state.camera.dragging) {
                const moveX = event.clientX - state.camera.dragX;
                const moveY = event.clientY - state.camera.dragY;
                state.camera.targetX += moveX;
                state.camera.targetY += moveY;
                if (Math.abs(moveX) + Math.abs(moveY) > 2) state.camera.moved = true;
                state.camera.dragX = event.clientX;
                state.camera.dragY = event.clientY;
            }
            state.pointer = screenToWorld(event.clientX, event.clientY);
        });
        canvas.addEventListener("pointerleave", () => { state.pointer = { x: -1000, y: -1000 }; });
        canvas.addEventListener("pointerdown", (event) => {
            state.camera.dragging = true;
            state.camera.moved = false;
            state.camera.dragX = event.clientX;
            state.camera.dragY = event.clientY;
            canvas.setPointerCapture?.(event.pointerId);
            canvas.classList.add("dragging");
        });
        const stopDragging = (event) => {
            state.camera.dragging = false;
            canvas.releasePointerCapture?.(event.pointerId);
            canvas.classList.remove("dragging");
        };
        canvas.addEventListener("pointerup", stopDragging);
        canvas.addEventListener("pointercancel", stopDragging);
        canvas.addEventListener("dblclick", resetCamera);
        canvas.addEventListener("wheel", (event) => {
            event.preventDefault();
            state.camera.targetZoom = Math.max(.65, Math.min(1.8, state.camera.targetZoom * (event.deltaY > 0 ? .9 : 1.1)));
            $("srStatus").textContent = `Matrix camera zoom ${state.camera.targetZoom.toFixed(2)} times. Double-click to reset.`;
        }, { passive: false });
        canvas.addEventListener("click", () => {
            if (state.camera.moved) { state.camera.moved = false; return; }
            const hit = [...state.nodes].reverse().find((node) => Math.hypot(state.pointer.x - node.x, state.pointer.y - node.y) < (node.hitRadius || 34));
            const edge = state.edges.find((item) => pointToSegment(state.pointer, item.from, item.to) < 7);
            if (hit) inspect(hit);
            else if (edge) inspect(edge);
        });
        canvas.addEventListener("keydown", (event) => {
            if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Enter", "0"].includes(event.key)) return;
            event.preventDefault();
            if (event.key === "0") resetCamera();
            else if (event.key === "Enter" && state.keyboardIndex >= 0) inspect(state.nodes[state.keyboardIndex]);
            else {
                const direction = ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 1;
                state.keyboardIndex = (state.keyboardIndex + direction + state.nodes.length) % state.nodes.length;
                const node = state.nodes[state.keyboardIndex];
                state.pointer = { x: node.x, y: node.y };
                $("srStatus").textContent = `${node.type} ${node.raw.label || node.raw.seqno || node.id}. Press Enter to inspect.`;
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "/" && document.activeElement !== $("entitySearch")) { event.preventDefault(); $("entitySearch").focus(); }
            if (event.key === "?" && !["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); showVisualGrammar(); }
            if (event.key === "Escape") {
                if (!$("systemPanel").hidden) closeDialog("systemPanel");
                else if (!$("entityNavigator").hidden) closeDialog("entityNavigator");
                else { clearTrace(); $("noticePopover").hidden = true; $("searchResults").hidden = true; }
            }
        });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) { state.playing = false; syncPlayButton(); }
            else { state.lastFrame = performance.now(); requestAnimationFrame(render); }
        });
    }

    function closeDialog(id) {
        $(id).hidden = true;
        state.lastDialogTrigger?.focus();
        state.lastDialogTrigger = null;
    }

    function showSystem(title, html) {
        state.lastDialogTrigger = document.activeElement;
        $("systemTitle").textContent = title;
        $("systemContent").innerHTML = html;
        $("systemPanel").hidden = false;
        $("closeSystem").focus();
    }

    function showSceneAlert(kind, code, title, copy, duration = 1800) {
        clearTimeout(state.alertTimer);
        const alert = $("sceneAlert");
        alert.dataset.kind = kind;
        $("sceneAlertCode").textContent = code;
        $("sceneAlertTitle").textContent = title;
        $("sceneAlertCopy").textContent = copy;
        alert.hidden = false;
        if (duration) state.alertTimer = setTimeout(() => { alert.hidden = true; }, duration);
    }

    function showVisualGrammar() {
        showSystem("MATRIX VISUAL GRAMMAR", `<div class="grammar-grid">
            <section class="grammar-group"><h3>ENTITY SHAPES</h3>
                <div class="grammar-row"><i class="grammar-glyph circle">V</i><span><b>VALIDATOR</b>Size maps selected-set voting weight.</span></div>
                <div class="grammar-row"><i class="grammar-glyph diamond"><span>MC</span></i><span><b>BLOCK / RECEIPT</b>Context label distinguishes chain anchor from evidence bridge.</span></div>
                <div class="grammar-row"><i class="grammar-glyph">□</i><span><b>ACCOUNT / CONTRACT</b>Persistent on-chain endpoint or execution state.</span></div>
                <div class="grammar-row"><i class="grammar-glyph hex">E</i><span><b>EDGE TERMINAL</b>Remote off-chain compute identity.</span></div>
            </section>
            <section class="grammar-group"><h3>EVIDENCE PATHS</h3>
                <div class="grammar-row"><i class="grammar-edge"></i><span><b>NODE VALIDATED</b>Fixture result attributed to native-node validation.</span></div>
                <div class="grammar-row"><i class="grammar-edge signed"></i><span><b>SIGNED / ATTESTED</b>Off-chain identity or named evidence policy.</span></div>
                <div class="grammar-row"><i class="grammar-edge observed"></i><span><b>OBSERVED</b>Fixture measurement with observer and time.</span></div>
                <div class="grammar-row"><i class="grammar-edge failure"></i><span><b>REJECT / REFUND</b>Interrupted or compensating causal branch.</span></div>
            </section>
            <section class="grammar-group"><h3>VALIDATOR DEPTH</h3>
                <div class="grammar-row"><i class="grammar-glyph hex">N</i><span><b>NETWORK</b>Bounded fixture swarm communicates global scale; count is not liveness.</span></div>
                <div class="grammar-row"><i class="grammar-glyph circle">A</i><span><b>ACTIVE SET</b>Previous/current/next protocol members sized by voting weight.</span></div>
                <div class="grammar-row"><i class="grammar-glyph circle">S</i><span><b>SIGNERS</b>Proof-joined subset for the selected masterchain block.</span></div>
            </section>
            <section class="grammar-group"><h3>TRANSACTION OUTCOME</h3>
                <div class="grammar-row"><i class="grammar-glyph circle">↦</i><span><b>SUCCESS</b>Cyan circle; execution completed.</span></div>
                <div class="grammar-row"><i class="grammar-glyph diamond"><span>↶</span></i><span><b>BOUNCED</b>Amber diamond; value/message returned.</span></div>
                <div class="grammar-row"><i class="grammar-glyph hex">!</i><span><b>COMPUTE FAILURE</b>Purple hexagon; VM compute phase failed.</span></div>
                <div class="grammar-row"><i class="grammar-glyph">×</i><span><b>ABORTED</b>Red square; transaction/action aborted.</span></div>
            </section>
            <section class="grammar-group"><h3>MOTION</h3>
                <div class="grammar-row"><i class="grammar-glyph circle">·</i><span><b>PARTICLE</b>Directional transaction, message, signature or receipt event.</span></div>
                <div class="grammar-row"><i class="grammar-glyph circle">◎</i><span><b>WAVE</b>Current GraphDelta event window or selected entity.</span></div>
            </section>
            <section class="grammar-group"><h3>KEYBOARD / CAMERA</h3>
                <div class="grammar-row"><kbd>/</kbd><span><b>SEARCH</b>Focus global fixture search.</span></div>
                <div class="grammar-row"><kbd>←→</kbd><span><b>NAVIGATE</b>Cycle visible Canvas entities; Enter inspects.</span></div>
                <div class="grammar-row"><kbd>0</kbd><span><b>RESET</b>Reset camera; wheel zooms and drag pans.</span></div>
            </section>
            <p class="grammar-warning"><b>STATIC DEMO CONTRACT</b><br>Every value comes from the bundled deterministic fixture. RPC, WebSocket, WASM proof, Aggregator and Edge Terminal outcomes are simulated and are not production connectivity claims.</p>
        </div>`);
    }

    function explorerRows(view) {
        if (view === "blocks") return state.data.blocks.slice().reverse().map((block) => ({
            id: block.id, type: "block", cells: [`#${block.seqno}`, block.timestamp, block.status, `${block.tx_count}`, `${block.shards} / WC ${block.workchain}`]
        }));
        if (view === "transactions") return state.data.transactions.map((tx) => ({
            id: tx.id, type: "transaction", cells: [tx.label, tx.block.replace("block-", "#"), `${tx.from} → ${tx.to}`, tx.value, tx.state.replaceAll("_", " ")]
        }));
        if (view === "accounts") return state.data.entities.filter((entity) => ["account", "contract", "agent", "service"].includes(entity.kind)).map((entity) => {
            const related = state.data.transactions.filter((tx) => tx.from === entity.id || tx.to === entity.id);
            return { id: entity.id, type: "entity", cells: [entity.label, entity.kind, entity.detail, entity.balance || "—", `${related.length} sampled`] };
        });
        if (view === "tvm") return state.data.transactions.map((tx, index) => ({
            id: tx.id, type: "transaction", cells: [tx.label, tx.state === "compute_failed" ? "compute" : tx.state === "aborted" ? "action" : "compute → action", String(tx.exit_code ?? (tx.state === "success" ? 0 : index + 32)), String(tx.gas_used ?? 12400 + index * 731), tx.state]
        }));
        return [
            { id: "acct-user", type: "entity", cells: ["TOS", "native currency", "OPERATOR", "184.250000000", "chain-reported fixture"] },
            { id: "contract-task", type: "entity", cells: ["T-2048 ESCROW", "locked budget", "TASK ESCROW", "8.00 TOS", "node-validated fixture"] },
            { id: "receipt-91", type: "entity", cells: ["R91 RECEIPT", "evidence artifact", "SGP EDGE 04", "hash envelope", `${state.receiptMode} fixture`] }
        ];
    }

    function showExplorerIndex(view = "blocks", page = 0) {
        const views = ["blocks", "transactions", "accounts", "tvm", "assets"];
        if (!views.includes(view)) view = "blocks";
        const headings = {
            blocks: ["BLOCK", "TIME", "FINALITY", "TX TOTAL", "SHARDS / WORKCHAIN"],
            transactions: ["TRANSACTION", "BLOCK", "ROUTE", "VALUE", "OUTCOME"],
            accounts: ["ACCOUNT / CONTRACT", "KIND", "DETAIL", "BALANCE", "WINDOW HISTORY"],
            tvm: ["TRANSACTION", "TVM PHASE", "EXIT", "GAS", "RESULT"],
            assets: ["ASSET / OBJECT", "CLASS", "OWNER", "AMOUNT", "PROVENANCE"]
        };
        const rows = explorerRows(view);
        const perPage = 5;
        const pages = Math.max(1, Math.ceil(rows.length / perPage));
        page = Math.max(0, Math.min(pages - 1, Number(page) || 0));
        const visible = rows.slice(page * perPage, (page + 1) * perPage);
        showSystem("EXPLORER INDEX · BOUNDED FIXTURE WINDOW", `<div class="explorer-intro"><b>STATIC INDEX, NOT NETWORK HISTORY</b><span>10 blocks · 243 authoritative transaction total · 16 transaction samples. Pagination, traces and balances below only navigate the bundled deterministic fixture.</span></div>
            <div class="explorer-tabs" role="tablist" aria-label="Explorer dataset">${views.map((name) => `<button type="button" role="tab" data-explorer-view="${name}" aria-selected="${name === view}">${name.toUpperCase()}</button>`).join("")}</div>
            <div class="explorer-scroll"><table class="explorer-table"><thead><tr>${headings[view].map((heading) => `<th scope="col">${heading}</th>`).join("")}</tr></thead><tbody>${visible.map((row) => `<tr><td><button type="button" data-explorer-entity="${escapeHtml(row.id)}">${escapeHtml(row.cells[0])}</button></td>${row.cells.slice(1).map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
            <div class="explorer-pages"><span>PAGE ${page + 1} / ${pages} · ${rows.length} FIXTURE RECORDS</span><button type="button" data-explorer-page="${page - 1}" ${page === 0 ? "disabled" : ""}>← PREVIOUS</button><button type="button" data-explorer-page="${page + 1}" ${page === pages - 1 ? "disabled" : ""}>NEXT →</button></div>`);
        $("systemContent").querySelectorAll("[data-explorer-view]").forEach((button) => button.addEventListener("click", () => showExplorerIndex(button.dataset.explorerView, 0)));
        $("systemContent").querySelectorAll("[data-explorer-page]").forEach((button) => button.addEventListener("click", () => showExplorerIndex(view, Number(button.dataset.explorerPage))));
        $("systemContent").querySelectorAll("[data-explorer-entity]").forEach((button) => button.addEventListener("click", () => {
            closeDialog("systemPanel");
            search(button.dataset.explorerEntity);
        }));
        const url = new URL(location.href);
        url.searchParams.set("panel", "explorer");
        url.searchParams.set("view", view);
        url.searchParams.set("page", String(page + 1));
        history.replaceState(null, "", url);
    }

    function simulateTransport() {
        if (!state.connected) return;
        state.connected = false;
        document.body.classList.add("stream-lost");
        showSceneAlert("signal", "SIGNAL LOST · gd-0007", "GRAPH STREAM INTERRUPTED", "Holding the last deterministic projection.", 0);
        state.playing = false;
        syncPlayButton();
        $("transportState").textContent = "FIXTURE WS · DISCONNECTED";
        $("streamToggle").textContent = "RECOVERING…";
        state.recoveryCount += 1;
        const cursorExpired = state.recoveryCount % 2 === 0;
        showSystem("STREAM RECOVERY", `<div class="system-grid"><div class="system-card"><b>CONNECTION LOST</b>last cursor · ${cursorExpired ? "gd-expired" : "gd-0007"}<br>queue · bounded / 0 dropped</div><div class="system-card"><b>RECOVERY POLICY</b>${cursorExpired ? "retained cursor expired" : "request replay from retained cursor"}<br>fallback · compact snapshot</div></div>`);
        setTimeout(() => {
            document.body.classList.remove("stream-lost");
            document.body.classList.add("stream-recovering");
            showSceneAlert("recover", "CURSOR RECOVERY", cursorExpired ? "SNAPSHOT FALLBACK" : "REPLAYING GRAPH DELTAS", cursorExpired ? "Retained cursor expired; loading the compact fixture snapshot." : "Applying retained deltas without duplicate entities.", 0);
            $("transportState").textContent = cursorExpired ? "FIXTURE WS · SNAPSHOT FALLBACK" : "FIXTURE WS · REPLAYING gd-0007";
            $("streamToggle").textContent = "RESYNC…";
        }, 700);
        setTimeout(() => {
            state.connected = true;
            document.body.classList.remove("stream-lost", "stream-recovering");
            showSceneAlert("proof", "SIGNAL RESTORED", "GRAPH PROJECTION RESYNCHRONIZED", "Cursor continuity and entity identity checks passed.", 1800);
            $("transportState").textContent = "FIXTURE WS · CONNECTED";
            $("streamToggle").textContent = "DROP STREAM";
            $("systemContent").innerHTML += `<div class="system-card"><b><strong>RESYNC COMPLETE</strong></b>${cursorExpired ? `expired cursor rejected · restored ${state.data.transport.snapshot_cursor} · duplicate IDs discarded` : "cursor resumed without duplication · snapshot not required"}</div>`;
            $("srStatus").textContent = cursorExpired ? "Expired fixture cursor recovered from compact snapshot without duplicate IDs." : "Fixture graph stream reconnected and replayed without duplication.";
        }, 1500);
    }

    function simulateReorg() {
        state.correctionInjected = !state.correctionInjected;
        document.body.classList.remove("reorg-glitch");
        requestAnimationFrame(() => document.body.classList.add("reorg-glitch"));
        showSceneAlert("signal", "CANONICALITY FRACTURE", state.correctionInjected ? "UPSTREAM VIEWS DIVERGED" : "CANONICAL VIEW RESTORED", "The correction is explicit; no silent graph replacement.", 2100);
        setTimeout(() => document.body.classList.remove("reorg-glitch"), 760);
        const correction = state.data.corrections[1];
        showSystem("UPSTREAM DISAGREEMENT / CORRECTION", `<div class="system-grid">${state.data.transport.nodes.map((node) => `<div class="system-card"><b>${node.id.toUpperCase()}</b>tip · #${node.tip} · ${node.age}<br>view · ${node.view_hash}<br>state · ${node.status}</div>`).join("")}</div><div class="system-card"><b>${state.correctionInjected ? "EXPLICIT REPLACEMENT APPLIED" : "CORRECTION REWOUND"}</b>${correction.entity} · ${correction.reason}<br>${correction.old_hash} → <strong>${correction.new_hash}</strong><br>No silent full-page reload.</div>`);
        state.data.graph_events = state.data.graph_events.filter((event) => event.cursor !== "gd-0008");
        state.data.graph_events.push({ at: state.elapsed, cursor: "gd-0008", kind: state.correctionInjected ? "retract" : "snapshot", label: state.correctionInjected ? "block 4181740 fixture view replaced" : "canonical fixture restored" });
        updateTour(false);
    }

    function cycleReceiptMode() {
        const modes = ["hash-only", "selective", "public"];
        state.receiptMode = modes[(modes.indexOf(state.receiptMode) + 1) % modes.length];
        $("receiptMode").textContent = `RECEIPT · ${state.receiptMode.replace("-", " ").toUpperCase()}`;
        const receipt = state.data.receipts[0];
        receipt.mode = state.receiptMode;
        const receiptEntity = state.data.entities.find((item) => item.id === receipt.id);
        if (receiptEntity) receiptEntity.disclosure = state.receiptMode;
        const url = new URL(location.href);
        url.searchParams.set("disclosure", state.receiptMode);
        history.replaceState(null, "", url);
        const disclosure = {
            "hash-only": "Request/output payloads hidden; commitments remain verifiable.",
            selective: "Token usage and runtime disclosed; prompt/output remain private.",
            public: "Bounded demo prompt and output metadata disclosed. Hostile media viewer remains disabled."
        }[state.receiptMode];
        showSystem("RECEIPT DISCLOSURE", `<div class="system-card"><b>${state.receiptMode.toUpperCase()}</b>${disclosure}<br><br>request · ${receipt.request_hash}<br>output · ${receipt.output_hash}<br>usage · ${state.receiptMode === "hash-only" ? receipt.usage_hash : "12,480 input / 1,992 output tokens"}<br>identity · ${receipt.identity_binding}<br>signature · <strong>${receipt.signature}</strong></div>`);
        if (state.selected?.id === receipt.id) inspect(state.nodes.find((node) => node.id === receipt.id) || state.selected);
    }

    async function verifyFixtureProof() {
        $("proofVerify").textContent = "HASHING FIXTURE…";
        let expected;
        try {
            const response = await fetch("data/birdeye-demo.sha256", { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            expected = (await response.text()).trim().split(/\s+/)[0];
        } catch (error) {
            $("proofVerify").textContent = "VERIFY FIXTURE";
            showSystem("FIXTURE INTEGRITY WORKER", `<div class="system-card"><b>PINNED DIGEST UNAVAILABLE</b>The bundled SHA-256 manifest could not be loaded. No verification state was changed.</div>`);
            return;
        }
        const worker = new Worker("js/birdeye-proof-worker.js");
        worker.postMessage({ payload: state.fixtureText, expected });
        worker.onmessage = ({ data }) => {
            $("proofVerify").textContent = "VERIFY FIXTURE";
            showSystem("FIXTURE INTEGRITY WORKER", `<div class="system-grid"><div class="system-card"><b><strong>${data.ok ? "FIXTURE HASH PASS" : "PINNED DIGEST MISMATCH"}</strong></b>worker · isolated<br>algorithm · ${data.algorithm}<br>bytes · ${data.bytes.toLocaleString()}<br>digest · ${data.digest.slice(0, 24)}…<br>pinned · ${expected.slice(0, 24)}…</div><div class="system-card"><b>CONTRACT VALIDATION</b>Schema version, unique IDs, graph references, validator weights, event ordering/cursors and population totals passed at load.</div><div class="system-card"><b>NOT A CHAIN PROOF</b>This checks bundled-file integrity and internal fixture consistency only. No BOC, validator signature, canonical chain, trust root, JSON-RPC response, or production WASM verifier was checked.</div></div>`);
            document.body.classList.toggle("proof-pass", data.ok);
            showSceneAlert(data.ok ? "proof" : "signal", data.ok ? "LOCAL INTEGRITY PASS" : "INTEGRITY MISMATCH", data.ok ? "FIXTURE DIGEST LOCKED" : "PINNED DIGEST REJECTED", data.ok ? "SHA-256 matched the bundled manifest; this is not a chain proof." : "The bundled payload did not match its pinned manifest.", 2300);
            setTimeout(() => document.body.classList.remove("proof-pass"), 900);
            worker.terminate();
        };
        worker.onerror = () => { $("proofVerify").textContent = "VERIFY FIXTURE"; showSystem("FIXTURE INTEGRITY WORKER", `<div class="system-card"><b>WORKER FAILED</b>The fixture hash worker could not complete. No verification state was changed.</div>`); worker.terminate(); };
    }

    function cycleStress() {
        const levels = [1, 2000, 10000, 50000];
        state.stress = levels[(levels.indexOf(state.stress) + 1) % levels.length];
        $("stressToggle").textContent = state.stress === 1 ? "STRESS · NORMAL" : `STRESS · ${state.stress / 1000}K`;
        state.stressProbe = { level: state.stress, samples: [] };
        showSystem("RENDER PROBE", `<div class="system-card"><b>${state.stress === 1 ? "NORMAL GRAPH" : `${state.stress.toLocaleString()} NODES · ${(state.stress * 2).toLocaleString()} EDGES`}</b><strong>COLLECTING 90 NEW FRAMES…</strong><br>The measurement window starts after this load is enabled. Results are a local Canvas probe—not a certified device benchmark or full layout simulation.</div>`);
    }

    function reportStressProbe() {
        const probe = state.stressProbe;
        if (!probe) return;
        const sorted = [...probe.samples].sort((a, b) => a - b);
        const p95 = sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * .95) - 1)] || 0;
        const budget = state.lowGpu || innerWidth < 700 ? 33.3 : 16.7;
        const pass = p95 <= budget;
        const content = `<div class="system-card"><b>${probe.level === 1 ? "NORMAL GRAPH" : `${probe.level.toLocaleString()} NODES · ${(probe.level * 2).toLocaleString()} EDGES`}</b><strong>${pass ? "LOCAL BUDGET PASS" : "LOCAL BUDGET MISS"}</strong><br>fresh-frame p95 · ${p95.toFixed(1)} ms / ${budget.toFixed(1)} ms budget · ${sorted.length} frames<br>Deterministic primitives with at most 50 labels. This is not a production WebGL benchmark.</div>`;
        if (!$("systemPanel").hidden) $("systemContent").innerHTML = content;
        $("srStatus").textContent = `Stress probe complete. P95 ${p95.toFixed(1)} milliseconds. ${pass ? "Budget passed." : "Budget missed."}`;
        state.stressProbe = null;
    }

    function openEntityNavigator() {
        state.lastDialogTrigger = document.activeElement;
        const list = $("entityNavList");
        list.replaceChildren();
        state.nodes.forEach((node, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.navIndex = String(index);
            const kind = document.createElement("strong");
            kind.textContent = node.type.toUpperCase();
            const label = document.createElement("span");
            label.textContent = node.raw.label || (node.raw.seqno ? `#${node.raw.seqno}` : node.id);
            button.append(kind, document.createElement("br"), label);
            list.append(button);
        });
        $("entityNavigator").hidden = false;
        list.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { inspect(state.nodes[Number(button.dataset.navIndex)]); closeDialog("entityNavigator"); }));
        $("entityNavList").querySelector("button")?.focus();
    }

    function selectInspectorTab(name) {
        document.querySelectorAll("[data-inspector-tab]").forEach((button) => {
            const active = button.dataset.inspectorTab === name;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", String(active));
            button.tabIndex = active ? 0 : -1;
        });
        $("entityFacts").hidden = name !== "facts";
        $("evidencePath").parentElement.hidden = name !== "facts";
        $("relationsPanel").hidden = name !== "relations";
        $("proofPanel").hidden = name !== "proof";
        $("rawPanel").hidden = name !== "raw";
    }

    async function init() {
        resize();
        bind();
        syncPlayButton();
        try {
            const response = await fetch("data/birdeye-demo.json");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            state.fixtureText = await response.text();
            state.data = JSON.parse(state.fixtureText);
            const fixtureProblems = validateFixture(state.data);
            if (fixtureProblems.length) throw new Error(`Fixture contract invalid: ${fixtureProblems.join(", ")}`);
            $("bootSchema").textContent = "VALIDATE FIXTURE ..... CONTRACT OK";
            makeRain(state.data);
            updateValidatorSummary();
            const params = new URLSearchParams(location.search);
            if (params.has("t")) state.elapsed = Math.max(0, Math.min(duration, Number(params.get("t")) || 0));
            if (["network", "active", "signers"].includes(params.get("scope"))) {
                state.validatorScope = params.get("scope");
                $("validatorScope").value = state.validatorScope;
            }
            updateValidatorSummary();
            if (["hash-only", "selective", "public"].includes(params.get("disclosure"))) {
                state.receiptMode = params.get("disclosure");
                state.data.receipts[0].mode = state.receiptMode;
                $("receiptMode").textContent = `RECEIPT · ${state.receiptMode.replace("-", " ").toUpperCase()}`;
            }
            updateTour();
            if (["consensus", "chain", "ai"].includes(params.get("mode"))) setMode(params.get("mode"));
            if (params.get("entity")) search(params.get("entity"));
            if (params.get("panel") === "explorer") showExplorerIndex(params.get("view") || "blocks", Math.max(0, Number(params.get("page") || 1) - 1));
        } catch (error) {
            $("tourTitle").textContent = "DATA SIGNAL LOST";
            $("tourCopy").textContent = "Serve this page over HTTP so the static JSON dataset can be loaded.";
            console.error("Birdeye data load failed", error);
        }
        requestAnimationFrame(render);
    }

    init();
})();
