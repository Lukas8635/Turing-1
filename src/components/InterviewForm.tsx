import { interviewTypes, promptTypes, difficultyLevels } from '@/constants/interview';

/**
 * Props for the InterviewForm component
 * Contains all the state and setter functions for interview settings
 */
interface InterviewFormProps {
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedPrompt: string;
  setSelectedPrompt: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  rolePlayPersona: string;
  setRolePlayPersona: (value: string) => void;
}

/**
 * InterviewForm component that handles all interview settings
 * Features:
 * - Interview type selection
 * - Difficulty level selection
 * - Prompt engineering technique selection
 * - Role-play persona input (when role-play is selected)
 * - Job description input
 */
export const InterviewForm = ({
  selectedType,
  setSelectedType,
  selectedPrompt,
  setSelectedPrompt,
  selectedDifficulty,
  setSelectedDifficulty,
  jobDescription,
  setJobDescription,
  rolePlayPersona,
  setRolePlayPersona,
}: InterviewFormProps) => {
  return (
    // Main form container with grid layout
    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
      {/* Left column: Interview Type and Difficulty */}
      <div>
        {/* Interview Type selection */}
        <label className="block text-sm font-semibold mb-2 text-gray-200">
          Interview Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          {interviewTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Difficulty Level selection */}
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Difficulty Level
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
          >
            {difficultyLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Right column: Prompt Engineering and Role-play */}
      <div>
        {/* Prompt Engineering Technique selection */}
        <label className="block text-sm font-semibold mb-2 text-gray-200">
          Prompt Engineering Technique
        </label>
        <select
          value={selectedPrompt}
          onChange={(e) => setSelectedPrompt(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 mb-0"
        >
          {promptTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Role-play Persona input (conditionally rendered) */}
        {selectedPrompt === 'role-play' && (
          <div className="mt-4">
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Answer as (persona, e.g. Eminem, Sherlock Holmes)
            </label>
            <input
              type="text"
              value={rolePlayPersona}
              onChange={(e) => setRolePlayPersona(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a persona (e.g. pirate, Eminem, Sherlock Holmes)"
              disabled={selectedPrompt !== 'role-play'}
            />
          </div>
        )}
      </div>

      {/* Full-width Job Description input */}
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold mb-2 text-gray-200">
          Job Description (optional)
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 h-24 focus:ring-2 focus:ring-blue-500"
          placeholder="Paste the job description here to tailor your interview prep..."
        />
      </div>
    </form>
  );
}; 