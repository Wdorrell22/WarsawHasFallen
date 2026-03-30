
import React, { useState, useEffect } from 'react';

interface Props {
  onNewGame: () => void;
  onLoadGame: () => void;
  hasSaveData: boolean;
}

export const MainMenu: React.FC<Props> = ({ onNewGame, onLoadGame, hasSaveData }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Custom SVG Background for the Menu
  const MenuBackground = () => (
    <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-term-gray"/>
        </pattern>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb000" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grid)" />
      
      {/* Central Rotating Element */}
      <g className="animate-[spin_20s_linear_infinite] origin-center" style={{ transformOrigin: '200px 200px' }}>
         <circle cx="200" cy="200" r="100" stroke="#ffb000" strokeWidth="1" strokeDasharray="10 5" fill="none" opacity="0.3" />
         <circle cx="200" cy="200" r="140" stroke="#ffb000" strokeWidth="0.5" strokeDasharray="2 10" fill="none" opacity="0.2" />
         <path d="M 200 50 L 200 80 M 200 320 L 200 350 M 50 200 L 80 200 M 320 200 L 350 200" stroke="#ffb000" strokeWidth="2" />
      </g>
      
      {/* Biohazard / Radiation Motif */}
      <g transform="translate(200 200)">
        <path d="M0 -60 A60 60 0 0 1 52 30 A20 20 0 1 0 17 50 A80 80 0 0 0 0 -80 Z" fill="#ffb000" opacity="0.1" className="animate-pulse" />
        <path d="M0 -60 A60 60 0 0 0 -52 30 A20 20 0 1 1 -17 50 A80 80 0 0 1 0 -80 Z" fill="#ffb000" opacity="0.1" className="animate-pulse delay-75" />
        <path d="M -52 30 A60 60 0 0 0 52 30 A20 20 0 1 1 17 50 A20 20 0 1 0 -17 50 Z" fill="#ffb000" opacity="0.1" className="animate-pulse delay-150" />
      </g>
      
      <circle cx="200" cy="200" r="150" fill="url(#glow)" />
    </svg>
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden select-none">
      <MenuBackground />
      
      {/* Cinematic Glitch Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
      
      <div className="z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Title Block */}
        <div className="mb-12 text-center relative">
           <div className="text-[10px] tracking-[0.5em] text-term-gray mb-2 font-mono">WARSAW_RUINS_SIMULATION_V.2.0.5.2</div>
           <h1 className="text-5xl md:text-7xl font-display text-white tracking-tighter mb-1 glow-text animate-glitch">
             WARSAW
           </h1>
           <div className="h-1 w-full bg-term-amber mb-2 shadow-[0_0_10px_#ffb000]"></div>
           <div className="flex justify-between w-full text-xs font-mono text-term-amber-dim">
              <span>FALLEN</span>
              <span>2052</span>
           </div>
        </div>

        {/* Menu Options */}
        <div className="w-full space-y-4 font-mono">
           {/* New Game */}
           <button
             onClick={onNewGame}
             onMouseEnter={() => setHovered('new')}
             onMouseLeave={() => setHovered(null)}
             className="w-full group relative h-16 border border-stone-800 bg-black/50 hover:bg-term-amber/10 hover:border-term-amber transition-all duration-300"
           >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current transition-colors text-stone-600 group-hover:text-term-amber"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current transition-colors text-stone-600 group-hover:text-term-amber"></div>
              
              <div className="flex items-center justify-between px-6 h-full">
                <div className="flex flex-col items-start">
                   <span className="text-lg md:text-xl font-bold text-white group-hover:text-term-amber transition-colors tracking-widest">
                     INITIATE PROTOCOL
                   </span>
                   <span className="text-[10px] text-stone-500 group-hover:text-term-amber-dim">
                     BEGIN NEW SIMULATION
                   </span>
                </div>
                <div className={`text-2xl text-term-amber transition-transform duration-300 ${hovered === 'new' ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                  &gt;&gt;
                </div>
              </div>
           </button>

           {/* Load Game */}
           <button
             onClick={onLoadGame}
             disabled={!hasSaveData}
             onMouseEnter={() => setHovered('load')}
             onMouseLeave={() => setHovered(null)}
             className={`
               w-full group relative h-16 border transition-all duration-300
               ${hasSaveData 
                 ? 'border-stone-800 bg-black/50 hover:bg-white/5 hover:border-white' 
                 : 'border-stone-900 bg-black/80 opacity-50 cursor-not-allowed'}
             `}
           >
              {hasSaveData && (
                <>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current transition-colors text-stone-600 group-hover:text-white"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current transition-colors text-stone-600 group-hover:text-white"></div>
                </>
              )}
              
              <div className="flex items-center justify-between px-6 h-full">
                <div className="flex flex-col items-start">
                   <span className={`text-lg md:text-xl font-bold transition-colors tracking-widest ${hasSaveData ? 'text-stone-300 group-hover:text-white' : 'text-stone-700'}`}>
                     RESUME UPLINK
                   </span>
                   <span className="text-[10px] text-stone-500">
                     LOAD EXISTING PROFILE
                   </span>
                </div>
                {hasSaveData && (
                  <div className={`w-2 h-2 bg-green-500 rounded-full shadow-[0_0_5px_lime] ${hovered === 'load' ? 'animate-ping' : ''}`}></div>
                )}
              </div>
           </button>
        </div>

        {/* Footer Status */}
        <div className="mt-12 w-full text-center">
           <div className="inline-block border border-term-red/30 bg-term-red/5 px-4 py-1">
              <span className="text-[10px] text-term-red animate-pulse font-mono tracking-widest">
                WARNING: HIGH RADIATION DETECTED
              </span>
           </div>
           <div className="mt-2 text-[9px] text-stone-600 font-mono">
              SECURE CONNECTION: ENCRYPTED (AES-4096)
           </div>
        </div>
      </div>
    </div>
  );
};
