import { UserModel, profileImage } from "@/domain/types/user_model";
import Image from "next/image";

export default function PerformerCard({
  performer,
}: {
  performer: UserModel;
}) {
  const pfp = profileImage(performer);
  return (
    <>
      <div className="flex flex-col items-start">
        <div className="relative w-24 h-32 rounded-lg bg-card">
          <Image
            className="rounded-lg w-24 h-24"
            src={pfp}
            alt={performer.artistName ?? performer.username}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <p className="mt-2 text-sm font-semibold">{performer.artistName ?? performer.username}</p>
      </div>
    </>
  );
}
