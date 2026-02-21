import { CheckSquare, Clock, FileText, AlertTriangle, Users, Target, Shield, Scale } from 'lucide-react';

export interface ChecklistItem {
  label: string;
  subtext?: string;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface TopicChecklist {
  id: string;
  title: string;
  description: string;
  sections: ChecklistSection[];
}

export const checklistData: Record<string, TopicChecklist> = {
  'foerderplanung': {
    id: 'foerderplanung',
    title: 'Checkliste: Förderplanung (§11)',
    description: 'Wichtige Schritte und Fristen für die Erstellung von Förderplänen.',
    sections: [
      {
        title: 'Voraussetzungen prüfen',
        items: [
          { label: 'Liegt ein besonderer individueller Förderbedarf vor?', subtext: 'z.B. LRS, Rechenschwäche, Autismus, sozial-emotionaler Bedarf' },
          { label: 'Wurde der Bedarf diagnostisch abgeklärt?', subtext: 'Beobachtungen, Klassenarbeiten, ggf. externe Diagnostik' }
        ]
      },
      {
        title: 'Erstellung & Inhalt',
        items: [
          { label: 'Ist das Team involviert?', subtext: 'Klassenleitung, Fachlehrer, Sonderpädagogen, Eltern' },
          { label: 'Sind die Ziele SMART formuliert?', subtext: 'Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert' },
          { label: 'Sind konkrete Maßnahmen festgelegt?', subtext: 'Wer macht was bis wann?' }
        ]
      },
      {
        title: 'Zyklus & Fristen',
        items: [
          { label: 'Evaluation mindestens 1x jährlich.', subtext: 'Überprüfung der Ziele und Anpassung des Plans' },
          { label: 'Wurden die Eltern informiert und eingebunden?' }
        ]
      }
    ]
  },
  'lernzieldifferenz': {
    id: 'lernzieldifferenz',
    title: 'Checkliste: Lernzieldifferenz (§19)',
    description: 'Kriterien für zieldifferentes Lernen und Bewertung.',
    sections: [
      {
        title: 'Voraussetzungen',
        items: [
          { label: 'Existiert ein individueller Förderplan?', subtext: 'Zwingend erforderlich' },
          { label: 'Können Standards trotz Ausschöpfung aller Fördermöglichkeiten nicht erreicht werden?' },
          { label: 'Wurden Erziehungsberechtigte und der/die betreffende Schüler:in angehört?' },
          { label: 'Haben die Erziehungsberechtigten zugestimmt?' },
          { label: 'Beschluss der Zeugniskonferenz liegt vor?' }
        ]
      },
      {
        title: 'Rahmenbedingungen',
        items: [
          { label: 'Jahrgangsstufe beachten', subtext: 'Nur Jg. 5-8' },
          { label: 'Kurszuweisung prüfen', subtext: 'Ab Jg. 7 nur im G-Kurs oder in Fächern ohne Differenzierung. NICHT im E-Kurs!' }
        ]
      },
      {
        title: 'Zeugnis & Bewertung',
        items: [
          { label: 'Keine Noten in den betroffenen Fächern', subtext: 'Stattdessen Kompetenzbeschreibung' },
          { label: 'Zeugnisvermerk beachten', subtext: 'Hinweis auf zieldifferente Unterrichtung' }
        ]
      }
    ]
  },
  'nachteilsausgleich': {
    id: 'nachteilsausgleich',
    title: 'Checkliste: Nachteilsausgleich (§16)',
    description: 'Anpassung der äußeren Bedingungen bei gleicher Zielanforderung.',
    sections: [
      {
        title: 'Grundlagen',
        items: [
          { label: 'Zielgleichheit gewahrt?', subtext: 'Fachliche Anforderungen bleiben identisch' },
          { label: 'Beeinträchtigung liegt vor?', subtext: 'LRS, Dyskalkulie, Autismus, Hören/Sehen, etc.' }
        ]
      },
      {
        title: 'Maßnahmen (Beispiele)',
        items: [
          { label: 'Zeitverlängerung gewährt?', subtext: 'Üblich sind 10-20%' },
          { label: 'Technische Hilfsmittel bereitgestellt?', subtext: 'Laptop, Lesegeräte' },
          { label: 'Räumliche Anpassung?', subtext: 'Separater Raum, reizarme Umgebung' }
        ]
      },
      {
        title: 'Dokumentation',
        items: [
          { label: 'Beschluss der Zeugniskonferenz dokumentiert?' },
          { label: 'KEIN Vermerk im Zeugnis!', subtext: 'Nachteilsausgleich darf nicht im Zeugnis auftauchen' }
        ]
      }
    ]
  },
  'notenschutz': {
    id: 'notenschutz',
    title: 'Checkliste: Notenschutz (§17, §18)',
    description: 'Aussetzung oder Anpassung der Bewertung.',
    sections: [
      {
        title: 'Antrag & Fristen',
        items: [
          { label: 'Schriftlicher Antrag liegt vor?', subtext: 'Von Eltern oder volljährigen Schülern' },
          { label: 'Frist für Abschlussprüfungen beachtet?', subtext: 'Spätestens 12 Wochen vor Beginn des neuen Schuljahres (Beginn 2. Halbjahr Klasse 9)' },
          { label: 'Schulleitung hat beraten?' }
        ]
      },
      {
        title: 'Umfang',
        items: [
          { label: 'Betroffene Bereiche definiert?', subtext: 'z.B. Rechtschreibung, mündliche Beteiligung' },
          { label: 'Ersatzleistung festgelegt?', subtext: 'Wenn möglich (z.B. mündlich statt schriftlich)' }
        ]
      },
      {
        title: 'Zeugnis',
        items: [
          { label: 'Vermerkpflicht beachten!', subtext: 'Muss im Zeugnis stehen ("Leistungen wurden nicht/anders bewertet")' },
          { label: 'Keine Nennung der Diagnose', subtext: 'Grund (z.B. Autismus) wird nicht genannt' }
        ]
      }
    ]
  }
};
