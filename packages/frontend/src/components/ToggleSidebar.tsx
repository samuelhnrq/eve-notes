"use client";

import HistoryIcon from "@/icons/HistoryIcon";
import { cn } from "@/lib/cn";
import { type PropsWithChildren, useState } from "react";

function ToggleSidebar({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const [shown, setShown] = useState(false);
  return (
    <div
      className={cn(
        "absolute top-0 right-0 h-full w-xs flex transition-transform",
        {
          "translate-x-full": !shown,
        },
        className
      )}
    >
      <div
        onClick={() => setShown((val) => !val)}
        className={cn("relative top-4 transition-transform", {
          "-translate-x-full": !shown,
        })}
      >
        <HistoryIcon className="w-6 h-6" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default ToggleSidebar;
