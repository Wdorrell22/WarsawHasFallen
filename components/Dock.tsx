
import React from 'react';
import { TabView } from '../types';
import { 
  IconStatus, IconJournal, IconGear, IconComms, 
  IconReputation, IconRelations, IconArchives, IconFabrication, IconGame 
} from './icons/DockIcons';

interface DockProps {
  currentTab: TabView;
  onTabChange: (tab: TabView) => void;
  reputationUnlocked?: boolean;
}

export const Dock: React.FC<DockProps> = ({ currentTab, onTabChange, reputationUnlocked = false }) => {
  const tabs = [
    { id: TabView.GAME, label: 'MAIN', icon: IconGame },
    { id: TabView.STATUS, label: 'BIO', icon: IconStatus },
    { id: TabView.JOURNAL, label: 'LOGS', icon: IconJournal },
    { id: TabView.GEAR, label: 'GEAR', icon: IconGear },
    { id: TabView.FABRICATION, label: 'FAB', icon: IconFabrication },
    { id: TabView.REPUTATION, label: 'REP', icon: IconReputation, hidden: !reputationUnlocked },
    { id: TabView.RELATIONS, label: 'SOC', icon: IconRelations },
    { id: TabView.ARCHIVES, label: 'DATA', icon: IconArchives },
    { id: TabView.COMMS, label: 'NET', icon: IconComms },
  ];

  return (
    <div className="absolute bottom-4 left-0 right-0 z-50 flex justify-center px-2">
      {/* Dock Container - Responsive Width & Scrolling on Mobile */}
      <div className="bg-[#0a0a0a]/90 border border-white/10 p-1.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md w-full md:w-auto max-w-full">
        
        <div className="flex gap-1 md:gap-2 overflow-x-auto snap-x scrollbar-hide w-full justify-between md:justify-center">
          {tabs.filter(t => !t.hidden).map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  group relative flex flex-col items-center justify-center p-2 md:px-4 md:py-3 min-w-[50px] md:min-w-[70px] rounded-lg transition-all duration-200 border snap-center flex-1 md:flex-none
                  ${isActive 
                    ? 'bg-white/10 border-white/40 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] translate-y-0.5' 
                    : 'bg-transparent border-transparent text-stone-500 hover:text-white hover:bg-white/5'}
                `}
              >
                <Icon className={`h-5 w-5 md:h-6 md:w-6 mb-1 md:mb-2 transition-transform ${isActive ? 'scale-110 drop-shadow-[0_0_8px_currentColor]' : 'scale-100'}`} />
                <span className="font-mono text-[8px] md:text-[9px] font-bold tracking-widest">{tab.label}</span>
                
                {/* Active Indicator Light */}
                <div className={`
                   absolute top-1 right-1 md:top-2 md:right-2 w-1 h-1 rounded-full
                   ${isActive ? 'bg-current shadow-[0_0_5px_currentColor] animate-pulse' : 'bg-black'}
                `}></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
