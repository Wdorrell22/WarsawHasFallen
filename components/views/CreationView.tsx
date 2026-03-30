
import React, { useState } from 'react';
import { PATHS } from '../../data/paths';
import { PathType, Subclass } from '../../types';
import { SubclassSelection } from '../creation/SubclassSelection';

// Imported from new UI-Path structure
import { VoiceDetails } from '../creation/UI-Path/VoiceDetails';
import { TraitorDetails } from '../creation/UI-Path/TraitorDetails';
import { WandererDetails } from '../creation/UI-Path/WandererDetails';
import { PsychoDetails } from '../creation/UI-Path/PsychoDetails';
import { CannibalDetails } from '../creation/UI-Path/CannibalDetails';
import { SniperDetails } from '../creation/UI-Path/SniperDetails';
import { SacrificeDetails } from '../creation/UI-Path/SacrificeDetails';
import { TemporalDetails } from '../creation/UI-Path/TemporalDetails';
import { StarvedDetails } from '../creation/UI-Path/StarvedDetails';
import { HackerDetails } from '../creation/UI-Path/HackerDetails';
import { DemonDetails } from '../creation/UI-Path/DemonDetails';
import { BrokenShellDetails } from '../creation/UI-Path/BrokenShellDetails';
import { SurvivorDetails } from '../creation/UI-Path/SurvivorDetails';
import { MutantDetails } from '../creation/UI-Path/MutantDetails';

interface Props {
  onComplete: (path: PathType, codename: string, nationality?: string) => void;
}

type Step = 'PATH' | 'DETAILS' | 'SUBCLASS';

export const CreationView: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('PATH');
  const [selectedPath, setSelectedPath] = useState<PathType>('THE_VOICE');
  const [nationality, setNationality] = useState<string>('USA'); // For Sniper
  const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(null);

  const handlePathSelect = (path: PathType) => {
    setSelectedPath(path);
    // Reset selections when path changes
    setNationality('USA');
    setSelectedSubclass(null); 
  };

  const handleConfirmPath = () => {
    setStep('SUBCLASS');
    // Default to first subclass
    setSelectedSubclass(PATHS[selectedPath].subclasses[0]);
  };

  const handleFinalize = () => {
    if (selectedSubclass) {
      onComplete(selectedPath, selectedSubclass.name, selectedPath === 'THE_SNIPER' ? nationality : undefined);
    }
  };

  const pathList = Object.values(PATHS);
  const currentPathData = PATHS[selectedPath];

  const renderDetails = () => {
    switch (selectedPath) {
      case 'THE_VOICE': return <VoiceDetails onNext={handleConfirmPath} />;
      case 'THE_TRAITOR': return <TraitorDetails onNext={handleConfirmPath} />;
      case 'THE_WANDERER': return <WandererDetails onNext={handleConfirmPath} />;
      case 'THE_PSYCHO': return <PsychoDetails onNext={handleConfirmPath} />;
      case 'THE_CANNIBAL': return <CannibalDetails onNext={handleConfirmPath} />;
      case 'THE_SNIPER': return <SniperDetails onNext={handleConfirmPath} nationality={nationality} setNationality={setNationality} />;
      case 'THE_SACRIFICE': return <SacrificeDetails onNext={handleConfirmPath} />;
      case 'TEMPORAL_ANOMALY': return <TemporalDetails onNext={handleConfirmPath} />;
      case 'THE_STARVED': return <StarvedDetails onNext={handleConfirmPath} />;
      case 'THE_HACKER': return <HackerDetails onNext={handleConfirmPath} />;
      case 'THE_DEMON': return <DemonDetails onNext={handleConfirmPath} />;
      case 'BROKEN_SHELL': return <BrokenShellDetails onNext={handleConfirmPath} />;
      case 'THE_SURVIVOR': return <SurvivorDetails onNext={handleConfirmPath} />;
      case 'THE_MUTANT': return <MutantDetails onNext={handleConfirmPath} />;
      default: return <VoiceDetails onNext={handleConfirmPath} />;
    }
  };

  if (step === 'SUBCLASS') {
    return (
      <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto">
         <h1 className="text-3xl font-display text-white mb-2 text-center tracking-[0.2em] glow-text">IDENTITY_INITIALIZATION</h1>
         <SubclassSelection 
            pathData={currentPathData}
            selectedSubclass={selectedSubclass}
            onSelectSubclass={setSelectedSubclass}
            onConfirm={handleFinalize}
            onBack={() => setStep('PATH')}
         />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 pb-24 overflow-y-auto">
      <h1 className="text-3xl font-display text-white mb-2 text-center tracking-[0.2em] glow-text">IDENTITY_INITIALIZATION</h1>
      
      <>
        <p className="text-center text-xs text-term-amber-dim font-mono mb-6">SELECT NEURAL PATHWAY</p>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Col: Selection List */}
          <div className="flex flex-col gap-2 overflow-y-auto pr-1 pb-10 md:pb-0">
            {pathList.map((path) => (
              <button
                key={path.id}
                onClick={() => handlePathSelect(path.id)}
                className={`
                  p-3 border text-left transition-all duration-300 relative overflow-hidden group shrink-0
                  ${selectedPath === path.id 
                    ? 'border-term-amber bg-term-amber/10 text-white' 
                    : 'border-term-gray text-term-gray hover:border-term-amber-dim hover:text-term-amber'}
                `}
              >
                <div className="relative z-10 flex justify-between items-center">
                  <span className="font-display text-xl">{path.name.toUpperCase()}</span>
                  {selectedPath === path.id && <span className="animate-pulse text-xs text-term-amber">SELECTED</span>}
                </div>
                <div className={`absolute inset-0 bg-term-amber/5 transform transition-transform duration-500 origin-left ${selectedPath === path.id ? 'scale-x-100' : 'scale-x-0'}`}></div>
              </button>
            ))}
          </div>

          {/* Right Col: Details (Separated Components) */}
          <div className="relative h-full min-h-[400px]">
            {renderDetails()}
          </div>
        </div>
      </>
    </div>
  );
};
