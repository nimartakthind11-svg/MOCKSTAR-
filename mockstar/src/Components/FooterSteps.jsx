import react from 'react';

const FooterSteps = () => {
    return(
        <section className="w-full py-12">
          <div className="flex justify-center gap-16 text-lg text-[#5F5E5A]">

            <div>
              <span className="font-mono text-[#1C2127]">🟤</span>
              {" "}Upload Resume
            </div>

            <div>
              <span className="font-mono text-[#1C2127]">🟤</span>
              {" "}Practice Live
            </div>

            <div>
              <span className="font-mono text-[#1C2127]">🟤</span>
              {" "}Get Your Report
            </div>

          </div>
        </section>
    )
}

export default FooterSteps;
