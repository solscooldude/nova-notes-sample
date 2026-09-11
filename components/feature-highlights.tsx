import { LampDesk, Palette, ShieldCheck } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FEATURES = [
  {
    icon: LampDesk,
    title: "Capture without ceremony",
    body: "A blank note is one click away. No folders, no tags, no onboarding — just a place to land the sentence before it leaves.",
  },
  {
    icon: Palette,
    title: "Color as context",
    body: "Five paper tones so you can sort by mood, project, or urgency at a glance. The color is the filing system.",
  },
  {
    icon: ShieldCheck,
    title: "Yours, on this device",
    body: "Notes persist in local storage. No account, no cloud sync, no surprise login wall. Refresh and they are still here.",
  },
];

export function FeatureHighlights() {
  return (
    <section id="features" className="scroll-mt-20 border-t border-border/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-medium tracking-[0.2em] text-brass uppercase">
            Why it feels different
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-tight text-balance sm:text-5xl">
            Built like a desk, not a dashboard.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Most note apps optimize for volume. Nova Notes optimizes for the
            few thoughts you actually want to see again.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="bg-card/70 transition-transform duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <span className="mb-3 grid size-10 place-items-center rounded-lg bg-primary/12 text-primary">
                  <feature.icon className="size-5" />
                </span>
                <CardTitle className="font-serif text-2xl font-normal">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-[0.95rem] leading-relaxed">
                  {feature.body}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
