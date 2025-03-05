import { getNote, renameNote, type Note } from "@/lib/notesRepo";
import React from "react";
import ClientEditor from "@/components/NoteEditor";
import { redirect } from "next/navigation";
import HistorySidebar from "@/components/HistorySidebar";
import ToggleSidebar from "@/components/ToggleSidebar";

async function PageEdit({ params }: { params: Promise<{ note: string }> }) {
  const { note: noteId } = await params;
  let note: Note | null = null;
  try {
    note = await getNote(noteId);
  } catch {}

  if (!note) {
    return redirect("/");
  }
  const renameAction = renameNote.bind(null, note);

  return (
    <div className="flex-1 flex relative">
      <div className="flex-1 p-4">
        <form action={renameAction}>
          <input
            name="title"
            className="text-4xl flex-1 w-10/12"
            defaultValue={note.title}
          />
        </form>
        <hr className="my-2" />
        <ClientEditor defaultValue={note} />
      </div>
      <ToggleSidebar>
        <HistorySidebar className="h-full p-2" note={note} />
      </ToggleSidebar>
    </div>
  );
}

export default PageEdit;
