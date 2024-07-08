"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data_table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "./columns";
import type { UserModel } from "@/domain/types/user_model";
import { getInterestedUsersForOpportunity } from "@/data/database";

export default function ApplicantsTable({ opId }: { opId: string }) {
  const [applicants, setApplicants] = useState<UserModel[]>([]);
  const table = useReactTable({
    data: applicants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    const fetchApplicants = async () => {
      const apps = await getInterestedUsersForOpportunity(opId);
      setApplicants(apps);
    };
    fetchApplicants();
  }, [opId]);

  return (
    <>
      <DataTable table={table} />
    </>
  );
}
