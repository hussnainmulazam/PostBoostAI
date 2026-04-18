import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { 
  MessageSquare, X, Send, Mic, Paperclip, Brain, Sparkles, User, Minimize2, Maximize2, Mail
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
  { id: 1, role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?", time: "10:30 AM" },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      role: "user" as const,
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant" as const,
        content: "I can help you with that! As your AI assistant, I can generate content, schedule social media posts, or analyze your productivity data. What would you like to start with?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto mb-4 w-[380px] sm:w-[450px] h-[600px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#3B82F6]">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5FF] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5FF]"></span>
                    </span>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#00F5FF] to-[#3B82F6] text-white'
                        : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className={`text-[10px] mt-1 block ${message.role === 'user' ? 'text-white/80' : 'text-gray-400'}`}>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl p-3 border border-gray-200 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="relative flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 hover:text-gray-900 transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00F5FF]/50 focus:ring-1 focus:ring-[#00F5FF]/20 transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-[#00F5FF] hover:bg-[#00F5FF]/90 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/923266655307"
        target="_blank"
        rel="noopener noreferrer"
        layout
        className={`relative pointer-events-auto group h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-green-500/25 transition-transform hover:scale-110 active:scale-95 ${
          isOpen && !isMinimized ? 'hidden' : 'flex'
        }`}
      >
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-[13px] font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
        <SiWhatsapp className="h-7 w-7 text-white" />
      </motion.a>

      {/* Toggle Button */}
      <motion.button
        layout
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={`relative pointer-events-auto group h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#00F5FF] to-[#3B82F6] shadow-lg shadow-blue-500/25 transition-transform hover:scale-110 active:scale-95 ${
          isOpen && !isMinimized ? 'hidden' : 'flex'
        }`}
      >
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-[13px] font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap">
          AI Assistant
        </span>
        <MessageSquare className="h-6 w-6 text-white" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
          1
        </span>
      </motion.button>
    </div>
  );
}
