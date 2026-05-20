export const siteConfig = {
  name: "The Mather",
  tagline: "Data is the book. AI be the learner. We are the helper.",
  description: "Full system integration service — AI, Data Research, Web & Mobile, Data Migration, Data Driven, Data Analysis.",
  url: "https://www.themather.asia",
  colorPresets: ["cosmos", "dawn", "void"] as const,
  defaultPreset: "cosmos" as const,
} as const;

export type ColorPreset = (typeof siteConfig.colorPresets)[number];

export const DARK_PRESETS: ColorPreset[] = ["cosmos", "void"];
