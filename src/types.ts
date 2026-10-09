export type ScreenType = 'welcome' | 'worlds' | 'engine' | 'missions' | 'journal' | 'parents' | 'quest-detail';

export interface Realm {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryIcon: string;
  status: 'unlocked' | 'locked';
  completedMissions: number;
  totalMissions: number;
  crystals: number;
  nextMissionTitle: string;
  actionText: string;
  imageUrl: string;
  imageAlt: string;
  bridgeName?: string;
  bridgeIcon1?: string;
  bridgeIcon2?: string;
  lockRequirement?: string;
  lockProgress?: { current: number; total: number };
}

export interface Mystery {
  id: string;
  category: string;
  categoryIcon: string;
  question: string;
  xp: number;
  answerSummary: string;
  fullExplanation: string;
  funFact: string;
}

export interface Badge {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  unlocked: boolean;
  category: string;
}

export interface Mission {
  id: string;
  title: string;
  realm: string;
  subject: string;
  rewardCrystals: number;
  durationMinutes: number;
  status: 'completed' | 'active' | 'locked';
  storySnippet: string;
}
