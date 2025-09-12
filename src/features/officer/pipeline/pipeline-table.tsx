"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePipelineTable } from "@/hooks/pipeline/usePipelineTable";
import { api } from "@/trpc/react";
import DropdownMenu from "@/features/shared/Dropdown/DropdownMenu";
import ConfirmationModal from "@/features/shared/Modal/ConfirmationModal";

type Pipeline = ReturnType<typeof usePipelineTable>["pipelines"][number];

// Hover here to confirm it includes createdBy
export const PipelineTable = () => {
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pipelineToDelete, setPipelineToDelete] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const utils = api.useUtils();

  /**
   * Grabs the necessary information needed to render react-table
   */
  const { isLoading, pipelines, error } = usePipelineTable();

  // Delete pipeline mutation
  const deletePipeline = api.crm.pipelines.delete.useMutation({
    onSuccess: () => {
      void utils.crm.pipelines.grabAll.invalidate();
      setDeleteModalOpen(false);
      setPipelineToDelete(null);
      setDeleteError(null);
    },
    onError: (error) => {
      setDeleteError(error.message);
    },
  });

  const handleRowClick = (pipelineId: string, event: React.MouseEvent) => {
    // Don't navigate if clicking on the dropdown or its children
    const target = event.target as HTMLElement;
    if (target.closest("[data-dropdown]")) {
      return;
    }
    router.push(`/officer/pipeline/${pipelineId}`);
  };

  const handleDeleteClick = (pipelineId: string) => {
    setPipelineToDelete(pipelineId);
    setDeleteError(null);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (pipelineToDelete) {
      deletePipeline.mutate({ id: pipelineToDelete });
    }
  };

  /**
   * Defines the columns in the table
   */
  const columns: ColumnDef<Pipeline>[] = [
    {
      header: "Created By",
      accessorKey: "createdBy.name",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }) => {
        const pipeline = row.original;
        const dropdownItems = [
          {
            id: "delete",
            label: "Delete",
            icon: "🗑️",
            onClick: () => handleDeleteClick(pipeline.id),
            className:
              "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20",
          },
        ];

        return (
          <div data-dropdown onClick={(e) => e.stopPropagation()}>
            <DropdownMenu items={dropdownItems} />
          </div>
        );
      },
      size: 50,
    },
  ];

  const table = useReactTable({
    data: pipelines ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Defines states based on error or loading
  if (isLoading) return <p className="text-text">Loading...</p>;
  if (error)
    return <p className="text-error">Error loading: {error.message}</p>;

  return (
    <div className="border-border-muted bg-bg dark:bg-github-dbg overflow-auto rounded-xl border shadow-md">
      <table className="text-text dark:text-text-inverted min-w-full text-left text-sm">
        <thead className="bg-bg-muted dark:bg-github-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-border-muted border-b px-4 py-3 text-xs font-semibold tracking-wide"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-text-muted px-4 py-6 text-center"
              >
                No pipelines found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-bg-muted dark:hover:bg-github-muted cursor-pointer transition"
                onClick={(e) => handleRowClick(row.original.id, e)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-border-muted border-t px-4 py-3"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPipelineToDelete(null);
          setDeleteError(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Pipeline"
        message={
          deleteError
            ? `Error: ${deleteError}`
            : "Are you sure you want to delete this pipeline? This action cannot be undone and will remove all associated data."
        }
        confirmText="Delete"
        isLoading={deletePipeline.isPending}
        variant="danger"
      />
    </div>
  );
};
