"use client";

import { createPortal } from "react-dom";
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "warning" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "danger",
}) => {
  if (!isOpen || typeof window === "undefined") return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          icon: "⚠️",
          iconColor: "text-red-600 dark:text-red-400",
        };
      case "warning":
        return {
          confirmButton:
            "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
          icon: "⚠️",
          iconColor: "text-yellow-600 dark:text-yellow-400",
        };
      case "info":
        return {
          confirmButton: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          icon: "ℹ️",
          iconColor: "text-blue-600 dark:text-blue-400",
        };
      default:
        return {
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          icon: "⚠️",
          iconColor: "text-red-600 dark:text-red-400",
        };
    }
  };

  const styles = getVariantStyles();

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start">
          <div className={`flex-shrink-0 ${styles.iconColor}`}>
            <span className="text-2xl">{styles.icon}</span>
          </div>
          <div className="ml-4 w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50 dark:focus:ring-offset-gray-800 ${styles.confirmButton}`}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmationModal;
