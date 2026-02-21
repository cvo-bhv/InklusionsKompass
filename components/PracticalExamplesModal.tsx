import React from 'react';
import { X, Calculator, BookOpen, Languages, CheckCircle, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PracticalExamplesModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-fade-in-up flex flex-col">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-6 flex justify-between items-start z-10">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Praxisbeispiele für den Unterricht</h2>
                <p className="text-slate-500 text-sm">Konkrete Ansätze zur Anpassung von Material in den Hauptfächern.</p>
            </div>
            <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
            <X className="w-6 h-6" />
            </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          
          {/* Info Box */}
          <div className="mb-8 p-5 bg-blue-50 text-blue-900 rounded-xl border border-blue-100 shadow-sm flex gap-4 items-start">
            <Info className="w-6 h-6 shrink-0 text-blue-600 mt-1" />
            <div className="space-y-3">
                <p className="text-lg leading-relaxed font-medium">
                  Die Differenzierung erfordert kein komplett neues Material, sondern eine <span className="font-bold text-blue-700">Anpassung des vorhandenen Materials</span>.
                </p>
                <div className="bg-blue-100/50 p-3 rounded-lg border border-blue-200/50">
                    <p className="text-base text-blue-800 leading-relaxed">
                        <span className="font-bold">Wichtig:</span> Lernzieldifferenz bedeutet, dass man zwar ein <span className="underline decoration-blue-300 decoration-2 underline-offset-2">anderes Ziel</span> hat, aber <span className="underline decoration-blue-300 decoration-2 underline-offset-2">am gleichen Unterrichtsgegenstand</span> arbeitet.
                    </p>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mathe */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-slate-800">Mathe</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>Zahlenraum reduzieren (z.B. bis 100 statt 1000)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>Hilfsmittel dauerhaft erlauben: 1x1-Tabelle, Taschenrechner</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>Aufgabenmenge reduzieren (nur jede zweite Aufgabe)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>Komplexe Textaufgaben durch reine Rechenpäckchen ersetzen</span>
                </li>
              </ul>
            </div>

            {/* Deutsch */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="bg-amber-100 p-3 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-slate-800">Deutsch</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Schreiben: Lückentexte statt freier Aufsatz</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Lesen: Text kürzen, Schriftgröße erhöhen, Zeilenabstand 1,5</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Diktat: Nur Lückenwörter einsetzen (Wortschatz statt Rechtschreibung)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>Operatoren vereinfachen ("Nenne" statt "Erörtere")</span>
                </li>
              </ul>
            </div>

            {/* Englisch */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
                  <Languages className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-slate-800">Englisch</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Vokabeltest: Zuordnungsaufgaben (Matching) statt Schreiben</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Grammatik: Multiple Choice statt Sätze selbst bilden</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Sprechen: Mündliche Beteiligung stärker gewichten als Schriftliches</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Textverständnis: Fragen auf Deutsch beantworten lassen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end">
            <button 
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-all shadow-sm active:scale-95"
            >
                Schließen
            </button>
        </div>
      </div>
    </div>
  );
};