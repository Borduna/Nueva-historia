import React, { useState, useEffect } from 'react';

// Fecha exacta de inicio: 4 de julio de 2026 a las 11:38 AM (America/Mexico_City = UTC-6)
const START_DATE_UTC = new Date('2026-07-04T11:38:00-06:00').getTime();

export default function LiveCounter() {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCounter = () => {
      const now = Date.now();
      const diff = Math.max(0, now - START_DATE_UTC);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-item live-counter-card" style={{
      margin: '2rem auto',
      padding: '2rem 1.5rem',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(50, 45, 40, 0.08)',
      maxWidth: '650px',
      width: '92%',
      textAlign: 'center',
      border: '1px solid rgba(194, 153, 76, 0.25)',
      position: 'relative'
    }}>
      <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(1deg)' }}></div>
      <p className="handwritten" style={{
        fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
        color: 'var(--color-accent-gold)',
        marginBottom: '1.2rem',
        letterSpacing: '0.04em'
      }}>
        Nuestra historia comenzó hace…
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.8rem',
        marginTop: '0.5rem'
      }}>
        <div style={{ padding: '0.6rem 0.2rem', background: 'var(--color-bg-light)', borderRadius: '6px' }}>
          <span className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', lineHeight: 1.1 }}>
            {elapsed.days}
          </span>
          <span className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>días</span>
        </div>

        <div style={{ padding: '0.6rem 0.2rem', background: 'var(--color-bg-light)', borderRadius: '6px' }}>
          <span className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', lineHeight: 1.1 }}>
            {String(elapsed.hours).padStart(2, '0')}
          </span>
          <span className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>horas</span>
        </div>

        <div style={{ padding: '0.6rem 0.2rem', background: 'var(--color-bg-light)', borderRadius: '6px' }}>
          <span className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--color-text-main)', display: 'block', lineHeight: 1.1 }}>
            {String(elapsed.minutes).padStart(2, '0')}
          </span>
          <span className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>minutos</span>
        </div>

        <div style={{ padding: '0.6rem 0.2rem', background: 'var(--color-bg-light)', borderRadius: '6px' }}>
          <span className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 600, color: 'var(--color-accent-pink)', display: 'block', lineHeight: 1.1 }}>
            {String(elapsed.seconds).padStart(2, '0')}
          </span>
          <span className="handwritten" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>segundos</span>
        </div>
      </div>
    </div>
  );
}
