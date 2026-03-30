
import React from 'react';

const REPUTATION_TIERS = [
  { val: -1000, label: 'KILL ON SIGHT', color: 'text-term-red border-term-red bg-term-red' },
  { val: -500, label: 'HUNTED', color: 'text-orange-600 border-orange-600 bg-orange-600' },
  { val: -250, label: 'DESPISED', color: 'text-orange-400 border-orange-400 bg-orange-400' },
  { val: -125, label: 'HATED', color: 'text-yellow-600 border-yellow-600 bg-yellow-600' },
  { val: -75, label: 'DISLIKED', color: 'text-yellow-500 border-yellow-500 bg-yellow-500' },
  { val: 0, label: 'NEUTRAL', color: 'text-term-gray border-term-gray bg-term-gray' },
  { val: 75, label: 'LIKED', color: 'text-emerald-300 border-emerald-300 bg-emerald-300' },
  { val: 125, label: 'RESPECTED', color: 'text-emerald-500 border-emerald-500 bg-emerald-500' },
  { val: 250, label: 'REVERED', color: 'text-cyan-400 border-cyan-400 bg-cyan-400' },
  { val: 500, label: 'INFLUENTIAL', color: 'text-blue-500 border-blue-500 bg-blue-500' },
  { val: 1000, label: 'GAME_CHANGER', color: 'text-purple-500 border-purple-500 bg-purple-500 shadow-[0_0_10px_purple]' },
];

const getTier = (rep: number) => {
  // Find the closest tier that is <= the current rep, or the lowest tier
  for (let i = REPUTATION_TIERS.length - 1; i >= 0; i--) {
    if (rep >= REPUTATION_TIERS[i].val) return REPUTATION_TIERS[i];
  }
  return REPUTATION_TIERS[0];
};

const FACTIONS = [
  { id: 'gov', name: 'NEW WARSAW GOV', desc: 'Remnants of the old bureaucracy holding the city center.', rep: -150 },
  { id: 'scav', name: 'SCAVENGER UNION', desc: 'Loose collective of traders and thieves.', rep: 300 },
  { id: 'atom', name: 'CULT OF THE ATOM', desc: 'Worshippers of the glow. They occupy the craters.', rep: 800 },
  { id: 'nato', name: 'NATO REMNANT', desc: 'Military holdouts in the western districts.', rep: -900 },
];

export const ReputationView: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black">
      <div className="mb-6 border-b border-term-amber/30 pb-4 flex justify-between items-end flex-none">
         <h2 className="text-2xl font-display text-white">POLITICAL_STANDING</h2>
         <span className="text-xs text-term-gray font-mono">GLOBAL_MODIFIER: 1.0x</span>
      </div>

      <div className="space-y-8 px-1">
        {FACTIONS.map(faction => {
          const tier = getTier(faction.rep);
          const percent = (faction.rep + 1000) / 20; // Normalize -1000..1000 to 0..100
          
          return (
            <div key={faction.id} className="relative group bg-term-grid/30 p-3 rounded-lg border border-transparent hover:border-term-gray/50 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display text-xl text-white">{faction.name}</span>
                <span className={`text-[10px] font-bold px-2 py-1 border rounded-sm ${tier.color} bg-black`}>
                  {tier.label} ({faction.rep})
                </span>
              </div>
              
              <div className="text-sm text-term-gray font-mono mb-4 leading-relaxed">
                {faction.desc}
              </div>

              {/* Progress Bar Container */}
              <div className="h-5 bg-black border border-term-gray/50 relative overflow-hidden rounded-sm">
                {/* Center Marker */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/50 z-10"></div>
                
                {/* Bar */}
                <div 
                  className={`h-full transition-all duration-1000 ease-out opacity-80 ${tier.color.split(' ').pop()}`}
                  style={{ width: `${percent}%` }}
                ></div>

                {/* Grid Lines */}
                <div className="absolute inset-0 flex justify-between px-1">
                   {[...Array(20)].map((_, i) => <div key={i} className="w-[1px] h-full bg-white/10"></div>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 border-t border-term-amber/20 bg-term-grid/50 rounded-lg flex-none">
        <div className="text-xs text-term-amber-dim font-bold mb-2">TIER LEGEND</div>
        <div className="flex flex-wrap gap-2">
           {REPUTATION_TIERS.filter((_, i) => i % 2 === 0).map(t => (
             <span key={t.val} className={`text-[9px] px-1.5 py-0.5 border rounded ${t.color.replace('text-', 'border-').split(' ')[1]} text-term-gray`}>
               {t.label}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
};
