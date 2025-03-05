import { cn } from "@/lib/cn";

type HistoryIconProps = { className?: string };

function HistoryIcon({ className }: HistoryIconProps) {
  return (
    <div className="rounded-full p-2 hover:bg-gray-200/50 cursor-pointer active:bg-gray-400 transition-colors duration-150 leading-none overflow-clip">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className={cn(className)}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M13.5 8H12v5l4.28 2.54l.72-1.21l-3.5-2.08zM13 3a9 9 0 0 0-9 9H1l3.96 4.03L9 12H6a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.9 8.9 0 0 0 13 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9"
        />
      </svg>
    </div>
  );
}

export default HistoryIcon;
