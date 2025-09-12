"use client";

import { useEffect, useState } from "react";
import { FaHardHat } from "react-icons/fa";

const messages = [
  "Laying down some pixels...",
  "Polishing the UI bolts...",
  "Wiring the backend magic...",
  "Configuring cosmic CSS...",
  "Deploying imagination...",
];

const PageIsUnderConstruction = ({ showButton }: { showButton: boolean }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="page items-center justify-center text-center text-inclusive font-sans">
      <div className="flex flex-col items-center gap-6">
        <FaHardHat className="text-6xl text-hackathon animate-bounce" />
        <h1 className="title text-hackathon drop-shadow-lg">
          Page Under Construction
        </h1>
        <p className="text-lg sm:text-xl text-black dark:text-text-muted max-w-md">
          {messages[messageIndex]}
        </p>
        {showButton && (
          <button
            className="mt-6 standard-btn hover:scale-105 transition-transform duration-300"
            onClick={() => location.href = "/"}
          >
            ← Back to Safety
          </button>
        )}
      </div>
    </main>
  );
};

export default PageIsUnderConstruction;
