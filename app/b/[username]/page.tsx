import type { Metadata, ResolvingMetadata } from 'next/types';
import BookerProfileView from '@/components/BookerProfileView';
import { UserModel, profileImage } from '@/domain/models/user_model';

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getUserByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/getUserByUsername`;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const host = 'https://tapped.ai';
  try {
    const username = params.username;

    const res = await fetch(`${getUserByIdUrl}?username=${username}`);
    const user = (await res.json()) as UserModel;

    const imageSrc = profileImage(user);
    return {
      metadataBase: new URL(host),
      title: `${username}`,
      description: `${username} on tapped`,
      openGraph: {
        type: 'website',
        url: `${host}/${username}`,
        title: `${username}`,
        description: `${username} on tapped`,
        siteName: 'Tapped Ai',
        images: [{ url: imageSrc }],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@tappedai',
        title: `${username}`,
        description: `${username} on tapped`,
        images: imageSrc,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      metadataBase: new URL(host),
      title: 'Tapped',
      description: 'Tapped',
      openGraph: {
        type: 'website',
        url: host,
        title: 'Tapped',
        description: 'Tapped',
        siteName: 'Tapped Ai',
        images: [{ url: `${host}/og.png` }],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@tappedai',
        title: 'Tapped',
        description: 'Tapped',
        images: `${host}/og.png`,
      },
    };
  }
}

export default function Page({ params }: Props) {
  const username = params.username;

  return (
    <>
      <BookerProfileView username={username} />
    </>
  );
}
