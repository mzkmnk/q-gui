import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  output,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwsProfile, ProfileConnection } from '../../core/interfaces';
import { AuthService } from '../../core/services';
import { ButtonComponent } from '../../shared/components';

@Component({
  selector: 'app-profile-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-4">
      @if (profiles().length === 0) {
      <div class="text-center py-8 text-gray-500">
        <p>利用可能なプロファイルがありません</p>
      </div>
      } @else {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (profile of profiles(); track profile.name) {
        <div
          class="border border-gray-200 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md"
          [class.border-blue-500]="isSelected(profile)"
          [class.bg-blue-50]="isSelected(profile)"
          [class.shadow-md]="isSelected(profile)"
          [class.ring-2]="isSelected(profile)"
          [class.ring-blue-200]="isSelected(profile)"
          [class.selected]="isSelected(profile)"
          data-testid="profile-card"
          (click)="selectProfile(profile)"
        >
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-lg font-semibold text-gray-900 m-0">
              {{ profile.name }}
            </h3>
            <span
              class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs uppercase font-medium"
            >
              {{ profile.type }}
            </span>
          </div>

          <div class="mb-4 text-sm space-y-1">
            <div class="flex justify-between mb-1">
              <span class="text-gray-500 font-medium">Region:</span>
              <span class="text-gray-900">{{ profile.region || 'N/A' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500 font-medium">Source:</span>
              <span class="text-gray-900">{{ profile.source || 'N/A' }}</span>
            </div>
          </div>

          <div class="flex justify-end">
            <app-button
              variant="secondary"
              size="sm"
              [loading]="isTestingConnection() && testingProfile() === profile"
              data-testid="test-connection-btn"
              (click)="testConnection(profile); $event.stopPropagation()"
              (onClick)="testConnection(profile)"
            >
              接続テスト
            </app-button>
          </div>
        </div>
        }
      </div>
      } @if (connectionError()) {
      <div class="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
        {{ connectionError() }}
      </div>
      }
    </div>
  `,
})
export class ProfileSelectorComponent implements OnInit {
  private readonly authService = inject(AuthService);

  // Signals
  readonly profiles = signal<AwsProfile[]>([]);
  readonly selectedProfile = signal<AwsProfile | null>(null);
  readonly isTestingConnection = signal<boolean>(false);
  readonly testingProfile = signal<AwsProfile | null>(null);
  readonly connectionError = signal<string | null>(null);

  // Outputs
  readonly profileSelected = output<AwsProfile>();

  ngOnInit(): void {
    this.loadProfiles();
  }

  private loadProfiles(): void {
    const profiles = this.authService.getProfiles();
    this.profiles.set(profiles);

    const selected = this.authService.getSelectedProfile();
    this.selectedProfile.set(selected);
  }

  selectProfile(profile: AwsProfile): void {
    this.authService.setSelectedProfile(profile);
    this.selectedProfile.set(profile);
    this.profileSelected.emit(profile);
  }

  async testConnection(profile: AwsProfile): Promise<void> {
    this.isTestingConnection.set(true);
    this.testingProfile.set(profile);
    this.connectionError.set(null);

    try {
      const result = await this.authService.testConnection(profile);

      if (result.status === 'error') {
        this.connectionError.set(result.error || '接続テストに失敗しました');
      }
    } catch (error) {
      this.connectionError.set('接続テスト中にエラーが発生しました');
    } finally {
      this.isTestingConnection.set(false);
      this.testingProfile.set(null);
    }
  }

  isSelected(profile: AwsProfile): boolean {
    const selected = this.selectedProfile();
    return selected?.name === profile.name;
  }
}
