import React from 'react';
import { Mood } from './Fritzchen';

interface Props {
  mood: Mood;
  className?: string;
}

export const ShieldAnimation: React.FC<Props> = ({ mood, className = '' }) => {
  
  // -- COLORS --
  const shieldColorMain = "#3b82f6"; // Blue-500
  const shieldColorDark = "#1d4ed8"; // Blue-700
  const shieldRim = "#94a3b8"; // Slate-400 (Silver)
  const arrowColor = "#ef4444"; // Red (The threat/error)
  const starColor = "#fbbf24"; // Amber-400 (Success)

  // -- STATE MAPPING --
  let showShield = false;
  let showArrows = false;
  let showStar = false;
  let isShieldActive = false; // Is it blocking?

  switch (mood) {
    case 'wild': // Start
      showShield = true; // Hanging on wall (inactive)
      break;
    case 'distracted': // Need identified
    case 'worried': // Application
      showShield = true;
      showArrows = true;
      break;
    case 'thinking': // Consultation
      showShield = true;
      showArrows = true;
      isShieldActive = true;
      break;
    case 'calm': // Decision made
    case 'focused': // Exams
      showShield = true;
      showArrows = true;
      isShieldActive = true;
      showStar = true; // Star protected behind
      break;
    case 'success': // Certificate
      showShield = true;
      showStar = true;
      // No arrows, just glory
      break;
    default:
      showShield = true;
  }

  // Label - REMOVED
  // const getLabel = () => {
  //   if (mood === 'distracted' || mood === 'worried') return "Gefahr!";
  //   if (mood === 'thinking' || mood === 'calm') return "Schutz";
  //   if (mood === 'success') return "Geschafft!";
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
        
        {/* SHIELD GROUP */}
        {showShield && (
            <g className={isShieldActive ? 'animate-shield-pulse' : ''}>
                {/* Shield Shape */}
                <path 
                    d="M30 20 Q50 10 70 20 L70 50 Q70 80 50 90 Q30 80 30 50 Z" 
                    fill={shieldColorMain} 
                    stroke={shieldRim} 
                    strokeWidth="3"
                />
                {/* Shield Shine/Detail */}
                <path 
                    d="M30 20 Q50 10 50 20 L50 90 Q30 80 30 50 Z" 
                    fill={shieldColorDark} 
                    opacity="0.3"
                />
                <circle cx="50" cy="50" r="10" fill="white" opacity="0.2" />
            </g>
        )}

        {/* INCOMING ARROWS (The Threat) */}
        {showArrows && (
            <g>
                {/* Arrow 1 (Top) */}
                <g className="animate-arrow-fly" style={{animationDelay: '0s'}}>
                    <line x1="90" y1="30" x2="70" y2="30" stroke={arrowColor} strokeWidth="3" strokeLinecap="round" />
                    <path d="M70 30 L75 27 L75 33 Z" fill={arrowColor} />
                </g>
                {/* Arrow 2 (Bottom) */}
                <g className="animate-arrow-fly" style={{animationDelay: '0.8s'}}>
                    <line x1="95" y1="70" x2="75" y2="70" stroke={arrowColor} strokeWidth="3" strokeLinecap="round" />
                    <path d="M75 70 L80 67 L80 73 Z" fill={arrowColor} />
                </g>
                {/* Arrow 3 (Middle) */}
                <g className="animate-arrow-fly" style={{animationDelay: '1.5s'}}>
                    <line x1="100" y1="50" x2="80" y2="50" stroke={arrowColor} strokeWidth="3" strokeLinecap="round" />
                    <path d="M80 50 L85 47 L85 53 Z" fill={arrowColor} />
                </g>

                {/* Impact sparks on shield if active */}
                {isShieldActive && (
                    <g className="animate-impact-shake">
                         <circle cx="72" cy="30" r="2" fill="white" className="animate-ping" style={{animationDuration:'1s'}} />
                         <circle cx="72" cy="70" r="2" fill="white" className="animate-ping" style={{animationDuration:'1.2s'}} />
                    </g>
                )}
            </g>
        )}

        {/* STAR (Success/Competence protected) */}
        {showStar && (
            <g transform="translate(50, 50)" className={mood === 'success' ? 'animate-star-spin' : ''}>
                {/* Only show fully if success, otherwise peering from behind or on top */}
                {mood === 'success' ? (
                     // Big Star in front
                     <path 
                        d="M0 -15 L4 -5 L15 -5 L6 2 L9 13 L0 7 L-9 13 L-6 2 L-15 -5 L-4 -5 Z" 
                        fill={starColor} 
                        stroke="#b45309" 
                        strokeWidth="1"
                        transform="scale(1.5)"
                     />
                ) : (
                    // Small symbol on shield
                     <path 
                        d="M0 -10 L3 -3 L10 -3 L4 1 L6 8 L0 4 L-6 8 L-4 1 L-10 -3 L-3 -3 Z" 
                        fill="#fbbf24" 
                        opacity="0.8"
                     />
                )}
            </g>
        )}

      </svg>
    </div>
  );
};
