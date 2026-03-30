import { GameLocation } from '../types';

export const LOCATIONS: Record<string, GameLocation> = {
  'start_bunker': {
    id: 'start_bunker',
    name: 'Bunker 44',
    description: 'Sealed in 2030 when the sirens first screamed. The air scrubbers have been running for 22 years, filtering out the dust of the old world superpowers.',
    dangerLevel: 1,
    coordinates: { x: 5, y: 8 },
    isUnlocked: true,
  },
  'surface_ruins': {
    id: 'surface_ruins',
    name: 'Ruins of Mokotów',
    description: 'A graveyard of concrete. The skyline is broken, shaped by the shockwaves of the tactical warheads that hit the capital.',
    dangerLevel: 2,
    coordinates: { x: 5, y: 5 },
    isUnlocked: true,
  },
  'vistula_bank': {
    id: 'vistula_bank',
    name: 'The Dead Vistula',
    description: 'The river runs thick with oil and ash. They say it glowed blue for five years after the bombs fell in the east.',
    dangerLevel: 4,
    coordinates: { x: 8, y: 4 },
    isUnlocked: true,
  },
  'palace_culture': {
    id: 'palace_culture',
    name: 'Stalin\'s Tombstone',
    description: 'The Palace of Culture. Miraculously standing, a jagged needle in a burnt haystack. It radiates heat, even in winter.',
    dangerLevel: 5,
    coordinates: { x: 5, y: 2 },
    isUnlocked: false,
  },
  'metro_station': {
    id: 'metro_station',
    name: 'Metro Centrum',
    description: 'Where thousands fled in \'30. Now, only echoes and things that have adapted to the dark remain.',
    dangerLevel: 3,
    coordinates: { x: 2, y: 5 },
    isUnlocked: true,
  }
};