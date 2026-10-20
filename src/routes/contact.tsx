import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Eyebrow,
  PageFrame,
  PageIntro,
  Reveal,
  Magnetic,
  CornerMarks,
} from "../components/KraftSite";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Kraft Studios" },
      {
        name: "description",
        content:
          "Start a brand, web, software or operational infrastructure project with Kraft Studios.",
      },
      { property: "og:title", content: "Contact — Kraft Studios" },
      { property: "og:description", content: "Bring Kraft Studios a difficult brief." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kraftstudios.site/contact" },
      { property: "og:image", content: "https://kraftstudios.site/og-image.png" },
      { property: "og:image:secure_url", content: "https://kraftstudios.site/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Contact Kraft Studios" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Kraft Studios" },
      { property: "twitter:description", content: "Bring Kraft Studios a difficult brief." },
      { name: "twitter:image", content: "https://kraftstudios.site/og-image.png" },
    ],
  }),
  component: ContactPage,
});
function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setSending(true);
    setSendError(false);
    try {
      const response = await fetch("https://formsubmit.co/ajax/admin@kraftstudios.site", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean | string };
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error("Brief submission failed");
      }
      setSent(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };
  return (
    <PageFrame>
      <main>
        <PageIntro
          number="05"
          label="Contact"
          title="Bring us the difficult brief"
          copy="Tell us what needs to be built, changed or connected. We will look at the visual, technical and operational problem together."
        />
        <section className="border-t border-ink/10">
          <div className="site-shell grid grid-cols-12 gap-10 py-20 lg:py-28">
            <Reveal className="col-span-12 lg:col-span-4">
              <Eyebrow>Direct</Eyebrow>
              <a
                href="mailto:mangalam@kraftstudios.site"
                className="contact-direct mt-5"
                data-cursor-text="EMAIL"
              >
                mangalam@kraftstudios.site <ArrowUpRight size={18} />
              </a>
              <p className="mt-8 max-w-[30ch] text-sm leading-relaxed text-ink/60">
                Based in India. Collaborating with ambitious teams across time zones.
              </p>
            </Reveal>
            <Reveal
              delay={100}
              className="relative col-span-12 rounded-lg border border-line bg-surface/30 p-6 md:p-10 lg:col-span-7 lg:col-start-6"
            >
              <CornerMarks
                size={16}
                stroke={1.5}
                className="pointer-events-none absolute inset-2 text-reg/35"
              />
              {sent ? (
                <div className="pt-4">
                  <Eyebrow>Brief received</Eyebrow>
                  <h2 className="mt-5 font-display text-3xl md:text-4xl font-semibold">
                    Thank you. We’ll be in touch.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    Our team reviews incoming problem briefs within one working day.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={submit}>
                  <label htmlFor="contact-name">
                    Name
                    <input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label htmlFor="contact-email">
                    Email
                    <input
                      id="contact-email"
                      name="email"
                      required
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </label>
                  <label htmlFor="contact-brief">
                    What are we building?
                    <textarea
                      id="contact-brief"
                      name="brief"
                      required
                      rows={5}
                      placeholder="A concise project brief (brand identity, custom platform, operational system...)"
                    />
                  </label>
                  {sendError ? (
                    <p className="text-sm text-reg pt-3" role="alert">
                      Your brief couldn’t be sent. Please try again or email us directly at
                      mangalam@kraftstudios.site.
                    </p>
                  ) : null}
                  <div className="pt-4">
                    <Magnetic>
                      <button
                        type="submit"
                        disabled={sending}
                        aria-busy={sending}
                        data-cursor-text="SUBMIT"
                        className="cursor-pointer"
                      >
                        {sending ? "Sending brief…" : "Send project brief"}
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </button>
                    </Magnetic>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}
