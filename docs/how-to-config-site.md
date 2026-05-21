# How to Configure the Site

Site-wide configuration lives in two files under `src/data/`:

| File | Purpose |
|---|---|
| `src/data/site.ts` | Global identity, SEO, colour presets, nav, footer |
| `src/data/home.ts` | All copy and data for the home-page sections |

Edit these files directly — no content collection or build step required beyond the normal `bun run dev` / `bun run build`.

---

## `src/data/site.ts`

### `siteConfig`

Core identity and SEO defaults.

```ts
export const siteConfig = {
  name: "The Mather",                      // brand name used throughout the site
  tagline: "...",                           // short tagline (meta / footer fallback)
  description: "...",                       // meta description
  url: "https://www.themather.asia",        // canonical origin (no trailing slash)
  seo: {
    keywords: ["AI technology", ...],       // array of keyword strings
    ogImage: "/og-image.png",              // OG image path inside public/
    twitterHandle: "@themather",
    locale: "en_US",
  },
  colorPresets: [                           // available theme presets (do not reorder — first active)
    { name: "cosmos", label: "Cosmos", mode: "dark" },
    { name: "dawn",   label: "Dawn",   mode: "light" },
    { name: "void",   label: "Void",   mode: "dark" },
  ],
  defaultPreset: "cosmos",                  // must match a name in colorPresets
  greyscaleFilter: {
    enable: false,                          // set true to apply greyscale overlay
    value: 0.6,                             // 0.0 = full colour → 1.0 = full grey
  },
};
```

**To change the default theme:** update `defaultPreset` to any `name` value from `colorPresets`.

**To enable the greyscale overlay:** set `enable: true` and tune `value` between `0.5` and `0.6` for a subtle effect.

---

### `nav`

Logo paths and navigation links.

```ts
export const nav = {
  logos: [
    { path: "/LogoDark.png",  mode: "dark" },   // shown in dark-mode themes
    { path: "/LogoLight.png", mode: "light" },  // shown in light-mode themes
  ],
  links: [
    { label: "Home",           href: "/#welcome" },
    { label: "Service",        href: "/#service" },
    // add, remove, or reorder entries here
  ],
};
```

Logo files live in `public/`. Update the `path` value if you rename the files.

---

### `footer`

Footer copy, contact details, and contact-form configuration.

```ts
export const footer = {
  tagline: "The right partner is closer than you think.",
  cta: "Let's talk.",
  company: "The Mather",
  contact: {
    email: "info@themather.asia",
    phone: "+02 937 0555",
    address: "555 Rasa Tower ...",
  },
  contactForm: {
    heading: "I'm interested in...",
    interests: ["AI Technology", "Data Research", ...],  // checkbox options
    fields: ["name", "email", "message"],                // shown input fields
    submitLabel: "Send message",
  },
};
```

---

## `src/data/home.ts`

Each export maps to a home-page section.

---

### `hero`

The top-of-page hero banner.

```ts
export const hero = {
  methodologyTags: ["METHODOLOGY", "MATHEMATICS", ...],  // pill tags above headline
  headline: "THE MATHER",
  subheadline: "Data is the foundation...",
  cta: { label: "Our Services", href: "/#service" },
};
```

---

### `ourServices`

Heading and intro text above the services grid.

```ts
export const ourServices = {
  heading: "Our Services",
  intro: "Full-spectrum technology services, built around your business.",
};
```

Service cards themselves are managed in `src/content/services/` — see `docs/how-to-add-content/services.md`.

---

### `platform`

Portfolio tab filter and project list.

```ts
export const platform = {
  heading: "Platform Solutions",
  intro: "...",
  tabs: [
    { label: "Web Application",    key: "web" },
    { label: "Mobile Application", key: "mobile" },
    { label: "Strategy & Data-Driven", key: "strategy" },
    { label: "AI",                 key: "ai" },
  ],
  projects: [
    { title: "TalentMatch Portal", category: "web",    href: "#" },
    // category must match a tab key
  ],
};
```

Add a project by appending to `projects`. Set `category` to one of the existing tab `key` values. Set `href` to the project URL or `"#"` for a placeholder.

---

### `valueProps`

"We Help Grow Your Business" cards.

```ts
export const valueProps = {
  heading: "We Help Grow Your Business",
  intro: "Practical solutions that move the needle.",
  items: [
    { title: "Effective Budget Control", description: "..." },
    // add or edit items here
  ],
};
```

---

### `clients`

Client logo / name marquee.

```ts
export const clients = {
  heading: "Our Clients",
  intro: "We take care of",
  items: [
    { name: "Nexlayer" },
    // add or remove entries; name is the display label
  ],
};
```

---

### `team`

Team section heading and disciplines list. Each discipline is a full-width row showing an index number, team name, and a one-line description of what that team delivers.

```ts
export const team = {
  heading: "Our Disciplines",
  intro: "Five specialized teams structured to deliver end-to-end.",
  disciplines: [
    {
      index: "01",
      name: "Business Development",
      description: "Scoping engagements, qualifying requirements, and structuring the right solution before a line of code is written.",
    },
    // add or edit disciplines here; index is a zero-padded display string, not a sort key
  ],
};
```

---

### `founderQuote`

Founder's quote section.

```ts
export const founderQuote = {
  heading: "From the Founder",
  tagline: "SIMPLE. VALUABLE. EXPERT.",
  body: "Quality work at a fair price...",
  cta: { label: "Download Credential", href: "/file/THEMATHER_2024.pdf" },
};
```

The PDF referenced by `href` must exist in `public/file/`.

---

### `blog`

Heading and intro above the latest-articles grid.

```ts
export const blog = {
  heading: "Latest Articles from Our Team",
  intro: "Insights, trends, and updates straight from our team.",
  viewAllHref: "/blogs",
};
```

Blog posts themselves are managed in `src/content/blogs/` — see `docs/how-to-add-content/blogs.md`.
