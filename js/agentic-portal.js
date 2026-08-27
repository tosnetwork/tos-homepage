(function () {
    'use strict';

    var scene = document.querySelector('[data-portal-scene]');
    var canvas = document.getElementById('portalWorldCanvas');
    var motionToggle = document.getElementById('portalMotionToggle');

    if (!scene || !canvas || !motionToggle) {
        return;
    }

    var context = canvas.getContext('2d', { alpha: true });

    if (!context) {
        return;
    }

    var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var compactQuery = window.matchMedia('(max-width: 640px)');
    var entityKinds = ['agent', 'intent', 'skill', 'evidence', 'storage'];
    var palette = {
        agent: [111, 220, 255],
        intent: [238, 96, 216],
        skill: [157, 109, 255],
        evidence: [255, 188, 104],
        storage: [102, 242, 197]
    };
    var cityDefinitions = [
        { x: 0.70, y: 0.23, radius: 0.058, hue: 190 },
        { x: 0.84, y: 0.20, radius: 0.052, hue: 253 },
        { x: 0.78, y: 0.42, radius: 0.064, hue: 216 },
        { x: 0.92, y: 0.42, radius: 0.054, hue: 286 },
        { x: 0.70, y: 0.68, radius: 0.064, hue: 177 },
        { x: 0.86, y: 0.71, radius: 0.078, hue: 246 }
    ];

    var width = 1;
    var height = 1;
    var pixelRatio = 1;
    var unit = 1;
    var portal = { x: 0.5, y: 0.52, rx: 58, ry: 260 };
    var random = mulberry32(927421);
    var actors = [];
    var leftInteractions = [];
    var cities = [];
    var exchanges = [];
    var stars = [];
    var nextEntityId = 1;
    var nextExchangeAt = 0;
    var nextTransitAt = 0;
    var lastFrameTime = 0;
    var animationFrame = 0;
    var manuallyPaused = false;
    var sceneVisible = true;
    var resizePending = false;
    var frameCounter = 0;
    var frameWindowStart = performance.now();
    var measuredFps = 0;
    var lastDiagnosticsTime = 0;

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
        return minimum + (maximum - minimum) * random();
    }

    function clamp(value, minimum, maximum) {
        return Math.max(minimum, Math.min(maximum, value));
    }

    function rgba(color, alpha) {
        return 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + alpha + ')';
    }

    function lifeAlpha(entity) {
        var fadeIn = clamp(entity.age / entity.fadeIn, 0, 1);
        var fadeOut = entity.retiring
            ? clamp((entity.life - entity.age) / entity.fadeOut, 0, 1)
            : 1;
        return Math.min(fadeIn, fadeOut);
    }

    function distanceBetween(first, second) {
        var deltaX = (first.x - second.x) * width;
        var deltaY = (first.y - second.y) * height;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    function chooseKind() {
        var roll = random();
        if (roll < 0.28) {
            return 'agent';
        }
        if (roll < 0.49) {
            return 'intent';
        }
        if (roll < 0.69) {
            return 'skill';
        }
        if (roll < 0.86) {
            return 'evidence';
        }
        return 'storage';
    }

    function chooseLeftTarget() {
        return {
            x: randomBetween(0.045, 0.405),
            y: randomBetween(0.13, 0.9)
        };
    }

    function spawnActor(initial) {
        var target = chooseLeftTarget();
        var actor = {
            id: nextEntityId,
            kind: chooseKind(),
            x: randomBetween(0.035, 0.39),
            y: randomBetween(0.12, 0.91),
            vx: randomBetween(-0.006, 0.006),
            vy: randomBetween(-0.006, 0.006),
            targetX: target.x,
            targetY: target.y,
            mode: 'explore',
            modeAge: randomBetween(0, 2),
            decisionAt: randomBetween(1.4, 4.8),
            speed: randomBetween(38, 68),
            size: randomBetween(8.5, 12.5),
            age: initial ? randomBetween(0.4, 9) : 0,
            life: randomBetween(21, 42),
            fadeIn: randomBetween(0.5, 1.1),
            fadeOut: randomBetween(1.1, 2.1),
            retiring: false,
            busy: false,
            phase: randomBetween(0, Math.PI * 2),
            route: null,
            trail: []
        };
        nextEntityId += 1;
        actors.push(actor);
        return actor;
    }

    function cityPoint(city, amount) {
        var angle = randomBetween(0, Math.PI * 2);
        var radius = Math.sqrt(random()) * city.radius * Math.min(width, height) * amount;
        return {
            x: city.x + Math.cos(angle) * radius / width,
            y: city.y + Math.sin(angle) * radius * 0.46 / height
        };
    }

    function spawnCityMember(city, kind, arrival) {
        var target = cityPoint(city, 0.78);
        var origin = arrival || cityPoint(city, 0.48);
        var member = {
            id: nextEntityId,
            kind: kind || chooseKind(),
            x: origin.x,
            y: origin.y,
            vx: 0,
            vy: 0,
            targetX: target.x,
            targetY: target.y,
            speed: randomBetween(20, 42),
            size: randomBetween(5.8, 8.4),
            age: 0,
            life: randomBetween(18, 42),
            fadeIn: randomBetween(0.45, 0.9),
            fadeOut: randomBetween(0.8, 1.6),
            retiring: false,
            busy: false,
            phase: randomBetween(0, Math.PI * 2)
        };
        nextEntityId += 1;
        city.members.push(member);
        return member;
    }

    function createCity(definition, index) {
        var city = {
            id: index,
            x: definition.x,
            y: definition.y,
            radius: definition.radius,
            hue: definition.hue,
            spin: randomBetween(0, Math.PI * 2),
            spinSpeed: randomBetween(-0.13, 0.13),
            members: [],
            interactions: [],
            nextSpawnAt: randomBetween(1.5, 4),
            nextInteractionAt: randomBetween(0.7, 2.2),
            localTime: 0,
            eventGlow: 0,
            spires: []
        };
        var spireCount = compactQuery.matches ? 3 : 4 + index % 3;
        for (var spireIndex = 0; spireIndex < spireCount; spireIndex += 1) {
            city.spires.push({
                angle: randomBetween(0, Math.PI * 2),
                distance: randomBetween(0.12, 0.58),
                height: randomBetween(0.34, 0.92),
                phase: randomBetween(0, Math.PI * 2),
                rate: randomBetween(0.55, 1.35)
            });
        }
        var initialMembers = compactQuery.matches
            ? Math.floor(randomBetween(2, 4))
            : Math.floor(randomBetween(3, 7));
        for (var memberIndex = 0; memberIndex < initialMembers; memberIndex += 1) {
            var member = spawnCityMember(city);
            member.age = randomBetween(0.2, member.life * 0.55);
        }
        return city;
    }

    function buildWorld() {
        actors = [];
        leftInteractions = [];
        exchanges = [];
        cities = [];
        nextEntityId = 1;
        nextExchangeAt = randomBetween(1.2, 3.2);
        nextTransitAt = randomBetween(0.8, 1.8);

        var actorCount = compactQuery.matches ? 12 : 23;
        for (var actorIndex = 0; actorIndex < actorCount; actorIndex += 1) {
            spawnActor(true);
        }

        var cityCount = compactQuery.matches ? 4 : cityDefinitions.length;
        for (var cityIndex = 0; cityIndex < cityCount; cityIndex += 1) {
            var definition = cityDefinitions[cityIndex];
            if (compactQuery.matches) {
                definition = {
                    x: cityIndex % 2 === 0 ? 0.75 : 0.9,
                    y: 0.24 + Math.floor(cityIndex / 2) * 0.42,
                    radius: 0.068,
                    hue: definition.hue
                };
            }
            cities.push(createCity(definition, cityIndex));
        }

        actors.slice(0, compactQuery.matches ? 1 : 2).forEach(function (actor, index) {
            actor.mode = 'portal';
            actor.modeAge = index * 0.7;
            actor.targetX = portal.x;
            actor.targetY = portal.y;
            actor.busy = true;
        });
    }

    function steer(entity, targetX, targetY, speed, delta) {
        var deltaX = (targetX - entity.x) * width;
        var deltaY = (targetY - entity.y) * height;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY) || 1;
        var desiredX = deltaX / distance * speed / width;
        var desiredY = deltaY / distance * speed / height;
        var response = Math.min(1, delta * 3.2);
        entity.vx += (desiredX - entity.vx) * response;
        entity.vy += (desiredY - entity.vy) * response;
        entity.x += entity.vx * delta;
        entity.y += entity.vy * delta;
        return distance;
    }

    function findPartner(actor) {
        var candidates = actors.filter(function (candidate) {
            return candidate !== actor
                && !candidate.busy
                && !candidate.retiring
                && candidate.mode === 'explore';
        });
        if (!candidates.length) {
            return null;
        }
        candidates.sort(function (first, second) {
            return distanceBetween(actor, first) - distanceBetween(actor, second);
        });
        return candidates[Math.floor(random() * Math.min(3, candidates.length))];
    }

    function beginInteraction(first, second) {
        first.mode = 'handshake';
        second.mode = 'handshake';
        first.modeAge = 0;
        second.modeAge = 0;
        first.busy = true;
        second.busy = true;
        leftInteractions.push({
            first: first,
            second: second,
            age: 0,
            duration: randomBetween(1.3, 2.5),
            pulses: 2 + Math.floor(random() * 3)
        });
    }

    function releaseActor(actor, preferPortal) {
        actor.busy = false;
        actor.modeAge = 0;
        actor.decisionAt = randomBetween(1.2, 4.2);
        if (preferPortal && random() < 0.3) {
            actor.mode = 'portal';
            actor.busy = true;
            actor.targetX = portal.x;
            actor.targetY = portal.y;
        } else {
            var target = chooseLeftTarget();
            actor.mode = 'explore';
            actor.targetX = target.x;
            actor.targetY = target.y;
        }
    }

    function beginTransit(actor) {
        var destination = cities[Math.floor(random() * cities.length)];
        actor.mode = 'transit';
        actor.modeAge = 0;
        actor.busy = true;
        actor.route = {
            startX: actor.x,
            startY: actor.y,
            city: destination,
            duration: randomBetween(2.7, 4.2),
            progress: 0
        };
        actor.trail = [];
        actor.life = Math.max(actor.life, actor.age + actor.route.duration + 2);
    }

    function quadraticPoint(fromX, fromY, controlX, controlY, toX, toY, progress) {
        var inverse = 1 - progress;
        return {
            x: inverse * inverse * fromX + 2 * inverse * progress * controlX + progress * progress * toX,
            y: inverse * inverse * fromY + 2 * inverse * progress * controlY + progress * progress * toY
        };
    }

    function transitPoint(route, progress) {
        var centerSplit = 0.48;
        if (progress <= centerSplit) {
            var incoming = progress / centerSplit;
            return quadraticPoint(
                route.startX,
                route.startY,
                0.43,
                route.startY * 0.42 + portal.y * 0.58,
                portal.x,
                portal.y,
                incoming
            );
        }
        var outgoing = (progress - centerSplit) / (1 - centerSplit);
        return quadraticPoint(
            portal.x,
            portal.y,
            0.61,
            portal.y * 0.48 + route.city.y * 0.52,
            route.city.x,
            route.city.y,
            outgoing
        );
    }

    function updateLeftInteractions(delta) {
        leftInteractions.forEach(function (interaction) {
            interaction.age += delta;
        });
        leftInteractions = leftInteractions.filter(function (interaction) {
            if (interaction.age < interaction.duration
                && actors.indexOf(interaction.first) !== -1
                && actors.indexOf(interaction.second) !== -1) {
                return true;
            }
            if (actors.indexOf(interaction.first) !== -1) {
                releaseActor(interaction.first, true);
            }
            if (actors.indexOf(interaction.second) !== -1) {
                releaseActor(interaction.second, false);
            }
            return false;
        });
    }

    function updateActors(delta, elapsed) {
        actors.forEach(function (actor) {
            actor.age += delta;
            actor.modeAge += delta;

            if (actor.mode === 'transit') {
                actor.route.progress = clamp(actor.route.progress + delta / actor.route.duration, 0, 1);
                var routePoint = transitPoint(actor.route, actor.route.progress);
                actor.x = routePoint.x;
                actor.y = routePoint.y;
                actor.trail.push({ x: actor.x, y: actor.y });
                if (actor.trail.length > 24) {
                    actor.trail.shift();
                }
                if (actor.route.progress >= 1) {
                    spawnCityMember(actor.route.city, actor.kind, { x: actor.x, y: actor.y });
                    actor.retiring = true;
                    actor.life = actor.age;
                }
                return;
            }

            if (!actor.retiring && actor.age > actor.life) {
                actor.retiring = true;
                actor.life = actor.age + actor.fadeOut;
            }

            if (actor.mode === 'handshake') {
                actor.vx *= Math.pow(0.12, delta);
                actor.vy *= Math.pow(0.12, delta);
                actor.x += Math.sin(elapsed * 1.2 + actor.phase) * 0.0007 * delta;
                actor.y += Math.cos(elapsed * 1.05 + actor.phase) * 0.0007 * delta;
                return;
            }

            if (actor.mode === 'portal') {
                var portalDistance = steer(actor, portal.x, portal.y, actor.speed * 1.58, delta);
                if (portalDistance < Math.max(9, portal.rx * 0.12)) {
                    beginTransit(actor);
                }
                return;
            }

            var distance = steer(actor, actor.targetX, actor.targetY, actor.speed, delta);
            actor.x += Math.sin(elapsed * 0.72 + actor.phase) * 0.00028 * delta;
            actor.y += Math.cos(elapsed * 0.61 + actor.phase) * 0.00025 * delta;

            if (distance < 9) {
                var target = chooseLeftTarget();
                actor.targetX = target.x;
                actor.targetY = target.y;
            }

            if (!actor.busy && actor.modeAge > actor.decisionAt) {
                actor.modeAge = 0;
                actor.decisionAt = randomBetween(1.5, 4.6);
                var choice = random();
                if (choice < 0.34) {
                    var partner = findPartner(actor);
                    if (partner) {
                        beginInteraction(actor, partner);
                    }
                } else if (choice < 0.46) {
                    actor.mode = 'portal';
                    actor.busy = true;
                    actor.targetX = portal.x;
                    actor.targetY = portal.y;
                }
            }

            actor.x = clamp(actor.x, 0.025, 0.47);
            actor.y = clamp(actor.y, 0.1, 0.93);
        });

        actors = actors.filter(function (actor) {
            return actor.age < actor.life;
        });

        var minimum = compactQuery.matches ? 9 : 18;
        var maximum = compactQuery.matches ? 17 : 30;
        if (actors.length < minimum || (actors.length < maximum && random() < delta * 0.42)) {
            spawnActor(false);
        }

        if (elapsed >= nextTransitAt) {
            var available = actors.filter(function (actor) {
                return !actor.busy && !actor.retiring && actor.mode === 'explore';
            });
            if (available.length) {
                var selected = available[Math.floor(random() * available.length)];
                selected.mode = 'portal';
                selected.modeAge = 0;
                selected.busy = true;
                selected.targetX = portal.x;
                selected.targetY = portal.y;
            }
            nextTransitAt = elapsed + randomBetween(3.2, 5.8);
        }
    }

    function createCityInteraction(city) {
        var available = city.members.filter(function (member) {
            return !member.busy && !member.retiring;
        });
        if (available.length < 2) {
            return;
        }
        var first = available[Math.floor(random() * available.length)];
        var secondPool = available.filter(function (candidate) {
            return candidate !== first;
        });
        var second = secondPool[Math.floor(random() * secondPool.length)];
        first.busy = true;
        second.busy = true;
        city.interactions.push({
            first: first,
            second: second,
            age: 0,
            duration: randomBetween(1.1, 2.6),
            kind: random() < 0.5 ? first.kind : second.kind
        });
    }

    function updateCity(city, delta, elapsed) {
        city.localTime += delta;
        city.spin += city.spinSpeed * delta;
        city.eventGlow = Math.max(0, city.eventGlow - delta * 0.75);

        city.members.forEach(function (member) {
            member.age += delta;
            if (!member.retiring && member.age > member.life) {
                member.retiring = true;
                member.life = member.age + member.fadeOut;
            }
            if (!member.busy) {
                var distance = steer(member, member.targetX, member.targetY, member.speed, delta);
                member.x += Math.sin(elapsed * 0.83 + member.phase) * 0.00016 * delta;
                member.y += Math.cos(elapsed * 0.76 + member.phase) * 0.00014 * delta;
                if (distance < 5) {
                    var target = cityPoint(city, 0.8);
                    member.targetX = target.x;
                    member.targetY = target.y;
                }
            } else {
                member.vx *= Math.pow(0.15, delta);
                member.vy *= Math.pow(0.15, delta);
            }
        });

        city.members = city.members.filter(function (member) {
            return member.age < member.life;
        });

        city.interactions.forEach(function (interaction) {
            interaction.age += delta;
        });
        city.interactions = city.interactions.filter(function (interaction) {
            if (interaction.age < interaction.duration
                && city.members.indexOf(interaction.first) !== -1
                && city.members.indexOf(interaction.second) !== -1) {
                return true;
            }
            interaction.first.busy = false;
            interaction.second.busy = false;
            city.eventGlow = Math.max(city.eventGlow, 0.6);
            return false;
        });

        if (city.localTime >= city.nextSpawnAt) {
            var cityMaximum = compactQuery.matches ? 6 : 10;
            if (city.members.length < cityMaximum && random() < 0.72) {
                spawnCityMember(city);
            } else if (city.members.length > 3 && random() < 0.44) {
                var retiring = city.members[Math.floor(random() * city.members.length)];
                if (!retiring.busy) {
                    retiring.retiring = true;
                    retiring.life = retiring.age + retiring.fadeOut;
                }
            }
            city.nextSpawnAt = city.localTime + randomBetween(2.2, 6.8);
        }

        if (city.localTime >= city.nextInteractionAt) {
            if (city.interactions.length < 2) {
                createCityInteraction(city);
            }
            city.nextInteractionAt = city.localTime + randomBetween(0.9, 3.2);
        }
    }

    function createExchange() {
        if (cities.length < 2) {
            return;
        }
        var source = cities[Math.floor(random() * cities.length)];
        var destinations = cities.filter(function (city) {
            return city !== source;
        });
        var target = destinations[Math.floor(random() * destinations.length)];
        var sourceMember = source.members.length
            ? source.members[Math.floor(random() * source.members.length)]
            : source;
        var targetMember = target.members.length
            ? target.members[Math.floor(random() * target.members.length)]
            : target;
        exchanges.push({
            source: source,
            target: target,
            startX: sourceMember.x,
            startY: sourceMember.y,
            endX: targetMember.x,
            endY: targetMember.y,
            kind: chooseKind(),
            age: 0,
            duration: randomBetween(2.1, 3.8),
            curve: randomBetween(-0.08, 0.08)
        });
    }

    function updateExchanges(delta, elapsed) {
        exchanges.forEach(function (exchange) {
            exchange.age += delta;
        });
        exchanges = exchanges.filter(function (exchange) {
            if (exchange.age < exchange.duration) {
                return true;
            }
            exchange.target.eventGlow = 1;
            if (exchange.target.members.length < (compactQuery.matches ? 6 : 10) && random() < 0.34) {
                spawnCityMember(exchange.target, exchange.kind);
            }
            return false;
        });
        if (elapsed >= nextExchangeAt) {
            createExchange();
            nextExchangeAt = elapsed + randomBetween(1.7, 4.5);
        }
    }

    function updateWorld(delta, elapsed) {
        updateLeftInteractions(delta);
        updateActors(delta, elapsed);
        cities.forEach(function (city) {
            updateCity(city, delta, elapsed);
        });
        updateExchanges(delta, elapsed);
    }

    function drawGlow(x, y, radius, color, alpha) {
        context.beginPath();
        context.arc(x, y, radius * 1.9, 0, Math.PI * 2);
        context.fillStyle = rgba(color, alpha * 0.12);
        context.fill();
    }

    function drawEntity(kind, x, y, size, alpha, rotation) {
        var color = palette[kind];
        var scaled = Math.max(3.8, size * unit);
        context.save();
        context.translate(x, y);
        context.rotate(rotation || 0);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.globalAlpha = alpha;
        drawGlow(0, 0, scaled, color, alpha);
        context.strokeStyle = rgba(color, 0.98);
        context.fillStyle = rgba(color, 0.2);
        context.lineWidth = Math.max(1.15, scaled * 0.12);

        if (kind === 'agent') {
            context.beginPath();
            context.arc(0, -scaled * 0.38, scaled * 0.27, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            context.beginPath();
            context.moveTo(0, -scaled * 0.08);
            context.lineTo(0, scaled * 0.52);
            context.moveTo(-scaled * 0.42, scaled * 0.12);
            context.lineTo(0, scaled * 0.02);
            context.lineTo(scaled * 0.42, scaled * 0.12);
            context.moveTo(0, scaled * 0.5);
            context.lineTo(-scaled * 0.28, scaled * 0.83);
            context.moveTo(0, scaled * 0.5);
            context.lineTo(scaled * 0.28, scaled * 0.83);
            context.stroke();
        } else if (kind === 'intent') {
            context.beginPath();
            context.roundRect(-scaled * 0.78, -scaled * 0.5, scaled * 1.56, scaled, scaled * 0.14);
            context.fill();
            context.stroke();
            context.beginPath();
            context.moveTo(-scaled * 0.67, -scaled * 0.35);
            context.lineTo(0, scaled * 0.12);
            context.lineTo(scaled * 0.67, -scaled * 0.35);
            context.stroke();
        } else if (kind === 'skill') {
            context.beginPath();
            for (var side = 0; side < 6; side += 1) {
                var angle = Math.PI / 3 * side - Math.PI / 2;
                var sideX = Math.cos(angle) * scaled * 0.78;
                var sideY = Math.sin(angle) * scaled * 0.78;
                if (side === 0) {
                    context.moveTo(sideX, sideY);
                } else {
                    context.lineTo(sideX, sideY);
                }
            }
            context.closePath();
            context.fill();
            context.stroke();
            context.beginPath();
            context.moveTo(-scaled * 0.34, 0);
            context.lineTo(scaled * 0.34, 0);
            context.moveTo(0, -scaled * 0.34);
            context.lineTo(0, scaled * 0.34);
            context.stroke();
        } else if (kind === 'evidence') {
            context.beginPath();
            context.moveTo(-scaled * 0.55, -scaled * 0.72);
            context.lineTo(scaled * 0.22, -scaled * 0.72);
            context.lineTo(scaled * 0.56, -scaled * 0.38);
            context.lineTo(scaled * 0.56, scaled * 0.72);
            context.lineTo(-scaled * 0.55, scaled * 0.72);
            context.closePath();
            context.fill();
            context.stroke();
            context.beginPath();
            context.moveTo(scaled * 0.2, -scaled * 0.69);
            context.lineTo(scaled * 0.2, -scaled * 0.35);
            context.lineTo(scaled * 0.52, -scaled * 0.35);
            context.moveTo(-scaled * 0.3, 0);
            context.lineTo(scaled * 0.3, 0);
            context.moveTo(-scaled * 0.3, scaled * 0.3);
            context.lineTo(scaled * 0.2, scaled * 0.3);
            context.stroke();
        } else {
            context.beginPath();
            context.ellipse(0, -scaled * 0.48, scaled * 0.65, scaled * 0.27, 0, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            context.beginPath();
            context.moveTo(-scaled * 0.65, -scaled * 0.48);
            context.lineTo(-scaled * 0.65, scaled * 0.48);
            context.moveTo(scaled * 0.65, -scaled * 0.48);
            context.lineTo(scaled * 0.65, scaled * 0.48);
            context.ellipse(0, scaled * 0.48, scaled * 0.65, scaled * 0.27, 0, 0, Math.PI);
            context.stroke();
        }
        context.restore();
    }

    function drawStars(elapsed) {
        stars.forEach(function (star) {
            var alpha = star.alpha * (0.66 + Math.sin(elapsed * star.rate + star.phase) * 0.34);
            context.beginPath();
            context.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
            context.fillStyle = 'rgba(179, 211, 255, ' + alpha + ')';
            context.fill();
        });
    }

    function drawLeftInteractions() {
        leftInteractions.forEach(function (interaction) {
            var progress = interaction.age / interaction.duration;
            var alpha = Math.sin(progress * Math.PI);
            var firstX = interaction.first.x * width;
            var firstY = interaction.first.y * height;
            var secondX = interaction.second.x * width;
            var secondY = interaction.second.y * height;
            context.beginPath();
            context.moveTo(firstX, firstY);
            context.lineTo(secondX, secondY);
            context.lineWidth = 1.5 * unit;
            context.strokeStyle = 'rgba(139, 218, 255, ' + alpha * 0.55 + ')';
            context.stroke();
            for (var pulse = 0; pulse < interaction.pulses; pulse += 1) {
                var packetProgress = (progress * 1.7 + pulse / interaction.pulses) % 1;
                var packetX = firstX + (secondX - firstX) * packetProgress;
                var packetY = firstY + (secondY - firstY) * packetProgress;
                drawEntity('evidence', packetX, packetY, 3.2, alpha * 0.9, 0);
            }
        });
    }

    function drawTransitTrails() {
        actors.forEach(function (actor) {
            if (actor.mode !== 'transit' || actor.trail.length < 2) {
                return;
            }
            var color = palette[actor.kind];
            for (var index = 1; index < actor.trail.length; index += 1) {
                var from = actor.trail[index - 1];
                var to = actor.trail[index];
                var alpha = index / actor.trail.length;
                context.beginPath();
                context.moveTo(from.x * width, from.y * height);
                context.lineTo(to.x * width, to.y * height);
                context.lineWidth = (1.2 + alpha * 2.8) * unit;
                context.strokeStyle = rgba(color, alpha * 0.5);
                context.stroke();
            }
        });
    }

    function drawPortalBack(elapsed) {
        var centerX = portal.x * width;
        var centerY = portal.y * height;
        var glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, portal.ry * 0.9);
        glow.addColorStop(0, 'rgba(85, 191, 255, 0.12)');
        glow.addColorStop(0.36, 'rgba(111, 92, 255, 0.075)');
        glow.addColorStop(1, 'rgba(16, 42, 91, 0)');
        context.save();
        context.translate(centerX, centerY);
        context.scale(portal.rx / portal.ry, 1);
        context.translate(-centerX, -centerY);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(centerX, centerY, portal.ry * 0.88, 0, Math.PI * 2);
        context.fill();
        context.restore();

        context.save();
        context.translate(centerX, centerY);
        for (var ring = 0; ring < 7; ring += 1) {
            var ratio = 0.42 + ring * 0.085;
            context.beginPath();
            context.ellipse(0, 0, portal.rx * ratio, portal.ry * ratio, 0, 0, Math.PI * 2);
            context.lineWidth = ring === 6 ? 2.2 * unit : 0.9 * unit;
            context.strokeStyle = ring % 2 === 0
                ? 'rgba(102, 220, 255, 0.34)'
                : 'rgba(177, 115, 255, 0.26)';
            context.stroke();
        }
        context.restore();

        for (var bead = 0; bead < 22; bead += 1) {
            var beadAngle = elapsed * (0.22 + (bead % 3) * 0.025) + bead / 22 * Math.PI * 2;
            var beadRadius = 0.79 + (bead % 2) * 0.12;
            var beadX = centerX + Math.cos(beadAngle) * portal.rx * beadRadius;
            var beadY = centerY + Math.sin(beadAngle) * portal.ry * beadRadius;
            var beadDepth = 0.45 + Math.sin(beadAngle) * 0.35;
            context.beginPath();
            context.arc(beadX, beadY, (1.5 + beadDepth * 1.9) * unit, 0, Math.PI * 2);
            context.fillStyle = 'rgba(143, 228, 255, ' + (0.36 + beadDepth * 0.45) + ')';
            context.fill();
        }
    }

    function drawPortalFront(elapsed) {
        var centerX = portal.x * width;
        var centerY = portal.y * height;
        context.save();
        context.translate(centerX, centerY);
        context.beginPath();
        context.ellipse(0, 0, portal.rx, portal.ry, 0, -Math.PI * 0.04, Math.PI * 1.04);
        context.lineWidth = 4.2 * unit;
        context.strokeStyle = 'rgba(176, 235, 255, 0.82)';
        context.stroke();
        context.beginPath();
        context.ellipse(0, 0, portal.rx * 1.08, portal.ry * 1.02, 0, Math.PI * 0.03, Math.PI * 0.97);
        context.lineWidth = 1.25 * unit;
        context.strokeStyle = 'rgba(186, 103, 255, 0.68)';
        context.stroke();

        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'rgba(228, 248, 255, 0.94)';
        context.font = '600 ' + Math.round(11 * unit) + 'px "IBM Plex Sans", sans-serif';
        context.fillText('TOS', 0, -18 * unit);
        context.fillStyle = 'rgba(145, 220, 255, 0.88)';
        context.font = '500 ' + Math.round(8 * unit) + 'px "IBM Plex Mono", monospace';
        context.fillText('NETWORK', 0, -4 * unit);

        var coreRotation = elapsed * 0.43;
        context.rotate(coreRotation);
        context.beginPath();
        context.moveTo(0, 11 * unit);
        context.lineTo(8 * unit, 19 * unit);
        context.lineTo(0, 27 * unit);
        context.lineTo(-8 * unit, 19 * unit);
        context.closePath();
        context.fillStyle = 'rgba(111, 220, 255, 0.18)';
        context.strokeStyle = 'rgba(170, 235, 255, 0.88)';
        context.lineWidth = 1.2 * unit;
        context.fill();
        context.stroke();
        context.restore();
    }

    function drawCityBase(city, elapsed) {
        var centerX = city.x * width;
        var centerY = city.y * height;
        var radius = city.radius * Math.min(width, height);
        var glowAlpha = 0.16 + city.eventGlow * 0.24;
        context.save();
        context.translate(centerX, centerY);
        context.beginPath();
        context.ellipse(0, 0, radius * 1.05, radius * 0.38, 0, 0, Math.PI * 2);
        context.fillStyle = 'hsla(' + city.hue + ', 78%, 54%, ' + glowAlpha + ')';
        context.fill();
        context.lineWidth = 1.35 * unit;
        context.strokeStyle = 'hsla(' + city.hue + ', 92%, 72%, 0.72)';
        context.stroke();
        context.beginPath();
        context.ellipse(0, 2 * unit, radius * 0.78, radius * 0.26, city.spin, 0, Math.PI * 1.55);
        context.strokeStyle = 'hsla(' + city.hue + ', 92%, 72%, 0.36)';
        context.stroke();

        city.spires.forEach(function (spire) {
            var angle = spire.angle + city.spin * 0.18;
            var baseX = Math.cos(angle) * radius * spire.distance;
            var baseY = Math.sin(angle) * radius * spire.distance * 0.3;
            var pulse = 0.72 + Math.sin(elapsed * spire.rate + spire.phase) * 0.18;
            var spireHeight = radius * spire.height * pulse;
            var spireWidth = Math.max(2.2, radius * 0.08);
            context.beginPath();
            context.moveTo(baseX - spireWidth, baseY);
            context.lineTo(baseX - spireWidth * 0.62, baseY - spireHeight);
            context.lineTo(baseX + spireWidth * 0.62, baseY - spireHeight);
            context.lineTo(baseX + spireWidth, baseY);
            context.closePath();
            context.fillStyle = 'hsla(' + city.hue + ', 80%, 58%, ' + (0.14 + pulse * 0.18) + ')';
            context.strokeStyle = 'hsla(' + city.hue + ', 95%, 76%, ' + (0.42 + pulse * 0.35) + ')';
            context.lineWidth = 0.75 * unit;
            context.fill();
            context.stroke();
            context.beginPath();
            context.arc(baseX, baseY - spireHeight, 1.4 * unit, 0, Math.PI * 2);
            context.fillStyle = 'hsla(' + city.hue + ', 100%, 83%, ' + pulse + ')';
            context.fill();
        });
        context.restore();
    }

    function drawCityInteractions(city) {
        city.interactions.forEach(function (interaction) {
            var progress = interaction.age / interaction.duration;
            var alpha = Math.sin(progress * Math.PI);
            var firstX = interaction.first.x * width;
            var firstY = interaction.first.y * height;
            var secondX = interaction.second.x * width;
            var secondY = interaction.second.y * height;
            var packetProgress = progress < 0.5 ? progress * 2 : (1 - progress) * 2;
            context.beginPath();
            context.moveTo(firstX, firstY);
            context.lineTo(secondX, secondY);
            context.lineWidth = 1.35 * unit;
            context.strokeStyle = 'hsla(' + city.hue + ', 94%, 78%, ' + alpha * 0.7 + ')';
            context.stroke();
            drawEntity(
                interaction.kind,
                firstX + (secondX - firstX) * packetProgress,
                firstY + (secondY - firstY) * packetProgress,
                3.8,
                alpha,
                0
            );
        });
    }

    function exchangePoint(exchange, progress) {
        var controlX = (exchange.startX + exchange.endX) * 0.5;
        var controlY = (exchange.startY + exchange.endY) * 0.5 + exchange.curve;
        return quadraticPoint(
            exchange.startX,
            exchange.startY,
            controlX,
            controlY,
            exchange.endX,
            exchange.endY,
            progress
        );
    }

    function drawExchanges() {
        exchanges.forEach(function (exchange) {
            var progress = clamp(exchange.age / exchange.duration, 0, 1);
            var alpha = Math.sin(progress * Math.PI);
            var controlX = (exchange.startX + exchange.endX) * 0.5 * width;
            var controlY = ((exchange.startY + exchange.endY) * 0.5 + exchange.curve) * height;
            context.beginPath();
            context.moveTo(exchange.startX * width, exchange.startY * height);
            context.quadraticCurveTo(controlX, controlY, exchange.endX * width, exchange.endY * height);
            context.lineWidth = 1.3 * unit;
            context.strokeStyle = 'rgba(121, 211, 255, ' + alpha * 0.36 + ')';
            context.stroke();
            var point = exchangePoint(exchange, progress);
            drawEntity(exchange.kind, point.x * width, point.y * height, 6.2, alpha, 0);
        });
    }

    function renderScene(elapsed) {
        context.clearRect(0, 0, width, height);
        context.save();
        drawStars(elapsed);
        drawExchanges();
        cities.forEach(function (city) {
            drawCityBase(city, elapsed);
        });
        drawLeftInteractions();
        drawTransitTrails();
        drawPortalBack(elapsed);

        actors.forEach(function (actor) {
            var rotation = actor.mode === 'transit'
                ? Math.atan2(
                    (actor.y - (actor.trail.length > 1 ? actor.trail[actor.trail.length - 2].y : actor.y)) * height,
                    (actor.x - (actor.trail.length > 1 ? actor.trail[actor.trail.length - 2].x : actor.x)) * width
                )
                : 0;
            drawEntity(actor.kind, actor.x * width, actor.y * height, actor.size, lifeAlpha(actor), rotation);
        });

        cities.forEach(function (city) {
            drawCityInteractions(city);
            city.members.forEach(function (member) {
                drawEntity(member.kind, member.x * width, member.y * height, member.size, lifeAlpha(member), 0);
            });
        });
        drawPortalFront(elapsed);
        context.restore();
    }

    function shouldPause() {
        return manuallyPaused || reducedMotionQuery.matches || document.hidden || !sceneVisible;
    }

    function publishDiagnostics(time) {
        if (time - lastDiagnosticsTime < 1000) {
            return;
        }
        lastDiagnosticsTime = time;
        var stateCounts = {};
        actors.forEach(function (actor) {
            stateCounts[actor.mode] = (stateCounts[actor.mode] || 0) + 1;
        });
        canvas.dataset.sceneVersion = 'autonomous-vector-v1';
        canvas.dataset.actorStates = JSON.stringify(stateCounts);
        canvas.dataset.leftInteractions = String(leftInteractions.length);
        canvas.dataset.cityMembers = cities.map(function (city) {
            return city.members.length;
        }).join(',');
        canvas.dataset.cityInteractions = cities.map(function (city) {
            return city.interactions.length;
        }).join(',');
        canvas.dataset.crossDomainExchanges = String(exchanges.length);
        canvas.dataset.fps = String(measuredFps);
    }

    function drawFrame(time) {
        animationFrame = window.requestAnimationFrame(drawFrame);
        if (shouldPause()) {
            lastFrameTime = time;
            return;
        }
        var frameInterval = 1000 / 30;
        if (lastFrameTime && time - lastFrameTime < frameInterval * 0.82) {
            return;
        }
        var delta = lastFrameTime ? Math.min(0.06, (time - lastFrameTime) / 1000) : 0;
        lastFrameTime = time;
        var elapsed = time / 1000;
        updateWorld(delta, elapsed);
        renderScene(elapsed);

        frameCounter += 1;
        if (time - frameWindowStart >= 1000) {
            measuredFps = Math.round(frameCounter * 1000 / (time - frameWindowStart));
            frameCounter = 0;
            frameWindowStart = time;
        }
        publishDiagnostics(time);
    }

    function rebuildStars() {
        stars = [];
        var count = compactQuery.matches ? 42 : 76;
        for (var index = 0; index < count; index += 1) {
            stars.push({
                x: random(),
                y: random(),
                size: randomBetween(0.35, 1.25),
                alpha: randomBetween(0.08, 0.34),
                phase: randomBetween(0, Math.PI * 2),
                rate: randomBetween(0.35, 1.1)
            });
        }
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
        pixelRatio = compactQuery.matches
            ? Math.min(0.9, window.devicePixelRatio || 1)
            : Math.min(1, Math.max(0.85, (window.devicePixelRatio || 1) * 0.58));
        unit = clamp(Math.min(width / 1280, height / 760), 0.72, 1.3);
        portal.rx = clamp(width * (compactQuery.matches ? 0.052 : 0.047), 25, 68);
        portal.ry = clamp(height * (compactQuery.matches ? 0.29 : 0.34), 155, 292);
        canvas.width = Math.max(1, Math.round(width * pixelRatio));
        canvas.height = Math.max(1, Math.round(height * pixelRatio));
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        rebuildStars();
        renderScene(performance.now() / 1000);
    }

    function updatePauseState() {
        var paused = shouldPause();
        scene.classList.toggle('portal-scene-paused', paused);
        motionToggle.setAttribute('aria-pressed', manuallyPaused ? 'true' : 'false');
        if (!paused) {
            lastFrameTime = performance.now();
        } else {
            renderScene(performance.now() / 1000);
        }
    }

    function handleCompactChange() {
        resizePending = true;
        window.requestAnimationFrame(function () {
            resizePending = false;
            resizeCanvas();
            buildWorld();
            renderScene(performance.now() / 1000);
        });
    }

    motionToggle.addEventListener('click', function () {
        manuallyPaused = !manuallyPaused;
        updatePauseState();
    });
    document.addEventListener('visibilitychange', updatePauseState);

    if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', updatePauseState);
        compactQuery.addEventListener('change', handleCompactChange);
    } else {
        reducedMotionQuery.addListener(updatePauseState);
        compactQuery.addListener(handleCompactChange);
    }

    if ('IntersectionObserver' in window) {
        var intersectionObserver = new IntersectionObserver(function (entries) {
            sceneVisible = entries[0] ? entries[0].isIntersecting : true;
            updatePauseState();
        }, { threshold: 0.03 });
        intersectionObserver.observe(scene);
    }

    if ('ResizeObserver' in window) {
        var resizeObserver = new ResizeObserver(function () {
            if (!resizePending) {
                resizeCanvas();
            }
        });
        resizeObserver.observe(scene);
    } else {
        window.addEventListener('resize', resizeCanvas, { passive: true });
    }

    window.__tosAgenticScene = {
        version: 'autonomous-vector-v1',
        snapshot: function () {
            var stateCounts = {};
            actors.forEach(function (actor) {
                stateCounts[actor.mode] = (stateCounts[actor.mode] || 0) + 1;
            });
            return {
                vectorObjects: true,
                staticCompositeImage: false,
                fps: measuredFps,
                actors: actors.length,
                actorStates: stateCounts,
                leftInteractions: leftInteractions.length,
                transits: actors.filter(function (actor) { return actor.mode === 'transit'; }).length,
                cities: cities.map(function (city) {
                    return {
                        id: city.id,
                        members: city.members.length,
                        interactions: city.interactions.length,
                        eventGlow: Number(city.eventGlow.toFixed(2))
                    };
                }),
                crossDomainExchanges: exchanges.length,
                canvas: {
                    cssWidth: width,
                    cssHeight: height,
                    pixelRatio: Number(pixelRatio.toFixed(2))
                }
            };
        }
    };

    resizeCanvas();
    buildWorld();
    renderScene(performance.now() / 1000);
    updatePauseState();
    animationFrame = window.requestAnimationFrame(drawFrame);

    window.addEventListener('pagehide', function () {
        window.cancelAnimationFrame(animationFrame);
    }, { once: true });
}());
