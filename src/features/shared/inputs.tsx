"use client";

import { useEffect, useState } from "react";

/** Generic, reusable inline text editor */
export function EditableText({
  value,
  action: onSave,
  placeholder = "Untitled",
  size = "lg",
  disabled = false,
}: {
  value: string;
  action: (next: string) => Promise<void> | void;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const commit = async () => {
    const next = draft.trim();
    if (next === value || !next) {
      setEditing(false);
      setDraft(value);
      return;
    }
    try {
      setPending(true);
      await onSave(next);
      setEditing(false);
    } finally {
      setPending(false);
    }
  };

  const sizeClass =
    size === "xl"
      ? "text-2xl"
      : size === "lg"
      ? "text-xl"
      : size === "md"
      ? "text-base"
      : "text-sm";

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void commit();
            if (e.key === "Escape") {
              setDraft(value);
              setEditing(false);
            }
          }}
          disabled={pending || disabled}
          className={`rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/10 dark:bg-neutral-900 dark:text-gray-100 ${sizeClass}`}
          placeholder={placeholder}
        />
        <button
          onClick={() => void commit()}
          disabled={pending || disabled}
          className="rounded-md bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <button
          onClick={() => {
            setDraft(value);
            setEditing(false);
          }}
          disabled={pending || disabled}
          className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <h1
        className={`font-bold text-text dark:text-text-inverted ${sizeClass}`}
      >
        {value || placeholder}
      </h1>
      <button
        onClick={() => setEditing(true)}
        disabled={disabled}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/5"
        aria-label="Edit"
      >
        Edit
      </button>
    </div>
  );
}
