(function () {
    'use strict';

    var scene = document.querySelector('[data-portal-scene]');
    var canvas = document.getElementById('portalFlowCanvas');
    var meshField = document.getElementById('portalMeshField');
    var edgeLayer = document.getElementById('portalMeshEdges');
    var nodeLayer = document.getElementById('portalMeshNodes');
    var motionToggle = document.getElementById('portalMotionToggle');
    var portalArt = scene ? scene.querySelector('.portal-art') : null;
    var worldCanvas = document.getElementById('portalWorldCanvas');

    if (!scene || !canvas || !meshField || !edgeLayer || !nodeLayer || !motionToggle || !portalArt || !worldCanvas) {
        return;
    }

    var context = canvas.getContext('2d', { alpha: true });
    var worldContext = worldCanvas.getContext('2d', { alpha: true });

    if (!context || !worldContext) {
        return;
    }

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var compactQuery = window.matchMedia('(max-width: 640px)');
    var width = 0;
    var height = 0;
    var pixelRatio = 0.75;
    var graph = { edges: [], nodes: [] };
    var particles = [];
    var animationFrame = 0;
    var lastFrameTime = 0;
    var manuallyPaused = false;
    var sceneVisible = true;
    var pointerFrame = 0;
    var lastWorldFrameTime = 0;
    var worldPixelRatio = 0.45;
    var worldRandom = null;
    var worldActors = [];
    var worldClusters = [];
    var worldBridges = [];
    var nextWorldEntityId = 1;

    var worldClusterDefinitions = [
        { x: 0.75, y: 0.28, radius: 0.032, max: 4 },
        { x: 0.84, y: 0.23, radius: 0.038, max: 5 },
        { x: 0.90, y: 0.37, radius: 0.034, max: 4 },
        { x: 0.96, y: 0.48, radius: 0.029, max: 4 },
        { x: 0.78, y: 0.49, radius: 0.031, max: 4 },
        { x: 0.87, y: 0.60, radius: 0.041, max: 5 },
        { x: 0.83, y: 0.79, radius: 0.045, max: 6 },
        { x: 0.95, y: 0.76, radius: 0.052, max: 6 }
    ];

    var worldColors = [
        [120, 207, 231],
        [224, 95, 214],
        [168, 85, 247],
        [245, 179, 111]
    ];

    function createSvgElement(name, className) {
        var element = document.createElementNS(SVG_NS, name);
        element.setAttribute('class', className);
        return element;
    }

    function mulberry32(seed) {
        return function () {
            seed |= 0;
            seed = seed + 0x6D2B79F5 | 0;
            var value = Math.imul(seed ^ seed >>> 15, 1 | seed);
            value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value;
            return ((value ^ value >>> 14) >>> 0) / 4294967296;
        };
    }

    function randomBetween(minimum, maximum) {
        return minimum + (maximum - minimum) * worldRandom();
    }

    function entityAlpha(entity) {
        return Math.max(0, Math.min(
            1,
            entity.age / entity.fadeIn,
            (entity.life - entity.age) / entity.fadeOut
        ));
    }

    function assignActorTarget(actor) {
        if (actor.behavior === 1) {
            actor.targetX = randomBetween(0.445, 0.475);
            actor.targetY = randomBetween(0.27, 0.73);
        } else {
            actor.targetX = randomBetween(0.025, 0.43);
            actor.targetY = randomBetween(0.1, 0.9);
        }
    }

    function spawnWorldActor(initial) {
        var behavior = Math.floor(worldRandom() * 3);
        var actor = {
            id: nextWorldEntityId,
            role: Math.floor(worldRandom() * worldColors.length),
            behavior: behavior,
            x: randomBetween(0.025, 0.42),
            y: randomBetween(0.1, 0.9),
            vx: randomBetween(-0.008, 0.008),
            vy: randomBetween(-0.008, 0.008),
            targetX: 0,
            targetY: 0,
            homeX: randomBetween(0.04, 0.4),
            homeY: randomBetween(0.13, 0.87),
            orbitRadius: randomBetween(0.025, 0.075),
            orbitRate: randomBetween(0.00028, 0.00065),
            phase: randomBetween(0, Math.PI * 2),
            speed: randomBetween(0.035, 0.068),
            size: randomBetween(2.2, 4.1),
            life: randomBetween(6.5, 15),
            age: 0,
            fadeIn: randomBetween(0.7, 1.5),
            fadeOut: randomBetween(0.9, 1.8)
        };

        nextWorldEntityId += 1;
        assignActorTarget(actor);

        if (initial) {
            actor.age = randomBetween(0, actor.life * 0.78);
        }

        worldActors.push(actor);
    }

    function spawnClusterMember(cluster, initial) {
        var member = {
            id: nextWorldEntityId,
            role: Math.floor(worldRandom() * worldColors.length),
            angle: randomBetween(0, Math.PI * 2),
            distance: randomBetween(0.32, 1),
            angularSpeed: randomBetween(0.22, 0.72) * (worldRandom() < 0.5 ? -1 : 1),
            size: randomBetween(1.7, 3.2),
            life: randomBetween(5, 13),
            age: 0,
            fadeIn: randomBetween(0.5, 1.2),
            fadeOut: randomBetween(0.7, 1.5),
            px: 0,
            py: 0
        };

        nextWorldEntityId += 1;

        if (initial) {
            member.age = randomBetween(0, member.life * 0.72);
        }

        cluster.members.push(member);
    }

    function buildAgenticWorld() {
        worldRandom = mulberry32(718239);
        worldActors = [];
        worldBridges = [];
        nextWorldEntityId = 1;

        var initialActors = compactQuery.matches ? 10 : 18;
        for (var actorIndex = 0; actorIndex < initialActors; actorIndex += 1) {
            spawnWorldActor(true);
        }

        worldClusters = worldClusterDefinitions.map(function (definition, clusterIndex) {
            var cluster = {
                x: definition.x,
                y: definition.y,
                radius: definition.radius,
                max: compactQuery.matches ? Math.max(3, definition.max - 2) : definition.max,
                phase: randomBetween(0, Math.PI * 2),
                members: [],
                interactions: [],
                id: clusterIndex
            };
            var initialMembers = Math.max(2, Math.floor(randomBetween(2, cluster.max)));

            for (var memberIndex = 0; memberIndex < initialMembers; memberIndex += 1) {
                spawnClusterMember(cluster, true);
            }

            return cluster;
        });
    }

    function updateWorldActors(delta, time) {
        worldActors.forEach(function (actor) {
            actor.age += delta;

            if (actor.behavior === 2) {
                actor.targetX = actor.homeX + Math.cos(time * actor.orbitRate + actor.phase) * actor.orbitRadius;
                actor.targetY = actor.homeY + Math.sin(time * actor.orbitRate * 0.81 + actor.phase) * actor.orbitRadius;
            }

            var deltaX = actor.targetX - actor.x;
            var deltaY = actor.targetY - actor.y;
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
            actor.vx += deltaX / distance * actor.speed * delta * 0.85;
            actor.vy += deltaY / distance * actor.speed * delta * 0.85;
            actor.vx += Math.sin(time * 0.0007 + actor.phase) * 0.0025 * delta;
            actor.vy += Math.cos(time * 0.00057 + actor.phase) * 0.0025 * delta;

            var velocity = Math.sqrt(actor.vx * actor.vx + actor.vy * actor.vy) || 1;
            if (velocity > actor.speed) {
                actor.vx = actor.vx / velocity * actor.speed;
                actor.vy = actor.vy / velocity * actor.speed;
            }

            actor.vx *= Math.pow(0.22, delta);
            actor.vy *= Math.pow(0.22, delta);
            actor.x += actor.vx * delta;
            actor.y += actor.vy * delta;

            if (distance < 0.018 && actor.behavior !== 2) {
                if (actor.behavior === 1) {
                    actor.life = Math.min(actor.life, actor.age + actor.fadeOut + 0.7);
                }
                assignActorTarget(actor);
            }

            if (actor.x < 0.015 || actor.x > 0.49) {
                actor.vx *= -0.8;
                actor.x = Math.max(0.015, Math.min(0.49, actor.x));
            }
            if (actor.y < 0.07 || actor.y > 0.93) {
                actor.vy *= -0.8;
                actor.y = Math.max(0.07, Math.min(0.93, actor.y));
            }
        });

        worldActors = worldActors.filter(function (actor) {
            return actor.age < actor.life;
        });

        var baseCount = compactQuery.matches ? 8 : 15;
        var targetCount = baseCount + Math.round((Math.sin(time * 0.00022) + 1) * (compactQuery.matches ? 3 : 4));

        if (worldActors.length < targetCount && worldRandom() < Math.min(1, delta * 4.2)) {
            spawnWorldActor(false);
        }
        if (worldActors.length > targetCount + 3 && worldRandom() < delta * 0.7) {
            var retiringActor = worldActors[Math.floor(worldRandom() * worldActors.length)];
            retiringActor.life = Math.min(retiringActor.life, retiringActor.age + retiringActor.fadeOut);
        }
    }

    function updateWorldClusters(delta, time) {
        worldClusters.forEach(function (cluster) {
            cluster.members.forEach(function (member) {
                member.age += delta;
                member.angle += member.angularSpeed * delta;
                var orbitPixels = cluster.radius * Math.min(width, height) * member.distance;
                member.px = cluster.x * width + Math.cos(member.angle) * orbitPixels;
                member.py = cluster.y * height + Math.sin(member.angle) * orbitPixels * 0.58;
            });

            cluster.members = cluster.members.filter(function (member) {
                return member.age < member.life;
            });

            var dynamicMaximum = Math.max(2, cluster.max - Math.round((Math.sin(time * 0.00031 + cluster.phase) + 1) * 1.2));
            if (cluster.members.length < dynamicMaximum && worldRandom() < Math.min(1, delta * 1.15)) {
                spawnClusterMember(cluster, false);
            }

            cluster.interactions.forEach(function (interaction) {
                interaction.age += delta;
            });
            cluster.interactions = cluster.interactions.filter(function (interaction) {
                return interaction.age < interaction.duration
                    && cluster.members.indexOf(interaction.from) !== -1
                    && cluster.members.indexOf(interaction.to) !== -1;
            });

            if (cluster.members.length > 1
                && cluster.interactions.length < 2
                && worldRandom() < delta * 0.42) {
                var fromIndex = Math.floor(worldRandom() * cluster.members.length);
                var toIndex = (fromIndex + 1 + Math.floor(worldRandom() * (cluster.members.length - 1))) % cluster.members.length;
                cluster.interactions.push({
                    from: cluster.members[fromIndex],
                    to: cluster.members[toIndex],
                    age: 0,
                    duration: randomBetween(0.9, 2.1)
                });
            }
        });

        worldBridges.forEach(function (bridge) {
            bridge.age += delta;
        });
        worldBridges = worldBridges.filter(function (bridge) {
            return bridge.age < bridge.duration;
        });

        if (worldBridges.length < 3 && worldRandom() < delta * 0.18) {
            var sourceIndex = Math.floor(worldRandom() * worldClusters.length);
            var destinationIndex = (sourceIndex + 1 + Math.floor(worldRandom() * (worldClusters.length - 1))) % worldClusters.length;
            worldBridges.push({
                from: worldClusters[sourceIndex],
                to: worldClusters[destinationIndex],
                age: 0,
                duration: randomBetween(1.4, 2.8),
                color: Math.floor(worldRandom() * worldColors.length)
            });
        }
    }

    function drawEntity(x, y, size, role, alpha) {
        var color = worldColors[role];
        var colorValue = color[0] + ', ' + color[1] + ', ' + color[2];

        worldContext.beginPath();

        if (role === 0) {
            worldContext.arc(x, y, size, 0, Math.PI * 2);
        } else if (role === 1) {
            worldContext.moveTo(x, y - size * 1.25);
            worldContext.lineTo(x + size * 1.25, y);
            worldContext.lineTo(x, y + size * 1.25);
            worldContext.lineTo(x - size * 1.25, y);
            worldContext.closePath();
        } else if (role === 2) {
            for (var side = 0; side < 6; side += 1) {
                var angle = Math.PI / 3 * side - Math.PI / 2;
                var sideX = x + Math.cos(angle) * size * 1.2;
                var sideY = y + Math.sin(angle) * size * 1.2;
                if (side === 0) {
                    worldContext.moveTo(sideX, sideY);
                } else {
                    worldContext.lineTo(sideX, sideY);
                }
            }
            worldContext.closePath();
        } else {
            worldContext.rect(x - size, y - size, size * 2, size * 2);
        }

        worldContext.fillStyle = 'rgba(' + colorValue + ', ' + alpha * 0.86 + ')';
        worldContext.fill();
        if (size >= 2.45) {
            worldContext.lineWidth = 0.7;
            worldContext.strokeStyle = 'rgba(244, 252, 255, ' + alpha * 0.62 + ')';
            worldContext.stroke();
        }
    }

    function drawActorConnections() {
        var thresholdSquared = 0.072 * 0.072;

        worldActors.forEach(function (actor, actorIndex) {
            if ((actor.id + actorIndex) % 3 === 0) {
                return;
            }

            var nearest = null;
            var nearestDistance = thresholdSquared;

            worldActors.forEach(function (candidate) {
                if (candidate === actor) {
                    return;
                }
                var deltaX = candidate.x - actor.x;
                var deltaY = candidate.y - actor.y;
                var distance = deltaX * deltaX + deltaY * deltaY;
                if (distance < nearestDistance) {
                    nearest = candidate;
                    nearestDistance = distance;
                }
            });

            if (!nearest || actor.id > nearest.id) {
                return;
            }

            var alpha = Math.min(entityAlpha(actor), entityAlpha(nearest));
            worldContext.beginPath();
            worldContext.moveTo(actor.x * width, actor.y * height);
            worldContext.lineTo(nearest.x * width, nearest.y * height);
            worldContext.lineWidth = 0.7;
            worldContext.strokeStyle = 'rgba(120, 207, 231, ' + alpha * 0.2 + ')';
            worldContext.stroke();
        });
    }

    function drawCluster(cluster, time) {
        var centerX = cluster.x * width;
        var centerY = cluster.y * height;
        var radius = cluster.radius * Math.min(width, height);

        worldContext.beginPath();
        worldContext.arc(centerX, centerY, radius * 1.14, time * 0.00016 + cluster.phase, time * 0.00016 + cluster.phase + Math.PI * 1.28);
        worldContext.lineWidth = 0.8;
        worldContext.strokeStyle = 'rgba(120, 207, 231, 0.16)';
        worldContext.stroke();

        cluster.interactions.forEach(function (interaction) {
            var progress = interaction.age / interaction.duration;
            var alpha = Math.sin(progress * Math.PI);
            var packetX = interaction.from.px + (interaction.to.px - interaction.from.px) * progress;
            var packetY = interaction.from.py + (interaction.to.py - interaction.from.py) * progress;

            worldContext.beginPath();
            worldContext.moveTo(interaction.from.px, interaction.from.py);
            worldContext.lineTo(interaction.to.px, interaction.to.py);
            worldContext.lineWidth = 0.9;
            worldContext.strokeStyle = 'rgba(178, 231, 243, ' + alpha * 0.42 + ')';
            worldContext.stroke();
            worldContext.beginPath();
            worldContext.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
            worldContext.fillStyle = 'rgba(255, 255, 255, ' + alpha * 0.9 + ')';
            worldContext.fill();
        });

        cluster.members.forEach(function (member) {
            drawEntity(member.px, member.py, member.size, member.role, entityAlpha(member));
        });
    }

    function drawWorldBridges() {
        worldBridges.forEach(function (bridge) {
            var progress = bridge.age / bridge.duration;
            var alpha = Math.sin(progress * Math.PI);
            var fromX = bridge.from.x * width;
            var fromY = bridge.from.y * height;
            var toX = bridge.to.x * width;
            var toY = bridge.to.y * height;
            var controlX = (fromX + toX) / 2;
            var controlY = Math.min(fromY, toY) - 24;
            var inverse = 1 - progress;
            var packetX = inverse * inverse * fromX + 2 * inverse * progress * controlX + progress * progress * toX;
            var packetY = inverse * inverse * fromY + 2 * inverse * progress * controlY + progress * progress * toY;
            var color = worldColors[bridge.color];

            worldContext.beginPath();
            worldContext.moveTo(fromX, fromY);
            worldContext.quadraticCurveTo(controlX, controlY, toX, toY);
            worldContext.lineWidth = 0.7;
            worldContext.strokeStyle = 'rgba(120, 207, 231, ' + alpha * 0.14 + ')';
            worldContext.stroke();
            worldContext.beginPath();
            worldContext.arc(packetX, packetY, 2.2, 0, Math.PI * 2);
            worldContext.fillStyle = 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + alpha * 0.85 + ')';
            worldContext.fill();
        });
    }

    function drawWorldLayer(time) {
        if (!worldRandom) {
            return;
        }

        if (lastWorldFrameTime && time - lastWorldFrameTime < 1000 / 8) {
            return;
        }

        var delta = lastWorldFrameTime ? Math.min(0.18, (time - lastWorldFrameTime) / 1000) : 0;
        lastWorldFrameTime = time;
        updateWorldActors(delta, time);
        updateWorldClusters(delta, time);
        worldContext.clearRect(0, 0, width, height);
        worldContext.globalCompositeOperation = 'source-over';
        drawWorldBridges();
        drawActorConnections();

        worldClusters.forEach(function (cluster) {
            drawCluster(cluster, time);
        });
        worldActors.forEach(function (actor) {
            drawEntity(actor.x * width, actor.y * height, actor.size, actor.role, entityAlpha(actor));
        });

        worldContext.globalCompositeOperation = 'source-over';
        worldContext.globalAlpha = 1;
    }

    function cubicPoint(edge, t) {
        var inverse = 1 - t;
        var inverseSquared = inverse * inverse;
        var tSquared = t * t;

        return {
            x: inverseSquared * inverse * edge.from.x
                + 3 * inverseSquared * t * edge.controlOne.x
                + 3 * inverse * tSquared * edge.controlTwo.x
                + tSquared * t * edge.to.x,
            y: inverseSquared * inverse * edge.from.y
                + 3 * inverseSquared * t * edge.controlOne.y
                + 3 * inverse * tSquared * edge.controlTwo.y
                + tSquared * t * edge.to.y
        };
    }

    function addEdge(edges, seen, from, to) {
        var key = from.id + ':' + to.id;

        if (seen[key]) {
            return;
        }

        seen[key] = true;
        var deltaX = to.x - from.x;
        var deltaY = to.y - from.y;
        var edge = {
            from: from,
            to: to,
            controlOne: {
                x: from.x + deltaX * 0.36,
                y: from.y + deltaY * 0.08
            },
            controlTwo: {
                x: from.x + deltaX * 0.68,
                y: to.y - deltaY * 0.08
            },
            samples: []
        };

        for (var sampleIndex = 0; sampleIndex <= 28; sampleIndex += 1) {
            edge.samples.push(cubicPoint(edge, sampleIndex / 28));
        }

        edges.push(edge);
    }

    function nearestNodes(nodes, target, amount) {
        return nodes.slice().sort(function (first, second) {
            return Math.abs(first.y - target.y) - Math.abs(second.y - target.y);
        }).slice(0, amount);
    }

    function buildGraph() {
        var compact = compactQuery.matches;
        var random = mulberry32(compact ? 7319 : 23861);
        var columnXs = compact
            ? [-0.08, 0.08, 0.24, 0.39, 0.5, 0.64, 0.82, 1.08]
            : [-0.06, 0.06, 0.17, 0.28, 0.39, 0.5, 0.61, 0.73, 0.86, 1.06];
        var columns = [];
        var nodes = [];
        var nextNodeId = 0;

        columnXs.forEach(function (x, columnIndex) {
            var column = [];

            if (x === 0.5) {
                column.push({
                    id: nextNodeId,
                    x: 0.5,
                    y: 0.5,
                    protocol: true,
                    radius: compact ? 3.1 : 3.5
                });
                nextNodeId += 1;
            } else {
                var count = compact ? 2 + columnIndex % 2 : 2 + columnIndex % 3;

                for (var nodeIndex = 0; nodeIndex < count; nodeIndex += 1) {
                    var spread = compact ? 0.72 : 0.76;
                    var baseY = 0.5 - spread / 2 + spread * (nodeIndex + 1) / (count + 1);
                    var jitter = (random() - 0.5) * (compact ? 0.07 : 0.09);

                    column.push({
                        id: nextNodeId,
                        x: x,
                        y: Math.max(0.1, Math.min(0.9, baseY + jitter)),
                        protocol: false,
                        radius: compact ? 1.6 + random() * 0.7 : 1.75 + random() * 0.9
                    });
                    nextNodeId += 1;
                }
            }

            columns.push(column);
            Array.prototype.push.apply(nodes, column);
        });

        var edges = [];
        var seenEdges = Object.create(null);

        for (var columnCursor = 1; columnCursor < columns.length; columnCursor += 1) {
            var previous = columns[columnCursor - 1];
            var current = columns[columnCursor];
            var currentIsProtocol = current.length === 1 && current[0].protocol;
            var previousIsProtocol = previous.length === 1 && previous[0].protocol;

            if (currentIsProtocol) {
                previous.forEach(function (from) {
                    addEdge(edges, seenEdges, from, current[0]);
                });
                continue;
            }

            if (previousIsProtocol) {
                current.forEach(function (to) {
                    addEdge(edges, seenEdges, previous[0], to);
                });
                continue;
            }

            current.forEach(function (to, targetIndex) {
                var connectionCount = (targetIndex + columnCursor) % 2 === 0 ? 2 : 1;
                nearestNodes(previous, to, connectionCount).forEach(function (from) {
                    addEdge(edges, seenEdges, from, to);
                });
            });

            previous.forEach(function (from) {
                nearestNodes(current, from, 1).forEach(function (to) {
                    addEdge(edges, seenEdges, from, to);
                });
            });
        }

        graph = { edges: edges, nodes: nodes };
        renderStaticMesh();
        buildParticles();
    }

    function edgePath(edge) {
        return [
            'M', edge.from.x * 1000, edge.from.y * 600,
            'C', edge.controlOne.x * 1000, edge.controlOne.y * 600,
            edge.controlTwo.x * 1000, edge.controlTwo.y * 600,
            edge.to.x * 1000, edge.to.y * 600
        ].join(' ');
    }

    function renderStaticMesh() {
        var edgeFragment = document.createDocumentFragment();
        var nodeFragment = document.createDocumentFragment();

        graph.edges.forEach(function (edge) {
            var glow = createSvgElement('path', 'portal-mesh-edge-glow');
            var line = createSvgElement('path', 'portal-mesh-edge');
            var path = edgePath(edge);

            glow.setAttribute('d', path);
            line.setAttribute('d', path);
            edgeFragment.appendChild(glow);
            edgeFragment.appendChild(line);
        });

        graph.nodes.forEach(function (node) {
            var glow = createSvgElement('circle', 'portal-mesh-node-glow');
            var coreClass = node.protocol
                ? 'portal-mesh-node portal-mesh-node-protocol'
                : 'portal-mesh-node';
            var core = createSvgElement('circle', coreClass);
            var centerX = node.x * 1000;
            var centerY = node.y * 600;
            var radius = node.radius;

            glow.setAttribute('cx', centerX);
            glow.setAttribute('cy', centerY);
            glow.setAttribute('r', node.protocol ? radius * 4.4 : radius * 3.2);
            core.setAttribute('cx', centerX);
            core.setAttribute('cy', centerY);
            core.setAttribute('r', radius);
            nodeFragment.appendChild(glow);
            nodeFragment.appendChild(core);
        });

        edgeLayer.replaceChildren(edgeFragment);
        nodeLayer.replaceChildren(nodeFragment);
    }

    function buildParticles() {
        var compact = compactQuery.matches;
        var random = mulberry32(compact ? 9017 : 54233);
        particles = [];

        graph.edges.forEach(function (edge) {
            var particleCount = 2;

            for (var particleIndex = 0; particleIndex < particleCount; particleIndex += 1) {
                particles.push({
                    edge: edge,
                    progress: (random() + particleIndex / particleCount) % 1,
                    // Overview advances particles by 0.008-0.012 per 60 Hz frame.
                    // Expressing that rate per second keeps the same motion at 24/30 fps.
                    speed: 0.48 + random() * 0.24,
                    size: 3 + random() * 2.2,
                    opacity: 0.6 + random() * 0.4
                });
            }
        });
    }

    function sampledPoint(edge, progress) {
        var scaled = progress * (edge.samples.length - 1);
        var index = Math.min(edge.samples.length - 2, Math.floor(scaled));
        var fraction = scaled - index;
        var from = edge.samples[index];
        var to = edge.samples[index + 1];

        return {
            x: (from.x + (to.x - from.x) * fraction) * width,
            y: (from.y + (to.y - from.y) * fraction) * height
        };
    }

    function drawParticle(particle) {
        var point = sampledPoint(particle.edge, particle.progress);

        context.beginPath();
        context.arc(point.x, point.y, particle.size * 1.7, 0, Math.PI * 2);
        context.fillStyle = 'rgba(178, 231, 243, ' + particle.opacity * 0.36 + ')';
        context.fill();

        context.beginPath();
        context.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, ' + particle.opacity + ')';
        context.fill();
    }

    function draw(time) {
        animationFrame = window.requestAnimationFrame(draw);

        if (shouldPause()) {
            lastFrameTime = time;
            return;
        }

        var frameInterval = compactQuery.matches ? 1000 / 20 : 1000 / 24;

        if (lastFrameTime && time - lastFrameTime < frameInterval) {
            return;
        }

        var delta = lastFrameTime ? Math.min(0.06, (time - lastFrameTime) / 1000) : 0;
        lastFrameTime = time;
        drawWorldLayer(time);
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = 'source-over';

        particles.forEach(function (particle) {
            particle.progress += particle.speed * delta;

            if (particle.progress >= 1) {
                particle.progress -= 1;
            }

            drawParticle(particle);
        });

        context.globalCompositeOperation = 'source-over';
    }

    function resizeCanvas() {
        var bounds = scene.getBoundingClientRect();
        var nextWidth = Math.max(1, Math.round(bounds.width));
        var nextHeight = Math.max(1, Math.round(bounds.height));

        if (nextWidth === width && nextHeight === height) {
            return;
        }

        width = nextWidth;
        height = nextHeight;
        canvas.width = Math.max(1, Math.round(width * pixelRatio));
        canvas.height = Math.max(1, Math.round(height * pixelRatio));
        worldCanvas.width = Math.max(1, Math.round(width * worldPixelRatio));
        worldCanvas.height = Math.max(1, Math.round(height * worldPixelRatio));
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        worldContext.setTransform(worldPixelRatio, 0, 0, worldPixelRatio, 0, 0);
        lastWorldFrameTime = 0;
    }

    function shouldPause() {
        return manuallyPaused || reducedMotionQuery.matches || document.hidden || !sceneVisible;
    }

    function updatePauseState() {
        var paused = shouldPause();
        scene.classList.toggle('portal-scene-paused', paused);
        motionToggle.setAttribute('aria-pressed', manuallyPaused ? 'true' : 'false');

        if (!paused) {
            lastFrameTime = performance.now();
        } else {
            context.clearRect(0, 0, width, height);
            worldContext.clearRect(0, 0, width, height);
        }
    }

    function handlePointer(event) {
        if (reducedMotionQuery.matches || pointerFrame) {
            return;
        }

        pointerFrame = window.requestAnimationFrame(function () {
            var bounds = scene.getBoundingClientRect();
            var pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
            var pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
            scene.style.setProperty('--portal-pointer-x', pointerX.toFixed(3));
            scene.style.setProperty('--portal-pointer-y', pointerY.toFixed(3));
            pointerFrame = 0;
        });
    }

    motionToggle.addEventListener('click', function () {
        manuallyPaused = !manuallyPaused;
        updatePauseState();
    });

    document.addEventListener('visibilitychange', updatePauseState);
    scene.addEventListener('pointermove', handlePointer, { passive: true });
    scene.addEventListener('pointerleave', function () {
        scene.style.setProperty('--portal-pointer-x', '0');
        scene.style.setProperty('--portal-pointer-y', '0');
    });

    if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', updatePauseState);
        compactQuery.addEventListener('change', function () {
            buildGraph();
            buildAgenticWorld();
            resizeCanvas();
        });
    } else {
        reducedMotionQuery.addListener(updatePauseState);
        compactQuery.addListener(function () {
            buildGraph();
            buildAgenticWorld();
            resizeCanvas();
        });
    }

    if ('IntersectionObserver' in window) {
        var intersectionObserver = new IntersectionObserver(function (entries) {
            sceneVisible = entries[0] ? entries[0].isIntersecting : true;
            updatePauseState();
        }, { threshold: 0.03 });
        intersectionObserver.observe(scene);
    }

    if ('ResizeObserver' in window) {
        var resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(scene);
    } else {
        window.addEventListener('resize', resizeCanvas, { passive: true });
    }

    resizeCanvas();
    buildGraph();
    buildAgenticWorld();
    updatePauseState();
    animationFrame = window.requestAnimationFrame(draw);

    window.addEventListener('pagehide', function () {
        window.cancelAnimationFrame(animationFrame);
    }, { once: true });
}());
