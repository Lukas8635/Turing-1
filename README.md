# AI Interview Preparation Tool

An interactive web application that helps users prepare for technical interviews using AI-powered conversations. The application supports various interview types, difficulty levels, and prompt engineering techniques.

## Features

- 🤖 **Interactive Chat Interface**: Real-time conversation with AI interviewer
- 🎯 **Multiple Interview Types**:
  - Behavioral interview
  - Technical Interview
  - System Design
  - Leadership & Management
- 🧠 **Advanced Prompt Engineering Techniques**:
  - Zero-Shot Prompting
  - Few-Shot Learning
  - Chain of Thought
  - Role-Playing
  - Step-by-Step Analysis
- ⚙️ **Customizable Settings**:
  - Difficulty levels (Easy, Medium, Hard)
  - Job description integration
  - Custom role-play personas
- 💾 **Conversation Management**:
  - Download conversation history
  - Retry failed messages
  - Real-time message status
- 🎨 **Modern UI/UX**:
  - Responsive design
  - Loading animations
  - Error handling
  - Beautiful gradients and animations

- **Customization Options**
  - Adjustable difficulty levels (Easy, Medium, Hard)
  - Optional job description input for tailored responses
  - Role-play persona customization

- **Interactive Chat Interface**
  - Real-time AI responses
  - Message retry functionality
  - Conversation download feature
  - Auto-scrolling chat window
  - Loading states and error handling

## Project Structure

```
src/
├── app/
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/
│   ├── InterviewPrep.tsx   # Main component
│   ├── InterviewForm.tsx   # Interview settings form
│   ├── ChatMessage.tsx     # Individual chat message
│   └── ChatInput.tsx       # Chat input form
├── constants/
│   └── interview.ts    # Interview-related constants
├── hooks/
│   └── useInterviewChat.ts # Chat functionality hook
└── types/
    └── interview.ts    # TypeScript type definitions
```

## Technologies Used

- Next.js 13+ (App Router)
- React
- TypeScript
- Tailwind CSS
- Custom Hooks

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Select your interview type and difficulty level
2. Choose a prompt engineering technique
3. (Optional) Enter a job description for tailored responses
4. (Optional) Set a role-play persona if using role-play technique
5. Start the conversation by asking questions or responding to AI prompts
6. Download the conversation for future reference

## Development

The application is built with a modular architecture:

- **Components**: Reusable UI components with clear responsibilities
- **Hooks**: Custom hooks for managing chat functionality
- **Types**: TypeScript interfaces for type safety
- **Constants**: Centralized configuration for interview types and options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.




# llaura-AE.1.4
# Turing-1
