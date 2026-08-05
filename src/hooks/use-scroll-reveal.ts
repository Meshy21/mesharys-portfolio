'use client';

import { useEffect, useRef } from 'react';

/**
 * Bi-directional scroll reveal hook.
 * Adds 'revealed' class when element enters the viewport,
 * and removes 'revealed' when element exits the viewport (in either direction).
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        } else {
          el.classList.remove('revealed');
        }
      },
      { threshold, rootMargin: '-30px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
