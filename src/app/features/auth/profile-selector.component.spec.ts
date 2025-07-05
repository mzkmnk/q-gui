import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AuthService } from '../../core/services';
import { AwsProfile } from '../../core/interfaces';
import { ProfileSelectorComponent } from './profile-selector.component';

describe('ProfileSelectorComponent', () => {
  let component: ProfileSelectorComponent;
  let fixture: ComponentFixture<ProfileSelectorComponent>;
  let mockAuthService: any;

  const mockProfiles: AwsProfile[] = [
    {
      name: 'default',
      region: 'us-east-1',
      type: 'static',
      source: 'credentials',
    },
    {
      name: 'dev',
      region: 'us-west-2',
      type: 'sso',
      source: 'config',
    },
    {
      name: 'prod',
      region: 'eu-west-1',
      type: 'role',
      source: 'config',
    },
  ];

  beforeEach(async () => {
    mockAuthService = {
      getProfiles: vi.fn(),
      setSelectedProfile: vi.fn(),
      getSelectedProfile: vi.fn(),
      testConnection: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ProfileSelectorComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileSelectorComponent);
    component = fixture.componentInstance;

    // デフォルトのモック設定
    mockAuthService.getProfiles.mockReturnValue(mockProfiles);
    mockAuthService.getSelectedProfile.mockReturnValue(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('初期化', () => {
    it('should load profiles on init', () => {
      component.ngOnInit();
      expect(mockAuthService.getProfiles).toHaveBeenCalled();
      expect(component.profiles()).toEqual(mockProfiles);
    });

    it('should have no selected profile initially', () => {
      component.ngOnInit();
      expect(component.selectedProfile()).toBeNull();
    });
  });

  describe('プロファイル一覧の表示', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render all profiles', () => {
      const compiled = fixture.nativeElement;
      const profileCards = compiled.querySelectorAll(
        '[data-testid="profile-card"]'
      );
      expect(profileCards.length).toBe(3);
    });

    it('should display profile names', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('default');
      expect(compiled.textContent).toContain('dev');
      expect(compiled.textContent).toContain('prod');
    });

    it('should display profile regions', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('us-east-1');
      expect(compiled.textContent).toContain('us-west-2');
      expect(compiled.textContent).toContain('eu-west-1');
    });

    it('should display profile types', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('static');
      expect(compiled.textContent).toContain('sso');
      expect(compiled.textContent).toContain('role');
    });
  });

  describe('プロファイル選択', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should select profile when clicked', () => {
      const compiled = fixture.nativeElement;
      const firstProfileCard = compiled.querySelector(
        '[data-testid="profile-card"]'
      );

      firstProfileCard.click();

      expect(mockAuthService.setSelectedProfile).toHaveBeenCalledWith(
        mockProfiles[0]
      );
    });

    it('should emit selected profile', () => {
      const emitSpy = vi.spyOn(component.profileSelected, 'emit');

      component.selectProfile(mockProfiles[1]);

      expect(emitSpy).toHaveBeenCalledWith(mockProfiles[1]);
    });

    it('should update selected profile state', () => {
      mockAuthService.getSelectedProfile.mockReturnValue(mockProfiles[0]);

      component.selectProfile(mockProfiles[0]);

      expect(component.selectedProfile()).toEqual(mockProfiles[0]);
    });

    it('should apply selected class to selected profile', () => {
      mockAuthService.getSelectedProfile.mockReturnValue(mockProfiles[0]);
      component.selectProfile(mockProfiles[0]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const firstProfileCard = compiled.querySelector(
        '[data-testid="profile-card"]'
      );
      expect(firstProfileCard.classList).toContain('selected');
    });
  });

  describe('接続テスト', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should show test connection button for each profile', () => {
      const compiled = fixture.nativeElement;
      const testButtons = compiled.querySelectorAll(
        '[data-testid="test-connection-btn"]'
      );
      expect(testButtons.length).toBe(3);
    });

    it('should call test connection when button clicked', () => {
      const compiled = fixture.nativeElement;
      const firstTestButton = compiled.querySelector(
        '[data-testid="test-connection-btn"]'
      );

      firstTestButton.click();

      expect(mockAuthService.testConnection).toHaveBeenCalledWith(
        mockProfiles[0]
      );
    });

    it('should show loading state during test', async () => {
      mockAuthService.testConnection.mockResolvedValue({
        profile: mockProfiles[0],
        status: 'connected',
        lastTested: new Date(),
      });

      const promise = component.testConnection(mockProfiles[0]);
      expect(component.isTestingConnection()).toBe(true);

      await promise;
      expect(component.isTestingConnection()).toBe(false);
    });
  });

  describe('エラーハンドリング', () => {
    it('should handle empty profiles list', () => {
      mockAuthService.getProfiles.mockReturnValue([]);
      component.ngOnInit();
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain(
        '利用可能なプロファイルがありません'
      );
    });

    it('should handle connection test errors', async () => {
      mockAuthService.testConnection.mockResolvedValue({
        profile: mockProfiles[0],
        status: 'error',
        lastTested: new Date(),
        error: 'テスト接続エラー',
      });

      await component.testConnection(mockProfiles[0]);

      expect(component.connectionError()).toBe('テスト接続エラー');
    });
  });
});
