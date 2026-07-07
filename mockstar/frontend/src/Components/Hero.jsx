import React, { useEffect, useState } from 'react';

const injectStyles = () => {
  if (document.getElementById('split-hero-styles')) return;
  const s = document.createElement('style');
  s.id = 'split-hero-styles';
  s.textContent = `
    @keyframes float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
    @keyframes float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes float3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
    .animate-float1 { animation: float1 6s ease-in-out infinite; }
    .animate-float2 { animation: float2 5s ease-in-out infinite 1s; }
    .animate-float3 { animation: float3 7s ease-in-out infinite 2s; }
  `;
  document.head.appendChild(s);
};

const Hero = ({ onStartPractice }) => {
  injectStyles();
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      
      {/* Background Gradients & Grid */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '80%', background: 'radial-gradient(ellipse at top right, rgba(182,94,66,0.12) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: '60%', background: 'radial-gradient(ellipse at bottom left, rgba(182,94,66,0.08) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }} />
      
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 0.4, maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', zIndex: 0, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1, padding: '120px 40px 60px' }}>
        
        {/* Left Column: Text & CTA */}
        <div style={{ flex: '1 1 50%', maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          <div className="animate-fadeUp" style={{ animationDelay: '0s', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--accent-soft)', borderRadius: 999, marginBottom: 24, border: '1px solid var(--accent-medium)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI-POWERED INTERVIEW PREP</span>
          </div>

          <h1 className="animate-fadeUp" style={{ animationDelay: '0.1s', fontFamily: "'Fraunces', serif", fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '0 0 24px' }}>
            Practice the interview <br />
            <span style={{ color: 'var(--accent)' }}>before it's the real one.</span>
          </h1>

          <p className="animate-fadeUp" style={{ animationDelay: '0.2s', fontSize: 'clamp(16px, 1.8vw, 18px)', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 40px', maxWidth: 520 }}>
            Upload your resume, get matched questions, and review every answer with a full transcript and performance score — every session.
          </p>

          <div className="animate-fadeUp" style={{ animationDelay: '0.3s', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <button
              onClick={onStartPractice}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px',
                background: hoverBtn ? 'var(--accent-hover)' : 'var(--accent)', color: '#fff',
                border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: "'Inter', sans-serif",
                cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: hoverBtn ? '0 8px 24px var(--accent-glow)' : '0 4px 12px var(--accent-glow)',
                transform: hoverBtn ? 'translateY(-1px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
            >
              Start practicing free →
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 24px',
                background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)',
                borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: "'Inter', sans-serif",
                cursor: 'pointer', transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              See how it works
            </button>
          </div>

          <div className="animate-fadeUp" style={{ animationDelay: '0.4s', display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 60 }}>
            {['Resume parsing', 'Live Q&A', 'Performance report', 'Integrity tracking'].map(tag => (
              <div key={tag} style={{ padding: '6px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 999, fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>
                {tag}
              </div>
            ))}
          </div>

          <div className="animate-fadeUp" style={{ animationDelay: '0.5s', display: 'flex', gap: 40 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-primary)' }}>100+</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>Questions</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-primary)' }}>3</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>Difficulty levels</p>
            </div>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-primary)' }}>Multiple</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>Domains</p>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Cards Composition */}
        <div className="hide-mobile" style={{ flex: '1 1 50%', position: 'relative', height: 600 }}>
          
          {/* Main Card: Live Interview */}
          <div className="animate-float1 animate-fadeUp" style={{ animationDelay: '0.2s', position: 'absolute', top: 80, right: 40, width: 440, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Interview</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, margin: '0 0 8px' }}>Q3 of 8</p>
            <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.5, margin: '0 0 24px', fontWeight: 500 }}>
              Walk me through how you'd design a scalable REST API for a high-traffic e-commerce application.
            </p>
            <div style={{ width: '100%', height: 4, background: 'var(--bg-subtle)', borderRadius: 2, marginBottom: 16 }}>
              <div style={{ width: '35%', height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-faint)', fontFamily: "'JetBrains Mono', monospace" }}>
              <span>Technical - Medium</span>
              <span>2:34 elapsed</span>
            </div>
          </div>

          {/* Overlapping Card: Score Badge */}
          <div className="animate-float2 animate-fadeUp" style={{ animationDelay: '0.4s', position: 'absolute', top: 50, right: 10, width: 140, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'var(--shadow-md)', zIndex: 10 }}>
            <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Overall Score</span>
            <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="64" height="64" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.87)} strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                87<span style={{ fontSize: 10, color: 'var(--text-muted)' }}>/100</span>
              </div>
            </div>
          </div>

          {/* Bottom Left Card: Resume Analysis */}
          <div className="animate-float3 animate-fadeUp" style={{ animationDelay: '0.6s', position: 'absolute', top: 280, left: 20, width: 260, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'inline-block', background: 'var(--bg-subtle)', padding: '4px 8px', borderRadius: '4px 4px 0 0', position: 'absolute', top: -23, left: 16 }}>
              <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progress</span>
            </div>
            <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>Resume Analysis</span>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-primary)' }}>Domain: <span style={{ fontWeight: 600 }}>Web Development</span></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span style={{ padding: '4px 8px', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>React</span>
              <span style={{ padding: '4px 8px', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>Node.js</span>
              <span style={{ padding: '4px 8px', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>TypeScript</span>
              <span style={{ padding: '4px 8px', background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderRadius: 4, fontSize: 11, fontWeight: 500 }}>+4</span>
            </div>
          </div>

          {/* Bottom Right Card: AI Feedback */}
          <div className="animate-float2 animate-fadeUp" style={{ animationDelay: '0.8s', position: 'absolute', top: 380, right: 60, width: 280, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-md)' }}>
            <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 12 }}>AI Feedback</span>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Strong structure on system design. Add more specific examples in follow-ups.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ width: '100%', height: 4, background: 'var(--bg-subtle)', borderRadius: 2 }}><div style={{ width: '85%', height: '100%', background: 'var(--accent)', borderRadius: 2 }}/></div>
              <div style={{ width: '100%', height: 4, background: 'var(--bg-subtle)', borderRadius: 2 }}><div style={{ width: '70%', height: '100%', background: 'var(--accent)', borderRadius: 2 }}/></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;