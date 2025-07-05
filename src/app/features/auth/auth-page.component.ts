import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
  signal,
} from '@angular/core';
import type { AwsProfile } from '../../core/interfaces';
import { AuthService } from '../../core/services';
import { ProfileSelectorComponent } from './profile-selector.component';

@Component({
  selector: 'app-auth-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProfileSelectorComponent],
  template: `
    <div class="max-w-7xl mx-auto p-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 dark:text-gray-100">
          AWS 認証設定
        </h1>
        <p
          class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed dark:text-gray-300"
        >
          Amazon Q GUI を使用するためのAWSプロファイルを選択してください。
        </p>
      </div>

      <div class="flex flex-col space-y-8">
        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2
            class="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-100 dark:text-gray-100 dark:border-gray-600"
          >
            プロファイル選択
          </h2>
          <app-profile-selector (profileSelected)="onProfileSelected($event)" />
        </div>

        @if (selectedProfile()) {
        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <h2
            class="text-2xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-100 dark:text-gray-100 dark:border-gray-600"
          >
            選択中のプロファイル
          </h2>
          <div class="mt-4">
            <div
              class="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-600"
            >
              <div class="flex justify-between items-center mb-4">
                <h3
                  class="text-xl font-semibold text-gray-900 m-0 dark:text-gray-100"
                >
                  {{ selectedProfile()?.name }}
                </h3>
                <span
                  class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium uppercase"
                >
                  {{ selectedProfile()?.type }}
                </span>
              </div>
              <div class="flex flex-col space-y-2">
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 font-medium dark:text-gray-400"
                    >Region:</span
                  >
                  <span class="text-gray-900 dark:text-gray-100">{{
                    selectedProfile()?.region || 'N/A'
                  }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 font-medium dark:text-gray-400"
                    >Source:</span
                  >
                  <span class="text-gray-900 dark:text-gray-100">{{
                    selectedProfile()?.source || 'N/A'
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        } @if (!selectedProfile()) {
        <div
          class="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="text-center py-12 text-gray-500 dark:text-gray-400">
            <p class="text-lg leading-relaxed">
              プロファイルを選択して、Amazon Q へのアクセスを開始してください。
            </p>
          </div>
        </div>
        }
      </div>
    </div>
  `,
})
export class AuthPageComponent implements OnInit {
  private readonly authService = inject(AuthService);

  readonly selectedProfile = signal<AwsProfile | null>(null);

  ngOnInit(): void {
    // モックプロファイルデータを設定
    const mockProfiles: AwsProfile[] = [
      {
        name: 'default',
        region: 'us-east-1',
        type: 'static',
        source: 'credentials',
      },
      {
        name: 'dev-profile',
        region: 'us-west-2',
        type: 'sso',
        source: 'config',
      },
      {
        name: 'prod-profile',
        region: 'eu-west-1',
        type: 'role',
        source: 'config',
      },
    ];

    this.authService.setMockProfiles(mockProfiles);
  }

  onProfileSelected(profile: AwsProfile): void {
    this.selectedProfile.set(profile);
  }
}
