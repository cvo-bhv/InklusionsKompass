import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, BookOpen } from 'lucide-react';

export const GeminiIdeasGenerator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!subject || !topic) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key missing");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `
        Ich bin Lehrer und plane Unterricht für einen Schüler mit Lernzieldifferenzierung (Sonderpädagogischer Förderbedarf oder §19).
        Fach: ${subject}
        Thema: ${topic}
        
        Bitte erstelle 3 konkrete, praktische Vorschläge, wie ich das Material oder die Aufgabe differenzieren kann (Vereinfachung, Hilfsmittel, Reduktion).
        Halte dich kurz und stichpunktartig. 
        Formatiere die Antwort in einfachem HTML (nutze <ul>, <li>, <b>).
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setResult(response.text || "Keine Antwort erhalten.");

    } catch (err) {
      console.error(err);
      setError("Konnte keine Ideen generieren. Bitte prüfen Sie den API Key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 mt-8 shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-indigo-900">
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <h3 className="font-bold text-lg">Ideen-Generator für Maßnahmen</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Sie benötigen konkrete Beispiele für einen Förderplan oder eine Unterrichtsstunde? 
        Lassen Sie sich von der KI inspirieren.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Fach</label>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="z.B. Geschichte, Mathe"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Thema</label>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="z.B. Französische Revolution, Bruchrechnen"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
      </div>

      <button 
        onClick={handleGenerate}
        disabled={!subject || !topic || loading}
        className={`w-full py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors ${
          !subject || !topic || loading 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
        }`}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
        {loading ? 'Generiere Vorschläge...' : 'Maßnahmen vorschlagen'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 bg-white p-4 rounded-md border border-indigo-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase">Vorschläge:</h4>
          <div 
            className="prose prose-sm text-gray-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </div>
      )}
    </div>
  );
};