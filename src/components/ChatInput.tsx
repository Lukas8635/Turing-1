/**
 * Props for the ChatInput component
 * @property input - Current input value
 * @property setInput - Function to update input value
 * @property isLoading - Loading state indicator
 * @property onSubmit - Function to handle form submission
 */
interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * ChatInput component that handles user message input
 * Features:
 * - Text input with auto-resize
 * - Enter key submission (Shift+Enter for new line)
 * - Loading state handling
 * - Submit button with loading state
 */
export const ChatInput = ({ input, setInput, isLoading, onSubmit }: ChatInputProps) => {
  return (
    // Form container with flex layout
    <form onSubmit={onSubmit} className="flex gap-2 sticky bottom-0 bg-transparent z-10">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 h-16 resize-none focus:ring-2 focus:ring-blue-500 shadow-md"
        placeholder="Type your question or answer and press Enter..."
        disabled={isLoading}
        onKeyDown={(e) => {
          // Submit on Enter, new line on Shift+Enter
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
      />
      {/* Submit button with loading state */}
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 h-16"
      >
        {isLoading ? '...' : 'Send'}
      </button>
    </form>
  );
}; 