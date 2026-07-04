import React, { useEffect, useRef, useState } from 'react';
import Story from './components/Story';
import FinalQuestion from './components/FinalQuestion';
import { CrayolaFilter } from './components/CrayolaDoodles';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio autoplay prevented: ", err));
      setIsPlaying(true);
    }

    // Esperar a que termine la transición CSS de 1.5s antes de desmontar completamente
    setTimeout(() => {
      setShowOverlay(false);
      ScrollTrigger.refresh();
    }, 1500);
  };

  return (
    <div>
      <CrayolaFilter />
      <div id="paper-texture"></div>
      
      {/* Intro Overlay - Desaparece completamente del DOM para no capturar eventos */}
      {showOverlay && (
        <div className={`intro-overlay ${isStarted ? 'started' : ''}`}>
          <h1 className="handwritten" style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', opacity: 0.9, textAlign: 'center' }}>
            Tengo algo que contarte...
          </h1>
          <button className="btn-elegant start-btn" onClick={handleStart}>
            Comenzar
          </button>
        </div>
      )}
      
      {/* Audio Control - Se muestra si la música no está sonando (por bloqueo de autoplay) o si el usuario quiere pausarla */}
      {isStarted && (
        <button className="audio-control" onClick={toggleAudio} aria-label="Toggle Music" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 60, background: isPlaying ? 'transparent' : 'var(--color-text-main)', color: isPlaying ? 'var(--color-text-muted)' : 'var(--color-bg-light)', padding: isPlaying ? '0' : '0.8rem', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isPlaying ? 'none' : '0 4px 15px rgba(0,0,0,0.15)', transition: 'all 0.3s ease' }}>
          {isPlaying ? <Volume2 size={24} opacity={0.5} /> : <VolumeX size={24} />}
        </button>
      )}
      
      <audio ref={audioRef} loop>
        <source src="/audio/music.mp3" type="audio/mpeg" />
      </audio>

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Story />
        <FinalQuestion />
      </main>

      <style>{`
        .intro-overlay.started {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

export default App;
