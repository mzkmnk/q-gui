import { type ComponentFixture, TestBed } from '@angular/core/testing';
import type { ChatMessage } from '../../../core/interfaces/chat.interface';
import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  const mockUserMessage: ChatMessage = {
    id: '1',
    role: 'user',
    content: 'Hello, this is a test message',
    timestamp: new Date('2024-01-15T10:30:00Z'),
  };

  const mockAssistantMessage: ChatMessage = {
    id: '2',
    role: 'assistant',
    content: 'This is an assistant response',
    timestamp: new Date('2024-01-15T10:31:00Z'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockUserMessage);

    // Act
    fixture.detectChanges();

    // Assert
    expect(component).toBeTruthy();
  });

  it('should display message content correctly', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockUserMessage);

    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement;
    const contentElement = compiled.querySelector('.prose p');
    expect(contentElement.textContent).toContain(mockUserMessage.content);
  });

  it('should display formatted timestamp', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockUserMessage);

    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement;
    const timestampElement = compiled.querySelector('span:last-child');
    expect(timestampElement.textContent).toContain('19:30'); // UTC+9の時間
  });

  it('should apply correct styles for user message', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockUserMessage);

    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement;
    const messageContainer = compiled.querySelector('.flex');
    const messageContent = compiled.querySelector('.rounded-2xl');

    expect(messageContainer.className).toContain('justify-end');
    expect(messageContent.className).toContain('bg-blue-600');
    expect(messageContent.className).toContain('text-white');
  });

  it('should apply correct styles for assistant message', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockAssistantMessage);

    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement;
    const messageContainer = compiled.querySelector('.flex');
    const messageContent = compiled.querySelector('.rounded-2xl');

    expect(messageContainer.className).toContain('justify-start');
    expect(messageContent.className).toContain('bg-white');
    expect(messageContent.className).toContain('text-gray-900');
  });

  it('should correctly identify user message', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockUserMessage);
    fixture.detectChanges();

    // Act
    const isUserMessage = component.isUserMessage();

    // Assert
    expect(isUserMessage).toBe(true);
  });

  it('should correctly identify assistant message', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockAssistantMessage);
    fixture.detectChanges();

    // Act
    const isUserMessage = component.isUserMessage();

    // Assert
    expect(isUserMessage).toBe(false);
  });

  it('should format timestamp correctly', () => {
    // Arrange
    fixture.componentRef.setInput('message', mockUserMessage);
    fixture.detectChanges();

    // Act
    const formattedTime = component.formatTimestamp(mockUserMessage.timestamp);

    // Assert
    expect(formattedTime).toBe('19:30'); // UTC+9の時間
  });

  it('should handle different message roles', () => {
    // Arrange
    const systemMessage: ChatMessage = {
      id: '3',
      role: 'system',
      content: 'System message',
      timestamp: new Date('2024-01-15T10:32:00Z'),
    };
    fixture.componentRef.setInput('message', systemMessage);

    // Act
    fixture.detectChanges();

    // Assert
    const compiled = fixture.nativeElement;
    const messageContainer = compiled.querySelector('.flex');
    expect(messageContainer.className).toContain('justify-start');
    expect(component.isUserMessage()).toBe(false);
  });
});
