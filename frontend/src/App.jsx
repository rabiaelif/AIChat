import React, { useState, useEffect } from "react";
import Sidebar from "./components/ui/Sidebar";
import ChatArea from "./components/ui/ChatArea";
import Sentiment from "./components/ui/Sentiment";
import Navbar from "./components/ui/Navbar";

function App() {
  const [text, setText] = useState("");
  const [alias, setAlias] = useState("Selim");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Mesajlar çekilirken hata oluştu:", error);
    }
  };

  const sendMessage = async () => {
    if (!text.trim() || !alias.trim()) return;
    setLoading(true);

    const tempMessageId = Date.now();
    const newMessage = {
      id: tempMessageId,
      alias,
      text,
      sentiment: "Analiz Ediliyor...",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setText("");

    try {
      const response = await fetch(`${API_BASE_URL}/huggingface`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias, text: newMessage.text }),
      });

      if (response.ok) {
        const resultMessage = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempMessageId
              ? { ...msg, id: resultMessage.id, sentiment: resultMessage.sentiment }
              : msg
          )
        );
      } else {
        console.error("API Hatası:", response.status);
      }
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  function formatTime(ts) {
    if (!ts) return "—";


    let safe = ts;
    if (typeof ts === "string" && !ts.endsWith("Z")) {
      safe = ts + "Z";
    }

    const dateObj = new Date(safe);
    if (isNaN(dateObj.getTime())) return "—";

    return dateObj.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    });
  }



  const getSentimentColor = (sentiment) => {
    if (sentiment.toLowerCase().includes("positive")) return "text-green-600";
    if (sentiment.toLowerCase().includes("negative")) return "text-red-500";
    if (sentiment.toLowerCase().includes("neutral")) return "text-gray-500";
    return "text-gray-600";
  };

  const otherUser = alias === "Ceren" ? "Selim" : "Ceren";

  const filteredMessages = messages.filter(
    (msg) => msg.alias === alias || msg.alias === otherUser
  );

  const sentimentCounts = filteredMessages.reduce(
    (acc, msg) => {
      const s = msg.sentiment.toLowerCase();
      if (s.includes("positive")) acc.positive++;
      else if (s.includes("negative")) acc.negative++;
      else if (s.includes("neutral")) acc.neutral++;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );


  const total = filteredMessages.length || 1;
  const percentages = {
    positive: Math.round((sentimentCounts.positive / total) * 100),
    neutral: Math.round((sentimentCounts.neutral / total) * 100),
    negative: Math.round((sentimentCounts.negative / total) * 100),
  };

  return (
    <div className="h-screen flex text-sm bg-white">
      <Sidebar alias={alias} setAlias={setAlias} otherUser={otherUser} />

      <div className="flex-1 w-full flex flex-col sm:ml-[20%] sm:mr-[25%]">
        <Navbar otherUser={otherUser} alias={alias} setAlias={setAlias} />
        <div className="sm:hidden flex sticky top-10">
          <Sentiment otherUser={otherUser} percentages={percentages} />
        </div>
        <div className="flex-1 flex flex-col">
          <ChatArea
            alias={alias}
            messages={messages}
            text={text}
            setText={setText}
            sendMessage={sendMessage}
            loading={loading}
            formatTime={formatTime}
            getSentimentColor={getSentimentColor}
          />
        </div>
      </div>

      <div className="hidden sm:flex">
        <Sentiment otherUser={otherUser} percentages={percentages} />
      </div>
    </div>

  );
}

export default App;