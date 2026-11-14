"use client";
import { useEffect, useRef, useState } from 'react';

// Scroll progress (0 to 1) for a word-by-word text reveal. Progress starts
// when the element's top reaches `start` of the viewport height and is
// complete once it has moved up by `span` of the viewport height.
// Visitors with reduced motion get the fully revealed text right away.
export function useWordReveal({ start = 0.85, span = 0.45 } = {}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = (vh * start - top) / (vh * span);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [start, span]);

  return { ref, progress };
}
