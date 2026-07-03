import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FinalQuestion() {
  const [answered, setAnswered] = useState(false);
  const containerRef = useRef(null);
  const noOptionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "center center",
            scrub: 1
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const handleYes = () => {
    setAnswered(true);
  };

  const handleHoverNo = () => {
    // Playful escape animation for the funny "no" option
    const x = (Math.random() - 0.5) * 80;
    const y = (Math.random() - 0.5) * 40;
    
    gsap.to(noOptionRef.current, {
      x: x,
      y: y,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 20, padding: '2rem', paddingBottom: '20vh' }}>
      {!answered ? (
        <div style={{ textAlign: 'center', maxWidth: '700px', width: '100%' }}>
          <h1 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '4rem', color: 'var(--color-text-main)' }}>
            ¿Quieres ser mi novia?
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
            <div 
              className="handwritten yes-option" 
              onClick={handleYes} 
              style={{ cursor: 'pointer', padding: '1rem', display: 'inline-block' }}
            >
              💛 Para decir que sí, solo respira.
            </div>
            
            <div 
              ref={noOptionRef}
              className="handwritten funny-option"
              onMouseEnter={handleHoverNo}
              style={{ padding: '1rem', display: 'inline-block', position: 'relative' }}
            >
              🌙 Para decir que no, tendrás que dar un mortal doble hacia atrás, darle una vuelta a la luna y regresar.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }} className="serif fade-in-fast">
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-accent-gold)' }}>Y así comienza un nuevo capítulo...</h2>
          <p className="handwritten" style={{ marginTop: '2rem', fontSize: 'clamp(2rem, 4vw, 3rem)', opacity: 0.8 }}>Gracias por decir que sí.</p>
        </div>
      )}
      
      <style>{`
        .fade-in-fast {
          animation: fadeInFast 3s ease forwards;
        }
        @keyframes fadeInFast {
          from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </section>
  );
}
