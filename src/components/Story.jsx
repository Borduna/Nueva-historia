import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pequeños SVGs decorativos (muy discretos)
const MiniFlower = () => (
  <svg viewBox="0 0 50 50" width="35" height="35" style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.6, transform: 'rotate(15deg)', zIndex: 3 }}>
    <path d="M25 25 Q15 15 25 5 Q35 15 25 25" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M25 25 Q15 35 5 25 Q15 15 25 25" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M25 25 Q35 35 45 25 Q35 15 25 25" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="25" cy="25" r="3" fill="var(--color-accent-pink)" opacity="0.8" />
  </svg>
);

const MiniHeart = () => (
  <svg viewBox="0 0 30 30" width="25" height="25" style={{ opacity: 0.5, margin: '1rem auto', display: 'block' }}>
    <path d="M15 10 C10 0 0 10 15 25 C30 10 20 0 15 10 Z" stroke="var(--color-accent-pink)" strokeWidth="2" fill="none" strokeLinejoin="round" />
  </svg>
);

const MiniStar = () => (
  <svg viewBox="0 0 30 30" width="25" height="25" style={{ position: 'absolute', bottom: '-10px', left: '-15px', opacity: 0.5, transform: 'rotate(-10deg)', zIndex: 3 }}>
    <path d="M15 0 L18 10 L28 12 L20 18 L22 28 L15 22 L8 28 L10 18 L2 12 L12 10 Z" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
  </svg>
);

const PulsingHeart = () => (
  <svg viewBox="0 0 100 100" width="100" height="100" style={{ opacity: 0.9 }} className="pulsing-heart animate-item">
    <path d="M50 30 C35 10 10 25 50 80 C90 25 65 10 50 30 Z" stroke="var(--color-accent-pink)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 40 C40 25 22 35 50 72 C78 35 60 25 50 40 Z" fill="rgba(209, 130, 153, 0.15)" stroke="none" />
  </svg>
);

export default function Story() {
  const containerRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.story-section');
      
      sections.forEach((section) => {
        const elements = section.querySelectorAll('.animate-item');
        
        if (elements.length > 0) {
          gsap.fromTo(elements, 
            { opacity: 0, y: 30 }, // Menos desplazamiento = más orgánico y menos saltos
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.1, 
              scrollTrigger: {
                trigger: section,
                start: "top 85%", 
                end: "center center",
                scrub: 1, 
              }
            }
          );
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  // Alturas ajustadas para asegurar flujo constante sin baches negros ni blancos
  return (
    <div className="story-container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '2vh', paddingBottom: '15vh', paddingTop: '10vh' }}>
      
      {/* Chapter 1 */}
      <section className="story-section" style={{ minHeight: '35vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <p className="animate-item serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', maxWidth: '600px' }}>
          Hay cosas que uno lleva guardadas por un buen tiempo...
        </p>
      </section>

      {/* Chapter 2 */}
      <section className="story-section" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', maxWidth: '600px' }}>
          Y poco a poco, casi sin darme cuenta, te fuiste convirtiendo en mi parte favorita de los días.
        </p>
        <div className="animate-item"><MiniHeart /></div>
      </section>

      {/* Chapter 3 */}
      <section className="story-section" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>Risa a risa, momento a momento...</p>
      </section>

      {/* Chapter 4: Memories Begin (With Photos) */}
      <section className="story-section" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-2.5deg)' }}>
          <div className="tape"></div>
          <MiniFlower />
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo Placeholder" />
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', maxWidth: '550px', marginTop: '1.5rem' }}>
          Los recuerdos empezaron a tener tu nombre.
        </p>
      </section>

      {/* Chapter 5: More Memories */}
      <section className="story-section" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-item photo-frame frame-square" style={{ transform: 'rotate(3deg)' }}>
            <div className="tape" style={{ top: '-10px', left: '20%', transform: 'rotate(-5deg)' }}></div>
            <img src="/images/memory_flowers_1783099963205.png" alt="Recuerdo flores Placeholder" />
          </div>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-4deg)', marginTop: '2rem' }}>
            <div className="tape" style={{ top: '-8px' }}></div>
            <MiniStar />
            <img src="/images/memory_coffee_1783099989172.png" alt="Recuerdo café Placeholder" />
          </div>
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', maxWidth: '650px', marginTop: '2.5rem' }}>
          Coleccionando instantes, charlas largas y miradas que lo dicen todo.
        </p>
      </section>

      {/* Chapter 6: Video memory */}
      <section className="story-section" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <div className="animate-item photo-frame frame-horizontal" style={{ transform: 'rotate(-1.5deg)' }}>
          <div className="tape"></div>
          <video src="https://media.w3.org/2010/05/sintel/trailer.mp4" autoPlay loop muted playsInline />
        </div>
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center', marginTop: '1.5rem' }}>Construyendo nuestra propia historia, a nuestro propio ritmo.</p>
      </section>

      {/* Chapter 7: Final Photo */}
      <section className="story-section" style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(2deg)' }}>
          <div className="tape"></div>
          <MiniFlower />
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo Placeholder" />
        </div>
        <div className="animate-item serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textAlign: 'center', maxWidth: '750px', lineHeight: '1.6' }}>
          Porque hay personas que llegan y simplemente cambian la forma en que vemos el mundo.
        </div>
      </section>

      {/* Chapter 8: Expectation / Pause */}
      <section className="story-section climax-trigger" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <PulsingHeart />
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '1rem', textAlign: 'center' }}>
          Así que, después de todo este camino recorrido...
        </p>
      </section>
    </div>
  );
}
