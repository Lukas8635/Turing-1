import { ChatMessage as ChatMessageType } from '@/types/interview';

/**
 * Props for the ChatMessage component
 * @property message - The chat message to display
 * @property onRetry - Optional callback function to retry failed messages
 */
interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: (messageId: string) => void;
}

/**
 * ChatMessage component that renders individual chat messages
 * Handles different message states (sending, error) and styling based on message role
 */
export const ChatMessage = ({ message, onRetry }: ChatMessageProps) => {
  return (
    // Container with conditional alignment based on message role
    <div
      className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {/* Message bubble with conditional styling */}
      <div
        className={`px-4 py-2 rounded-2xl max-w-[75%] whitespace-pre-wrap shadow-md transition-all duration-200 text-base font-medium relative group
          ${message.role === 'user'
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-100 rounded-bl-none border border-blue-500'}
          ${message.status === 'error' ? 'border-red-500' : ''}
        `}
      >
        {/* Message content or loading animation */}
        {message.content || (message.status === 'sending' && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        ))}

        {/* Retry button for failed messages */}
        {message.status === 'error' && onRetry && (
          <button
            onClick={() => onRetry(message.id)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Retry message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}; 