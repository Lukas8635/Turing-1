'use client';

import { useState, useRef, useEffect } from 'react';
import { InterviewForm } from './InterviewForm';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useInterviewChat } from '@/hooks/useInterviewChat';

/**
 * Main InterviewPrep component that orchestrates the interview preparation interface
 * Handles state management and coordinates between different components
 */
export default function InterviewPrep() {
  // State management for interview settings
  const [selectedType, setSelectedType] = useState<string>('developer');
  const [selectedPrompt, setSelectedPrompt] = useState<string>('zero-shot');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medium');
  const [input, setInput] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [rolePlayPersona, setRolePlayPersona] = useState<string>('');
  
  // Ref for auto-scrolling chat to bottom
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Custom hook for managing chat functionality
  const {
    conversation,
    isLoading,
    sendMessage,
    retryMessage,
    downloadConversation,
  } = useInterviewChat();

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  /**
   * Handles sending new messages
   * @param e - Form event
   */
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(
      input,
      selectedType,
      selectedPrompt,
      selectedDifficulty,
      jobDescription,
      selectedPrompt === 'role-play' ? rolePlayPersona : undefined
    );
    setInput('');
  };

  return (
    // Main container with gradient background and responsive padding
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl p-0 sm:p-8 mt-8 mb-8 border border-gray-700">
      {/* Interview settings form */}
      <InterviewForm
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedPrompt={selectedPrompt}
        setSelectedPrompt={setSelectedPrompt}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        rolePlayPersona={rolePlayPersona}
        setRolePlayPersona={setRolePlayPersona}
      />

      {/* Chat messages container */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-4 mb-4 min-h-[250px] max-h-[400px] overflow-y-auto border border-gray-700 shadow-inner">
        {/* Empty state message */}
        {conversation.length === 0 && (
          <div className="text-gray-500 text-center">Start the conversation by asking a question or answering the AI.</div>
        )}
        
        {/* Render chat messages */}
        {conversation.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onRetry={retryMessage ? (id) => retryMessage(
              id,
              selectedType,
              selectedPrompt,
              selectedDifficulty,
              jobDescription,
              selectedPrompt === 'role-play' ? rolePlayPersona : undefined
            ) : undefined}
          />
        ))}
        {/* Auto-scroll anchor */}
        <div ref={chatEndRef} />
      </div>

      {/* Chat input form */}
      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        onSubmit={handleSend}
      />

      {/* Download conversation button - only shown when there are messages */}
      {conversation.length > 0 && (
        <button
          onClick={downloadConversation}
          className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
        >
          Download Conversation
        </button>
      )}
    </div>
  );
} 