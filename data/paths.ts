
import { PathConfig, PathType } from '../types';

export const PATHS: Record<PathType, PathConfig> = {
  'THE_VOICE': {
    id: 'THE_VOICE',
    name: 'The Voice',
    description: 'A manipulator who survived the fallout through diplomacy and deceit. Words are your weapon; violence is a failure of policy.',
    attributeLabels: ['WIT', 'HAGGLE', 'INTUITION', 'SPEECH', 'PRESENCE', 'EMPATHY', 'REPUTATION'],
    baseStats: { 
      'WIT': 10, 'HAGGLE': 11, 'INTUITION': 9, 'SPEECH': 12, 'PRESENCE': 9, 'EMPATHY': 9, 'REPUTATION': 8 
    },
    startingTraits: [{
      id: 'silver_tongue',
      name: 'Silver Tongue',
      description: 'Base persuasion is increased.',
      effect: 'Passive'
    }],
    startingItems: ['Voice Recorder', 'Breath Mints'],
    carryCapacity: 35,
    introScenario: "You are sitting in a dimly lit bar in the ruins of Sector 4. The air smells of stale alcohol and ozone. A contact was supposed to meet you here ten minutes ago to discuss the location of a pre-war cache.",
    subclasses: [
      {
        id: 'siren',
        name: 'The Siren',
        description: 'You learned early that desire is the strongest leash.',
        mechanic: 'Seduction checks against attracted NPCs are 50% easier. Unlocks "Allure" dialogue options.',
        trait: {
          id: 'siren_call',
          name: 'Siren\'s Call',
          description: 'Seduction checks against attracted NPCs are 50% easier.',
          effect: 'Social Bonus'
        },
        startingItems: ['Pheromone Perfume', 'Silk Handkerchief']
      },
      {
        id: 'herald',
        name: 'The Herald',
        description: 'You speak with the authority of the old world.',
        mechanic: 'Faction Reputation gains are doubled. Intimidation checks rely on Presence instead of Strength.',
        trait: {
          id: 'old_authority',
          name: 'Old Authority',
          description: 'Reputation gains doubled. Intimidate with Presence.',
          effect: 'Passive Modifier'
        },
        startingItems: ['Faction Megaphone', 'Signet Ring']
      },
      {
        id: 'whisper',
        name: 'The Whisper',
        description: 'Information is currency, and you are rich.',
        mechanic: 'Can detect NPC lies automatically. Unlocks "Blackmail" dialogue options.',
        trait: {
          id: 'truth_seeker',
          name: 'Truth Seeker',
          description: 'Automatically detect lies in conversation.',
          effect: 'Perception Bonus'
        },
        startingItems: ['Listening Bug', 'Blackmail Dossier']
      },
      {
        id: 'broker',
        name: 'The Broker',
        description: 'Every man has a price. You just need to find it.',
        mechanic: 'Trade prices are 30% better. Can bribe enemies to flee combat.',
        trait: {
          id: 'insider_trading',
          name: 'Insider Trading',
          description: 'Trade prices 30% better. Bribe option enabled.',
          effect: 'Economy Buff'
        },
        startingItems: ['Gold Watch', 'Ledger Book']
      },
      {
        id: 'demagogue',
        name: 'The Demagogue',
        description: 'A mob is a weapon that you know how to aim.',
        mechanic: 'Can recruit up to 3 generic followers. Inspiration buffs follower damage.',
        trait: {
          id: 'mob_rule',
          name: 'Mob Rule',
          description: 'Recruit 3 followers. Buff follower damage.',
          effect: 'Minion Buff'
        },
        startingItems: ['Portable Speaker', 'Riot Pamphlets']
      }
    ]
  },
  'THE_TRAITOR': {
    id: 'THE_TRAITOR',
    name: 'The Traitor',
    description: 'You left them to die. Or maybe they left you. You carry the gear of a dead faction and the weight of your choices.',
    attributeLabels: ['OBSERVATION', 'UTILITY', 'TACTICS', 'COMBAT', 'AGILITY', 'STEALTH', 'TOUGHNESS'],
    baseStats: { 
      'OBSERVATION': 9, 'UTILITY': 9, 'TACTICS': 9, 'COMBAT': 10, 'AGILITY': 9, 'STEALTH': 9, 'TOUGHNESS': 11 
    },
    startingTraits: [{
      id: 'marked_man',
      name: 'Marked Man',
      description: 'Random chance of ambush by your former faction.',
      effect: 'Negative Event'
    }],
    startingItems: ['Scratched Dog Tag', 'Service Pistol'],
    carryCapacity: 55,
    introScenario: "You wake up in a temporary camp, the embers of a dying fire casting long shadows. You are alone, but the markings on your armor—scratched out but still visible to you—remind you of who is hunting you. The wind carries the sound of engines in the distance.",
    subclasses: [
      {
        id: 'turncoat',
        name: 'The Turncoat',
        description: 'You know their tactics because you wrote them.',
        mechanic: '+25% Damage vs Humans. Can bypass faction security checkpoints.',
        trait: {
          id: 'betrayer',
          name: 'Betrayer\'s Insight',
          description: '+25% Damage vs Humans. Bypass checkpoints.',
          effect: 'Combat Buff'
        },
        startingItems: ['Enemy Codes', 'Combat Knife']
      },
      {
        id: 'ghost',
        name: 'The Ghost',
        description: 'They think you are dead. Keep it that way.',
        mechanic: 'Footsteps are silent. Stealth detection meter fills 50% slower.',
        trait: {
          id: 'phantom_step',
          name: 'Phantom Step',
          description: 'Silent footsteps. Stealth detection halved.',
          effect: 'Stealth Buff'
        },
        startingItems: ['Silencer', 'Camo Paint']
      },
      {
        id: 'survivor',
        name: 'The Survivor',
        description: 'Cowardice is just a word for staying alive.',
        mechanic: 'Running away from combat heals 15% HP. Movement speed increases when HP < 30%.',
        trait: {
          id: 'adrenaline_flight',
          name: 'Adrenaline Flight',
          description: 'Heal 15% HP on flee. Speed up at low HP.',
          effect: 'Survival Mechanism'
        },
        startingItems: ['Emergency Rations', 'Running Shoes']
      },
      {
        id: 'ronin',
        name: 'The Ronin',
        description: 'No master, no flag. Only the mission.',
        mechanic: 'Accuracy and Critical Chance increase when fighting alone (no companions).',
        trait: {
          id: 'lone_wolf',
          name: 'Lone Wolf',
          description: 'Crit & Accuracy up when alone.',
          effect: 'Solo Buff'
        },
        startingItems: ['Katana', 'Whetstone']
      },
      {
        id: 'double',
        name: 'The Double',
        description: 'You play both sides, always coming out on top.',
        mechanic: 'Can wear faction armor to disguise as that faction. Discovery risk increases over time.',
        trait: {
          id: 'false_flag',
          name: 'False Flag',
          description: 'Faction armor acts as disguise.',
          effect: 'Social Stealth'
        },
        startingItems: ['Disguise Kit', 'Fake ID']
      }
    ]
  },
  'THE_WANDERER': {
    id: 'THE_WANDERER',
    name: 'The Wanderer',
    description: 'A jack of all trades who cannot sit still. The ruins call to you, and silence is deafening.',
    attributeLabels: ['SCAVENGING', 'TREKKING', 'AWARENESS', 'LUCK', 'KNOWLEDGE', 'ENDURANCE', 'REFLEXES'],
    baseStats: { 
      'SCAVENGING': 11, 'TREKKING': 10, 'AWARENESS': 9, 'LUCK': 9, 'KNOWLEDGE': 9, 'ENDURANCE': 10, 'REFLEXES': 9 
    },
    startingTraits: [{
      id: 'restless',
      name: 'Restless Spirit',
      description: 'Gains STRESS if stationary.',
      effect: 'Meter Mechanic'
    }],
    startingItems: ['Worn Boots', 'Compass'],
    carryCapacity: 70,
    introScenario: "You are walking down what remains of the A2 highway. Cracked asphalt stretches to the horizon, reclaimed by gray vegetation. The wind howls, carrying the scent of rain and rust. You haven't seen another soul for days.",
    subclasses: [
      {
        id: 'walker',
        name: 'The Walker',
        description: 'One foot in front of the other. Forever.',
        mechanic: 'Walk speed 2x faster. Passive food/water drain reduced by 50%. Running costs 2x Stamina.',
        trait: {
          id: 'marathoner',
          name: 'Marathoner',
          description: '2x Walk speed. 50% less hunger/thirst. Running costs more.',
          effect: 'Movement Modifier'
        },
        startingItems: ['Walking Stick', 'Hydration Pack']
      },
      {
        id: 'scavenger',
        name: 'The Scavenger',
        description: 'One man\'s trash is your survival.',
        mechanic: 'Find 30% more loot in containers. Highlight valuable items in the world.',
        trait: {
          id: 'hawk_eye',
          name: 'Hawk Eye',
          description: '+30% Loot quantity. Highlighting enabled.',
          effect: 'Loot Buff'
        },
        startingItems: ['Crowbar', 'Large Sack']
      },
      {
        id: 'nomad',
        name: 'The Nomad',
        description: 'Home is where you lay your head.',
        mechanic: 'Sleeping outdoors grants "Well Rested" bonus. Immune to weather effects.',
        trait: {
          id: 'rough_sleeper',
          name: 'Rough Sleeper',
          description: 'Outdoor sleep buff. Weather immunity.',
          effect: 'Survival Buff'
        },
        startingItems: ['Bedroll', 'Weather Radio']
      },
      {
        id: 'cartographer',
        name: 'The Mapper',
        description: 'You have seen it all.',
        mechanic: 'Map sectors are revealed automatically upon entry. Fast Travel costs 0 resources.',
        trait: {
          id: 'eidetic',
          name: 'Eidetic Memory',
          description: 'Auto-reveal map. Free Fast Travel.',
          effect: 'Navigation Buff'
        },
        startingItems: ['Local Map', 'Binoculars']
      },
      {
        id: 'mule',
        name: 'The Mule',
        description: 'You carry the weight of the world.',
        mechanic: 'Carry Capacity +40KG. Movement speed penalty for being encumbered is halved.',
        trait: {
          id: 'beast_burden',
          name: 'Beast of Burden',
          description: '+40KG Capacity. Reduced encumbrance penalty.',
          effect: 'Stat Buff'
        },
        startingItems: ['Exoskeleton Frame (Broken)', 'Duffle Bag']
      }
    ]
  },
  'THE_PSYCHO': {
    id: 'THE_PSYCHO',
    name: 'The Psycho',
    description: 'The radiation touched your mind. You crave violence.',
    attributeLabels: ['VIOLENCE', 'INSTINCT', 'STRENGTH', 'CRUELTY', 'ENDURANCE', 'RAGE', 'ADRENALINE'],
    baseStats: { 
      'VIOLENCE': 12, 'INSTINCT': 10, 'STRENGTH': 11, 'CRUELTY': 9, 'ENDURANCE': 10, 'RAGE': 11, 'ADRENALINE': 9 
    },
    startingTraits: [{
      id: 'hemophagous',
      name: 'Hemophagous',
      description: 'Must consume blood.',
      effect: 'Action Unlock'
    }],
    startingItems: ['Hockey Mask', 'Adrenaline Shot'],
    carryCapacity: 60,
    introScenario: "You stand in a dilapidated barn. Three bodies lie at your feet—raiders who thought you were easy prey. The adrenaline is fading, leaving you with the metallic taste of blood and a sharp grin. A noise comes from the hayloft above.",
    subclasses: [
      {
        id: 'bloodgut',
        name: 'The Bloodgut',
        description: 'Your stomach is a furnace. Your mind is a ticking clock.',
        mechanic: 'Can eat ANY material. Must consume blood or gain Psychosis.',
        trait: {
          id: 'iron_stomach',
          name: 'Iron Stomach',
          description: 'Can eat rot/toxin. Blood consumption mandated.',
          effect: 'Survival Mechanic'
        },
        startingItems: ['Human Tooth Necklace', 'Blood Vial']
      },
      {
        id: 'ripper',
        name: 'The Ripper',
        description: 'Make them bleed. It makes the voices quiet.',
        mechanic: 'Melee attacks cause heavy Bleeding. You deal +50% damage to bleeding targets.',
        trait: {
          id: 'serrated_edge',
          name: 'Serrated Edge',
          description: 'Melee causes Bleed. +50% DMG vs Bleeding.',
          effect: 'Combat Buff'
        },
        startingItems: ['Chainsaw Chain', 'Rusty Hook']
      },
      {
        id: 'manic',
        name: 'The Manic',
        description: 'Pain is just fuel for the fire.',
        mechanic: 'Attack Speed increases as your HP decreases. At 10% HP, you deal double damage.',
        trait: {
          id: 'pain_fuel',
          name: 'Pain Fuel',
          description: 'Atk Speed up at low HP. 2x DMG at critical HP.',
          effect: 'Berserker Mode'
        },
        startingItems: ['Stim Inhaler', 'Straight Jacket (Cut)']
      },
      {
        id: 'slasher',
        name: 'The Slasher',
        description: 'Strike from the shadows, strike with a smile.',
        mechanic: 'First attack on an unaware enemy is a guaranteed Critical Hit and causes Fear.',
        trait: {
          id: 'ambush_predator',
          name: 'Ambush Predator',
          description: 'Guaranteed Crit from stealth. Causes Fear.',
          effect: 'Stealth Buff'
        },
        startingItems: ['Butcher Knife', 'Leather Gloves']
      },
      {
        id: 'rabid',
        name: 'The Rabid',
        description: 'Too angry to die.',
        mechanic: 'Immune to Stun and Pain. Cannot retreat from combat once started. Health regen increases in combat.',
        trait: {
          id: 'unstoppable',
          name: 'Unstoppable',
          description: 'Immune to Stun/Pain. No Retreat. Combat Regen.',
          effect: 'Combat Lock'
        },
        startingItems: ['Spiked Collar', 'Feral Claws (Improvised)']
      }
    ]
  },
  'THE_CANNIBAL': {
    id: 'THE_CANNIBAL',
    name: 'The Cannibal',
    description: 'Meat is meat. In the ruins, one cannot afford to be picky.',
    attributeLabels: ['HEALTH', 'UNNATURAL', 'NUTRITION', 'GUT', 'EATING', 'RAW_STR', 'SENSES'],
    baseStats: { 
      'HEALTH': 10, 'UNNATURAL': 9, 'NUTRITION': 9, 'GUT': 12, 'EATING': 11, 'RAW_STR': 10, 'SENSES': 9 
    },
    startingTraits: [{
      id: 'anthropophagy',
      name: 'Anthropophagy',
      description: 'Eating humans grants buffs.',
      effect: 'Action Unlock'
    }],
    startingItems: ['Bone Saw', 'Salt Packet'],
    carryCapacity: 65,
    introScenario: "You wipe your mouth with the back of your hand. The raider who ambushed you wasn't particularly tough, but sustenance is sustenance. You are in a small alleyway, hidden from the main street, crouched over what remains.",
    subclasses: [
      {
        id: 'gourmand',
        name: 'The Gourmand',
        description: 'You appreciate the finer textures of long pig.',
        mechanic: 'Eating human meat provides +2 to all stats for 1 hour. Can cook "Special Meals".',
        trait: {
          id: 'fine_dining',
          name: 'Fine Dining',
          description: 'Human meat buffs all stats. Special cooking unlocked.',
          effect: 'Consumable Buff'
        },
        startingItems: ['Recipe Book', 'Spices']
      },
      {
        id: 'wendigo',
        name: 'The Wendigo',
        description: 'The hunger has changed you physically.',
        mechanic: 'At night, gain +20% Movement Speed and Damage. Hunger drains 2x faster constantly.',
        trait: {
          id: 'nocturnal_hunter',
          name: 'Nocturnal Hunter',
          description: '+20% Speed/DMG at night. 2x Hunger drain.',
          effect: 'Night Buff'
        },
        startingItems: ['Deer Skull Helm', 'Raw Heart']
      },
      {
        id: 'butcher',
        name: 'The Butcher',
        description: 'Waste not, want not.',
        mechanic: 'Harvest 2x meat and bones from corpses. Bone weapons have +50% durability.',
        trait: {
          id: 'harvester',
          name: 'Harvester',
          description: '2x Corpse harvest. Bone weapon durability up.',
          effect: 'Loot Buff'
        },
        startingItems: ['Cleaver', 'Meat Hook']
      },
      {
        id: 'feaster',
        name: 'The Feaster',
        description: 'It tastes like forgiveness.',
        mechanic: 'Eating raw meat restores Sanity and Health instantly. No penalty for eating in combat.',
        trait: {
          id: 'rapid_digestion',
          name: 'Rapid Digestion',
          description: 'Instant heal from raw meat. Combat eating enabled.',
          effect: 'Healing Mechanic'
        },
        startingItems: ['Silver Fork', 'Napkin']
      },
      {
        id: 'gnawer',
        name: 'The Gnawer',
        description: 'Even the bones have marrow.',
        mechanic: 'Immune to all food-borne diseases and radiation from food. Can eat old bones.',
        trait: {
          id: 'bone_eater',
          name: 'Bone Eater',
          description: 'Immune to food disease/rads. Can eat bones.',
          effect: 'Survival Buff'
        },
        startingItems: ['Jawbone Club', 'Toothpick']
      }
    ]
  },
  'THE_SNIPER': {
    id: 'THE_SNIPER',
    name: 'The Sniper',
    description: 'Distance is safety. You calculate wind, coriolis effect, and drop.',
    attributeLabels: ['PRECISION', 'HOLD', 'AWARENESS', 'NIGHT_VIS', 'TRAJECTORY', 'OPTICS', 'MOVEMENT'],
    baseStats: { 
      'PRECISION': 12, 'HOLD': 11, 'AWARENESS': 10, 'NIGHT_VIS': 9, 'TRAJECTORY': 12, 'OPTICS': 9, 'MOVEMENT': 9 
    },
    startingTraits: [{
      id: 'bullet_drop',
      name: 'Ballistics CPU',
      description: 'Visual interface for bullet drop.',
      effect: 'UI Enhancement'
    }],
    startingItems: ['Rangefinder', 'Ghillie Hood'],
    carryCapacity: 45,
    introScenario: "You are prone on the fourth floor of a crumbling office building. Dust covers your ghillie hood. Through your scope, you watch the settlement below. A patrol is moving near the perimeter. Silence is your best friend here.",
    subclasses: [
      {
        id: 'ghost',
        name: 'The Ghost',
        description: 'One shot. No footprint.',
        mechanic: 'First shot from stealth deals +200% Damage. Muzzle flash is hidden.',
        trait: {
          id: 'cold_bore',
          name: 'Cold Bore',
          description: '+200% First Shot DMG. Hidden muzzle flash.',
          effect: 'Stealth Combat'
        },
        startingItems: ['Improvised Suppressor', 'Subsonic Ammo']
      },
      {
        id: 'spotter',
        name: 'The Spotter',
        description: 'You see everything before it sees you.',
        mechanic: 'Binoculars automatically mark targets. Marked targets take +25% damage.',
        trait: {
          id: 'target_acq',
          name: 'Target Acquisition',
          description: 'Auto-mark targets. +25% DMG to marked.',
          effect: 'Support Buff'
        },
        startingItems: ['High-Power Spotting Scope', 'Signal Flare']
      },
      {
        id: 'wraith',
        name: 'The Wraith',
        description: 'The dark is your ally.',
        mechanic: 'Night Vision battery lasts 3x longer. Accuracy is unaffected by low light.',
        trait: {
          id: 'low_light_ops',
          name: 'Low Light Ops',
          description: '3x NVG Battery. No low-light penalty.',
          effect: 'Gear Buff'
        },
        startingItems: ['Night Vision Goggles', 'Black Fatigues']
      },
      {
        id: 'ballistic',
        name: 'The Ballistician',
        description: 'Cover is just a suggestion.',
        mechanic: 'High-caliber rounds penetrate light cover and hit targets behind enemies.',
        trait: {
          id: 'penetrator',
          name: 'Penetrator',
          description: ' Rounds penetrate cover and enemies.',
          effect: 'Combat Mechanic'
        },
        startingItems: ['Wind Gauge', 'AP Rounds']
      },
      {
        id: 'viper',
        name: 'The Viper',
        description: 'If the bullet doesn\'t kill them, the toxin will.',
        mechanic: 'Can craft poison-tipped ammunition. Poisoned targets move 50% slower.',
        trait: {
          id: 'toxicologist',
          name: 'Toxicologist',
          description: 'Craft poison ammo. Poison slows 50%.',
          effect: 'Crafting Unlock'
        },
        startingItems: ['Toxin Kit', 'Dart Gun']
      }
    ]
  },
  'THE_SACRIFICE': {
    id: 'THE_SACRIFICE',
    name: 'The Sacrifice',
    description: 'You were supposed to die a sacrificial death... yet you didn\'t. You walk with a foot in the grave, and death seems reluctant to take you back.',
    attributeLabels: ['WILL', 'FATALISM', 'OCCULT', 'RESILIENCE', 'PAIN_TOL', 'BLOOD', 'SPIRIT'],
    baseStats: { 
      'WILL': 12, 'FATALISM': 11, 'OCCULT': 10, 'RESILIENCE': 12, 'PAIN_TOL': 12, 'BLOOD': 9, 'SPIRIT': 11 
    },
    startingTraits: [{
      id: 'death_defiant',
      name: 'Death Defiant',
      description: 'Survive a fatal blow with 1 HP once per day.',
      effect: 'Survival Mechanic'
    }],
    startingItems: ['Ceremonial Dagger', 'Tattered Robes'],
    carryCapacity: 40,
    introScenario: "You wake up near a stone altar in the sunken ruins of a pre-war church. You don't remember how you got here, but the blood on the glyph is fresh. It isn't yours. The air is heavy with a presence you cannot see.",
    subclasses: [
      {
        id: 'lamb',
        name: 'The Lamb',
        description: 'Innocence led to slaughter, but the slaughter made you holy.',
        mechanic: 'Enemies hesitate to attack you first. Healing efficacy +50%.',
        trait: {
          id: 'divine_protection',
          name: 'Divine Protection',
          description: 'Enemy aggro reduced. +50% Healing received.',
          effect: 'Defensive Buff'
        },
        startingItems: ['White Sash', 'Healing Salve']
      },
      {
        id: 'altar',
        name: 'The Altar',
        description: 'You are the stone upon which others bleed.',
        mechanic: 'Taking damage charges a "Retribution" meter. Release to deal AOE damage.',
        trait: {
          id: 'retribution',
          name: 'Retribution',
          description: 'Store damage taken as energy. Release as AOE.',
          effect: 'Combat Mechanic'
        },
        startingItems: ['Stone Bowl', 'Chalk']
      },
      {
        id: 'omen',
        name: 'The Omen',
        description: 'Your presence sours the air. Bad luck follows you.',
        mechanic: 'Enemies near you suffer critical failures (jammed guns, trips).',
        trait: {
          id: 'jinx',
          name: 'Jinx',
          description: 'Enemies within 10m suffer increased failure rates.',
          effect: 'Debuff Aura'
        },
        startingItems: ['Cursed Coin', 'Broken Mirror']
      },
      {
        id: 'reject',
        name: 'The Reject',
        description: 'Neither heaven nor hell wanted you.',
        mechanic: 'Immune to instant death effects. Radiation heals you slowly.',
        trait: {
          id: 'unwanted',
          name: 'Unwanted',
          description: 'Immune to execution. Rads heal HP.',
          effect: 'Survival Buff'
        },
        startingItems: ['Lead Box', 'Geiger Counter']
      },
      {
        id: 'vessel',
        name: 'The Vessel',
        description: 'Something else came back with you.',
        mechanic: 'Can channel an entity to boost stats, but drains Sanity rapidly.',
        trait: {
          id: 'possession',
          name: 'Possession',
          description: 'Activate to +5 All Stats. Drains Sanity.',
          effect: 'Active Ability'
        },
        startingItems: ['Possessed Doll', 'Incense']
      }
    ]
  },
  'TEMPORAL_ANOMALY': {
    id: 'TEMPORAL_ANOMALY',
    name: 'Temporal Anomaly',
    description: 'You fell through a hole in 2025, WW2, WW1, or the Cold War. You are displaced, out of time, but you brought your best friend with you.',
    attributeLabels: ['HISTORY', 'TECH_ADAPT', 'LUCK', 'NOSTALGIA', 'TACTICS', 'DISCIPLINE', 'CONFUSION'],
    baseStats: { 
      'HISTORY': 11, 'TECH_ADAPT': 8, 'LUCK': 12, 'NOSTALGIA': 10, 'TACTICS': 9, 'DISCIPLINE': 10, 'CONFUSION': 9 
    },
    startingTraits: [{
      id: 'duo',
      name: 'Dynamic Duo',
      description: 'Start with a permanent Companion NPC.',
      effect: 'Companion'
    }],
    startingItems: ['Vintage Service Pistol', 'Faded Photograph'],
    carryCapacity: 50,
    introScenario: "You blink, and the location changes. One moment you were... somewhere else. Now you are in an isolated clearing surrounded by twisted metal trees. Your chronometer is spinning wildly. Your companion looks at you with confusion and fear.",
    subclasses: [
      {
        id: 'soldier',
        name: 'The Soldier (WW2)',
        description: 'Normandy was loud. Warsaw is quiet. Too quiet.',
        mechanic: 'Proficient with all ballistic weapons. Digging trenches provides heavy cover.',
        trait: {
          id: 'great_generation',
          name: 'Great Generation',
          description: 'Ballistic weapon proficiency. Trench digging unlocked.',
          effect: 'Combat Buff'
        },
        startingItems: ['M1 Garand', 'Spade']
      },
      {
        id: 'spy',
        name: 'The Spy (Cold War)',
        description: 'You spent your life waiting for the nukes. They were late.',
        mechanic: 'Can decode encrypted messages. Stealth kills grant Intel.',
        trait: {
          id: 'tradecraft',
          name: 'Tradecraft',
          description: 'Decryption unlocked. Intel from kills.',
          effect: 'Utility Buff'
        },
        startingItems: ['Micro-Camera', 'Cyanide Pill']
      },
      {
        id: 'zoomer',
        name: 'The Zoomer (2025)',
        description: 'This is just like that video game, right? Right?',
        mechanic: 'High Tech Adaptability. Can rig old tech with modern know-how. High anxiety.',
        trait: {
          id: 'digital_native',
          name: 'Digital Native',
          description: '+Tech Skill. Low stress tolerance.',
          effect: 'Skill Tradeoff'
        },
        startingItems: ['Smartphone (No Signal)', 'Energy Drink']
      },
      {
        id: 'trench',
        name: 'The Doughboy (WW1)',
        description: 'Gas. Mud. Rats. Nothing has changed.',
        mechanic: 'Immune to Chemical Gas. Disease resistance +50%.',
        trait: {
          id: 'mustard_lung',
          name: 'Mustard Lung',
          description: 'Gas immunity. +50% Disease Res.',
          effect: 'Survival Buff'
        },
        startingItems: ['Gas Mask', 'Trench Club']
      },
      {
        id: 'paradox',
        name: 'The Paradox',
        description: 'You remember a future that never happened.',
        mechanic: 'Once per day, reroll a failed check. "Deja Vu".',
        trait: {
          id: 'rewind',
          name: 'Rewind',
          description: 'Reroll 1 check/day.',
          effect: 'Luck Mechanic'
        },
        startingItems: ['Future Almanac', 'Quantum Shard']
      }
    ]
  },
  'THE_STARVED': {
    id: 'THE_STARVED',
    name: 'The Starved',
    description: 'You were starving yourself so you wouldn\'t gluttonize yourself. But now, the chains are off. You are a black hole of consumption.',
    attributeLabels: ['HUNGER', 'METABOLISM', 'SPEED', 'WITHER', 'GREED', 'JAW', 'DIGESTION'],
    baseStats: { 
      'HUNGER': 12, 'METABOLISM': 12, 'SPEED': 11, 'WITHER': 10, 'GREED': 11, 'JAW': 9, 'DIGESTION': 12 
    },
    startingTraits: [{
      id: 'insatiable',
      name: 'Insatiable',
      description: 'Hunger meter has no cap, but provides buffs at high levels.',
      effect: 'Meter Mechanic'
    }],
    startingItems: ['Empty Can', 'Shiv'],
    carryCapacity: 30, // Frail start
    introScenario: "You are digging through a trash heap behind an old grocery store. Your stomach cramps violently, a black hole demanding to be filled. You found a can, but it might be rusted through. The rats are watching you.",
    subclasses: [
      {
        id: 'void',
        name: 'The Void',
        description: 'You do not eat to live. You eat to end the world.',
        mechanic: 'Can consume non-food items (wood, plastic) for sustenance. Always hungry.',
        trait: {
          id: 'pica',
          name: 'Pica',
          description: 'Eat non-food items. Hunger decay 2x.',
          effect: 'Survival Mechanic'
        },
        startingItems: ['Charcoal Tablets', 'Bag of Rocks']
      },
      {
        id: 'ascetic',
        name: 'The Ascetic',
        description: 'You broke your vow. Now you feast.',
        mechanic: 'Fast for 3 days to gain "Enlightenment" (Stats +5). Breaking the fast triggers "Binge" (DMG +50%).',
        trait: {
          id: 'feast_famine',
          name: 'Feast & Famine',
          description: 'Cycle between Enlightenment and Binge states.',
          effect: 'Stance Mechanic'
        },
        startingItems: ['Prayer Beads', 'Water Skin']
      },
      {
        id: 'binge',
        name: 'The Binge',
        description: 'One bite is never enough.',
        mechanic: 'Consuming food grants temporary HP and damage resistance.',
        trait: {
          id: 'gluttony_shield',
          name: 'Gluttony Shield',
          description: 'Food grants Temp HP and Armor.',
          effect: 'Combat Buff'
        },
        startingItems: ['Bucket', 'Stale Bread']
      },
      {
        id: 'withered',
        name: 'The Withered',
        description: 'You are so thin you are hard to hit.',
        mechanic: '+30 Evasion. Enemies have a hard time spotting you (Low Profile).',
        trait: {
          id: 'stick_figure',
          name: 'Stick Figure',
          description: '+30 Evasion. Harder to spot.',
          effect: 'Defensive Buff'
        },
        startingItems: ['Tight Bandages', 'Needle']
      },
      {
        id: 'maw',
        name: 'The Maw',
        description: 'Your jaw unhinges.',
        mechanic: 'Bite attack deals massive damage and heals you. Can execute low HP enemies.',
        trait: {
          id: 'devour',
          name: 'Devour',
          description: 'Bite attack heals. Execute low HP targets.',
          effect: 'Combat Ability'
        },
        startingItems: ['Metal Jaw', 'Grindstone']
      }
    ]
  },
  'THE_HACKER': {
    id: 'THE_HACKER',
    name: 'The Hacker',
    description: 'You know the old codes. You speak the language of the machines that destroyed the world. While others scavenge trash, you scavenge data.',
    attributeLabels: ['LOGIC', 'CODING', 'INTEL', 'TECH', 'SIGNAL', 'BYPASS', 'FOCUS'],
    baseStats: { 
      'LOGIC': 12, 'CODING': 12, 'INTEL': 11, 'TECH': 12, 'SIGNAL': 10, 'BYPASS': 11, 'FOCUS': 9 
    },
    startingTraits: [{
      id: 'interface',
      name: 'Neural Interface',
      description: 'Can jack into terminals directly.',
      effect: 'Interaction Unlock'
    }],
    startingItems: ['Interface Cables', 'Soldering Iron'],
    carryCapacity: 40,
    introScenario: "The green glow of a working terminal illuminates your face. You are in a sub-basement server room of a Pre-War bank, the hum of the cooling fans almost hypnotic. You just bypassed the first firewall.",
    subclasses: [
      {
        id: 'netrunner',
        name: 'The Netrunner',
        description: 'The grid is your playground.',
        mechanic: 'Hack turrets and robots to fight for you. View map data of secured areas.',
        trait: {
          id: 'bot_net',
          name: 'Bot Net',
          description: 'Control robots/turrets. See secure maps.',
          effect: 'Summoner Mechanic'
        },
        startingItems: ['Cyberdeck', 'Optical Chip']
      },
      {
        id: 'script_kiddie',
        name: 'The Script Kiddie',
        description: 'Rough, dirty, but effective.',
        mechanic: 'Brute force locks instantly. Loud, triggers alarms, but 100% success.',
        trait: {
          id: 'brute_force',
          name: 'Brute Force',
          description: 'Instant unlock. Triggers alarms.',
          effect: 'Utility Mechanic'
        },
        startingItems: ['USB Drive', 'Energy Bar']
      },
      {
        id: 'grey_hat',
        name: 'The Grey Hat',
        description: 'You do what needs to be done.',
        mechanic: 'Can craft electronic gadgets and bypass security gates silently.',
        trait: {
          id: 'maker',
          name: 'Maker',
          description: 'Craft electronics. Silent bypass.',
          effect: 'Crafting Buff'
        },
        startingItems: ['Lockpick Set', 'Multimeter']
      },
      {
        id: 'phreaker',
        name: 'The Phreaker',
        description: 'Signals are everywhere.',
        mechanic: 'Intercept enemy comms to reveal locations. Jam enemy weapons remotely.',
        trait: {
          id: 'signal_jam',
          name: 'Signal Jam',
          description: 'Reveal enemies. Jam weapons.',
          effect: 'Support Debuff'
        },
        startingItems: ['Frequency Tuner', 'Copper Wire']
      },
      {
        id: 'ghost_machine',
        name: 'Ghost in the Machine',
        description: 'You are more code than flesh.',
        mechanic: 'Interact with tech wirelessly from a distance. Immune to EMP effects.',
        trait: {
          id: 'wireless',
          name: 'Wireless Protocol',
          description: 'Ranged tech interaction. EMP Immunity.',
          effect: 'Utility Buff'
        },
        startingItems: ['Signal Booster', 'EMP Grenade']
      }
    ]
  },
  'THE_DEMON': {
    id: 'THE_DEMON',
    name: 'The Demon',
    description: 'You embrace your inner darkness, becoming cruel and sadistic for fun. The world is broken, and so are you. Might as well enjoy the screams.',
    attributeLabels: ['CRUELTY', 'INTIMIDATION', 'SADISM', 'PAIN', 'DOMINANCE', 'FEAR', 'POWER'],
    baseStats: { 
      'CRUELTY': 12, 'INTIMIDATION': 12, 'SADISM': 12, 'PAIN': 10, 'DOMINANCE': 11, 'FEAR': 12, 'POWER': 11 
    },
    startingTraits: [{
      id: 'sadist',
      name: 'Joy in Pain',
      description: 'Recover Sanity when inflicting damage.',
      effect: 'Sanity Regen'
    }],
    startingItems: ['Spiked Knuckles', 'Black Leather Trench'],
    carryCapacity: 50,
    introScenario: "The screams have stopped. It's quiet now. You stand in a makeshift interrogation room—a basement with soundproofed walls. The tools of your trade are spread out on a table. Your 'guest' has finally given up the information.",
    subclasses: [
      {
        id: 'tormentor',
        name: 'The Tormentor',
        description: 'Pain is an art form.',
        mechanic: 'Enemies damaged by you bleed for longer. Interrogation success rate 100%.',
        trait: {
          id: 'agony_artist',
          name: 'Agony Artist',
          description: 'Extended bleed. Perfect interrogation.',
          effect: 'Debuff Buff'
        },
        startingItems: ['Scalpel Set', 'Salt Shaker']
      },
      {
        id: 'tyrant',
        name: 'The Tyrant',
        description: 'Kneel or break.',
        mechanic: 'Can enslave defeated human enemies instead of killing them. Slaves carry loot.',
        trait: {
          id: 'enslave',
          name: 'Iron Fist',
          description: 'Enslave defeated enemies as mules.',
          effect: 'Minion Mechanic'
        },
        startingItems: ['Slaver Collar', 'Whip']
      },
      {
        id: 'nightmare',
        name: 'The Nightmare',
        description: 'You are the thing under the bed.',
        mechanic: 'Passive fear aura. Weak enemies flee on sight.',
        trait: {
          id: 'fear_aura',
          name: 'Fear Aura',
          description: 'Enemies flee automatically.',
          effect: 'Crowd Control'
        },
        startingItems: ['Horror Mask', 'Fear Toxin']
      },
      {
        id: 'butcher_demon',
        name: 'The Butcher',
        description: 'Messy. Loud. Fun.',
        mechanic: 'Kills explode in gore, causing terror to nearby enemies.',
        trait: {
          id: 'visceral',
          name: 'Visceral',
          description: 'Kills cause AOE terror.',
          effect: 'Combat Effect'
        },
        startingItems: ['Apron of Skin', 'Meat Mallet']
      },
      {
        id: 'hellbound',
        name: 'The Hellbound',
        description: 'You are already burning.',
        mechanic: 'Fire resistance +50%. Deal fire damage with melee attacks.',
        trait: {
          id: 'infernal_touch',
          name: 'Infernal Touch',
          description: '+50% Fire Res. Melee deals Fire DMG.',
          effect: 'Elemental Buff'
        },
        startingItems: ['Lighter', 'Gasoline Can']
      }
    ]
  },
  'BROKEN_SHELL': {
    id: 'BROKEN_SHELL',
    name: 'Broken Shell',
    description: 'Your mind broke and you don\'t feel anything anymore. You have no Sanity meter, but suffer a major disadvantage regarding anything needing mental acuity, logic, or emotions.',
    attributeLabels: ['ENDURANCE', 'NUMBNESS', 'STRENGTH', 'HOLLOW', 'AUTOMATON', 'VOID', 'STAMINA'],
    baseStats: { 
      'ENDURANCE': 12, 'NUMBNESS': 12, 'STRENGTH': 10, 'HOLLOW': 12, 'AUTOMATON': 12, 'VOID': 11, 'STAMINA': 12 
    },
    startingTraits: [{
      id: 'hollow_mind',
      name: 'Hollow Mind',
      description: 'Immune to Sanity loss. Unable to perform Social or Logic tasks.',
      effect: 'Tradeoff'
    }],
    startingItems: ['Grey Rags', 'Dull Knife'],
    carryCapacity: 45,
    introScenario: "You are standing in the middle of a street. It is raining. You feel the wetness, but it registers only as data. Cold. Wet. You have been standing here for an hour. There is a rustling nearby. Time to move.",
    subclasses: [
      {
        id: 'husk',
        name: 'The Husk',
        description: 'The lights are on, but nobody is home.',
        mechanic: 'Pain threshold is limitless. You fight at full efficiency until 0 HP.',
        trait: {
          id: 'flesh_puppet',
          name: 'Flesh Puppet',
          description: 'No injury penalties.',
          effect: 'Combat Buff'
        },
        startingItems: ['Painkillers', 'Blanket']
      },
      {
        id: 'drone',
        name: 'The Drone',
        description: 'Orders are comforting.',
        mechanic: '+20% Stats when following a directive or quest marker exactly.',
        trait: {
          id: 'good_soldier',
          name: 'Good Soldier',
          description: 'Buffs when following quest objectives.',
          effect: 'Conditional Buff'
        },
        startingItems: ['Radio Headset', 'Instruction Manual']
      },
      {
        id: 'blank',
        name: 'The Blank',
        description: 'Face like a smooth stone.',
        mechanic: 'Invisible to psychological detection. NPCs cannot read your intentions.',
        trait: {
          id: 'poker_face',
          name: 'Cipher',
          description: 'Immune to detection spells/psychology.',
          effect: 'Stealth Buff'
        },
        startingItems: ['Mirror (Painted Black)', 'Hood']
      },
      {
        id: 'vessel_shell',
        name: 'The Empty',
        description: 'Room for something else.',
        mechanic: 'Can absorb radiation to heal HP, but cannot heal naturally.',
        trait: {
          id: 'rad_eater',
          name: 'Rad Eater',
          description: 'Rads heal HP. No natural regen.',
          effect: 'Survival Mechanic'
        },
        startingItems: ['Lead Container', 'Rad Pills']
      },
      {
        id: 'numb',
        name: 'The Numb',
        description: 'It doesn\'t hurt.',
        mechanic: 'Damage taken is reduced by flat 2 points per hit.',
        trait: {
          id: 'thick_skin',
          name: 'Callous',
          description: '-2 Damage taken from all sources.',
          effect: 'Defense Buff'
        },
        startingItems: ['Thick Coat', 'Earplugs']
      }
    ]
  },
  'THE_SURVIVOR': {
    id: 'THE_SURVIVOR',
    name: 'The Survivor',
    description: 'You know how to survive this place, and are at home when things try to eat you. The ruins are not a grave; they are a garden, if you know where to look.',
    attributeLabels: ['SURVIVAL', 'CRAFTING', 'SCAVENGING', 'TRAPPING', 'NAVIGATION', 'GRIT', 'AWARENESS'],
    baseStats: { 
      'SURVIVAL': 12, 'CRAFTING': 11, 'SCAVENGING': 12, 'TRAPPING': 11, 'NAVIGATION': 12, 'GRIT': 10, 'AWARENESS': 12 
    },
    startingTraits: [{
      id: 'wasteland_pro',
      name: 'Wasteland Pro',
      description: 'Survival needs (Hunger/Thirst) decay 50% slower.',
      effect: 'Passive Buff'
    }],
    startingItems: ['Hatchet', 'Water Filter'],
    carryCapacity: 60,
    introScenario: "You are in your hidden shelter, a reinforced basement beneath a collapsed apartment block. You are sharpening your hatchet. Outside, something scratches at the debris blocking the entrance. It sounds big.",
    subclasses: [
      {
        id: 'bushcrafter',
        name: 'The Bushcrafter',
        description: 'Nature provides.',
        mechanic: 'Can craft complex items from basic biological materials (bone, wood, sinew).',
        trait: {
          id: 'primitive_tech',
          name: 'Primitive Tech',
          description: 'Craft high-tier items with low-tier mats.',
          effect: 'Crafting Buff'
        },
        startingItems: ['Flint and Steel', 'Paracord']
      },
      {
        id: 'prepper',
        name: 'The Prepper',
        description: 'You were right all along.',
        mechanic: 'Start with a hidden stash location map. +10 Inventory Slots.',
        trait: {
          id: 'hoarder',
          name: 'Hoarder',
          description: 'Hidden stash access. +10 Slots.',
          effect: 'Loot Buff'
        },
        startingItems: ['MRE', 'Ammo Box']
      },
      {
        id: 'hunter',
        name: 'The Hunter',
        description: 'You do not run.',
        mechanic: '+25% Damage against Beasts and Mutants. Harvest extra food.',
        trait: {
          id: 'big_game',
          name: 'Big Game',
          description: '+DMG vs Beasts. Extra meat.',
          effect: 'Combat Buff'
        },
        startingItems: ['Bear Trap', 'Skinning Knife']
      },
      {
        id: 'hermit',
        name: 'The Hermit',
        description: 'People are the real danger.',
        mechanic: 'Stealth +50 in wilderness areas. Vendor prices are 50% worse.',
        trait: {
          id: 'recluse',
          name: 'Recluse',
          description: 'High wilderness stealth. Bad trade prices.',
          effect: 'Tradeoff'
        },
        startingItems: ['Dried Herbs', 'Fishing Line']
      },
      {
        id: 'guide',
        name: 'The Guide',
        description: 'You know the way.',
        mechanic: 'Party movement speed +30%. Can bypass random encounters.',
        trait: {
          id: 'pathfinder',
          name: 'Pathfinder',
          description: '+30% Party Speed. Skip encounters.',
          effect: 'Utility Buff'
        },
        startingItems: ['Flare Gun', 'Walking Map']
      }
    ]
  },
  'THE_MUTANT': {
    id: 'THE_MUTANT',
    name: 'The Mutant',
    description: 'You were mutated by the radiation, but you miss your human body. You are immune to radiation entirely, but gain a Dysmorphia meter regarding your mutant form.',
    attributeLabels: ['STRENGTH', 'MUTATION', 'TOUGHNESS', 'REGEN', 'DYSMORPHIA', 'INSTINCT', 'RAGE'],
    baseStats: { 
      'STRENGTH': 12, 'MUTATION': 12, 'TOUGHNESS': 12, 'REGEN': 11, 'DYSMORPHIA': 12, 'INSTINCT': 10, 'RAGE': 9 
    },
    startingTraits: [{
      id: 'rad_immune',
      name: 'Child of Atom',
      description: 'Immune to Radiation damage. Gain Dysmorphia instead.',
      effect: 'Immunity'
    }],
    startingItems: ['Lead Poncho', 'Heavy Pipe'],
    carryCapacity: 80,
    introScenario: "You are deep in a radioactive crater, the 'Glow'. The radiation warms your skin like sunlight. To anyone else, this is death. To you, it is a bath. But you catch your reflection in a puddle of iridescent slime and quickly look away.",
    subclasses: [
      {
        id: 'hulk',
        name: 'The Hulk',
        description: 'Muscles like steel cables.',
        mechanic: 'Can lift heavy debris and throw enemies. Melee damage scales with Strength.',
        trait: {
          id: 'super_strength',
          name: 'Super Strength',
          description: 'Lift heavy objects. Throw enemies.',
          effect: 'Combat Buff'
        },
        startingItems: ['Rebar Club', 'Cinder Block']
      },
      {
        id: 'glow',
        name: 'The Glow',
        description: 'You are a walking lightbulb.',
        mechanic: 'Emit light and low-level radiation. Enemies near you take Rad damage over time.',
        trait: {
          id: 'living_reactor',
          name: 'Living Reactor',
          description: 'Emit light. AOE Rad damage.',
          effect: 'Aura'
        },
        startingItems: ['Uranium Ore', 'Lead Box']
      },
      {
        id: 'crawler',
        name: 'The Crawler',
        description: 'Too many limbs.',
        mechanic: 'Can climb walls and ceilings. Immune to fall damage.',
        trait: {
          id: 'wall_climb',
          name: 'Spider Climb',
          description: 'Climb walls. No fall damage.',
          effect: 'Mobility Buff'
        },
        startingItems: ['Climbing Hooks', 'Rope']
      },
      {
        id: 'psionic',
        name: 'The Psionic',
        description: 'Your brain grew too big.',
        mechanic: 'Can move objects with mind. Headshots deal 2x damage to you.',
        trait: {
          id: 'mind_over_matter',
          name: 'Telekinesis',
          description: 'Move objects remotely. Weak head.',
          effect: 'Active Ability'
        },
        startingItems: ['Focus Crystal', 'Headband']
      },
      {
        id: 'feral_mutant',
        name: 'The Feral',
        description: 'You are losing the human part.',
        mechanic: 'Cannot speak. Claws deal bleed damage. Eating raw meat lowers Dysmorphia.',
        trait: {
          id: 'devolved',
          name: 'Devolved',
          description: 'Mute. Claws bleed. Meat heals mind.',
          effect: 'Tradeoff'
        },
        startingItems: ['Bone Charm', 'Raw Meat']
      }
    ]
  }
};
