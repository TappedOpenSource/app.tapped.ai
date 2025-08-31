"use client";

import {
  UserModel,
  imageOrDefault,
  profileImage,
  totalSocialFollowing,
} from "@/domain/types/user_model";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<UserModel>[] = [
  {
    id: "profilePicture",
    accessorKey: "profilePicture",
    header: "pfp",
    cell: ({ row }) => {
      const profilePicture = row.getValue(
        "profilePicture"
      ) as UserModel["profilePicture"];

      const profilePictureUrl = imageOrDefault({ url: profilePicture });

      return (
        <div className="relative h-6 w-6 rounded-xl">
          <Image
            src={profilePictureUrl}
            alt="profile picture"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "artistName",
    header: "name",
  },
  {
    accessorKey: "username",
    header: "username",
  },
  {
    id: "audience",
    accessorKey: "socialFollowing",
    header: "audience",
    cell: ({ row }) => {
      const socialFollowing = row.getValue(
        "audience"
      ) as UserModel["socialFollowing"];

      const audienceSize = totalSocialFollowing(socialFollowing);
      const formatted =
        audienceSize === 0 ? "N/A" : audienceSize.toLocaleString();

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];
