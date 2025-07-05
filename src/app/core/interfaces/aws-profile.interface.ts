export interface AwsProfile {
  readonly name: string;
  readonly region?: string;
  readonly output?: string;
  readonly type: ProfileType;
  readonly source?: string; // credentials or config file
}

export type ProfileType = 'static' | 'sso' | 'role' | 'unknown';

export interface AwsCredential {
  readonly accessKeyId?: string;
  readonly secretAccessKey?: string;
  readonly sessionToken?: string;
  readonly region?: string;
}

export interface SsoConfiguration {
  readonly ssoStartUrl?: string;
  readonly ssoRegion?: string;
  readonly ssoAccountId?: string;
  readonly ssoRoleName?: string;
}

export interface ProfileConnection {
  readonly profile: AwsProfile;
  readonly status: ConnectionStatus;
  readonly lastTested?: Date;
  readonly error?: string;
}

export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'testing'
  | 'error';
