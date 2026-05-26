'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaded(true), 400);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loading-screen ${loaded ? 'loaded' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <h1
          className="gradient-text"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-space), sans-serif',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}
        >
          IDUKKI VLOGZ
        </h1>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Loading Experience
        </p>
      </div>
      <div style={{ width: '200px' }}>
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'var(--dark-600)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(progress, 100)}%`,
              height: '100%',
              background: 'var(--gradient-neon)',
              borderRadius: '2px',
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>
        <p
          style={{
            textAlign: 'center',
            marginTop: '12px',
            color: 'var(--neon-green)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-space), monospace',
          }}
        >
          {Math.min(Math.round(progress), 100)}%
        </p>
      </div>
    </div>
  );
}
