
import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const HackerDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['THE_HACKER'];

  return (
    <div className="border border-green-500 bg-black p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-green-500 text-black text-[10px] font-bold">
        ROOT_ACCESS
      </div>

      <h2 className="text-2xl font-display text-green-500 mb-4">{path.name}</h2>
      <p className="text-sm font-mono text-green-200 leading-relaxed mb-6 border-b border-green-900 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-green-700 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-black border border-green-900/30 px-2 py-1">
                <span className="text-[10px] text-green-400">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 ${i < val ? 'bg-green-500' : 'bg-green-900/20'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-green-700 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-green-300 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-green-600 text-black font-display text-xl py-3 text-center group-hover:bg-green-400 transition-colors">
          JACK IN
        </div>
      </button>
    </div>
  );
};
