import { Injectable } from '@angular/core';
import { AwsProfile, ProfileConnection, ConnectionStatus } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private profiles: AwsProfile[] = [];
  private selectedProfile: AwsProfile | null = null;
  private connectionStatus: ConnectionStatus = 'disconnected';
  private shouldFailConnection = false;

  getProfiles(): AwsProfile[] {
    return this.profiles;
  }

  setMockProfiles(profiles: AwsProfile[]): void {
    this.profiles = profiles;
  }

  async testConnection(profile: AwsProfile): Promise<ProfileConnection> {
    this.connectionStatus = 'testing';

    // モック実装：1秒待機してから結果を返す
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (this.shouldFailConnection) {
      this.connectionStatus = 'error';
      return {
        profile,
        status: 'error',
        lastTested: new Date(),
        error: 'モック接続エラー',
      };
    }

    this.connectionStatus = 'connected';
    return {
      profile,
      status: 'connected',
      lastTested: new Date(),
    };
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  setShouldFailConnection(shouldFail: boolean): void {
    this.shouldFailConnection = shouldFail;
  }

  setSelectedProfile(profile: AwsProfile): void {
    this.selectedProfile = profile;
  }

  getSelectedProfile(): AwsProfile | null {
    return this.selectedProfile;
  }

  clearSelectedProfile(): void {
    this.selectedProfile = null;
  }
}
