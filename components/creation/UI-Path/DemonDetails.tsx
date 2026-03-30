
import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const DemonDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['THE_DEMON'];

  return (
    <div className="border border-red-900 bg-[#0a0000] p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-red-950 text-red-500 text-[10px] font-bold tracking-widest">
        CORRUPTION_DETECTED
      </div>

      <h2 className="text-2xl font-display text-red-600 mb-4 tracking-widest drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">{path.name}</h2>
      <p className="text-sm font-mono text-red-400 leading-relaxed mb-6 border-b border-red-900/50 pb-4 italic">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-red-700 mb-2 font-bold">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-red-950/20 border-l border-red-900 px-2 py-1">
                <span className="text-[10px] text-red-500">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 skew-x-12 ${i < val ? 'bg-red-700' : 'bg-zinc-900'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-red-600 mb-1 font-bold">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-red-800 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-red-900/20 border border-red-800 text-red-500 font-display text-xl py-3 text-center group-hover:bg-red-900 group-hover:text-black transition-all duration-300">
          UNLEASH
        </div>
      </button>
    </div>
  );
};
