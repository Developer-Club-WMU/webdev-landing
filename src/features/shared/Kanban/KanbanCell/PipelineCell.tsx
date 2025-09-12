"use client";

import type { PipelineCellProps } from "@/models";
import { PipelineCellViewModel } from "./PipelineCellViewModel";
import { DateUtils } from "@/lib/date";
import Image from "next/image";
import { useState, useEffect } from "react";
import SidePanel from "../../SidePanel/Panel/SidePanel";
import LeadSummaryPanel from "../../SidePanel/PipelineSummaryPanel/PipelineSummaryPanel";

const PipelineCell = (props: PipelineCellProps) => {
  const vm = new PipelineCellViewModel(props);
  const [isOpen, openPanel] = useState<boolean>(false);
  const [isRecentlyUpdated, setIsRecentlyUpdated] = useState(false);

  // Show visual indicator for recently updated leads
  useEffect(() => {
    const updatedAt = new Date(props.leadInfo.addedOn);
    const now = new Date();
    const timeDifference = now.getTime() - updatedAt.getTime();
    const fiveMinutesInMs = 5 * 60 * 1000;
    
    if (timeDifference < fiveMinutesInMs) {
      setIsRecentlyUpdated(true);
      const timer = setTimeout(() => {
        setIsRecentlyUpdated(false);
      }, fiveMinutesInMs - timeDifference);
      
      return () => clearTimeout(timer);
    }
  }, [props.leadInfo.addedOn]);

  return (
    <div
      className={`border-border-muted bg-bg dark:bg-github-lbg cursor-pointer rounded-xl border p-4 shadow-md transition-transform dark:border-gray-500/50 relative ${
        vm.isDragging ? "opacity-50" : "hover:scale-[1.01]"
      } ${
        isRecentlyUpdated ? "ring-2 ring-green-400 dark:ring-green-500" : ""
      }`}
      draggable
      onClick={() => openPanel((val) => !val)}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", vm.ID);
      }}
    >
      {isRecentlyUpdated && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      )}
      <div className="mb-2 flex items-center gap-3">
        {vm.avatarURL && (
          <Image
            width={40}
            height={40}
            src={vm.avatarURL}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
        )}
        <div>
          <p className="text-text dark:text-text-inverted font-semibold">
            {vm.leadName}
          </p>
          <p className="text-text-muted text-sm">{vm.companyName}</p>
        </div>
      </div>

      <h3 className="text-text dark:text-text-inverted mb-1 text-lg font-bold">
        {vm.title}
      </h3>
      <p className="text-text-muted mb-3 text-sm">{vm.description}</p>

      <div className="text-text-muted flex justify-between text-sm">
        <span>💰 {vm.capital}</span>
        <span>📅 Due: {DateUtils.toDateString(vm.dueIn)}</span>
      </div>

      <div className="text-text-muted mt-2 flex justify-between text-xs italic">
        <span>Added {DateUtils.toDateString(vm.addedAgo)}</span>
        <span>
          {vm.leadType} • {vm.status}
        </span>
      </div>

      <SidePanel isOpen={isOpen} onClose={() => openPanel(false)}>
        <LeadSummaryPanel lead={vm.lead} />
      </SidePanel>
    </div>
  );
};

export default PipelineCell;
