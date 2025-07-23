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
  ExternalLink,
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Home,
  Folder,
  Briefcase,
  Code,
  User,
  BookOpen,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

// Define the Message type with enhanced features
interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  actions?: ActionButton[];
  quickReplies?: string[];
}

// Define the ActionButton type
interface ActionButton {
  type: string;
  label: string;
  url?: string;
  page?: string;
  icon?: string;
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
    "AI Assistant here! 🤖",
    "Have questions? Ask! ❓",
    "Let's connect! ✨",
  ];

  // Enhanced FAQ Questions
  const priorityFAQs: FAQ[] = [
    {
      question: "What's MYousuf's background?",
      icon: "👨‍💻",
      query:
        "Tell me about MYousuf's background, experience, and expertise as a developer",
    },
    {
      question: "What technologies does he use?",
      icon: "⚡",
      query:
        "What technologies, programming languages, and frameworks does MYousuf work with?",
    },
    {
      question: "Show me his projects",
      icon: "🚀",
      query:
        "Can you show me MYousuf's recent projects, portfolio work, and achievements?",
    },
  ];

  const additionalFAQs: FAQ[] = [
    {
      question: "How can I contact MYousuf?",
      icon: "📧",
      query:
        "What's the best way to get in touch with MYousuf? I need his contact details.",
    },
    {
      question: "Is he available for work?",
      icon: "💼",
      query:
        "Is MYousuf currently available for freelance projects or job opportunities?",
    },
    {
      question: "What services does he offer?",
      icon: "🎯",
      query:
        "What development services does MYousuf provide? Web development, AI, full-stack?",
    },
    {
      question: "Can I see his GitHub?",
      icon: "💻",
      query:
        "I want to check out MYousuf's GitHub profile and code repositories",
    },
    {
      question: "LinkedIn profile?",
      icon: "🔗",
      query:
        "Can you show me MYousuf's LinkedIn profile for professional networking?",
    },
  ];

  const getRandomFAQs = (): FAQ[] => {
    const shuffledAdditional = [...additionalFAQs].sort(
      () => 0.5 - Math.random()
    );
    return [...priorityFAQs, ...shuffledAdditional].slice(0, 3);
  };

  const [displayFAQs, setDisplayFAQs] = useState<FAQ[]>(getRandomFAQs());

  // Icon mapping for action buttons
  const iconMap: { [key: string]: React.ElementType } = {
    mail: Mail,
    "message-circle": MessageCircle,
    github: Github,
    linkedin: Linkedin,
    home: Home,
    folder: Folder,
    briefcase: Briefcase,
    code: Code,
    user: User,
    "book-open": BookOpen,
    "graduation-cap": GraduationCap,
    "help-circle": HelpCircle,
    bot: Bot,
    "external-link": ExternalLink,
  };

  // Function to render markdown text with proper formatting
  const renderMarkdownText = (text: string) => {
    // Split text into parts and process each part
    const parts = [];
    let currentIndex = 0;
    let partKey = 0;

    // Process bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match: RegExpExecArray | null;

    while ((match = boldRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        const beforeText = text.slice(currentIndex, match.index);
        parts.push(...processLinksAndText(beforeText, partKey));
        partKey++;
      }

      // Add bold text
      parts.push(
        <strong key={`bold-${partKey}`} className="font-semibold text-gray-900">
          {match[1]}
        </strong>
      );
      partKey++;
      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.slice(currentIndex);
      parts.push(...processLinksAndText(remainingText, partKey));
    }

    return parts;
  };

  // Function to process links and regular text
  const processLinksAndText = (text: string, startKey: number) => {
    const parts = [];
    let currentIndex = 0;
    let partKey = startKey;

    // Process markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > currentIndex) {
        const beforeText = text.slice(currentIndex, match.index);
        parts.push(<span key={`text-${partKey}`}>{beforeText}</span>);
        partKey++;
      }

      // Add clickable link
      parts.push(
        <a
          key={`link-${partKey}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault();
            if (match) {
              window.open(match[2], "_blank", "noopener,noreferrer");
            }
          }}
        >
          {match[1]}
        </a>
      );
      partKey++;
      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      const remainingText = text.slice(currentIndex);
      if (remainingText.trim()) {
        parts.push(<span key={`text-${partKey}`}>{remainingText}</span>);
      }
    }

    return parts;
  };

  // Function to render message content with proper formatting
  const renderMessageContent = (text: string) => {
    // Split by lines to handle line breaks
    const lines = text.split("\n");

    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        return <br key={`br-${lineIndex}`} />;
      }

      // Handle bullet points
      if (line.trim().startsWith("- ")) {
        const bulletText = line.trim().substring(2);
        return (
          <div
            key={`bullet-${lineIndex}`}
            className="flex items-start gap-2 my-1"
          >
            <span className="text-purple-600 font-bold text-sm mt-0.5">•</span>
            <span className="flex-1 text-sm">
              {renderMarkdownText(bulletText)}
            </span>
          </div>
        );
      }

      // Handle numbered lists
      const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return (
          <div
            key={`numbered-${lineIndex}`}
            className="flex items-start gap-2 my-1"
          >
            <span className="text-purple-600 font-semibold text-sm min-w-[20px]">
              {numberedMatch[1]}.
            </span>
            <span className="flex-1 text-sm">
              {renderMarkdownText(numberedMatch[2])}
            </span>
          </div>
        );
      }

      // Handle headers
      if (line.startsWith("#")) {
        const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const text = headerMatch[2];
          const className =
            level === 1
              ? "text-lg font-bold text-gray-900 mt-3 mb-2"
              : level === 2
                ? "text-base font-bold text-gray-800 mt-2 mb-1"
                : "text-sm font-semibold text-gray-700 mt-1 mb-1";

          return (
            <div key={`header-${lineIndex}`} className={className}>
              {renderMarkdownText(text)}
            </div>
          );
        }
      }

      // Regular paragraph
      return (
        <div key={`line-${lineIndex}`} className="text-sm leading-relaxed my-1">
          {renderMarkdownText(line)}
        </div>
      );
    });
  };

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
        setTimeout(() => {
          setCurrentMessageIndex(
            (prev) => (prev + 1) % animatedMessages.length
          );
        }, 3000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setShowMessage(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Enhanced welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          sender: "bot",
          text: "👋 Hi! I'm MYousuf's AI assistant. I can help you learn about his work, projects, and expertise. Ask me anything or click the suggestions below!",
          timestamp: new Date(),
          quickReplies: ["Show projects", "Contact details", "What services?"],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enhanced message sending with action support
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CHATBOT_API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: messageText }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          data.response ||
          "I apologize, but I encountered an error processing your request.",
        timestamp: new Date(),
        actions: data.actions || [],
        quickReplies: data.quick_replies || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "❌ Sorry, I'm having trouble connecting. Please try again or contact directly through the portfolio.",
        timestamp: new Date(),
        actions: [
          {
            type: "navigate",
            label: "📧 Contact Page",
            page: "/contact",
            icon: "mail",
          },
          {
            type: "email",
            label: "✉️ Send Email",
            url: "mailto:yousufhere.dev@gmail.com",
            icon: "mail",
          },
        ],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced action handler for buttons
  const handleAction = (action: ActionButton): void => {
    switch (action.type) {
      case "navigate":
        if (action.page) {
          // For Next.js routing, use window.location or your preferred router
          window.location.href = action.page;
        }
        break;
      case "external":
        if (action.url) {
          window.open(action.url, "_blank", "noopener,noreferrer");
        }
        break;
      case "email":
        if (action.url) {
          window.location.href = action.url;
        }
        break;
      default:
        console.log("Unknown action type:", action.type);
    }
  };

  const handleFAQClick = (faqQuery: string): void => {
    sendMessage(faqQuery);
  };

  const handleQuickReply = (reply: string): void => {
    sendMessage(reply);
  };

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
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
    setDisplayFAQs(getRandomFAQs());
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Render enhanced action buttons
  const renderActionButtons = (actions: ActionButton[]) => {
    if (!actions || actions.length === 0) return null;

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map((action, index) => {
          const IconComponent = action.icon
            ? iconMap[action.icon] || ExternalLink
            : ExternalLink;

          return (
            <button
              key={index}
              onClick={() => handleAction(action)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white text-xs rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <IconComponent className="w-3 h-3" />
              <span className="font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Render quick reply buttons
  const renderQuickReplies = (quickReplies: string[]) => {
    if (!quickReplies || quickReplies.length === 0) return null;

    return (
      <div className="mt-2 flex flex-wrap gap-1.5">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            onClick={() => handleQuickReply(reply)}
            className="px-2.5 py-1 bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-700 text-xs rounded-full border border-gray-300 hover:border-purple-300 transition-all duration-200 hover:scale-105"
          >
            {reply}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Enhanced Toggle Button Container */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:mr-8 lg:right-10 xl:right-12 flex items-end gap-3 pointer-events-auto">
        {/* Animated Message */}
        {!isOpen && showMessage && (
          <div className="flex items-center gap-2 animate-bounce">
            <div className="bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl border-2 border-purple-200 max-w-[220px] sm:max-w-[280px]">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {displayText}
                {isTyping && (
                  <span className="animate-pulse text-purple-500 ml-1">|</span>
                )}
              </p>
            </div>
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent relative">
              <div className="absolute -left-[10px] -top-[7px] w-0 h-0 border-l-[8px] border-l-purple-200 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
            </div>
          </div>
        )}

        {/* Enhanced Chat Toggle Button */}
        <button
          onClick={toggleChat}
          className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 overflow-hidden border-4 border-white ${
            isOpen
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:shadow-2xl hover:shadow-purple-500/25"
          }`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <X
              className={`w-5 h-5 sm:w-6 sm:h-6 text-white absolute transition-all duration-500 ease-in-out ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-90 scale-0"
              }`}
            />

            <img
              src="/images/chatbot-icon.png"
              alt="AI Assistant"
              className={`w-full h-full object-cover absolute transition-all duration-500 ease-in-out ${
                isOpen
                  ? "opacity-0 rotate-180 scale-0"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Enhanced Responsive Chat Container */}
      {isOpen && (
        <div
          className={`fixed flex flex-col bg-white rounded-2xl shadow-2xl border-2 border-purple-100 transition-all duration-300 backdrop-blur-lg pointer-events-auto ${
            // Mobile: Full width with margins, proper height
            "bottom-20 right-3 left-3 h-[450px] max-h-[calc(100vh-6rem)] " +
            // Small mobile (480px+): Slightly better spacing
            "xs:right-4 xs:left-4 xs:bottom-22 xs:h-[470px] " +
            // Large mobile/Small tablet (640px+): Start transitioning to fixed width
            "sm:left-auto sm:right-4 sm:w-[340px] sm:h-[480px] sm:bottom-24 " +
            // Medium tablet (768px+): Comfortable tablet size
            "md:w-[350px] md:h-[500px] md:right-6 md:bottom-26 " +
            // Large tablet (1024px+): Reduce size for better desktop feel
            "lg:w-[320px] lg:h-[460px] lg:right-8 lg:bottom-28 " +
            // Laptop (1280px+): Optimized for laptop screens - smaller and more compact
            "xl:w-[370px] xl:h-[460px] xl:right-10 xl:bottom-24 " +
            // Desktop (1536px+): Slightly larger but still compact
            "2xl:w-[320px] 2xl:h-[440px] 2xl:right-12 2xl:bottom-26 " +
            // Ultra-wide (1920px+): Maximum size for very large screens
            "3xl:w-[340px] 3xl:h-[460px] 3xl:right-16 3xl:bottom-28 " +
            // Minimized state - responsive heights
            (isMinimized ? "h-12 sm:h-14 md:h-16 lg:h-14 xl:h-12 2xl:h-14" : "")
          }`}
        >
          {" "}
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white p-4 flex items-center justify-between flex-shrink-0 rounded-t-2xl shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">
                  MYousuf's AI Assistant
                </h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • Ready to help
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMinimize}
                className="hidden md:block text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/20"
                title={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/20"
                title="Clear chat"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Messages Area - Hidden when minimized */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-gray-50 to-white min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white shadow-lg"
                          : "bg-white text-gray-800 border-2 border-gray-200 shadow-lg"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && (
                          <Bot className="w-4 h-4 mt-1 text-purple-600 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          {/* Updated message rendering */}
                          <div className="leading-relaxed break-words">
                            {message.sender === "user" ? (
                              <p className="text-sm text-white">
                                {message.text}
                              </p>
                            ) : (
                              <div>{renderMessageContent(message.text)}</div>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-2 opacity-70 ${
                              message.sender === "user"
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>

                          {/* Action Buttons */}
                          {message.actions &&
                            renderActionButtons(message.actions)}

                          {/* Quick Replies */}
                          {message.quickReplies &&
                            renderQuickReplies(message.quickReplies)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl border-2 border-gray-200 shadow-lg">
                      <div className="flex items-center space-x-3">
                        <Bot className="w-4 h-4 text-purple-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced FAQ Questions */}
                {showFAQs && messages.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Quick questions about MYousuf:
                    </p>
                    {displayFAQs.map((faq, index) => (
                      <button
                        key={index}
                        onClick={() => handleFAQClick(faq.query)}
                        className="w-full text-left p-3 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200 group shadow-md hover:shadow-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 min-w-0">
                            <span className="text-lg flex-shrink-0">
                              {faq.icon}
                            </span>
                            <span className="text-sm text-gray-700 group-hover:text-purple-700 font-medium">
                              {faq.question}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500 flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="p-4 bg-white border-t-2 border-gray-200 flex-shrink-0 rounded-b-2xl">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && !isLoading && sendMessage()
                    }
                    placeholder="Type your message..."
                    className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="p-3 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white rounded-xl hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
