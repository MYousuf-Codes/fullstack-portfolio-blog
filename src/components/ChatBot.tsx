"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  X,
  Bot,
  Sparkles,
  ChevronRight,
  Minimize2,
  Maximize2,
} from "lucide-react";

// Define the Message type
interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

// Define the FAQ type
interface FAQ {
  question: string;
  icon: string;
  query: string;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFAQs, setShowFAQs] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animated Toggle States
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const animatedMessages = [
    "Chat with me! 💬",
    "Need any help? 🤔",
    "AI Assistant here to help! 🤖",
    "Have questions? Ask away! ❓",
    "Let's chat! ✨",
  ];

  // FAQ Questions - organized by priority
  const priorityFAQs: FAQ[] = [
    {
      question: "What's MYousuf's background?",
      icon: "👨‍💻",
      query: "Tell me about MYousuf's background and experience as a developer",
    },
    {
      question: "What technologies does he use?",
      icon: "⚡",
      query:
        "What technologies and programming languages does MYousuf work with? What's his tech stack?",
    },
    {
      question: "Show me his projects",
      icon: "🚀",
      query: "Can you show me some of MYousuf's recent projects and work?",
    },
  ];

  const additionalFAQs: FAQ[] = [
    {
      question: "How can I contact MYousuf?",
      icon: "📧",
      query: "What's the best way to get in touch with MYousuf?",
    },
    {
      question: "Is he available for work?",
      icon: "💼",
      query:
        "Is MYousuf currently available for freelance work or job opportunities?",
    },
    {
      question: "What's his experience level?",
      icon: "⭐",
      query:
        "How many years of experience does MYousuf have in software development?",
    },
    {
      question: "What services does he offer?",
      icon: "🎯",
      query:
        "What development services does MYousuf provide? Frontend, backend, or full-stack?",
    },
    {
      question: "Can he work with my team?",
      icon: "🤝",
      query: "Can MYousuf collaborate with existing development teams?",
    },
  ];

  // Function to get random 3 FAQs (always include priority ones first)
  const getRandomFAQs = (): FAQ[] => {
    const shuffledAdditional = [...additionalFAQs].sort(
      () => 0.5 - Math.random()
    );
    return [...priorityFAQs, ...shuffledAdditional].slice(0, 3);
  };

  const [displayFAQs, setDisplayFAQs] = useState<FAQ[]>(getRandomFAQs());

  // Typewriter effect for animated toggle
  useEffect(() => {
    if (isOpen) return;

    const currentMessage = animatedMessages[currentMessageIndex];
    let charIndex = 0;
    setIsTyping(true);
    setDisplayText("");

    const typeInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayText(currentMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Wait 3 seconds before starting next message
        setTimeout(() => {
          setCurrentMessageIndex(
            (prev) => (prev + 1) % animatedMessages.length
          );
        }, 3000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex, isOpen]);

  // Show message after component mounts and whenever chat is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowMessage(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: "👋 Hi! I'm MYousuf's AI assistant. I can help you learn more about his work, projects, and expertise. Feel free to ask me anything about his development skills, experience, or click on one of the suggested questions below!",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (
    messageText: string = inputValue
  ): Promise<void> => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setShowFAQs(false);

    try {
      // Railway deployment URL
      const response = await fetch(
        "https://personal-chatbot-production.up.railway.app/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: messageText }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          data.response ||
          "I apologize, but I encountered an error processing your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "❌ Sorry, I'm having trouble connecting right now. Please try again later or contact directly through the portfolio.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFAQClick = (faqQuery: string): void => {
    sendMessage(faqQuery);
  };

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
    // When closing the chat, reset showMessage state after a brief delay
    if (isOpen) {
      setShowMessage(false);
    }
  };

  const toggleMinimize = (): void => {
    setIsMinimized(!isMinimized);
  };

  const clearChat = (): void => {
    setMessages([]);
    setShowFAQs(true);
    setDisplayFAQs(getRandomFAQs()); // Refresh FAQs when clearing
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Animated Toggle Button Container */}
      <div className="fixed bottom-4 right-4 z-50 flex items-end gap-3">
        {/* Animated Message - Responsive */}
        {!isOpen && showMessage && (
          <div className="flex items-center gap-2 animate-bounce">
            <div className="bg-white rounded-full px-2 py-2 sm:px-3 sm:py-3 shadow-lg border border-gray-200 max-w-[200px] sm:max-w-[280px] md:max-w-[300px]">
              <p className="text-xs sm:text-sm font-medium text-gray-800 whitespace-nowrap">
                {displayText}
                {isTyping && (
                  <span className="animate-pulse text-blue-500 ml-1">|</span>
                )}
              </p>
            </div>
            {/* Speech bubble tail */}
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent relative">
              <div className="absolute -left-[7px] -top-[4px] w-0 h-0 border-l-[6px] border-l-gray-200 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button - Responsive */}
        <button
          onClick={toggleChat}
          className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-1 sm:mb-2 mr-1 sm:mr-2 rounded-full shadow-lg transition-all duration-500 hover:scale-110 overflow-hidden ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "hover:shadow-xl"
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close X Icon */}
            <X
              className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white absolute transition-all duration-500 ease-in-out ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-0"
              }`}
            />

            {/* Chatbot Image */}
            <img
              src="/images/chatbot-icon.png"
              alt="Chatbot"
              className={`w-full h-full object-cover absolute transition-all duration-500 ease-in-out ${
                isOpen
                  ? "opacity-0 rotate-180 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Chat Container - Fixed Mobile Layout */}
      {isOpen && (
        <div
          className={`fixed z-40 flex flex-col bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
            // Mobile: Fixed width and height, positioned bottom-right with proper margins
            "bottom-20 right-4 w-80 h-96 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-6rem)] " +
            // Small screens: Slightly smaller but maintains aspect ratio
            "xs:w-72 xs:h-80 " +
            // Small tablet: Optimal size
            "sm:w-80 sm:h-[420px] " +
            // Medium tablet: Standard size
            "md:w-80 md:h-[420px] " +
            // Large tablet: Slightly bigger
            "lg:w-[340px] lg:h-[450px] lg:bottom-24 lg:right-6 " +
            // Desktop: Optimal size
            "xl:w-[360px] xl:h-[480px] " +
            // Large desktop: Max comfortable size
            "2xl:w-[380px] 2xl:h-[500px] " +
            // Minimized state
            (isMinimized ? "md:h-14 lg:h-16" : "")
          }`}
        >
          {/* Header - Responsive */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white p-2 sm:p-3 flex items-center justify-between flex-shrink-0 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm">{`MYousuf's Assistant`}</h3>
                <p className="text-xs sm:text-xs opacity-90">{`Online • Ready to help`}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {/* Minimize button - only on desktop */}
              <button
                onClick={toggleMinimize}
                className="hidden md:block text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                title={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ) : (
                  <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
              </button>
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                title="Clear chat"
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>

          {/* Messages Area - Hidden when minimized */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 sm:space-y-2.5 bg-gray-50 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white shadow-md"
                          : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start space-x-1 sm:space-x-2">
                        {message.sender === "bot" && (
                          <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 text-purple-600 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-xs leading-relaxed whitespace-pre-wrap break-words">
                            {message.text}
                          </p>
                          <p
                            className={`text-xs mt-1 opacity-70 ${
                              message.sender === "user"
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-600 rounded-full animate-bounce"></div>
                          <div
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.01s" }}
                          ></div>
                          <div
                            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.02s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Questions - Responsive */}
                {showFAQs && messages.length <= 1 && (
                  <div className="space-y-1.5 sm:space-y-2">
                    <p className="text-xs sm:text-xs text-gray-600 font-medium">
                      💡 Quick questions about MYousuf:
                    </p>
                    {displayFAQs.map((faq, index) => (
                      <button
                        key={index}
                        onClick={() => handleFAQClick(faq.query)}
                        className="w-full text-left p-2 sm:p-2.5 bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
                            <span className="text-xs sm:text-sm flex-shrink-0">
                              {faq.icon}
                            </span>
                            <span className="text-xs sm:text-xs text-gray-700 group-hover:text-purple-700 font-medium truncate">
                              {faq.question}
                            </span>
                          </div>
                          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Fixed at Bottom - Responsive */}
              <div className="p-2 sm:p-3 bg-white border-t border-gray-200 flex-shrink-0 rounded-b-lg sm:rounded-b-2xl md:rounded-b-2xl">
                <div className="flex space-x-1.5 sm:space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && !isLoading && sendMessage()
                    }
                    placeholder="Type your message..."
                    className="flex-1 p-2 sm:p-2.5 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2 sm:p-2.5 md:p-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  >
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;