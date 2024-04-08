import Image from 'next/image';
import { AppStoreButton, GooglePlayButton } from '@/components/react-mobile-app-button';

export default function Download() {
  const appleUrl = 'https://apps.apple.com/us/app/tapped-network/id1574937614';
  const googleUrl = 'https://play.google.com/store/apps/details?id=com.intheloopstudio';

  return <>
    <div
      className="flex flex-col justify-center h-screen bg-gradient-to-r from-blue-500 to-cyan-500"
    >
      <div
        className="flex justify-center items-center pb-16"
      >
        <Image
          src="/images/icon_1024.png"
          alt="tapped logo"
          width={150}
          height={150}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }} />
      </div>
      <div className="flex justify-center items-center flex-col md:flex-row gap-4">
        <GooglePlayButton
          url={googleUrl}
          theme={'dark'}
        />
        <AppStoreButton
          url={appleUrl}
          theme={'dark'}
        />
      </div>
    </div>
  </>;
}
