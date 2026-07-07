"use client";
import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const pos   = useRef({ x: -500, y: -500 });
  const current = useRef({ x: -500, y: -500 });
  const raf   = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const tick = () => {
      const dx = pos.current.x - current.current.x;
      const dy = pos.current.y - current.current.y;
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        current.current.x += dx * 0.12;
        current.current.y += dy * 0.12;
      }
      if (visible) {
        const el = document.getElementById("cursor-glow");
        if (el) {
          el.style.transform = `translate(${current.current.x - 150}px, ${current.current.y - 150}px)`;
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    addEventListener("mousemove", onMove);
    addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);
    return () => {
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  return (
    <div
      id="cursor-glow"
      className="pointer-events-none fixed z-50 mix-blend-screen"
      style={{
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(201,162,75,0.08) 0%, transparent 70%)",
        top: 0,
        left: 0,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s",
      }}
    />
  );
}
