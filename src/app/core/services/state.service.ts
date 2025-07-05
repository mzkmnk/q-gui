import { Injectable, signal, computed } from '@angular/core';
import {
  AppState,
  AuthState,
  ChatState,
  FileState,
  UiState,
  AwsProfile,
  ProfileConnection,
  ChatSession,
  SelectedFile,
  Theme,
  AppView,
  Notification,
} from '../interfaces';
import { UI_CONFIG, FILE_LIMITS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  // Auth state signals
  private readonly _profiles = signal<AwsProfile[]>([]);
  private readonly _selectedProfile = signal<AwsProfile | null>(null);
  private readonly _connection = signal<ProfileConnection | null>(null);
  private readonly _authLoading = signal<boolean>(false);
  private readonly _authError = signal<string | null>(null);

  // Chat state signals
  private readonly _currentSession = signal<ChatSession | null>(null);
  private readonly _sessions = signal<ChatSession[]>([]);
  private readonly _chatLoading = signal<boolean>(false);
  private readonly _chatError = signal<string | null>(null);

  // File state signals
  private readonly _selectedFiles = signal<SelectedFile[]>([]);
  private readonly _fileLoading = signal<boolean>(false);
  private readonly _fileError = signal<string | null>(null);

  // UI state signals
  private readonly _theme = signal<Theme>('system');
  private readonly _sidebarExpanded = signal<boolean>(
    UI_CONFIG.sidebar.defaultExpanded
  );
  private readonly _activeView = signal<AppView>('chat');
  private readonly _notifications = signal<Notification[]>([]);

  // Computed signals for state composition
  readonly authState = computed<AuthState>(() => ({
    profiles: this._profiles(),
    selectedProfile: this._selectedProfile(),
    connection: this._connection(),
    isLoading: this._authLoading(),
    error: this._authError(),
  }));

  readonly chatState = computed<ChatState>(() => ({
    currentSession: this._currentSession(),
    sessions: this._sessions(),
    isLoading: this._chatLoading(),
    error: this._chatError(),
  }));

  readonly fileState = computed<FileState>(() => ({
    selectedFiles: this._selectedFiles(),
    isLoading: this._fileLoading(),
    error: this._fileError(),
    maxFiles: FILE_LIMITS.maxFiles,
    maxSizeBytes: FILE_LIMITS.maxSizeBytes,
  }));

  readonly uiState = computed<UiState>(() => ({
    theme: this._theme(),
    sidebarExpanded: this._sidebarExpanded(),
    activeView: this._activeView(),
    notifications: this._notifications(),
  }));

  readonly appState = computed<AppState>(() => ({
    auth: this.authState(),
    chat: this.chatState(),
    files: this.fileState(),
    ui: this.uiState(),
  }));

  // Auth state updaters
  setProfiles(profiles: AwsProfile[]): void {
    this._profiles.set(profiles);
  }

  setSelectedProfile(profile: AwsProfile | null): void {
    this._selectedProfile.set(profile);
  }

  setConnection(connection: ProfileConnection | null): void {
    this._connection.set(connection);
  }

  setAuthLoading(loading: boolean): void {
    this._authLoading.set(loading);
  }

  setAuthError(error: string | null): void {
    this._authError.set(error);
  }

  // Chat state updaters
  setCurrentSession(session: ChatSession | null): void {
    this._currentSession.set(session);
  }

  setSessions(sessions: ChatSession[]): void {
    this._sessions.set(sessions);
  }

  setChatLoading(loading: boolean): void {
    this._chatLoading.set(loading);
  }

  setChatError(error: string | null): void {
    this._chatError.set(error);
  }

  // File state updaters
  setSelectedFiles(files: SelectedFile[]): void {
    this._selectedFiles.set(files);
  }

  addSelectedFile(file: SelectedFile): void {
    const currentFiles = this._selectedFiles();
    if (currentFiles.length < FILE_LIMITS.maxFiles) {
      this._selectedFiles.set([...currentFiles, file]);
    }
  }

  removeSelectedFile(fileId: string): void {
    const currentFiles = this._selectedFiles();
    this._selectedFiles.set(currentFiles.filter((f) => f.id !== fileId));
  }

  setFileLoading(loading: boolean): void {
    this._fileLoading.set(loading);
  }

  setFileError(error: string | null): void {
    this._fileError.set(error);
  }

  // UI state updaters
  setTheme(theme: Theme): void {
    this._theme.set(theme);
  }

  setSidebarExpanded(expanded: boolean): void {
    this._sidebarExpanded.set(expanded);
  }

  toggleSidebar(): void {
    this._sidebarExpanded.update((current) => !current);
  }

  setActiveView(view: AppView): void {
    this._activeView.set(view);
  }

  addNotification(notification: Notification): void {
    const currentNotifications = this._notifications();
    const updatedNotifications = [notification, ...currentNotifications].slice(
      0,
      UI_CONFIG.notifications.maxNotifications
    );
    this._notifications.set(updatedNotifications);
  }

  removeNotification(notificationId: string): void {
    const currentNotifications = this._notifications();
    this._notifications.set(
      currentNotifications.filter((n) => n.id !== notificationId)
    );
  }

  clearNotifications(): void {
    this._notifications.set([]);
  }
}
