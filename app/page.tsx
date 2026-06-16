'use client';

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, Mail, MessageCircle as Twitter, Star, ExternalLink, Code2, Layers, Zap, Globe, Sparkles, CheckCircle, ArrowUpRight, Terminal, Layout, Activity } from 'lucide-react';
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

// ─── Inline Data ────────────────────────────────────────────────────────────

const featuredProjects = [
  {
    slug: "lumina-design-system",
    title: "Lumina Design System",
    tagline: "A scalable component library for modern web apps",
    tags: ["React", "TypeScript", "Storybook", "Figma"],
    category: "oss",
    image: "https://s3-alpha.figma.com/hub/file/6242084878/41995a36-8793-43c4-b9a6-9a1d752455c9-cover.png",
    liveUrl: "https://lumina.design",
    githubUrl: "https://github.com/alexmorgan/lumina",
    year: 2024,
    color: "from-indigo-500 to-purple-600",
  },
  {
    slug: "flowboard-saas",
    title: "FlowBoard SaaS",
    tagline: "Real-time project management for distributed teams",
    tags: ["Next.js", "Supabase", "Tailwind", "WebSockets"],
    category: "web",
    image: "https://y4pdgnepgswqffpt.public.blob.vercel-storage.com/templates/45565/rQtcejNbQKvShb9mLcmHlQbyj8-oXzIJJP1N7FooX3cz39hlfmdwQ2gJC.jpg",
    liveUrl: "https://flowboard.app",
    githubUrl: "https://github.com/alexmorgan/flowboard",
    year: 2024,
    color: "from-cyan-500 to-blue-600",
  },
  {
    slug: "pulse-mobile",
    title: "Pulse Mobile",
    tagline: "Health & fitness tracker with AI-powered insights",
    tags: ["React Native", "Expo", "TensorFlow.js", "Node.js"],
    category: "mobile",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/T-Mobile_Pulse_BW_1.jpg",
    liveUrl: "https://pulse.health",
    githubUrl: "https://github.com/alexmorgan/pulse",
    year: 2023,
    color: "from-rose-500 to-pink-600",
  },
];

const skills = [
  { name: "React / Next.js", level: 96, category: "frontend" },
  { name: "TypeScript", level: 93, category: "frontend" },
  { name: "Node.js / Express", level: 88, category: "backend" },
  { name: "PostgreSQL", level: 82, category: "backend" },
  { name: "Figma / UI Design", level: 85, category: "design" },
  { name: "Docker / DevOps", level: 75, category: "tools" },
];

const services = [
  {
    icon: Layout,
    title: "Frontend Engineering",
    description:
      "Pixel-perfect UIs built with React, Next.js, and TypeScript. Accessible, performant, and delightful to use.",
    accent: "from-indigo-500 to-purple-500",
  },
  {
    icon: Terminal,
    title: "Backend & APIs",
    description:
      "Scalable REST and GraphQL APIs, database design, authentication, and cloud infrastructure on AWS or Vercel.",
    accent: "from-cyan-500 to-blue-500",
  },
  {
    icon: Sparkles,
    title: "Design Systems",
    description:
      "Cohesive component libraries and design tokens that keep teams aligned and shipping faster.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Activity,
    title: "Performance Audits",
    description:
      "Deep-dive Lighthouse and Core Web Vitals audits with actionable fixes that move the needle on real user metrics.",
    accent: "from-emerald-500 to-teal-500",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at Veritas Labs",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sarah_Chen_%E9%99%88%E6%B7%91%E6%A1%A6_1986_Malaysia_Concert_Live_Photo_Original_%28cropped%29.jpg",
    quote:
      "Alex delivered our design system in record time. The code quality is exceptional — every component is documented, tested, and a joy to extend.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Founder of FlowBoard",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/6/6e/JMarcus_Webb.JPG",
    quote:
      "Working with Alex felt like having a senior engineer and a product designer in one. He pushed back on bad ideas and shipped great ones.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Lead PM at Shopify",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "The performance audit Alex ran saved us 40% on our LCP. Incredibly thorough, clear recommendations, and fast turnaround.",
    stars: 5,
  },
];

const stats = [
  { value: "50+", label: "Projects shipped" },
  { value: "8+", label: "Years experience" },
  { value: "30+", label: "Happy clients" },
  { value: "12k+", label: "GitHub stars" },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "Tailwind CSS", "Figma", "Docker",
  "GraphQL", "Supabase", "Vercel", "AWS",
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function GradientOrb({ className }: { className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className ?? ""}`}
    />
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
      <Sparkles size={11} />
      {children}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSent, setFormSent] = useState(false);

  const motionProps = (variants: Variants) =>
    shouldReduceMotion ? {} : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  function handleContactChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSent(true);
  }

  return (
    <main className="relative overflow-x-hidden bg-[#0a0a0a] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Background orbs */}
        <GradientOrb className="w-[600px] h-[600px] bg-indigo-600 -top-32 -left-48" />
        <GradientOrb className="w-[500px] h-[500px] bg-purple-600 top-1/3 -right-48" />
        <GradientOrb className="w-[300px] h-[300px] bg-cyan-500 bottom-0 left-1/3" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Afzal Rao
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {APP_TAGLINE} — I build fast, beautiful, and accessible digital products.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              Work with me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium transition-all duration-200 hover:-translate-y-0.5"
            >
              View my work
              <ExternalLink size={15} />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-1 text-white/20">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <GradientOrb className="w-[400px] h-[400px] bg-purple-600 -right-32 top-0" />

        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left: text */}
            <motion.div variants={fadeInLeft} className="space-y-6">
              <SectionLabel>About me</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Crafting digital experiences that{" "}
                <span className="text-indigo-400">matter</span>
              </h2>
              <p className="text-white/60 leading-relaxed text-lg">
                I&apos;m a full-stack developer and designer based in San Francisco, with 8+ years
                of experience building products that millions of people use. I care deeply about
                the intersection of engineering and design — writing clean code that brings
                beautiful interfaces to life.
              </p>
              <p className="text-white/60 leading-relaxed">
                Previously at Stripe, Vercel, and a handful of funded startups. Currently
                freelancing and building open-source tools that make developers&apos; lives easier.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/20 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={APP_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href={APP_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${APP_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <Mail size={16} />
                  Email
                </a>
              </div>
            </motion.div>

            {/* Right: card */}
            <motion.div variants={fadeInRight} className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] p-8">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />

                {/* Avatar placeholder */}
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25">
                  <span className="text-white font-bold text-2xl">AM</span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-1">{APP_NAME}</h3>
                <p className="text-white/50 text-sm mb-6">{APP_TAGLINE}</p>

                <div className="space-y-3">
                  {[
                    { icon: Globe, label: "San Francisco, CA" },
                    { icon: Code2, label: "8+ years experience" },
                    { icon: CheckCircle, label: "Available for hire" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 text-sm text-white/60">
                      <Icon size={15} className="text-indigo-400" />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Currently building</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Layers size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">FlowBoard SaaS</p>
                      <p className="text-xs text-white/40">Project management for teams</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <SectionLabel>Skills</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              My toolkit
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              A curated set of technologies I use to build great products.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainerFast)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white/80">{skill.name}</span>
                  <span className="text-xs font-mono text-white/40">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 1.0,
                      delay: shouldReduceMotion ? 0 : i * 0.07,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <GradientOrb className="w-[400px] h-[400px] bg-indigo-600 -left-32 top-1/2" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <SectionLabel>Services</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              What I do
            </h2>
            <p className="mt-4 text-white/50 max-w-xl mx-auto">
              End-to-end product development, from pixel-perfect UIs to scalable backend systems.
            </p>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
                <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-br ${service.accent} p-0.5 mb-4`}>
                  <div className="w-full h-full rounded-[10px] bg-[#0d0d0d] flex items-center justify-center">
                    <service.icon size={18} className="text-white" />
                  </div>
                </div>
                <h3 className="relative text-sm font-semibold text-white mb-2">{service.title}</h3>
                <p className="relative text-xs text-white/50 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          >
            <div>
              <SectionLabel>Projects</SectionLabel>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Selected work
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group shrink-0"
            >
              View all projects
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {featuredProjects.map((project) => (
              <motion.article
                key={project.slug}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                onHoverStart={() => setHoveredProject(project.slug)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{project.tagline}</p>

                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                    >
                      View details
                      <ArrowRight size={12} />
                    </Link>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
                      >
                        Live
                        <ExternalLink size={11} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors duration-200"
                      >
                        <Github size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <GradientOrb className="w-[400px] h-[400px] bg-cyan-600 -right-32 top-0" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...motionProps(fadeInUp)}
            className="text-center mb-16"
          >
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              What clients say
            </h2>
          </motion.div>

          <motion.div
            {...motionProps(staggerContainer)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                whileHover={shouldReduc