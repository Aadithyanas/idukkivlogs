'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/techodepedutech/', icon: '📸' },
    { name: 'YouTube', url: '#', icon: '🎬' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'GitHub', url: '#', icon: '💻' },
    { name: 'LinkedIn', url: '#', icon: '💼' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Travel Vlogs', href: '#travel' },
    { name: 'Projects', href: '#projects' },
    { name: '3D Printing', href: '#printing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer
      style={{
        background: 'var(--dark-800)',
        borderTop: '1px solid rgba(10, 82, 150, 0.08)',
        padding: '80px 0 30px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            marginBottom: '60px',
          }}
        >
          {/* Brand */}
          <div>
            <h3
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-space), sans-serif',
                fontWeight: 800,
                fontSize: '1.5rem',
                marginBottom: '16px',
              }}
            >
              TECHODEP EDUTECH
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Empowering minds and building the future through educational technology, robotics, 
              3D printing, and innovation. Join our community.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--dark-600)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--neon-green)';
                    e.currentTarget.style.boxShadow = '0 0 12px rgba(10,82,150,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '1rem',
                marginBottom: '20px',
                letterSpacing: '0.05em',
              }}
            >
              QUICK LINKS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              style={{
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '1rem',
                marginBottom: '20px',
                letterSpacing: '0.05em',
              }}
            >
              STAY UPDATED
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Get the latest travel vlogs, project updates, and innovation stories.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-input"
                style={{
                  flex: 1,
                  borderRadius: '50px',
                  padding: '10px 18px',
                  fontSize: '0.85rem',
                }}
              />
              <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--dark-600)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {currentYear} Techodep Edutech LLP. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Made with 💚 from Idukki, Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}
