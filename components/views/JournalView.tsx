
import React, { useState } from 'react';
import { Quest } from '../../types';

interface Props {
  quests: Quest[];
}

export const JournalView: React.FC<Props> = ({ quests }) => {
  const [expandedQuest, setExpandedQuest] = useState<number | string | null>(null);

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black">
      <div className="flex-none mb-6 border-b border-white/20 pb-4">
         <h2 className="text-2xl font-display text-white tracking-widest">MISSION_LOG</h2>
         <div className="flex gap-4 text-[10px] font-mono text-stone-500 mt-1">
            <span>ACTIVE: {quests.filter(q => q.status === 'ACTIVE').length}</span>
            <span>COMPLETED: {quests.filter(q => q.status === 'COMPLETED').length}</span>
            <span>FAILED: {quests.filter(q => q.status === 'FAILED').length}</span>
         </div>
      </div>

      <div className="space-y-4">
         {quests.length === 0 ? (
           <div className="text-center text-stone-600 font-mono mt-10">
             NO ACTIVE DIRECTIVES
           </div>
         ) : (
           quests.map((quest) => {
             const isExpanded = expandedQuest === quest.id;
             const isCompleted = quest.status === 'COMPLETED';

             return (
               <div 
                 key={quest.id}
                 onClick={() => setExpandedQuest(isExpanded ? null : quest.id)}
                 className={`
                   border transition-all duration-300 cursor-pointer relative overflow-hidden group
                   ${isCompleted ? 'border-stone-800 bg-black opacity-60' : 'border-term-amber/30 bg-term-amber/5'}
                   ${isExpanded ? 'bg-black border-term-amber' : ''}
                 `}
               >
                  {/* Status Tab */}
                  <div className={`
                    absolute top-0 right-0 px-2 py-0.5 text-[9px] font-bold tracking-wider
                    ${isCompleted ? 'bg-stone-800 text-stone-400' : 'bg-term-amber text-black'}
                  `}>
                     {quest.status}
                  </div>

                  <div className="p-4">
                     <h3 className={`font-display text-xl mb-1 ${isCompleted ? 'text-stone-500 line-through' : 'text-white'}`}>
                       {quest.title}
                     </h3>
                     
                     {isExpanded && (
                       <div className="mt-4 space-y-4 animate-[fadeIn_0.3s_ease-out]">
                          <p className="text-sm font-mono text-stone-300 leading-relaxed border-l-2 border-white/10 pl-3">
                             {quest.desc}
                          </p>

                          <div className="space-y-2 bg-black/50 p-3 border border-white/5">
                             <div className="text-[10px] text-stone-500 font-bold uppercase mb-2">Objectives</div>
                             {quest.objectives.map((obj, i) => (
                               <div key={i} className="flex items-center gap-3 text-xs font-mono">
                                  <div className={`w-3 h-3 border flex items-center justify-center ${obj.done ? 'border-green-500 bg-green-500/20' : 'border-stone-600'}`}>
                                     {obj.done && <div className="w-1.5 h-1.5 bg-green-500"></div>}
                                  </div>
                                  <span className={obj.done ? 'text-stone-500 line-through' : 'text-stone-300'}>{obj.text}</span>
                               </div>
                             ))}
                          </div>

                          {quest.rewards && (
                            <div className="flex justify-between items-center pt-2 border-t border-white/10">
                               <span className="text-[10px] text-stone-500">REWARDS:</span>
                               <span className="text-xs font-bold text-term-amber">{quest.rewards}</span>
                            </div>
                          )}
                       </div>
                     )}
                     
                     {!isExpanded && (
                        <div className="text-[10px] text-stone-500 font-mono mt-1 truncate">
                           {quest.desc}
                        </div>
                     )}
                  </div>
               </div>
             );
           })
         )}
      </div>
    </div>
  );
};
