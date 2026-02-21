import React from 'react';
import { RoadmapNode } from '../types';
import { 
  BookOpen, 
  Scale, 
  AlertTriangle, 
  Users, 
  FileText, 
  Ban, 
  CheckCircle, 
  HelpCircle,
  Stethoscope,
  School,
  ClipboardList,
  Calculator,
  Shield,
  Clock,
  MessageCircle,
  GraduationCap,
  Calendar,
  AlertOctagon,
  PenTool,
  ScrollText,
  Target,
  ListChecks,
  UserPlus,
  RefreshCw
} from 'lucide-react';

export const roadmapData: Record<string, RoadmapNode> = {
  // --- LERNZIELDIFFERENZIERUNG (LD) ---
  'start': {
    id: 'start',
    type: 'start',
    title: 'Dein Start: Lernzieldifferenzierung',
    content: 'Willkommen zum Fahrplan für die Lernzieldifferenzierung (§19). Diese Schritt-für-Schritt Anleitung hilft dir dabei zu klären, ob eine Lernzieldifferenzierung notwendig ist und wie du sie umsetzen kannst.',
    details: 'Grundlage: §19 der Bremischen Verordnung über die inklusive Bildung an öffentlichen Schulen (BremInBilV).',
    externalLink: 'https://www.transparenz.bremen.de/metainformationen/bremische-verordnung-ueber-die-inklusive-bildung-an-oeffentlichen-schulen-breminbilv-vom-12-juni-2025-283946?template=20_gp_ifg_meta_detail_d#jlr-InklSchulVBRpP19',
    icon: <BookOpen className="w-6 h-6" />,
    options: [
      { label: 'Los geht\'s', nextId: 'check-grade', variant: 'primary' }
    ]
  },
  'check-grade': {
    id: 'check-grade',
    type: 'check',
    title: 'Passt der Jahrgang?',
    content: 'Befindet sich dein Schüler oder deine Schülerin im Jahrgang 5 bis 8?',
    icon: <School className="w-6 h-6" />,
    options: [
      { label: 'Ja, Jg. 5-8', nextId: 'check-ekurs', variant: 'success' },
      { label: 'Nein', nextId: 'stop-grade', variant: 'danger' }
    ]
  },
  'stop-grade': {
    id: 'stop-grade',
    type: 'stop',
    title: 'Hier passt es nicht',
    content: 'Lernzieldifferenzierung nach diesem Schema ist primär für die Jahrgänge 5-8 gedacht.',
    icon: <Ban className="w-6 h-6" />
  },
  'check-ekurs': {
    id: 'check-ekurs',
    type: 'check',
    title: 'Welcher Kurs?',
    content: 'Ist der/die Schüler:in in einem E-Kurs (Erweiterungskurs)?',
    details: 'Lernzieldifferente Beschulung ist im E-Kurs NICHT möglich.',
    icon: <AlertTriangle className="w-6 h-6" />,
    options: [
      { label: 'Ja, ist im E-Kurs', nextId: 'stop-ekurs', variant: 'danger' },
      { label: 'Nein, G-Kurs/Stammgruppe', nextId: 'check-inner-diff', variant: 'primary' }
    ]
  },
  'stop-ekurs': {
    id: 'stop-ekurs',
    type: 'stop',
    title: 'Das geht leider nicht',
    content: 'Eine lernzieldifferente Bewertung ist im E-Kurs grundsätzlich nicht möglich.',
    icon: <Ban className="w-6 h-6" />
  },
  'check-inner-diff': {
    id: 'check-inner-diff',
    type: 'action',
    title: 'Innere Differenzierung (§8)',
    content: 'Hast du schon alle Möglichkeiten der Binnendifferenzierung ausgeschöpft?',
    details: '§8(2): Innere Differenzierung ist Unterrichtsprinzip. Bevor du zieldifferent unterrichtest, versuche es zielgleich mit Nachteilsausgleich/Hilfsmitteln (z.B. Knautschball, Wackelkissen, Kopfhörer, Lernbüro).',
    externalLink: 'https://www.transparenz.bremen.de/metainformationen/verordnung-ueber-die-sekundarstufe-i-der-oberschule-vom-26-juni-2009-282096?asl=bremen203_tpgesetz.c.55340.de&template=20_gp_ifg_meta_detail_d#jlr-OSchulSekIVBR2009V7P8',
    icon: <Scale className="w-6 h-6" />,
    options: [
      { label: 'Noch nicht ganz', nextId: 'info-tools', variant: 'secondary' },
      { label: 'Ja, alles probiert', nextId: 'check-foerderplan', variant: 'primary' }
    ]
  },
  'info-tools': {
    id: 'info-tools',
    type: 'info',
    title: 'Dein Werkzeugkoffer',
    content: 'Versuche es erst einmal hiermit:',
    details: '- ggf. Nachteilsausgleich? \n- Hilfsmittel: Gehörschutz, Wackelkissen, Sichtschutz\n- Auszeitkarten / Lernbüro nutzen\n- Methodische Differenzierung (Quantität/Zeit)\n\nErst wenn das nicht fruchtet, gehen wir weiter.',
    icon: <HelpCircle className="w-6 h-6" />,
    options: [
      { label: 'Habe ich erledigt', nextId: 'check-foerderplan', variant: 'primary' }
    ]
  },
  'check-foerderplan': {
    id: 'check-foerderplan',
    type: 'check',
    title: 'Förderstatus & Eltern',
    content: 'Gibt es schon einen Förderplan und hast du die Eltern frühzeitig ins Boot geholt?',
    details: 'Beratung mit Sonderpädagog:in ist erfolgt. Förderempfehlung wurde bei erster unterdurchschnittlicher Leistung ausgesprochen.',
    icon: <FileText className="w-6 h-6" />,
    options: [
      { label: 'Nein, fehlt noch', nextId: 'action-foerderplan', variant: 'warning' },
      { label: 'Ja, alles da', nextId: 'check-rebuz', variant: 'success' }
    ]
  },
  'action-foerderplan': {
    id: 'action-foerderplan',
    type: 'action',
    title: 'Förderplan erstellen',
    content: 'Erstelle bitte zeitnah einen Förderplan. Hol dir dabei Unterstützung von den Sonderpädagog:innen.',
    details: 'Wichtig zur Absicherung der Schule: Du musst nachweisen können, dass die Eltern informiert wurden (schriftlich!).',
    icon: <FileText className="w-6 h-6" />,
    options: [
      { label: 'Erledigt, weiter', nextId: 'check-rebuz', variant: 'primary' }
    ]
  },
  'check-rebuz': {
    id: 'check-rebuz',
    type: 'check',
    title: 'ReBUZ & Diagnostik',
    content: 'Liegt eine ReBUZ-Meldung vor? Ist das Problem dauerhaft?',
    details: 'Das Schulamt fragt oft nach dem ReBUZ-Status. Es muss um eine dauerhafte Lernproblematik gehen, nicht nur um eine momentane Schwäche.',
    icon: <Stethoscope className="w-6 h-6" />,
    options: [
      { label: 'Nein / Unsicher', nextId: 'action-rebuz', variant: 'secondary' },
      { label: 'Ja, dauerhaft', nextId: 'decision-parents', variant: 'primary' }
    ]
  },
  'action-rebuz': {
    id: 'action-rebuz',
    type: 'info',
    title: 'ReBUZ Check',
    content: 'Du solltest parallel eine Meldung beim ReBUZ (Regionales Beratungs- und Unterstützungszentrum) prüfen oder in Erwägung ziehen.',
    icon: <Users className="w-6 h-6" />,
    options: [
      { label: 'Alles klar, weiter', nextId: 'decision-parents', variant: 'primary' }
    ]
  },
  'decision-parents': {
    id: 'decision-parents',
    type: 'action',
    title: 'Das Elterngespräch',
    content: 'Jetzt wird es wichtig: Stimmen die Eltern der zieldifferenten Beschulung zu?',
    details: 'Zustimmung sollte schriftlich erfolgen. Konsequenz: Kein reguläres Notenzeugnis, sondern Kompetenzbericht.',
    icon: <Users className="w-6 h-6" />,
    options: [
      { label: 'Eltern sind dabei', nextId: 'final-implementation', variant: 'success' },
      { label: 'Eltern lehnen ab', nextId: 'decision-authority', variant: 'danger' }
    ]
  },
  'decision-authority': {
    id: 'decision-authority',
    type: 'action',
    title: 'Die Behörde entscheidet',
    content: 'Wenn die Eltern nicht zustimmen, entscheidet die Schulbehörde oder die LEB-Konferenz.',
    details: 'Das ist ein Verwaltungsakt. Deine Dokumentation ist hier essenziell.',
    icon: <Scale className="w-6 h-6" />,
    options: [
      { label: 'Beschluss liegt vor', nextId: 'final-implementation', variant: 'primary' }
    ]
  },
  'final-implementation': {
    id: 'final-implementation',
    type: 'action', 
    title: 'Verwaltung & Konsequenzen',
    content: 'Der Status ist festgelegt. Diese Schritte musst du jetzt erledigen:',
    details: `1. Bewertung: Die Note im Fach entfällt. Du schreibst stattdessen eine individuelle Kompetenzbeschreibung.\n\n2. Förderplan: Pass ihn an und überprüfe ihn halbjährlich.\n\n3. Meldung: Die Schulbehörde wird 1x jährlich informiert.`,
    icon: <ClipboardList className="w-6 h-6" />,
    options: [
      { label: 'Zu den Praxisbeispielen', nextId: 'practical-examples', variant: 'success' }
    ]
  },
  'practical-examples': {
    id: 'practical-examples',
    type: 'success',
    title: 'Ideen für deinen Unterricht',
    content: 'Du brauchst kein komplett neues Material! Passe einfach das Vorhandene an. Hier sind Ideen für die Hauptfächer:',
    details: 'Dokumentiere deine Maßnahmen im Förderplan. Das schafft Transparenz für Eltern und Behörden.',
    icon: <CheckCircle className="w-6 h-6" />,
    examples: [
      {
        subject: 'Mathe',
        iconKey: 'math',
        items: [
          'Zahlenraum reduzieren (z.B. bis 100 statt 1000)',
          'Hilfsmittel dauerhaft erlauben: 1x1-Tabelle, Taschenrechner',
          'Aufgabenmenge reduzieren (nur jede zweite Aufgabe)',
          'Komplexe Textaufgaben durch reine Rechenpäckchen ersetzen'
        ]
      },
      {
        subject: 'Deutsch',
        iconKey: 'german',
        items: [
          'Schreiben: Lückentexte statt freier Aufsatz',
          'Lesen: Text kürzen, Schriftgröße erhöhen, Zeilenabstand 1,5',
          'Diktat: Nur Lückenwörter einsetzen (Wortschatz statt Rechtschreibung)',
          'Operatoren vereinfachen ("Nenne" statt "Erörtere")'
        ]
      },
      {
        subject: 'Englisch',
        iconKey: 'english',
        items: [
          'Vokabeltest: Zuordnungsaufgaben (Matching) statt Schreiben',
          'Grammatik: Multiple Choice statt Sätze selbst bilden',
          'Sprechen: Mündliche Beteiligung stärker gewichten als Schriftliches',
          'Textverständnis: Fragen auf Deutsch beantworten lassen'
        ]
      }
    ]
  },

  // --- NACHTEILSAUSGLEICH (NTA) ---
  'nta-start': {
    id: 'nta-start',
    type: 'start',
    title: 'Dein Start: Nachteilsausgleich',
    content: 'Ein Nachteilsausgleich wird benötigt, damit Schüler:innen trotz einer Beeinträchtigung oder besonderen Situation ihr vorhandenes Leistungsvermögen zeigen und am Unterricht sowie an Prüfungen gleichberechtigt teilnehmen können.',
    details: 'Grundlage: BremInBilV §§ 15, 16, 17, 18. Ziel: Beeinträchtigungen ausgleichen, damit alle die gleichen Chancen haben.',
    icon: <Scale className="w-6 h-6" />,
    options: [
      { label: 'Zum Ablaufplan', nextId: 'nta-step1-needs', variant: 'primary' }
    ]
  },
  'nta-step1-needs': {
    id: 'nta-step1-needs',
    type: 'check',
    title: '1. Bedarf erkennen',
    content: 'Gibt es bei deinem Schüler oder deiner Schülerin eine Diagnose oder einen klaren Förderbedarf?',
    details: 'Beispiele: Sprachstörung, körperliche Beeinträchtigung, Autismus, LRS, etc. \nFalls noch nichts vorliegt: Du brauchst eine Diagnostik (z.B. ReBUZ, Ärzte).',
    icon: <Stethoscope className="w-6 h-6" />,
    options: [
      { label: 'Ja, Diagnostik liegt vor', nextId: 'nta-step2-application', variant: 'success' },
      { label: 'Verdacht, aber nichts Offizielles', nextId: 'nta-action-diagnostics', variant: 'warning' }
    ]
  },
  'nta-action-diagnostics': {
    id: 'nta-action-diagnostics',
    type: 'action',
    title: 'Diagnostik anstoßen',
    content: 'Bevor wir weitermachen können, brauchen wir eine fachliche Grundlage. Bitte veranlasse eine Diagnostik (ReBUZ/Fachärzte).',
    icon: <FileText className="w-6 h-6" />,
    options: [
      { label: 'Weiter zum Antrag', nextId: 'nta-step2-application', variant: 'primary' }
    ]
  },
  'nta-step2-application': {
    id: 'nta-step2-application',
    type: 'action',
    title: '2. Antrag stellen lassen',
    content: 'Die Eltern müssen den Antrag auf Nachteilsausgleich bei der Schulleitung einreichen.',
    details: 'Erinnere sie daran, alles beizufügen: \n- Diagnosen, Gutachten, Stellungnahmen (z.B. Mobiler Dienst, ReBUZ)\n- Ärztliche Nachweise',
    icon: <FileText className="w-6 h-6" />,
    options: [
      { label: 'Antrag ist da', nextId: 'nta-step3-decision', variant: 'primary' }
    ]
  },
  'nta-step3-decision': {
    id: 'nta-step3-decision',
    type: 'check',
    title: '3. Die Entscheidung',
    content: 'Jetzt entscheidet die Schulleitung über den Antrag.',
    details: 'Grundlage sind:\n- Deine Erfahrungen als Lehrkraft\n- Die Gutachten\n- Empfehlung der Zeugniskonferenz\n\nWichtig: Bei Hören/Sehen/Motorik unbedingt den Mobilen Dienst fragen!',
    icon: <Users className="w-6 h-6" />,
    options: [
      { label: 'Genehmigt!', nextId: 'nta-step4-measures', variant: 'success' },
      { label: 'Leider abgelehnt', nextId: 'nta-stop-denied', variant: 'danger' }
    ]
  },
  'nta-stop-denied': {
    id: 'nta-stop-denied',
    type: 'stop',
    title: 'Antrag abgelehnt',
    content: 'Ohne Genehmigung gibt es keinen offiziellen Nachteilsausgleich. Du kannst aber natürlich weiterhin pädagogisch differenzieren.',
    icon: <Ban className="w-6 h-6" />
  },
  'nta-step4-measures': {
    id: 'nta-step4-measures',
    type: 'action',
    title: '4. Maßnahmen festlegen',
    content: 'Was hilft konkret? Lege die Ausgleichsmaßnahmen fest.',
    details: 'Beispiele:\n- Hilfsmittel (Laptop, Wörterbuch)\n- Mehr Zeit (z.B. bei Klassenarbeiten)\n- Pausenregelungen\n\nSchreib das unbedingt in den Förderplan und die Schullaufbahnakte.',
    icon: <Clock className="w-6 h-6" />,
    options: [
      { label: 'Maßnahmen stehen', nextId: 'nta-step5-communication', variant: 'primary' }
    ]
  },
  'nta-step5-communication': {
    id: 'nta-step5-communication',
    type: 'info',
    title: '5. Bescheid geben',
    content: 'Informiere den/die Schüler:in und die Eltern schriftlich über die beschlossenen Maßnahmen.',
    details: '- Überprüfe das regelmäßig im Förderplan.\n- Die Zeugniskonferenz spricht mind. 1x jährlich darüber.',
    icon: <MessageCircle className="w-6 h-6" />,
    options: [
      { label: 'Weiter zu Prüfungen', nextId: 'nta-step6-exams', variant: 'primary' }
    ]
  },
  'nta-step6-exams': {
    id: 'nta-step6-exams',
    type: 'check',
    title: '6. Prüfungen & Zeugnisse',
    content: 'Was gilt bei Abschlussprüfungen und Zeugnissen?',
    details: 'Wichtig:\n- Für Abschlussprüfungen brauchst du eine aktuelle Stellungnahme (max. 18 Monate alt).\n- Im Zeugnis darf KEIN Hinweis auf den NTA stehen!',
    icon: <GraduationCap className="w-6 h-6" />,
    options: [
      { label: 'Alles verstanden', nextId: 'nta-step7-check-notenschutz', variant: 'primary' }
    ]
  },
  'nta-step7-check-notenschutz': {
    id: 'nta-step7-check-notenschutz',
    type: 'check',
    title: '7. Reicht das aus?',
    content: 'Ist die Beeinträchtigung dauerhaft und reicht der "normale" Nachteilsausgleich vielleicht nicht?',
    icon: <Shield className="w-6 h-6" />,
    options: [
      { label: 'NTA reicht', nextId: 'nta-success', variant: 'success' },
      { label: 'Nein, reicht nicht', nextId: 'nta-info-notenschutz', variant: 'warning' }
    ]
  },
  'nta-success': {
    id: 'nta-success',
    type: 'success',
    title: 'Geschafft!',
    content: 'Der Nachteilsausgleich läuft. Vergiss nicht, regelmäßig zu schauen, ob er noch passt.',
    icon: <CheckCircle className="w-6 h-6" />
  },
  'nta-info-notenschutz': {
    id: 'nta-info-notenschutz',
    type: 'info',
    title: 'Option: Notenschutz (§17)',
    content: 'Wenn der NTA nicht reicht, könnt ihr Notenschutz beantragen.',
    details: 'Das bedeutet: Verzicht auf Bewertung (z.B. Rechtschreibung) oder andere Prüfungsformen. Das ist eine Stufe weiter (§17).',
    icon: <Shield className="w-6 h-6" />,
    options: [
      { label: 'Verstanden', nextId: 'nta-success', variant: 'primary' }
    ]
  },

  // --- NOTENSCHUTZ (NS) ---
  'ns-start': {
    id: 'ns-start',
    type: 'start',
    title: 'Dein Start: Notenschutz (§18)',
    content: 'Bei SoS mit einer dauerhaften Beeinträchtigung (z. B. körperlich-motorisch, im Sprechen, Hören, Sehen, bei Autismus oder bei erheblichen Lese-/Rechtschreibschwierigkeiten) kann auf Antrag ein Teilbereich nicht oder nach angepassten Maßstäben bewertet werden, wenn ein Nachteilsausgleich nicht ausreicht und die wesentlichen Kompetenzen des Abschlusses weiterhin nachgewiesen werden.',
    details: 'Notenschutz bedeutet: Leistungen werden nicht oder anders bewertet. Das steht später im Zeugnis.',
    icon: <Shield className="w-6 h-6" />,
    options: [
      { label: 'Antrag stellen', nextId: 'ns-step1-application', variant: 'primary' }
    ]
  },
  'ns-step1-application': {
    id: 'ns-step1-application',
    type: 'action',
    title: '1. Der Antrag',
    content: 'Notenschutz gibt es nicht automatisch. Er muss aktiv bei der Schulleitung beantragt werden.',
    details: 'Wer? Erziehungsberechtigte oder volljährige Schüler:innen.\n\nFristen:\n- Abschlussprüfungen: Spätestens 12 Wochen vor Beginn des neuen Schuljahres, also zu Beginn des 2. Halbjahres der Klasse 9.\n- Schulwechsel: 2 Wochen nach Beginn',
    icon: <FileText className="w-6 h-6" />,
    options: [
      { label: 'Antrag ist raus', nextId: 'ns-step2-consultation', variant: 'primary' }
    ]
  },
  'ns-step2-consultation': {
    id: 'ns-step2-consultation',
    type: 'action',
    title: '2. Beratung ist Pflicht',
    content: 'Die Schulleitung muss beraten. Besonders wenn es um prüfungsrelevante Leistungen geht.',
    details: 'Ziel ist eine umfassende Transparenz, damit die Betroffenen die Auswirkungen auf Abschlüsse und die Wahl der Fächer nachvollziehen und verstehen können.',
    icon: <Users className="w-6 h-6" />,
    options: [
      { label: 'Beratung erledigt', nextId: 'ns-step3-info', variant: 'primary' }
    ]
  },
  'ns-step3-info': {
    id: 'ns-step3-info',
    type: 'info',
    title: '3. Der Zeugnisvermerk',
    content: 'Du musst aufklären: Der Notenschutz wird im Zeugnis vermerkt.',
    details: 'Der Vermerk sagt, was anders bewertet wurde, nennt aber KEINEN Grund (keine Diagnose). Dokumentiere diese Aufklärung gut!',
    icon: <AlertOctagon className="w-6 h-6" />,
    options: [
      { label: 'Verstanden & Notiert', nextId: 'ns-step4-check-grade', variant: 'warning' }
    ]
  },
  'ns-step4-check-grade': {
    id: 'ns-step4-check-grade',
    type: 'check',
    title: '4-6. Wer entscheidet?',
    content: 'Das hängt vom Jahrgang ab. Wo befindet sich der/die Schüler:in?',
    icon: <Scale className="w-6 h-6" />,
    options: [
      { label: 'Jahrgang 5 - 9', nextId: 'ns-grade5to9-rules', variant: 'primary' },
      { label: 'Abschlussprüfungen', nextId: 'ns-graduation-rules', variant: 'danger' }
    ]
  },
  'ns-grade5to9-rules': {
    id: 'ns-grade5to9-rules',
    type: 'check',
    title: 'Entscheidung Jg. 5-9',
    content: 'Hier entscheidet die Zeugniskonferenz.',
    details: 'Basis sind fachliche Stellungnahmen und Diagnostik. Es ist eine pädagogische Gesamtabwägung.',
    icon: <Users className="w-6 h-6" />,
    options: [
      { label: 'Konferenz hat beschlossen', nextId: 'ns-step7-binding', variant: 'success' }
    ]
  },
  'ns-graduation-rules': {
    id: 'ns-graduation-rules',
    type: 'check',
    title: 'Entscheidung Abschluss',
    content: 'Hier entscheidet die Schulbehörde.',
    details: 'Da Abschlüsse landesweit vergleichbar sein müssen, braucht es eine externe Stellungnahme (max. 18 Monate alt) und die Behördenentscheidung.',
    icon: <GraduationCap className="w-6 h-6" />,
    options: [
      { label: 'Behörde hat entschieden', nextId: 'ns-step7-binding', variant: 'success' }
    ]
  },
  'ns-step7-binding': {
    id: 'ns-step7-binding',
    type: 'stop',
    title: '7. Achtung: Verbindlich!',
    content: 'Wurde eine Leistung unter Notenschutz erbracht, kann man das nachträglich NICHT mehr ändern.',
    details: 'Das dient der Fairness und Rechtssicherheit. Kein "Taktieren" im Nachhinein.',
    icon: <Ban className="w-6 h-6" />,
    options: [
      { label: 'Akzeptiert', nextId: 'ns-step8-notification', variant: 'primary' }
    ]
  },
  'ns-step8-notification': {
    id: 'ns-step8-notification',
    type: 'action',
    title: '8. Meldung an Behörde',
    content: 'Die Schulleitung meldet der Behörde Fach und Form des Notenschutzes.',
    details: 'Meistens mit der Prüfungsanmeldung (Frist oft 1. November).',
    icon: <MessageCircle className="w-6 h-6" />,
    options: [
      { label: 'Gemeldet', nextId: 'ns-step9-adaptation', variant: 'primary' }
    ]
  },
  'ns-step9-adaptation': {
    id: 'ns-step9-adaptation',
    type: 'action',
    title: '9. Aufgaben anpassen',
    content: 'Die Prüfungsaufgaben werden angepasst (mit ReBUZ/Mobilem Dienst).',
    details: 'Ziel: Nachteilsausgleich ohne das Niveau abzusenken. Fachlich gleichwertig bleiben!',
    icon: <PenTool className="w-6 h-6" />,
    options: [
      { label: 'Aufgaben sind bereit', nextId: 'ns-step10-certificate', variant: 'success' }
    ]
  },
  'ns-step10-certificate': {
    id: 'ns-step10-certificate',
    type: 'success',
    title: '10. Das Zeugnis',
    content: 'Im Zeugnis steht, was nicht/anders bewertet wurde. Aber NICHT warum.',
    details: 'So ist es transparent, schützt aber die Privatsphäre des Schülers/der Schülerin.',
    icon: <ScrollText className="w-6 h-6" />
  },

  // --- FÖRDERPLANUNG (FP) - §11 ---
  'fp-start': {
    id: 'fp-start',
    type: 'start',
    title: 'Dein Start: Warum ein Förderplan?',
    content: 'Im Unterschied zur früheren Verordnung ist ein Förderplan schon erforderlich, wenn über einen längeren Zeitraum Anzeichen für einen besonderen individuellen Förderbedarf bestehen, während er zuvor vor allem auf sonderpädagogische Fälle begrenzt war.',
    details: 'Ziel: Das Ziel eines Förderplans ist es, individuelle Lern- und Entwicklungsbedarfe systematisch zu erfassen und durch gezielte Maßnahmen die bestmögliche Förderung eines SoS sicherzustellen.',
    icon: <ClipboardList className="w-6 h-6" />,
    options: [
      { label: 'Los geht\'s', nextId: 'fp-mandatory-check', variant: 'primary' }
    ]
  },
  'fp-mandatory-check': {
    id: 'fp-mandatory-check',
    type: 'info',
    title: 'Wann ist ein Förderplan Pflicht?',
    content: 'Ein Förderplan ist verpflichtend bei Schüler:innen mit:',
    bulletPoints: [
      'Sonderpädagogischem Förderbedarf',
      'Lernzieldifferenz (§19)',
      'Nachteilsausgleich (§16)',
      'Notenschutz (§§ 17,18)',
      'LRS / Rechenschwäche / Autismus',
      'Übergang aus Vorbereitungskursen (§7)'
    ],
    icon: <AlertOctagon className="w-6 h-6" />,
    options: [
      { label: 'Verstanden', nextId: 'fp-step1-initiation', variant: 'primary' }
    ]
  },
  'fp-step1-initiation': {
    id: 'fp-step1-initiation',
    type: 'action',
    title: 'Wer macht den Anfang?',
    content: 'Wer leitet die Förderplanung ein und wer hat den Hut auf?',
    bulletPoints: [
      'Die Klassenlehrkraft (oder eine beauftragte Lehrkraft) leitet den Prozess ein und bezieht bei Bedarf frühzeitig den/die Sonderpädagog:in des Jahrgangs mit ein.',
      'Der Förderplan wird anschließend im Team erarbeitet; die Schulleitung stellt hierfür verbindlich Zeitressourcen zur Verfügung.',
      'Das Ergebnis hältst du verbindlich im Förderplan fest.'
    ],
    icon: <UserPlus className="w-6 h-6" />,
    options: [
      { label: 'Weiter zu den Inhalten', nextId: 'fp-step2-contents', variant: 'primary' }
    ]
  },
  'fp-step2-contents': {
    id: 'fp-step2-contents',
    type: 'action',
    title: 'Was gehört rein?',
    content: 'Das Herzstück deines Plans. Diese Punkte dürfen nicht fehlen:',
    bulletPoints: [
      'Wie ist die aktuelle Lernsituation?',
      'Welche Ziele sind realistisch erreichbar?',
      'Wie war die Entwicklung bisher?',
      'Was machst du konkret? (Methoden, Material, Hilfsmittel)',
      'Wer ist verantwortlich? (Namen, Datum, Unterschriften)',
      'Wann schauen wir wieder drauf? (Zeitplan & Evaluation)'
    ],
    icon: <ListChecks className="w-6 h-6" />,
    options: [
      { label: 'Zum Check-up', nextId: 'fp-step6-evaluation', variant: 'primary' }
    ]
  },
  'fp-step6-evaluation': {
    id: 'fp-step6-evaluation',
    type: 'success',
    title: 'Der Check-up (Evaluation)',
    content: 'Ein Förderplan ist nie "fertig". Er ist ein Kreislauf.',
    bulletPoints: [
      'Setz dich mind. 1x jährlich mit Schüler:in und Eltern zusammen.',
      'Schau, was geklappt hat und was nicht.',
      'Der Plan kommt in die Schülerakte.'
    ],
    icon: <RefreshCw className="w-6 h-6" />,
     options: [
      { label: 'Zyklus neu starten', nextId: 'fp-start', variant: 'success' }
    ]
  },
  'fp-success': {
    id: 'fp-success',
    type: 'success',
    title: 'Kreislauf abgeschlossen',
    content: 'Du hast den Durchlauf geschafft. Jetzt beginnt die Umsetzung und später die erneute Evaluation.',
    icon: <CheckCircle className="w-6 h-6" />
  }
};