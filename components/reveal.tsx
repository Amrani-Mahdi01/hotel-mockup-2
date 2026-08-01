"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals its children once they scroll into view, then stops observing.
 * The CSS honours prefers-reduced-motion, so this becomes a no-op there.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Lets the wrapper become an <li> so it can sit legally inside <ol>/<ul>. */
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
      className={`in-view ${className}`}
    >
      {children}
    </Tag>
  );
}
