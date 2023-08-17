import SignInWithGoogleButton from '@/components/signin_with_google_button';
import { useRouter } from 'next/router';
import database from '@/data/database';
import { LoginResult } from '@/data/auth';

const SignUpField = ({ formData, updateFormData, onValidation }) => {
  const router = useRouter();

  const handleLogin = (loginResult: LoginResult) => {
    console.log({ userId: loginResult.uid, ...formData });
    database.createNewApplicationResponse({
      userId: loginResult.uid,
      labelApplication: {
        timestamp: new Date(),
        ...formData,
      },
    });
    router.push('/signup_complete');
  };

  return (
    <>
      <p className="text-xl font-bold text-black">
        sign up and we&apos;ll email you our decision
      </p>
      <SignInWithGoogleButton onClick={handleLogin} />
      {/* <SignInWithAppleButton /> */}
    </>
  );
};

export default SignUpField;
