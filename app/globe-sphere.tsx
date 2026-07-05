"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Rotating Earth focused on the Asia-Pacific rim, ported from the design
// handoff's globe.js. Rendered inside the largest hero sphere.
export default function GlobeSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const canvas = document.createElement("canvas");
    wrap.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
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

    // Starting yaw: the Asia / Australia / Pacific-rim hemisphere faces the
    // camera first, then the globe spins all the way around from there.
    const BASE_ANGLE = Math.PI + 0.55 - Math.PI / 2 + 0.15;
    // One full revolution every ~90 seconds, spinning in the Earth's real
    // direction (west to east).
    const SPIN_SPEED = (2 * Math.PI) / 90;
    const t0 = performance.now();

    const loader = new THREE.TextureLoader().setCrossOrigin("anonymous");
    loader.load(
      "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        mat.map = tex;
        mat.needsUpdate = true;
      },
      undefined,
      () => {
        // fallback to the lower-res but reliably CORS-enabled three.js texture
        loader.load(
          "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
          (tex) => {
            tex.colorSpace = THREE.SRGBColorSpace;
            mat.map = tex;
            mat.needsUpdate = true;
          }
        );
      }
    );

    function size() {
      if (!wrap) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    size();
    window.addEventListener("resize", size);
    const ro = new ResizeObserver(size);
    ro.observe(wrap);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    function tick(now: number) {
      const t = (now - t0) / 1000;
      if (!reduceMotion) {
        // continuous full rotation, starting from the Asia-facing view
        earth.rotation.y = BASE_ANGLE + t * SPIN_SPEED;
      } else {
        earth.rotation.y = BASE_ANGLE;
      }
      // no axial tilt: keeps the spin axis screen-vertical so geography
      // glides horizontally with zero vertical drift
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      ro.disconnect();
      geo.dispose();
      mat.map?.dispose();
      mat.dispose();
      renderer.dispose();
      wrap.removeChild(canvas);
    };
  }, []);

  return <div ref={wrapRef} className="globe-canvas-wrap" />;
}
