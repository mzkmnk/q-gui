export const APP_CONFIG = {
  name: 'Amazon Q GUI',
  version: '1.0.0',
  description: 'GUI interface for Amazon Q',
} as const;

export const FILE_LIMITS = {
  maxFiles: 10,
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  allowedExtensions: [
    '.txt',
    '.md',
    '.js',
    '.ts',
    '.jsx',
    '.tsx',
    '.py',
    '.java',
    '.cpp',
    '.c',
    '.h',
    '.css',
    '.html',
    '.json',
    '.xml',
    '.yaml',
    '.yml',
    '.sh',
    '.sql',
    '.rs',
    '.go',
    '.php',
  ],
} as const;

export const UI_CONFIG = {
  sidebar: {
    defaultExpanded: true,
    minWidth: 240,
    maxWidth: 400,
  },
  notifications: {
    defaultDuration: 5000,
    maxNotifications: 5,
  },
  chat: {
    maxMessagesDisplay: 100,
    scrollThreshold: 100,
  },
} as const;

export const STORAGE_KEYS = {
  theme: 'q-gui.theme',
  sidebarExpanded: 'q-gui.sidebar.expanded',
  selectedProfile: 'q-gui.auth.profile',
  lastSession: 'q-gui.chat.lastSession',
} as const;
