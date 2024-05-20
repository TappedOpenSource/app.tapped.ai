"use client";

import { UserModel } from "@/domain/types/user_model";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: "artistName",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "venueIndfo.capacity",
    header: "capacity",
  },
];
