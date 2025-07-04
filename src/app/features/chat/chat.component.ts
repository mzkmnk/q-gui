import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col h-full">
      <!-- Chat header -->
      <div
        class="flex-shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-gray-900 dark:text-white">
            Amazon Q チャット
          </h2>
          <div class="flex items-center space-x-2">
            <!-- Connection status indicator -->
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              未接続
            </span>
          </div>
        </div>
      </div>

      <!-- Chat messages area -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-4xl mx-auto">
          <!-- Welcome message -->
          <div class="text-center py-12">
            <div class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.838-.454l-4.462 1.19a1 1 0 01-1.235-1.235l1.19-4.462A8.955 8.955 0 013 12a8 8 0 118 8z"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Amazon Q へようこそ
            </h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              AWS プロファイルを選択してチャットを開始してください
            </p>
          </div>

          <!-- Placeholder for messages -->
          <div class="space-y-6">
            <!-- Example user message -->
            <div class="flex justify-end">
              <div
                class="max-w-xs lg:max-w-md bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                <p class="text-sm">このコードを改善する方法はありますか？</p>
                <p class="text-xs opacity-75 mt-1">12:34</p>
              </div>
            </div>

            <!-- Example assistant message -->
            <div class="flex justify-start">
              <div
                class="max-w-xs lg:max-w-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2"
              >
                <p class="text-sm">
                  もちろんです！いくつかの改善提案があります。まず、型安全性を向上させるために...
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  12:35
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat input area -->
      <div
        class="flex-shrink-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4"
      >
        <div class="max-w-4xl mx-auto">
          <div class="flex items-end space-x-4">
            <!-- File attachment button -->
            <button
              type="button"
              class="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="ファイルを添付"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <!-- Message input -->
            <div class="flex-1 min-w-0">
              <div class="relative">
                <textarea
                  rows="3"
                  placeholder="Amazon Q に質問してください..."
                  class="block w-full resize-none border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 pr-12"
                ></textarea>

                <!-- Send button -->
                <div class="absolute bottom-2 right-2">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Selected files display -->
          <div class="mt-4">
            <div class="flex flex-wrap gap-2">
              <!-- Example selected file -->
              <div
                class="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm"
              >
                <svg
                  class="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                example.ts
                <button
                  type="button"
                  class="ml-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <svg
                    class="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent {
  constructor(private readonly stateService: StateService) {}
}
