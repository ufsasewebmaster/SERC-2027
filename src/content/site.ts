/**
 * ─────────────────────────────────────────────────────────────
 *  SERC 2027 — General website content. Team members live in team.ts.
 * ─────────────────────────────────────────────────────────────
 *  Anything marked TODO is a placeholder waiting on real content.
 *  Images go in /public/images and are referenced as "/images/<file>".
 */

export const event = {
  name: "SERC 2027",
  fullName: "Southeast Regional Conference",
  host: "Society of Asian Scientists and Engineers (SASE)",
  theme: "Unbox Your Potential",
  dateLabel: "January 17, 2027",
  shortDate: "Jan 17, 2027",
  venue: "University of Florida",
  // Countdown target (Eastern Time). Change the time once the schedule is final.
  startsAt: "2027-01-17T08:00:00-05:00",
  // TODO: confirm the best contact address for SERC 2027.
  contactEmail: "serc@saseconnect.org",
  partnershipEmail: "ufsase.conference@gmail.com",
};

export const socials = [
  { label: "Instagram", handle: "@saseserc", href: "https://www.instagram.com/saseserc/", icon: "instagram" },
  { label: "LinkedIn", handle: "UF SASE", href: "https://www.linkedin.com/company/ufsase/", icon: "linkedin" },
  { label: "Discord", handle: "Join the server", href: "https://discord.gg/nhd4WB88Vg", icon: "discord" },
] as const;

export const registration = {
  price: "$35",
  latePrice: "$45",
  // TODO: the date the price goes up, e.g. "December 20".
  lateDeadline: "",
  // TODO: add the published Google Form responder URL (/viewform or forms.gle).
  // The form collects attendee details, explains payment, and accepts receipt uploads.
  // Leave empty until ready; the ticket shows a disabled button instead of an old link.
  formUrl: "",
};

export const about = {
  paragraphs: [
    "The Southeast Regional Conference (SERC) is an annual conference hosted by the Society of Asian Scientists and Engineers (SASE), bringing together students from chapters across the Southeast.",
    "Designed for STEM students at all stages of their academic and professional journeys, SERC offers a full day of professional development, industry networking, and leadership growth opportunities.",
    "This year, SERC is coming to the University of Florida on Sunday, January 17, 2027!",
  ],
  stats: [
    { value: "400+", label: "attendees" },
    { value: "12+", label: "universities" },
    { value: "1", label: "jam-packed day" },
  ],
  pillars: [
    {
      title: "Opportunities",
      body: "Access to job fairs and corporate partnerships designed to explore new career paths.",
    },
    {
      title: "Networking",
      body: "Foster long-lasting connections and build friendships by engaging with professionals, alumni, and professors in STEM fields.",
    },
  ],
  photos: [
    { src: "/images/past-group.jpg", alt: "A large group of SASE students posing together at a past regional conference", caption: "The whole crew" },
    { src: "/images/past-career-fair.jpg", alt: "Students talking with a recruiter at a past SERC career fair", caption: "Career fair" },
    { src: "/images/past-poster.jpg", alt: "A student presenting a research poster", caption: "Research symposium" },
    { src: "/images/past-workshop.jpg", alt: "Students seated in a meeting room during a workshop", caption: "Workshops" },
  ],
};

export type BoxItem = { title: string; body: string; link?: { label: string; href: string } };

export const whatsInTheBox: BoxItem[] = [
  {
    title: "Workshops",
    body: "Participate in interactive workshops led by industry professionals! Gain hands-on experience, develop new skills, and engage directly with companies through fun and educational activities.",
  },
  {
    title: "Career Fair",
    body: "Connect one-on-one with company representatives and recruiters! Explore internship and full-time opportunities, get a chance to interview directly with companies, learn about different career paths, and build professional connections.",
  },
  {
    title: "Research Symposium",
    body: "Explore exciting research projects presented by students from across the Southeast! Learn and discover innovative research, and connect with fellow student researchers.",
    link: { label: "Learn More or Apply to Present", href: "/symposium" },
  },
  {
    title: "Design Challenges",
    body: "Soon to be released! Check back for details.",
  },
  {
    title: "Resume Reviews",
    body: "Get personalized feedback on your resume directly from recruiters and industry professionals. Receive advice on strengthening your resume, highlighting your experiences, and standing out during the recruiting process.",
  },
  {
    title: "Networking Opportunities",
    body: "Meet students from SASE chapters across the Southeast! Make new friends, exchange experiences, and build lasting connections through fun social and networking activities.",
  },
  {
    title: "Merchandise, Awards, and Raffles!",
    body: "Get creative and make your own tote bags and phone charms! Enjoy free stickers, shirts, and professional headshots, plus exciting raffles and chances to win prizes and awards throughout the conference!",
  },
];

export type Faq = { q: string; a: string; link?: { label: string; href: string } };

/** TODO: drafts written from the old site — replace with the team's final questions. */
export const faqs: Faq[] = [
  {
    q: "How much does it cost to attend?",
    a: "Registration is $35 per person. The price goes up to $45 after the early registration deadline, so grab your ticket early!",
  },
  {
    q: "Who can attend SERC?",
    a: "SERC is designed for STEM students at all stages of their academic and professional journeys, from SASE chapters across the Southeast.",
  },
  {
    q: "What should I bring?",
    a: "A few copies of your resume, your phone and a power bank, water and snacks for a long (fun) day, and a good night's rest beforehand!",
  },
  {
    q: "Can I present my research?",
    a: "Absolutely. Apply to present a poster at the SERC Research Symposium.",
    link: { label: "Go to the Research Symposium Page", href: "/symposium" },
  },
  {
    q: "Where can I find the latest updates?",
    a: "Right here on this website, on Instagram at @saseserc, and in our Discord server.",
  },
];

export type Partner = { name: string; logo: string; href?: string };

/** Placeholder lineup for now. Put logos in /public/images/partners/. */
export const partners: Partner[] = [
  { name: "NASA", logo: "/images/partners/nasa.webp", href: "https://www.nasa.gov/" },
  { name: "Mortenson", logo: "/images/partners/mortenson.png", href: "https://www.mortenson.com/" },
  { name: "Sandia National Laboratories", logo: "/images/partners/sandia.png", href: "https://www.sandia.gov/" },
  { name: "Mayo Clinic", logo: "/images/partners/mayo-clinic.png", href: "https://www.mayoclinic.org/" },
  { name: "Michelin", logo: "/images/partners/michelin.webp", href: "https://www.michelin.com/" },
  { name: "Mitsubishi Motors", logo: "/images/partners/mitsubishi-motors.webp", href: "https://www.mitsubishicars.com/" },
  { name: "ExxonMobil", logo: "/images/partners/exxonmobil.webp", href: "https://corporate.exxonmobil.com/" },
];

export const symposium = {
  // TODO: the PUBLIC Google Form link (…/viewform), not the edit link.
  applyUrl: "",
  // TODO: swap for the scientist mascot graphic when it's ready.
  mascotImage: "/images/logo.png",
};
