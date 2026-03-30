
import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const MutantDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['THE_MUTANT'];

  return (
    <div className="border border-lime-500 bg-[#000500] p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-lime-600 text-black text-[10px] font-bold animate-pulse">
        DNA_FAILURE
      </div>

      <h2 className="text-2xl font-display text-lime-500 mb-4 glow-text">{path.name}</h2>
      <p className="text-sm font-mono text-lime-200 leading-relaxed mb-6 border-b border-lime-900 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-lime-700 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-lime-950/20 px-2 py-1 border border-lime-900/20">
                <span className="text-[10px] text-lime-400">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 rounded-sm ${i < val ? 'bg-lime-500 shadow-[0_0_5px_#84cc16]' : 'bg-lime-900/30'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-lime-600 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-lime-300 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-lime-600 text-black font-display text-xl py-3 text-center group-hover:bg-lime-400 transition-colors shadow-[0_0_15px_rgba(101,163,13,0.3)]">
          EVOLVE
        </div>
      </button>
    </div>
  );
};
