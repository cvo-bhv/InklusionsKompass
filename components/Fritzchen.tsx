import React from 'react';

// Expanded moods to reflect the journey
export type Mood = 'wild' | 'distracted' | 'worried' | 'thinking' | 'calm' | 'focused' | 'success' | 'sad' | 'neutral';

interface Props {
  mood: Mood;
  className?: string;
}

export const Fritzchen: React.FC<Props> = ({ mood, className = '' }) => {
  
  // -- COLORS --
  const skinColor = "#ffedd5";
  const hoodieColor = "#3b82f6";
  const hoodieDark = "#1d4ed8";
  const pantsColor = "#334155";
  const hairColor = "#78350f";
  const deskColor = "#bfdbfe";
  const chairColor = "#94a3b8";

  // -- SCENE DETERMINATION --
  let scene = 'standing';
  if (mood === 'wild') scene = 'wild'; 
  // Sitting states
  if (mood === 'distracted' || mood === 'worried' || mood === 'thinking' || mood === 'focused' || mood === 'calm') scene = 'sitting';
  
  const isNeat = mood === 'focused' || mood === 'success' || mood === 'calm';

  // -- SVG PARTS --

  const Head = ({ rotate = 0, expression = 'neutral' }: { rotate?: number, expression?: string }) => (
    <g transform={`rotate(${rotate} 50 40)`}>
      {/* Neck */}
      <path d="M45 55 L55 55 L55 65 L45 65 Z" fill={skinColor} />
      
      {/* Face Base */}
      <circle cx="50" cy="40" r="16" fill={skinColor} />
      
      {/* Hair */}
      {isNeat ? (
        // Neater Hair (Combed)
        <path d="M34 35 Q34 20 50 18 Q66 20 66 35 Q66 28 50 25 Q34 28 34 35" fill={hairColor} />
      ) : (
        // Messy Hair
        <>
          <path d="M32 35 Q30 20 50 18 Q70 20 68 35 Q68 25 50 22 Q32 25 32 35" fill={hairColor} />
          <path d="M45 18 Q50 10 58 18" stroke={hairColor} strokeWidth="2" fill="none" /> 
        </>
      )}

      {/* Eyes */}
      <g className={expression === 'distracted' ? 'animate-eyes-move' : ''}>
        {expression === 'wild' ? (
          <>
            <circle cx="44" cy="38" r="3" fill="white" />
            <circle cx="44" cy="38" r="1" fill="black" />
            <circle cx="56" cy="38" r="4" fill="white" />
            <circle cx="56" cy="38" r="1.5" fill="black" />
          </>
        ) : expression === 'focused' ? (
          <>
             {/* Narrowed eyes / Focused */}
            <circle cx="44" cy="38" r="2" fill="#1e293b" />
            <circle cx="56" cy="38" r="2" fill="#1e293b" />
            {/* Eyebrows focused */}
            <path d="M42 34 L46 35" stroke="#1e293b" strokeWidth="1" />
            <path d="M58 34 L54 35" stroke="#1e293b" strokeWidth="1" />
          </>
        ) : (
          <>
            <circle cx="44" cy="38" r="2" fill="#1e293b" />
            <circle cx="56" cy="38" r="2" fill="#1e293b" />
            {expression === 'thinking' && <path d="M40 34 L48 36" stroke="#1e293b" strokeWidth="1" />}
            {expression === 'worried' && (
                <>
                <path d="M40 34 L46 32" stroke="#1e293b" strokeWidth="1" />
                <path d="M54 32 L60 34" stroke="#1e293b" strokeWidth="1" />
                </>
            )}
          </>
        )}
      </g>

      {/* Mouth */}
      {expression === 'wild' ? (
        <path d="M45 48 Q50 52 55 48" stroke="#1e293b" strokeWidth="2" fill="none" />
      ) : expression === 'worried' || expression === 'sad' ? (
        <path d="M45 48 Q50 44 55 48" stroke="#1e293b" strokeWidth="2" fill="none" />
      ) : expression === 'focused' ? (
         // Tongue sticking out slightly - concentration
         <path d="M48 48 Q50 53 52 48" fill="#fda4af" stroke="#fda4af" strokeWidth="1"/> 
      ) : expression === 'calm' || expression === 'success' ? (
         // Smile
         <path d="M44 48 Q50 52 56 48" stroke="#1e293b" strokeWidth="2" fill="none" />
      ) : (
        <path d="M46 48 Q50 50 54 48" stroke="#1e293b" strokeWidth="2" fill="none" />
      )}
    </g>
  );

  // -- RENDER SCENES --

  // 1. SCENE: WILD (Start)
  if (scene === 'wild') {
    return (
      <div className={`relative w-40 h-40 ${className}`}>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full border border-gray-300 shadow-sm animate-throw-paper z-50"></div>
        {/* <div className="absolute -top-2 right-0 bg-white px-2 py-1 rounded-lg border border-slate-300 text-[10px] font-bold animate-bounce-slow shadow-sm z-40">
            Waaaah!
        </div> */}
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible animate-run-wild">
           <g>
              <path d="M40 60 Q30 70 20 60" stroke={hoodieColor} strokeWidth="6" strokeLinecap="round" />
              <path d="M45 80 L35 100" stroke={pantsColor} strokeWidth="8" strokeLinecap="round" />
              <path d="M55 80 L65 95" stroke={pantsColor} strokeWidth="8" strokeLinecap="round" />
              <ellipse cx="35" cy="102" rx="5" ry="3" fill="#333" />
              <ellipse cx="65" cy="97" rx="5" ry="3" fill="#333" />
              <rect x="35" y="55" width="30" height="30" rx="5" fill={hoodieColor} />
              <Head expression="wild" rotate={-5} />
              <path d="M60 60 Q80 50 90 40" stroke={hoodieColor} strokeWidth="6" strokeLinecap="round" />
              <circle cx="90" cy="40" r="3" fill={skinColor} />
           </g>
        </svg>
      </div>
    );
  }

  // 2. SCENE: SITTING (Checking / Thinking / Focused)
  if (scene === 'sitting') {
    // Is he tipping the chair? Only if distracted or worried.
    const isTipping = mood === 'distracted' || mood === 'worried';
    const isFocused = mood === 'focused' || mood === 'calm';
    const isMessy = mood === 'distracted' || mood === 'worried';

    return (
      <div className={`relative w-40 h-40 ${className}`}>
        {/* {mood === 'thinking' && <div className="absolute top-0 right-4 text-slate-400 text-xl font-bold animate-pulse">?</div>}
        {mood === 'distracted' && <div className="absolute top-4 -right-2 text-slate-400 text-xs font-bold animate-pulse">Langweilig...</div>}
        {mood === 'focused' && <div className="absolute top-2 right-2 text-green-500 text-xs font-bold animate-pulse">Aha!</div>} */}

        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          
          {/* Chair */}
          <g className={isTipping ? 'animate-chair-tip' : ''} style={{transformOrigin: 'bottom center'}}>
             <path d="M25 50 L25 80" stroke={chairColor} strokeWidth="4" />
             <rect x="20" y="50" width="10" height="20" rx="2" fill="#64748b" />
             <path d="M30 80 L30 100" stroke={chairColor} strokeWidth="3" />
             <path d="M50 80 L50 100" stroke={chairColor} strokeWidth="3" />
             <path d="M25 80 L55 80" stroke={chairColor} strokeWidth="4" />
             
             {/* Body */}
             {/* If focused, sit up straight and closer. If distracted, slouch back. */}
             <path d="M35 80 L35 95" stroke={pantsColor} strokeWidth="8" strokeLinecap="round" />
             <rect 
                x={isFocused ? 32 : 30} 
                y={isFocused ? 53 : 55} 
                width="25" 
                height="28" 
                rx="4" 
                fill={hoodieColor} 
                className={isFocused ? 'animate-breathe' : ''}
             />
             
             <g className={isFocused ? '' : 'animate-head-bob'}>
                <Head 
                    expression={mood} 
                    rotate={isFocused ? 12 : 0} /* Lean forward if focused */
                />
             </g>

             {/* Arm */}
             {isFocused ? (
                // Writing Arm
                 <g className="animate-write-hand" style={{transformOrigin: '65px 75px'}}>
                    <path d="M45 60 L65 80" stroke={hoodieColor} strokeWidth="6" strokeLinecap="round" />
                    <circle cx="65" cy="80" r="3" fill={skinColor} />
                    <line x1="65" y1="80" x2="65" y2="70" stroke="#1e293b" strokeWidth="2" /> {/* Pen */}
                 </g>
             ) : (
                // Passive Arm
                <>
                 <path d="M45 60 L65 75" stroke={hoodieColor} strokeWidth="6" strokeLinecap="round" />
                 <circle cx="65" cy="75" r="3" fill={skinColor} />
                 {mood === 'distracted' && <line x1="65" y1="75" x2="65" y2="65" stroke="orange" strokeWidth="2" className="animate-bounce" />}
                </>
             )}
          </g>

          {/* Desk */}
          <path d="M50 80 L100 80 L90 95 L50 95 Z" fill={deskColor} stroke="#93c5fd" strokeWidth="1" />
          <path d="M55 95 L55 100" stroke="#64748b" strokeWidth="3" />
          <path d="M95 95 L95 100" stroke="#64748b" strokeWidth="3" />

          {/* Desk Items */}
          {/* Books if focused/calm */}
          {(isFocused || mood === 'thinking') && (
            <g transform="translate(85, 82)">
                <rect x="0" y="0" width="12" height="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="0.5" />
                <rect x="1" y="-3" width="10" height="3" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="0.5" />
            </g>
          )}

          {/* Crumpled paper if messy */}
          {isMessy && (
             <path d="M85 90 Q82 88 84 86 Q86 84 88 86 Q90 88 88 90 Q86 92 85 90" fill="white" stroke="#cbd5e1" strokeWidth="1" />
          )}

          {/* Main Paper */}
          <rect 
             x="60" 
             y="82" 
             width="20" 
             height="10" 
             fill="white" 
             transform={isFocused ? "rotate(0 70 87)" : "rotate(-5 70 87)"} 
             stroke={isFocused ? "#cbd5e1" : "none"}
             strokeWidth={0.5}
          />
          {/* Lines on paper if focused */}
          {isFocused && (
             <g opacity="0.5">
                 <line x1="62" y1="84" x2="78" y2="84" stroke="black" strokeWidth="0.5" />
                 <line x1="62" y1="87" x2="78" y2="87" stroke="black" strokeWidth="0.5" />
                 <line x1="62" y1="90" x2="75" y2="90" stroke="black" strokeWidth="0.5" />
             </g>
          )}

        </svg>
      </div>
    );
  }

  // 3. SCENE: STANDING (Default / Stop / Success)
  return (
    <div className={`relative w-40 h-40 ${className}`}>
        {mood === 'success' && (
            <div className="absolute -top-4 right-0 text-3xl animate-bounce">🎓</div>
        )}
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible animate-float">
         <path d="M40 80 L40 100" stroke={pantsColor} strokeWidth="9" strokeLinecap="round" />
         <path d="M60 80 L60 100" stroke={pantsColor} strokeWidth="9" strokeLinecap="round" />
         <path d="M36 102 L44 102 Q46 100 40 98 Z" fill="#333" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
         <path d="M56 102 L64 102 Q66 100 60 98 Z" fill="#333" stroke="#333" strokeWidth="4" strokeLinecap="round"/>

         <rect x="30" y="50" width="40" height="35" rx="5" fill={hoodieColor} />
         <path d="M40 75 L60 75 L55 85 L45 85 Z" fill={hoodieDark} opacity="0.5" />

         {mood === 'success' ? (
             // Success / Arms up / Thumbs up
             <>
                <path d="M32 55 Q20 40 10 30" stroke={hoodieColor} strokeWidth="7" strokeLinecap="round" fill="none" />
                <circle cx="10" cy="30" r="4" fill={skinColor} />
                <path d="M68 55 Q80 40 90 30" stroke={hoodieColor} strokeWidth="7" strokeLinecap="round" fill="none" />
                <circle cx="90" cy="30" r="4" fill={skinColor} />
             </>
         ) : (
             // Sad / Default
             <>
                <path d="M32 55 Q20 70 35 80" stroke={hoodieColor} strokeWidth="7" strokeLinecap="round" fill="none" />
                <path d="M68 55 Q80 70 65 80" stroke={hoodieColor} strokeWidth="7" strokeLinecap="round" fill="none" />
             </>
         )}

         <Head expression={mood === 'sad' ? 'sad' : isNeat ? 'calm' : 'neutral'} rotate={mood === 'sad' ? 10 : 0} />
      </svg>
    </div>
  );
};