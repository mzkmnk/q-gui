import { TestBed } from '@angular/core/testing';
import { AwsProfile, ProfileConnection, ConnectionStatus } from '../interfaces';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProfiles', () => {
    it('should return empty array initially', () => {
      const profiles = service.getProfiles();
      expect(profiles).toEqual([]);
    });

    it('should return mock profiles when available', () => {
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
      ];

      service.setMockProfiles(mockProfiles);
      const profiles = service.getProfiles();

      expect(profiles).toEqual(mockProfiles);
      expect(profiles.length).toBe(2);
    });
  });

  describe('testConnection', () => {
    it('should return testing status initially', async () => {
      const mockProfile: AwsProfile = {
        name: 'test',
        region: 'us-east-1',
        type: 'static',
        source: 'credentials',
      };

      const connectionPromise = service.testConnection(mockProfile);
      expect(service.getConnectionStatus()).toBe('testing');

      const connection = await connectionPromise;
      expect(connection.status).toBe('connected');
      expect(connection.profile).toEqual(mockProfile);
    });

    it('should handle connection failure', async () => {
      const mockProfile: AwsProfile = {
        name: 'invalid',
        region: 'invalid-region',
        type: 'static',
        source: 'credentials',
      };

      service.setShouldFailConnection(true);
      const connection = await service.testConnection(mockProfile);

      expect(connection.status).toBe('error');
      expect(connection.error).toBeDefined();
    });
  });

  describe('authentication state', () => {
    it('should track selected profile', () => {
      const mockProfile: AwsProfile = {
        name: 'selected',
        region: 'us-east-1',
        type: 'static',
        source: 'credentials',
      };

      service.setSelectedProfile(mockProfile);
      expect(service.getSelectedProfile()).toEqual(mockProfile);
    });

    it('should clear selected profile', () => {
      const mockProfile: AwsProfile = {
        name: 'test',
        region: 'us-east-1',
        type: 'static',
        source: 'credentials',
      };

      service.setSelectedProfile(mockProfile);
      service.clearSelectedProfile();
      expect(service.getSelectedProfile()).toBeNull();
    });
  });
});
