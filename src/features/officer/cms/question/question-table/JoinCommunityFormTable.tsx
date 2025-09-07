"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { DateUtils } from "@/lib/date";
import { useRouter } from "next/navigation";
import type { CommunityForm } from "@prisma/client";

type CommunityFormWithCreator = CommunityForm & { createdByName: string };

const JoinCommunityFormTable = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [allForms, setAllForms] = useState<CommunityFormWithCreator[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = session?.user.id ?? null;

  const membershipsQuery = api.membership.findUserMemberships.useQuery(
    { id: userId }, // input only when we have i
    { enabled: !!userId }
  );

  const formsQuery = api.communityForms.grabAll.useQuery(undefined, {
    enabled: !!session?.user.id,
  });

  useEffect(() => {
    if (!membershipsQuery.data || !formsQuery.data) return;

    const userCommunityTags = new Set(
      membershipsQuery.data.map((m) => m.community.name)
    );

    const relevantForms = formsQuery.data.filter((form) =>
      userCommunityTags.has(form.communityTag)
    );

    setAllForms(relevantForms);
    setLoading(false);
  }, [membershipsQuery.data, formsQuery.data]);

  const columns: ColumnDef<CommunityFormWithCreator>[] = [
    {
      header: "Created On",
      accessorKey: "createAt",
      cell: ({ getValue }) => DateUtils.toDateString(getValue() as Date),
    },
    { header: "Title", accessorKey: "title" },
    { header: "Description", accessorKey: "description" },
    { header: "For", accessorKey: "communityTag" },
    { header: "Active", accessorKey: "isActive" },
    { header: "Created By", accessorKey: "createdByName" },
  ];

  const table = useReactTable({
    data: allForms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (status === "loading" || membershipsQuery.isLoading || formsQuery.isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <div>Session not found</div>;
  }

  if (membershipsQuery.error || formsQuery.error) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-bg dark:bg-bg-inverted">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-left border-b">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/officer/cms/questions/${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoinCommunityFormTable;
