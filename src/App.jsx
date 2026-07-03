import React, { useEffect, useRef, useState } from 'react';
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
  const introRef = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".climax-trigger",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const bg = document.getElementById('background-layer');
          if (bg) {
            bg.style.opacity = 1 - self.progress * 0.7;
          }
        }
      });
    }, appRef);

    return () => ctx.revert();
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
    // 1. Fade out the intro elements smoothly
    gsap.to(introRef.current, {
      opacity: 0,
      y: -25,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => {
        if (introRef.current) {
          introRef.current.style.display = 'none';
        }
      }
    });

    // 2. Play Audio if it's not active
    if (!isPlaying && audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio autoplay prevented: ", err));
      setIsPlaying(true);
    }

    // 3. Page turn flash transition and scroll to the story
    const tl = gsap.timeline();
    tl.to(flashRef.current, { opacity: 0.15, duration: 0.4, ease: "power1.out" })
      .to(flashRef.current, { opacity: 0, duration: 0.5, ease: "power1.in" })
      .to(window, {
        duration: 1.5,
        scrollTo: { y: ".story-container", offsetY: 20 },
        ease: "power2.inOut"
      }, "-=0.4");
  };

  return (
    <div ref={appRef}>
      <div id="paper-texture"></div>
      <div ref={flashRef} className="book-flash"></div>
      <Background />
      
      <button className="audio-control" onClick={toggleAudio} aria-label="Toggle Music" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 50, background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-cinematic-atmosphere-suspense-686.mp3" type="audio/mpeg" />
      </audio>

      <main style={{ position: 'relative', zIndex: 10 }}>
        {/* Intro Screen - Timeless */}
        <section ref={introRef} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '3rem', padding: '2rem' }}>
          <h1 className="handwritten" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', opacity: 0.9, textAlign: 'center' }}>Tengo algo que contarte...</h1>
          <button className="btn-elegant start-btn" onClick={handleStart}>Comenzar</button>
        </section>

        <Story />
        <FinalQuestion />
      </main>
    </div>
  );
}

export default App;
