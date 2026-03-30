
import React from 'react';
import { GameLocation } from '../../types';
import { LOCATIONS } from '../../data/world';

interface Props {
  currentLocationId: string;
  onTravel: (locationId: string) => void;
}

export const MapView: React.FC<Props> = ({ currentLocationId, onTravel }) => {
  const gridSize = 10;
  
  return (
    <div className="h-full flex flex-col p-6 overflow-hidden items-center justify-center">
      <div className="w-full max-w-md">
        <div className="chamfer bg-black border border-term-gray p-4 mb-4 flex justify-between items-center w-full">
           <div>
              <h2 className="text-xl font-display text-white">SAT_UPLINK</h2>
              <div className="text-[9px] text-term-amber-dim font-mono">CONNECTION_STABLE</div>
           </div>
           <div className="flex gap-1">
              <div className="w-1 h-3 bg-term-amber animate-pulse"></div>
              <div className="w-1 h-3 bg-term-amber animate-pulse delay-75"></div>
              <div className="w-1 h-3 bg-term-amber animate-pulse delay-150"></div>
           </div>
        </div>

        <div className="relative aspect-square w-full border-4 border-neutral-800 bg-[#050505] overflow-hidden shadow-inner">
          {/* Grid Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20" 
               style={{ 
                 backgroundImage: `
                   linear-gradient(rgba(255, 176, 0, 0.3) 1px, transparent 1px), 
                   linear-gradient(90deg, rgba(255, 176, 0, 0.3) 1px, transparent 1px)
                 `,
                 backgroundSize: '10% 10%'
               }}>
          </div>
          
          {/* Radar Sweep */}
          <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,255,0,0.1)_60deg,transparent_60deg)] animate-[spin_4s_linear_infinite] opacity-30"></div>
          <div className="absolute inset-0 z-0 border border-term-amber/10 rounded-full scale-90"></div>
          <div className="absolute inset-0 z-0 border border-term-amber/10 rounded-full scale-50"></div>

          {/* Map Nodes */}
          {Object.values(LOCATIONS).map((loc) => {
             const isCurrent = loc.id === currentLocationId;
             const left = (loc.coordinates.x / gridSize) * 100;
             const top = (loc.coordinates.y / gridSize) * 100;

             return (
               <button
                 key={loc.id}
                 onClick={() => !isCurrent && onTravel(loc.id)}
                 style={{ left: `${left}%`, top: `${top}%` }}
                 disabled={isCurrent}
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
               >
                  <div className="flex flex-col items-center gap-1">
                    <div className={`
                       w-3 h-3 rotate-45 transition-all duration-300 border
                       ${isCurrent 
                         ? 'bg-term-amber border-white shadow-[0_0_15px_#ffb000]' 
                         : 'bg-black border-stone-600 group-hover:border-term-amber group-hover:bg-term-amber/20'}
                    `}></div>
                    
                    <span className={`
                      text-[8px] font-mono uppercase bg-black/90 px-1 border border-stone-800 whitespace-nowrap
                      ${isCurrent ? 'text-term-amber border-term-amber' : 'text-stone-500 group-hover:text-white'}
                    `}>
                      {loc.name}
                    </span>
                  </div>
               </button>
             );
          })}
        </div>

        <div className="mt-4 border-t-2 border-dashed border-stone-800 pt-4 w-full">
           <div className="text-[10px] text-stone-500 font-mono mb-2">TARGET_ANALYSIS</div>
           {LOCATIONS[currentLocationId] && (
              <div className="text-xs text-white font-mono leading-relaxed bg-term-grid/50 p-2 border-l-2 border-term-amber">
                 > SECTOR: {LOCATIONS[currentLocationId].name.toUpperCase()}<br/>
                 > RAD_LEVELS: <span className={LOCATIONS[currentLocationId].dangerLevel > 3 ? 'text-term-red' : 'text-term-amber'}>{LOCATIONS[currentLocationId].dangerLevel * 200} mSv</span><br/>
                 > STATUS: SCANNING...
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
