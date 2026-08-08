"use client";

import { useEffect, useRef } from "react";

// Rotating Earth focused on the Asia-Pacific rim, ported from the design
// handoff's globe.js. Rendered inside the largest hero sphere.
export default function GlobeSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = wrapRef.current;
    if (!target) return;
    const container: HTMLDivElement = target;

    let disposed = false;
    let disposeScene = () => {};

    async function init() {
      // Let the headline paint before parsing Three.js. Geometry, texture,
      // lighting and pixel ratio remain unchanged, so the finished globe is
      // visually identical.
      const THREE = await import("three");
      if (disposed) return;

      const canvas = document.createElement("canvas");
      container.appendChild(canvas);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 10);
      camera.position.set(0, 0, 4.4);

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const key = new THREE.DirectionalLight(0xffffff, 1.5);
      key.position.set(-3, 1.2, 3.5);
      scene.add(key);

      const geo = new THREE.SphereGeometry(1.55, 96, 96);
      const mat = new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 });
      const earth = new THREE.Mesh(geo, mat);
      scene.add(earth);

      const BASE_ANGLE = Math.PI + 0.55 - Math.PI / 2 + 0.15;
      const SPIN_SPEED = (2 * Math.PI) / 90;
      const t0 = performance.now();

      const loader = new THREE.TextureLoader().setCrossOrigin("anonymous");
      loader.load(
        "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg",
        (tex) => {
          if (disposed) return tex.dispose();
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
          mat.map = tex;
          mat.needsUpdate = true;
        },
        undefined,
        () => loader.load(
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
          (tex) => {
            if (disposed) return tex.dispose();
            tex.colorSpace = THREE.SRGBColorSpace;
            mat.map = tex;
            mat.needsUpdate = true;
          }
        )
      );

      function size() {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      size();
      window.addEventListener("resize", size);
      const ro = new ResizeObserver(size);
      ro.observe(container);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let inView = true;
      let raf = 0;

      function tick(now: number) {
        const t = (now - t0) / 1000;
        earth.rotation.y = reduceMotion ? BASE_ANGLE : BASE_ANGLE + t * SPIN_SPEED;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      }

      function syncRendering() {
        const shouldRun = inView && !document.hidden;
        if (shouldRun && !raf) raf = requestAnimationFrame(tick);
        if (!shouldRun && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      }

      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncRendering();
      });
      io.observe(container);
      document.addEventListener("visibilitychange", syncRendering);
      syncRendering();

      disposeScene = () => {
        if (raf) cancelAnimationFrame(raf);
        window.removeEventListener("resize", size);
        document.removeEventListener("visibilitychange", syncRendering);
        io.disconnect();
        ro.disconnect();
        geo.dispose();
        mat.map?.dispose();
        mat.dispose();
        renderer.dispose();
        canvas.remove();
      };
    }

    const startTimer = window.setTimeout(() => void init(), 250);
    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      disposeScene();
    };
  }, []);

  return <div ref={wrapRef} className="globe-canvas-wrap" />;
}
