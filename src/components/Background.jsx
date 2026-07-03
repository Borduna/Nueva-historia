import React from 'react';

const HandmadeStar = ({ style }) => (
  <svg viewBox="0 0 100 100" style={{ ...style, position: 'absolute' }} className="floating-element">
    {/* Uneven hand-drawn star path */}
    <path d="M50 5 Q55 45 95 50 Q55 55 50 95 Q45 55 5 50 Q45 45 50 5 Z" fill="var(--color-accent-gold)" opacity="0.6" />
  </svg>
);

const HandmadeCloud = ({ style }) => (
  <svg viewBox="0 0 100 50" style={{ ...style, position: 'absolute' }} className="floating-element">
    <path d="M20 40 Q10 40 10 30 Q10 20 25 20 Q30 10 45 10 Q60 10 65 20 Q80 15 85 25 Q95 30 90 40 Z" fill="var(--color-text-main)" opacity="0.08" />
  </svg>
);

const Dust = ({ style }) => (
  <div style={{ ...style, position: 'absolute', backgroundColor: 'var(--color-accent-gold)', borderRadius: '50%' }} className="floating-element" />
);

export default function Background() {
  // Generate a stable random array for particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    type: i % 4 === 0 ? 'star' : i % 5 === 0 ? 'cloud' : 'dust',
    size: i % 4 === 0 ? Math.random() * 15 + 10 : i % 5 === 0 ? Math.random() * 80 + 40 : Math.random() * 3 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 30
  }));

  return (
    <div id="background-layer">
      <div style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'hidden' }}>
        {particles.map(p => {
          const style = {
            width: `${p.size}px`,
            height: p.type === 'cloud' ? `${p.size / 2}px` : `${p.size}px`,
            left: `${p.left}vw`,
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`
          };
          if (p.type === 'star') return <HandmadeStar key={p.id} style={style} />;
          if (p.type === 'cloud') return <HandmadeCloud key={p.id} style={style} />;
          return <Dust key={p.id} style={style} />;
        })}
      </div>
      
      {/* Static Watercolor Moon */}
      <svg width="250" height="250" viewBox="0 0 100 100" style={{ position: 'absolute', top: '15%', right: '8%', opacity: 0.15, pointerEvents: 'none' }}>
        {/* Soft glow */}
        <circle cx="50" cy="50" r="40" fill="var(--color-text-main)" filter="blur(8px)" />
        {/* Crescent shadow to make a moon shape */}
        <circle cx="43" cy="43" r="38" fill="var(--color-bg-light)" filter="blur(2px)" />
        {/* Hand drawn details */}
        <path d="M40 30 Q50 35 60 30" stroke="var(--color-text-main)" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="5,2" />
        <path d="M35 50 Q50 60 70 50" stroke="var(--color-text-main)" strokeWidth="1.5" fill="none" opacity="0.2" />
      </svg>
    </div>
  );
}
