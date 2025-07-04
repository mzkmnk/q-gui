export interface ChatMessage {
  readonly id: string;
  readonly content: string;
  readonly role: MessageRole;
  readonly timestamp: Date;
  readonly attachments?: FileAttachment[];
  readonly metadata?: MessageMetadata;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface FileAttachment {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly size: number;
  readonly type: string;
  readonly content?: string;
}

export interface MessageMetadata {
  readonly sessionId?: string;
  readonly tokenCount?: number;
  readonly processingTime?: number;
  readonly model?: string;
}

export interface ChatSession {
  readonly id: string;
  readonly title: string;
  readonly messages: ChatMessage[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly projectId?: string;
}

export interface ChatState {
  readonly currentSession: ChatSession | null;
  readonly sessions: ChatSession[];
  readonly isLoading: boolean;
  readonly error: string | null;
}
