
import React, { useState } from 'react';
import { Item, PathType } from '../../types';
import { PATHS } from '../../data/paths';
import { getItem } from '../../data/items';

interface Props {
  items: string[];
  pathId: PathType;
  equippedItems: string[];
  onEquipToggle: (itemName: string) => void;
}

type WeightUnit = 'KG' | 'LB';
type FilterType = 'ALL' | 'WEAPON' | 'ARMOR' | 'CONSUMABLE' | 'GADGET' | 'JUNK';
type SortKey = 'NAME' | 'WEIGHT' | 'RARITY';
type SortOrder = 'ASC' | 'DESC';

interface ItemWithMetadata extends Item {
  uniqueId: string;
  originalIndex: number;
}

export const InventoryView: React.FC<Props> = ({ items, pathId, equippedItems, onEquipToggle }) => {
  const [selectedItem, setSelectedItem] = useState<ItemWithMetadata | null>(null);
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('KG');
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [sortKey, setSortKey] = useState<SortKey>('NAME');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ASC');

  const inventoryItems: ItemWithMetadata[] = items.map((name, index) => ({
    ...getItem(name),
    uniqueId: `${index}_${name}`,
    originalIndex: index
  }));

  const RARITY_VALUE = {
    'COMMON': 1,
    'MIL-SPEC': 2,
    'RARE': 3,
    'PROTOTYPE': 4,
    'LEGENDARY': 5
  };

  const sortItems = (a: ItemWithMetadata, b: ItemWithMetadata) => {
    let result = 0;
    switch (sortKey) {
      case 'NAME':
        result = a.name.localeCompare(b.name);
        break;
      case 'WEIGHT':
        result = a.weight - b.weight;
        break;
      case 'RARITY':
        result = RARITY_VALUE[a.rarity] - RARITY_VALUE[b.rarity];
        break;
    }
    return sortOrder === 'ASC' ? result : -result;
  };

  const filteredItems = inventoryItems
    .filter(i => filter === 'ALL' || i.type === filter)
    .sort(sortItems);

  const maxWeightKg = PATHS[pathId].carryCapacity;
  const currentWeightKg = inventoryItems.reduce((acc, item) => acc + item.weight, 0);

  const displayWeight = (kg: number) => {
    if (weightUnit === 'KG') return kg.toFixed(1);
    return (kg * 2.20462).toFixed(1);
  };

  const getPercentage = () => Math.min(100, (currentWeightKg / maxWeightKg) * 100);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortKey(key);
      setSortOrder('ASC');
    }
  };

  // FULL SCREEN PREVIEW COMPONENT
  if (selectedItem) {
    const isEquipped = equippedItems.includes(selectedItem.name);
    
    return (
      <div className="absolute inset-0 z-50 bg-black/95 flex flex-col p-4 md:p-8 animate-[fadeIn_0.2s_ease-out]">
         {/* Background Grid FX */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
         
         {/* Close Button Area */}
         <div className="flex justify-between items-start mb-6 z-10">
            <div className="flex flex-col">
              <div className="text-[10px] text-stone-500 font-mono tracking-widest">ITEM_ANALYSIS_SEQUENCE</div>
              <h2 className={`text-2xl md:text-4xl font-display uppercase tracking-wider
                 ${selectedItem.rarity === 'LEGENDARY' ? 'text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
                   selectedItem.rarity === 'PROTOTYPE' ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' :
                   selectedItem.rarity === 'RARE' ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
                   selectedItem.rarity === 'MIL-SPEC' ? 'text-blue-400' : 
                   'text-term-amber'}
              `}>
                {selectedItem.name}
              </h2>
            </div>
            
            <button 
              onClick={() => setSelectedItem(null)}
              className="group flex items-center gap-2 text-red-500 hover:text-white transition-colors"
            >
              <span className="text-xs font-bold tracking-widest">TERMINATE</span>
              <div className="w-8 h-8 border border-current flex items-center justify-center group-hover:bg-red-900/30">
                 <span className="text-xl leading-none">&times;</span>
              </div>
            </button>
         </div>

         {/* Content Split */}
         <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12 relative z-10 overflow-hidden">
             
             {/* Left: Visual Representation (Abstract) */}
             <div className="flex-1 border border-white/10 bg-black relative min-h-[200px] flex items-center justify-center overflow-hidden">
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br from-transparent to-current
                   ${selectedItem.rarity === 'LEGENDARY' ? 'text-purple-900' :
                     selectedItem.rarity === 'PROTOTYPE' ? 'text-cyan-900' :
                     selectedItem.rarity === 'RARE' ? 'text-yellow-900' :
                     'text-stone-800'}
                `}></div>
                
                {/* Rotating Wireframe Placeholder */}
                <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite] flex items-center justify-center">
                   <div className="w-24 h-24 md:w-36 md:h-36 border border-white/10 rotate-45 animate-[spin_15s_linear_infinite_reverse]"></div>
                </div>
                
                <div className="absolute bottom-4 left-4 text-[10px] font-mono text-stone-500">
                   <div>MASS: {displayWeight(selectedItem.weight)} {weightUnit}</div>
                   <div>ID: {selectedItem.id.toUpperCase()}</div>
                </div>
             </div>

             {/* Right: Data Block */}
             <div className="flex-1 flex flex-col">
                <div className="flex gap-4 mb-6 text-xs font-bold font-mono">
                   <div className="bg-white/10 px-2 py-1 text-white border border-white/20">{selectedItem.type}</div>
                   <div className={`px-2 py-1 border ${
                      selectedItem.rarity === 'LEGENDARY' ? 'border-purple-500 text-purple-400 bg-purple-900/20' :
                      selectedItem.rarity === 'PROTOTYPE' ? 'border-cyan-500 text-cyan-400 bg-cyan-900/20' :
                      selectedItem.rarity === 'RARE' ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20' :
                      selectedItem.rarity === 'MIL-SPEC' ? 'border-blue-500 text-blue-400 bg-blue-900/20' : 
                      'border-term-gray text-stone-400'
                   }`}>
                     {selectedItem.rarity}
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-600 mb-6">
                   <p className="text-sm md:text-base font-mono text-stone-300 leading-relaxed whitespace-pre-wrap">
                      {selectedItem.description}
                   </p>
                </div>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => {
                        onEquipToggle(selectedItem.name);
                        setSelectedItem(null);
                     }}
                     className={`
                       py-4 text-sm font-bold tracking-widest uppercase transition-all border
                       ${isEquipped 
                         ? 'border-stone-500 text-stone-400 hover:bg-stone-800' 
                         : 'border-term-amber text-term-amber hover:bg-term-amber hover:text-black shadow-[0_0_15px_rgba(255,176,0,0.1)]'}
                     `}
                   >
                     {isEquipped ? 'UNEQUIP' : 'EQUIP'}
                   </button>
                   
                   <button className="py-4 text-sm font-bold tracking-widest uppercase border border-red-900 text-red-700 hover:bg-red-950/50 hover:text-red-500 hover:border-red-500 transition-colors">
                      DISCARD
                   </button>
                </div>
             </div>
         </div>
      </div>
    );
  }

  // MAIN GRID VIEW
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Manifest Header */}
      <div className="flex-none border border-term-gray bg-black p-4 mb-2 relative">
         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-term-amber"></div>
         <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-term-amber"></div>
         <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-term-amber"></div>
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-term-amber"></div>

         <div className="flex justify-between items-start mb-2">
            <div>
               <h2 className="text-xl md:text-2xl font-display text-white tracking-widest">MANIFEST</h2>
               <div className="text-[10px] text-term-gray">CARGO_ID: 884-A</div>
            </div>
            <button 
              onClick={() => setWeightUnit(prev => prev === 'KG' ? 'LB' : 'KG')}
              className="text-[8px] md:text-[9px] font-bold border border-term-amber/50 px-2 py-1 text-term-amber hover:bg-term-amber hover:text-black transition-colors uppercase"
            >
              {weightUnit}
            </button>
         </div>
         
         {/* Weight Gauge */}
         <div className="w-full mt-2">
            <div className="flex justify-between text-[10px] text-stone-500 font-mono mb-1">
               <span>CAPACITY UTILIZATION</span>
               <span>{displayWeight(currentWeightKg)} / {displayWeight(maxWeightKg)} {weightUnit}</span>
            </div>
            <div className="h-4 bg-term-grid border border-stone-800 w-full relative p-[2px]">
               <div className="w-full h-full relative overflow-hidden">
                   {/* Striped Pattern */}
                   <div 
                     className={`h-full transition-all duration-500 ${getPercentage() > 90 ? 'bg-term-red' : 'bg-term-amber'} opacity-80`} 
                     style={{ 
                         width: `${getPercentage()}%`,
                         backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.3) 5px, rgba(0,0,0,0.3) 10px)'
                     }}
                   ></div>
               </div>
            </div>
         </div>
      </div>

      {/* Controls Bar: Filters & Sorting */}
      <div className="flex-none flex flex-col gap-2 px-1 mb-2">
         {/* Filter Row */}
         <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {['ALL', 'WEAPON', 'ARMOR', 'CONSUMABLE', 'GADGET', 'JUNK'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterType)}
                className={`
                  px-3 py-1 text-[10px] font-bold border transition-colors whitespace-nowrap
                  ${filter === f ? 'bg-term-gray text-white border-term-gray' : 'bg-black text-stone-500 border-stone-800 hover:border-stone-500'}
                `}
              >
                {f}
              </button>
            ))}
         </div>

         {/* Sort Row */}
         <div className="flex gap-2 border-t border-stone-900 pt-1 items-center">
            <span className="text-[9px] text-stone-600 font-mono uppercase">SORT BY:</span>
            {(['NAME', 'WEIGHT', 'RARITY'] as SortKey[]).map(key => (
               <button
                 key={key}
                 onClick={() => toggleSort(key)}
                 className={`
                   text-[9px] font-bold px-2 py-0.5 border flex items-center gap-1 transition-colors
                   ${sortKey === key ? 'border-term-amber text-term-amber bg-term-amber/10' : 'border-stone-800 text-stone-500 hover:text-stone-300'}
                 `}
               >
                 {key}
                 {sortKey === key && (
                   <span>{sortOrder === 'ASC' ? '▲' : '▼'}</span>
                 )}
               </button>
            ))}
         </div>
      </div>

      {/* Grid - Scrollable area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black min-h-0 pr-1 pb-24">
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 content-start p-1">
          {filteredItems.map((item, i) => {
            const itemIsEquipped = equippedItems.includes(item.name);

            return (
              <div 
                key={item.uniqueId} 
                onClick={() => setSelectedItem(item)}
                className={`
                  aspect-square border relative group cursor-pointer transition-all duration-100 hover:scale-[1.02]
                  border-stone-800 bg-black hover:border-term-amber/50 hover:bg-stone-900
                `}
              >
                 <div className="absolute top-0.5 left-1 text-[7px] text-stone-700 font-mono">
                   {i < 9 ? `0${i+1}` : i+1}
                 </div>

                 {itemIsEquipped && (
                   <div className="absolute top-0 right-0 bg-term-amber text-black text-[8px] font-bold px-1 z-10">EQP</div>
                 )}

                 <div className="h-full w-full flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                    {/* Background Rarity Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                      ${item.rarity === 'LEGENDARY' ? 'bg-purple-500' :
                        item.rarity === 'PROTOTYPE' ? 'bg-cyan-400' :
                        item.rarity === 'RARE' ? 'bg-yellow-500' :
                        item.rarity === 'MIL-SPEC' ? 'bg-blue-500' : 'bg-white'}
                    `}></div>

                    {/* Rarity Dot */}
                    <div className={`w-1.5 h-1.5 rounded-sm mb-2 rotate-45 ${
                      item.rarity === 'LEGENDARY' ? 'bg-purple-500 shadow-[0_0_8px_purple]' :
                      item.rarity === 'PROTOTYPE' ? 'bg-cyan-400 shadow-[0_0_8px_cyan]' :
                      item.rarity === 'RARE' ? 'bg-yellow-500 shadow-[0_0_5px_yellow]' :
                      item.rarity === 'MIL-SPEC' ? 'bg-blue-500 shadow-[0_0_5px_blue]' : 
                      'bg-term-gray'
                    }`}></div>
                    
                    <span className={`text-[8px] md:text-[9px] leading-tight font-bold uppercase relative z-10 ${
                      item.rarity === 'LEGENDARY' ? 'text-purple-300' :
                      item.rarity === 'PROTOTYPE' ? 'text-cyan-200' :
                      item.rarity === 'RARE' ? 'text-yellow-300' :
                      item.rarity === 'MIL-SPEC' ? 'text-blue-300' : 
                      'text-stone-400 group-hover:text-term-amber'
                    }`}>
                      {item.name}
                    </span>
                 </div>
              </div>
            );
          })}
          {/* Fill empty slots */}
          {Array.from({ length: Math.max(0, 24 - filteredItems.length) }).map((_, i) => (
             <div key={`empty-${i}`} className="aspect-square border border-stone-900 bg-black opacity-30"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
