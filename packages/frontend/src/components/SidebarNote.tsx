"use client";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import { deleteNote, type Note } from "@/lib/notesRepo";
import Link from "next/link";
import { useParams } from "next/navigation";

interface SidebarNoteProps {
  note: Note;
}

function SidebarNote({ note }: SidebarNoteProps) {
  // TODO: Every item in the note list re-renders due to useParams, this needs refactor with inner component
  // with a custom isEqual memoization? Maybe unecessary the list is only rendered once per load
  const { note: currentNote } = useParams();
  return (
    <li
      className={cn("mb-2 p-2 border rounded hover:bg-slate-200/70", {
        "bg-slate-400/30 hover:bg-slate-400/50": currentNote === note._id,
      })}
    >
      <Link href={`/notes/${note._id}`}>
        <h3 className="font-medium truncate">{note.title}</h3>
        <p className="text-xs text-gray-500">
          Created: {formatDate(note._created)}
        </p>
      </Link>
      <div
        className="text-right text-xs text-gray-500 italic underline cursor-pointer"
        onClick={deleteNote.bind(null, note)}
      >
        Delete...
      </div>
    </li>
  );
}

export default SidebarNote;
