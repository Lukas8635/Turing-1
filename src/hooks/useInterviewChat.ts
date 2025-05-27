import { useState } from 'react';
import { ChatMessage } from '@/types/interview';

export const useInterviewChat = () => {
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (
    input: string,
    selectedType: string,
    selectedPrompt: string,
    selectedDifficulty: string,
    jobDescription: string,
    rolePlayPersona?: string
  ) => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      id: Date.now().toString()
    };

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: '',
      id: (Date.now() + 1).toString(),
      status: 'sending'
    };

    setConversation(prev => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          promptType: selectedPrompt,
          question: input,
          difficulty: selectedDifficulty,
          jobDescription,
          conversation: conversation.map(msg => ({ role: msg.role, content: msg.content })),
          rolePlayPersona: selectedPrompt === 'role-play' ? rolePlayPersona : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();

      setConversation(prev => prev.map(msg => 
        msg.id === assistantMessage.id 
          ? { ...msg, content: data.response, status: undefined }
          : msg
      ));

    } catch (error) {
      // setConversation(prev => prev.map(msg => 
      //   msg.id === assistantMessage.id 
      //     // ? { ...msg, content: 'An error occurred while processing your request.', status: 'error' }
      //     // : msg
      // ));
    } finally {
      setIsLoading(false);
    }
  };

  const retryMessage = async (
    messageId: string,
    selectedType: string,
    selectedPrompt: string,
    selectedDifficulty: string,
    jobDescription: string,
    rolePlayPersona?: string
  ) => {
    const messageToRetry = conversation.find(msg => msg.id === messageId);
    if (!messageToRetry) return;

    const userMessage = conversation[conversation.findIndex(msg => msg.id === messageId) - 1];
    if (!userMessage) return;

    setConversation(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: '', status: 'sending' }
        : msg
    ));

    try {
      const res = await fetch('/api/interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedType,
          promptType: selectedPrompt,
          question: userMessage.content,
          difficulty: selectedDifficulty,
          jobDescription,
          conversation: conversation.slice(0, conversation.findIndex(msg => msg.id === messageId))
            .map(msg => ({ role: msg.role, content: msg.content })),
          rolePlayPersona: selectedPrompt === 'role-play' ? rolePlayPersona : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      const data = await res.json();
      
      setConversation(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: data.response, status: undefined }
          : msg
      ));
    } catch (error) {
      // setConversation(prev => prev.map(msg => 
      //   msg.id === messageId 
      //     ? { ...msg, content: 'An error occurred while processing your request.', status: 'error' }
      //     : msg
      // ));
    }
  };

  const downloadConversation = () => {
    const text = conversation
      .map((msg) => `${msg.role === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n');
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'interview-conversation.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return {
    conversation,
    isLoading,
    sendMessage,
    retryMessage,
    downloadConversation,
  };
}; 