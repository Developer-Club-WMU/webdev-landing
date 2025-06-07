import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SidePanel = ({ isOpen, onClose, children }: SidePanelProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  if (typeof window === "undefined") return null;
  if (!isOpen) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onClick={(e) => {
        // Close only if backdrop itself is clicked
        // if (e.target === e.currentTarget) {
        if (e.target === backdropRef.current) {
          console.log("Clicking");
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex justify-end bg-black/30"
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <aside
        className={`side-panel dark:text-text-inverted visible rounded-l-4xl text-white shadow-2xl dark:bg-[#151B23]`}
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        <button
          onClick={onClose}
          className="text-text dark:text-text-inverted absolute top-4 left-[-3rem] rounded bg-gray-200 px-2 py-1 dark:bg-[#151B23]"
        >
          ✕
        </button>
        <div className="no-scrollbar h-full overflow-y-auto p-4">
          {children}
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default SidePanel;
