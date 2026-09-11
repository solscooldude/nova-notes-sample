export const NOTE_COLORS = ["cream", "blush", "sage", "sky", "lilac"] as const;

export type NoteColor = (typeof NOTE_COLORS)[number];

export type Note = {
  id: string;
  text: string;
  color: NoteColor;
  createdAt: number;
};

export const STORAGE_KEY = "nova-notes.board.v1";
export const MAX_NOTES = 18;

export const NOTE_COLOR_STYLES: Record<
  NoteColor,
  { label: string; swatch: string; paper: string; ink: string }
> = {
  cream: {
    label: "Cream",
    swatch: "bg-[#f3e4b8]",
    paper: "bg-[#f4e7c1]",
    ink: "text-[#3c3224]",
  },
  blush: {
    label: "Blush",
    swatch: "bg-[#efc4b8]",
    paper: "bg-[#f0c8bc]",
    ink: "text-[#4a2d28]",
  },
  sage: {
    label: "Sage",
    swatch: "bg-[#c5d4b8]",
    paper: "bg-[#c8d6bc]",
    ink: "text-[#2a3828]",
  },
  sky: {
    label: "Sky",
    swatch: "bg-[#bdd4e6]",
    paper: "bg-[#c3d7e6]",
    ink: "text-[#243544]",
  },
  lilac: {
    label: "Lilac",
    swatch: "bg-[#d4c6e4]",
    paper: "bg-[#d7cae6]",
    ink: "text-[#322640]",
  },
};

export const SEED_NOTES: Note[] = [
  {
    id: "seed-1",
    text: "Tuesday — try the brass lamp over the desk. Less glare, better sentences.",
    color: "cream",
    createdAt: 1,
  },
  {
    id: "seed-2",
    text: "This board lives in your browser. Refresh the page — the notes stay.",
    color: "blush",
    createdAt: 2,
  },
  {
    id: "seed-3",
    text: "Ship the small thing. The polished thing can wait until Friday.",
    color: "sage",
    createdAt: 3,
  },
  {
    id: "seed-4",
    text: "A note is a promise to your future self. Keep it short enough to keep.",
    color: "sky",
    createdAt: 4,
  },
];

export function createNoteId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function parseNotes(raw: string | null): Note[] | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    const notes = parsed.filter((item): item is Note => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof (item as Note).id === "string" &&
        typeof (item as Note).text === "string" &&
        NOTE_COLORS.includes((item as Note).color) &&
        typeof (item as Note).createdAt === "number"
      );
    });
    return notes;
  } catch {
    return null;
  }
}

export function tiltForId(id: string) {
  const tilts = ["-rotate-2", "-rotate-1", "rotate-0", "rotate-1", "rotate-2"];
  let hash = 0;
  for (const char of id) hash = (hash + char.charCodeAt(0)) % tilts.length;
  return tilts[hash];
}
