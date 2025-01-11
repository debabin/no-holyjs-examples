import { getDatabaseConfig } from './database';
import { getGithubCardConfig } from './getGithubCardConfig';
import { getProfileConfig } from './getProfileConfig';
import { postOtpEmailConfig } from './postOtpEmailConfig';
import { postOtpPhoneConfig } from './postOtpPhoneConfig';
import { postSignInEmailConfig } from './postSignInEmailConfig';
import { postSignInLoginConfig } from './postSignInLoginConfig';
import { postSignUpConfig } from './postSignUpConfig';
import { postTwoFactorAuthenticationConfig } from './postTwoFactorAuthenticationConfig';
import { putGithubUpdateCardConfig } from './putGithubUpdateCardConfig';

export const githubConfigs = [getGithubCardConfig, putGithubUpdateCardConfig];

export const authConfigs = [
  getDatabaseConfig,
  getProfileConfig,
  postOtpEmailConfig,
  postOtpPhoneConfig,
  postSignInEmailConfig,
  postSignInLoginConfig,
  postSignUpConfig,
  postTwoFactorAuthenticationConfig
];
