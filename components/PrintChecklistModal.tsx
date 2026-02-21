import React, { useRef } from 'react';
import { X, Printer, CheckSquare, Square } from 'lucide-react';
import { TopicChecklist } from '../data/checklistData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  checklist: TopicChecklist;
}

export const PrintChecklistModal: React.FC<Props> = ({ isOpen, onClose, checklist }) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = printRef.current;
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      // Create a temporary container for printing to avoid messing up React state/DOM
      const printContainer = document.createElement('div');
      printContainer.innerHTML = printContents;
      printContainer.className = 'print-container';
      
      // Add print specific styles
      const style = document.createElement('style');
      style.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
            background: white;
            color: black;
          }
          /* Ensure background colors are printed */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(printContainer);

      window.print();

      // Cleanup
      document.body.removeChild(printContainer);
      document.head.removeChild(style);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative animate-scale-in" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Druckvorschau</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content (Preview) */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div ref={printRef} className="bg-white p-8 shadow-sm border border-slate-200 mx-auto max-w-xl">
            {/* Print Header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{checklist.title}</h1>
                <p className="text-slate-500 mt-1 text-sm">Inklusions-Kompass CVO Oberschule</p>
              </div>
              <div className="text-right text-xs text-slate-400">
                Stand: {new Date().toLocaleDateString('de-DE')}
              </div>
            </div>

            <p className="text-slate-600 mb-8 italic border-l-4 border-indigo-500 pl-4 py-1 bg-indigo-50">
              {checklist.description}
            </p>

            {/* Sections */}
            <div className="space-y-8">
              {checklist.sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="font-bold text-lg text-slate-800 mb-3 border-b border-slate-200 pb-1">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3 items-start">
                        <div className="mt-1 shrink-0 text-slate-300">
                          <Square className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{item.label}</div>
                          {item.subtext && (
                            <div className="text-sm text-slate-500 mt-0.5">{item.subtext}</div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer for Print */}
            <div className="mt-12 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
              <p>Notizen:</p>
              <div className="h-24 border border-slate-100 mt-2 bg-slate-50/50 rounded"></div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-white rounded-b-xl flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
          >
            Abbrechen
          </button>
          <button 
            onClick={handlePrint}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Drucken
          </button>
        </div>
      </div>
    </div>
  );
};
