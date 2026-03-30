
import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const TraitorDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['THE_TRAITOR'];

  return (
    <div className="border border-stone-600 bg-black p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-stone-600 text-black text-[10px] font-bold">
        CLASS_DETAILS
      </div>

      <h2 className="text-2xl font-display text-stone-400 mb-4">{path.name}</h2>
      <p className="text-sm font-mono text-stone-300 leading-relaxed mb-6 border-b border-stone-800 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-stone-500 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-zinc-900 px-2 py-1">
                <span className="text-[10px] text-stone-300">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 ${i < val ? 'bg-stone-500' : 'bg-zinc-800'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-stone-500 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-stone-600 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-stone-600 text-black font-display text-xl py-3 text-center group-hover:bg-stone-400 transition-colors">
          ACCEPT PAST
        </div>
      </button>
    </div>
  );
};
