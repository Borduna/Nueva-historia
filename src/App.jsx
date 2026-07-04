import React, { useEffect, useRef, useState } from 'react';
import Story from './components/Story';
import FinalQuestion from './components/FinalQuestion';
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
      
      <button className="audio-control" onClick={toggleAudio} aria-label="Toggle Music" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 60, background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-cinematic-atmosphere-suspense-686.mp3" type="audio/mpeg" />
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
