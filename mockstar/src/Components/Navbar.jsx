import react from 'react';

const Navbar = () => {
    return(
        <nav className="w-full flex items-center justify-between px-16 py-8">

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#A6573F]" />
            <span className="font-mono text-lg tracking-wide">
            Mockstar by Mocktane
            </span>
          </div>

          <div className="flex gap-8 text-lg text-[#5F5E5A]">
            <a href="#"> for queries: mocktane@gmail.com</a>
          </div>

          <div className="flex items-center gap-3">

            <button className="w-14 h-8 rounded-full border border-[#DCDAD2] flex items-center px-1">
              <div className="w-6 h-6 rounded-full bg-[#1C2127] text-white flex items-center justify-center text-xs">
                ☀️
              </div>
            </button>

            <button className="border border-[#1C2127] px-4 py-2 rounded-md text-lg">
              Log in/Sign up
            </button>

          </div>
        </nav>

    )
}

export default Navbar;
