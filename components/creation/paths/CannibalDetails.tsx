import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const CannibalDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['THE_CANNIBAL'];

  return (
    <div className="border border-red-900 bg-black p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-red-900 text-red-100 text-[10px] font-bold">
        HUNGER_DETECTED
      </div>

      <h2 className="text-2xl font-display text-red-800 mb-4">{path.name}</h2>
      <p className="text-sm font-mono text-red-400 leading-relaxed mb-6 border-b border-red-900 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-red-900 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-zinc-900 px-2 py-1">
                <span className="text-[10px] text-red-700">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 ${i < val ? 'bg-red-900' : 'bg-zinc-800'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-red-900 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-red-900/70 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-red-900 text-red-100 font-display text-xl py-3 text-center group-hover:bg-red-800 transition-colors">
          FEED
        </div>
      </button>
    </div>
  );
};