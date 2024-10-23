import Image from "next/image";
import { UserModel, profileImage } from "@/domain/types/user_model";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export default function UserTile({
  user,
}: {
  user: UserModel | null;
}) {
  if (user === null) {
    return <Skeleton />;
  }

  const imageSrc = profileImage(user);

  return (
    <Link href={`/u/${user.username}`}>
      <div className="flex flex-row items-center">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={imageSrc}
            alt={`${user.artistName} profile picture`}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold line-clamp-1 text-ellipsis overflow-hidden">{user.artistName}</h3>
          <p className="text-sm text-gray-500 line-clamp-1 text-ellipsis overflow-hidden">@{user.username}</p>
        </div>
      </div>
    </Link>
  );
}
