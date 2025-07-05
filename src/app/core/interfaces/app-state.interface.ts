import type { AwsProfile, ProfileConnection } from './aws-profile.interface';
import type { ChatState } from './chat.interface';

export interface AppState {
  readonly auth: AuthState;
  readonly chat: ChatState;
  readonly files: FileState;
  readonly ui: UiState;
}

export interface AuthState {
  readonly profiles: AwsProfile[];
  readonly selectedProfile: AwsProfile | null;
  readonly connection: ProfileConnection | null;
  readonly isLoading: boolean;
  readonly error: string | null;
}

export interface FileState {
  readonly selectedFiles: SelectedFile[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly maxFiles: number;
  readonly maxSizeBytes: number;
}

export interface SelectedFile {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly size: number;
  readonly type: string;
  readonly lastModified: Date;
}

export interface UiState {
  readonly theme: Theme;
  readonly sidebarExpanded: boolean;
  readonly activeView: AppView;
  readonly notifications: Notification[];
}

export type Theme = 'light' | 'dark' | 'system';
export type AppView = 'chat' | 'settings' | 'history';

export interface Notification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly message: string;
  readonly timestamp: Date;
  readonly autoClose?: boolean;
  readonly duration?: number;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
