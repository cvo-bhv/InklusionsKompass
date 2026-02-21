import React, { useState } from 'react';
import { Search, Target, ListChecks, Users, RefreshCw, X, Info } from 'lucide-react';

interface Props {
  currentNodeId: string;
}

export const CycleDiagram: React.FC<Props> = ({ currentNodeId }) => {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  // Map node IDs to cycle stages (0-4)
  const getActiveStage = () => {
    switch(currentNodeId) {
      case 'fp-start': return 0; // Diagnose
      case 'fp-mandatory-check': return 0;
      case 'fp-step1-initiation': return 0;
      
      case 'fp-step2-contents': return 1; // Ziele
      
      // Even though steps are removed from flow, we map them conceptually for the diagram
      case 'fp-step3-additions': return 2; // Maßnahmen
      case 'fp-step4-team': return 3; // Team
      case 'fp-step5-sonderpaed': return 3;
      
      case 'fp-step6-evaluation': return 4; // Evaluation
      case 'fp-success': return 4;
      
      default: return 0;
    }
  };

  const activeStage = getActiveStage();

  const stages = [
    { 
      id: 0, 
      label: '1. Diagnose', 
      icon: Search, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-100', 
      border: 'border-indigo-600',
      description: 'Am Anfang steht die Bestandsaufnahme: Wo steht der/die Schüler:in? Was kann er/sie schon gut? Wo braucht er/sie Unterstützung? Nutze Beobachtungen, Arbeiten und Gespräche.'
    },
    { 
      id: 1, 
      label: '2. Ziele', 
      icon: Target, 
      color: 'text-blue-600', 
      bg: 'bg-blue-100', 
      border: 'border-blue-600',
      description: 'Formuliere klare, erreichbare Ziele (SMART). Was soll bis zum nächsten Check-up erreicht werden? Weniger ist oft mehr!'
    },
    { 
      id: 2, 
      label: '3. Maßnahmen', 
      icon: ListChecks, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-100', 
      border: 'border-emerald-600',
      description: 'Was tun wir konkret? Welche Methoden, Materialien oder Hilfsmittel setzen wir ein? Wer macht was?'
    },
    { 
      id: 3, 
      label: '4. Team', 
      icon: Users, 
      color: 'text-amber-600', 
      bg: 'bg-amber-100', 
      border: 'border-amber-600',
      description: 'Förderung ist keine One-Man-Show. Binde Fachlehrer:innen, Sonderpädagog:innen und vor allem die Eltern mit ein.'
    },
    { 
      id: 4, 
      label: '5. Evaluation', 
      icon: RefreshCw, 
      color: 'text-rose-600', 
      bg: 'bg-rose-100', 
      border: 'border-rose-600',
      description: 'Hat es funktioniert? Wir schauen uns die Ergebnisse an und passen den Plan an. Der Kreislauf beginnt von vorne.'
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-12 p-4">
      <div className="relative">
        {/* Connection Line (Circular-ish look via curved SVG or just lines) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          {stages.map((stage, index) => {
            const isActive = index === activeStage;
            const isPast = index < activeStage;
            const Icon = stage.icon;

            return (
              <button 
                key={stage.id} 
                onClick={() => setSelectedStage(stage.id)}
                className={`flex flex-col items-center transition-all duration-500 group cursor-pointer relative ${isActive ? 'scale-110' : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0'}`}
                title="Klicken für mehr Infos"
              >
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center border-4 z-10 bg-white shadow-sm transition-colors duration-300
                  ${isActive ? `${stage.border} ${stage.color} ${stage.bg}` : 'border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600'}
                  ${isPast ? `${stage.color} border-current` : ''}
                `}>
                  <Icon className={`w-8 h-8 ${isActive ? 'animate-pulse' : ''}`} />
                </div>
                <span className={`mt-3 font-bold text-sm ${isActive ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  {stage.label}
                </span>
                
                {/* Info Hint */}
                <div className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Info className="w-4 h-4 text-slate-400" />
                </div>

                {/* Arrow for mobile flow */}
                {index < stages.length - 1 && (
                  <div className="md:hidden text-slate-300 my-2">↓</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Evaluation Loop Back Arrow (Visual only) */}
        <div className="hidden md:block absolute -bottom-12 right-0 left-0 text-center">
            <div className="inline-flex flex-col items-center gap-1">
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-200 shadow-sm">
                  <RefreshCw className="w-3 h-3" />
                  Zyklus: Mindestens 1x jährlich
              </div>
            </div>
        </div>
      </div>

      {/* Info Modal */}
      {selectedStage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedStage(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedStage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${stages[selectedStage].bg} ${stages[selectedStage].color}`}>
                {React.createElement(stages[selectedStage].icon, { className: "w-6 h-6" })}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{stages[selectedStage].label}</h3>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              {stages[selectedStage].description}
            </p>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setSelectedStage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
