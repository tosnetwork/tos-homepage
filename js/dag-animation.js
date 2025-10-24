/**
 * TOS Network - GHOSTDAG Animation
 * Dynamic DAG (Directed Acyclic Graph) visualization
 */

(function() {
  'use strict';

  class DAGAnimation {
    constructor() {
      this.heroSection = document.querySelector('.hero');
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
        edgeOpacity: 0.15,
        nodeOpacity: 0.6,
        colors: {
          blue: '#4A90E2',
          red: '#ef4444',
          edge: '#60a5fa'
        }
      };

      this.offset = 0;
      this.init();
    }

    init() {
      if (!this.heroSection) return;

      // Create canvas container
      const container = document.createElement('div');
      container.className = 'dag-animation-container';

      // Create canvas
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'dag-canvas';
      container.appendChild(this.canvas);

      // Insert at the beginning of hero section
      this.heroSection.insertBefore(container, this.heroSection.firstChild);

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
      const rect = this.heroSection.getBoundingClientRect();
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

          const node = {
            x: x,
            y: y,
            layer: layer,
            index: i,
            color: Math.random() < this.config.blueNodeProbability ?
                   this.config.colors.blue : this.config.colors.red,
            radius: this.config.nodeRadius,
            opacity: this.config.nodeOpacity
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
              this.edges.push({
                from: shuffled[c],
                to: node,
                opacity: this.config.edgeOpacity
              });
            }
          });
        }
      }
    }

    drawNode(node) {
      const x = node.x + this.offset;

      // Skip if outside viewport (with margin)
      if (x < -100 || x > this.width + 100) return;

      this.ctx.beginPath();
      this.ctx.arc(x, node.y, node.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = node.color;
      this.ctx.globalAlpha = node.opacity;
      this.ctx.fill();

      // Add glow effect
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = node.color;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      this.ctx.globalAlpha = 1;
    }

    drawEdge(edge) {
      const fromX = edge.from.x + this.offset;
      const toX = edge.to.x + this.offset;

      // Skip if outside viewport (with margin)
      if ((fromX < -100 && toX < -100) || (fromX > this.width + 100 && toX > this.width + 100)) {
        return;
      }

      // Calculate opacity based on position (fade in/out at edges)
      let edgeOpacity = edge.opacity;
      const fadeZone = 200;

      if (fromX < fadeZone) {
        edgeOpacity *= Math.max(0, fromX / fadeZone);
      }
      if (toX > this.width - fadeZone) {
        edgeOpacity *= Math.max(0, (this.width - toX) / fadeZone);
      }

      this.ctx.beginPath();
      this.ctx.moveTo(fromX, edge.from.y);

      // Bezier curve for smooth connection
      const controlX1 = fromX + (toX - fromX) * 0.5;
      const controlY1 = edge.from.y;
      const controlX2 = fromX + (toX - fromX) * 0.5;
      const controlY2 = edge.to.y;

      this.ctx.bezierCurveTo(
        controlX1, controlY1,
        controlX2, controlY2,
        toX, edge.to.y
      );

      this.ctx.strokeStyle = this.config.colors.edge;
      this.ctx.globalAlpha = edgeOpacity;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;

      // Draw arrow
      this.drawArrow(fromX, edge.from.y, toX, edge.to.y, edgeOpacity);
    }

    drawArrow(fromX, fromY, toX, toY, opacity) {
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const arrowLength = 10;
      const arrowWidth = 6;

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

      this.ctx.strokeStyle = this.config.colors.edge;
      this.ctx.globalAlpha = opacity;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;

      this.ctx.restore();
    }

    animate() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Update offset (move right)
      this.offset += this.config.scrollSpeed;

      // Generate new layer when needed
      if (this.offset > this.config.layerSpacing) {
        this.offset = 0;
        this.addNewLayer();
        this.removeOldLayer();
      }

      // Draw edges first (behind nodes)
      this.edges.forEach(edge => this.drawEdge(edge));

      // Draw nodes
      this.nodes.forEach(node => this.drawNode(node));

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

        const node = {
          x: x,
          y: y,
          layer: newLayer,
          index: i,
          color: Math.random() < this.config.blueNodeProbability ?
                 this.config.colors.blue : this.config.colors.red,
          radius: this.config.nodeRadius,
          opacity: this.config.nodeOpacity
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
            this.edges.push({
              from: shuffled[c],
              to: node,
              opacity: this.config.edgeOpacity
            });
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
      new DAGAnimation();
    });
  } else {
    new DAGAnimation();
  }

})();
