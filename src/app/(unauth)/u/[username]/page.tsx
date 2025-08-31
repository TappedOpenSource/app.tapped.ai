import ProfileView from "@/components/ProfileView";
import Footer from "@/components/Footer";
import { UserModel, profileImage } from "@/domain/types/user_model";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const getUserByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/getUserByUsername`;

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const metadataBase = "https://tapped.ai";
  try {
    const username = params.username;

    const res = await fetch(`${getUserByIdUrl}?username=${username}`);
    const user = (await res.json()) as UserModel;

    const imageSrc = profileImage(user);
    const displayName = user.artistName || user.username;
    return {
      metadataBase: new URL(metadataBase),
      title: `${displayName} | tapped ai`,
      description: `${displayName} on tapped ai | create a world tour from your iPhone`,
      openGraph: {
        type: "website",
        url: `${metadataBase}/u/${username}`,
        title: `${displayName}`,
        description: `${displayName} on tapped ai`,
        siteName: "tapped ai",
        images: [{ url: imageSrc }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedx",
        title: `${displayName}`,
        description: `${displayName} on tapped ai | create a world tour from your iPhone`,
        images: imageSrc,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      metadataBase: new URL(metadataBase),
      title: "tapped ai",
      description: "tapped ai",
      openGraph: {
        type: "website",
        url: metadataBase,
        title: "tapped ai",
        description: "tapped ai | create a world your from your iPhone",
        siteName: "tapped ai",
        images: [{ url: `${metadataBase}/og.png` }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedx",
        title: "tapped ai",
        description: "tapped ai | create a world your from your iPhone",
        images: `${metadataBase}/og.png`,
      },
    };
  }
}

export default async function Page(props: Props) {
  const params = await props.params;
  const username = params.username;
  return (
    <>
      <div>
        <ProfileView username={username} />
        <Footer />
      </div>
    </>
  );
}
