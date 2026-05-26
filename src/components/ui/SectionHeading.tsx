'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

export default function SectionHeading({ title, subtitle, align = 'center' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        textAlign: align,
        marginBottom: '64px',
      }}
    >
      <span
        className="neon-text"
        style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '12px',
        }}
      >
        ◈ {subtitle || 'Explore'}
      </span>
      <h2
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontFamily: 'var(--font-space), sans-serif',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: '60px',
          height: '3px',
          background: 'var(--gradient-neon)',
          borderRadius: '3px',
          margin: align === 'center' ? '20px auto 0' : '20px 0 0',
        }}
      />
    </div>
  );
}
