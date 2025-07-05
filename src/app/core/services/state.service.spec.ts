import { TestBed } from '@angular/core/testing';
import type {
  AppView,
  AwsProfile,
  ChatSession,
  Notification,
  ProfileConnection,
  SelectedFile,
  Theme,
} from '../interfaces';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateService);
  });

  describe('初期化', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with default values', () => {
      const appState = service.appState();

      expect(appState.auth.profiles).toEqual([]);
      expect(appState.auth.selectedProfile).toBeNull();
      expect(appState.auth.connection).toBeNull();
      expect(appState.auth.isLoading).toBe(false);
      expect(appState.auth.error).toBeNull();

      expect(appState.chat.currentSession).toBeNull();
      expect(appState.chat.sessions).toEqual([]);
      expect(appState.chat.isLoading).toBe(false);
      expect(appState.chat.error).toBeNull();

      expect(appState.files.selectedFiles).toEqual([]);
      expect(appState.files.isLoading).toBe(false);
      expect(appState.files.error).toBeNull();

      expect(appState.ui.theme).toBe('system');
      expect(appState.ui.sidebarExpanded).toBe(true);
      expect(appState.ui.activeView).toBe('chat');
      expect(appState.ui.notifications).toEqual([]);
    });
  });

  describe('認証状態管理', () => {
    it('should update profiles correctly', () => {
      const mockProfiles: AwsProfile[] = [
        {
          name: 'test-profile',
          region: 'us-east-1',
          type: 'static',
          source: 'credentials',
        },
      ];

      service.setProfiles(mockProfiles);

      expect(service.authState().profiles).toEqual(mockProfiles);
    });

    it('should update selected profile correctly', () => {
      const mockProfile: AwsProfile = {
        name: 'test-profile',
        region: 'us-east-1',
        type: 'static',
        source: 'credentials',
      };

      service.setSelectedProfile(mockProfile);

      expect(service.authState().selectedProfile).toEqual(mockProfile);
    });

    it('should update connection status correctly', () => {
      const mockProfile: AwsProfile = {
        name: 'test-profile',
        region: 'us-east-1',
        type: 'static',
        source: 'credentials',
      };

      const mockConnection: ProfileConnection = {
        profile: mockProfile,
        status: 'connected',
        lastTested: new Date(),
        error: undefined,
      };

      service.setConnection(mockConnection);

      expect(service.authState().connection).toEqual(mockConnection);
    });

    it('should update auth loading state correctly', () => {
      service.setAuthLoading(true);
      expect(service.authState().isLoading).toBe(true);

      service.setAuthLoading(false);
      expect(service.authState().isLoading).toBe(false);
    });

    it('should update auth error correctly', () => {
      const errorMessage = 'Authentication failed';

      service.setAuthError(errorMessage);
      expect(service.authState().error).toBe(errorMessage);

      service.setAuthError(null);
      expect(service.authState().error).toBeNull();
    });
  });

  describe('チャット状態管理', () => {
    it('should update current session correctly', () => {
      const mockSession: ChatSession = {
        id: 'session-1',
        title: 'Test Session',
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [],
      };

      service.setCurrentSession(mockSession);

      expect(service.chatState().currentSession).toEqual(mockSession);
    });

    it('should update sessions list correctly', () => {
      const mockSessions: ChatSession[] = [
        {
          id: 'session-1',
          title: 'Test Session 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        },
        {
          id: 'session-2',
          title: 'Test Session 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: [],
        },
      ];

      service.setSessions(mockSessions);

      expect(service.chatState().sessions).toEqual(mockSessions);
    });

    it('should update chat loading state correctly', () => {
      service.setChatLoading(true);
      expect(service.chatState().isLoading).toBe(true);

      service.setChatLoading(false);
      expect(service.chatState().isLoading).toBe(false);
    });

    it('should update chat error correctly', () => {
      const errorMessage = 'Chat error';

      service.setChatError(errorMessage);
      expect(service.chatState().error).toBe(errorMessage);

      service.setChatError(null);
      expect(service.chatState().error).toBeNull();
    });
  });

  describe('ファイル状態管理', () => {
    it('should update selected files correctly', () => {
      const mockFiles: SelectedFile[] = [
        {
          id: 'file-1',
          name: 'test.txt',
          size: 1024,
          type: 'text/plain',
          path: '/path/to/test.txt',
          lastModified: new Date(),
        },
      ];

      service.setSelectedFiles(mockFiles);

      expect(service.fileState().selectedFiles).toEqual(mockFiles);
    });

    it('should add file correctly', () => {
      const mockFile: SelectedFile = {
        id: 'file-1',
        name: 'test.txt',
        size: 1024,
        type: 'text/plain',
        path: '/path/to/test.txt',
        lastModified: new Date(),
      };

      service.addSelectedFile(mockFile);

      expect(service.fileState().selectedFiles).toContain(mockFile);
    });

    it('should remove file correctly', () => {
      const mockFile: SelectedFile = {
        id: 'file-1',
        name: 'test.txt',
        size: 1024,
        type: 'text/plain',
        path: '/path/to/test.txt',
        lastModified: new Date(),
      };

      service.addSelectedFile(mockFile);
      expect(service.fileState().selectedFiles).toContain(mockFile);

      service.removeSelectedFile('file-1');
      expect(service.fileState().selectedFiles).not.toContain(mockFile);
    });

    it('should update file loading state correctly', () => {
      service.setFileLoading(true);
      expect(service.fileState().isLoading).toBe(true);

      service.setFileLoading(false);
      expect(service.fileState().isLoading).toBe(false);
    });

    it('should update file error correctly', () => {
      const errorMessage = 'File error';

      service.setFileError(errorMessage);
      expect(service.fileState().error).toBe(errorMessage);

      service.setFileError(null);
      expect(service.fileState().error).toBeNull();
    });
  });

  describe('UI状態管理', () => {
    it('should update theme correctly', () => {
      const themes: Theme[] = ['light', 'dark', 'system'];

      themes.forEach((theme) => {
        service.setTheme(theme);
        expect(service.uiState().theme).toBe(theme);
      });
    });

    it('should update sidebar expanded state correctly', () => {
      service.setSidebarExpanded(false);
      expect(service.uiState().sidebarExpanded).toBe(false);

      service.setSidebarExpanded(true);
      expect(service.uiState().sidebarExpanded).toBe(true);
    });

    it('should toggle sidebar correctly', () => {
      const initialState = service.uiState().sidebarExpanded;

      service.toggleSidebar();
      expect(service.uiState().sidebarExpanded).toBe(!initialState);

      service.toggleSidebar();
      expect(service.uiState().sidebarExpanded).toBe(initialState);
    });

    it('should update active view correctly', () => {
      const views: AppView[] = ['chat', 'settings', 'history'];

      views.forEach((view) => {
        service.setActiveView(view);
        expect(service.uiState().activeView).toBe(view);
      });
    });

    it('should add notification correctly', () => {
      const mockNotification: Notification = {
        id: 'notification-1',
        type: 'info',
        title: 'Test Notification',
        message: 'This is a test notification',
        timestamp: new Date(),
        autoClose: true,
      };

      service.addNotification(mockNotification);

      expect(service.uiState().notifications).toContain(mockNotification);
    });

    it('should remove notification correctly', () => {
      const mockNotification: Notification = {
        id: 'notification-1',
        type: 'info',
        title: 'Test Notification',
        message: 'This is a test notification',
        timestamp: new Date(),
        autoClose: true,
      };

      service.addNotification(mockNotification);
      expect(service.uiState().notifications).toContain(mockNotification);

      service.removeNotification('notification-1');
      expect(service.uiState().notifications).not.toContain(mockNotification);
    });

    it('should clear all notifications correctly', () => {
      const mockNotifications: Notification[] = [
        {
          id: 'notification-1',
          type: 'info',
          title: 'Test Notification 1',
          message: 'This is a test notification',
          timestamp: new Date(),
          autoClose: true,
        },
        {
          id: 'notification-2',
          type: 'error',
          title: 'Test Notification 2',
          message: 'This is another test notification',
          timestamp: new Date(),
          autoClose: false,
        },
      ];

      mockNotifications.forEach((notification) => {
        service.addNotification(notification);
      });

      expect(service.uiState().notifications.length).toBe(2);

      service.clearNotifications();
      expect(service.uiState().notifications.length).toBe(0);
    });
  });

  describe('複合状態管理', () => {
    it('should provide complete app state', () => {
      const appState = service.appState();

      expect(appState.auth).toBeDefined();
      expect(appState.chat).toBeDefined();
      expect(appState.files).toBeDefined();
      expect(appState.ui).toBeDefined();

      expect(appState.auth.profiles).toBeDefined();
      expect(appState.auth.selectedProfile).toBeDefined();
      expect(appState.auth.connection).toBeDefined();
      expect(appState.auth.isLoading).toBeDefined();
      expect(appState.auth.error).toBeDefined();

      expect(appState.chat.currentSession).toBeDefined();
      expect(appState.chat.sessions).toBeDefined();
      expect(appState.chat.isLoading).toBeDefined();
      expect(appState.chat.error).toBeDefined();

      expect(appState.files.selectedFiles).toBeDefined();
      expect(appState.files.isLoading).toBeDefined();
      expect(appState.files.error).toBeDefined();
      expect(appState.files.maxFiles).toBeDefined();
      expect(appState.files.maxSizeBytes).toBeDefined();

      expect(appState.ui.theme).toBeDefined();
      expect(appState.ui.sidebarExpanded).toBeDefined();
      expect(appState.ui.activeView).toBeDefined();
      expect(appState.ui.notifications).toBeDefined();
    });
  });
});
