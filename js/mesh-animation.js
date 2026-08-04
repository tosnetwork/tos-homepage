/**
 * TOS Network - Agent Mesh Animation
 * Dynamic node-and-edge network visualization
 */

(function() {
  'use strict';

  class MeshAnimation {
    constructor() {
      this.hostSection = document.querySelector('.mesh');
      this.canvas = null;
      this.ctx = null;
      this.nodes = [];
      this.edges = [];
      this.animationId = null;

      // Configuration
      this.config = {
        nodeRadius: 8,
        nodeSpacing: 120,
        layerSpacing: 150,
        maxLayers: 10,
        nodesPerLayer: 4,
        blueNodeProbability: 0.9,
        scrollSpeed: 0.5,
        edgeOpacity: 0.4,
        nodeOpacity: 0.75,
        colors: {
          blue: '#78cfe7',
          blueLight: '#b2e7f3',
          blueDark: '#4fb8d6',
          red: '#72d2b2',
          redLight: '#9de3cd',
          edge: '#78cfe7',
          edgeGlow: '#b2e7f3'
        },
        // 3D depth effect
        depthScale: 0.3,
        // Particle flow
        particlesPerEdge: 2,
        particleSpeed: 0.01
      };

      this.offset = 0;
      this.particles = [];
      this.time = 0;
      this.init();
    }

    init() {
      if (!this.hostSection) return;

      // Create canvas container
      this.container = document.createElement('div');
      this.container.className = 'mesh-animation-container';

      // Create canvas
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'mesh-animation-canvas';
      this.container.appendChild(this.canvas);

      // Insert at the beginning of the host section
      this.hostSection.insertBefore(this.container, this.hostSection.firstChild);

      // Get context
      this.ctx = this.canvas.getContext('2d');

      // Setup canvas
      this.setupCanvas();

      // Generate initial DAG
      this.generateDAG();

      // Start animation
      this.animate();

      // Handle resize
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupCanvas() {
      const rect = this.container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';

      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    generateDAG() {
      this.nodes = [];
      this.edges = [];
      this.layers = []; // Track nodes by layer

      const centerY = this.height / 2;
      const startX = -this.config.layerSpacing;

      // Generate layers
      for (let layer = 0; layer < this.config.maxLayers; layer++) {
        const x = startX + layer * this.config.layerSpacing;
        const layerNodes = [];

        // Random number of nodes per layer (1-4)
        const nodeCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 nodes

        // Generate nodes in this layer
        for (let i = 0; i < nodeCount; i++) {
          const y = centerY + (i - nodeCount / 2 + 0.5) * this.config.nodeSpacing;

          // Add slight random vertical offset for more organic feel
          const yOffset = (Math.random() - 0.5) * 20;

          const isBlue = Math.random() < this.config.blueNodeProbability;

          const node = {
            x: x,
            y: y + yOffset,
            layer: layer,
            index: i,
            color: isBlue ? this.config.colors.blue : this.config.colors.red,
            colorLight: isBlue ? this.config.colors.blueLight : this.config.colors.redLight,
            radius: this.config.nodeRadius,
            opacity: this.config.nodeOpacity,
            // 3D depth (z-index simulation)
            depth: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
            pulsePhase: Math.random() * Math.PI * 2 // For pulsing animation
          };

          layerNodes.push(node);
          this.nodes.push(node);
        }

        this.layers.push(layerNodes);

        // Connect to previous layer (create DAG edges)
        if (layer > 0) {
          const prevLayerNodes = this.layers[layer - 1];

          layerNodes.forEach(node => {
            // Each node connects to 1-2 nodes in previous layer
            const connectionCount = Math.min(
              Math.floor(Math.random() * 2) + 1,
              prevLayerNodes.length
            );
            const shuffled = [...prevLayerNodes].sort(() => Math.random() - 0.5);

            for (let c = 0; c < connectionCount; c++) {
              const edge = {
                from: shuffled[c],
                to: node,
                opacity: this.config.edgeOpacity,
                // Average depth for edge rendering order
                depth: (shuffled[c].depth + node.depth) / 2
              };
              this.edges.push(edge);

              // Create particles flowing along this edge
              for (let p = 0; p < this.config.particlesPerEdge; p++) {
                this.particles.push({
                  edge: edge,
                  progress: Math.random(), // 0 to 1 along the edge
                  speed: this.config.particleSpeed * (0.8 + Math.random() * 0.4),
                  size: 2 + Math.random() * 2,
                  opacity: 0.6 + Math.random() * 0.4
                });
              }
            }
          });
        }
      }
    }

    drawNode(node) {
      const x = node.x + this.offset;

      // Skip if outside viewport (with margin)
      if (x < -100 || x > this.width + 100) return;

      // Calculate depth-based scale and opacity
      const depthScale = 0.7 + node.depth * 0.3; // 0.7 to 1.0
      const radius = node.radius * depthScale;

      // Subtle pulse animation
      const pulse = Math.sin(this.time * 0.002 + node.pulsePhase) * 0.1 + 1;
      const finalRadius = radius * pulse;

      // Depth-based opacity
      const depthOpacity = node.opacity * (0.6 + node.depth * 0.4);

      // Draw outer glow (larger, more transparent)
      this.ctx.beginPath();
      this.ctx.arc(x, node.y, finalRadius * 2.5, 0, Math.PI * 2);
      const glowGradient = this.ctx.createRadialGradient(x, node.y, 0, x, node.y, finalRadius * 2.5);
      glowGradient.addColorStop(0, node.color + '40');
      glowGradient.addColorStop(0.5, node.color + '10');
      glowGradient.addColorStop(1, node.color + '00');
      this.ctx.fillStyle = glowGradient;
      this.ctx.globalAlpha = depthOpacity * 0.8;
      this.ctx.fill();

      // Draw main node with radial gradient for 3D effect
      this.ctx.beginPath();
      this.ctx.arc(x, node.y, finalRadius, 0, Math.PI * 2);

      const gradient = this.ctx.createRadialGradient(
        x - finalRadius * 0.3,
        node.y - finalRadius * 0.3,
        0,
        x,
        node.y,
        finalRadius
      );
      gradient.addColorStop(0, node.colorLight);
      gradient.addColorStop(1, node.color);

      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = depthOpacity;
      this.ctx.fill();

      // Add subtle border for definition
      this.ctx.strokeStyle = node.colorLight;
      this.ctx.lineWidth = 1;
      this.ctx.globalAlpha = depthOpacity * 0.5;
      this.ctx.stroke();

      // Inner highlight for extra depth
      this.ctx.beginPath();
      this.ctx.arc(x - finalRadius * 0.3, node.y - finalRadius * 0.3, finalRadius * 0.4, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.globalAlpha = depthOpacity * 0.4;
      this.ctx.fill();

      this.ctx.globalAlpha = 1;
    }

    drawEdge(edge) {
      const fromX = edge.from.x + this.offset;
      const toX = edge.to.x + this.offset;

      // Skip if outside viewport (with margin)
      if ((fromX < -100 && toX < -100) || (fromX > this.width + 100 && toX > this.width + 100)) {
        return;
      }

      // Calculate opacity based on position (fade in/out at edges) and depth
      let edgeOpacity = edge.opacity * (0.5 + edge.depth * 0.5);
      const fadeZone = 200;

      if (fromX < fadeZone) {
        edgeOpacity *= Math.max(0, fromX / fadeZone);
      }
      if (toX > this.width - fadeZone) {
        edgeOpacity *= Math.max(0, (this.width - toX) / fadeZone);
      }

      // More elegant curve with varying control points
      const controlX1 = fromX + (toX - fromX) * 0.3;
      const controlY1 = edge.from.y + (edge.to.y - edge.from.y) * 0.1;
      const controlX2 = fromX + (toX - fromX) * 0.7;
      const controlY2 = edge.to.y + (edge.from.y - edge.to.y) * 0.1;

      // Draw glow layer first (wider, more transparent)
      this.ctx.beginPath();
      this.ctx.moveTo(fromX, edge.from.y);
      this.ctx.bezierCurveTo(
        controlX1, controlY1,
        controlX2, controlY2,
        toX, edge.to.y
      );
      this.ctx.strokeStyle = this.config.colors.edgeGlow;
      this.ctx.globalAlpha = edgeOpacity * 0.4;
      this.ctx.lineWidth = 4;
      this.ctx.stroke();

      // Draw main edge
      this.ctx.beginPath();
      this.ctx.moveTo(fromX, edge.from.y);
      this.ctx.bezierCurveTo(
        controlX1, controlY1,
        controlX2, controlY2,
        toX, edge.to.y
      );

      // Create gradient along the edge
      const gradient = this.ctx.createLinearGradient(fromX, edge.from.y, toX, edge.to.y);
      gradient.addColorStop(0, this.config.colors.edge + 'cc');
      gradient.addColorStop(0.5, this.config.colors.edge);
      gradient.addColorStop(1, this.config.colors.edge + 'cc');

      this.ctx.strokeStyle = gradient;
      this.ctx.globalAlpha = edgeOpacity;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;

      // Draw arrow with depth
      this.drawArrow(fromX, edge.from.y, toX, edge.to.y, edgeOpacity, edge.depth);
    }

    drawArrow(fromX, fromY, toX, toY, opacity, depth) {
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const arrowLength = 8;
      const arrowWidth = 5;

      // Position arrow at destination node
      const arrowX = toX - this.config.nodeRadius * Math.cos(angle);
      const arrowY = toY - this.config.nodeRadius * Math.sin(angle);

      this.ctx.save();
      this.ctx.translate(arrowX, arrowY);
      this.ctx.rotate(angle);

      this.ctx.beginPath();
      this.ctx.moveTo(-arrowLength, -arrowWidth);
      this.ctx.lineTo(0, 0);
      this.ctx.lineTo(-arrowLength, arrowWidth);
      this.ctx.closePath();

      this.ctx.fillStyle = this.config.colors.edge;
      this.ctx.globalAlpha = opacity * 0.8;
      this.ctx.fill();

      this.ctx.strokeStyle = this.config.colors.edgeGlow;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;

      this.ctx.restore();
    }

    drawParticles() {
      this.particles.forEach(particle => {
        // Skip if edge is not visible
        const fromX = particle.edge.from.x + this.offset;
        const toX = particle.edge.to.x + this.offset;

        if ((fromX < -100 && toX < -100) || (fromX > this.width + 100 && toX > this.width + 100)) {
          return;
        }

        // Update particle position
        particle.progress += particle.speed;
        if (particle.progress > 1) {
          particle.progress = 0;
        }

        // Calculate position along the bezier curve
        const t = particle.progress;
        const controlX1 = fromX + (toX - fromX) * 0.3;
        const controlY1 = particle.edge.from.y + (particle.edge.to.y - particle.edge.from.y) * 0.1;
        const controlX2 = fromX + (toX - fromX) * 0.7;
        const controlY2 = particle.edge.to.y + (particle.edge.from.y - particle.edge.to.y) * 0.1;

        // Cubic bezier formula
        const x = Math.pow(1 - t, 3) * fromX +
                 3 * Math.pow(1 - t, 2) * t * controlX1 +
                 3 * (1 - t) * Math.pow(t, 2) * controlX2 +
                 Math.pow(t, 3) * toX;

        const y = Math.pow(1 - t, 3) * particle.edge.from.y +
                 3 * Math.pow(1 - t, 2) * t * controlY1 +
                 3 * (1 - t) * Math.pow(t, 2) * controlY2 +
                 Math.pow(t, 3) * particle.edge.to.y;

        // Draw particle with glow
        this.ctx.beginPath();
        this.ctx.arc(x, y, particle.size * 1.5, 0, Math.PI * 2);
        this.ctx.fillStyle = this.config.colors.edgeGlow;
        this.ctx.globalAlpha = particle.opacity * 0.3;
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fill();

        this.ctx.globalAlpha = 1;
      });
    }

    animate() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Update time
      this.time++;

      // Update offset (move right)
      this.offset += this.config.scrollSpeed;

      // Generate new layer when needed
      if (this.offset > this.config.layerSpacing) {
        this.offset = 0;
        this.addNewLayer();
        this.removeOldLayer();
      }

      // Sort edges by depth (draw far edges first)
      const sortedEdges = [...this.edges].sort((a, b) => a.depth - b.depth);

      // Sort nodes by depth (draw far nodes first)
      const sortedNodes = [...this.nodes].sort((a, b) => a.depth - b.depth);

      // Draw edges first (behind nodes)
      sortedEdges.forEach(edge => this.drawEdge(edge));

      // Draw particles flowing on edges
      this.drawParticles();

      // Draw nodes on top
      sortedNodes.forEach(node => this.drawNode(node));

      // Continue animation
      this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    addNewLayer() {
      const lastNode = this.nodes[this.nodes.length - 1];
      const newLayer = lastNode ? lastNode.layer + 1 : 0;
      const x = lastNode ? lastNode.x + this.config.layerSpacing : this.width + this.config.layerSpacing;
      const centerY = this.height / 2;

      const newNodes = [];

      // Random number of nodes per layer (1-4)
      const nodeCount = Math.floor(Math.random() * 4) + 1; // 1 to 4 nodes

      // Generate new nodes
      for (let i = 0; i < nodeCount; i++) {
        const y = centerY + (i - nodeCount / 2 + 0.5) * this.config.nodeSpacing;

        // Add slight random vertical offset for more organic feel
        const yOffset = (Math.random() - 0.5) * 20;

        const isBlue = Math.random() < this.config.blueNodeProbability;

        const node = {
          x: x,
          y: y + yOffset,
          layer: newLayer,
          index: i,
          color: isBlue ? this.config.colors.blue : this.config.colors.red,
          colorLight: isBlue ? this.config.colors.blueLight : this.config.colors.redLight,
          radius: this.config.nodeRadius,
          opacity: this.config.nodeOpacity,
          depth: Math.random() * 0.5 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2
        };

        newNodes.push(node);
        this.nodes.push(node);
      }

      // Add to layers tracking
      this.layers.push(newNodes);

      // Connect to previous layer
      const prevLayerNodes = this.layers[this.layers.length - 2];

      if (prevLayerNodes && prevLayerNodes.length > 0) {
        newNodes.forEach(node => {
          const connectionCount = Math.min(
            Math.floor(Math.random() * 2) + 1,
            prevLayerNodes.length
          );
          const shuffled = [...prevLayerNodes].sort(() => Math.random() - 0.5);

          for (let c = 0; c < connectionCount; c++) {
            const edge = {
              from: shuffled[c],
              to: node,
              opacity: this.config.edgeOpacity,
              depth: (shuffled[c].depth + node.depth) / 2
            };
            this.edges.push(edge);

            // Create particles flowing along this edge
            for (let p = 0; p < this.config.particlesPerEdge; p++) {
              this.particles.push({
                edge: edge,
                progress: Math.random(),
                speed: this.config.particleSpeed * (0.8 + Math.random() * 0.4),
                size: 2 + Math.random() * 2,
                opacity: 0.6 + Math.random() * 0.4
              });
            }
          }
        });
      }
    }

    removeOldLayer() {
      // Remove nodes that are far off screen (left side)
      const removeThreshold = -this.config.layerSpacing * 2;

      // Filter out old nodes
      const oldNodeCount = this.nodes.length;
      this.nodes = this.nodes.filter(node => (node.x + this.offset) > removeThreshold);
      const removedCount = oldNodeCount - this.nodes.length;

      // Filter out edges connected to removed nodes
      if (removedCount > 0) {
        this.edges = this.edges.filter(edge =>
          this.nodes.includes(edge.from) && this.nodes.includes(edge.to)
        );

        // Filter out particles on removed edges
        this.particles = this.particles.filter(particle =>
          this.edges.includes(particle.edge)
        );

        // Remove old layers from tracking
        this.layers = this.layers.filter(layer =>
          layer.some(node => this.nodes.includes(node))
        );
      }
    }

    handleResize() {
      this.setupCanvas();
      this.generateDAG();
    }

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new MeshAnimation();
    });
  } else {
    new MeshAnimation();
  }

})();
