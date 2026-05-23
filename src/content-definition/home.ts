import type { ImageMetadata } from 'astro';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavLogo {
  path: string;
  mode: "dark" | "light";
}

export interface NavData {
  logos: readonly NavLogo[];
  links: NavLink[];
}

export interface HeroData {
  methodologyTags: string[];
  headline: string;
  subheadline: string;
  cta: { label: string; href: string };
}

export interface ServiceItem {
  index: string;
  title: string;
  body: string;
}

export interface OurServicesData {
  heading: string;
  intro: string;
  items: ServiceItem[];
}

export interface PlatformTab {
  label: string;
  key: string;
}

export interface Project {
  id: string;
  title: string;
  categories: string[];
  image?: ImageMetadata;
  featured?: boolean;
}

export interface ProjectsData {
  heading: string;
  intro: string;
  tabs: PlatformTab[];
  projects: Project[];
}

export interface PlatformData {
  heading: string;
  intro: string;
}

export interface ValuePropItem {
  title: string;
  description: string;
}

export interface ValuePropsData {
  heading: string;
  intro: string;
  items: ValuePropItem[];
}

export interface ClientItem {
  name?: string;
  year?: number;
  logo?: ImageMetadata;
  logoDark?: ImageMetadata;
}

export interface ClientsData {
  heading: string;
  intro: string;
  items: ClientItem[];
}

export interface TeamDiscipline {
  index: string;
  name: string;
  description: string;
}

export interface TeamData {
  heading: string;
  intro: string;
  disciplines: TeamDiscipline[];
}

export interface TestimonialsData {
  heading: string;
  tagline: string;
  body: string;
  cta: { label: string; href: string };
}

export interface Article {
  title: string;
  date: string;
  href: string;
  image?: ImageMetadata;
  excerpt?: string;
}

export interface BlogData {
  heading: string;
  intro: string;
  viewAllHref: string;
  articles: Article[];
}

export interface ContactFormData {
  heading: string;
  interests: string[];
  fields: string[];
  submitLabel: string;
}

export interface FooterLinkGroup {
  heading: string;
  links: NavLink[];
}

export interface FooterData {
  tagline: string;
  cta: string;
  company: string;
  contact: { email: string; phone: string; address: string };
  contactForm: ContactFormData;
  links?: FooterLinkGroup[];
}

export interface HomeContent {
  nav: NavData;
  hero: HeroData;
  ourServices: OurServicesData;
  projects: ProjectsData;
  valueProps: ValuePropsData;
  clients: ClientsData;
  team: TeamData;
  testimonials: TestimonialsData;
  blog: BlogData;
  footer: FooterData;
}
