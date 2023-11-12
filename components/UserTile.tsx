import Image from 'next/image';
import { UserModel } from '@/domain/models/user_model';

export default function UserTile({ user }: {
    user: UserModel | null;
}) {
  if (user === null) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <div className='flex flex-row items-center'>
      <div className='relative h-12 w-12 overflow-hidden rounded-full'>
        <Image
          src={user.profilePicture}
          alt={`${user.artistName} profile picture`}
          objectFit='cover'
          objectPosition='center'
          fill
        />
      </div>
      <div className='ml-4'>
        <h3 className='text-xl font-bold'>{user.artistName}</h3>
        <p className='text-sm text-gray-500'>@{user.username}</p>
      </div>
    </div>
  );
}
