"use client";

import { Pin, RotateCcw, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  createNoteId,
  MAX_NOTES,
  NOTE_COLOR_STYLES,
  NOTE_COLORS,
  parseNotes,
  SEED_NOTES,
  STORAGE_KEY,
  tiltForId,
  type Note,
  type NoteColor,
} from "@/lib/notes";

export function NotesBoard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [draftColor, setDraftColor] = useState<NoteColor>("cream");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = parseNotes(window.localStorage.getItem(STORAGE_KEY));
      setNotes(stored ?? SEED_NOTES);
    } catch {
      setNotes(SEED_NOTES);
      setError("Could not read saved notes. Showing samples instead.");
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, ready]);

  const countLabel = useMemo(() => {
    if (!ready) return "Loading notes";
    if (notes.length === 0) return "Empty board";
    return `${notes.length} ${notes.length === 1 ? "note" : "notes"} · saved locally`;
  }, [notes.length, ready]);

  function addNote() {
    const text = draft.trim();
    if (!text) {
      setError("Write a thought before pinning it.");
      return;
    }
    if (notes.length >= MAX_NOTES) {
      setError(`This demo board holds ${MAX_NOTES} notes. Delete one to add another.`);
      return;
    }
    setError(null);
    setNotes((current) => [
      {
        id: createNoteId(),
        text,
        color: draftColor,
        createdAt: Date.now(),
      },
      ...current,
    ]);
    setDraft("");
  }

  function updateNote(id: string, patch: Partial<Pick<Note, "text" | "color">>) {
    setNotes((current) =>
      current.map((note) => (note.id === id ? { ...note, ...patch } : note)),
    );
  }

  function deleteNote(id: string) {
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  function restoreSamples() {
    setNotes(SEED_NOTES);
    setError(null);
  }

  return (
    <section id="board" className="scroll-mt-20 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium tracking-[0.2em] text-brass uppercase">
              Live mini-demo
            </p>
            <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
              A board you can actually use.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Add a note, change its paper color, edit the wording, or throw it
              away. Everything persists in this browser.
            </p>
          </div>
          <p className="font-mono text-xs text-muted-foreground">{countLabel}</p>
        </div>

        <form
          className="mt-10 rounded-2xl border border-border/80 bg-card/60 p-4 shadow-sm sm:p-5"
          onSubmit={(event) => {
            event.preventDefault();
            addNote();
          }}
        >
          <label htmlFor="note-draft" className="sr-only">
            New note
          </label>
          <Textarea
            id="note-draft"
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                event.preventDefault();
                addNote();
              }
            }}
            placeholder="A sentence you do not want to lose…"
            className="min-h-24 resize-none border-0 bg-transparent px-1 py-1 text-base shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <ColorSwatches
              value={draftColor}
              onChange={setDraftColor}
              name="New note color"
            />
            <div className="flex items-center gap-2">
              <p className="hidden text-xs text-muted-foreground sm:block">
                ⌘ / Ctrl + Enter
              </p>
              <Button type="submit" className="rounded-full">
                <Pin />
                Pin note
              </Button>
            </div>
          </div>
        </form>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {!ready ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-sm bg-muted"
              />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="font-serif text-2xl">The board is empty.</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Pin a thought above, or restore the sample notes to see the board
              in motion.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6 rounded-full"
              onClick={restoreSamples}
            >
              <RotateCcw />
              Restore sample notes
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => {
              const styles = NOTE_COLOR_STYLES[note.color];
              return (
                <li key={note.id}>
                  <article
                    className={`group relative rounded-sm p-4 shadow-[0_16px_36px_-22px_rgba(20,12,8,0.5)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 paper-lines ${styles.paper} ${styles.ink} ${tiltForId(note.id)}`}
                  >
                    <span className="tape absolute -top-2 left-1/2 h-3.5 w-14 -translate-x-1/2 rotate-[-6deg]" />
                    <div className="flex items-start justify-between gap-2">
                      <ColorSwatches
                        value={note.color}
                        onChange={(color) => updateNote(note.id, { color })}
                        name={`Color for note ${note.id}`}
                        compact
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            className="text-current/70 hover:bg-black/8 hover:text-current"
                            onClick={() => deleteNote(note.id)}
                            aria-label="Delete note"
                          >
                            <Trash2 />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete note</TooltipContent>
                      </Tooltip>
                    </div>
                    <label className="sr-only" htmlFor={`note-${note.id}`}>
                      Edit note
                    </label>
                    <textarea
                      id={`note-${note.id}`}
                      value={note.text}
                      onChange={(event) =>
                        updateNote(note.id, { text: event.target.value })
                      }
                      className="mt-3 min-h-28 w-full resize-none bg-transparent font-serif text-lg leading-relaxed outline-none"
                    />
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

function ColorSwatches({
  value,
  onChange,
  name,
  compact = false,
}: {
  value: NoteColor;
  onChange: (color: NoteColor) => void;
  name: string;
  compact?: boolean;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}
    >
      {NOTE_COLORS.map((color) => {
        const selected = value === color;
        return (
          <button
            key={color}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={NOTE_COLOR_STYLES[color].label}
            onClick={() => onChange(color)}
            className={`size-5 rounded-full ring-offset-2 transition-transform ${NOTE_COLOR_STYLES[color].swatch} ${
              selected
                ? "scale-110 ring-2 ring-foreground/70"
                : "hover:scale-110 ring-1 ring-black/15"
            }`}
          />
        );
      })}
    </div>
  );
}
