# TOS Network Homepage

Official homepage for TOS Network, now positioned around native actor-model coordination infrastructure for AI agent economies.

## Product Direction

The homepage follows the main repository roadmap:

- Native TVM actor execution for accounts, contracts, agents, tasks, and services
- Agent-first accounts with persistent identity, state, policy, delegation, and task history
- Asynchronous agent messaging with callbacks, retries, timeouts, settlement, and verification
- Native task contracts with escrow, result submission, dispute windows, payout, and slashing hooks
- Capability registries and service actors for discoverable AI services, tools, data, and compute

The site is not centered on ordinary consumer phone wallets. Its first audience is builders, operators, and researchers working on autonomous agents, automation systems, service actors, and verifiable agent coordination infrastructure.

## Site Structure

```
tos-homepage/
├── index.html
├── css/
├── js/
│   ├── i18n.js
│   ├── main.js
│   ├── navigation.js
│   └── faq.js
├── img/
├── pdf/
└── song/
```

## Content Model

The primary homepage sections are:

- Hero: TOS as the fast actor-model blockchain for AI agents
- Features: native TVM actor execution, agent accounts, async agent messaging, native task contracts, capability registry, service actors, audit trails, lightweight agent clients, autonomous identity, task markets, owner approvals, private agent messaging
- Metrics: actor types, core stack, operator path, callbacks, policy APIs, receipts, account state, agent network
- Docs: links to `ROADMAP.md`, `doc/ai-actors.md`, and `doc/tos-account-permission-model.md`
- FAQ: answers focused on why TOS is built for AI agents instead of ordinary wallet apps

## Local Development

Open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Technology

- Static HTML
- CSS modules
- Vanilla JavaScript
- Canvas animation
- Four active languages: English, Chinese, Japanese, Korean

## Links

- Website: https://tos.network
- Source: https://github.com/tosnetwork/tos
- Homepage repository: https://github.com/tosnetwork/tos-homepage

## License

Copyright © 2025-2026 TOS Network. All rights reserved.
