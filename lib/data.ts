export const APP_NAME = "Alex Morgan";
export const APP_TAGLINE = "Full-Stack Developer & Designer";
export const APP_EMAIL = "hello@alexmorgan.dev";
export const APP_GITHUB = "https://github.com/alexmorgan";
export const APP_LINKEDIN = "https://linkedin.com/in/alexmorgan";
export const APP_TWITTER = "https://twitter.com/alexmorgan";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/#contact" },
];

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: "web" | "mobile" | "design" | "oss";
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "frontend" | "backend" | "tools" | "design";
  icon?: string;
}

export type ProjectCategory = "all" | "web" | "mobile" | "design" | "oss";