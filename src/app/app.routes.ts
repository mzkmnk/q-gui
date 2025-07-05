import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'chat',
        pathMatch: 'full',
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/chat/chat.component').then((m) => m.ChatComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/chat/chat.component').then((m) => m.ChatComponent), // Placeholder
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/chat/chat.component').then((m) => m.ChatComponent), // Placeholder
      },
    ],
  },
];
