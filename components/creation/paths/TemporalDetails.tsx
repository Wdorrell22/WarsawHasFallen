
import React from 'react';
import { PATHS } from '../../../data/paths';

interface Props {
  onNext: () => void;
}

export const TemporalDetails: React.FC<Props> = ({ onNext }) => {
  const path = PATHS['TEMPORAL_ANOMALY'];

  return (
    <div className="border border-blue-400 bg-black p-4 flex flex-col relative h-full animate-[typewriter_0.2s_steps(10)_forwards]">
      <div className="absolute top-0 right-0 p-1 bg-blue-500 text-black text-[10px] font-bold animate-pulse">
        TIMELINE_ERR
      </div>

      <h2 className="text-2xl font-display text-blue-400 mb-4">{path.name}</h2>
      <p className="text-sm font-mono text-blue-100 leading-relaxed mb-6 border-b border-blue-900 pb-4">
        {path.description}
      </p>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-blue-600 mb-2">
            ACRONYM STAT SYSTEM
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(path.baseStats).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center bg-zinc-900 px-2 py-1">
                <span className="text-[10px] text-blue-300">{label}</span>
                <div className="flex gap-0.5">
                  {Array.from({length: 10}).map((_, i) => (
                    <div key={i} className={`w-1 h-2 ${i < val ? 'bg-blue-500' : 'bg-zinc-800'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-blue-600 mb-1">TRAIT: {path.startingTraits[0].name}</div>
          <p className="text-[10px] text-blue-300 italic">"{path.startingTraits[0].description}"</p>
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-auto pt-6 w-full group"
      >
        <div className="bg-blue-600 text-black font-display text-xl py-3 text-center group-hover:bg-blue-400 transition-colors">
          SYNC CHRONOMETER
        </div>
      </button>
    </div>
  );
};
