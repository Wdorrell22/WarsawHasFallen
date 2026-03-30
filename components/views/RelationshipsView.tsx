
import React, { useState, useEffect } from 'react';
import { NPC } from '../../types';

interface Props {
  relationships: NPC[];
}

export const RelationshipsView: React.FC<Props> = ({ relationships }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  useEffect(() => {
    if (relationships.length > 0 && !selectedId) {
      setSelectedId(relationships[0].id);
    }
  }, [relationships, selectedId]);

  const currentNPC = relationships.find(n => n.id === selectedId) || relationships[0];

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">
      {/* Header Selector */}
      {relationships.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-stone-600">
           <div className="text-4xl mb-4 font-display opacity-20">NO_CONTACTS</div>
           <div className="text-xs font-mono">Social interactions required to populate database.</div>
        </div>
      ) : (
        <>
          <div className="flex-none flex overflow-x-auto gap-2 p-2 border-b border-term-amber/30 scrollbar-hide">
            {relationships.map(npc => (
              <button
                key={npc.id}
                onClick={() => setSelectedId(npc.id)}
                className={`
                  flex-none w-16 h-16 border relative overflow-hidden transition-all
                  ${selectedId === npc.id ? 'border-term-amber shadow-[0_0_10px_#ffb000]' : 'border-term-gray opacity-50'}
                `}
              >
                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                 <div className="absolute bottom-1 w-full text-center text-[10px] font-bold z-20 text-white truncate px-1">{npc.name}</div>
                 {/* Abstract Avatar Placeholder */}
                 <div className={`w-full h-full bg-gradient-to-br ${selectedId === npc.id ? 'from-term-amber/20' : 'from-gray-800'} to-black`}></div>
              </button>
            ))}
          </div>

          {/* Main Interaction Area */}
          {currentNPC && (
            <div className="flex-1 p-4 flex flex-col items-center overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black">
               <div className="relative w-full max-w-xs aspect-[3/4] border-2 border-term-amber/50 bg-black p-2 mb-4 shadow-[0_0_20px_rgba(255,176,0,0.1)] flex-none">
                  {/* Visual Representation */}
                  <div className="w-full h-full bg-term-grid relative overflow-hidden flex items-center justify-center">
                     <div className="text-4xl animate-pulse opacity-50 font-display">
                       [IMG]
                     </div>
                     <div className="absolute top-2 left-2 text-[10px] bg-black px-1 border border-term-amber text-term-amber">
                       STATUS: {currentNPC.mood.toUpperCase()}
                     </div>
                  </div>
               </div>

               <div className="w-full max-w-xs space-y-4 flex-none">
                  <div className="text-center">
                     <h2 className="text-2xl font-display text-white mb-1">{currentNPC.name}</h2>
                     <div className="text-xs text-term-amber-dim font-mono">{currentNPC.role}</div>
                  </div>

                  {/* Heart Meter */}
                  <div className="flex justify-center gap-1">
                    {[...Array(currentNPC.maxHearts)].map((_, i) => (
                      <div key={i} className={`
                        w-4 h-4 transform rotate-45 transition-colors duration-300
                        ${i < currentNPC.hearts ? 'bg-term-red shadow-[0_0_5px_red]' : 'bg-term-gray/30'}
                      `}></div>
                    ))}
                  </div>

                  <p className="text-xs text-center text-stone-400 italic font-mono border-t border-b border-term-gray/30 py-2">
                    "{currentNPC.desc}"
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-4">
                     <button className="py-2 border border-term-gray hover:border-term-amber hover:bg-term-amber hover:text-black text-xs font-bold transition-all">
                        TALK
                     </button>
                     <button className="py-2 border border-term-gray hover:border-term-red hover:bg-term-red hover:text-black text-xs font-bold transition-all">
                        GIFT
                     </button>
                     <button className="py-2 border border-term-gray hover:border-purple-500 hover:bg-purple-500 hover:text-white text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed" disabled>
                        DATE
                     </button>
                  </div>
               </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
