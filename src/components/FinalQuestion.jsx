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
          <h1 className="serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '4rem', color: 'var(--color-text-main)', lineHeight: '1.3' }}>
            ¿Qué te parece si seguimos formando nuestra historia, pero ahora siendo novios? ❤️
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
        <div style={{ textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="fade-in-slow">
          <p className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
            Sabía que valía la pena contarte toda esta historia.
          </p>
          <p className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
            Gracias por llegar hasta aquí, por cada risa, cada conversación y cada momento que hemos compartido.
          </p>
          <p className="serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
            Hoy comienza un capítulo nuevo, y no puedo esperar para escribirlo contigo.
          </p>
          <p className="handwritten" style={{ marginTop: '2rem', fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--color-accent-gold)' }}>
            Te quiero muchísimo. ❤️
          </p>
        </div>
      )}
      
      <style>{`
        .fade-in-slow {
          animation: fadeInSlow 4s ease forwards;
        }
        @keyframes fadeInSlow {
          0% { opacity: 0; filter: blur(10px); transform: translateY(10px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
