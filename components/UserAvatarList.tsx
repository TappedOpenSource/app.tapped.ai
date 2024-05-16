import type { UserModel } from "@/domain/types/user_model";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function UserAvatarList({ users }: {
    users: UserModel[];
}) {
  if (users.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex -space-x-3 *:ring *:ring-white">
        {users.map((user) => (
          <Link
            key={user.id}
            target="_blank"
            rel="noreferrer noopener"
            href={`/${user.username}`}
            className="flex items-center justify-center"
          >
            <Avatar key={user.id}>
              <AvatarImage src={user.profilePicture ?? undefined} />
            </Avatar>
          </Link>
        ))}
      </div>
    </>
  );
}
