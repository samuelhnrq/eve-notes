import AddIcon from "@/icons/AddIcon";
import { createEmptyNote } from "@/lib/notesRepo";

export function CreateButton() {
  return (
    <form action={createEmptyNote}>
      <button type="submit">
        <AddIcon />
      </button>
    </form>
  );
}
