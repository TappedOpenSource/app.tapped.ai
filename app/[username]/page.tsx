import UserProfileView from '@/components/UserProfileView';
import { UserModel, profileImage } from '@/domain/models/user_model';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getUserByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/getUserByUsername`;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const username = params.username;

  const res = await fetch(`${getUserByIdUrl}?username=${username}`);
  const user = await res.json() as UserModel;

  const imageSrc = profileImage(user);

  return {
    title: `${username}`,
    description: 'Tapped Ai : world\'s first Ai label',
    openGraph: {
      images: [imageSrc],
    },
  };
}

export default function Page({ params }: Props) {
  const username = params.username;

  return (
    <>
      <UserProfileView username={username} />
    </>
  );
}
