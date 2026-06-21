import react from 'react';

const Hero = () => {
    return(

      <section className="flex-1 text-center flex flex-col justify-center px-6">
          <h1 className="max-w-4xl mx-auto text-7xl leading-tight font-serif text-[#1C2127]">
            Practice the interview before it's the real one.
          </h1>

          <p className="max-w-xl mx-auto mt-5 text-[#5F5E5A]">
            Upload your resume. Get matched questions.
            See exactly how the conversation went,
            every time.
          </p>

          <button className="mt-10 bg-[#A6573F] text-white px-7 py-3 rounded-md">
            Start practicing →
          </button>

        </section>
    )
}

export default Hero;