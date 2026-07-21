import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
  quality?: "low" | "medium" | "high";
};

/**
 * Vesper-style volumetric evening-light backdrop.
 * Original shader inspired by the aesthetic of drifting warm god-rays over a
 * near-black field. Not a copy of any third-party source.
 */
const VesperBackdrop = ({ className = "", quality = "high" }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const c = document.createElement("canvas");
    if (!c.getContext("webgl") && !c.getContext("experimental-webgl")) {
      setOk(false);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !ok) return;
    const container = containerRef.current;

    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
    let q = quality;
    if (isMobile && q === "high") q = "medium";
    if (isMobile && (navigator.hardwareConcurrency ?? 8) <= 4) q = "low";

    const settings = {
      low: { steps: 24, pixelRatio: 0.55, precision: "mediump" as const },
      medium: { steps: 40, pixelRatio: 0.75, precision: "mediump" as const },
      high: { steps: 64, pixelRatio: Math.min(window.devicePixelRatio, 2), precision: "highp" as const },
    }[q];

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: q === "high" ? "high-performance" : "low-power",
        precision: settings.precision,
        stencil: false,
        depth: false,
      });
    } catch {
      setOk(false);
      return;
    }
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setPixelRatio(settings.pixelRatio);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const vertex = /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
    `;

    // Volumetric evening light: drifting warm orbs + soft rays + film grain.
    const fragment = /* glsl */ `
      precision ${settings.precision} float;
      uniform float uTime;
      uniform vec2  uResolution;
      varying vec2 vUv;

      // hash / noise
      float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 45758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i = 0; i < 5; i++){
          v += a * noise(p);
          p *= 2.02;
          a *= 0.5;
        }
        return v;
      }

      // warm palette
      vec3 palette(float t){
        vec3 warm = vec3(1.00, 0.72, 0.28); // amber / gold
        vec3 deep = vec3(0.55, 0.20, 0.35); // dusk mauve
        vec3 sky  = vec3(0.10, 0.10, 0.16); // near-black indigo
        vec3 col  = mix(sky, deep, smoothstep(0.15, 0.55, t));
        col       = mix(col, warm, smoothstep(0.55, 0.95, t));
        return col;
      }

      void main(){
        vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
        float t = uTime * 0.05;

        // Slow drifting flow field
        vec2 flow = vec2(
          fbm(uv * 1.3 + vec2(t, -t * 0.6)),
          fbm(uv * 1.3 + vec2(-t * 0.7, t))
        );
        vec2 p = uv + (flow - 0.5) * 0.9;

        // Distance to a couple of moving light cores => soft orbs
        vec2 c1 = vec2(cos(t * 0.9) * 0.35, 0.10 + sin(t * 0.7) * 0.08);
        vec2 c2 = vec2(-0.30 + cos(t * 0.6 + 1.7) * 0.25, -0.20 + sin(t * 0.8) * 0.10);
        float d1 = length(p - c1);
        float d2 = length(p - c2);

        float glow1 = 0.055 / (d1 * d1 + 0.02);
        float glow2 = 0.035 / (d2 * d2 + 0.03);

        // Volumetric ray sweep across the scene
        float ang = atan(uv.y - 0.15, uv.x + 0.4);
        float rays = 0.0;
        for(int i = 0; i < ${settings.steps}; i++){
          float fi = float(i) / ${settings.steps.toFixed(1)};
          float band = sin(ang * 6.0 + t * 1.5 + fi * 6.28318) * 0.5 + 0.5;
          rays += band * (1.0 - fi) * 0.012;
        }
        rays *= smoothstep(1.1, 0.0, length(uv - vec2(-0.35, 0.2)));

        float density = fbm(p * 2.4 + t * 0.8) * 0.6 + glow1 + glow2 * 0.7 + rays;

        vec3 col = palette(clamp(density, 0.0, 1.0));

        // Vignette toward corners
        float vig = smoothstep(1.25, 0.15, length(uv));
        col *= mix(0.35, 1.0, vig);

        // Subtle film grain
        float grain = (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.06;
        col += grain;

        // Soft filmic tone curve
        col = col / (col + vec3(0.85));
        col = pow(col, vec3(0.92));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(w, h) },
      },
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let raf = 0;
    const targetFPS = q === "low" ? 30 : 60;
    const frameTime = 1000 / targetFPS;
    let last = performance.now();
    const start = last;

    const tick = (now: number) => {
      const dt = now - last;
      if (dt >= frameTime) {
        material.uniforms.uTime.value = (now - start) / 1000;
        renderer.render(scene, camera);
        last = now - (dt % frameTime);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    let rt: number | null = null;
    const onResize = () => {
      if (rt) window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        const nw = container.clientWidth;
        const nh = container.clientHeight;
        renderer.setSize(nw, nh);
        material.uniforms.uResolution.value.set(nw, nh);
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [ok, quality]);

  if (!ok) {
    return (
      <div
        className={className}
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, rgba(244,178,35,0.35), transparent 70%), radial-gradient(50% 45% at 70% 60%, rgba(120,40,80,0.35), transparent 70%), #0b0b10",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};

export default VesperBackdrop;
