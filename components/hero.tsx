import { ArrowDownRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FLOATING_NOTES = [
  {
    color: "bg-[#f4e7c1] text-[#3c3224]",
    rotate: "-rotate-6",
    shift: "md:-translate-y-4",
    tape: "left-10",
    text: "Call the printer. Warm stock, not glossy.",
  },
  {
    color: "bg-[#c8d6bc] text-[#2a3828]",
    rotate: "rotate-3",
    shift: "md:translate-y-8 md:-translate-x-4",
    tape: "right-8",
    text: "Keep the headline short enough to remember.",
  },
  {
    color: "bg-[#d7cae6] text-[#322640]",
    rotate: "-rotate-2",
    shift: "md:translate-y-2 md:translate-x-6",
    tape: "left-1/2",
    text: "If it still matters tomorrow, pin it tonight.",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden hero-mesh">
      <div className="grain absolute inset-0 opacity-[0.09] dark:opacity-[0.14]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div className="max-w-xl">
          <Badge
            variant="outline"
            className="mb-5 border-primary/30 bg-background/40 px-3 py-1 text-[0.7rem] tracking-[0.18em] uppercase"
          >
            <Sparkles className="size-3 text-primary" />
            Sample quality, not a mock
          </Badge>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Pin the thought.
            <br />
            <span className="italic text-brass">Keep the night.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Nova Notes is a quiet board for half-formed ideas — color them,
            shuffle them, and find them again tomorrow. This is a working demo,
            saved only on this device.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 rounded-full px-5 text-base"
              asChild
            >
              <a href="#board">
                Try the live board
                <ArrowDownRight />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-5 text-base bg-background/40"
              asChild
            >
              <a href="#how">See how it works</a>
            </Button>
          </div>
          <p className="mt-5 text-xs tracking-wide text-muted-foreground uppercase">
            No account · Local only · Built as a portfolio sample
          </p>
        </div>

        <div
          aria-hidden
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute inset-8 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid gap-4">
            {FLOATING_NOTES.map((note) => (
              <article
                key={note.text}
                className={`relative rounded-sm p-5 shadow-[0_18px_40px_-24px_rgba(20,12,8,0.55)] paper-lines ${note.color} ${note.rotate} ${note.shift} transition-transform duration-500 hover:rotate-0`}
              >
                <span
                  className={`tape absolute -top-2 h-4 w-16 ${note.tape} -translate-x-1/2 rotate-[-8deg]`}
                />
                <p className="font-serif text-lg leading-snug">{note.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
