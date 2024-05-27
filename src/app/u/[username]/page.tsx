import ProfileView from "@/components/ProfileView";
import Footer from "@/components/Footer";
import MapHeader from "@/components/map_header";
import { UserModel, profileImage } from "@/domain/types/user_model";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const getUserByIdUrl = `${process.env.NEXT_PUBLIC_API_URL}/getUserByUsername`;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const metadataBase = "https://app.tapped.ai";
  try {
    const username = params.username;

    const res = await fetch(`${getUserByIdUrl}?username=${username}`);
    const user = (await res.json()) as UserModel;

    const imageSrc = profileImage(user);
    const displayName = user.artistName || user.username;
    return {
      metadataBase: new URL(metadataBase),
      title: `${displayName} | Tapped`,
      description: `${displayName} on tapped - create a world tour from your iPhone`,
      openGraph: {
        type: "website",
        url: `${metadataBase}/${username}`,
        title: `${displayName}`,
        description: `${displayName} on tapped`,
        siteName: "Tapped Ai",
        images: [{ url: imageSrc }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title: `${displayName}`,
        description: `${displayName} on tapped`,
        images: imageSrc,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      metadataBase: new URL(metadataBase),
      title: "Tapped",
      description: "Tapped",
      openGraph: {
        type: "website",
        url: metadataBase,
        title: "Tapped",
        description: "Tapped",
        siteName: "Tapped Ai",
        images: [{ url: `${metadataBase}/og.png` }],
      },
      twitter: {
        card: "summary_large_image",
        site: "@tappedai",
        title: "Tapped",
        description: "Tapped",
        images: `${metadataBase}/og.png`,
      },
    };
  }
}

export default function Page({ params }: Props) {
  const username = params.username;
  return (
    <>
      <div className="landing">
        <MapHeader />
        <ProfileView username={username} />
        <Footer />
      </div>
    </>
  );
}
