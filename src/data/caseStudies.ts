/**
 * One source of truth for the case studies.
 *
 * `/work` renders the index from this list and `/work/$slug` renders the full
 * showcase, so a project is described once and cannot drift between the two.
 *
 * Everything here is drawn from the projects themselves — package manifests,
 * schemas, route trees and the shipped product documentation — not written to
 * sound impressive. If a figure is not in the product, it is not on the page.
 */

import type { ReactNode } from "react";

import umvadlaAbout from "../assets/showcase/umvadla-02-about.jpg";
import umvadlaHome from "../assets/showcase/umvadla-01-home.jpg";
import shardaImage from "../assets/showcase-sharda.jpg";
import eduflowDashboard from "../assets/showcase/eduflow-01-dashboard.jpg";
import eduflowPipeline from "../assets/showcase/eduflow-02-pipeline.jpg";
import brushStore from "../assets/showcase/brush-01-store.jpg";
import brushCatalogue from "../assets/showcase/brush-06-catalogue.jpg";
import brushCart from "../assets/showcase/brush-09-cart.jpg";
import toolsSuite from "../assets/showcase/case-tools-01-cover-tight.jpg";
import toolsFontPanel from "../assets/showcase/case-tools-02-font-panel.jpg";
import toolsFontExcel from "../assets/showcase/case-tools-03-font-excel.jpg";
import toolsPalettePanel from "../assets/showcase/case-tools-04-palette-panel.jpg";
import toolsSamplerPanel from "../assets/showcase/case-tools-07-sampler-panel.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";
import nbHomeV2 from "../assets/showcase/noticeboard-home_v2.jpg";
import nbCalendar from "../assets/showcase/noticeboard-calendar.jpg";
import nbSingle from "../assets/showcase/noticeboard-single.jpg";
import nbAdminRuns from "../assets/showcase/noticeboard-admin-runs.png";
import nbAdminSources from "../assets/showcase/noticeboard-admin-sources.png";

export type Shot = { src: string; caption: string };

/** One box in the architecture diagram. */
export type Layer = {
  /** Short layer name — Client, API, Data, Jobs, Documents. */
  name: string;
  /** What actually runs there. */
  stack: string;
  /** What it is responsible for, in a sentence. */
  role: string;
};

export type CaseStudy = {
  slug: string;
  n: string;
  title: string;
  client: string;
  year: string;
  /** One line, used on the index card and as the page's standfirst. */
  summary: string;
  /** Where it runs, when that is public. */
  live?: { label: string; href: string };
  /** The hero and the gallery further down. */
  cover: string;
  coverAlt: string;
  /** Product shots sit on their own ground rather than being cropped. */
  coverFit?: "cover" | "contain";
  coverBg?: string;
  shots: Shot[];
  /** Disciplines, as they would appear on a scope of work. */
  services: string[];
  /** The situation before the work. Two or three sentences, no hype. */
  problem: string;
  /** How it was approached — the decision that shaped everything else. */
  approach: string;
  /** The architecture, layer by layer. */
  architecture: Layer[];
  /** Named capabilities that shipped. */
  capabilities: { title: string; body: string }[];
  /** What changed, stated only where the product can evidence it. */
  outcomes: { figure: string; label: string }[];
  /** Named technologies, for the stack strip. */
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "umvadla",
    n: "01",
    title: "Zero-friction content management",
    client: "UMV Adla",
    year: "2025",
    summary:
      "A school website whose every image, notice and staff profile is editable by the people who run the school, with no developer in the loop.",
    cover: umvadlaAbout,
    coverAlt: "UMV Adla school website — about page with community photography",
    shots: [
      { src: umvadlaHome, caption: "umvadla.in — the live landing page" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Notice+Board+Manager", caption: "Admin Dashboard — Notice Board Management Tool" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Staff+Directory", caption: "Admin Dashboard — Staff Directory & Media Manager" },
    ],
    services: ["Digital identity", "Website", "Bespoke CMS", "Media infrastructure"],
    problem:
      "School sites rot because updating them requires someone technical. A new notice, a new teacher, a new photograph from last week's function — each one becomes a request that waits. The site stops reflecting the school within a term, and everybody stops trusting it.",
    approach:
      "Nothing on the page is hard-coded, including the pictures. Hero backgrounds, section imagery, the staff gallery and the notice board are all records the office edits, so the only way for the site to go stale is for nobody at the school to use it.",
    architecture: [
      {
        name: "Client",
        stack: "React 19, TypeScript, Vite, React Router, Tailwind, Radix, TanStack Query",
        role: "The public site and the admin dashboard in one application, with queries cached so an editor sees their change immediately.",
      },
      {
        name: "API",
        stack: "Node.js, Express, JWT auth, Multer, Zod",
        role: "CRUD for staff, gallery, notices and system images, with uploads streamed rather than buffered and every payload validated at the boundary.",
      },
      {
        name: "Data",
        stack: "MongoDB Atlas via Mongoose",
        role: "Collections for content, media references and accounts. Managed and replicated, so there is no database for the school to look after.",
      },
      {
        name: "Media",
        stack: "Google Drive, OAuth 2.0, streaming binary upload",
        role: "Images live in the school's own Drive rather than a bucket nobody can reach, and are streamed back as true binaries instead of Drive's HTML wrapper.",
      },
      {
        name: "Notifications",
        stack: "Nodemailer, Twilio",
        role: "Email and SMS from the same backend, so a published notice can also reach parents.",
      },
    ],
    capabilities: [
      {
        title: "Placeholder-free by design",
        body: "Every image on the site — hero, about, staff, gallery — resolves from the database. There is no asset in the build that an editor cannot replace.",
      },
      {
        title: "The school owns its media",
        body: "Files upload straight into the school's Google Drive over OAuth. If the site were switched off tomorrow, the photographs would still be where the school keeps everything else.",
      },
      {
        title: "One dashboard, four content types",
        body: "Staff profiles, gallery, notices and system images are managed from the same admin with the same mental model, so training somebody takes minutes.",
      },
    ],
    outcomes: [
      { figure: "0", label: "Developer involvement to publish" },
      { figure: "4", label: "Content types under school control" },
      { figure: "100%", label: "Imagery driven from the database" },
    ],
    stack: ["React 19", "TypeScript", "Vite", "Express", "MongoDB Atlas", "Google Drive API", "Twilio", "Tailwind"],
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "sharda-palace",
    n: "02",
    title: "The front desk as one operating system",
    client: "Sharda Palace · Deoghar",
    year: "2025",
    summary:
      "Bookings, guests, rooms, billing and money on one live database, where taking a reservation updates availability, the guest record, the ledger and the P&L in a single action.",
    live: { label: "hotel-booking-crm-community.vercel.app", href: "https://hotel-booking-crm-community.vercel.app" },
    cover: shardaImage,
    coverAlt: "Sharda Palace identity system — folders, cards and stationery",
    shots: [
      { src: shardaImage, caption: "Sharda Palace — identity and collateral system" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Command+Menu+Interface", caption: "The ⌘K global command menu — instant navigation across 13 modules" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Booking+Calendar", caption: "Room availability chart and booking engine" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Guest+Profile", caption: "Lifetime guest value and communication history" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Invoice+Generation", caption: "One-click GST invoice and checkout screen" }
    ],
    services: ["Brand identity", "Collateral system", "Property CRM", "Billing & GST", "Guest messaging"],
    problem:
      "The desk ran on a paper register, a spreadsheet and a calculator. The same booking was written down three times, the room chart and the accounts book disagreed by the end of most weeks, and no one could answer who had changed a rate or waived a balance.",
    approach:
      "One database behind every screen, and an audit entry behind every action. A booking is not a row in a sheet — it is an event that moves availability, the guest's lifetime value, the receipt ledger and the property's income statement at once, with the staff member's name on it.",
    architecture: [
      {
        name: "Client",
        stack: "React 18, Vite, TypeScript, Tailwind CSS, Date-fns",
        role: "A single-page React frontend mapped out as a dense data-entry system. Relies on complex state management to hold reservation matrices.",
      },
      {
        name: "Component System",
        stack: "Radix UI Primitives, Lucide-React, Embla, Recharts",
        role: "Headless accessible components layered with custom design tokens for a specialized desktop hotel booking dashboard.",
      },
      {
        name: "Deployment",
        stack: "GitHub Pages / Local Build",
        role: "Distributed statically while communicating out to standalone MongoDB Atlas endpoints for billing and reservations.",
      },
      {
        name: "Messaging",
        stack: "WhatsApp, SMS, Email",
        role: "Templates for the messages a hotel repeats, bulk sends addressed to a guest segment, and a delivery history per channel.",
      },
    ],
    capabilities: [
      {
        title: "Money closes daily",
        body: "Every receipt carries a number, a mode and a booking. Checkout produces a GST invoice and files the PDF to the archive in the same step.",
      },
      {
        title: "Accountable by default",
        body: "Every create, edit and status change is stamped with the staff member and the time. Activity Logs answers who changed what, without anyone having to remember.",
      },
      {
        title: "Nothing runs in the hotel",
        body: "No server on the premises, no local backup to remember, no single computer whose failure stops the desk. Staff sign in from any device.",
      },
    ],
    outcomes: [
      { figure: "13", label: "Modules, front desk to balance sheet" },
      { figure: "1", label: "Database behind every screen" },
      { figure: "3", label: "Tools replaced at the counter" },
    ],
    stack: ["React 18", "Vite", "Tailwind CSS", "MongoDB Atlas", "Radix UI", "Recharts", "Embla Carousel"],
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "eduflow",
    n: "03",
    title: "The admissions journey as the system of record",
    client: "EduFlow · Kraft Studios in-house product",
    year: "2026",
    summary:
      "An admissions OS where enquiry, counselling, follow-up and fee collection sit on one record, so a prospective student never goes cold between the form and the receipt.",
    cover: eduflowDashboard,
    coverAlt: "EduFlow admissions dashboard — live counters, funnel and enrolment trend",
    shots: [
      { src: eduflowDashboard, caption: "Dashboard — the day's pulse, funnel position and enrolment trend" },
      { src: eduflowPipeline, caption: "Pipeline — every prospective student by journey stage" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Lead+360+Record", caption: "Lead 360° Record — journey control, notes, and task history" },
      { src: "https://placehold.co/1600x900/E9E6DE/A19C91?text=Task+Scheduling", caption: "Automated follow-ups and milestone scheduling" }
    ],
    services: ["Product design", "Interface system", "Platform engineering"],
    problem:
      "An enquiry arrives on a website form, is answered on WhatsApp, discussed on a call nobody logged, and quoted a fee in a spreadsheet one counsellor keeps locally. By the time anyone asks why the student went quiet, the record of what was promised has scattered across four tools and three people.",
    approach:
      "Treat the journey as the system of record rather than the outcome it reports on. Every prospective student sits at exactly one of eight stages, and moving them is a deliberate act that timestamps itself — so the pipeline is a description of reality instead of an optimistic guess.",
    architecture: [
      {
        name: "Client",
        stack: "React single-page application",
        role: "Dashboard, leads, pipeline, the 360° record, follow-ups and tasks, with the eight-stage board driven by drag and drop.",
      },
      {
        name: "API",
        stack: "Python, FastAPI",
        role: "Lead capture, stage transitions, follow-up scheduling and task assignment, each write recorded against its author.",
      },
      {
        name: "Data",
        stack: "MongoDB Atlas",
        role: "Leads, stage history, counsellor assignment, interactions, follow-ups, tasks and the commercial position per student.",
      },
      {
        name: "Record",
        stack: "Lead 360° view",
        role: "Timeline, internal notes, the journey control and the paid/pending snapshot on one screen, so a handover survives a colleague being away.",
      },
    ],
    capabilities: [
      {
        title: "A card is a whole conversation",
        body: "Programme of interest, intent band, indicative fee value and acquisition source sit on the face of the card, so triage happens without opening anything.",
      },
      {
        title: "Commitments, not reminders",
        body: "Each follow-up is a promise made to a specific student on a specific channel, assigned to a named counsellor with a time on it.",
      },
      {
        title: "Built to extend",
        body: "The surrounding modules — students, communications, payments, courses, campaigns, analytics — are mapped and navigable in the product, so the team can see where the system is going.",
      },
    ],
    outcomes: [
      { figure: "8", label: "Journey stages, one spine" },
      { figure: "6", label: "Modules live in phase one" },
      { figure: "1", label: "Record per student" },
    ],
    stack: ["React", "FastAPI", "Python", "MongoDB Atlas", "Tailwind"],
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "brush",
    n: "04",
    title: "Commerce with fulfilment built in",
    client: "Brush",
    year: "2026",
    summary:
      "A print storefront where catalogue, checkout, payments, inventory and order operations run on one spine instead of four disconnected tools.",
    cover: brushStore,
    coverAlt: "Brush storefront — custom wall art commerce",
    shots: [
      { src: brushStore, caption: "Storefront — the wall-art configurator entry point" },
      { src: brushCatalogue, caption: "Catalogue — filtering across collections" },
      { src: brushCart, caption: "Cart — framing and size options carried through to checkout" },
    ],
    services: ["Storefront", "Catalogue & pricing", "Checkout & payments", "Fulfilment operations", "Transactional email"],
    problem:
      "A print business has to agree on a price in three places — the product page, the cart and the invoice — and on a status in three more: the customer's email, the admin queue and the courier. When those live in separate tools they disagree, and every disagreement is a refund conversation.",
    approach:
      "One pricing engine, shared by the browser and the server, so a figure can never differ between the two. One order record that the storefront, the admin and the invoice all read. And a payment path that survives a restart mid-transaction, because a customer who has paid must never be left without an order.",
    architecture: [
      {
        name: "Client",
        stack: "Vanilla JS / HTML / CSS",
        role: "Lightweight, highly optimized DOM nodes fetching standard product endpoints with dynamic cart injection."
      },
      {
        name: "API & Backend",
        stack: "Node.js, Express, Firebase Admin, PDFKit",
        role: "Consolidated microservices dealing with invoices (PDFKit), authentication (Firebase), and redundant checkout sessions."
      },
      {
        name: "Data & Payments",
        stack: "MongoDB Atlas, Cashfree, Razorpay",
        role: "High-throughput redundant payment gateways mapped directly to catalog orders against NoSQL product models."
      }
    ],
    capabilities: [
      {
        title: "Checkout without blind spots",
        body: "Payments reconcile against the order model natively. If a webhook drops or a session redirects poorly, the state remains integral and actionable.",
      },
      {
        title: "Inventory that actually updates",
        body: "Products decrement only when payment is secured, returning to the shelf on expiry rather than locking up during high-demand drops.",
      },
      {
        title: "Automated fulfilment bridging",
        body: "Orders generate their PDF invoices and waybills automatically, converting digital carts into hard-copy dispatch documents immediately.",
      },
    ],
    outcomes: [
      { figure: "1", label: "Pricing engine, two runtimes" },
      { figure: "16", label: "Cart shapes under parity test" },
      { figure: "3", label: "Redundant payment gateways" },
      { figure: "4", label: "Custom APIs for product serving" },
    ],
    stack: ["Node.js", "Express", "MongoDB Atlas", "Firebase Auth", "Cashfree", "Razorpay", "PDFKit", "Vanilla JS"],
  },

  /* ---------------------------------------------------------------- 05 */
  {
    slug: "kraft-tools",
    n: "05",
    title: "Data solutions for designers",
    client: "Kraft Studios · In-house tools",
    year: "2026",
    summary:
      "Browser extension suites and Python pipelines that turn any live website or PDF into tabular design data — rendered typefaces to Excel, palettes mapped dynamically.",
    cover: toolsSuite,
    coverAlt: "Kraft Studios browser tools — Font Scraper, Palette Extractor and Image Sampler side panels",
    coverFit: "contain",
    coverBg: "#E9E6DE",
    shots: [
      { src: toolsFontPanel, caption: "Font Scraper — live specimens and the exact workbook preview" },
      { src: toolsFontExcel, caption: "Font Scraper — Excel export with specimens, colours and CSS stacks" },
      { src: toolsPalettePanel, caption: "Palette Extractor — every painted colour, weighted by area" },
      { src: toolsSamplerPanel, caption: "Image Sampler — palette, swatch roles and the type around the image" },
    ],
    services: ["Product design", "Chrome extensions", "Python scripting", "Export engineering"],
    problem:
      "Auditing a site's design means reading it by hand. A designer opens dev tools, writes down a typeface, eyedroppers a colour, guesses at how much of the page it covers, and repeats that until the brief is due — and the result is a list nobody can check.",
    approach:
      "Write tools that read the DOM like a document. If a color is painted on a webpage, a script can measure exactly how many pixels it covers. If a typeface loads, a scraper can lift its source and specimen straight to a spreadsheet.",
    architecture: [
      {
        name: "Browser Extensions",
        stack: "Chrome Extension API, Manifest V3",
        role: "Renderless workers injected into the active tab to extract, eyedrop, and compute typographic boundaries and color frequencies directly off the DOM."
      },
      {
        name: "Offline Pipelines",
        stack: "Python 3, PDF parsing",
        role: "Local native scripts bound to file systems processing PDF payloads, scraping vector imagery and stripping color codes away from large corp bundles."
      },
      {
        name: "Export",
        stack: "CSV / Excel Generators",
        role: "Flattens complex relational design trees mapped by the content script into formatted spreadsheets for design auditing."
      }
    ],
    capabilities: [
      {
        title: "Eyedropping at scale",
        body: "The palette extractor measures true painted area rather than just counting CSS rules, identifying which grays are foundational and which are outliers.",
      },
      {
        title: "Exact typeface telemetry",
        body: "Font scrapers serialize the precise CSS stack, computed weight, and real render string—dumping the whole spec directly to structured columns.",
      },
      {
        title: "Visual payload parsing",
        body: "Takes raw documents and outputs structured data faster than an agency auditor ever could, leaving the human to decide what looks good, not what color it is.",
      },
    ],
    outcomes: [
      { figure: "3", label: "Data-gathering extensions built" },
      { figure: "100%", label: "Manual CSS inspection eliminated" },
      { figure: "2s", label: "Time to scrape full page typography to spreadsheet" },
    ],
    stack: ["Chrome Extension API", "Manifest V3", "Vanilla JS", "Python 3", "HTML Canvas"],
  },

  /* ---------------------------------------------------------------- 06 */
  {
    slug: "notice-board",
    n: "06",
    title: "Truth through a human-in-the-loop pipeline",
    client: "The Notice Board",
    year: "2026",
    summary:
      "A pipeline that discovers, parses and verifies government exam and recruitment notices, then holds every one behind a human review queue before it is published.",
    cover: nbHomeV2,
    coverAlt: "The Notice Board — discovery and verification pipeline",
    shots: [
      { src: nbHomeV2, caption: "The student-facing feed of verified government notifications" },
      { src: nbSingle, caption: "Notice Payload — extracted qualification, timeline and recruitment metrics" },
      { src: nbAdminSources, caption: "Source Configuration — declaring headless browser selectors and scrape intervals directly through the UI" },
      { src: nbAdminRuns, caption: "Scrape Runs — real-time telemetry and error bounds surfacing scraping anomalies" }
    ],
    services: ["Platform engineering", "Data pipeline", "AI agents", "Editorial design"],
    problem:
      "Exam and recruitment notices are scattered across hundreds of government portals, published as PDFs, and withdrawn or amended without notice. A student either checks every source themselves or trusts an aggregator that cannot say where anything came from.",
    approach:
      "Scale the discovery and leave the judgement with a person. Agents search, fetch and parse continuously; everything they produce lands in a review queue, and nothing reaches a student until an administrator has approved it. Source tiers decide how much weight a find is given before it ever gets there.",
    architecture: [
      {
        name: "Client",
        stack: "Next.js 15 App Router, React 19, TypeScript, Tailwind, Lenis",
        role: "The reading surface — notices, calendar, eligibility and profiles — plus the admin review, sources and runs screens."
      },
      {
        name: "Workers & Scrapers",
        stack: "Node.js, Node-cron, Duck-Duck-Scrape, Cheerio, PDF-Parse",
        role: "Standalone discovery engines querying government portals via headless browsers over proxy pools, extracting text from structured PDFs."
      },
      {
        name: "Data & State",
        stack: "Prisma ORM, MongoDB Atlas",
        role: "Strictly typed persistence of raw fetched payloads mapped to sanitized notice records. Tracks provenance hashes to detect source amendments."
      }
    ],
    capabilities: [
      {
        title: "Nothing publishes itself",
        body: "Every discovered notice lands in a review queue. An administrator approves it before a student ever sees it, so the automation scales the search rather than the risk.",
      },
      {
        title: "Provenance is a schema, not a note",
        body: "Sources, discovered links and scrape runs are first-class records, so any published notice can be traced back to where it was found and when.",
      },
      {
        title: "Built for amendments",
        body: "A notification carries its own update history, because government notices are corrected and withdrawn far more often than they are issued cleanly.",
      },
    ],
    outcomes: [
      { figure: "6", label: "Redundant AI worker agents" },
      { figure: "11", label: "Schema models behind provenance" },
      { figure: "12h", label: "Discovery cadence" },
      { figure: "100%", label: "Of notices human-approved" },
    ],
    stack: ["Next.js 15", "React 19", "Node-cron", "Puppeteer", "Prisma ORM", "Duck-Duck-Scrape"],
  },
];

export const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

export type { ReactNode };
