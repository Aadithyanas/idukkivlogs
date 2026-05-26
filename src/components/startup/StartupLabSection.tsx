'use client';

import { useEffect, useRef } from 'react';
import SectionHeading from '../ui/SectionHeading';

const currentBuilds = [
  { name: 'Modular Robot Arm v3', progress: 75, status: 'In Progress' },
  { name: 'IoT Smart Garden Kit', progress: 45, status: 'Prototyping' },
  { name: 'Kerala AR Travel Guide', progress: 30, status: 'Concept' },
];

const upcomingIdeas = [
  { name: 'Drone Delivery Network', tag: 'Coming Soon', icon: '🛸' },
  { name: 'AI Video Editor for Vlogs', tag: 'Research Phase', icon: '🎞️' },
  { name: 'Open Source Robotics Kit', tag: 'Q3 2025', icon: '🤖' },
  { name: 'Kerala Makers Marketplace', tag: '2026', icon: '🏪' },
];

const hackathons = [
  { name: 'TechFest 2024', result: '🥇 1st Place', project: 'Smart Water Monitoring' },
  { name: 'HackKerala 2023', result: '🥈 Runner Up', project: 'AR Campus Navigator' },
  { name: 'IEEE Robotics 2023', result: '🥉 3rd Place', project: 'Autonomous Delivery Bot' },
  { name: 'Build-a-Thon 2022', result: '🏆 Best Innovation', project: 'Gesture-Controlled Drone' },
];

const team = [
  { name: 'Emil Shaji', role: 'Founder & Creator', emoji: '🎬' },
  { name: 'Arun Kumar', role: 'Robotics Lead', emoji: '🤖' },
  { name: 'Meera Nair', role: '3D Design Specialist', emoji: '🎨' },
  { name: 'Vishnu Dev', role: 'IoT Developer', emoji: '💡' },
];

export default function StartupLabSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="startup" className="section" ref={sectionRef} style={{ background: 'var(--dark-800)' }}>
      <div className="container">
        <SectionHeading title="Innovation Lab" subtitle="Startup Lab" />

        {/* Current Builds */}
        <div className="reveal" style={{ marginBottom: '80px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>
            🔨 Current <span className="gradient-text">Builds</span>
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {currentBuilds.map((build) => (
              <div key={build.name} className="glass-card" style={{ padding: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{build.name}</h4>
                  <span className="tech-tag" style={{ fontSize: '0.65rem' }}>{build.status}</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    background: 'var(--dark-600)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginBottom: '8px',
                  }}
                >
                  <div
                    style={{
                      width: `${build.progress}%`,
                      height: '100%',
                      background: 'var(--gradient-neon)',
                      borderRadius: '3px',
                      transition: 'width 1s ease',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--neon-green)', fontWeight: 600 }}>
                  {build.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Ideas */}
        <div className="reveal" style={{ marginBottom: '80px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>
            💡 Upcoming <span className="gradient-text">Ideas</span>
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {upcomingIdeas.map((idea) => (
              <div
                key={idea.name}
                className="glass-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(57, 255, 20, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    flexShrink: 0,
                  }}
                >
                  {idea.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>
                    {idea.name}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--electric-blue)',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {idea.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathon Highlights */}
        <div className="reveal" style={{ marginBottom: '80px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>
            🏆 Hackathon <span className="gradient-text">Highlights</span>
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {hackathons.map((h) => (
              <div key={h.name} className="glass-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{h.result.split(' ')[0]}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
                  {h.name}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--neon-green)', fontWeight: 600, marginBottom: '4px' }}>
                  {h.result}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Project: {h.project}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="reveal">
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>
            👥 The <span className="gradient-text">Team</span>
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="glass-card"
                style={{
                  padding: '28px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(57, 255, 20, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    margin: '0 auto 14px',
                    border: '2px solid rgba(57, 255, 20, 0.15)',
                  }}
                >
                  {member.emoji}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
                  {member.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
