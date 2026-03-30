
import React from 'react';

export const CommsView: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black">
       <div className="tech-border bg-black p-4 mb-6 flex-none">
         <h2 className="text-xl font-display text-white">INTERCEPTS</h2>
         <div className="text-[9px] text-stone-500 font-mono">ENCRYPTION: BROKEN</div>
      </div>

      <div className="space-y-4 flex-1">
         {/* Active Quest */}
         <div className="border border-term-amber bg-term-amber/5 p-4 relative group">
            <div className="absolute -top-2 left-2 bg-black px-1 text-[9px] text-term-amber font-bold border border-term-amber uppercase tracking-wider">Priority Directive</div>
            <h3 className="text-white font-bold mb-2 font-display text-lg tracking-wide">SILENCE OF THE WEST</h3>
            <p className="text-xs text-stone-400 font-mono mb-3 leading-relaxed">
              US-NATO frequency 44.2 has been static for 22 years. Bunker command picked up a ghost signal near the Spire. Investigate immediately.
            </p>
            <div className="w-full bg-stone-900 h-1 mt-2">
               <div className="bg-term-amber w-1/3 h-full animate-pulse"></div>
            </div>
         </div>

         {/* Faction Message */}
         <div className="bg-neutral-900 border-l-4 border-stone-600 p-3 opacity-90 hover:opacity-100 hover:border-white transition-all">
            <div className="flex justify-between items-center mb-1 border-b border-stone-800 pb-1">
               <span className="text-[10px] text-stone-400 font-bold">SRC: ARCHIVIST_01</span>
               <span className="text-[8px] text-stone-600">DAT: 2030-10-24</span>
            </div>
            <p className="text-xs font-mono text-stone-300 italic">
               "We thought the missile shields would hold. We were wrong. When Russia and China retaliated against the US launch, Warsaw was just collateral damage."
            </p>
         </div>

         {/* Audio Log */}
         <div className="flex items-center gap-3 p-3 border border-stone-800 bg-black">
             <div className="h-10 w-10 border border-term-red/50 bg-term-red/10 flex items-center justify-center">
                <div className="w-2 h-2 bg-term-red rounded-full animate-ping"></div>
             </div>
             <div>
                <div className="text-xs text-term-red font-bold tracking-wider">RECORDING_FINAL_DAY</div>
                <div className="text-[9px] text-stone-500">UNKNOWN SPEAKER // 1:04</div>
             </div>
             <div className="ml-auto flex gap-0.5 items-end h-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 bg-term-red animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
             </div>
         </div>
      </div>
    </div>
  );
};
