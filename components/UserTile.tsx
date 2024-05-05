import Image from 'next/image';
import { UserModel, profileImage } from '@/domain/models/user_model';
import Link from 'next/link';

export default function UserTile({ user }: {
    user: UserModel | null;
}) {
  if (user === null) {
    return (
      <p>loading...</p>
    );
  }

  const imageSrc = profileImage(user);

  return (
    <Link
      href={`/${user.username}`}
    >
      <div className='flex flex-row items-center'>
        <div className='relative h-12 w-12 overflow-hidden rounded-full'>
          <Image
            src={imageSrc}
            alt={`${user.artistName} profile picture`}
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }} />
        </div>
        <div className='ml-4'>
          <h3 className='text-xl font-bold'>{user.artistName}</h3>
          <p className='text-sm text-gray-500'>@{user.username}</p>
        </div>
      </div>
    </Link>
  );
}
