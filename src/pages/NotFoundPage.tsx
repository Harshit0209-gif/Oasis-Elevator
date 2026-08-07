import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="flex min-h-[70svh] flex-col items-center justify-center gap-6 bg-bg-primary py-24 text-center">
        <span className="font-heading text-sm font-medium tracking-[0.3em] text-brand-blue uppercase">
          404
        </span>
        <h1 className="font-heading text-3xl font-medium md:text-4xl">
          This floor doesn&apos;t exist.
        </h1>
        <p className="max-w-md text-graphite">
          The page you're looking for may have moved. Let's get you back on track.
        </p>
        <Button size="xl" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </section>
    </>
  );
}
