import React, { useEffect, useRef } from 'react';

export default function Background() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.innerHTML = ''; // Clear for React Strict Mode

    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'dust-particle';
      
      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}vw`;
      
      const duration = Math.random() * 25 + 15;
      particle.style.animationDuration = `${duration}s`;
      
      const delay = Math.random() * 20;
      particle.style.animationDelay = `-${delay}s`;
      
      container.appendChild(particle);
    }
  }, []);

  return (
    <div id="background-layer">
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute' }}></div>
      
      {/* Static Watercolor Moon (SVG Placeholder) */}
      <svg width="300" height="300" viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.08, pointerEvents: 'none' }}>
        <circle cx="50" cy="50" r="40" fill="#fcf9f2" filter="blur(8px)" />
        <circle cx="40" cy="40" r="38" fill="var(--color-bg-light)" filter="blur(3px)" />
      </svg>
    </div>
  );
}
