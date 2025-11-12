import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Sidebar({ alias, setAlias, otherUser }) {
  return (
    <div className="w-1/5  border-r fixed top-0 bottom-0 left-0 sm:flex hidden border-gray-200 bg-gray-50 flex-col">
      <div className="p-3 border-b border-gray-200 text-2xl font-semibold">ChatMood</div>

      <div className="p-2">
        <div className="relative">
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            placeholder="Sohbet ara..."
            className="w-full border border-gray-300 rounded-lg h-8 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 p-3 hover:bg-gray-100 cursor-pointer bg-blue-100 border-l-4 border-blue-500">
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            {otherUser.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-800">{otherUser}</div>
            <div className="text-xs text-gray-500">AI Chat aktif</div>
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 flex-col flex gap-3">
        <p className="text-xs text-gray-600 font-semibold mb-1">Kim olarak konuşuyorsun?</p>
        <button
          onClick={() => setAlias("Ceren")}
          className={`px-3 py-2 rounded-lg font-semibold text-start transition-all duration-200 ${alias === "Ceren"
            ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Ceren
        </button>

        <button
          onClick={() => setAlias("Selim")}
          className={`px-3 py-2 rounded-lg font-semibold text-start transition-all duration-200 ${alias === "Selim"
            ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Selim
        </button>
      </div>
    </div>
  );
}