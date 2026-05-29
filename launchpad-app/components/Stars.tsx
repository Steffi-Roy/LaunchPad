'use client';

import { useEffect, useRef } from 'react';

export default function Stars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      const size = Math.random() * 2 + 0.5;
      const peak = (Math.random() * 0.6 + 0.3).toFixed(2);
      const duration = (Math.random() * 4 + 2).toFixed(1);
      const delay = `-${(Math.random() * 6).toFixed(1)}`;

      el.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: white;
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --d: ${duration}s;
        --delay: ${delay}s;
        --peak: ${peak};
        animation: starTwinkle var(--d) var(--delay) ease-in-out infinite;
      `;
      container.appendChild(el);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="stars"
      aria-hidden="true"
    />
  );
}
