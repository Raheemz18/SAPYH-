import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { cn } from '@/src/lib/utils';
import { useSound } from '../hooks/useSound';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const { playPing } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hey! I'm your SA Padel Youth Hub assistant. Ask me anything about upcoming tournaments, hotels, food, or padel tips!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    playPing();

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await getChatResponse(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] bg-brand-black border border-brand-gold/30 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-gold p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-brand-gold">
                  <Bot size={20} />
                </div>
                <span className="font-display font-black italic uppercase text-brand-black tracking-tight">Youth Hub AI</span>
              </div>
              <button 
                onClick={() => {
                  playPing();
                  setIsOpen(false);
                }}
                className="text-brand-black hover:scale-110 transition-transform"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    m.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div 
                    className={cn(
                      "p-3 text-sm leading-relaxed",
                      m.role === 'user' 
                        ? "bg-brand-gold text-brand-black font-bold skew-x-[-6deg]" 
                        : "bg-brand-white/10 text-brand-white border border-brand-white/10"
                    )}
                  >
                    <div className={cn(m.role === 'user' && "skew-x-[6deg]")}>
                      {m.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-brand-gold/50 italic text-xs">
                  <Loader2 size={14} className="animate-spin" />
                  Thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-brand-white/10 bg-brand-white/5">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about tournaments, courts..."
                  className="flex-1 bg-brand-black border border-brand-white/20 px-4 py-2 text-sm text-brand-white outline-none focus:border-brand-gold transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-brand-gold text-brand-black p-2 hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          playPing();
          setIsOpen(!isOpen);
        }}
        className="w-14 h-14 bg-brand-gold text-brand-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 group relative"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-brand-black animate-pulse" />
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
