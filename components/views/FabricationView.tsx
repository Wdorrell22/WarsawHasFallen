
import React, { useState, useEffect } from 'react';
import { getItem } from '../../data/items';
import { RECIPES, Recipe } from '../../data/recipes';
import { PathType } from '../../types';

interface Props {
  inventory: string[];
  onCraft: (items: string[]) => void;
  pathId: PathType;
  subclass: string;
}

export const FabricationView: React.FC<Props> = ({ inventory, onCraft, pathId, subclass }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Filter recipes based on player path/subclass
    const relevant = RECIPES.filter(r => {
      const pathMatch = !r.requiredPath || r.requiredPath === pathId;
      const subMatch = !r.requiredSubclass || r.requiredSubclass === subclass;
      return pathMatch && subMatch;
    });
    setAvailableRecipes(relevant);
  }, [pathId, subclass]);

  // Aggregate inventory for display
  const uniqueItems = Array.from(new Set(inventory)).map((name) => {
    const itemName = name as string;
    return {
      name: itemName,
      count: inventory.filter(i => i === itemName).length,
      data: getItem(itemName)
    };
  });

  const addItemToBench = (name: string, maxCount: number) => {
    const currentCount = selectedItems.filter(i => i === name).length;
    if (currentCount < maxCount && selectedItems.length < 4) {
       setSelectedItems(prev => [...prev, name]);
    }
  };

  const removeItemFromBench = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  // Check if a specific recipe can be crafted with current selection
  const canCraftRecipe = (recipe: Recipe) => {
     const sortedRecipe = [...recipe.ingredients].sort();
     const sortedSelection = [...selectedItems].sort();
     return JSON.stringify(sortedRecipe) === JSON.stringify(sortedSelection);
  };

  return (
    <div className="h-full flex flex-col p-1 overflow-hidden relative">
      <div className="flex-none mb-4 px-2 border-b border-term-amber/30 pb-2">
         <h2 className="text-xl font-display text-white">FABRICATION_BENCH</h2>
         <p className="text-[10px] text-stone-500 font-mono">
           COMBINE ITEMS TO CRAFT. USE SCHEMATICS FOR GUARANTEED RESULTS.
         </p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden px-2 min-h-0">
         
         {/* Left: Inventory List */}
         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black border border-stone-800 bg-black/50 p-2 min-h-0">
            <div className="text-xs text-stone-500 mb-2 uppercase tracking-wider sticky top-0 bg-black z-10 pb-1 border-b border-stone-800">
              Resources
            </div>
            <div className="grid grid-cols-1 gap-2">
               {uniqueItems.map((item, idx) => {
                 const onBench = selectedItems.filter(i => i === item.name).length;
                 return (
                   <button 
                     key={idx}
                     onClick={() => addItemToBench(item.name, item.count)}
                     disabled={onBench >= item.count}
                     className={`
                       flex justify-between items-center p-2 border transition-all text-left
                       ${onBench > 0
                         ? 'border-term-amber bg-term-amber/10 text-white' 
                         : 'border-stone-800 text-stone-400 hover:border-stone-600'}
                       ${onBench >= item.count ? 'opacity-50 cursor-not-allowed' : ''}
                     `}
                   >
                      <span className="font-mono text-xs truncate pr-2">{item.name}</span>
                      <span className="text-[10px] bg-stone-900 px-1 text-stone-500">
                        {onBench}/{item.count}
                      </span>
                   </button>
                 );
               })}
            </div>
         </div>

         {/* Middle: Recipes (New) */}
         <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-black border border-stone-800 bg-black/50 p-2 min-h-0 hidden md:block">
            <div className="text-xs text-term-amber mb-2 uppercase tracking-wider sticky top-0 bg-black z-10 pb-1 border-b border-stone-800">
              Known Schematics
            </div>
            <div className="space-y-2">
               {availableRecipes.map(recipe => {
                 // Check if user has ingredients in inventory (not bench)
                 const hasIngredients = recipe.ingredients.every(ing => {
                    const reqCount = recipe.ingredients.filter(i => i === ing).length;
                    const invCount = inventory.filter(i => i === ing).length;
                    return invCount >= reqCount;
                 });

                 return (
                   <div key={recipe.id} className={`p-2 border ${hasIngredients ? 'border-stone-600 bg-stone-900/50' : 'border-stone-900 opacity-50'}`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-white">{recipe.result}</span>
                        {hasIngredients && <span className="text-[9px] text-green-500">READY</span>}
                      </div>
                      <div className="text-[10px] text-stone-500 mb-2">{recipe.description}</div>
                      <div className="flex flex-wrap gap-1">
                         {recipe.ingredients.map((ing, i) => (
                           <span key={i} className="text-[9px] px-1 bg-black border border-stone-700 text-stone-400">
                             {ing}
                           </span>
                         ))}
                      </div>
                   </div>
                 );
               })}
               {availableRecipes.length === 0 && (
                 <div className="text-[10px] text-stone-600 italic p-2">No known schematics for current Neural Path.</div>
               )}
            </div>
         </div>

         {/* Right: Workbench */}
         <div className="flex-1 flex flex-col border border-stone-800 bg-stone-900/20 p-4 relative min-h-0">
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
               <div className="w-32 h-32 border-2 border-dashed border-term-amber rounded-full animate-[spin_10s_linear_infinite]"></div>
            </div>

            <div className="text-xs text-center text-term-amber mb-4 font-bold">WORKBENCH_SLOTS</div>
            
            <div className="flex-1 flex flex-col gap-2 justify-center items-center overflow-y-auto">
               {[0, 1, 2, 3].map(i => (
                 <button 
                   key={i} 
                   onClick={() => selectedItems[i] && removeItemFromBench(i)}
                   className={`
                     w-full max-w-[200px] h-10 border border-dashed flex items-center justify-center transition-all
                     ${selectedItems[i] ? 'border-term-amber bg-black text-white hover:bg-term-red/20 hover:border-term-red' : 'border-stone-700 bg-black/40'}
                   `}
                 >
                    {selectedItems[i] ? (
                      <span className="font-mono text-xs">{selectedItems[i]}</span>
                    ) : (
                      <span className="text-stone-700 text-[10px]">EMPTY</span>
                    )}
                 </button>
               ))}
            </div>

            <div className="mt-auto pt-4">
               <button
                 disabled={selectedItems.length < 2}
                 onClick={() => {
                   onCraft(selectedItems);
                   setSelectedItems([]);
                 }}
                 className={`
                   w-full py-4 font-display text-xl tracking-widest transition-all clip-corner
                   ${selectedItems.length >= 2 
                     ? 'bg-term-amber text-black hover:bg-white shadow-[0_0_15px_rgba(255,176,0,0.3)]' 
                     : 'bg-stone-800 text-stone-600 cursor-not-allowed'}
                 `}
               >
                 {selectedItems.length < 2 ? 'SELECT_COMPONENTS' : 'INITIATE_COMBINATION'}
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
