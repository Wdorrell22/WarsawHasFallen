

export enum TabView {
  GAME = 'GAME',
  STATUS = 'STATUS',
  JOURNAL = 'JOURNAL',
  GEAR = 'GEAR',
  COMMS = 'COMMS',
  REPUTATION = 'REPUTATION',
  RELATIONS = 'RELATIONS',
  ARCHIVES = 'ARCHIVES',
  FABRICATION = 'FABRICATION',
}

export type PathType = 
  | 'THE_VOICE' 
  | 'THE_TRAITOR' 
  | 'THE_WANDERER' 
  | 'THE_PSYCHO' 
  | 'THE_CANNIBAL' 
  | 'THE_SNIPER'
  | 'THE_SACRIFICE'
  | 'TEMPORAL_ANOMALY'
  | 'THE_STARVED'
  | 'THE_HACKER'
  | 'THE_DEMON'
  | 'BROKEN_SHELL'
  | 'THE_SURVIVOR'
  | 'THE_MUTANT';

export interface Trait {
  id: string;
  name: string;
  description: string;
  effect: string; // Description of gameplay effect
}

export interface Subclass {
  id: string; // e.g., 'bloodgut'
  name: string; // e.g., 'Bloodgut'
  description: string; // Flavor text
  mechanic: string; // The actual effect description
  trait: Trait; // The trait granted by this subclass
  startingItems?: string[]; // Unique items for this subclass
}

export interface Meter {
  id: string;
  label: string;
  value: number;
  max: number;
  color: string;
  decayRate?: number; // Per tick
}

export interface PlayerStats {
  hp: number;
  maxHp: number;
  rads: number;
  hunger: number;
  level: number;
  exp: number;
  nextLevelExp: number;
  // Stats are now dynamic keys based on Path
  attributes: Record<string, number>;
  // Meters specific to the class (e.g. Psychosis, Stress, Bloodlust)
  customMeters: Meter[];
}

export interface PathConfig {
  id: PathType;
  name: string;
  description: string;
  // Attributes now support variable length for Acronyms (e.g. W.H.I.S.P.E.R)
  attributeLabels: string[]; 
  baseStats: Record<string, number>;
  startingTraits: Trait[];
  startingItems: string[]; // IDs of items
  subclasses: Subclass[]; // Replaces simple codenames list
  carryCapacity: number; // Base capacity in KG
  introScenario: string; // The starting prompt context
}

export interface GameLocation {
  id: string;
  name: string;
  description: string;
  dangerLevel: number; // 1-5
  coordinates: { x: number; y: number };
  isUnlocked: boolean;
}

export interface Item {
  id: string;
  name: string;
  type: 'WEAPON' | 'ARMOR' | 'CONSUMABLE' | 'JUNK' | 'GADGET';
  rarity: 'COMMON' | 'MIL-SPEC' | 'RARE' | 'PROTOTYPE' | 'LEGENDARY';
  description: string;
  weight: number; // in KG
}

export const INITIAL_STATS_TEMPLATE: PlayerStats = {
  hp: 100,
  maxHp: 100,
  rads: 0,
  hunger: 0,
  level: 1,
  exp: 0,
  nextLevelExp: 1000,
  attributes: {},
  customMeters: []
};

// Social Interfaces
export interface Faction {
  id: string;
  name: string;
  description: string;
  reputation: number; // -1000 to 1000
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  desc: string; // Description/impression
  hearts: number; // 0 to 10
  maxHearts: number;
  mood: string;
}

export interface QuestObjective {
  text: string;
  done: boolean;
}

export interface Quest {
  id: number | string;
  title: string;
  status: 'ACTIVE' | 'COMPLETED' | 'FAILED';
  desc: string;
  objectives: QuestObjective[];
  rewards?: string;
}

export interface GameStateUpdate {
  inventoryAdd?: string[];
  inventoryRemove?: string[];
  quests?: Quest[];
  relationships?: NPC[];
}

export type GameState = 'BOOT' | 'MENU' | 'CREATION' | 'GAME';
