import { cn } from "@/lib/cn";
import React from "react";

export type AddIconProps = { className?: string; onClick?: () => void };

function AddIcon({ className, onClick }: AddIconProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        "rounded-full hover:bg-gray-200/50 cursor-pointer active:bg-gray-400 transition-colors duration-150"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="m-1"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
      </svg>
    </div>
  );
}

export default AddIcon;
