
import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const SurvivorDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['THE_SURVIVOR'];

  return (
    <div className="border border-amber-700 bg-[#080500] p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-amber-800 text-amber-100 text-[10px] font-bold">
        ADAPTED
      </div>

      <h2 className="text-2xl font-display text-amber-600 mb-4">{path.name}</h2>
      <p className="text-sm font-mono text-amber-200/70 leading-relaxed mb-6 border-b border-amber-900 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-amber-700 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-amber-950/20 px-2 py-1">
                <span className="text-[10px] text-amber-500">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 ${i < val ? 'bg-amber-600' : 'bg-amber-900/30'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-amber-600 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-amber-400 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-amber-700 text-black font-display text-xl py-3 text-center group-hover:bg-amber-500 transition-colors">
          ENDURE
        </div>
      </button>
    </div>
  );
};
