'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';

const galleryCategories = ['All', 'Travel', 'Robotics', 'Behind the Scenes', 'Projects'];

const galleryItems = [
  { src: '/images/hero_background.png', category: 'Travel', title: 'Idukki Hills at Dawn', aspect: '4/3' },
  { src: '/images/robotics_workshop.png', category: 'Robotics', title: 'Workshop Workbench', aspect: '3/4' },
  { src: '/images/travel_munnar.png', category: 'Travel', title: 'Munnar Tea Gardens', aspect: '16/9' },
  { src: '/images/gallery_behind_scenes.png', category: 'Behind the Scenes', title: 'Filming Setup', aspect: '4/5' },
  { src: '/images/travel_backwaters.png', category: 'Travel', title: 'Kerala Backwaters', aspect: '16/9' },
  { src: '/images/3d_printer.png', category: 'Robotics', title: '3D Printer in Action', aspect: '4/3' },
  { src: '/images/gallery_drone.png', category: 'Travel', title: 'Aerial Forest Road', aspect: '3/4' },
  { src: '/images/startup_hackathon.png', category: 'Projects', title: 'College Hackathon', aspect: '16/9' },
  { src: '/images/travel_vagamon.png', category: 'Travel', title: 'Vagamon Meadows', aspect: '4/3' },
  { src: '/images/travel_waterfall.png', category: 'Travel', title: 'Athirappilly Falls', aspect: '3/4' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((lightbox + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightbox((lightbox - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, filtered.length]);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--dark-900)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: 'var(--font-space), sans-serif',
              fontWeight: 800,
              marginBottom: '16px'
            }}>
              Full <span className="gradient-text">Gallery</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
              Explore our collection of travel shots, projects, and behind-the-scenes moments.
            </p>
          </div>

          {/* Category Filter */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--neon-green)' : 'var(--dark-500)',
                  background: activeCategory === cat ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
                  color: activeCategory === cat ? 'var(--neon-green)' : 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid" style={{ paddingBottom: '80px' }}>
            {filtered.map((item, i) => (
              <div
                key={`${item.src}-${i}`}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: item.aspect,
                }}
                onClick={() => setLightbox(i)}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Hover Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 50%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.title}</p>
                    <span className="tech-tag" style={{ fontSize: '0.65rem', marginTop: '6px' }}>
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightbox(null);
          }}
          style={{ animation: 'fadeIn 0.2s ease', zIndex: 9999 }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '85vh',
              animation: 'fadeInUp 0.3s ease',
            }}
          >
            <Image
              src={filtered[lightbox].src}
              alt={filtered[lightbox].title}
              width={1200}
              height={800}
              style={{
                objectFit: 'contain',
                maxHeight: '85vh',
                width: 'auto',
                borderRadius: '12px',
              }}
            />
            {/* Navigation */}
            <button
              onClick={() => setLightbox((lightbox - 1 + filtered.length) % filtered.length)}
              style={{
                position: 'absolute',
                left: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--dark-500)',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setLightbox((lightbox + 1) % filtered.length)}
              style={{
                position: 'absolute',
                right: '-50px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid var(--dark-500)',
                color: '#fff',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ›
            </button>
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
            {/* Title */}
            <p
              style={{
                textAlign: 'center',
                marginTop: '12px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
              }}
            >
              {filtered[lightbox].title}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
