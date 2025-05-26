import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { InterviewRequest } from '@/types/interview';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Security configuration
const RATE_LIMIT = 10; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const MAX_REQUEST_SIZE = 1024 * 10; // 10KB
const requestCounts = new Map<string, number[]>();

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Prompt templates for different techniques
const promptTemplates = {
  'zero-shot': (question: string) => 
    `Please provide a detailed response to this interview question: ${question}`,
  
  'few-shot': (question: string) => 
    `Here are some example interview questions and answers:
    Q: "Tell me about a time you faced a challenge at work."
    A: "I faced a challenge when our team had to deliver a project under a tight deadline..."
    
    Q: "How do you handle conflicts in a team?"
    A: "I believe in addressing conflicts directly and professionally..."
    
    Now, please answer this interview question: ${question}`,
  
  'chain-of-thought': (question: string) =>
    `Let's think through this interview question step by step:
    1. What is the interviewer really asking?
    2. What key points should I address?
    3. What examples can I use?
    4. How can I structure my response?
    
    Question: ${question}`,
  
  'role-play': (question: string) =>
    `You are an experienced interviewer. Please provide a comprehensive response to this question as if you were the candidate: ${question}`,
  
  'step-by-step': (question: string) =>
    `Please analyze this interview question and provide a structured response:
    1. Understanding the question
    2. Key points to address
    3. Relevant examples
    4. Conclusion
    
    Question: ${question}`,
};

// Rate limiting middleware
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Remove requests outside the time window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    // CORS headers
    const headers = { ...corsHeaders };

    // Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415, headers }
      );
    }

    // Check request size
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413, headers }
      );
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429, headers }
      );
    }

    const body: InterviewRequest = await request.json();
    const { type, promptType, question } = body;

    // Input validation
    if (!question || !type || !promptType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    // Validate input length
    if (question.length > 1000) {
      return NextResponse.json(
        { error: 'Question too long' },
        { status: 400, headers }
      );
    }

    // Get the appropriate prompt template
    const promptTemplate = promptTemplates[promptType as keyof typeof promptTemplates];
    if (!promptTemplate) {
      return NextResponse.json(
        { error: 'Invalid prompt type' },
        { status: 400, headers }
      );
    }

    // Generate response using OpenAI
    const jobDescText = body.jobDescription ? ` The job description is: ${body.jobDescription}` : '';
    const personaText = body.promptType === 'role-play' && body.rolePlayPersona ? ` Answer as if you are ${body.rolePlayPersona}.` : '';
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert interview coach specializing in ${type} interviews. Answer the user's question in 2-3 sentences, directly and concisely, without any introductory or clarifying paragraphs. Be brief. Adjust the complexity of your answer to match a ${body.difficulty} level.${jobDescText}${personaText} Do not include phrases like 'Certainly', 'When facing', or any preamble. Only provide the answer itself.`
        },
        {
          role: "user",
          content: promptTemplate(question)
        }
      ],
      temperature: 0.7,
      max_tokens: 100,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });

    return NextResponse.json({
      response: completion.choices[0].message.content
    }, { headers });

  } catch (error) {
    console.error('Error processing interview request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
} 