
import React from 'react';
import { PlayerStats, GameLocation, PathType } from '../../types';
import { PATHS } from '../../data/paths';

interface Props {
  stats: PlayerStats;
  location: GameLocation;
  pathId: PathType;
  codename: string;
}

export const StatusView: React.FC<Props> = ({ stats, location, pathId, codename }) => {
  const pathConfig = PATHS[pathId];
  const subclass = pathConfig.subclasses.find(s => s.name === codename);
  
  // Combine traits: Base Path Traits + Subclass Trait
  const traits = [...pathConfig.startingTraits];
  if (subclass?.trait) {
    traits.push(subclass.trait);
  }

  // Helper to calculate modifier
  const getModifier = (val: number) => {
    const mod = (val - 10) / 2;
    if (mod > 0) return `+${mod.toFixed(1)}`;
    if (mod < 0) return `${mod.toFixed(1)}`;
    return `+0.0`;
  };

  const getModColor = (val: number) => {
    if (val > 10) return 'text-term-amber'; // Positive
    if (val < 10) return 'text-red-500'; // Negative
    return 'text-stone-400'; // Neutral
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-black p-2 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      
      {/* Left Column: Vitals & Location */}
      <div className="space-y-4 md:space-y-6">
          {/* Location Card */}
          <div className="chamfer bg-black border border-white/20 p-4 md:p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] border border-current px-1 opacity-70">GPS_LOCK</div>
                <div className="text-[8px] md:text-[10px] text-red-500 font-mono animate-pulse">THREAT_LVL: {location.dangerLevel}</div>
              </div>
              <h2 className="text-3xl md:text-4xl font-display text-white mb-2 tracking-wide break-words">{location.name.toUpperCase()}</h2>
              <div className="w-12 h-1 bg-current mb-3"></div>
              <p className="text-xs md:text-sm opacity-80 font-mono leading-relaxed">
                {location.description}
              </p>
            </div>
          </div>

          {/* Vitals Monitor */}
          <div className="tech-border bg-black/50 p-4 md:p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-2">
                <h3 className="text-lg font-display text-white">BIO_METRICS</h3>
                <div className="text-[10px] font-mono opacity-50">HEART_RATE: 82 BPM</div>
              </div>

              <div className="space-y-4 md:space-y-5">
                  <StatusBar label="SUIT INTEGRITY" val={stats.hp} max={stats.maxHp} color="bg-red-500" />
                  <StatusBar label="RADIATION EXP" val={stats.rads} max={1000} color="bg-yellow-500" />
                  <StatusBar label="CALORIC STORE" val={stats.hunger} max={100} color="bg-emerald-600" />
                  
                  {stats.customMeters.map(meter => (
                    <StatusBar key={meter.id} label={meter.label} val={meter.value} max={meter.max} color={meter.color} />
                  ))}
              </div>
          </div>
      </div>

      {/* Right Column: Path Data & Traits */}
      <div className="space-y-4 md:space-y-6">
         {/* System Attributes */}
         <div className="tech-border bg-black/50 p-4 md:p-6">
            <div className="flex justify-between items-baseline mb-4 md:mb-6 border-b border-white/10 pb-2">
               <h3 className="text-xl font-display truncate pr-2">{pathConfig.name.toUpperCase()}</h3>
               <span className="text-[10px] opacity-50 whitespace-nowrap">CLASS_ID: 0{Math.floor(Math.random() * 99)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {Object.entries(stats.attributes).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center bg-white/5 px-2 md:px-3 py-2 border-l-2 border-white/20">
                  <span className="opacity-70 font-bold text-[9px] md:text-[10px] truncate pr-1">{key}</span>
                  <div className="text-right">
                    <span className="text-lg md:text-xl text-white font-display tracking-wider mr-2">{val as number}</span>
                    <span className={`text-[10px] font-mono font-bold ${getModColor(val as number)}`}>
                      ({getModifier(val as number)})
                    </span>
                  </div>
                </div>
              ))}
            </div>
         </div>

         {/* Active Mutations / Traits */}
         <div className="tech-border bg-black/50 p-4 md:p-6 relative overflow-hidden min-h-[200px]">
            <div className="absolute -right-4 -top-4 text-[60px] md:text-[100px] opacity-[0.03] font-display select-none pointer-events-none">TRAITS</div>
            <h3 className="text-lg font-display mb-4 text-white relative z-10">ACTIVE MUTATIONS</h3>
            <div className="text-sm font-mono opacity-80 space-y-4 relative z-10">
               {traits.map(trait => (
                 <div key={trait.id} className="flex gap-4 p-2 hover:bg-white/5 transition-colors">
                   <div className="w-1 bg-current shrink-0"></div>
                   <div>
                      <span className="text-white font-bold block text-sm tracking-wider mb-1">{trait.name.toUpperCase()}</span>
                      <span className="text-xs opacity-70 block leading-tight">{trait.description}</span>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const StatusBar: React.FC<{label: string, val: number, max: number, color: string}> = ({label, val, max, color}) => (
  <div className="w-full">
    <div className="flex justify-between text-[10px] font-bold uppercase mb-1 opacity-70 tracking-wider">
      <span>{label}</span>
      <span className="text-white font-mono">{Math.round((val/max)*100)}%</span>
    </div>
    <div className="h-3 w-full bg-black border border-white/20 p-[1px]">
       <div style={{ width: `${(val/max)*100}%` }} className={`h-full ${color} shadow-[0_0_10px_currentColor] opacity-90 transition-all duration-700 ease-out`}></div>
    </div>
  </div>
);
