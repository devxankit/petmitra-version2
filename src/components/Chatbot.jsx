// Frontend: React Component (Chatbot.js)
// Install dependencies: npm install axios

import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    try {
      const { data } = await axios.post("http://localhost:5000/chat", { message: input });
      const botMessage = { sender: "bot", text: data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch {
      setMessages([...messages, { sender: "bot", text: "Error fetching response." }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      <div className="p-3 bg-blue-500 text-white rounded-full cursor-pointer" onClick={toggleChat}>💬</div>
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between bg-blue-500 text-white p-3 rounded-t-lg">
            <span>Pet-Mitra Chat</span>
            <button onClick={toggleChat} className="text-white">✖</button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded-md ${msg.sender === "user" ? "bg-gray-200" : "bg-blue-100"}`}>{msg.text}</div>
            ))}
          </div>
          <div className="flex p-3 border-t border-gray-200">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." className="flex-1 p-2 border rounded-md" />
            <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
