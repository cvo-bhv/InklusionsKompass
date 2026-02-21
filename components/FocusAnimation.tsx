import React from 'react';
import { Mood } from './Fritzchen';

interface Props {
  mood: Mood;
  className?: string;
}

export const FocusAnimation: React.FC<Props> = ({ mood, className = '' }) => {
  
  // -- COLORS --
  const paperColor = "#ffffff";
  const paperBorder = "#e2e8f0"; // Slate-200
  const lineContentColor = "#94a3b8"; // Slate-400 (The "Good" content)
  const errorColor = "#ef4444"; // Red (The errors)
  const lensRim = "#334155"; // Slate-700
  const lensGlass = "#bfdbfe"; // Blue-200 (semi-transparent)
  const starColor = "#fbbf24"; // Amber-400

  // -- STATE MAPPING --
  let showPaper = true;
  let showErrors = false;
  let showLens = false;
  let lensMoving = false;
  let showStar = false;

  switch (mood) {
    case 'wild': // Start
      // Just paper floating
      break;
    case 'distracted': // Need identified
    case 'worried': // Application
      showErrors = true; // Paper full of red marks
      break;
    case 'thinking': // Consultation / Checking
      showErrors = true;
      showLens = true; // Lens appears, examining
      break;
    case 'calm': // Decision made / Adaptation
      showErrors = true;
      showLens = true;
      lensMoving = true; // Lens moving, filtering
      break;
    case 'success': // Certificate
    case 'focused':
      showLens = true;
      showStar = true;
      showErrors = false; // Errors gone
      break;
    default:
      showPaper = true;
  }

  return (
    <div className={`relative w-40 h-40 ${className}`}>
      
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        
        {/* PAPER */}
        <g className="animate-float" style={{animationDuration: '4s'}}>
            <rect x="25" y="20" width="50" height="65" rx="2" fill={paperColor} stroke={paperBorder} strokeWidth="1" />
            
            {/* Content Lines (The actual performance) */}
            <g>
                <line x1="30" y1="30" x2="70" y2="30" stroke={lineContentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="40" x2="65" y2="40" stroke={lineContentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="50" x2="70" y2="50" stroke={lineContentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="60" x2="50" y2="60" stroke={lineContentColor} strokeWidth="2" strokeLinecap="round" />
                <line x1="30" y1="70" x2="60" y2="70" stroke={lineContentColor} strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* ERROR MARKS (The "Noise") */}
            {showErrors && (
                <g className={lensMoving ? 'animate-pulse-fade' : ''}>
                    {/* Random red squiggles or dots */}
                    <circle cx="35" cy="28" r="1.5" fill={errorColor} />
                    <path d="M45 42 L50 38" stroke={errorColor} strokeWidth="1" />
                    <circle cx="68" cy="52" r="1.5" fill={errorColor} />
                    <path d="M32 62 L40 62" stroke={errorColor} strokeWidth="1" strokeDasharray="1 1" />
                    <circle cx="55" cy="72" r="1.5" fill={errorColor} />
                </g>
            )}

            {/* GOLD STAR (Result) */}
            {showStar && (
                <g transform="translate(50, 50)" className="animate-drop-in">
                    <path 
                        d="M0 -15 L4 -5 L15 -5 L6 2 L9 13 L0 7 L-9 13 L-6 2 L-15 -5 L-4 -5 Z" 
                        fill={starColor} 
                        stroke="#b45309" 
                        strokeWidth="1"
                        className="animate-star-spin"
                        style={{animationDuration: '20s'}}
                     />
                </g>
            )}
        </g>

        {/* LENS (The Measure) */}
        {showLens && (
            <g className={lensMoving ? 'animate-lens-scan' : ''} style={{ transformOrigin: 'center' }}>
                {/* Handle */}
                <line x1="40" y1="60" x2="25" y2="80" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                
                {/* Glass Rim */}
                <circle cx="50" cy="50" r="18" fill={lensGlass} stroke={lensRim} strokeWidth="2" opacity="0.9" />
                
                {/* Reflection */}
                <path d="M42 42 Q50 38 58 42" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
            </g>
        )}

      </svg>
    </div>
  );
};
