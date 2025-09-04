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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 shadow-2xl
                       dark:border-white/10 dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Lead Info Capture
              </h2>
              <button
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700
                           dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="text-gray-800 dark:text-gray-200">{children}</div>
          </div>
        </div>,
    document.body,
  );
};

export default LeadInfoCapture;
