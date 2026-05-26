'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Travel', href: '#travel' },
  { label: 'Projects', href: '#projects' },
  { label: '3D Print', href: '#printing' },
  { label: 'Lab', href: '#startup' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10, 82, 150, 0.08)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div style={{ position: 'relative', width: '200px', height: '48px' }}>
            <Image
              src="/images/logo.jpg"
              alt="Techodep Logo"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </div>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-green)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* WhatsApp Button & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Desktop WhatsApp Button */}
          <a
            href="https://wa.me/919946793044?text=Hi!%20I'm%20interested%20in%20an%20enquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#25D366',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '24px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>chat</span>
            Enquiry
          </a>
        </div>
      </div>

      {/* Floating Bottom Navigation (Mobile Only) */}
      <div className="mobile-bottom-nav">
        <div className="mobile-dock-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div className="mobile-dock">
            <a href="#hero" className="dock-item active">
              <span className="material-symbols-outlined">home</span>
            </a>
            <a href="#projects" className="dock-item">
              <span className="material-symbols-outlined">view_quilt</span>
            </a>
            <a href="#printing" className="dock-item">
              <span className="material-symbols-outlined">view_in_ar</span>
            </a>
            <a href="#gallery" className="dock-item">
              <span className="material-symbols-outlined">photo_library</span>
            </a>
          </div>
          
          <a 
            href="https://wa.me/919946793044?text=Hi!%20I'm%20interested%20in%20an%20enquiry." 
            target="_blank"
            rel="noopener noreferrer"
            className="dock-whatsapp-fab"
          >
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Menu (Deprecated in favor of bottom dock) */}

      <style jsx>{`
        .mobile-bottom-nav {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: none !important;
          }
          #main-navbar {
            background: transparent !important;
            backdrop-filter: none !important;
            border-bottom: none !important;
            box-shadow: none !important;
            padding-top: 20px !important;
          }
          .mobile-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 24px;
            left: 0;
            right: 0;
            justify-content: center;
            z-index: 1000;
            pointer-events: none;
          }
          .mobile-dock {
            display: flex;
            align-items: center;
            gap: 20px;
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            padding: 12px 24px;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            pointer-events: auto;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            padding-right: 48px; /* Leave space for overlapping FAB */
          }
          .dock-whatsapp-fab {
            position: absolute;
            right: -16px;
            width: 56px;
            height: 56px;
            background: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
            pointer-events: auto;
            z-index: 10;
            transition: transform 0.2s ease;
          }
          .dock-whatsapp-fab:active {
            transform: scale(0.95);
          }
          .dock-item {
            color: #94a3b8;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
          }
          .dock-item.active {
            color: #3b82f6;
            background: rgba(59, 130, 246, 0.15);
            padding: 8px 16px;
            border-radius: 20px;
          }
          .dock-item:not(.active) {
            padding: 8px;
          }
          .dock-item .material-symbols-outlined {
            font-size: 1.5rem;
          }
          .dock-btn {
            background: #e2e8f0;
            color: #0f172a;
            padding: 10px 16px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            white-space: nowrap;
            margin-left: 8px;
          }
        }
      `}</style>
    </nav>
  );
}
