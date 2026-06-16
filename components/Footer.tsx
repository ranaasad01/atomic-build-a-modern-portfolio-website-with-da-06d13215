"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { navLinks, APP_NAME, APP_TAGLINE, APP_EMAIL, APP_GITHUB, APP_LINKEDIN, APP_TWITTER } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const socialLinks = [
  { icon: Github, href: APP_GITHUB, label: "GitHub" },
  { icon: Twitter, href: APP_TWITTER, label: "Twitter" },
  { icon: Linkedin, href: APP_LINKEDIN, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${APP_EMAIL}`, label: "Email" },
];

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={shouldReduceMotion ? {} : staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Brand */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
              <span className="font-semibold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              {APP_TAGLINE}. Crafting elegant digital experiences with modern web technologies.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={shouldReduceMotion ? {} : fadeInUp}
            className="space-y-4"
          >
            <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest">
              Get In Touch
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Open to new opportunities and interesting projects. Let&apos;s build something great together.
            </p>
            <a
              href={`mailto:${APP_EMAIL}`}
              className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200 group"
            >
              <Mail size={14} />
              <span className="group-hover:underline">{APP_EMAIL}</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={shouldReduceMotion ? {} : fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/30 flex items-center gap-1.5">
            © {new Date().getFullYear()} {APP_NAME}. Made with{" "}
            <Heart size={11} className="text-indigo-400 fill-indigo-400" /> using Next.js & Tailwind
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label="Scroll to top"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 group"
          >
            <span>Back to top</span>
            <div className="w-6 h-6 rounded-md border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <ArrowUp size={11} />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}