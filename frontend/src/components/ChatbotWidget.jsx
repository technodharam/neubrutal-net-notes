import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your Networking AI Assistant. Ask me anything about OSI, protocols, or troubleshooting.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = {
        role: 'system',
        content: 'You are an IT Networking expert assistant. Explain concepts clearly and simply, following a brutalist/direct style. Focus primarily on IT Networking, protocols, OSI model, IP addressing, and troubleshooting. If asked about non-networking topics, gently guide the user back to networking.'
      };

      // Create chat array to send
      const chatHistory = [systemPrompt, ...messages.map(m => ({ role: m.role, content: m.content })), userMessage];
      
      // Try Gemini API first; fallback to HuggingFace if needed
      let reply = '';
      const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (geminiKey) {
        try {
          const gemRes = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
            contents: [{ role: 'user', parts: [{ text: userMessage.content }] }]
          }, {
            headers: { 'Content-Type': 'application/json' }
          });
          reply = gemRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
        } catch (gemError) {
          console.warn('Gemini request failed, falling back to HuggingFace', gemError);
          // Fallback to HuggingFace
          const hfRes = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
            inputs: userMessage.content
          }, {
            headers: { 'Content-Type': 'application/json' }
          });
          reply = typeof hfRes.data === 'string' ? hfRes.data : (hfRes.data[0]?.generated_text || 'Sorry, I could not generate a response.');
        }
      } else {
        // No Gemini key; use HuggingFace directly
        const hfRes = await axios.post('https://api-inference.huggingface.co/models/google/flan-t5-base', {
          inputs: userMessage.content
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        reply = typeof hfRes.data === 'string' ? hfRes.data : (hfRes.data[0]?.generated_text || 'Sorry, I could not generate a response.');
      }
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      // No additional response handling needed after HuggingFace call

    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with an error (e.g., 500)
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.response.status} ${error.response.statusText}` }]);
      } else {
        // Network error (no response) – provide a static fallback
        const fallback = "I’m having trouble reaching the AI service right now. Here’s a quick networking tip: always verify your IP configuration with `ipconfig` (Windows) or `ifconfig` (Linux/macOS).";
        setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-neo-yellow border-4 border-neo-black rounded-full shadow-brutal flex items-center justify-center hover:-translate-y-2 hover:shadow-brutal-lg transition-all z-50 group"
      >
        <MessageSquare className="w-8 h-8 text-neo-black group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white border-4 border-neo-black shadow-brutal-lg flex flex-col z-50">
      {/* Header */}
      <div className="bg-neo-blue text-white p-4 border-b-4 border-neo-black flex justify-between items-center">
        <div className="font-bold text-lg flex items-center">
          <div className="w-3 h-3 bg-neo-green rounded-full border-2 border-neo-black mr-2 animate-pulse"></div>
          NetBot AI
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-neo-black hover:text-white p-1 border-2 border-transparent hover:border-neo-black transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 border-2 border-neo-black ${msg.role === 'user' ? 'bg-neo-yellow ml-auto text-right' : 'bg-white mr-auto'}`}>
              <div className="text-xs font-bold mb-1 opacity-70 uppercase">{msg.role}</div>
              <div className="prose prose-sm font-medium">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 border-2 border-neo-black flex items-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Typing...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t-4 border-neo-black flex">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about networking..."
          className="flex-1 brutal-input py-2 px-3 mr-2"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-neo-green border-4 border-neo-black p-2 hover:bg-neo-yellow transition-colors disabled:opacity-50"
        >
          <Send className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default ChatbotWidget;
