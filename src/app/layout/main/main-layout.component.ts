import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateService } from '../../core/services/state.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, IconComponent],
  template: `
    <div
      class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <!-- Header -->
      <header
        class="flex-shrink-0 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 z-10"
      >
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <!-- Menu button for sidebar toggle -->
              <button
                type="button"
                (click)="toggleSidebar()"
                class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                title="サイドバーを切り替え"
              >
                <app-icon name="menu" size="lg" />
              </button>

              <!-- App title -->
              <h1
                class="ml-4 text-xl font-semibold text-gray-900 dark:text-white"
              >
                Amazon Q GUI
              </h1>
            </div>

            <!-- Right side content -->
            <div class="flex items-center space-x-4">
              <!-- Theme toggle placeholder -->
              <button
                type="button"
                class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                title="ダークモード切り替え"
              >
                <app-icon name="moon" size="md" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main content area -->
      <div class="flex flex-1 min-h-0">
        <!-- Sidebar -->
        <aside [class]="sidebarClasses()">
          <nav
            class="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
          >
            <div class="flex-1 overflow-y-auto">
              <div class="p-4">
                <!-- Navigation -->
                <div class="space-y-2">
                  <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-md"
                  >
                    <app-icon name="chat" size="md" className="mr-3" />
                    @if (sidebarExpanded()) {
                    <span>チャット</span>
                    }
                  </a>
                  <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                  >
                    <app-icon name="settings" size="md" className="mr-3" />
                    @if (sidebarExpanded()) {
                    <span>設定</span>
                    }
                  </a>
                  <a
                    href="#"
                    class="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
                  >
                    <app-icon name="history" size="md" className="mr-3" />
                    @if (sidebarExpanded()) {
                    <span>履歴</span>
                    }
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        <!-- Main content -->
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div class="flex-1 relative">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {
  constructor(private readonly stateService: StateService) {}

  sidebarClasses() {
    const isExpanded = this.stateService.uiState().sidebarExpanded;
    return isExpanded
      ? 'w-64 flex-shrink-0 transition-all duration-300 ease-in-out'
      : 'w-16 flex-shrink-0 transition-all duration-300 ease-in-out';
  }

  sidebarExpanded() {
    return this.stateService.uiState().sidebarExpanded;
  }

  toggleSidebar(): void {
    this.stateService.toggleSidebar();
  }
}
