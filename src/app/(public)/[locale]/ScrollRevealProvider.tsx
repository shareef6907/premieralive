"use client";

import { useEffect } from "react";

export default function ScrollRevealProvider() {
  useEffect(() => {
    // 1. Scroll-reveal on [data-reveal] elements
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) =>
      revealObserver.observe(el)
    );

    // 2. Section-divider draw-once on scroll
    const dividerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            dividerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document
      .querySelectorAll(".section-divider:not(.animated)")
      .forEach((el) => dividerObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      dividerObserver.disconnect();
    };
  }, []);

  return null;
}
