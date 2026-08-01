import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required.' },
        { status: 400 }
      );
    }

    // Limit conversation history length to prevent context explosion and API abuse
    if (messages.length > 20) {
      return NextResponse.json(
        { error: 'Conversation length limit exceeded (max 20 messages per session).' },
        { status: 400 }
      );
    }

    // Sanitize and validate message payload objects
    const sanitizedMessages: { role: 'user' | 'model'; text: string }[] = [];
    for (const m of messages) {
      if (typeof m !== 'object' || m === null || typeof m.text !== 'string') {
        return NextResponse.json(
          { error: 'Invalid message structure.' },
          { status: 400 }
        );
      }
      
      const cleanRole = m.role === 'user' ? 'user' : 'model';
      // Truncate individual message text to max 2000 characters
      const cleanText = m.text.slice(0, 2000).trim();
      
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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        text: "The Gemini API key is not currently configured on the server. Please ensure the GEMINI_API_KEY secret is added in the environment configuration to enable live AI responses.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `You are Meshary AI, an intelligent, conversational portfolio assistant for Meshary A. Aquino.
Your role is to help visitors, recruiters, and collaborators learn about Meshary's skills, projects, and professional background in a friendly, concise, and articulate manner.

Background Summary:
- Meshary A. Aquino is a Computer Engineer, IT Specialist, and Full-Stack Developer.
- Specializes in full-stack web applications, edge AI & computer vision, mobile apps (Flutter/Dart), and database systems.

Contact Information & Official Links:
- Email: meshary.aquino21@gmail.com
- Location: Makati City, Metro Manila, Philippines
- Phone: +63 995 480 6524
- LinkedIn: https://www.linkedin.com/in/mesharyaquino
- Resume / CV (Google Drive): https://drive.google.com/file/d/1zgdQHeFZdbjkyfwAABfBjPgmxIqlUWqo/view?usp=sharing
- GitHub: https://github.com/Meshy21

Key Showcase Projects:
1. SyncSolve API — Conflict Resolution Engine:
   - High-performance stateless API for offline-first applications.
   - Handles Last-Write-Wins (LWW), Vector Clock causality analysis, and RFC 6902 JSON Delta patches.
   - Live Demo: https://scratch-anye.onrender.com

2. Wood Knot Detection Mobile App:
   - Real-time on-device lumber defect identification (<45ms latency).
   - Custom YOLOv8 model trained on 10,000+ images, quantized via ONNX to TensorFlow Lite in Flutter.
   - GitHub Repository: https://github.com/Meshy21/woodknot

3. Capstone: Braille Haptic Reader (ConBraillient):
   - Real-time OCR-to-Braille translation system on Raspberry Pi 4.
   - Features YOLOv5 text detection and custom solenoid pin driver hardware (97.82% OCR accuracy).

4. LearnMate:
   - Android tutoring app with Flutter, Dart, and Agora RTC live video conferencing & session scheduling.

5. Couple Budget Tracker & Predictive Grocery List:
   - Collaborative household financial ledger with 30-day predictive purchase forecasting built in Remix & SQL.
   - Live Demo: https://remix-couple-budget-tracker-predictive-grocery-en-242891057226.asia-southeast1.run.app

6. Custom Payroll Management System:
   - Multi-threaded Python/PyQt6 desktop app with PostgreSQL for automated taxation calculations.

7. Accountability & Inventory System:
   - PHP & SQL 3NF normalized asset management engine with dynamic form rendering.

Core Technical Skills:
- Languages: Python, TypeScript, JavaScript, Dart, PHP, SQL
- Frameworks: Next.js, React, Remix, FastAPI, Flutter, PyQt6
- Computer Vision / AI: YOLOv8, YOLOv5, TensorFlow Lite, ONNX, OpenCV
- Systems & Cloud: PostgreSQL, Firestore, Docker, Raspberry Pi, Render

Instructions:
- Respond politely and concisely using formatted Markdown.
- Provide direct answers and mention relevant live demo links or GitHub repos when requested.
- Keep responses focused on Meshary's technical qualifications and project capabilities.`;

    // Map messages to Gemini API format
    const formattedContents = sanitizedMessages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process your request right now.";

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error('Gemini API Route Exception:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
