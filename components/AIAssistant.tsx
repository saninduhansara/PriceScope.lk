"use client"

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  hello: "Hello! 👋 I'm your PriceScope AI assistant. I can help you find the best deals across Cargills, Keells, and Glomark. What are you looking for today?",
  hi: "Hi there! 👋 How can I help you save money today?",
  help: "I can help you with:\n• Finding the best prices for products\n• Comparing prices across supermarkets\n• Suggesting budget-friendly alternatives\n• Tracking price trends\n\nJust ask me anything!",
  price: "I can help you compare prices! Tell me which product you're interested in, and I'll show you the best deals across all three supermarkets.",
  save: "Looking to save money? Great! Here are some tips:\n• Always check the 'Best Price' badge on products\n• Compare prices across all three supermarkets\n• Look for products with discount tags\n• Use our cart feature to see total savings",
  default: "I'm here to help you find the best deals! You can ask me about:\n• Product prices\n• Best supermarket for your shopping\n• Money-saving tips\n• Product comparisons\n\nWhat would you like to know?"
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your PriceScope AI assistant 🤖 I can help you find the best deals and save money. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return predefinedResponses.hello;
    } else if (lowerMessage.includes('help')) {
      return predefinedResponses.help;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('cheap')) {
      return predefinedResponses.price;
    } else if (lowerMessage.includes('save') || lowerMessage.includes('saving') || lowerMessage.includes('discount')) {
      return predefinedResponses.save;
    } else if (lowerMessage.includes('cargills') || lowerMessage.includes('keells') || lowerMessage.includes('glomark')) {
      return `Great choice! ${lowerMessage.includes('cargills') ? 'Cargills' : lowerMessage.includes('keells') ? 'Keells' : 'Glomark'} has excellent deals. Use our comparison feature to see their prices across all products. The best price is always highlighted with a green badge!`;
    } else if (lowerMessage.includes('rice') || lowerMessage.includes('milk') || lowerMessage.includes('bread') || lowerMessage.includes('egg')) {
      return "I can see you're interested in groceries! Use the search bar at the top to find specific products, and I'll show you price comparisons across all three supermarkets. Don't forget to check the 'Save' amount on each product!";
    } else if (lowerMessage.includes('cart') || lowerMessage.includes('checkout')) {
      return "You can add items to your cart by clicking 'Add to Cart' on any product. The cart will show you a breakdown by supermarket and the total amount. It's a great way to plan your shopping!";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Happy shopping and saving! 💰 Let me know if you need anything else!";
    } else {
      return predefinedResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Find best prices", icon: "💰" },
    { text: "Compare supermarkets", icon: "🏪" },
    { text: "Saving tips", icon: "💡" },
    { text: "Help me shop", icon: "🛒" },
  ];

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-blue-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">
                  AI Assistant
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </h3>
                <p className="text-xs text-blue-100">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'ai'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500'
                    : 'bg-gradient-to-br from-green-500 to-blue-500'
                }`}>
                  {message.sender === 'ai' ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'ai'
                      ? 'bg-white border-2 border-blue-200 text-gray-800'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                  } shadow-sm`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-2">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(action.text);
                      handleSendMessage();
                    }}
                    className="text-xs bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 px-3 py-2 rounded-lg transition-all flex items-center gap-2"
                  >
                    <span>{action.icon}</span>
                    <span className="font-medium">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t-2 border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {isVisible && (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all z-50 flex items-center justify-center group hover:scale-110 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 active:scale-95"
          >
            {isOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <>
                <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  AI
                </div>
              </>
            )}
          </button>

          {/* Close/Dismiss Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              setIsOpen(false);
            }}
            className="fixed bottom-6 right-24 w-10 h-10 bg-red-500/30 hover:bg-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 flex items-center justify-center group hover:scale-110 active:scale-95"
            title="Hide AI Assistant"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Pulsing Ring Effect */}
          {!isOpen && (
            <div className="fixed bottom-6 right-6 w-16 h-16 z-40 pointer-events-none">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20" />
            </div>
          )}
        </>
      )}
    </>
  );
}