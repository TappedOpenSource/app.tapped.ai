import auth, { Credentials, SignupResult } from '@/data/auth';

export const signupWithCredentials = async (credentials: Credentials): Promise<void> => {
  await auth.signupWithCredentials(credentials);
};
