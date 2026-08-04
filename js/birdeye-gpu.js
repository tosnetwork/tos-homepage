(() => {
    "use strict";
    const canvas = document.getElementById("matrixGpu");
    const gl = canvas?.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "high-performance" });
    const rendererLabel = document.getElementById("hudRenderer");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!gl) {
        if (canvas) canvas.hidden = true;
        if (rendererLabel) rendererLabel.textContent = "RENDER · SEMANTIC 2D FALLBACK";
        return;
    }
    const vertexSource = `#version 300 es
        in vec2 p;
        void main(){ gl_Position=vec4(p,0.,1.); }`;
    const fragmentSource = `#version 300 es
        precision highp float;
        uniform vec2 r;
        uniform vec2 pointer;
        uniform float time;
        uniform float mode;
        uniform float alarm;
        out vec4 color;
        float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        void main(){
            vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;
            vec2 mouse=(pointer-.5*r)/r.y;
            uv += mouse*.025;
            uv.x += alarm*.006*sin(uv.y*90.+time*24.);
            float depth=max(.035,uv.y+.36);
            vec2 grid=vec2(uv.x/depth,1./depth+time*.045);
            vec2 cell=abs(fract(grid*5.)-.5)/max(fwidth(grid*5.),vec2(.001));
            float line=1.-min(min(cell.x,cell.y),1.);
            line*=smoothstep(-.42,.16,uv.y)*(1.-smoothstep(.05,.72,uv.y));
            vec2 id=floor((uv+vec2(time*.008,0.))*vec2(42.,24.));
            vec2 q=fract((uv+vec2(time*.008,0.))*vec2(42.,24.))-.5;
            float rnd=hash(id+mode*17.);
            float star=(1.-smoothstep(0.,.08,length(q)))*step(.91,rnd)*(0.45+0.55*sin(time*2.+rnd*30.));
            float scan=.025*(.5+.5*sin(gl_FragCoord.y*1.7-time*7.));
            vec3 consensus=vec3(.08,1.,.38);
            vec3 chain=vec3(.70,.98,.12);
            vec3 intelligence=vec3(.08,.78,1.);
            vec3 tint=mode<.5?consensus:(mode<1.5?chain:intelligence);
            tint=mix(tint,vec3(1.,.08,.18),alarm);
            float radial=length(uv*vec2(1.,1.35));
            float consensusWave=(1.-smoothstep(.0,.018,abs(fract(radial*4.-time*.16)-.5)))*(1.-smoothstep(.08,.85,radial));
            float chainGate=(1.-smoothstep(.0,.025,abs(fract((uv.x+time*.035)*5.)-.5)))*smoothstep(.58,.05,abs(uv.y));
            float portalDistance=abs(length((uv-vec2(.0,.03))*vec2(1.45,1.))-mix(.16,.48,.5+.5*sin(time*.18)));
            float aiPortal=1.-smoothstep(.0,.018,portalDistance);
            float modeField=mode<.5?consensusWave:(mode<1.5?chainGate:aiPortal);
            float fieldStrength=mode>1.5?.018:.075;
            vec3 col=tint*(line*.095+star*.45+scan+modeField*fieldStrength);
            float vignette=1.-smoothstep(.22,1.05,length(uv*vec2(.8,1.)));
            color=vec4(vec3(.002,.018,.011)+col*vignette,1.);
        }`;
    function makeShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
        return shader;
    }
    try {
        const program = gl.createProgram();
        gl.attachShader(program, makeShader(gl.VERTEX_SHADER, vertexSource));
        gl.attachShader(program, makeShader(gl.FRAGMENT_SHADER, fragmentSource));
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
        gl.useProgram(program);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
        const position = gl.getAttribLocation(program, "p");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
        const resolution = gl.getUniformLocation(program, "r");
        const pointerUniform = gl.getUniformLocation(program, "pointer");
        const timeUniform = gl.getUniformLocation(program, "time");
        const modeUniform = gl.getUniformLocation(program, "mode");
        const alarmUniform = gl.getUniformLocation(program, "alarm");
        let pointer = [innerWidth / 2, innerHeight / 2];
        let mode = 0;
        const resize = () => {
            const box = canvas.getBoundingClientRect();
            const scale = Math.min(devicePixelRatio || 1, 1.5);
            canvas.width = Math.max(1, Math.round(box.width * scale));
            canvas.height = Math.max(1, Math.round(box.height * scale));
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        canvas.parentElement.addEventListener("pointermove", (event) => {
            const box = canvas.getBoundingClientRect();
            pointer = [(event.clientX - box.left) * canvas.width / box.width, (box.bottom - event.clientY) * canvas.height / box.height];
        });
        document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { mode = { consensus: 0, chain: 1, ai: 2 }[button.dataset.mode] || 0; }));
        new ResizeObserver(resize).observe(canvas.parentElement);
        resize();
        const draw = (now) => {
            if (!document.body.classList.contains("low-gpu") && !document.hidden) {
                mode = { consensus: 0, chain: 1, ai: 2 }[document.querySelector("[data-mode].active")?.dataset.mode] || 0;
                gl.uniform2f(resolution, canvas.width, canvas.height);
                gl.uniform2f(pointerUniform, pointer[0], pointer[1]);
                gl.uniform1f(timeUniform, reducedMotion ? 0 : now / 1000);
                gl.uniform1f(modeUniform, mode);
                const alarm = document.body.classList.contains("stream-lost") || document.body.classList.contains("reorg-glitch") ? 1 : document.body.classList.contains("stream-recovering") ? .35 : 0;
                gl.uniform1f(alarmUniform, alarm);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
            }
            requestAnimationFrame(draw);
        };
        requestAnimationFrame(draw);
    } catch (error) {
        canvas.hidden = true;
        if (rendererLabel) rendererLabel.textContent = "RENDER · SEMANTIC 2D FALLBACK";
        console.warn("Birdeye WebGL2 layer unavailable", error);
    }
})();
