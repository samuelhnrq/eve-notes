"use client";

import type { Note } from "@/lib/notesRepo";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useLayoutEffect, useRef } from "react";

export interface EditorProps {
  defaultValue: Note;
  onTextChange: (newVal: string) => void;
}

// Editor is an uncontrolled React component
const Editor = ({ defaultValue, onTextChange }: EditorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const onTextChangeRef = useRef(onTextChange);
  const quillRef = useRef<Quill | null>(null);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
    });
    quillRef.current = quill;
    let timeoutId: Timer | null = null;

    quill.on(Quill.events.TEXT_CHANGE, (_old, _newval, src) => {
      if (src !== "user") {
        return;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        onTextChangeRef.current?.(JSON.stringify(quill.getContents()));
      }, 1000);
    });

    return () => {
      quillRef.current = null;
      container.innerHTML = "";
    };
  }, [quillRef]);

  useEffect(() => {
    if (!quillRef.current) {
      return;
    }
    quillRef.current.setContents(JSON.parse(defaultValue.body), "api");
  }, [defaultValue]);

  return <div ref={containerRef} />;
};

export default Editor;
