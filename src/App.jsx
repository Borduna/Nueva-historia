import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import Background from './components/Background';
import Story from './components/Story';
import FinalQuestion from './components/FinalQuestion';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const appRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".climax-trigger",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const bg = document.getElementById('background-layer');
          if (bg) bg.style.opacity = 1 - self.progress * 0.7;
        }
      });
    }, appRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

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
    lenisRef.current.scrollTo('.story-container', { duration: 2, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    if (!isPlaying && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div ref={appRef}>
      <Background />
      
      <button className="audio-control" onClick={toggleAudio} aria-label="Toggle Music" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50, background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-cinematic-atmosphere-suspense-686.mp3" type="audio/mpeg" />
      </audio>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Intro Screen */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="btn-elegant start-btn" onClick={handleStart}>Comenzar</button>
        </section>

        <Story />
        <FinalQuestion />
      </main>
    </div>
  );
}

export default App;
