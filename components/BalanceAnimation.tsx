import React from 'react';
import { Mood } from './Fritzchen';

interface Props {
  mood: Mood;
  className?: string;
}

export const BalanceAnimation: React.FC<Props> = ({ mood, className = '' }) => {
  
  // -- COLORS --
  const scaleColor = "#d97706"; // Amber-600 (Goldish)
  const standColor = "#78350f"; // Wood/Dark
  const problemColor = "#ef4444"; // Red (The disadvantage)
  const supportColor = "#3b82f6"; // Blue (The measure)
  const chainColor = "#94a3b8"; // Gray

  // -- STATE MAPPING --
  // We map the abstract "Moods" to Scale physics
  let angle = 0; // Negative = Left side heavy (Problem). Positive = Right side heavy.
  let showProblem = false;
  let showSupport = false;
  let isMoving = false; // Is it balancing or stuck?

  switch (mood) {
    case 'wild': // Start
      angle = 0;
      isMoving = true;
      break;
    case 'distracted': // Need identified -> Heavy imbalance
      angle = -20;
      showProblem = true;
      break;
    case 'worried': // Diagnostics -> Still imbalance
    case 'thinking': // Application -> Imbalance
      angle = -20;
      showProblem = true;
      isMoving = true; // Slight wobble
      break;
    case 'calm': // Measures defined -> Moving to balance
      angle = -5; // Almost balanced
      showProblem = true;
      showSupport = true;
      break;
    case 'success': // Done -> Balanced
    case 'focused': // Exams
      angle = 0;
      showProblem = true;
      showSupport = true;
      break;
    default:
      angle = 0;
  }

  // Visual helper text
  // const getLabel = () => {
  //   if (mood === 'distracted') return "Nachteil!";
  //   if (mood === 'calm') return "Ausgleich...";
  //   if (mood === 'success' || mood === 'focused') return "Fairness";
  //   return null;
  // };

  return (
    <div className={`relative w-40 h-40 ${className}`}>
        
      {/* Label Bubble - REMOVED */}
      {/* {getLabel() && (
         <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded-lg border border-slate-300 text-[10px] font-bold animate-pulse shadow-sm z-40 text-slate-600">
            {getLabel()}
        </div>
      )} */}

      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        
        {/* BASE (Stand) */}
        <path d="M50 90 L50 25" stroke={standColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M30 90 L70 90" stroke={standColor} strokeWidth="4" strokeLinecap="round" />
        <path d="M40 90 L50 80 L60 90" fill={standColor} />

        {/* ROTATING BEAM GROUP */}
        {/* We animate the rotation via CSS transition for smoothness, or wobble animation */}
        <g 
            className="transition-all duration-1000 ease-in-out"
            style={{ 
                transformOrigin: '50px 25px', 
                transform: `rotate(${angle}deg)` 
            }}
        >
            {/* The Beam */}
            <rect x="20" y="23" width="60" height="4" rx="2" fill={scaleColor} />
            <circle cx="50" cy="25" r="3" fill="#fbbf24" /> {/* Pivot point */}

            {/* LEFT PAN (The Problem Side) */}
            <g transform="translate(20, 25)">
                {/* Chains */}
                <line x1="0" y1="0" x2="-8" y2="25" stroke={chainColor} strokeWidth="0.5" />
                <line x1="0" y1="0" x2="8" y2="25" stroke={chainColor} strokeWidth="0.5" />
                <line x1="0" y1="0" x2="0" y2="25" stroke={chainColor} strokeWidth="0.5" />
                
                {/* Pan Container - We need to Counter-Rotate this so the pan stays flat! */}
                <g style={{ transform: `rotate(${-angle}deg)`, transformOrigin: '0 25px', transition: 'transform 1s ease-in-out' }}>
                    {/* The Plate */}
                    <path d="M-12 25 Q0 35 12 25" fill="#fbbf24" stroke={scaleColor} strokeWidth="1" />
                    
                    {/* The Problem Weight */}
                    {showProblem && (
                        <rect 
                            x="-8" y="15" width="16" height="10" rx="1" 
                            fill={problemColor} 
                            className="animate-drop-in"
                        />
                    )}
                </g>
            </g>

            {/* RIGHT PAN (The Support Side) */}
            <g transform="translate(80, 25)">
                {/* Chains */}
                <line x1="0" y1="0" x2="-8" y2="25" stroke={chainColor} strokeWidth="0.5" />
                <line x1="0" y1="0" x2="8" y2="25" stroke={chainColor} strokeWidth="0.5" />
                <line x1="0" y1="0" x2="0" y2="25" stroke={chainColor} strokeWidth="0.5" />
                
                {/* Pan Container - Counter-Rotate */}
                <g style={{ transform: `rotate(${-angle}deg)`, transformOrigin: '0 25px', transition: 'transform 1s ease-in-out' }}>
                    {/* The Plate */}
                    <path d="M-12 25 Q0 35 12 25" fill="#fbbf24" stroke={scaleColor} strokeWidth="1" />

                     {/* The Support Weight */}
                     {showSupport && (
                        <circle 
                            cx="0" cy="18" r="7" 
                            fill={supportColor} 
                            className="animate-drop-in"
                        />
                    )}
                </g>
            </g>
        </g>
      </svg>
    </div>
  );
};
