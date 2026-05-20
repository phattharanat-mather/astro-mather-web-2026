export interface NavLink {
  label: string;
  href: string;
}

export interface NavLogo {
  path: string;
  mode: "dark" | "light";
}

export interface NavData {
  logos: NavLogo[];
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
  title: string;
  category: string;
  image?: string;
  href?: string;
}

export interface PlatformSolutionsData {
  heading: string;
  intro: string;
  tabs: PlatformTab[];
  projects: Project[];
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
  name: string;
  logo?: { light: string; dark: string };
}

export interface ClientsData {
  heading: string;
  intro: string;
  items: ClientItem[];
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  image?: string;
}

export interface TeamData {
  heading: string;
  intro: string;
  departments: string[];
  members: TeamMember[];
}

export interface FounderQuoteData {
  heading: string;
  tagline: string;
  body: string;
  cta: { label: string; href: string };
}

export interface Article {
  title: string;
  date: string;
  href: string;
  image?: string;
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

export interface FooterData {
  tagline: string;
  cta: string;
  company: string;
  contact: { email: string; phone: string; address: string };
  contactForm: ContactFormData;
}

export interface HomeContent {
  nav: NavData;
  hero: HeroData;
  ourServices: OurServicesData;
  platformSolutions: PlatformSolutionsData;
  valueProps: ValuePropsData;
  clients: ClientsData;
  team: TeamData;
  founderQuote: FounderQuoteData;
  blog: BlogData;
  footer: FooterData;
}
