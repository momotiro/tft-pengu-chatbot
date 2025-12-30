import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Create a new session
export async function POST() {
  try {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session = await prisma.session.create({
      data: {
        sessionId,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.sessionId,
        createdAt: session.createdAt,
      },
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      {
        error: 'Failed to create session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Get session information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await prisma.session.findUnique({
      where: { sessionId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          select: {
            role: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.sessionId,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        messageCount: session.messages.length,
        messages: session.messages,
      },
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
