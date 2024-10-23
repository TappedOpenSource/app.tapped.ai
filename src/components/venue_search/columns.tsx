"use client";

import { UserModel } from "@/domain/types/user_model";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<UserModel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "artistName",
    header: "name",
  },
  {
    accessorKey: "venueInfo.bookingEmail",
    header: "email",
  },
  {
    id: "capacity",
    accessorKey: "venueInfo.capacity",
    header: "capacity",
    cell: ({ row }) => {
      const capacity = parseFloat(row.getValue("capacity"));
      const formatted = capacity.toLocaleString("en-US");

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
