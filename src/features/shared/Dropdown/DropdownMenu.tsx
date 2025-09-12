"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  icon?: string;
  className?: string;
  disabled?: boolean;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  trigger?: React.ReactNode;
  disabled?: boolean;
}

const DropdownMenu = ({
  items,
  trigger,
  disabled = false,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick();
      setIsOpen(false);
    }
  };

  const defaultTrigger = (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      disabled={disabled}
      aria-label="More options"
    >
      ⋯
    </button>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger ?? defaultTrigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors ${
                item.disabled
                  ? "cursor-not-allowed text-gray-400 dark:text-gray-500"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              } ${item.className ?? ""} `}
            >
              {item.icon && <span className="mr-2 text-base">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
