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
        redirectTo: 'auth',
        pathMatch: 'full',
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./features/chat/chat.component').then((m) => m.ChatComponent),
      },
      {
        path: 'auth',
        loadComponent: () =>
          import('./features/auth/auth-page.component').then(
            (m) => m.AuthPageComponent
          ),
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
