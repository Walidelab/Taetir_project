import React from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
export default function WelcomeCard() {
  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
      {/* Decorative glowing circles */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-5">
          <Sparkles size={30} className="text-yellow-300 drop-shadow" />
          <h2 className="text-3xl font-extrabold tracking-tight">
            Hello S1 in{" "}
            <span className="text-3xl font-bold text-blue-900 text-center mb-8 tracking-wide">
              TAETIR
            </span>
            !
          </h2>
        </div>

        <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
          We’re here to help unlock your full potential through meaningful
          mentorship connections and guided learning experiences.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/messages"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-100 transition-all duration-200"
          >
            Start
          </Link>
          <Link
            to="/find-mentors"
            className="relative border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 overflow-hidden"
          >
            <span className="z-10 relative">Find Mentors</span>
            <div className="absolute inset-0 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-lg z-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
