import InterviewPrep from '@/components/InterviewPrep';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          AI-Powered Interview Preparation
        </h1>
        <p className="text-center text-gray-300 mb-8 max-w-5xl mx-auto">
          Prepare for your next interview with our AI-powered platform. Choose from different interview types and prompt engineering techniques to get personalized, detailed responses that will help you excel in your interviews.
        </p>
        <InterviewPrep />
      </div>
    </main>
  );
}
