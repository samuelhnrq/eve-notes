import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import { getNoteHistory, restoreNote, type Note } from "@/lib/notesRepo";
import React from "react";

async function HistorySidebar({
  className,
  note,
}: {
  className?: string;
  note: Note;
}) {
  const notes = await getNoteHistory(note);
  return (
    <div className={cn("bg-side-bg h-full overflow-auto", className)}>
      {notes.map((version) => (
        <div
          key={version._etag}
          onClick={restoreNote.bind(null, note, version)}
          className="border-1 border-slate-500 mb-4 rounded-md p-2 cursor-pointer"
        >
          <div>{version.title}</div>
          <div>at {formatDate(version._updated)}</div>
        </div>
      ))}
    </div>
  );
}

export default HistorySidebar;
