"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, Mail, MessageCircle as Twitter, Download, ExternalLink, Code, Layers, Sparkles, Terminal, Star, CheckCircle, Send, User, FileText, Activity, Globe, Smartphone, Palette, GitBranch, ChevronDown } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  APP_EMAIL,
  APP_GITHUB,
  APP_LINKEDIN,
  APP_TWITTER,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerContainerFast,
  popIn,
} from "@/lib/motion";

// ─── Inline Mock Data ────────────────────────────────────────────

const skills = [
  { name: "React / Next.js", level: 95, category: "frontend", color: "from-cyan-400 to-blue-500" },
  { name: "TypeScript", level: 90, category: "frontend", color: "from-blue-400 to-indigo-500" },
  { name: "Tailwind CSS", level: 92, category: "frontend", color: "from-teal-400 to-cyan-500" },
  { name: "Node.js", level: 85, category: "backend", color: "from-green-400 to-emerald-500" },
  { name: "PostgreSQL", level: 80, category: "backend", color: "from-blue-500 to-violet-500" },
  { name: "GraphQL", level: 78, category: "backend", color: "from-pink-400 to-rose-500" },
  { name: "Figma", level: 88, category: "design", color: "from-purple-400 to-pink-500" },
  { name: "Docker / CI/CD", level: 75, category: "tools", color: "from-orange-400 to-amber-500" },
];

const projects = [
  {
    slug: "lumina-dashboard",
    title: "Lumina Dashboard",
    tagline: "Real-time analytics for modern SaaS teams",
    description:
      "A full-stack analytics platform with live data streaming, customizable widgets, and role-based access control. Built for scale with 50k+ daily active users.",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSockets", "Recharts"],
    category: "web",
    image: "https://florasense.com/_next/static/media/heroBanner.5f66d265.webp",
    liveUrl: "https://lumina.demo",
    githubUrl: APP_GITHUB,
    featured: true,
    year: 2024,
    highlights: ["50k+ DAU", "99.9% uptime", "Sub-100ms latency"],
  },
  {
    slug: "flora-mobile",
    title: "Flora — Plant Care App",
    tagline: "AI-powered plant health monitoring",
    description:
      "A cross-platform mobile app that uses computer vision to diagnose plant diseases, track watering schedules, and provide personalized care tips.",
    tags: ["React Native", "Expo", "TensorFlow.js", "Supabase"],
    category: "mobile",
    image: "https://images.squarespace-cdn.com/content/v1/5f9b6072d63165137a63dcee/e3db8fac-1a01-4ae9-a2dd-2668b490707d/prismcomponent-hero.png",
    liveUrl: "https://flora.demo",
    githubUrl: APP_GITHUB,
    featured: true,
    year: 2024,
    highlights: ["4.9★ App Store", "200k downloads", "AI diagnosis"],
  },
  {
    slug: "prism-design-system",
    title: "Prism Design System",
    tagline: "Open-source component library for React",
    description:
      "A comprehensive, accessible design system with 80+ components, dark mode support, and full TypeScript types. Used by 3,000+ developers worldwide.",
    tags: ["React", "Storybook", "Radix UI", "CSS Variables", "Vitest"],
    category: "oss",
    image: "https://m.bbb.org/prod/ProfileImages/2025/689314cf-83ec-4c9d-89c8-c1aa1c4a312b.png",
    githubUrl: APP_GITHUB,
    featured: true,
    year: 2023,
    highlights: ["3k+ GitHub stars", "80+ components", "A11y compliant"],
  },
  {
    slug: "nexus-ecommerce",
    title: "Nexus Commerce",
    tagline: "Headless e-commerce storefront",
    description:
      "A blazing-fast headless storefront built on Next.js with Shopify backend, featuring 3D product previews and a seamless checkout experience.",
    tags: ["Next.js", "Shopify", "Three.js", "Stripe", "Vercel"],
    category: "web",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    liveUrl: "https://nexus.demo",
    githubUrl: APP_GITHUB,
    featured: false,
    year: 2023,
    highlights: ["3D previews", "Edge-rendered", "98 Lighthouse"],
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at Luminary Labs",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    text: "Alex delivered an exceptional product — clean architecture, pixel-perfect UI, and shipped two weeks ahead of schedule. Truly a 10x engineer.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Founder at FloraAI",
    avatar: "https://m.media-amazon.com/images/M/MV5BMWRkMzE4NmItYWY4Zi00YWMzLWEzNWEtY2E0OGNjZWI4M2JhXkEyXkFqcGc@._V1_QL75_UX140_CR0,1,140,207_.jpg",
    text: "Working with Alex transformed our product. The attention to detail in both design and code quality is unmatched. Our users love the new experience.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Lead Designer at Craft Studio",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    text: "Alex bridges the gap between design and engineering beautifully. Every interaction feels intentional, every animation purposeful. A rare talent.",
    rating: 5,
  },
];

const stats = [
  { label: "Projects Shipped", value: "40+", icon: Layers },
  { label: "Years Experience", value: "6+", icon: Activity },
  { label: "Happy Clients", value: "30+", icon: Star },
  { label: "Open Source Stars", value: "8k+", icon: GitBranch },
];

const categoryIcons: Record<string, React.ElementType> = {
  web: Globe,
  mobile: Smartphone,
  design: Palette,
  oss: GitBranch,
};

// ─── Sub-components ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
      <Sparkles size={10} />
      {children}
    </div>
  );
}

function SkillBar({
  skill,
  index,
  shouldReduceMotion,
}: {
  skill: (typeof skills)[0];
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : fadeInUp}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/80">{skill.name}</span>
        <span className="text-xs text-white/40 font-mono">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1.0,
            delay: shouldReduceMotion ? 0 : index * 0.07,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  shouldReduceMotion,
}: {
  project: (typeof projects)[0];
  shouldReduceMotion: boolean | null;
}) {
  const Icon = categoryIcons[project.category] ?? Globe;
  return (
    <motion.article
      variants={shouldReduceMotion ? {} : scaleIn}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          <Icon size={10} className="text-indigo-400" />
          <span className="text-[10px] text-white/60 uppercase tracking-wider font-medium">{project.category}</span>
        </div>
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-indigo-500/80 backdrop-blur-sm text-[10px] text-white font-semibold uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
          <p className="text-xs text-indigo-400 font-medium mb-2">{project.tagline}</p>
          <p className="text-sm text-white/50 leading-relaxed line-clamp-3">{project.description}</p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.highlights.map((h) => (
            <span key={h} className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
              <CheckCircle size={8} />{h}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-white/40 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink size={12} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              <Github size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function TestimonialCard({ testimonial, shouldReduceMotion }: { testimonial: (typeof testimonials)[0]; shouldReduceMotion: boolean | null }) {
  return (
    <motion.div
      variants={shouldReduceMotion ? {} : fadeInUp}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-sm text-white/60 leading-relaxed italic">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="flex items-center gap-3 mt-auto">
        <img src={testimonial.avatar} alt={testimonial.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
        <div>
          <p className="text-sm font-semibold text-white">{testimonial.name}</p>
          <p className="text-xs text-white/40">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("all");
  const [activeProjectCategory, setActiveProjectCategory] = useState<string>("all");
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const contactRef = useRef<HTMLElement>(null);

  const skillCategories = ["all", "frontend", "backend", "design", "tools"];
  const projectCategories = ["all", "web", "mobile", "oss"];

  const filteredSkills = activeSkillCategory === "all" ? skills : skills.filter((s) => s.category === activeSkillCategory);
  const filteredProjects = activeProjectCategory === "all" ? projects : projects.filter((p) => p.category === activeProjectCategory);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormStatus("sent");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#0a0a0f]/80 border-b border-white/[0.06]">
        <Link href="#hero" className="font-bold text-lg tracking-tight text-white">
          {APP_NAME}<span className="text-indigo-400">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {["About", "Skills", "Projects", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <a
          href={`mailto:${APP_EMAIL}`}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors"
        >
          <Mail size={14} /> Hire Me
        </a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px]" />
        </div>

        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={shouldReduceMotion ? {} : popIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8">
            <Terminal size={14} className="text-indigo-400" />
            <span>Available for new projects</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={shouldReduceMotion ? {} : fadeInUp} className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
            <span className="text-white">{APP_NAME}</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              {APP_TAGLINE}
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p variants={shouldReduceMotion ? {} : fadeInUp} className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            I craft high-performance web experiences with obsessive attention to detail.
            From concept to deployment — clean code, beautiful UI, measurable results.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25"
            >
              View Projects <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all duration-200"
            >
              Get In Touch <Mail size={16} />
            </a>
            <a
              href="/resume.pdf"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white/60 hover:text-white transition-colors"
            >
              <Download size={16} /> Resume
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-4 text-center"
                >
                  <Icon size={18} className="text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs"
        >
          <span>scroll</span>
          <ChevronDown size={14} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            {/* Left */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInLeft}>
              <SectionLabel>About Me</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Building the web,<br />
                <span className="text-indigo-400">one pixel at a time</span>
              </h2>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p>
                  Hi, I&apos;m <strong className="text-white">{APP_NAME}</strong> — a full-stack engineer and designer
                  with 6+ years of experience shipping products that people love to use.
                </p>
                <p>
                  I specialise in React ecosystems, performance optimisation, and translating
                  complex design systems into maintainable, accessible code.
                </p>
                <p>
                  When I&apos;m not coding, you&apos;ll find me contributing to open source,
                  writing about web performance, or exploring generative art with WebGL.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <a href={APP_GITHUB} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-sm transition-all">
                  <Github size={14} /> GitHub
                </a>
                <a href={APP_LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-sm transition-all">
                  <Linkedin size={14} /> LinkedIn
                </a>
                <a href={`https://twitter.com/${APP_TWITTER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-sm transition-all">
                  <Twitter size={14} /> Twitter
                </a>
              </div>
            </motion.div>

            {/* Right — Timeline */}
            <motion.div variants={shouldReduceMotion ? {} : fadeInRight} className="space-y-6">
              {[
                { year: "2024", role: "Senior Engineer", company: "Freelance / Remote", desc: "Shipped 8 client projects, led a 4-person team, open-sourced Prism DS." },
                { year: "2022", role: "Frontend Lead", company: "Luminary Labs", desc: "Rebuilt the flagship SaaS dashboard, cutting load time by 60%." },
                { year: "2020", role: "Full-Stack Developer", company: "StartupXYZ", desc: "Built MVP from scratch — scaled to 10k users in 3 months." },
                { year: "2018", role: "CS Graduate", company: "University of Tech", desc: "Graduated with honours. Started freelancing immediately." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={shouldReduceMotion ? {} : fadeInUp}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-xs font-bold flex-shrink-0">
                      {item.year.slice(2)}
                    </div>
                    {i < 3 && <div className="w-px flex-1 bg-white/[0.06] mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="text-xs text-indigo-400 font-semibold mb-0.5">{item.year} · {item.company}</p>
                    <p className="text-base font-bold text-white mb-1">{item.role}</p>
                    <p className="text-sm text-white/40">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="py-28 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="text-center mb-12">
              <SectionLabel>Tech Stack</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Skills & Expertise</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">Tools and technologies I use to bring ideas to life</p>
            </motion.div>

            {/* Category filter */}
            <motion.div variants={shouldReduceMotion ? {} : fadeIn} className="flex flex-wrap justify-center gap-2 mb-12">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                    activeSkillCategory === cat
                      ? "bg-indigo-500 text-white"
                      : "bg-white/5 text-white/40 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Skill bars */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillCategory}
                variants={shouldReduceMotion ? {} : staggerContainerFast}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid md:grid-cols-2 gap-6"
              >
                {filteredSkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} shouldReduceMotion={shouldReduceMotion} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="text-center mb-12">
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Selected Work</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">A curated selection of projects I&apos;m proud of</p>
            </motion.div>

            {/* Category filter */}
            <motion.div variants={shouldReduceMotion ? {} : fadeIn} className="flex flex-wrap justify-center gap-2 mb-12">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveProjectCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                    activeProjectCategory === cat
                      ? "bg-indigo-500 text-white"
                      : "bg-white/5 text-white/40 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Project grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProjectCategory}
                variants={shouldReduceMotion ? {} : staggerContainerFast}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} shouldReduceMotion={shouldReduceMotion} />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="text-center mb-12">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">What clients say</h2>
            </motion.div>
            <motion.div
              variants={shouldReduceMotion ? {} : staggerContainerFast}
              className="grid md:grid-cols-3 gap-6"
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={contactRef} className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={shouldReduceMotion ? {} : staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="text-center mb-12">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black text-white">Let&apos;s work together</h2>
              <p className="text-white/40 mt-4 max-w-xl mx-auto">
                Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>

            <motion.div variants={shouldReduceMotion ? {} : fadeInUp} className="grid md:grid-cols-5 gap-8">
              {/* Info */}
              <div className="md:col-span-2 space-y-6">
                {[
                  { icon: Mail, label: "Email", value: APP_EMAIL, href: `mailto:${APP_EMAIL}` },
                  { icon: Github, label: "GitHub", value: "@alexdev", href: APP_GITHUB },
                  { icon: Twitter, label: "Twitter", value: `@${APP_TWITTER}`, href: `https://twitter.com/${APP_TWITTER}` },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                        <Icon size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-white/30 mb-0.5">{item.label}</p>
                        <p className="text-sm text-white font-medium">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Form */}
              <div className="md:col-span-3">
                <AnimatePresence mode="wait">
                  {formStatus === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8 bg-white/[0.03] border border-white/[0.07] rounded-2xl"
                    >
                      <CheckCircle size={48} className="text-emerald-400 mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-white/40 text-sm">Thanks for reaching out. I&apos;ll be in touch soon.</p>
                      <button
                        onClick={() => { setFormStatus("idle"); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                        className="mt-6 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleFormChange}
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleFormChange}
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                        />
                      </div>

                      {/* Subject */}
                      <div className="relative">
                        <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                          type="text"
                          name="subject"
                          value={formState.subject}
                          onChange={handleFormChange}
                          placeholder="Subject"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all"
                        />
                      </div>

                      {/* Message */}
                      <div className="relative">
                        <textarea
                          name="message"
                          required
                          rows={5}
                          value={formState.message}
                          onChange={handleFormChange}
                          placeholder="Tell me about your project..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === "sending"}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all"
                      >
                        {formStatus === "sending" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} /> Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href={APP_GITHUB} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Github size={16} />
            </a>
            <a href={APP_LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Linkedin size={16} />
            </a>
            <a href={`https://twitter.com/${APP_TWITTER}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <Twitter size={16} />
            </a>
            <a href={`mailto:${APP_EMAIL}`} className="hover:text-white transition-colors">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
