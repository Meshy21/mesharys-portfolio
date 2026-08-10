import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Strict in-memory rate limiter per IP (6 requests per 60 seconds)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 6;

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count += 1;
  return { allowed: true };
}

// Zero-token greeting patterns
const GREETING_PATTERNS = /^(hi+|hello+|hey+|good\s*(morning|afternoon|evening)|who\s*are\s*you|what\s*can\s*you\s*do|\?+)$/i;

// Patterns for off-topic/unnecessary questions that consume excess API tokens
const OFF_TOPIC_PATTERNS = [
  // Math & calculations unrelated to portfolio
  /\b(\d+\s*[\+\-\*\/]\s*\d+|calculate|square\s*root|solve\s*for|algebra|calculus)\b/i,
  // Unrelated code generation or script writing requests
  /\b(write|create|generate|code|build|make)\s+(a|an)?\s*(python|javascript|js|ts|c\+\+|java|html|css|sql|bash|sh|php|ruby)?\s*(script|program|game|bot|calculator|scraper|crawler|app|website|function|class)\b/i,
  // Creative writing, homework, essays, translation
  /\b(write\s+(an?\s+)?(essay|story|poem|song|letter|summary|speech)|translate\s+this|homework)\b/i,
  // Recipes & cooking
  /\b(recipe|ingredients?|how\s+to\s+cook|bake|dish|meal)\b/i,
  // General knowledge trivia / news / weather
  /\b(weather\s+in|capital\s+of|who\s+(is|was)\s+(president|prime\s+minister|king|queen|emperor)|tell\s+me\s+a\s+joke|movie\s+recommendations?)\b/i,
  // Prompt injection & system prompt hacking
  /\b(ignore\s+previous|disregard|system\s+prompt|jailbreak|pretend\s+to\s+be|act\s+as|dan\s+mode)\b/i,
];

// Check if a prompt is relevant to Meshary's portfolio
function isPortfolioRelevant(text: string): boolean {
  const lower = text.toLowerCase();
  const portfolioKeywords = [
    'meshary', 'aquino', 'skill', 'project', 'experience', 'background', 'contact',
    'email', 'phone', 'resume', 'cv', 'github', 'linkedin', 'payroll', 'syncsolve',
    'wood', 'knot', 'braille', 'conbraillient', 'yolo', 'flutter', 'next.js', 'fastapi',
    'hire', 'work', 'job', 'developer', 'engineer', 'stack', 'tech', 'about', 'services',
    'location', 'makati', 'philippines', 'education', 'degree', 'qualification'
  ];
  return portfolioKeywords.some((kw) => lower.includes(kw));
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by client IP
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'anonymous-client';

    const limit = checkRateLimit(clientIp);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: `Rate limit reached. Please wait ${limit.retryAfter} seconds before asking another question.` },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      );
    }

    // 2. Body parsing & validation
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required.' },
        { status: 400 }
      );
    }

    if (messages.length > 15) {
      return NextResponse.json(
        { error: 'Session query limit reached. Please reset the chat to start a new session.' },
        { status: 400 }
      );
    }

    // 3. Input sanitization & 250 character limit per user message
    const sanitizedMessages: { role: 'user' | 'model'; text: string }[] = [];
    for (const m of messages) {
      if (typeof m !== 'object' || m === null || typeof m.text !== 'string') {
        return NextResponse.json(
          { error: 'Invalid message payload structure.' },
          { status: 400 }
        );
      }

      const cleanRole = m.role === 'user' ? 'user' : 'model';
      // Cap at 250 chars max to prevent long input token waste
      const cleanText = m.text.slice(0, 250).trim();

      if (cleanText.length > 0) {
        sanitizedMessages.push({ role: cleanRole, text: cleanText });
      }
    }

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: 'No valid message content provided.' },
        { status: 400 }
      );
    }

    const latestUserMessage = sanitizedMessages.filter((m) => m.role === 'user').pop()?.text || '';

    // ZERO TOKEN FILTER 1: Instant response for simple greetings
    if (GREETING_PATTERNS.test(latestUserMessage)) {
      return NextResponse.json({
        text: "Hello! I am **Meshary AI**, Meshary Aquino's interactive portfolio assistant. How can I help you learn about Meshary's technical skills, showcase projects, or background?",
      });
    }

    // ZERO TOKEN FILTER 2: Instant redirection for off-topic / unnecessary questions
    const isOffTopic = OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(latestUserMessage));
    const hasPortfolioKeyword = isPortfolioRelevant(latestUserMessage);

    if (isOffTopic && !hasPortfolioKeyword) {
      return NextResponse.json({
        text: "I am specialized specifically as **Meshary Aquino's Portfolio Assistant**. To save tokens and stay focused, I can only answer questions about Meshary's skills, software engineering projects, work experience, and contact information. Please feel free to ask about those!",
      });
    }

    // 4. API Key Check
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        text: 'The Gemini API key is not currently configured on the server. Please add GEMINI_API_KEY in your environment variables to enable live AI responses.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are Meshary AI, an intelligent, conversational portfolio assistant for Meshary A. Aquino.
Your sole role is to help visitors, recruiters, and collaborators learn about Meshary's skills, projects, and professional background.

CRITICAL DIRECTIVES:
- Do NOT answer off-topic queries, general coding requests, or non-portfolio questions. Politely decline and redirect to Meshary's qualifications.
- Keep all answers concise, friendly, and under 3-4 sentences whenever possible.

Background Summary:
- Meshary A. Aquino is a Computer Engineer, IT Specialist, and Full-Stack Developer based in Makati City, Philippines.
- Specializes in full-stack web applications, edge AI & computer vision, mobile apps (Flutter/Dart), and database systems.

Contact Info & Links:
- Email: meshary.aquino21@gmail.com
- Location: Makati City, Metro Manila, Philippines
- Phone: +63 995 480 6524
- LinkedIn: https://www.linkedin.com/in/mesharyaquino
- Resume: https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing
- GitHub: https://github.com/Meshy21

Key Projects:
1. Enterprise Online Secured Payroll Web App (Next.js 14, FastAPI, PostgreSQL/SQLite, Tax math, SSS 2025, AES-256): https://github.com/Meshy21/payroll-online-web | Demo: https://payroll-online-web.vercel.app/
2. SyncSolve API — Conflict Resolution Engine (LWW, Vector Clock, JSON Delta): https://scratch-anye.onrender.com
3. Wood Knot Detection Mobile App (YOLOv8, ONNX, TFLite, Flutter, <45ms latency): https://github.com/Meshy21/woodknot
4. Braille Haptic Reader (Raspberry Pi 4, YOLOv5 OCR, custom solenoids, 97.82% accuracy)
5. Custom Payroll Management System (Python, PyQt6, PostgreSQL)

Core Technical Skills:
- Languages: Python, TypeScript, JavaScript, Dart, PHP, SQL
- Frameworks: Next.js, React, Remix, FastAPI, Flutter, PyQt6
- AI / Vision: YOLOv8, YOLOv5, TensorFlow Lite, ONNX, OpenCV
- Systems: PostgreSQL, Firestore, Docker, Raspberry Pi, Render`;

    // History Context Truncation: Only send the last 4 messages (2 conversation turns) to minimize input tokens
    const recentMessages = sanitizedMessages.slice(-4);

    const formattedContents = recentMessages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process your request right now.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error('Gemini API Route Exception:', error);
    return NextResponse.json(
      { error: 'An error occurred while communicating with the AI service. Please try again later.' },
      { status: 500 }
    );
  }
}

