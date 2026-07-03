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
        const texts = section.querySelectorAll('.animate-text');
        const images = section.querySelectorAll('.animate-image');
        
        if (texts.length > 0) {
          gsap.fromTo(texts, 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1.5, 
              stagger: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        if (images.length > 0) {
          gsap.fromTo(images, 
            { opacity: 0, y: 50, scale: 0.95 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 2, 
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="story-container" ref={containerRef}>
      {/* Intro */}
      <section className="story-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="animate-text serif" style={{ fontSize: '2rem', textAlign: 'center' }}>
          La noche está tranquila...<br/><span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginTop: '2rem', display: 'block' }}>(Haz scroll suavemente)</span>
        </p>
      </section>

      {/* Memory 1 */}
      <section className="story-section" style={{ height: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
        <div className="animate-image glass" style={{ padding: '1rem', borderRadius: '4px', transform: 'rotate(-2deg)' }}>
          <img src="/images/memory_hands_1783099932592.png" alt="Recuerdo" style={{ width: '300px', height: '350px', objectFit: 'cover', borderRadius: '2px' }} />
        </div>
        <p className="animate-text sans" style={{ fontSize: '1.2rem', maxWidth: '400px', textAlign: 'center', lineHeight: '2' }}>
          Hay momentos que se quedan guardados en el tiempo, como estrellas en el firmamento.
        </p>
      </section>

      {/* Memory 2 */}
      <section className="story-section" style={{ height: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
        <p className="animate-text serif" style={{ fontSize: '1.8rem', maxWidth: '500px', textAlign: 'center', lineHeight: '1.6' }}>
          Pequeños instantes que, sin darnos cuenta, lo cambian todo.
        </p>
        <div className="animate-image glass" style={{ padding: '1rem', borderRadius: '4px', transform: 'rotate(3deg)' }}>
          <img src="/images/memory_flowers_1783099963205.png" alt="Recuerdo" style={{ width: '300px', height: '350px', objectFit: 'cover', borderRadius: '2px' }} />
        </div>
      </section>

      {/* Memory 3 */}
      <section className="story-section" style={{ height: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3rem' }}>
        <div className="animate-image glass" style={{ padding: '1rem', borderRadius: '4px', transform: 'rotate(-1deg)' }}>
          <img src="/images/memory_coffee_1783099989172.png" alt="Recuerdo" style={{ width: '400px', height: '250px', objectFit: 'cover', borderRadius: '2px' }} />
        </div>
        <p className="animate-text sans" style={{ fontSize: '1.2rem', maxWidth: '400px', textAlign: 'center', lineHeight: '2' }}>
          Cada risa, cada silencio compartido.
        </p>
      </section>

      {/* Climax Pre-Question */}
      <section className="story-section climax-trigger" style={{ height: '150vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p className="animate-text serif" style={{ fontSize: '2.5rem', textAlign: 'center' }}>
          Las mejores historias nunca comienzan con una respuesta.
        </p>
        <p className="animate-text sans" style={{ fontSize: '1.2rem', textAlign: 'center', marginTop: '5rem', color: 'var(--color-accent-gold)' }}>
          Comienzan con una pregunta.
        </p>
      </section>
    </div>
  );
}
