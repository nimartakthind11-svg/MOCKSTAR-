import React, { useState, useEffect, useRef } from 'react';

/* ─── IntersectionObserver hook ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section heading ─── */
function SectionHead({ title, subtitle, align = 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 64, display: 'flex', flexDirection: 'column', alignItems: align === 'center' ? 'center' : 'flex-start' }}>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: '0 0 16px',
          maxWidth: 700,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'var(--text-muted)', margin: 0, maxWidth: 600, lineHeight: 1.5 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const injectMarqueeStyles = () => {
  if (document.getElementById('marquee-styles')) return;
  const s = document.createElement('style');
  s.id = 'marquee-styles';
  s.textContent = `
    @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animate-marquee { display: flex; width: max-content; animation: scroll-left 35s linear infinite; }
    .animate-marquee:hover { animation-play-state: paused; }
    
    .bento-card { transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease; }
    .bento-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
  `;
  document.head.appendChild(s);
};

/* ─── MAIN LANDING ─── */
export default function Landing({ onStartPractice }) {
  useEffect(() => {
    injectMarqueeStyles();
  }, []);

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative' }}>
      
      {/* Domains Marquee (Trust bar right under hero) */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontWeight: 600 }}>Ready for any domain</span>
        </div>
        
        <div style={{ display: 'flex', width: '200%', position: 'relative' }}>
          {/* Fades on edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, var(--bg-card), transparent)', zIndex: 1 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, var(--bg-card), transparent)', zIndex: 1 }} />

          <div className="animate-marquee" style={{ gap: 24, paddingRight: 24 }}>
            {[
              { label: 'Frontend / React', icon: '⚛️' },
              { label: 'Backend / Node.js', icon: '🟢' },
              { label: 'Data Science', icon: '📊' },
              { label: 'Machine Learning', icon: '🤖' },
              { label: 'Product Management', icon: '💡' },
              { label: 'DevOps / Cloud', icon: '☁️' },
              // Duplicate for smooth infinite scroll
              { label: 'Frontend / React', icon: '⚛️' },
              { label: 'Backend / Node.js', icon: '🟢' },
              { label: 'Data Science', icon: '📊' },
              { label: 'Machine Learning', icon: '🤖' },
              { label: 'Product Management', icon: '💡' },
              { label: 'DevOps / Cloud', icon: '☁️' },
            ].map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px',
                  borderRadius: 999, border: `1px solid var(--border)`, background: 'var(--bg-primary)',
                  boxShadow: 'var(--shadow-sm)', whiteSpace: 'nowrap'
                }}
              >
                <span style={{ fontSize: 16 }}>{d.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Scroll: How it works ── */}
      <section id="how-it-works" style={{ padding: '160px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap' }}>
          
          {/* Left side (Sticky) */}
          <div style={{ flex: '1 1 400px', alignSelf: 'flex-start', position: 'sticky', top: 120 }}>
            <SectionHead title="A completely new way to prepare." align="left" subtitle="Stop relying on generic question banks. We read your resume and dynamically generate questions exactly like a real recruiter would." />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 40 }}>
              {[
                { title: 'Resume Parsing', desc: 'Instant extraction of core tech stack & seniority.' },
                { title: 'Live Environment', desc: 'Distraction-free chat with integrity monitoring.' },
                { title: 'Actionable Reports', desc: 'Full transcripts and objective scoring.' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: 15, color: 'var(--text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side (Scrolling Cards) */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: 60 }}>
            {[
              { num: '01', title: 'Upload your resume', desc: 'Drag and drop your PDF. We instantly parse your skills and predict your target domain.'},
              { num: '02', title: 'Configure the session', desc: 'Choose technical, behavioral, or mixed. Adjust the difficulty dial to match your upcoming real-world interview.' },
              { num: '03', title: 'Practice live', desc: 'Answer one question at a time in a distraction-free UI. We monitor tab switches to ensure integrity.'},
              { num: '04', title: 'Get scored', desc: 'Receive a full timeline transcript and an objective score. See exactly what you nailed and what you missed.' },
            ].map((step, i) => (
              <div
                key={step.num}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 32,
                  padding: '48px',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: -40, right: -40, fontSize: 160, opacity: 0.05, filter: 'grayscale(100%)' }}>
                  {step.visual}
                </div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', display: 'block', marginBottom: 16 }}>STEP {step.num}</span>
                <h3 style={{ fontSize: 32, fontWeight: 500, fontFamily: "'Fraunces', serif", color: 'var(--text-primary)', marginBottom: 16, position: 'relative', zIndex: 1, letterSpacing: '-0.01em' }}>{step.title}</h3>
                <p style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, position: 'relative', zIndex: 1 }}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Bento Grid: Features ── */}
      <section id="features" style={{ padding: '120px 32px', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <SectionHead title="Engineered for reality." subtitle="Features designed specifically to mimic the pressure and context of high-stakes technical interviews." />
          </FadeUp>
          
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
              gridAutoRows: 'minmax(320px, auto)',
            }}
          >
            {/* Large Card 1 */}
            <FadeUp delay={0.1}>
              <div className="bento-card" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 32, padding: 48, height: '100%', display: 'flex', flexDirection: 'column', gridColumn: '1 / -1', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -100, top: -100, width: 400, height: 400, background: 'radial-gradient(ellipse, rgba(182,94,66,0.1) 0%, transparent 70%)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <h3 style={{ fontSize: 32, fontWeight: 500, fontFamily: "'Fraunces', serif", color: 'var(--text-primary)', marginBottom: 16, letterSpacing: '-0.01em' }}>Context-Aware Intelligence</h3>
                  <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6 }}>Our engine doesn't just match keywords. It understands the seniority of your resume, tailoring question complexity specifically to your actual experience level.</p>
                </div>
              </div>
            </FadeUp>

            {/* Small Card 1 */}
            <FadeUp delay={0.2}>
              <div className="bento-card" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 32, padding: 40, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Integrity Monitoring</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>Tracks tab switches and copy-pasting to simulate high-stakes environments perfectly.</p>
              </div>
            </FadeUp>

            {/* Small Card 2 */}
            <FadeUp delay={0.3}>
              <div className="bento-card" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 32, padding: 40, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>Distraction-Free UI</h3>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>A minimal chat interface ensures you focus on answering the question, nothing else.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FAQ 2-Column ── */}
      <section id="faq" style={{ padding: '160px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <SectionHead title="Common questions." align="center" />
          </FadeUp>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 40 }}>
            {[
              { q: 'Is my resume data safe?', a: "Yes — your resume is only used temporarily to extract skills and predict your domain. It isn't stored permanently on our servers or shared anywhere." },
              { q: 'Is Mockstar really free to use?', a: 'Yes, it is completely free during this build phase. Premium features and pricing may come in later versions, but core practice will always be accessible.' },
              { q: 'How accurate is the domain prediction?', a: 'It currently uses strict keyword heuristics which are highly accurate for clear profiles. A trained ML model is slated for the next phase.' },
              { q: 'Can I retake interviews?', a: 'Absolutely. Each session dynamically draws from a randomized question subset based on your configuration, meaning no two interviews feel exactly the same.' },
            ].map((f, i) => (
              <FadeUp key={f.q} delay={i * 0.1}>
                <div style={{ paddingBottom: 24, borderBottom: '1px solid var(--border)', height: '100%' }}>
                  <h4 style={{ fontSize: 19, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>{f.q}</h4>
                  <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{f.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '0 32px 120px' }}>
        <FadeUp>
          <div
            style={{
              maxWidth: 1100, margin: '0 auto', background: 'var(--dark-bg)',
              borderRadius: 40, padding: '100px 40px', textAlign: 'center',
              position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 400, background: 'radial-gradient(ellipse at center, rgba(59, 56, 56, 0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 500, color: '#F8F5F2', marginBottom: 24, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Stop winging it.
              </h2>
              <p style={{ fontSize: 20, color: '#A89E98', marginBottom: 48, lineHeight: 1.5, fontWeight: 400 }}>
                Join thousands of candidates who practice with Mockstar before their real interviews.
              </p>
              <button
                onClick={onStartPractice}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '18px 48px',
                  background: 'white', color: '#131416', border: 'none', borderRadius: 999,
                  fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer',
                  transition: 'all 0.3s ease', boxShadow: '0 8px 32px rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,255,255,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.1)'; }}
              >
                Create free account
              </button>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 32px', background: 'var(--bg-card)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.8 4.2L11 4.8L8.6 7.2L9.2 10.5L6 8.8L2.8 10.5L3.4 7.2L1 4.8L4.2 4.2L6 1Z" fill="white" /></svg>
            </div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>Mockstar</span>
          </div>
          
          <div style={{ display: 'flex', gap: 32 }}>
            <a href="#how-it-works" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>How it works</a>
            <a href="#features" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Features</a>
            <a href="#faq" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>FAQ</a>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>© 2026 Mocktane</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
