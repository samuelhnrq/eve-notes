"use client";

import type { EditorProps } from "@/components/QuillEditor";
import { updateNoteText } from "@/lib/notesRepo";
import dynamic from "next/dynamic";

const EditorImport = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
  loading: () => <span>Loading Editor...</span>,
});

function NoteEditor(props: Omit<EditorProps, "onTextChange">) {
  const { _etag: originalEtag, _id } = props.defaultValue;
  let etag = originalEtag;

  async function updateWithEtag(newText: string) {
    const newNote = await updateNoteText({ _id, _etag: etag }, newText);
    etag = newNote._etag;
  }
  return <EditorImport {...props} onTextChange={updateWithEtag} />;
}

export default NoteEditor;
