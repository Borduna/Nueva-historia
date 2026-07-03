import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import Background from './components/Background';
import Story from './components/Story';
import FinalQuestion from './components/FinalQuestion';
import { Volume2, VolumeX } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Fade out stars at the climax
      ScrollTrigger.create({
        trigger: ".climax-trigger",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const canvasContainer = document.getElementById('canvas-container');
          if (canvasContainer) {
            canvasContainer.style.opacity = 1 - self.progress * 0.95;
          }
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

  return (
    <div ref={appRef}>
      <Background />
      
      <button className="audio-control" onClick={toggleAudio} aria-label="Toggle Music">
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-cinematic-atmosphere-suspense-686.mp3" type="audio/mpeg" />
      </audio>

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Story />
        <FinalQuestion />
      </main>
    </div>
  );
}

export default App;
