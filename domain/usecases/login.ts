
import auth, { Credentials, LoginResult } from '@/data/auth';

export const loginWithCredentials = async (credentials: Credentials): Promise<void> => {
  await auth.loginWithCredentials(credentials);
};

export const loginWithGoogle = async (): Promise<LoginResult> => {
  return await auth.loginWithGoogle();
};

export const loginWithApple = async (): Promise<LoginResult> => {
  return await auth.loginWithApple();
};

export const logout = async (): Promise<void> => {
  await auth.logout();
};
