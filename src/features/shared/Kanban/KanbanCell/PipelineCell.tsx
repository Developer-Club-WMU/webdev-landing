"use client";

import type { PipelineCellProps } from "@/models";
import { PipelineCellViewModel } from "./PipelineCellViewModel";
import { DateUtils } from "@/lib/date";
import Image from "next/image";

const PipelineCell = (props: PipelineCellProps) => {
  const vm = new PipelineCellViewModel(props);

  return (
    <div
      className={`border-border-muted bg-bg dark:bg-bg-inverted/20 cursor-pointer rounded-xl border p-4 shadow-md transition-transform dark:border-gray-500/50 ${
        vm.isDragging ? "opacity-50" : "hover:scale-[1.01]"
      }`}
      draggable
      onClick={vm.onClick}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", vm.ID);
      }}
    >
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
    </div>
  );
};

export default PipelineCell;
