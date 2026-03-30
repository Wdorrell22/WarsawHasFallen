
import React from 'react';
import { PathConfig, Subclass } from '../../types';

interface Props {
  pathData: PathConfig;
  selectedSubclass: Subclass | null;
  onSelectSubclass: (subclass: Subclass) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const SubclassSelection: React.FC<Props> = ({ 
  pathData, 
  selectedSubclass, 
  onSelectSubclass, 
  onConfirm, 
  onBack 
}) => {
  return (
    <div className="flex-1 flex flex-col max-w-full mx-auto w-full h-full">
       <p className="text-center text-xs text-term-amber-dim font-mono mb-4">INITIALIZE SUB-ROUTINE</p>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-hidden">
          
          {/* Left Column: List of Subclasses */}
          <div className="md:col-span-1 flex flex-col gap-2 overflow-y-auto pr-2 pb-20 md:pb-0">
             {pathData.subclasses.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => onSelectSubclass(sub)}
                  className={`
                    p-4 text-left border transition-all relative overflow-hidden shrink-0
                    ${selectedSubclass?.id === sub.id 
                      ? 'border-term-amber bg-term-amber/20 text-white shadow-[inset_0_0_10px_rgba(255,176,0,0.2)]' 
                      : 'border-term-gray text-stone-500 hover:border-stone-400 hover:text-stone-300'}
                  `}
                >
                   <div className="font-display text-lg relative z-10">{sub.name.toUpperCase()}</div>
                   <div className="text-[10px] font-mono opacity-50 relative z-10">Codename: {sub.id.toUpperCase()}</div>
                   {selectedSubclass?.id === sub.id && (
                     <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-term-amber rounded-full animate-pulse shadow-[0_0_5px_#ffb000]"></div>
                   )}
                </button>
             ))}
             <button 
                onClick={onBack}
                className="mt-auto py-3 border border-red-900 text-red-500 hover:bg-red-900/20 hover:text-red-400 font-mono text-xs uppercase shrink-0"
             >
                &lt; ABORT SEQUENCE
             </button>
          </div>

          {/* Right Column: Detailed View */}
          <div className="md:col-span-2 border border-term-amber/30 bg-black p-6 relative flex flex-col h-full overflow-y-auto">
             {/* Decorative Corner Lines */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-term-amber"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-term-amber"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-term-amber"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-term-amber"></div>

             {selectedSubclass ? (
               <>
                 <div className="mb-6">
                    <div className="text-xs text-term-amber font-mono mb-1">ASSIGNED PROTOCOL</div>
                    <h2 className="text-3xl md:text-4xl font-display text-white mb-2 glow-text">{selectedSubclass.name}</h2>
                    <div className="h-1 w-24 bg-term-amber mb-4"></div>
                    <p className="text-base md:text-lg text-stone-300 font-mono italic leading-relaxed">
                       "{selectedSubclass.description}"
                    </p>
                 </div>

                 <div className="bg-term-grid/50 border border-stone-800 p-4 mb-6">
                    <div className="text-xs text-red-400 font-bold mb-2 uppercase tracking-widest animate-pulse">
                       >> ACTIVE DIRECTIVE
                    </div>
                    <p className="text-sm text-term-amber font-mono leading-relaxed">
                       {selectedSubclass.mechanic}
                    </p>
                 </div>

                 <div className="mt-auto pt-4">
                    <div className="flex justify-between text-xs text-stone-500 font-mono mb-2">
                       <span>SYSTEM_INTEGRITY_CHECK</span>
                       <span>READY</span>
                    </div>
                    <button 
                      onClick={onConfirm}
                      className="w-full bg-term-amber text-black font-display text-2xl py-4 hover:bg-white hover:scale-[1.01] transition-all duration-200 shadow-[0_0_20px_rgba(255,176,0,0.3)] clip-corner"
                    >
                      EXECUTE LINK
                    </button>
                 </div>
               </>
             ) : (
               <div className="flex-1 flex items-center justify-center text-stone-600 font-mono animate-pulse">
                  SELECT SUB-ROUTINE FROM LIST
               </div>
             )}
          </div>
       </div>
    </div>
  );
};
