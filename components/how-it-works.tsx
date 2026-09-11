const STEPS = [
  {
    n: "01",
    title: "Write",
    body: "Drop a sentence into the composer. One thought, not a document.",
  },
  {
    n: "02",
    title: "Color",
    body: "Give it a paper tone so it stands apart from the rest of the board.",
  },
  {
    n: "03",
    title: "Return",
    body: "Come back later. The board remembers — this browser, this device.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.2em] text-brass uppercase">
            Three quiet steps
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            How it works
          </h2>
        </div>
        <ol className="relative mt-12 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute top-[2.15rem] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          {STEPS.map((step) => (
            <li key={step.n} className="relative">
              <span className="relative z-10 mb-5 inline-flex size-11 items-center justify-center rounded-full border border-border bg-background font-mono text-xs text-brass">
                {step.n}
              </span>
              <h3 className="font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
