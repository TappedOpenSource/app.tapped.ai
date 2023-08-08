
import auth, { Credentials, LoginResult } from '@/data/auth';

export const loginWithCredentials = async (credentials: Credentials): Promise<void> => {
  await auth.loginWithCredentials(credentials);
};

export const loginWithGoogle = async (): Promise<LoginResult> => {
  const result = await auth.loginWithGoogle();
  return result;
};

export const loginWithApple = async (): Promise<LoginResult> => {
  const result = await auth.loginWithApple();
  return result;
};

export const logout = async (): Promise<void> => {
  await auth.logout();
};
