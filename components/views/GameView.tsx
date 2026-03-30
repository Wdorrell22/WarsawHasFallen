
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT } from '../../data/systemPrompt';
import { GameStateUpdate } from '../../types';

interface Message {
  id: number;
  sender: 'AI' | 'USER';
  text: string;
}

interface Props {
  introScenario?: string;
  pathName?: string;
  subclassName?: string;
  onGameStateUpdate: (update: GameStateUpdate) => void;
  externalPrompt?: string | null;
  onPromptConsumed?: () => void;
}

export const GameView: React.FC<Props> = ({ 
  introScenario, 
  pathName, 
  subclassName, 
  onGameStateUpdate, 
  externalPrompt, 
  onPromptConsumed 
}) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('whf_game_messages');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isInitialized = useRef(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Client
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('whf_game_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (externalPrompt && !isLoading) {
      if (onPromptConsumed) onPromptConsumed();
      handleSend(externalPrompt, true);
    }
  }, [externalPrompt]);

  const processAIResponse = (rawText: string) => {
    let cleanText = rawText;
    const jsonRegex = /<<<([\s\S]*?)>>>/;
    const jsonMatch = rawText.match(jsonRegex);
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        const updateData = JSON.parse(jsonMatch[1]);
        onGameStateUpdate(updateData);
        cleanText = rawText.replace(jsonRegex, '').trim();
      } catch (e) {
        console.error("Failed to parse game state JSON:", e);
      }
    }
    return cleanText;
  };

  useEffect(() => {
    if (!isInitialized.current && introScenario && messages.length === 0) {
      isInitialized.current = true;
      const initGame = async () => {
        setIsLoading(true);
        try {
          const startingPrompt = `Initialize the story. I am playing as a "${pathName}" (Subclass: ${subclassName}). The starting scene is: "${introScenario}". 
          
          TASK:
          1. Describe the immediate surroundings and the situation.
          2. Generate a UNIQUE MAIN QUEST based specifically on the Subclass ${subclassName}. Use the JSON format to add this quest to the UI immediately.
          3. If there are NPCs, use the ||COLOR|DESCRIPTOR|| format to introduce them.
          4. Follow all system roleplay rules.
          5. STOP immediately after describing the scene. Do not act for me.`;
          
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: startingPrompt,
            config: {
              systemInstruction: SYSTEM_PROMPT,
            }
          });

          if (response.text) {
            const processedText = processAIResponse(response.text);
            setMessages([{
              id: Date.now(),
              sender: 'AI',
              text: processedText
            }]);
          }
        } catch (error) {
          console.error("Failed to initialize game:", error);
          setMessages([{
            id: Date.now(),
            sender: 'AI',
            text: "SYSTEM ERROR: Neural link unstable. Unable to connect to narrative engine. (Check API Key or Network)"
          }]);
        } finally {
          setIsLoading(false);
        }
      };
      initGame();
    }
  }, [introScenario, pathName, subclassName, messages.length]);

  const handleSend = async (manualInput?: string, hidden: boolean = false) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim() || isLoading) return;

    if (!hidden) {
      const userMsg: Message = { id: Date.now(), sender: 'USER', text: textToSend };
      setMessages(prev => [...prev, userMsg]);
    } else {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'USER', text: `>> SYSTEM_ACTION: ${textToSend.replace('[SYSTEM ACTION]: ', '')}` }]);
    }
    
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'USER' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      history.push({ role: 'user', parts: [{ text: textToSend }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: history,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        }
      });

      if (response.text) {
        const processedText = processAIResponse(response.text);
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'AI',
          text: processedText || "..."
        }]);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'AI',
        text: "CONNECTION INTERRUPTED. (API Error)"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      const npcRegex = /\|\|(#[0-9a-fA-F]{6})\|(.*?)\|\|(.*)/;
      const match = line.match(npcRegex);

      if (match) {
        const color = match[1];
        const descriptor = match[2];
        const content = match[3];

        return (
          <div key={idx} className="mb-4 mt-2 border-l-2 pl-3 bg-white/5 p-2 rounded-r" style={{ borderColor: color }}>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: color }}>
              {descriptor}
            </div>
            <div className="italic text-stone-200">
              {content}
            </div>
          </div>
        );
      }
      if (line.trim() === '') return <div key={idx} className="h-2"></div>;
      return <p key={idx} className="mb-1 leading-relaxed text-stone-300" style={{ textAlign: 'left', direction: 'ltr' }}>{line}</p>;
    });
  };

  return (
    <div className="h-full w-full flex flex-col bg-black/80 relative overflow-hidden text-left" dir="ltr">
      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none z-10"></div>

      {/* Terminal Output Area */}
      {/* justify-end anchors messages to the bottom like a chat app */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-term-gray scrollbar-track-transparent z-0 flex flex-col justify-end font-mono text-sm md:text-base">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-6 animate-[fadeIn_0.2s_ease-out] w-full text-left" dir="ltr">
            <div className="flex items-center gap-2 mb-1 opacity-70">
               <div className={`w-2 h-2 rounded-full ${msg.sender === 'USER' ? 'bg-term-amber' : 'bg-stone-500'}`}></div>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${msg.sender === 'USER' ? 'text-term-amber' : 'text-stone-500'}`}>
                 {msg.sender === 'USER' ? 'OPERATOR' : 'WARSAW_NET'}
               </span>
               <span className="text-[9px] text-stone-600 hidden md:inline">// {new Date(msg.id).toLocaleTimeString()}</span>
            </div>
            
            <div className={`pl-4 border-l text-left ${msg.sender === 'USER' ? 'border-term-amber/30 text-term-amber' : 'border-stone-800'}`} style={{ direction: 'ltr' }}>
               {msg.sender === 'AI' ? renderMessageContent(msg.text) : (
                 <div className={msg.text.includes('SYSTEM_ACTION') ? 'text-stone-500 italic' : ''}>
                   {msg.text}
                 </div>
               )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="pl-4 border-l border-term-amber/50 animate-pulse mb-4">
             <span className="text-term-amber text-xs">PROCESSING_SIGNAL...</span>
          </div>
        )}
        <div ref={messagesEndRef} className="shrink-0" />
      </div>

      {/* Command Line Input */}
      <div className="flex-none p-2 md:p-4 bg-black border-t border-stone-800 z-20">
        <div className="flex gap-2 items-end">
           <div className="text-term-amber font-mono font-bold py-3 pl-2">{'>'}</div>
           <textarea
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder="ENTER COMMAND..."
             className="flex-1 bg-transparent border-none focus:ring-0 text-white font-mono text-sm md:text-base p-3 resize-none h-12 md:h-14 placeholder-stone-700 text-left"
             disabled={isLoading}
             dir="ltr"
             style={{ textAlign: 'left', direction: 'ltr' }}
           />
           <button 
             onClick={() => handleSend()}
             disabled={isLoading || !input.trim()}
             className="px-4 py-3 bg-stone-900 border border-stone-700 text-stone-400 font-bold text-xs hover:text-term-amber hover:border-term-amber transition-all uppercase tracking-wider"
           >
             TX
           </button>
        </div>
      </div>
    </div>
  );
};
