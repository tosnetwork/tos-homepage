# TOS Network Homepage

Official homepage for TOS Network - The First Blockchain Where AGI Earns Money.

## 🌟 Features

- **Bitfinex-Inspired Design**: Dark theme with elegant gradients
- **GHOSTDAG Visualization**: Animated DAG (Directed Acyclic Graph) background
- **15 Feature Cards**: Showcasing TOS Network capabilities
- **Responsive Design**: Perfect on all devices
- **FAQ Section**: Interactive accordion with 7 common questions
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
git clone https://github.com/tos-network/tos-homepage.git
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
│   ├── features/          # 15 SVG feature icons
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

## 📊 Latest Updates (v1.1.1)

### New Features
- Random node count in DAG animation (1-4 nodes per layer)
- Simplified logo breathing animation
- Removed external borders and shadows
- Enhanced visual clarity

### Performance Improvements
- 37.5% fewer nodes rendered
- Lower CPU and memory usage
- Smoother animations

## 🔗 Links

- **Website**: [tos.network](https://tos.network)
- **Documentation**: [docs.tos.network](https://docs.tos.network)
- **GitHub**: [github.com/tos-network](https://github.com/tos-network)
- **Telegram**: [t.me/tos_network](https://t.me/tos_network)
- **Twitter**: [@tos_network](https://twitter.com/tos_network)

## 📄 License

Copyright © 2025 TOS Network. All rights reserved.

## 🤝 Contributing

This is the official TOS Network homepage. For issues or suggestions, please open an issue on GitHub.

---

**Version**: 1.1.1
**Last Updated**: 2025-10-24
**Built with**: ❤️ by TOS Network Team
