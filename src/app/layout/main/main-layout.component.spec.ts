import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { StateService } from '../../core/services/state.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let stateService: StateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainLayoutComponent],
      providers: [StateService],
    });
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    stateService = TestBed.inject(StateService);
    fixture.detectChanges();
  });

  describe('初期化', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should inject StateService', () => {
      expect(stateService).toBeTruthy();
    });
  });

  describe('レンダリング', () => {
    it('should render main layout structure', () => {
      const compiled = fixture.nativeElement;

      expect(compiled.querySelector('header')).toBeTruthy();
      expect(compiled.querySelector('aside')).toBeTruthy();
      expect(compiled.querySelector('main')).toBeTruthy();
      expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });

    it('should render app title', () => {
      const compiled = fixture.nativeElement;
      const title = compiled.querySelector('h1');

      expect(title).toBeTruthy();
      expect(title.textContent).toContain('Amazon Q GUI');
    });

    it('should render menu toggle button', () => {
      const compiled = fixture.nativeElement;
      const menuButton = compiled.querySelector(
        'button[title="サイドバーを切り替え"]'
      );

      expect(menuButton).toBeTruthy();
    });

    it('should render theme toggle button', () => {
      const compiled = fixture.nativeElement;
      const themeButton = compiled.querySelector(
        'button[title="ダークモード切り替え"]'
      );

      expect(themeButton).toBeTruthy();
    });
  });

  describe('サイドバー', () => {
    it('should render navigation items', () => {
      const compiled = fixture.nativeElement;
      const navItems = compiled.querySelectorAll('nav a');

      expect(navItems.length).toBeGreaterThan(0);

            const chatLink = Array.from(navItems as NodeListOf<Element>).find((item) => 
        item.textContent?.includes('チャット')
      );
      const settingsLink = Array.from(navItems as NodeListOf<Element>).find((item) => 
        item.textContent?.includes('設定')
      );
      const historyLink = Array.from(navItems as NodeListOf<Element>).find((item) => 
        item.textContent?.includes('履歴')
      );

      expect(chatLink).toBeTruthy();
      expect(settingsLink).toBeTruthy();
      expect(historyLink).toBeTruthy();
    });

    it('should render demo projects when sidebar is expanded', () => {
      // デフォルトでsidebarは展開されているはず
      const compiled = fixture.nativeElement;
      const projectSection = compiled.querySelector('h3');

      expect(projectSection).toBeTruthy();
      expect(projectSection.textContent).toContain('プロジェクト');

      const projectLinks = compiled.querySelectorAll('a[href="#"]');
      expect(projectLinks.length).toBeGreaterThan(3); // nav items + project items
    });

    it('should render demo sessions when sidebar is expanded', () => {
      const compiled = fixture.nativeElement;
      const sessionSection = Array.from(compiled.querySelectorAll('h3') as NodeListOf<Element>).find(
        (h3) => h3.textContent?.includes('最近のセッション')
      );

      expect(sessionSection).toBeTruthy();
    });
  });

  describe('サイドバーの状態管理', () => {
    it('should reflect sidebar expanded state from StateService', () => {
      const initialExpanded = component.sidebarExpanded();
      expect(initialExpanded).toBe(stateService.uiState().sidebarExpanded);
    });

    it('should apply correct classes when sidebar is expanded', () => {
      stateService.setSidebarExpanded(true);
      fixture.detectChanges();

      const classes = component.sidebarClasses();
      expect(classes).toContain('w-64');
      expect(classes).toContain('flex-shrink-0');
      expect(classes).toContain('transition-all');
      expect(classes).toContain('duration-300');
      expect(classes).toContain('ease-in-out');
    });

    it('should apply correct classes when sidebar is collapsed', () => {
      stateService.setSidebarExpanded(false);
      fixture.detectChanges();

      const classes = component.sidebarClasses();
      expect(classes).toContain('w-16');
      expect(classes).toContain('flex-shrink-0');
      expect(classes).toContain('transition-all');
      expect(classes).toContain('duration-300');
      expect(classes).toContain('ease-in-out');
    });
  });

  describe('サイドバートグル', () => {
    it('should toggle sidebar when menu button is clicked', () => {
      const initialExpanded = stateService.uiState().sidebarExpanded;

      const menuButton = fixture.nativeElement.querySelector(
        'button[title="サイドバーを切り替え"]'
      );
      menuButton.click();

      expect(stateService.uiState().sidebarExpanded).toBe(!initialExpanded);
    });

    it('should call toggleSidebar method when menu button is clicked', () => {
      const spy = vi.spyOn(component, 'toggleSidebar');

      const menuButton = fixture.nativeElement.querySelector(
        'button[title="サイドバーを切り替え"]'
      );
      menuButton.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('レスポンシブデザイン', () => {
    it('should have responsive classes', () => {
      const compiled = fixture.nativeElement;
      const headerDiv = compiled.querySelector('header > div');

      expect(headerDiv.className).toContain('px-4');
      expect(headerDiv.className).toContain('sm:px-6');
      expect(headerDiv.className).toContain('lg:px-8');
    });

    it('should have responsive layout structure', () => {
      const compiled = fixture.nativeElement;
      const mainContainer = compiled.querySelector('.h-screen');

      expect(mainContainer.className).toContain('flex');
      expect(mainContainer.className).toContain('flex-col');
      expect(mainContainer.className).toContain('h-screen');
    });
  });

  describe('ダークモード', () => {
    it('should have dark mode classes', () => {
      const compiled = fixture.nativeElement;
      const mainContainer = compiled.querySelector('.h-screen');

      expect(mainContainer.className).toContain('bg-gray-50');
      expect(mainContainer.className).toContain('dark:bg-gray-900');
      expect(mainContainer.className).toContain('transition-colors');
      expect(mainContainer.className).toContain('duration-200');
    });

    it('should have dark mode classes for header', () => {
      const compiled = fixture.nativeElement;
      const header = compiled.querySelector('header');

      expect(header.className).toContain('bg-white');
      expect(header.className).toContain('dark:bg-gray-800');
      expect(header.className).toContain('border-gray-200');
      expect(header.className).toContain('dark:border-gray-700');
    });

    it('should have dark mode classes for sidebar', () => {
      const compiled = fixture.nativeElement;
      const nav = compiled.querySelector('nav');

      expect(nav.className).toContain('bg-white');
      expect(nav.className).toContain('dark:bg-gray-800');
      expect(nav.className).toContain('border-gray-200');
      expect(nav.className).toContain('dark:border-gray-700');
    });
  });

  describe('デモデータ', () => {
    it('should have demo projects data', () => {
      expect(component.demoProjects).toBeDefined();
      expect(component.demoProjects.length).toBeGreaterThan(0);
      expect(component.demoProjects[0].id).toBeDefined();
      expect(component.demoProjects[0].name).toBeDefined();
    });

    it('should have demo sessions data', () => {
      expect(component.demoSessions).toBeDefined();
      expect(component.demoSessions.length).toBeGreaterThan(0);
      expect(component.demoSessions[0].id).toBeDefined();
      expect(component.demoSessions[0].title).toBeDefined();
    });
  });
});
