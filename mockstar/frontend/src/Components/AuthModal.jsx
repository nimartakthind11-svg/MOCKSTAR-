import React, { useState, useEffect, useRef } from "react";

const AuthModal = ({ isOpen, onClose, initialMode = "login", onLoginSuccess, onSignupSuccess }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [shake, setShake] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setEmail("");
      setPassword("");
      setName("");
      setAgreeTerms(false);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && (!name || !agreeTerms))) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (mode === "signup") {
      if (onSignupSuccess) onSignupSuccess(name.trim());
      setEmail(""); setPassword(""); setAgreeTerms(false);
      setMode("login");
    } else {
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: 7,
    fontWeight: 600,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    background: "var(--bg-input)",
    border: "1.5px solid var(--border)",
    borderRadius: 12,
    color: "var(--text-primary)",
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  return (
    <div
      className="animate-fadeIn"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(19,20,22,0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: 16,
      }}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={shake ? "animate-shake" : "animate-scaleIn"}
        style={{
          width: "100%",
          maxWidth: 440,
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: "36px 32px 32px",
          position: "relative",
          boxShadow: "var(--shadow-lg), 0 0 60px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow top */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "50%",
            transform: "translateX(-50%)",
            width: 280,
            height: 140,
            background: "radial-gradient(ellipse, rgba(182,94,66,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "var(--bg-subtle)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-muted)",
            transition: "all 0.2s ease",
            zIndex: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-subtle)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
              boxShadow: "0 0 10px var(--accent-glow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.8 4.2L11 4.8L8.6 7.2L9.2 10.5L6 8.8L2.8 10.5L3.4 7.2L1 4.8L4.2 4.2L6 1Z" fill="white" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>Mockstar</span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 28,
            fontWeight: 600,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 24,
            position: "relative",
            zIndex: 1,
          }}
        >
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            padding: 4,
            borderRadius: 14,
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            marginBottom: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 4,
              bottom: 4,
              left: 4,
              width: "calc(50% - 8px)",
              borderRadius: 10,
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
              transform: mode === "login" ? "translateX(0)" : "translateX(calc(100% + 8px))",
            }}
          />
          {["login", "signup"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              style={{
                position: "relative",
                zIndex: 1,
                flex: 1,
                padding: "9px 0",
                textAlign: "center",
                fontSize: 13,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                color: mode === m ? "var(--text-primary)" : "var(--text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s ease",
                borderRadius: 10,
              }}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {/* Sliding forms */}
        <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
          <div
            style={{
              display: "flex",
              width: "200%",
              transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
              transform: mode === "login" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} style={{ width: "50%", paddingRight: 8, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Email address</label>
                <input
                  type="email"
                  id="login-email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  placeholder="you@example.com"
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "var(--shadow-glow)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div style={{ marginBottom: 16, position: "relative" }}>
                <label style={labelStyle}>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ ...inputStyle, paddingRight: 48 }}
                  placeholder="••••••••"
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "var(--shadow-glow)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 12, bottom: 12, background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", padding: 2, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
                <button type="button" style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "var(--accent)",
                  color: "#F8F5F2",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-hover)"; e.currentTarget.style.boxShadow = "0 8px 24px var(--accent-glow)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                onMouseDown={e => e.currentTarget.style.transform = "translateY(0) scale(0.98)"}
              >
                Log In
              </button>
            </form>

            {/* SIGNUP FORM */}
            <form onSubmit={handleSubmit} style={{ width: "50%", paddingLeft: 8, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Full name</label>
                <input type="text" id="signup-name" value={name} onChange={e => setName(e.target.value)} required={mode === "signup"} style={inputStyle} placeholder="Jane Smith"
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "var(--shadow-glow)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Email address</label>
                <input type="email" id="signup-email" value={email} onChange={e => setEmail(e.target.value)} required={mode === "signup"} style={inputStyle} placeholder="you@example.com"
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "var(--shadow-glow)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div style={{ marginBottom: 16, position: "relative" }}>
                <label style={labelStyle}>Password</label>
                <input type={showPassword ? "text" : "password"} id="signup-password" value={password} onChange={e => setPassword(e.target.value)} required={mode === "signup"} style={{ ...inputStyle, paddingRight: 48 }} placeholder="Min. 8 characters"
                  onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "var(--shadow-glow)"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, bottom: 12, background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", padding: 2 }}
                  onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
                  onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}>
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  required={mode === "signup"}
                  style={{ marginTop: 2, width: 16, height: 16, accentColor: "var(--accent)", flexShrink: 0, cursor: "pointer" }}
                />
                <label htmlFor="agree-terms" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, cursor: "pointer", userSelect: "none" }}>
                  I agree to the{" "}
                  <button type="button" style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0 }}>Terms of Service</button>
                  {" "}and{" "}
                  <button type="button" style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 500, padding: 0 }}>Privacy Policy</button>
                </label>
              </div>

              <button
                type="submit"
                style={{ width: "100%", padding: "14px", background: "var(--accent)", color: "#F8F5F2", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "0.01em" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-hover)"; e.currentTarget.style.boxShadow = "0 8px 24px var(--accent-glow)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ padding: "0 14px", fontSize: 11, color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Or continue with
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {/* Social buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "Google", icon: (<svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>) },
            { label: "GitHub", icon: (<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>) },
          ].map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "11px",
                background: "var(--bg-subtle)",
                border: "1.5px solid var(--border)",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                color: "var(--text-primary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.background = "var(--bg-card)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-subtle)"; }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
