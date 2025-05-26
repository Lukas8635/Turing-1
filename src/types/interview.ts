export interface InterviewType {
  id: string;
  name: string;
}

export interface PromptType {
  id: string;
  name: string;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: string;
  status?: 'sending' | 'error' | 'sent';
}

export interface InterviewRequest {
  type: string;
  promptType: string;
  question: string;
  difficulty: Difficulty;
  jobDescription?: string;
  conversation: ChatMessage[];
  rolePlayPersona?: string;
}

export interface InterviewResponse {
  response: string;
} 