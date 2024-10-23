import { getUserById } from "@/data/database";
import { UserModel, profileImage } from "@/domain/types/user_model";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function UserAvatar({
  user,
}: {
  user: UserModel | string; // user model or user id
}) {
  const [fetchedUser, setFetchedUser] = useState<UserModel | null>(typeof user === "string" ? null : user);

  useEffect(() => {
    if (typeof user === "string") {
      const fetchUser = async () => {
        const fetched = await getUserById(user);
        setFetchedUser(fetched ?? null);
      };
      fetchUser();
    }
  }, [user]);

  if (fetchedUser === null) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-transparent">{}</AvatarFallback>
      </Avatar>
    );
  }

  const pfp = profileImage(fetchedUser);
  return (
    <>
      <Link href={`/u/${fetchedUser?.id}`}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={pfp} alt="user pfp" />
          <AvatarFallback className="bg-transparent">{fetchedUser.username.slice(0, 2) ?? "JD"}</AvatarFallback>
        </Avatar>
      </Link>
    </>
  );
}
