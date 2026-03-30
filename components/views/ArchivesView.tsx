
import React, { useState, useEffect, useRef } from 'react';

const ENTRIES = [
  { id: 1, date: '2030-10-24', title: 'THE_FLASH.LOG', type: 'AUDIO', status: 'CORRUPTED', content: "Recording start. I saw it. The sky turned white. Not bright, just... white. Then the heat hit. It wasn't like fire, it was like the air itself was screaming. Warsaw is gone. I repeat, Warsaw is gone." },
  { id: 2, date: '2045-03-12', title: 'PROJECT_WINTER.TXT', type: 'TEXT', status: 'DECRYPTED', content: "Project Winter status report. The cryo-pods are failing. Power fluctuations in Sector 7 are critical. We have to make a choice. Wake them up now, or let them sleep forever. Commander, your orders?" },
  { id: 3, date: '2051-11-05', title: 'SCOUT_REPORT_12.DAT', type: 'DATA', status: 'READ', content: "Scout Report. Sector 4 is clear of radiation, but heavily infested with those... things. They look like dogs, but wrong. Too many teeth. Avoid the metro tunnels." },
  { id: 4, date: '????-??-??', title: 'ALIEN_SIGNAL.WAV', type: 'SPECTRO', status: 'LOCKED', content: "Signal analysis. It's not random. It's repeating. 44.2 Hertz. It's coming from the Spire. Something is broadcasting." },
];

export const ArchivesView: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const animationRef = useRef<number | null>(null);

  const currentFile = ENTRIES.find(e => e.id === selectedEntry);

  useEffect(() => {
    // Cleanup speech on unmount
    return () => {
      window.speechSynthesis.cancel();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handlePlay = (text: string) => {
    window.speechSynthesis.cancel();
    
    if (isPlaying && currentFile?.content === text) {
      setIsPlaying(false);
      setPlaybackProgress(0);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    // Try to find a robotic or deep voice
    const voices = window.speechSynthesis.getVoices();
    const systemVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft David')) || voices[0];
    if (systemVoice) utterance.voice = systemVoice;

    utterance.onstart = () => {
      setIsPlaying(true);
      animateProgress();
    };
    utterance.onend = () => {
      setIsPlaying(false);
      setPlaybackProgress(100);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    window.speechSynthesis.speak(utterance);
  };

  const animateProgress = () => {
    setPlaybackProgress(prev => {
      if (prev >= 100) return 0;
      return prev + 0.5;
    });
    animationRef.current = requestAnimationFrame(animateProgress);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
      {/* Directory List */}
      <div className="flex-1 border border-white/20 bg-black/50 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700">
        <div className="text-xs text-stone-500 font-mono mb-4 border-b border-white/10 pb-2">
           ROOT:/SYSTEM/LOGS/ARCHIVE_2052/
        </div>
        
        <div className="space-y-1">
          {ENTRIES.map(entry => (
            <button 
              key={entry.id} 
              onClick={() => {
                setSelectedEntry(entry.id);
                setIsPlaying(false);
                window.speechSynthesis.cancel();
                setPlaybackProgress(0);
              }}
              className={`w-full flex items-center gap-3 p-2 font-mono text-left transition-all border border-transparent
                ${selectedEntry === entry.id 
                  ? 'bg-white/10 border-white/30 text-white' 
                  : 'text-stone-400 hover:text-white hover:bg-white/5'}
              `}
            >
               <div className={`w-2 h-2 ${selectedEntry === entry.id ? 'bg-current animate-pulse' : 'bg-stone-700'}`}></div>
               <div className="flex-1">
                  <div className="text-sm tracking-wider">{entry.title}</div>
                  <div className="text-[10px] opacity-50">{entry.date} | {entry.type}</div>
               </div>
               <div className="text-[10px] border border-current px-1 opacity-70">{entry.status}</div>
            </button>
          ))}
        </div>
      </div>

      {/* File Viewer / Reader */}
      <div className="flex-[1.5] border border-white/20 bg-black p-6 relative flex flex-col overflow-hidden">
        {currentFile ? (
          <>
             <div className="flex justify-between items-start mb-6 border-b-2 border-dashed border-stone-800 pb-4 flex-none">
                <div>
                   <h2 className="text-2xl font-display tracking-widest text-white mb-1">{currentFile.title}</h2>
                   <div className="text-xs font-mono text-stone-500">
                      SIZE: {currentFile.content.length * 12} BYTES // ENC: {currentFile.status}
                   </div>
                </div>
                {/* Play Button */}
                <button 
                   onClick={() => handlePlay(currentFile.content)}
                   className={`
                     w-12 h-12 flex items-center justify-center border transition-all
                     ${isPlaying 
                        ? 'border-red-500 text-red-500 animate-pulse' 
                        : 'border-white/30 text-white hover:border-white hover:bg-white/10'}
                   `}
                >
                   {isPlaying ? (
                     <div className="w-4 h-4 bg-current"></div>
                   ) : (
                     <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-current border-b-[8px] border-b-transparent ml-1"></div>
                   )}
                </button>
             </div>

             {/* Content Area */}
             <div className="flex-1 font-mono text-sm leading-relaxed text-stone-300 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 whitespace-pre-wrap">
                {isPlaying ? (
                   <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                      {currentFile.content}
                   </span>
                ) : (
                   currentFile.content
                )}
             </div>

             {/* Visualizer / Status Footer */}
             <div className="mt-4 h-12 border border-stone-800 bg-stone-900/50 flex items-end gap-[2px] p-1 overflow-hidden flex-none">
                {isPlaying ? (
                  Array.from({length: 40}).map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-current opacity-50 transition-all duration-75"
                      style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                  ))
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-stone-600">
                    AWAITING PLAYBACK INPUT...
                  </div>
                )}
             </div>
          </>
        ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-stone-600">
              <div className="text-4xl mb-4 opacity-20 font-display">NO_DATA_SELECTED</div>
              <div className="text-xs font-mono">Select a file from the directory to decrypt.</div>
           </div>
        )}
      </div>
    </div>
  );
};
