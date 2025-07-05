import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChatMessage } from '../../../core/interfaces/chat.interface';

@Component({
  selector: 'app-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="flex animate-in fade-in-50 duration-500" 
      [class.justify-end]="isUserMessage()" 
      [class.justify-start]="!isUserMessage()"
    >
      <div
        class="max-w-xs lg:max-w-2xl rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md"
        [class.bg-blue-600]="isUserMessage()"
        [class.text-white]="isUserMessage()"
        [class.ml-12]="isUserMessage()"
        [class.bg-white]="!isUserMessage()"
        [class.dark:bg-gray-800]="!isUserMessage()"
        [class.text-gray-900]="!isUserMessage()"
        [class.dark:text-white]="!isUserMessage()"
        [class.border]="!isUserMessage()"
        [class.border-gray-200]="!isUserMessage()"
        [class.dark:border-gray-700]="!isUserMessage()"
        [class.mr-12]="!isUserMessage()"
      >
        <!-- Assistant indicator -->
        @if (!isUserMessage()) {
          <div class="flex items-center mb-2">
            <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400">
              Amazon Q
            </span>
          </div>
        }

        <!-- Message content -->
        <div class="prose prose-sm max-w-none">
          <p class="text-sm leading-relaxed mb-0">{{ message().content }}</p>
        </div>

        <!-- Timestamp -->
        <div 
          class="flex items-center justify-end mt-2 pt-1"
          [class.border-t]="!isUserMessage()"
          [class.border-gray-100]="!isUserMessage()"
          [class.dark:border-gray-700]="!isUserMessage()"
        >
          <span 
            class="text-xs font-medium"
            [class.text-white]="isUserMessage()"
            [class.opacity-70]="isUserMessage()"
            [class.text-gray-500]="!isUserMessage()"
            [class.dark:text-gray-400]="!isUserMessage()"
          >
            {{ formatTimestamp(message().timestamp) }}
          </span>
        </div>
      </div>
    </div>
  `,
})
export class MessageComponent {
  /**
   * 表示するメッセージ
   */
  message = input.required<ChatMessage>();

  /**
   * ユーザーメッセージかどうかを判定
   */
  isUserMessage(): boolean {
    return this.message().role === 'user';
  }

  /**
   * タイムスタンプをフォーマットする
   */
  formatTimestamp(timestamp: Date): string {
    return timestamp.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
} 