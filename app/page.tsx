import { FeatureHighlights } from "@/components/feature-highlights";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { NotesBoard } from "@/components/notes-board";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <a
        href="#board"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to notes board
      </a>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <NotesBoard />
        <FeatureHighlights />
        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  );
}
