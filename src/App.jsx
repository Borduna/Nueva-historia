import React, { useEffect, useRef, useState, useCallback } from 'react';
import Story from './components/Story';
import FinalQuestion from './components/FinalQuestion';
import PrimerMes from './components/PrimerMes';
import { CrayolaFilter, DoodleHeart, DoodleCelebrating, DoodleHoldingHands } from './components/CrayolaDoodles';
import { Volume2, VolumeX, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [selectedChapter, setSelectedChapter] = useState(null); // null (portada), 'donde-todo-comenzo', 'primer-mes'
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioSrc, setCurrentAudioSrc] = useState('/audio/music.mp3');
  const userPausedRef = useRef(false);
  const audioRef = useRef(null);

  // Desvanecimiento suave de volumen (fade)
  const fadeVolume = useCallback((targetVolume, duration = 400) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const startVolume = audio.volume;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      audio.volume = Math.max(0, Math.min(1, startVolume + (targetVolume - startVolume) * progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, []);

  // Ducking cuando se reproducen videos con audio
  const handleVideoPlay = useCallback(() => {
    if (isPlaying && !userPausedRef.current && audioRef.current) {
      fadeVolume(0.08, 300);
    }
  }, [isPlaying, fadeVolume]);

  const handleVideoPause = useCallback(() => {
    if (isPlaying && !userPausedRef.current && audioRef.current) {
      const normalVol = selectedChapter === 'primer-mes' ? 0.30 : 0.40;
      fadeVolume(normalVol, 400);
    }
  }, [isPlaying, selectedChapter, fadeVolume]);

  const handleVideoEnded = useCallback(() => {
    if (isPlaying && !userPausedRef.current && audioRef.current) {
      const normalVol = selectedChapter === 'primer-mes' ? 0.30 : 0.40;
      fadeVolume(normalVol, 400);
    }
  }, [isPlaying, selectedChapter, fadeVolume]);

  // Selección de capítulo
  const handleSelectChapter = (chapterKey) => {
    setSelectedChapter(chapterKey);
    userPausedRef.current = false;

    window.scrollTo({ top: 0, behavior: 'instant' });

    let newAudioSrc = '/audio/music.mp3';
    let targetVol = 0.40;

    if (chapterKey === 'primer-mes') {
      newAudioSrc = '/multimedia-1-mes/audio-primer-mes.mp3';
      targetVol = 0.30;
    }

    setCurrentAudioSrc(newAudioSrc);

    // Intentar reproducir música con volumen adecuado y fade-in
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = newAudioSrc;
        audioRef.current.volume = 0.05;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            fadeVolume(targetVol, 800);
          })
          .catch((err) => {
            // Autoplay bloqueado por el navegador: no mostrar errores visibles
            console.log("Autoplay policy: user interaction needed for audio.", err);
            setIsPlaying(false);
          });
      }
      ScrollTrigger.refresh();
    }, 150);
  };

  // Volver a la portada de capítulos
  const handleBackToMenu = () => {
    if (audioRef.current && isPlaying) {
      fadeVolume(0, 300);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
      }, 300);
    }

    setSelectedChapter(null);
    userPausedRef.current = false;
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  // Alternar audio manualmente
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        userPausedRef.current = true;
      } else {
        const normalVol = selectedChapter === 'primer-mes' ? 0.30 : 0.40;
        audioRef.current.volume = normalVol;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            userPausedRef.current = false;
          })
          .catch(err => console.log("Audio play error: ", err));
      }
    }
  };

  return (
    <div>
      <CrayolaFilter />
      <div id="paper-texture"></div>

      {/* Elemento de Audio Centralizado */}
      <audio ref={audioRef} loop preload="auto">
        <source src={currentAudioSrc} type="audio/mpeg" />
      </audio>

      {/* 1. Portada Principal / Selección de Capítulos */}
      {!selectedChapter && (
        <div className="intro-overlay" style={{ opacity: 1, pointerEvents: 'all' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <DoodleHeart style={{ top: '-40px', right: '10%', transform: 'rotate(12deg)' }} />
            <DoodleHoldingHands style={{ bottom: '-30px', left: '8%', transform: 'rotate(-6deg)' }} />

            <h1 className="handwritten" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', opacity: 0.95, textAlign: 'center', marginBottom: '0.5rem' }}>
              Tengo algo que contarte...
            </h1>
            <p className="serif" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Elige el capítulo que deseas revivir
            </p>
          </div>

          <div className="chapter-cards-container">
            {/* Tarjeta 1: Donde todo comenzó */}
            <div 
              className="chapter-card" 
              onClick={() => handleSelectChapter('donde-todo-comenzo')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectChapter('donde-todo-comenzo'); }}
            >
              <div className="tape" style={{ top: '-10px', left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }}></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: 'var(--color-accent-gold)' }}>
                  <BookOpen size={20} />
                  <span className="serif" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Capítulo 1</span>
                </div>
                <h2 className="serif" style={{ fontSize: '1.8rem', color: 'var(--color-text-main)', marginBottom: '0.6rem' }}>
                  Donde todo comenzó
                </h2>
                <p className="handwritten" style={{ fontSize: '1.4rem', color: 'var(--color-accent-gold)', lineHeight: 1.3 }}>
                  El inicio de nuestra historia
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <span className="btn-elegant" style={{ fontSize: '1.1rem', padding: '0.6rem 1.8rem', display: 'inline-block' }}>
                  Abrir capítulo
                </span>
              </div>
            </div>

            {/* Tarjeta 2: Primer mes */}
            <div 
              className="chapter-card" 
              onClick={() => handleSelectChapter('primer-mes')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelectChapter('primer-mes'); }}
            >
              <div className="tape" style={{ top: '-10px', left: '50%', transform: 'translateX(-50%) rotate(2deg)' }}></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: 'var(--color-accent-pink)' }}>
                  <Sparkles size={20} />
                  <span className="serif" style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Capítulo 2</span>
                </div>
                <h2 className="serif" style={{ fontSize: '1.8rem', color: 'var(--color-text-main)', marginBottom: '0.6rem' }}>
                  Primer mes
                </h2>
                <p className="handwritten" style={{ fontSize: '1.35rem', color: 'var(--color-accent-gold)', lineHeight: 1.3 }}>
                  Un pequeño capítulo de todo lo que aún nos falta vivir.
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <span className="btn-elegant" style={{ fontSize: '1.1rem', padding: '0.6rem 1.8rem', display: 'inline-block' }}>
                  Abrir capítulo
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Barra de Navegación contextual cuando hay un capítulo abierto */}
      {selectedChapter && (
        <button 
          className="nav-back-btn" 
          onClick={handleBackToMenu}
          aria-label="Volver a la selección de capítulos"
        >
          <ArrowLeft size={18} />
          <span>Capítulos</span>
        </button>
      )}

      {/* 3. Botón Flotante de Audio Accesible */}
      {selectedChapter && (
        <button 
          className="audio-control" 
          onClick={toggleAudio} 
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          title={isPlaying ? "Música activada" : "Música pausada"}
          style={{ 
            position: 'fixed', 
            bottom: '2rem', 
            right: '2rem', 
            zIndex: 80, 
            background: isPlaying ? 'rgba(253, 251, 247, 0.85)' : 'var(--color-text-main)', 
            color: isPlaying ? 'var(--color-text-main)' : 'var(--color-bg-light)', 
            padding: '0.8rem', 
            borderRadius: '50%', 
            border: '1px solid rgba(112, 104, 99, 0.3)', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)', 
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease' 
          }}
        >
          {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      )}

      {/* 4. Contenido del Capítulo */}
      {selectedChapter === 'donde-todo-comenzo' && (
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Story />
          <FinalQuestion />
        </main>
      )}

      {selectedChapter === 'primer-mes' && (
        <main style={{ position: 'relative', zIndex: 10 }}>
          <PrimerMes 
            onVideoPlay={handleVideoPlay}
            onVideoPause={handleVideoPause}
            onVideoEnded={handleVideoEnded}
            onBackToMenu={handleBackToMenu}
          />
        </main>
      )}
    </div>
  );
}

export default App;
