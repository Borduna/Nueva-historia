import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiveCounter from './LiveCounter';
import { 
  DoodleHoldingHands, 
  DoodleOpenBook, 
  DoodleKiss, 
  DoodleCompassMoon, 
  DoodleHomeCoffee, 
  DoodleHugging, 
  DoodleHeart, 
  DoodleCelebrating,
  MiniFlower, 
  MiniStar, 
  MiniHeart 
} from './CrayolaDoodles';
import { primerMesData } from '../data/primerMesData';

gsap.registerPlugin(ScrollTrigger);

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
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                end: "center 50%",
                scrub: 0.8,
              }
            }
          );
        }
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  const renderDoodle = (doodleType) => {
    switch (doodleType) {
      case 'holding-hands':
        return <DoodleHoldingHands style={{ margin: '1rem auto 0.4rem auto', display: 'block' }} width={105} height={75} />;
      case 'open-book':
        return <DoodleOpenBook style={{ margin: '1rem auto 0.4rem auto', display: 'block' }} width={90} height={70} />;
      case 'kiss':
        return <DoodleKiss style={{ margin: '1rem auto 0.4rem auto', display: 'block' }} width={90} height={75} />;
      case 'compass-moon':
        return <DoodleCompassMoon style={{ margin: '1rem auto 0.4rem auto', display: 'block' }} width={95} height={70} />;
      case 'home-coffee':
        return <DoodleHomeCoffee style={{ margin: '1rem auto 0.4rem auto', display: 'block' }} width={105} height={75} />;
      case 'hugging':
        return <DoodleHugging style={{ margin: '1rem auto 0.4rem auto', display: 'block' }} width={110} height={85} />;
      default:
        return null;
    }
  };

  return (
    <div className="story-container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '8vh', paddingTop: '3vh' }}>
      
      {/* 1. Portada del Capítulo */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '2.8rem 1.2rem 1.8rem 1.2rem', textAlign: 'center', position: 'relative' }}>
        <DoodleHeart style={{ top: '-10px', right: '5%', position: 'absolute', transform: 'rotate(8deg)' }} width={75} height={65} />
        <h1 className="serif animate-item" style={{ fontSize: 'clamp(2.6rem, 6.2vw, 4.8rem)', color: 'var(--color-text-main)', marginBottom: '0.6rem', letterSpacing: '0.02em', lineHeight: 1.15 }}>
          {primerMesData.header.title}
        </h1>
        <p className="handwritten animate-item" style={{ fontSize: 'clamp(1.4rem, 3.8vw, 2.2rem)', color: 'var(--color-accent-gold)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.35 }}>
          {primerMesData.header.subtitle}
        </p>
      </section>

      {/* 2. Frase de Apertura muy destacada */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '1.8rem 1.2rem', textAlign: 'center', position: 'relative' }}>
        <div className="animate-item quote-highlight-box" style={{ maxWidth: '720px', width: '92vw', margin: '0 auto', padding: '1.8rem 1.4rem', borderLeft: '3px solid var(--color-accent-gold)', borderRight: '3px solid var(--color-accent-gold)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(4px)' }}>
          <p className="serif" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontStyle: 'italic', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
            "{primerMesData.header.openingQuote}"
          </p>
        </div>
        <div className="animate-item" style={{ marginTop: '1rem' }}>
          <MiniHeart color="#d18299" size={24} />
        </div>
      </section>

      {/* 3. Contador en Vivo */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '0.8rem 0.5rem 1.8rem 0.5rem' }}>
        <LiveCounter />
      </section>

      {/* 4. Recorrido secuencial dinámico de todos los elementos */}
      {primerMesData.items.map((item, index) => {
        
        // Elementos de Video
        if (item.type === 'video') {
          return (
            <section key={item.id || `item-${index}`} className="primer-mes-section" style={{ minHeight: 'auto', padding: '2.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="video-card-wrapper animate-item" style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="photo-frame frame-video" style={{ width: '100%', position: 'relative' }}>
                  <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}></div>
                  {index % 2 === 0 ? <MiniFlower /> : <MiniStar />}
                  
                  <div className="video-container" style={{ width: '100%', borderRadius: '4px', overflow: 'hidden', background: '#000' }}>
                    <video 
                      src={item.src} 
                      controls 
                      playsInline 
                      preload="metadata"
                      onPlay={onVideoPlay}
                      onPause={onVideoPause}
                      onEnded={onVideoEnded}
                      style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block' }}
                    >
                      <source src={item.src} type={item.src.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                    </video>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Elementos de Foto
        if (item.type === 'photo') {
          const rotation = item.rotation || '0deg';
          const isSquare = item.orientation === 'square';
          return (
            <section key={item.id || `item-${index}`} className="primer-mes-section" style={{ minHeight: 'auto', padding: '1.8rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="photo-card-wrapper animate-item" style={{ width: '100%', maxWidth: isSquare ? '420px' : '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  className={`photo-frame ${isSquare ? 'frame-square' : 'frame-vertical'}`} 
                  style={{ transform: `rotate(${rotation})`, position: 'relative', width: '100%' }}
                >
                  <div className="tape" style={{ top: '-11px', left: '50%', transform: `translateX(-50%) rotate(${parseFloat(rotation) > 0 ? '-3deg' : '3deg'})` }}></div>
                  {index % 3 === 0 ? <MiniFlower /> : (index % 3 === 1 ? <MiniStar /> : null)}
                  <img 
                    src={item.src} 
                    alt={item.alt || `Recuerdo ${index + 1}`} 
                    loading="lazy" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </section>
          );
        }

        // Elementos de Texto
        if (item.type === 'text') {
          return (
            <section key={item.id || `item-${index}`} className="primer-mes-section" style={{ minHeight: 'auto', padding: '1.6rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="animate-item" style={{ width: '100%', maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
                
                {/* 1. Frases Cortas (short-quote) */}
                {item.styleType === 'short-quote' && (
                  <div className="quote-card" style={{ 
                    background: '#ffffff', 
                    padding: '1.8rem 1.5rem', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 20px rgba(50, 45, 40, 0.08)', 
                    border: '1px solid rgba(194, 153, 76, 0.22)', 
                    position: 'relative',
                    textAlign: 'center'
                  }}>
                    <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(1deg)' }}></div>
                    <p className="serif" style={{ 
                      fontSize: 'clamp(1.35rem, 3.8vw, 1.85rem)', 
                      color: 'var(--color-text-main)', 
                      lineHeight: 1.65, 
                      fontStyle: 'italic',
                      margin: 0
                    }}>
                      "{item.text}"
                    </p>
                    {item.doodle && renderDoodle(item.doodle)}
                  </div>
                )}

                {/* 2. Tarjetas de Prosa Completa (prose-card) */}
                {item.styleType === 'prose-card' && (
                  <div className="prose-card" style={{ 
                    background: '#ffffff', 
                    padding: '2rem 1.6rem', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 22px rgba(50, 45, 40, 0.08)', 
                    border: '1px solid rgba(194, 153, 76, 0.2)', 
                    borderLeft: '4px solid var(--color-accent-gold)',
                    position: 'relative',
                    textAlign: 'left'
                  }}>
                    <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
                    {item.paragraphs && item.paragraphs.map((paragraph, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="serif" 
                        style={{ 
                          fontSize: 'clamp(1.12rem, 3.4vw, 1.32rem)', 
                          color: 'var(--color-text-main)', 
                          lineHeight: 1.8, 
                          marginBottom: pIdx < item.paragraphs.length - 1 ? '1.2rem' : '0',
                          textAlign: 'left'
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                    {item.doodle && renderDoodle(item.doodle)}
                  </div>
                )}

                {/* 3. Bloques del Poema (poem-block) */}
                {item.styleType === 'poem-block' && (
                  <div className="poem-card" style={{ 
                    background: '#ffffff', 
                    padding: '2rem 1.6rem', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 20px rgba(50, 45, 40, 0.08)', 
                    border: '1px solid rgba(194, 153, 76, 0.2)', 
                    position: 'relative',
                    textAlign: 'center'
                  }}>
                    <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(1deg)' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'center' }}>
                      {item.lines && item.lines.map((line, lIdx) => (
                        <p 
                          key={lIdx} 
                          className="serif" 
                          style={{ 
                            fontSize: 'clamp(1.15rem, 3.5vw, 1.38rem)', 
                            color: 'var(--color-text-main)', 
                            lineHeight: 1.75, 
                            margin: 0,
                            fontStyle: 'italic',
                            textAlign: 'center'
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                    {item.doodle && renderDoodle(item.doodle)}
                  </div>
                )}

              </div>
            </section>
          );
        }

        return null;
      })}

      {/* 5. Cierre Emotivo Completo Después del Video 3 */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '3rem 1.2rem 2.5rem 1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="animate-item" style={{ width: '100%', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '1.8rem', alignItems: 'center' }}>
          
          <DoodleCelebrating style={{ margin: '0 auto' }} width={85} height={75} />

          {/* Bloques visuales que contienen el 100% del texto de cierre */}
          {primerMesData.closing.blocks.map((blockText, bIdx) => (
            <div 
              key={bIdx} 
              className="closing-block-card" 
              style={{ 
                background: '#ffffff', 
                padding: '1.8rem 1.5rem', 
                borderRadius: '8px', 
                boxShadow: '0 4px 18px rgba(50, 45, 40, 0.08)', 
                border: '1px solid rgba(194, 153, 76, 0.18)', 
                width: '100%',
                position: 'relative',
                boxSizing: 'border-box'
              }}
            >
              <div className="tape" style={{ top: '-11px', left: '50%', transform: `translateX(-50%) rotate(${bIdx % 2 === 0 ? '-1deg' : '1.5deg'})` }}></div>
              <p className="serif" style={{ 
                fontSize: 'clamp(1.12rem, 3.4vw, 1.32rem)', 
                color: 'var(--color-text-main)', 
                lineHeight: 1.82, 
                textAlign: 'left',
                margin: 0
              }}>
                {blockText}
              </p>
            </div>
          ))}

          {/* Ilustración de abrazo y dedicatoria final */}
          <div style={{ margin: '1rem auto 0 auto', textAlign: 'center' }}>
            <DoodleHugging width={120} height={95} />
            <p className="handwritten" style={{ 
              fontSize: 'clamp(2.2rem, 5.8vw, 3.8rem)', 
              color: 'var(--color-accent-gold)', 
              letterSpacing: '0.04em',
              marginTop: '1.2rem',
              lineHeight: 1.2
            }}>
              {primerMesData.closing.finalLine}
            </p>
          </div>

          {onBackToMenu && (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button 
                className="btn-elegant" 
                onClick={onBackToMenu}
                style={{ fontSize: '1.2rem', padding: '0.8rem 2.2rem', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
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
