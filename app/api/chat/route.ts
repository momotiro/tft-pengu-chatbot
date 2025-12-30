import { NextRequest, NextResponse } from 'next/server';
import { chat, getConversationHistory } from '@/lib/mastra/chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    // Validate request
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Get conversation history if session exists
    let conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    if (sessionId) {
      conversationHistory = await getConversationHistory(sessionId);
    }

    // Process chat message
    const response = await chat(message, sessionId, conversationHistory);

    return NextResponse.json({
      success: true,
      data: {
        message: response.response,
        sessionId: response.sessionId,
      },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      {
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve chat history
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

    const history = await getConversationHistory(sessionId);

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        messages: history,
      },
    });
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    return NextResponse.json(
      {
        error: 'Failed to retrieve chat history',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
