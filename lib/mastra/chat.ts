import { penguAgent } from './index';
import { prisma } from '../prisma';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
}

/**
 * Process a chat message and get a response from Pengu
 * @param message - User's message
 * @param sessionId - Session ID (will be created if not provided)
 * @param conversationHistory - Previous conversation messages
 */
export async function chat(
  message: string,
  sessionId?: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // Create or get session
    let session;
    if (sessionId) {
      session = await prisma.session.findUnique({
        where: { sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' } } }
      });
    }

    if (!session) {
      // Create new session
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      session = await prisma.session.create({
        data: {
          sessionId: newSessionId,
        },
        include: { messages: true }
      });
      sessionId = newSessionId;
    }

    // Save user message to database
    await prisma.message.create({
      data: {
        sessionId: session.id,
        role: 'user',
        content: message,
      },
    });

    // Prepare conversation history for the agent
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: message }
    ];

    // Get response from Pengu agent
    const response = await penguAgent.generate(messages);

    // Extract text from response
    const assistantMessage = response.text || 'Squawk! Sorry, I had trouble responding. Try again!';

    // Save assistant response to database
    await prisma.message.create({
      data: {
        sessionId: session.id,
        role: 'assistant',
        content: assistantMessage,
      },
    });

    return {
      response: assistantMessage,
      sessionId: sessionId!,
    };
  } catch (error) {
    console.error('Error in chat function:', error);
    throw new Error('Failed to process chat message');
  }
}

/**
 * Get conversation history for a session
 */
export async function getConversationHistory(sessionId: string): Promise<ChatMessage[]> {
  const session = await prisma.session.findUnique({
    where: { sessionId },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!session) {
    return [];
  }

  return session.messages.map(msg => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));
}
