# TOS Network Homepage

Official homepage for TOS Network - The First Blockchain Where AGI Earns Money.

## 🌟 Features

- **Modern Dark Design**: Dark theme with elegant gradients
- **BlockDAG Visualization**: Animated DAG (Directed Acyclic Graph) background
- **21 Feature Cards**: Showcasing TOS Network capabilities ⭐ (updated from 15)
  - 3 AGI Economic Features (DID, AGIW, Credits)
  - 12 Technical Features (ZK Privacy, Cryptography, Parallel Execution, Security, Encrypted Network, etc.)
  - 6 Ecosystem Features (TAKO VM, Energy System, Fair Launch, etc.)
- **Responsive Design**: Perfect on all devices
- **FAQ Section**: Interactive accordion with 7 common questions
- **Multilingual Support**: English, 中文, 日本語, 한국어
- **Pure Vanilla JS**: No framework dependencies

## 🎨 Design Highlights

### Dynamic DAG Animation
- Real-time blockchain visualization
- Random node generation (1-4 nodes per layer)
- 90% blue nodes, 10% red nodes
- Smooth canvas animation at 60 FPS

### Color Scheme
- Background: `#07020f` (Deep purple-black)
- Surface: `#0d1d29` (Dark blue-gray)
- Accent Red: `#e44b44`
- Accent Green: `#03ca9b`
- Primary Blue: `#4A90E2`

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://gitlab.com/tos-network/tos-homepage.git
cd tos-homepage

# Open in browser
open index.html

# Or use a local server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### File Structure

```
tos-homepage/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # CSS variables & design tokens
│   ├── base.css           # Base styles & typography
│   ├── components.css     # UI components
│   ├── animations.css     # Animation keyframes
│   ├── dag-animation.css  # DAG canvas styles
│   └── responsive.css     # Media queries
├── js/
│   ├── main.js            # Core initialization
│   ├── navigation.js      # Navbar functionality
│   ├── animations.js      # Scroll animations
│   ├── dag-animation.js   # DAG visualization
│   └── faq.js             # FAQ accordion
├── img/
│   ├── features/          # 24 SVG feature icons (7 new)
│   └── logo-*.png         # Logo files
└── pdf/
    └── tos.pdf            # Whitepaper
```

## 📝 Documentation

- [QUICKSTART.md](QUICKSTART.md) - Getting started guide
- [DAG_ANIMATION.md](DAG_ANIMATION.md) - DAG animation documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 🔧 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Grid, Flexbox, CSS Variables, Animations
- **JavaScript (ES6+)**: Classes, Modules, Canvas API
- **Canvas 2D**: DAG visualization
- **Intersection Observer**: Scroll animations

## ⚡ Performance

- 60 FPS animations
- <5% CPU usage
- ~2-3MB memory
- Total size: <100KB (uncompressed)

## 🌐 Browser Compatibility

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ Opera 74+

## ♿ Accessibility

- Semantic HTML5
- ARIA labels
- Keyboard navigation
- `prefers-reduced-motion` support

## 📊 Latest Updates

### [v1.2.1] - 2025-11-19 ⭐ LATEST

#### Added (v1.2.1)
- 🆕 Energy System feature card (Stake TOS for fee-free transactions, TRON-style economics)
- 🆕 energy-system.svg icon with lightning bolt design
- 🆕 4 language translations for Energy System feature

#### Added (v1.2.0)
- 🆕 Zero-Knowledge Privacy feature card (Bulletproofs, ElGamal, 9 ZK proof types)
- 🆕 Enterprise-Grade Cryptography card (55 syscalls, 5 elliptic curves)
- 🆕 Intelligent Parallel Execution card (auto conflict detection, Tokio engine)
- 🆕 Verified Security card (4 audits, 152+ tests, 100% coverage)
- 🆕 End-to-End Encrypted Network card (DH key exchange, ChaCha20Poly1305)
- 🆕 6 new SVG icons for technical features
- 🆕 Multilingual support showcased (en, zh, ja, ko)

#### Changed
- ♻️ Smart Contract card → TAKO VM card (enhanced description)
- ♻️ Feature count: 15 → 21 cards (+40%)
- ♻️ All 4 language translations updated
- ♻️ Technical coverage improved from ~40% to ~85%

#### Technical
- 📚 Based on deep codebase analysis of TOS/TAKO features
- 🎨 Maintains existing design style and color scheme

### [v1.1.1] - 2025-10-24

#### New Features
- Random node count in DAG animation (1-4 nodes per layer)
- Simplified logo breathing animation
- Removed external borders and shadows
- Enhanced visual clarity

#### Performance Improvements
- 37.5% fewer nodes rendered
- Lower CPU and memory usage
- Smoother animations

## 🔗 Links

- **Website**: [tos.network](https://tos.network)
- **Documentation**: [docs.tos.network](https://docs.tos.network)
- **GitLab**: [gitlab.com/tos-network](https://gitlab.com/tos-network)
- **Telegram**: [t.me/tos_network](https://t.me/tos_network)
- **Twitter**: [@tos_network](https://twitter.com/tos_network)

## 📄 License

Copyright © 2025 TOS Network. All rights reserved.

## 🤝 Contributing

This is the official TOS Network homepage. For issues or suggestions, please open an issue on GitHub.

---

**Version**: 1.2.1
**Last Updated**: 2025-11-19
**Built with**: ❤️ by TOS Network Team
