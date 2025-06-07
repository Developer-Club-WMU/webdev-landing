import { createPortal } from "react-dom";
import React from "react";

interface LeadInfoCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const LeadInfoCapture: React.FC<LeadInfoCaptureProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-[#1e1e1e]"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        <div className="mb-4 flex justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Lead Info Capture
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default LeadInfoCapture;
