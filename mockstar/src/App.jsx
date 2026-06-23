import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import FooterSteps from "./Components/FooterSteps";
import AuthModal from "./Components/AuthModal";

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F4F5F2] relative"> 
      <Navbar onAuthClick={() => openAuth("login")} />
      <Hero onStartPractice={() => openAuth("signup")} />
      <FooterSteps />
      
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode}
      />
    </main>
  );
}

export default App;