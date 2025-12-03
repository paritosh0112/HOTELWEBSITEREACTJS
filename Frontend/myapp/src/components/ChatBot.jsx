import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import getBotResponse from "../components/getBotResponse"; 

export default function ChatBot() {
  const hotels = useSelector((state) => state.hotels.hotels);
  const bookings = useSelector((state) => state.bookings.bookings);
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const loadingMsg = { id: Date.now() + 1, sender: "bot", text: "Typing...", isLoading: true };
    setMessages((prev) => [...prev, loadingMsg]);

    const question = input;
    setInput("");

    setTimeout(() => {
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === loadingMsg.id 
            ? { ...msg, text: "", isLoading: false }
            : msg
        )
      );

      const botMsg = {
        id: Date.now() + 2,
        sender: "bot",
        text: getBotResponse(question, hotels, bookings),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1500);
  }

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all duration-200 z-[999] border-4 border-white/30 flex items-center justify-center"
        >
          <span className="text-xl">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-h-[500px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden flex flex-col z-[1000] animate-in slide-in-from-bottom-2 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Hotel Assistant</h3>
                  <p className="text-xs opacity-90">Ask about hotels & bookings</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-orange-50/50 to-white/50">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-2xl">🏨</span>
                </div>
                <p className="font-medium text-gray-700 mb-1">Hey there!</p>
                <p className="text-sm">Ask me "hotels in Delhi" or "cheapest hotel"</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-sm"
                        : "bg-white/80 border border-orange-100/50 backdrop-blur-sm rounded-bl-sm shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {msg.isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-orange-400/30 border-t-orange-500 rounded-full animate-spin" />
                        <span className="text-sm opacity-75">Typing...</span>
                      </div>
                    ) : (
                      <div className="text-sm leading-relaxed">{msg.text}</div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white/50 border-t border-orange-100/50">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about hotels..."
                className="flex-1 px-4 py-3 bg-white/70 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 placeholder:text-gray-500 text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-md"
              >
                <span className="text-lg">➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
