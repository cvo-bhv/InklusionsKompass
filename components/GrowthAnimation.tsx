import React from 'react';
import { Mood } from './Fritzchen';

interface Props {
  mood: Mood; // We reuse the "Mood" type from Fritzchen to map logic easily
  className?: string;
}

export const GrowthAnimation: React.FC<Props> = ({ mood, className = '' }) => {
  
  // -- COLORS --
  const potColor = "#e11d48"; // Rose pot
  const potRimColor = "#be123c";
  const soilColor = "#57302c";
  const stemColor = "#15803d"; // Green
  const leafColor = "#22c55e"; // Lighter Green
  const flowerCenter = "#f59e0b"; // Yellow
  const flowerPetal = "#f43f5e"; // Pink/Red

  // -- STATE MAPPING --
  // We map the abstract "Moods" to plant growth stages
  let stage = 0; // 0: Seed/Dirt, 1: Sprout, 2: Growing, 3: Leaves, 4: Bloom
  let showWater = false;
  let showSun = false;

  switch (mood) {
    case 'wild': // Start
      stage = 0;
      break;
    case 'distracted': // Step 1
      stage = 1;
      break;
    case 'thinking': // Step 2 & 3
    case 'neutral':
      stage = 2;
      break;
    case 'focused': // Step 4 (Admin) & Special Info
      stage = 3; 
      break;
    case 'calm': // External help
      stage = 3;
      showWater = true;
      break;
    case 'success': // Done
      stage = 4;
      showSun = true;
      break;
    case 'worried': // Uncertainty
      stage = 2; // Growing but maybe swaying
      break;
    default:
      stage = 1;
  }

  // Helper to determine if we render parts
  const hasSprout = stage >= 1;
  const hasStem = stage >= 2;
  const hasLeaves = stage >= 3;
  const hasFlower = stage >= 4;

  return (
    <div className={`relative w-40 h-40 ${className}`}>
      
      {/* Optional: Thought Bubble or Label based on stage - REMOVED */}
      {/* {stage === 0 && (
         <div className="absolute -top-2 right-0 bg-white px-2 py-1 rounded-lg border border-slate-300 text-[10px] font-bold animate-bounce-slow shadow-sm z-40">
            Start
        </div>
      )}
      {stage === 1 && (
         <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded-lg border border-slate-300 text-[10px] font-bold animate-pulse shadow-sm z-40">
            Anfang...
        </div>
      )}
      {showWater && (
         <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded-lg border border-blue-200 text-blue-600 text-[10px] font-bold animate-pulse shadow-sm z-40">
            Support
        </div>
      )}
      {showSun && (
         <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded-lg border border-yellow-200 text-yellow-600 text-[10px] font-bold animate-bounce shadow-sm z-40">
            Erfolg!
        </div>
      )} */}


      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        
        {/* SUN (Success) */}
        {showSun && (
            <g className="animate-spin" style={{ animationDuration: '10s', transformOrigin: '85px 15px' }}>
                <circle cx="85" cy="15" r="8" fill="#fcd34d" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                    <line 
                        key={deg}
                        x1="85" y1="15" x2="85" y2="5" 
                        stroke="#fcd34d" strokeWidth="2"
                        transform={`rotate(${deg} 85 15)`} 
                    />
                ))}
            </g>
        )}

        {/* WATERING CAN (External Help) */}
        {showWater && (
            <g className="animate-water-pour" style={{ transformOrigin: '80px 30px' }}>
                <path d="M70 20 L90 20 L95 40 L65 40 Z" fill="#93c5fd" />
                <path d="M65 25 L55 35" stroke="#93c5fd" strokeWidth="3" /> {/* Spout */}
                <path d="M90 25 Q100 20 100 30 Q100 40 95 35" stroke="#93c5fd" strokeWidth="2" fill="none" /> {/* Handle */}
                
                {/* Drops */}
                <circle cx="50" cy="45" r="1.5" fill="#3b82f6" className="animate-bounce" style={{animationDelay: '0.1s'}} />
                <circle cx="52" cy="55" r="1.5" fill="#3b82f6" className="animate-bounce" style={{animationDelay: '0.3s'}} />
            </g>
        )}

        {/* PLANT GROUP */}
        <g className={mood === 'worried' ? 'animate-sway' : ''} style={{ transformOrigin: '50px 70px' }}>
            
            {/* 1. SPROUT */}
            {hasSprout && (
                <path 
                    d="M50 70 Q50 60 55 55" 
                    stroke={stemColor} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    fill="none" 
                    className="animate-grow-up origin-bottom"
                />
            )}
            {hasSprout && !hasStem && (
                <path d="M55 55 Q60 50 65 52 Q60 55 55 55" fill={leafColor} className="animate-bloom" />
            )}

            {/* 2. MAIN STEM GROWTH */}
            {hasStem && (
                <path 
                    d="M50 70 Q50 40 50 25" 
                    stroke={stemColor} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    fill="none" 
                    className="animate-grow-up origin-bottom"
                    style={{animationDuration: '1.5s'}}
                />
            )}

            {/* 3. LEAVES */}
            {hasLeaves && (
                <g className="animate-bloom" style={{animationDelay: '0.5s'}}>
                    {/* Left Leaf */}
                    <path d="M50 50 Q30 40 35 30 Q45 40 50 50" fill={leafColor} />
                    {/* Right Leaf */}
                    <path d="M50 40 Q70 30 65 20 Q55 30 50 40" fill={leafColor} />
                </g>
            )}

            {/* 4. FLOWER */}
            {hasFlower && (
                <g className="animate-bloom" style={{ transformOrigin: '50px 25px', animationDelay: '1s' }}>
                    {/* Petals */}
                    <circle cx="50" cy="15" r="6" fill={flowerPetal} />
                    <circle cx="60" cy="25" r="6" fill={flowerPetal} />
                    <circle cx="50" cy="35" r="6" fill={flowerPetal} />
                    <circle cx="40" cy="25" r="6" fill={flowerPetal} />
                    <circle cx="43" cy="18" r="6" fill={flowerPetal} />
                    <circle cx="57" cy="18" r="6" fill={flowerPetal} />
                    <circle cx="57" cy="32" r="6" fill={flowerPetal} />
                    <circle cx="43" cy="32" r="6" fill={flowerPetal} />
                    
                    {/* Center */}
                    <circle cx="50" cy="25" r="5" fill={flowerCenter} />
                </g>
            )}
        </g>

        {/* POT (Always Visible) */}
        <g>
            {/* Back rim */}
            <ellipse cx="50" cy="70" rx="20" ry="5" fill={soilColor} />
            {/* Body */}
            <path d="M30 70 L35 95 L65 95 L70 70 Z" fill={potColor} />
            {/* Front rim */}
            <path d="M28 70 L72 70 L72 75 L28 75 Z" fill={potRimColor} />
        </g>

      </svg>
    </div>
  );
};
