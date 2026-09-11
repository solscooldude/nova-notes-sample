export function Wordmark({ className }: { className?: string }) {
  return (
    <a href="#top" className={className} aria-label="Nova Notes home">
      <span className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="relative grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_8px_20px_-10px] shadow-primary"
        >
          <span className="font-serif text-lg leading-none">N</span>
          <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-[2px] bg-background/80 rotate-12" />
        </span>
        <span className="font-serif text-xl tracking-tight">
          Nova <span className="italic text-brass">Notes</span>
        </span>
      </span>
    </a>
  );
}
