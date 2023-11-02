// import SignInWithGoogleButton from '@/components/signin_with_google_button';
import { useRouter } from 'next/router';
import database from '@/data/database';
// import { LoginResult } from '@/data/auth';
// import { loginWithGoogle } from '@/domain/usecases/login';

const SignUpField = ({ formData, updateFormData, onValidation }) => {
  const router = useRouter();

  const handleClick = async () => {
    // try {
    //   loginWithGoogle();
    //   // console.log({ userId: response.uid });
    // } catch (err) {
    //   console.error(err);
    // }

    await database.createNewApplicationResponse({
      userId: 'anonymous',
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
            submit and we&apos;ll email you our decision
          </p>
        </div>
        <div className="flex items-center justify-center w-[60%] mx-auto">
          <button
            onClick={handleClick}
            className='font-extrabold text-black bg-white rounded-full px-8 py-2'
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpField;
