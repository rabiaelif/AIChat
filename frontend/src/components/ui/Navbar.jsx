import React, { useState } from "react";
import { AiOutlineRobot } from "react-icons/ai";
import { CiBellOn, CiSettings } from "react-icons/ci";
import { BsFillCircleFill, BsPerson } from "react-icons/bs";

export default function Navbar({ otherUser, alias, setAlias }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div
      className="
        border-b sticky top-0 border-gray-200
        bg-white flex items-center justify-between px-6 py-3
        shadow-sm z-20
      "
    >
      <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
        <BsFillCircleFill className="text-green-500 text-[8px]" />
        <span className="font-semibold text-gray-800">{otherUser}</span>
        <span className="text-gray-400 hidden sm:inline">• Çevrimiçi</span>
      </div>

      <div className="flex items-center gap-4 text-gray-500 text-xl relative">
        <AiOutlineRobot
          title="AI Analiz"
          className="hover:text-purple-600 cursor-pointer transition-all duration-200"
        />
        <CiBellOn
          title="Bildirimler"
          className="hover:text-purple-600 cursor-pointer transition-all duration-200"
        />
        <CiSettings
          title="Ayarlar"
          className="hover:text-purple-600 cursor-pointer transition-all duration-200"
        />

        <div className="relative">
          <BsPerson
            className={`text-xl cursor-pointer transition-all duration-200 ${
              menuOpen ? "text-purple-600" : "text-gray-600 hover:text-indigo-500"
            }`}
            onClick={toggleMenu}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg p-2 w-40 animate-fadeIn">
              <p className="text-xs text-gray-500 px-2 mb-1">Kim olarak?</p>
              <button
                onClick={() => {
                  setAlias("Ceren");
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1 rounded-md text-sm ${
                  alias === "Ceren"
                    ? "bg-purple-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Ceren
              </button>
              <button
                onClick={() => {
                  setAlias("Selim");
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-1 rounded-md text-sm ${
                  alias === "Selim"
                    ? "bg-purple-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                Selim
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
