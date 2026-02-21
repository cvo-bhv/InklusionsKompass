import React, { useState, useRef, useEffect } from 'react';
import { roadmapData } from './data/roadmapData';
import { RoadmapNode } from './components/RoadmapNode';
import { GeminiIdeasGenerator } from './components/GeminiIdeasGenerator';
import { PracticalExamplesModal } from './components/PracticalExamplesModal';
import { InfoModal } from './components/InfoModal';
import { PrintChecklistModal } from './components/PrintChecklistModal';
import { CycleDiagram } from './components/CycleDiagram';
import { StartScreen } from './components/StartScreen';
import { HistoryItem, PathOption } from './types';
import { checklistData } from './data/checklistData';
import { RefreshCcw, Map, Lightbulb, Scale, FileText, ClipboardList, Shield, GraduationCap, Construction, Stethoscope, Target, Maximize, Minimize, Printer } from 'lucide-react';

type TabId = 'foerderplanung' | 'lernzieldifferenz' | 'nachteilsausgleich' | 'notenschutz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('foerderplanung');
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Info Modal State
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoModalData, setInfoModalData] = useState({ title: '', content: '' });

  // Print Modal State
  const [printModalOpen, setPrintModalOpen] = useState(false);

  const openInfoModal = (title: string, content: string) => {
    setInfoModalData({ title, content });
    setInfoModalOpen(true);
  };

  // -- Roadmap Logic --
  // Initial history depends on the active tab, but we set a default here.
  // We handle the tab switch resetting in the handler below.
  const [history, setHistory] = useState<HistoryItem[]>([{ nodeId: 'start', alignment: 'right' }]);
  const [showExamples, setShowExamples] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    // Reset history based on the selected tab
    if (tab === 'lernzieldifferenz') {
      setHistory([{ nodeId: 'start', alignment: 'right' }]);
    } else if (tab === 'nachteilsausgleich') {
      setHistory([{ nodeId: 'nta-start', alignment: 'right' }]);
    } else if (tab === 'notenschutz') {
      setHistory([{ nodeId: 'ns-start', alignment: 'right' }]);
    } else if (tab === 'foerderplanung') {
      setHistory([{ nodeId: 'fp-start', alignment: 'right' }]);
    } else {
      setHistory([]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOptionSelect = (option: PathOption) => {
    let nextAlignment: 'left' | 'right' = 'right';
    if (['danger', 'warning', 'secondary'].includes(option.variant || '')) {
      nextAlignment = 'left';
    } else {
      nextAlignment = 'right';
    }

    const updatedHistory = [...history];
    updatedHistory[updatedHistory.length - 1].selectedOptionLabel = option.label;
    
    updatedHistory.push({ nodeId: option.nextId, alignment: nextAlignment });
    setHistory(updatedHistory);
  };

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const resetPath = () => {
    if (activeTab === 'nachteilsausgleich') {
        setHistory([{ nodeId: 'nta-start', alignment: 'right' }]);
    } else if (activeTab === 'notenschutz') {
        setHistory([{ nodeId: 'ns-start', alignment: 'right' }]);
    } else if (activeTab === 'foerderplanung') {
        setHistory([{ nodeId: 'fp-start', alignment: 'right' }]);
    } else {
        setHistory([{ nodeId: 'start', alignment: 'right' }]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Scroll to the latest node
    // Only scroll if we have more than just the start node (length > 1)
    // This prevents annoying scrolling to "Dein Start" when switching tabs
    if (history.length > 1) {
      const lastIndex = history.length - 1;
      const element = document.getElementById(`node-${lastIndex}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [history.length, activeTab]);

  const getDecisionVariant = (index: number) => {
    if (index >= history.length - 1) return undefined;
    const item = history[index];
    const node = roadmapData[item.nodeId];
    if (!node || !node.options) return undefined;
    const selectedOption = node.options.find(opt => opt.label === item.selectedOptionLabel);
    return selectedOption?.variant || 'primary';
  };

  // -- Tabs Configuration --
  const tabs = [
    { id: 'foerderplanung', label: '1. Förderplanung', icon: ClipboardList, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'lernzieldifferenz', label: '2. Lernzieldifferenz', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'nachteilsausgleich', label: '3. Nachteilsausgleich', icon: Scale, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'notenschutz', label: '4. Notenschutz', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const showRoadmap = true; // All tabs now have roadmaps

  const handleStart = () => {
    setShowStartScreen(false);
    setActiveTab('foerderplanung');
    setHistory([{ nodeId: 'fp-start', alignment: 'right' }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTopic = (tab: TabId) => {
    setShowStartScreen(false);
    handleTabChange(tab);
  };

  if (showStartScreen) {
    return (
      <StartScreen 
        onStart={handleStart} 
        onSelectTopic={handleSelectTopic} 
        toggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20 overflow-x-hidden">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Top Bar */}
          <div className="py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowStartScreen(true)}>
              <div className="bg-primary p-2 rounded-lg text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight text-slate-800">Inklusions-Kompass</h1>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">Wegweiser für den Schulalltag</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer"
                type="button"
                title={isFullscreen ? "Vollbildmodus beenden" : "Vollbildmodus"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Verkleinern' : 'Vollbild'}</span>
              </button>

              {showRoadmap && (
                <button 
                    onClick={resetPath}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg cursor-pointer"
                    type="button"
                >
                    <RefreshCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">Neustart</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-1 -mb-px hide-scrollbar pb-1 sm:pb-0">
             {tabs.map((tab) => {
               const Icon = tab.icon;
               const isActive = activeTab === tab.id;
               return (
                 <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as TabId)}
                    className={`
                      flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                      ${isActive 
                        ? `border-blue-600 ${tab.color} bg-slate-50` 
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }
                    `}
                 >
                    <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
                    {tab.label}
                 </button>
               )
             })}
          </div>

        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* SHARED VIEW: Roadmap Logic (used for both tabs) */}
        {showRoadmap && (
          <div className="animate-fade-in-up">
            
            {/* Conditional Intro Cards based on active tab */}
            {/* Always show the intro card for the active tab, regardless of history length */}
            {true && (
              <>
              {activeTab === 'foerderplanung' && (
                  /* Intro Card: Förderplanung */
                  <div className="mb-10 bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Förderplanung (§11)</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="text-indigo-100 mb-4 font-medium">
                          Dieser Leitfaden bezieht sich auf Förderpläne, die bei individuellen Lernschwierigkeiten erstellt werden müssen.
                        </p>
                        <p className="text-indigo-200 text-sm mb-4 italic">
                          Hinweis: Die verpflichtenden Förderpläne für Schüler:innen mit sonderpädagogischem Förderbedarf werden weiterhin von den Sonderpädagog:innen erstellt.
                        </p>
                        <ul className="text-sm text-indigo-50 space-y-2 list-disc list-inside">
                          <li><strong>Grundsatz:</strong> Bei Anzeichen für besonderen individuellen Förderbedarf (§11).</li>
                          <li><strong>Verpflichtend bei Schüler:in mit:</strong>
                            <ul className="list-disc list-inside ml-4 mt-1 opacity-90 space-y-1">
                                <li>Sonderpädagogischem Förderbedarf</li>
                                <li>Lernzieldifferenz (§19)</li>
                                <li>Nachteilsausgleich (§16)</li>
                                <li>Notenschutz (§§ 17,18)</li>
                                <li>LRS / Rechenschwäche / Autismus</li>
                                <li>Übergang aus Vorbereitungskursen (§7)</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                         <a 
                           href="https://www.transparenz.bremen.de/metainformationen/bremische-verordnung-ueber-die-inklusive-bildung-an-oeffentlichen-schulen-breminbilv-vom-12-juni-2025-283946?asl=bremen203_tpgesetz.c.55340.de&template=20_gp_ifg_meta_detail_d#jlr-InklSchulVBRpP11"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20"
                         >
                           <ClipboardList className="w-4 h-4" />
                           §11 BremInBilV
                         </a>
                         <button 
                           onClick={() => openInfoModal('Diagnostik & Ziele', 'Eine fundierte Diagnostik ist die Basis. Ziele müssen SMART formuliert sein (Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert).')}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                         >
                           <Target className="w-4 h-4" />
                           Diagnostik & Ziele
                         </button>
                         <button 
                           onClick={() => setPrintModalOpen(true)}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                         >
                           <Printer className="w-4 h-4" />
                           Checkliste
                         </button>
                      </div>
                    </div>
                  </div>
              )}
              {activeTab === 'foerderplanung' && (
                <CycleDiagram currentNodeId={history[history.length - 1].nodeId} />
              )}
              {activeTab === 'lernzieldifferenz' && (
                  /* Intro Card: Lernzieldifferenz */
                  <div className="mb-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Lernzieldifferenz (§19)</h2>
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="flex-1">
                         <p className="text-blue-100 mb-4 font-medium">
                           Abweichung von den Standards des Bildungsplans.
                         </p>
                         <ul className="text-sm text-blue-50 space-y-2 list-disc list-inside">
                           <li><strong>Voraussetzung:</strong> Individueller Förderplan liegt vor, Standards können trotz Förderung nicht erreicht werden.</li>
                           <li><strong>Zielgruppe:</strong> Vorwiegend Jahrgänge 5 bis 8 (und Grundschule).</li>
                           <li><strong>Einschränkung:</strong> Ab Jg. 7 nur in Fächern <em>ohne</em> Fachleistungsdifferenzierung oder im G-Kurs (Grundlegendes Niveau). <strong>Nicht im E-Kurs!</strong></li>
                           <li><strong>Folge:</strong> Kompetenzbeschreibung statt Note im Zeugnis.</li>
                         </ul>
                      </div>
                      
                      <div className="flex flex-col gap-2 shrink-0">
                         <button 
                            onClick={() => setShowExamples(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/20 text-left"
                          >
                            <Lightbulb className="w-4 h-4" />
                            Praxisbeispiele
                          </button>
                          <a 
                            href="https://www.transparenz.bremen.de/metainformationen/bremische-verordnung-ueber-die-inklusive-bildung-an-oeffentlichen-schulen-breminbilv-vom-12-juni-2025-283946?template=20_gp_ifg_meta_detail_d#jlr-InklSchulVBRpP19" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/20 text-left"
                          >
                            <FileText className="w-4 h-4" />
                            Verordnung §19
                          </a>
                          <a 
                            href="https://www.transparenz.bremen.de/metainformationen/verordnung-ueber-die-sekundarstufe-i-der-oberschule-vom-26-juni-2009-282096?asl=bremen203_tpgesetz.c.55340.de&template=20_gp_ifg_meta_detail_d#jlr-OSchulSekIVBR2009V7P8" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/20 text-left"
                          >
                            <FileText className="w-4 h-4" />
                            Binnendifferenzierung (§8)
                          </a>
                          <button 
                            onClick={() => setPrintModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                          >
                            <Printer className="w-4 h-4" />
                            Checkliste
                          </button>
                      </div>
                    </div>
                  </div>
              )}
              {activeTab === 'nachteilsausgleich' && (
                  /* Intro Card: Nachteilsausgleich */
                  <div className="mb-10 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Nachteilsausgleich (§15 & §16)</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="text-emerald-100 mb-4 font-medium">
                          Zielgleiche Förderung durch Anpassung der äußeren Bedingungen.
                        </p>
                        <ul className="text-sm text-emerald-50 space-y-2 list-disc list-inside">
                           <li><strong>Prinzip:</strong> Die fachlichen Anforderungen bleiben gleich (Zielgleichheit).</li>
                           <li><strong>Zielgruppe:</strong> SuS mit Beeinträchtigungen (Hören, Sehen, Motorik, Autismus), chronischen Erkrankungen, LRS (stark), Dyskalkulie (GS) oder Zuwanderung (Sprache).</li>
                           <li><strong>Maßnahmen:</strong> Z.B. Zeitverlängerung, technische Hilfsmittel, Pausen, separater Raum.</li>
                           <li><strong>Zeugnis:</strong> Kein Vermerk im Zeugnis erlaubt!</li>
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                         <a 
                           href="https://www.transparenz.bremen.de/metainformationen/bremische-verordnung-ueber-die-inklusive-bildung-an-oeffentlichen-schulen-breminbilv-vom-12-juni-2025-283946?asl=bremen203_tpgesetz.c.55340.de&template=20_gp_ifg_meta_detail_d#jlr-InklSchulVBRpP15"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20"
                         >
                           <Stethoscope className="w-4 h-4" />
                           §§ 15-16
                         </a>
                         <button 
                           onClick={() => openInfoModal('Zielgleich', 'Zielgleich bedeutet: Die fachlichen Anforderungen des Bildungsplans bleiben bestehen. Es werden nur die Rahmenbedingungen angepasst (z.B. Zeit, Hilfsmittel).')}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                         >
                           <Scale className="w-4 h-4" />
                           Zielgleich
                         </button>
                         <button 
                           onClick={() => setPrintModalOpen(true)}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                         >
                           <Printer className="w-4 h-4" />
                           Checkliste
                         </button>
                      </div>
                    </div>
                  </div>
              )}
              {activeTab === 'notenschutz' && (
                  /* Intro Card: Notenschutz */
                  <div className="mb-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Notenschutz (§17 & §18)</h2>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <p className="text-amber-100 mb-4 font-medium">
                          Verzicht auf Bewertung von Teilleistungen oder angepasste Maßstäbe.
                        </p>
                        <ul className="text-sm text-amber-50 space-y-2 list-disc list-inside">
                          <li><strong>Voraussetzung:</strong> Ein Nachteilsausgleich reicht nachweislich nicht aus.</li>
                          <li><strong>Zielgruppe:</strong> Nur bei LRS, Autismus, Mutismus, Beeinträchtigung von Hören, Sehen oder Motorik.</li>
                          <li><strong>Maßnahme:</strong> Bewertung entfällt in Teilbereichen (z.B. Rechtschreibung) oder mündlich statt schriftlich (bei Mutismus).</li>
                          <li><strong>Wichtig:</strong> Wird im Zeugnis vermerkt! (Grund wird nicht genannt).</li>
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                         <a 
                           href="https://www.transparenz.bremen.de/metainformationen/bremische-verordnung-ueber-die-inklusive-bildung-an-oeffentlichen-schulen-breminbilv-vom-12-juni-2025-283946?asl=bremen203_tpgesetz.c.55340.de&template=20_gp_ifg_meta_detail_d#jlr-InklSchulVBRpP17"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20"
                         >
                           <Shield className="w-4 h-4" />
                           §§ 17-18
                         </a>
                         <button 
                           onClick={() => openInfoModal('Vermerkpflichtig', 'Notenschutz muss im Zeugnis vermerkt werden. Es wird dokumentiert, dass Leistungen nicht oder anders bewertet wurden. Der Grund (Diagnose) wird NICHT genannt.')}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                         >
                           <AlertTextIcon className="w-4 h-4" />
                           Vermerkpflichtig
                         </button>
                         <button 
                           onClick={() => setPrintModalOpen(true)}
                           className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-lg text-sm font-medium border border-white/20 text-left"
                         >
                           <Printer className="w-4 h-4" />
                           Checkliste
                         </button>
                      </div>
                    </div>
                  </div>
              )}
              </>
            )}

            {/* Roadmap Visualization */}
            <div className="relative">
              {history.map((item, index) => {
                const node = roadmapData[item.nodeId];
                const isLast = index === history.length - 1;
                
                const prevVariant = index > 0 ? getDecisionVariant(index - 1) : undefined;
                const currentVariant = getDecisionVariant(index);

                if (!node) return null;

                return (
                  <RoadmapNode
                    key={`${item.nodeId}-${index}`}
                    id={`node-${index}`}
                    node={node}
                    isActive={isLast}
                    isPast={!isLast}
                    onSelectOption={handleOptionSelect}
                    onBack={handleBack}
                    prevVariant={prevVariant}
                    currentVariant={currentVariant}
                    alignment={item.alignment}
                  />
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* AI Helper - Only show for LD for now */}
            {activeTab === 'lernzieldifferenz' && (history.some(h => h.nodeId === 'practical-examples' || h.nodeId === 'final-implementation' || h.nodeId === 'info-tools')) && (
              <div className="max-w-4xl mx-auto">
                <GeminiIdeasGenerator />
              </div>
            )}
            
            {/* Helper tips for NTA */}
            {activeTab === 'nachteilsausgleich' && (history.some(h => h.nodeId === 'nta-step4-measures')) && (
                <div className="max-w-4xl mx-auto mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-100">
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">Tipp: NTA Maßnahmen</h3>
                    <p className="text-emerald-800">Typische Maßnahmen sind Zeitverlängerung (oft 10-20%), Nutzung eines Laptops, oder ein separater Raum. Denken Sie immer an den konkreten Bezug zur Beeinträchtigung.</p>
                </div>
            )}
             
            {/* Helper for Notenschutz */}
            {activeTab === 'notenschutz' && (history.some(h => h.nodeId === 'ns-step1-application')) && (
                 <div className="max-w-4xl mx-auto mt-8 p-6 bg-amber-50 rounded-xl border border-amber-100">
                    <h3 className="text-lg font-bold text-amber-900 mb-2">Wichtig: Fristen</h3>
                    <p className="text-amber-800">Für Abschlussprüfungen muss der Antrag oft schon zu Beginn des Schuljahres (bis 1. November für die Meldung) vorbereitet sein.</p>
                </div>
            )}

            {/* Helper for Förderplanung */}
            {activeTab === 'foerderplanung' && (history.some(h => h.nodeId === 'fp-step2-contents')) && (
                 <div className="max-w-4xl mx-auto mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                    <h3 className="text-lg font-bold text-indigo-900 mb-2">SMART Ziele</h3>
                    <p className="text-indigo-800">Achten Sie darauf, Ziele <b>S</b>pezifisch, <b>M</b>essbar, <b>A</b>ttraktiv, <b>R</b>ealistisch und <b>T</b>erminiert zu formulieren.</p>
                </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} CVO Gesamtkonferenz. Basierend auf der aktuellen Verordnung BremInBilV vom 19.6.2025.</p>
      </footer>
      
      {/* Modals */}
      <PracticalExamplesModal isOpen={showExamples} onClose={() => setShowExamples(false)} />
      <InfoModal 
        isOpen={infoModalOpen} 
        onClose={() => setInfoModalOpen(false)} 
        title={infoModalData.title} 
        content={infoModalData.content} 
      />
      <PrintChecklistModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        checklist={checklistData[activeTab]}
      />

    </div>
  );
};

// Simple Icon for the header
const AlertTextIcon = ({className}:{className?:string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M12 12h.01"/></svg>
)

export default App;