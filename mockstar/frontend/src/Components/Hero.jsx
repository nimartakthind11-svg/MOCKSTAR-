import React, { useState } from 'react';

const Hero = ({ onStartPractice }) => {
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(64px, 10vw, 120px) 32px clamp(48px, 8vw, 96px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(700px, 90vw)',
          height: 'min(500px, 60vw)',
          background: 'radial-gradient(ellipse at center, rgba(182,94,66,0.12) 0%, rgba(182,94,66,0.04) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating badge */}
      <div
        className="animate-fadeUp ms-badge"
        style={{ animationDelay: '0.1s', marginBottom: 28, zIndex: 1 }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
            animation: 'dotPulse 2s ease-in-out infinite',
          }}
        />
        Resume-matched · AI-powered · Live integrity tracking
      </div>

      {/* Main headline */}
      <h1
        className="animate-fadeUp"
        style={{
          animationDelay: '0.18s',
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2.4rem, 6.5vw, 5.2rem)',
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          maxWidth: 800,
          zIndex: 1,
          marginBottom: 8,
        }}
      >
        Practice the interview{' '}
        <em
          style={{
            fontStyle: 'italic',
            fontWeight: 300,
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 60%, var(--accent) 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 4s linear infinite',
          }}
        >
          before
        </em>{' '}
        it's the real one.
      </h1>

      {/* Subtext */}
      <p
        className="animate-fadeUp"
        style={{
          animationDelay: '0.26s',
          maxWidth: 520,
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: 'var(--text-muted)',
          lineHeight: 1.7,
          fontWeight: 400,
          zIndex: 1,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        Upload your resume. Get matched questions.
        See exactly how the conversation went, every time.
      </p>

      {/* CTA Button */}
      <div className="animate-fadeUp" style={{ animationDelay: '0.34s', zIndex: 1 }}>
        <button
          id="hero-start-btn"
          onClick={onStartPractice}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '15px 36px',
            background: btnHover ? 'var(--accent-hover)' : 'var(--accent)',
            color: '#F8F5F2',
            border: 'none',
            borderRadius: '999px',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: 'pointer',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: btnHover
              ? '0 16px 40px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.1)'
              : '0 6px 20px var(--accent-glow)',
            transform: btnHover ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
            letterSpacing: '0.01em',
          }}
        >
          Start practicing
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.25s ease',
              transform: btnHover ? 'translateX(4px)' : 'translateX(0)',
              fontSize: 18,
            }}
          >
            →
          </span>
        </button>
      </div>

      {/* Social proof strip */}
      <div
        className="animate-fadeUp"
        style={{
          animationDelay: '0.42s',
          marginTop: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 1,
        }}
      >
        {/* Mock avatars */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['#B65E42', '#7A9E7E', '#6B7FAD', '#C4875A'].map((color, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: color,
                border: '2px solid var(--bg-primary)',
                marginLeft: i === 0 ? 0 : -8,
                zIndex: 4 - i,
                position: 'relative',
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500, marginLeft: 6 }}>
          Trusted by job seekers preparing for real interviews
        </span>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-float"
        style={{
          marginTop: 60,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: 0.4,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 22,
            height: 36,
            borderRadius: 99,
            border: '1.5px solid var(--border-strong)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 3,
              height: 8,
              borderRadius: 99,
              background: 'var(--accent)',
              animation: 'float 1.6s ease-in-out infinite',
            }}
          />
        </div>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default Hero;