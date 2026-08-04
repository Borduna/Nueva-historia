import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiveCounter from './LiveCounter';
import { 
  DoodleHoldingHands, 
  DoodleWalking, 
  DoodleKiss, 
  DoodleSitting, 
  DoodleCelebrating, 
  DoodleTogether, 
  DoodleHeart 
} from './CrayolaDoodles';
import { primerMesData } from '../data/primerMesData';

gsap.registerPlugin(ScrollTrigger);

const MiniFlower = ({ style }) => (
  <svg viewBox="0 0 50 50" width="35" height="35" style={{ position: 'absolute', top: '-15px', right: '-15px', opacity: 0.6, transform: 'rotate(15deg)', zIndex: 3, ...style }}>
    <path d="M25 25 Q15 15 25 5 Q35 15 25 25" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M25 25 Q15 35 5 25 Q15 15 25 25" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M25 25 Q35 35 45 25 Q35 15 25 25" stroke="var(--color-accent-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="25" cy="25" r="3" fill="var(--color-accent-pink)" opacity="0.8" />
  </svg>
);

const MiniStar = ({ style }) => (
  <svg viewBox="0 0 30 30" width="25" height="25" style={{ position: 'absolute', bottom: '-10px', left: '-15px', opacity: 0.5, transform: 'rotate(-10deg)', zIndex: 3, ...style }}>
    <path d="M15 0 L18 10 L28 12 L20 18 L22 28 L15 22 L8 28 L10 18 L2 12 L12 10 Z" stroke="var(--color-accent-gold)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
  </svg>
);

const MiniHeart = () => (
  <svg viewBox="0 0 30 30" width="25" height="25" style={{ opacity: 0.6, margin: '0 auto', display: 'block' }}>
    <path d="M15 10 C10 0 0 10 15 25 C30 10 20 0 15 10 Z" stroke="var(--color-accent-pink)" strokeWidth="2" fill="none" strokeLinejoin="round" />
  </svg>
);

export default function PrimerMes({ onVideoPlay, onVideoPause, onVideoEnded, onBackToMenu }) {
  const containerRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.primer-mes-section');

      sections.forEach((section) => {
        const elements = section.querySelectorAll('.animate-item');

        if (elements.length > 0) {
          gsap.fromTo(elements,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "center 45%",
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

  return (
    <div className="story-container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '12vh', paddingTop: '6vh' }}>
      
      {/* 1. Portada del Capítulo */}
      <section className="primer-mes-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', textAlign: 'center', position: 'relative' }}>
        <DoodleHoldingHands style={{ top: '5%', right: '12%', transform: 'rotate(8deg)' }} />
        <h1 className="serif animate-item" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: 'var(--color-text-main)', marginBottom: '0.8rem', letterSpacing: '0.02em' }}>
          {primerMesData.header.title}
        </h1>
        <p className="handwritten animate-item" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--color-accent-gold)', maxWidth: '650px', lineHeight: 1.4 }}>
          {primerMesData.header.subtitle}
        </p>
      </section>

      {/* 2. Frase de Apertura muy destacada */}
      <section className="primer-mes-section" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <DoodleKiss style={{ top: '10%', left: '10%', transform: 'rotate(-8deg)' }} />
        <div className="animate-item" style={{ maxWidth: '750px', padding: '1.5rem', borderLeft: '2px solid var(--color-accent-gold)', borderRight: '2px solid var(--color-accent-gold)', borderRadius: '12px' }}>
          <p className="serif" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontStyle: 'italic', color: 'var(--color-text-main)', lineHeight: 1.4 }}>
            "{primerMesData.header.openingQuote}"
          </p>
        </div>
        <div className="animate-item" style={{ marginTop: '1.5rem' }}>
          <MiniHeart />
        </div>
      </section>

      {/* Contador en Vivo */}
      <section className="primer-mes-section" style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <LiveCounter />
      </section>

      {/* 3. Video 1: Apertura */}
      <section className="primer-mes-section" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <DoodleWalking style={{ top: '2%', right: '10%', transform: 'rotate(5deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-1.5deg)', position: 'relative' }}>
            <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-3deg)' }}></div>
            <MiniFlower />
            <video 
              src="/multimedia-1-mes/video-1.mov" 
              controls 
              playsInline 
              preload="metadata"
              onPlay={onVideoPlay}
              onPause={onVideoPause}
              onEnded={onVideoEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '2px' }}
            >
              <source src="/multimedia-1-mes/video-1.mov" type="video/quicktime" />
              <source src="/multimedia-1-mes/video-1.mov" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* 4. Primera Parte del Recorrido: Fotos 1 a 4 */}
      
      {/* Foto 1 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(2deg)', marginLeft: '8%' }}>
            <div className="tape" style={{ top: '-10px', left: '30%', transform: 'rotate(-4deg)' }}></div>
            <img src="/multimedia-1-mes/1.jpg" alt="Recuerdo 1" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Foto 2 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-2.5deg)', marginRight: '8%' }}>
            <div className="tape" style={{ top: '-10px', right: '25%', transform: 'rotate(3deg)' }}></div>
            <MiniStar />
            <img src="/multimedia-1-mes/2.jpg" alt="Recuerdo 2" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Foto 3 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <DoodleSitting style={{ top: '5%', left: '8%', transform: 'rotate(-6deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-square" style={{ transform: 'rotate(1.5deg)' }}>
            <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
            <MiniFlower />
            <img src="/multimedia-1-mes/3.jpg" alt="Recuerdo 3" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Foto 4 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-1deg)' }}>
            <div className="tape" style={{ top: '-10px', left: '20%', transform: 'rotate(-3deg)' }}></div>
            <img src="/multimedia-1-mes/4.jpg" alt="Recuerdo 4" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 5. Video 2: Intermedio (~15 segundos, Pausa Emocional) */}
      <section className="primer-mes-section" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <DoodleHeart style={{ top: '2%', right: '8%', transform: 'rotate(6deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(2deg)', position: 'relative' }}>
            <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}></div>
            <video 
              src="/multimedia-1-mes/video-2.mp4" 
              controls 
              playsInline 
              preload="metadata"
              onPlay={onVideoPlay}
              onPause={onVideoPause}
              onEnded={onVideoEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '2px' }}
            />
          </div>
        </div>
      </section>

      {/* 6. Segunda Parte del Recorrido: Fotos 5 a 8 */}

      {/* Foto 5 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-2deg)', marginLeft: '10%' }}>
            <div className="tape" style={{ top: '-10px', left: '25%', transform: 'rotate(4deg)' }}></div>
            <MiniStar />
            <img src="/multimedia-1-mes/5.jpg" alt="Recuerdo 5" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Foto 6 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <DoodleKiss style={{ top: '8%', right: '12%', transform: 'rotate(10deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(2.5deg)', marginRight: '10%' }}>
            <div className="tape" style={{ top: '-10px', right: '30%', transform: 'rotate(-3deg)' }}></div>
            <img src="/multimedia-1-mes/6.jpg" alt="Recuerdo 6" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Foto 7 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-square" style={{ transform: 'rotate(-1.5deg)' }}>
            <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
            <MiniFlower />
            <img src="/multimedia-1-mes/7.jpg" alt="Recuerdo 7" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Foto 8 */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '750px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(1deg)' }}>
            <div className="tape" style={{ top: '-10px', left: '25%', transform: 'rotate(-4deg)' }}></div>
            <img src="/multimedia-1-mes/8.jpg" alt="Recuerdo 8" loading="lazy" />
          </div>
        </div>
      </section>

      {/* 7. Video 3: Cierre Audiovisual */}
      <section className="primer-mes-section" style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative' }}>
        <DoodleTogether style={{ top: '2%', left: '8%', transform: 'rotate(-5deg)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '800px', width: '100%' }}>
          <div className="animate-item photo-frame frame-vertical" style={{ transform: 'rotate(-1deg)', position: 'relative' }}>
            <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
            <MiniFlower />
            <video 
              src="/multimedia-1-mes/video-3.mp4" 
              controls 
              playsInline 
              preload="metadata"
              onPlay={onVideoPlay}
              onPause={onVideoPause}
              onEnded={onVideoEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '2px' }}
            />
          </div>
        </div>
      </section>

      {/* 8. Cierre Emotivo Final */}
      <section className="primer-mes-section" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center', position: 'relative' }}>
        <DoodleCelebrating style={{ top: '5%', right: '10%', transform: 'rotate(12deg)' }} />
        <div className="animate-item" style={{ maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            {primerMesData.closing.message}
          </p>
          <p className="handwritten" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', color: 'var(--color-accent-gold)' }}>
            {primerMesData.closing.dedication}
          </p>
          {onBackToMenu && (
            <div style={{ marginTop: '3rem' }}>
              <button 
                className="btn-elegant" 
                onClick={onBackToMenu}
                style={{ fontSize: '1.3rem', padding: '0.8rem 2.5rem' }}
              >
                ← Volver a los capítulos
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
