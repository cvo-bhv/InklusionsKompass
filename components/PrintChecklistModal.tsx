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
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <title>${checklist.title}</title>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
                .header { border-bottom: 2px solid #1e293b; padding-bottom: 12px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
                .title { font-size: 24px; font-weight: bold; margin: 0; color: #0f172a; }
                .subtitle { color: #64748b; font-size: 14px; margin-top: 4px; }
                .date { font-size: 12px; color: #94a3b8; }
                .description { font-style: italic; border-left: 4px solid #6366f1; padding: 12px 16px; background: #f5f3ff; margin-bottom: 32px; color: #475569; }
                .section { margin-bottom: 32px; page-break-inside: avoid; }
                .section-title { font-size: 18px; font-weight: bold; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 16px; color: #1e293b; }
                .item { display: flex; gap: 14px; margin-bottom: 14px; align-items: flex-start; }
                .checkbox { width: 18px; height: 18px; border: 1px solid #cbd5e1; flex-shrink: 0; margin-top: 3px; border-radius: 2px; }
                .item-label { font-weight: 600; color: #1e293b; }
                .item-subtext { font-size: 14px; color: #64748b; margin-top: 2px; }
                .notes { margin-top: 48px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
                .notes-label { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; }
                .notes-box { height: 120px; border: 1px solid #f1f5f9; background: #f8fafc; margin-top: 8px; border-radius: 6px; }
                @media print {
                  body { padding: 0; }
                  .description { background-color: #f5f3ff !important; -webkit-print-color-adjust: exact; }
                  .notes-box { background-color: #f8fafc !important; -webkit-print-color-adjust: exact; }
                  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <h1 class="title">${checklist.title}</h1>
                  <p class="subtitle">Inklusions-Kompass CVO Oberschule</p>
                </div>
                <div class="date">Stand: ${new Date().toLocaleDateString('de-DE')}</div>
              </div>
              <div class="description">${checklist.description}</div>
              ${checklist.sections.map(section => `
                <div class="section">
                  <h3 class="section-title">${section.title}</h3>
                  ${section.items.map(item => `
                    <div class="item">
                      <div class="checkbox"></div>
                      <div>
                        <div class="item-label">${item.label}</div>
                        ${item.subtext ? `<div class="item-subtext">${item.subtext}</div>` : ''}
                      </div>
                    </div>
                  `).join('')}
                </div>
              `).join('')}
              <div class="notes">
                <div class="notes-label">Notizen</div>
                <div class="notes-box"></div>
              </div>
            </body>
          </html>
        `);
        doc.close();

        // Wait for content to load before printing
        iframe.onload = () => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          // Remove iframe after a delay
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 1000);
        };
        
        // Fallback for browsers where onload might not fire for injected content
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          }
        }, 500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col relative animate-scale-in overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Druckvorschau</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content (Preview) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50 min-h-0">
          <div ref={printRef} className="bg-white p-6 sm:p-8 shadow-sm border border-slate-200 mx-auto max-w-xl">
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
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
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
