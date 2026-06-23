import React, { useState } from "react";

const BuildProfile = ({ initialProfile, onSave, onCancel }) => {
  const [username, setUsername] = useState(initialProfile.username || "");
  const [focusDomain, setFocusDomain] = useState(initialProfile.focusDomain || "");
  const [coreSkills, setCoreSkills] = useState(initialProfile.coreSkills || "");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !focusDomain.trim() || !coreSkills.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onSave({
      username: username.trim(),
      focusDomain: focusDomain.trim(),
      coreSkills: coreSkills.trim(),
      isBuilt: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F2] text-[#1C2127] flex flex-col justify-center items-center p-6 animate-fadeIn">
      {/* Brand logo header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-[#A6573F]" />
        <span className="font-mono text-xl tracking-wide text-[#1C2127] font-semibold">
          Mockstar by Mocktane
        </span>
      </div>

      {/* Profile Form Card */}
      <div
        className={`bg-white w-full max-w-md rounded-2xl border border-[#DCDAD2] shadow-xl p-8 transition-all duration-300 ${
          shake ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-3xl font-serif text-[#1C2127] mb-2 font-bold leading-tight">
          Build Your Profile
        </h2>
        <p className="text-[#5F5E5A] text-sm mb-6 leading-relaxed">
          Set up your profile information. This data will be used to customize your dashboard metrics and match your mock interview questions.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=" "
              required
              className="peer w-full px-4 py-3 bg-white border border-[#DCDAD2] rounded-lg text-[#1C2127] focus:outline-none focus:border-[#A6573F] focus:ring-1 focus:ring-[#A6573F] transition-all"
            />
            <label
              htmlFor="username"
              className="absolute left-3 top-3.5 text-[#5F5E5A] text-sm pointer-events-none transition-all duration-200 
                         peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5F5E5A]
                         peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#A6573F] peer-focus:bg-white peer-focus:px-1.5
                         peer-[:not(:placeholder-shown)]:top-[-9px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
            >
              Username / Full Name
            </label>
          </div>

          {/* Focus Domain Input */}
          <div className="relative">
            <input
              type="text"
              id="focusDomain"
              value={focusDomain}
              onChange={(e) => setFocusDomain(e.target.value)}
              placeholder=" "
              required
              className="peer w-full px-4 py-3 bg-white border border-[#DCDAD2] rounded-lg text-[#1C2127] focus:outline-none focus:border-[#A6573F] focus:ring-1 focus:ring-[#A6573F] transition-all"
            />
            <label
              htmlFor="focusDomain"
              className="absolute left-3 top-3.5 text-[#5F5E5A] text-sm pointer-events-none transition-all duration-200 
                         peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5F5E5A]
                         peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#A6573F] peer-focus:bg-white peer-focus:px-1.5
                         peer-[:not(:placeholder-shown)]:top-[-9px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
            >
              Focus Domain (e.g. Frontend Development)
            </label>
          </div>

          {/* Core Skills Input */}
          <div className="relative">
            <input
              type="text"
              id="coreSkills"
              value={coreSkills}
              onChange={(e) => setCoreSkills(e.target.value)}
              placeholder=" "
              required
              className="peer w-full px-4 py-3 bg-white border border-[#DCDAD2] rounded-lg text-[#1C2127] focus:outline-none focus:border-[#A6573F] focus:ring-1 focus:ring-[#A6573F] transition-all"
            />
            <label
              htmlFor="coreSkills"
              className="absolute left-3 top-3.5 text-[#5F5E5A] text-sm pointer-events-none transition-all duration-200 
                         peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5F5E5A]
                         peer-focus:top-[-9px] peer-focus:text-xs peer-focus:text-[#A6573F] peer-focus:bg-white peer-focus:px-1.5
                         peer-[:not(:placeholder-shown)]:top-[-9px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-1.5"
            >
              Core Skills (e.g. React, CSS, JavaScript)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#A6573F] text-[#F4F5F2] rounded-lg font-semibold hover:bg-[#914731] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer text-sm"
            >
              Save Profile
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3.5 bg-white border border-[#DCDAD2] text-[#5F5E5A] hover:text-[#1C2127] hover:border-[#1C2127] rounded-lg font-semibold active:scale-[0.98] transition-all duration-200 flex items-center justify-center cursor-pointer text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildProfile;
