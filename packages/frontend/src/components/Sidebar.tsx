import AddIcon from "@/icons/AddIcon";
import { createEmptyNote, getAllNotes, type Note } from "@/lib/notesRepo";
import { twMerge } from "tailwind-merge";
import SidebarNote from "./SidebarNote";
import { HTTPError } from "ky";

type SidebarProps = {
  className?: string;
};

export default async function Sidebar({ className }: SidebarProps) {
  let notes: Note[] = [];
  let error: string | null = null;
  let errorCode: number = 0;

  try {
    notes = await getAllNotes();
  } catch (e) {
    error = "Error loading notes";
    console.log(e);
    if (e instanceof HTTPError) {
      errorCode = e.response.status;
    }
  }

  return (
    <div className={twMerge(className, "w-64 bg-side-bg p-4 h-full")}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notes</h2>
        {!error && <AddIcon onClick={createEmptyNote} />}
      </div>
      {error &&
        (errorCode == 401 ? (
          <div>Please login</div>
        ) : (
          <div className="text-red-500">{error}</div>
        ))}
      <ul>
        {notes.map((note) => (
          <SidebarNote key={note._id} note={note} />
        ))}
      </ul>
      {!error && notes.length === 0 && (
        <p className="italic text-gray-500">No notes found.</p>
      )}
    </div>
  );
}
