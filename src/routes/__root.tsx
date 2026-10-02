import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";

import { ReactLenis, type LenisRef } from "lenis/react";
import appCss from "../styles.css?url";
import { themeInitScript } from "../components/KraftSite";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CustomCursor } from "../components/CustomCursor";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kraft Studios" },
      {
        name: "description",
        content: "Kraft Studios — engineered aesthetics for ambitious organisations.",
      },
      { name: "author", content: "Kraft Studios" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap",
      },
      { rel: "icon", href: `${import.meta.env.BASE_URL}favicon.png`, type: "image/png" },
    ],
    scripts: [{ children: themeInitScript }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const lenisRef = useRef<LenisRef>(null);

  // Use pathname as a unique key for the route transition
  const match = useRouterState({ select: (s) => s.matches[s.matches.length - 1] });
  const key = match?.pathname || "/";

  // Force framer-motion whileInView checks to run after page mount/navigation
  useEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }

    const t = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("resize"));
    }, 250); // right after the layout mount animation finishes
    const t2 = setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 600);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [key]);

  // Expose the Lenis instance so section links and the menu can drive it.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (lenisRef.current?.lenis) {
        (window as unknown as { lenis?: unknown }).lenis = lenisRef.current.lenis;
        window.clearInterval(id);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ lerp: 0.09, wheelMultiplier: 1, touchMultiplier: 1.6 }}
    >
      <QueryClientProvider client={queryClient}>
        <CustomCursor />
        <div key={key} className="page-enter transform-gpu will-change-transform min-h-screen">
          <Outlet />
        </div>
      </QueryClientProvider>
    </ReactLenis>
  );
}
