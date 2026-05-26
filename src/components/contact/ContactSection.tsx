'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '../ui/SectionHeading';

const collaborationTypes = [
  'Brand Partnership',
  'Travel Collaboration',
  '3D Printing Project',
  'Engineering Consultation',
  'Sponsorship',
  'Other',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const waNumber = '919946793044';
    const waMessage = `Hi! I'm ${formData.name}.
Email: ${formData.email}
Collaboration Type: ${formData.type}

Message:
${formData.message}`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
    
    // Open WhatsApp
    window.open(waUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', type: '', message: '' });
  };

  return (
    <section id="contact" className="section" ref={sectionRef} style={{ background: 'var(--dark-800)' }}>
      <div className="container">
        <SectionHeading title="Let's Collaborate" subtitle="Get in Touch" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: '48px',
            alignItems: 'start',
          }}
        >
          {/* Contact Form */}
          <div className="reveal">
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    className="form-input"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    className="form-input"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-type"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Collaboration Type
                  </label>
                  <select
                    id="contact-type"
                    className="form-input"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select type...</option>
                    {collaborationTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '6px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-input"
                    placeholder="Tell us about your project or collaboration idea..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  id="contact-submit"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px', background: '#25D366', color: '#fff', border: 'none' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>chat</span> {submitted ? 'Opening WhatsApp...' : 'Send via WhatsApp'}
                </button>

                {submitted && (
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'var(--neon-green)',
                      fontSize: '0.85rem',
                      animation: 'fadeIn 0.3s ease',
                    }}
                  >
                    Thank you! We&apos;ll get back to you soon.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="reveal">
            {/* Quick Connect */}
            <div className="glass-card" style={{ padding: '32px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>
                Quick Connect
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="whatsapp-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: 'rgba(37, 211, 102, 0.08)',
                    border: '1px solid rgba(37, 211, 102, 0.2)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.15)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>chat</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>WhatsApp</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Quick replies, project discussion</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/idukki._vlogz._/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="instagram-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: 'rgba(225, 48, 108, 0.08)',
                    border: '1px solid rgba(225, 48, 108, 0.2)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(225, 48, 108, 0.15)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(225, 48, 108, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>photo_camera</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Instagram</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>@idukki._vlogz._ • 78K followers</div>
                  </div>
                </a>

                <a
                  href="mailto:hello@idukkivlogz.com"
                  id="email-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    background: 'rgba(0, 240, 255, 0.08)',
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1.4rem' }}>mail</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Email</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>hello@idukkivlogz.com</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Sponsor Section */}
            <div className="glass-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined">handshake</span> Brand Partnerships
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>
                Interested in sponsoring travel vlogs, tech content, or product reviews?
                We collaborate with brands that align with travel, tech, and innovation.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="tech-tag">Travel Brands</span>
                <span className="tech-tag">Tech Products</span>
                <span className="tech-tag">Education</span>
                <span className="tech-tag">3D Printing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
