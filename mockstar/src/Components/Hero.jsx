import React from 'react';

const Hero = ({ onStartPractice }) => {
    return(

      <section className="flex-1 text-center flex flex-col justify-center px-6 my-10">
          <h1 className="max-w-4xl mx-auto text-7xl leading-tight font-serif text-[#1C2127]">
            Practice the interview before it's the real one.
          </h1>

          <p className="max-w-xl mx-auto mt-5 text-[#5F5E5A] text-lg">
            Upload your resume. Get matched questions.
            See exactly how the conversation went,
            every time.
          </p>

          <button 
            onClick={onStartPractice}
            className="mt-10 mx-auto bg-[#A6573F] text-[#F4F5F2] px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-[#914731] hover:scale-105 active:scale-98 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
          >
            Start practicing →
          </button>

        </section>
    )
}

export default Hero;