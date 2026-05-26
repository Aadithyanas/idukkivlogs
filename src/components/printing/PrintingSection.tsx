'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    icon: 'tv',
    title: 'LED Sign Boards & Shop Name Boards',
    desc: 'Make your business stand out at night. We design and install premium 3D LED sign boards, acrylic names, and high-visibility shop boards.',
    tags: ['3D LED', 'ACRYLIC BOARDS', 'NEON SIGNS'],
  },
  {
    icon: 'print',
    title: '3D Printing',
    desc: 'High-quality FDM & resin prints for prototypes, models, and custom parts.',
    tags: ['PLA / ABS / PETG', 'Resolution: 0.1mm', 'Max: 220x220x250'],
  },
  {
    icon: 'build',
    title: 'Prototype Manufacturing',
    desc: 'From concept to working prototype. Rapid iteration with engineering support.',
    tags: ['CAD Assist', 'Functional', 'Multi-material'],
  },
  {
    icon: 'palette',
    title: 'Product Modeling',
    desc: '3D modeling and rendering for product visualization and presentation.',
    tags: ['Fusion 360', 'Photorealistic', 'Animation'],
  },
  {
    icon: 'settings',
    title: 'Robotics Parts',
    desc: 'Custom brackets, mounts, gears, and enclosures for robotics projects.',
    tags: ['Custom Fit', 'Stress-tested', 'Quick turnaround'],
  },
];

export default function PrintingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) handleSliderMove(e.clientX);
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) handleSliderMove(e.touches[0].clientX);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section id="printing" className="section" ref={sectionRef}>
      <div className="container">
        <SectionHeading title="3D Printing Services" subtitle="Manufacturing" />

        {/* Hero Block */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '80px',
          }}
        >
          {/* 3D Printer Image with Layer Animation */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '4/3',
            }}
          >
            <Image
              src="/images/3d_printer.png"
              alt="3D Printer in action"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* Animated Layer Lines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, transparent 40%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
              }}
            >
              <div
                className="glass"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'var(--neon-green)',
                    animation: 'glowPulse 2s ease-in-out infinite',
                  }}
                />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Printer Active — Layer 47/120</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3
              style={{
                fontSize: '2rem',
                fontFamily: 'var(--font-space), sans-serif',
                fontWeight: 800,
                marginBottom: '16px',
                lineHeight: 1.2,
              }}
            >
              From <span className="gradient-text">Digital Design</span> to Physical Reality
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
              Turn your ideas into tangible prototypes with our professional 3D printing services.
              Whether you&apos;re building a robotics project, creating product mockups, or need
              custom engineering parts — we&apos;ve got you covered.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#contact" className="btn-primary" id="printing-get-quote">
                Get a Quote
              </a>
              <a href="#contact" className="btn-outline">
                View Samples
              </a>
            </div>
          </div>
        </div>

        {/* Before/After Slider */}
        <div className="reveal" style={{ marginBottom: '80px' }}>
          <h3
            style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-space), sans-serif',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '32px',
            }}
          >
            Before → <span className="gradient-text">After</span>
          </h3>
          <div
            ref={sliderRef}
            className="before-after-container"
            style={{ maxWidth: '700px', margin: '0 auto', aspectRatio: '16/9' }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* After (full image) */}
            <Image
              src="/images/3d_printer.png"
              alt="After 3D printing"
              fill
              style={{ objectFit: 'cover' }}
              sizes="700px"
            />
            {/* Before (clipped) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <Image
                src="/images/robotics_workshop.png"
                alt="Before — CAD Design"
                fill
                style={{ objectFit: 'cover', filter: 'grayscale(70%) brightness(0.6)' }}
                sizes="700px"
              />
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                CAD Design
              </div>
            </div>
            {/* After label */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'rgba(57, 255, 20, 0.2)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--neon-green)',
              }}
            >
              3D Printed
            </div>
            {/* Divider */}
            <div className="before-after-divider" style={{ left: `${sliderPos}%` }}>
              <div className="before-after-handle" style={{ left: '0' }}>
                <span style={{ fontSize: '0.8rem' }}>⟷</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
          }}
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="glass-card"
              style={{ padding: '28px 24px' }}
            >
              <div style={{ 
                marginBottom: '18px', 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                background: 'rgba(255,255,255,0.03)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: service.title.includes('LED') ? '#ff3c3c' : 'var(--neon-green)' }}>
                  {service.icon}
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px' }}>
                {service.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                {service.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {service.tags.map((tag) => (
                  <span key={tag} className={service.title.includes('LED') ? 'tech-tag-red' : 'tech-tag'} style={{ fontSize: '0.65rem', padding: '6px 14px' }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* WhatsApp Enquiry Link (Revealed on Hover) */}
              <div className="card-enquire-link">
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />
                <a
                  href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I want to enquire about ${service.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#25D366',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  ENQUIRE VIA WHATSAPP
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
