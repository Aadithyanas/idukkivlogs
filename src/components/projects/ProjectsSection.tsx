'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '../ui/SectionHeading';

type Project = {
  title: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
  longDesc: string;
};

const categories = ['All', 'Robotics', 'Arduino/IoT', 'AI', 'College', 'Startup'];

const projects: Project[] = [
  {
    title: 'Autonomous Line Follower',
    category: 'Robotics',
    desc: 'IR sensor-based robot with PID control for competitive robotics.',
    image: '/images/robotics_workshop.png',
    tags: ['Arduino', 'PID', 'C++', 'IR Sensors'],
    longDesc: 'A high-speed line follower robot built for college robotics competitions. Uses 8 IR sensors with PID control algorithm for smooth cornering. Achieved top 3 in state-level competition.',
  },
  {
    title: 'Smart Weather Station',
    category: 'Arduino/IoT',
    desc: 'Real-time weather monitoring with cloud dashboard.',
    image: '/images/robotics_workshop.png',
    tags: ['ESP32', 'MQTT', 'React', 'Firebase'],
    longDesc: 'IoT weather station using ESP32 with BME280 sensor. Transmits temperature, humidity, and pressure data via MQTT to a custom React dashboard with real-time charts.',
  },
  {
    title: 'AI Travel Recommender',
    category: 'AI',
    desc: 'ML-powered Kerala destination recommender based on preferences.',
    image: '/images/travel_munnar.png',
    tags: ['Python', 'TensorFlow', 'Flask', 'NLP'],
    longDesc: 'A natural language processing model trained on Kerala travel reviews. Users describe their ideal trip and the AI recommends destinations, stays, and itineraries.',
  },
  {
    title: 'Drone Camera Stabilizer',
    category: 'Robotics',
    desc: '3-axis gimbal for smooth aerial footage with custom firmware.',
    image: '/images/gallery_drone.png',
    tags: ['MPU6050', 'Servos', 'Arduino', '3D Print'],
    longDesc: 'Custom 3-axis gimbal stabilizer for camera drones. Uses MPU6050 IMU for orientation sensing and brushless motors with custom PID firmware for buttery-smooth stabilization.',
  },
  {
    title: 'Smart Doorbell System',
    category: 'Arduino/IoT',
    desc: 'Face-recognizing doorbell with Telegram notification.',
    image: '/images/robotics_workshop.png',
    tags: ['Raspberry Pi', 'OpenCV', 'Python', 'Telegram'],
    longDesc: 'A smart doorbell that captures visitor photos, runs face recognition, and sends Telegram notifications with identified or unknown visitor alerts.',
  },
  {
    title: 'Campus Navigator App',
    category: 'College',
    desc: 'AR-based indoor navigation for college campus.',
    image: '/images/startup_hackathon.png',
    tags: ['React Native', 'ARCore', 'Node.js', 'MongoDB'],
    longDesc: 'Won Best Innovation at college hackathon. Uses AR markers for indoor navigation across campus buildings, with real-time class schedules and room availability.',
  },
  {
    title: 'Eco-Delivery Startup',
    category: 'Startup',
    desc: 'Electric vehicle delivery service for rural Kerala.',
    image: '/images/startup_hackathon.png',
    tags: ['Flutter', 'Firebase', 'EV', 'Business Model'],
    longDesc: 'Startup prototype for an electric vehicle-based delivery network connecting rural Kerala shops to customers. Business plan won funding at college incubator.',
  },
  {
    title: 'Gesture-Controlled Robot',
    category: 'Robotics',
    desc: 'Hand gesture recognition for wireless robot control.',
    image: '/images/robotics_workshop.png',
    tags: ['MPU6050', 'NRF24L01', 'Arduino', 'Glove'],
    longDesc: 'A wearable glove with accelerometer that wirelessly controls a 4-wheeled robot through hand gestures. Demonstrated at college tech fest with live obstacle course.',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
    <section id="projects" className="section" ref={sectionRef} style={{ background: 'var(--dark-800)' }}>
      <div className="container">
        <SectionHeading title="Innovation & Projects" subtitle="Engineering" />

        {/* Category Tabs */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace(/\//g, '-')}`}
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

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            maxHeight: '600px',
            overflowY: 'auto',
            paddingRight: '10px', // Prevent scrollbar from overlapping content
            scrollbarWidth: 'thin',
          }}
        >
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="reveal glass-card tilt-card"
              style={{
                overflow: 'hidden',
                cursor: 'pointer',
                animationDelay: `${i * 0.05}s`,
              }}
              onClick={() => setSelectedProject(project)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) / 20;
                const y = (e.clientY - rect.top - rect.height / 2) / 20;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, transparent 60%)',
                  }}
                />
                <span
                  className="tech-tag-blue"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '0.7rem',
                    background: 'rgba(0, 240, 255, 0.15)',
                    color: 'var(--electric-blue)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.6 }}>
                  {project.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag" style={{ fontSize: '0.65rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* WhatsApp Enquiry Link (Revealed on Hover) */}
                <div className="card-enquire-link">
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />
                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi, I want to enquire about the project: ${project.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} /* Prevent card click when clicking link */
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
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
          style={{ animation: 'fadeIn 0.3s ease' }}
        >
          <div
            className="glass"
            style={{
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'auto',
              borderRadius: '24px',
              animation: 'fadeInUp 0.4s ease',
            }}
          >
            {/* Modal Image */}
            <div style={{ position: 'relative', aspectRatio: '16/9' }}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                style={{ objectFit: 'cover', borderRadius: '24px 24px 0 0' }}
                sizes="700px"
              />
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: '32px' }}>
              <span
                className="tech-tag-blue"
                style={{
                  padding: '4px 12px',
                  borderRadius: '50px',
                  fontSize: '0.7rem',
                  background: 'rgba(0, 240, 255, 0.15)',
                  color: 'var(--electric-blue)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  display: 'inline-block',
                  marginBottom: '12px',
                }}
              >
                {selectedProject.category}
              </span>
              <h2
                style={{
                  fontSize: '1.8rem',
                  fontFamily: 'var(--font-space), sans-serif',
                  fontWeight: 800,
                  marginBottom: '16px',
                }}
              >
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '24px' }}>
                {selectedProject.longDesc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* WhatsApp Inquiry Button */}
              <a
                href={`https://wa.me/919946793044?text=${encodeURIComponent(`Hi! I am interested in knowing more about the project: ${selectedProject.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>chat</span> Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
