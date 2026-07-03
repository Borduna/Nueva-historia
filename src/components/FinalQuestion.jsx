import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FinalQuestion() {
  const [answered, setAnswered] = useState(false);
  const [escapes, setEscapes] = useState(0);
  const noBtnRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleHoverNo = () => {
    if (escapes < 3) {
      // Move button randomly but constrained
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 100 - 50;
      
      gsap.to(noBtnRef.current, {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out"
      });
      setEscapes(prev => prev + 1);
    }
  };

  const handleYes = () => {
    setAnswered(true);
  };

  const handleNo = () => {
    setAnswered(true);
  };

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
      {!answered ? (
        <div style={{ textAlign: 'center' }}>
          <h1 className="serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '4rem', textShadow: '0 0 30px rgba(253, 251, 247, 0.4)' }}>
            ¿Quieres ser mi novia?
          </h1>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn-elegant" onClick={handleYes} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
              Sí 💛
            </button>
            <button 
              ref={noBtnRef}
              className="btn-elegant" 
              style={{ position: 'relative', fontSize: '1.2rem', padding: '1rem 3rem' }}
              onMouseEnter={handleHoverNo}
              onClick={handleNo}
            >
              Todavía no...
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }} className="serif fade-in-fast">
          <h2 style={{ fontSize: '3rem', color: 'var(--color-accent-gold)', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>Y así comienza nuestra historia...</h2>
          <p className="sans" style={{ marginTop: '2rem', opacity: 0.7 }}>Gracias por esta noche.</p>
        </div>
      )}
      
      <style>{`
        .fade-in-fast {
          animation: fadeInFast 2s ease forwards;
        }
        @keyframes fadeInFast {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
