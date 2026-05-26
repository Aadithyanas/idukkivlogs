'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from '../ui/SectionHeading';

const stats = [
  { value: '78K+', label: 'Followers' },
  { value: '1000+', label: 'Posts' },
  { value: '50+', label: 'Projects' },
  { value: '20+', label: 'Destinations' },
];

const pillars = [
  { icon: 'movie', title: 'Travel Vlogs', desc: 'Cinematic journeys through Kerala\'s hidden gems' },
  { icon: 'smart_toy', title: 'Robotics', desc: 'Arduino, IoT, and automation experiments' },
  { icon: 'rocket_launch', title: 'Startup Culture', desc: 'Building products & prototypes from scratch' },
  { icon: 'science', title: 'Innovation Lab', desc: 'AI experiments & engineering projects' },
  { icon: 'print', title: '3D Printing', desc: 'Custom prototypes & manufacturing services' },
];

const timeline = [
  { year: '2020', title: 'Journey Begins', desc: 'Started documenting tech projects and adventures on Instagram', side: 'left' },
  { year: '2021', title: 'First Workshops', desc: 'Conducted initial robotics and IoT workshops for students', side: 'right' },
  { year: '2022', title: 'Community Growth', desc: 'Crossed 10K followers. Expanded engineering project showcases', side: 'left' },
  { year: '2023', title: '3D Printing Lab', desc: 'Set up a dedicated 3D printing lab for custom prototyping services', side: 'right' },
  { year: '2024', title: 'Startup Mindset', desc: 'Launched innovation lab. Started active college collaborations', side: 'left' },
  { year: '2025', title: 'Techodep Edutech', desc: 'Officially incorporated as Techodep Edutech LLP to empower students', side: 'right' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ background: 'var(--dark-800)' }}>
      <div className="container">
        <SectionHeading title="About Techodep Edutech" subtitle="Who We Are" />

        {/* Story */}
        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto 64px', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            Born from a passion for technology and learning, <span className="neon-text">Techodep Edutech LLP</span> 
            is a forward-thinking educational company based in Kerala. Founded by Emil Shaji and Shaji Joseph, 
            we are dedicated to bridging the gap between theoretical knowledge and practical application 
            through robotics, 3D printing, and hands-on innovation.
          </p>
        </div>

        {/* Stats */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '24px',
            marginBottom: '80px',
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card"
              style={{
                padding: '32px 20px',
                textAlign: 'center',
              }}
            >
              <div
                className="gradient-text"
                style={{
                  fontSize: '2.5rem',
                  fontFamily: 'var(--font-space), sans-serif',
                  fontWeight: 800,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Pillars */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '100px',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="glass-card"
              style={{
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: 'var(--neon-green)' }}>
                  {pillar.icon}
                </span>
              </div>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--text-primary)',
                }}
              >
                {pillar.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <SectionHeading title="The Timeline" subtitle="Milestones" />
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <div className="timeline-line" />
          {timeline.map((item, i) => (
            <div
              key={item.year}
              className={`reveal timeline-item ${item.side}`}
            >
              {/* Dot */}
              <div className="timeline-dot" />
              <div
                className="glass-card timeline-card"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <span
                  className="neon-text"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.year}
                </span>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginTop: '4px',
                    marginBottom: '6px',
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
