import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
  nationality: string;
  setNationality: (n: string) => void;
}

export const SniperDetails: React.FC<Props> = ({ onNext, nationality, setNationality }) => {
  const path = PATHS['THE_SNIPER'];

  return (
    <div className="border border-emerald-500 bg-black p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-emerald-500 text-black text-[10px] font-bold">
        TARGETING_SYSTEM
      </div>

      <h2 className="text-2xl font-display text-emerald-500 mb-4">{path.name}</h2>
      <p className="text-sm font-mono text-emerald-200 leading-relaxed mb-6 border-b border-emerald-900 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-emerald-700 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-black border border-emerald-900/50 px-2 py-1">
                <span className="text-[10px] text-emerald-400">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 ${i < val ? 'bg-emerald-500' : 'bg-emerald-900/20'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-emerald-700 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-emerald-600 italic">"{path.startingTraits[0].description}"</p>
        </div>

        <div className="mt-4 border-t border-emerald-900 pt-4">
          <div className="text-xs text-emerald-500 mb-2">SELECT ORIGIN FACTION</div>
          <div className="flex gap-2">
            {['USA', 'RUSSIA', 'CHINA'].map((nat) => (
              <button
                key={nat}
                onClick={() => setNationality(nat)}
                className={`flex-1 py-2 text-[10px] font-bold border transition-colors ${nationality === nat ? 'bg-emerald-500 text-black border-emerald-500' : 'border-emerald-900 text-emerald-700 hover:border-emerald-500 hover:text-emerald-500'}`}
              >
                {nat}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-emerald-300">
            > ISSUE: {nationality === 'USA' ? 'M2010 Enhanced' : nationality === 'RUSSIA' ? 'SV-98M' : 'QBU-10 Anti-Mat'}
          </div>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-emerald-500 text-black font-display text-xl py-3 text-center group-hover:bg-emerald-400 transition-colors">
          LOCK TARGET
        </div>
      </button>
    </div>
  );
};