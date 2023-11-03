import Image from 'next/image';
import Link from 'next/link';

const SignedArtistCard = ({ name, photo, url, signed }: {
  name: string;
  photo: string;
  url: string;
  signed: boolean;
}) => {
  return (
    <>
      <Link
        href={url}
        target="_blank"
        rel="noreferrer"
      >

        <div
          className="w-48 h-64 md:w-64 md:h-72 relative flex-shrink-0 m-2 hover:scale-105 transform transition-all duration-200 ease-in-out">
          <Image
            fill
            priority
            className='rounded-2xl'
            src={photo}
            alt={name}
            style={{ objectFit: 'cover' }} />
          <div className="absolute bg-gradient-to-t from-black to-30% bottom-0 left-0 w-full h-full rounded-2xl"></div>
          <p className="absolute font-bold text-xl bottom-0 left-0 pb-2 pl-2">{name}</p>
          {signed === true && (
            <div className="relative bg-transparent w-56 h-56 overflow-hidden">
              <div className="absolute left-0 top-0 h-16 w-16">
                <div className="absolute left-[-34px] top-[32px] w-[170px] transform -rotate-45 bg-red-600 text-center text-white font-bold py-1">
                Signed
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default SignedArtistCard;
