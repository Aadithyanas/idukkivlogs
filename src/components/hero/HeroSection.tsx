'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;

const currentFrame = (index: number) =>
  `/images/heroSection/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Refs for text sections
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);

  const renderFrame = (index: number) => {
    if (!canvasRef.current || !imagesRef.current[index]) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    
    // Set canvas internal resolution to match the image
    if (canvas.width !== img.width || canvas.height !== img.height) {
      canvas.width = img.width;
      canvas.height = img.height;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  // Preload images optimally to prevent network choking
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = images;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (!isMounted) return resolve();
        const img = new Image();
        img.src = currentFrame(index);
        img.onload = () => {
          if (isMounted) {
            images[index] = img;
            if (index === 0) renderFrame(0);
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const loadImages = async () => {
      // 1. Load the very first frame immediately so it renders instantly
      await loadFrame(0);

      if (!isMounted) return;

      // 2. Load the next few frames for immediate scrolling readiness
      const initialBatch = [];
      for (let i = 1; i <= 15; i++) {
        if (i < FRAME_COUNT) initialBatch.push(loadFrame(i));
      }
      await Promise.all(initialBatch);

      if (!isMounted) return;

      // 3. Defer loading the remaining 100+ frames so the rest of the page (fonts/CSS/images) can load first
      setTimeout(() => {
        if (!isMounted) return;
        for (let i = 16; i < FRAME_COUNT; i++) {
          loadFrame(i);
        }
      }, 1000);
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Initial load animation for Text 1 and scroll indicator
    gsap.fromTo(
      text1Ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
    gsap.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out', delay: 1.5 }
    );

    // Prepare other texts initial states
    gsap.set([text2Ref.current, text3Ref.current, text4Ref.current], { opacity: 0, y: 30, pointerEvents: 'none' });
    gsap.set(text1Ref.current, { pointerEvents: 'auto' });

    const playhead = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 0.5,
        pin: true,
      }
    });

    // 1. Animate Frames (from 0 to 119)
    tl.to(playhead, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: () => renderFrame(playhead.frame),
      duration: 100 // We use an abstract duration of 100 for easy percentage mapping
    }, 0);

    // Text 1: 0-20%
    tl.fromTo(text1Ref.current, { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: 5, ease: 'power1.inOut', onComplete: () => gsap.set(text1Ref.current, { pointerEvents: 'none' }), onReverseComplete: () => gsap.set(text1Ref.current, { pointerEvents: 'auto' }) }, 15);
    tl.fromTo(scrollIndicatorRef.current, { opacity: 1 }, { opacity: 0, duration: 5, ease: 'power1.inOut' }, 15);

    // Text 2: 25-45% (Travel)
    tl.to(text2Ref.current, { opacity: 1, y: 0, duration: 5, ease: 'power1.out', onStart: () => gsap.set(text2Ref.current, { pointerEvents: 'auto' }), onReverseComplete: () => gsap.set(text2Ref.current, { pointerEvents: 'none' }) }, 25);
    tl.to(text2Ref.current, { opacity: 0, y: -30, duration: 5, ease: 'power1.in', onComplete: () => gsap.set(text2Ref.current, { pointerEvents: 'none' }), onReverseComplete: () => gsap.set(text2Ref.current, { pointerEvents: 'auto' }) }, 40);

    // Text 3: 50-70% (Robotics)
    tl.to(text3Ref.current, { opacity: 1, y: 0, duration: 5, ease: 'power1.out', onStart: () => gsap.set(text3Ref.current, { pointerEvents: 'auto' }), onReverseComplete: () => gsap.set(text3Ref.current, { pointerEvents: 'none' }) }, 50);
    tl.to(text3Ref.current, { opacity: 0, y: -30, duration: 5, ease: 'power1.in', onComplete: () => gsap.set(text3Ref.current, { pointerEvents: 'none' }), onReverseComplete: () => gsap.set(text3Ref.current, { pointerEvents: 'auto' }) }, 65);

    // Text 4: 75-100% (Community & CTA)
    tl.to(text4Ref.current, { opacity: 1, y: 0, duration: 5, ease: 'power1.out', onStart: () => gsap.set(text4Ref.current, { pointerEvents: 'auto' }), onReverseComplete: () => gsap.set(text4Ref.current, { pointerEvents: 'none' }) }, 75);
    
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="hero-scroll-section">
      <div className="hero-sticky-container">
        
        {/* Cinematic Canvas Background */}
        <canvas ref={canvasRef} className="hero-canvas" />
        
        {/* Overlays for contrast and cinematic feel */}
        <div className="hero-gradient-overlay" />
        <div className="hero-vignette" />

        {/* --- TEXT STAGE 1 (0-20%) --- */}
        <div ref={text1Ref} className="hero-text-overlay container" style={{ maxWidth: '900px' }}>
          <div className="glass" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '50px',
            marginBottom: '28px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--neon-green)',
              boxShadow: '0 0 8px var(--neon-green)',
              animation: 'glowPulse 2s ease-in-out infinite'
            }} />
            Kerala, India
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontFamily: 'var(--font-space), sans-serif',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: '24px'
          }}>
            Empowering Minds.
            <br />
            <span className="gradient-text">Building the Future.</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Educational technology, robotics from the lab, 3D printing, and
            innovation from the heart of Kerala — this is Techodep Edutech.
          </p>
        </div>

        {/* --- TEXT STAGE 2 (25-45%) --- */}
        <div ref={text2Ref} className="hero-text-overlay container" style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            Edutech <span className="neon-text-blue">Services.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            Bridging the gap between traditional learning and modern technology with hands-on technical education.
          </p>
        </div>

        {/* --- TEXT STAGE 3 (50-70%) --- */}
        <div ref={text3Ref} className="hero-text-overlay container" style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            marginBottom: '20px',
            color: 'var(--text-primary)'
          }}>
            Robotics & <span className="neon-text">Innovation.</span>
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6
          }}>
            Pushing the boundaries of tech with DIY robotics, 3D printing, and custom electronics projects built from scratch.
          </p>
        </div>

        {/* --- TEXT STAGE 4 (75-100%) --- */}
        <div ref={text4Ref} className="hero-text-overlay container" style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            marginBottom: '16px',
          }} className="gradient-text">
            78K+ Community
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Join our growing family of tech enthusiasts and travel lovers. Let&apos;s explore and build together.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="#travel" className="btn-primary" id="hero-cta-vlogs">
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>play_circle</span> Watch Vlogs
            </a>
            <a href="#projects" className="btn-outline" id="hero-cta-projects">
              <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>bolt</span> Explore Projects
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10
        }}>
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            Scroll to explore
          </span>
          <div style={{
            width: '24px',
            height: '40px',
            borderRadius: '12px',
            border: '1.5px solid var(--text-muted)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3px',
              height: '8px',
              borderRadius: '3px',
              background: 'var(--neon-green)',
              animation: 'float 2s ease-in-out infinite'
            }} />
          </div>
        </div>

      </div>
    </section>
  );
}
