
export const getPsychosisLevel = (meters: any[]): number => {
  const psychosis = meters.find((m: any) => m.id === 'psychosis');
  return psychosis ? psychosis.value : 0;
};

// Simplified glitch chars that won't cause token errors
const GLITCH_CHARS = ['#', '$', '%', '&', '@', '!', '?', '<', '>', '{', '}', '*', '+', '=', '~'];

const PSYCHO_PHRASES = [
  "MEAT", "FLAY", "IT SEES", "ROT", "FEAST", "SILENCE", "TEETH", "MOTHER?", 
  "BONES", "CUT", "RED", "THEY KNOW", "DONT LOOK", "HUNGRY"
];

export const psychoText = (text: string, level: number): string => {
  if (level < 20) return text;

  // Level 1 (20-49): Mild glitches
  if (level < 50) {
    return text.split('').map(char => {
      if (Math.random() < 0.05) return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      if (Math.random() < 0.02) return char.toUpperCase() === char ? char.toLowerCase() : char.toUpperCase();
      return char;
    }).join('');
  }

  // Level 2 (50-79): Heavy glitches
  if (level < 80) {
    const words = text.split(' ');
    return words.map(word => {
      if (Math.random() < 0.2) return PSYCHO_PHRASES[Math.floor(Math.random() * PSYCHO_PHRASES.length)];
      return word.split('').map(char => {
        if (Math.random() < 0.15) return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        return char;
      }).join('');
    }).join(' ');
  }

  // Level 3 (80+): Complete breakdown
  const gibberish = Array.from({ length: text.length }).map(() => {
    if (Math.random() < 0.4) return PSYCHO_PHRASES[Math.floor(Math.random() * PSYCHO_PHRASES.length)];
    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
  }).join('');
  
  return gibberish.substring(0, Math.floor(text.length * 1.5));
};

export const getPsychoClass = (level: number): string => {
  if (level < 20) return '';
  if (level < 50) return 'animate-pulse text-red-300';
  if (level < 80) return 'animate-glitch text-red-500 font-bold';
  return 'animate-glitch text-red-600 blur-[1px] font-black';
};
