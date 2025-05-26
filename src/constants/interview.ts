import { InterviewType, PromptType } from '@/types/interview';

export const interviewTypes: InterviewType[] = [
  { id: 'behavioral', name: 'Behavioral interview' },
  { id: 'technical', name: 'Technical Interview' },
  { id: 'system-design', name: 'System Design' },
  { id: 'leadership', name: 'Leadership & Management' },
];

export const promptTypes: PromptType[] = [
  { id: 'zero-shot', name: 'Zero-Shot Prompting' },
  { id: 'few-shot', name: 'Few-Shot Learning' },
  { id: 'chain-of-thought', name: 'Chain of Thought' },
  { id: 'role-play', name: 'Role-Playing' },
  { id: 'step-by-step', name: 'Step-by-Step Analysis' },
];

export const difficultyLevels = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
]; 