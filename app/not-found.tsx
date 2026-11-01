import Link from "next/link";
import StoryScene from "@/components/scene/StoryScene";

export default function NotFound() {
  return (
    <>
      <StoryScene mode="static" story={1} />
      <div className="relative z-10 flex min-h-[80vh] items-center pb-20 pt-36">
        <div className="shell readable max-w-xl">
          <p className="eyebrow">404</p>
          <h1 className="h-chapter mt-6">This page drifted off.</h1>
          <p className="lede mt-6">The link may be out of date. Let’s get you back on track.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
