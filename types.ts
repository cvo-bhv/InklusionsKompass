import React from 'react';

export type NodeType = 'start' | 'check' | 'action' | 'stop' | 'success' | 'info';

export interface PathOption {
  label: string;
  nextId: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

export interface SubjectExample {
  subject: string;
  iconKey: 'math' | 'german' | 'english' | 'general';
  items: string[];
}

export interface RoadmapNode {
  id: string;
  title: string;
  type: NodeType;
  content: string;
  details?: string; // Collapsible extra info (legal text, etc.)
  icon?: React.ReactNode;
  options?: PathOption[]; // If null, it's a terminal node or auto-continues
  externalLink?: string;
  examples?: SubjectExample[]; // New structured examples
  bulletPoints?: string[]; // List of items to reveal one by one
}

export interface HistoryItem {
  nodeId: string;
  selectedOptionLabel?: string;
  alignment: 'left' | 'right'; // New property for visual positioning
}