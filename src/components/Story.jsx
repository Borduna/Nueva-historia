import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Envelope = () => (
  <svg viewBox="0 0 100 100" width="120" height="120" style={{ opacity: 0.8 }}>
    <path d="M15 30 L85 30 L85 70 L15 70 Z" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 30 L50 55 L85 30" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 70 L45 50" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M85 70 L55 50" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="55" r="4" fill="var(--color-text-main)" opacity="0.8" />
  </svg>
);

const HandFlower = () => (
  <svg viewBox="0 0 100 100" width="100" height="100" style={{ opacity: 0.8 }}>
    <path d="M50 80 Q52 65 50 50" stroke="var(--color-text-muted)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M50 50 C30 55 40 30 50 50" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" />
    <path d="M50 50 C70 55 60 30 50 50" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" />
    <path d="M50 50 C35 35 50 20 50 50" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" />
    <path d="M50 50 C65 35 50 20 50 50" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" />
  </svg>
);

const CoffeeCups = () => (
  <svg viewBox="0 0 100 100" width="120" height="120" style={{ opacity: 0.8 }}>
    <path d="M30 50 C30 65 45 65 45 50 Z" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" />
    <path d="M45 53 C49 53 49 57 45 57" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" />
    <path d="M55 50 C55 65 70 65 70 50 Z" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" />
    <path d="M55 53 C51 53 51 57 55 57" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" />
    <path d="M35 40 Q38 35 35 30" stroke="var(--color-text-muted)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M41 42 Q44 37 41 32" stroke="var(--color-text-muted)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M59 42 Q62 37 59 32" stroke="var(--color-text-muted)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M65 40 Q68 35 65 30" stroke="var(--color-text-muted)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M22 63 Q50 67 78 63" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const PulsingHeart = () => (
  <svg viewBox="0 0 100 100" width="100" height="100" style={{ opacity: 0.9 }} className="pulsing-heart animate-item">
    <path d="M50 30 C35 10 10 25 50 80 C90 25 65 10 50 30 Z" stroke="var(--color-accent-gold)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 40 C40 25 22 35 50 72 C78 35 60 25 50 40 Z" fill="rgba(226, 197, 131, 0.15)" stroke="none" />
  </svg>
);

export default function Story() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Lock ScrollTrigger resize calculations for mobile scrollbar hide/show stability
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.story-section');
      
      sections.forEach((section) => {
        const elements = section.querySelectorAll('.animate-item');
        
        if (elements.length > 0) {
          gsap.fromTo(elements, 
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.12, 
              scrollTrigger: {
                trigger: section,
                start: "top 95%", 
                end: "center center",
                scrub: 1, 
              }
            }
          );
        }
      });
    }, containerRef);

    // Refresh layout heights dynamically on component load
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div className="story-container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '5vh', paddingBottom: '10vh' }}>
      
      {/* Chapter 1: Curiosity */}
      <section className="story-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <p className="animate-item serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', maxWidth: '600px' }}>
          Hay cosas que uno lleva guardadas por un buen tiempo...
        </p>
        <div className="animate-item">
          <Envelope />
        </div>
      </section>

      {/* Chapter 2: Curiosity 2 */}
      <section className="story-section" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <div className="animate-item">
          <HandFlower />
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', maxWidth: '600px' }}>
          Y poco a poco, casi sin darme cuenta, te fuiste convirtiendo en mi parte favorita de los días.
        </p>
      </section>

      {/* Chapter 3: Curiosity 3 */}
      <section className="story-section" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>Risa a risa, momento a momento...</p>
        <div className="animate-item">
          <CoffeeCups />
        </div>
      </section>

      {/* Chapter 4: Memories Begin */}
      <section className="story-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-2.5deg)' }}>
          <div className="tape"></div>
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo" />
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', maxWidth: '550px' }}>
          Los recuerdos empezaron a tener tu nombre.
        </p>
      </section>

      {/* Chapter 5: More Memories */}
      <section className="story-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4rem', padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', alignItems: 'center' }}>
          <div className="animate-item photo-frame frame-square" style={{ transform: 'rotate(-3deg)' }}>
            <div className="tape" style={{ top: '-10px', left: '20%', transform: 'rotate(-5deg)' }}></div>
            <img src="/images/memory_flowers_1783099963205.png" alt="Recuerdo flores" />
          </div>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(4deg)', marginTop: '4rem' }}>
            <div className="tape" style={{ top: '-8px' }}></div>
            <img src="/images/memory_coffee_1783099989172.png" alt="Recuerdo café" />
          </div>
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textAlign: 'center', maxWidth: '650px', marginTop: '2rem' }}>
          Coleccionando instantes, charlas largas y miradas que lo dicen todo.
        </p>
      </section>

      {/* Chapter 6: Video memory */}
      <section className="story-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <div className="animate-item photo-frame frame-horizontal" style={{ transform: 'rotate(-1.5deg)' }}>
          <div className="tape"></div>
          <video src="https://media.w3.org/2010/05/sintel/trailer.mp4" autoPlay loop muted playsInline />
        </div>
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', textAlign: 'center' }}>Construyendo nuestra propia historia, a nuestro propio ritmo.</p>
      </section>

      {/* Chapter 7: Final Photo */}
      <section className="story-section" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4rem', padding: '2rem' }}>
        <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(2deg)' }}>
          <div className="tape"></div>
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo" />
        </div>
        <div className="animate-item serif" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', textAlign: 'center', maxWidth: '750px', lineHeight: '1.6' }}>
          Porque hay personas que llegan y simplemente cambian la forma en que vemos el mundo.
        </div>
      </section>

      {/* Chapter 8: Expectation / Pause */}
      <section className="story-section climax-trigger" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4rem', padding: '2rem' }}>
        <PulsingHeart />
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '2rem', textAlign: 'center' }}>
          Así que, después de todo este camino recorrido...
        </p>
      </section>
    </div>
  );
}
