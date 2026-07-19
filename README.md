# TOS Network Homepage

Official homepage for TOS Network, now positioned around wallet infrastructure for AI robot economies.

## Product Direction

The homepage follows the main repository roadmap:

- AI robot wallets and agent-first accounts
- Actor-model messaging between wallets, services, verifiers, and owner controls
- AGIW work receipts for verifiable task settlement
- Policy-bound authority with spend limits, delegated permissions, controller rotation, and owner approvals
- Auditable service-to-service payments for machine-run workflows

The site is not centered on ordinary consumer phone wallets. Its first audience is builders, operators, and researchers working on autonomous agents, automation systems, service actors, and AI wallet infrastructure.

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

- Hero: TOS as the wallet layer for AI robot economies
- Features: AI robot wallets, Actor Model, AGIW settlement, policy authority, agent operations, service payments, audit trails, lightweight agent clients, autonomous identity, task markets, owner approvals, private agent messaging
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
