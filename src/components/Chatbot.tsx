'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, RefreshCw, User, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  'What are Meshary\'s main technical skills?',
  'Tell me about the SyncSolve API project.',
  'What edge AI & vision projects has he built?',
  'How can I contact Meshary for work?'
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hello! I'm **Meshary AI**, your interactive portfolio assistant powered by Gemini. Ask me anything about Meshary's projects, technical skills, or background!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const historyToSend = [...messages, userMsg].map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.text || "I'm sorry, I couldn't process your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "Sorry, I ran into an issue connecting to the AI assistant. Please try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: "Hello! I'm **Meshary AI**, your interactive portfolio assistant powered by Gemini. Ask me anything about Meshary's projects, technical skills, or background!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Helper to simple-format bold & markdown links safely in text
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      // Parse markdown links [Title](url) and bold text **text**
      const parts = line.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
      
      return (
        <p key={lIdx} className={lIdx > 0 ? 'mt-2' : ''}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
              const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (match) {
                const [, linkText, rawUrl] = match;
                const cleanUrl = rawUrl.trim();
                // Security check: Only permit safe http/https URLs to prevent javascript: XSS
                const isSafeUrl = /^https?:\/\//i.test(cleanUrl);
                if (isSafeUrl) {
                  return (
                    <a
                      key={pIdx}
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-primary hover:underline font-medium"
                    >
                      {linkText}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  );
                }
              }
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`group relative flex items-center justify-center gap-2.5 bg-primary text-primary-foreground h-12 w-12 sm:h-auto sm:w-auto px-0 sm:px-4 py-0 sm:py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 ease-out hover:scale-105 active:scale-95 ${
          isOpen
            ? 'opacity-0 scale-90 pointer-events-none absolute bottom-0 right-0'
            : 'opacity-100 scale-100 pointer-events-auto'
        }`}
        aria-label="Open AI Assistant Chat"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="h-5 w-5 shrink-0" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-primary" />
          </span>
        </div>
        <span className="font-medium text-sm pr-0.5 hidden sm:inline">Ask Meshary AI</span>
        <Sparkles className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity hidden sm:inline" />
      </button>

      {/* Chat Window */}
      <div
        className={`flex flex-col w-[calc(100vw-2rem)] sm:w-[420px] max-w-[calc(100vw-2rem)] h-[min(560px,80dvh)] max-h-[82dvh] bg-card border border-border rounded-2xl shadow-2xl shadow-background/90 overflow-hidden transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute bottom-0 right-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-muted/40 border-b border-border/60">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/15 text-primary border border-primary/20 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline font-bold text-sm text-foreground">Meshary AI</h3>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  Gemini 3.6
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                Portfolio Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleReset}
              title="Reset conversation"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-4 text-sm no-scrollbar sm:scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-muted/60 text-foreground border border-border/40 rounded-bl-sm'
                }`}
              >
                <div className="leading-relaxed text-xs sm:text-sm">
                  {renderFormattedText(msg.text)}
                </div>
                <span
                  className={`block text-[10px] mt-1 text-right ${
                    msg.role === 'user'
                      ? 'text-primary-foreground/60'
                      : 'text-muted-foreground/60'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="h-7 w-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 mt-0.5 border border-border/40">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5 justify-start">
              <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted/60 border border-border/40 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-xs text-muted-foreground">Meshary AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Chips */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-3 py-2 bg-muted/20 border-t border-border/40 flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-card border border-border/50 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-card border-t border-border/40 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about skills, projects..."
            disabled={isLoading}
            maxLength={250}
            className="flex-1 bg-muted/40 border border-border/50 rounded-xl px-3.5 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-muted-foreground/50 disabled:opacity-50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-9 w-9 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
