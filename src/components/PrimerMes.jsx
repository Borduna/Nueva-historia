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
            { opacity: 0, y: 30 },
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
        return <DoodleHoldingHands style={{ margin: '0.8rem auto', display: 'block' }} width={110} height={80} />;
      case 'open-book':
        return <DoodleOpenBook style={{ margin: '0.8rem auto', display: 'block' }} width={95} height={75} />;
      case 'kiss':
        return <DoodleKiss style={{ margin: '0.8rem auto', display: 'block' }} width={95} height={80} />;
      case 'compass-moon':
        return <DoodleCompassMoon style={{ margin: '0.8rem auto', display: 'block' }} width={100} height={75} />;
      case 'home-coffee':
        return <DoodleHomeCoffee style={{ margin: '0.8rem auto', display: 'block' }} width={115} height={80} />;
      case 'hugging':
        return <DoodleHugging style={{ margin: '1rem auto', display: 'block' }} width={105} height={85} />;
      default:
        return null;
    }
  };

  return (
    <div className="story-container" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '10vh', paddingTop: '4vh' }}>
      
      {/* 1. Portada del Capítulo */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '3rem 1.2rem 2rem 1.2rem', textAlign: 'center', position: 'relative' }}>
        <DoodleHeart style={{ top: '-10px', right: '5%', position: 'absolute', transform: 'rotate(8deg)' }} width={80} height={70} />
        <h1 className="serif animate-item" style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', color: 'var(--color-text-main)', marginBottom: '0.6rem', letterSpacing: '0.02em', lineHeight: 1.15 }}>
          {primerMesData.header.title}
        </h1>
        <p className="handwritten animate-item" style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2.3rem)', color: 'var(--color-accent-gold)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.35 }}>
          {primerMesData.header.subtitle}
        </p>
      </section>

      {/* 2. Frase de Apertura muy destacada */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '2rem 1.2rem', textAlign: 'center', position: 'relative' }}>
        <div className="animate-item quote-highlight-box" style={{ maxWidth: '720px', margin: '0 auto', padding: '1.8rem 1.4rem', borderLeft: '3px solid var(--color-accent-gold)', borderRight: '3px solid var(--color-accent-gold)', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(4px)' }}>
          <p className="serif" style={{ fontSize: 'clamp(1.8rem, 4.2vw, 3rem)', fontStyle: 'italic', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
            "{primerMesData.header.openingQuote}"
          </p>
        </div>
        <div className="animate-item" style={{ marginTop: '1.2rem' }}>
          <MiniHeart color="#d18299" size={26} />
        </div>
      </section>

      {/* Contador en Vivo */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '1rem 0.5rem 2rem 0.5rem' }}>
        <LiveCounter />
      </section>

      {/* Recorrido secuencial dinámico de todos los elementos */}
      {primerMesData.items.map((item, index) => {
        if (item.type === 'video') {
          return (
            <section key={item.id || index} className="primer-mes-section" style={{ minHeight: 'auto', padding: '2.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="video-card-wrapper animate-item" style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="photo-frame frame-video" style={{ width: '100%', position: 'relative' }}>
                  <div className="tape" style={{ top: '-12px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}></div>
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
                {item.title && (
                  <p className="handwritten" style={{ marginTop: '0.8rem', fontSize: '1.3rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    {item.title}
                  </p>
                )}
              </div>
            </section>
          );
        }

        if (item.type === 'photo') {
          const rotation = item.rotation || '0deg';
          const isSquare = item.orientation === 'square';
          return (
            <section key={item.id || index} className="primer-mes-section" style={{ minHeight: 'auto', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

        if (item.type === 'text') {
          return (
            <section key={item.id || index} className="primer-mes-section" style={{ minHeight: 'auto', padding: '1.8rem 1.2rem', textAlign: 'center' }}>
              <div className="animate-item text-milestone-card" style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
                
                {/* StyleType: quote-card */}
                {item.styleType === 'quote-card' && (
                  <div className="quote-card" style={{ background: '#ffffff', padding: '1.6rem 1.4rem', borderRadius: '8px', boxShadow: '0 4px 18px rgba(50, 45, 40, 0.08)', border: '1px solid rgba(194, 153, 76, 0.25)', position: 'relative' }}>
                    <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(1deg)' }}></div>
                    <p className="serif" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.1rem)', color: 'var(--color-text-main)', lineHeight: 1.6, fontStyle: 'italic' }}>
                      "{item.text}"
                    </p>
                    {item.doodle && renderDoodle(item.doodle)}
                  </div>
                )}

                {/* StyleType: serif-quote */}
                {item.styleType === 'serif-quote' && (
                  <div style={{ padding: '1rem 0.5rem' }}>
                    <p className="serif" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.3rem)', color: 'var(--color-text-main)', lineHeight: 1.6, fontStyle: 'italic' }}>
                      "{item.text}"
                    </p>
                    <div style={{ marginTop: '0.8rem' }}>
                      <MiniHeart color="#c2994c" size={20} />
                    </div>
                  </div>
                )}

                {/* StyleType: handwritten-note */}
                {item.styleType === 'handwritten-note' && (
                  <div className="note-card" style={{ background: 'rgba(255, 255, 255, 0.85)', padding: '1.6rem 1.4rem', borderRadius: '8px', boxShadow: '0 3px 15px rgba(50, 45, 40, 0.06)', borderLeft: '4px solid var(--color-accent-gold)', position: 'relative' }}>
                    {item.text && (
                      <p className="handwritten" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                        {item.text}
                      </p>
                    )}
                    {item.paragraphs && item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="handwritten" style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2rem)', color: 'var(--color-text-main)', lineHeight: 1.5, marginBottom: pIdx < item.paragraphs.length - 1 ? '0.8rem' : '0' }}>
                        {p}
                      </p>
                    ))}
                    {item.doodle && renderDoodle(item.doodle)}
                  </div>
                )}

                {/* StyleType: poem-block */}
                {item.styleType === 'poem-block' && (
                  <div className="poem-card" style={{ background: '#ffffff', padding: '2rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(50, 45, 40, 0.08)', border: '1px solid rgba(194, 153, 76, 0.2)', position: 'relative' }}>
                    <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }}></div>
                    {item.paragraphs.map((stanza, sIdx) => (
                      <p 
                        key={sIdx} 
                        className={sIdx === 0 ? "handwritten" : "serif"} 
                        style={{ 
                          fontSize: sIdx === 0 ? 'clamp(1.6rem, 3.8vw, 2.4rem)' : 'clamp(1.25rem, 2.8vw, 1.8rem)', 
                          color: sIdx === 0 ? 'var(--color-accent-gold)' : 'var(--color-text-main)', 
                          lineHeight: 1.7, 
                          marginBottom: sIdx < item.paragraphs.length - 1 ? '1.2rem' : '0',
                          fontStyle: sIdx === 0 ? 'normal' : 'italic'
                        }}
                      >
                        {stanza}
                      </p>
                    ))}
                    {item.doodle && renderDoodle(item.doodle)}
                  </div>
                )}

                {/* StyleType: prose-block */}
                {item.styleType === 'prose-block' && (
                  <div style={{ padding: '1.2rem 0.8rem' }}>
                    {item.paragraphs.map((para, prIdx) => (
                      <p 
                        key={prIdx} 
                        className="serif" 
                        style={{ 
                          fontSize: 'clamp(1.3rem, 3vw, 1.85rem)', 
                          color: 'var(--color-text-main)', 
                          lineHeight: 1.7, 
                          marginBottom: prIdx < item.paragraphs.length - 1 ? '0.8rem' : '0',
                          fontStyle: prIdx === 0 ? 'italic' : 'normal'
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* StyleType: dedication-card */}
                {item.styleType === 'dedication-card' && (
                  <div className="dedication-card" style={{ background: '#ffffff', padding: '1.8rem 1.4rem', borderRadius: '8px', boxShadow: '0 4px 18px rgba(50, 45, 40, 0.08)', border: '1px solid rgba(209, 130, 153, 0.3)', position: 'relative' }}>
                    <div className="tape" style={{ top: '-11px', left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
                    {item.paragraphs.map((line, lIdx) => (
                      <p 
                        key={lIdx} 
                        className={lIdx === 0 ? "serif" : "handwritten"} 
                        style={{ 
                          fontSize: lIdx === 0 ? 'clamp(1.4rem, 3.2vw, 2rem)' : 'clamp(1.5rem, 3.6vw, 2.3rem)', 
                          color: lIdx === 0 ? 'var(--color-text-main)' : 'var(--color-accent-gold)', 
                          lineHeight: 1.6, 
                          marginBottom: lIdx < item.paragraphs.length - 1 ? '1rem' : '0' 
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}

              </div>
            </section>
          );
        }

        return null;
      })}

      {/* 8. Cierre Emotivo Final */}
      <section className="primer-mes-section" style={{ minHeight: 'auto', padding: '3.5rem 1.4rem 2rem 1.4rem', textAlign: 'center', position: 'relative' }}>
        <DoodleCelebrating style={{ top: '0', right: '5%', position: 'absolute', transform: 'rotate(10deg)' }} width={80} height={70} />
        <div className="animate-item" style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          <p className="serif" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
            {primerMesData.closing.message}
          </p>
          
          <DoodleHugging style={{ margin: '0.5rem auto' }} width={120} height={95} />

          <p className="handwritten" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', color: 'var(--color-accent-gold)', letterSpacing: '0.04em' }}>
            {primerMesData.closing.dedication}
          </p>

          {onBackToMenu && (
            <div style={{ marginTop: '2rem' }}>
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
