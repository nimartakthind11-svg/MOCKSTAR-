import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ onAuthClick }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [hoverAuth, setHoverAuth] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="ms-glass"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'box-shadow 0.3s ease',
        boxShadow: navScrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div
        className="ms-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, userSelect: 'none' }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)',
              boxShadow: '0 0 12px var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.8 4.2L11 4.8L8.6 7.2L9.2 10.5L6 8.8L2.8 10.5L3.4 7.2L1 4.8L4.2 4.2L6 1Z" fill="white" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 17,
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              Mockstar
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              by Mocktane
            </span>
          </div>
        </div>

        {/* Center link */}
        <div className="hide-mobile">
          <a
            href="mailto:mocktane@gmail.com"
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s ease',
              position: 'relative',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >
            mocktane@gmail.com
          </a>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Theme toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            <span className="theme-toggle__thumb">
              {isDark ? '🌙' : '☀️'}
            </span>
          </button>

          {/* Auth button */}
          <button
            id="navbar-auth-btn"
            onClick={onAuthClick}
            onMouseEnter={() => setHoverAuth(true)}
            onMouseLeave={() => setHoverAuth(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '9px 20px',
              background: hoverAuth ? 'var(--accent-hover)' : 'var(--accent)',
              color: '#F8F5F2',
              border: 'none',
              borderRadius: '999px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: hoverAuth ? '0 6px 20px var(--accent-glow)' : '0 2px 8px var(--accent-glow)',
              transform: hoverAuth ? 'translateY(-1px)' : 'translateY(0)',
              whiteSpace: 'nowrap',
            }}
          >
            Log in / Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
