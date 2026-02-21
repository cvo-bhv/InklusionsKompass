import React from 'react';
import { ClipboardList, Map, Scale, Shield, ArrowRight, GraduationCap, Maximize, Minimize } from 'lucide-react';

type TabId = 'foerderplanung' | 'lernzieldifferenz' | 'nachteilsausgleich' | 'notenschutz';

interface Props {
  onStart: () => void;
  onSelectTopic: (tab: TabId) => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const StartScreen: React.FC<Props> = ({ onStart, onSelectTopic, toggleFullscreen, isFullscreen }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 animate-fade-in relative">
      
      {/* Fullscreen Button */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors bg-white hover:bg-slate-100 px-3 py-2 rounded-lg cursor-pointer shadow-sm border border-slate-200"
          type="button"
          title={isFullscreen ? "Vollbildmodus beenden" : "Vollbildmodus"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          <span className="hidden sm:inline">{isFullscreen ? 'Verkleinern' : 'Vollbild'}</span>
        </button>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-10 text-center text-white">
          <div className="inline-flex p-3 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Team UP präsentiert: Inklusions-Kompass</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Dein Wegweiser durch die neue <br /> <strong>Bremische Verordnung über die inklusive Bildung (BremInBilV)</strong>.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          
          <div className="text-center mb-10">
            <p className="text-slate-600 text-lg mb-2">
              Kurzanleitungen und Erklärungen zur neuen Verordnung.
            </p>
            <p className="text-slate-500">
              Wir schauen uns gemeinsam die vier wichtigsten Bausteine an:
            </p>
          </div>

          {/* Grid of 4 Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            
            <button 
              onClick={() => onSelectTopic('foerderplanung')}
              className="group p-6 border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all text-left flex items-start gap-4 bg-slate-50 hover:bg-indigo-50/50"
            >
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-700">1. Förderplanung</h3>
                <p className="text-sm text-slate-500">Wie erstelle ich einen Förderplan nach §11?</p>
              </div>
            </button>

            <button 
              onClick={() => onSelectTopic('lernzieldifferenz')}
              className="group p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left flex items-start gap-4 bg-slate-50 hover:bg-blue-50/50"
            >
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Map className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700">2. Lernzieldifferenz</h3>
                <p className="text-sm text-slate-500">Wann darf ich zieldifferent bewerten (§19)?</p>
              </div>
            </button>

            <button 
              onClick={() => onSelectTopic('nachteilsausgleich')}
              className="group p-6 border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all text-left flex items-start gap-4 bg-slate-50 hover:bg-emerald-50/50"
            >
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-emerald-700">3. Nachteilsausgleich</h3>
                <p className="text-sm text-slate-500">Faire Bedingungen schaffen (§15-16).</p>
              </div>
            </button>

            <button 
              onClick={() => onSelectTopic('notenschutz')}
              className="group p-6 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-md transition-all text-left flex items-start gap-4 bg-slate-50 hover:bg-amber-50/50"
            >
              <div className="p-3 bg-amber-100 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-amber-700">4. Notenschutz</h3>
                <p className="text-sm text-slate-500">Bewertung aussetzen (§17-18).</p>
              </div>
            </button>

          </div>

          {/* Main CTA */}
          <div className="text-center">
            <button 
              onClick={onStart}
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <span>Starten mit Förderplanung</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-4 text-xs text-slate-400">
              Du kannst jederzeit über das Menü zwischen den Themen wechseln.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
