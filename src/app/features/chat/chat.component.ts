import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
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
            <div class="mx-auto text-gray-400 dark:text-gray-500">
              <app-icon name="chat" size="xl" />
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              Amazon Q へようこそ
            </h3>
            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
              AWS プロファイルを選択してチャットを開始してください
            </p>
          </div>

          <!-- Chat messages -->
          <div class="space-y-6">
            @for (message of demoMessages; track message.id) { @if (message.type
            === 'user') {
            <!-- User message -->
            <div class="flex justify-end">
              <div
                class="max-w-xs lg:max-w-md bg-blue-600 text-white rounded-lg px-4 py-2"
              >
                <p class="text-sm">{{ message.content }}</p>
                <p class="text-xs opacity-75 mt-1">{{ message.timestamp }}</p>
              </div>
            </div>
            } @else {
            <!-- Assistant message -->
            <div class="flex justify-start">
              <div
                class="max-w-xs lg:max-w-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2"
              >
                <p class="text-sm">{{ message.content }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ message.timestamp }}
                </p>
              </div>
            </div>
            } }
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
              <app-icon name="attachment" size="md" />
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
                    title="送信"
                  >
                    <app-icon name="send" size="sm" />
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
                <app-icon name="document" size="sm" className="mr-1.5" />
                example.ts
                <button
                  type="button"
                  class="ml-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  title="ファイルを削除"
                >
                  <app-icon name="close" size="xs" />
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
  // Demo messages for scroll testing
  readonly demoMessages: ChatMessage[] = [
    {
      id: 1,
      type: 'user',
      content:
        'TypeScriptでより良いコードを書くためのベストプラクティスを教えてください。',
      timestamp: '10:30',
    },
    {
      id: 2,
      type: 'assistant',
      content:
        'TypeScriptのベストプラクティスをいくつか紹介します：1) 厳密な型チェックを有効にする、2) any型の使用を避ける、3) インターフェースを活用した型定義、4) ジェネリクスの適切な使用。これらを実践することで、より安全で保守性の高いコードが書けます。',
      timestamp: '10:31',
    },
    {
      id: 3,
      type: 'user',
      content:
        'Angularのコンポーネント設計で気をつけるべきポイントはありますか？',
      timestamp: '10:35',
    },
    {
      id: 4,
      type: 'assistant',
      content:
        'Angularコンポーネント設計のポイント：1) 単一責任の原則を守る、2) inputとoutputを明確に定義、3) OnPush変更検知戦略の活用、4) ライフサイクルフックの適切な使用、5) テストしやすい設計を心がける。これらを意識すると良いコンポーネントが作れます。',
      timestamp: '10:36',
    },
    {
      id: 5,
      type: 'user',
      content: 'パフォーマンス最適化の方法を具体的に教えてください。',
      timestamp: '10:40',
    },
    {
      id: 6,
      type: 'assistant',
      content:
        'Angularアプリのパフォーマンス最適化手法：1) Lazy Loading、2) TrackBy関数の使用、3) OnPush変更検知、4) 仮想スクロール、5) プリロード戦略、6) バンドル最適化、7) Service Workerの活用。段階的に適用していくことをお勧めします。',
      timestamp: '10:41',
    },
    {
      id: 7,
      type: 'user',
      content:
        'Rxjsを使ったリアクティブプログラミングについて詳しく教えてください。',
      timestamp: '10:45',
    },
    {
      id: 8,
      type: 'assistant',
      content:
        'RxJSリアクティブプログラミングの基本：1) Observableストリーム、2) オペレータの活用（map, filter, merge等）、3) エラーハンドリング、4) メモリリーク対策（unsubscribe）、5) AsyncPipeの活用。実際のコード例も見せましょうか？',
      timestamp: '10:46',
    },
    {
      id: 9,
      type: 'user',
      content:
        'はい、実際のコード例を見せてください。HTTPリクエストの処理方法についても知りたいです。',
      timestamp: '10:50',
    },
    {
      id: 10,
      type: 'assistant',
      content:
        'HTTPリクエストのコード例をお見せします。HttpClientを使った基本的なGETリクエスト、エラーハンドリング、リトライ機能、キャッシュ戦略など、実際のアプリケーションで使用される実装パターンを含めて説明いたします。',
      timestamp: '10:51',
    },
    {
      id: 11,
      type: 'user',
      content:
        'テスト自動化についても相談したいのですが、どのような戦略が効果的でしょうか？',
      timestamp: '10:55',
    },
    {
      id: 12,
      type: 'assistant',
      content:
        'テスト自動化戦略：1) テストピラミッド（Unit > Integration > E2E）、2) TDD/BDDアプローチ、3) モック戦略、4) CI/CDパイプラインでの自動テスト実行、5) カバレッジ指標の活用。段階的に導入し、ROIを測定しながら進めることが重要です。',
      timestamp: '10:56',
    },
  ];
}
