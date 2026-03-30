
import { PathType } from '../types';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[]; // Item names
  result: string; // Item name
  description: string;
  requiredPath?: PathType;
  requiredSubclass?: string; // codename
}

export const RECIPES: Recipe[] = [
  // GLOBAL
  {
    id: 'makeshift_bandage',
    name: 'Makeshift Bandage',
    ingredients: ['Clean Rags', 'Antiseptic Wipes'],
    result: 'Makeshift Bandage',
    description: 'Basic medical supply.'
  },
  // THE SURVIVOR
  {
    id: 'survivor_spear',
    name: 'Sharpened Spear',
    ingredients: ['Walking Stick', 'Shiv'], 
    result: 'Sharpened Spear',
    description: 'A primitive but effective weapon.',
    requiredPath: 'THE_SURVIVOR'
  },
  {
    id: 'survivor_trap',
    name: 'Small Game Trap',
    ingredients: ['Paracord', 'Empty Can'], 
    result: 'Small Game Trap',
    description: 'For catching rats or squirrels.',
    requiredPath: 'THE_SURVIVOR'
  },
  // BUSHCRAFTER (Survivor Subclass)
  {
    id: 'bush_bow',
    name: 'Simple Bow',
    ingredients: ['Walking Stick', 'Paracord'],
    result: 'Simple Bow',
    description: 'Silent hunting tool.',
    requiredPath: 'THE_SURVIVOR',
    requiredSubclass: 'The Bushcrafter'
  },
  {
    id: 'herbal_poultice',
    name: 'Herbal Poultice',
    ingredients: ['Dried Herbs', 'Clean Rags'],
    result: 'Herbal Poultice',
    description: 'Slow healing, prevents infection.',
    requiredPath: 'THE_SURVIVOR',
    requiredSubclass: 'The Bushcrafter'
  },
   // THE HACKER
  {
    id: 'emp_device',
    name: 'Improvised EMP',
    ingredients: ['Copper Wire', 'Energy Drink'], 
    result: 'Weak EMP',
    description: 'Short range electronics disruptor.',
    requiredPath: 'THE_HACKER'
  },
  {
    id: 'signal_booster_hacker',
    name: 'Signal Booster',
    ingredients: ['Radio Headset', 'Copper Wire'],
    result: 'Signal Booster',
    description: 'Enhances wireless range.',
    requiredPath: 'THE_HACKER'
  },
  // NETRUNNER (Hacker Subclass)
  {
    id: 'virus_stick',
    name: 'Virus Stick',
    ingredients: ['USB Drive', 'Enemy Codes'],
    result: 'Virus Stick',
    description: 'Infected drive for sabotage.',
    requiredPath: 'THE_HACKER',
    requiredSubclass: 'The Netrunner'
  },
  // THE PSYCHO
  {
    id: 'shiv_poison',
    name: 'Poisoned Shiv',
    ingredients: ['Shiv', 'Blood Vial'], 
    result: 'Poisoned Shiv',
    description: 'Infected blade.',
    requiredPath: 'THE_PSYCHO'
  },
  // THE SNIPER
  {
    id: 'decoy',
    name: 'Sniper Decoy',
    ingredients: ['Tattered Robes', 'Walking Stick'], 
    result: 'Decoy Dummy',
    description: 'Draws fire.',
    requiredPath: 'THE_SNIPER'
  },
];
