import type { UserModel } from "@/domain/types/user_model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function UserAvatarList({ users }: {
    users: UserModel[];
}) {
  if (users.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex -space-x-3 *:ring *:ring-white overflow-y-scroll">
        {users.map((user) => (
          <Link
            key={user.id}
            target="_blank"
            rel="noreferrer noopener"
            href={`/u/${user.username}`}
            className="flex items-center justify-center rounded-full"
          >
            <Avatar key={user.id}>
              <AvatarImage src={user.profilePicture ?? undefined} alt={user.username} />
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
          </Link>
        ))}
      </div>
    </>
  );
}
