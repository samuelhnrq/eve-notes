import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { getAllNotes } from "@/lib/notesRepo";
import { auth } from "@/auth";
import { jest, describe, it, expect, mock } from "bun:test";
import { useParams } from "next/navigation";
import { beforeEach } from "bun:test";

mock.module("next/navigation", () => ({
  useParams: mock(),
}));
mock.module("@/lib/notesRepo", () => ({
  getAllNotes: mock(),
}));
mock.module("@/auth", () => ({
  auth: mock(),
}));

beforeEach(() => {
  (auth as jest.Mock).mockResolvedValue({
    user: { name: "Test User" },
  });
  (useParams as jest.Mock).mockReturnValue({ note: "123" });
});

describe("Sidebar", () => {
  it("renders empty state", async () => {
    (getAllNotes as jest.Mock).mockResolvedValue([]);
    render(await Sidebar({}));
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("No notes found.")).toBeInTheDocument();
  });

  it("renders notes when available", async () => {
    const mockNotes = [
      { _id: "1", title: "Note 1", text: "Text 1", _etag: "1" },
      { _id: "2", title: "Note 2", text: "Text 2", _etag: "2" },
    ];
    (getAllNotes as jest.Mock).mockResolvedValue(mockNotes);
    render(await Sidebar({}));
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (getAllNotes as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));
    (auth as jest.Mock).mockResolvedValue({ user: { name: "Test User" } });
    render(await Sidebar({}));
    expect(screen.getByText("Error loading notes")).toBeInTheDocument();
  });
});
