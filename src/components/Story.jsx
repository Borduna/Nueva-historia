import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.story-section');
      
      sections.forEach((section) => {
        const elements = section.querySelectorAll('.animate-item');
        
        if (elements.length > 0) {
          // Animation is 100% tied to scroll progression (scrub: true)
          // No fixed durations, no empty waiting times.
          gsap.fromTo(elements, 
            { opacity: 0, y: 100 },
            { 
              opacity: 1, 
              y: 0, 
              stagger: 0.1, 
              scrollTrigger: {
                trigger: section,
                start: "top 95%", // Starts appearing as soon as it enters the bottom screen
                end: "center center", // Fully visible when it hits the center
                scrub: 1, // Smooth native scrubbing
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="story-container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: '10vh', paddingBottom: '10vh' }}>
      
      {/* Chapter 1 */}
      <section className="story-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <p className="animate-item serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', maxWidth: '600px' }}>
          Todo comienza con una noche tranquila...
        </p>
        <div className="animate-item handwritten" style={{ fontSize: '2.5rem' }}>
          y un cielo lleno de posibilidades.
        </div>
      </section>

      {/* Chapter 2 */}
      <section className="story-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <div className="animate-item photo-frame" style={{ maxWidth: '350px', transform: 'rotate(-2deg)' }}>
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo" />
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', maxWidth: '500px' }}>
          Pequeños instantes que al principio parecen cotidianos, pero luego se vuelven inolvidables.
        </p>
      </section>

      {/* Chapter 3 */}
      <section className="story-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Como una brisa de verano...</p>
        <div className="animate-item photo-frame" style={{ maxWidth: '500px', transform: 'rotate(1deg)' }}>
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay loop muted playsInline />
        </div>
      </section>

      {/* Chapter 4 */}
      <section className="story-section" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <div className="animate-item photo-frame" style={{ maxWidth: '280px', transform: 'rotate(-3deg)' }}>
            <img src="/images/memory_flowers_1783099963205.png" alt="Recuerdo flores" />
          </div>
          <div className="animate-item photo-frame" style={{ maxWidth: '300px', transform: 'rotate(2deg)', marginTop: '2rem' }}>
            <img src="/images/memory_coffee_1783099989172.png" alt="Recuerdo café" />
          </div>
        </div>
        <p className="animate-item serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', textAlign: 'center', maxWidth: '600px', marginTop: '1rem' }}>
          Coleccionando sonrisas y cafés a media tarde.
        </p>
      </section>

      {/* Chapter 5 */}
      <section className="story-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        <div className="animate-item photo-frame" style={{ maxWidth: '450px', transform: 'rotate(-1deg)' }}>
          <video src="https://media.w3.org/2010/05/sintel/trailer.mp4" autoPlay loop muted playsInline />
        </div>
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>Escribiendo nuestra propia aventura.</p>
      </section>

      {/* Chapter 6 */}
      <section className="story-section climax-trigger" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem', padding: '2rem' }}>
        <div className="animate-item photo-frame" style={{ maxWidth: '350px' }}>
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo" />
        </div>
        
        <div className="animate-item serif" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', textAlign: 'center', maxWidth: '750px', lineHeight: '1.6' }}>
          Las mejores historias no son aquellas que están escritas en los libros, sino las que se construyen día a día con paciencia, cariño y la certeza de querer compartir el camino.
        </div>
        
        <p className="animate-item handwritten" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginTop: '2rem' }}>
          Y esta historia apenas comienza.
        </p>
      </section>
    </div>
  );
}
