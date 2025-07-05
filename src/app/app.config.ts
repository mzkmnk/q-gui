import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {
  tablerFile,
  tablerHistory,
  tablerMenu2,
  tablerMessage,
  tablerMoon,
  tablerPaperclip,
  tablerSend,
  tablerSettings,
  tablerX,
} from '@ng-icons/tabler-icons';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideIcons({
      tablerMenu2,
      tablerMoon,
      tablerMessage,
      tablerSettings,
      tablerHistory,
      tablerPaperclip,
      tablerSend,
      tablerFile,
      tablerX,
    }),
  ],
};
