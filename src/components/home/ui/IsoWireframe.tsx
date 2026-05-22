import { useEffect, useRef } from "react";
import * as THREE from "three";

// command-violet oklch(0.58 0.26 272) → sRGB approximation
const VIOLET = 0x8b5cf6;
// 0.3 rpm → rad/s
const ROT_Y = (0.3 * Math.PI * 2) / 60;
const ROT_X = ROT_Y * 0.35;

export function IsoWireframe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Isometric orthographic camera
    const f = 2.4;
    const camera = new THREE.OrthographicCamera(-f, f, f, -f, 0.1, 100);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    // Outer octahedron — the main shape
    const geo = new THREE.OctahedronGeometry(1.7, 1);
    const wireGeo = new THREE.WireframeGeometry(geo);
    const mat = new THREE.LineBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const outer = new THREE.LineSegments(wireGeo, mat);

    // Inner octahedron — rotated 45° for depth
    const innerGeo = new THREE.OctahedronGeometry(0.85, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: VIOLET,
      transparent: true,
      opacity: 0.10,
      depthWrite: false,
    });
    const inner = new THREE.LineSegments(innerWire, innerMat);
    inner.rotation.y = Math.PI / 4;
    inner.rotation.x = Math.PI / 6;

    const group = new THREE.Group();
    group.add(outer);
    group.add(inner);
    scene.add(group);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      const a = w / h;
      camera.left = -f * a;
      camera.right = f * a;
      camera.top = f;
      camera.bottom = -f;
      camera.updateProjectionMatrix();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
      }, 900);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId: number;
    let last = 0;

    if (prefersReduced) {
      renderer.render(scene, camera);
    } else {
      const tick = (t: number) => {
        rafId = requestAnimationFrame(tick);
        const dt = Math.min((t - last) / 1000, 0.05);
        last = t;
        if (!scrolling && !document.hidden) {
          group.rotation.y += ROT_Y * dt;
          group.rotation.x += ROT_X * dt;
        }
        renderer.render(scene, camera);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      geo.dispose();
      wireGeo.dispose();
      mat.dispose();
      innerGeo.dispose();
      innerWire.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
