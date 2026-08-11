import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Resume PDF not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="Meshary_Aquino_Resume.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy': "frame-ancestors *",
        'Cache-Control': 'public, max-age=86400, must-revalidate',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to read resume PDF' }, { status: 500 });
  }
}
