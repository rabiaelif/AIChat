import React, { useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function ChatArea({
  alias,
  messages,
  text,
  setText,
  sendMessage,
  loading,
  formatTime,
  getSentimentColor,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 bg-white h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">Henüz mesaj yok.</p>
        )}

        {messages.map((msg, i) => (
          <div
            key={msg.id || i}
            className={`flex flex-col mb-4 ${msg.alias === alias ? "items-end" : "items-start"
              }`}
          >
            <div className="flex items-center text-xs text-gray-500 mb-1">
              <span className="font-semibold text-gray-700 mr-2">
                {msg.alias}
              </span>
              <span className="mr-2">
                {formatTime(msg.timestamp || msg.createdAt)}
              </span>
              <span className={getSentimentColor(msg.sentiment)}>
                {msg.sentiment}
              </span>
            </div>

            <div
              className={`inline-block px-3 py-2 rounded-xl max-w-[80%] break-all shadow ${msg.alias === alias
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-200 bg-white flex items-center gap-2 left-0 sticky bottom-0">
        <textarea
          placeholder="Mesajınızı yazın..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`sm:px-6 px-3 py-2 sm:h-14 h-full flex items-center justify-center gap-2 rounded-lg font-medium text-white transition-all duration-300 ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          <span className="hidden sm:inline">
            {loading ? "Gönderiliyor..." : "Gönder"}
          </span>
          <span className="inline sm:hidden">
            <FaPaperPlane className="text-lg" />
          </span>
        </button>
      </div>
    </div>
  );
}
