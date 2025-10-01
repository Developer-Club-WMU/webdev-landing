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
import { useRouter } from "next/navigation";
import type { RouterOutputs } from "@/trpc/react";

// Define the type for a member based on your TRPC output
type Member = RouterOutputs["membership"]["getRelevantMembers"][number];

const OfficerRelevantMembersTable = () => {
  // Get session data and status
  const { data: session, status } = useSession();
  // Initialize router for navigation
  const router = useRouter();

  // State to hold member data
  const [members, setMembers] = useState<Member[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Query to fetch relevant members from the API
  const memberQuery = api.membership.getRelevantMembers.useQuery(undefined, {
    // Only enable the query if a session user ID exists
    enabled: !!session?.user.id,
  });

  // Effect to update members state when query data changes
  useEffect(() => {
    if (!memberQuery.data) return; // Exit if no data
    setMembers(memberQuery.data); // Set members data
    setLoading(false); // Set loading to false
  }, [memberQuery.data]); // Dependency array includes memberQuery.data

  // Define table columns using Tanstack Table's ColumnDef
  const columns: ColumnDef<Member>[] = [
    {
      header: "Name", // Header for the Name column
      accessorKey: "user.name", // Key to access the name property
      cell: ({ row }) => row.original.user.name ?? "Unnamed", // Custom cell rendering for name
    },
    {
      header: "Email", // Header for the Email column
      accessorKey: "user.email", // Key to access the email property
      cell: ({ row }) => row.original.user.email ?? "N/A", // Custom cell rendering for email
    },
    {
      header: "Community", // Header for the Community column
      accessorKey: "community.name", // Key to access the community name property
      cell: ({ row }) => row.original.community.name, // Custom cell rendering for community name
    },
  ];

  // Initialize useReactTable hook with data and columns
  const table = useReactTable({
    data: members, // Data for the table
    columns, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Core row model for basic table functionality
  });

  // Handle loading states
  if (
    status === "loading" ||
    memberQuery.isLoading ||
    loading
  ) {
    return (
      <div className="flex items-center justify-center p-8 text-text-inclusive">
        Loading...
      </div>
    );
  }

  // Handle no session found
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center p-8 text-text-inclusive">
        Session not found
      </div>
    );
  }

  // Handle error state
  if (memberQuery.error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-500">
        Error loading data: {memberQuery.error.message}
      </div>
    );
  }

  return (
    // Main container for the table (light = white bg / dark = black bg)
    <div className="data-table-container">
      {/* Responsive wrapper */}
      <div className="overflow-x-auto">
        {/* Table */}
        <table className="data-table">
          {/* Header */}
          <thead className="data-table-header">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="data-table-header-cell"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="data-table-row data-table-row-clickable"
                onClick={() => router.push(`/officer/members/${row.original.user.id}`)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="data-table-cell"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OfficerRelevantMembersTable;