# Historical BlockDAG Animation Note (Non-Authoritative)

> Archived design record. This file does **not** describe the current homepage,
> protocol architecture, consensus implementation, deployment status, or evidence
> boundary. The referenced `js/dag-animation.js` no longer exists. The current
> homepage uses `js/mesh-animation.js` as a decorative illustration; it must not be
> interpreted as a live network, BlockDAG consensus, topology, or telemetry view.
>
> For current public-claim authority, see [CONTENT_AUTHORITY.md](CONTENT_AUTHORITY.md).
> For implementation evidence, inspect the exact repository and revision named by
> the relevant page.

The material below is retained only as historical visual-design context.

## Overview

The TOS Network homepage features a sophisticated, real-time BlockDAG (Directed Acyclic Graph) animation that visualizes the core blockchain architecture. Inspired by modern high-quality financial platforms, this animation provides an elegant, 3D visualization with smooth flowing curves and dynamic particle effects.

## 🎨 Animation Enhancement Features

### 1. **3D Depth Effect**

The animation implements a realistic depth perception system to create a layered, three-dimensional appearance:

- **Depth Values**: Each node is assigned a random depth value between 0.5 and 1.0
- **Scale Variation**: Node sizes scale based on depth (0.7x to 1.0x), creating near-large and far-small perspective
- **Opacity Modulation**: Both nodes and edges adjust transparency based on depth for atmospheric depth cues
- **Depth Sorting**: All elements are rendered in depth order (far to near) to maintain proper layering

```javascript
// Depth-based scaling
const depthScale = 0.7 + node.depth * 0.3; // 0.7 to 1.0
const radius = node.radius * depthScale;

// Depth-based opacity
const depthOpacity = node.opacity * (0.6 + node.depth * 0.4);
```

### 2. **Elegant Curved Connections**

Enhanced Bézier curve implementation for smooth, flowing edges:

- **Optimized Control Points**: Control points positioned at 30% and 70% along the path with vertical adjustments
- **Dual-Layer Rendering**:
  - Bottom layer: Wider, semi-transparent glow (4px width)
  - Top layer: Crisp main line with gradient (2px width)
- **Linear Gradients**: Smooth color transitions from edge start to end
- **Refined Arrows**: Filled arrow heads with subtle glow borders

```javascript
// Elegant curve control points
const controlX1 = fromX + (toX - fromX) * 0.3;
const controlY1 = edge.from.y + (edge.to.y - edge.from.y) * 0.1;
const controlX2 = fromX + (toX - fromX) * 0.7;
const controlY2 = edge.to.y + (edge.from.y - edge.to.y) * 0.1;
```

### 3. **Enhanced Node Visualization**

Multi-layer node rendering for realistic 3D sphere appearance:

#### **Outer Glow Layer**
- Radial gradient extending 2.5x node radius
- Soft, semi-transparent aura effect
- Color-matched to node type (blue/red)

#### **Main Node Body**
- Radial gradient from light center to darker edges
- Simulates spherical lighting with off-center highlight
- Creates strong 3D illusion

```javascript
const gradient = this.ctx.createRadialGradient(
  x - finalRadius * 0.3,  // Offset highlight
  node.y - finalRadius * 0.3,
  0,
  x,
  node.y,
  finalRadius
);
gradient.addColorStop(0, node.colorLight);  // Bright center
gradient.addColorStop(1, node.color);       // Dark edge
```

#### **Border Definition**
- Subtle 1px stroke for crisp edge definition
- Semi-transparent for natural blend

#### **Inner Highlight**
- White highlight at top-left (30% offset)
- 40% opacity for subtle glossy effect
- Enhances spherical appearance

#### **Pulse Animation**
- Subtle breathing effect using sine wave
- ±10% radius variation
- Each node has unique phase offset for organic feel

```javascript
const pulse = Math.sin(this.time * 0.002 + node.pulsePhase) * 0.1 + 1;
const finalRadius = radius * pulse;
```

### 4. **Particle Flow System** ✨

Dynamic particle system that visualizes data flow along DAG edges:

#### **Particle Properties**
- **Count**: 2 particles per edge (configurable)
- **Size**: Random 2-4px diameter
- **Speed**: Base 0.01 with ±20% variation per particle
- **Opacity**: Random 0.6-1.0 for natural variation

#### **Movement Algorithm**
Particles follow the exact Bézier curve path using cubic Bézier formula:

```javascript
// Cubic Bézier position calculation
const t = particle.progress;
const x = Math.pow(1 - t, 3) * fromX +
         3 * Math.pow(1 - t, 2) * t * controlX1 +
         3 * (1 - t) * Math.pow(t, 2) * controlX2 +
         Math.pow(t, 3) * toX;
```

#### **Visual Rendering**
- **Glow Layer**: 1.5x size, semi-transparent blue aura
- **Core**: White bright center for contrast
- Particles loop seamlessly when reaching edge end

### 5. **Performance Optimizations**

#### **Viewport Culling**
Elements outside the visible area (with 100px margin) are skipped:

```javascript
if (x < -100 || x > this.width + 100) return;
```

#### **Fade Zones**
Smooth opacity transitions at screen edges (200px zones) prevent harsh cut-offs

#### **Efficient Sorting**
Arrays are sorted by depth only once per frame:

```javascript
const sortedNodes = [...this.nodes].sort((a, b) => a.depth - b.depth);
```

#### **Memory Management**
Old nodes, edges, and particles are automatically cleaned up when scrolling off-screen

### 6. **Color Palette**

Enhanced color system with light/dark variants for depth:

```javascript
colors: {
  blue: '#4A90E2',        // Primary node color
  blueLight: '#60a5fa',   // Highlight color
  blueDark: '#3b82f6',    // Shadow color
  red: '#ef4444',         // Conflict node color
  redLight: '#f87171',    // Red highlight
  edge: '#60a5fa',        // Edge main color
  edgeGlow: '#93c5fd'     // Edge glow color
}
```

### 7. **Organic Variations**

Natural randomization prevents mechanical appearance:

- **Vertical Position**: ±10px random offset per node
- **Depth**: Random 0.5-1.0 per node
- **Pulse Phase**: Random 0-2π per node
- **Particle Speed**: ±20% variation per particle
- **Particle Size**: Random 2-4px

## Technical Implementation

### File Structure

> **Historical.** Neither file below is in the repository any more.
> `js/dag-animation.js` was gone before 2026-08-28; `css/components.css` was
> removed on 2026-08-28 along with nine other stylesheets that no page linked.
> This document is kept for the design reasoning, not as a map of the tree.

```
js/dag-animation.js         - Main animation logic (540+ lines)
css/components.css          - Canvas container styling
index.html                  - Canvas injection point
```

### Key Configuration Parameters

```javascript
config: {
  nodeRadius: 8,                  // Base node size
  nodeSpacing: 120,               // Vertical spacing between nodes
  layerSpacing: 150,              // Horizontal spacing between layers
  maxLayers: 10,                  // Initial layer count
  nodesPerLayer: 4,               // Max nodes per layer
  blueNodeProbability: 0.9,       // 90% blue nodes
  scrollSpeed: 0.5,               // Horizontal scroll speed
  edgeOpacity: 0.4,               // Base edge transparency
  nodeOpacity: 0.75,              // Base node transparency
  depthScale: 0.3,                // Depth effect intensity
  particlesPerEdge: 2,            // Particle count per edge
  particleSpeed: 0.01             // Base particle velocity
}
```

### Animation Loop

The main animation loop runs at 60 FPS using `requestAnimationFrame`:

1. **Clear canvas**
2. **Update time** (for animations)
3. **Update offset** (scroll effect)
4. **Generate/remove layers** (maintain visible set)
5. **Sort by depth** (proper rendering order)
6. **Draw edges** (background layer)
7. **Draw particles** (mid layer)
8. **Draw nodes** (foreground layer)

### Canvas Setup

High-DPI display support:

```javascript
const dpr = window.devicePixelRatio || 1;
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
```

## Visual Comparison

### Before Enhancement
- Flat, 2D appearance
- Simple straight/basic curves
- Uniform node rendering
- Static visualization
- Limited depth perception

### After Enhancement
- Rich 3D depth layers
- Smooth, elegant Bézier curves
- Multi-layer spherical nodes with highlights
- Dynamic particle flow
- Atmospheric glow effects
- Pulsing animations
- Perspective depth cues

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Canvas 2D API**: Required
- **Performance**: Optimized for 60 FPS on modern hardware
- **Responsive**: Adapts to all screen sizes
- **High DPI**: Retina/4K display support

## Future Enhancement Ideas

- [ ] Interactive hover effects on nodes
- [ ] Click to highlight node paths
- [ ] Color-coded node types (e.g., confirmed vs pending)
- [ ] Adjustable animation speed controls
- [ ] Performance metrics overlay (FPS counter)
- [ ] WebGL version for even smoother rendering
- [ ] Touch gesture support for mobile interaction

## Development

### Local Testing

Start a local HTTP server:
```bash
python3 -m http.server 8000
```

Visit: http://localhost:8000

### Performance Monitoring

Check frame rate in browser DevTools:
- Chrome: Performance tab → Record → Analyze FPS
- Firefox: Performance panel
- Safari: Timeline tab

### Debugging

Enable debug mode by adding to config:
```javascript
debug: true,
showDepthLabels: true,
showParticleCount: true
```

## Credits

Inspired by:
- Modern fintech platform design principles
- BlockDAG consensus protocol visualization
- Contemporary UI/UX design patterns

Developed with attention to:
- Smooth 60 FPS performance
- Mathematical precision in curves
- Artistic color theory
- Depth perception principles
- User experience best practices
