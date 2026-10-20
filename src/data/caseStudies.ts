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

import umvadlaHome from "../assets/showcase/umvadla-01-home.jpg";
import shardaImage from "../assets/showcase-sharda.jpg";
import umvadlaAcademics from "../assets/showcase/umvadla-03-academics.jpg";
import umvadlaAdmissions from "../assets/showcase/umvadla-04-admissions.jpg";
import umvadlaAdminNotices from "../assets/showcase/umvadla-05-admin-notices.jpg";
import shardaCover from "../assets/showcase/sharda-00-cover.jpg";
import shardaDashboard from "../assets/showcase/sharda-01-dashboard.jpg";
import shardaBookings from "../assets/showcase/sharda-02-bookings.jpg";
import shardaPortalHero from "../assets/showcase/sharda-06-portal-hero.jpg";
import shardaPortalRooms from "../assets/showcase/sharda-07-portal-rooms.jpg";
import shardaGuest from "../assets/showcase/sharda-02-guest.jpg";
import shardaCalendar from "../assets/showcase/sharda-03-calendar.jpg";
import shardaInvoice from "../assets/showcase/sharda-04-invoice.jpg";
import shardaCmd from "../assets/showcase/sharda-05-cmd.jpg";
import eduflowCover from "../assets/showcase/eduflow-00-cover.jpg";
import eduflowDashboard from "../assets/showcase/eduflow-01-dashboard.jpg";
import eduflowJourney from "../assets/showcase/eduflow-02-journey.jpg";
import eduflowLeads from "../assets/showcase/eduflow-03-leads.jpg";
import eduflowStudents from "../assets/showcase/eduflow-04-students.jpg";
import eduflowTests from "../assets/showcase/eduflow-05-tests.jpg";
import eduflowFees from "../assets/showcase/eduflow-06-fees.jpg";
import eduflowApps from "../assets/showcase/eduflow-07-apps.jpg";
import brushStore from "../assets/showcase/brush-01-store.jpg";
import brushBuilder from "../assets/showcase/brush-03-builder.jpg";
import brushCatalogue from "../assets/showcase/brush-06-catalogue.jpg";
import brushCart from "../assets/showcase/brush-09-cart.jpg";
import brushCheckout from "../assets/showcase/brush-10-checkout.jpg";
import brushAdminOrders from "../assets/showcase/brush-04-admin-orders.jpg";
import brushAdminInventory from "../assets/showcase/brush-05-admin-inventory.jpg";
import scrapexCover from "../assets/showcase/case-scrapex-01-cover.jpg";
import scrapexFont from "../assets/showcase/case-scrapex-02-font.jpg";
import scrapexPalette from "../assets/showcase/case-scrapex-03-palette.jpg";
import scrapexSampler from "../assets/showcase/case-scrapex-04-sampler.jpg";
import scrapexDocument from "../assets/showcase/case-scrapex-05-document.jpg";
import scrapexEmail from "../assets/showcase/case-scrapex-06-email.jpg";
import noticeboardImage from "../assets/project-noticeboard.jpg";
import nbHomeV2 from "../assets/showcase/noticeboard-home_v2.jpg";
import nbCalendar from "../assets/showcase/noticeboard-calendar.jpg";
import nbSingle from "../assets/showcase/noticeboard-single.jpg";
import nbAdminRuns from "../assets/showcase/noticeboard-admin-runs.png";
import nbAdminSources from "../assets/showcase/noticeboard-admin-sources.png";

import logoUmvadla from "../assets/clients/umvadla.png";
import logoUmvadlaDark from "../assets/clients/umvadla-dark.png";
import logoSharda from "../assets/clients/sharda.png";
import logoShardaDark from "../assets/clients/sharda-dark.png";
import logoTrajectx from "../assets/clients/trajectx.png";
import logoTrajectxDark from "../assets/clients/trajectx-dark.png";
import logoBrush from "../assets/clients/brush-light.png";
import logoBrushDark from "../assets/clients/brush.png";
import logoScrapex from "../assets/clients/scrapex-light.png";
import logoScrapexDark from "../assets/clients/scrapex.png";
import logoNoticeboard from "../assets/clients/noticeboard.png";
import logoNoticeboardDark from "../assets/clients/noticeboard-dark.png";
import logoTreatx from "../assets/clients/treatx.png";
import logoTreatxDark from "../assets/clients/treatx-dark.png";

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
  /** Client logo for engineered spec plate on cards and hero views. */
  logo?: string;
  logoDark?: string;
  logoClass?: string;
  /** Flag for projects currently in active development or upcoming pipeline */
  inPipeline?: boolean;
  /** Flag for active Minimum Viable Product (MVP) operating in pipeline */
  isMvp?: boolean;
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
    cover: umvadlaHome,
    coverAlt: "UMV Adla school website — the live landing page",
    logo: logoUmvadla,
    logoDark: logoUmvadlaDark,
    logoClass: "h-32 sm:h-40 md:h-48 lg:h-52 w-auto max-w-[68%]",
    shots: [
      { src: umvadlaHome, caption: "umvadla.in — the live landing page" },
      { src: umvadlaAcademics, caption: "Academics — curriculum and student life" },
      { src: umvadlaAdmissions, caption: "Admissions — enrollment procedures and queries" },
      { src: umvadlaAdminNotices, caption: "Admin Dashboard — Notice Board Management Tool" },
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
      { figure: "4", label: "Custom built CMS modules" },
      { figure: "100%", label: "Imagery driven from the database" },
      { figure: "63ms", label: "Live database read latency" },
      { figure: "4", label: "Custom domain emails for authentic communications" },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Express",
      "MongoDB Atlas",
      "Google Drive API",
      "Twilio",
      "Tailwind",
    ],
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
    live: {
      label: "hotel-booking-crm-community.vercel.app",
      href: "https://hotel-booking-crm-community.vercel.app",
    },
    cover: shardaCover,
    coverAlt: "Sharda Palace CRM — Live operating dashboard and availability grid",
    logo: logoSharda,
    logoDark: logoShardaDark,
    logoClass: "h-28 sm:h-36 md:h-44 lg:h-48 w-auto max-w-[68%]",
    shots: [
      {
        src: shardaPortalHero,
        caption:
          "Public Booking Engine — direct reservations, temple proximity & 20% advance token",
      },
      {
        src: shardaPortalRooms,
        caption: "Room Selection & Inventory — 100% ground-floor step-free access and live pricing",
      },
      {
        src: shardaBookings,
        caption:
          "Master Bookings Ledger — 319 live reservations with guest verification and status",
      },
      {
        src: shardaCalendar,
        caption: "Room Availability Grid — multi-room inventory synced with OTA channels",
      },
      {
        src: shardaInvoice,
        caption: "GST Tax Invoices & Billing — folio settlements, advance tokens and receipts",
      },
      {
        src: shardaGuest,
        caption: "Lifetime Guest Dossier — stay counts, lifetime value and communication history",
      },
      {
        src: shardaCmd,
        caption: "The ⌘K global command menu — instant navigation across 13 hotel modules",
      },
    ],
    services: [
      "Brand identity",
      "Collateral system",
      "Property CRM",
      "Billing & GST",
      "Guest messaging",
      "Channel API Sync",
    ],
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
        name: "Deployment & Auth",
        stack: "Vercel, Superadmin RBAC, Session Management",
        role: "Zero local on-prem dependencies; authenticated staff access from any device with persistent audit tracing.",
      },
      {
        name: "Messaging Engine",
        stack: "WhatsApp, SMS, Automated Arrival Concierge",
        role: "Pre-arrival check-in passes, directions (500m to Baba Baidyanath Mandir), VIP temple priest assistance, and receipt dispatches.",
      },
      {
        name: "Channel Distribution",
        stack: "REST APIs, Webhooks, Booking.com Integration",
        role: "Bi-directional channel synchronization automatically locking inventory upon reservation and mapping commission splits.",
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
        title: "Pilgrim & Senior-Citizen Ready",
        body: "Tracks step-free ground-floor room assignments, 24/7 instantaneous geyser readiness for 4:00 AM temple queues, and direct priest coordination.",
      },
      {
        title: "Live OTA Channel Sync",
        body: "Integrates direct booking engine with external channels like Booking.com, reconciling 319+ reservations and ₹2.54L+ in automated revenue tracking.",
      },
    ],
    outcomes: [
      { figure: "319", label: "Live reservations audited on system" },
      { figure: "₹2.54L", label: "Gross booking revenue tracked in INR" },
      { figure: "13", label: "Modules, front desk to ledger" },
      { figure: "100%", label: "Step-free ground floor visibility" },
    ],
    stack: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Recharts",
      "Lucide Icons",
      "Date-fns",
    ],
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "trajectx",
    n: "03",
    title: "Every aspirant, from first call to final admit",
    client: "TrajectX · CAT & GMAT Coaching OS",
    year: "2026",
    summary:
      "A unified institutional management platform connecting prospective enquiries, structured counselling, batch execution, mock test analytics, and B-school admission outcomes on one shared source of truth.",
    live: {
      label: "eduflow-by-kraft.vercel.app",
      href: "https://eduflow-by-kraft.vercel.app",
    },
    cover: eduflowCover,
    coverAlt:
      "TrajectX Student Journey Manager — Institutional intelligence and admissions pipeline",
    logo: logoTrajectx,
    logoDark: logoTrajectxDark,
    logoClass: "h-14 sm:h-18 md:h-22 lg:h-26 w-auto max-w-[78%]",
    shots: [
      {
        src: eduflowDashboard,
        caption:
          "Institutional Intelligence & Pipeline Funnel — live MongoDB analytics with dual stage charts",
      },
      {
        src: eduflowJourney,
        caption:
          "9-Phase Journey Kanban — linear lifecycle progression from lead to verified admit",
      },
      {
        src: eduflowLeads,
        caption:
          "Admissions CRM & Leads — multi-channel enquiry capture, SLA routing & pipeline triage",
      },
      {
        src: eduflowStudents,
        caption:
          "Student Directory & Cohort Management — CAT & GMAT track rosters and mentor assignments",
      },
      {
        src: eduflowTests,
        caption:
          "Mock Test Performance & Diagnostics — proctored scoring, accuracy percentiles & negative mark audits",
      },
      {
        src: eduflowFees,
        caption:
          "Instalment Fee Ledgers — automated payment schedules, receipts & balance tracking in INR",
      },
      {
        src: eduflowApps,
        caption:
          "B-School Application Tracker — IIM composite score calculators, GD/PI prep & call letters",
      },
    ],
    services: [
      "Admissions CRM",
      "Dual Exam Engine",
      "Lifecycle Kanban",
      "Mock Analytics",
      "Fee Ledgers",
      "Institutional Intelligence",
    ],
    problem:
      "Coaching institutes lose high-intent aspirants in the gap between lead capture, counselling follow-ups, and academic pacing. Prospective enquiries live in chaotic WhatsApp chats and local spreadsheets, mock percentiles sit in disconnected exam portals, and fee instalments require manual reconciliations. By the time leadership asks why conversion dropped, the context of what was promised to a student is lost across four tools.",
    approach:
      "Model the aspirant lifecycle as an immutable 9-phase linear progression engine on MongoDB Atlas. An enquiry isn't a static form submission — it is a live candidate journey linking multi-channel lead routing, diagnostic counselling notes, batch timetables, sectional accuracy, and B-school GD/PI interview prep under a single unified student record with granular role-based access control.",
    architecture: [
      {
        name: "Client",
        stack: "React 19, TypeScript, TanStack Router, Tailwind CSS, Lucide",
        role: "Specialized coaching operations cockpit with high-density tabular ledgers, drag-and-drop journey Kanban, and instant role-switching between Super Admin, Director, Counsellor, and Mentor.",
      },
      {
        name: "Core Engine",
        stack: "Dual Examination Scoring Engine (CAT & GMAT Focus Edition)",
        role: "Dedicated pipelines tracking VARC/DILR/QA (198 raw marks scale) and GMAT Focus Edition (205–805 score scale with Quantitative, Verbal, and Data Insights balancing).",
      },
      {
        name: "Data & State",
        stack: "MongoDB Atlas, Real-time Aggregation Pipelines",
        role: "Document store capturing student 360° dossiers, proctored mock analytics, attendance streaks, SLA follow-up timestamps, and custom agreed fee instalment ledgers.",
      },
      {
        name: "Admissions & Operations",
        stack: "10 Dedicated Modules, Multi-Role RBAC",
        role: "Modular operational surface spanning CRM leads, curriculum pacing, proctored test scoring, biometric attendance alerts, IIM call letter tracking, and revenue intelligence.",
      },
    ],
    capabilities: [
      {
        title: "9-Phase Linear Lifecycle Progression",
        body: "Every candidate advances through explicit, timestamped phases: Enquiry, Counselling, Enrolment, Foundation, Sectionals, Full Mocks, B-School Apps, Interviews, and Verified Admits.",
      },
      {
        title: "Dual CAT & GMAT Exam Engines",
        body: "Separate exam tracks with specialized scoring models — percentile projections mapped to all-India competitive cohorts, topic accuracy breakdowns, and negative mark penalty audits.",
      },
      {
        title: "Admissions CRM & SLA Follow-up Queues",
        body: "Direct channel lead capture, counsellor assignment routing, automated SLA timers, and 1-click conversion to enrolled batches with custom negotiated fee plans.",
      },
      {
        title: "Role-Based Operating Cockpits",
        body: "Strict RBAC views tailored for Super Administrators, Managing Directors, Admissions Counsellors, and Academic Mentors to protect sensitive financial and performance records.",
      },
    ],
    outcomes: [
      { figure: "9", label: "Lifecycle progression phases" },
      { figure: "10", label: "Specialized coaching operations modules" },
      { figure: "2", label: "Dedicated exam tracks (CAT & GMAT)" },
      { figure: "84.2%", label: "Average mock accuracy projected across batches" },
    ],
    stack: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "MongoDB Atlas",
      "Tailwind CSS",
      "Radix UI",
      "Lucide Icons",
      "Vite",
    ],
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
    live: {
      label: "brush-art.in",
      href: "https://www.brush-art.in",
    },
    cover: brushStore,
    coverAlt: "Brush storefront — custom wall art and print commerce",
    logo: logoBrush,
    logoDark: logoBrushDark,
    logoClass: "h-16 sm:h-20 md:h-24 lg:h-28 w-auto max-w-[75%]",
    shots: [
      {
        src: brushCatalogue,
        caption: "Catalogue & Filtering — 337+ artworks with live genre categorization and mockups",
      },
      {
        src: brushBuilder,
        caption: "Build Your Pack Studio — custom gallery wall setup configurator",
      },
      {
        src: brushCart,
        caption:
          "Slide-Out Cart Drawer — instant line item breakdown, sticker sheet upsells and live total pricing",
      },
      {
        src: brushCheckout,
        caption:
          "Multi-Step Checkout — authenticated customer flow with real-time pincode validation and payment gateways",
      },
      {
        src: brushAdminOrders,
        caption:
          "Admin Operations Cockpit — live order tracking, fulfilment state machine and automated PDF invoices",
      },
      {
        src: brushAdminInventory,
        caption:
          "Inventory & Catalog Console — real-time SKU stock levels, tax pricing and storefront feature toggles",
      },
    ],
    services: [
      "Storefront",
      "Catalogue & pricing",
      "Checkout & payments",
      "Fulfilment operations",
      "Transactional email",
    ],
    problem:
      "A print business has to agree on a price in three places — the product page, the cart and the invoice — and on a status in three more: the customer's email, the admin queue and the courier. When those live in separate tools they disagree, and every disagreement is a refund conversation.",
    approach:
      "One pricing engine, shared by the browser and the server, so a figure can never differ between the two. One order record that the storefront, the admin and the invoice all read. And a payment path that survives a restart mid-transaction, because a customer who has paid must never be left without an order.",
    architecture: [
      {
        name: "Client",
        stack: "Vanilla JS / HTML / CSS",
        role: "Lightweight, highly optimized DOM nodes fetching standard product endpoints with dynamic cart injection.",
      },
      {
        name: "API & Backend",
        stack: "Node.js, Express, Firebase Admin, PDFKit",
        role: "Consolidated microservices dealing with invoices (PDFKit), authentication (Firebase), and redundant checkout sessions.",
      },
      {
        name: "Data & Payments",
        stack: "MongoDB Atlas, Cashfree, Razorpay",
        role: "High-throughput redundant payment gateways mapped directly to catalog orders against NoSQL product models.",
      },
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
    stack: [
      "Node.js",
      "Express",
      "MongoDB Atlas",
      "Firebase Auth",
      "Cashfree",
      "Razorpay",
      "PDFKit",
      "Vanilla JS",
    ],
  },

  /* ---------------------------------------------------------------- 05 */
  {
    slug: "scrape-x",
    n: "05",
    title: "Reading the web as data",
    client: "Kraft Studios · Scrape X",
    year: "2026",
    summary:
      "Five Chrome tools that turn a live page into the things a designer actually needs from it — the typefaces it renders, the colours it is built from, the files it links to, the people it lists — without a single byte leaving the browser.",
    // Swap this for scrapex.tools once the domain is registered and pointed at Pages.
    live: {
      label: "immortal0p.github.io/ScrapeX-Website",
      href: "https://immortal0p.github.io/ScrapeX-Website/",
    },
    cover: scrapexCover,
    coverAlt:
      "Scrape X — the five side panels: Font Scraper, Palette Extractor, Image Sampler, Document Scraper and Email Extractor",
    coverFit: "contain",
    coverBg: "#E9E6DE",
    logo: logoScrapex,
    logoDark: logoScrapexDark,
    logoClass: "h-14 sm:h-18 md:h-22 lg:h-26 w-auto max-w-[78%]",
    shots: [
      { src: scrapexFont, caption: "Font Scraper — live specimens and the exact workbook preview" },
      {
        src: scrapexPalette,
        caption: "Palette Extractor — every painted colour, weighted by the area it covers",
      },
      {
        src: scrapexSampler,
        caption: "Image Sampler — one image's palette, its type and its tonal numbers",
      },
      {
        src: scrapexDocument,
        caption: "Document Scraper — every linked file, grouped by kind and checked",
      },
      {
        src: scrapexEmail,
        caption: "Email Extractor — addresses collected across a browsing session",
      },
    ],
    services: ["Product design", "Chrome extensions", "Colour science", "Export engineering"],
    problem:
      "Auditing a site by hand is slow and unverifiable. A designer opens dev tools, notes a typeface, eyedroppers a colour, guesses how much of the page it covers, and hunts the footer for a PDF — then writes it all into a document nobody can check. The alternative is a scraping service, which solves the labour by sending the client's pages to somebody else's server.",
    approach:
      "Read the page where it already is. Each tool injects into the open tab, measures what the browser actually rendered rather than what the CSS asked for, and writes the file locally. No server exists to send anything to, which is what makes the tools usable on a client's staging site or an intranet behind a login.",
    architecture: [
      {
        name: "Probes",
        stack: "Manifest V3, chrome.scripting, injected per frame",
        role: "One script per tool, run in every frame of the active tab. They resolve rendered font faces against canvas measurements, walk painted surfaces for colour, and follow links, embeds, viewer URLs and data attributes to the files behind them.",
      },
      {
        name: "Measurement",
        stack: "sRGB → CIE Lab, CIEDE2000, k-cluster merge, WCAG contrast",
        role: "Colour is clustered in a perceptual space so shades that look the same to an eye merge into one, then weighted by the area each actually covers rather than by how often it appears in a stylesheet.",
      },
      {
        name: "Readers",
        stack: "Raw byte parsing — PDF objects, ZIP central directories, DecompressionStream",
        role: "Documents are read in the panel: page counts and metadata out of PDF structure, sheet names and slide counts out of the XML inside Office files, row and column counts sampled from CSVs.",
      },
      {
        name: "Writers",
        stack: "OpenXML and ZIP written by hand, CompressionStream, canvas",
        role: "Workbooks, archives and report images are generated in the browser with no library — the same model drives the live preview and the downloaded file, so the two cannot drift apart.",
      },
      {
        name: "Shell",
        stack: "Side panel, one shared stylesheet across all five tools",
        role: "Every tool presents the same way: scan, preview, download only when asked. The common chrome lives in one file so a change lands in all five at once.",
      },
    ],
    capabilities: [
      {
        title: "Rendered, not declared",
        body: "The font tool compares canvas measurements against fallbacks to find which family the browser actually drew, so a stack that never loads is reported as unresolved instead of being read off the CSS and believed.",
      },
      {
        title: "Colour weighted by area",
        body: "Each painted surface contributes the area it covers, with the area of anything drawn over it subtracted. A brand colour used once at full width outranks a grey repeated in forty small rules.",
      },
      {
        title: "Files read, not just listed",
        body: "Every document found is fetched, verified and parsed for what its own format offers — page counts, sheet names, slide counts, archive contents — before anything is downloaded.",
      },
      {
        title: "Nothing leaves the browser",
        body: "No account, no server, no telemetry. The tools work on pages behind a login precisely because the page is never sent anywhere to be processed.",
      },
    ],
    outcomes: [
      { figure: "5", label: "Tools on one shared design system" },
      { figure: "0", label: "Runtime dependencies across the kit" },
      { figure: "171", label: "Style rules shared, written once" },
      { figure: "0", label: "Bytes sent off the machine" },
    ],
    stack: [
      "Manifest V3",
      "Vanilla JS",
      "OpenXML",
      "Canvas",
      "CIE Lab / CIEDE2000",
      "CompressionStream",
    ],
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
    logo: logoNoticeboard,
    logoDark: logoNoticeboardDark,
    logoClass:
      "w-[82%] sm:w-[78%] md:w-[75%] max-w-[420px] h-auto max-h-20 sm:max-h-24 md:max-h-28",
    inPipeline: true,
    isMvp: true,
    shots: [
      { src: nbHomeV2, caption: "The student-facing feed of verified government notifications" },
      {
        src: nbSingle,
        caption: "Notice Payload — extracted qualification, timeline and recruitment metrics",
      },
      {
        src: nbAdminSources,
        caption:
          "Source Configuration — declaring headless browser selectors and scrape intervals directly through the UI",
      },
      {
        src: nbAdminRuns,
        caption: "Scrape Runs — real-time telemetry and error bounds surfacing scraping anomalies",
      },
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
        role: "The reading surface — notices, calendar, eligibility and profiles — plus the admin review, sources and runs screens.",
      },
      {
        name: "Workers & Scrapers",
        stack: "Node.js, Node-cron, Duck-Duck-Scrape, Cheerio, PDF-Parse",
        role: "Standalone discovery engines querying government portals via headless browsers over proxy pools, extracting text from structured PDFs.",
      },
      {
        name: "Data & State",
        stack: "Prisma ORM, MongoDB Atlas",
        role: "Strictly typed persistence of raw fetched payloads mapped to sanitized notice records. Tracks provenance hashes to detect source amendments.",
      },
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
  /* ---------------------------------------------------------------- 07 */
  {
    slug: "treatx",
    n: "07",
    title: "Precision online media and document engine",
    client: "TreatX · Image & Document OS",
    year: "2026",
    summary:
      "A client-side WebAssembly and edge-accelerated processing engine for high-fidelity image upscaling, perceptual compression, and interactive multi-page PDF operations.",
    cover: "",
    coverAlt: "TreatX online media and document enhancement engine",
    logo: logoTreatx,
    logoDark: logoTreatxDark,
    logoClass: "h-14 sm:h-18 md:h-22 lg:h-26 w-auto max-w-[78%]",
    inPipeline: true,
    shots: [],
    services: [
      "Image processing",
      "PDF manipulation",
      "WebAssembly compute",
      "Perceptual compression",
      "Zero-knowledge privacy",
    ],
    problem:
      "Routine digital assets operations—upscaling low-res photography, optimizing document sizes for submission limits, and reorganizing multi-page PDFs—routinely push users toward intrusive subscription tools, ad-heavy web converters, or services that retain confidential files on third-party servers.",
    approach:
      "TreatX runs compute directly inside the user's browser using compiled WebAssembly workers for zero-upload privacy, falling back to ephemeral edge nodes strictly when multi-pass neural reconstruction is required. No payload persists longer than the active browser session.",
    architecture: [
      {
        name: "Client Runtime",
        stack: "Rust, WebAssembly, Web Workers, OffscreenCanvas",
        role: "Client-side image decoding, bilinear/bicubic resampling, and real-time PDF page reordering without server transit.",
      },
      {
        name: "Edge Pipeline",
        stack: "Node.js, Libvips, Sharp, Poppler",
        role: "High-throughput ephemeral compute cluster for heavy multi-pass compression algorithms and batch PDF serialization.",
      },
      {
        name: "Zero-Knowledge State",
        stack: "Ephemeral In-Memory Buffers, Cryptographic Shredding",
        role: "Temporary operational memory with immediate cryptographic erasure upon output stream dispatch.",
      },
    ],
    capabilities: [
      {
        title: "Perceptual Resolution Recovery",
        body: "Enhances fine edges, typography, and detail fidelity in low-res raster assets without haloing or artificial smearing.",
      },
      {
        title: "Adaptive Size Compression",
        body: "Calculates optimal structural similarity indexes (SSIM) to slash file sizes up to 80% with imperceptible visual loss across JPEG, WebP, PNG, and PDF.",
      },
      {
        title: "Interactive PDF Matrix",
        body: "Instant drag-and-drop page rearrangement, rotation, deletion, page extraction, and multi-document merge workflows.",
      },
    ],
    outcomes: [
      { figure: "< 80ms", label: "Client Wasm execution latency" },
      { figure: "100%", label: "Client-side privacy guarantee" },
      { figure: "80%", label: "Average file size reduction" },
      { figure: "0 B", label: "Persistent server storage" },
    ],
    stack: [
      "Rust",
      "WebAssembly",
      "Sharp",
      "Libvips",
      "Poppler",
      "TypeScript",
      "React 19",
      "Tailwind CSS",
    ],
  },
];

export const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);

export type { ReactNode };
