import React from "react";
import { Search, Bell, User } from "lucide-react";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="rounded-lg border border-blue-400 bg-gradient-to-r from-gray-800 to-blue-500 text-white shadow-md p-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white drop-shadow-sm">
            Welcome!
          </h2>
          <h6 className=" font-semibold text-white drop-shadow-sm">
            {currentDate}
          </h6>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search mentors, sessions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button className="relative p-2 text-white hover:bg-white/20 bg-white/10 rounded-xl transition duration-200 backdrop-blur-sm shadow-md">
              <Bell size={20} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow">
                1
              </span>
            </button>

            <button className="flex items-center bg-white/10 hover:bg-white/20 text-white rounded-full transition duration-200 backdrop-blur-sm shadow-md">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-white-500 rounded-full flex items-center justify-center shadow-sm">
                <User size={16} className="text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
