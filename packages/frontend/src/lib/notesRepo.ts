"use server";

import { client } from "@/lib/apiClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface Note {
  title: string;
  body: string;
  _id: string;
  _etag?: string;
  _created: string;
  _updated: string;
}

interface ListApiResponse {
  _items: Note[];
}

export async function renameNote(note: Note, form: FormData) {
  const newTitle = form.get("title");
  if (typeof newTitle !== "string") {
    throw new Error("Invalid form data");
  }
  await client.patch(`notes/${note._id}`, {
    json: { title: newTitle },
    headers: { "If-Match": note._etag },
  });
  revalidatePath(`notes/${note._id}`);
}

export async function getNoteHistory(note: Note): Promise<Note[]> {
  const data = await client
    .get(`notes/${note._id}`, {
      searchParams: {
        version: "all",
        sort: "-_updated",
      },
    })
    .json<ListApiResponse>();
  return data._items;
}

export async function restoreNote(currentVersion: Note, restoreTo: Note) {
  if (currentVersion._id !== restoreTo._id) {
    throw new Error("Cannot restore to a different note");
  }
  await client.patch(`notes/${currentVersion._id}`, {
    json: { title: restoreTo.title, body: restoreTo.body },
    headers: { "If-Match": currentVersion._etag },
  });
  revalidatePath(`notes/${currentVersion._id}`);
}

export async function createEmptyNote() {
  const newNote = await client
    .post("notes", {
      json: { title: "New Note", body: "[]" },
    })
    .json<Note>();
  redirect(`/notes/${newNote._id}`);
}

export async function getNote(id: string): Promise<Note> {
  const data = await client.get(`notes/${id}`).json<Note>();
  return data;
}

export async function deleteNote(note: Note) {
  await client.delete(`notes/${note._id}`, {
    headers: { "If-Match": note._etag },
  });
  revalidatePath(`notes/${note._id}`);
}

export async function updateNoteText(
  oldNote: Pick<Note, "_id" | "_etag">,
  newBody: string
): Promise<Note> {
  const data = await client
    .patch(`notes/${oldNote._id}`, {
      json: { body: newBody },
      headers: { "If-Match": oldNote._etag },
    })
    .json<Note>();
  revalidatePath(`notes/${oldNote._id}`);
  return data;
}

export async function getAllNotes(): Promise<Note[]> {
  const data = await client.get("notes").json<ListApiResponse>();
  return data._items;
}
