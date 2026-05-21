export const siteConfig = {
  name: "The Mather",
  tagline: "Data is the book. AI be the learner. We are the helper.",
  description:
    "Full system integration service — AI, Data Research, Web & Mobile, Data Migration, Data Driven, Data Analysis.",
  url: "https://www.themather.asia",
  seo: {
    keywords: [
      "AI technology",
      "data research",
      "web service",
      "mobile application",
      "data migration",
      "data driven",
      "data analysis",
      "system integration",
      "Bangkok tech company",
      "Thailand AI",
    ],
    ogImage: "/og-image.png",
    twitterHandle: "@themather",
    locale: "en_US",
  },
  colorPresets: [
    { name: "cosmos", label: "Cosmos", mode: "dark" },
    { name: "dawn", label: "Dawn", mode: "light" },
    { name: "void", label: "Void", mode: "dark" },
    { name: "sun", label: "Sun", mode: "light" },
    { name: "moon", label: "Moon", mode: "light" },
    { name: "blackhole", label: "Blackhole", mode: "dark" },
    { name: "pulsar", label: "Pulsar", mode: "dark" },
    { name: "nebula", label: "Nebula", mode: "dark" },
  ] as const,
  defaultPreset: "void" as const,
  greyscaleFilter: {
    enable: true,
    value: 0.6, // 0.0 = full colour → 1.0 = full grey; recommended 0.5–0.6
  },
} as const;

export type ColorPreset = (typeof siteConfig.colorPresets)[number]["name"];

export const nav = {
  logos: [
    { path: "/LogoDark.png", mode: "dark" },
    { path: "/LogoLight.png", mode: "light" },
  ] as const,
  links: [
    { label: "Home", href: "/#welcome" },
    { label: "Service", href: "/#service" },
    { label: "Portfolio", href: "/#platform" },
    { label: "Blog", href: "/blogs" },
    { label: "Contact Us", href: "#contact" },
  ],
};

export const careers = {
  email: "careers@themather.asia",
};

export const footer = {
  tagline: "The right partner is closer than you think.",
  cta: "Let's talk.",
  company: "The Mather",
  contact: {
    email: "info@themather.asia",
    phone: "+02 937 0555",
    address: "555 Rasa Tower Phahonyothin Rd, Chatuchak, Bangkok 10900",
  },
  contactForm: {
    heading: "I'm interested in...",
    interests: [
      "AI Technology",
      "Data Research",
      "Web Service",
      "Mobile Application",
      "Data Migration",
      "Data Driven",
      "Data Analysis",
    ],
    fields: ["name", "email", "message"],
    submitLabel: "Send message",
  },
  links: [
    {
      heading: "The Mather",
      links: [
        { label: "Home", href: "/#welcome" },
        { label: "Services", href: "/#service" },
        { label: "Portfolio", href: "/#platform" },
        { label: "Team", href: "/#team" },
        { label: "Blog", href: "/blogs" },
        { label: "Contact", href: "#contact" },
      ],
    },
    {
      heading: "Work With Us",
      links: [
        { label: "Careers", href: "/careers" },
        { label: "Tech Stack", href: "/careers/tech-stack" },
      ],
    },
  ],
};
