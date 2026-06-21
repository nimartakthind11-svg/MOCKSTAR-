import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FooterSteps from "./components/FooterSteps";

function App() {
  return (
    // <div className="min-h-screen bg-[#F4F5F2]">
    <main className="min-h-screen flex flex-col bg-[#F4F5F2]"> 

        <Navbar />
        <Hero />
        <FooterSteps />

    </main>
  );
}

export default App;