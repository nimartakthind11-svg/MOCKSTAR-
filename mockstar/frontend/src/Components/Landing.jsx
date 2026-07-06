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
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section heading ─── */
function SectionHead({ tag, title, align = 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: 48 }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          marginBottom: 12,
        }}
      >
        <span style={{ width: 16, height: 1.5, background: 'var(--accent)', display: 'inline-block' }} />
        {tag}
        <span style={{ width: 16, height: 1.5, background: 'var(--accent)', display: 'inline-block' }} />
      </span>
      <h2
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ─── Stats strip ─── */
const STATS = [
  { label: 'Domains', value: 'Multiple', sub: 'Data Sci · Web · DevOps', icon: '⬡' },
  { label: 'Questions', value: '100+', sub: 'Across all domains', icon: '◈' },
  { label: 'Difficulty levels', value: '3', sub: 'Easy · Medium · Hard', icon: '⬙' },
  { label: 'Integrity tracking', value: 'Live', sub: 'Every session', icon: '◉' },
];

function StatCard({ icon, label, value, sub, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 20,
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          cursor: 'default',
          transition: 'all 0.25s ease',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered ? 'var(--shadow-md), 0 0 0 3px var(--accent-glow)' : 'var(--shadow-sm)',
          minWidth: 200,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: hovered ? 'var(--accent)' : 'var(--accent-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            color: hovered ? '#F8F5F2' : 'var(--accent)',
            transition: 'all 0.25s ease',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 600,
              color: hovered ? 'var(--accent)' : 'var(--text-primary)',
              lineHeight: 1,
              transition: 'color 0.25s ease',
            }}
          >
            {value}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{label}</div>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── How It Works ─── */
const STEPS = [
  {
    num: '01',
    title: 'Upload your resume',
    desc: 'We read it, extract your skills, and automatically predict your domain — no manual input needed.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Practice live',
    desc: 'Pick interview type, difficulty, and question count. Answer one at a time, just like the real thing.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Get your report',
    desc: 'Full transcript, a performance score, and an honesty score so you know exactly where you stand.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

function StepCard({ num, title, desc, icon, delay, isLast }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: hovered ? 'var(--accent)' : 'var(--accent-soft)',
              border: `2px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: hovered ? '#F8F5F2' : 'var(--accent)',
              transition: 'all 0.25s ease',
              flexShrink: 0,
              boxShadow: hovered ? '0 0 0 4px var(--accent-glow)' : 'none',
            }}
          >
            {icon}
          </div>
          {!isLast && (
            <div
              style={{
                width: 1.5,
                flex: 1,
                minHeight: 40,
                background: 'linear-gradient(to bottom, var(--accent), transparent)',
                margin: '8px 0',
                opacity: 0.3,
              }}
            />
          )}
        </div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            flex: 1,
            background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
            border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 16,
            padding: '20px 24px',
            transition: 'all 0.25s ease',
            boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
            marginBottom: isLast ? 0 : 16,
            cursor: 'default',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--accent)',
                letterSpacing: '0.08em',
              }}
            >
              {num}
            </span>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h3>
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── Features ─── */
const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: 'Resume-matched questions',
    desc: 'Questions adapt to your actual extracted skills and predicted domain.',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Integrity monitoring',
    desc: 'Tab switches, paste attempts, and fullscreen exits are all tracked live.',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'Chat-style interview',
    desc: 'One question at a time, no distractions — just like talking to a real interviewer.',
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Session reports',
    desc: 'Full Q&A transcript with scores, so you can actually review and improve.',
  },
];

function FeatureCard({ icon, title, desc, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 20,
          padding: '24px',
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
          transition: 'all 0.25s ease',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
          cursor: 'default',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: 12,
            background: hovered ? 'var(--accent)' : 'var(--accent-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hovered ? '#F8F5F2' : 'var(--accent)',
            transition: 'all 0.25s ease',
          }}
        >
          {icon}
        </div>
        <div>
          <h3 style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6, margin: '0 0 6px' }}>{title}</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── Domains ─── */
const DOMAINS = [
  { label: 'Data Science', color: '#2F7B70', bg: 'rgba(47,123,112,0.08)' },
  { label: 'Web Development', color: '#B65E42', bg: 'rgba(182,94,66,0.08)' },
  { label: 'DevOps', color: '#5B5BD6', bg: 'rgba(91,91,214,0.08)' },
];

function DomainPill({ label, color, bg, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 28px',
          borderRadius: 999,
          border: `1.5px solid ${hovered ? color : 'var(--border)'}`,
          background: hovered ? bg : 'var(--bg-card)',
          cursor: 'default',
          transition: 'all 0.22s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hovered ? `0 4px 20px ${color}22` : 'var(--shadow-xs)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: color,
            transition: 'transform 0.22s ease',
            transform: hovered ? 'scale(1.4)' : 'scale(1)',
            display: 'inline-block',
            boxShadow: hovered ? `0 0 8px ${color}` : 'none',
          }}
        />
        <span style={{ fontSize: 14, fontWeight: 500, color: hovered ? color : 'var(--text-primary)', transition: 'color 0.22s ease' }}>
          {label}
        </span>
      </div>
    </FadeUp>
  );
}

/* ─── FAQ ─── */
const FAQS = [
  { q: 'Is my resume data safe?', a: "Yes — your resume is only used to extract skills and predict your domain. It isn't stored permanently or shared anywhere." },
  { q: 'Is Mockstar free to use?', a: 'Yes, completely free during this build phase. Pricing may come in later versions.' },
  { q: 'How accurate is the domain prediction?', a: 'It uses keyword matching right now — solid for clear profiles. A trained ML model (Logistic Regression) is the planned upgrade next phase.' },
  { q: 'Can I retake an interview in the same domain?', a: 'Yes — each session draws from a randomized question set, so no two interviews feel the same.' },
];

function FAQItem({ q, a, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 16,
          padding: '18px 22px',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: open ? 'var(--shadow-glow)' : 'var(--shadow-xs)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--text-primary)', flex: 1 }}>{q}</span>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: open ? 'var(--accent)' : 'var(--accent-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.25s ease',
            }}
          >
            <span
              style={{
                fontSize: 16,
                color: open ? '#F8F5F2' : 'var(--accent)',
                lineHeight: 1,
                transform: open ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform 0.25s ease',
                display: 'block',
              }}
            >
              +
            </span>
          </div>
        </div>
        <div
          style={{
            overflow: 'hidden',
            maxHeight: open ? '200px' : '0',
            opacity: open ? 1 : 0,
            transition: 'max-height 0.38s ease, opacity 0.25s ease',
          }}
        >
          <p style={{ fontSize: 13.5, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.7 }}>{a}</p>
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── CTA Button ─── */
function CtaButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '15px 36px',
        background: hovered ? '#C87050' : 'rgba(255,255,255,0.12)',
        color: '#F8F5F2',
        border: '1.5px solid rgba(255,255,255,0.25)',
        borderRadius: '999px',
        fontSize: 15,
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        backdropFilter: 'blur(8px)',
      }}
    >
      Start practicing
      <span style={{ display: 'inline-block', transition: 'transform 0.25s ease', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
    </button>
  );
}

/* ─── MAIN LANDING ─── */
export default function Landing({ onStartPractice }) {
  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* ── Stats Strip ── */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '40px 32px',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 16,
            flexWrap: 'wrap',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 0.08} />
          ))}
        </div>
      </div>

      {/* ── How It Works ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <SectionHead tag="How it works" title="Three steps, no surprises." />
          </FadeUp>
          <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            {STEPS.map((s, i) => (
              <StepCard key={s.num} {...s} delay={i * 0.1} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <div className="ms-divider" style={{ margin: '0 40px' }} />

      {/* ── Features ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <SectionHead tag="Why Mockstar" title="Built to feel like the real thing." />
          </FadeUp>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <div className="ms-divider" style={{ margin: '0 40px' }} />

      {/* ── Domains ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 96px) 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <SectionHead tag="Domains" title="Pick your field." />
          </FadeUp>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {DOMAINS.map((d, i) => (
              <DomainPill key={d.label} {...d} delay={i * 0.1} />
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p style={{ marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
              More domains coming soon
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="ms-divider" style={{ margin: '0 40px' }} />

      {/* ── FAQ ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 96px) 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeUp>
            <SectionHead tag="FAQ" title="Questions people ask first." />
          </FadeUp>
          <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((f, i) => (
              <FAQItem key={f.q} {...f} delay={i * 0.07} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '0 32px clamp(64px, 8vw, 96px)' }}>
        <FadeUp>
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              background: 'var(--dark-bg)',
              borderRadius: 28,
              padding: 'clamp(48px, 6vw, 80px) 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                height: 300,
                background: 'radial-gradient(ellipse at center, rgba(182,94,66,0.18) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-light)',
                  marginBottom: 16,
                }}
              >
                Ready when you are
              </span>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 500,
                  color: '#F8F5F2',
                  marginBottom: 12,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}
              >
                Ready to stop winging it?
              </h2>
              <p style={{ fontSize: 15, color: '#7A7068', marginBottom: 36, lineHeight: 1.6 }}>
                Takes two minutes to set up. No credit card, no fluff.
              </p>
              <CtaButton onClick={onStartPractice} />
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '28px 32px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.8 4.2L11 4.8L8.6 7.2L9.2 10.5L6 8.8L2.8 10.5L3.4 7.2L1 4.8L4.2 4.2L6 1Z" fill="white" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              Mockstar
            </span>
            <span style={{ color: 'var(--border-strong)', fontSize: 12 }}>by Mocktane</span>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>mocktane@gmail.com</span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>© 2026 Mocktane</span>
        </div>
      </footer>
    </div>
  );
}
