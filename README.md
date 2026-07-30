# TOS Network Homepage

Official homepage for TOS Network.

The site presents TOS as the open coordination and settlement network for AI
services, autonomous agents, and physical edge intelligence. Its primary
audience is institutional investors, strategic partners, builders, terminal
operators, and researchers.

## Positioning

The homepage follows the current TOS Network whitepaper and implementation
plan:

- intelligence is exposed as a bounded service outcome, not bare GPU capacity
- providers retain control of hardware, models, data, pricing, and local policy
- autonomous agents receive persistent identity, delegated authority, budgets,
  receipts, and settlement
- physical AI terminals remain local-first, continue approved work while
  disconnected, and keep safety and hard real-time control outside blockchain
- TOS Core is identified as implemented infrastructure
- the TOS Service Protocol, discovery products, and AI Edge Computing
  Terminals are clearly identified as planned product layers

The homepage does not project adoption, protocol revenue, investment return,
or token appreciation.

## Information Architecture

1. Investment thesis and structural market transition
2. TOS service transaction model
3. AI services and Physical Edge Intelligence vision
4. Physical AI terminal wedge
5. Network-effect and application-layer leverage thesis
6. Implemented foundation versus planned product layer
7. Focused delivery roadmap
8. Due-diligence links and investor FAQ

## Local Development

The site is static HTML, CSS, and JavaScript:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

Primary files:

```text
index.html
css/investor-home.css
js/investor-home.js
img/tos-network-vision.webp
pdf/tos.pdf
```

## Source Material

- TOS Network source: <https://github.com/tosnetwork/tos>
- Whitepaper source: `tos/doc/tos.tex`
- Implementation plan:
  `tos/doc/the-tos-protocol-implementation-plan.md`
- Physical AI terminal:
  `tos/doc/physical-ai-edge-terminal-use-case.md`

## License

Copyright © 2025–2026 TOS Network. All rights reserved.
