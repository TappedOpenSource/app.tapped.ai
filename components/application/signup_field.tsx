import SignInWithGoogleButton from '@/components/signin_with_google_button';
import { useRouter } from 'next/router';

const SignUpField = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/branding');
  };

  return (
    <>
      <p className='text-black font-bold text-xl'>
        Sign up and we'll email you our decision
      </p>
      <SignInWithGoogleButton onClick={handleLogin} />
      {/* <SignInWithAppleButton /> */}
    </>
  );
};

export default SignUpField;
