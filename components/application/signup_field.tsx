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
    <div style={{ backgroundColor: '#15242d', height: '100vh' }} className="flex items-center justify-center">
      <div className="text-center">
        <div>
          <p className="text-lg font-bold text-white mb-4">
            sign up and we&apos;ll email you our decision
          </p>
        </div>
        <div className="flex items-center justify-center w-[60%] mx-auto">
          <SignInWithGoogleButton onClick={handleLogin} />
          {/* <SignInWithAppleButton /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpField;
