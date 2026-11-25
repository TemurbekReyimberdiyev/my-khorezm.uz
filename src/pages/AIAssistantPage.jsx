import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { getSuggestedQuestions, getAiReply } from '../data/aiResponses';
import { useLanguage } from '../hooks/useLanguage';
import PagePathBar from '../components/common/PagePathBar';

export default function AIAssistantPage() {
  const { language, t } = useLanguage();
  const aiText = t.pages.ai;
  const suggested = getSuggestedQuestions(language);

  const [messages, setMessages] = useState([{ id: 1, role: 'assistant', text: aiText.welcome }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    setMessages((prev) => (prev.length === 1 && prev[0].id === 1 ? [{ id: 1, role: 'assistant', text: aiText.welcome }] : prev));
  }, [language, aiText.welcome]);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages]);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setInput('');
    setMessages((m) => [...m, { id: Date.now(), role: 'user', text: q }]);
    setTyping(true);
    setTimeout(() => {
      const response = getAiReply(q, language);
      setMessages((m) => [...m, { id: Date.now() + 1, role: 'assistant', text: response }]);
      setTyping(false);
    }, 550);
  };

  return (
    <>
      <Helmet>
        <title>{t.nav.aiAssistant}</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-9rem)] flex flex-col">
        <PagePathBar variant="inline" className="mb-4" />
        <div className="bg-white border border-[#E5EAF0] rounded-2xl p-4 mb-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#15528B] to-[#123A61] rounded-xl flex items-center justify-center shrink-0">
            <Sparkles size={22} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-[#17243B]">{aiText.title}</h1>
            <p className="text-xs text-[#66758A]">{aiText.subtitle}</p>
          </div>
          <div className="ml-auto">
            <span className="bg-[#E8F5EE] text-[#319568] text-xs font-semibold px-2.5 py-1 rounded-full">{t.common.demoBadge}</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 shrink-0">
          {suggested.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="px-3 py-1.5 bg-white border border-[#E5EAF0] rounded-full text-xs text-[#17243B] hover:border-[#15528B] hover:text-[#15528B] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white border border-[#E5EAF0] rounded-2xl overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#EBF3FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={15} className="text-[#15528B]" />
                  </div>
                )}
                <div
                  className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#15528B] text-white rounded-tr-sm'
                      : 'bg-[#F7F9FC] border border-[#E5EAF0] text-[#17243B] rounded-tl-sm'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#15528B] flex items-center justify-center shrink-0 mt-0.5">
                    <User size={15} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EBF3FA] flex items-center justify-center shrink-0">
                  <Bot size={15} className="text-[#15528B]" />
                </div>
                <div className="bg-[#F7F9FC] border border-[#E5EAF0] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#C8D3E0] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="p-4 border-t border-[#E5EAF0]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={aiText.placeholder}
                className="flex-1 px-4 py-2.5 border border-[#E5EAF0] rounded-xl bg-[#F7F9FC] text-sm outline-none focus:border-[#15528B]"
              />
              <button
                onClick={() => send()}
                className="w-10 h-10 bg-[#15528B] text-white rounded-xl flex items-center justify-center hover:bg-[#123A61] transition-colors cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-[#C8D3E0] mt-2 text-center">{aiText.disclaimer}</p>
          </div>
        </div>
      </div>
    </>
  );
}
