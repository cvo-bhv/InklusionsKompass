import React from 'react';
import { RoadmapNode as RoadmapNodeType, PathOption } from '../types';
import { ChevronRight, ExternalLink, Info, Undo2, ArrowDownRight, ArrowDownLeft, Ban, Calculator, BookOpen, Languages, Layers } from 'lucide-react';
import { Fritzchen } from './Fritzchen';
import { GrowthAnimation } from './GrowthAnimation';
import { BalanceAnimation } from './BalanceAnimation';
import { FocusAnimation } from './FocusAnimation';

interface Props {
  node: RoadmapNodeType;
  onSelectOption: (option: PathOption) => void;
  onBack: () => void;
  isActive: boolean;
  isPast: boolean;
  prevVariant?: string; // Color coming IN to this node
  currentVariant?: string; // Color going OUT of this node
  alignment: 'left' | 'right';
  id?: string;
}

export const RoadmapNode: React.FC<Props> = ({ 
  node, 
  onSelectOption, 
  onBack,
  isActive, 
  isPast,
  prevVariant,
  currentVariant,
  alignment,
  id
}) => {
  const [showDetails, setShowDetails] = React.useState(false);

  // Helper to map variant strings to Tailwind color classes for BORDERS/TEXT
  const getVariantColor = (variant?: string) => {
    switch(variant) {
      case 'success': return 'emerald-500';
      case 'danger': return 'red-500';
      case 'warning': return 'amber-500';
      case 'secondary': return 'slate-400';
      case 'primary': return 'blue-600';
      default: return 'gray-200';
    }
  };

  // Helper for BG classes (lines)
  const getVariantBg = (variant?: string) => {
    switch(variant) {
      case 'success': return 'bg-emerald-500';
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      case 'secondary': return 'bg-slate-400';
      case 'primary': return 'bg-blue-600';
      default: return 'bg-gray-200';
    }
  };

  // Styling based on node type (for the card border)
  const getCardBorderColor = () => {
    if (node.type === 'stop') return 'border-red-500';
    if (node.type === 'success') return 'border-emerald-500';
    if (isActive) return 'border-blue-600';
    return 'border-gray-200';
  };

  // Icon circle styling
  const getIconContainerStyle = () => {
    if (node.type === 'stop') return 'text-red-500 bg-red-50 border-red-200';
    if (node.type === 'success') return 'text-emerald-500 bg-emerald-50 border-emerald-200';
    if (isPast) {
        // If past, color based on the OUTGOING decision
        const color = getVariantColor(currentVariant);
        return `text-${color} bg-white border-${color}`;
    }
    if (isActive) return 'text-white bg-blue-600 border-blue-600 shadow-lg scale-110';
    return 'text-gray-400 bg-gray-50 border-gray-200';
  };

  // Get Icon for Subject Cards
  const getSubjectIcon = (key: string) => {
    switch(key) {
      case 'math': return <Calculator className="w-5 h-5" />;
      case 'german': return <BookOpen className="w-5 h-5" />;
      case 'english': return <Languages className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  }

  // Determine Fritzchen's mood based on narrative progress (Node IDs)
  const getFritzchenMood = () => {
    // 1. Dead ends
    if (node.type === 'stop') return 'sad';

    // 2. Narrative Arc
    switch(node.id) {
        // --- LERNZIELDIFFERENZ ---
        case 'start': return 'wild'; // Chaos at start
        
        // Initial Checks -> Distracted/Unsure
        case 'check-grade':
        case 'check-ekurs': 
            return 'distracted'; // Tipping chair
        
        // Actions/Resources -> Worried/Thinking
        case 'check-inner-diff':
        case 'info-tools':
            return 'worried'; // Is this enough?
        
        // Serious process -> Thinking/Deep work
        case 'check-foerderplan':
        case 'action-foerderplan':
        case 'check-rebuz':
        case 'action-rebuz':
            return 'thinking';

        // Decisions made -> Calming down
        case 'decision-parents':
        case 'decision-authority':
            return 'calm';

        // Final implementation -> Focused Work
        case 'final-implementation':
            return 'focused';
            
        // Success -> Happy / Working hard
        case 'practical-examples':
            return 'focused'; 
        
        // --- NACHTEILSAUSGLEICH ---
        case 'nta-start':
            return 'wild'; // Standard intro chaos
        
        case 'nta-step1-needs':
            return 'distracted'; // Student struggling/distracted in class implies need
            
        case 'nta-action-diagnostics':
            return 'worried'; // Medical/Psych context is worrying

        case 'nta-step2-application':
        case 'nta-step7-check-notenschutz':
            return 'thinking'; // Admin work / Evaluation

        case 'nta-step3-decision':
            return 'worried'; // Suspense waiting for decision

        case 'nta-step4-measures':
        case 'nta-step5-communication':
        case 'nta-info-notenschutz':
            return 'calm'; // Solutions found, relief

        case 'nta-step6-exams':
            return 'focused'; // Taking exam with NTA support

        case 'nta-success':
            return 'success'; // Process complete

        // --- NOTENSCHUTZ ---
        case 'ns-start': return 'wild';
        case 'ns-step1-application': return 'thinking';
        case 'ns-step2-consultation': return 'worried';
        case 'ns-step3-info': return 'distracted'; // Checking details
        case 'ns-step4-check-grade': return 'neutral';
        case 'ns-grade4-rules':
        case 'ns-grade5to9-rules':
        case 'ns-graduation-rules':
             return 'worried';
        case 'ns-step7-binding': return 'sad'; // Strict rule
        case 'ns-step8-notification': return 'thinking';
        case 'ns-step9-adaptation': return 'focused';
        case 'ns-step10-certificate': return 'success';

        // --- FÖRDERPLANUNG (FP) ---
        // These will be used by GrowthAnimation, but the mood naming still applies logically
        case 'fp-start': return 'wild'; // Seed
        case 'fp-step1-initiation': return 'distracted'; // Sprout
        case 'fp-step2-contents': return 'thinking'; // Stem growing
        case 'fp-step3-additions': return 'focused'; // Leaves
        case 'fp-step4-team': return 'calm'; // Watering Can (Team Support)
        case 'fp-step5-sonderpaed': return 'focused'; // Leaves
        case 'fp-step6-evaluation': return 'focused'; // Bud
        case 'fp-success': return 'success'; // Flower

        default: return 'neutral';
    }
  };

  // Check if we should use special animations
  const isFoerderplanung = node.id.startsWith('fp-');
  const isNachteilsausgleich = node.id.startsWith('nta-');
  const isNotenschutz = node.id.startsWith('ns-');

  // Content Card Component to avoid duplication
  const ContentCard = () => (
    <div className={`relative bg-white p-6 rounded-xl shadow-sm border-t-4 ${getCardBorderColor()} transition-all duration-500 ${isActive ? 'translate-x-0 opacity-100 shadow-md ring-1 ring-blue-600/10' : ''}`}>
      
      {/* Back Button (Only for active node and not start) */}
      {isActive && node.id !== 'start' && node.id !== 'nta-start' && node.id !== 'ns-start' && node.id !== 'fp-start' && (
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs font-medium"
          title="Einen Schritt zurück"
        >
          <Undo2 className="w-4 h-4" />
          <span className="hidden sm:inline">Zurück</span>
        </button>
      )}

      <h3 className="text-xl font-bold text-gray-800 mb-2 pr-8">{node.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap">{node.content}</p>

      {/* Bullet Points with Staggered Animation */}
      {node.bulletPoints && (
        <ul className="space-y-3 mb-6">
          {node.bulletPoints.map((point, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-3 text-gray-700 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${idx * 300}ms`, animationFillMode: 'forwards' }}
            >
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-sm" />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Structured Examples Grid */}
      {node.examples && (
        <div className="grid grid-cols-1 gap-3 mb-5">
          {node.examples.map((ex, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2 text-slate-700 font-bold border-b border-slate-200 pb-2">
                <span className="text-blue-500 bg-blue-50 p-1.5 rounded-md">
                   {getSubjectIcon(ex.iconKey)}
                </span>
                {ex.subject}
              </div>
              <ul className="space-y-1.5">
                {ex.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-green-500 mt-1 shrink-0 text-[10px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Details Toggle */}
      {node.details && (
        <div className="mb-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-blue-600 font-medium flex items-center hover:underline focus:outline-none"
          >
            <Info className="w-4 h-4 mr-1" />
            {showDetails ? 'Erläuterung verbergen' : 'Erläuterung anzeigen'}
          </button>
          {showDetails && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-700 border border-slate-200 whitespace-pre-wrap animate-fade-in-up">
              {node.details}
              {node.externalLink && (
                <a href={node.externalLink} target="_blank" rel="noreferrer" className="flex items-center mt-2 text-blue-600 hover:text-blue-700 font-semibold">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Offizielles Dokument öffnen
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Action Buttons (The Fork) */}
      {isActive && node.options && (
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Wie geht es weiter?</p>
          <div className="flex flex-wrap gap-3">
            {node.options.map((option) => {
              // Determine direction icon based on variant to simulate path branching
              const isNegative = option.variant === 'danger' || option.variant === 'secondary' || option.variant === 'warning';
              const ArrowIcon = isNegative ? ArrowDownLeft : ArrowDownRight;
              
              return (
                <button
                  key={option.nextId}
                  onClick={() => onSelectOption(option)}
                  className={`
                    relative pl-4 pr-5 py-3 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2 border-b-4 active:border-b-0 active:translate-y-1 text-left
                    ${option.variant === 'primary' ? 'bg-blue-600 text-white border-blue-800 hover:bg-blue-700' : ''}
                    ${option.variant === 'secondary' ? 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300' : ''}
                    ${option.variant === 'success' ? 'bg-emerald-500 text-white border-emerald-700 hover:bg-emerald-600' : ''}
                    ${option.variant === 'danger' ? 'bg-red-500 text-white border-red-700 hover:bg-red-600' : ''}
                    ${option.variant === 'warning' ? 'bg-amber-500 text-white border-amber-700 hover:bg-amber-600' : ''}
                    ${!option.variant ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200' : ''}
                  `}
                >
                  {/* Visual separator/branch icon */}
                  <div className="bg-white/20 p-1 rounded-md shrink-0">
                    <ArrowIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold">{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const StatusText = () => (
    <div className={`hidden md:flex flex-col justify-center pt-6 ${alignment === 'left' ? 'items-start pl-8' : 'items-end pr-8 text-right'}`}>
      {isActive && (
        <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-2">
          {alignment === 'right' && (
             <>
               Aktueller Standort
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
               </span>
             </>
          )}
          {alignment === 'left' && (
             <>
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
               </span>
               Aktueller Standort
             </>
          )}
        </div>
      )}
      <div className="text-sm text-gray-400 font-medium">{isPast ? 'Erledigt' : ''}</div>
    </div>
  );

  const renderAnimation = () => {
    const mood = getFritzchenMood();
    
    if (isFoerderplanung) {
      return <GrowthAnimation mood={mood} className="md:mr-4 scale-75 md:scale-100 origin-bottom-right" />;
    }
    
    if (isNachteilsausgleich) {
      return <BalanceAnimation mood={mood} className="md:mr-4 scale-75 md:scale-100 origin-bottom-right" />;
    }

    if (isNotenschutz) {
      return <FocusAnimation mood={mood} className="md:mr-4 scale-75 md:scale-100 origin-bottom-right" />;
    }

    return <Fritzchen mood={mood} className="md:mr-4 scale-75 md:scale-100 origin-bottom-right" />;
  };

  return (
    <div id={id} className={`relative pl-8 md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] gap-4 group min-h-[85vh] scroll-mt-32 ${isPast ? 'opacity-80 transition-opacity' : ''} animate-fade-in-up`}>
      
      {/* 
         LAYOUT LOGIC 
         Mobile: Everything is stacked. The `pl-8` on the container handles indentation for the timeline line.
         Desktop: 3 columns. Center is timeline. Left/Right depends on alignment prop.
      */}

      {/* LEFT COLUMN */}
      <div className={`md:pb-16 pt-2 md:pr-8 md:pl-0 flex flex-col justify-start relative ${alignment === 'left' ? '' : ''}`}>
        
        {/* Helper Animation (Fritzchen, Plant, or Balance) */}
        {isActive && (
            <div className={`
                absolute md:static z-20 
                /* Mobile positioning: top right of this column container */
                md:flex md:justify-end md:items-start
                -top-12 left-0 
            `}>
                {renderAnimation()}
            </div>
        )}

        {alignment === 'left' ? <ContentCard /> : <StatusText />}
      </div>

      {/* CENTER COLUMN (Timeline) */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center md:static">
        
        {/* Top Line (Connection from previous) */}
        <div 
          className={`w-1 grow ${prevVariant ? getVariantBg(prevVariant) : 'bg-transparent'}`} 
          style={{minHeight: '2rem', borderTopLeftRadius: '99px', borderTopRightRadius: '99px'}}
        ></div>
        
        {/* The Node Icon & Horizontal Connectors */}
        <div className="relative z-10 flex items-center justify-center">
            
            {/* Horizontal Connector Arm (Desktop only) */}
            <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-1 w-8 bg-gray-200 -z-10 ${alignment === 'left' ? 'right-1/2 w-12' : 'left-1/2 w-12'} ${isPast ? getVariantBg(prevVariant) : 'bg-gray-200'}`}></div>

            <div className={`w-12 h-12 rounded-full border-4 transition-all duration-300 flex items-center justify-center ${getIconContainerStyle()}`}>
                {node.icon}
            </div>
        </div>
        
        {/* Bottom Line (Connection to next) */}
        <div 
          className={`w-1 grow ${isPast && currentVariant ? getVariantBg(currentVariant) : 'bg-gray-100'}`} 
          style={{minHeight: '2rem', opacity: isPast ? 1 : 0.5}}
        ></div>
      </div>

      {/* RIGHT COLUMN */}
      <div className={`pb-12 md:pb-16 pt-2 pl-4 md:pl-8 flex flex-col justify-start`}>
        {/* On mobile, we always render the content here because Grid is disabled */}
        <div className="md:hidden">
            <ContentCard />
        </div>
        
        {/* On Desktop, only render if alignment is right */}
        <div className="hidden md:block w-full">
            {alignment === 'right' ? <ContentCard /> : <StatusText />}
        </div>
      </div>

    </div>
  );
};