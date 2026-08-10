'use client';

import { useEffect, useRef } from 'react';

/**
 * Scroll reveal hook.
 * Adds 'revealed' class when element enters the viewport.
 * Once revealed, maintains revealed state to avoid mobile touch scroll stutter.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.05, once = true) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.classList.add('revealed');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          el.classList.remove('revealed');
        }
      },
      { threshold, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return ref;
}

