'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';

const destinations = [
  { name: 'Munnar', image: '/images/travel_munnar.png', desc: 'Tea plantations & misty peaks', views: '45K', cx: 145, cy: 230 },
  { name: 'Vagamon', image: '/images/travel_vagamon.png', desc: 'Rolling meadows & pine forests', views: '32K', cx: 130, cy: 200 },
  { name: 'Idukki', image: '/images/hero_background.png', desc: 'Dam, hills & forest roads', views: '68K', cx: 155, cy: 215 },
  { name: 'Athirappilly', image: '/images/travel_waterfall.png', desc: 'The Niagara of India', views: '55K', cx: 105, cy: 195 },
  { name: 'Alleppey', image: '/images/travel_backwaters.png', desc: 'Backwaters & houseboats', views: '40K', cx: 110, cy: 260 },
];

const videoCards = [
  { title: 'Sunrise at Kolukkumalai', location: 'Munnar', image: '/images/travel_munnar.png', duration: '12:45', views: '125K' },
  { title: 'Monsoon Drive — Idukki', location: 'Idukki', image: '/images/hero_background.png', duration: '18:20', views: '230K' },
  { title: 'Athirappilly Falls Trek', location: 'Thrissur', image: '/images/travel_waterfall.png', duration: '15:30', views: '89K' },
  { title: 'Backwater Houseboat Diary', location: 'Alleppey', image: '/images/travel_backwaters.png', duration: '22:10', views: '156K' },
  { title: 'Vagamon Pine Forest', location: 'Vagamon', image: '/images/travel_vagamon.png', duration: '10:55', views: '67K' },
  { title: 'Night Drive — Western Ghats', location: 'Idukki', image: '/images/gallery_drone.png', duration: '25:00', views: '340K' },
];

export default function TravelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePin, setActivePin] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="travel" className="section" ref={sectionRef}>
      <div className="container">
        <SectionHeading title="Kerala Travel Diaries" subtitle="Travel Vlogs" />

        {/* Video Cards Grid */}
        <div className="reveal" style={{ marginBottom: '100px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: '30px',
            }}
          >
            {videoCards.map((video, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: '20px',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    sizes="(max-width: 768px) 100vw, 400px"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Play Button Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.2)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'rgba(57, 255, 20, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--glow-green)',
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ color: 'var(--dark-900)' }}>play_arrow</span>
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    {video.duration}
                  </span>
                </div>
                {/* Info */}
                <div style={{ padding: '18px 20px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>
                    {video.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span> {video.location}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>visibility</span> {video.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Drone Gallery Horizontal Scroll */}
        <div className="reveal">
          <h3
            style={{
              fontSize: '1.5rem',
              fontFamily: 'var(--font-space), sans-serif',
              fontWeight: 700,
              marginBottom: '24px',
            }}
          >
            Drone <span className="gradient-text">Gallery</span>
          </h3>
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '16px',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'thin',
            }}
          >
            {['/images/gallery_drone.png', '/images/travel_munnar.png', '/images/hero_background.png', '/images/travel_vagamon.png', '/images/travel_backwaters.png'].map((src, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: '350px',
                  height: '220px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  scrollSnapAlign: 'start',
                }}
              >
                <Image
                  src={src}
                  alt={`Drone shot ${i + 1}`}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  sizes="350px"
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
