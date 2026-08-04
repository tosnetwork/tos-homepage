(() => {
    "use strict";

    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");
    const viewport = canvas.parentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 34000;
    const state = {
        data: null,
        mode: "consensus",
        nodes: [],
        playing: !reducedMotion,
        speed: 1,
        elapsed: 0,
        lastFrame: performance.now(),
        selected: null,
        lowGpu: false,
        validatorSet: "current",
        connected: true,
        receiptMode: "hash-only",
        stress: 1,
        keyboardIndex: -1,
        edges: [],
        correctionInjected: false,
        layers: { shards: true, particles: true, labels: true },
        pointer: { x: -1000, y: -1000 }
    };

    const $ = (id) => document.getElementById(id);
    const modeCopy = {
        consensus: ["01 / SKYVIEW", "Consensus Matrix", "Proof-derived participation · reconstructed from static evidence"],
        chain: ["02 / BLOCKSPACE", "Chain Flow", "Blocks, transactions, accounts · one navigable causal graph"],
        ai: ["03 / INTELLIGENCE", "AI Execution Trace", "Task funding, remote compute, evidence receipt · end to end"]
    };

    function makeRain() {
        const rain = $("rain");
        const glyphs = "01TOSアイネットワーク鳥瞰";
        const columns = Math.min(44, Math.ceil(innerWidth / 34));
        for (let i = 0; i < columns; i += 1) {
            const column = document.createElement("span");
            column.textContent = Array.from({ length: 20 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join("\n");
            column.style.left = `${(i / columns) * 100}%`;
            column.style.animationDelay = `${-Math.random() * 14}s`;
            column.style.animationDuration = `${10 + Math.random() * 12}s`;
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

    function pointToSegment(point, a, b) {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const length2 = dx * dx + dy * dy || 1;
        const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / length2));
        return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy));
    }

    function semanticEdges() {
        state.edges = [];
        state.data.edges.forEach((raw) => {
            const from = state.nodes.find((node) => node.id === raw.from);
            const to = state.nodes.find((node) => node.id === raw.to);
            if (!from || !to) return;
            const edge = { id: raw.id, type: "edge", raw, from, to };
            state.edges.push(edge);
            line(from, to, raw.truth === "signed_offchain" ? "rgba(35,214,255,.45)" : "rgba(202,255,54,.32)", 2);
        });
    }

    function glowDot(node, radius, color, label, sublabel, shape = "circle") {
        const hover = Math.hypot(state.pointer.x - node.x, state.pointer.y - node.y) < radius + 12;
        ctx.save();
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
        } else {
            ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (state.layers.labels) {
            ctx.fillStyle = "rgba(220,255,235,.92)";
            ctx.font = "600 10px 'IBM Plex Mono', monospace";
            ctx.textAlign = "center";
            ctx.fillText(label, node.x, node.y + radius + 16);
            if (sublabel) {
                ctx.fillStyle = "rgba(150,190,169,.7)";
                ctx.font = "9px 'IBM Plex Mono', monospace";
                ctx.fillText(sublabel, node.x, node.y + radius + 29);
            }
        }
        ctx.restore();
    }

    function particle(a, b, offset, color = "#31ff89") {
        if (!state.layers.particles || state.lowGpu) return;
        const t = (state.elapsed / 1500 + offset) % 1;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        ctx.save();
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function renderConsensus(w, h) {
        const cx = w * .5;
        const cy = h * .5;
        const rx = Math.min(w * .38, 410);
        const ry = Math.min(h * .34, 225);
        const core = { id: "block-4181741", x: cx, y: cy, type: "block", raw: state.data.blocks.at(-1) };
        const setFactor = state.validatorSet === "previous" ? .94 : state.validatorSet === "next" ? 1.06 : 1;
        const nodes = state.data.validators.map((v, index) => ({
            id: v.id, x: cx + v.x * rx, y: cy + v.y * ry, type: "validator", raw: { ...v, set: state.validatorSet, weight: +(v.weight * setFactor * (index % 3 === 0 ? 1.02 : .99)).toFixed(2) }
        }));
        nodes.forEach((n, i) => {
            const signed = n.raw.status === "signed";
            line(n, core, signed ? "rgba(49,255,137,.22)" : "rgba(130,150,140,.12)", signed ? 1 : .6, signed ? [] : [4, 6]);
            if (signed) particle(n, core, i / nodes.length);
        });
        ctx.save();
        ctx.strokeStyle = "rgba(49,255,137,.14)";
        ctx.setLineDash([2, 8]);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        nodes.forEach((n) => glowDot(n, 5 + n.raw.weight * .32, n.raw.status === "signed" ? "#31ff89" : "#667a70", n.raw.label, `${n.raw.weight}% · ${n.raw.region}`));
        glowDot(core, 34, "#caff36", "MC 4,181,741", `${state.validatorSet.toUpperCase()} SET · 12 / 14`, "diamond");
        state.nodes = [...nodes, core];
    }

    function renderChain(w, h) {
        const y = h * .42;
        const left = Math.max(55, w * .055);
        const usable = w - left * 2;
        const replayCount = Math.min(10, Math.max(3, 3 + Math.floor(state.elapsed / duration * 8)));
        const blockData = state.data.blocks.slice(0, replayCount);
        const blocks = blockData.map((b, i) => ({ id: b.id, x: left + usable * i / Math.max(blockData.length - 1, 1), y, type: "block", raw: b }));
        blocks.slice(0, -1).forEach((b, i) => {
            line(b, blocks[i + 1], "rgba(49,255,137,.35)", 2);
            particle(b, blocks[i + 1], i * .19);
        });
        blocks.forEach((b, i) => glowDot(b, b === blocks.at(-1) ? 20 : 10, b === blocks.at(-1) ? "#caff36" : "#31ff89", `#${String(b.raw.seqno).slice(-4)}`, `${b.raw.tx_count} TX`, "square"));
        const shards = state.layers.shards ? state.data.shards.map((shard) => {
            const parent = blocks.find((b) => b.id === shard.parent);
            if (!parent) return null;
            const transition = shard.split_state.includes("split") ? Math.sin(state.elapsed / 900) * 6 : shard.split_state.includes("merge") ? Math.cos(state.elapsed / 900) * 5 : 0;
            const node = { id: shard.id, x: parent.x + shard.lane * 24 + transition, y: y + (shard.lane || -0.45) * 88, type: "shard", raw: shard };
            line(parent, node, "rgba(255,204,107,.32)", 1, [3, 4]);
            return node;
        }).filter(Boolean) : [];
        shards.forEach((node) => glowDot(node, 8, "#ffcc6b", node.raw.label, node.raw.split_state, "diamond"));
        const visibleTransactions = state.data.transactions.filter((tx) => blocks.some((block) => block.id === tx.block));
        const txs = visibleTransactions.map((tx, i) => {
            const parent = blocks.find((b) => b.id === tx.block);
            const above = i % 2 === 0;
            const n = { id: tx.id, x: left + usable * (i + .5) / visibleTransactions.length, y: y + (above ? -152 : 152), type: "transaction", raw: tx };
            const color = tx.state === "success" ? "rgba(35,214,255,.25)" : "rgba(255,99,120,.55)";
            line(parent, n, color, tx.state === "success" ? 1 : 2, [3, 5]);
            return n;
        });
        txs.forEach((n) => glowDot(n, 7, n.raw.state === "success" ? "#23d6ff" : "#ff6378", n.raw.label, `${n.raw.value} · ${n.raw.state}`));
        const focusTx = txs.find((n) => n.id === "tx-a81f") || txs[0];
        const endpointData = focusTx ? state.data.entities.filter((e) => [focusTx.raw.from, focusTx.raw.to].includes(e.id)) : [];
        const endpoints = endpointData.map((entity, i) => ({ id: entity.id, x: focusTx.x + (i ? 105 : -105), y: focusTx.y, type: "entity", raw: entity }));
        endpoints.forEach((node) => { line(node, focusTx, "rgba(105,255,176,.28)", 1); glowDot(node, 11, "#78ffb2", node.raw.label, node.raw.kind, "circle"); });
        state.nodes = [...blocks, ...shards, ...txs, ...endpoints];
    }

    function renderAI(w, h) {
        const ids = ["acct-user", "contract-agent", "contract-task", "contract-service", "edge-sgp", "receipt-91", "verifier-3"];
        const phaseCount = state.elapsed < 15000 ? 2 : state.elapsed < 19000 ? 4 : state.elapsed < 24000 ? 6 : 7;
        const labels = state.data.entities.filter((e) => ids.includes(e.id)).slice(0, phaseCount);
        const pad = Math.max(70, w * .07);
        const y = h * .43;
        const nodes = labels.map((entity, i) => ({
            id: entity.id,
            x: w < 700 ? 42 + (w - 84) * (i % 4) / 3 : pad + (w - pad * 2) * i / Math.max(labels.length - 1, 1),
            y: w < 700 ? h * .29 + Math.floor(i / 4) * 104 : y + (i % 2 ? 28 : -28),
            type: "entity",
            raw: entity
        }));
        nodes.slice(0, -1).forEach((n, i) => {
            line(n, nodes[i + 1], i >= 4 ? "rgba(35,214,255,.5)" : "rgba(49,255,137,.34)", 1.5);
            particle(n, nodes[i + 1], i * .13, i >= 4 ? "#23d6ff" : "#31ff89");
        });
        nodes.forEach((n) => glowDot(n, n.raw.kind === "terminal" ? 19 : 14, n.raw.kind === "receipt" ? "#23d6ff" : "#31ff89", n.raw.label, n.raw.kind.toUpperCase(), n.raw.kind === "receipt" ? "diamond" : "square"));
        const disputeRaw = state.data.entities.find((e) => e.id === "dispute-17");
        const dispute = { id: disputeRaw.id, x: w * .69, y: h * .21, type: "entity", raw: disputeRaw };
        if (nodes[4]) {
            line(nodes[4], dispute, "rgba(255,99,120,.45)", 1.5, [5, 5]);
            line(dispute, nodes[2], "rgba(255,99,120,.32)", 1, [5, 5]);
            glowDot(dispute, 12, "#ff6378", "DISPUTE / REFUND", state.elapsed > 28500 ? "resolved · refund" : "alternate path", "diamond");
        }
        const terminals = state.data.terminals.filter((t) => t.id !== "edge-sgp").map((t, i) => ({
            id: t.id, x: w < 700 ? 40 + (w - 80) * i / 3 : pad + (w - pad * 2) * (i + .7) / 4.7, y: h * .74, type: "terminal", raw: t
        }));
        terminals.forEach((n) => glowDot(n, 9, n.raw.evidence === "stale" ? "#ff6378" : n.raw.state === "available" ? "#31ff89" : "#768d81", n.raw.label, `${n.raw.latency} · ${n.raw.evidence}`));
        ctx.fillStyle = "rgba(156,196,174,.55)";
        ctx.font = "10px 'IBM Plex Mono', monospace";
        ctx.textAlign = "left";
        ctx.fillText("REMOTE EDGE COMPUTE FIELD", pad, h * .67);
        state.nodes = [...nodes, ...(nodes[4] ? [dispute] : []), ...terminals];
    }

    function render(now) {
        const rect = canvas.getBoundingClientRect();
        const delta = Math.min(now - state.lastFrame, 50);
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
        if (state.data) {
            if (state.mode === "consensus") renderConsensus(rect.width, rect.height);
            if (state.mode === "chain") renderChain(rect.width, rect.height);
            if (state.mode === "ai") renderAI(rect.width, rect.height);
            semanticEdges();
            if (state.stress > 1) renderStress(rect.width, rect.height);
        }
        requestAnimationFrame(render);
    }

    function renderStress(w, h) {
        ctx.save();
        ctx.fillStyle = "rgba(49,255,137,.18)";
        for (let i = 0; i < state.stress; i += 1) {
            const x = (i * 73) % w;
            const y = (i * 137) % h;
            ctx.fillRect(x, y, 1, 1);
        }
        ctx.restore();
    }

    function setMode(mode, fromTour = false) {
        state.mode = mode;
        document.querySelectorAll("[data-mode]").forEach((button) => {
            const active = button.dataset.mode === mode;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", String(active));
        });
        const copy = modeCopy[mode];
        $("sceneIndex").textContent = copy[0];
        $("sceneTitle").textContent = copy[1];
        $("sceneSubtitle").textContent = copy[2];
        if (!fromTour) {
            state.playing = false;
            const url = new URL(location.href);
            url.searchParams.set("mode", mode);
            history.replaceState(null, "", url);
        }
        syncPlayButton();
    }

    function updateTour() {
        if (!state.data) return;
        const event = [...state.data.tour].reverse().find((item) => state.elapsed >= item.at) || state.data.tour[0];
        setMode(event.mode, true);
        $("tourTitle").textContent = event.title;
        $("tourCopy").textContent = event.copy;
        $("timelineTime").textContent = `00:${String(Math.floor(state.elapsed / 1000)).padStart(2, "0")}`;
        const events = state.data.graph_events.filter((item) => item.at <= state.elapsed);
        $("streamCursor").textContent = `cursor · ${(events.at(-1) || state.data.graph_events[0]).cursor}`;
        $("eventRail").innerHTML = events.slice(-5).reverse().map((item) => `<span class="event-pill ${item.kind === "retract" ? "retract" : ""}"><b>${item.kind.toUpperCase()}</b> ${item.label}</span>`).join("");
    }

    function syncPlayButton() {
        $("playToggle").textContent = state.playing ? "Ⅱ" : "▶";
        $("playToggle").setAttribute("aria-label", state.playing ? "Pause guided demo" : "Play guided demo");
    }

    function truthLabel(value) {
        return ({ chain_verified: "CHAIN VERIFIED", node_validated: "NODE VALIDATED", signed_offchain: "SIGNED OFF-CHAIN", attested: "ATTESTED", audited: "AUDITED", benchmarked: "BENCHMARKED", replicated: "REPLICATED", chain_reported: "CHAIN REPORTED", observed: "OBSERVED", declared: "DECLARED", inferred: "INFERRED", stale: "EXPIRED / STALE" })[value] || "OBSERVED";
    }

    function inspect(node) {
        const raw = node.raw;
        state.selected = node;
        $("inspector").classList.add("open");
        if (node.type === "edge") {
            $("entityMark").textContent = "→";
            $("entityKind").textContent = `${raw.kind.toUpperCase()} EDGE`;
            $("entityName").textContent = `${raw.from} → ${raw.to}`;
            $("entityId").textContent = raw.id;
            $("truthBadge").innerHTML = `<i></i> ${truthLabel(raw.truth)}`;
            $("entityFacts").innerHTML = [["Relation", raw.kind], ["From", raw.from], ["To", raw.to], ["Value/event", raw.value]].map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("");
            $("evidencePath").textContent = `${truthLabel(raw.truth)} edge → versioned graph projection`;
            $("relationsPanel").innerHTML = `<div class="relation-row"><b>UPSTREAM</b>${raw.from}</div><div class="relation-row"><b>DOWNSTREAM</b>${raw.to}</div>`;
            $("proofPanel").innerHTML = `<div class="proof-row"><b>EDGE PROVENANCE</b><span>${truthLabel(raw.truth)}</span><br>${raw.value}<br>fixture schema · birdeye.graph.v1</div>`;
            $("rawPanel").textContent = JSON.stringify(raw, null, 2);
            selectInspectorTab("facts");
            return;
        }
        let kind = node.type.toUpperCase();
        let name = raw.label || `#${raw.seqno}`;
        let id = raw.id;
        let truth = raw.truth || raw.provenance || raw.evidence || (node.type === "validator" || node.type === "block" ? "node_validated" : "chain_reported");
        let facts = [];
        if (node.type === "validator") facts = [["Vote weight", `${raw.weight}%`], ["Region", raw.region], ["Participation", raw.status], ["Epoch", "current"]];
        else if (node.type === "block") facts = [["Transactions", raw.tx_count], ["Sequence", raw.seqno], ["Finality", raw.status], ["Observed", raw.age]];
        else if (node.type === "transaction") facts = [["Value", raw.value], ["Fee", raw.fee], ["State", raw.state], ["Compute", raw.exit_code === undefined ? "exit 0" : `exit ${raw.exit_code} · ${raw.gas_used} gas`], ["Block", raw.block.replace("block-", "#")]];
        else if (node.type === "shard") facts = [["Masterchain", raw.parent.replace("block-", "#")], ["Transactions", raw.tx_count], ["Split state", raw.split_state], ["Lane", raw.lane]];
        else if (node.type === "terminal") facts = [["Region", raw.region], ["Hardware claim", raw.hardware], ["Model", raw.model], ["Capabilities", raw.capabilities.join(", ")], ["Price", raw.price], ["Admission", raw.state], ["Latency", raw.latency], ["Manifest expires", raw.expires_at]];
        else facts = [["Type", raw.kind], ["Detail", raw.detail], ["Balance", raw.balance || "—"], ["State", raw.state || "active"], ["Truth", truthLabel(truth)], ["Graph", "AI task T-2048"]];
        $("entityMark").textContent = kind.slice(0, 2);
        $("entityKind").textContent = kind.replace("ENTITY", raw.kind?.toUpperCase() || "ENTITY");
        $("entityName").textContent = name;
        $("entityId").textContent = id;
        $("truthBadge").innerHTML = `<i></i> ${truthLabel(truth)}`;
        $("entityFacts").innerHTML = facts.map(([key, value]) => {
            const field = String(key).toLowerCase().replace(/ claim$/, "");
            const provenance = state.data.field_provenance[`${raw.id}.${field}`];
            const source = provenance ? `<span class="field-source"><b>${truthLabel(provenance.class)}</b> · ${provenance.source} · ${provenance.observed_at}</span>` : "";
            return `<div><dt>${key}${source}</dt><dd>${value}</dd></div>`;
        }).join("");
        $("evidencePath").textContent = `${truthLabel(truth)} → deterministic JSON projection → Birdeye scene`;
        const relations = [];
        state.data.transactions.filter((tx) => [tx.from, tx.to, tx.id, tx.block].includes(raw.id)).forEach((tx) => relations.push(`${tx.from} → ${tx.to}`, `${tx.label} · ${tx.state}`));
        state.data.shards.filter((shard) => shard.parent === raw.id || shard.id === raw.id).forEach((shard) => relations.push(`${shard.parent} → ${shard.id}`, `${shard.tx_count} transactions`));
        $("relationsPanel").innerHTML = (relations.length ? relations : ["Upstream · graph snapshot", "Downstream · no expanded neighbors"]).map((value, i) => `<div class="relation-row"><b>${i % 2 ? "RELATION" : "NEIGHBOR"}</b>${value}</div>`).join("");
        const proofs = state.data.proofs.filter((proof) => proof.entity === raw.id);
        const receipt = state.data.receipts.find((item) => item.id === raw.id);
        $("proofPanel").innerHTML = [...proofs.map((proof) => `<div class="proof-row"><b>${proof.result}</b><span>${truthLabel(proof.class)}</span><br>${proof.source}<br>root · ${proof.trust_root}<br>${proof.hash}</div>`), receipt ? `<div class="proof-row"><b>RECEIPT ENVELOPE</b><span>${receipt.signature}</span><br>${receipt.request_hash}<br>${receipt.output_hash}<br>disclosure · ${receipt.mode}</div>` : ""].join("") || `<div class="proof-row"><b>NO CLIENT PROOF PACKAGE</b>${truthLabel(truth)}. The browser has not independently verified this field.</div>`;
        $("rawPanel").textContent = JSON.stringify(raw, null, 2);
        selectInspectorTab("facts");
    }

    function allSearchables() {
        return [
            ...state.data.validators.map((raw) => ({ raw, type: "validator" })),
            ...state.data.blocks.map((raw) => ({ raw, type: "block" })),
            ...state.data.transactions.map((raw) => ({ raw, type: "transaction" })),
            ...state.data.shards.map((raw) => ({ raw, type: "shard" })),
            ...state.data.entities.map((raw) => ({ raw, type: "entity" })),
            ...state.data.terminals.map((raw) => ({ raw, type: "terminal" }))
        ];
    }

    function search(value) {
        const query = value.trim().toLowerCase();
        if (!query || !state.data) return;
        const result = allSearchables().find(({ raw }) => Object.values(raw).join(" ").toLowerCase().includes(query));
        if (!result) return;
        const mode = result.type === "validator" ? "consensus" : ["block", "transaction", "shard"].includes(result.type) ? "chain" : "ai";
        setMode(mode);
        requestAnimationFrame(() => {
            const visible = state.nodes.find((node) => node.id === result.raw.id);
            inspect(visible || { id: result.raw.id, raw: result.raw, type: result.type });
        });
    }

    function bind() {
        addEventListener("resize", resize);
        document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
        $("playToggle").addEventListener("click", () => { state.playing = !state.playing; syncPlayButton(); });
        $("restartTour").addEventListener("click", () => { state.elapsed = 0; state.playing = true; updateTour(); syncPlayButton(); });
        $("speedToggle").addEventListener("click", () => {
            state.speed = state.speed === 1 ? 2 : state.speed === 2 ? .5 : 1;
            $("speedToggle").textContent = `${state.speed}×`;
        });
        $("timeline").addEventListener("input", (event) => { state.elapsed = Number(event.target.value); updateTour(); });
        $("entitySearch").addEventListener("keydown", (event) => { if (event.key === "Enter") search(event.currentTarget.value); });
        $("closeInspector").addEventListener("click", () => { $("inspector").classList.remove("open"); state.selected = null; });
        $("demoNotice").addEventListener("click", () => {
            const popover = $("noticePopover");
            popover.hidden = !popover.hidden;
            $("demoNotice").setAttribute("aria-expanded", String(!popover.hidden));
        });
        document.querySelectorAll("[data-layer]").forEach((input) => input.addEventListener("change", () => { state.layers[input.dataset.layer] = input.checked; }));
        $("validatorSet").addEventListener("change", (event) => { state.validatorSet = event.target.value; state.playing = false; syncPlayButton(); });
        $("gpuToggle").addEventListener("click", () => {
            state.lowGpu = !state.lowGpu;
            $("gpuToggle").textContent = state.lowGpu ? "GPU · LOW" : "GPU · HIGH";
            document.body.classList.toggle("low-gpu", state.lowGpu);
        });
        $("streamToggle").addEventListener("click", simulateTransport);
        $("reorgButton").addEventListener("click", simulateReorg);
        $("receiptMode").addEventListener("click", cycleReceiptMode);
        $("proofVerify").addEventListener("click", verifyFixtureProof);
        $("stressToggle").addEventListener("click", cycleStress);
        $("entityNavToggle").addEventListener("click", openEntityNavigator);
        $("closeSystem").addEventListener("click", () => { $("systemPanel").hidden = true; });
        $("closeEntityNav").addEventListener("click", () => { $("entityNavigator").hidden = true; });
        document.querySelectorAll("[data-inspector-tab]").forEach((button) => button.addEventListener("click", () => selectInspectorTab(button.dataset.inspectorTab)));
        canvas.addEventListener("pointermove", (event) => {
            const rect = canvas.getBoundingClientRect();
            state.pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        });
        canvas.addEventListener("pointerleave", () => { state.pointer = { x: -1000, y: -1000 }; });
        canvas.addEventListener("click", () => {
            const hit = [...state.nodes].reverse().find((node) => Math.hypot(state.pointer.x - node.x, state.pointer.y - node.y) < 34);
            const edge = state.edges.find((item) => pointToSegment(state.pointer, item.from, item.to) < 7);
            if (hit) inspect(hit);
            else if (edge) inspect(edge);
        });
        canvas.addEventListener("keydown", (event) => {
            if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Enter"].includes(event.key)) return;
            event.preventDefault();
            if (event.key === "Enter" && state.keyboardIndex >= 0) inspect(state.nodes[state.keyboardIndex]);
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
            if (event.key === "Escape") { $("inspector").classList.remove("open"); $("noticePopover").hidden = true; state.selected = null; }
        });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) { state.playing = false; syncPlayButton(); }
        });
    }

    function showSystem(title, html) {
        $("systemTitle").textContent = title;
        $("systemContent").innerHTML = html;
        $("systemPanel").hidden = false;
    }

    function simulateTransport() {
        if (!state.connected) return;
        state.connected = false;
        state.playing = false;
        syncPlayButton();
        $("transportState").textContent = "FIXTURE WS · DISCONNECTED";
        $("streamToggle").textContent = "RECOVERING…";
        showSystem("STREAM RECOVERY", `<div class="system-grid"><div class="system-card"><b>CONNECTION LOST</b>last cursor · gd-0007<br>queue · bounded / 0 dropped</div><div class="system-card"><b>RECOVERY POLICY</b>request replay from retained cursor<br>fallback · compact snapshot</div></div>`);
        setTimeout(() => {
            $("transportState").textContent = "FIXTURE WS · REPLAYING gd-0007";
            $("streamToggle").textContent = "RESYNC…";
        }, 700);
        setTimeout(() => {
            state.connected = true;
            $("transportState").textContent = "FIXTURE WS · CONNECTED";
            $("streamToggle").textContent = "DROP STREAM";
            $("systemContent").innerHTML += `<div class="system-card"><b><strong>RESYNC COMPLETE</strong></b>cursor resumed without duplication · snapshot not required</div>`;
            $("srStatus").textContent = "Fixture graph stream reconnected and replayed without duplication.";
        }, 1500);
    }

    function simulateReorg() {
        state.correctionInjected = !state.correctionInjected;
        const correction = state.data.corrections[1];
        showSystem("UPSTREAM DISAGREEMENT / CORRECTION", `<div class="system-grid">${state.data.transport.nodes.map((node) => `<div class="system-card"><b>${node.id.toUpperCase()}</b>tip · #${node.tip} · ${node.age}<br>view · ${node.view_hash}<br>state · ${node.status}</div>`).join("")}</div><div class="system-card"><b>${state.correctionInjected ? "EXPLICIT REPLACEMENT APPLIED" : "CORRECTION REWOUND"}</b>${correction.entity} · ${correction.reason}<br>${correction.old_hash} → <strong>${correction.new_hash}</strong><br>No silent full-page reload.</div>`);
        const event = { at: state.elapsed, cursor: "gd-0008", kind: state.correctionInjected ? "retract" : "snapshot", label: state.correctionInjected ? "fork view explicitly replaced" : "canonical fixture restored" };
        state.data.graph_events.push(event);
        updateTour();
    }

    function cycleReceiptMode() {
        const modes = ["hash-only", "selective", "public"];
        state.receiptMode = modes[(modes.indexOf(state.receiptMode) + 1) % modes.length];
        $("receiptMode").textContent = `RECEIPT · ${state.receiptMode.replace("-", " ").toUpperCase()}`;
        const receipt = state.data.receipts[0];
        const disclosure = {
            "hash-only": "Request/output payloads hidden; commitments remain verifiable.",
            selective: "Token usage and runtime disclosed; prompt/output remain private.",
            public: "Bounded demo prompt and output metadata disclosed. Hostile media viewer remains disabled."
        }[state.receiptMode];
        showSystem("RECEIPT DISCLOSURE", `<div class="system-card"><b>${state.receiptMode.toUpperCase()}</b>${disclosure}<br><br>request · ${receipt.request_hash}<br>output · ${receipt.output_hash}<br>usage · ${state.receiptMode === "hash-only" ? receipt.usage_hash : "12,480 input / 1,992 output tokens"}<br>identity · ${receipt.identity_binding}<br>signature · <strong>${receipt.signature}</strong></div>`);
    }

    function verifyFixtureProof() {
        $("proofVerify").textContent = "VERIFYING…";
        const worker = new Worker("js/birdeye-proof-worker.js");
        worker.postMessage({ payload: "TOS Birdeye fixture proof package v1", expected: "fixture" });
        worker.onmessage = ({ data }) => {
            $("proofVerify").textContent = "VERIFY PROOF";
            showSystem("WEB WORKER PROOF GATE", `<div class="system-grid"><div class="system-card"><b><strong>${data.ok ? "INTEGRITY PASS" : "FAIL"}</strong></b>worker · isolated<br>algorithm · ${data.algorithm}<br>digest · ${data.digest.slice(0, 24)}…</div><div class="system-card"><b>TRUTH BOUNDARY</b>This verifies fixture package integrity only. It does not claim a live TOS trust root or production WASM verifier.</div></div>`);
            worker.terminate();
        };
    }

    function cycleStress() {
        const levels = [1, 2000, 10000, 50000];
        state.stress = levels[(levels.indexOf(state.stress) + 1) % levels.length];
        $("stressToggle").textContent = state.stress === 1 ? "STRESS · NORMAL" : `STRESS · ${state.stress / 1000}K`;
        showSystem("RENDER BUDGET", `<div class="system-card"><b>${state.stress === 1 ? "NORMAL GRAPH" : `${state.stress.toLocaleString()} SYNTHETIC ENTITIES`}</b>Deterministic point-field load enabled for visual feedback. Particle count remains independently capped. This is a local rendering probe, not a certified p95 benchmark.</div>`);
    }

    function openEntityNavigator() {
        $("entityNavList").innerHTML = state.nodes.map((node, index) => `<button type="button" data-nav-index="${index}">${node.type.toUpperCase()}<br>${node.raw.label || `#${node.raw.seqno}` || node.id}</button>`).join("");
        $("entityNavigator").hidden = false;
        $("entityNavList").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => { inspect(state.nodes[Number(button.dataset.navIndex)]); $("entityNavigator").hidden = true; }));
        $("entityNavList").querySelector("button")?.focus();
    }

    function selectInspectorTab(name) {
        document.querySelectorAll("[data-inspector-tab]").forEach((button) => button.classList.toggle("active", button.dataset.inspectorTab === name));
        $("entityFacts").hidden = name !== "facts";
        $("evidencePath").parentElement.hidden = name !== "facts";
        $("relationsPanel").hidden = name !== "relations";
        $("proofPanel").hidden = name !== "proof";
        $("rawPanel").hidden = name !== "raw";
    }

    async function init() {
        makeRain();
        resize();
        bind();
        syncPlayButton();
        try {
            const response = await fetch("data/birdeye-demo.json");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            state.data = await response.json();
            const signed = state.data.validators.filter((v) => v.status === "signed").reduce((sum, v) => sum + v.weight, 0);
            $("signedWeight").textContent = `${signed.toFixed(1)}%`;
            const params = new URLSearchParams(location.search);
            if (params.has("t")) state.elapsed = Math.max(0, Math.min(duration, Number(params.get("t")) || 0));
            updateTour();
            if (["consensus", "chain", "ai"].includes(params.get("mode"))) setMode(params.get("mode"));
            if (params.get("entity")) search(params.get("entity"));
        } catch (error) {
            $("tourTitle").textContent = "DATA SIGNAL LOST";
            $("tourCopy").textContent = "Serve this page over HTTP so the static JSON dataset can be loaded.";
            console.error("Birdeye data load failed", error);
        }
        requestAnimationFrame(render);
    }

    init();
})();
