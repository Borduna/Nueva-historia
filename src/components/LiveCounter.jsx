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
      margin: '1.5rem auto',
      padding: '1.8rem 1.2rem',
      background: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(50, 45, 40, 0.08)',
      maxWidth: '650px',
      width: '92%',
      textAlign: 'center',
      border: '1px solid rgba(194, 153, 76, 0.25)',
      position: 'relative'
    }}>
      <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(1deg)' }}></div>
      <p className="handwritten" style={{
        fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
        color: 'var(--color-accent-gold)',
        marginBottom: '1rem',
        letterSpacing: '0.04em'
      }}>
        Nuestra historia comenzó hace…
      </p>

      <div className="live-counter-grid">
        <div className="counter-unit">
          <span className="serif counter-number">
            {elapsed.days}
          </span>
          <span className="handwritten counter-label">días</span>
        </div>

        <div className="counter-unit">
          <span className="serif counter-number">
            {String(elapsed.hours).padStart(2, '0')}
          </span>
          <span className="handwritten counter-label">horas</span>
        </div>

        <div className="counter-unit">
          <span className="serif counter-number">
            {String(elapsed.minutes).padStart(2, '0')}
          </span>
          <span className="handwritten counter-label">minutos</span>
        </div>

        <div className="counter-unit">
          <span className="serif counter-number counter-seconds">
            {String(elapsed.seconds).padStart(2, '0')}
          </span>
          <span className="handwritten counter-label">segundos</span>
        </div>
      </div>
    </div>
  );
}
