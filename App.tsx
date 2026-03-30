
import React, { useState, useEffect } from 'react';
import { PlayerStats, GameLocation, INITIAL_STATS_TEMPLATE, TabView, PathType, Quest, NPC, GameStateUpdate, GameState } from './types';
import { PATHS } from './data/paths';
import { RECIPES } from './data/recipes';
import { Dock } from './components/Dock';
import { StatusView } from './components/views/StatusView';
import { GameView } from './components/views/GameView';
import { JournalView } from './components/views/JournalView';
import { InventoryView } from './components/views/InventoryView';
import { CommsView } from './components/views/CommsView';
import { CreationView } from './components/views/CreationView';
import { ReputationView } from './components/views/ReputationView';
import { RelationshipsView } from './components/views/RelationshipsView';
import { ArchivesView } from './components/views/ArchivesView';
import { FabricationView } from './components/views/FabricationView';
import { MainMenu } from './components/MainMenu';
import { LOCATIONS } from './data/world';
import { getPsychosisLevel, psychoText, getPsychoClass } from './utils/psychosis';

// THEME CONFIGURATION
const THEMES: Record<string, { outer: string, inner: string, accent: string, glow: string, noise: string }> = {
  DEFAULT: { 
    outer: 'bg-neutral-900', 
    inner: 'text-amber-500', 
    accent: 'bg-amber-500', 
    glow: 'shadow-amber-500/50',
    noise: 'opacity-5'
  },
  THE_VOICE: { 
    outer: 'bg-[#1a1500]', 
    inner: 'text-amber-400', 
    accent: 'bg-amber-500', 
    glow: 'shadow-amber-500/40',
    noise: 'opacity-5'
  },
  THE_TRAITOR: { 
    outer: 'bg-slate-900', 
    inner: 'text-cyan-600', 
    accent: 'bg-cyan-600', 
    glow: 'shadow-cyan-600/40',
    noise: 'opacity-10'
  },
  THE_WANDERER: { 
    outer: 'bg-[#261f1a]', 
    inner: 'text-orange-300', 
    accent: 'bg-orange-400', 
    glow: 'shadow-orange-400/30',
    noise: 'opacity-15'
  },
  THE_PSYCHO: { 
    outer: 'bg-black', 
    inner: 'text-red-600', 
    accent: 'bg-red-700', 
    glow: 'shadow-red-600/60',
    noise: 'opacity-20'
  },
  THE_CANNIBAL: { 
    outer: 'bg-[#1a0a0a]', 
    inner: 'text-red-400', 
    accent: 'bg-red-900', 
    glow: 'shadow-red-900/40',
    noise: 'opacity-25'
  },
  THE_SNIPER: { 
    outer: 'bg-[#0a1a0a]', 
    inner: 'text-emerald-500', 
    accent: 'bg-emerald-600', 
    glow: 'shadow-emerald-500/40',
    noise: 'opacity-5'
  },
  THE_SACRIFICE: { 
    outer: 'bg-[#1a051a]', 
    inner: 'text-purple-400', 
    accent: 'bg-purple-600', 
    glow: 'shadow-purple-500/40',
    noise: 'opacity-20'
  },
  TEMPORAL_ANOMALY: { 
    outer: 'bg-[#0a0a1a]', 
    inner: 'text-blue-300', 
    accent: 'bg-blue-500', 
    glow: 'shadow-blue-500/40',
    noise: 'opacity-10'
  },
  THE_STARVED: { 
    outer: 'bg-[#121210]', 
    inner: 'text-stone-300', 
    accent: 'bg-stone-500', 
    glow: 'shadow-stone-500/30',
    noise: 'opacity-25'
  },
  THE_HACKER: { 
    outer: 'bg-black', 
    inner: 'text-green-500', 
    accent: 'bg-green-500', 
    glow: 'shadow-green-500/50',
    noise: 'opacity-5'
  },
  THE_DEMON: { 
    outer: 'bg-[#1a0000]', 
    inner: 'text-red-600', 
    accent: 'bg-red-800', 
    glow: 'shadow-red-600/60',
    noise: 'opacity-30'
  },
  BROKEN_SHELL: { 
    outer: 'bg-[#050505]', 
    inner: 'text-stone-400', 
    accent: 'bg-stone-600', 
    glow: 'shadow-stone-500/10',
    noise: 'opacity-40'
  },
  THE_SURVIVOR: { 
    outer: 'bg-[#0f0a00]', 
    inner: 'text-amber-600', 
    accent: 'bg-amber-700', 
    glow: 'shadow-amber-700/40',
    noise: 'opacity-10'
  },
  THE_MUTANT: { 
    outer: 'bg-[#000a00]', 
    inner: 'text-lime-500', 
    accent: 'bg-lime-600', 
    glow: 'shadow-lime-500/50',
    noise: 'opacity-20'
  }
};

const App: React.FC = () => {
  // State Initialization with Local Storage
  const [gameState, setGameState] = useState<GameState>(() => 
    (localStorage.getItem('whf_gameState') as GameState) || 'BOOT'
  );
  
  const [currentTab, setCurrentTab] = useState<TabView>(() => 
    (localStorage.getItem('whf_currentTab') as TabView) || TabView.GAME
  );

  const [stats, setStats] = useState<PlayerStats>(() => {
    const saved = localStorage.getItem('whf_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS_TEMPLATE;
  });

  const [playerPath, setPlayerPath] = useState<PathType | null>(() => {
    return (localStorage.getItem('whf_playerPath') as PathType) || null;
  });

  const [playerCodename, setPlayerCodename] = useState<string>(() => 
    localStorage.getItem('whf_playerCodename') || ''
  );

  const [currentLocId, setCurrentLocId] = useState<string>(() => 
    localStorage.getItem('whf_currentLocId') || 'start_bunker'
  );

  const [inventory, setInventory] = useState<string[]>(() => {
    const saved = localStorage.getItem('whf_inventory');
    return saved ? JSON.parse(saved) : [];
  });

  const [equippedItems, setEquippedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('whf_equippedItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [reputationUnlocked, setReputationUnlocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('whf_reputationUnlocked');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Dynamic Game Data
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem('whf_quests');
    return saved ? JSON.parse(saved) : [];
  });

  const [relationships, setRelationships] = useState<NPC[]>(() => {
    const saved = localStorage.getItem('whf_relationships');
    return saved ? JSON.parse(saved) : [];
  });

  // State to pass crafting prompt to GameView
  const [pendingCraftingPrompt, setPendingCraftingPrompt] = useState<string | null>(null);

  // PERSISTENCE EFFECTS
  useEffect(() => localStorage.setItem('whf_gameState', gameState), [gameState]);
  useEffect(() => localStorage.setItem('whf_currentTab', currentTab), [currentTab]);
  useEffect(() => localStorage.setItem('whf_stats', JSON.stringify(stats)), [stats]);
  useEffect(() => {
    if (playerPath) localStorage.setItem('whf_playerPath', playerPath);
  }, [playerPath]);
  useEffect(() => localStorage.setItem('whf_playerCodename', playerCodename), [playerCodename]);
  useEffect(() => localStorage.setItem('whf_currentLocId', currentLocId), [currentLocId]);
  useEffect(() => localStorage.setItem('whf_inventory', JSON.stringify(inventory)), [inventory]);
  useEffect(() => localStorage.setItem('whf_equippedItems', JSON.stringify(equippedItems)), [equippedItems]);
  useEffect(() => localStorage.setItem('whf_reputationUnlocked', JSON.stringify(reputationUnlocked)), [reputationUnlocked]);
  useEffect(() => localStorage.setItem('whf_quests', JSON.stringify(quests)), [quests]);
  useEffect(() => localStorage.setItem('whf_relationships', JSON.stringify(relationships)), [relationships]);

  useEffect(() => {
    if (gameState === 'BOOT') {
      const timer = setTimeout(() => setGameState('MENU'), 3000); // Transition to Menu instead of Creation
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // MENU HANDLERS
  const handleNewGame = () => {
    // Reset specific keys, keep basic settings if needed
    localStorage.removeItem('whf_stats');
    localStorage.removeItem('whf_playerPath');
    localStorage.removeItem('whf_playerCodename');
    localStorage.removeItem('whf_inventory');
    localStorage.removeItem('whf_quests');
    localStorage.removeItem('whf_relationships');
    localStorage.removeItem('whf_game_messages'); // Clear chat history
    
    // Reset State
    setStats(INITIAL_STATS_TEMPLATE);
    setPlayerPath(null);
    setPlayerCodename('');
    setInventory([]);
    setQuests([]);
    setRelationships([]);
    setGameState('CREATION');
  };

  const handleLoadGame = () => {
    if (playerPath) {
      setGameState('GAME');
    }
  };

  const handleExitToMenu = () => {
    setGameState('MENU');
  };

  const handleCharacterCreated = (pathId: PathType, codename: string, nationality?: string) => {
    const pathConfig = PATHS[pathId];
    const newStats: PlayerStats = {
      ...INITIAL_STATS_TEMPLATE,
      attributes: { ...pathConfig.baseStats },
      customMeters: []
    };

    if (pathId === 'THE_PSYCHO') {
      newStats.customMeters.push(
        { id: 'bloodlust', label: 'BLOODLUST', value: 0, max: 100, color: 'bg-red-600', decayRate: 1 },
        { id: 'psychosis', label: 'PSYCHOSIS', value: 10, max: 100, color: 'bg-purple-600' }
      );
    }
    if (pathId === 'THE_WANDERER') {
      newStats.customMeters.push(
        { id: 'stress', label: 'STRESS', value: 0, max: 100, color: 'bg-white' }
      );
    }
    if (pathId === 'THE_SACRIFICE') {
      newStats.customMeters.push(
        { id: 'retribution', label: 'RETRIBUTION', value: 0, max: 100, color: 'bg-purple-600' }
      );
    }
    if (pathId === 'THE_STARVED') {
      newStats.customMeters.push(
        { id: 'hunger_limit', label: 'HUNGER CAP', value: 0, max: 200, color: 'bg-stone-500' }
      );
    }
    if (pathId === 'THE_DEMON') {
      newStats.customMeters.push(
        { id: 'sadism', label: 'SADISM', value: 0, max: 100, color: 'bg-red-800' }
      );
    }
    if (pathId === 'THE_MUTANT') {
      newStats.customMeters.push(
        { id: 'dysmorphia', label: 'DYSMORPHIA', value: 20, max: 100, color: 'bg-lime-600' }
      );
      newStats.rads = 0; 
    }

    let items = [...pathConfig.startingItems];
    if (pathId === 'THE_SNIPER' && nationality) {
      if (nationality === 'USA') items.push('M2010 Enhanced');
      if (nationality === 'RUSSIA') items.push('SV-98M');
      if (nationality === 'CHINA') items.push('QBU-10');
      // New Nationalities
      if (nationality === 'GERMANY') items.push('G28');
      if (nationality === 'NORTH_KOREA') items.push('Jeogyeok-Bochong');
      if (nationality === 'UK') items.push('L115A3');
      if (nationality === 'ITALY') items.push('Victrix Scorpio');
      if (nationality === 'FRANCE') items.push('PGM Hecate II');
      if (nationality === 'SPAIN') items.push('AXMC');
      if (nationality === 'SERBIA') items.push('M93 Black Arrow');
      
      items.push('Ballistic Drop Calculator');
    }

    const selectedSubclass = pathConfig.subclasses.find(s => s.name === codename);
    if (selectedSubclass && selectedSubclass.startingItems) {
      items.push(...selectedSubclass.startingItems);
    }

    setStats(newStats);
    setPlayerPath(pathId);
    setPlayerCodename(codename);
    setInventory(items);
    setGameState('GAME');
  };

  const handleGameStateUpdate = (update: GameStateUpdate) => {
    // Inventory
    if (update.inventoryAdd) {
      setInventory(prev => [...prev, ...update.inventoryAdd!]);
    }
    if (update.inventoryRemove) {
      setInventory(prev => prev.filter(item => !update.inventoryRemove!.includes(item)));
      // Also remove from equipped if removed from inventory
      setEquippedItems(prev => prev.filter(item => !update.inventoryRemove!.includes(item)));
    }

    // Quests
    if (update.quests) {
      setQuests(prev => {
        const newQuests = [...prev];
        update.quests!.forEach(q => {
          // Robust ID check
          let index = newQuests.findIndex(existing => existing.id.toString() === q.id.toString());
          
          // Fallback: Check Title (in case AI hallucinates new ID for existing quest)
          if (index === -1) {
            index = newQuests.findIndex(existing => existing.title.toLowerCase() === q.title.toLowerCase());
          }

          if (index >= 0) {
            newQuests[index] = { ...newQuests[index], ...q }; // Merge updates
          } else {
            newQuests.push(q); // Add new
          }
        });
        return newQuests;
      });
    }

    // Relationships
    if (update.relationships) {
      setRelationships(prev => {
        const newRels = [...prev];
        update.relationships!.forEach(r => {
          // Robust ID check
          let index = newRels.findIndex(existing => existing.id.toLowerCase() === r.id.toLowerCase());

          // Fallback: Check Name (in case AI hallucinates new ID for existing NPC)
          if (index === -1) {
            index = newRels.findIndex(existing => existing.name.toLowerCase() === r.name.toLowerCase());
          }

          if (index >= 0) {
            // Merge existing data with new data to preserve state if partial update
            newRels[index] = { ...newRels[index], ...r };
          } else {
            newRels.push(r);
          }
        });
        return newRels;
      });
    }
  };

  const handleEquipToggle = (item: string) => {
    setEquippedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleCraftingAttempt = (selectedItemNames: string[]) => {
    // Check known recipes first
    const matchingRecipe = RECIPES.find(recipe => {
      // Check path requirements
      if (recipe.requiredPath && recipe.requiredPath !== playerPath) return false;
      if (recipe.requiredSubclass && recipe.requiredSubclass !== playerCodename) return false;
      
      // Check ingredients - Sort both for comparison to ignore order
      const recipeSorted = [...recipe.ingredients].sort();
      const selectedSorted = [...selectedItemNames].sort();
      
      return JSON.stringify(recipeSorted) === JSON.stringify(selectedSorted);
    });

    if (matchingRecipe) {
       // Deterministic Crafting Success
       const newInventory = [...inventory];
       // Remove ingredients (remove one instance of each required ingredient)
       matchingRecipe.ingredients.forEach(ing => {
         const idx = newInventory.indexOf(ing);
         if (idx > -1) newInventory.splice(idx, 1);
       });
       // Add result
       newInventory.push(matchingRecipe.result);
       
       setInventory(newInventory);
       
       // Notify AI of success to maintain context
       setPendingCraftingPrompt(`[SYSTEM ACTION]: Player successfully crafted **${matchingRecipe.result}** using ${matchingRecipe.ingredients.join(', ')}. Update the narrative to reflect this new equipment.`);
    } else {
       // Fallback to AI improvisation
       setPendingCraftingPrompt(`[SYSTEM ACTION]: Player attempts to combine the following items: ${selectedItemNames.join(', ')}. Determine the outcome, success or failure, and any durability loss or new item creation.`);
    }
    
    setCurrentTab(TabView.GAME);
  };

  const renderContent = () => {
    const currentLocation = LOCATIONS[currentLocId] || LOCATIONS['start_bunker'];
    const pathConfig = playerPath ? PATHS[playerPath] : null;

    switch (currentTab) {
      case TabView.GAME: 
        return (
          <GameView 
            introScenario={pathConfig?.introScenario} 
            pathName={pathConfig?.name} 
            subclassName={playerCodename}
            onGameStateUpdate={handleGameStateUpdate}
            externalPrompt={pendingCraftingPrompt}
            onPromptConsumed={() => setPendingCraftingPrompt(null)}
          />
        );
      case TabView.STATUS: return <StatusView stats={stats} location={currentLocation} pathId={playerPath!} codename={playerCodename} />;
      case TabView.JOURNAL: return <JournalView quests={quests} />;
      case TabView.GEAR: 
        return (
          <InventoryView 
            items={inventory} 
            pathId={playerPath!} 
            equippedItems={equippedItems}
            onEquipToggle={handleEquipToggle}
          />
        );
      case TabView.COMMS: return <CommsView />;
      case TabView.REPUTATION: return <ReputationView />;
      case TabView.RELATIONS: return <RelationshipsView relationships={relationships} />;
      case TabView.ARCHIVES: return <ArchivesView />;
      case TabView.FABRICATION: 
        return (
          <FabricationView 
            inventory={inventory} 
            onCraft={handleCraftingAttempt} 
            pathId={playerPath!}
            subclass={playerCodename}
          />
        );
      default: return (
        <GameView 
          introScenario={pathConfig?.introScenario} 
          pathName={pathConfig?.name} 
          subclassName={playerCodename}
          onGameStateUpdate={handleGameStateUpdate}
        />
      );
    }
  };

  const BootSequence = () => (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black p-8 font-mono relative overflow-hidden z-[100]">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)] opacity-50 pointer-events-none"></div>
      <div className="font-display text-4xl md:text-6xl animate-pulse tracking-[0.2em] text-red-600 mb-8 glow-text text-center">FATAL_ERROR</div>
      <div className="w-64 md:w-96 h-2 bg-neutral-800 rounded-none overflow-hidden mb-2 border border-neutral-700">
         <div className="h-full bg-red-600 animate-[width_2.5s_ease-in-out_forwards]" style={{width: '0%'}}></div>
      </div>
      <div className="font-mono text-xs md:text-sm text-red-400 space-y-1 text-left w-64 md:w-96 opacity-80">
         <p>> KERNEL PANIC: RADIATION SPIKE</p>
         <p>> ATTEMPTING HARD REBOOT...</p>
         <p className="animate-pulse text-white">> LOADING SAFE_MODE_V2.0...</p>
      </div>
    </div>
  );

  const activeTheme = playerPath ? THEMES[playerPath] : THEMES.DEFAULT;
  const psychosisLevel = playerPath === 'THE_PSYCHO' ? getPsychosisLevel(stats.customMeters) : 0;
  const psychoClass = getPsychoClass(psychosisLevel);

  return (
    <div className={`fixed inset-0 w-full h-full bg-[#030303] font-mono select-none overflow-hidden ${activeTheme.inner}`}>
      
      {/* Device Shell - Truly Full Screen, No Borders */}
      <div className={`
          relative w-full h-full flex flex-col overflow-hidden 
          ${activeTheme.outer} 
      `}>
        
        {/* Hardware Damage / Dirt Overlays (Pointer events none) */}
        <div className="absolute inset-0 pointer-events-none z-[60] bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] z-[60] pointer-events-none"></div>

        {/* Top Bezel / Status Bar - Minimalistic */}
        <div className="flex-none h-10 bg-black/80 border-b border-white/10 flex items-center justify-between px-4 relative z-50 backdrop-blur-md">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <div className={`text-[10px] tracking-widest text-neutral-500 font-bold uppercase ${psychoClass}`}>
                {psychoText(`LIVE FEED // ${new Date().toLocaleTimeString()}`, psychosisLevel)}
              </div>
           </div>
           
           <div className="flex gap-1">
             <div className="w-8 h-1 bg-neutral-800 rounded-sm"></div>
             <div className="w-2 h-1 bg-neutral-800 rounded-sm"></div>
           </div>
        </div>

        {/* Screen Area */}
        <div className="flex-1 relative overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
           <div className="scanline"></div>
           <div className="scanline-bar"></div>
           <div className="crt-vignette"></div>
           
           {/* Inner Content Container */}
           <div className="absolute inset-0 z-10 flex flex-col">
              {gameState === 'BOOT' ? <BootSequence /> : 
               gameState === 'MENU' ? <MainMenu onNewGame={handleNewGame} onLoadGame={handleLoadGame} hasSaveData={!!playerPath} /> : (
                <>
                  {/* Digital Header */}
                  <header className={`flex-none flex items-center justify-between border-b border-white/10 bg-black/40 p-2 md:p-4 backdrop-blur-sm z-20`}>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className={`text-2xl md:text-4xl font-display tracking-widest ${activeTheme.glow} ${psychoClass} text-white`}>
                          {psychoText("WHF-2052", psychosisLevel)}
                        </div>
                        <div className="h-6 md:h-8 w-[1px] bg-white/20"></div>
                        <div className="flex flex-col">
                           <span className={`text-[8px] md:text-[10px] opacity-70 tracking-widest ${psychoClass}`}>
                             {psychoText("SIGNAL", psychosisLevel)}
                           </span>
                           <div className="flex gap-0.5">
                              <div className={`w-0.5 md:w-1 h-1.5 md:h-2 ${activeTheme.accent}`}></div>
                              <div className={`w-0.5 md:w-1 h-1.5 md:h-2 ${activeTheme.accent}`}></div>
                              <div className={`w-0.5 md:w-1 h-1.5 md:h-2 ${activeTheme.accent}`}></div>
                              <div className="w-0.5 md:w-1 h-1.5 md:h-2 bg-neutral-800"></div>
                           </div>
                        </div>
                    </div>
                    
                    <div className="text-right flex items-center gap-4">
                        <div className="hidden md:block">
                            <div className={`text-[8px] md:text-[10px] opacity-50 uppercase mb-0.5 ${psychoClass}`}>
                              {psychoText("OPERATOR", psychosisLevel)}
                            </div>
                            <div className={`text-xs md:text-sm font-bold border border-white/20 px-2 md:px-3 py-1 bg-black/60 rounded-sm ${activeTheme.inner}`}>
                              {playerCodename ? playerCodename : (playerPath ? PATHS[playerPath].name.toUpperCase() : 'UNKNOWN')}
                            </div>
                        </div>

                        {/* EXIT TO MENU BUTTON */}
                        <button 
                          onClick={handleExitToMenu}
                          className="w-10 h-10 border border-red-900/50 bg-red-950/20 flex items-center justify-center hover:bg-red-900 hover:text-white transition-all group"
                          title="EXIT TO MENU"
                        >
                           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-red-600 group-hover:text-white transition-colors">
                             <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                             <line x1="12" y1="2" x2="12" y2="12" />
                           </svg>
                        </button>
                    </div>
                  </header>

                  {/* MAIN CONTENT AREA - Strictly positioned above Dock */}
                  <main className="flex-1 relative bg-[radial-gradient(circle_at_center,rgba(15,15,15,1)_0%,rgba(0,0,0,1)_100%)] w-full">
                    {gameState === 'CREATION' ? (
                        <div className="absolute inset-0 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-black">
                           <CreationView onComplete={handleCharacterCreated} />
                        </div>
                    ) : (
                        // Positioned absolute to fill space between header and dock (roughly 5.5rem / 88px for dock area)
                        <div className="absolute top-0 left-0 right-0 bottom-[6rem] md:bottom-[7rem] overflow-hidden p-2 md:p-4">
                            {renderContent()}
                        </div>
                    )}
                  </main>

                  {/* Dock Overlay - Always visible on bottom */}
                  {gameState === 'GAME' && (
                    <Dock 
                      currentTab={currentTab} 
                      onTabChange={setCurrentTab} 
                      reputationUnlocked={reputationUnlocked}
                    />
                  )}
                </>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default App;
