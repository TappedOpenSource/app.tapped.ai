"use client";

import { UserModel } from "@/domain/types/user_model";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: "artistName",
    header: "name",
  },
  {
    accessorKey: "username",
    header: "username",
  },
  // {
  //   id: "",
  //   accessorKey: "venueInfo.capacity",
  //   header: "capacity",
  //   cell: ({ row }) => {
  //     const capacity = parseFloat(row.getValue("capacity"));
  //     const formatted = capacity.toLocaleString("en-US");

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
];
